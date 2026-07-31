/**
 * Incidents Module
 * ØªÙ… Ø§Ø³ØªØ®Ø±Ø§Ø¬Ù‡ Ù…Ù† app-modules.js
 */
// ===== Incidents Module (الحوادث) =====
const Incidents = {
    currentEditId: null,
    currentAttachments: [],
    reportPreviewModalId: 'incident-report-preview-modal',
    lastRenderedSignature: '',
    _i18nSectionObserver: null,
    _i18nBodyObserver: null,

    applyModuleI18n(root) {
        const target = root || document;
        const i18nCore = (window.AppI18n && typeof window.AppI18n.applyI18n === 'function')
            ? window.AppI18n
            : ((window.I18n && typeof window.I18n.applyI18n === 'function') ? window.I18n : null);
        if (!i18nCore) return;
        if (typeof i18nCore.applyI18n === 'function') i18nCore.applyI18n(target);
        if (typeof i18nCore.applyLiteralTranslations === 'function') i18nCore.applyLiteralTranslations(target);
    },

    ensureI18nObservers(section) {
        if (this._i18nSectionObserver) {
            this._i18nSectionObserver.disconnect();
            this._i18nSectionObserver = null;
        }

        if (section && typeof MutationObserver !== 'undefined') {
            this._i18nSectionObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node && node.nodeType === 1) {
                            this.applyModuleI18n(node);
                        }
                    });
                });
            });
            this._i18nSectionObserver.observe(section, { childList: true, subtree: true });
        }

        if (!this._i18nBodyObserver && typeof MutationObserver !== 'undefined') {
            this._i18nBodyObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (!node || node.nodeType !== 1) return;
                        if (node.classList?.contains('modal-overlay') || node.querySelector?.('.modal-overlay')) {
                            this.applyModuleI18n(node);
                        }
                    });
                });
            });
            this._i18nBodyObserver.observe(document.body, { childList: true, subtree: true });
        }
    },

    /**
     * Convert Arabic-Indic / Eastern-Arabic digits to Latin digits in a string.
     * Useful for parsing dates/times coming from localized UI.
     */
    normalizeLatinDigits(input) {
        if (input === null || input === undefined) return '';
        const str = String(input);
        const arabicIndic = '٠١٢٣٤٥٦٧٨٩';
        const easternArabicIndic = '۰۱۲۳۴۵۶۷۸۹';
        return str
            .replace(/[٠-٩]/g, d => String(arabicIndic.indexOf(d)))
            .replace(/[۰-۹]/g, d => String(easternArabicIndic.indexOf(d)));
    },

    /**
     * Parse various date formats safely (ISO, YYYY-MM-DD, DD/MM/YYYY, etc.).
     * Returns a valid Date or null.
     */
    parseFlexibleDate(value) {
        if (!value) return null;

        if (value instanceof Date) {
            return Number.isNaN(value.getTime()) ? null : value;
        }

        if (typeof value === 'number') {
            const d = new Date(value);
            return Number.isNaN(d.getTime()) ? null : d;
        }

        const raw = this.normalizeLatinDigits(value).trim();
        if (!raw) return null;

        // First attempt: native parsing
        let d = new Date(raw);
        if (!Number.isNaN(d.getTime())) return d;

        // Common variant: "YYYY-MM-DD HH:mm" -> "YYYY-MM-DDTHH:mm"
        if (raw.includes(' ') && !raw.includes('T')) {
            d = new Date(raw.replace(' ', 'T'));
            if (!Number.isNaN(d.getTime())) return d;
        }

        const buildDate = (year, month1to12, day, hour = 0, minute = 0, second = 0) => {
            const month = month1to12 - 1;
            const dt = new Date(year, month, day, hour, minute, second);
            // Validate components to avoid JS auto-correction (e.g., 32/13/2025)
            if (
                dt.getFullYear() === year &&
                dt.getMonth() === month &&
                dt.getDate() === day
            ) {
                return dt;
            }
            return null;
        };

        const parseTimeParts = (hh, mm, ss) => {
            const hour = hh ? parseInt(hh, 10) : 0;
            const minute = mm ? parseInt(mm, 10) : 0;
            const second = ss ? parseInt(ss, 10) : 0;
            return { hour, minute, second };
        };

        // DD/MM/YYYY or DD-MM-YYYY (optionally with time)
        let m = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
        if (m) {
            const day = parseInt(m[1], 10);
            const month = parseInt(m[2], 10);
            const year = parseInt(m[3], 10);
            const { hour, minute, second } = parseTimeParts(m[4], m[5], m[6]);

            // Prefer DD/MM; if invalid, try MM/DD as fallback
            const ddmm = buildDate(year, month, day, hour, minute, second);
            if (ddmm) return ddmm;

            const mmdd = buildDate(year, day, month, hour, minute, second);
            if (mmdd) return mmdd;
        }

        // YYYY/MM/DD or YYYY-MM-DD (optionally with time)
        m = raw.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
        if (m) {
            const year = parseInt(m[1], 10);
            const month = parseInt(m[2], 10);
            const day = parseInt(m[3], 10);
            const { hour, minute, second } = parseTimeParts(m[4], m[5], m[6]);
            const ymd = buildDate(year, month, day, hour, minute, second);
            if (ymd) return ymd;
        }

        return null;
    },

    getThreeYearConfig() {
        const currentYear = new Date().getFullYear();
        const earliestYear = currentYear - 2;
        return {
            currentYear,
            earliestYear,
            years: [currentYear, currentYear - 1, currentYear - 2]
        };
    },

    /** مصدر موحّد لعدّ الحوادث في كل التبويبات */
    getCanonicalIncidents() {
        if (!AppState?.appData?.incidents || !Array.isArray(AppState.appData.incidents)) {
            return [];
        }
        return AppState.appData.incidents.filter((item) => item && typeof item === 'object' && item.id);
    },

    getUnifiedIncidentCounts() {
        const incidents = this.getCanonicalIncidents();
        incidents.forEach((inc) => {
            try { this._normalizeIncidentApprovalRecord(inc); } catch (_e) { /* ignore */ }
        });
        const counts = { total: incidents.length, open: 0, investigating: 0, completed: 0, closed: 0 };
        incidents.forEach((inc) => {
            const display = this.getIncidentDisplayStatus(inc);
            if (display === 'مفتوح' || display === 'في انتظار الموافقة') counts.open++;
            else if (display === 'قيد التحقيق') counts.investigating++;
            else if (display === 'مكتمل' || display === 'تحقيق منتهي') counts.completed++;
            else if (display === 'مغلق') counts.closed++;
        });
        return counts;
    },

    getLinkedRegistryEntries() {
        const incidentIds = new Set(this.getCanonicalIncidents().map((i) => i.id));
        return (this.registryData || []).filter((entry) => {
            if (!entry || typeof entry !== 'object') return false;
            const incId = (entry.incidentId != null && String(entry.incidentId).trim() !== '' && String(entry.incidentId).trim() !== 'null')
                ? String(entry.incidentId).trim() : '';
            return incId && incidentIds.has(incId);
        });
    },

    /**
     * إزالة صفوف السجل غير المرتبطة بحادث فعلي (يتيمة أو محذوفة)
     * @returns {number} عدد الصفوف المُزالة
     */
    cleanupRegistryOrphans(options = {}) {
        const { persist = false } = options;
        if (!Array.isArray(this.registryData)) this.registryData = [];
        this._dedupeRegistryData();
        const incidentIds = new Set(this.getCanonicalIncidents().map((i) => i.id));
        const before = this.registryData.length;
        this.registryData = this.registryData.filter((entry) => {
            if (!entry || typeof entry !== 'object') return false;
            const incId = (entry.incidentId != null && String(entry.incidentId).trim() !== '' && String(entry.incidentId).trim() !== 'null')
                ? String(entry.incidentId).trim() : '';
            return incId && incidentIds.has(incId);
        });
        const removed = before - this.registryData.length;
        if (removed > 0) {
            try { Utils.safeLog(`🧹 IncidentsRegistry: إزالة ${removed} سجل غير مرتبط بحادث`); } catch (_e) { /* ignore */ }
            if (!AppState.appData) AppState.appData = {};
            AppState.appData.incidentsRegistry = this.registryData;
            if (persist) {
                try {
                    localStorage.setItem('hse_incidents_registry', Utils.safeStringify(this.registryData));
                } catch (_e) { /* ignore */ }
            }
        }
        return removed;
    },

    getIncidentDateValue(incident = {}) {
        const possibleDates = [
            incident.date,
            incident.incidentDate,
            incident.createdAt,
            incident.updatedAt
        ];

        for (const value of possibleDates) {
            if (!value) continue;
            const date = this.parseFlexibleDate(value);
            if (date) return date;
        }
        return null;
    },

    /**
     * Safely convert a date value to local datetime string format for datetime-local inputs
     * Returns empty string if date is invalid
     * تم إصلاح المشكلة: تحويل من UTC إلى التوقيت المحلي
     */
    safeDateToISOString(dateValue, sliceLength = 16) {
        if (!dateValue) return '';
        try {
            const date = this.parseFlexibleDate(dateValue);
            if (!date) return '';
            // تحويل من UTC إلى التوقيت المحلي للعرض في حقول datetime-local
            const offset = date.getTimezoneOffset();
            const localDate = new Date(date.getTime() - offset * 60000);
            return localDate.toISOString().slice(0, sliceLength);
        } catch (e) {
            return '';
        }
    },

    normalizeSeverity(value) {
        const severity = (value || '').toString().trim().toLowerCase();
        if (!severity) return 'other';

        if (['عالية', 'high', 'حرجة', 'critical'].includes(severity)) return 'high';
        if (['متوسطة', 'medium', 'moderate'].includes(severity)) return 'medium';
        if (['منخفضة', 'low', 'minor'].includes(severity)) return 'low';
        return 'other';
    },

    normalizeStatus(value) {
        const status = (value || '').toString().trim().toLowerCase();
        if (!status) return 'other';

        if (['مغلق', 'محلول', 'تم الاغلاق', 'تم الإغلاق', 'closed', 'resolved'].includes(status)) return 'closed';
        if (['قيد التحقيق', 'investigation', 'under investigation', 'in progress', 'قيد المتابعة'].includes(status)) return 'investigating';
        if (['مفتوح', 'open', 'new'].includes(status)) return 'open';
        return 'other';
    },

    getThreeYearIncidents() {
        const data = this.getCanonicalIncidents();
        const { earliestYear, currentYear } = this.getThreeYearConfig();

        return data.map((incident) => {
            const date = this.getIncidentDateValue(incident);
            if (!date) return null;
            const year = date.getFullYear();
            if (year < earliestYear || year > currentYear) return null;
            return {
                incident,
                date,
                year
            };
        }).filter(Boolean).sort((a, b) => b.date - a.date);
    },

    buildYearlyStats(collection = []) {
        const { years } = this.getThreeYearConfig();

        const stats = years.map((year) => {
            const yearItems = collection.filter((item) => item.year === year);
            const total = yearItems.length;

            const severityBuckets = { high: 0, medium: 0, low: 0, other: 0 };
            const statusBuckets = { open: 0, investigating: 0, closed: 0, other: 0 };

            yearItems.forEach(({ incident }) => {
                const severityKey = this.normalizeSeverity(incident?.severity);
                severityBuckets[severityKey] = (severityBuckets[severityKey] || 0) + 1;

                const statusKey = this.normalizeStatus(incident?.status);
                statusBuckets[statusKey] = (statusBuckets[statusKey] || 0) + 1;
            });

            const closed = statusBuckets.closed || 0;
            const closureRate = total > 0 ? parseFloat(((closed / total) * 100).toFixed(1)) : 0;

            return {
                year,
                total,
                closed,
                open: statusBuckets.open || 0,
                investigating: statusBuckets.investigating || 0,
                severity: severityBuckets,
                closureRate,
                improvementVsPrevious: null
            };
        });

        stats.forEach((entry, index) => {
            const previous = stats[index + 1];
            if (!previous || previous.total === 0) {
                entry.improvementVsPrevious = null;
            } else {
                const rate = ((previous.total - entry.total) / previous.total) * 100;
                entry.improvementVsPrevious = parseFloat(rate.toFixed(1));
            }
        });

        return stats;
    },

    buildThreeYearAnalytics() {
        const incidents = this.getThreeYearIncidents();
        const yearlyStats = this.buildYearlyStats(incidents);
        const { earliestYear, currentYear } = this.getThreeYearConfig();

        const totals = {
            totalIncidents: incidents.length,
            closedIncidents: incidents.filter(({ incident }) => this.normalizeStatus(incident?.status) === 'closed').length
        };

        totals.closureRate = totals.totalIncidents > 0
            ? parseFloat(((totals.closedIncidents / totals.totalIncidents) * 100).toFixed(1))
            : 0;

        totals.averagePerYear = parseFloat((totals.totalIncidents / 3).toFixed(1));
        totals.rangeLabel = `${earliestYear} - ${currentYear}`;

        const severityTotals = incidents.reduce((acc, { incident }) => {
            const key = this.normalizeSeverity(incident?.severity);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, { high: 0, medium: 0, low: 0, other: 0 });

        const currentImprovement = yearlyStats.length > 0 ? yearlyStats[0].improvementVsPrevious : null;

        return {
            incidents,
            yearlyStats,
            totals,
            severityTotals,
            currentImprovement
        };
    },

    formatImprovementValue(value) {
        if (value === null || Number.isNaN(value)) {
            return {
                label: 'غير متاح',
                className: 'text-gray-500',
                value: null
            };
        }

        if (value === 0) {
            return {
                label: '0%',
                className: 'text-gray-600',
                value: 0
            };
        }

        const formatted = `${value > 0 ? '+' : ''}${Math.abs(value).toFixed(1)}%`;
        return {
            label: formatted,
            className: value > 0 ? 'text-green-600' : 'text-red-600',
            value
        };
    },

    // ======= بيانات سجل الحوادث =======
    registryData: [],
    registryCurrentTab: 'registry', // 'registry' أو 'manual-entry'

    /**
     * تهيئة وتحميل بيانات السجل
     */
    initRegistry() {
        try {
            // تحميل من AppState
            if (AppState.appData && AppState.appData.incidentsRegistry) {
                this.registryData = AppState.appData.incidentsRegistry;
            } else {
                // تحميل من localStorage
                const savedData = localStorage.getItem('hse_incidents_registry');
                if (savedData) {
                    this.registryData = JSON.parse(savedData);
                    if (!AppState.appData) AppState.appData = {};
                    AppState.appData.incidentsRegistry = this.registryData;
                } else {
                    this.registryData = [];
                }
            }
            // ✅ تنظيف أي تكرارات قديمة عند التحميل (بنفس id أو نفس incidentId)
            // يضمن أن أي تكرارات تراكمت سابقاً في IncidentsRegistry تُزال وتُمزامن نظيفة
            const dedupeRemoved = this._dedupeRegistryData();
            let registryDirty = dedupeRemoved > 0;
            if (Array.isArray(AppState?.appData?.incidents)) {
                const orphansRemoved = this.cleanupRegistryOrphans({ persist: false });
                if (orphansRemoved > 0) registryDirty = true;
            }
            if (registryDirty && AppState.appData) {
                AppState.appData.incidentsRegistry = this.registryData;
                try {
                    localStorage.setItem('hse_incidents_registry', Utils.safeStringify(this.registryData));
                } catch (_e) { /* ignore */ }
                // ✅ التنظيف المحلي وحده لا يكفي — الورقة (السيرفر) لا تزال بها صفوف orphan
                // (saveToSheet يعمل UPSERT بـ id فقط ولا يحذف الصفوف غير المطابقة).
                // نُرسل طلب تنظيف للسيرفر مرة واحدة في الجلسة لتنظيف الصفوف المكررة الفعلية.
                this._triggerRegistryServerCleanupOnce();
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل بيانات سجل الحوادث:', error);
            this.registryData = [];
        }
    },

    /**
     * يُشغّل تنظيف الصفوف المكررة في IncidentsRegistry على السيرفر مرة واحدة في الجلسة.
     * - idempotent: آمن للاستدعاء المتكرر
     * - silent: لا يُعطّل واجهة المستخدم ولا يُظهر إشعارات في حالة الفشل
     * - one-shot per session: لا يُعيد المحاولة لو نجح
     */
    _triggerRegistryServerCleanupOnce() {
        if (this._registryServerCleanupAttempted) return;
        this._registryServerCleanupAttempted = true;

        // تشغيل غير متزامن — لا ننتظر النتيجة
        setTimeout(() => {
            try {
                if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendToAppsScript) return;
                GoogleIntegration.sendToAppsScript('cleanupIncidentsRegistry', {})
                    .then((result) => {
                        if (result && result.success && (result.removed || 0) > 0) {
                            Utils.safeLog(`🧹 تنظيف IncidentsRegistry على السيرفر: حُذف ${result.removed} صف مكرر، أُبقي ${result.kept}`);
                        }
                    })
                    .catch((err) => {
                        Utils.safeWarn('⚠️ فشل تنظيف IncidentsRegistry على السيرفر (سيُعاد المحاولة في جلسة لاحقة):', err);
                        // إعادة المحاولة في الجلسة التالية
                        this._registryServerCleanupAttempted = false;
                    });
            } catch (e) {
                Utils.safeWarn('⚠️ خطأ غير متوقع في تنظيف IncidentsRegistry:', e);
                this._registryServerCleanupAttempted = false;
            }
        }, 1500); // تأخير 1.5 ثانية حتى لا نُحمّل السيرفر في وقت تحميل الصفحة
    },

    /**
     * ✅ إزالة التكرارات من سجل الحوادث قبل الحفظ/المزامنة
     * يمنع تراكم صفوف مكررة في IncidentsRegistry:
     *  - تكرار بنفس id (هوية الصف) → يُبقي الأحدث
     *  - تكرار منطقي بنفس incidentId غير الفارغ → يُبقي الأحدث
     * يُعيد عدد السجلات المُزالة.
     */
    _dedupeRegistryData() {
        if (!Array.isArray(this.registryData)) { this.registryData = []; return 0; }
        const seenId = new Set();
        const seenIncidentId = new Set();
        const result = [];
        // نمر من النهاية للبداية لإبقاء الأحدث (آخر نسخة محدّثة)
        for (let i = this.registryData.length - 1; i >= 0; i--) {
            const r = this.registryData[i];
            if (!r || typeof r !== 'object') continue;
            const id = r.id != null ? String(r.id).trim() : '';
            const incId = (r.incidentId != null && String(r.incidentId).trim() !== '' && String(r.incidentId).trim() !== 'null')
                ? String(r.incidentId).trim() : '';
            // تخطّي إن تكرر الـ id
            if (id && seenId.has(id)) continue;
            // تخطّي إن تكرر incidentId (تكرار منطقي لنفس الحادث)
            if (incId && seenIncidentId.has(incId)) continue;
            if (id) seenId.add(id);
            if (incId) seenIncidentId.add(incId);
            result.push(r);
        }
        result.reverse();
        const removed = this.registryData.length - result.length;
        if (removed > 0) {
            this.registryData = result;
            try { Utils.safeLog(`🧹 IncidentsRegistry: تم إزالة ${removed} سجل مكرر قبل الحفظ`); } catch (e) {}
        }
        return removed;
    },

    /**
     * حفظ بيانات السجل
     */
    async saveRegistryData(options = {}) {
        try {
            const { sync = true } = options || {};
            // ✅ إزالة أي تكرارات قبل الحفظ والمزامنة
            this._dedupeRegistryData();
            if (!AppState.appData) AppState.appData = {};
            AppState.appData.incidentsRegistry = this.registryData;
            localStorage.setItem('hse_incidents_registry', Utils.safeStringify(this.registryData));

            // المزامنة مع Google Sheets
            if (sync && typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
                await GoogleIntegration.autoSave('IncidentsRegistry', this.registryData);
            }
            return true;
        } catch (error) {
            Utils.safeError('❌ خطأ في حفظ بيانات السجل:', error);
            return false;
        }
    },

    /**
     * توليد رقم تسلسلي للسجل
     */
    generateRegistrySequentialNumber() {
        const currentYear = new Date().getFullYear();
        const yearRecords = this.registryData.filter(r => {
            if (!r.incidentDate) return false;
            const recordYear = new Date(r.incidentDate).getFullYear();
            return recordYear === currentYear;
        });
        return yearRecords.length + 1;
    },

    /**
     * حساب إجمالي أيام الإجازة من تاريخ بداية الإجازة حتى تاريخ العودة للعمل
     * (شامل يوم البدء ويوم العودة — بدون تواريخ = 0 يوم)
     */
    calculateTotalLeaveDays(leaveStartDate, returnToWorkDate) {
        if (!leaveStartDate || !returnToWorkDate) return 0;
        try {
            const toLocalDate = (value) => {
                const raw = String(value).trim().split('T')[0];
                const parts = raw.split('-').map((part) => parseInt(part, 10));
                if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
                return new Date(parts[0], parts[1] - 1, parts[2]);
            };

            const start = toLocalDate(leaveStartDate);
            const end = toLocalDate(returnToWorkDate);

            if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
                return 0;
            }

            if (end < start) {
                return 0;
            }

            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return diffDays;
        } catch (error) {
            Utils.safeError('خطأ في حساب أيام الإجازة:', error);
            return 0;
        }
    },

    /**
     * استنتاج حقول الإجازة لسجل الحوادث — بدون افتراض تاريخ الحادث كإجازة.
     * إصابة بدون فقد أيام عمل (injury-no-lost) → 0 يوم وتواريخ فارغة.
     */
    resolveRegistryLeaveFields(incident, existingEntry = null) {
        const types = Array.isArray(incident?.investigation?.incidentTypes)
            ? incident.investigation.incidentTypes
            : [];
        if (types.includes('injury-no-lost')) {
            return { leaveStartDate: '', returnToWorkDate: '', totalLeaveDays: 0 };
        }

        const pickDate = (...values) => {
            for (const value of values) {
                const normalized = String(value ?? '').trim();
                if (normalized) return normalized.split('T')[0];
            }
            return '';
        };

        const leaveStartDate = pickDate(incident?.leaveStartDate, existingEntry?.leaveStartDate);
        const returnToWorkDate = pickDate(incident?.returnToWorkDate, existingEntry?.returnToWorkDate);

        if (!leaveStartDate || !returnToWorkDate) {
            return { leaveStartDate: '', returnToWorkDate: '', totalLeaveDays: 0 };
        }

        return {
            leaveStartDate,
            returnToWorkDate,
            totalLeaveDays: this.calculateTotalLeaveDays(leaveStartDate, returnToWorkDate)
        };
    },

    /**
     * الحصول على بيانات الموظف من كود الموظف
     */
    getEmployeeByCode(employeeCode) {
        if (!employeeCode) return null;
        try {
            const employees = AppState?.appData?.employees || [];
            const normalizedCode = String(employeeCode).trim().toLowerCase();

            const employee = employees.find(emp => {
                if (!emp) return false;
                // البحث في جميع الحقول الممكنة
                const codeFields = [
                    emp.employeeCode,
                    emp.employeeNumber,
                    emp.sapId,
                    emp.id,
                    emp.code,
                    emp.cardId
                ].filter(Boolean).map(f => String(f).trim().toLowerCase());

                return codeFields.some(field => field === normalizedCode);
            });

            return employee || null;
        } catch (error) {
            Utils.safeError('خطأ في البحث عن الموظف:', error);
            return null;
        }
    },

    _calculateEmployeeAge(employee) {
        if (!employee) return '';
        if (employee.age != null && employee.age !== '') {
            const directAge = parseInt(employee.age, 10);
            if (!Number.isNaN(directAge) && directAge >= 0) return directAge;
        }
        const birthRaw = employee.birthDate || employee.dateOfBirth || employee.birth_date || '';
        if (!birthRaw) return '';
        if (typeof Employees !== 'undefined' && typeof Employees.calculateAge === 'function') {
            const age = Employees.calculateAge(birthRaw);
            if (age !== '' && age != null) return age;
        }
        try {
            const birthDate = new Date(birthRaw);
            if (Number.isNaN(birthDate.getTime())) return '';
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
            return age >= 0 ? age : '';
        } catch (_e) {
            return '';
        }
    },

    _applyInvestigationEmployeeToForm(modal, employee, options = {}) {
        if (!modal || !employee) return;
        const nameInput = modal.querySelector('#investigation-affected-name');
        const jobInput = modal.querySelector('#investigation-affected-job');
        const deptInput = modal.querySelector('#investigation-affected-department');
        const ageInput = modal.querySelector('#investigation-affected-age');
        const codeInput = modal.querySelector('#investigation-affected-employee-code');

        if (codeInput) {
            codeInput.value = employee.code || employee.employeeNumber || employee.sapId || employee.id || codeInput.value || '';
        }
        if (nameInput) nameInput.value = employee.name || employee.fullName || '';
        if (jobInput) {
            jobInput.value = employee.job || employee.position || employee.jobTitle || employee.title || '';
        }
        if (deptInput) {
            deptInput.value = employee.department || employee.section || employee.division || employee.dept || employee.departmentName || '';
        }
        if (ageInput) {
            const age = this._calculateEmployeeAge(employee);
            if (age !== '' && age != null) ageInput.value = String(age);
            else if (!options.keepExisting) ageInput.value = '';
        }
    },

    _buildInvestigationBodyPartsDatalistOptions() {
        return (this.BODY_PART_KEYWORDS || []).map((part) =>
            `<option value="${Utils.escapeHTML(part.label)}"></option>`
        ).join('');
    },

    /**
     * تحديد اسم اليوم
     */
    getDayName(date) {
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[date.getDay()];
    },

    /**
     * تحديد الوردية من الوقت
     */
    determineShift(time) {
        if (!time) return 'أولى';
        try {
            const normalized = this.normalizeLatinDigits(time);
            const hourPart = (normalized.split(':')[0] || '').replace(/[^\d]/g, '');
            const hour = parseInt(hourPart, 10);
            if (Number.isNaN(hour)) return 'أولى';
            if (hour >= 6 && hour < 14) return 'أولى';
            if (hour >= 14 && hour < 22) return 'ثانية';
            return 'ثالثة';
        } catch {
            return 'أولى';
        }
    },

    /**
     * قاموس الأجزاء المتضررة الشائعة (عربي/إنجليزي)
     */
    BODY_PART_KEYWORDS: [
        { label: 'الرأس / الوجه', keywords: ['رأس', 'راس', 'وجه', 'عين', 'أنف', 'فم', 'جمجمة', 'أذن', 'head', 'face', 'eye', 'skull'] },
        { label: 'الرقبة', keywords: ['رقبة', 'neck'] },
        { label: 'الصدر', keywords: ['صدر', 'قفص صدري', 'chest', 'thorax'] },
        { label: 'الظهر', keywords: ['ظهر', 'عمود فقري', 'back', 'spine'] },
        { label: 'البطن', keywords: ['بطن', 'abdomen', 'stomach'] },
        { label: 'الذراع / اليد', keywords: ['ذراع', 'يد', 'إصبع', 'كوع', 'معصم', 'arm', 'hand', 'finger', 'wrist', 'elbow'] },
        { label: 'الساق / القدم', keywords: ['ساق', 'قدم', 'ركبة', 'كاحل', 'فخذ', 'leg', 'foot', 'knee', 'ankle', 'thigh'] },
        { label: 'الكتف', keywords: ['كتف', 'shoulder'] },
        { label: 'إصابات متعددة', keywords: ['متعدد', 'عدة أجزاء', 'multiple', 'جسم كامل'] }
    ],

    /**
     * استخراج الجزء المصاب من النص
     */
    extractInjuredPart(description, injuryDescription = '') {
        const text = `${description || ''} ${injuryDescription || ''}`.trim().toLowerCase();
        if (!text) return 'غير محدد';

        for (const part of this.BODY_PART_KEYWORDS) {
            if (part.keywords.some(kw => text.includes(kw.toLowerCase()))) {
                return part.label;
            }
        }

        const shortDirect = (injuryDescription || '').trim();
        if (shortDirect && shortDirect.length <= 80 && shortDirect !== 'غير محدد') {
            return shortDirect;
        }

        return 'غير محدد';
    },

    /** حل الجزء المتضرر من مصادر الحادث المتعددة */
    resolveIncidentInjuredPart(incident) {
        if (!incident) return 'غير محدد';

        const direct = String(incident.injuredPart || '').trim();
        if (direct && direct !== 'غير محدد') return direct;

        const inv = this._parseInvestigationRecord(incident);
        const invPart = String(inv?.injuredPart || '').trim();
        if (invPart && invPart !== 'غير محدد') return invPart;

        const injuryDesc = String(incident.injuryDescription || '').trim();
        if (injuryDesc) {
            const inferred = this.extractInjuredPart('', injuryDesc);
            if (inferred !== 'غير محدد') return inferred;
            if (injuryDesc.length <= 80) return injuryDesc;
        }

        const registryEntry = (this.registryData || []).find(r => r.incidentId === incident.id);
        if (registryEntry) {
            const regPart = String(registryEntry.injuredPart || '').trim();
            if (regPart && regPart !== 'غير محدد') return regPart;
            const regInjury = String(registryEntry.injuryDescription || '').trim();
            if (regInjury) {
                const inferred = this.extractInjuredPart('', regInjury);
                if (inferred !== 'غير محدد') return inferred;
            }
        }

        return this.extractInjuredPart(incident.description || '', injuryDesc);
    },

    /** معد الإخطار/المبلّغ — منفصل عن الطرف المتضرر */
    getIncidentListReporter(incident) {
        if (!incident) return '-';
        const inv = this._parseInvestigationRecord(incident);
        const candidates = [
            incident.reportedBy,
            incident.reporterName,
            inv?.reporterName,
            incident.createdBy?.name,
            incident.createdBy?.displayName
        ];
        for (const candidate of candidates) {
            const value = String(candidate || '').trim();
            if (value) return value;
        }
        return '-';
    },

    /** اسم الطرف المتضرر — منفصل عن المبلّغ */
    getIncidentAffectedPartyName(incident) {
        if (!incident) return '';
        const inv = this._parseInvestigationRecord(incident);
        const affiliation = String(
            incident.affiliation || inv?.affectedAffiliation || incident.affectedType || ''
        ).trim().toLowerCase();

        const personName = String(
            incident.affectedName ||
            inv?.affectedName ||
            incident.employeeName ||
            ''
        ).trim();

        const contractorName = String(
            incident.contractorName ||
            (affiliation === 'contractor' ? (incident.affectedDepartment || inv?.affectedDepartment) : '') ||
            ''
        ).trim();

        if (affiliation === 'contractor' || incident.affectedType === 'contractor') {
            if (personName && contractorName && personName !== contractorName) {
                return `${personName} — ${contractorName}`;
            }
            return personName || contractorName || '';
        }

        return personName;
    },

    /** موقع العرض في قائمة الحوادث */
    getIncidentListLocation(incident) {
        return this._resolveHotspotLabel(incident);
    },

    /** خلية الأطراف / الجزء المتضرر في الجدول */
    renderIncidentListAffectedCell(incident) {
        const party = this.getIncidentAffectedPartyName(incident);
        const injuredPart = String(this.resolveIncidentInjuredPart(incident) || '').trim();
        const inv = this._parseInvestigationRecord(incident);
        const equipment = String(incident?.equipmentCause || inv?.equipmentCause || '').trim();
        const job = String(
            incident.affectedJobTitle || inv?.affectedJob || incident.employeeJob || ''
        ).trim();

        const lines = [];
        if (party) {
            lines.push(`<div class="font-medium text-gray-800">${Utils.escapeHTML(party)}</div>`);
        }
        if (job) {
            lines.push(`<div class="text-xs text-gray-500">${Utils.escapeHTML(job)}</div>`);
        }
        if (injuredPart && injuredPart !== 'غير محدد') {
            lines.push(`<div class="text-xs text-gray-600">الجزء: ${Utils.escapeHTML(injuredPart)}</div>`);
        }
        if (equipment && equipment !== 'غير محدد') {
            lines.push(`<div class="text-xs text-gray-500">المعدة: ${Utils.escapeHTML(equipment)}</div>`);
        }
        return lines.length ? lines.join('') : '-';
    },

    renderIncidentsListRowActions(incident, compact = false) {
        const id = incident?.id || '';
        if (compact) {
            return `
                <div class="flex items-center gap-2">
                    <button onclick="Incidents.viewIncident('${id}')" class="btn-icon btn-icon-info" title="عرض">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Incidents.editIncident('${id}')" class="btn-icon btn-icon-primary" title="تعديل">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="Incidents.manageWorkflow('${id}')" class="btn-icon btn-icon-warning" title="إدارة التدفق">
                        <i class="fas fa-project-diagram"></i>
                    </button>
                    ${this.renderIncidentDeleteButton(id)}
                </div>
            `;
        }
        return `
            <div class="flex items-center gap-2 flex-wrap">
                <button onclick="Incidents.viewIncident('${id}')" class="btn-icon btn-icon-info" title="عرض">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${id}'); } else { console.error('Incidents.showInvestigationForm is not available'); alert('نموذج التحقيق غير متاح. يرجى إعادة تحميل الصفحة.'); }" class="btn-icon btn-icon-warning" title="التحقيق في الحادث">
                    <i class="fas fa-search"></i>
                </button>
                <button onclick="Incidents.editIncident('${id}')" class="btn-icon btn-icon-primary" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="Incidents.manageWorkflow('${id}')" class="btn-icon btn-icon-warning" title="إدارة التدفق">
                    <i class="fas fa-project-diagram"></i>
                </button>
                <button onclick="Incidents.exportPDF('${id}')" class="btn-icon btn-icon-secondary" title="تصدير PDF">
                    <i class="fas fa-print"></i>
                </button>
                ${this.renderIncidentDeleteButton(id)}
            </div>
        `;
    },

    renderIncidentsListRow(incident, compactActions = false) {
        const id = incident?.id || '';
        return `
            <tr data-incident-id="${Utils.escapeHTML(id)}">
                <td>${Utils.escapeHTML(incident?.title || '')}</td>
                <td>${Utils.escapeHTML(this.getIncidentListLocation(incident))}</td>
                <td>${incident?.date ? Utils.formatDate(incident.date) : '-'}</td>
                <td>
                    <span class="badge badge-${this.getSeverityBadgeClass(incident?.severity)}">
                        ${incident?.severity || '-'}
                    </span>
                </td>
                <td>${Utils.escapeHTML(incident?.incidentType || '-')}</td>
                <td>${Utils.escapeHTML(this.getIncidentListReporter(incident))}</td>
                <td>${this.renderIncidentListAffectedCell(incident)}</td>
                <td>
                    <span class="badge badge-${this.getStatusBadgeClass(this.getIncidentDisplayStatus(incident))}">
                        ${Utils.escapeHTML(this.getIncidentDisplayStatus(incident))}
                    </span>
                </td>
                <td>${this.renderWorkflowStatusBadge(incident)}</td>
                <td>${this.renderIncidentsListRowActions(incident, compactActions)}</td>
            </tr>
        `;
    },

    /** تسمية موقع الحادث للتحليل (مصنع + مكان فرعي) */
    _resolveHotspotLabel(incident) {
        const factory = String(incident.siteName || incident.factory || '').trim();
        const place = String(incident.sublocationName || incident.sublocation || incident.location || '').trim();
        if (factory && place && place !== factory) return `${factory} — ${place}`;
        return place || factory || 'غير محدد';
    },

    _resolveHotspotFactory(incident) {
        return String(incident.siteName || incident.factory || incident.location || 'غير محدد').trim();
    },

    _getBodyPartIcon(label) {
        const map = {
            'الرأس / الوجه': 'fa-head-side-virus',
            'الرقبة': 'fa-user',
            'الصدر': 'fa-heart-pulse',
            'الظهر': 'fa-person-walking',
            'البطن': 'fa-circle-dot',
            'الذراع / اليد': 'fa-hand',
            'الساق / القدم': 'fa-shoe-prints',
            'الكتف': 'fa-user-injured',
            'إصابات متعددة': 'fa-users-rays',
            'غير محدد': 'fa-question'
        };
        return map[label] || 'fa-band-aid';
    },

    _getHotspotRankStyle(rank) {
        const styles = [
            { bg: 'linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)', border: '#f59e0b', badge: '#b45309', bar: '#f59e0b' },
            { bg: 'linear-gradient(135deg,#f1f5f9 0%,#e2e8f0 100%)', border: '#94a3b8', badge: '#475569', bar: '#64748b' },
            { bg: 'linear-gradient(135deg,#ffedd5 0%,#fed7aa 100%)', border: '#ea580c', badge: '#c2410c', bar: '#f97316' }
        ];
        return styles[rank] || { bg: '#fff', border: '#e5e7eb', badge: '#6366f1', bar: '#8b5cf6' };
    },

    _buildHotspotStats(incidents) {
        const map = {};
        incidents.forEach(inc => {
            const key = this._resolveHotspotLabel(inc);
            if (!map[key]) {
                map[key] = { label: key, factory: this._resolveHotspotFactory(inc), count: 0, high: 0, open: 0 };
            }
            map[key].count += 1;
            if (this.normalizeSeverity(inc?.severity) === 'high') map[key].high += 1;
            if (this.normalizeStatus(inc?.status) === 'open') map[key].open += 1;
        });
        return Object.values(map).sort((a, b) => b.count - a.count);
    },

    _buildBodyPartStats(incidents) {
        const injuryIncidents = incidents.filter(inc => {
            const t = String(inc.incidentType || inc.type || '').toLowerCase();
            const part = this.resolveIncidentInjuredPart(inc);
            return part !== 'غير محدد' || t.includes('إصاب') || t.includes('injury') || inc.injuryDescription;
        });

        const source = injuryIncidents.length ? injuryIncidents : incidents;
        const map = {};
        source.forEach(inc => {
            const part = this.resolveIncidentInjuredPart(inc);
            const key = part || 'غير محدد';
            map[key] = (map[key] || 0) + 1;
        });

        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .map(([label, count]) => ({ label, count }));
    },

    _renderIncidentHotspotGrid(stats, total) {
        const el = document.getElementById('incident-hotspot-grid');
        if (!el) return;

        if (!stats.length) {
            el.innerHTML = '<div style="text-align:center;padding:32px;color:#94a3b8;font-size:0.88rem;"><i class="fas fa-map-location-dot" style="font-size:2rem;display:block;margin-bottom:10px;opacity:0.5;"></i>لا توجد بيانات مواقع في الفترة المحددة</div>';
            return;
        }

        const max = stats[0].count || 1;
        el.innerHTML = stats.slice(0, 8).map((item, i) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            const barPct = Math.round((item.count / max) * 100);
            const st = this._getHotspotRankStyle(i);
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
            return `
                <div style="display:flex;align-items:center;gap:14px;padding:14px 16px;background:${st.bg};border:1.5px solid ${st.border};border-radius:14px;transition:transform .2s,box-shadow .2s;"
                    onmouseover="this.style.transform='translateX(-4px)';this.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)'"
                    onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:42px;height:42px;border-radius:12px;background:${st.badge};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${i < 3 ? '1.1rem' : '0.85rem'};flex-shrink:0;">${medal}</div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-weight:800;font-size:0.9rem;color:#1e293b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${Utils.escapeHTML(item.label)}">${Utils.escapeHTML(item.label)}</div>
                        <div style="font-size:0.72rem;color:#64748b;margin:3px 0 8px;display:flex;gap:10px;flex-wrap:wrap;">
                            <span><i class="fas fa-industry" style="margin-left:4px;color:#0891b2;"></i>${Utils.escapeHTML(item.factory)}</span>
                            ${item.high ? `<span style="color:#b91c1c;"><i class="fas fa-fire" style="margin-left:3px;"></i>${item.high} عالية</span>` : ''}
                            ${item.open ? `<span style="color:#b45309;"><i class="fas fa-folder-open" style="margin-left:3px;"></i>${item.open} مفتوحة</span>` : ''}
                        </div>
                        <div style="height:8px;background:rgba(0,0,0,0.06);border-radius:99px;overflow:hidden;">
                            <div style="height:100%;width:${barPct}%;background:linear-gradient(90deg,${st.bar},${st.badge});border-radius:99px;transition:width .6s ease;"></div>
                        </div>
                    </div>
                    <div style="text-align:center;flex-shrink:0;min-width:56px;">
                        <div style="font-size:1.35rem;font-weight:900;color:${st.badge};line-height:1;">${item.count}</div>
                        <div style="font-size:0.65rem;color:#64748b;">حادث</div>
                        <div style="margin-top:4px;font-size:0.72rem;font-weight:700;color:#fff;background:${st.badge};padding:2px 8px;border-radius:10px;">${pct}%</div>
                    </div>
                </div>`;
        }).join('');
    },

    _renderIncidentBodyPartList(stats, total) {
        const el = document.getElementById('incident-bodypart-list');
        if (!el) return;

        const meaningful = stats.filter(s => s.label !== 'غير محدد');
        const list = meaningful.length ? meaningful : stats;

        if (!list.length) {
            el.innerHTML = '<div style="text-align:center;padding:24px;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات أجزاء متضررة</div>';
            return;
        }

        const max = list[0].count || 1;
        const colors = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#0891b2', '#7c3aed', '#db2777'];

        el.innerHTML = list.slice(0, 8).map((item, i) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            const barPct = Math.round((item.count / max) * 100);
            const color = colors[i % colors.length];
            const icon = this._getBodyPartIcon(item.label);
            return `
                <div style="display:flex;align-items:center;gap:12px;padding:11px 14px;background:#fff;border:1px solid #fecaca;border-radius:12px;margin-bottom:8px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:${color}18;color:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas ${icon}" style="font-size:16px;"></i>
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
                            <span style="font-weight:700;font-size:0.85rem;color:#374151;">${Utils.escapeHTML(item.label)}</span>
                            <span style="font-weight:800;font-size:0.9rem;color:${color};">${item.count} <span style="font-size:0.65rem;font-weight:600;color:#94a3b8;">(${pct}%)</span></span>
                        </div>
                        <div style="height:6px;background:#fef2f2;border-radius:99px;overflow:hidden;">
                            <div style="height:100%;width:${barPct}%;background:${color};border-radius:99px;"></div>
                        </div>
                    </div>
                </div>`;
        }).join('');
    },

    /**
     * استخراج المعدة المتسببة من الوصف
     */
    extractEquipmentCause(description, equipmentCause = '') {
        const direct = String(equipmentCause || '').trim();
        if (direct && direct !== 'غير محدد') return direct;
        return 'غير محدد';
    },

    /**
     * إنشاء سجل جديد من حادث
     */
    createRegistryEntry(incident) {
        if (!incident || !incident.id) return null;

        const sequentialNumber = this.generateRegistrySequentialNumber();
        const incidentDate = this.getIncidentDateValue(incident) || new Date();
        const incidentTime = incidentDate && !Number.isNaN(incidentDate.getTime())
            ? incidentDate.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
            : '';
        const incidentDay = (incidentDate && !Number.isNaN(incidentDate.getTime()))
            ? this.getDayName(incidentDate)
            : 'غير محدد';

        // الحصول على بيانات الموظف
        let employeeCode = incident.affectedCode || incident.employeeCode || '';
        let employeeName = incident.affectedName || '';
        let employeeJob = incident.affectedJobTitle || '';
        let employeeDepartment = incident.affectedDepartment || '';

        if (employeeCode) {
            const employee = this.getEmployeeByCode(employeeCode);
            if (employee) {
                employeeName = employee.name || employeeName;
                employeeJob = employee.job || employeeJob;
                employeeDepartment = employee.department || employeeDepartment;
            }
        }

        // تواريخ الإجازة — فقط عند إدخالها صراحةً (بدون فقد أيام عمل = 0)
        const leaveFields = this.resolveRegistryLeaveFields(incident);

        return {
            id: Utils.generateId('INCR'),
            sequentialNumber: sequentialNumber,
            incidentId: incident.id,
            factory: incident.siteName || incident.location || 'غير محدد',
            incidentLocation: incident.sublocationName || incident.sublocation || incident.location || 'غير محدد',
            incidentDate: (incidentDate && !Number.isNaN(incidentDate.getTime())) ? incidentDate.toISOString() : new Date().toISOString(),
            incidentDay: incidentDay,
            incidentTime: incidentTime,
            shift: this.determineShift(incidentTime),
            employeeCode: employeeCode,
            employeeName: employeeName,
            employeeJob: employeeJob,
            employeeDepartment: employeeDepartment,
            incidentDetails: incident.description || 'غير محدد',
            injuredPart: this.resolveIncidentInjuredPart(incident),
            equipmentCause: this.extractEquipmentCause(incident.description || '', incident.equipmentCause),
            leaveStartDate: leaveFields.leaveStartDate,
            returnToWorkDate: leaveFields.returnToWorkDate,
            totalLeaveDays: leaveFields.totalLeaveDays,
            status: incident.status || 'مفتوح',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    },

    /**
     * إضافة حادث للسجل (يُستدعى تلقائياً)
     */
    async addToRegistry(incident, options = {}) {
        const { persist = true } = options;
        const existingEntry = this.registryData.find(r => r.incidentId === incident.id);
        if (existingEntry) {
            return this.updateRegistryEntry(incident, options);
        }
        const entry = this.createRegistryEntry(incident);
        if (entry) {
            this.registryData.push(entry);
            if (persist) {
                await this.saveRegistryData();
            }
            Utils.safeLog(`✅ تم تسجيل الحادث #${entry.sequentialNumber} في السجل`);
        }
        return !!entry;
    },

    /**
     * تحديث سجل حادث
     */
    async updateRegistryEntry(incident, options = {}) {
        const { persist = true } = options;
        const entryIndex = this.registryData.findIndex(r => r.incidentId === incident.id);
        if (entryIndex === -1) {
            return this.addToRegistry(incident, options);
        }

        const entry = this.registryData[entryIndex];
        const incidentDate = this.getIncidentDateValue(incident) || new Date();
        const incidentTime = incidentDate && !Number.isNaN(incidentDate.getTime())
            ? incidentDate.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
            : '';

        // الحصول على بيانات الموظف
        let employeeCode = incident.affectedCode || incident.employeeCode || entry.employeeCode;
        let employeeName = incident.affectedName || entry.employeeName;
        let employeeJob = incident.affectedJobTitle || entry.employeeJob;
        let employeeDepartment = incident.affectedDepartment || entry.employeeDepartment;

        if (employeeCode) {
            const employee = this.getEmployeeByCode(employeeCode);
            if (employee) {
                employeeName = employee.name || employeeName;
                employeeJob = employee.job || employeeJob;
                employeeDepartment = employee.department || employeeDepartment;
            }
        }

        // تحديث البيانات
        entry.factory = incident.siteName || incident.location || entry.factory;
        entry.incidentLocation = incident.sublocationName || incident.sublocation || incident.location || entry.incidentLocation;
        entry.incidentDate = (incidentDate && !Number.isNaN(incidentDate.getTime())) ? incidentDate.toISOString() : (entry.incidentDate || new Date().toISOString());
        entry.incidentDay = (incidentDate && !Number.isNaN(incidentDate.getTime())) ? this.getDayName(incidentDate) : (entry.incidentDay || 'غير محدد');
        entry.incidentTime = incidentTime;
        entry.shift = this.determineShift(incidentTime);
        entry.employeeCode = employeeCode;
        entry.employeeName = employeeName;
        entry.employeeJob = employeeJob;
        entry.employeeDepartment = employeeDepartment;
        entry.incidentDetails = incident.description || entry.incidentDetails;
        entry.injuredPart = this.resolveIncidentInjuredPart(incident);
        entry.equipmentCause = this.extractEquipmentCause(incident.description || '', incident.equipmentCause);

        const leaveFields = this.resolveRegistryLeaveFields(incident, entry);
        entry.leaveStartDate = leaveFields.leaveStartDate;
        entry.returnToWorkDate = leaveFields.returnToWorkDate;
        entry.totalLeaveDays = leaveFields.totalLeaveDays;
        entry.status = this.isInvestigationComplete(incident)
            ? 'مكتمل'
            : (incident.status === 'مفتوح' ? 'مفتوح' : (incident.status || entry.status || 'مفتوح'));
        entry.updatedAt = new Date().toISOString();

        this.registryData[entryIndex] = entry;
        if (persist) {
            await this.saveRegistryData();
        }
        return true;
    },

    /**
     * حذف سجل حادث
     */
    async removeFromRegistry(incidentId) {
        const entryIndex = this.registryData.findIndex(r => r.incidentId === incidentId);
        if (entryIndex !== -1) {
            this.registryData.splice(entryIndex, 1);
            await this.saveRegistryData();
        }
    },

    /**
     * مزامنة السجل مع الحوادث الموجودة
     */
    async syncRegistryWithIncidents() {
        try {
            if (!AppState || !AppState.appData) {
                Utils.safeWarn('AppState غير متاح للمزامنة');
                return;
            }
            const incidents = this.getCanonicalIncidents();

            // مزامنة محدودة — تحديث بالذاكرة ثم حفظ واحد (تجنب 50 طلب شبكة متتالي)
            const maxSync = 50;
            const incidentsToSync = incidents.slice(0, maxSync);
            let registryChanged = false;

            for (const incident of incidentsToSync) {
                if (!incident || !incident.id) continue;
                try {
                    const existingEntry = this.registryData.find(r => r.incidentId === incident.id);
                    const incidentStamp = incident.updatedAt || incident.createdAt || '';
                    const entryStamp = existingEntry?.updatedAt || existingEntry?.createdAt || '';
                    if (existingEntry && incidentStamp && entryStamp && incidentStamp === entryStamp) {
                        continue;
                    }
                    if (!existingEntry) {
                        const added = await this.addToRegistry(incident, { persist: false });
                        if (added) registryChanged = true;
                    } else {
                        const updated = await this.updateRegistryEntry(incident, { persist: false });
                        if (updated) registryChanged = true;
                    }
                } catch (incidentError) {
                    Utils.safeWarn(`خطأ في مزامنة حادث ${incident.id}:`, incidentError);
                    continue;
                }
            }

            if (registryChanged) {
                await this.saveRegistryData();
            }

            const orphansRemoved = this.cleanupRegistryOrphans({ persist: false });
            if (orphansRemoved > 0) {
                await this.saveRegistryData();
                registryChanged = true;
            }

            if (registryChanged && this.currentTab === 'registry') {
                const contentContainer = document.getElementById('incidents-tab-content');
                if (contentContainer) {
                    contentContainer.innerHTML = await this.renderRegistryTab();
                    this.setupTabEventListeners('registry');
                }
            }

            if (incidents.length > maxSync) {
                Utils.safeLog(`تمت مزامنة ${maxSync} من ${incidents.length} حادث`);
            }
        } catch (error) {
            Utils.safeError('خطأ في مزامنة السجل:', error);
        }
    },

    currentTab: 'annual-log',

    async load() {
        // إضافة مستمع لتغيير اللغة
        if (!this._languageChangeListenerAdded) {
            document.addEventListener('language-changed', () => {
                if (typeof AppState !== 'undefined' && AppState._languageRefresh) return;
                this.load();
            });
            this._languageChangeListenerAdded = true;
        }

        try {
            const section = document.getElementById('incidents-section');
            if (!section) {
                if (typeof Utils !== 'undefined' && Utils.safeError) {
                    Utils.safeError(' قسم incidents-section غير موجود!');
                } else {
                    console.error(' قسم incidents-section غير موجود!');
                }
                return;
            }
            if (typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ مديول Incidents يكتب في قسم: incidents-section');
            }

            // تهيئة بيانات السجل
            try {
                this.initRegistry();
            } catch (error) {
                if (typeof Utils !== 'undefined' && Utils.safeError) {
                    Utils.safeError('خطأ في تهيئة السجل:', error);
                } else {
                    console.error('خطأ في تهيئة السجل:', error);
                }
                // المتابعة حتى لو فشلت التهيئة
                this.registryData = [];
            }

            this.normalizeAllIncidentsApprovalState();

            // مزامنة السجل بالخلفية بعد عرض الواجهة (لا تُعطّل التحميل)
            const scheduleRegistrySync = () => {
                this.syncRegistryWithIncidents().catch(error => {
                    if (typeof Utils !== 'undefined' && Utils.safeError) {
                        Utils.safeError('خطأ في مزامنة السجل:', error);
                    } else {
                        console.error('خطأ في مزامنة السجل:', error);
                    }
                });
            };
            if (typeof requestIdleCallback === 'function') {
                requestIdleCallback(scheduleRegistrySync, { timeout: 4000 });
            } else {
                setTimeout(scheduleRegistrySync, 800);
            }

            // عرض المحتوى
            let mainViewContent = '';
            try {
                mainViewContent = await this.renderMainView();
            } catch (error) {
                if (typeof Utils !== 'undefined' && Utils.safeError) {
                    Utils.safeError('خطأ في عرض الواجهة الرئيسية:', error);
                } else {
                    console.error('خطأ في عرض الواجهة الرئيسية:', error);
                }
                mainViewContent = '<div class="content-card"><div class="card-body"><p class="text-red-500">حدث خطأ في تحميل الواجهة. يرجى تحديث الصفحة.</p></div></div>';
            }

            section.innerHTML = `
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-exclamation-triangle ml-3"></i>
                                إدارة الحوادث
                            </h1>
                            <p class="section-subtitle">تسجيل ومتابعة حوادث السلامة المهنية</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button id="add-incident-notification-btn" class="btn-secondary">
                                <i class="fas fa-bell ml-2"></i>
                                إخطار عن حادث
                            </button>
                            <button id="open-investigation-form-btn" class="btn-primary">
                                <i class="fas fa-search ml-2"></i>
                                التحقيق في الحادث
                            </button>
                        </div>
                    </div>
                </div>
                <div id="incidents-content" class="mt-6">
                    ${mainViewContent}
                </div>
            `;
            this.applyModuleI18n(section);
            this.ensureI18nObservers(section);

            // إعداد المستمعين
            try {
                this.setupEventListeners();
                this.switchTab(this.currentTab);
            } catch (error) {
                if (typeof Utils !== 'undefined' && Utils.safeError) {
                    Utils.safeError('خطأ في إعداد المستمعين:', error);
                } else {
                    console.error('خطأ في إعداد المستمعين:', error);
                }
            }
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('خطأ فادح في تحميل مديول الحوادث:', error);
            } else {
                console.error('خطأ فادح في تحميل مديول الحوادث:', error);
            }
            const section = document.getElementById('incidents-section');
            if (section) {
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="text-center py-8">
                                <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                                <h2 class="text-xl font-bold text-gray-800 mb-2">حدث خطأ في تحميل مديول الحوادث</h2>
                                <p class="text-gray-600 mb-4">${error.message || 'خطأ غير معروف'}</p>
                                <button onclick="location.reload()" class="btn-primary">
                                    <i class="fas fa-sync ml-2"></i>
                                    إعادة تحميل الصفحة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                this.applyModuleI18n(section);
            }
        }
    },

    renderIncidentIdentityStyles_() {
        return `
            <style id="incidents-professional-identity-styles">
                .incidents-workspace {
                    --incident-navy: #0b2942;
                    --incident-navy-2: #123f63;
                    --incident-red: #c81e3a;
                    --incident-red-soft: #fff1f2;
                    --incident-gold: #f4b942;
                    --incident-ink: #172033;
                    --incident-muted: #64748b;
                    --incident-line: #dbe5ee;
                    --incident-surface: #ffffff;
                    --incident-canvas: #f5f8fb;
                    font-family: "Cairo", "Segoe UI", Tahoma, sans-serif;
                }
                .incidents-workspace .incidents-tabs-container {
                    position: relative;
                    overflow: hidden;
                    padding: 8px;
                    border: 1px solid rgba(255,255,255,.12);
                    border-radius: 18px;
                    background:
                        radial-gradient(circle at 8% 0%, rgba(244,185,66,.2), transparent 28%),
                        linear-gradient(125deg, var(--incident-navy) 0%, var(--incident-navy-2) 72%, #174f72 100%);
                    box-shadow: 0 16px 35px rgba(11,41,66,.2);
                }
                .incidents-workspace .incidents-tabs-container::after {
                    content: "";
                    position: absolute;
                    inset-inline-end: -48px;
                    top: -54px;
                    width: 160px;
                    height: 160px;
                    border: 26px solid rgba(255,255,255,.035);
                    border-radius: 50%;
                    pointer-events: none;
                }
                .incidents-workspace .incidents-tabs-nav {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    gap: 7px;
                    padding: 0;
                    overflow-x: auto;
                    border: 0;
                    border-radius: 13px;
                    background: transparent;
                    box-shadow: none;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,.35) transparent;
                }
                .incidents-workspace .incidents-tabs-nav .tab-btn {
                    min-height: 48px;
                    min-width: max-content;
                    padding: 10px 15px;
                    gap: 8px;
                    border: 1px solid rgba(255,255,255,.14);
                    border-radius: 11px;
                    background: rgba(255,255,255,.075);
                    color: rgba(255,255,255,.82);
                    font-size: .83rem;
                    font-weight: 700;
                    line-height: 1.2;
                    white-space: nowrap;
                    box-shadow: none;
                    transition: background .2s ease, color .2s ease, transform .2s ease, box-shadow .2s ease;
                }
                .incidents-workspace .incidents-tabs-nav .tab-btn::before { display: none; }
                .incidents-workspace .incidents-tabs-nav .tab-btn i {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 29px;
                    height: 29px;
                    margin: 0;
                    border-radius: 8px;
                    background: rgba(255,255,255,.12);
                    color: #fde68a;
                    font-size: .78rem;
                }
                .incidents-workspace .incidents-tabs-nav .tab-btn:hover {
                    background: rgba(255,255,255,.14);
                    color: #fff;
                    transform: translateY(-1px);
                }
                .incidents-workspace .incidents-tabs-nav .tab-btn.active {
                    border-color: #fff;
                    background: #fff;
                    color: var(--incident-navy);
                    box-shadow: 0 8px 22px rgba(0,0,0,.18);
                    transform: translateY(-1px);
                }
                .incidents-workspace .incidents-tabs-nav .tab-btn.active i {
                    background: var(--incident-red-soft);
                    color: var(--incident-red);
                }
                .incidents-workspace #incidents-tab-content {
                    margin-top: 18px !important;
                    min-height: 220px;
                }
                .incidents-workspace #incidents-tab-content.incident-identity-surface {
                    animation: incidentSurfaceIn .24s ease-out;
                }
                @keyframes incidentSurfaceIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .content-card,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .content-card,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .content-card,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .content-card {
                    overflow: hidden !important;
                    border: 1px solid var(--incident-line) !important;
                    border-radius: 16px !important;
                    background: var(--incident-surface) !important;
                    box-shadow: 0 10px 28px rgba(15,47,79,.08) !important;
                    transform: none !important;
                }
                .incidents-workspace #incidents-tab-content.incident-identity-surface .content-card:hover {
                    box-shadow: 0 14px 32px rgba(15,47,79,.11) !important;
                    transform: none !important;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .card-header,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .card-header,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .card-header,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .card-header {
                    position: relative;
                    padding: 17px 20px;
                    border-bottom: 1px solid #d9e4ed;
                    background: linear-gradient(115deg, #edf4f9 0%, #fff 64%, #fff7f7 100%) !important;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .card-header::before,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .card-header::before,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .card-header::before,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .card-header::before {
                    content: "";
                    position: absolute;
                    inset-block: 0;
                    inset-inline-start: 0;
                    width: 5px;
                    background: linear-gradient(180deg, var(--incident-red), #ef4444);
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .card-title,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .card-title,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .card-title,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .card-title {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    margin: 0;
                    color: var(--incident-navy);
                    font-size: 1rem;
                    font-weight: 800;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .card-title i,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .card-title i,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .card-title i,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .card-title i {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 34px;
                    height: 34px;
                    margin: 0 !important;
                    border-radius: 9px;
                    background: var(--incident-navy);
                    color: #fff;
                    box-shadow: 0 5px 12px rgba(11,41,66,.18);
                }
                .incidents-workspace .incident-action-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 14px 16px;
                    margin-bottom: 16px;
                    border: 1px solid var(--incident-line);
                    border-radius: 15px;
                    background: linear-gradient(120deg, #fff 0%, #f5f9fc 100%);
                    box-shadow: 0 8px 20px rgba(15,47,79,.06);
                }
                .incidents-workspace .incident-action-bar .btn-primary,
                .incidents-workspace .incident-action-bar .btn-secondary,
                .incidents-workspace .incident-action-bar .btn-success {
                    border-radius: 10px;
                    min-height: 40px;
                    font-weight: 700;
                    box-shadow: 0 5px 13px rgba(15,47,79,.12);
                }
                .incidents-workspace .incident-kpi-grid {
                    display: grid;
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                    gap: 12px;
                    margin-bottom: 18px;
                }
                .incidents-workspace .incident-kpi-grid .kpi-card {
                    min-height: 108px;
                    margin: 0 !important;
                    padding: 16px !important;
                    border: 1px solid var(--incident-line) !important;
                    border-radius: 15px !important;
                    background: linear-gradient(145deg, #fff 0%, #f7fafc 100%) !important;
                    box-shadow: 0 8px 20px rgba(15,47,79,.07) !important;
                    transform: none !important;
                }
                .incidents-workspace .incident-kpi-grid .kpi-card::before {
                    width: 4px !important;
                    border-radius: 0 15px 15px 0;
                }
                .incidents-workspace .incident-kpi-grid .kpi-card:hover {
                    border-color: #b9cbd9 !important;
                    box-shadow: 0 12px 26px rgba(15,47,79,.11) !important;
                    transform: translateY(-2px) !important;
                }
                .incidents-workspace .incident-filter-card {
                    background: linear-gradient(135deg, #f7fafc 0%, #fff 100%) !important;
                }
                .incidents-workspace .incident-filter-card .card-body { padding: 17px 18px; }
                .incidents-workspace .incident-filter-card label {
                    color: #31465a !important;
                    font-size: .76rem !important;
                    font-weight: 800 !important;
                }
                .incidents-workspace .incident-filter-card label i { color: var(--incident-red); }
                .incidents-workspace .incident-filter-card .form-input,
                .incidents-workspace .incidents-list-toolbar .form-input {
                    min-height: 42px;
                    border: 1.5px solid #cbd9e5;
                    border-radius: 10px;
                    background-color: #fff;
                    color: var(--incident-ink);
                    font-size: .82rem;
                    box-shadow: 0 2px 5px rgba(15,47,79,.035);
                    transition: border-color .18s ease, box-shadow .18s ease;
                }
                .incidents-workspace .incident-filter-card .form-input:focus,
                .incidents-workspace .incidents-list-toolbar .form-input:focus {
                    border-color: var(--incident-navy-2);
                    box-shadow: 0 0 0 3px rgba(18,63,99,.12);
                    outline: none;
                }
                .incidents-workspace .incidents-list-toolbar {
                    display: flex;
                    align-items: flex-end;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .incidents-workspace .incident-list-filter-field {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .incidents-workspace .incident-list-filter-field label {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #3b5266;
                    font-size: .69rem;
                    font-weight: 800;
                }
                .incidents-workspace .incident-list-filter-field label i { color: var(--incident-red); }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .table-responsive,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .table-wrapper,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .table-wrapper,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .table-wrapper {
                    overflow: auto;
                    max-height: 68vh;
                    border: 1px solid #d7e2eb;
                    border-radius: 13px;
                    background: #fff;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,.7);
                    scrollbar-width: thin;
                    scrollbar-color: #91a9ba #edf3f7;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .data-table,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .data-table,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .data-table,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .data-table {
                    width: 100%;
                    margin: 0;
                    border: 0;
                    border-collapse: separate;
                    border-spacing: 0;
                    color: var(--incident-ink);
                    font-size: .78rem;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .data-table thead th,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .data-table thead th,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .data-table thead th,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .data-table thead th {
                    position: sticky;
                    top: 0;
                    z-index: 3;
                    padding: 13px 12px;
                    border: 0;
                    border-inline-end: 1px solid rgba(255,255,255,.11);
                    border-bottom: 3px solid var(--incident-gold);
                    background: linear-gradient(180deg, var(--incident-navy-2) 0%, var(--incident-navy) 100%) !important;
                    color: #fff !important;
                    font-size: .74rem;
                    font-weight: 800;
                    line-height: 1.45;
                    text-align: center;
                    white-space: nowrap;
                    text-shadow: 0 1px 1px rgba(0,0,0,.2);
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .data-table tbody td,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .data-table tbody td,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .data-table tbody td,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .data-table tbody td {
                    padding: 11px 12px;
                    border: 0;
                    border-inline-end: 1px solid #edf2f6;
                    border-bottom: 1px solid #e5edf3;
                    background: #fff;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 1.65;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .data-table tbody tr:nth-child(even) td,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .data-table tbody tr:nth-child(even) td,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .data-table tbody tr:nth-child(even) td,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .data-table tbody tr:nth-child(even) td {
                    background: #f8fbfd;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .data-table tbody tr:hover td,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .data-table tbody tr:hover td,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .data-table tbody tr:hover td,
                .incidents-workspace #incidents-tab-content[data-tab="annual-log"] .data-table tbody tr:hover td {
                    background: #fff8ed;
                }
                .incidents-workspace #incidents-tab-content[data-tab="registry"] .data-table .btn-icon,
                .incidents-workspace #incidents-tab-content[data-tab="detailed-log"] .data-table .btn-icon,
                .incidents-workspace #incidents-tab-content[data-tab="incidents-list"] .data-table .btn-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 9px;
                    box-shadow: 0 4px 10px rgba(15,47,79,.12);
                }
                .incidents-workspace .incident-annual-summary {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0,1fr));
                    gap: 13px;
                    margin-bottom: 20px;
                }
                .incidents-workspace .incident-annual-summary > div {
                    position: relative;
                    overflow: hidden;
                    min-height: 118px;
                    padding: 18px !important;
                    border: 1px solid var(--incident-line) !important;
                    border-radius: 15px !important;
                    background: linear-gradient(145deg, #fff 0%, #f4f8fb 100%) !important;
                    box-shadow: 0 8px 20px rgba(15,47,79,.07);
                }
                .incidents-workspace .incident-annual-summary > div::after {
                    content: "";
                    position: absolute;
                    inset-inline-end: -22px;
                    bottom: -28px;
                    width: 82px;
                    height: 82px;
                    border-radius: 50%;
                    background: rgba(200,30,58,.055);
                }
                [data-theme="dark"] .incidents-workspace {
                    --incident-ink: #e6edf4;
                    --incident-muted: #a8b8c7;
                    --incident-line: #344b5e;
                    --incident-surface: #172736;
                    --incident-canvas: #101d29;
                }
                [data-theme="dark"] .incidents-workspace #incidents-tab-content.incident-identity-surface .content-card,
                [data-theme="dark"] .incidents-workspace #incidents-tab-content.incident-identity-surface .card-header,
                [data-theme="dark"] .incidents-workspace .incident-action-bar,
                [data-theme="dark"] .incidents-workspace .incident-filter-card,
                [data-theme="dark"] .incidents-workspace .incident-kpi-grid .kpi-card,
                [data-theme="dark"] .incidents-workspace .incident-annual-summary > div {
                    background: #172736 !important;
                    color: #e6edf4;
                }
                [data-theme="dark"] .incidents-workspace #incidents-tab-content.incident-identity-surface .data-table tbody td {
                    border-color: #2d4355;
                    background: #172736;
                    color: #e6edf4;
                }
                [data-theme="dark"] .incidents-workspace #incidents-tab-content.incident-identity-surface .data-table tbody tr:nth-child(even) td { background: #1b3041; }
                [data-theme="dark"] .incidents-workspace #incidents-tab-content.incident-identity-surface .data-table tbody tr:hover td { background: #35402f; }
                [data-theme="dark"] .incidents-workspace #incidents-tab-content.incident-identity-surface .card-title,
                [data-theme="dark"] .incidents-workspace .incident-filter-card label,
                [data-theme="dark"] .incidents-workspace .incident-list-filter-field label { color: #e6edf4 !important; }
                [data-theme="dark"] .incidents-workspace .incident-filter-card .form-input,
                [data-theme="dark"] .incidents-workspace .incidents-list-toolbar .form-input {
                    border-color: #466176;
                    background: #102231;
                    color: #f1f5f9;
                }
                @media (max-width: 1100px) {
                    .incidents-workspace .incident-kpi-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
                }
                @media (max-width: 768px) {
                    .incidents-workspace .incidents-tabs-container { border-radius: 14px; padding: 6px; }
                    .incidents-workspace .incidents-tabs-nav .tab-btn { min-height: 43px; padding: 8px 11px; font-size: .76rem; }
                    .incidents-workspace .incidents-tabs-nav .tab-btn i { width: 26px; height: 26px; }
                    .incidents-workspace .incident-action-bar { align-items: stretch; flex-direction: column; }
                    .incidents-workspace .incident-action-bar > div { display: grid; grid-template-columns: 1fr 1fr; }
                    .incidents-workspace .incident-kpi-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
                    .incidents-workspace .incident-annual-summary { grid-template-columns: 1fr; }
                    .incidents-workspace .incidents-list-toolbar { width: 100%; display: grid; grid-template-columns: 1fr; }
                    .incidents-workspace .incidents-list-toolbar .form-input { width: 100%; max-width: none !important; }
                    .incidents-workspace #incidents-tab-content.incident-identity-surface .card-header > div { align-items: flex-start; gap: 12px; flex-direction: column; }
                    .incidents-workspace #incidents-tab-content.incident-identity-surface .card-body { padding: 13px; }
                }
                @media (max-width: 460px) {
                    .incidents-workspace .incident-kpi-grid { grid-template-columns: 1fr; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .incidents-workspace *, .incidents-workspace *::before, .incidents-workspace *::after { transition: none !important; }
                }
                .incident-professional-modal {
                    --im-navy:#0b2942;--im-blue:#123f63;--im-red:#c81e3a;--im-gold:#f4b942;--im-ink:#172033;--im-line:#dbe5ee;
                    position:fixed!important;inset:0!important;z-index:10000!important;display:flex!important;align-items:center!important;justify-content:center!important;
                    padding:clamp(10px,2vw,24px)!important;background:rgba(5,20,32,.74)!important;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);
                    font-family:"Cairo","Segoe UI",Tahoma,sans-serif;
                }
                .incident-professional-modal .modal-content {
                    display:flex!important;flex-direction:column;width:min(100%,980px)!important;max-width:none!important;max-height:calc(100dvh - 32px)!important;overflow:hidden!important;
                    border:1px solid rgba(255,255,255,.42)!important;border-radius:20px!important;background:#fff!important;color:var(--im-ink)!important;
                    box-shadow:0 30px 75px rgba(2,18,30,.34),0 8px 24px rgba(2,18,30,.16)!important;
                }
                .incident-modal-selector .modal-content,.incident-modal-approval .modal-content{width:min(100%,800px)!important}
                .incident-modal-registry-details .modal-content,.incident-modal-details .modal-content{width:min(100%,860px)!important}
                .incident-modal-notification .modal-content,.incident-modal-safety-alert .modal-content,.incident-modal-investigation .modal-content{width:min(100%,1080px)!important}
                .incident-professional-modal .modal-header {
                    position:relative;flex:0 0 auto;display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:82px;padding:18px 24px!important;
                    border:0!important;border-bottom:4px solid var(--im-gold)!important;background:radial-gradient(circle at 12% -25%,rgba(244,185,66,.35),transparent 32%),linear-gradient(125deg,var(--im-navy),var(--im-blue) 78%,#185376)!important;color:#fff!important;
                }
                .incident-professional-modal .modal-header::after{content:"INCIDENT CONTROL";position:absolute;inset-inline-end:72px;bottom:8px;color:rgba(255,255,255,.48);font-size:.55rem;font-weight:800;letter-spacing:.16em}
                .incident-professional-modal .modal-title{display:flex!important;align-items:center;gap:11px;margin:0!important;padding:0!important;color:#fff!important;font-size:clamp(1.02rem,2vw,1.35rem)!important;font-weight:800!important;line-height:1.5}
                .incident-professional-modal .modal-title i{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;margin:0!important;border:1px solid rgba(255,255,255,.22);border-radius:11px;background:rgba(255,255,255,.11);color:#fde68a!important}
                .incident-professional-modal .modal-close{position:relative;z-index:2;display:inline-flex!important;align-items:center;justify-content:center;width:40px;height:40px;min-width:40px;margin:0!important;padding:0!important;border:1px solid rgba(255,255,255,.3)!important;border-radius:11px!important;background:rgba(255,255,255,.1)!important;color:#fff!important}
                .incident-professional-modal .modal-close:hover{background:var(--im-red)!important}
                .incident-professional-modal .modal-body{flex:1 1 auto;min-height:0;padding:clamp(16px,2.6vw,28px)!important;overflow:auto!important;background:linear-gradient(rgba(219,229,238,.32) 1px,transparent 1px),linear-gradient(90deg,rgba(219,229,238,.22) 1px,transparent 1px),#f4f7fa!important;background-size:26px 26px!important;color:var(--im-ink)!important;scrollbar-width:thin}
                .incident-professional-modal .modal-footer,.incident-professional-modal .form-actions-centered{flex:0 0 auto;display:flex!important;align-items:center;justify-content:center!important;flex-wrap:wrap;gap:10px!important;padding:15px 22px!important;border-top:1px solid var(--im-line)!important;background:#fff!important}
                .incident-professional-modal .modal-body>.grid>div{min-height:48px;padding:13px 15px;border:1px solid var(--im-line);border-radius:11px;background:#fff;box-shadow:0 4px 12px rgba(15,47,79,.045)}
                .incident-professional-modal label,.incident-professional-modal strong{color:#30465a!important;font-weight:800!important}
                .incident-professional-modal .form-input,.incident-professional-modal input:not([type=checkbox]):not([type=radio]),.incident-professional-modal select,.incident-professional-modal textarea{min-height:44px;border:1.5px solid #c8d7e3!important;border-radius:10px!important;background:#fff!important;color:var(--im-ink)!important;box-shadow:0 2px 5px rgba(15,47,79,.035)!important}
                .incident-professional-modal textarea{min-height:92px;resize:vertical}.incident-professional-modal .form-input:focus,.incident-professional-modal input:focus,.incident-professional-modal select:focus,.incident-professional-modal textarea:focus{border-color:var(--im-blue)!important;outline:none!important;box-shadow:0 0 0 3px rgba(18,63,99,.13)!important}
                .incident-professional-modal .table-wrapper,.incident-professional-modal .table-responsive{max-width:100%;overflow:auto!important;border:1px solid #d4e0e9;border-radius:13px;background:#fff}.incident-professional-modal .data-table{min-width:680px;margin:0;border:0}
                .incident-professional-modal .data-table thead th{position:sticky;top:0;z-index:2;padding:13px 12px!important;border:0!important;border-inline-end:1px solid rgba(255,255,255,.12)!important;border-bottom:3px solid var(--im-gold)!important;background:linear-gradient(180deg,var(--im-blue),var(--im-navy))!important;color:#fff!important;font-size:.76rem;font-weight:800;white-space:nowrap}
                .incident-professional-modal .data-table tbody td{padding:11px 12px!important;border-color:#e5edf3!important;background:#fff;color:var(--im-ink);vertical-align:middle}.incident-professional-modal .data-table tbody tr:nth-child(even) td{background:#f8fbfd}.incident-professional-modal .data-table tbody tr:hover td{background:#fff8ed}
                .incident-professional-modal .notification-section-title,.incident-professional-modal .safety-alert-grey-label{border-radius:10px!important;background:linear-gradient(115deg,var(--im-blue),var(--im-navy))!important;color:#fff!important;box-shadow:0 6px 14px rgba(11,41,66,.13)}
                .incident-professional-modal .safety-alert-grey-bar{height:4px!important;background:linear-gradient(90deg,var(--im-red),var(--im-gold))!important}.incident-professional-modal .safety-alert-field,.incident-professional-modal .notification-field,.incident-professional-modal .investigation-section{border:1px solid var(--im-line)!important;border-radius:13px!important;background:#fff!important;box-shadow:0 6px 18px rgba(15,47,79,.06)!important}
                .incident-professional-modal .btn-primary,.incident-professional-modal .btn-secondary,.incident-professional-modal .btn-success,.incident-professional-modal .btn-danger{min-height:42px;border-radius:10px!important;font-weight:800!important;box-shadow:0 5px 13px rgba(15,47,79,.13)}.incident-professional-modal .btn-primary{background:linear-gradient(135deg,#174f72,var(--im-navy))!important}.incident-professional-modal .btn-danger{background:linear-gradient(135deg,#dc314a,#a9142c)!important}
                [data-theme=dark] .incident-professional-modal .modal-content,[data-theme=dark] .incident-professional-modal .modal-footer{background:#152635!important;color:#e7eef5!important}[data-theme=dark] .incident-professional-modal .modal-body{background:#0f1e2b!important;color:#e7eef5!important}[data-theme=dark] .incident-professional-modal .modal-body>.grid>div,[data-theme=dark] .incident-professional-modal .safety-alert-field,[data-theme=dark] .incident-professional-modal .notification-field,[data-theme=dark] .incident-professional-modal .investigation-section,[data-theme=dark] .incident-professional-modal form>div[style*="background: white"]{background:#182d3e!important;color:#e7eef5!important}[data-theme=dark] .incident-professional-modal label,[data-theme=dark] .incident-professional-modal strong{color:#dce7ef!important}[data-theme=dark] .incident-professional-modal .form-input,[data-theme=dark] .incident-professional-modal input:not([type=checkbox]):not([type=radio]),[data-theme=dark] .incident-professional-modal select,[data-theme=dark] .incident-professional-modal textarea{border-color:#466176!important;background:#102231!important;color:#f1f5f9!important}
                @media(max-width:768px){.incident-professional-modal{align-items:stretch!important;padding:8px!important}.incident-professional-modal .modal-content{width:100%!important;max-height:calc(100dvh - 16px)!important;border-radius:15px!important}.incident-professional-modal .modal-header{min-height:70px;padding:14px 15px!important}.incident-professional-modal .modal-header::after{display:none}.incident-professional-modal .modal-body{padding:14px!important}.incident-professional-modal .modal-body .grid-cols-2,.incident-professional-modal .modal-body .grid-cols-3,.incident-professional-modal .modal-body .grid-cols-4{grid-template-columns:1fr!important}.incident-professional-modal .modal-footer button,.incident-professional-modal .form-actions-centered button{flex:1 1 145px}}
            </style>
        `;
    },

    async renderMainView() {
        // الحصول على التبويبات المسموح بها للمستخدم
        const allowedTabs = this.getAllowedTabs();
        const initialTab = allowedTabs[0] || 'incidents-list';

        return `
            ${this.renderIncidentIdentityStyles_()}
            <div class="incidents-workspace" dir="rtl">
            <div class="tabs-container incidents-tabs-container">
                <div class="tabs-nav incidents-tabs-nav" role="tablist" aria-label="تبويبات مديول الحوادث">
                    ${allowedTabs.includes('registry') ? `
                    <button class="tab-btn ${initialTab === 'registry' ? 'active' : ''}" role="tab" aria-selected="${initialTab === 'registry' ? 'true' : 'false'}" data-tab="registry" onclick="Incidents.switchTab('registry')">
                        <i class="fas fa-clipboard-list"></i>
                        سجل الحوادث
                    </button>
                    ` : ''}
                    ${allowedTabs.includes('detailed-log') ? `
                    <button class="tab-btn ${initialTab === 'detailed-log' ? 'active' : ''}" role="tab" aria-selected="${initialTab === 'detailed-log' ? 'true' : 'false'}" data-tab="detailed-log" onclick="Incidents.switchTab('detailed-log')">
                        <i class="fas fa-clipboard-list"></i>
                        سجل الحوادث التفصيلي
                    </button>
                    ` : ''}
                    ${allowedTabs.includes('incidents-list') ? `
                    <button class="tab-btn ${initialTab === 'incidents-list' ? 'active' : ''}" role="tab" aria-selected="${initialTab === 'incidents-list' ? 'true' : 'false'}" data-tab="incidents-list" onclick="Incidents.switchTab('incidents-list')">
                        <i class="fas fa-list"></i>
                        قائمة الحوادث
                    </button>
                    ` : ''}
                    ${allowedTabs.includes('annual-log') ? `
                    <button class="tab-btn ${initialTab === 'annual-log' ? 'active' : ''}" role="tab" aria-selected="${initialTab === 'annual-log' ? 'true' : 'false'}" data-tab="annual-log" onclick="Incidents.switchTab('annual-log')">
                        <i class="fas fa-calendar-alt"></i>
                        سجل الحوادث السنوي
                    </button>
                    ` : ''}
                    ${allowedTabs.includes('analysis') ? `
                    <button class="tab-btn ${initialTab === 'analysis' ? 'active' : ''}" role="tab" aria-selected="${initialTab === 'analysis' ? 'true' : 'false'}" data-tab="analysis" onclick="Incidents.switchTab('analysis')">
                        <i class="fas fa-chart-line"></i>
                        تحليل الحوادث
                    </button>
                    ` : ''}
                    ${allowedTabs.includes('approvals') ? `
                    <button class="tab-btn ${initialTab === 'approvals' ? 'active' : ''}" role="tab" aria-selected="${initialTab === 'approvals' ? 'true' : 'false'}" data-tab="approvals" onclick="Incidents.switchTab('approvals')">
                        <i class="fas fa-check-circle"></i>
                        الموافقات
                    </button>
                    ` : ''}
                    ${allowedTabs.includes('safety-alerts') ? `
                    <button class="tab-btn ${initialTab === 'safety-alerts' ? 'active' : ''}" role="tab" aria-selected="${initialTab === 'safety-alerts' ? 'true' : 'false'}" data-tab="safety-alerts" onclick="Incidents.switchTab('safety-alerts')">
                        <i class="fas fa-exclamation-triangle"></i>
                        التنبيه عن حادث
                    </button>
                    ` : ''}
                </div>
            </div>
            <div id="incidents-tab-content" class="mt-6 ${['registry', 'detailed-log', 'incidents-list', 'annual-log'].includes(initialTab) ? 'incident-identity-surface' : ''}" data-tab="${initialTab}">
                ${await this.renderTabContent(initialTab)}
            </div>
            </div>
        `;
    },

    // الحصول على التبويبات المسموح بها للمستخدم
    getAllowedTabs() {
        const user = AppState.currentUser;
        if (!user) return ['incidents-list']; // افتراضي: قائمة الحوادث فقط

        // مدير النظام لديه صلاحيات كاملة
        if (user.role === 'admin' ||
            (user.permissions && (user.permissions.admin === true || user.permissions['manage-modules'] === true))) {
            return ['registry', 'detailed-log', 'incidents-list', 'annual-log', 'analysis', 'approvals', 'safety-alerts'];
        }

        // التحقق من وجود صلاحية الوصول للمديول أولاً
        if (typeof Permissions !== 'undefined' && !Permissions.hasAccess('incidents')) {
            return [];
        }

        // الحصول على الصلاحيات التفصيلية من نظام الصلاحيات الجديد
        const allowedTabs = [];
        const allTabs = ['registry', 'detailed-log', 'incidents-list', 'annual-log', 'analysis', 'approvals', 'safety-alerts'];

        allTabs.forEach(tab => {
            if (typeof Permissions !== 'undefined' && Permissions.hasDetailedPermission('incidents', tab)) {
                allowedTabs.push(tab);
            }
        });

        // إذا لم توجد صلاحيات تفصيلية، نعطي الوصول الكامل (للتوافق مع المستخدمين القدامى)
        if (allowedTabs.length === 0) {
            return allTabs;
        }

        return allowedTabs;
    },

    async switchTab(tabName) {
        this.currentTab = tabName;

        // Update tab buttons
        document.querySelectorAll('.tabs-nav .tab-btn').forEach(btn => {
            btn.classList.remove('active');
            const isActive = btn.dataset.tab === tabName;
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            btn.tabIndex = isActive ? 0 : -1;
            if (isActive) {
                btn.classList.add('active');
            }
        });

        // Render tab content
        const contentContainer = document.getElementById('incidents-tab-content');
        if (contentContainer) {
            contentContainer.dataset.tab = tabName;
            contentContainer.classList.toggle('incident-identity-surface', ['registry', 'detailed-log', 'incidents-list', 'annual-log'].includes(tabName));
            contentContainer.innerHTML = await this.renderTabContent(tabName);
            this.applyModuleI18n(contentContainer);
            this.setupTabEventListeners(tabName);
        }
    },

    async renderTabContent(tabName) {
        try {
            // التحقق من الصلاحيات قبل عرض المحتوى
            const allowedTabs = this.getAllowedTabs();
            if (!allowedTabs.includes(tabName)) {
                return `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="text-center py-8">
                                <i class="fas fa-lock text-4xl text-gray-400 mb-4"></i>
                                <p class="text-gray-600">ليس لديك صلاحية للوصول إلى هذا التبويب.</p>
                                <p class="text-sm text-gray-500 mt-2">يرجى التواصل مع مدير النظام للحصول على الصلاحيات المطلوبة.</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            switch (tabName) {
                case 'registry':
                    return await this.renderRegistryTab();
                case 'detailed-log':
                    return await this.renderDetailedLogTab();
                case 'incidents-list':
                    return await this.renderIncidentsListTab();
                case 'annual-log':
                    return await this.renderAnnualLogTab();
                case 'analysis':
                    return await this.renderAnalysisTab();
                case 'approvals':
                    return await this.renderApprovalsTab();
                case 'safety-alerts':
                    return await this.renderSafetyAlertsTab();
                default:
                    return await this.renderIncidentsListTab();
            }
        } catch (error) {
            Utils.safeError(`خطأ في عرض محتوى التبويب ${tabName}:`, error);
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">حدث خطأ في تحميل المحتوى</h2>
                            <p class="text-gray-600">${error.message || 'خطأ غير معروف'}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    async renderAnnualLogTab() {
        const analytics = this.buildThreeYearAnalytics();
        const { yearlyStats, totals, severityTotals } = analytics;
        const improvementInfo = this.formatImprovementValue(analytics.currentImprovement);
        const hasIncidents = totals.totalIncidents > 0;

        const yearlyRows = yearlyStats.map((stat) => {
            const improvement = this.formatImprovementValue(stat.improvementVsPrevious);
            return `
                <tr>
                    <td>${stat.year}</td>
                    <td>${stat.total}</td>
                    <td>${stat.closed}</td>
                    <td>${stat.closureRate.toFixed(1)}%</td>
                    <td>
                        <div class="space-y-1 text-xs">
                            <div><span class="inline-block w-2 h-2 rounded-full bg-red-500 ml-1"></span>عالية: ${stat.severity.high}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-yellow-500 ml-1"></span>متوسطة: ${stat.severity.medium}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-blue-500 ml-1"></span>منخفضة: ${stat.severity.low}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-gray-500 ml-1"></span>أخرى: ${stat.severity.other}</div>
                        </div>
                    </td>
                    <td>
                        <span class="font-semibold ${improvement.className}">${improvement.label}</span>
                    </td>
                </tr>
            `;
        }).join('');

        const yearlyTableBody = hasIncidents
            ? yearlyRows
            : '<tr><td colspan="6" class="text-center text-gray-500 py-6">لا توجد بيانات مسجلة لآخر ٣ سنوات.</td></tr>';

        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between gap-3 flex-wrap">
                        <h2 class="card-title">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            سجل الحوادث السنوي (آخر ٣ سنوات)
                        </h2>
                        <div class="flex items-center gap-2">
                            <button id="incidents-report-preview" class="btn-secondary">
                                <i class="fas fa-eye ml-2"></i>
                                معاينة التقرير
                            </button>
                            <button class="btn-primary" data-incidents-export="pdf">
                                <i class="fas fa-file-pdf ml-2"></i>
                                PDF
                            </button>
                            <button class="btn-primary" data-incidents-export="excel">
                                <i class="fas fa-file-excel ml-2"></i>
                                Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 incident-annual-summary">
                        <div class="border border-gray-200 rounded-lg p-4 bg-white">
                            <p class="text-xs text-gray-500 mb-1">إجمالي الحوادث</p>
                            <p class="text-3xl font-bold text-gray-900">${totals.totalIncidents}</p>
                            <p class="text-xs text-gray-400 mt-1">الفترة: ${totals.rangeLabel}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4 bg-white">
                            <p class="text-xs text-gray-500 mb-1">معدل الإغلاق</p>
                            <p class="text-3xl font-bold text-green-600">${totals.closureRate.toFixed(1)}%</p>
                            <p class="text-xs text-gray-400 mt-1">عدد الحوادث المغلقة: ${totals.closedIncidents}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4 bg-white">
                            <p class="text-xs text-gray-500 mb-1">معدل التحسين عن العام السابق</p>
                            <p class="text-3xl font-bold ${improvementInfo.className}">${improvementInfo.label}</p>
                            <p class="text-xs text-gray-400 mt-1">يعتمد على مقارنة ${yearlyStats[0]?.year || ''} مع ${yearlyStats[1]?.year || ''}</p>
                        </div>
                    </div>
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>السنة</th>
                                    <th>إجمالي الحوادث</th>
                                    <th>الحوادث المغلقة</th>
                                    <th>معدل الإغلاق</th>
                                    <th>توزيع الشدة</th>
                                    <th>معدل التحسين</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${yearlyTableBody}
                            </tbody>
                        </table>
                    </div>
                    <p class="text-xs text-gray-500 mt-3">
                        * يتم احتساب معدل التحسين بناءً على انخفاض عدد الحوادث الإجمالي مقارنة بالعام السابق (زيادة العدد تعني تراجع الأداء).
                    </p>
                </div>
            </div>
        `;
    },

    async renderDetailedLogTab() {
        const analytics = this.buildThreeYearAnalytics();
        const formatDate = (date) => {
            if (!date) return '-';
            try {
                if (typeof Utils !== 'undefined') {
                    if (typeof Utils.formatDateTime === 'function') {
                        return Utils.formatDateTime(date instanceof Date ? date.toISOString() : date);
                    }
                    if (typeof Utils.formatDate === 'function') {
                        return Utils.formatDate(date instanceof Date ? date.toISOString() : date);
                    }
                }
            } catch (error) {
                // تجاهل أي أخطاء تنسيق
            }
            const parsed = date instanceof Date ? date : new Date(date);
            if (Number.isNaN(parsed.getTime())) return '-';
            return parsed.toLocaleDateString('ar-SA');
        };

        const incidentRows = analytics.incidents.map(({ incident, date, year }) => {
            const severityClass = this.getSeverityBadgeClass(incident?.severity);
            const statusClass = this.getStatusBadgeClass(incident?.status);
            const incidentId = incident?.id || '';
            const actionsCell = incidentId ? `
                <div class="flex items-center gap-2 justify-end">
                    <button onclick="Incidents.viewIncident('${incidentId}')" class="btn-icon btn-icon-info" title="معاينة">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Incidents.exportPDF('${incidentId}')" class="btn-icon btn-icon-primary" title="تصدير PDF">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            ` : '<span class="text-xs text-gray-400">غير متاح</span>';
            return `
                <tr>
                    <td>${year}</td>
                    <td>${formatDate(date)}</td>
                    <td>${Utils.escapeHTML(incident?.title || '-')}</td>
                    <td>${Utils.escapeHTML(incident?.location || '-')}</td>
                    <td>
                        <span class="badge badge-${severityClass}">
                            ${Utils.escapeHTML(incident?.severity || '-')}
                        </span>
                    </td>
                    <td>
                        <span class="badge badge-${statusClass}">
                            ${Utils.escapeHTML(incident?.status || '-')}
                        </span>
                    </td>
                    <td>${actionsCell}</td>
                </tr>
            `;
        }).join('');

        const incidentTableBody = analytics.incidents.length === 0
            ? '<tr><td colspan="7" class="text-center text-gray-500 py-6">لا توجد حوادث مسجلة خلال آخر ٣ سنوات.</td></tr>'
            : incidentRows;

        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-clipboard-list ml-2"></i>
                            سجل الحوادث التفصيلي (آخر ٣ سنوات)
                        </h2>
                        <span class="text-xs text-gray-500">
                            ${analytics.incidents.length} حادث خلال الفترة
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-wrapper" style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>السنة</th>
                                    <th>التاريخ</th>
                                    <th>العنوان</th>
                                    <th>الموقع</th>
                                    <th>الشدة</th>
                                    <th>الحالة</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${incidentTableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    async renderIncidentsListTab() {
        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2"></i>
                            قائمة الحوادث
                        </h2>
                        <div class="flex items-center gap-4 incidents-list-toolbar">
                            <div class="incident-list-filter-field">
                                <label for="incidents-search"><i class="fas fa-search"></i> بحث سريع</label>
                                <input type="text" id="incidents-search" class="form-input" style="min-width: 260px; max-width: 300px;" placeholder="العنوان، الموقع، المبلّغ...">
                            </div>
                            <div class="incident-list-filter-field">
                                <label for="incidents-filter-status"><i class="fas fa-filter"></i> حالة الحادث</label>
                                <select id="incidents-filter-status" class="form-input" style="min-width: 180px; max-width: 210px;">
                                    <option value="">جميع الحالات</option>
                                    <option value="مفتوح">مفتوح</option>
                                    <option value="قيد التحقيق">قيد التحقيق</option>
                                    <option value="تحقيق منتهي">تحقيق منتهي</option>
                                    <option value="مكتمل">مكتمل</option>
                                    <option value="مغلق">مغلق</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="incidents-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">جاري التحميل...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async renderAnalysisTab() {
        // بدء تحميل Chart.js مبكراً
        this._incidentEnsureChartJS().catch(() => {});

        // ✅ لوحة تحليلات احترافية بنفس نمط العيادة/الملاحظات (gradient header + فترات + فلاتر + KPI + مخططات + جدول + PDF)
        return `
        <div id="incident-analytics-root" style="font-family:inherit;">

            <!-- ══ شريط الأدوات ══ -->
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(220,38,38,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-triangle-exclamation" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">لوحة تحليل الحوادث</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">تحليل شامل • المواقع الأكثر تكراراً • الأجزاء المتضررة • الشدة • تصدير PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">الفترة:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">
                        ${['30','90','180','365','0'].map((v,i) => {
                            const labels=['30 يوم','3 أشهر','6 أشهر','سنة','الكل'];
                            const active=(this._incidentPeriod||'0')===v;
                            return `<button class="incident-period-btn" data-period="${v}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${active?'#fff':'rgba(255,255,255,0.15)'};color:${active?'#991b1b':'#fff'};">${labels[i]}</button>`;
                        }).join('')}
                    </div>
                    <button id="incident-toggle-filters-btn" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
                        <i class="fas fa-sliders-h"></i><span>فلاتر</span><span id="incident-filter-badge" style="display:none;background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">●</span>
                    </button>
                    <button id="incident-export-pdf-btn" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.25);color:#fff;font-size:0.78rem;font-weight:600;transition:all .2s;display:flex;align-items:center;gap:5px;" onmouseover="this.style.background='rgba(0,0,0,0.4)'" onmouseout="this.style.background='rgba(0,0,0,0.25)'">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button id="incident-analytics-refresh" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'" title="تحديث">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <!-- ══ لوحة الفلاتر ══ -->
            <div id="incident-filter-panel" style="display:none;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#dc2626;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#991b1b;">الفلاتر التفاعلية</span>
                        <span id="incident-filter-count" style="background:#fee2e2;color:#b91c1c;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button id="incident-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #fecaca;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;" onmouseover="this.style.background='#fef2f2';this.style.color='#dc2626'" onmouseout="this.style.background='#fff';this.style.color='#64748b'">
                        <i class="fas fa-times ml-1"></i>مسح الكل
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;">
                    ${[
                        {id:'incident-af-status',   icon:'fas fa-flag',           color:'#6366f1', label:'الحالة'},
                        {id:'incident-af-severity', icon:'fas fa-exclamation',    color:'#dc2626', label:'الشدة'},
                        {id:'incident-af-type',     icon:'fas fa-tag',            color:'#0d9488', label:'نوع الحادث'},
                        {id:'incident-af-dept',     icon:'fas fa-building',       color:'#f59e0b', label:'الإدارة'},
                        {id:'incident-af-factory',  icon:'fas fa-industry',       color:'#0891b2', label:'المصنع'},
                        {id:'incident-af-loc',      icon:'fas fa-map-marker-alt', color:'#8b5cf6', label:'الموقع'},
                    ].map(f=>`
                        <div>
                            <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">
                                <i class="${f.icon}" style="color:${f.color};margin-left:4px;"></i>${f.label}
                            </label>
                            <select id="${f.id}" style="width:100%;padding:7px 10px;border:1.5px solid #fecaca;border-radius:8px;font-size:0.82rem;background:#fff;color:#374151;cursor:pointer;" onfocus="this.style.borderColor='#dc2626'" onblur="this.style.borderColor='#fecaca'">
                                <option value="">الكل</option>
                            </select>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- ══ KPI Cards ══ -->
            <div id="incident-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <!-- ══ Row 1: الحالة + الاتجاه الزمني ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-flag" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">الحوادث حسب الحالة</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="incident-chart-status"></canvas>
                        <div id="incident-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">الاتجاه الزمني للحوادث (آخر 12 شهر)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="incident-chart-trend"></canvas>
                        <div id="incident-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 2: الشدة + نوع الحادث ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-gauge-high" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">الحوادث حسب الشدة</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="incident-chart-severity"></canvas>
                        <div id="incident-chart-severity-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-tags" style="color:#0d9488;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">حسب نوع الحادث (أعلى 10)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="incident-chart-type"></canvas>
                        <div id="incident-chart-type-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 3: المصنع + الإدارة ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-industry" style="color:#0891b2;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">حسب المصنع (أعلى 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="incident-chart-factory"></canvas>
                        <div id="incident-chart-factory-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-building" style="color:#f59e0b;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">حسب الإدارة (أعلى 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="incident-chart-dept"></canvas>
                        <div id="incident-chart-dept-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 4: نقاط الخطورة + الأجزاء المتضررة ══ -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;border:1.5px solid #e9d5ff;">
                    <div style="padding:14px 18px;background:linear-gradient(135deg,#4c1d95 0%,#7c3aed 100%);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-map-location-dot"></i>
                            </div>
                            <div>
                                <div style="font-weight:800;font-size:0.92rem;">نقاط الخطورة — المواقع الأكثر تكراراً</div>
                                <div style="font-size:0.7rem;opacity:0.85;">ترتيب حسب عدد الحوادث مع نسبة التكرار</div>
                            </div>
                        </div>
                        <span id="incident-hotspot-total-badge" style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;font-size:0.72rem;font-weight:700;"></span>
                    </div>
                    <div id="incident-hotspot-grid" style="padding:14px 16px;display:flex;flex-direction:column;gap:10px;max-height:420px;overflow-y:auto;">
                        <div style="text-align:center;padding:24px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
                    </div>
                    <div style="padding:0 12px 14px;">
                        <div style="position:relative;height:200px;">
                            <canvas id="incident-chart-hotspot"></canvas>
                            <div id="incident-chart-hotspot-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                        </div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;border:1.5px solid #fecaca;">
                    <div style="padding:14px 18px;background:linear-gradient(135deg,#991b1b 0%,#dc2626 100%);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                            <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-user-injured"></i>
                            </div>
                            <div>
                                <div style="font-weight:800;font-size:0.92rem;">الأجزاء المتضررة</div>
                                <div style="font-size:0.7rem;opacity:0.85;">توزيع إصابات الجسم حسب الحوادث</div>
                            </div>
                        </div>
                        <span id="incident-bodypart-total-badge" style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;font-size:0.72rem;font-weight:700;"></span>
                    </div>
                    <div style="padding:12px;position:relative;height:200px;border-bottom:1px solid #fee2e2;">
                        <canvas id="incident-chart-bodypart"></canvas>
                        <div id="incident-chart-bodypart-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات إصابات</div>
                    </div>
                    <div id="incident-bodypart-list" style="padding:12px 14px;max-height:280px;overflow-y:auto;">
                        <div style="text-align:center;padding:16px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
                    </div>
                </div>
            </div>

            <!-- ══ Row 5: الموقع (المكان الفرعي) ══ -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-map-marker-alt" style="color:#8b5cf6;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">حسب الموقع (المكان الفرعي — أعلى 10)</span>
                </div>
                <div style="padding:12px;position:relative;height:280px;">
                    <canvas id="incident-chart-loc"></canvas>
                    <div id="incident-chart-loc-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                </div>
            </div>

            <!-- ══ مقارنة سنوية (3 سنوات) ══ -->
            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-column" style="color:#b91c1c;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">المقارنة السنوية (آخر 3 سنوات)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="incident-chart-yearly"></canvas>
                    <div id="incident-chart-yearly-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">لا توجد بيانات</div>
                </div>
            </div>

            <!-- ══ جدول أحدث الحوادث ══ -->
            <div class="content-card" style="padding:0;overflow:hidden;">
                <div style="padding:13px 18px 12px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-list-ul" style="color:#dc2626;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">أحدث الحوادث</span>
                    </div>
                    <span id="incident-recent-count" style="background:#fef2f2;color:#b91c1c;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:700;"></span>
                </div>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
                        <thead>
                            <tr style="background:#fef2f2;">
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;white-space:nowrap;">التاريخ</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">نوع الحادث</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">الإدارة</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">المصنع</th>
                                <th style="padding:9px 12px;text-align:right;font-weight:700;color:#991b1b;">الموقع</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#991b1b;">الشدة</th>
                                <th style="padding:9px 12px;text-align:center;font-weight:700;color:#991b1b;">الحالة</th>
                            </tr>
                        </thead>
                        <tbody id="incident-recent-tbody">
                            <tr><td colspan="6" style="padding:24px;text-align:center;color:#94a3b8;">جاري التحميل...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;
    },

    // ═══════════════════════════════════════════════════════════════════
    // ✅ لوحة تحليلات الحوادث (نفس نمط العيادة/الملاحظات)
    // ═══════════════════════════════════════════════════════════════════

    /** تحميل Chart.js عند الحاجة */
    async _incidentEnsureChartJS() {
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

    /** المصدر الموحّد لبيانات الحوادث */
    _getIncidentsData() {
        try { if (typeof this.ensureData === 'function') this.ensureData(); } catch (e) {}
        return this.getCanonicalIncidents();
    },

    /** الدالة الرئيسية: تحديث لوحة التحليلات */
    async updateIncidentAnalyticsDashboard() {
        const root = document.getElementById('incident-analytics-root');
        if (!root) return;

        // ── 1. جمع البيانات ──
        const allIncidents = this._getIncidentsData();
        const period = parseInt(this._incidentPeriod || '0', 10);

        // ── 2. تصفية بالفترة ──
        const cutoff = period > 0 ? (() => { const d = new Date(); d.setDate(d.getDate() - period); return d; })() : null;
        const inPeriod = cutoff
            ? allIncidents.filter(r => { const d = this.getIncidentDateValue(r); return d && d >= cutoff; })
            : allIncidents.slice();

        // ── 3. ملء قوائم الفلاتر ──
        this._incidentPopulateFilters(inPeriod);

        // ── 4. تطبيق الفلاتر التفاعلية ──
        const filtered = this._incidentApplyFilters(inPeriod);
        const total = filtered.length;
        const countEl = document.getElementById('incident-filter-count');
        if (countEl) countEl.textContent = `${total} حادث`;

        // ── 5. حساب KPIs ──
        const byStatus = (s) => filtered.filter(r => this.normalizeStatus(r?.status) === s).length;
        const bySeverity = (s) => filtered.filter(r => this.normalizeSeverity(r?.severity) === s).length;
        const openCount = byStatus('open');
        const investigatingCount = byStatus('investigating');
        const closedCount = byStatus('closed');
        const highCount = bySeverity('high');
        const closureRate = total > 0 ? Math.round((closedCount / total) * 100) : 0;
        const now = new Date();
        const thisMonth = filtered.filter(r => {
            const d = this.getIncidentDateValue(r);
            return d && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        }).length;
        const monthsSet = new Set(filtered.map(r => {
            const d = this.getIncidentDateValue(r);
            return d ? `${d.getFullYear()}-${d.getMonth()}` : null;
        }).filter(Boolean));
        const avgPerMonth = monthsSet.size > 0 ? (total / monthsSet.size).toFixed(1) : 0;

        const kpiEl = document.getElementById('incident-kpi-strip');
        if (kpiEl) {
            const kpis = [
                { label:'إجمالي الحوادث', value:total,               icon:'fas fa-triangle-exclamation', color:'#dc2626', bg:'#fef2f2', border:'#fecaca' },
                { label:'مفتوحة',         value:openCount,            icon:'fas fa-folder-open',          color:'#f59e0b', bg:'#fffbeb', border:'#fde68a' },
                { label:'قيد التحقيق',    value:investigatingCount,   icon:'fas fa-magnifying-glass',     color:'#6366f1', bg:'#eef2ff', border:'#c7d2fe' },
                { label:'مغلقة',          value:closedCount,          icon:'fas fa-circle-check',         color:'#059669', bg:'#ecfdf5', border:'#a7f3d0' },
                { label:'عالية الشدة',    value:highCount,            icon:'fas fa-fire',                 color:'#b91c1c', bg:'#fef2f2', border:'#fca5a5' },
                { label:'معدل الإغلاق',   value:closureRate + '%',    icon:'fas fa-chart-pie',            color:'#0891b2', bg:'#ecfeff', border:'#a5f3fc' },
                { label:'هذا الشهر',      value:thisMonth,            icon:'fas fa-calendar-day',         color:'#db2777', bg:'#fdf2f8', border:'#fbcfe8' },
                { label:'متوسط شهري',     value:avgPerMonth,          icon:'fas fa-calendar-check',       color:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe' },
            ];
            kpiEl.innerHTML = kpis.map(k => `
                <div style="background:${k.bg};border:1px solid ${k.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:default;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.09)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
                    <div style="width:38px;height:38px;background:${k.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${k.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${k.color};line-height:1;">${k.value}</div>
                        <div style="font-size:0.68rem;color:#64748b;margin-top:2px;white-space:nowrap;">${k.label}</div>
                    </div>
                </div>`).join('');
        }

        // ── 6. تحميل Chart.js ──
        const loaded = await this._incidentEnsureChartJS();
        if (!loaded || typeof Chart === 'undefined') {
            root.insertAdjacentHTML('afterbegin', '<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:10px;"><i class="fas fa-exclamation-triangle" style="color:#d97706;"></i><span style="font-size:0.85rem;color:#92400e;">تعذّر تحميل مكتبة الرسوم البيانية. الأرقام أعلاه متاحة.</span></div>');
            return;
        }

        // ── 7. الرسوم البيانية ──
        // الحالة (Doughnut)
        const statusLabels = { open:'مفتوحة', investigating:'قيد التحقيق', closed:'مغلقة', other:'أخرى' };
        const statusMap = {};
        filtered.forEach(r => { const k = statusLabels[this.normalizeStatus(r?.status)] || 'أخرى'; statusMap[k] = (statusMap[k]||0)+1; });
        const statusColors = { 'مفتوحة':'rgba(245,158,11,0.85)', 'قيد التحقيق':'rgba(99,102,241,0.85)', 'مغلقة':'rgba(5,150,105,0.85)', 'أخرى':'rgba(148,163,184,0.8)' };
        this._iDoughnut('incident-chart-status', Object.keys(statusMap), Object.values(statusMap), Object.keys(statusMap).map(l=>statusColors[l]||'rgba(148,163,184,0.8)'));

        // الاتجاه الزمني (Trend)
        this._iTrend('incident-chart-trend', allIncidents);

        // الشدة (Doughnut)
        const sevLabels = { high:'عالية', medium:'متوسطة', low:'منخفضة', other:'أخرى' };
        const sevMap = {};
        filtered.forEach(r => { const k = sevLabels[this.normalizeSeverity(r?.severity)] || 'أخرى'; sevMap[k] = (sevMap[k]||0)+1; });
        const sevColors = { 'عالية':'rgba(220,38,38,0.85)', 'متوسطة':'rgba(245,158,11,0.85)', 'منخفضة':'rgba(59,130,246,0.85)', 'أخرى':'rgba(148,163,184,0.8)' };
        this._iDoughnut('incident-chart-severity', Object.keys(sevMap), Object.values(sevMap), Object.keys(sevMap).map(l=>sevColors[l]||'rgba(148,163,184,0.8)'));

        // نوع الحادث (HBar)
        const typeMap = this._iGroupBy(filtered, r => r.incidentType || r.type || 'غير محدد', 10);
        this._iHBar('incident-chart-type', typeMap.labels, typeMap.data, 'rgba(13,148,136,0.75)');

        // ✅ المصنع (site/factory) — حقل منفصل عن الموقع الفرعي
        const factoryMap = this._iGroupBy(filtered, r => r.siteName || r.factory || r.location || 'غير محدد', 8);
        this._iHBar('incident-chart-factory', factoryMap.labels, factoryMap.data, 'rgba(8,145,178,0.75)');

        // الإدارة (HBar)
        const deptMap = this._iGroupBy(filtered, r => r.department || 'غير محدد', 8);
        this._iHBar('incident-chart-dept', deptMap.labels, deptMap.data, 'rgba(245,158,11,0.75)');

        // ✅ الموقع = المكان الفرعي (sublocation) مع fallback للموقع العام
        const locMap = this._iGroupBy(filtered, r => r.sublocationName || r.sublocation || r.location || 'غير محدد', 10);
        this._iHBar('incident-chart-loc', locMap.labels, locMap.data, 'rgba(139,92,246,0.75)');

        // ── نقاط الخطورة والأجزاء المتضررة ──
        const hotspotStats = this._buildHotspotStats(filtered);
        const bodyPartStats = this._buildBodyPartStats(filtered);
        this._renderIncidentHotspotGrid(hotspotStats, total);
        this._renderIncidentBodyPartList(bodyPartStats, total);

        const hotspotBadge = document.getElementById('incident-hotspot-total-badge');
        if (hotspotBadge) hotspotBadge.textContent = `${hotspotStats.length} موقع`;
        const bodyBadge = document.getElementById('incident-bodypart-total-badge');
        if (bodyBadge) bodyBadge.textContent = `${bodyPartStats.filter(b => b.label !== 'غير محدد').length || bodyPartStats.length} جزء`;

        const hotspotTop = hotspotStats.slice(0, 6);
        this._iHBar('incident-chart-hotspot', hotspotTop.map(h => h.label), hotspotTop.map(h => h.count), 'rgba(124,58,237,0.8)');

        const bodyTop = bodyPartStats.filter(b => b.label !== 'غير محدد').slice(0, 8);
        const bodyChartData = bodyTop.length ? bodyTop : bodyPartStats.slice(0, 8);
        const bodyColors = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#0891b2', '#7c3aed', '#db2777'];
        if (bodyChartData.length) {
            this._iDoughnut(
                'incident-chart-bodypart',
                bodyChartData.map(b => b.label),
                bodyChartData.map(b => b.count),
                bodyChartData.map((_, i) => bodyColors[i % bodyColors.length] + 'd9')
            );
        } else {
            this._iDoughnut('incident-chart-bodypart', [], [], []);
        }

        // المقارنة السنوية (3 سنوات)
        this._iYearly('incident-chart-yearly', allIncidents);

        // ── 8. جدول أحدث الحوادث ──
        const recent = filtered.slice().sort((a, b) => {
            const da = this.getIncidentDateValue(a), db = this.getIncidentDateValue(b);
            return (db ? db.getTime() : 0) - (da ? da.getTime() : 0);
        }).slice(0, 20);
        const recentCountEl = document.getElementById('incident-recent-count');
        if (recentCountEl) recentCountEl.textContent = `${recent.length} حادث`;
        const tbody = document.getElementById('incident-recent-tbody');
        if (tbody) {
            const sevBadge = (sev) => {
                const k = this.normalizeSeverity(sev);
                const map = {
                    high:   ['عالية','#fef2f2','#b91c1c'],
                    medium: ['متوسطة','#fffbeb','#b45309'],
                    low:    ['منخفضة','#eff6ff','#1d4ed8'],
                    other:  ['غير محدد','#f1f5f9','#475569']
                };
                const [t,bg,c] = map[k] || map.other;
                return `<span style="background:${bg};color:${c};padding:2px 9px;border-radius:12px;font-size:0.72rem;font-weight:700;">${t}</span>`;
            };
            const statusBadge = (st) => {
                const k = this.normalizeStatus(st);
                const map = {
                    open:          ['مفتوحة','#fffbeb','#b45309'],
                    investigating: ['قيد التحقيق','#eef2ff','#4338ca'],
                    closed:        ['مغلقة','#ecfdf5','#047857'],
                    other:         ['أخرى','#f1f5f9','#475569']
                };
                const [t,bg,c] = map[k] || map.other;
                return `<span style="background:${bg};color:${c};padding:2px 9px;border-radius:12px;font-size:0.72rem;font-weight:700;">${t}</span>`;
            };
            tbody.innerHTML = recent.length === 0
                ? '<tr><td colspan="7" style="padding:24px;text-align:center;color:#94a3b8;">لا توجد حوادث في هذه الفترة</td></tr>'
                : recent.map((r, i) => {
                    const d = this.getIncidentDateValue(r);
                    const dateStr = d ? d.toLocaleDateString('ar-EG', { year:'numeric', month:'short', day:'numeric' }) : '—';
                    const rowBg = i%2===0 ? '#fff' : '#fafafa';
                    const factoryVal = r.siteName || r.factory || r.location || '—';
                    const locVal = r.sublocationName || r.sublocation || r.location || '—';
                    return `<tr style="border-bottom:1px solid #f8fafc;background:${rowBg};" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='${rowBg}'">
                        <td style="padding:9px 12px;white-space:nowrap;color:#374151;">${dateStr}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(r.incidentType || r.type || '—')}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(r.department || '—')}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(factoryVal)}</td>
                        <td style="padding:9px 12px;color:#374151;">${Utils.escapeHTML(locVal)}</td>
                        <td style="padding:9px 12px;text-align:center;">${sevBadge(r.severity)}</td>
                        <td style="padding:9px 12px;text-align:center;">${statusBadge(r.status)}</td>
                    </tr>`;
                }).join('');
        }
    },

    /** ملء قوائم الفلاتر */
    _incidentPopulateFilters(incidents) {
        const unique = fn => [...new Set(incidents.map(fn).filter(Boolean))].sort();
        const fill = (id, values) => {
            const el = document.getElementById(id); if (!el) return;
            const cur = el.value;
            el.innerHTML = '<option value="">الكل</option>' + values.map(v => `<option value="${Utils.escapeHTML(String(v))}"${v===cur?' selected':''}>${Utils.escapeHTML(String(v))}</option>`).join('');
        };
        // الحالة + الشدة ثابتة (canonical)
        const statusEl = document.getElementById('incident-af-status');
        if (statusEl) { const cur=statusEl.value; statusEl.innerHTML = `<option value="">الكل</option><option value="open"${cur==='open'?' selected':''}>مفتوحة</option><option value="investigating"${cur==='investigating'?' selected':''}>قيد التحقيق</option><option value="closed"${cur==='closed'?' selected':''}>مغلقة</option>`; }
        const sevEl = document.getElementById('incident-af-severity');
        if (sevEl) { const cur=sevEl.value; sevEl.innerHTML = `<option value="">الكل</option><option value="high"${cur==='high'?' selected':''}>عالية</option><option value="medium"${cur==='medium'?' selected':''}>متوسطة</option><option value="low"${cur==='low'?' selected':''}>منخفضة</option>`; }
        fill('incident-af-type',    unique(r => String(r.incidentType || r.type || '').trim()));
        fill('incident-af-dept',    unique(r => String(r.department || '').trim()));
        fill('incident-af-factory', unique(r => String(r.siteName || r.factory || r.location || '').trim()));
        fill('incident-af-loc',     unique(r => String(r.sublocationName || r.sublocation || r.location || '').trim()));
    },

    /** تطبيق الفلاتر التفاعلية */
    _incidentApplyFilters(incidents) {
        const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
        const fStatus  = get('incident-af-status');
        const fSev     = get('incident-af-severity');
        const fType    = get('incident-af-type');
        const fDept    = get('incident-af-dept');
        const fFactory = get('incident-af-factory');
        const fLoc     = get('incident-af-loc');
        const hasAny   = [fStatus, fSev, fType, fDept, fFactory, fLoc].some(v => v !== '');
        const badge    = document.getElementById('incident-filter-badge');
        if (badge) badge.style.display = hasAny ? 'inline' : 'none';
        return incidents.filter(r => {
            if (fStatus  && this.normalizeStatus(r?.status) !== fStatus) return false;
            if (fSev     && this.normalizeSeverity(r?.severity) !== fSev) return false;
            if (fType    && String(r.incidentType || r.type || '').trim() !== fType) return false;
            if (fDept    && String(r.department || '').trim() !== fDept) return false;
            if (fFactory && String(r.siteName || r.factory || r.location || '').trim() !== fFactory) return false;
            if (fLoc     && String(r.sublocationName || r.sublocation || r.location || '').trim() !== fLoc) return false;
            return true;
        });
    },

    /** مساعد: تجميع حسب دالة */
    _iGroupBy(arr, fn, limit = 0) {
        const map = {};
        arr.forEach(item => { const k = fn(item) || 'غير محدد'; map[k] = (map[k] || 0) + 1; });
        let entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
        if (limit > 0) entries = entries.slice(0, limit);
        return { labels: entries.map(e => e[0]), data: entries.map(e => e[1]) };
    },

    /** مساعد: Doughnut */
    _iDoughnut(canvasId, labels, data, colors) {
        const canvas = document.getElementById(canvasId), emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        if (!data.length || data.reduce((a, b) => a + b, 0) === 0) { canvas.style.display = 'none'; if (emptyEl) emptyEl.style.display = 'flex'; return; }
        if (emptyEl) emptyEl.style.display = 'none'; canvas.style.display = '';
        if (!this._incidentCharts) this._incidentCharts = {};
        try { if (this._incidentCharts[canvasId]) this._incidentCharts[canvasId].destroy(); } catch (e) {}
        const total = data.reduce((a, b) => a + b, 0);
        this._incidentCharts[canvasId] = new Chart(canvas, {
            type: 'doughnut',
            data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#fff', hoverOffset: 6 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: '60%',
                plugins: { legend: { position: 'bottom', labels: { padding: 10, font: { size: 11 }, usePointStyle: true, boxWidth: 9 } },
                tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed} (${total > 0 ? ((ctx.parsed / total) * 100).toFixed(1) : 0}%)` } } } }
        });
    },

    /** مساعد: HBar */
    _iHBar(canvasId, labels, data, color) {
        const canvas = document.getElementById(canvasId), emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        if (!data.length || data.reduce((a, b) => a + b, 0) === 0) { canvas.style.display = 'none'; if (emptyEl) emptyEl.style.display = 'flex'; return; }
        if (emptyEl) emptyEl.style.display = 'none'; canvas.style.display = '';
        if (!this._incidentCharts) this._incidentCharts = {};
        try { if (this._incidentCharts[canvasId]) this._incidentCharts[canvasId].destroy(); } catch (e) {}
        this._incidentCharts[canvasId] = new Chart(canvas, {
            type: 'bar',
            data: { labels, datasets: [{ data, backgroundColor: color || 'rgba(220,38,38,0.75)', borderRadius: 5, borderSkipped: false }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.x}` } } },
                scales: { x: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } }, grid: { color: '#f1f5f9' } },
                    y: { ticks: { font: { size: 11 }, callback: v => String(labels[v]).length > 18 ? String(labels[v]).slice(0, 17) + '…' : labels[v] } } } }
        });
    },

    /** مساعد: الاتجاه الزمني (12 شهر) */
    _iTrend(canvasId, arr) {
        const canvas = document.getElementById(canvasId), emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        const now = new Date();
        const arabicMonths = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
        const months = [];
        for (let i = 11; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ y: d.getFullYear(), m: d.getMonth(), label: `${arabicMonths[d.getMonth()]} ${d.getFullYear()}` }); }
        const counts = months.map(mo => arr.filter(r => { const d = this.getIncidentDateValue(r); return d && d.getFullYear() === mo.y && d.getMonth() === mo.m; }).length);
        if (counts.reduce((a, b) => a + b, 0) === 0) { canvas.style.display = 'none'; if (emptyEl) emptyEl.style.display = 'flex'; return; }
        if (emptyEl) emptyEl.style.display = 'none'; canvas.style.display = '';
        if (!this._incidentCharts) this._incidentCharts = {};
        try { if (this._incidentCharts[canvasId]) this._incidentCharts[canvasId].destroy(); } catch (e) {}
        const maxC = Math.max(...counts);
        this._incidentCharts[canvasId] = new Chart(canvas, {
            type: 'bar',
            data: { labels: months.map(m => m.label), datasets: [
                { label: 'الحوادث', data: counts, backgroundColor: counts.map(c => c === maxC ? 'rgba(220,38,38,0.9)' : 'rgba(220,38,38,0.5)'), borderRadius: 5, borderSkipped: false, order: 1 },
                { label: 'الاتجاه', data: counts, type: 'line', borderColor: 'rgba(139,92,246,0.9)', backgroundColor: 'rgba(139,92,246,0.08)', borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: '#8b5cf6', tension: 0.4, fill: true, order: 0 }
            ] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true, font: { size: 11 } } }, tooltip: { mode: 'index', intersect: false } },
                scales: { x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 45 } }, y: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } }, grid: { color: '#f8fafc' } } } }
        });
    },

    /** مساعد: مقارنة سنوية (3 سنوات — إجمالي + مغلقة) */
    _iYearly(canvasId, arr) {
        const canvas = document.getElementById(canvasId), emptyEl = document.getElementById(canvasId + '-empty');
        if (!canvas) return;
        const cfg = this.getThreeYearConfig();
        const years = cfg.years.slice().sort((a, b) => a - b); // تصاعدي
        const totalByYear = years.map(y => arr.filter(r => { const d = this.getIncidentDateValue(r); return d && d.getFullYear() === y; }).length);
        const closedByYear = years.map(y => arr.filter(r => { const d = this.getIncidentDateValue(r); return d && d.getFullYear() === y && this.normalizeStatus(r?.status) === 'closed'; }).length);
        if (totalByYear.reduce((a, b) => a + b, 0) === 0) { canvas.style.display = 'none'; if (emptyEl) emptyEl.style.display = 'flex'; return; }
        if (emptyEl) emptyEl.style.display = 'none'; canvas.style.display = '';
        if (!this._incidentCharts) this._incidentCharts = {};
        try { if (this._incidentCharts[canvasId]) this._incidentCharts[canvasId].destroy(); } catch (e) {}
        this._incidentCharts[canvasId] = new Chart(canvas, {
            type: 'bar',
            data: { labels: years.map(String), datasets: [
                { label: 'إجمالي الحوادث', data: totalByYear, backgroundColor: 'rgba(220,38,38,0.75)', borderRadius: 5, borderSkipped: false },
                { label: 'المغلقة', data: closedByYear, backgroundColor: 'rgba(5,150,105,0.75)', borderRadius: 5, borderSkipped: false }
            ] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { usePointStyle: true, font: { size: 11 } } }, tooltip: { mode: 'index', intersect: false } },
                scales: { x: { grid: { display: false }, ticks: { font: { size: 12 } } }, y: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } }, grid: { color: '#f8fafc' } } } }
        });
    },

    /** ربط أحداث لوحة التحليلات */
    _incidentBindAnalyticsEvents() {
        const root = document.getElementById('incident-analytics-root');
        if (!root) return;

        // أزرار الفترة
        root.querySelectorAll('.incident-period-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this._incidentPeriod = btn.getAttribute('data-period');
                root.querySelectorAll('.incident-period-btn').forEach(b => {
                    const active = b === btn;
                    b.style.background = active ? '#fff' : 'rgba(255,255,255,0.15)';
                    b.style.color = active ? '#991b1b' : '#fff';
                });
                this.updateIncidentAnalyticsDashboard();
            });
        });

        // زر تحديث
        const refreshBtn = document.getElementById('incident-analytics-refresh');
        if (refreshBtn) refreshBtn.addEventListener('click', () => this.updateIncidentAnalyticsDashboard());

        // زر PDF
        const pdfBtn = document.getElementById('incident-export-pdf-btn');
        if (pdfBtn) pdfBtn.addEventListener('click', () => this._incidentExportPDF());

        // زر تبديل الفلاتر
        const toggleBtn = document.getElementById('incident-toggle-filters-btn');
        const filterPanel = document.getElementById('incident-filter-panel');
        if (toggleBtn && filterPanel) {
            toggleBtn.addEventListener('click', () => {
                const isOpen = filterPanel.style.display !== 'none';
                filterPanel.style.display = isOpen ? 'none' : 'block';
                toggleBtn.style.background = isOpen ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.35)';
            });
        }

        // زر إعادة التعيين
        const resetBtn = document.getElementById('incident-filter-reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                ['incident-af-status','incident-af-severity','incident-af-type','incident-af-dept','incident-af-factory','incident-af-loc'].forEach(id => {
                    const el = document.getElementById(id); if (el) el.value = '';
                });
                this.updateIncidentAnalyticsDashboard();
            });
        }

        // قوائم الفلاتر
        ['incident-af-status','incident-af-severity','incident-af-type','incident-af-dept','incident-af-factory','incident-af-loc'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', () => this.updateIncidentAnalyticsDashboard());
        });
    },

    /** تصدير PDF للوحة التحليلات */
    /**
     * بناء هيدر التقرير الموحّد بنفس هيدر النظام (شعار + اسم الشركة + عنوان)
     * يُدرَج داخل لقطة html2canvas ليظهر الاسم العربي والشعار بشكل صحيح (jsPDF لا يدعم العربية)
     */
    _incidentBuildReportHeaderEl(reportTitleAr, reportTitleEn) {
        const companyName = (AppState && (AppState.companySettings?.name || AppState.companyName)) || '';
        const companySecondaryName = (AppState && AppState.companySettings?.secondaryName) || '';
        const rawLogo = (AppState && AppState.companyLogo) || (AppState && AppState.companySettings?.logo) || '';
        const logo = rawLogo ? this.convertGoogleDriveLinkToPrintable(rawLogo) : '';
        const dateStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

        const el = document.createElement('div');
        el.id = 'incident-pdf-report-header';
        el.style.cssText = 'background:#fff;border-bottom:3px solid #dc2626;border-radius:12px;padding:16px 22px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:16px;direction:rtl;font-family:Tahoma,Arial,sans-serif;';
        el.innerHTML = `
            <div style="flex:0 0 auto;min-width:90px;text-align:right;">
                ${logo ? `<img src="${logo}" alt="" crossorigin="anonymous" style="max-height:64px;max-width:170px;object-fit:contain;">` : ''}
            </div>
            <div style="flex:1;text-align:center;">
                <div style="font-size:1.5rem;font-weight:800;color:#991b1b;line-height:1.2;">${Utils.escapeHTML(reportTitleAr || 'تقرير تحليل الحوادث')}</div>
                ${reportTitleEn ? `<div style="font-size:0.95rem;font-weight:600;color:#dc2626;margin-top:3px;">${Utils.escapeHTML(reportTitleEn)}</div>` : ''}
                <div style="font-size:0.8rem;color:#6b7280;margin-top:5px;"><i class="fas fa-calendar-day" style="margin-left:4px;"></i>${dateStr}</div>
            </div>
            <div style="flex:0 0 auto;min-width:90px;text-align:left;">
                <div style="font-size:1.05rem;font-weight:700;color:#1f2937;line-height:1.3;white-space:nowrap;word-break:keep-all;">${Utils.escapeHTML(companyName || '')}</div>
                ${companySecondaryName ? `<div style="font-size:0.85rem;font-weight:500;color:#6b7280;margin-top:2px;">${Utils.escapeHTML(companySecondaryName)}</div>` : ''}
            </div>
        `;
        return el;
    },

    async _incidentExportPDF() {
        const root = document.getElementById('incident-analytics-root');
        if (!root) return;
        const btn = document.getElementById('incident-export-pdf-btn');
        const orig = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'; }

        // ✅ إدراج هيدر النظام مؤقتاً في أعلى اللوحة قبل اللقطة
        const headerEl = this._incidentBuildReportHeaderEl('تقرير تحليل الحوادث', 'Incidents Analysis Report');
        root.insertBefore(headerEl, root.firstChild);

        // انتظار تحميل الشعار (إن وُجد) قبل اللقطة لضمان ظهوره
        const headerImg = headerEl.querySelector('img');
        if (headerImg && !headerImg.complete) {
            await new Promise(res => { headerImg.onload = res; headerImg.onerror = res; setTimeout(res, 2500); });
        }

        try {
            const loadLib = (src, check) => new Promise((res, rej) => {
                if (check()) return res();
                const s = document.createElement('script'); s.src = src; s.onload = () => res(); s.onerror = () => rej(); document.head.appendChild(s);
            });
            await loadLib('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', () => typeof html2canvas !== 'undefined');
            await loadLib('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', () => typeof window.jspdf !== 'undefined');
            const fp = document.getElementById('incident-filter-panel'), fv = fp && fp.style.display !== 'none';
            if (fv) fp.style.display = 'none';
            const cvs = await html2canvas(root, { scale: 1.8, useCORS: true, backgroundColor: '#f8fafc', scrollX: 0, scrollY: -window.scrollY, logging: false });
            if (fv) fp.style.display = '';
            const { jsPDF } = window.jspdf, pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pW = pdf.internal.pageSize.getWidth(), pH = pdf.internal.pageSize.getHeight(), mg = 10;
            // ✅ الهيدر الآن جزء من الصورة الملتقطة → نترك مساحة علوية صغيرة فقط + تذييل لرقم الصفحة
            const footerH = 8;
            const cW = pW - mg * 2, ratio = cW / cvs.width, pgH = pH - mg - footerH, pgPx = pgH / ratio;
            const total = Math.ceil(cvs.height / pgPx);
            for (let p = 0; p < total; p++) {
                if (p > 0) pdf.addPage();
                const sc = document.createElement('canvas'), sH = Math.min(pgPx, cvs.height - p * pgPx);
                sc.width = cvs.width; sc.height = sH;
                sc.getContext('2d').drawImage(cvs, 0, p * pgPx, cvs.width, sH, 0, 0, cvs.width, sH);
                pdf.addImage(sc.toDataURL('image/jpeg', 0.92), 'JPEG', mg, mg, cW, sH * ratio);
                // ✅ تذييل: خط فاصل + رقم الصفحة والتاريخ (أرقام لاتينية — jsPDF لا يدعم العربية)
                pdf.setDrawColor(220, 38, 38); pdf.setLineWidth(0.4);
                pdf.line(mg, pH - footerH + 1, pW - mg, pH - footerH + 1);
                pdf.setTextColor(120, 120, 120); pdf.setFontSize(8);
                pdf.text(`${new Date().toISOString().slice(0, 10)}`, mg, pH - 3, { align: 'left' });
                pdf.text(`${p + 1} / ${total}`, pW - mg, pH - 3, { align: 'right' });
            }
            pdf.save(`تقرير-تحليل-الحوادث-${new Date().toISOString().slice(0, 10)}.pdf`);
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم تصدير تقرير الحوادث PDF بنجاح');
        } catch (err) {
            Utils.safeError('Incident PDF error:', err);
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('تعذّر تصدير PDF');
        } finally {
            // ✅ إزالة الهيدر المؤقت دائماً
            if (headerEl && headerEl.parentNode) headerEl.parentNode.removeChild(headerEl);
            if (btn) { btn.disabled = false; btn.innerHTML = orig; }
        }
    },

    /**
     * عرض تبويب سجل الحوادث
     */
    async renderRegistryTab() {
        try {
            return this.renderRegistryContent();
        } catch (error) {
            Utils.safeError('خطأ في عرض تبويب السجل:', error);
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">حدث خطأ في تحميل سجل الحوادث</h2>
                            <p class="text-gray-600">${error.message || 'خطأ غير معروف'}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    /**
     * عرض محتوى سجل الحوادث
     */
    renderRegistryContent() {
        const counts = this.getUnifiedIncidentCounts();
        const totalCount = counts.total;
        const openCount = counts.open;
        const investigatingCount = counts.investigating;
        const completedCount = counts.completed;
        const closedCount = counts.closed;

        return `
            <!-- أزرار التصدير والإدخال -->
            <div class="flex justify-between items-center gap-2 mb-4 incident-action-bar">
                <button id="incidents-registry-add-manual" class="btn-success">
                    <i class="fas fa-plus-circle ml-2"></i>
                    إضافة حادث / Add Incident
                </button>
                <div class="flex gap-2">
                    <button id="incidents-registry-export-excel" class="btn-secondary">
                        <i class="fas fa-file-excel ml-2"></i>
                        تصدير Excel
                    </button>
                    <button id="incidents-registry-export-pdf" class="btn-primary">
                        <i class="fas fa-file-pdf ml-2"></i>
                        تصدير PDF
                    </button>
                </div>
            </div>
            
            <!-- بطاقات الإحصائيات -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 incident-kpi-grid">
                <div class="kpi-card kpi-info">
                    <div class="kpi-icon"><i class="fas fa-list-ol"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">إجمالي الحوادث</h3>
                        <p class="kpi-value">${totalCount}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-primary">
                    <div class="kpi-icon"><i class="fas fa-folder-open"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">حوادث مفتوحة</h3>
                        <p class="kpi-value">${openCount}</p>
                    </div>
                </div>
                        <div class="kpi-card kpi-warning">
                    <div class="kpi-icon"><i class="fas fa-search"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">قيد التحقيق</h3>
                        <p class="kpi-value">${investigatingCount}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-info">
                    <div class="kpi-icon"><i class="fas fa-check-double"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">مكتملة</h3>
                        <p class="kpi-value">${completedCount}</p>
                    </div>
                </div>
                <div class="kpi-card kpi-success">
                    <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="kpi-content">
                        <h3 class="kpi-label">حوادث مغلقة</h3>
                        <p class="kpi-value">${closedCount}</p>
                    </div>
                </div>
            </div>
            
            <!-- فلاتر البحث -->
            <div class="content-card mb-4 incident-filter-card">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-search ml-2"></i>بحث
                            </label>
                            <input type="text" id="incidents-registry-search" class="form-input" placeholder="ابحث برقم السجل أو اسم الموظف...">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-filter ml-2"></i>الحالة
                            </label>
                            <select id="incidents-registry-filter-status" class="form-input">
                                <option value="">جميع الحالات</option>
                                <option value="مفتوح">مفتوح</option>
                                <option value="قيد التحقيق">قيد التحقيق</option>
                                <option value="مكتمل">مكتمل</option>
                                <option value="مغلق">مغلق</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>من تاريخ
                            </label>
                            <input type="date" id="incidents-registry-filter-date-from" class="form-input">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-calendar ml-2"></i>إلى تاريخ
                            </label>
                            <input type="date" id="incidents-registry-filter-date-to" class="form-input">
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- جدول السجل -->
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-table ml-2"></i>
                        جدول سجل الحوادث (${totalCount} سجل)
                    </h2>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        ${this.renderRegistryTable()}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * عرض جدول السجل
     */
    renderRegistryTable() {
        const linkedEntries = this.getLinkedRegistryEntries();
        if (linkedEntries.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">لا توجد سجلات حتى الآن</p>
                    <p class="text-sm text-gray-400 mt-2">سيتم إضافة السجلات تلقائياً عند إنشاء حوادث جديدة</p>
                </div>
            `;
        }

        const sortedData = [...linkedEntries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const formatDate = (dateStr) => {
            if (!dateStr) return '-';
            try {
                const date = new Date(dateStr);
                return date.toLocaleDateString('ar-SA');
            } catch {
                return '-';
            }
        };

        let tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>مسلسل</th>
                        <th>المصنع</th>
                        <th>مكان الحادث</th>
                        <th>تاريخ الحادث</th>
                        <th>يوم الحادث</th>
                        <th>وقت الحادث</th>
                        <th>الوردية</th>
                        <th>كود الموظف</th>
                        <th>اسم الموظف</th>
                        <th>الوظيفة</th>
                        <th>الإدارة / القسم</th>
                        <th>تفاصيل الحادث</th>
                        <th>الجزء المصاب</th>
                        <th>المعدة المتسببة</th>
                        <th>إجمالي أيام الإجازة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
        `;

        sortedData.forEach(entry => {
            const statusClass = entry.status === 'مفتوح' ? 'bg-blue-100 text-blue-800' : 
                               entry.status === 'قيد التحقيق' ? 'bg-yellow-100 text-yellow-800' :
                               entry.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                               'bg-gray-100 text-gray-800';

            tableHTML += `
                <tr>
                    <td>${entry.sequentialNumber || '-'}</td>
                    <td>${Utils.escapeHTML(entry.factory || '-')}</td>
                    <td>${Utils.escapeHTML(entry.incidentLocation || '-')}</td>
                    <td>${formatDate(entry.incidentDate)}</td>
                    <td>${Utils.escapeHTML(entry.incidentDay || '-')}</td>
                    <td>${Utils.escapeHTML(entry.incidentTime || '-')}</td>
                    <td>${Utils.escapeHTML(entry.shift || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeCode || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeName || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeJob || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeDepartment || '-')}</td>
                    <td>${Utils.escapeHTML((entry.incidentDetails || '-').substring(0, 50))}${(entry.incidentDetails || '').length > 50 ? '...' : ''}</td>
                    <td>${Utils.escapeHTML(entry.injuredPart || '-')}</td>
                    <td>${Utils.escapeHTML(entry.equipmentCause || '-')}</td>
                    <td>${entry.totalLeaveDays || 0} يوم</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <button onclick="Incidents.viewRegistryEntry('${entry.id}')" class="btn-icon btn-icon-info" title="عرض التفاصيل">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${entry.incidentId ? `
                                <button onclick="Incidents.viewIncident('${entry.incidentId}')" class="btn-icon btn-icon-primary" title="عرض الحادث">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </button>
                                <button onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${entry.incidentId}'); } else { alert('نموذج التحقيق غير متاح'); }" class="btn-icon btn-icon-warning" title="التحقيق في الحادث">
                                    <i class="fas fa-search"></i>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        return tableHTML;
    },

    /**
     * عرض تبويب التنبيهات عن الحوادث (Safety Alerts)
     */
    async renderSafetyAlertsTab() {
        try {
            // تحميل التنبيهات من Backend
            let alerts = [];
            
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callAppsScript) {
                try {
                    const result = await GoogleIntegration.callAppsScript('getAllSafetyAlerts', {});
                    if (result && result.success && result.data) {
                        alerts = result.data;
                        if (!AppState.appData) AppState.appData = {};
                        AppState.appData.safetyAlerts = alerts;
                    }
                } catch (error) {
                    Utils.safeWarn('خطأ في تحميل التنبيهات من Backend:', error);
                }
            }

            // استخدام البيانات المحلية إذا لم تكن موجودة في Backend
            if (alerts.length === 0) {
                alerts = AppState.appData?.safetyAlerts || [];
            }

            // ترتيب التنبيهات حسب التاريخ (الأحدث أولاً)
            alerts.sort((a, b) => {
                const dateA = new Date(a.incidentDate || a.createdAt || 0);
                const dateB = new Date(b.incidentDate || b.createdAt || 0);
                return dateB - dateA;
            });

            const canCreate = this.canCreateSafetyAlert();

            return `
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-exclamation-circle ml-2"></i>
                            Safety Alerts
                        </h2>
                        <div class="flex items-center gap-2">
                            ${canCreate ? `
                            <button class="btn-primary" onclick="Incidents.showSafetyAlertForm()">
                                <i class="fas fa-plus ml-2"></i>
                                إنشاء Safety Alert
                            </button>
                            ` : ''}
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">
                            Safety Alert هو أداة توعوية لنشر الوعي ومشاركة الدروس المستفادة ومنع تكرار الحوادث.
                        </p>
                        <div class="table-wrapper" style="overflow-x: auto;">
                            ${alerts.length > 0 ? `
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>رقم Safety Alert</th>
                                        <th>نوع الحادث</th>
                                        <th>تاريخ الحادث</th>
                                        <th>مكان الحادث</th>
                                        <th>الحالة</th>
                                        <th>إعداد</th>
                                        <th>اعتماد</th>
                                        <th>تاريخ الإصدار</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${alerts.map(alert => `
                                        <tr>
                                            <td>${Utils.escapeHTML(alert.alertNumber || alert.sequentialNumber || '')}</td>
                                            <td>${Utils.escapeHTML(alert.incidentType || '')}</td>
                                            <td>${alert.incidentDate ? new Date(alert.incidentDate).toLocaleDateString('ar-SA') : ''}</td>
                                            <td>${Utils.escapeHTML(alert.incidentLocation || '')}</td>
                                            <td>
                                                <span class="badge badge-${alert.status === 'معتمد' ? 'success' : 'warning'}">
                                                    ${Utils.escapeHTML(alert.status || 'مسودة')}
                                                </span>
                                            </td>
                                            <td>${Utils.escapeHTML(alert.preparedBy || '')}</td>
                                            <td>${Utils.escapeHTML(alert.approvedBy || '-')}</td>
                                            <td>${alert.issueDate ? new Date(alert.issueDate).toLocaleDateString('ar-SA') : '-'}</td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button onclick="Incidents.viewSafetyAlert('${alert.id}')" class="btn-icon btn-icon-info" title="عرض">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    ${alert.status !== 'معتمد' && canCreate ? `
                                                    <button onclick="Incidents.editSafetyAlert('${alert.id}')" class="btn-icon btn-icon-warning" title="تعديل">
                                                        <i class="fas fa-edit"></i>
                                                    </button>
                                                    ` : ''}
                                                    ${alert.status !== 'معتمد' && this.canApproveSafetyAlert() ? `
                                                    <button onclick="Incidents.approveSafetyAlert('${alert.id}')" class="btn-icon btn-icon-success" title="اعتماد">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    ` : ''}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                            ` : `
                            <div class="empty-state">
                                <i class="fas fa-exclamation-circle text-4xl text-gray-300 mb-4"></i>
                                <p class="text-gray-500">لا توجد Safety Alerts حتى الآن</p>
                                ${canCreate ? `
                                <button class="btn-primary mt-4" onclick="Incidents.showSafetyAlertForm()">
                                    <i class="fas fa-plus ml-2"></i>
                                    إنشاء Safety Alert جديد
                                </button>
                                ` : ''}
                            </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            Utils.safeError('خطأ في عرض تبويب Safety Alerts:', error);
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">حدث خطأ في تحميل Safety Alerts</h2>
                            <p class="text-gray-600">${error.message || 'خطأ غير معروف'}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    /**
     * عرض Safety Alert (المحدث)
     */
    async viewSafetyAlert(alertId) {
        const alert = (AppState.appData?.safetyAlerts || []).find(a => a.id === alertId);
        if (!alert) {
            Notification.error('Safety Alert غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay incident-professional-modal incident-modal-safety-alert';
        
        // جلب اسم الشركة من الإعدادات
        const companyName = AppState?.companySettings?.name || AppState?.companyName || '';
        const companySecondaryNameRaw = AppState?.companySettings?.secondaryName;
        const companySecondaryName = (companySecondaryNameRaw !== undefined && companySecondaryNameRaw !== null)
            ? String(companySecondaryNameRaw).trim()
            : '';
        const companyLogo = AppState?.companyLogo || '';

        modal.innerHTML = `
            <style>
                .safety-alert-view-field {
                    background: white;
                    padding: 16px;
                    border-radius: 10px;
                    border: 2px solid #e5e7eb;
                    margin-bottom: 20px;
                    min-height: 60px;
                }
                .safety-alert-view-grey-bar {
                    background: #9ca3af;
                    height: 4px;
                    margin: 20px 0;
                    border-radius: 2px;
                }
                .safety-alert-view-grey-label {
                    background: #9ca3af;
                    color: white;
                    padding: 12px;
                    text-align: center;
                    font-weight: 600;
                    border-radius: 4px;
                }
                .safety-alert-view-yellow-box {
                    background: #fbbf24;
                    padding: 8px;
                    text-align: center;
                    border-radius: 6px;
                    border: 2px solid #f59e0b;
                    display: inline-block;
                    max-width: 100%;
                }
                .safety-alert-view-yellow-box img {
                    max-width: 100%;
                    max-height: 350px;
                    border-radius: 4px;
                    object-fit: contain;
                    display: block;
                }
                .safety-alert-view-header-box {
                    background: #9ca3af;
                    color: white;
                    padding: 16px;
                    text-align: center;
                    font-weight: 700;
                    font-size: 1.2rem;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .safety-alert-view-number {
                    color: #dc2626;
                    font-weight: 700;
                    font-size: 1.5rem;
                    text-align: center;
                    margin: 10px 0;
                }
            </style>
            <div class="modal-content" style="max-width: 1200px; width: 95%; background: #f8f9fa;">
                <div class="modal-header" style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 24px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-exclamation-circle ml-2"></i>
                        عرض Safety Alert
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <!-- Header Section with Company Logo and Name -->
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="flex: 1; text-align: right;">
                            ${companyLogo ? `
                                <img src="${companyLogo}" alt="شعار الشركة" style="max-height: 80px; max-width: 200px; object-fit: contain;">
                            ` : ''}
                        </div>
                        <div style="flex: 1; text-align: center;">
                            <div style="color: #dc2626; font-weight: 700; font-size: 0.75rem; margin-bottom: 2px;">No</div>
                            <div class="safety-alert-view-number" style="font-size: 12px;">${Utils.escapeHTML(alert.sequentialNumber || '001')}</div>
                            <div class="safety-alert-view-header-box" style="margin-top: 10px;">${Utils.escapeHTML(alert.incidentType || '')}</div>
                        </div>
                        <div style="flex: 1; text-align: left;">
                            <div style="font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3;">
                                <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(companyName || '')}</div>
                                ${companySecondaryName ? `<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(companySecondaryName)}</div>` : ''}
                            </div>
                        </div>
                    </div>

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <div class="safety-alert-view-grey-label">أين</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(alert.incidentLocation || '')}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">متى</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${alert.incidentDate ? new Date(alert.incidentDate).toLocaleDateString('ar-SA') : ''}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">من</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(alert.who || '')}
                            </div>
                        </div>
                    </div>

                    ${alert.locationImage || alert.causesImage ? `
                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        ${alert.locationImage ? `
                        <div style="text-align: center;">
                            <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">صورة توضيحية لمكان الحادث</div>
                            <div class="safety-alert-view-yellow-box">
                                <img src="${this.convertGoogleDriveLinkToPrintable(alert.locationImage)}" alt="صورة المكان" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain;">
                            </div>
                        </div>
                        ` : '<div></div>'}
                        ${alert.causesImage ? `
                        <div style="text-align: center;">
                            <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">صورة توضيحية لأسباب الحادث</div>
                            <div class="safety-alert-view-yellow-box">
                                <img src="${this.convertGoogleDriveLinkToPrintable(alert.causesImage)}" alt="صورة الأسباب" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain;">
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">وصف الحادث :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(alert.description || '')}</div>
                    </div>

                    ${alert.facts ? `
                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">حقائق عن الحادث :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(alert.facts)}</div>
                    </div>
                    ` : ''}

                    ${alert.causes ? `
                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">الأسباب :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(alert.causes)}</div>
                    </div>
                    ` : ''}

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">الدروس المستفادة :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(alert.lessonsLearned || '')}</div>
                    </div>

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="safety-alert-view-field">
                        <label style="display: block; font-weight: 600; margin-bottom: 10px;">إجراءات منع تكرار الحدث :</label>
                        <div style="white-space: pre-wrap;">${Utils.escapeHTML(alert.preventiveMeasures || '')}</div>
                    </div>

                    <div class="safety-alert-view-grey-bar"></div>
                    <div class="grid grid-cols-4 gap-4 mb-4">
                        <div>
                            <div class="safety-alert-view-grey-label">رقم الإشعار</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(alert.notificationNumber || alert.sequentialNumber || '')}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">إعداد</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(alert.preparedBy || '')}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">اعتماد</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${Utils.escapeHTML(alert.approvedBy || '-')}
                            </div>
                        </div>
                        <div>
                            <div class="safety-alert-view-grey-label">تاريخ الإصدار</div>
                            <div class="safety-alert-view-field" style="margin-top: 10px;">
                                ${alert.issueDate ? new Date(alert.issueDate).toLocaleDateString('ar-SA') : '-'}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-end gap-4 pt-4">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                            إغلاق
                        </button>
                        <button type="button" class="btn-success" onclick="Incidents.exportSafetyAlertPDF('${alertId}')">
                            <i class="fas fa-file-pdf ml-2"></i>
                            تصدير PDF
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const ok = confirm('تنبيه: سيتم إغلاق النموذج.\nقد تفقد أي بيانات غير محفوظة.\n\nهل تريد الإغلاق؟');
                if (ok) modal.remove();
            }
        });
    },

    /**
     * حذف تنبيه
     */
    async deleteSafetyAlert(alertId) {
        try {
            if (!AppState.currentUser || AppState.currentUser.role !== 'admin') {
                Notification.error('ليس لديك صلاحية لحذف التنبيهات');
                return;
            }

            Loading.show('جاري حذف التنبيه...');
            
            const result = await GoogleIntegration.sendRequest({
                action: 'deleteSafetyAlert',
                data: { alertId }
            });

            Loading.hide();

            if (result && result.success) {
                Notification.success('تم حذف التنبيه بنجاح');
                // تحديث التبويب
                if (this.currentTab === 'safety-alerts') {
                    const contentContainer = document.getElementById('incidents-tab-content');
                    if (contentContainer) {
                        contentContainer.innerHTML = await this.renderSafetyAlertsTab();
                        this.setupTabEventListeners('safety-alerts');
                    }
                }
            } else {
                Notification.error(result?.message || 'فشل حذف التنبيه');
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في حذف التنبيه:', error);
            Notification.error('حدث خطأ أثناء حذف التنبيه');
        }
    },

    /**
     * عرض نموذج Safety Alert (المحدث)
     */
    async showSafetyAlertForm(alertId = null, incidentId = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay incident-professional-modal incident-modal-safety-alert';
        
        // جلب بيانات التنبيه إذا كان تعديل
        let alertData = null;
        if (alertId) {
            alertData = (AppState.appData?.safetyAlerts || []).find(a => a.id === alertId);
        }
        
        // جلب بيانات الحادث إذا كان مرتبطاً
        let incident = null;
        if (incidentId) {
            incident = (AppState.appData?.incidents || []).find(inc => inc.id === incidentId);
        } else if (alertData?.incidentId) {
            incident = (AppState.appData?.incidents || []).find(inc => inc.id === alertData.incidentId);
        }

        const isEdit = !!alertId;
        const sequentialNumber = alertData?.sequentialNumber || this.generateSafetyAlertSequentialNumber();
        const companyName = AppState?.companySettings?.name || AppState?.companyName || '';
        const companySecondaryName = AppState?.companySettings?.secondaryName || '';
        const companyLogo = AppState?.companyLogo || '';

        modal.innerHTML = `
            <style>
                .safety-alert-grey-bar {
                    background: #9ca3af;
                    height: 4px;
                    margin: 20px 0;
                    border-radius: 2px;
                }
                .safety-alert-grey-label {
                    background: #9ca3af;
                    color: white;
                    padding: 12px;
                    text-align: center;
                    font-weight: 600;
                    border-radius: 4px;
                }
                .safety-alert-field {
                    background: white;
                    padding: 16px;
                    border-radius: 10px;
                    border: 2px solid #e5e7eb;
                    margin-top: 10px;
                }
                .safety-alert-yellow-box {
                    background: #fbbf24;
                    padding: 8px;
                    text-align: center;
                    border-radius: 6px;
                    border: 2px solid #f59e0b;
                    display: inline-block;
                    max-width: 100%;
                }
                .safety-alert-yellow-box img {
                    max-width: 100%;
                    max-height: 350px;
                    border-radius: 4px;
                    object-fit: contain;
                    display: block;
                }
                .incident-type-checkbox {
                    margin: 8px;
                }
            </style>
            <div class="modal-content" style="max-width: 1000px; width: 95%; max-height: 90vh; overflow-y: auto; background: #f8f9fa;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 24px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-exclamation-circle ml-2"></i>
                        ${isEdit ? 'تعديل Safety Alert' : 'إنشاء Safety Alert'}
                    </h2>
                    <button class="modal-close" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px;">
                    <form id="safety-alert-form">
                        <!-- Header with Company Logo and Name -->
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <div style="flex: 1; text-align: right;">
                                ${companyLogo ? `
                                    <img src="${companyLogo}" alt="شعار الشركة" style="max-height: 80px; max-width: 200px; object-fit: contain;">
                                ` : ''}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                <div style="color: #dc2626; font-weight: 700; font-size: 0.75rem; margin-bottom: 2px;">No</div>
                                <div style="color: #dc2626; font-weight: 700; font-size: 12px;" id="safety-alert-number-display">${sequentialNumber}</div>
                            </div>
                            <div style="flex: 1; text-align: left;">
                                <div style="font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3;">
                                    <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(companyName || '')}</div>
                                    ${companySecondaryName ? `<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(companySecondaryName)}</div>` : ''}
                                </div>
                            </div>
                        </div>

                        <input type="hidden" id="safety-alert-id" value="${alertId || ''}">
                        <input type="hidden" id="safety-alert-incident-id" value="${incidentId || alertData?.incidentId || incident?.id || ''}">
                        <input type="hidden" id="safety-alert-incident-type" value="${alertData?.incidentType || ''}">
                        <input type="hidden" id="safety-alert-status" value="${alertData?.status || 'مسودة'}">

                        <!-- Incident Type (Checkboxes) -->
                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-grey-label">نوع الحادث</div>
                        <div class="safety-alert-field" style="margin-top: 10px;">
                            <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-general" 
                                        ${alertData?.incidentType === 'نوع الحادث' ? 'checked' : ''}>
                                    نوع الحادث
                                </label>
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-serious"
                                        ${alertData?.incidentType === 'حادث جسيم' ? 'checked' : ''}>
                                    حادث جسيم
                                </label>
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-fire"
                                        ${alertData?.incidentType === 'حادث حريق' ? 'checked' : ''}>
                                    حادث حريق
                                </label>
                                <label class="incident-type-checkbox">
                                    <input type="checkbox" class="incident-type-checkbox" id="incident-type-other"
                                        ${alertData?.incidentType && alertData.incidentType !== 'نوع الحادث' && alertData.incidentType !== 'حادث جسيم' && alertData.incidentType !== 'حادث حريق' ? 'checked' : ''}>
                                    اخرى
                                </label>
                            </div>
                            <div id="incident-type-other-input-container" style="margin-top: 15px; display: none;">
                                <input type="text" id="incident-type-other-input" class="form-input" 
                                    placeholder="حدد نوع الحادث الآخر"
                                    value="${alertData?.incidentType && alertData.incidentType !== 'نوع الحادث' && alertData.incidentType !== 'حادث جسيم' && alertData.incidentType !== 'حادث حريق' ? Utils.escapeHTML(alertData.incidentType) : ''}"
                                    style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px;">
                            </div>
                        </div>

                        <!-- Incident Details -->
                        <div class="safety-alert-grey-bar"></div>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                            <div>
                                <div class="safety-alert-grey-label">أين</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-location" class="form-input" 
                                        value="${Utils.escapeHTML(alertData?.incidentLocation || incident?.location || incident?.siteName || '')}" 
                                        placeholder="مكان الحادث"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">متى</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="date" id="safety-alert-date" class="form-input" 
                                        value="${this.safeDateToISOString(alertData?.incidentDate || incident?.date, 10)}"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">من</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-who" class="form-input" 
                                        value="${Utils.escapeHTML(alertData?.who || '')}" 
                                        placeholder="من"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                        </div>

                        <!-- Images -->
                        <div class="safety-alert-grey-bar"></div>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div style="text-align: center;">
                                <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">صورة توضيحية لمكان الحادث</div>
                                <div class="safety-alert-yellow-box">
                                    <input type="file" id="safety-alert-location-image-input" accept="image/*" 
                                        onchange="Incidents.handleSafetyAlertImage(this, 'safety-alert-location-image-preview')" 
                                        style="display: none;">
                                    <input type="hidden" id="safety-alert-location-image" value="${alertData?.locationImage || ''}">
                                    ${alertData?.locationImage ? `
                                        <div id="safety-alert-location-image-preview">
                                            <img src="${this.convertGoogleDriveLinkToPrintable(alertData.locationImage)}" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain; display: block;">
                                        </div>
                                    ` : `
                                        <label for="safety-alert-location-image-input" style="cursor: pointer; display: block; padding: 10px;">
                                            <i class="fas fa-camera text-2xl text-gray-600 mb-2"></i>
                                            <div style="font-size: 0.85rem;">اضغط لرفع الصورة</div>
                                        </label>
                                        <div id="safety-alert-location-image-preview" style="display: none;"></div>
                                    `}
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <div style="margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: #374151;">صورة توضيحية لأسباب الحادث</div>
                                <div class="safety-alert-yellow-box">
                                    <input type="file" id="safety-alert-causes-image-input" accept="image/*" 
                                        onchange="Incidents.handleSafetyAlertImage(this, 'safety-alert-causes-image-preview')" 
                                        style="display: none;">
                                    <input type="hidden" id="safety-alert-causes-image" value="${alertData?.causesImage || ''}">
                                    ${alertData?.causesImage ? `
                                        <div id="safety-alert-causes-image-preview">
                                            <img src="${this.convertGoogleDriveLinkToPrintable(alertData.causesImage)}" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain; display: block;">
                                        </div>
                                    ` : `
                                        <label for="safety-alert-causes-image-input" style="cursor: pointer; display: block; padding: 10px;">
                                            <i class="fas fa-camera text-2xl text-gray-600 mb-2"></i>
                                            <div style="font-size: 0.85rem;">اضغط لرفع الصورة</div>
                                        </label>
                                        <div id="safety-alert-causes-image-preview" style="display: none;"></div>
                                    `}
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">وصف مختصر للحادث :</label>
                            <textarea id="safety-alert-description" class="form-input" rows="5"
                                placeholder="وصف مختصر للحادث"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(alertData?.description || '')}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">حقائق عن الحادث :</label>
                            <textarea id="safety-alert-facts" class="form-input" rows="5"
                                placeholder="الحقائق الأساسية عن الحادث"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(alertData?.facts || '')}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">الأسباب :</label>
                            <textarea id="safety-alert-causes" class="form-input" rows="5"
                                placeholder="الأسباب الرئيسية"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(alertData?.causes || '')}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">الدروس المستفادة :</label>
                            <textarea id="safety-alert-lessons" class="form-input" rows="5" required
                                placeholder="أهم الدروس المستفادة"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(alertData?.lessonsLearned || '')}</textarea>
                        </div>

                        <div class="safety-alert-grey-bar"></div>
                        <div class="safety-alert-field">
                            <label style="display: block; font-weight: 600; margin-bottom: 10px;">إجراءات منع تكرار الحدث :</label>
                            <textarea id="safety-alert-preventive" class="form-input" rows="5" required
                                placeholder="إجراءات وقائية عامة"
                                style="border: none; width: 100%; resize: vertical;">${Utils.escapeHTML(alertData?.preventiveMeasures || '')}</textarea>
                        </div>

                        <!-- Footer Fields -->
                        <div class="safety-alert-grey-bar"></div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                            <div>
                                <div class="safety-alert-grey-label">رقم الإشعار</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-notification-number" class="form-input" 
                                        value="${Utils.escapeHTML(alertData?.notificationNumber || alertData?.sequentialNumber || incident?.notificationNumber || sequentialNumber)}" 
                                        placeholder="رقم الإشعار"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">إعداد</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-prepared-by" class="form-input" 
                                        value="${Utils.escapeHTML(alertData?.preparedBy || AppState.currentUser?.name || '')}" 
                                        placeholder="إعداد"
                                        style="border: none; width: 100%;">
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">اعتماد</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="text" id="safety-alert-approved-by" class="form-input" 
                                        value="${Utils.escapeHTML(alertData?.approvedBy || '')}" 
                                        placeholder="اعتماد"
                                        style="border: none; width: 100%;" ${alertData?.status === 'معتمد' ? 'readonly' : ''}>
                                </div>
                            </div>
                            <div>
                                <div class="safety-alert-grey-label">تاريخ الإصدار</div>
                                <div class="safety-alert-field" style="margin-top: 10px;">
                                    <input type="date" id="safety-alert-issue-date" class="form-input" 
                                        value="${this.safeDateToISOString(alertData?.issueDate, 10)}"
                                        style="border: none; width: 100%;" ${alertData?.status === 'معتمد' ? 'readonly' : ''}>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 form-actions-centered">
                            <button type="button" class="btn-secondary safety-alert-close-btn">
                                إغلاق
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.printSafetyAlert('${alertId || ''}')" title="طباعة Safety Alert">
                                <i class="fas fa-print ml-2"></i>
                                طباعة
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.exportSafetyAlertPDF('${alertId || ''}')" title="تصدير PDF">
                                <i class="fas fa-file-pdf ml-2"></i>
                                تصدير PDF
                            </button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                حفظ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle incident type checkboxes - single selection
        setTimeout(() => {
            const checkboxes = modal.querySelectorAll('.incident-type-checkbox');
            const hiddenInput = document.getElementById('safety-alert-incident-type');
            const otherInputContainer = document.getElementById('incident-type-other-input-container');
            const otherInput = document.getElementById('incident-type-other-input');
            const otherCheckbox = document.getElementById('incident-type-other');
            
            const updateIncidentType = () => {
                const checked = Array.from(checkboxes).find(cb => cb.checked);
                if (checked) {
                    const labels = {
                        'incident-type-general': 'نوع الحادث',
                        'incident-type-serious': 'حادث جسيم',
                        'incident-type-fire': 'حادث حريق',
                        'incident-type-other': 'اخرى'
                    };
                    
                    // Show/hide other input field
                    if (otherInputContainer) {
                        if (checked.id === 'incident-type-other') {
                            otherInputContainer.style.display = 'block';
                            if (otherInput) otherInput.focus();
                        } else {
                            otherInputContainer.style.display = 'none';
                            if (otherInput) otherInput.value = '';
                        }
                    }
                    
                    if (hiddenInput) {
                        if (checked.id === 'incident-type-other' && otherInput && otherInput.value.trim()) {
                            hiddenInput.value = otherInput.value.trim();
                        } else {
                            hiddenInput.value = labels[checked.id] || 'نوع الحادث';
                        }
                    }
                }
            };
            
            checkboxes.forEach(cb => {
                cb.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        checkboxes.forEach(other => {
                            if (other !== e.target) other.checked = false;
                        });
                    }
                    updateIncidentType();
                });
            });
            
            // Handle other input field changes
            if (otherInput) {
                otherInput.addEventListener('input', () => {
                    if (otherCheckbox && otherCheckbox.checked && hiddenInput) {
                        hiddenInput.value = otherInput.value.trim() || 'اخرى';
                    }
                });
            }
            
            // Initialize - show other input if already checked
            if (otherCheckbox && otherCheckbox.checked && otherInputContainer) {
                otherInputContainer.style.display = 'block';
            }

            // Auto-fill notification number with sequential number if empty
            const notificationNumberInput = document.getElementById('safety-alert-notification-number');
            const numberDisplay = document.getElementById('safety-alert-number-display');
            if (notificationNumberInput && numberDisplay && !notificationNumberInput.value) {
                const sequentialNum = numberDisplay.textContent.trim();
                notificationNumberInput.value = sequentialNum;
            }
        }, 100);

        // Track form changes for unsaved changes warning
        let formChanged = false;
        let originalFormData = null;
        
        // Get form and submit button references
        const form = modal.querySelector('#safety-alert-form');
        const submitBtn = form?.querySelector('button[type="submit"]');
        
        // Initialize original form data and track changes
        setTimeout(() => {
            if (form) {
                originalFormData = new FormData(form);
            }
            
            // Track form changes
            form?.addEventListener('input', () => {
                formChanged = true;
            });
            form?.addEventListener('change', () => {
                formChanged = true;
            });
        }, 100);

        // Handle form submission
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (submitBtn?.disabled) return; // Prevent double submission
            await this.handleSafetyAlertSubmit(modal, alertId, submitBtn);
        });

        // Close button handler with unsaved changes check
        const closeBtnHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (formChanged) {
                const ok = confirm('تنبيه: لديك تغييرات غير محفوظة.\nسيتم إغلاق النموذج وفقدان التغييرات.\n\nهل تريد المتابعة؟');
                if (ok) {
                    formChanged = false;
                    modal.remove();
                }
            } else {
                modal.remove();
            }
        };

        // Attach close handlers
        modal.querySelectorAll('.modal-close, .safety-alert-close-btn').forEach(btn => {
            btn.addEventListener('click', closeBtnHandler);
        });

        // Modal backdrop click handler
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (formChanged) {
                    const ok = confirm('تنبيه: لديك تغييرات غير محفوظة.\nسيتم إغلاق النموذج وفقدان التغييرات.\n\nهل تريد المتابعة؟');
                    if (ok) {
                        formChanged = false;
                        modal.remove();
                    }
                } else {
                    modal.remove();
                }
            }
        });
    },

    /**
     * معالجة إرسال نموذج Safety Alert (المحدث)
     */
    async handleSafetyAlertSubmit(modal, alertId, submitBtn = null) {
        try {
            const isEdit = !!alertId;
            
            // Disable submit button to prevent double submission
            let originalButtonText = null;
            if (submitBtn) {
                submitBtn.disabled = true;
                originalButtonText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
            }
            
            // Helper to re-enable button
            const reEnableButton = () => {
                if (submitBtn && originalButtonText) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalButtonText;
                }
            };

            // Get incident type from hidden input (updated by checkboxes) or other input
            const incidentTypeInput = document.getElementById('safety-alert-incident-type');
            const otherInput = document.getElementById('incident-type-other-input');
            const otherCheckbox = document.getElementById('incident-type-other');
            let incidentType = incidentTypeInput?.value || 'نوع الحادث';
            
            // If "other" is selected, use the value from the other input field
            if (otherCheckbox && otherCheckbox.checked && otherInput && otherInput.value.trim()) {
                incidentType = otherInput.value.trim();
            }
            
            // Get sequential number
            const numberDisplay = document.getElementById('safety-alert-number-display');
            const sequentialNumber = numberDisplay ? numberDisplay.textContent.trim() : String((AppState.appData?.safetyAlerts || []).length + 1).padStart(3, '0');

            const alertData = {
                id: alertId || Utils.generateId('SA'),
                alertNumber: document.getElementById('safety-alert-notification-number')?.value || `SA-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String((AppState.appData?.safetyAlerts || []).length + 1).padStart(4, '0')}`,
                sequentialNumber: sequentialNumber,
                incidentId: document.getElementById('safety-alert-incident-id')?.value || '',
                incidentType: incidentType,
                incidentDate: document.getElementById('safety-alert-date')?.value || '',
                incidentLocation: document.getElementById('safety-alert-location')?.value || '',
                who: document.getElementById('safety-alert-who')?.value || '',
                description: document.getElementById('safety-alert-description')?.value || '',
                facts: document.getElementById('safety-alert-facts')?.value || '',
                causes: document.getElementById('safety-alert-causes')?.value || '',
                lessonsLearned: document.getElementById('safety-alert-lessons')?.value || '',
                preventiveMeasures: document.getElementById('safety-alert-preventive')?.value || '',
                locationImage: document.getElementById('safety-alert-location-image')?.value || '',
                causesImage: document.getElementById('safety-alert-causes-image')?.value || '',
                notificationNumber: document.getElementById('safety-alert-notification-number')?.value || sequentialNumber,
                preparedBy: document.getElementById('safety-alert-prepared-by')?.value || '',
                approvedBy: document.getElementById('safety-alert-approved-by')?.value || '',
                issueDate: document.getElementById('safety-alert-issue-date')?.value || '',
                status: document.getElementById('safety-alert-status')?.value || 'مسودة',
                createdAt: isEdit ? (AppState.appData?.safetyAlerts || []).find(a => a.id === alertId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: AppState.currentUser ? {
                    id: AppState.currentUser.id || '',
                    name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                    email: AppState.currentUser.email || ''
                } : null
            };

            // Validation - more comprehensive
            const validationErrors = [];
            if (!alertData.lessonsLearned || !alertData.lessonsLearned.trim()) {
                validationErrors.push('الدروس المستفادة');
            }
            if (!alertData.preventiveMeasures || !alertData.preventiveMeasures.trim()) {
                validationErrors.push('إجراءات منع تكرار الحدث');
            }
            
            if (validationErrors.length > 0) {
                Notification.error(`يرجى ملء الحقول المطلوبة التالية:\n${validationErrors.join('، ')}`);
                reEnableButton();
                return;
            }

            Loading.show('جاري حفظ Safety Alert...');

            // Save to AppState
            if (!AppState.appData.safetyAlerts) {
                AppState.appData.safetyAlerts = [];
            }

            if (isEdit) {
                const index = AppState.appData.safetyAlerts.findIndex(a => a.id === alertId);
                if (index !== -1) {
                    AppState.appData.safetyAlerts[index] = alertData;
                } else {
                    AppState.appData.safetyAlerts.push(alertData);
                }
            } else {
                AppState.appData.safetyAlerts.push(alertData);
            }

            // Track save results
            let backendSaveSuccess = false;
            let backendSaveError = null;
            let googleSheetsSaveSuccess = false;
            
            // Save to Backend
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callAppsScript) {
                try {
                    const result = isEdit 
                        ? await GoogleIntegration.callAppsScript('updateSafetyAlert', { alertId, updateData: alertData })
                        : await GoogleIntegration.callAppsScript('addSafetyAlert', { alertData });
                    
                    if (result && result.success) {
                        backendSaveSuccess = true;
                        // Sync with AppState
                        if (result.data) {
                            if (isEdit) {
                                const index = AppState.appData.safetyAlerts.findIndex(a => a.id === alertId);
                                if (index !== -1) {
                                    AppState.appData.safetyAlerts[index] = result.data;
                                } else {
                                    AppState.appData.safetyAlerts.push(result.data);
                                }
                            } else {
                                AppState.appData.safetyAlerts.push(result.data);
                            }
                        }
                    } else {
                        backendSaveError = result?.message || 'فشل حفظ Safety Alert في Backend';
                    }
                } catch (error) {
                    backendSaveError = error.message || 'حدث خطأ أثناء حفظ Safety Alert إلى Backend';
                    Utils.safeWarn('خطأ في حفظ Safety Alert إلى Backend:', error);
                }
            } else {
                // No backend available - treat as success for local-only saves
                backendSaveSuccess = true;
            }

            // Auto-save to Google Sheets if enabled
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
                try {
                    await GoogleIntegration.autoSave('safetyAlerts', AppState.appData.safetyAlerts);
                    googleSheetsSaveSuccess = true;
                } catch (error) {
                    Utils.safeWarn('خطأ في حفظ Safety Alert إلى Google Sheets:', error);
                }
            } else {
                googleSheetsSaveSuccess = true; // Not enabled, treat as success
            }

            Loading.hide();

            // Determine success/failure and show appropriate message
            if (backendSaveError) {
                // Backend save failed - show warning but keep modal open
                Notification.warning(
                    `تم حفظ Safety Alert محلياً، ولكن فشل الحفظ في Backend:\n${backendSaveError}\n\nيمكنك المحاولة مرة أخرى أو إغلاق النموذج لحفظ التغييرات محلياً فقط.`
                );
                reEnableButton();
                return; // Don't close modal on backend error
            }

            // Success - show success message and close modal
            const successMessage = isEdit ? 'تم تحديث Safety Alert بنجاح' : 'تم إنشاء Safety Alert بنجاح';
            if (!googleSheetsSaveSuccess && backendSaveSuccess) {
                Notification.success(`${successMessage}\n(ملاحظة: تم الحفظ في Backend فقط)`);
            } else {
                Notification.success(successMessage);
            }
            
            modal.remove();

            // Refresh tab if open
            if (this.currentTab === 'safety-alerts') {
                const contentContainer = document.getElementById('incidents-tab-content');
                if (contentContainer) {
                    contentContainer.innerHTML = await this.renderSafetyAlertsTab();
                    this.setupTabEventListeners('safety-alerts');
                }
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في حفظ Safety Alert:', error);
            
            const errorMessage = error.message || 'حدث خطأ غير متوقع';
            Notification.error(`حدث خطأ أثناء حفظ Safety Alert:\n${errorMessage}`);
            
            // Re-enable submit button on error
            if (submitBtn) {
                submitBtn.disabled = false;
                if (submitBtn.innerHTML.includes('fa-spinner')) {
                    submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i> حفظ';
                }
            }
        }
    },

    /**
     * معالجة رفع صورة Safety Alert
     */
    async handleSafetyAlertImage(input, previewId) {
        const file = input.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            Notification.error('حجم الصورة كبير جداً. الحد الأقصى 5MB');
            input.value = '';
            return;
        }

        try {
            const base64 = await this.convertFileToBase64(file);
            const hiddenInput = input.previousElementSibling;
            if (hiddenInput && hiddenInput.id.includes('safety-alert')) {
                hiddenInput.value = base64;
            }

            const preview = document.getElementById(previewId);
            if (preview) {
                preview.innerHTML = `<img src="${base64}" style="max-width: 100%; max-height: 350px; border-radius: 4px; object-fit: contain; display: block;">`;
                preview.style.display = 'block';
                
                // Hide the label placeholder
                const yellowBox = input.closest('.safety-alert-yellow-box');
                if (yellowBox) {
                    const label = yellowBox.querySelector('label[for]');
                    if (label) {
                        label.style.display = 'none';
                    }
                }
            }
        } catch (error) {
            Utils.safeError('خطأ في معالجة الصورة:', error);
            Notification.error('فشل تحميل الصورة');
        }
    },

    /**
     * تحويل ملف إلى Base64
     */
    async convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    /**
     * تعديل Safety Alert
     */
    editSafetyAlert(alertId) {
        this.showSafetyAlertForm(alertId);
    },

    /**
     * اعتماد Safety Alert
     */
    async approveSafetyAlert(alertId) {
        try {
            if (!this.canApproveSafetyAlert()) {
                Notification.error('ليس لديك صلاحية لاعتماد Safety Alert');
                return;
            }

            if (!confirm('هل أنت متأكد من اعتماد هذا Safety Alert؟')) {
                return;
            }

            Loading.show('جاري اعتماد Safety Alert...');

            const alert = (AppState.appData?.safetyAlerts || []).find(a => a.id === alertId);
            if (!alert) {
                Loading.hide();
                Notification.error('Safety Alert غير موجود');
                return;
            }

            const updateData = {
                status: 'معتمد',
                approvedBy: AppState.currentUser?.name || AppState.currentUser?.displayName || '',
                approvedAt: new Date().toISOString(),
                issueDate: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString()
            };

            // Update in AppState
            const index = AppState.appData.safetyAlerts.findIndex(a => a.id === alertId);
            if (index !== -1) {
                AppState.appData.safetyAlerts[index] = { ...alert, ...updateData };
            }

            // Update in Backend
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callAppsScript) {
                try {
                    const result = await GoogleIntegration.callAppsScript('updateSafetyAlert', { alertId, updateData });
                    if (result && result.success && result.data) {
                        AppState.appData.safetyAlerts[index] = result.data;
                    }
                } catch (error) {
                    Utils.safeWarn('خطأ في اعتماد Safety Alert في Backend:', error);
                }
            }

            // Auto-save to Google Sheets
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
                try {
                    await GoogleIntegration.autoSave('safetyAlerts', AppState.appData.safetyAlerts);
                } catch (error) {
                    Utils.safeWarn('خطأ في حفظ Safety Alert إلى Google Sheets:', error);
                }
            }

            Loading.hide();
            Notification.success('تم اعتماد Safety Alert بنجاح');

            // Refresh tab if open
            if (this.currentTab === 'safety-alerts') {
                const contentContainer = document.getElementById('incidents-tab-content');
                if (contentContainer) {
                    contentContainer.innerHTML = await this.renderSafetyAlertsTab();
                    this.setupTabEventListeners('safety-alerts');
                }
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في اعتماد Safety Alert:', error);
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    /**
     * عرض تبويب الموافقات
     */
    async renderApprovalsTab() {
        try {
            const incidents = (AppState.appData?.incidents || []).map(incident => {
                // نسخة للعرض دون تحوير AppState
                const item = { ...incident };
                this._normalizeIncidentApprovalRecord(item);
                if (item.investigation && typeof item.investigation === 'string') {
                    try {
                        item.investigation = JSON.parse(item.investigation);
                    } catch (e) {
                        Utils.safeWarn('خطأ في تحليل investigation:', e);
                        item.investigation = {};
                    }
                }
                return item;
            });

            const pendingApprovals = incidents.filter(incident => {
                const state = this.getIncidentApprovalState(incident);
                return state.awaitingApproval;
            });

            return `
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-check-circle ml-2"></i>
                            الموافقات
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="mb-4">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-800">الحوادث المعلقة للموافقة</h3>
                                    <p class="text-sm text-gray-600">إجمالي: ${pendingApprovals.length} حادث</p>
                                </div>
                                <div class="flex gap-2">
                                    <input 
                                        type="text" 
                                        id="approvals-search" 
                                        class="form-input" 
                                        placeholder="ابحث عن حادث..."
                                        style="max-width: 300px;"
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>الكود</th>
                                        <th>العنوان</th>
                                        <th>التاريخ</th>
                                        <th>الحالة</th>
                                        <th>الشدة</th>
                                        <th>المبلغ</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="approvals-table-body">
                                    ${pendingApprovals.length > 0 ? pendingApprovals.map(incident => `
                                        <tr data-incident-id="${incident.id}">
                                            <td>${Utils.escapeHTML(incident.isoCode || incident.id || '')}</td>
                                            <td>${Utils.escapeHTML(incident.title || 'بدون عنوان')}</td>
                                            <td>${incident.date ? new Date(incident.date).toLocaleDateString('ar-SA') : ''}</td>
                                            <td>
                                                <span class="badge badge-${this.getStatusBadgeClass(this.getIncidentDisplayStatus(incident))}">
                                                    ${Utils.escapeHTML(this.getIncidentDisplayStatus(incident))}
                                                    ${incident.requiresApproval ? ' <i class="fas fa-clock ml-1" title="في انتظار الموافقة"></i>' : ''}
                                                </span>
                                            </td>
                                            <td>
                                                <span class="badge badge-${incident.severity === 'عالية' ? 'danger' : incident.severity === 'متوسطة' ? 'warning' : 'info'}">
                                                    ${Utils.escapeHTML(incident.severity || 'متوسطة')}
                                                </span>
                                            </td>
                                            <td>${Utils.escapeHTML(this.getIncidentListReporter(incident))}</td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <button 
                                                        onclick="Incidents.viewIncident('${incident.id}')" 
                                                        class="btn-icon btn-icon-info" 
                                                        title="عرض"
                                                    >
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                    ${incident.investigation ? `
                                                        <button 
                                                            onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${incident.id}'); } else { alert('نموذج التحقيق غير متاح'); }" 
                                                            class="btn-icon btn-icon-warning" 
                                                            title="التحقيق"
                                                        >
                                                            <i class="fas fa-search"></i>
                                                        </button>
                                                    ` : `
                                                        <button 
                                                            onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${incident.id}'); } else { alert('نموذج التحقيق غير متاح'); }" 
                                                            class="btn-icon btn-icon-primary" 
                                                            title="بدء التحقيق"
                                                        >
                                                            <i class="fas fa-play"></i>
                                                        </button>
                                                    `}
                                                    ${this.getIncidentApprovalState(incident).awaitingApproval && this.canApproveIncident() ? `
                                                        <button 
                                                            onclick="Incidents.showIncidentApprovalFlow('${incident.id}')" 
                                                            class="btn-icon btn-icon-warning" 
                                                            title="دائرة الموافقة"
                                                        >
                                                            <i class="fas fa-project-diagram"></i>
                                                        </button>
                                                        <button 
                                                            onclick="Incidents.approveIncident('${incident.id}')" 
                                                            class="btn-icon btn-icon-success" 
                                                            title="الموافقة"
                                                        >
                                                            <i class="fas fa-check"></i>
                                                        </button>
                                                        <button 
                                                            onclick="Incidents.rejectIncident('${incident.id}')" 
                                                            class="btn-icon btn-icon-danger" 
                                                            title="رفض"
                                                        >
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    ` : ''}
                                                    ${this.renderIncidentDeleteButton(incident.id)}
                                                </div>
                                            </td>
                                        </tr>
                                    `).join('') : `
                                        <tr>
                                            <td colspan="7" class="text-center py-8 text-gray-500">
                                                <i class="fas fa-check-circle text-4xl mb-4"></i>
                                                <p>لا توجد حوادث معلقة للموافقة</p>
                                            </td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            Utils.safeError('خطأ في عرض تبويب الموافقات:', error);
            return `
                <div class="content-card">
                    <div class="card-body">
                        <div class="text-center py-8">
                            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                            <h2 class="text-xl font-bold text-gray-800 mb-2">حدث خطأ في تحميل الموافقات</h2>
                            <p class="text-gray-600">${error.message || 'خطأ غير معروف'}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    },

    /**
     * عرض تفاصيل سجل
     */
    viewRegistryEntry(entryId) {
        const entry = this.registryData.find(r => r.id === entryId);
        if (!entry) {
            Notification.error('السجل غير موجود');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay incident-professional-modal incident-modal-registry-details';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">تفاصيل سجل الحادث #${entry.sequentialNumber}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="grid grid-cols-2 gap-4">
                        <div><strong>المسلسل:</strong> ${entry.sequentialNumber}</div>
                        <div><strong>المصنع:</strong> ${Utils.escapeHTML(entry.factory || '-')}</div>
                        <div><strong>مكان الحادث:</strong> ${Utils.escapeHTML(entry.incidentLocation || '-')}</div>
                        <div><strong>تاريخ الحادث:</strong> ${entry.incidentDate ? new Date(entry.incidentDate).toLocaleDateString('ar-SA') : '-'}</div>
                        <div><strong>يوم الحادث:</strong> ${Utils.escapeHTML(entry.incidentDay || '-')}</div>
                        <div><strong>وقت الحادث:</strong> ${Utils.escapeHTML(entry.incidentTime || '-')}</div>
                        <div><strong>الوردية:</strong> ${Utils.escapeHTML(entry.shift || '-')}</div>
                        <div><strong>كود الموظف:</strong> ${Utils.escapeHTML(entry.employeeCode || '-')}</div>
                        <div><strong>اسم الموظف:</strong> ${Utils.escapeHTML(entry.employeeName || '-')}</div>
                        <div><strong>الوظيفة:</strong> ${Utils.escapeHTML(entry.employeeJob || '-')}</div>
                        <div><strong>الإدارة / القسم:</strong> ${Utils.escapeHTML(entry.employeeDepartment || '-')}</div>
                        <div class="col-span-2"><strong>تفاصيل الحادث:</strong> ${Utils.escapeHTML(entry.incidentDetails || '-')}</div>
                        <div><strong>الجزء المصاب:</strong> ${Utils.escapeHTML(entry.injuredPart || '-')}</div>
                        <div><strong>المعدة المتسببة:</strong> ${Utils.escapeHTML(entry.equipmentCause || '-')}</div>
                        <div><strong>تاريخ بداية الإجازة:</strong> ${entry.leaveStartDate ? new Date(entry.leaveStartDate + 'T00:00:00').toLocaleDateString('ar-SA') : '-'}</div>
                        <div><strong>تاريخ العودة للعمل:</strong> ${entry.returnToWorkDate ? new Date(entry.returnToWorkDate + 'T00:00:00').toLocaleDateString('ar-SA') : '-'}</div>
                        <div><strong>إجمالي أيام الإجازة:</strong> ${entry.totalLeaveDays || 0} يوم</div>
                        <div><strong>الحالة:</strong> <span class="badge badge-${entry.status === 'مفتوح' ? 'primary' : 'success'}">${entry.status}</span></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="Incidents.exportRegistryEntryPDF('${entry.id}')">
                        <i class="fas fa-file-pdf ml-2"></i>
                        تصدير PDF
                    </button>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const ok = confirm('تنبيه: سيتم إغلاق النموذج.\nقد تفقد أي بيانات غير محفوظة.\n\nهل تريد الإغلاق؟');
                if (ok) modal.remove();
            }
        });
    },

    /**
     * عرض نموذج الإدخال اليدوي
     */
    showManualEntryForm() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay incident-professional-modal incident-modal-notification';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header modal-header-centered">
                    <h2 class="modal-title">
                        <i class="fas fa-plus-circle ml-2"></i>
                        إضافة إخطار حادث / Incident Notification
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="incident-registry-manual-form" class="space-y-4">
                        <!-- معلومات أساسية -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    نوع الحادث / Incident Type *
                                </label>
                                <select id="manual-incident-type" class="form-input" required>
                                    <option value="">اختر نوع الحادث</option>
                                    <option value="اصابة">إصابة عمل (Work Injury)</option>
                                    <option value="معدة">معدة (Equipment)</option>
                                    <option value="حريق">حريق (Fire)</option>
                                    <option value="بيئة">بيئة (Environment)</option>
                                    <option value="وشك حادث">وشك حادث (Near Miss)</option>
                                    <option value="مركبة">مركبة (Vehicle)</option>
                                    <option value="أخرى">أخرى (Other)</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    المصنع / Factory *
                                </label>
                                <select id="manual-factory" class="form-input" required>
                                    <option value="">اختر المصنع</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    الموقع / Location *
                                </label>
                                <select id="manual-incident-location" class="form-input" required>
                                    <option value="">اختر الموقع</option>
                                </select>
                            </div>
                        </div>

                        <!-- توقيت الحادث -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-3 rounded">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الحادث *</label>
                                <input type="date" id="manual-incident-date" class="form-input" required value="${new Date().toISOString().split('T')[0]}">
                            </div>
                            <div>
                                <label for="manual-incident-time" class="block text-sm font-semibold text-gray-700 mb-2">وقت الحادث *</label>
                                <input type="time" id="manual-incident-time" class="form-input" required>
                            </div>
                            <div>
                                <label for="manual-incident-day" class="block text-sm font-semibold text-gray-700 mb-2">اليوم</label>
                                <input type="text" id="manual-incident-day" class="form-input" readonly style="background-color: #e5e7eb;">
                            </div>
                            <div>
                                <label for="manual-shift" class="block text-sm font-semibold text-gray-700 mb-2">الوردية *</label>
                                <select id="manual-shift" class="form-input" required>
                                    <option value="">اختر الوردية</option>
                                    <option value="أولى">أولى</option>
                                    <option value="ثانية">ثانية</option>
                                    <option value="ثالثة">ثالثة</option>
                                </select>
                            </div>
                        </div>

                        <!-- قسم بيانات المصاب (يظهر فقط عند اختيار إصابة) -->
                        <div id="manual-employee-section" class="border border-blue-200 bg-blue-50 p-4 rounded hidden">
                            <h4 class="text-blue-800 font-bold mb-3 flex items-center">
                                <i class="fas fa-user-injured ml-2"></i>
                                بيانات المصاب / Injured Person Details
                            </h4>
                            
                            <!-- حقل التبعية -->
                            <div class="mb-3">
                                <label for="manual-affiliation" class="block text-sm font-semibold text-gray-700 mb-2">
                                    التبعية / Affiliation (مرتبط ببيانات المصاب)
                                </label>
                                <select id="manual-affiliation" class="form-input">
                                    <option value="">اختر التبعية</option>
                                    <option value="شركة">شركة (Company)</option>
                                    <option value="عمالة يومية">عمالة يومية (Daily Labor)</option>
                                    <option value="مقاول">مقاول (Contractor)</option>
                                    <option value="زائر">زائر (Visitor)</option>
                                    <option value="لا يوجد">لا يوجد (None)</option>
                                </select>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <div>
                                    <label for="manual-employee-code" class="block text-sm font-semibold text-gray-700 mb-2">كود الموظف *</label>
                                    <input type="text" id="manual-employee-code" class="form-input" placeholder="بحث بالكود...">
                                </div>
                                <div>
                                    <label for="manual-employee-name" class="block text-sm font-semibold text-gray-700 mb-2">اسم الموظف *</label>
                                    <input type="text" id="manual-employee-name" class="form-input" readonly style="background-color: #e5e7eb;">
                                </div>
                                <div>
                                    <label for="manual-employee-job" class="block text-sm font-semibold text-gray-700 mb-2">الوظيفة *</label>
                                    <input type="text" id="manual-employee-job" class="form-input" readonly style="background-color: #e5e7eb;">
                                </div>
                            </div>
                            
                            <!-- حقل الإدارة تابع للموظف -->
                            <div class="mb-3">
                                <label for="manual-employee-department" class="block text-sm font-semibold text-gray-700 mb-2">
                                    الإدارة / Department *
                                </label>
                                <input type="text" id="manual-employee-department" class="form-input" placeholder="الإدارة التابع لها">
                            </div>

                            <div class="mb-3">
                                <label for="manual-injury-description" class="block text-sm font-semibold text-gray-700 mb-2">وصف الاصابة / Injury Description</label>
                                <textarea id="manual-injury-description" class="form-input" rows="2" placeholder="وصف طبيعة ومكان الإصابة..."></textarea>
                            </div>
                            
                            <!-- الإجازات المرضية -->
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-blue-200 pt-3">
                                <div>
                                    <label for="manual-leave-start-date" class="block text-sm font-semibold text-gray-700 mb-2">تاريخ بداية الإجازة</label>
                                    <input type="date" id="manual-leave-start-date" class="form-input">
                                </div>
                                <div>
                                    <label for="manual-return-to-work-date" class="block text-sm font-semibold text-gray-700 mb-2">تاريخ العودة للعمل</label>
                                    <input type="date" id="manual-return-to-work-date" class="form-input">
                                </div>
                                <div>
                                    <label for="manual-total-leave-days" class="block text-sm font-semibold text-gray-700 mb-2">أيام الإجازة</label>
                                    <input type="text" id="manual-total-leave-days" class="form-input font-bold" readonly value="0 يوم">
                                </div>
                                <div>
                                    <label for="manual-treating-doctor" class="block text-sm font-semibold text-gray-700 mb-2">الطبيب المعالج</label>
                                    <input type="text" id="manual-treating-doctor" class="form-input" placeholder="اسم الطبيب (اختياري)">
                                </div>
                            </div>
                        </div>

                        <!-- الترتيب الجديد للحقول: الخسائر ثم الوصف المختصر ثم الإجراءات -->
                        
                        <!-- الخسائر -->
                         <div>
                            <label for="manual-losses" class="block text-sm font-semibold text-gray-700 mb-2">
                                الخسائر / Losses
                            </label>
                            <textarea id="manual-losses" class="form-input" rows="3" placeholder="وصف الخسائر المادية أو البشرية..."></textarea>
                        </div>

                        <!-- تفاصيل الحادث (وصف مختصر) -->
                        <div>
                            <label for="manual-brief-description" class="block text-sm font-semibold text-gray-700 mb-2">
                                وصف مختصر للحادث / Brief Description *
                            </label>
                            <textarea id="manual-brief-description" class="form-input" rows="3" required placeholder="وصف مختصر لما حدث..."></textarea>
                        </div>

                        <!-- الإجراءات المتخذة -->
                        <div>
                            <label for="manual-actions-taken" class="block text-sm font-semibold text-gray-700 mb-2">
                                الإجراءات المتخذة / Actions Taken
                            </label>
                            <textarea id="manual-actions-taken" class="form-input" rows="3" placeholder="الإجراءات الفورية التي تم اتخاذها..."></textarea>
                        </div>
                        
                        <!-- Auto generated -->
                         <div class="hidden">
                             <input type="text" id="manual-sequential-number" value="${this.generateRegistrySequentialNumber()}">
                         </div>

                    </form>
                </div>
                <div class="modal-footer form-actions-centered">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button type="button" class="btn-primary" onclick="Incidents.submitManualEntry()">
                        <i class="fas fa-save ml-2"></i>
                        حفظ
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // ملء قوائم المصانع والأماكن
        this.populateManualFormOptions(modal);

        // Incident Type Logic
        const typeSelect = modal.querySelector('#manual-incident-type');
        const empSection = modal.querySelector('#manual-employee-section');
        const empCode = modal.querySelector('#manual-employee-code');
        const empName = modal.querySelector('#manual-employee-name');
        const empJob = modal.querySelector('#manual-employee-job');
        const empDept = modal.querySelector('#manual-employee-department');
        const affiliationSelect = modal.querySelector('#manual-affiliation');

        const setReadOnly = (el, readOnly) => {
            if (!el) return;
            el.readOnly = !!readOnly;
            el.style.backgroundColor = readOnly ? '#e5e7eb' : '';
        };

        const updateManualAffiliationMode = () => {
            // Only relevant for injury type (employee section visible)
            if (!affiliationSelect) return;
            const affiliation = (affiliationSelect.value || '').trim();
            const isCompanyEmployee = !affiliation || affiliation === 'شركة';

            // Company employee: lookup by code, lock name/job (auto filled). Others: allow typing.
            setReadOnly(empName, isCompanyEmployee);
            setReadOnly(empJob, isCompanyEmployee);

            if (empCode) {
                if (isCompanyEmployee) {
                    empCode.setAttribute('required', 'true');
                    empCode.placeholder = 'بحث بالكود...';
                } else {
                    empCode.removeAttribute('required');
                    empCode.placeholder = 'الكود/رقم الهوية (اختياري)';
                }
            }

            // Department should be editable always (even for employees) to allow correction
            setReadOnly(empDept, false);
        };

        // تفعيل/تعطيل الحقول بناءً على النوع
        typeSelect.addEventListener('change', () => {
            if (typeSelect.value === 'اصابة') { // 'اصابة عمل' based on new value? No, value is 'اصابة' from options
                empSection.classList.remove('hidden');
                empCode.setAttribute('required', 'true');
                empName.setAttribute('required', 'true');
                if (empDept) empDept.setAttribute('required', 'true');
                updateManualAffiliationMode();
            } else {
                empSection.classList.add('hidden');
                empCode.removeAttribute('required');
                empName.removeAttribute('required');
                if (empDept) empDept.removeAttribute('required');

                // تفريغ الحقول عند الإخفاء
                empCode.value = '';
                empName.value = '';
                if (modal.querySelector('#manual-employee-job')) modal.querySelector('#manual-employee-job').value = '';
                if (modal.querySelector('#manual-employee-department')) modal.querySelector('#manual-employee-department').value = '';
                if (modal.querySelector('#manual-affiliation')) modal.querySelector('#manual-affiliation').value = '';
            }
        });

        if (affiliationSelect) {
            affiliationSelect.addEventListener('change', () => {
                updateManualAffiliationMode();
            });
            // initial mode
            updateManualAffiliationMode();
        }

        // ربط البحث عن الموظف
        const employeeCodeInput = modal.querySelector('#manual-employee-code');
        if (employeeCodeInput) {
            employeeCodeInput.addEventListener('blur', () => {
                this.loadEmployeeDataForManual(modal);
            });
            // إضافة مستمع للبحث أثناء الكتابة
            employeeCodeInput.addEventListener('input', () => {
                if (employeeCodeInput.value.trim().length >= 3) {
                    this.loadEmployeeDataForManual(modal);
                }
            });
        }

        // ربط تغيير المصنع لتحديث الأماكن
        const factorySelect = modal.querySelector('#manual-factory');
        if (factorySelect) {
            factorySelect.addEventListener('change', () => {
                this.updateManualFormPlaces(modal);
            });
        }

        // ربط تغيير التاريخ لحساب يوم الحادث تلقائياً
        const dateInput = modal.querySelector('#manual-incident-date');
        const dayInput = modal.querySelector('#manual-incident-day');
        if (dateInput && dayInput) {
            // حساب اليوم عند فتح النموذج
            const updateDay = () => {
                if (dateInput.value) {
                    try {
                        const date = new Date(dateInput.value);
                        if (!isNaN(date.getTime())) {
                            const dayName = this.getDayName(date);
                            dayInput.value = dayName;
                        }
                    } catch (e) {
                        dayInput.value = '';
                    }
                } else {
                    dayInput.value = '';
                }
            };

            dateInput.addEventListener('change', updateDay);
            // حساب اليوم عند فتح النموذج
            setTimeout(updateDay, 100);
        }

        // ربط تغيير الوقت لحساب الوردية تلقائياً
        const timeInput = modal.querySelector('#manual-incident-time');
        const shiftSelect = modal.querySelector('#manual-shift');
        const leaveStartDateInput = modal.querySelector('#manual-leave-start-date');
        const returnToWorkDateInput = modal.querySelector('#manual-return-to-work-date');
        const totalLeaveDaysInput = modal.querySelector('#manual-total-leave-days');

        // دالة حساب إجمالي أيام الإجازة من تاريخ البدء حتى تاريخ العودة
        const updateTotalLeaveDays = () => {
            if (!totalLeaveDaysInput) return;
            const days = this.calculateTotalLeaveDays(
                leaveStartDateInput?.value || '',
                returnToWorkDateInput?.value || ''
            );
            totalLeaveDaysInput.value = `${days} يوم`;
        };

        if (leaveStartDateInput) {
            leaveStartDateInput.addEventListener('change', updateTotalLeaveDays);
        }

        if (returnToWorkDateInput) {
            returnToWorkDateInput.addEventListener('change', updateTotalLeaveDays);
        }

        if (timeInput && shiftSelect) {
            timeInput.addEventListener('change', () => {
                if (timeInput.value) {
                    const shift = this.determineShift(timeInput.value);
                    shiftSelect.value = shift;
                }
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const ok = confirm('تنبيه: سيتم إغلاق النموذج.\nقد تفقد أي بيانات غير محفوظة.\n\nهل تريد الإغلاق؟');
                if (ok) modal.remove();
            }
        });
    },

    /**
     * ملء خيارات النموذج اليدوي
     */
    populateManualFormOptions(modal) {
        const factorySelect = modal.querySelector('#manual-factory');
        const locationSelect = modal.querySelector('#manual-incident-location');

        if (!factorySelect || !locationSelect) return;

        // الحصول على قائمة المصانع
        const sites = this.getSiteOptions();
        sites.forEach(site => {
            const option = document.createElement('option');
            option.value = site.id;
            option.textContent = site.name;
            factorySelect.appendChild(option);
        });
    },

    /**
     * تحديث قائمة الأماكن عند تغيير المصنع
     */
    updateManualFormPlaces(modal) {
        const factorySelect = modal.querySelector('#manual-factory');
        const locationSelect = modal.querySelector('#manual-incident-location');

        if (!factorySelect || !locationSelect) return;

        const siteId = factorySelect.value;
        locationSelect.innerHTML = '<option value="">اختر المكان</option>';

        if (siteId) {
            const places = this.getPlaceOptions(siteId);
            places.forEach(place => {
                const option = document.createElement('option');
                option.value = place.id;
                option.textContent = place.name;
                locationSelect.appendChild(option);
            });
        }
    },

    /**
     * تحميل بيانات الموظف في النموذج اليدوي
     */
    loadEmployeeDataForManual(modal) {
        const codeInput = modal.querySelector('#manual-employee-code');
        const nameInput = modal.querySelector('#manual-employee-name');
        const jobInput = modal.querySelector('#manual-employee-job');
        const deptInput = modal.querySelector('#manual-employee-department'); // Updated ID inside section
        const affiliationSelect = modal.querySelector('#manual-affiliation');

        if (!codeInput || !nameInput) return;

        const affiliation = (affiliationSelect?.value || '').trim();
        const isCompanyEmployee = !affiliation || affiliation === 'شركة';
        // If not company employee (contractor/daily labor/visitor), allow manual typing and skip lookup
        if (!isCompanyEmployee) {
            return;
        }

        const employeeCode = codeInput.value.trim();
        if (!employeeCode) {
            nameInput.value = '';
            if (jobInput) jobInput.value = '';
            if (deptInput) deptInput.value = '';
            return;
        }

        const employee = this.getEmployeeByCode(employeeCode);
        if (employee) {
            nameInput.value = employee.name || employee.fullName || '';
            // البحث عن الوظيفة في حقول مختلفة
            if (jobInput) {
                jobInput.value = employee.job ||
                    employee.position ||
                    employee.jobTitle ||
                    employee.title ||
                    '';
            }
            // البحث عن القسم في حقول مختلفة
            if (deptInput) {
                deptInput.value = employee.department ||
                    employee.section ||
                    employee.division ||
                    '';
            }
        } else {
            nameInput.value = '';
            if (jobInput) jobInput.value = '';
            // Do not clear deptInput to allow manual entry

            // إزالة الإشعار عند الكتابة (يظهر فقط عند blur)
            if (document.activeElement !== codeInput) {
                Notification.warning('لم يتم العثور على موظف بهذا الكود');
            }
        }
    },

    /**
     * حفظ الإدخال اليدوي
     */
    async submitManualEntry() {
        const modal = document.querySelector('.modal-overlay');
        if (!modal) return;
        if (this._manualEntrySubmitting) return;

        const form = modal.querySelector('#incident-registry-manual-form');
        if (!form) return;

        const typeSelect = modal.querySelector('#manual-incident-type');
        const factorySelect = modal.querySelector('#manual-factory');
        const locationSelect = modal.querySelector('#manual-incident-location');
        const dateInput = modal.querySelector('#manual-incident-date');
        const timeInput = modal.querySelector('#manual-incident-time');
        const shiftSelect = modal.querySelector('#manual-shift');
        const briefDescInput = modal.querySelector('#manual-brief-description');

        // Fields that might be optional based on type
        const affiliationInput = modal.querySelector('#manual-affiliation');
        const employeeCodeInput = modal.querySelector('#manual-employee-code');
        const employeeNameInput = modal.querySelector('#manual-employee-name');
        const employeeJobInput = modal.querySelector('#manual-employee-job');
        const employeeDeptInput = modal.querySelector('#manual-employee-department'); // Correct ID
        const injuryDescInput = modal.querySelector('#manual-injury-description');
        const lossesInput = modal.querySelector('#manual-losses');
        const actionsInput = modal.querySelector('#manual-actions-taken');

        const leaveStartDateInput = modal.querySelector('#manual-leave-start-date');
        const returnToWorkDateInput = modal.querySelector('#manual-return-to-work-date');
        const treatingDoctorInput = modal.querySelector('#manual-treating-doctor');

        // Validation - Basic Fields
        if (!typeSelect.value || !factorySelect.value || !locationSelect.value ||
            !dateInput.value || !timeInput.value || !shiftSelect.value ||
            !briefDescInput.value) {
            Notification.error('يرجى ملء جميع الحقول المطلوبة');
            return;
        }

        // Additional validation for Injury type
        if (typeSelect.value === 'اصابة') {
            const affiliation = (affiliationInput?.value || '').trim();
            const isCompanyEmployee = !affiliation || affiliation === 'شركة';

            // Require employee code only for company employees
            if (isCompanyEmployee && !employeeCodeInput?.value?.trim()) {
                Notification.error('كود الموظف مطلوب عند اختيار تبعية "شركة"');
                return;
            }

            // Require name + department for injury records (job remains optional to avoid blocking if HR data is incomplete)
            if (!employeeNameInput?.value?.trim() || !employeeDeptInput?.value?.trim()) {
                Notification.error('بيانات المصاب (الاسم، الإدارة) مطلوبة في حالة الإصابة');
                return;
            }
        }

        // Validate dates if present
        if (returnToWorkDateInput.value && leaveStartDateInput.value) {
            const startDate = new Date(leaveStartDateInput.value);
            const returnDate = new Date(returnToWorkDateInput.value);
            if (returnDate < startDate) {
                Notification.error('تاريخ العودة للعمل يجب أن يكون بعد تاريخ بداية الإجازة');
                return;
            }
        }

        // إنشاء سجل جديد
        const sequentialNumberInput = modal.querySelector('#manual-sequential-number');
        const sequentialNumber = sequentialNumberInput ? parseInt(sequentialNumberInput.value) || this.generateRegistrySequentialNumber() : this.generateRegistrySequentialNumber();
        const factoryName = factorySelect.options[factorySelect.selectedIndex]?.text || factorySelect.value;
        const locationName = locationSelect.options[locationSelect.selectedIndex]?.text || locationSelect.value;
        const incidentDateTime = new Date(dateInput.value + 'T' + timeInput.value);
        const dayInput = modal.querySelector('#manual-incident-day');
        const incidentDay = dayInput?.value || this.getDayName(incidentDateTime);

        // حساب إجمالي أيام الإجازة — بدون تواريخ كاملة = 0 يوم
        let leaveStartValue = leaveStartDateInput?.value || '';
        let returnToWorkValue = returnToWorkDateInput?.value || '';
        let totalLeaveDays = this.calculateTotalLeaveDays(leaveStartValue, returnToWorkValue);
        if (totalLeaveDays <= 0) {
            leaveStartValue = '';
            returnToWorkValue = '';
            totalLeaveDays = 0;
        }

        const entry = {
            id: Utils.generateId('INCR'),
            sequentialNumber: sequentialNumber.toString(),
            incidentId: null,
            incidentType: typeSelect.value, // New Field
            factory: factoryName,
            incidentLocation: locationName,
            incidentDate: incidentDateTime.toISOString(),
            incidentDay: incidentDay,
            incidentTime: timeInput.value,
            shift: shiftSelect.value,

            // Employee Info (Conditional)
            employeeAffiliation: affiliationInput?.value || '', // New
            employeeCode: employeeCodeInput?.value.trim() || '',
            employeeName: employeeNameInput?.value.trim() || '',
            employeeJob: employeeJobInput?.value.trim() || '',
            employeeDepartment: employeeDeptInput?.value.trim() || '', // Now linked to employee section

            // Details
            incidentDetails: briefDescInput.value.trim(), // Mapped from Brief Description
            injuryDescription: injuryDescInput?.value.trim() || '', // New Field
            losses: lossesInput?.value.trim() || '', // New Field
            actionsTaken: actionsInput?.value.trim() || '', // New Field

            incidentDetailsBrief: briefDescInput.value.trim(), // redundancy if needed or just use incidentDetails as main

            // Legacy/Optional mappings
            injuredPart: (() => {
                const inj = injuryDescInput?.value.trim() || '';
                const inferred = this.extractInjuredPart(briefDescInput.value.trim(), inj);
                return inferred !== 'غير محدد' ? inferred : (inj || 'غير محدد');
            })(),
            equipmentCause: 'غير محدد', // Removed specific field in form, default to generic

            leaveStartDate: leaveStartValue,
            returnToWorkDate: returnToWorkValue,
            totalLeaveDays: totalLeaveDays,

            status: 'مفتوح',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // إنشاء حادث في قائمة الحوادث حتى يظهر للمدير في تبويب الموافقات (إرسال للاعتماد)
        const incidentId = typeof Utils.generateSequentialId === 'function'
            ? Utils.generateSequentialId('INC', AppState.appData?.incidents || [])
            : Utils.generateId('INC');
        const incident = {
            id: incidentId,
            isoCode: this.generateISOCode('INC'),
            title: (entry.incidentDetailsBrief || entry.incidentDetails || 'حادث من الإدخال اليدوي').substring(0, 200),
            description: entry.incidentDetails || '',
            location: entry.incidentLocation || entry.factory || '',
            date: entry.incidentDate,
            severity: 'متوسطة',
            incidentType: entry.incidentType || '',
            status: 'مفتوح',
            requiresApproval: true,
            reportedBy: AppState.currentUser?.name || AppState.currentUser?.displayName || 'إدخال يدوي',
            reporterName: AppState.currentUser?.name || AppState.currentUser?.displayName || '',
            department: entry.employeeDepartment || '',
            affectedName: entry.employeeName || '',
            affectedCode: entry.employeeCode || '',
            affectedJobTitle: entry.employeeJob || '',
            affectedDepartment: entry.employeeDepartment || '',
            employeeCode: entry.employeeCode || '',
            employeeName: entry.employeeName || '',
            employeeJob: entry.employeeJob || '',
            employeeDepartment: entry.employeeDepartment || '',
            createdBy: AppState.currentUser ? {
                id: AppState.currentUser.id || '',
                name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                email: AppState.currentUser.email || ''
            } : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        entry.incidentId = incident.id;

        Loading.show('جاري الحفظ...');
        try {
            this._manualEntrySubmitting = true;
            if (!AppState.appData.incidents) AppState.appData.incidents = [];
            AppState.appData.incidents.push(incident);
            this.registryData.push(entry);

            // حفظ محلي (قائمة الحوادث + السجل)
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }
            await this.saveRegistryData({ sync: false });

            Loading.hide();
            Notification.success('تم إضافة الحادث بنجاح. سيظهر للمدير في تبويب الموافقات للاعتماد.');
            modal.remove();

            // تحديث عرض السجل (بدون تعطيل واجهة المستخدم)
            setTimeout(async () => {
                try {
                    if (this.currentTab === 'registry') {
                        const contentContainer = document.getElementById('incidents-tab-content');
                        if (contentContainer) {
                            contentContainer.innerHTML = await this.renderRegistryTab();
                            this.setupTabEventListeners('registry');
                        }
                    }
                } catch (e) {
                    Utils.safeWarn('تعذر تحديث عرض السجل بعد الحفظ:', e);
                }
            }, 0);

            // المزامنة في الخلفية (Incidents + IncidentsRegistry + Clinic Sick Leave)
            setTimeout(() => {
                try {
                    if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
                        // ✅ إصلاح التكرار: نستخدم autoSave('Incidents') فقط (saveToSheet → UPSERT بالـ id)
                        // كان السابق يستدعي أيضاً action 'addIncident' (appendToSheet) بالتوازي → سباق
                        // قراءة/كتابة يُنتج صفّين لنفس الحادث. autoSave وحده كافٍ وآمن من التكرار.
                        GoogleIntegration.autoSave('Incidents', AppState.appData.incidents).catch((err) => {
                            Utils.safeWarn('⚠️ فشل مزامنة الحوادث في الخلفية:', err);
                        });
                        GoogleIntegration.autoSave('IncidentsRegistry', this.registryData).catch((err) => {
                            Utils.safeWarn('⚠️ فشل مزامنة سجل الحوادث في الخلفية:', err);
                        });
                    }
                } catch (e) {
                    Utils.safeWarn('⚠️ خطأ أثناء مزامنة البيانات في الخلفية:', e);
                }

                this.syncClinicSickLeaveFromRegistryEntry(entry, {
                    treatingDoctor: treatingDoctorInput?.value || '',
                    actions: actionsInput?.value || ''
                }).catch((e) => {
                    Utils.safeWarn('تعذر ربط الإجازة المرضية بالعيادة:', e);
                });
            }, 0);
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ أثناء الحفظ: ' + error.message);
            Utils.safeError('خطأ في حفظ الإدخال اليدوي:', error);
        } finally {
            this._manualEntrySubmitting = false;
        }
    },

    /**
     * ربط بيانات الإجازة المرضية من سجل الحوادث (الإدخال اليدوي) إلى موديول العيادة (سجل الإجازات المرضية)
     * - يسجل محلياً في AppState.appData.sickLeave
     * - ثم يرسل إلى Google Sheets في الخلفية عبر action:addSickLeave
     */
    async syncClinicSickLeaveFromRegistryEntry(entry, options = {}) {
        try {
            if (!entry) return false;

            // Only for company employees with actual lost work days
            const employeeCode = (entry.employeeCode || '').toString().trim();
            const employeeName = (entry.employeeName || '').toString().trim();
            const employeeDepartment = (entry.employeeDepartment || '').toString().trim();
            const totalLeaveDays = parseInt(entry.totalLeaveDays, 10) || 0;
            const startDateStr = (entry.leaveStartDate || '').toString().trim();
            const endDateStr = (entry.returnToWorkDate || '').toString().trim();

            if (!employeeCode || !employeeName || !employeeDepartment) return false;
            if (totalLeaveDays <= 0) return false;
            if (!startDateStr || !endDateStr) return false;

            if (typeof Clinic === 'undefined' || typeof Clinic.normalizeSickLeaveRecord !== 'function') {
                return false;
            }

            // Ensure clinic data arrays exist & are normalized
            try { Clinic.ensureData?.(); } catch (e) { /* ignore */ }

            // Prevent duplicates if user saves multiple times
            const existing = (AppState.appData?.sickLeave || []).some((leave) => leave?.linkedRegistryId === entry.id);
            if (existing) return true;

            const safeDateToIso = (yyyyMmDd) => {
                try {
                    const d = new Date(`${yyyyMmDd}T00:00:00`);
                    if (Number.isNaN(d.getTime())) return null;
                    return d.toISOString();
                } catch {
                    return null;
                }
            };

            const startISO = safeDateToIso(startDateStr);
            const endISO = safeDateToIso(endDateStr);
            if (!startISO || !endISO) return false;

            const treatingDoctor = (options.treatingDoctor || '').toString().trim();
            const actions = (options.actions || entry.actionsTaken || '').toString().trim();

            const reasonParts = [];
            if (entry.injuryDescription) reasonParts.push(`تفاصيل الإجازة/الإصابة: ${entry.injuryDescription}`);
            if (entry.incidentDetails) reasonParts.push(`ملخص الحادث: ${entry.incidentDetails}`);
            const reason = reasonParts.join('\n') || 'إجازة مرضية مرتبطة بحادث';

            const createdBy = AppState.currentUser ? {
                id: AppState.currentUser.id || '',
                name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                email: AppState.currentUser.email || ''
            } : null;

            const payload = Clinic.normalizeSickLeaveRecord({
                id: Utils.generateId('SICK_LEAVE'),
                personType: 'employee',
                employeeName,
                employeeCode,
                employeeNumber: employeeCode,
                employeePosition: entry.employeeJob || '',
                employeeDepartment,
                startDate: startISO,
                endDate: endISO,
                reason,
                medicalNotes: actions,
                treatingDoctor,
                createdAt: new Date().toISOString(),
                createdBy,
                createdById: createdBy?.id || AppState.currentUser?.id || '',
                updatedAt: new Date().toISOString()
            });

            // Link back to the registry entry (extra fields are safe to keep)
            payload.linkedRegistryId = entry.id || '';
            payload.sourceType = 'IncidentsRegistryManual';

            if (!AppState.appData) AppState.appData = {};
            if (!Array.isArray(AppState.appData.sickLeave)) AppState.appData.sickLeave = [];
            AppState.appData.sickLeave.push(payload);

            // Save locally
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            // Sync in background
            try {
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                    await GoogleIntegration.sendRequest({ action: 'addSickLeave', data: payload });
                }
            } catch (syncError) {
                Utils.safeWarn('⚠️ فشل مزامنة الإجازة المرضية مع Google Sheets:', syncError);
            }

            return true;
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في ربط الإجازة المرضية:', error);
            return false;
        }
    },

    /**
     * تطبيق فلاتر السجل
     */
    applyRegistryFilters() {
        const searchTerm = document.getElementById('incidents-registry-search')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('incidents-registry-filter-status')?.value || '';
        const dateFrom = document.getElementById('incidents-registry-filter-date-from')?.value || '';
        const dateTo = document.getElementById('incidents-registry-filter-date-to')?.value || '';

        let filtered = [...this.getLinkedRegistryEntries()];

        if (searchTerm) {
            filtered = filtered.filter(entry =>
                (entry.sequentialNumber?.toString().includes(searchTerm)) ||
                (entry.employeeName?.toLowerCase().includes(searchTerm)) ||
                (entry.employeeCode?.toLowerCase().includes(searchTerm)) ||
                (entry.factory?.toLowerCase().includes(searchTerm)) ||
                (entry.incidentLocation?.toLowerCase().includes(searchTerm))
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(entry => entry.status === statusFilter);
        }

        if (dateFrom) {
            filtered = filtered.filter(entry => {
                if (!entry.incidentDate) return false;
                const entryDate = this.safeDateToISOString(entry.incidentDate, 10);
                if (!entryDate) return false;
                return entryDate >= dateFrom;
            });
        }

        if (dateTo) {
            filtered = filtered.filter(entry => {
                if (!entry.incidentDate) return false;
                const entryDate = this.safeDateToISOString(entry.incidentDate, 10);
                if (!entryDate) return false;
                return entryDate <= dateTo;
            });
        }

        // تحديث الجدول
        this.renderFilteredRegistryTable(filtered);
    },

    /**
     * عرض جدول السجل المفلتر
     */
    renderFilteredRegistryTable(filteredData) {
        const tableContainer = document.querySelector('#incidents-tab-content .table-responsive');
        if (!tableContainer) return;

        if (filteredData.length === 0) {
            tableContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">لا توجد نتائج للبحث</p>
                </div>
            `;
            return;
        }

        const formatDate = (dateStr) => {
            if (!dateStr) return '-';
            try {
                const date = new Date(dateStr);
                return date.toLocaleDateString('ar-SA');
            } catch {
                return '-';
            }
        };

        let tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>مسلسل</th>
                        <th>المصنع</th>
                        <th>مكان الحادث</th>
                        <th>تاريخ الحادث</th>
                        <th>يوم الحادث</th>
                        <th>وقت الحادث</th>
                        <th>الوردية</th>
                        <th>كود الموظف</th>
                        <th>اسم الموظف</th>
                        <th>الوظيفة</th>
                        <th>الإدارة / القسم</th>
                        <th>تفاصيل الحادث</th>
                        <th>الجزء المصاب</th>
                        <th>المعدة المتسببة</th>
                        <th>إجمالي أيام الإجازة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
        `;

        filteredData.forEach(entry => {
            tableHTML += `
                <tr>
                    <td>${entry.sequentialNumber || '-'}</td>
                    <td>${Utils.escapeHTML(entry.factory || '-')}</td>
                    <td>${Utils.escapeHTML(entry.incidentLocation || '-')}</td>
                    <td>${formatDate(entry.incidentDate)}</td>
                    <td>${Utils.escapeHTML(entry.incidentDay || '-')}</td>
                    <td>${Utils.escapeHTML(entry.incidentTime || '-')}</td>
                    <td>${Utils.escapeHTML(entry.shift || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeCode || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeName || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeJob || '-')}</td>
                    <td>${Utils.escapeHTML(entry.employeeDepartment || '-')}</td>
                    <td>${Utils.escapeHTML((entry.incidentDetails || '-').substring(0, 50))}${(entry.incidentDetails || '').length > 50 ? '...' : ''}</td>
                    <td>${Utils.escapeHTML(entry.injuredPart || '-')}</td>
                    <td>${Utils.escapeHTML(entry.equipmentCause || '-')}</td>
                    <td>${entry.totalLeaveDays || 0} يوم</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <button onclick="Incidents.viewRegistryEntry('${entry.id}')" class="btn-icon btn-icon-info" title="عرض التفاصيل">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${entry.incidentId ? `
                                <button onclick="Incidents.viewIncident('${entry.incidentId}')" class="btn-icon btn-icon-primary" title="عرض الحادث">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </button>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = tableHTML;
    },

    /**
     * تصدير السجل إلى Excel
     */
    exportRegistryToExcel() {
        try {
            const data = this.registryData;
            if (data.length === 0) {
                Notification.warning('لا توجد بيانات للتصدير');
                return;
            }

            let csvContent = '\ufeff'; // BOM for UTF-8
            csvContent += 'مسلسل,المصنع,مكان الحادث,تاريخ الحادث,يوم الحادث,وقت الحادث,الوردية,كود الموظف,اسم الموظف,الوظيفة,الإدارة / القسم,تفاصيل الحادث,الجزء المصاب,المعدة المتسببة,إجمالي أيام الإجازة\n';

            data.forEach(entry => {
                const row = [
                    entry.sequentialNumber || '',
                    entry.factory || '',
                    entry.incidentLocation || '',
                    entry.incidentDate ? new Date(entry.incidentDate).toLocaleDateString('ar-SA') : '',
                    entry.incidentDay || '',
                    entry.incidentTime || '',
                    entry.shift || '',
                    entry.employeeCode || '',
                    entry.employeeName || '',
                    entry.employeeJob || '',
                    entry.employeeDepartment || '',
                    (entry.incidentDetails || '').replace(/,/g, ';'),
                    entry.injuredPart || '',
                    entry.equipmentCause || '',
                    entry.totalLeaveDays || 0
                ];
                csvContent += row.join(',') + '\n';
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `سجل_الحوادث_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 0);

            Notification.success('تم تصدير السجل بنجاح');
        } catch (error) {
            Notification.error('حدث خطأ أثناء التصدير: ' + error.message);
            Utils.safeError('خطأ في تصدير السجل:', error);
        }
    },

    /**
     * تصدير السجل إلى PDF
     */
    exportRegistryToPDF() {
        try {
            const data = this.registryData;
            if (data.length === 0) {
                Notification.warning('لا توجد بيانات للتصدير');
                return;
            }

            // استخدام نفس آلية تصدير PDF للحوادث
            const content = this.buildRegistryPDFContent(data);
            const htmlContent = `
                <html lang="ar" dir="rtl">
                    <head>
                        <meta charset="UTF-8">
                        <style>
                            @page { size: A4 landscape; margin: 1cm; }
                            @media print {
                                @page { size: A4 landscape; margin: 1cm; }
                            }
                            body { font-family: 'Cairo', 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; page-break-inside: auto; }
                            th, td { border: 1px solid #ddd; padding: 6px; text-align: right; }
                            th { background-color: #f2f2f2; font-weight: bold; }
                            tr { page-break-inside: avoid; }
                            tr:nth-child(even) { background-color: #f9f9f9; }
                            thead { display: table-header-group; }
                        </style>
                    </head>
                    <body>
                        <h1>سجل الحوادث</h1>
                        <p>تاريخ التصدير: ${new Date().toLocaleDateString('ar-SA')}</p>
                        ${content}
                    </body>
                </html>
            `;

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');

            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                            Notification.success('تم تجهيز التقرير للطباعة/الحفظ كـ PDF');
                        }, 500);
                    }, 300);
                };
            } else {
                Notification.error('تعذر فتح نافذة التصدير. يرجى السماح بالنوافذ المنبثقة.');
            }
        } catch (error) {
            Notification.error('حدث خطأ أثناء التصدير: ' + error.message);
            Utils.safeError('خطأ في تصدير السجل:', error);
        }
    },

    /**
     * بناء محتوى PDF للسجل
     */
    buildRegistryPDFContent(data) {
        const formatDate = (dateStr) => {
            if (!dateStr) return '-';
            try {
                return new Date(dateStr).toLocaleDateString('ar-SA');
            } catch {
                return '-';
            }
        };

        let tableRows = '';
        data.forEach(entry => {
            tableRows += `
                <tr>
                    <td>${entry.sequentialNumber || '-'}</td>
                    <td>${entry.factory || '-'}</td>
                    <td>${entry.incidentLocation || '-'}</td>
                    <td>${formatDate(entry.incidentDate)}</td>
                    <td>${entry.incidentDay || '-'}</td>
                    <td>${entry.incidentTime || '-'}</td>
                    <td>${entry.shift || '-'}</td>
                    <td>${entry.employeeCode || '-'}</td>
                    <td>${entry.employeeName || '-'}</td>
                    <td>${entry.employeeJob || '-'}</td>
                    <td>${entry.employeeDepartment || '-'}</td>
                    <td>${(entry.incidentDetails || '-').substring(0, 100)}</td>
                    <td>${entry.injuredPart || '-'}</td>
                    <td>${entry.equipmentCause || '-'}</td>
                    <td>${entry.totalLeaveDays || 0}</td>
                </tr>
            `;
        });

        return `
            <table>
                <thead>
                    <tr>
                        <th>مسلسل</th>
                        <th>المصنع</th>
                        <th>مكان الحادث</th>
                        <th>تاريخ الحادث</th>
                        <th>يوم الحادث</th>
                        <th>وقت الحادث</th>
                        <th>الوردية</th>
                        <th>كود الموظف</th>
                        <th>اسم الموظف</th>
                        <th>الوظيفة</th>
                        <th>الإدارة / القسم</th>
                        <th>تفاصيل الحادث</th>
                        <th>الجزء المصاب</th>
                        <th>المعدة المتسببة</th>
                        <th>إجمالي أيام الإجازة</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        `;
    },

    renderAnalysisContent(settings) {
        const analytics = this.buildThreeYearAnalytics();
        const { yearlyStats, totals, severityTotals } = analytics;

        // Render based on admin settings
        const enabledSections = settings?.enabledSections || ['summary', 'trends', 'severity', 'department'];

        let content = '';

        if (enabledSections.includes('summary')) {
            content += `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">ملخص عام</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <p class="text-sm text-gray-600 mb-2">إجمالي الحوادث</p>
                            <p class="text-2xl font-bold">${totals.totalIncidents}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <p class="text-sm text-gray-600 mb-2">معدل الإغلاق</p>
                            <p class="text-2xl font-bold text-green-600">${totals.closureRate.toFixed(1)}%</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <p class="text-sm text-gray-600 mb-2">متوسط سنوي</p>
                            <p class="text-2xl font-bold">${totals.averagePerYear.toFixed(1)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        if (enabledSections.includes('trends')) {
            content += `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">الاتجاهات</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>السنة</th>
                                    <th>عدد الحوادث</th>
                                    <th>الحوادث المغلقة</th>
                                    <th>معدل الإغلاق</th>
                                    <th>التغيير</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${yearlyStats.map((stat, index) => {
                const prevStat = yearlyStats[index + 1];
                const change = prevStat ? ((stat.total - prevStat.total) / prevStat.total * 100).toFixed(1) : '-';
                const changeClass = change !== '-' ? (change > 0 ? 'text-red-600' : 'text-green-600') : '';
                return `
                                        <tr>
                                            <td>${stat.year}</td>
                                            <td>${stat.total}</td>
                                            <td>${stat.closed}</td>
                                            <td>${stat.closureRate.toFixed(1)}%</td>
                                            <td class="${changeClass}">${change !== '-' ? (change > 0 ? '+' : '') + change + '%' : '-'}</td>
                                        </tr>
                                    `;
            }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        if (enabledSections.includes('severity')) {
            content += `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">توزيع الحوادث حسب الشدة</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="border border-red-200 rounded-lg p-4 bg-red-50">
                            <p class="text-sm text-red-700 mb-1">عالية</p>
                            <p class="text-2xl font-bold text-red-600">${severityTotals.high || 0}</p>
                        </div>
                        <div class="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                            <p class="text-sm text-yellow-700 mb-1">متوسطة</p>
                            <p class="text-2xl font-bold text-yellow-600">${severityTotals.medium || 0}</p>
                        </div>
                        <div class="border border-blue-200 rounded-lg p-4 bg-blue-50">
                            <p class="text-sm text-blue-700 mb-1">منخفضة</p>
                            <p class="text-2xl font-bold text-blue-600">${severityTotals.low || 0}</p>
                        </div>
                        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <p class="text-sm text-gray-700 mb-1">أخرى</p>
                            <p class="text-2xl font-bold text-gray-600">${severityTotals.other || 0}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        if (enabledSections.includes('department')) {
            // Group by department
            const departmentStats = {};
            analytics.incidents.forEach(({ incident }) => {
                const dept = incident?.department || 'غير محدد';
                departmentStats[dept] = (departmentStats[dept] || 0) + 1;
            });

            const deptRows = Object.entries(departmentStats)
                .sort((a, b) => b[1] - a[1])
                .map(([dept, count]) => `
                    <tr>
                        <td>${Utils.escapeHTML(dept)}</td>
                        <td>${count}</td>
                        <td>${totals.totalIncidents > 0 ? ((count / totals.totalIncidents) * 100).toFixed(1) : '0.0'}%</td>
                    </tr>
                `).join('');

            content += `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">توزيع الحوادث حسب الإدارة</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>الإدارة</th>
                                    <th>عدد الحوادث</th>
                                    <th>النسبة</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${deptRows || '<tr><td colspan="3" class="text-center text-gray-500">لا توجد بيانات</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        if (enabledSections.includes('location')) {
            // Group by location
            const locationStats = {};
            analytics.incidents.forEach(({ incident }) => {
                const loc = incident?.location || 'غير محدد';
                locationStats[loc] = (locationStats[loc] || 0) + 1;
            });

            const locRows = Object.entries(locationStats)
                .sort((a, b) => b[1] - a[1])
                .map(([loc, count]) => `
                    <tr>
                        <td>${Utils.escapeHTML(loc)}</td>
                        <td>${count}</td>
                        <td>${totals.totalIncidents > 0 ? ((count / totals.totalIncidents) * 100).toFixed(1) : '0.0'}%</td>
                    </tr>
                `).join('');

            content += `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-4">توزيع الحوادث حسب الموقع</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>الموقع</th>
                                    <th>عدد الحوادث</th>
                                    <th>النسبة</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${locRows || '<tr><td colspan="3" class="text-center text-gray-500">لا توجد بيانات</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        return content || '<p class="text-gray-500 text-center py-8">لا توجد أقسام تحليل مفعلة حالياً.</p>';
    },

    async getAnalysisSettings() {
        try {
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callAppsScript) {
                const result = await GoogleIntegration.callAppsScript('getIncidentAnalysisSettings');
                if (result && result.success) {
                    return result.data || {};
                }
            }
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في جلب إعدادات التحليل:', error);
        }

        // Fallback: try local storage
        try {
            const localSettings = localStorage.getItem('incident_analysis_settings');
            if (localSettings) {
                return JSON.parse(localSettings);
            }
        } catch (e) {
            // Ignore
        }

        // Default settings
        return {
            enabledSections: ['summary', 'trends', 'severity', 'department']
        };
    },

    isAdmin() {
        if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function') {
            return Permissions.isCurrentUserAdmin();
        }
        return (AppState.currentUser?.role || '').toLowerCase() === 'admin';
    },

    canDeleteIncident(user = AppState.currentUser) {
        if (!user) return false;
        if (this.isAdmin()) return true;
        let perms = user.permissions;
        if (typeof Permissions !== 'undefined' && typeof Permissions.normalizePermissions === 'function') {
            perms = Permissions.normalizePermissions(perms) || perms;
        } else if (typeof perms === 'string') {
            try { perms = JSON.parse(perms); } catch (_e) { perms = null; }
        }
        if (perms && typeof perms === 'object') {
            return perms.admin === true ||
                perms['manage-modules'] === true ||
                perms['incidents-manage'] === true;
        }
        return false;
    },

    renderIncidentDeleteButton(incidentId, title = 'حذف (مدير النظام فقط)') {
        if (!this.canDeleteIncident()) return '';
        const id = String(incidentId || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `
            <button onclick="Incidents.deleteIncident('${id}')" class="btn-icon btn-icon-danger" title="${Utils.escapeHTML(title)}">
                <i class="fas fa-trash"></i>
            </button>`;
    },

    setupTabEventListeners(tabName) {
        if (tabName === 'incidents-list') {
            this.loadIncidentsList();
        } else if (tabName === 'analysis') {
            // ✅ لوحة التحليلات الجديدة: ربط الأحداث + أول رسم
            this._incidentBindAnalyticsEvents();
            setTimeout(() => { this.updateIncidentAnalyticsDashboard(); }, 150);
        } else if (tabName === 'registry') {
            // Setup registry tab event listeners
            setTimeout(() => {
                const registryAddBtn = document.getElementById('incidents-registry-add-manual');
                if (registryAddBtn && !registryAddBtn.dataset.listenerAdded) {
                    registryAddBtn.addEventListener('click', () => this.showManualEntryForm());
                    registryAddBtn.dataset.listenerAdded = 'true';
                }

                const registrySearch = document.getElementById('incidents-registry-search');
                const registryFilterStatus = document.getElementById('incidents-registry-filter-status');
                const registryFilterDateFrom = document.getElementById('incidents-registry-filter-date-from');
                const registryFilterDateTo = document.getElementById('incidents-registry-filter-date-to');

                if (registrySearch && !registrySearch.dataset.listenerAdded) {
                    registrySearch.addEventListener('input', () => this.applyRegistryFilters());
                    registrySearch.dataset.listenerAdded = 'true';
                }
                if (registryFilterStatus && !registryFilterStatus.dataset.listenerAdded) {
                    registryFilterStatus.addEventListener('change', () => this.applyRegistryFilters());
                    registryFilterStatus.dataset.listenerAdded = 'true';
                }
                if (registryFilterDateFrom && !registryFilterDateFrom.dataset.listenerAdded) {
                    registryFilterDateFrom.addEventListener('change', () => this.applyRegistryFilters());
                    registryFilterDateFrom.dataset.listenerAdded = 'true';
                }
                if (registryFilterDateTo && !registryFilterDateTo.dataset.listenerAdded) {
                    registryFilterDateTo.addEventListener('change', () => this.applyRegistryFilters());
                    registryFilterDateTo.dataset.listenerAdded = 'true';
                }

                const registryExportExcel = document.getElementById('incidents-registry-export-excel');
                const registryExportPDF = document.getElementById('incidents-registry-export-pdf');
                if (registryExportExcel && !registryExportExcel.dataset.listenerAdded) {
                    registryExportExcel.addEventListener('click', () => this.exportRegistryToExcel());
                    registryExportExcel.dataset.listenerAdded = 'true';
                }
                if (registryExportPDF && !registryExportPDF.dataset.listenerAdded) {
                    registryExportPDF.addEventListener('click', () => this.exportRegistryToPDF());
                    registryExportPDF.dataset.listenerAdded = 'true';
                }
            }, 100);
        } else if (tabName === 'annual-log' || tabName === 'detailed-log') {
            // Setup export buttons for annual and detailed logs
            const previewBtn = document.getElementById('incidents-report-preview');
            if (previewBtn) {
                previewBtn.addEventListener('click', () => this.openReportPreview());
            }

            document.querySelectorAll('[data-incidents-export]').forEach((btn) => {
                const format = btn.getAttribute('data-incidents-export');
                btn.addEventListener('click', () => this.exportIncidentsReport(format));
            });
        } else if (tabName === 'approvals') {
            // Setup approvals tab event listeners
            setTimeout(() => {
                const approvalsSearch = document.getElementById('approvals-search');
                if (approvalsSearch && !approvalsSearch.dataset.listenerAdded) {
                    approvalsSearch.addEventListener('input', (e) => {
                        const searchTerm = e.target.value.toLowerCase();
                        const rows = document.querySelectorAll('#approvals-table-body tr[data-incident-id]');
                        rows.forEach(row => {
                            const text = row.textContent.toLowerCase();
                            row.style.display = text.includes(searchTerm) ? '' : 'none';
                        });
                    });
                    approvalsSearch.dataset.listenerAdded = 'true';
                }
            }, 100);
        }
    },

    async showAnalysisSettingsModal() {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية لتعديل إعدادات التحليل');
            return;
        }

        const currentSettings = await this.getAnalysisSettings();
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        إعدادات تحليل الحوادث
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="analysis-settings-form" class="space-y-6">
                        <div>
                            <h3 class="text-base font-semibold text-gray-700 mb-4">الأقسام المعروضة</h3>
                            <p class="text-sm text-gray-600 mb-4">اختر الأقسام التي تريد عرضها في تبويب تحليل الحوادث:</p>
                            <div class="space-y-3">
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="summary" 
                                        ${(currentSettings.enabledSections || []).includes('summary') ? 'checked' : ''}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">ملخص عام</span>
                                        <p class="text-xs text-gray-500">عرض إجمالي الحوادث، معدل الإغلاق، والمتوسط السنوي</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="trends" 
                                        ${(currentSettings.enabledSections || []).includes('trends') ? 'checked' : ''}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">الاتجاهات</span>
                                        <p class="text-xs text-gray-500">عرض اتجاهات الحوادث على مر السنين</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="severity" 
                                        ${(currentSettings.enabledSections || []).includes('severity') ? 'checked' : ''}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">توزيع الشدة</span>
                                        <p class="text-xs text-gray-500">عرض توزيع الحوادث حسب الشدة (عالية، متوسطة، منخفضة)</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="department" 
                                        ${(currentSettings.enabledSections || []).includes('department') ? 'checked' : ''}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">توزيع الإدارات</span>
                                        <p class="text-xs text-gray-500">عرض توزيع الحوادث حسب الإدارة</p>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="enabledSections" value="location" 
                                        ${(currentSettings.enabledSections || []).includes('location') ? 'checked' : ''}
                                        class="form-checkbox">
                                    <div>
                                        <span class="font-medium">توزيع المواقع</span>
                                        <p class="text-xs text-gray-500">عرض توزيع الحوادث حسب الموقع</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button class="btn-primary" onclick="Incidents.saveAnalysisSettings(); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-save ml-2"></i>
                        حفظ الإعدادات
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const ok = confirm('تنبيه: سيتم إغلاق النموذج.\nقد تفقد أي بيانات غير محفوظة.\n\nهل تريد الإغلاق؟');
                if (ok) modal.remove();
            }
        });
    },

    async saveAnalysisSettings() {
        if (!this.isAdmin()) {
            Notification.error('ليس لديك صلاحية لتعديل إعدادات التحليل');
            return;
        }

        const form = document.getElementById('analysis-settings-form');
        if (!form) return;

        const checkboxes = form.querySelectorAll('input[name="enabledSections"]:checked');
        const enabledSections = Array.from(checkboxes).map(cb => cb.value);

        const settings = {
            enabledSections: enabledSections.length > 0 ? enabledSections : ['summary', 'trends', 'severity', 'department'],
            updatedAt: new Date().toISOString(),
            updatedBy: AppState.currentUser?.email || AppState.currentUser?.name || 'Unknown'
        };

        try {
            Loading.show();
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callAppsScript) {
                const result = await GoogleIntegration.callAppsScript('saveIncidentAnalysisSettings', { settings });
                if (result && result.success) {
                    Notification.success('تم حفظ إعدادات التحليل بنجاح');
                    // Refresh analysis tab
                    if (this.currentTab === 'analysis') {
                        const contentContainer = document.getElementById('incidents-tab-content');
                        if (contentContainer) {
                            contentContainer.innerHTML = await this.renderTabContent('analysis');
                            this.setupTabEventListeners('analysis');
                        }
                    }
                } else {
                    Notification.error(result?.message || 'فشل حفظ الإعدادات');
                }
            } else {
                // Fallback: save to local storage
                localStorage.setItem('incident_analysis_settings', JSON.stringify(settings));
                Notification.success('تم حفظ الإعدادات محلياً');
                if (this.currentTab === 'analysis') {
                    const contentContainer = document.getElementById('incidents-tab-content');
                    if (contentContainer) {
                        contentContainer.innerHTML = await this.renderTabContent('analysis');
                        this.setupTabEventListeners('analysis');
                    }
                }
            }
            Loading.hide();
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في حفظ إعدادات التحليل:', error);
            Notification.error('حدث خطأ أثناء حفظ الإعدادات');
        }
    },

    renderAnalytics() {
        const analytics = this.buildThreeYearAnalytics();
        const { yearlyStats, totals, severityTotals } = analytics;
        const improvementInfo = this.formatImprovementValue(analytics.currentImprovement);
        const hasIncidents = totals.totalIncidents > 0;
        const formatDate = (date) => {
            if (!date) return '-';
            try {
                if (typeof Utils !== 'undefined') {
                    if (typeof Utils.formatDateTime === 'function') {
                        return Utils.formatDateTime(date instanceof Date ? date.toISOString() : date);
                    }
                    if (typeof Utils.formatDate === 'function') {
                        return Utils.formatDate(date instanceof Date ? date.toISOString() : date);
                    }
                }
            } catch (error) {
                // تجاهل أي أخطاء تنسيق
            }
            const parsed = date instanceof Date ? date : new Date(date);
            if (Number.isNaN(parsed.getTime())) return '-';
            return parsed.toLocaleDateString('ar-SA');
        };

        const severityChips = [
            { label: 'عالية', value: severityTotals.high || 0, color: 'bg-red-100 text-red-700 border-red-200' },
            { label: 'متوسطة', value: severityTotals.medium || 0, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
            { label: 'منخفضة', value: severityTotals.low || 0, color: 'bg-blue-100 text-blue-700 border-blue-200' },
            { label: 'أخرى', value: severityTotals.other || 0, color: 'bg-gray-100 text-gray-700 border-gray-200' }
        ].filter(chip => chip.value > 0 || hasIncidents);

        const severityChipsContent = severityChips.length > 0
            ? severityChips.map(chip => `
                <span class="px-3 py-1 text-xs font-medium border rounded-full ${chip.color}">
                    ${chip.label}: ${chip.value}
                </span>
            `).join('')
            : '<span class="text-xs text-gray-500">لا توجد بيانات متاحة.</span>';

        const incidentSampleLimit = 20;
        const incidentRows = analytics.incidents.slice(0, incidentSampleLimit).map(({ incident, date, year }) => {
            const severityClass = this.getSeverityBadgeClass(incident?.severity);
            const statusClass = this.getStatusBadgeClass(incident?.status);
            const incidentId = incident?.id || '';
            const actionsCell = incidentId ? `
                <div class="flex items-center gap-2 justify-end">
                    <button onclick="Incidents.viewIncident('${incidentId}')" class="btn-icon btn-icon-info" title="معاينة">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="Incidents.exportPDF('${incidentId}')" class="btn-icon btn-icon-primary" title="تصدير PDF">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            ` : '<span class="text-xs text-gray-400">غير متاح</span>';
            return `
                <tr>
                    <td>${year}</td>
                    <td>${formatDate(date)}</td>
                    <td>${Utils.escapeHTML(incident?.title || '-')}</td>
                    <td>${Utils.escapeHTML(incident?.location || '-')}</td>
                    <td>
                        <span class="badge badge-${severityClass}">
                            ${Utils.escapeHTML(incident?.severity || '-')}
                        </span>
                    </td>
                    <td>
                        <span class="badge badge-${statusClass}">
                            ${Utils.escapeHTML(incident?.status || '-')}
                        </span>
                    </td>
                    <td>${actionsCell}</td>
                </tr>
            `;
        }).join('');

        const incidentTableBody = analytics.incidents.length === 0
            ? '<tr><td colspan="7" class="text-center text-gray-500 py-6">لا توجد حوادث مسجلة خلال آخر ٣ سنوات.</td></tr>'
            : incidentRows;

        const yearlyRows = yearlyStats.map((stat) => {
            const improvement = this.formatImprovementValue(stat.improvementVsPrevious);
            return `
                <tr>
                    <td>${stat.year}</td>
                    <td>${stat.total}</td>
                    <td>${stat.closed}</td>
                    <td>${stat.closureRate.toFixed(1)}%</td>
                    <td>
                        <div class="space-y-1 text-xs">
                            <div><span class="inline-block w-2 h-2 rounded-full bg-red-500 ml-1"></span>عالية: ${stat.severity.high}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-yellow-500 ml-1"></span>متوسطة: ${stat.severity.medium}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-blue-500 ml-1"></span>منخفضة: ${stat.severity.low}</div>
                            <div><span class="inline-block w-2 h-2 rounded-full bg-gray-500 ml-1"></span>أخرى: ${stat.severity.other}</div>
                        </div>
                    </td>
                    <td>
                        <span class="font-semibold ${improvement.className}">${improvement.label}</span>
                    </td>
                </tr>
            `;
        }).join('');

        const yearlyTableBody = hasIncidents
            ? yearlyRows
            : '<tr><td colspan="6" class="text-center text-gray-500 py-6">لا توجد بيانات مسجلة لآخر ٣ سنوات.</td></tr>';

        return `
            <div class="space-y-6">
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <h2 class="card-title">
                                <i class="fas fa-chart-column ml-2"></i>
                                ملخص الأداء لآخر ٣ سنوات
                            </h2>
                            <div class="flex items-center gap-2">
                                <button id="incidents-report-preview" class="btn-secondary">
                                    <i class="fas fa-eye ml-2"></i>
                                    معاينة التقرير
                                </button>
                                <button class="btn-primary" data-incidents-export="pdf">
                                    <i class="fas fa-file-pdf ml-2"></i>
                                    PDF
                                </button>
                                <button class="btn-primary" data-incidents-export="excel">
                                    <i class="fas fa-file-excel ml-2"></i>
                                    Excel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="border border-gray-200 rounded-lg p-4 bg-white">
                                <p class="text-xs text-gray-500 mb-1">إجمالي الحوادث</p>
                                <p class="text-3xl font-bold text-gray-900">${totals.totalIncidents}</p>
                                <p class="text-xs text-gray-400 mt-1">الفترة: ${totals.rangeLabel}</p>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-4 bg-white">
                                <p class="text-xs text-gray-500 mb-1">معدل الإغلاق</p>
                                <p class="text-3xl font-bold text-green-600">${totals.closureRate.toFixed(1)}%</p>
                                <p class="text-xs text-gray-400 mt-1">عدد الحوادث المغلقة: ${totals.closedIncidents}</p>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-4 bg-white">
                                <p class="text-xs text-gray-500 mb-1">معدل التحسين عن العام السابق</p>
                                <p class="text-3xl font-bold ${improvementInfo.className}">${improvementInfo.label}</p>
                                <p class="text-xs text-gray-400 mt-1">يعتمد على مقارنة ${yearlyStats[0]?.year || ''} مع ${yearlyStats[1]?.year || ''}</p>
                            </div>
                        </div>
                        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p class="text-xs text-gray-500 mb-1">متوسط الحوادث السنوي</p>
                                <p class="text-2xl font-semibold text-gray-800">${totals.averagePerYear.toFixed(1)}</p>
                                <p class="text-xs text-gray-500 mt-1">يتم احتساب المتوسط على أساس ٣ سنوات.</p>
                            </div>
                            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p class="text-xs text-gray-500 mb-2">توزيع الحوادث حسب الشدة</p>
                                <div class="flex flex-wrap gap-2">
                                    ${severityChipsContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            سجل الحوادث السنوي (آخر ٣ سنوات)
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>السنة</th>
                                        <th>إجمالي الحوادث</th>
                                        <th>الحوادث المغلقة</th>
                                        <th>معدل الإغلاق</th>
                                        <th>توزيع الشدة</th>
                                        <th>معدل التحسين</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${yearlyTableBody}
                                </tbody>
                            </table>
                        </div>
                        <p class="text-xs text-gray-500 mt-3">
                            * يتم احتساب معدل التحسين بناءً على انخفاض عدد الحوادث الإجمالي مقارنة بالعام السابق (زيادة العدد تعني تراجع الأداء).
                        </p>
                    </div>
                </div>
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title">
                                <i class="fas fa-clipboard-list ml-2"></i>
                                سجل الحوادث التفصيلي (آخر ٣ سنوات)
                            </h2>
                            <span class="text-xs text-gray-500">
                                ${analytics.incidents.length} حادث خلال الفترة
                            </span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-wrapper" style="overflow-x: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>السنة</th>
                                        <th>التاريخ</th>
                                        <th>العنوان</th>
                                        <th>الموقع</th>
                                        <th>الشدة</th>
                                        <th>الحالة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${incidentTableBody}
                                </tbody>
                            </table>
                        </div>
                        ${analytics.incidents.length > incidentSampleLimit ? `
                            <p class="text-xs text-gray-500 mt-3">
                                * تم عرض أول ${incidentSampleLimit} حوادث فقط. يمكنك الرجوع لقائمة الحوادث الكاملة للاطلاع على جميع التفاصيل.
                            </p>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    refreshAnalytics() {
        const container = document.getElementById('incident-analytics-wrapper');
        if (container) {
            container.innerHTML = this.renderAnalytics();
        }
    },

    buildReportContent() {
        const analytics = this.buildThreeYearAnalytics();
        const { yearlyStats, totals, severityTotals } = analytics;
        const improvementInfo = this.formatImprovementValue(analytics.currentImprovement);
        const escape = (value = '') => {
            const str = value == null ? '' : String(value);
            if (typeof Utils !== 'undefined' && typeof Utils.escapeHTML === 'function') {
                return Utils.escapeHTML(str);
            }
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        };
        const formatDate = (date) => {
            if (!date) return '-';
            try {
                if (typeof Utils !== 'undefined') {
                    if (typeof Utils.formatDateTime === 'function') {
                        return Utils.formatDateTime(date instanceof Date ? date.toISOString() : date);
                    }
                    if (typeof Utils.formatDate === 'function') {
                        return Utils.formatDate(date instanceof Date ? date.toISOString() : date);
                    }
                }
            } catch (error) { }
            const parsed = date instanceof Date ? date : new Date(date);
            if (Number.isNaN(parsed.getTime())) return '-';
            return parsed.toLocaleDateString('ar-SA');
        };

        const headerSection = `
            <h1 style="font-size: 20px; margin-bottom: 8px;">تقرير الحوادث - آخر ٣ سنوات</h1>
            <p style="color: #6b7280; margin-bottom: 16px;">
                الفترة: ${totals.rangeLabel} • تم التوليد في ${formatDate(new Date())}
            </p>
        `;

        const summarySection = `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #f9fafb;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">المؤشر</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">القيمة</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">تفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">إجمالي الحوادث</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${totals.totalIncidents}</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">عدد الحوادث المسجلة خلال الفترة المحددة</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">معدل الإغلاق</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${totals.closureRate.toFixed(1)}%</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">الحوادث المغلقة: ${totals.closedIncidents}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">متوسط الحوادث السنوي</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${totals.averagePerYear.toFixed(1)}</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">محسوب على أساس ثلاث سنوات</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">معدل التحسين (آخر سنة)</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${improvementInfo.label}</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${improvementInfo.value === null ? 'لا توجد بيانات للمقارنة' : improvementInfo.value > 0 ? 'انخفاض في عدد الحوادث مقارنة بالعام السابق' : 'زيادة في عدد الحوادث مقارنة بالعام السابق'}</td>
                    </tr>
                </tbody>
            </table>
        `;

        const severitySection = `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #f3f4f6;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">الشدة</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">عدد الحوادث</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">عالية</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${severityTotals.high || 0}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">متوسطة</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${severityTotals.medium || 0}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">منخفضة</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${severityTotals.low || 0}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">أخرى</td>
                        <td style="padding: 8px; border: 1px solid #e5e7eb;">${severityTotals.other || 0}</td>
                    </tr>
                </tbody>
            </table>
        `;

        const yearlyRows = yearlyStats.map((stat) => {
            const improvement = this.formatImprovementValue(stat.improvementVsPrevious);
            return `
                <tr>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${stat.year}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${stat.total}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${stat.closed}</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">${stat.closureRate.toFixed(1)}%</td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">
                        عالية: ${stat.severity.high} • متوسطة: ${stat.severity.medium} • منخفضة: ${stat.severity.low} • أخرى: ${stat.severity.other}
                    </td>
                    <td style="padding: 8px; border: 1px solid #e5e7eb;">
                        ${improvement.label}
                    </td>
                </tr>
            `;
        }).join('');

        const yearlySection = `
            <h2 style="font-size: 16px; margin: 24px 0 12px;">ملخص سنوي</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                <thead>
                    <tr style="background: #f9fafb;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">السنة</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">إجمالي الحوادث</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">الحوادث المغلقة</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">معدل الإغلاق</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">توزيع الشدة</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">معدل التحسين</th>
                    </tr>
                </thead>
                <tbody>
                    ${yearlyRows || '<tr><td colspan="6" style="text-align:center; padding: 12px; border: 1px solid #e5e7eb; color: #6b7280;">لا توجد بيانات سنوية متاحة.</td></tr>'}
                </tbody>
            </table>
        `;

        const incidentsRows = analytics.incidents.map(({ incident, date, year }) => `
            <tr>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${year}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${formatDate(date)}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${escape(incident?.title || '-')}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${escape(incident?.location || '-')}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${escape(incident?.severity || '-')}</td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">${escape(incident?.status || '-')}</td>
            </tr>
        `).join('');

        const detailsSection = `
            <h2 style="font-size: 16px; margin: 24px 0 12px;">السجل التفصيلي</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f3f4f6;">
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">السنة</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">التاريخ</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">العنوان</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">الموقع</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">الشدة</th>
                        <th style="text-align: right; padding: 8px; border: 1px solid #e5e7eb;">الحالة</th>
                    </tr>
                </thead>
                <tbody>
                    ${incidentsRows || '<tr><td colspan="6" style="text-align:center; padding: 12px; border: 1px solid #e5e7eb; color: #6b7280;">لا توجد حوادث مسجلة في السنوات الثلاث الماضية.</td></tr>'}
                </tbody>
            </table>
        `;

        return {
            headerSection,
            summarySection,
            severitySection,
            yearlySection,
            detailsSection
        };
    },

    openReportPreview() {
        const existingModal = document.getElementById(this.reportPreviewModalId);
        if (existingModal) existingModal.remove();

        const sections = this.buildReportContent();
        const modal = document.createElement('div');
        modal.id = this.reportPreviewModalId;
        modal.className = 'modal-overlay incident-professional-modal incident-modal-report-preview';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">معاينة تقرير الحوادث</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                    <div class="prose prose-sm" style="direction: rtl; text-align: right;">
                        ${sections.headerSection}
                        ${sections.summarySection}
                        ${sections.severitySection}
                        ${sections.yearlySection}
                        ${sections.detailsSection}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button class="btn-primary" onclick="Incidents.exportIncidentsReport('pdf'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-file-pdf ml-2"></i>تصدير PDF
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        if (typeof window.AppI18n !== 'undefined' && typeof window.AppI18n.applyModuleI18n === 'function') {
            window.AppI18n.applyModuleI18n(modal);
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    exportIncidentsReport(format = 'pdf') {
        const sections = this.buildReportContent();
        const content = `
            ${sections.headerSection}
            ${sections.summarySection}
            ${sections.severitySection}
            ${sections.yearlySection}
            ${sections.detailsSection}
        `;

        const filenameBase = `incidents-report-${new Date().toISOString().slice(0, 10)}`;

        if (format === 'pdf') {
            const styles = `
                <style>
                    body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; color: #111827; margin: 24px; }
                    h1, h2 { color: #1f2937; }
                    table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
                    th, td { border: 1px solid #e5e7eb; padding: 8px; font-size: 13px; }
                    thead th { background-color: #f9fafb; font-weight: 600; }
                    tbody tr:nth-child(even) { background-color: #f9fafb; }
                </style>
            `;

            const htmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
                ? FormHeader.generatePDFHTML('INCIDENTS-REPORT', 'تقرير الحوادث - آخر ٣ سنوات', content, false, true, { version: '1.0' }, new Date().toISOString(), new Date().toISOString())
                : `<html><head>${styles}</head><body>${content}</body></html>`;

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');

            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                            Notification.success('تم تجهيز التقرير للطباعة/الحفظ كـ PDF');
                        }, 500);
                    }, 300);
                };
            } else {
                Notification.error('تعذر فتح نافذة التصدير. يرجى السماح بالنوافذ المنبثقة.');
            }
            return;
        }

        if (format === 'excel') {
            const excelContent = `
                <html xmlns:o="urn:schemas-microsoft-com:office:office"
                      xmlns:x="urn:schemas-microsoft-com:office:excel"
                      xmlns="http://www.w3.org/TR/REC-html40">
                    <head>
                        <!--[if gte mso 9]><xml>
                        <x:ExcelWorkbook>
                            <x:ExcelWorksheets>
                                <x:ExcelWorksheet>
                                    <x:Name>Incidents</x:Name>
                                    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                                </x:ExcelWorksheet>
                            </x:ExcelWorksheets>
                        </x:ExcelWorkbook>
                        </xml><![endif]-->
                    </head>
                    <body>
                        ${content}
                    </body>
                </html>
            `;

            const blob = new Blob(['\ufeff', excelContent], { type: 'application/vnd.ms-excel;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filenameBase}.xls`;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 0);
            Notification.success('تم تصدير التقرير بصيغة Excel');
            return;
        }

        Notification.error('صيغة التصدير غير مدعومة.');
    },

    async renderList() {
        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2"></i>
                            قائمة الحوادث
                        </h2>
                        <div class="flex items-center gap-4 incidents-list-toolbar">
                            <div class="incident-list-filter-field">
                                <label for="incidents-search"><i class="fas fa-search"></i> بحث سريع</label>
                                <input type="text" id="incidents-search" class="form-input" style="min-width: 260px; max-width: 300px;" placeholder="العنوان، الموقع، المبلّغ...">
                            </div>
                            <div class="incident-list-filter-field">
                                <label for="incidents-filter-status"><i class="fas fa-filter"></i> حالة الحادث</label>
                                <select id="incidents-filter-status" class="form-input" style="min-width: 180px; max-width: 210px;">
                                    <option value="">جميع الحالات</option>
                                    <option value="مفتوح">مفتوح</option>
                                    <option value="قيد التحقيق">قيد التحقيق</option>
                                    <option value="تحقيق منتهي">تحقيق منتهي</option>
                                    <option value="مكتمل">مكتمل</option>
                                    <option value="مغلق">مغلق</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="incidents-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">جاري التحميل...</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async loadIncidentsList() {
        const container = document.getElementById('incidents-table-container');
        if (!container) return;

        const incidents = this.getCanonicalIncidents();
        incidents.forEach((inc) => this._normalizeIncidentApprovalRecord(inc));
        const signature = incidents.map((item) => `${item?.id || 'NA'}-${item?.updatedAt || item?.createdAt || 'NA'}`).join('|');
        if (this.lastRenderedSignature === signature && container.dataset.renderSignature === signature) {
            this.refreshAnalytics();
            return;
        }
        container.innerHTML = `
            <div class="empty-state">
                <div style="width: 300px; margin: 0 auto 16px;">
                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                    </div>
                </div>
                <p class="text-gray-500">جاري تحديث السجل...</p>
            </div>
        `;
        await new Promise((resolve) => {
            if (typeof requestIdleCallback === 'function') {
                requestIdleCallback(() => resolve(), { timeout: 200 });
            } else if (typeof requestAnimationFrame === 'function') {
                requestAnimationFrame(() => resolve());
            } else {
                setTimeout(() => resolve(), 0);
            }
        });

        if (incidents.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">لا توجد حوادث مسجلة</p>
                    <button id="add-incident-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        تسجيل حادث جديد
                    </button>
                </div>
            `;
            container.dataset.renderSignature = signature;
            this.lastRenderedSignature = signature;
            this.refreshAnalytics();
            return;
        }

        let tableHTML = '';
        try {
            tableHTML = `
                <div class="table-wrapper" style="overflow-x: auto;">
                    <table class="data-table table-header-red">
                        <thead>
                            <tr>
                                <th>العنوان</th>
                                <th>الموقع</th>
                                <th>التاريخ</th>
                                <th>الشدة</th>
                                <th>نوع الحادث</th>
                                <th>المبلغ</th>
                                <th>الأطراف / الجزء المتضرر</th>
                                <th>الحالة</th>
                                <th>حالة الاعتماد</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${incidents.map((incident) => this.renderIncidentsListRow(incident)).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } catch (error) {
            Utils.safeError('⚠️ تعذر توليد جدول الحوادث:', error);
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-4"></i>
                    <p class="text-gray-500">حدث خطأ أثناء تحميل السجل. يرجى إعادة المحاولة.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = tableHTML;
        container.dataset.renderSignature = signature;
        this.lastRenderedSignature = signature;
        this.refreshAnalytics();
        this.applyPermissions();
    },

    getSeverityBadgeClass(severity) {
        const classes = {
            'عالية': 'danger',
            'متوسطة': 'warning',
            'منخفضة': 'info'
        };
        return classes[severity] || 'secondary';
    },

    getStatusBadgeClass(status) {
        const classes = {
            'مفتوح': 'info',
            'قيد التحقيق': 'warning',
            'مكتمل': 'success',
            'مغلق': 'success',
            'في انتظار الموافقة': 'warning',
            'تحقيق منتهي': 'success'
        };
        return classes[status] || 'secondary';
    },

    renderWorkflowStatusBadge(incident) {
        const state = this.getIncidentApprovalState(incident);
        const titleParts = [];
        if (state.approverName) titleParts.push(`اعتمد: ${state.approverName}`);
        if (state.approvedAt) titleParts.push(Utils.formatDate(state.approvedAt));
        const titleAttr = titleParts.length
            ? ` title="${Utils.escapeHTML(titleParts.join(' — '))}"`
            : '';
        return `<span class="badge badge-${state.badgeClass}"${titleAttr}>${Utils.escapeHTML(state.label)}</span>`;
    },

    _coerceIncidentBoolean(value) {
        if (value === true || value === 1) return true;
        if (value === false || value === 0 || value == null || value === '') return false;
        const normalized = String(value).trim().toLowerCase();
        return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'نعم';
    },

    _resolveIncidentApproverInfo(approvedBy) {
        if (!approvedBy) return { name: '', raw: '' };
        if (typeof approvedBy === 'object') {
            const name = String(approvedBy.name || approvedBy.displayName || approvedBy.fullName || '').trim();
            const email = String(approvedBy.email || '').trim();
            return { name: name || email, raw: name || email };
        }
        const raw = String(approvedBy).trim();
        if (!raw) return { name: '', raw: '' };
        const name = raw.includes(' - ') ? raw.split(' - ')[0].trim() : raw;
        return { name, raw };
    },

    _normalizeIncidentApprovalRecord(incident) {
        if (!incident || typeof incident !== 'object') return incident;

        incident.requiresApproval = this._coerceIncidentBoolean(incident.requiresApproval);

        ['approvedBy', 'rejectedBy', 'createdBy'].forEach((field) => {
            const value = incident[field];
            if (typeof value === 'string' && value.trim().startsWith('{')) {
                try {
                    incident[field] = JSON.parse(value);
                } catch (_e) { /* keep string */ }
            }
        });

        const hasApprovalStamp = !!(incident.approvedAt || this._resolveIncidentApproverInfo(incident.approvedBy).raw);
        if (incident.requiresApproval && hasApprovalStamp && !incident.rejectionReason && !incident.rejectedAt) {
            incident.requiresApproval = false;
        }

        return incident;
    },

    normalizeAllIncidentsApprovalState() {
        (AppState.appData?.incidents || []).forEach((inc) => this._normalizeIncidentApprovalRecord(inc));
    },

    getIncidentApprovalState(incident) {
        if (!incident) {
            return {
                key: 'unknown',
                label: '—',
                badgeClass: 'secondary',
                awaitingApproval: false,
                approved: false,
                rejected: false,
                approverName: '',
                approvedAt: null
            };
        }

        const normalized = { ...incident };
        this._normalizeIncidentApprovalRecord(normalized);

        const hasInvestigation = this.hasInvestigationData(normalized);
        const investigationComplete = this.isInvestigationComplete(normalized);
        const approver = this._resolveIncidentApproverInfo(normalized.approvedBy);
        const rejected = !!(normalized.rejectedAt || normalized.rejectionReason);
        const awaitingApproval = (normalized.requiresApproval === true
            || normalized.status === 'في انتظار الموافقة') && investigationComplete;
        const approved = !awaitingApproval && !rejected && (
            !!(normalized.approvedAt || approver.raw)
            || (normalized.status === 'مكتمل' && investigationComplete)
        );

        let key = 'draft';
        let label = 'مسودة';
        let badgeClass = 'secondary';

        if (rejected) {
            key = 'rejected';
            label = 'مرفوض';
            badgeClass = 'danger';
        } else if (approved) {
            key = 'approved';
            label = 'معتمد';
            badgeClass = 'success';
        } else if (awaitingApproval) {
            key = 'pending';
            label = 'بانتظار الاعتماد';
            badgeClass = 'warning';
        } else if (investigationComplete) {
            key = 'investigation_complete';
            label = 'تحقيق منتهي';
            badgeClass = 'success';
        } else if (hasInvestigation) {
            key = 'in_progress';
            label = 'قيد التحقيق';
            badgeClass = 'info';
        }

        return {
            key,
            label,
            badgeClass,
            awaitingApproval,
            approved,
            rejected,
            approverName: approver.name,
            approvedAt: normalized.approvedAt || null
        };
    },

    _syncIncidentWorkflowOnApproval(incidentId, action) {
        try {
            if (!Array.isArray(AppState.appData?.workflows) || typeof Workflow === 'undefined') return;
            const workflow = AppState.appData.workflows.find(w =>
                w.module === 'incidents' && w.recordId === incidentId
            );
            if (!workflow) return;

            if (action === 'approved') {
                workflow.status = Workflow.STATUSES.APPROVED;
            } else if (action === 'rejected') {
                Workflow.reject(workflow, AppState.currentUser, { source: 'incidents' });
            } else if (action === 'pending') {
                workflow.status = Workflow.STATUSES.AWAITING_APPROVAL;
            }
            workflow.updatedAt = new Date().toISOString();
        } catch (_e) { /* ignore */ }
    },

    setupEventListeners() {
        setTimeout(() => {
            const openInvestigationBtn = document.getElementById('open-investigation-form-btn');
            const addEmptyBtn = document.getElementById('add-incident-empty-btn');
            const addNotificationBtn = document.getElementById('add-incident-notification-btn');

            // زر التحقيق في الحادث - يفتح قائمة لاختيار حادث
            if (openInvestigationBtn) {
                openInvestigationBtn.addEventListener('click', () => {
                    this.showInvestigationFormSelector();
                });
            }
            if (addEmptyBtn) addEmptyBtn.addEventListener('click', () => this.showNotificationForm());
            if (addNotificationBtn) addNotificationBtn.addEventListener('click', () => this.showNotificationForm());

            // تطبيق الصلاحيات
            this.applyPermissions();

            const searchInput = document.getElementById('incidents-search');
            const filterStatus = document.getElementById('incidents-filter-status');

            if (searchInput) searchInput.addEventListener('input', (e) => this.filterIncidents(e.target.value, filterStatus?.value));
            if (filterStatus) filterStatus.addEventListener('change', (e) => this.filterIncidents(searchInput?.value, e.target.value));

            const form = document.getElementById('incident-form');
            if (form) form.addEventListener('submit', (e) => this.handleSubmit(e));
            const cancelBtn = document.getElementById('cancel-incident-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    this.exitIncidentForm(this._formReturnTab || 'incidents-list');
                });
            }
            const backBtn = document.getElementById('incident-form-back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    this.exitIncidentForm(this._formReturnTab || 'incidents-list');
                });
            }

            const investigationBtn = document.getElementById('open-investigation-btn');
            if (investigationBtn && this.currentEditId) {
                investigationBtn.addEventListener('click', () => {
                    try {
                        Utils.safeLog('🔍 Investigation button clicked for incident:', this.currentEditId);
                        if (typeof this.showInvestigationForm === 'function') {
                            this.showInvestigationForm(this.currentEditId);
                        } else {
                            Utils.safeError('showInvestigationForm function not found');
                            Notification.error('نموذج التحقيق غير متاح. يرجى إعادة تحميل الصفحة.');
                        }
                    } catch (error) {
                        Utils.safeError('Error opening investigation form:', error);
                        Notification.error('حدث خطأ: ' + error.message);
                    }
                });
            } else if (investigationBtn && !this.currentEditId) {
                Utils.safeWarn('Investigation button found but currentEditId is null');
            }

            const addActionPlanBtn = document.getElementById('add-action-plan-row');
            if (addActionPlanBtn) addActionPlanBtn.addEventListener('click', () => this.addActionPlanRow());

            const affectedTypeSelect = document.getElementById('incident-affected-type');
            if (affectedTypeSelect) {
                affectedTypeSelect.addEventListener('change', (e) => this.handleAffectedTypeChange(e.target.value));
                this.handleAffectedTypeChange(affectedTypeSelect.value);
            }

            const attachmentsInput = document.getElementById('incident-attachments-input');
            if (attachmentsInput) {
                attachmentsInput.addEventListener('change', (e) => this.handleAttachmentsChange(e.target.files));
            }

            // Bind cloud upload buttons
            const availableServices = CloudStorageIntegration?.getAvailableServices() || [];
            availableServices.forEach(service => {
                const cloudBtn = document.getElementById(`incident-cloud-upload-${service}`);
                if (cloudBtn) {
                    cloudBtn.addEventListener('click', () => this.handleCloudUpload('incident', service));
                }
            });

            const previewBtn = document.getElementById('incidents-report-preview');
            if (previewBtn) previewBtn.addEventListener('click', () => this.openReportPreview());

            document.querySelectorAll('[data-incidents-export]').forEach((btn) => {
                const format = btn.getAttribute('data-incidents-export');
                btn.addEventListener('click', () => this.exportIncidentsReport(format));
            });

            // Event listeners للسجل (مع حماية من التكرار - التبويب يُحدّث عبر setupTabEventListeners عند التبديل)
            const registryAddBtn = document.getElementById('incidents-registry-add-manual');
            if (registryAddBtn && !registryAddBtn.dataset.listenerAdded) {
                registryAddBtn.addEventListener('click', () => this.showManualEntryForm());
                registryAddBtn.dataset.listenerAdded = 'true';
            }

            const registrySearch = document.getElementById('incidents-registry-search');
            const registryFilterStatus = document.getElementById('incidents-registry-filter-status');
            const registryFilterDateFrom = document.getElementById('incidents-registry-filter-date-from');
            const registryFilterDateTo = document.getElementById('incidents-registry-filter-date-to');

            if (registrySearch && !registrySearch.dataset.listenerAdded) {
                registrySearch.addEventListener('input', () => this.applyRegistryFilters());
                registrySearch.dataset.listenerAdded = 'true';
            }
            if (registryFilterStatus && !registryFilterStatus.dataset.listenerAdded) {
                registryFilterStatus.addEventListener('change', () => this.applyRegistryFilters());
                registryFilterStatus.dataset.listenerAdded = 'true';
            }
            if (registryFilterDateFrom && !registryFilterDateFrom.dataset.listenerAdded) {
                registryFilterDateFrom.addEventListener('change', () => this.applyRegistryFilters());
                registryFilterDateFrom.dataset.listenerAdded = 'true';
            }
            if (registryFilterDateTo && !registryFilterDateTo.dataset.listenerAdded) {
                registryFilterDateTo.addEventListener('change', () => this.applyRegistryFilters());
                registryFilterDateTo.dataset.listenerAdded = 'true';
            }

            const registryExportExcel = document.getElementById('incidents-registry-export-excel');
            const registryExportPDF = document.getElementById('incidents-registry-export-pdf');
            if (registryExportExcel && !registryExportExcel.dataset.listenerAdded) {
                registryExportExcel.addEventListener('click', () => this.exportRegistryToExcel());
                registryExportExcel.dataset.listenerAdded = 'true';
            }
            if (registryExportPDF && !registryExportPDF.dataset.listenerAdded) {
                registryExportPDF.addEventListener('click', () => this.exportRegistryToPDF());
                registryExportPDF.dataset.listenerAdded = 'true';
            }
        }, 100);
    },

    async exitIncidentForm(returnTab = 'incidents-list') {
        const tab = returnTab || 'incidents-list';
        this.currentEditId = null;
        this.currentAttachments = [];
        this._formReturnTab = null;

        const content = document.getElementById('incidents-content');
        if (!content) {
            if (typeof Loading !== 'undefined' && Loading.hide) Loading.hide();
            return;
        }

        content.innerHTML = await this.renderMainView();
        if (typeof this.applyModuleI18n === 'function') {
            this.applyModuleI18n(content);
        }
        this.setupEventListeners();
        this.currentTab = tab;
        await this.switchTab(tab);
        if (typeof Loading !== 'undefined' && Loading.hide) Loading.hide();
    },

    async showForm(incidentData = null) {
        if (typeof Permissions !== 'undefined' && Permissions.ensureFormSettingsState) {
            try { await Permissions.ensureFormSettingsState(); } catch (e) { /* ignore */ }
        }
        if (!this._formReturnTab) {
            this._formReturnTab = this.currentTab || 'incidents-list';
        }
        if (incidentData) this._mergeIncidentWithInvestigationData(incidentData);
        this.currentEditId = incidentData?.id || null;
        const attachments = Array.isArray(incidentData?.attachments) ? incidentData.attachments : [];
        this.currentAttachments = attachments
            .map(att => this.normalizeAttachment(att))
            .filter(Boolean);
        const content = document.getElementById('incidents-content');
        if (!content) return;

        content.innerHTML = await this.renderForm(incidentData);
        this.setupEventListeners();
        this.setupFormFields(incidentData);
        this.populateActionPlanRows(incidentData?.actionPlan || []);
        this.renderAttachmentsList();
        this.setupAffectedAutocomplete(incidentData);
    },

    async renderForm(incidentData = null) {
        const isEdit = !!incidentData;
        const isoCode = incidentData?.isoCode || this.generateISOCode('INC');
        const companyLogo = (typeof AppState !== 'undefined' && AppState.companyLogo) ? AppState.companyLogo : '';

        // استدعاء renderCloudStorageUploadButtons قبل template literal
        const cloudStorageButtons = this.renderCloudStorageUploadButtons ? this.renderCloudStorageUploadButtons('incident') : '';

        return `
            <div class="content-card">
                ${companyLogo ? `
                    <div class="mb-4 pb-4 border-b" style="direction: ltr; text-align: left;">
                        <img src="${companyLogo}" alt="شعار الشركة" style="max-height: 60px; max-width: 150px;">
                    </div>
                ` : ''}
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <h2 class="card-title mb-0">
                            <i class="fas fa-${isEdit ? 'edit' : 'plus-circle'} ml-2"></i>
                            ${isEdit ? 'تعديل حادث' : 'تسجيل حادث جديد'}
                        </h2>
                        <button type="button" id="incident-form-back-btn" class="btn-secondary btn-sm">
                            <i class="fas fa-arrow-right ml-2"></i>
                            العودة إلى القائمة
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <form id="incident-form" class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-id-card ml-2"></i>
                                    الكود الوظيفي للمبلغ *
                                </label>
                                <input 
                                    type="text" 
                                    id="incident-employee-code" 
                                    required
                                    class="form-input"
                                    value="${incidentData?.reporterCode || incidentData?.employeeCode || incidentData?.employeeNumber || ''}"
                                    placeholder="الكود الوظيفي"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-code ml-2"></i>
                                    كود ISO *
                                </label>
                                <input 
                                    type="text" 
                                    id="incident-iso-code" 
                                    class="form-input"
                                    value="${isoCode}"
                                    readonly
                                    style="background-color: #f3f4f6;"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-heading ml-2"></i>
                                    العنوان *
                                </label>
                                <input 
                                    type="text" 
                                    id="incident-title" 
                                    required
                                    class="form-input"
                                    value="${incidentData?.title || ''}"
                                    placeholder="عنوان الحادث"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-map-marker-alt ml-2"></i>
                                    الموقع *
                                </label>
                                <select 
                                    id="incident-location" 
                                    required
                                    class="form-input"
                                >
                                    <option value="">اختر الموقع</option>
                                </select>
                                <input 
                                    type="text" 
                                    id="incident-location-custom" 
                                    class="form-input mt-2 hidden"
                                    placeholder="أدخل الموقع يدوياً"
                                >
                                <button type="button" id="incident-location-toggle" class="btn-link text-xs mt-1 text-blue-600">
                                    <i class="fas fa-edit ml-1"></i>إدخال موقع مخصص
                                </button>
                            </div>
                            <div id="incident-sublocation-wrapper" style="display: none;">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-map-pin ml-2"></i>
                                    المكان الفرعي
                                </label>
                                <select 
                                    id="incident-sublocation" 
                                    class="form-input"
                                >
                                    <option value="">اختر المكان الفرعي</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-calendar ml-2"></i>
                                    التاريخ *
                                </label>
                                <input 
                                    type="datetime-local" 
                                    id="incident-date" 
                                    required
                                    class="form-input"
                                    value="${this.safeDateToISOString(incidentData?.date)}"
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-exclamation-circle ml-2"></i>
                                    الشدة *
                                </label>
                                <select id="incident-severity" required class="form-input">
                                    <option value="">اختر الشدة</option>
                                    <option value="عالية" ${incidentData?.severity === 'عالية' ? 'selected' : ''}>عالية</option>
                                    <option value="متوسطة" ${incidentData?.severity === 'متوسطة' ? 'selected' : ''}>متوسطة</option>
                                    <option value="منخفضة" ${incidentData?.severity === 'منخفضة' ? 'selected' : ''}>منخفضة</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-layer-group ml-2"></i>
                                    نوع الحادث *
                                </label>
                                <select id="incident-type" required class="form-input">
                                    <option value="">اختر نوع الحادث</option>
                                    <option value="إصابة عمل" ${incidentData?.incidentType === 'إصابة عمل' ? 'selected' : ''}>إصابة عمل</option>
                                    <option value="حادث معدات" ${incidentData?.incidentType === 'حادث معدات' ? 'selected' : ''}>حادث معدات</option>
                                    <option value="أضرار ممتلكات" ${incidentData?.incidentType === 'أضرار ممتلكات' ? 'selected' : ''}>أضرار ممتلكات</option>
                                    <option value="حادث بيئي" ${incidentData?.incidentType === 'حادث بيئي' ? 'selected' : ''}>حادث بيئي</option>
                                    <option value="آخر" ${incidentData?.incidentType === 'آخر' ? 'selected' : ''}>آخر</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    الحالة *
                                </label>
                                <select id="incident-status" required class="form-input">
                                    <option value="">اختر الحالة</option>
                                    <option value="مفتوح" ${incidentData?.status === 'مفتوح' ? 'selected' : ''}>مفتوح</option>
                                    <option value="قيد التحقيق" ${incidentData?.status === 'قيد التحقيق' ? 'selected' : ''}>قيد التحقيق</option>
                                    <option value="مكتمل" ${incidentData?.status === 'مكتمل' ? 'selected' : ''}>مكتمل</option>
                                    <option value="مغلق" ${incidentData?.status === 'مغلق' ? 'selected' : ''}>مغلق</option>
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-user ml-2"></i>
                                    المبلغ (اسم الموظف) *
                                </label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        id="incident-reported-by" 
                                        required
                                        class="form-input"
                                        value="${incidentData?.reportedBy || ''}"
                                        placeholder="ابحث بالاسم أو الكود الوظيفي"
                                        autocomplete="off"
                                    >
                                    <div id="incident-reported-dropdown" class="hse-lookup-dropdown absolute z-50 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"></div>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-align-right ml-2"></i>
                                    الوصف *
                                </label>
                                <textarea 
                                    id="incident-description" 
                                    required
                                    class="form-input" 
                                    rows="4"
                                    placeholder="وصف تفصيلي للحادث"
                                >${incidentData?.description || ''}</textarea>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <h3 class="text-base font-semibold text-gray-700 mb-4">
                                <i class="fas fa-users ml-2"></i>
                                بيانات الطرف المتضرر
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">النوع *</label>
                                    <select id="incident-affected-type" class="form-input">
                                        <option value="employee" ${incidentData?.affectedType === 'employee' ? 'selected' : ''}>موظف</option>
                                        <option value="contractor" ${incidentData?.affectedType === 'contractor' ? 'selected' : ''}>مقاول</option>
                                        <option value="visitor" ${incidentData?.affectedType === 'visitor' ? 'selected' : ''}>زائر</option>
                                        <option value="other" ${incidentData?.affectedType === 'other' ? 'selected' : ''}>طرف آخر</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">الكود الوظيفي</label>
                                    <input type="text" id="incident-affected-code" class="form-input" value="${incidentData?.affectedCode || ''}" placeholder="اكتب الكود عند اختيار موظف" autocomplete="off">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">اسم الطرف المتضرر *</label>
                                    <input type="text" id="incident-affected-name" required class="form-input" value="${incidentData?.affectedName || ''}" placeholder="ابحث بالاسم أو الكود" autocomplete="off">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">المسمى الوظيفي</label>
                                    <input type="text" id="incident-affected-job" class="form-input" value="${incidentData?.affectedJobTitle || ''}" placeholder="المسمى الوظيفي">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">القسم / الإدارة</label>
                                    <input type="text" id="incident-affected-department" class="form-input" value="${incidentData?.affectedDepartment || ''}" placeholder="القسم أو الإدارة">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">بيانات التواصل</label>
                                    <input type="text" id="incident-affected-contact" class="form-input" value="${incidentData?.affectedContact || ''}" placeholder="رقم الهاتف أو البريد الإلكتروني">
                                </div>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <i class="fas fa-info-circle text-blue-600"></i>
                                    <h4 class="text-sm font-semibold text-blue-800">ملاحظة مهمة</h4>
                                </div>
                                <p class="text-sm text-blue-700">
                                    لتحليل الأسباب والإجراءات التصحيحية والوقائية، يرجى استخدام نموذج التحقيق المنفصل بعد حفظ الحادث.
                                    يمكنك الوصول إليه من صفحة عرض الحادث أو من قائمة الحوادث.
                                </p>
                            </div>
                        </div>

                        <div class="border-t pt-4">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="text-base font-semibold text-gray-700">
                                    <i class="fas fa-clipboard-check ml-2"></i>
                                    خطة الإجراءات التصحيحية والوقائية
                                </h3>
                                <button type="button" id="add-action-plan-row" class="btn-secondary">
                                    <i class="fas fa-plus ml-2"></i>
                                    إضافة إجراء
                                </button>
                            </div>
                            <div class="table-wrapper" style="overflow-x: auto;">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>نوع الإجراء</th>
                                            <th>وصف الإجراء</th>
                                            <th>المسؤول</th>
                                            <th>تاريخ الاستحقاق</th>
                                            <th>تاريخ الإغلاق</th>
                                            <th>الحالة</th>
                                            <th>الإجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody id="incident-action-plan-body"></tbody>
                                </table>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">تمثل كل خطة مساراً العمل ويتم تسجيلها في سجل التدقيق.</p>
                        </div>

                        <div class="border-t pt-4">
                            <h3 class="text-base font-semibold text-gray-700 mb-4">
                                <i class="fas fa-paperclip ml-2"></i>
                                المرفقات والدعم البصري
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-upload ml-2"></i>
                                        تحميل مرفقات إضافية
                                    </label>
                                    <input type="file" id="incident-attachments-input" class="form-input" accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx" multiple>
                                    <p class="text-xs text-gray-500 mt-2">الحد الأقصى لحجم كل ملف 5MB.</p>
                                    ${cloudStorageButtons}
                                    <div id="incident-attachments-list" class="mt-3 space-y-2"></div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-image ml-2"></i>
                                        صورة توضيحية (غير إلزامي)
                                    </label>
                                    <input type="file" id="incident-image-input" accept="image/*" class="form-input">
                                    <div id="incident-image-preview" class="mt-2 ${incidentData?.image ? '' : 'hidden'}">
                                        <img src="${incidentData?.image ? this.convertGoogleDriveLinkToPrintable(incidentData.image) : ''}" alt="صورة الحادث" class="w-48 h-48 object-cover rounded border mt-2" id="incident-image-img">
                                        <button type="button" onclick="document.getElementById('incident-image-input').value=''; document.getElementById('incident-image-preview').classList.add('hidden');" class="mt-1 text-xs text-red-600">حذ الصورة</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" id="cancel-incident-btn" class="btn-secondary">
                                إلغاء
                            </button>
                            ${isEdit ? `
                            <button type="button" id="open-investigation-btn" class="btn-secondary">
                                <i class="fas fa-search ml-2"></i>
                                ${incidentData?.investigation ? 'عرض/تعديل التحقيق' : 'التحقيق في الحادث'}
                            </button>
                            ` : ''}
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>
                                ${isEdit ? 'حفظ التعديلات' : 'تسجيل الحادث'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    setupFormFields(incidentData = null) {
        // Setup employee autocomplete and location dropdown
        setTimeout(() => {
            // حفظ المرجع إلى this لتجنب مشاكل السياق
            const self = this;

            // ربط كود المبلغ عن الحادث بقاعدة بيانات الموظفين
            if (typeof EmployeeHelper !== 'undefined') {
                // ربط حقل الكود الوظيفي
                EmployeeHelper.setupEmployeeCodeSearch('incident-employee-code', 'incident-reported-by', (employee) => {
                    if (employee) {
                        const codeInput = document.getElementById('incident-employee-code');
                        const nameInput = document.getElementById('incident-reported-by');
                        if (codeInput) codeInput.value = employee.code || employee.employeeNumber || employee.sapId || '';
                        if (nameInput) nameInput.value = employee.name || employee.fullName || '';
                    }
                });

                // ربط حقل الاسم
                EmployeeHelper.setupAutocomplete('incident-reported-by', (employee) => {
                    if (employee) {
                        const codeInput = document.getElementById('incident-employee-code');
                        if (codeInput) codeInput.value = employee.code || employee.employeeNumber || employee.sapId || '';
                    }
                });
            }

            // ربط حقل الموقع بقائمة المواقع من إعدادات النماذج
            const locationSelect = document.getElementById('incident-location');
            const locationCustomInput = document.getElementById('incident-location-custom');
            const locationToggleBtn = document.getElementById('incident-location-toggle');
            const sublocationWrapper = document.getElementById('incident-sublocation-wrapper');
            const sublocationSelect = document.getElementById('incident-sublocation');

            // دالة لتحديث قائمة الأماكن الفرعية
            const updateSublocationOptions = (siteId) => {
                if (!sublocationSelect || !sublocationWrapper) return;

                // مسح القائمة الحالية
                sublocationSelect.innerHTML = '<option value="">اختر المكان الفرعي</option>';

                if (!siteId) {
                    sublocationWrapper.style.display = 'none';
                    return;
                }

                // الحصول على الأماكن الفرعية للموقع المحدد
                const placeOptions = self.getPlaceOptions(siteId);

                if (placeOptions && placeOptions.length > 0) {
                    placeOptions.forEach(place => {
                        const option = document.createElement('option');
                        option.value = place.id;
                        option.textContent = place.name;
                        // التحقق من البيانات المحفوظة
                        if (incidentData?.sublocationId === place.id ||
                            incidentData?.sublocation === place.id ||
                            (incidentData?.sublocationName === place.name)) {
                            option.selected = true;
                        }
                        sublocationSelect.appendChild(option);
                    });
                    sublocationWrapper.style.display = 'block';
                } else {
                    sublocationWrapper.style.display = 'none';
                }
            };

            if (locationSelect) {
                // التأكد من تحميل إعدادات النماذج
                const loadSites = async () => {
                    try {
                        if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
                            await Permissions.ensureFormSettingsState();
                        }

                        // الحصول على المواقع من إعدادات النماذج
                        const sites = self.getSiteOptions();

                        Utils.safeLog('Incidents: عدد المواقع المحملة:', sites.length);

                        // إضافة المواقع إلى القائمة المنسدلة
                        if (sites && sites.length > 0) {
                            sites.forEach(site => {
                                const option = document.createElement('option');
                                option.value = site.id;
                                option.textContent = site.name;
                                // التحقق من البيانات المحفوظة
                                if (incidentData?.siteId === site.id ||
                                    incidentData?.location === site.id ||
                                    (incidentData?.siteName === site.name) ||
                                    (incidentData?.location === site.name)) {
                                    option.selected = true;
                                    // تحديث قائمة الأماكن الفرعية عند التحميل
                                    setTimeout(() => updateSublocationOptions(site.id), 100);
                                }
                                locationSelect.appendChild(option);
                            });
                        } else {
                            Utils.safeWarn('⚠️ Incidents: لا توجد مواقع متاحة في إعدادات النماذج');
                        }
                    } catch (error) {
                        Utils.safeError('❌ خطأ في تحميل المواقع:', error);
                    }
                };

                // استدعاء الدالة مباشرة
                loadSites().then(() => {
                    // إذا كان الموقع موجوداً في البيانات ولكن غير موجود في القائمة
                    const sites = self.getSiteOptions();
                    if (incidentData?.location && !sites.find(s => s.id === incidentData.location || s.name === incidentData.location)) {
                        const customOption = document.createElement('option');
                        customOption.value = incidentData.location;
                        customOption.textContent = incidentData.location + ' (مخصص)';
                        customOption.selected = true;
                        locationSelect.appendChild(customOption);
                        sublocationWrapper.style.display = 'none';
                    }
                }).catch(error => {
                    Utils.safeError('❌ خطأ في معالجة المواقع:', error);
                });

                // إضافة event listener لتحديث الأماكن الفرعية عند تغيير الموقع
                locationSelect.addEventListener('change', (e) => {
                    const selectedSiteId = e.target.value;
                    updateSublocationOptions(selectedSiteId);
                });

                // تبديل بين القائمة المنسدلة والإدخال اليدوي
                if (locationToggleBtn && locationCustomInput) {
                    locationToggleBtn.addEventListener('click', () => {
                        if (locationCustomInput.classList.contains('hidden')) {
                            locationCustomInput.classList.remove('hidden');
                            locationSelect.classList.add('hidden');
                            sublocationWrapper.style.display = 'none';
                            locationToggleBtn.innerHTML = '<i class="fas fa-list ml-1"></i>استخدام القائمة';
                            if (locationSelect.value) {
                                locationCustomInput.value = locationSelect.options[locationSelect.selectedIndex]?.text || locationSelect.value;
                            }
                        } else {
                            locationCustomInput.classList.add('hidden');
                            locationSelect.classList.remove('hidden');
                            locationToggleBtn.innerHTML = '<i class="fas fa-edit ml-1"></i>إدخال موقع مخصص';
                            if (locationCustomInput.value) {
                                // البحث عن الموقع في القائمة
                                const matchingOption = Array.from(locationSelect.options).find(opt =>
                                    opt.text === locationCustomInput.value || opt.value === locationCustomInput.value
                                );
                                if (matchingOption) {
                                    locationSelect.value = matchingOption.value;
                                    updateSublocationOptions(matchingOption.value);
                                } else {
                                    // إضافة كخيار مخصص
                                    const customOption = document.createElement('option');
                                    customOption.value = locationCustomInput.value;
                                    customOption.textContent = locationCustomInput.value + ' (مخصص)';
                                    locationSelect.appendChild(customOption);
                                    locationSelect.value = customOption.value;
                                    sublocationWrapper.style.display = 'none';
                                }
                            }
                        }
                    });
                }
            }

            // Setup image preview
            const imageInput = document.getElementById('incident-image-input');
            const imagePreview = document.getElementById('incident-image-preview');
            const imageImg = document.getElementById('incident-image-img');
            if (imageInput && imagePreview && imageImg) {
                imageInput.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                            Notification.error('حجم الصورة كبير جداً. الحد الأقصى 5MB');
                            imageInput.value = '';
                            return;
                        }
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            imageImg.src = e.target.result;
                            imagePreview.classList.remove('hidden');
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        }, 100);
    },

    generateISOCode(prefix) {
        const year = new Date().getFullYear();
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const count = (AppState.appData.incidents || []).length + 1;
        return `${prefix}-${year}${month}-${String(count).padStart(4, '0')}`;
    },

    async convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async handleSubmit(e) {
        e.preventDefault();

        // منع النقر المتكرر
        const submitBtn = e.target?.querySelector('button[type="submit"]') ||
            document.querySelector('#incident-form button[type="submit"]') ||
            e.target?.closest('form')?.querySelector('button[type="submit"]');

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

        // الحصول على البيانات القديمة إذا كانت موجودة (للتعديل)
        const incidentData = this.currentEditId ?
            AppState.appData.incidents.find(i => i.id === this.currentEditId) : null;

        // فحص العناصر قبل الاستخدام
        const employeeCodeEl = document.getElementById('incident-employee-code');
        const reportedByEl = document.getElementById('incident-reported-by');

        if (!employeeCodeEl || !reportedByEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        const employeeCode = employeeCodeEl.value.trim();
        const reportedBy = reportedByEl.value.trim();

        // معالجة الصورة
        let imageBase64 = this.currentEditId
            ? (AppState.appData.incidents.find(i => i.id === this.currentEditId)?.image || '')
            : '';
        const imageInput = document.getElementById('incident-image-input');
        if (imageInput && imageInput.files.length > 0) {
            const file = imageInput.files[0];
            if (file.size > 5 * 1024 * 1024) {
                Notification.error('حجم الصورة كبير جداً. الحد الأقصى 5MB');
                return;
            }
            try {
                imageBase64 = await this.convertImageToBase64(file);
            } catch (error) {
                Notification.error('شل تحميل الصورة: ' + error.message);
                return;
            }
        }

        // الحصول على الموقع والمكان الفرعي (من القائمة المنسدلة أو الإدخال اليدوي)
        const locationSelect = document.getElementById('incident-location');
        const locationCustomInput = document.getElementById('incident-location-custom');
        const sublocationSelect = document.getElementById('incident-sublocation');

        let location = '';
        let siteId = '';
        let siteName = '';
        let sublocation = '';
        let sublocationId = '';
        let sublocationName = '';

        if (locationCustomInput && !locationCustomInput.classList.contains('hidden') && locationCustomInput.value.trim()) {
            // استخدام الإدخال اليدوي
            location = locationCustomInput.value.trim();
            siteName = location;
        } else if (locationSelect && locationSelect.value) {
            // استخدام القائمة المنسدلة
            siteId = locationSelect.value;
            siteName = locationSelect.options[locationSelect.selectedIndex]?.text || siteId;
            location = siteName;

            // الحصول على المكان الفرعي إذا كان محدداً
            if (sublocationSelect && sublocationSelect.value) {
                sublocationId = sublocationSelect.value;
                sublocationName = sublocationSelect.options[sublocationSelect.selectedIndex]?.text || sublocationId;
                sublocation = sublocationName;
            }
        }

        // جمع بيانات الطرف المتضرر
        const affectedType = document.getElementById('incident-affected-type')?.value || 'employee';
        const affectedCode = document.getElementById('incident-affected-code')?.value.trim() || '';
        const affectedName = document.getElementById('incident-affected-name')?.value.trim() || '';
        const affectedJob = document.getElementById('incident-affected-job')?.value.trim() || '';
        const affectedDept = document.getElementById('incident-affected-department')?.value.trim() || '';
        const affectedContact = document.getElementById('incident-affected-contact')?.value.trim() || '';

        // جمع خطة الإجراءات
        const actionPlan = this.collectActionPlanRows();

        // جمع المرفقات (مع معالجة الصور للرفع إلى Google Drive)
        let attachments = [...(this.currentAttachments || [])];

        // فحص العناصر قبل الاستخدام
        const isoCodeEl = document.getElementById('incident-iso-code');
        const titleEl = document.getElementById('incident-title');
        const dateEl = document.getElementById('incident-date');
        const severityEl = document.getElementById('incident-severity');
        const statusEl = document.getElementById('incident-status');
        const descriptionEl = document.getElementById('incident-description');

        if (!isoCodeEl || !titleEl || !dateEl || !severityEl || !statusEl || !descriptionEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        const formData = {
            id: this.currentEditId || Utils.generateSequentialId('INC', AppState.appData?.incidents || []),
            isoCode: isoCodeEl.value.trim(),
            title: titleEl.value.trim(),
            location: location,
            siteId: siteId,
            siteName: siteName,
            sublocation: sublocation,
            sublocationId: sublocationId,
            sublocationName: sublocationName,
            date: (() => {
                try {
                    if (!dateEl.value) return new Date().toISOString();
                    const date = new Date(dateEl.value);
                    if (isNaN(date.getTime())) return new Date().toISOString();
                    return date.toISOString();
                } catch (e) {
                    return new Date().toISOString();
                }
            })(),
            severity: severityEl.value,
            incidentType: document.getElementById('incident-type')?.value || '',
            reportedBy: reportedBy,
            employeeCode: employeeCode,
            employeeNumber: employeeCode,
            status: statusEl.value,
            description: descriptionEl.value.trim(),
            // تم نقل تحليل الأسباب والإجراءات إلى نموذج التحقيق المنفصل
            // الاحتفاظ بالبيانات القديمة إذا كانت موجودة (للتوافق مع البيانات القديمة)
            rootCause: incidentData?.rootCause || '',
            correctiveAction: incidentData?.correctiveAction || '',
            preventiveAction: incidentData?.preventiveAction || '',
            // الاحتفاظ ببيانات التحقيق إذا كانت موجودة
            investigation: incidentData?.investigation || null,
            actionPlan: actionPlan,
            affectedType: affectedType,
            affectedCode: affectedCode,
            affectedName: affectedName,
            affectedJobTitle: affectedJob,
            affectedDepartment: affectedDept,
            affectedContact: affectedContact,
            image: imageBase64,
            attachments: attachments,
            // تم نقل closureDate و actionOwner إلى نموذج التحقيق المنفصل
            // الاحتفاظ بالبيانات القديمة فقط للتوافق
            closureDate: incidentData?.closureDate || null,
            actionOwner: incidentData?.actionOwner || '',
            createdAt: this.currentEditId
                ? AppState.appData.incidents.find(i => i.id === this.currentEditId)?.createdAt
                : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: AppState.currentUser ? {
                id: AppState.currentUser.id || '',
                name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                email: AppState.currentUser.email || ''
            } : null
        };

        formData.reporterCode = employeeCode;

        if (!formData.title || !formData.location || !formData.severity || !formData.status) {
            Notification.error('يرجى ملء جميع الحقول المطلوبة');
            // استعادة الزر عند فشل التحقق
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        Loading.show('جاري حفظ البيانات...');
        const returnTab = this._formReturnTab || 'incidents-list';
        const wasEdit = !!this.currentEditId;
        try {
            if (wasEdit) {
                const index = AppState.appData.incidents.findIndex(i => i.id === this.currentEditId);
                if (index !== -1) {
                    AppState.appData.incidents[index] = formData;
                }
            } else {
                AppState.appData.incidents.push(formData);
            }

            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }

            await this.persistIncidentToServer(formData, { syncRegistry: true, silent: true });

            Notification.success(wasEdit ? 'تم تحديث الحادث بنجاح' : 'تم تسجيل الحادث بنجاح');

            await this.exitIncidentForm(returnTab);

            if (typeof Dashboard !== 'undefined' && Dashboard.refreshIncidents) {
                Dashboard.refreshIncidents();
            }

            this.processIncidentBackgroundTasks(formData, { skipServerPersist: true }).catch((error) => {
                Utils.safeError('خطأ في معالجة المهام الخلفية:', error);
            });

        } catch (error) {
            Utils.safeError('خطأ في حفظ الحادث:', error);
            Notification.error('حدث خطأ: ' + error.message);
        } finally {
            if (typeof Loading !== 'undefined' && Loading.hide) Loading.hide();
            if (submitBtn && originalText) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }
    },

    // معالجة المهام الخلفية بعد حفظ الحادث
    async processIncidentBackgroundTasks(formData, options = {}) {
        const { skipServerPersist = false } = options;
        try {
            // معالجة المرفقات ورفع الصور إلى Google Drive
            let needsUpdate = false;

            if (formData.attachments && Array.isArray(formData.attachments) && formData.attachments.length > 0) {
                try {
                    Utils.safeLog('Incidents: قبل processAttachments - عدد المرفقات: ' + formData.attachments.length);
                    const processedAttachments = await GoogleIntegration.processAttachments?.(
                        formData.attachments,
                        'Incidents'
                    ) || formData.attachments;

                    if (JSON.stringify(processedAttachments) !== JSON.stringify(formData.attachments)) {
                        formData.attachments = processedAttachments;
                        needsUpdate = true;
                        Utils.safeLog('Incidents: تم معالجة المرفقات بنجاح');
                    }
                } catch (uploadError) {
                    Utils.safeError('خطأ في رفع المرفقات:', uploadError);
                }
            }

            // معالجة الصورة الرئيسية ورفعها إلى Google Drive
            if (formData.image && typeof formData.image === 'string' && formData.image.startsWith('data:')) {
                try {
                    const uploadResult = await GoogleIntegration.uploadFileToDrive?.(
                        formData.image,
                        `incident_${formData.id}_${Date.now()}.jpg`,
                        'image/jpeg',
                        'Incidents'
                    );
                    if (uploadResult && uploadResult.success) {
                        formData.image = uploadResult.directLink || uploadResult.shareableLink || formData.image;
                        needsUpdate = true;
                        Utils.safeLog('Incidents: تم رفع الصورة بنجاح');
                    }
                } catch (imageError) {
                    Utils.safeError('خطأ في رفع الصورة:', imageError);
                }
            }

            // تحديث البيانات في حالة معالجة الملفات
            if (needsUpdate) {
                const index = AppState.appData.incidents.findIndex(i => i.id === formData.id);
                if (index !== -1) {
                    AppState.appData.incidents[index] = formData;
                }

                // حفظ البيانات المحدثة
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
            }

            // مزامنة صف الحادث مع الخادم (بدل autoSave للمصفوفة كاملة)
            if (!skipServerPersist || needsUpdate) {
                const latest = AppState.appData.incidents.find(i => i.id === formData.id) || formData;
                await this.persistIncidentToServer(latest, { syncRegistry: false, silent: true });
            }

            // إنشاء إجراءات تلقائية في Action Tracking إذا كانت هناك إجراءات في خطة الإجراءات
            if (formData.actionPlan && Array.isArray(formData.actionPlan) && formData.actionPlan.length > 0) {
                for (const action of formData.actionPlan) {
                    if (action.description && action.owner) {
                        try {
                            await GoogleIntegration.sendToAppsScript?.('createActionFromModule', {
                                sourceModule: 'Incidents',
                                sourceId: formData.id,
                                sourceData: {
                                    date: formData.date,
                                    description: action.description,
                                    correctiveAction: action.description,
                                    department: formData.affectedDepartment || '',
                                    location: formData.location || '',
                                    siteId: formData.siteId || '',
                                    siteName: formData.siteName || '',
                                    sublocation: formData.sublocation || '',
                                    sublocationId: formData.sublocationId || '',
                                    sublocationName: formData.sublocationName || '',
                                    severity: formData.severity || 'Medium',
                                    reportedBy: formData.reportedBy || '',
                                    owner: action.owner,
                                    dueDate: action.dueDate,
                                    actionType: action.actionType === 'preventive' ? 'Preventive' : 'Corrective',
                                    createdBy: formData.createdBy?.name || 'System',
                                    ...formData
                                }
                            });
                        } catch (actionError) {
                            Utils.safeError('خطأ في إنشاء إجراء تلقائي:', actionError);
                        }
                    }
                }
            }

            Utils.safeLog('Incidents: تم إكمال المهام الخلفية بنجاح');
        } catch (error) {
            Utils.safeError('خطأ في معالجة المهام الخلفية:', error);
        }
    },

    async showList(tabName = 'incidents-list') {
        await this.exitIncidentForm(tabName);
    },

    isNotificationNonInjuryType(incidentType) {
        const type = String(incidentType || '').trim();
        return type === 'أضرار ممتلكات' || type === 'حادث معدات' || type === 'حادث بيئي';
    },

    getNotificationDepartmentOptions() {
        try {
            if (typeof DailyObservations !== 'undefined' && typeof DailyObservations.getDepartmentOptions === 'function') {
                const list = DailyObservations.getDepartmentOptions();
                if (Array.isArray(list) && list.length) return list;
            }
        } catch (_e) { /* ignore */ }

        const set = new Set();
        (AppState?.appData?.employees || []).forEach((employee) => {
            const value = String(employee?.department || '').trim();
            if (value) set.add(value);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b, 'ar'));
    },

    buildNotificationDepartmentSelectOptions(selected = '') {
        const esc = (v) => Utils.escapeHTML(String(v ?? ''));
        const selectedNorm = String(selected || '').trim();
        const options = this.getNotificationDepartmentOptions();
        let html = '<option value="">اختر الإدارة</option>';
        let found = false;
        options.forEach((name) => {
            const isSelected = name === selectedNorm;
            if (isSelected) found = true;
            html += `<option value="${esc(name)}"${isSelected ? ' selected' : ''}>${esc(name)}</option>`;
        });
        if (selectedNorm && !found) {
            html += `<option value="${esc(selectedNorm)}" selected>${esc(selectedNorm)} (محفوظ)</option>`;
        }
        return html;
    },

    buildNotificationContractorSelectOptions(selected = '') {
        return this.buildInvestigationAffectedContractorSelectOptions(selected);
    },

    getNotificationDepartmentValue() {
        const selectEl = document.getElementById('notification-employee-department-select');
        const textEl = document.getElementById('notification-employee-department');
        const incidentTypeEl = document.getElementById('notification-incident-type');
        const affiliationEl = document.getElementById('notification-affiliation');
        const isNonInjury = this.isNotificationNonInjuryType(incidentTypeEl?.value || '');
        const isContractor = (affiliationEl?.value || '') === 'contractor';
        if (isNonInjury && selectEl) return (selectEl.value || '').trim();
        if (isContractor) return this.getNotificationContractorValue();
        return (textEl?.value || '').trim();
    },

    getNotificationContractorValue() {
        const selectEl = document.getElementById('notification-contractor-select');
        return (selectEl?.value || '').trim();
    },

    mapIncidentAffiliationToNotification(incident) {
        const aff = String(incident?.affiliation || '').trim();
        if (aff) return aff === 'company' ? 'employee' : aff;
        const affectedType = String(incident?.affectedType || '').trim();
        const map = { employee: 'employee', contractor: 'contractor', visitor: 'visitor', other: 'none' };
        return map[affectedType] || '';
    },

    buildNotificationDraftFromIncident(incident) {
        if (!incident) return null;
        const affiliation = this.mapIncidentAffiliationToNotification(incident);
        const isNonInjury = this.isNotificationNonInjuryType(incident.incidentType || '');
        let contractorName = String(incident.contractorName || '').trim();
        if (!contractorName && affiliation === 'contractor') {
            contractorName = String(incident.affectedDepartment || incident.department || '').trim();
        }
        let employeeCode = String(incident.affectedCode || incident.employeeAffectedCode || '').trim();
        const reporterCode = String(incident.reporterCode || '').trim();
        if (!employeeCode && affiliation === 'employee') {
            const legacyCode = String(incident.employeeCode || incident.employeeNumber || '').trim();
            if (legacyCode && legacyCode !== reporterCode) {
                employeeCode = legacyCode;
            }
        }
        const employeeName = String(incident.affectedName || incident.employeeName || '').trim();
        const employeeJob = String(incident.affectedJobTitle || incident.employeeJob || '').trim();
        let employeeDepartment = String(incident.affectedDepartment || incident.employeeDepartment || incident.department || '').trim();
        if (isNonInjury) {
            employeeDepartment = String(incident.department || incident.affectedDepartment || employeeDepartment).trim();
        }
        let notificationNumber = String(incident.notificationNumber || '').trim();
        if (!notificationNumber && incident.notificationId && Array.isArray(AppState.appData?.incidentNotifications)) {
            const linked = AppState.appData.incidentNotifications.find((n) => n.id === incident.notificationId);
            notificationNumber = String(linked?.notificationNumber || '').trim();
        }
        if (!notificationNumber) {
            notificationNumber = incident.isoCode ? `REF-${incident.isoCode}` : `INC-${incident.id}`;
        }
        return {
            incidentId: incident.id,
            notificationId: incident.notificationId || '',
            notificationNumber,
            date: this.safeDateToISOString(incident.date),
            siteId: incident.siteId || '',
            siteName: incident.siteName || '',
            location: incident.location || '',
            sublocationId: incident.sublocationId || '',
            sublocationName: incident.sublocationName || incident.sublocation || '',
            incidentType: incident.incidentType || '',
            affiliation,
            contractorName,
            employeeCode,
            employeeName,
            employeeJob,
            employeeDepartment,
            injuryDescription: incident.injuryDescription || '',
            losses: incident.losses || '',
            description: incident.description || '',
            actions: incident.actionsTaken || incident.actions || '',
            reporterName: incident.reportedBy || incident.reporterName || '',
            reporterCode: incident.reporterCode || reporterCode || '',
            preserve: {
                isoCode: incident.isoCode,
                title: incident.title,
                status: incident.status,
                severity: incident.severity,
                investigation: incident.investigation,
                actionPlan: incident.actionPlan,
                attachments: incident.attachments,
                image: incident.image,
                createdAt: incident.createdAt,
                createdBy: incident.createdBy,
                affectedType: incident.affectedType,
                affectedContact: incident.affectedContact
            }
        };
    },

    buildIncidentFieldsFromNotification(notificationData, notificationNumber, base = {}) {
        const aff = notificationData.affiliation || '';
        return {
            ...base,
            notificationId: base.notificationId || notificationData.id,
            notificationNumber,
            title: base.title || `حادث - ${notificationData.incidentType}`,
            location: notificationData.location,
            siteId: notificationData.siteId,
            siteName: notificationData.siteName,
            sublocation: notificationData.sublocation,
            sublocationId: notificationData.sublocationId,
            sublocationName: notificationData.sublocationName,
            date: notificationData.date,
            department: notificationData.department,
            incidentType: notificationData.incidentType,
            affiliation: aff,
            contractorName: notificationData.contractorName,
            affectedType: (aff === 'employee' || aff === 'company') ? 'employee' : (aff || base.affectedType || 'other'),
            affectedCode: notificationData.employeeCode || '',
            affectedName: notificationData.employeeName || '',
            affectedJobTitle: notificationData.employeeJob || '',
            affectedDepartment: notificationData.employeeDepartment || notificationData.department || '',
            employeeName: notificationData.employeeName,
            employeeJob: notificationData.employeeJob,
            employeeDepartment: notificationData.employeeDepartment,
            employeeAffectedCode: notificationData.employeeCode || '',
            description: notificationData.description,
            injuryDescription: notificationData.injuryDescription,
            losses: notificationData.losses,
            actionsTaken: notificationData.actions,
            actions: notificationData.actions,
            reportedBy: notificationData.reporterName,
            reporterName: notificationData.reporterName,
            reporterCode: notificationData.reporterCode || '',
            employeeCode: notificationData.reporterCode || base.employeeCode || '',
            employeeNumber: notificationData.reporterCode || base.employeeNumber || '',
            updatedAt: new Date().toISOString()
        };
    },

    getIncidentMutationUserData() {
        const u = AppState.currentUser || {};
        let permissions = u.permissions || {};
        if (typeof permissions === 'string') {
            try { permissions = JSON.parse(permissions); } catch (_e) { permissions = {}; }
        }
        return {
            id: u.id || '',
            name: u.name || u.displayName || '',
            email: u.email || '',
            role: u.role || '',
            permissions
        };
    },

    buildIncidentServerUpdatePayload(incident, extra = {}) {
        if (!incident) return { ...extra };
        const safeDateIso = (this.getIncidentDateValue(incident) || new Date()).toISOString();
        let investigation = incident.investigation;
        if (investigation && typeof investigation === 'string') {
            try { investigation = JSON.parse(investigation); } catch (_e) { /* keep */ }
        }
        return {
            id: incident.id,
            title: incident.title || `حادث - ${incident.incidentType || ''}`.trim(),
            description: incident.description || '',
            date: safeDateIso,
            status: incident.status,
            severity: incident.severity || 'متوسطة',
            location: incident.location || '',
            siteId: incident.siteId || '',
            siteName: incident.siteName || '',
            sublocation: incident.sublocation || '',
            sublocationId: incident.sublocationId || '',
            sublocationName: incident.sublocationName || '',
            incidentType: incident.incidentType || '',
            affiliation: incident.affiliation || '',
            contractorName: incident.contractorName || '',
            department: incident.department || '',
            affectedName: incident.affectedName || '',
            affectedCode: incident.affectedCode || '',
            affectedJobTitle: incident.affectedJobTitle || '',
            affectedDepartment: incident.affectedDepartment || '',
            affectedType: incident.affectedType || '',
            affectedContact: incident.affectedContact || '',
            employeeName: incident.employeeName || '',
            employeeJob: incident.employeeJob || '',
            employeeDepartment: incident.employeeDepartment || '',
            employeeCode: incident.reporterCode || incident.employeeCode || '',
            employeeNumber: incident.reporterCode || incident.employeeNumber || '',
            employeeAffectedCode: incident.affectedCode || incident.employeeAffectedCode || '',
            reportedBy: incident.reportedBy || incident.reporterName || '',
            reporterName: incident.reporterName || incident.reportedBy || '',
            reporterCode: incident.reporterCode || '',
            injuryDescription: incident.injuryDescription || '',
            losses: incident.losses || '',
            actionsTaken: incident.actionsTaken || incident.actions || '',
            actions: incident.actions || incident.actionsTaken || '',
            injuredPart: incident.injuredPart || '',
            equipmentCause: incident.equipmentCause || '',
            notificationId: incident.notificationId || '',
            notificationNumber: incident.notificationNumber || '',
            isoCode: incident.isoCode || '',
            image: incident.image || '',
            attachments: incident.attachments || [],
            actionPlan: incident.actionPlan || [],
            investigation: investigation ?? incident.investigation,
            rootCause: incident.rootCause || '',
            correctiveAction: incident.correctiveAction || '',
            preventiveAction: incident.preventiveAction || '',
            requiresApproval: !!incident.requiresApproval,
            approvedBy: incident.approvedBy || null,
            approvedAt: incident.approvedAt || null,
            rejectedBy: incident.rejectedBy || null,
            rejectionReason: incident.rejectionReason || '',
            rejectedAt: incident.rejectedAt || null,
            updatedAt: incident.updatedAt || new Date().toISOString(),
            createdAt: incident.createdAt || new Date().toISOString(),
            createdBy: incident.createdBy || null,
            userData: this.getIncidentMutationUserData(),
            ...extra
        };
    },

    async persistIncidentToServer(incident, options = {}) {
        const { syncRegistry = true, silent = false } = options;
        if (!incident?.id) {
            throw new Error('معرف الحادث غير موجود');
        }
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) {
            throw new Error('الاتصال بالخادم غير متاح — تحقق من الإعدادات');
        }

        const updatePayload = this.buildIncidentServerUpdatePayload(incident);
        const result = await GoogleIntegration.sendRequest({
            action: 'updateIncident',
            data: { incidentId: incident.id, updateData: updatePayload }
        });

        if (!result?.success) {
            throw new Error(result?.message || 'فشل حفظ الحادث على الخادم');
        }

        if (typeof GoogleIntegration.clearCache === 'function') {
            GoogleIntegration.clearCache('Incidents');
        }

        if (syncRegistry) {
            try {
                await this.updateRegistryEntry(incident, { persist: true });
            } catch (regErr) {
                Utils.safeWarn('⚠️ فشل مزامنة سجل الحادث بعد الحفظ:', regErr);
            }
        }

        if (!silent) {
            Utils.safeLog(`✅ تم حفظ الحادث ${incident.id} على الخادم`);
        }
        return result;
    },

    applyNotificationDraftToForm(draft, helpers = {}) {
        if (!draft) return;
        const {
            locationSelect,
            sublocationSelect,
            updateSublocationOptions,
            notificationIncidentTypeSelect,
            notificationAffiliationSelect,
            updateNotificationFormUI,
            employeeCodeInput,
            employeeNameInput,
            employeeJobInput,
            employeeDepartmentInput,
            employeeDepartmentSelect,
            contractorSelect,
            injuryDescriptionEl,
            descriptionEl,
            lossesEl,
            actionsEl,
            reporterNameEl,
            reporterCodeEl,
            dateEl
        } = helpers;

        const selectSite = () => {
            if (!locationSelect) return false;
            if (draft.siteId) {
                locationSelect.value = draft.siteId;
                if (typeof updateSublocationOptions === 'function') updateSublocationOptions(draft.siteId);
                return true;
            }
            const sites = this.getSiteOptions ? this.getSiteOptions() : [];
            const byName = sites.find((s) => s.name === draft.location || s.id === draft.location);
            if (byName) {
                locationSelect.value = byName.id;
                if (typeof updateSublocationOptions === 'function') updateSublocationOptions(byName.id);
                return true;
            }
            if (draft.location) {
                const customOption = document.createElement('option');
                customOption.value = draft.location;
                customOption.textContent = draft.location;
                customOption.selected = true;
                locationSelect.appendChild(customOption);
                return true;
            }
            return false;
        };

        selectSite();
        if (sublocationSelect && draft.sublocationId) {
            sublocationSelect.value = draft.sublocationId;
        }

        if (notificationIncidentTypeSelect && draft.incidentType) {
            notificationIncidentTypeSelect.value = draft.incidentType;
        }
        if (notificationAffiliationSelect && draft.affiliation) {
            notificationAffiliationSelect.value = draft.affiliation;
        }
        if (typeof updateNotificationFormUI === 'function') updateNotificationFormUI();

        if (employeeCodeInput) employeeCodeInput.value = draft.employeeCode || '';
        if (employeeNameInput) employeeNameInput.value = draft.employeeName || '';
        if (employeeJobInput) employeeJobInput.value = draft.employeeJob || '';
        if (employeeDepartmentInput) employeeDepartmentInput.value = draft.employeeDepartment || '';
        if (employeeDepartmentSelect && draft.employeeDepartment) {
            const dept = draft.employeeDepartment;
            const hasOption = Array.from(employeeDepartmentSelect.options).some((opt) => opt.value === dept);
            if (!hasOption) {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                employeeDepartmentSelect.appendChild(option);
            }
            employeeDepartmentSelect.value = dept;
        }
        if (contractorSelect && draft.contractorName) {
            const contractor = draft.contractorName;
            const hasOption = Array.from(contractorSelect.options).some((opt) => opt.value === contractor);
            if (!hasOption) {
                const option = document.createElement('option');
                option.value = contractor;
                option.textContent = contractor;
                contractorSelect.appendChild(option);
            }
            contractorSelect.value = contractor;
        }
        if (injuryDescriptionEl) injuryDescriptionEl.value = draft.injuryDescription || '';
        if (descriptionEl) descriptionEl.value = draft.description || '';
        if (lossesEl) lossesEl.value = draft.losses || '';
        if (actionsEl) actionsEl.value = draft.actions || '';
        if (reporterNameEl) reporterNameEl.value = draft.reporterName || '';
        if (reporterCodeEl) reporterCodeEl.value = draft.reporterCode || '';
        if (dateEl && draft.date) dateEl.value = draft.date;
    },

    // نموذج إخطار عن حادث (أو تعديل حادث موجود بنفس الواجهة)
    async showNotificationForm(incidentForEdit = null) {
        const draft = incidentForEdit ? this.buildNotificationDraftFromIncident(incidentForEdit) : null;
        const isEdit = !!draft;
        const d = draft || {};
        this._notificationEditContext = isEdit
            ? { incidentId: draft.incidentId, notificationId: draft.notificationId, preserve: draft.preserve }
            : null;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay incident-professional-modal incident-modal-notification';
        const esc = (v) => Utils.escapeHTML(String(v ?? ''));
        const notificationNumber = isEdit
            ? d.notificationNumber
            : `NOT-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String((AppState.appData.incidentNotifications || []).length + 1).padStart(4, '0')}`;
        const notificationDeptOptionsHtml = this.buildNotificationDepartmentSelectOptions(d.employeeDepartment || '');
        const notificationContractorOptionsHtml = this.buildNotificationContractorSelectOptions(d.contractorName || '');
        const modalTitle = isEdit ? 'تعديل إخطار / حادث' : 'إخطار عن حادث - Incident Notification';
        const submitLabel = isEdit ? 'حفظ التعديلات' : 'إرسال الإخطار';
        const submitIcon = isEdit ? 'fa-save' : 'fa-paper-plane';
        const defaultDate = isEdit ? d.date : new Date().toISOString().slice(0, 16);

        modal.innerHTML = `
            <style>
                .notification-field {
                    background: white;
                    padding: 16px;
                    border-radius: 10px;
                    border: 2px solid;
                    transition: all 0.3s ease;
                }
                .notification-field:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .notification-field label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 10px;
                }
                .notification-field label i {
                    font-size: 1.2rem;
                }
                .notification-section-title {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 12px 12px 0 0;
                    margin: 0 -24px 24px -24px;
                    font-size: 1.3rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
            </style>
            <div class="modal-content" style="max-width: 1200px; width: 95%; background: linear-gradient(to bottom, #f8f9fa, #ffffff);">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-${isEdit ? 'edit' : 'bell'} ml-2"></i>
                        ${modalTitle}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px; background: #f8f9fa;">
                    <form id="incident-notification-form">
                        <!-- معلومات أساسية -->
                        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div class="notification-section-title">
                                <i class="fas fa-info-circle"></i>
                                <span>المعلومات الأساسية</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="notification-field" style="border-color: #667eea;">
                                    <label>
                                        <i class="fas fa-hashtag" style="color: #667eea;"></i>
                                        رقم الإخطار *
                                    </label>
                                    <input type="text" id="notification-number" class="form-input" value="${esc(notificationNumber)}" readonly style="background: linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 50%); font-weight: 700; border: 2px solid #667eea; color: #5145cd;">
                                </div>
                                <div class="notification-field" style="border-color: #667eea;">
                                    <label>
                                        <i class="fas fa-calendar-alt" style="color: #667eea;"></i>
                                        تاريخ ووقت الحادث *
                                    </label>
                                    <input type="datetime-local" id="notification-date" class="form-input" required value="${esc(defaultDate)}" style="border: 2px solid #667eea; font-weight: 500;">
                                </div>
                                <div class="notification-field" style="border-color: #667eea;">
                                    <label>
                                        <i class="fas fa-map-marker-alt" style="color: #667eea;"></i>
                                        مكان الحادث *
                                    </label>
                                    <select id="notification-location" class="form-input" required style="border: 2px solid #667eea;">
                                        <option value="">اختر الموقع</option>
                                    </select>
                                </div>
                                <div id="notification-sublocation-wrapper" style="display: none;">
                                    <div class="notification-field" style="border-color: #667eea;">
                                        <label>
                                            <i class="fas fa-map-pin" style="color: #667eea;"></i>
                                            المكان الفرعي
                                        </label>
                                        <select id="notification-sublocation" class="form-input" style="border: 2px solid #667eea;">
                                            <option value="">اختر المكان الفرعي</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- تفاصيل الحادث -->
                        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div class="notification-section-title">
                                <i class="fas fa-clipboard-list"></i>
                                <span>تفاصيل الحادث</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="notification-field" style="border-color: #f59e0b;">
                                    <label>
                                        <i class="fas fa-tag" style="color: #f59e0b;"></i>
                                        نوع الحادث *
                                    </label>
                                    <select id="notification-incident-type" class="form-input" required style="border: 2px solid #f59e0b;">
                                        <option value="">اختر نوع الحادث</option>
                                        <option value="إصابة عمل" ${d.incidentType === 'إصابة عمل' ? 'selected' : ''}>إصابة عمل</option>
                                        <option value="حادث معدات" ${d.incidentType === 'حادث معدات' ? 'selected' : ''}>حادث معدات</option>
                                        <option value="أضرار ممتلكات" ${d.incidentType === 'أضرار ممتلكات' ? 'selected' : ''}>أضرار ممتلكات</option>
                                        <option value="حادث بيئي" ${d.incidentType === 'حادث بيئي' ? 'selected' : ''}>حادث بيئي</option>
                                        <option value="آخر" ${d.incidentType === 'آخر' ? 'selected' : ''}>آخر</option>
                                    </select>
                                </div>
                                <div class="notification-field" style="border-color: #f59e0b;">
                                    <label>
                                        <i class="fas fa-users" style="color: #f59e0b;"></i>
                                        التبعية
                                    </label>
                                    <select id="notification-affiliation" class="form-input" style="border: 2px solid #f59e0b;">
                                        <option value="">اختر التبعية</option>
                                        <option value="employee" ${d.affiliation === 'employee' ? 'selected' : ''}>موظف</option>
                                        <option value="daily-labor" ${d.affiliation === 'daily-labor' ? 'selected' : ''}>عمالة يومية</option>
                                        <option value="contractor" ${d.affiliation === 'contractor' ? 'selected' : ''}>مقاول</option>
                                        <option value="visitor" ${d.affiliation === 'visitor' ? 'selected' : ''}>زائر</option>
                                        <option value="none" ${d.affiliation === 'none' ? 'selected' : ''}>لا يوجد</option>
                                    </select>
                                </div>

                                <div id="notification-employee-code-wrapper" class="notification-field" style="border-color: #f59e0b; display: none;">
                                    <label>
                                        <i class="fas fa-id-badge" style="color: #f59e0b;"></i>
                                        كود الموظف *
                                    </label>
                                    <input type="text" id="notification-employee-code" class="form-input" value="${esc(d.employeeCode)}" placeholder="اكتب/ابحث بكود الموظف" style="border: 2px solid #f59e0b;" autocomplete="off">
                                </div>

                                <div id="notification-employee-name-wrapper" class="notification-field" style="border-color: #f59e0b;">
                                    <label id="notification-employee-name-label">
                                        <i class="fas fa-user" style="color: #f59e0b;"></i>
                                        <span id="notification-employee-name-label-text">اسم الموظف *</span>
                                    </label>
                                    <input type="text" id="notification-employee-name" class="form-input" required value="${esc(d.employeeName)}" placeholder="اسم الموظف" style="border: 2px solid #f59e0b;" autocomplete="off">
                                </div>
                                <div id="notification-employee-job-wrapper" class="notification-field" style="border-color: #f59e0b;">
                                    <label id="notification-employee-job-label">
                                        <i class="fas fa-briefcase" style="color: #f59e0b;"></i>
                                        <span id="notification-employee-job-label-text">الوظيفة *</span>
                                    </label>
                                    <input type="text" id="notification-employee-job" class="form-input" required value="${esc(d.employeeJob)}" placeholder="الوظيفة" style="border: 2px solid #f59e0b;" autocomplete="off">
                                </div>
                                <div id="notification-employee-department-text-wrapper" class="notification-field col-span-1 md:col-span-2" style="border-color: #f59e0b;">
                                    <label>
                                        <i class="fas fa-building" style="color: #f59e0b;"></i>
                                        الإدارة *
                                    </label>
                                    <input type="text" id="notification-employee-department" class="form-input" required value="${esc(d.employeeDepartment)}" placeholder="الإدارة" style="border: 2px solid #f59e0b;">
                                </div>
                                <div id="notification-employee-department-select-wrapper" class="notification-field col-span-1 md:col-span-2" style="border-color: #f59e0b; display: none;">
                                    <label>
                                        <i class="fas fa-building" style="color: #f59e0b;"></i>
                                        الإدارة *
                                    </label>
                                    <select id="notification-employee-department-select" class="form-input" style="border: 2px solid #f59e0b;">
                                        ${notificationDeptOptionsHtml}
                                    </select>
                                </div>

                                <div id="notification-contractor-name-wrapper" class="notification-field col-span-1 md:col-span-2" style="border-color: #f59e0b; display: none;">
                                    <label>
                                        <i class="fas fa-handshake" style="color: #f59e0b;"></i>
                                        المقاول *
                                    </label>
                                    <select id="notification-contractor-select" class="form-input" style="border: 2px solid #f59e0b;">
                                        ${notificationContractorOptionsHtml}
                                    </select>
                                </div>
                            </div>
                            
                            <div id="notification-injury-description-wrapper" class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-heartbeat" style="color: #f59e0b;"></i>
                                    وصف الإصابة
                                </label>
                                <textarea id="notification-injury-description" class="form-input" rows="4" placeholder="وصف تفصيلي للإصابة..." style="border: 2px solid #f59e0b;">${esc(d.injuryDescription)}</textarea>
                            </div>
                            <div class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-coins" style="color: #f59e0b;"></i>
                                    الخسائر
                                </label>
                                <textarea id="notification-losses" class="form-input" rows="4" placeholder="وصف الخسائر المادية أو البشرية..." style="border: 2px solid #f59e0b;">${esc(d.losses)}</textarea>
                            </div>
                            <div class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-file-alt" style="color: #f59e0b;"></i>
                                    وصف مختصر للحادث *
                                </label>
                                <textarea id="notification-description" class="form-input" rows="5" required placeholder="وصف تفصيلي للحادث..." style="border: 2px solid #f59e0b; font-size: 1rem;">${esc(d.description)}</textarea>
                            </div>
                            <div class="notification-field mt-5" style="border-color: #f59e0b;">
                                <label>
                                    <i class="fas fa-tasks" style="color: #f59e0b;"></i>
                                    الإجراءات المتخذة
                                </label>
                                <textarea id="notification-actions" class="form-input" rows="4" placeholder="وصف الإجراءات المتخذة..." style="border: 2px solid #f59e0b;">${esc(d.actions)}</textarea>
                            </div>
                        </div>

                        <!-- معلومات معد الإخطار -->
                        <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <div class="notification-section-title">
                                <i class="fas fa-user-edit"></i>
                                <span>معلومات معد الإخطار</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div class="notification-field" style="border-color: #10b981;">
                                    <label>
                                        <i class="fas fa-user" style="color: #10b981;"></i>
                                        اسم معد الإخطار *
                                    </label>
                                    <input type="text" id="notification-reporter-name" class="form-input" required value="${esc(d.reporterName)}" placeholder="اسم معد الإخطار" style="border: 2px solid #10b981;">
                                </div>
                                <div class="notification-field" style="border-color: #10b981;">
                                    <label>
                                        <i class="fas fa-id-card" style="color: #10b981;"></i>
                                        كود معد الإخطار
                                    </label>
                                    <input type="text" id="notification-reporter-code" class="form-input" value="${esc(d.reporterCode)}" placeholder="الكود الوظيفي" style="border: 2px solid #10b981;">
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 bg-white p-5 rounded-lg shadow-lg form-actions-centered" style="border-top: 3px solid #667eea;">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 12px 30px; font-size: 1.1rem;">
                                <i class="fas fa-times ml-2"></i>
                                إلغاء
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.printNotification()" title="طباعة الإخطار" style="padding: 12px 30px; font-size: 1.1rem;">
                                <i class="fas fa-print ml-2"></i>
                                طباعة
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.exportNotificationPDF()" title="تصدير PDF" style="padding: 12px 30px; font-size: 1.1rem;">
                                <i class="fas fa-file-pdf ml-2"></i>
                                تصدير PDF
                            </button>
                            <button type="submit" class="btn-primary" style="padding: 12px 30px; font-size: 1.1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                <i class="fas ${submitIcon} ml-2"></i>
                                ${submitLabel}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // ربط المواقع
        setTimeout(() => {
            const locationSelect = document.getElementById('notification-location');
            const sublocationWrapper = document.getElementById('notification-sublocation-wrapper');
            const sublocationSelect = document.getElementById('notification-sublocation');

            // دالة لتحديث قائمة الأماكن الفرعية
            const updateSublocationOptions = (siteId) => {
                if (!sublocationSelect || !sublocationWrapper) return;

                // مسح القائمة الحالية
                sublocationSelect.innerHTML = '<option value="">اختر المكان الفرعي</option>';

                if (!siteId) {
                    sublocationWrapper.style.display = 'none';
                    return;
                }

                // الحصول على الأماكن الفرعية للموقع المحدد
                const placeOptions = this.getPlaceOptions(siteId);

                if (placeOptions && placeOptions.length > 0) {
                    placeOptions.forEach(place => {
                        const option = document.createElement('option');
                        option.value = place.id;
                        option.textContent = place.name;
                        sublocationSelect.appendChild(option);
                    });
                    sublocationWrapper.style.display = 'block';
                } else {
                    sublocationWrapper.style.display = 'none';
                }
            };

            if (locationSelect) {
                locationSelect.addEventListener('change', (e) => {
                    updateSublocationOptions(e.target.value);
                });
            }

            // ربط كود معد الإخطار
            if (typeof EmployeeHelper !== 'undefined') {
                EmployeeHelper.setupEmployeeCodeSearch('notification-reporter-code', 'notification-reporter-name', (employee) => {
                    if (employee) {
                        const codeInput = document.getElementById('notification-reporter-code');
                        const nameInput = document.getElementById('notification-reporter-name');
                        if (codeInput) codeInput.value = employee.code || employee.employeeNumber || employee.sapId || '';
                        if (nameInput) nameInput.value = employee.name || employee.fullName || '';
                    }
                });
            }

            // Toggle employee/contractor behavior based on affiliation and incident type
            const notificationIncidentTypeSelect = document.getElementById('notification-incident-type');
            const notificationAffiliationSelect = document.getElementById('notification-affiliation');
            const employeeCodeWrapper = document.getElementById('notification-employee-code-wrapper');
            const employeeCodeInput = document.getElementById('notification-employee-code');
            const employeeNameWrapper = document.getElementById('notification-employee-name-wrapper');
            const employeeJobWrapper = document.getElementById('notification-employee-job-wrapper');
            const employeeNameInput = document.getElementById('notification-employee-name');
            const employeeJobInput = document.getElementById('notification-employee-job');
            const employeeDepartmentTextWrapper = document.getElementById('notification-employee-department-text-wrapper');
            const employeeDepartmentSelectWrapper = document.getElementById('notification-employee-department-select-wrapper');
            const employeeDepartmentInput = document.getElementById('notification-employee-department');
            const employeeDepartmentSelect = document.getElementById('notification-employee-department-select');
            const injuryDescriptionWrapper = document.getElementById('notification-injury-description-wrapper');

            const contractorNameWrapper = document.getElementById('notification-contractor-name-wrapper');
            const contractorSelect = document.getElementById('notification-contractor-select');
            const employeeNameLabelText = document.getElementById('notification-employee-name-label-text');
            const employeeJobLabelText = document.getElementById('notification-employee-job-label-text');

            const isEmployeeAffiliation = () => {
                const v = (notificationAffiliationSelect?.value || '').toString().trim();
                return v === 'employee' || v === 'company'; // backward compatibility
            };

            const isContractorAffiliation = () => (notificationAffiliationSelect?.value || '') === 'contractor';

            const setNotificationEmployeeLookupEnabled = (enabled) => {
                if (!employeeNameInput) return;
                const listId = `${employeeNameInput.id}-employee-helper-list`;
                if (enabled) {
                    employeeNameInput.setAttribute('list', listId);
                    employeeNameInput.setAttribute('autocomplete', 'off');
                } else {
                    employeeNameInput.removeAttribute('list');
                    employeeNameInput.setAttribute('autocomplete', 'off');
                }
            };

            const setEmployeeFieldsEditable = (editable) => {
                const inputs = [employeeNameInput, employeeJobInput, employeeDepartmentInput];
                inputs.forEach((el) => {
                    if (!el) return;
                    el.readOnly = !editable;
                    el.style.background = editable ? '' : '#fff7ed';
                    el.style.fontWeight = editable ? '' : '600';
                });
            };

            const syncDepartmentSelectFromText = () => {
                if (!employeeDepartmentSelect || !employeeDepartmentInput) return;
                const dept = (employeeDepartmentInput.value || '').trim();
                if (!dept) return;
                const hasOption = Array.from(employeeDepartmentSelect.options).some((opt) => opt.value === dept);
                if (!hasOption) {
                    const option = document.createElement('option');
                    option.value = dept;
                    option.textContent = dept;
                    employeeDepartmentSelect.appendChild(option);
                }
                employeeDepartmentSelect.value = dept;
            };

            const fillNotificationDepartmentFromEmployee = (employee) => {
                if (!employee) return;
                const dept = employee.department || employee.dept || employee.departmentName || '';
                const incidentType = notificationIncidentTypeSelect?.value || '';
                const isNonInjury = this.isNotificationNonInjuryType(incidentType);
                if (isNonInjury) {
                    if (employeeDepartmentSelect && dept) {
                        const hasOption = Array.from(employeeDepartmentSelect.options).some((opt) => opt.value === dept);
                        if (!hasOption) {
                            const option = document.createElement('option');
                            option.value = dept;
                            option.textContent = dept;
                            employeeDepartmentSelect.appendChild(option);
                        }
                        employeeDepartmentSelect.value = dept;
                    }
                } else if (employeeDepartmentInput) {
                    employeeDepartmentInput.value = dept;
                }
            };

            const updateNotificationFormUI = () => {
                const incidentType = notificationIncidentTypeSelect?.value || '';
                const isNonInjury = this.isNotificationNonInjuryType(incidentType);
                const isWorkInjury = incidentType === 'إصابة عمل';
                const isEmployee = isEmployeeAffiliation();
                const isContractor = isContractorAffiliation();
                const isContractorWorkInjury = isWorkInjury && isContractor;

                if (employeeNameWrapper) employeeNameWrapper.style.display = isNonInjury ? 'none' : 'block';
                if (employeeJobWrapper) employeeJobWrapper.style.display = isNonInjury ? 'none' : 'block';
                if (employeeDepartmentTextWrapper) {
                    employeeDepartmentTextWrapper.style.display = (isNonInjury || isContractor) ? 'none' : 'block';
                }
                if (employeeDepartmentSelectWrapper) employeeDepartmentSelectWrapper.style.display = isNonInjury ? 'block' : 'none';
                if (injuryDescriptionWrapper) injuryDescriptionWrapper.style.display = isWorkInjury ? 'block' : 'none';

                if (employeeNameLabelText) {
                    employeeNameLabelText.textContent = isContractorWorkInjury
                        ? 'اسم العامل (تابع للمقاول) *'
                        : 'اسم الموظف *';
                }
                if (employeeJobLabelText) {
                    employeeJobLabelText.textContent = isContractorWorkInjury
                        ? 'وظيفة العامل *'
                        : 'الوظيفة *';
                }
                if (employeeNameInput) {
                    employeeNameInput.required = !isNonInjury;
                    employeeNameInput.placeholder = isContractorWorkInjury
                        ? 'أدخل اسم العامل يدوياً'
                        : 'اسم الموظف';
                    if (isNonInjury) employeeNameInput.value = '';
                }
                if (employeeJobInput) {
                    employeeJobInput.required = !isNonInjury;
                    employeeJobInput.placeholder = isContractorWorkInjury
                        ? 'أدخل الوظيفة يدوياً'
                        : 'الوظيفة';
                    if (isNonInjury) employeeJobInput.value = '';
                }
                if (employeeDepartmentInput) employeeDepartmentInput.required = !isNonInjury && !isContractor;
                if (employeeDepartmentSelect) employeeDepartmentSelect.required = isNonInjury;

                if (!isNonInjury && !isContractor) syncDepartmentSelectFromText();

                // Employee code field — موظف الشركة فقط
                if (employeeCodeWrapper) employeeCodeWrapper.style.display = isEmployee ? 'block' : 'none';
                if (employeeCodeInput) {
                    employeeCodeInput.required = isEmployee;
                    if (!isEmployee) employeeCodeInput.value = '';
                }

                // مقاول + إصابة عمل: إدخال يدوي بدون قائمة موظفي الشركة
                setNotificationEmployeeLookupEnabled(isEmployee && isWorkInjury);
                setEmployeeFieldsEditable(isContractor || (!isEmployee && isWorkInjury));

                if (isContractor && isWorkInjury) {
                    if (employeeDepartmentInput) employeeDepartmentInput.value = '';
                }

                // Contractor select
                if (contractorNameWrapper) contractorNameWrapper.style.display = isContractor ? 'block' : 'none';
                if (contractorSelect) {
                    contractorSelect.required = isContractor;
                    if (!isContractor) contractorSelect.value = '';
                }
            };

            if (notificationIncidentTypeSelect) {
                notificationIncidentTypeSelect.addEventListener('change', updateNotificationFormUI);
            }
            if (notificationAffiliationSelect) {
                notificationAffiliationSelect.addEventListener('change', updateNotificationFormUI);
            }

            const finishFormInit = () => {
                if (draft) {
                    this.applyNotificationDraftToForm(draft, {
                        locationSelect,
                        sublocationSelect,
                        updateSublocationOptions,
                        notificationIncidentTypeSelect,
                        notificationAffiliationSelect,
                        updateNotificationFormUI,
                        employeeCodeInput,
                        employeeNameInput,
                        employeeJobInput,
                        employeeDepartmentInput,
                        employeeDepartmentSelect,
                        contractorSelect,
                        injuryDescriptionEl: document.getElementById('notification-injury-description'),
                        descriptionEl: document.getElementById('notification-description'),
                        lossesEl: document.getElementById('notification-losses'),
                        actionsEl: document.getElementById('notification-actions'),
                        reporterNameEl: document.getElementById('notification-reporter-name'),
                        reporterCodeEl: document.getElementById('notification-reporter-code'),
                        dateEl: document.getElementById('notification-date')
                    });
                } else {
                    updateNotificationFormUI();
                }
            };

            const loadSitesPromise = (async () => {
                if (!locationSelect || locationSelect.options.length > 1) return;
                if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
                    try { await Permissions.ensureFormSettingsState(); } catch (_e) { /* ignore */ }
                }
                const sites = this.getSiteOptions();
                sites.forEach((site) => {
                    const option = document.createElement('option');
                    option.value = site.id;
                    option.textContent = site.name;
                    locationSelect.appendChild(option);
                });
            })();

            loadSitesPromise.finally(() => finishFormInit());

            // Employee auto-fill (only when affiliation is company employee + work injury)
            if (typeof EmployeeHelper !== 'undefined') {
                EmployeeHelper.setupEmployeeCodeSearch('notification-employee-code', 'notification-employee-name', (employee) => {
                    if (!employee || !isEmployeeAffiliation()) return;
                    const incidentType = notificationIncidentTypeSelect?.value || '';
                    if (incidentType !== 'إصابة عمل') return;
                    if (employeeCodeInput) employeeCodeInput.value = employee.code || employee.employeeNumber || employee.sapId || employee.id || '';
                    if (employeeNameInput) employeeNameInput.value = employee.name || employee.fullName || '';
                    if (employeeJobInput) employeeJobInput.value = employee.job || employee.jobTitle || employee.position || '';
                    fillNotificationDepartmentFromEmployee.call(this, employee);
                });

                EmployeeHelper.setupAutocomplete('notification-employee-name', (employee) => {
                    if (!employee || !isEmployeeAffiliation()) return;
                    const incidentType = notificationIncidentTypeSelect?.value || '';
                    if (incidentType !== 'إصابة عمل') return;
                    if (employeeCodeInput) employeeCodeInput.value = employee.code || employee.employeeNumber || employee.sapId || employee.id || '';
                    if (employeeJobInput) employeeJobInput.value = employee.job || employee.jobTitle || employee.position || '';
                    fillNotificationDepartmentFromEmployee.call(this, employee);
                });
            } else if (employeeCodeInput) {
                // Fallback: basic lookup by code if EmployeeHelper isn't available
                const tryFillByCode = () => {
                    if (!isEmployeeAffiliation()) return;
                    const code = (employeeCodeInput.value || '').toString().trim();
                    if (!code) return;
                    const employee = this.getEmployeeByCode(code);
                    if (!employee) return;
                    if (employeeNameInput) employeeNameInput.value = employee.name || employee.fullName || '';
                    if (employeeJobInput) employeeJobInput.value = employee.job || employee.jobTitle || employee.position || '';
                    fillNotificationDepartmentFromEmployee.call(this, employee);
                };
                employeeCodeInput.addEventListener('blur', tryFillByCode);
                employeeCodeInput.addEventListener('change', tryFillByCode);
            }
        }, 100);

        // معالجة إرسال النموذج
        modal.querySelector('#incident-notification-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleNotificationSubmit(modal, notificationNumber, { isEdit });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                const ok = confirm('تنبيه: سيتم إغلاق النموذج.\nقد تفقد أي بيانات غير محفوظة.\n\nهل تريد الإغلاق؟');
                if (ok) {
                    this._notificationEditContext = null;
                    modal.remove();
                }
            }
        });

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this._notificationEditContext = null;
            });
        }
    },

    async handleNotificationSubmit(modal, notificationNumber, options = {}) {
        const isEdit = !!options.isEdit || !!this._notificationEditContext?.incidentId;
        try {
            Loading.show(isEdit ? 'جاري حفظ التعديلات...' : 'جاري إرسال الإخطار...');

            // الحصول على بيانات الموقع والمكان الفرعي
            const locationSelect = document.getElementById('notification-location');
            const sublocationSelect = document.getElementById('notification-sublocation');

            const siteId = locationSelect?.value || '';
            const siteName = locationSelect?.options[locationSelect?.selectedIndex]?.text || siteId;
            const sublocationId = sublocationSelect?.value || '';
            const sublocationName = sublocationSelect?.options[sublocationSelect?.selectedIndex]?.text || sublocationId;

            // فحص العناصر قبل الاستخدام
            const dateEl = document.getElementById('notification-date');
            const incidentTypeEl = document.getElementById('notification-incident-type');
            const affiliationEl = document.getElementById('notification-affiliation');
            const contractorSelectEl = document.getElementById('notification-contractor-select');
            const employeeCodeEl = document.getElementById('notification-employee-code');
            const employeeNameEl = document.getElementById('notification-employee-name');
            const employeeJobEl = document.getElementById('notification-employee-job');
            const employeeDepartmentEl = document.getElementById('notification-employee-department');
            const employeeDepartmentSelectEl = document.getElementById('notification-employee-department-select');
            const injuryDescriptionEl = document.getElementById('notification-injury-description');
            const descriptionEl = document.getElementById('notification-description');
            const lossesEl = document.getElementById('notification-losses');
            const actionsEl = document.getElementById('notification-actions');
            const reporterNameEl = document.getElementById('notification-reporter-name');
            const reporterCodeEl = document.getElementById('notification-reporter-code');

            const affiliationValue = (affiliationEl?.value || '').toString().trim();
            const isEmployeeAffiliation = affiliationValue === 'employee' || affiliationValue === 'company';
            const isContractorAffiliation = affiliationValue === 'contractor';
            const isNonInjuryType = this.isNotificationNonInjuryType(incidentTypeEl?.value || '');
            const isWorkInjuryType = (incidentTypeEl?.value || '') === 'إصابة عمل';
            const contractorValue = (contractorSelectEl?.value || '').trim();
            let departmentValue = isNonInjuryType
                ? (employeeDepartmentSelectEl?.value || '').trim()
                : (isContractorAffiliation
                    ? contractorValue
                    : (employeeDepartmentEl?.value || '').trim());

            // Validate contractor when affiliation is "contractor"
            if (affiliationEl && isContractorAffiliation) {
                if (!contractorValue) {
                    Loading.hide();
                    Notification.error('يرجى اختيار المقاول من القائمة');
                    return;
                }
            }

            // Validate worker fields for work injury
            if (!isNonInjuryType) {
                if (!employeeNameEl || !employeeNameEl.value.trim()) {
                    Loading.hide();
                    Notification.error(isContractorAffiliation ? 'اسم العامل التابع للمقاول مطلوب' : 'اسم الموظف مطلوب');
                    return;
                }
                if (!employeeJobEl || !employeeJobEl.value.trim()) {
                    Loading.hide();
                    Notification.error(isContractorAffiliation ? 'وظيفة العامل مطلوبة' : 'الوظيفة مطلوبة');
                    return;
                }
            }

            if (!departmentValue) {
                Loading.hide();
                Notification.error(isContractorAffiliation && isWorkInjuryType ? 'يرجى اختيار المقاول' : 'الإدارة مطلوبة');
                return;
            }

            // Validate employee code only if affiliation is employee
            if (isEmployeeAffiliation) {
                if (!employeeCodeEl || !employeeCodeEl.value.trim()) {
                    Loading.hide();
                    Notification.error('كود الموظف مطلوب عند اختيار موظف');
                    return;
                }
            }

            if (!dateEl || !incidentTypeEl || !descriptionEl || !reporterNameEl) {
                Loading.hide();
                Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
                return;
            }

            const editCtx = this._notificationEditContext;
            const notificationData = {
                id: (isEdit && editCtx?.notificationId) ? editCtx.notificationId : Utils.generateId('NOTIF'),
                notificationNumber: notificationNumber,
                date: (() => {
                    try {
                        if (!dateEl.value) return new Date().toISOString();
                        const date = new Date(dateEl.value);
                        if (isNaN(date.getTime())) return new Date().toISOString();
                        return date.toISOString();
                    } catch (e) {
                        return new Date().toISOString();
                    }
                })(),
                location: siteName || siteId,
                siteId: siteId,
                siteName: siteName,
                sublocation: sublocationName || sublocationId,
                sublocationId: sublocationId,
                sublocationName: sublocationName,
                department: departmentValue,
                incidentType: incidentTypeEl.value,
                affiliation: affiliationValue,
                contractorName: contractorValue,
                employeeName: employeeNameEl?.value || '',
                employeeJob: employeeJobEl?.value || '',
                employeeDepartment: departmentValue,
                employeeCode: employeeCodeEl?.value || '',
                description: descriptionEl.value,
                injuryDescription: injuryDescriptionEl?.value || '',
                losses: lossesEl?.value || '',
                actions: actionsEl?.value || '',
                reporterName: reporterNameEl.value,
                reporterCode: reporterCodeEl?.value || '',
                updatedAt: new Date().toISOString(),
                createdBy: AppState.currentUser ? {
                    id: AppState.currentUser.id || '',
                    name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                    email: AppState.currentUser.email || ''
                } : null
            };

            if (isEdit && editCtx?.incidentId) {
                if (!AppState.appData.incidents) AppState.appData.incidents = [];
                const incidentIndex = AppState.appData.incidents.findIndex((i) => i.id === editCtx.incidentId);
                if (incidentIndex === -1) {
                    Loading.hide();
                    Notification.error('لم يتم العثور على الحادث للتعديل');
                    return;
                }

                const existing = AppState.appData.incidents[incidentIndex];
                const preserve = editCtx.preserve || {};

                if (!AppState.appData.incidentNotifications) {
                    AppState.appData.incidentNotifications = [];
                }
                if (editCtx.notificationId) {
                    const notifIndex = AppState.appData.incidentNotifications.findIndex((n) => n.id === editCtx.notificationId);
                    const prevNotif = notifIndex !== -1 ? AppState.appData.incidentNotifications[notifIndex] : {};
                    const mergedNotif = {
                        ...prevNotif,
                        ...notificationData,
                        id: editCtx.notificationId,
                        createdAt: prevNotif.createdAt || existing.createdAt || new Date().toISOString()
                    };
                    if (notifIndex !== -1) {
                        AppState.appData.incidentNotifications[notifIndex] = mergedNotif;
                    } else {
                        AppState.appData.incidentNotifications.push(mergedNotif);
                    }
                }

                const updatedIncident = this.buildIncidentFieldsFromNotification(notificationData, notificationNumber, {
                    ...existing,
                    id: existing.id,
                    notificationId: existing.notificationId || editCtx.notificationId || '',
                    isoCode: preserve.isoCode || existing.isoCode,
                    title: preserve.title || existing.title,
                    status: preserve.status || existing.status,
                    severity: preserve.severity || existing.severity,
                    investigation: preserve.investigation !== undefined ? preserve.investigation : existing.investigation,
                    actionPlan: preserve.actionPlan || existing.actionPlan,
                    attachments: preserve.attachments || existing.attachments,
                    image: preserve.image || existing.image,
                    createdAt: existing.createdAt,
                    createdBy: existing.createdBy || notificationData.createdBy,
                    affectedContact: preserve.affectedContact || existing.affectedContact,
                    rootCause: existing.rootCause || '',
                    correctiveAction: existing.correctiveAction || '',
                    preventiveAction: existing.preventiveAction || ''
                });

                AppState.appData.incidents[incidentIndex] = updatedIncident;

                try {
                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        window.DataManager.save();
                    }

                    await this.persistIncidentToServer(updatedIncident, { syncRegistry: true, silent: true });

                    Loading.hide();
                    Notification.success('تم تحديث الحادث بنجاح');
                    modal.remove();
                    this._notificationEditContext = null;
                    await this._refreshIncidentsViewsAfterUpdate(updatedIncident.id);

                    this.processIncidentBackgroundTasks(updatedIncident, { skipServerPersist: true }).catch((error) => {
                        Utils.safeError('خطأ في معالجة المرفقات:', error);
                    });
                } catch (serverError) {
                    Loading.hide();
                    Utils.safeError('خطأ في حفظ الحادث على الخادم:', serverError);
                    Notification.error('فشل حفظ التعديل: ' + (serverError.message || 'خطأ غير معروف'));
                }

                return;
            }

            notificationData.createdAt = new Date().toISOString();

            // حفظ الإخطار في Google Sheets
            if (!AppState.appData.incidentNotifications) {
                AppState.appData.incidentNotifications = [];
            }
            AppState.appData.incidentNotifications.push(notificationData);

            const investigationData = this.buildIncidentFieldsFromNotification(notificationData, notificationNumber, {
                id: Utils.generateId('INCIDENT'),
                notificationId: notificationData.id,
                status: 'مفتوح',
                severity: 'متوسطة',
                rootCause: '',
                correctiveAction: '',
                preventiveAction: '',
                investigation: null,
                createdAt: new Date().toISOString(),
                createdBy: notificationData.createdBy
            });

            if (!AppState.appData.incidents) {
                AppState.appData.incidents = [];
            }
            AppState.appData.incidents.push(investigationData);

            // حفظ البيانات باستخدام window.DataManager
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }

            // تحديث Dashboard
            if (typeof Dashboard !== 'undefined' && Dashboard.refreshIncidents) {
                Dashboard.refreshIncidents();
            }

            // إغلاق النموذج فوراً
            Loading.hide();
            Notification.success('تم إرسال الإخطار وإنشاء تحقيق تلقائي بنجاح');
            modal.remove();

            // معالجة المهام الخلفية (حفظ الإخطار والتحقيق)
            try {
                await this.processNotificationBackgroundTasks(notificationData, investigationData);
            } catch (error) {
                Utils.safeError('خطأ في معالجة المهام الخلفية:', error);
            }

            // فتح نموذج التحقيق الجديد للمستخدم
            setTimeout(() => {
                if (typeof this.showInvestigationForm === 'function') {
                    this.showInvestigationForm(investigationData.id);
                } else {
                    Notification.warning('نموذج التحقيق غير متاح حالياً');
                }
            }, 500);

        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في إرسال الإخطار:', error);
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    // جمع بيانات نموذج الإخطار للطباعة/التصدير
    getNotificationFormData() {
        const modal = document.querySelector('.modal-overlay');
        if (!modal) {
            return null;
        }

        const locationSelect = document.getElementById('notification-location');
        const sublocationSelect = document.getElementById('notification-sublocation');
        const notificationNumberEl = document.getElementById('notification-number');
        const dateEl = document.getElementById('notification-date');
        const incidentTypeEl = document.getElementById('notification-incident-type');
        const affiliationEl = document.getElementById('notification-affiliation');
        const contractorSelectEl = document.getElementById('notification-contractor-select');
        const employeeCodeEl = document.getElementById('notification-employee-code');
        const employeeNameEl = document.getElementById('notification-employee-name');
        const employeeJobEl = document.getElementById('notification-employee-job');
        const employeeDepartmentEl = document.getElementById('notification-employee-department');
        const employeeDepartmentSelectEl = document.getElementById('notification-employee-department-select');
        const injuryDescriptionEl = document.getElementById('notification-injury-description');
        const descriptionEl = document.getElementById('notification-description');
        const lossesEl = document.getElementById('notification-losses');
        const actionsEl = document.getElementById('notification-actions');
        const reporterNameEl = document.getElementById('notification-reporter-name');
        const reporterCodeEl = document.getElementById('notification-reporter-code');

        if (!notificationNumberEl || !dateEl || !incidentTypeEl || !descriptionEl || !reporterNameEl) {
            return null;
        }

        const siteId = locationSelect?.value || '';
        const siteName = locationSelect?.options[locationSelect?.selectedIndex]?.text || siteId;
        const sublocationId = sublocationSelect?.value || '';
        const sublocationName = sublocationSelect?.options[sublocationSelect?.selectedIndex]?.text || sublocationId;
        const departmentValue = this.getNotificationDepartmentValue();
        const contractorValue = this.getNotificationContractorValue();

        return {
            notificationNumber: notificationNumberEl.value,
            date: dateEl.value,
            location: siteName || siteId,
            siteId: siteId,
            siteName: siteName,
            sublocation: sublocationName || sublocationId,
            sublocationId: sublocationId,
            sublocationName: sublocationName,
            incidentType: incidentTypeEl.value,
            affiliation: affiliationEl?.value || '',
            contractorName: contractorValue,
            employeeCode: employeeCodeEl?.value || '',
            employeeName: employeeNameEl?.value || '',
            employeeJob: employeeJobEl?.value || '',
            employeeDepartment: departmentValue,
            department: departmentValue,
            description: descriptionEl.value,
            injuryDescription: injuryDescriptionEl?.value || '',
            losses: lossesEl?.value || '',
            actions: actionsEl?.value || '',
            reporterName: reporterNameEl.value,
            reporterCode: reporterCodeEl?.value || ''
        };
    },

    // طباعة إخطار الحادث
    printNotification() {
        try {
            const notificationData = this.getNotificationFormData();
            
            if (!notificationData) {
                Notification.warning('لا توجد بيانات للطباعة. يرجى فتح النموذج أولاً.');
                return;
            }

            if (!notificationData.notificationNumber && !notificationData.description) {
                Notification.warning('لا توجد بيانات للطباعة');
                return;
            }

            Loading.show('جاري إعداد الطباعة...');
            const htmlContent = this._buildNotificationReportHtml(notificationData);
            this._openIncidentPrintableHtml(htmlContent, 'تم تجهيز الإخطار للطباعة');
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في طباعة الإخطار:', error);
            Notification.error('فشل الطباعة: ' + error.message);
        }
    },

    // بناء محتوى HTML للطباعة
    buildNotificationPrintContent(notificationData) {
        const companyName = AppState?.companySettings?.name || AppState?.companyName || '';
        const companySecondaryName = AppState?.companySettings?.secondaryName || '';
        const companyLogo = AppState?.companyLogo || '';
        
        const formatDate = (dateStr) => {
            if (!dateStr) return 'غير محدد';
            try {
                const date = new Date(dateStr);
                return date.toLocaleString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch {
                return dateStr;
            }
        };

        const affiliationNames = {
            'company': 'شركة',
            'employee': 'موظف',
            'daily-labor': 'عمالة يومية',
            'contractor': 'مقاول',
            'visitor': 'زائر',
            'none': 'لا يوجد'
        };

        return `
            <div style="direction: rtl; text-align: right; font-family: 'Tahoma', Arial, sans-serif;">
                <!-- Header -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #667eea;">
                    <div style="flex: 0 0 auto; text-align: right; padding-left: 20px;">
                        ${companyLogo ? `<img src="${companyLogo}" alt="شعار الشركة" style="max-height: 60px; max-width: 150px; object-fit: contain;">` : ''}
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #667eea; margin-bottom: 5px;">إخطار عن حادث</div>
                        <div style="font-size: 1.2rem; font-weight: 600; color: #764ba2;">Incident Notification</div>
                    </div>
                    <div style="flex: 0 0 auto; text-align: left; padding-right: 20px;">
                        <div style="font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3;">
                            <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(companyName || '')}</div>
                            ${companySecondaryName ? `<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(companySecondaryName)}</div>` : ''}
                        </div>
                    </div>
                </div>

                <!-- المعلومات الأساسية -->
                <div style="margin-bottom: 25px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">
                        <i class="fas fa-info-circle"></i> المعلومات الأساسية
                    </div>
                    <table style="width: 100%; border-collapse: collapse; background: white; border: 2px solid #667eea; border-radius: 0 0 8px 8px;">
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right; width: 30%;">رقم الإخطار</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.notificationNumber || 'غير محدد')}</td>
                        </tr>
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right;">تاريخ ووقت الحادث</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${formatDate(notificationData.date)}</td>
                        </tr>
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right;">مكان الحادث</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.siteName || notificationData.location || 'غير محدد')}</td>
                        </tr>
                        ${notificationData.sublocationName ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #e0e7ff; text-align: right;">المكان الفرعي</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.sublocationName)}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>

                <!-- تفاصيل الحادث -->
                <div style="margin-bottom: 25px;">
                    <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">
                        <i class="fas fa-clipboard-list"></i> تفاصيل الحادث
                    </div>
                    <table style="width: 100%; border-collapse: collapse; background: white; border: 2px solid #f59e0b; border-radius: 0 0 8px 8px;">
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">نوع الحادث</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.incidentType || 'غير محدد')}</td>
                        </tr>
                        ${notificationData.affiliation ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">التبعية</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${affiliationNames[notificationData.affiliation] || notificationData.affiliation}</td>
                        </tr>
                        ` : ''}
                        ${notificationData.employeeCode ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">كود الموظف</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.employeeCode)}</td>
                        </tr>
                        ` : ''}
                        ${notificationData.contractorName ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">اسم المقاول</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.contractorName)}</td>
                        </tr>
                        ` : ''}
                        ${notificationData.employeeName ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">اسم الموظف</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.employeeName)}</td>
                        </tr>
                        ` : ''}
                        ${notificationData.employeeJob ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">الوظيفة</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.employeeJob)}</td>
                        </tr>
                        ` : ''}
                        ${notificationData.employeeDepartment ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #fef3c7; text-align: right;">الإدارة</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.employeeDepartment)}</td>
                        </tr>
                        ` : ''}
                    </table>
                    
                    ${notificationData.description ? `
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">وصف مختصر للحادث:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(notificationData.description)}</div>
                    </div>
                    ` : ''}
                    
                    ${notificationData.injuryDescription ? `
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">وصف الإصابة:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(notificationData.injuryDescription)}</div>
                    </div>
                    ` : ''}
                    
                    ${notificationData.losses ? `
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">الخسائر:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(notificationData.losses)}</div>
                    </div>
                    ` : ''}
                    
                    ${notificationData.actions ? `
                    <div style="background: white; padding: 15px; border: 2px solid #f59e0b; border-radius: 8px; margin-top: 15px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #f59e0b; font-size: 1rem;">الإجراءات المتخذة:</div>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${Utils.escapeHTML(notificationData.actions)}</div>
                    </div>
                    ` : ''}
                </div>

                <!-- معلومات معد الإخطار -->
                <div style="margin-bottom: 25px;">
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">
                        <i class="fas fa-user-edit"></i> معلومات معد الإخطار
                    </div>
                    <table style="width: 100%; border-collapse: collapse; background: white; border: 2px solid #10b981; border-radius: 0 0 8px 8px;">
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #d1fae5; text-align: right; width: 30%;">اسم معد الإخطار</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.reporterName || 'غير محدد')}</td>
                        </tr>
                        ${notificationData.reporterCode ? `
                        <tr>
                            <th style="padding: 12px; border: 1px solid #ddd; background-color: #d1fae5; text-align: right;">كود معد الإخطار</th>
                            <td style="padding: 12px; border: 1px solid #ddd;">${Utils.escapeHTML(notificationData.reporterCode)}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>
            </div>
        `;
    },

    _buildNotificationReportHtml(notificationData) {
            const content = this.buildNotificationPrintContent(notificationData);
            const formCode = notificationData.notificationNumber || `NOT-${new Date().toISOString().slice(0, 10)}`;

        if (typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML) {
            return FormHeader.generatePDFHTML(
                    formCode,
                    'إخطار عن حادث - Incident Notification',
                    content,
                    false,
                false,
                {
                    version: AppState?.companySettings?.formVersion || '1.0',
                    titleAr: 'إخطار عن حادث',
                    titleEn: 'Incident Notification',
                    includeQRCode: false
                },
                notificationData.date || new Date(),
                new Date()
            );
        }

        return `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${content}</body></html>`;
    },

    // تصدير إخطار الحادث إلى PDF — تحميل مباشر
    async exportNotificationPDFWithData(notificationData) {
        try {
            Loading.show('جاري تحضير PDF...');
            const htmlContent = this._buildNotificationReportHtml(notificationData);
            const ref = notificationData.notificationNumber || 'notification';
            const safeName = `إخطار-حادث-${String(ref).replace(/[^\w\u0600-\u06FF.-]/g, '_')}`;
            const downloaded = await this._downloadHtmlReportAsPdf(htmlContent, safeName);
                            Loading.hide();

            if (downloaded) {
                Notification.success('تم تحميل إخطار الحادث بنجاح');
                return true;
            }

            this._openIncidentPrintableHtml(htmlContent, 'تعذّر التحميل المباشر — تم فتح نافذة الطباعة');
            return true;
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير PDF:', error);
            Notification.error('فشل تصدير PDF: ' + error.message);
            return false;
        }
    },

    // تصدير إخطار الحادث إلى PDF
    async exportNotificationPDF() {
        const notificationData = this.getNotificationFormData();
        if (!notificationData) {
            Notification.warning('لا توجد بيانات للتصدير. يرجى فتح النموذج أولاً.');
            return;
        }
        if (!notificationData.notificationNumber && !notificationData.description) {
            Notification.warning('لا توجد بيانات للتصدير');
            return;
        }
        await this.exportNotificationPDFWithData(notificationData);
    },

    // معالجة المهام الخلفية بعد حفظ الإخطار
    async processNotificationBackgroundTasks(notificationData, investigationData) {
        try {
            // حفظ الإخطار في Google Sheets عبر Backend
            const notificationResult = await GoogleIntegration.sendRequest({
                action: 'addIncidentNotification',
                data: notificationData
            });

            if (notificationResult && notificationResult.success) {
                Utils.safeLog('✅ تم حفظ الإخطار في Google Sheets بنجاح');
            } else {
                Utils.safeWarn('⚠️ فشل حفظ الإخطار في Google Sheets، سيتم المحاولة عبر autoSave');
                // Fallback: استخدام autoSave
                await GoogleIntegration.autoSave('IncidentNotifications', AppState.appData.incidentNotifications);
            }

            // إضافة التحقيق إلى Google Sheets
            await GoogleIntegration.sendRequest({
                action: 'addIncident',
                data: investigationData
            });

            // إنشاء Action Record تلقائي
            if (notificationData.actions) {
                try {
                    await GoogleIntegration.sendToAppsScript?.('createActionFromModule', {
                        sourceModule: 'IncidentNotification',
                        sourceId: notificationData.id,
                        sourceData: {
                            date: notificationData.date,
                            description: notificationData.description,
                            correctiveAction: notificationData.actions,
                            department: notificationData.department,
                            location: notificationData.location,
                            siteId: notificationData.siteId,
                            siteName: notificationData.siteName,
                            sublocation: notificationData.sublocation,
                            sublocationId: notificationData.sublocationId,
                            sublocationName: notificationData.sublocationName,
                            severity: 'Medium',
                            reportedBy: notificationData.reporterName,
                            createdBy: notificationData.createdBy?.name || 'System',
                            ...notificationData
                        }
                    });
                } catch (actionError) {
                    Utils.safeError('خطأ في إنشاء Action Record:', actionError);
                }
            }

            Utils.safeLog('Incidents: تم إكمال المهام الخلفية للإخطار بنجاح');
        } catch (error) {
            Utils.safeError('خطأ في معالجة المهام الخلفية للإخطار:', error);
        }
    },

    async editIncident(id) {
        const user = AppState.currentUser;
        if (!user) {
            Notification.error('يجب تسجيل الدخول أولاً');
            return;
        }
        const role = String(user.role || '').trim().toLowerCase();
        const perms = user.permissions || {};
        const canEdit = role === 'admin' || role === 'administrator' || role === 'system_admin' ||
            perms.admin === true || perms['manage-modules'] === true || perms['incidents-manage'] === true ||
            role === 'safety_officer' || perms['incidents-complete-investigation'] === true;
        if (!canEdit) {
            Notification.error('ليس لديك صلاحية لتعديل الحوادث.');
            return;
        }
        const incident = AppState.appData.incidents.find(i => i.id === id);
        if (incident) {
            const merged = { ...incident };
            this._mergeIncidentWithInvestigationData(merged);
            await this.showNotificationForm(merged);
        }
    },

    async viewIncident(id) {
        const incident = AppState.appData.incidents.find(i => i.id === id);
        if (!incident) return;

        this._normalizeIncidentApprovalRecord(incident);

        // معالجة investigation - تحويل من JSON string إلى object إذا لزم الأمر
        if (incident.investigation && typeof incident.investigation === 'string') {
            try {
                incident.investigation = JSON.parse(incident.investigation);
            } catch (e) {
                Utils.safeWarn('خطأ في تحليل investigation:', e);
                incident.investigation = {};
            }
        }

        const approvalState = this.getIncidentApprovalState(incident);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay incident-professional-modal incident-modal-details';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">تفاصيل الحادث</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderApprovalFlowHtml(incident)}
                    <div style="margin-bottom:16px;">
                        <span class="text-sm font-semibold text-gray-600">حالة الاعتماد:</span>
                        ${this.renderWorkflowStatusBadge(incident)}
                    </div>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">كود ISO:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(incident.isoCode || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">العنوان:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(incident.title || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الموقع:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(incident.location || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">التاريخ:</label>
                                <p class="text-gray-800">${incident.date ? Utils.formatDate(incident.date) : '-'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الشدة:</label>
                                <span class="badge badge-${this.getSeverityBadgeClass(incident.severity)}">
                                    ${incident.severity || '-'}
                                </span>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">المبلغ:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(incident.reportedBy || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الكود الوظيفي:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(incident.employeeCode || incident.employeeNumber || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الحالة:</label>
                                <span class="badge badge-${this.getStatusBadgeClass(this.getIncidentDisplayStatus(incident))}">
                                    ${Utils.escapeHTML(this.getIncidentDisplayStatus(incident))}
                                </span>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">الوصف:</label>
                                <p class="text-gray-800 whitespace-pre-wrap">${Utils.escapeHTML(incident.description || '')}</p>
                            </div>
                            ${incident.image ? `
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">صورة توضيحية:</label>
                                <div class="mt-2">
                                    <img src="${this.convertGoogleDriveLinkToPrintable(incident.image)}" alt="صورة الحادث" class="max-w-full h-auto rounded border" style="max-height: 400px;"
                                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';">
                                </div>
                            </div>
                            ` : ''}
                            ${incident.correctiveAction ? `
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">الخطة التصحيحية:</label>
                                <p class="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded border">${Utils.escapeHTML(incident.correctiveAction || '')}</p>
                            </div>
                            ` : ''}
                            ${incident.investigation ? `
                            <div class="col-span-2 border-t pt-4 mt-4">
                                <h3 class="text-base font-semibold text-gray-700 mb-3">
                                    <i class="fas fa-search ml-2"></i>
                                    بيانات التحقيق
                                </h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">رقم التحقيق:</label>
                                        <p class="text-gray-800">${Utils.escapeHTML(incident.investigation.investigationNumber || '-')}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">تاريخ التحقيق:</label>
                                        <p class="text-gray-800">${incident.investigation.investigationDateTime ? Utils.formatDate(incident.investigation.investigationDateTime) : '-'}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">المصنع:</label>
                                        <p class="text-gray-800">${Utils.escapeHTML(incident.investigation.factoryName || '-')}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">موقع الحادث:</label>
                                        <p class="text-gray-800">${Utils.escapeHTML(incident.investigation.locationName || '-')}</p>
                                    </div>
                                    ${incident.investigation.riskResult ? `
                                    <div>
                                        <label class="text-sm font-semibold text-gray-600">نتيجة التقييم:</label>
                                        <span class="badge badge-${incident.investigation.riskResult === 'high' ? 'danger' : incident.investigation.riskResult === 'medium' ? 'warning' : 'info'}">
                                            ${incident.investigation.riskResult === 'high' ? 'عالي' : incident.investigation.riskResult === 'medium' ? 'متوسط' : 'منخفض'}
                                        </span>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button class="btn-secondary" onclick="Incidents.exportPDF('${incident.id}');">
                        <i class="fas fa-file-pdf ml-2"></i>تصدير تقرير الحادث
                    </button>
                    ${approvalState.awaitingApproval && this.hasInvestigationData(incident) && this.canApproveIncident() ? `
                    <button class="btn-danger" onclick="Incidents.rejectIncident('${incident.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-times ml-2"></i>رفض التحقيق
                    </button>
                    <button class="btn-success" onclick="Incidents.approveIncident('${incident.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-check ml-2"></i>اعتماد التحقيق
                    </button>
                    ` : ''}
                    ${incident.investigation ? `
                    <button class="btn-secondary" onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${incident.id}'); this.closest('.modal-overlay').remove(); } else { console.error('Incidents.showInvestigationForm is not available'); alert('نموذج التحقيق غير متاح. يرجى إعادة تحميل الصفحة.'); }">
                        <i class="fas fa-search ml-2"></i>عرض/تعديل التحقيق
                    </button>
                    ` : `
                    <button class="btn-secondary" onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { Incidents.showInvestigationForm('${incident.id}'); this.closest('.modal-overlay').remove(); } else { console.error('Incidents.showInvestigationForm is not available'); alert('نموذج التحقيق غير متاح. يرجى إعادة تحميل الصفحة.'); }">
                        <i class="fas fa-search ml-2"></i>التحقيق في الحادث
                    </button>
                    `}
                    <button class="btn-primary" onclick="Incidents.editIncident('${incident.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>تعديل
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async deleteIncident(id) {
        if (!id) {
            Notification.error('معرف الحادث غير موجود');
            return;
        }

        if (!this.canDeleteIncident()) {
            Notification.error('ليس لديك صلاحية لحذف الحوادث. الحذف متاح لمدير النظام فقط.');
            return;
        }

        if (!confirm('هل أنت متأكد من حذف هذا الحادث؟ لا يمكن التراجع عن هذا الإجراء.')) return;

        const deletedIncident = (AppState.appData.incidents || []).find(i => i.id === id);
        if (!deletedIncident) {
            Notification.error('الحادث غير موجود أو تم حذفه مسبقاً');
            return;
        }

        Loading.show('جاري حذف الحادث...');
        try {
                const userData = {
                    id: AppState.currentUser?.id || '',
                    email: AppState.currentUser?.email || '',
                    name: AppState.currentUser?.name || '',
                    role: AppState.currentUser?.role || '',
                    permissions: AppState.currentUser?.permissions || {}
                };

            const result = await GoogleIntegration.sendRequest({
                    action: 'deleteIncident',
                    data: {
                        incidentId: id,
                        userData: userData
                    }
                });

            if (!result?.success) {
                throw new Error(result?.message || 'فشل حذف الحادث على الخادم');
            }

            if (typeof GoogleIntegration.clearCache === 'function') {
                GoogleIntegration.clearCache('Incidents');
            }

            AppState.appData.incidents = (AppState.appData.incidents || []).filter(i => i.id !== id);
                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات محلياً');
                }

                    await this.removeFromRegistry(id);

            if (typeof Dashboard !== 'undefined' && Dashboard.refreshIncidents) {
                Dashboard.refreshIncidents();
            }

            Notification.success('تم حذف الحادث بنجاح');

            if (this.currentTab === 'approvals') {
                const content = document.getElementById('incidents-tab-content');
                if (content) {
                    content.innerHTML = await this.renderApprovalsTab();
                    this.setupTabEventListeners('approvals');
                }
            } else {
            this.loadIncidentsList();
            }
        } catch (error) {
            Utils.safeError('خطأ في حذف الحادث:', error);
            Notification.error('فشل حذف الحادث: ' + (error.message || 'خطأ غير معروف'));
        } finally {
            Loading.hide();
        }
    },

    // نموذج التحقيق في الحادث - Incident Investigation
    async showInvestigationForm(incidentId) {
        try {
            if (AppState.debugMode) Utils.safeLog('🔍 showInvestigationForm called with incidentId:', incidentId);

            if (!incidentId) {
                if (AppState.debugMode) Utils.safeError('❌ incidentId is missing');
                Notification.error('معرف الحادث غير موجود');
                return;
            }

            if (!AppState || !AppState.appData || !AppState.appData.incidents) {
                if (AppState.debugMode) Utils.safeError('❌ AppState.appData.incidents is not available');
                Notification.error('بيانات الحوادث غير متاحة');
                Utils.safeError('AppState.appData.incidents is not available');
                return;
            }

            if (AppState.debugMode) Utils.safeLog('✅ AppState check passed, incidents count:', AppState.appData.incidents.length);

            const incident = AppState.appData.incidents.find(i => i.id === incidentId);
            if (!incident) {
                if (AppState.debugMode) {
                    Utils.safeError('❌ Incident not found with id:', incidentId);
                    Utils.safeLog('Available incident IDs:', AppState.appData.incidents.map(i => i.id));
                }
                Notification.error('الحادث غير موجود');
                Utils.safeError('Incident not found with id:', incidentId);
                return;
            }

            if (AppState.debugMode) Utils.safeLog('✅ Incident found:', incident.title || incident.id);

            // التحقق من الصلاحيات (مرن - يسمح للمستخدمين العاديين بالعرض)
            const isAdmin = AppState.currentUser?.role === 'admin' ||
                (AppState.currentUser?.permissions && (
                    AppState.currentUser.permissions.admin === true ||
                    AppState.currentUser.permissions['manage-modules'] === true
                ));

            // التحقق من صلاحية مسئول السلامة لاستكمال التحقيق
            const isSafetyOfficer = AppState.currentUser?.role === 'safety_officer' ||
                (AppState.currentUser?.permissions &&
                    AppState.currentUser.permissions['incidents-complete-investigation'] === true);

            // التحقق من أن الحادث تم إنشاؤه من إخطار (يحتوي على notificationId)
            const isFromNotification = !!incident.notificationId;

            // السماح بالتعديل إذا كان:
            // 1. مدير النظام (صلاحيات كاملة)
            // 2. مسئول السلامة مع صلاحية استكمال التحقيق (يمكنه حفظ التحقيق لكن يحتاج موافقة)
            const canEdit = isAdmin || isSafetyOfficer;

            // معالجة investigation - تحويل من JSON string إلى object إذا لزم الأمر
            let investigationData = incident.investigation || {};
            if (typeof investigationData === 'string') {
                try {
                    investigationData = JSON.parse(investigationData);
                } catch (e) {
                    Utils.safeWarn('خطأ في تحليل investigation:', e);
                    investigationData = {};
                }
            }

            const isEdit = !!investigationData.investigationNumber;

            // توليد رقم التحقيق تلقائياً إذا لم يكن موجوداً
            const investigationNumber = investigationData.investigationNumber ||
                `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String((AppState.appData.incidents || []).filter(i => i.investigation?.investigationNumber).length + 1).padStart(4, '0')}`;

            // التواريخ - تحميل تلقائي من بيانات الحادث إذا لم تكن موجودة
            const investigationDateTime = investigationData.investigationDateTime ?
                this.safeDateToISOString(investigationData.investigationDateTime) :
                (isEdit ? '' : Utils.toDateTimeLocalString(new Date()));
            const incidentDateTime = investigationData.incidentDateTime ?
                this.safeDateToISOString(investigationData.incidentDateTime) :
                this.safeDateToISOString(incident.date);

            // تحميل بيانات الحادث تلقائياً في حقول التحقيق إذا لم تكن موجودة
            const factoryId = investigationData.factoryId || incident.siteId || '';
            const locationId = investigationData.locationId || incident.sublocationId || '';
            const description = investigationData.description || incident.description || '';
            const affectedName = investigationData.affectedName || incident.affectedName || '';
            const affectedJob = investigationData.affectedJob || incident.affectedJobTitle || '';
            const affectedDepartment = investigationData.affectedDepartment || incident.affectedDepartment || '';
            const affectedEmployeeCode = investigationData.affectedEmployeeCode
                || incident.affectedCode
                || incident.employeeCode
                || '';
            const affectedAffiliationInit = investigationData.affectedAffiliation || incident.affiliation || '';
            const contractorSelectHtml = this.buildInvestigationAffectedContractorSelectOptions(
                affectedAffiliationInit === 'contractor' ? affectedDepartment : ''
            );
            const injuredPartInit = investigationData.injuredPart
                || incident.injuredPart
                || this.resolveIncidentInjuredPart(incident);
            const equipmentCauseInit = investigationData.equipmentCause
                || incident.equipmentCause
                || '';
            const bodyPartsDatalist = this._buildInvestigationBodyPartsDatalistOptions();

            // توليد صفوف خطة العمل قبل template literal لتجنب مشكلة this
            const actionPlanRows = this.renderInvestigationActionPlanRows(investigationData.actionPlan || []);

            const modal = document.createElement('div');
            modal.className = 'modal-overlay incident-professional-modal incident-modal-investigation';
            // إضافة styles مباشرة لضمان ظهور النموذج
            modal.style.cssText = 'display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;';
            modal.innerHTML = `
            <style>
                .investigation-section {
                    border-radius: 12px;
                    padding: 24px;
                    margin-bottom: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 2px solid;
                    transition: all 0.3s ease;
                }
                .investigation-section:hover {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                    transform: translateY(-2px);
                }
                .investigation-section h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    padding-bottom: 12px;
                    border-bottom: 3px solid;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .investigation-section h3 i {
                    font-size: 1.5rem;
                    padding: 10px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.3);
                }
                .section-1 { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196F3; }
                .section-1 h3 { color: #1565C0; border-color: #2196F3; }
                .section-1 h3 i { color: #1976D2; background: rgba(33, 150, 243, 0.1); }
                
                .section-2 { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9C27B0; }
                .section-2 h3 { color: #6A1B9A; border-color: #9C27B0; }
                .section-2 h3 i { color: #7B1FA2; background: rgba(156, 39, 176, 0.1); }
                
                .section-3 { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #FF9800; }
                .section-3 h3 { color: #E65100; border-color: #FF9800; }
                .section-3 h3 i { color: #F57C00; background: rgba(255, 152, 0, 0.1); }
                
                .section-4 { background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #E91E63; }
                .section-4 h3 { color: #AD1457; border-color: #E91E63; }
                .section-4 h3 i { color: #C2185B; background: rgba(233, 30, 99, 0.1); }
                
                .section-5 { background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #009688; }
                .section-5 h3 { color: #00695C; border-color: #009688; }
                .section-5 h3 i { color: #00796B; background: rgba(0, 150, 136, 0.1); }
                
                .section-6 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4CAF50; }
                .section-6 h3 { color: #2E7D32; border-color: #4CAF50; }
                .section-6 h3 i { color: #388E3C; background: rgba(76, 175, 80, 0.1); }
                
                .section-7 { background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); border-color: #FFC107; }
                .section-7 h3 { color: #F57F17; border-color: #FFC107; }
                .section-7 h3 i { color: #F9A825; background: rgba(255, 193, 7, 0.1); }

                .section-rca { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-color: #7c3aed; }
                .section-rca h3 { color: #5b21b6; border-color: #7c3aed; }
                .section-rca h3 i { color: #6d28d9; background: rgba(124, 58, 237, 0.1); }
            </style>
            <div class="modal-content" style="max-width: 1500px; width: 98%; max-height: 95vh; overflow-y: auto; padding: 0;">
                <div class="modal-header modal-header-centered" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 20px 30px;">
                    <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700; color: white;">
                        <i class="fas fa-search ml-2"></i>
                        التحقيق في الحادث – Incident Investigation
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: white; font-size: 1.5rem;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 30px; max-height: calc(95vh - 180px); overflow-y: auto; background: #f5f7fa;">
                    <form id="investigation-form" data-incident-id="${incidentId}">
                        <!-- 1) بيانات الحادث الأساسية -->
                        <div class="investigation-section section-1">
                            <h3>
                                <i class="fas fa-info-circle"></i>
                                <span>1) بيانات الحادث الأساسية</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-calendar-alt ml-2 text-blue-600"></i>
                                        تاريخ ووقت التحقيق *
                                    </label>
                                    <input type="datetime-local" id="investigation-datetime" required class="form-input" 
                                        value="${investigationDateTime}" style="border: 2px solid #2196F3; font-weight: 500;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-calendar-check ml-2 text-blue-600"></i>
                                        تاريخ ووقت الحادث *
                                    </label>
                                    <input type="datetime-local" id="incident-datetime" required class="form-input" 
                                        value="${incidentDateTime}" style="border: 2px solid #2196F3; font-weight: 500;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-industry ml-2 text-blue-600"></i>
                                        المصنع *
                                    </label>
                                    <select id="investigation-factory" required class="form-input" style="border: 2px solid #2196F3;">
                                        <option value="">اختر المصنع</option>
                                        ${factoryId ? `<option value="${factoryId}" selected>${Utils.escapeHTML(incident.siteName || incident.location || '')}</option>` : ''}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-map-marker-alt ml-2 text-blue-600"></i>
                                        موقع الحادث بالضبط *
                                    </label>
                                    <select id="investigation-location" required class="form-input" style="border: 2px solid #2196F3;">
                                        <option value="">اختر موقع الحادث</option>
                                        ${locationId ? `<option value="${locationId}" selected>${Utils.escapeHTML(incident.sublocationName || incident.sublocation || '')}</option>` : ''}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-hashtag ml-2 text-blue-600"></i>
                                        رقم التحقيق
                                    </label>
                                    <input type="text" id="investigation-number" class="form-input" 
                                        value="${investigationNumber}" readonly style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%); font-weight: 700; border: 2px solid #1976D2; color: #0D47A1;">
                                </div>
                            </div>
                        </div>

                        <!-- 2) نوع الحادث -->
                        <div class="investigation-section section-2">
                            <h3>
                                <i class="fas fa-tags"></i>
                                <span>2) نوع الحادث</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-nearmiss" class="form-checkbox ml-2 text-purple-600" 
                                        ${investigationData.incidentTypes?.includes('nearmiss') ? 'checked' : ''}>
                                    <span class="font-semibold text-gray-700">حادث وشيك</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-property" class="form-checkbox ml-2 text-purple-600"
                                        ${investigationData.incidentTypes?.includes('property') ? 'checked' : ''}>
                                    <span class="font-semibold text-gray-700">تلف ممتلكات</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-injury-no-lost" class="form-checkbox ml-2 text-purple-600"
                                        ${investigationData.incidentTypes?.includes('injury-no-lost') ? 'checked' : ''}>
                                    <span class="font-semibold text-gray-700">إصابة بدون فقد أيام عمل</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-injury-lost" class="form-checkbox ml-2 text-purple-600"
                                        ${investigationData.incidentTypes?.includes('injury-lost') ? 'checked' : ''}>
                                    <span class="font-semibold text-gray-700">إصابة مع فقد أيام عمل</span>
                                </label>
                                <label class="flex items-center p-3 bg-white rounded-lg border-2 border-purple-300 hover:bg-purple-50 cursor-pointer transition-all">
                                    <input type="checkbox" id="incident-type-fatality" class="form-checkbox ml-2 text-purple-600"
                                        ${investigationData.incidentTypes?.includes('fatality') ? 'checked' : ''}>
                                    <span class="font-semibold text-gray-700">وفاة</span>
                                </label>
                            </div>
                        </div>

                        <!-- 3) وصف وقائع وظروف الحادث -->
                        <div class="investigation-section section-3">
                            <h3>
                                <i class="fas fa-align-left"></i>
                                <span>3) وصف وقائع وظروف الحادث</span>
                            </h3>
                            <div class="space-y-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-file-alt ml-2 text-orange-600"></i>
                                        الوصف الرئيسي *
                                    </label>
                                    <textarea id="investigation-description" required class="form-input" rows="6" 
                                        placeholder="وصف تفصيلي لوقائع وظروف الحادث..." style="border: 2px solid #FF9800; font-size: 1rem;">${Utils.escapeHTML(description)}</textarea>
                                </div>
                                <div id="nearmiss-description-wrapper" style="display: none;">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-exclamation-triangle ml-2 text-orange-600"></i>
                                        وصف الحالة الوشيكة
                                    </label>
                                    <textarea id="investigation-nearmiss-description" class="form-input" rows="4" 
                                        placeholder="وصف تفصيلي للحالة الوشيكة..." style="border: 2px solid #FF9800;">${Utils.escapeHTML(investigationData.nearmissDescription || '')}</textarea>
                                </div>
                            </div>
                        </div>

                        <!-- 4) بيانات المصاب -->
                        <div class="investigation-section section-4">
                            <h3>
                                <i class="fas fa-user-injured"></i>
                                <span>4) بيانات المصاب</span>
                            </h3>
                            <div id="investigation-affected-panel" class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">تبعية المصاب</label>
                                        <select id="investigation-affected-affiliation" class="form-input">
                                            <option value="">اختر التبعية</option>
                                            <option value="company" ${investigationData.affectedAffiliation === 'company' ? 'selected' : ''}>شركة</option>
                                            <option value="daily-labor" ${investigationData.affectedAffiliation === 'daily-labor' ? 'selected' : ''}>عمالة يومية</option>
                                            <option value="contractor" ${investigationData.affectedAffiliation === 'contractor' ? 'selected' : ''}>مقاول</option>
                                            <option value="visitor" ${investigationData.affectedAffiliation === 'visitor' ? 'selected' : ''}>زائر</option>
                                            <option value="none" ${investigationData.affectedAffiliation === 'none' ? 'selected' : ''}>لا يوجد</option>
                                        </select>
                                    </div>

                                    <div id="investigation-affected-code-wrapper" class="md:col-span-2" style="display:none;">
                                        <div class="p-4 rounded-lg border-2 border-pink-200 bg-white/80">
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                                <i class="fas fa-id-badge ml-1 text-pink-600"></i>
                                                كود الموظف *
                                            </label>
                                            <input type="text" id="investigation-affected-employee-code" class="form-input"
                                                value="${Utils.escapeHTML(affectedEmployeeCode)}"
                                                placeholder="اكتب كود الموظف للبحث والتعبئة التلقائية" autocomplete="off">
                                            <p class="text-xs text-gray-500 mt-2">عند إدخال الكود تُملأ الاسم والوظيفة والإدارة والسن تلقائياً.</p>
                                        </div>
                                    </div>

                                    <div id="investigation-affected-contractor-wrapper" class="md:col-span-2" style="display:none;">
                                        <div class="p-4 rounded-lg border-2 border-pink-200 bg-white/80">
                                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                                <i class="fas fa-handshake ml-1 text-pink-600"></i>
                                                المقاول (الجهة التابع لها) *
                                            </label>
                                            <select id="investigation-affected-contractor-select" class="form-input">
                                                ${contractorSelectHtml}
                                            </select>
                                            <p class="text-xs text-gray-500 mt-2">اختر المقاول من القائمة المعتمدة، ثم أدخل بيانات العامل أدناه.</p>
                                        </div>
                                    </div>

                                    <div id="investigation-affected-name-wrapper">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">الاسم</label>
                                        <input type="text" id="investigation-affected-name" class="form-input"
                                            value="${Utils.escapeHTML(affectedName)}"
                                            placeholder="اسم المصاب">
                                    </div>
                                    <div id="investigation-affected-job-wrapper">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">الوظيفة</label>
                                        <input type="text" id="investigation-affected-job" class="form-input"
                                            value="${Utils.escapeHTML(affectedJob)}"
                                            placeholder="الوظيفة">
                                    </div>
                                    <div id="investigation-affected-age-wrapper">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">السن</label>
                                        <input type="number" id="investigation-affected-age" class="form-input"
                                            value="${investigationData.affectedAge || ''}"
                                            placeholder="يُعبَّأ تلقائياً من كود الموظف" min="1" max="100">
                                    </div>

                                    <div id="investigation-affected-department-wrapper" class="md:col-span-2">
                                        <label id="investigation-affected-department-label" class="block text-sm font-semibold text-gray-700 mb-2">الجهة التابع لها</label>
                                        <input type="text" id="investigation-affected-department" class="form-input"
                                            value="${Utils.escapeHTML(affectedDepartment)}"
                                            placeholder="الجهة التابع لها">
                                    </div>

                                    <div id="investigation-injured-part-wrapper" class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-user-injured ml-1 text-pink-600"></i>
                                            الأطراف / الجزء المتضرر من جسم المصاب
                                        </label>
                                        <input type="text" id="investigation-injured-part" class="form-input"
                                            list="investigation-body-parts-datalist"
                                            value="${Utils.escapeHTML(injuredPartInit && injuredPartInit !== 'غير محدد' ? injuredPartInit : '')}"
                                            placeholder="اختر أو اكتب الجزء المتضرر (مثل: اليد، الرأس، الساق...)">
                                        <datalist id="investigation-body-parts-datalist">
                                            ${bodyPartsDatalist}
                                        </datalist>
                                    </div>

                                    <div id="investigation-equipment-cause-wrapper" class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-cogs ml-1 text-pink-600"></i>
                                            المعدة المتسببة في الإصابة
                                        </label>
                                        <input type="text" id="investigation-equipment-cause" class="form-input"
                                            value="${Utils.escapeHTML(equipmentCauseInit && equipmentCauseInit !== 'غير محدد' ? equipmentCauseInit : '')}"
                                            placeholder="اسم أو وصف المعدة / الآلة / الأداة المتسببة">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 5) الجزء الخاص بالمحقق -->
                        <div class="investigation-section section-5">
                            <h3>
                                <i class="fas fa-user-shield"></i>
                                <span>5) الجزء الخاص بالمحقق</span>
                            </h3>
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">سلوك غير آمن</label>
                                        <select id="investigation-unsafe-behavior" class="form-input">
                                            <option value="">اختر</option>
                                            <option value="yes" ${investigationData.unsafeBehavior === 'yes' ? 'selected' : ''}>نعم</option>
                                            <option value="no" ${investigationData.unsafeBehavior === 'no' ? 'selected' : ''}>لا</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">وضع غير آمن</label>
                                        <select id="investigation-unsafe-condition" class="form-input">
                                            <option value="">اختر</option>
                                            <option value="yes" ${investigationData.unsafeCondition === 'yes' ? 'selected' : ''}>نعم</option>
                                            <option value="no" ${investigationData.unsafeCondition === 'no' ? 'selected' : ''}>لا</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <!-- مصفوفة تقييم المخاطر التفاعلية -->
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                                        <i class="fas fa-th ml-2 text-teal-600"></i>
                                        مصفوفة تقييم المخاطر - اضغط على الخلية لتحديد مستوى الخطر
                                    </label>
                                    <div class="bg-white rounded-lg p-4 border-2 border-teal-300">
                                        <div id="investigation-risk-matrix">
                                            ${typeof RiskMatrix !== 'undefined' ? RiskMatrix.generate('investigation-risk-matrix', {
                                                selectedLikelihood: investigationData.riskProbability ? parseInt(investigationData.riskProbability) : null,
                                                selectedConsequence: investigationData.riskSeverity ? parseInt(investigationData.riskSeverity) : null,
                                                interactive: true
                                            }) : `
                                                <div class="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                                    <i class="fas fa-exclamation-triangle text-4xl text-gray-400 mb-3"></i>
                                                    <p class="text-gray-600 font-semibold mb-2">مصفوفة تقييم المخاطر غير متاحة حالياً</p>
                                                    <p class="text-sm text-gray-500">يرجى التأكد من تحميل مكون RiskMatrix</p>
                                                </div>
                                            `}
                                        </div>
                                        
                                        <!-- حقول مخفية لحفظ القيم المختارة -->
                                        <input type="hidden" id="investigation-risk-probability" value="${investigationData.riskProbability || ''}">
                                        <input type="hidden" id="investigation-risk-severity" value="${investigationData.riskSeverity || ''}">
                                        <input type="hidden" id="investigation-risk-level" value="${investigationData.riskLevel || ''}">
                                    </div>
                                    
                                    ${investigationData.riskProbability && investigationData.riskSeverity ? `
                                        <script>
                                            (function() {
                                                const probability = ${investigationData.riskProbability ? parseInt(investigationData.riskProbability) : 'null'};
                                                const severity = ${investigationData.riskSeverity ? parseInt(investigationData.riskSeverity) : 'null'};
                                                setTimeout(() => {
                                                    if (typeof RiskMatrix !== 'undefined') {
                                                        const matrixContainer = document.getElementById('investigation-risk-matrix');
                                                        if (matrixContainer) {
                                                            const cells = matrixContainer.querySelectorAll('.risk-cell');
                                                            cells.forEach(cell => {
                                                                const cellLikelihood = parseInt(cell.getAttribute('data-likelihood'));
                                                                const cellConsequence = parseInt(cell.getAttribute('data-consequence'));
                                                                if (probability !== null && severity !== null &&
                                                                    cellLikelihood === probability && 
                                                                    cellConsequence === severity) {
                                                                    cell.classList.add('selected');
                                                                }
                                                            });
                                                        }
                                                    }
                                                }, 100);
                                            })();
                                        </script>
                                    ` : ''}
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-chart-line ml-2 text-teal-600"></i>
                                        نتيجة التقييم (يتم التحديث تلقائياً)
                                    </label>
                                    <input type="text" id="investigation-risk-result" class="form-input" 
                                        value="${investigationData.riskResult || ''}" 
                                        readonly style="background-color: #f0fdfa; border-color: #14b8a6; font-weight: 600; font-size: 1.1rem; text-align: center;">
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-comment-alt ml-2 text-teal-600"></i>
                                        شرح الخطر (يتم التحديث تلقائياً)
                                    </label>
                                    <textarea id="investigation-risk-explanation" class="form-input" rows="6" 
                                        placeholder="سيتم ملء هذا الحقل تلقائياً عند اختيار خلية من المصفوفة..."
                                        style="background-color: #f0fdfa; border-color: #14b8a6;">${Utils.escapeHTML(investigationData.riskExplanation || '')}</textarea>
                                    <p class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-info-circle ml-1"></i>
                                        يمكنك تعديل الشرح بعد التحديث التلقائي لإضافة ملاحظات إضافية
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- 5.5) تحليل السبب الجذري -->
                        <div class="investigation-section section-rca">
                            <h3>
                                <i class="fas fa-microscope"></i>
                                <span>5.5) تحليل السبب الجذري (RCA)</span>
                            </h3>
                            ${canEdit ? `
                            <div class="mb-4 p-4 rounded-lg border-2 border-indigo-200 bg-gradient-to-l from-indigo-50 to-purple-50" style="border-color:#a5b4fc;">
                                <div class="flex flex-wrap items-center justify-between gap-3">
                                    <div class="flex-1 min-w-[200px]">
                                        <p class="text-sm font-semibold text-indigo-900 mb-1">
                                            <i class="fas fa-robot ml-2 text-indigo-600"></i>
                                            اقتراح تحليل ذكي (Gemini)
                                        </p>
                                        <p class="text-xs text-indigo-700">
                                            <i class="fas fa-info-circle ml-1"></i>
                                            اقتراحات للمراجعة — ليست بديلاً عن التحقيق البشري. املأ الأقسام 1–4 ثم اضغط الزر.
                                        </p>
                                    </div>
                                    <button type="button" class="btn-primary" onclick="Incidents.suggestInvestigationWithAI('${incidentId}')"
                                        style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border:none;padding:10px 20px;white-space:nowrap;">
                                        <i class="fas fa-magic ml-2"></i>
                                        اقتراح تحليل ذكي
                                    </button>
                                </div>
                            </div>
                            ` : ''}
                            <div id="investigation-rca-wizard" class="bg-white p-4 rounded-lg border-2" style="border-color:#c4b5fd;"></div>
                        </div>

                        <!-- 6) خطة العمل -->
                        <div class="investigation-section section-6">
                            <h3>
                                <i class="fas fa-clipboard-list"></i>
                                <span>6) خطة العمل</span>
                            </h3>
                            <div class="bg-white p-4 rounded-lg border-2 border-green-300" style="width: 100%; box-sizing: border-box;">
                                <div class="table-wrapper" style="width: 100%; overflow-x: auto; overflow-y: visible; box-sizing: border-box;">
                                    <table class="data-table" style="width: 100%; border-collapse: collapse; table-layout: fixed; min-width: 100%;">
                                        <thead>
                                            <tr style="background: linear-gradient(135deg, #388E3C 0%, #4CAF50 100%); color: white;">
                                                <th style="padding: 14px; width: 35%; text-align: right; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-tasks ml-2"></i>
                                                    الإجراء التصحيحي
                                                </th>
                                                <th style="padding: 14px; width: 15%; text-align: center; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-calendar-alt ml-2"></i>
                                                    التاريخ المخطط
                                                </th>
                                                <th style="padding: 14px; width: 25%; text-align: center; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-user-check ml-2"></i>
                                                    مسئول التنفيذ
                                                </th>
                                                <th style="padding: 14px; width: 25%; text-align: center; border: 1px solid #2E7D32; box-sizing: border-box;">
                                                    <i class="fas fa-user-clock ml-2"></i>
                                                    المتابعة
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="investigation-action-plan-body" style="background: #f9fff9; width: 100%;">
                                            ${actionPlanRows}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="mt-4 text-center" style="width: 100%; box-sizing: border-box;">
                                    <button type="button" class="btn-secondary" onclick="Incidents.addInvestigationActionPlanRow()" style="padding: 10px 24px; background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%); color: white; border: none; cursor: pointer;">
                                        <i class="fas fa-plus ml-2"></i>
                                        إضافة إجراء جديد
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- 7) التوقيعات -->
                        <div class="investigation-section section-7">
                            <h3>
                                <i class="fas fa-signature"></i>
                                <span>7) التوقيعات</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">مسئول المنطقة</label>
                                    <input type="text" id="investigation-signature-area-manager" class="form-input mb-2" 
                                        value="${Utils.escapeHTML(investigationData.signatureAreaManager?.name || '')}" 
                                        placeholder="الاسم">
                                    <input type="date" id="investigation-signature-area-manager-date" class="form-input mb-2" 
                                        value="${investigationData.signatureAreaManager?.date || ''}">
                                    <div class="border border-gray-300 rounded p-2" style="min-height: 60px; background: #f9fafb;">
                                        ${investigationData.signatureAreaManager?.signature ?
                    `<img src="${investigationData.signatureAreaManager.signature}" alt="توقيع" style="max-height: 50px;">` :
                    '<span class="text-gray-400 text-sm">التوقيع</span>'}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">مسئول السلامة والصحة</label>
                                    <input type="text" id="investigation-signature-safety-manager" class="form-input mb-2" 
                                        value="${Utils.escapeHTML(investigationData.signatureSafetyManager?.name || '')}" 
                                        placeholder="الاسم">
                                    <input type="date" id="investigation-signature-safety-manager-date" class="form-input mb-2" 
                                        value="${investigationData.signatureSafetyManager?.date || ''}">
                                    <div class="border border-gray-300 rounded p-2" style="min-height: 60px; background: #f9fafb;">
                                        ${investigationData.signatureSafetyManager?.signature ?
                    `<img src="${investigationData.signatureSafetyManager.signature}" alt="توقيع" style="max-height: 50px;">` :
                    '<span class="text-gray-400 text-sm">التوقيع</span>'}
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">مدير السلامة والصحة</label>
                                    <input type="text" id="investigation-signature-safety-director" class="form-input mb-2" 
                                        value="${Utils.escapeHTML(investigationData.signatureSafetyDirector?.name || '')}" 
                                        placeholder="الاسم">
                                    <input type="date" id="investigation-signature-safety-director-date" class="form-input mb-2" 
                                        value="${investigationData.signatureSafetyDirector?.date || ''}">
                                    <div class="border border-gray-300 rounded p-2" style="min-height: 60px; background: #f9fafb;">
                                        ${investigationData.signatureSafetyDirector?.signature ?
                    `<img src="${investigationData.signatureSafetyDirector.signature}" alt="توقيع" style="max-height: 50px;">` :
                    '<span class="text-gray-400 text-sm">التوقيع</span>'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-end gap-4 pt-4 form-actions-centered">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                                إغلاق
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.printInvestigation('${incidentId}')" title="طباعة التحقيق">
                                <i class="fas fa-print ml-2"></i>
                                طباعة
                            </button>
                            <button type="button" class="btn-secondary" onclick="Incidents.exportInvestigationPDF('${incidentId}')" title="تصدير PDF">
                                <i class="fas fa-file-pdf ml-2"></i>
                                تصدير PDF
                            </button>
                            <button type="submit" class="btn-primary" id="investigation-submit-btn">
                                <i class="fas fa-save ml-2"></i>
                                ${isEdit ? 'حفظ التعديلات' : 'حفظ التحقيق'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

            document.body.appendChild(modal);
            Utils.safeLog('✅ Investigation modal added to DOM');

            // التأكد من ظهور النموذج
            requestAnimationFrame(() => {
                modal.style.display = 'flex';
                modal.style.opacity = '1';
                Utils.safeLog('✅ Investigation modal displayed');
            });

            // Setup event listeners
            setTimeout(() => {
                try {
                    Utils.safeLog('🔧 Setting up investigation form listeners...');
                    this.setupInvestigationFormListeners(modal, incidentId, canEdit);
                    this.loadInvestigationFormData(incident);
                    Utils.safeLog('✅ Investigation form setup complete');
                } catch (error) {
                    Utils.safeError('خطأ في إعداد نموذج التحقيق:', error);
                    Notification.error('حدث خطأ في تحميل النموذج: ' + error.message);
                }
            }, 100);

            // إضافة event listener لإغلاق النموذج عند النقر خارج المحتوى
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    const ok = confirm('تنبيه: سيتم إغلاق النموذج.\nقد تفقد أي بيانات غير محفوظة.\n\nهل تريد الإغلاق؟');
                    if (ok) modal.remove();
                }
            });

        } catch (error) {
            Utils.safeError('خطأ في فتح نموذج التحقيق:', error);
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    // عرض قائمة لاختيار حادث للتحقيق
    showInvestigationFormSelector() {
        try {
            const incidents = AppState.appData?.incidents || [];

            if (incidents.length === 0) {
                Notification.warning('لا توجد حوادث متاحة. يرجى تسجيل حادث أولاً.');
                return;
            }

            const modal = document.createElement('div');
            modal.className = 'modal-overlay incident-professional-modal incident-modal-selector';
            modal.style.cssText = 'display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 10000; align-items: center; justify-content: center;';

            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <i class="fas fa-search ml-2"></i>
                            اختر حادث للتحقيق
                        </h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-4">
                            <input 
                                type="text" 
                                id="investigation-incident-search" 
                                class="form-input" 
                                placeholder="ابحث عن حادث بالعنوان أو الكود..."
                            >
                        </div>
                        <div class="table-wrapper" style="max-height: 400px; overflow-y: auto;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>الكود</th>
                                        <th>العنوان</th>
                                        <th>التاريخ</th>
                                        <th>الحالة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody id="investigation-incidents-list">
                                    ${incidents.map(incident => `
                                        <tr data-incident-id="${incident.id}">
                                            <td>${Utils.escapeHTML(incident.isoCode || incident.id || '')}</td>
                                            <td>${Utils.escapeHTML(incident.title || 'بدون عنوان')}</td>
                                            <td>${incident.date ? new Date(incident.date).toLocaleDateString('ar-SA') : ''}</td>
                                            <td>
                                                <span class="badge badge-${incident.status === 'مغلق' ? 'success' : incident.status === 'قيد التحقيق' ? 'warning' : 'info'}">
                                                    ${Utils.escapeHTML(incident.status || 'مفتوح')}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    class="btn-primary btn-sm" 
                                                    onclick="if(typeof Incidents !== 'undefined' && typeof Incidents.showInvestigationForm === 'function') { 
                                                        Incidents.showInvestigationForm('${incident.id}'); 
                                                        this.closest('.modal-overlay').remove(); 
                                                    } else { 
                                                        alert('نموذج التحقيق غير متاح'); 
                                                    }"
                                                >
                                                    <i class="fas fa-search ml-1"></i>
                                                    التحقيق
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        ${incidents.length === 0 ? '<p class="text-center text-gray-500 py-4">لا توجد حوادث متاحة</p>' : ''}
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // إضافة البحث
            const searchInput = modal.querySelector('#investigation-incident-search');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const rows = modal.querySelectorAll('#investigation-incidents-list tr');
                    rows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(searchTerm) ? '' : 'none';
                    });
                });
            }

            // إغلاق عند النقر خارج المحتوى
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

        } catch (error) {
            Utils.safeError('خطأ في عرض قائمة الحوادث:', error);
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    _formatInvestigationIncidentTypesLabel(types) {
        const map = {
            nearmiss: 'حادث وشيك',
            property: 'تلف ممتلكات',
            'injury-no-lost': 'إصابة بدون فقد أيام عمل',
            'injury-lost': 'إصابة مع فقد أيام عمل',
            fatality: 'وفاة'
        };
        return (types || []).map((t) => map[t] || t).join('، ');
    },

    _mergeIncidentWithInvestigationData(incident) {
        if (!incident) return incident;
        let inv = incident.investigation;
        if (typeof inv === 'string') {
            try { inv = JSON.parse(inv); } catch (_e) { inv = null; }
        }
        if (!inv || typeof inv !== 'object') return incident;

        if (inv.affectedName) incident.affectedName = inv.affectedName;
        if (inv.affectedJob) incident.affectedJobTitle = inv.affectedJob;
        if (inv.affectedDepartment) incident.affectedDepartment = inv.affectedDepartment;
        if (inv.affectedEmployeeCode) incident.affectedCode = inv.affectedEmployeeCode;
        if (inv.affectedAffiliation === 'contractor') incident.affectedType = 'contractor';
        else if (inv.affectedAffiliation === 'company') incident.affectedType = incident.affectedType || 'employee';
        if (Array.isArray(inv.actionPlan) && inv.actionPlan.length) incident.actionPlan = inv.actionPlan;
        if (Array.isArray(inv.incidentTypes) && inv.incidentTypes.length) {
            incident.incidentType = this._formatInvestigationIncidentTypesLabel(inv.incidentTypes);
        }
        return incident;
    },

    _applyInvestigationToIncident(incident, inv) {
        if (!incident || !inv) return;
        if (inv.affectedName) incident.affectedName = inv.affectedName;
        if (inv.affectedJob) incident.affectedJobTitle = inv.affectedJob;
        if (inv.affectedDepartment) incident.affectedDepartment = inv.affectedDepartment;
        if (inv.affectedEmployeeCode) incident.affectedCode = inv.affectedEmployeeCode;
        if (inv.affectedAffiliation === 'contractor') incident.affectedType = 'contractor';
        else if (inv.affectedAffiliation === 'company') incident.affectedType = incident.affectedType || 'employee';

        if (Array.isArray(inv.incidentTypes) && inv.incidentTypes.length) {
            incident.incidentType = this._formatInvestigationIncidentTypesLabel(inv.incidentTypes);
        }
        if (Array.isArray(inv.actionPlan)) {
            incident.actionPlan = inv.actionPlan.map((action) => ({
                correctiveAction: action.correctiveAction || '',
                plannedDate: action.plannedDate || '',
                responsibleName: action.responsibleName || '',
                responsibleDepartment: action.responsibleDepartment || '',
                responsibleDate: action.responsibleDate || '',
                followUpName: action.followUpName || '',
                followUpDepartment: action.followUpDepartment || '',
                followUpDate: action.followUpDate || ''
            }));
        }
        if (inv.factoryId) {
            incident.siteId = inv.factoryId;
            if (inv.factoryName) incident.siteName = inv.factoryName;
        }
        if (inv.locationId) {
            incident.sublocationId = inv.locationId;
            if (inv.locationName) incident.sublocationName = inv.locationName;
        }
        if (inv.description) incident.description = inv.description;
        if (inv.injuredPart) incident.injuredPart = inv.injuredPart;
        if (inv.equipmentCause) incident.equipmentCause = inv.equipmentCause;
    },

    _closeInvestigationModal() {
        document.querySelectorAll('.modal-overlay').forEach((overlay) => {
            if (overlay.querySelector('#investigation-form')) overlay.remove();
        });
    },

    async _refreshIncidentsViewsAfterUpdate(incidentId) {
        this.lastRenderedSignature = null;

        const tab = this.currentTab || 'incidents-list';
        const contentContainer = document.getElementById('incidents-tab-content');

        if (tab === 'incidents-list') {
            await this.loadIncidentsList();
        } else if (contentContainer) {
            contentContainer.innerHTML = await this.renderTabContent(tab);
            this.applyModuleI18n(contentContainer);
            this.setupTabEventListeners(tab);
        }

        if (this.currentEditId === incidentId) {
            const incident = AppState.appData.incidents.find((i) => i.id === incidentId);
            if (incident) {
                this._mergeIncidentWithInvestigationData(incident);
                this._syncIncidentFormFromData(incident);
            }
        }

        if (typeof Dashboard !== 'undefined' && Dashboard.refreshIncidents) {
            Dashboard.refreshIncidents();
        }
    },

    _syncIncidentFormFromData(incident) {
        if (!incident || !document.getElementById('incident-form')) return;
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el && val != null && val !== '') el.value = val;
        };
        set('incident-affected-name', incident.affectedName);
        set('incident-affected-job', incident.affectedJobTitle);
        set('incident-affected-department', incident.affectedDepartment);
        set('incident-affected-code', incident.affectedCode);
        if (Array.isArray(incident.actionPlan) && incident.actionPlan.length) {
            this.populateActionPlanRows(incident.actionPlan);
        }
    },

    _buildInvestigationActionPlanRowHtml(action = {}, rowIndex = 0) {
        const cellStyle = 'padding: 12px; border: 1px solid #c8e6c9; vertical-align: top; box-sizing: border-box;';
        const inputStyle = 'width: 100%; border: 2px solid #4CAF50; border-radius: 6px; padding: 8px; box-sizing: border-box; display: block;';
        return `
            <tr data-action-row="${rowIndex}" style="border-bottom: 1px solid #c8e6c9;">
                <td style="${cellStyle}">
                    <textarea class="form-input inv-ap-corrective" rows="3" placeholder="اكتب الإجراء التصحيحي هنا..." style="${inputStyle} resize: vertical; min-height: 80px;">${Utils.escapeHTML(action.correctiveAction || '')}</textarea>
                </td>
                <td style="${cellStyle} text-align: center;">
                    <input type="date" class="form-input inv-ap-planned-date" value="${action.plannedDate || ''}" style="${inputStyle} text-align: center;">
                </td>
                <td style="${cellStyle}">
                    <input type="text" class="form-input inv-ap-responsible-name" placeholder="ابحث عن مسئول التنفيذ" value="${Utils.escapeHTML(action.responsibleName || '')}" autocomplete="off" style="${inputStyle} margin-bottom: 8px;">
                    <input type="text" class="form-input inv-ap-responsible-dept" placeholder="الإدارة / القسم" value="${Utils.escapeHTML(action.responsibleDepartment || '')}" readonly style="${inputStyle} margin-bottom: 8px; background: #f3f4f6;">
                    <input type="date" class="form-input inv-ap-responsible-date" value="${action.responsibleDate || ''}" style="${inputStyle}">
                </td>
                <td style="${cellStyle}">
                    <input type="text" class="form-input inv-ap-follow-name" placeholder="ابحث عن المتابع" value="${Utils.escapeHTML(action.followUpName || '')}" autocomplete="off" style="${inputStyle} margin-bottom: 8px;">
                    <input type="text" class="form-input inv-ap-follow-dept" placeholder="الإدارة / القسم" value="${Utils.escapeHTML(action.followUpDepartment || '')}" readonly style="${inputStyle} margin-bottom: 8px; background: #f3f4f6;">
                    <input type="date" class="form-input inv-ap-follow-date" value="${action.followUpDate || ''}" style="${inputStyle}">
                </td>
            </tr>
        `;
    },

    setupInvestigationActionPlanRowPickers(row) {
        if (!row || typeof EmployeeHelper === 'undefined') return;
        const respName = row.querySelector('.inv-ap-responsible-name');
        const respDept = row.querySelector('.inv-ap-responsible-dept');
        const followName = row.querySelector('.inv-ap-follow-name');
        const followDept = row.querySelector('.inv-ap-follow-dept');

        if (respName && !respName.dataset.pickerBound) {
            respName.dataset.pickerBound = '1';
            EmployeeHelper.setupAutocomplete(respName, (employee) => {
                if (!employee || !respDept) return;
                respDept.value = employee.department || employee.dept || employee.section || employee.departmentName || '';
            });
        }
        if (followName && !followName.dataset.pickerBound) {
            followName.dataset.pickerBound = '1';
            EmployeeHelper.setupAutocomplete(followName, (employee) => {
                if (!employee || !followDept) return;
                followDept.value = employee.department || employee.dept || employee.section || employee.departmentName || '';
            });
        }
    },

    bindInvestigationActionPlanPickers(modalOrRoot) {
        const root = modalOrRoot || document;
        root.querySelectorAll('#investigation-action-plan-body tr').forEach((row) => {
            this.setupInvestigationActionPlanRowPickers(row);
        });
    },

    _populateInvestigationFormFields(modalEl, incident, investigation) {
        if (!modalEl) return;
        const inv = investigation || {};
        const setVal = (sel, val) => {
            const el = modalEl.querySelector(sel);
            if (el && val != null && val !== '') el.value = val;
        };
        const setCheck = (sel, checked) => {
            const el = modalEl.querySelector(sel);
            if (el) el.checked = !!checked;
        };

        const types = Array.isArray(inv.incidentTypes) ? inv.incidentTypes : [];
        setCheck('#incident-type-nearmiss', types.includes('nearmiss'));
        setCheck('#incident-type-property', types.includes('property'));
        setCheck('#incident-type-injury-no-lost', types.includes('injury-no-lost'));
        setCheck('#incident-type-injury-lost', types.includes('injury-lost'));
        setCheck('#incident-type-fatality', types.includes('fatality'));

        setVal('#investigation-description', inv.description || incident?.description);
        setVal('#investigation-nearmiss-description', inv.nearmissDescription);

        const nearMissCheckbox = modalEl.querySelector('#incident-type-nearmiss');
        const nearMissWrapper = modalEl.querySelector('#nearmiss-description-wrapper');
        if (nearMissWrapper) {
            nearMissWrapper.style.display = nearMissCheckbox?.checked ? 'block' : 'none';
        }

        setVal('#investigation-unsafe-behavior', inv.unsafeBehavior);
        setVal('#investigation-unsafe-condition', inv.unsafeCondition);
        if (inv.riskProbability != null) setVal('#investigation-risk-probability', inv.riskProbability);
        if (inv.riskSeverity != null) setVal('#investigation-risk-severity', inv.riskSeverity);
        setVal('#investigation-risk-level', inv.riskLevel);
        setVal('#investigation-risk-result', inv.riskResult);
        setVal('#investigation-risk-explanation', inv.riskExplanation);

        setVal('#investigation-signature-area-manager', inv.signatureAreaManager?.name);
        setVal('#investigation-signature-area-manager-date', inv.signatureAreaManager?.date);
        setVal('#investigation-signature-safety-manager', inv.signatureSafetyManager?.name);
        setVal('#investigation-signature-safety-manager-date', inv.signatureSafetyManager?.date);
        setVal('#investigation-signature-safety-director', inv.signatureSafetyDirector?.name);
        setVal('#investigation-signature-safety-director-date', inv.signatureSafetyDirector?.date);

        const injuredVal = inv.injuredPart || this.resolveIncidentInjuredPart(incident);
        setVal('#investigation-injured-part', injuredVal && injuredVal !== 'غير محدد' ? injuredVal : '');
        setVal('#investigation-equipment-cause', inv.equipmentCause || incident?.equipmentCause || '');

        const tbody = modalEl.querySelector('#investigation-action-plan-body');
        if (tbody) {
            tbody.innerHTML = this.renderInvestigationActionPlanRows(inv.actionPlan || []);
            this.bindInvestigationActionPlanPickers(modalEl);
        }
    },

    renderInvestigationActionPlanRows(actionPlan) {
        const rowCount = !actionPlan || actionPlan.length === 0 ? 3 : Math.max(3, actionPlan.length);
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            rows.push(this._buildInvestigationActionPlanRowHtml(actionPlan?.[i] || {}, i));
        }
        return rows.join('');
    },

    _formatIncidentPrintDate(dateStr) {
        if (!dateStr) return 'غير محدد';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return String(dateStr);
            return date.toLocaleString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return String(dateStr || 'غير محدد');
        }
    },

    _buildPrintSectionHeading(sectionNum, title, color, accentColor) {
        return `<div style="margin-bottom: 20px; font-weight: bold; font-size: 20px; color: ${color}; border-bottom: 3px solid ${accentColor}; padding-bottom: 10px;">${sectionNum}) ${Utils.escapeHTML(title)}</div>`;
    },

    _buildPrintDataTable(rows, headerBg = '#e3f2fd') {
        const filtered = (Array.isArray(rows) ? rows : []).filter(r =>
            r && r.label && r.value !== undefined && r.value !== null && String(r.value).trim() !== ''
        );
        if (!filtered.length) return '';
        return `<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            ${filtered.map(r => `
                <tr>
                    <th style="padding: 10px; border: 1px solid #ddd; background-color: ${headerBg}; text-align: right; width: 30%;">${Utils.escapeHTML(r.label)}</th>
                    <td style="padding: 10px; border: 1px solid #ddd; ${r.cellStyle || ''}">${r.html ? r.html : Utils.escapeHTML(String(r.value))}</td>
                </tr>
            `).join('')}
        </table>`;
    },

    _buildPrintTextPanel(text, bgColor = '#fff3e0', borderColor = '#FF9800') {
        return `<div style="padding: 15px; background-color: ${bgColor}; border: 2px solid ${borderColor}; border-radius: 8px; white-space: pre-wrap; line-height: 1.75;">${Utils.escapeHTML(text || 'غير محدد')}</div>`;
    },

    _collectIncidentExportImages(incident) {
            const images = [];
        const pushImage = (src) => {
            const normalized = String(src || '').trim();
            if (normalized && !images.includes(normalized)) images.push(normalized);
        };
        if (Array.isArray(incident?.attachments)) {
                incident.attachments.forEach(att => {
                if (images.length >= 2) return;
                if (!att) return;
                const isImage = att.type?.startsWith('image/') || att.name?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                if (!isImage) return;
                pushImage(att.directLink || att.shareableLink || att.cloudLink?.url || att.data || att.url || '');
            });
        }
        if (images.length < 2 && incident?.image) pushImage(incident.image);
        return images.slice(0, 2);
    },

    _buildIncidentReportImagesSection(images, sectionNum = '6') {
        if (!Array.isArray(images) || !images.length) return '';
        const imageContainerStyle = 'display: inline-block; width: 48%; max-width: 360px; margin: 1%; vertical-align: top; text-align: center;';
        const imageFrameStyle = 'width: 100%; height: 300px; border: 2px solid #1565C0; border-radius: 12px; padding: 8px; background: #f8fafc; box-shadow: 0 4px 12px rgba(15,23,42,0.08); display: flex; align-items: center; justify-content: center; overflow: hidden;';
                const imageStyle = 'max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;';
        return `
            <div style="margin-bottom: 30px;">
                ${this._buildPrintSectionHeading(sectionNum, 'الصور المرفقة', '#1565C0', '#2196F3')}
                <div style="text-align: center; margin: 10px 0; direction: rtl; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">
                    ${images.map((img, idx) => `
                            <div style="${imageContainerStyle}">
                                <div style="${imageFrameStyle}">
                                <img src="${this.convertGoogleDriveLinkToPrintable(img)}" alt="صورة ${idx + 1}" style="${imageStyle}" onerror="this.parentElement.innerHTML='<div style=\\'color:#94a3b8;font-size:14px;\\'>تعذر تحميل الصورة</div>';">
                                </div>
                            <div style="margin-top: 10px; font-size: 13px; color: #475569; font-weight: 600;">صورة ${idx + 1}</div>
                            </div>
                        `).join('')}
                </div>
                    </div>
                `;
    },

    _buildIncidentReportActionPlanSection(actionPlan, sectionNum = '5') {
        if (!Array.isArray(actionPlan) || !actionPlan.length) return '';
        const statusLabel = (status) => {
            if (status === 'completed') return 'تم الإنجاز';
            if (status === 'in_progress') return 'تحت التنفيذ';
            return 'جارٍ';
        };
        const actionRows = actionPlan.map(action => `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(action.actionType === 'corrective' ? 'إجراء تصحيحي' : action.actionType === 'preventive' ? 'إجراء وقائي' : (action.actionType || 'إجراء'))}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${Utils.escapeHTML(action.description || action.correctiveAction || '')}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${Utils.escapeHTML(action.owner || action.responsibleName || '')}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${action.dueDate || action.plannedDate ? this._formatIncidentPrintDate(action.dueDate || action.plannedDate) : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${action.closedDate ? this._formatIncidentPrintDate(action.closedDate) : ''}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${Utils.escapeHTML(statusLabel(action.status))}</td>
                    </tr>
                `).join('');
        return `
            <div style="margin-bottom: 30px;">
                ${this._buildPrintSectionHeading(sectionNum, 'خطة الإجراءات التصحيحية والوقائية', '#2E7D32', '#4CAF50')}
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                        <thead>
                        <tr style="background: linear-gradient(135deg, #388E3C 0%, #4CAF50 100%); color: white;">
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: right;">نوع الإجراء</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: right;">وصف الإجراء</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">المسؤول</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">تاريخ الاستحقاق</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">تاريخ الإغلاق</th>
                            <th style="padding: 12px; border: 1px solid #2E7D32; text-align: center;">الحالة</th>
                            </tr>
                        </thead>
                    <tbody>${actionRows}</tbody>
                    </table>
            </div>
        `;
    },

    _parseIncidentInvestigationSummary(incident) {
        if (!incident?.investigation) return null;

        if (typeof incident.investigation === 'object') {
            return incident.investigation;
        }

        const raw = String(incident.investigation).trim();
        if (!raw) return null;

        if (raw.startsWith('{') || raw.startsWith('[')) {
            try {
                return JSON.parse(raw);
            } catch (_e) { /* fall through */ }
        }

        return this._parseInvestigationSummaryText(raw);
    },

    _parseInvestigationSummaryText(text) {
        const inv = { description: '' };
        const labelMap = {
            'رقم التحقيق': 'investigationNumber',
            'تاريخ التحقيق': 'investigationDateTime',
            'تاريخ الحادث': 'incidentDateTime',
            'المصنع': 'factoryName',
            'الموقع': 'locationName',
            'التبعية': 'affectedAffiliation',
            'اسم المصاب': 'affectedName',
            'الوظيفة': 'affectedJob',
            'الإدارة': 'affectedDepartment',
            'مستوى الخطورة': 'riskLevel',
            'نتيجة التقييم': 'riskResult',
            'الوصف': 'description',
            'منهجية التحقيق': '_rcaMethodLabel',
            'منهجية RCA': '_rcaMethodLabel',
            'السبب الجذري': '_rcaRootSummary'
        };

        String(text).split('\n').forEach((line) => {
            const idx = line.indexOf(':');
            if (idx < 0) return;
            const label = line.slice(0, idx).trim();
            const value = line.slice(idx + 1).trim();
            if (!value) return;
            const key = labelMap[label];
            if (key === '_rcaMethodLabel') {
                if (!inv.rca) inv.rca = {};
                inv.rca.methodLabel = value;
            } else if (key === '_rcaRootSummary') {
                if (!inv.rca) inv.rca = {};
                inv.rca.rootCauseSummary = value;
            } else if (key) {
                inv[key] = value;
            }
        });

        if (inv.rca && typeof InvestigationRCA !== 'undefined') {
            inv.rca = InvestigationRCA.normalizeRcaForExport(inv.rca);
        }

        return Object.keys(inv).length ? inv : null;
    },

    _buildInvestigationRcaPrintSection(investigationData, incident, esc, opts = {}) {
        if (typeof InvestigationRCA === 'undefined') return '';

        const normalized = InvestigationRCA.normalizeRcaForExport(investigationData?.rca);
        if (normalized?.method) {
            return InvestigationRCA.buildPrintSection(normalized, { includeStyles: opts.includeRcaStyles === true });
        }

        if (investigationData?.rootCauseSummary || incident?.rootCause) {
            return `
                <div class="inv-print-section rca-print-section inv-s-rca" style="background:linear-gradient(135deg,#f5f3ff 0%,#fff 100%);border:2px solid #7c3aed;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
                    <h3 style="color:#5b21b6;border-color:#7c3aed;font-size:18px;font-weight:700;margin:0 0 14px;padding-bottom:10px;border-bottom:3px solid #7c3aed;">5.5) تحليل السبب الجذري</h3>
                    <div class="rca-root-box" style="padding:16px 18px;border-radius:10px;border:2px solid #10b981;background:linear-gradient(135deg,#ecfdf5,#d1fae5);">
                        <div style="font-weight:800;color:#047857;margin-bottom:8px;">السبب الجذري</div>
                        <div style="white-space:pre-wrap;line-height:1.75;">${esc(investigationData.rootCauseSummary || incident.rootCause)}</div>
                    </div>
                </div>`;
        }

        return '';
    },

    _getInvestigationMethodologyMeta(investigationData) {
        if (typeof InvestigationRCA === 'undefined') {
            return { label: '—', reference: '', hasMethod: false };
        }
        const normalized = InvestigationRCA.normalizeRcaForExport(investigationData?.rca);
        if (!normalized?.method) {
            return { label: '—', reference: '', hasMethod: false };
        }
        const methodDef = InvestigationRCA.METHODS[normalized.method];
        return {
            label: normalized.methodLabel || methodDef?.label || normalized.method,
            reference: methodDef?.reference || '',
            hasMethod: true
        };
    },

    _findRegistryEntryForIncident(incidentId) {
        if (!incidentId) return null;
        return (this.registryData || []).find(r => r.incidentId === incidentId) || null;
    },

    _formatIncidentPrintDateOnly(dateStr) {
        if (!dateStr) return '—';
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return String(dateStr);
            return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {
            return String(dateStr);
        }
    },

    _buildIncidentPrintBadge(text, bg, color) {
        if (!text) return '—';
        return `<span style="display:inline-block;padding:4px 14px;border-radius:999px;background:${bg};color:${color};font-weight:700;font-size:13px;">${Utils.escapeHTML(String(text))}</span>`;
    },

    _hasInvestigationExportData(investigationData) {
        if (!investigationData) return false;
        return !!(
            investigationData.investigationNumber ||
            investigationData.description ||
            investigationData.rca?.method ||
            investigationData.rootCauseSummary ||
            (Array.isArray(investigationData.actionPlan) && investigationData.actionPlan.length) ||
            investigationData.riskResult ||
            investigationData.riskLevel
        );
    },

    _buildIncidentReportRegistrySection(registryEntry, sectionNum = '5') {
        if (!registryEntry) return '';
        const esc = (v) => Utils.escapeHTML(String(v ?? '—'));
        return this._buildInvestigationFormPrintSection('inv-s7', sectionNum, 'بيانات سجل الحوادث', `
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField('المسلسل', esc(registryEntry.sequentialNumber), '#FFC107', true)}
                ${this._buildInvestigationFormPrintField('المصنع', esc(registryEntry.factory), '#FFC107')}
                ${this._buildInvestigationFormPrintField('مكان الحادث', esc(registryEntry.incidentLocation), '#FFC107')}
                ${this._buildInvestigationFormPrintField('تاريخ الحادث', this._formatIncidentPrintDateOnly(registryEntry.incidentDate), '#FFC107')}
                ${this._buildInvestigationFormPrintField('يوم الحادث', esc(registryEntry.incidentDay), '#FFC107')}
                ${this._buildInvestigationFormPrintField('وقت الحادث', esc(registryEntry.incidentTime), '#FFC107')}
                ${this._buildInvestigationFormPrintField('الوردية', esc(registryEntry.shift), '#FFC107')}
                ${this._buildInvestigationFormPrintField('كود الموظف', esc(registryEntry.employeeCode), '#FFC107')}
                ${this._buildInvestigationFormPrintField('اسم الموظف', esc(registryEntry.employeeName), '#FFC107')}
                ${this._buildInvestigationFormPrintField('الوظيفة', esc(registryEntry.employeeJob), '#FFC107')}
                ${this._buildInvestigationFormPrintField('الإدارة / القسم', esc(registryEntry.employeeDepartment), '#FFC107')}
                ${this._buildInvestigationFormPrintField('الجزء المصاب', esc(registryEntry.injuredPart), '#FFC107')}
                ${this._buildInvestigationFormPrintField('المعدة المتسببة', esc(registryEntry.equipmentCause), '#FFC107')}
                ${this._buildInvestigationFormPrintField('بداية الإجازة', this._formatIncidentPrintDateOnly(registryEntry.leaveStartDate), '#FFC107')}
                ${this._buildInvestigationFormPrintField('العودة للعمل', this._formatIncidentPrintDateOnly(registryEntry.returnToWorkDate), '#FFC107')}
                ${this._buildInvestigationFormPrintField('أيام الإجازة', registryEntry.totalLeaveDays != null ? `${registryEntry.totalLeaveDays} يوم` : '—', '#FFC107')}
                ${this._buildInvestigationFormPrintField('حالة السجل', this._buildIncidentPrintBadge(registryEntry.status, '#e0e7ff', '#3730a3'), '#FFC107')}
            </div>
            ${registryEntry.incidentDetails ? `
            <div style="margin-top:14px;">
                <div class="inv-field-label">تفاصيل الحادث (السجل)</div>
                <div class="inv-text-panel" style="border-color:#FFC107;">${esc(registryEntry.incidentDetails)}</div>
            </div>` : ''}
        `);
    },

    buildRegistryEntryReportPrintContent(entry) {
        const esc = (v) => Utils.escapeHTML(String(v ?? ''));
        const section1 = this._buildInvestigationFormPrintSection('inv-s1', '1', 'بيانات السجل الأساسية', `
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField('المسلسل', esc(entry.sequentialNumber), '#2196F3', true)}
                ${this._buildInvestigationFormPrintField('نوع الحادث', esc(entry.incidentType), '#2196F3')}
                ${this._buildInvestigationFormPrintField('تاريخ الحادث', this._formatIncidentPrintDateOnly(entry.incidentDate), '#2196F3')}
                ${this._buildInvestigationFormPrintField('وقت الحادث', esc(entry.incidentTime), '#2196F3')}
                ${this._buildInvestigationFormPrintField('الوردية', esc(entry.shift), '#2196F3')}
                ${this._buildInvestigationFormPrintField('الحالة', this._buildIncidentPrintBadge(entry.status, '#e0e7ff', '#3730a3'), '#2196F3')}
            </div>
        `);
        const section2 = this._buildInvestigationFormPrintSection('inv-s2', '2', 'الموقع والموظف', `
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField('المصنع', esc(entry.factory), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('مكان الحادث', esc(entry.incidentLocation), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('كود الموظف', esc(entry.employeeCode), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('اسم الموظف', esc(entry.employeeName), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('الوظيفة', esc(entry.employeeJob), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('الإدارة / القسم', esc(entry.employeeDepartment), '#9C27B0')}
            </div>
        `);
        const section3 = this._buildInvestigationFormPrintSection('inv-s4', '3', 'الإصابة والإجازة', `
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField('الجزء المصاب', esc(entry.injuredPart), '#E91E63')}
                ${this._buildInvestigationFormPrintField('المعدة المتسببة', esc(entry.equipmentCause), '#E91E63')}
                ${this._buildInvestigationFormPrintField('بداية الإجازة', this._formatIncidentPrintDateOnly(entry.leaveStartDate), '#E91E63')}
                ${this._buildInvestigationFormPrintField('العودة للعمل', this._formatIncidentPrintDateOnly(entry.returnToWorkDate), '#E91E63')}
                ${this._buildInvestigationFormPrintField('إجمالي أيام الإجازة', entry.totalLeaveDays != null ? `${entry.totalLeaveDays} يوم` : '—', '#E91E63')}
            </div>
        `);
        const section4 = this._buildInvestigationFormPrintSection('inv-s3', '4', 'تفاصيل الحادث', `
            <div class="inv-text-panel" style="border-color:#FF9800;">${esc(entry.incidentDetails || '—')}</div>
            ${entry.injuryDescription ? `
            <div style="margin-top:14px;">
                <div class="inv-field-label">وصف الإصابة</div>
                <div class="inv-text-panel" style="border-color:#E91E63;">${esc(entry.injuryDescription)}</div>
            </div>` : ''}
            ${entry.actionsTaken ? `
            <div style="margin-top:14px;">
                <div class="inv-field-label">الإجراءات المتخذة</div>
                <div class="inv-text-panel" style="border-color:#009688;">${esc(entry.actionsTaken)}</div>
            </div>` : ''}
        `);
        return `
            ${this._getInvestigationFormPrintStyles()}
            <div class="inv-print-wrap">
                ${section1}
                ${section2}
                ${section3}
                ${section4}
            </div>
        `;
    },

    buildIncidentReportPrintContent(incident, opts = {}) {
        const esc = (v) => Utils.escapeHTML(String(v ?? ''));
        const registryEntry = this._findRegistryEntryForIncident(incident.id);
        const injuredPart = this.resolveIncidentInjuredPart(incident);
        const locationLabel = [
            incident.siteName || incident.factory || registryEntry?.factory,
            incident.sublocationName || incident.sublocation || registryEntry?.incidentLocation,
            incident.location
        ].filter(v => v && String(v).trim()).join(' — ') || 'غير محدد';

        const severityBadge = this._buildIncidentPrintBadge(incident.severity, '#fee2e2', '#991b1b');
        const statusBadge = this._buildIncidentPrintBadge(incident.status, '#e0e7ff', '#3730a3');

        let sectionNum = 1;
        const nextNum = () => String(sectionNum++);

        const section1 = this._buildInvestigationFormPrintSection('inv-s1', nextNum(), 'بيانات الحادث الأساسية', `
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField('كود الحادث / ISO', esc(incident.isoCode || incident.id), '#2196F3', true)}
                ${this._buildInvestigationFormPrintField('رقم الإخطار', esc(incident.notificationNumber), '#2196F3')}
                ${this._buildInvestigationFormPrintField('عنوان التقرير', esc(incident.title), '#2196F3')}
                ${this._buildInvestigationFormPrintField('تاريخ ووقت الحادث', this._formatIncidentPrintDate(incident.date || incident.incidentDateTime), '#2196F3')}
                ${this._buildInvestigationFormPrintField('نوع الحادث', esc(incident.incidentType), '#2196F3')}
                ${this._buildInvestigationFormPrintField('درجة الشدة', severityBadge, '#2196F3')}
                ${this._buildInvestigationFormPrintField('حالة الحادث', statusBadge, '#2196F3')}
                ${this._buildInvestigationFormPrintField('تاريخ الإنشاء', this._formatIncidentPrintDate(incident.createdAt), '#2196F3')}
                ${this._buildInvestigationFormPrintField('آخر تحديث', this._formatIncidentPrintDate(incident.updatedAt), '#2196F3')}
            </div>
        `);

        const section2 = this._buildInvestigationFormPrintSection('inv-s2', nextNum(), 'الموقع والجهة', `
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField('المصنع / الموقع', esc(incident.siteName || incident.factory || registryEntry?.factory), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('المكان الفرعي', esc(incident.sublocationName || incident.sublocation), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('الموقع التفصيلي', esc(locationLabel), '#9C27B0')}
                ${this._buildInvestigationFormPrintField('الإدارة / القسم', esc(incident.department || registryEntry?.employeeDepartment), '#9C27B0')}
            </div>
        `);

        const section3 = this._buildInvestigationFormPrintSection('inv-s4', nextNum(), 'بيانات الإبلاغ والمتضرر', `
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField('المبلِّغ', esc(incident.reportedBy), '#E91E63')}
                ${this._buildInvestigationFormPrintField('الكود الوظيفي', esc(incident.employeeCode || incident.employeeNumber || registryEntry?.employeeCode), '#E91E63')}
                ${this._buildInvestigationFormPrintField('الطرف المتضرر', esc(incident.affectedName || registryEntry?.employeeName), '#E91E63')}
                ${this._buildInvestigationFormPrintField('وظيفة المتضرر', esc(incident.affectedJob || incident.affectedRole || registryEntry?.employeeJob), '#E91E63')}
                ${this._buildInvestigationFormPrintField('جهة المتضرر', esc(incident.affectedDepartment || registryEntry?.employeeDepartment), '#E91E63')}
            </div>
        `);

        const injuryFields = [
            injuredPart && injuredPart !== 'غير محدد' ? this._buildInvestigationFormPrintField('الجزء المتضرر', esc(injuredPart), '#E91E63') : '',
            incident.injuryDescription ? this._buildInvestigationFormPrintField('وصف الإصابة', esc(incident.injuryDescription), '#E91E63') : '',
            (incident.losses || registryEntry?.losses) ? this._buildInvestigationFormPrintField('الخسائر', esc(incident.losses || registryEntry?.losses), '#E91E63') : '',
            (incident.actionsTaken || registryEntry?.actionsTaken) ? this._buildInvestigationFormPrintField('الإجراءات المتخذة', esc(incident.actionsTaken || registryEntry?.actionsTaken), '#E91E63') : ''
        ].filter(Boolean).join('');

        const sectionInjury = injuryFields ? this._buildInvestigationFormPrintSection('inv-s4', nextNum(), 'الإصابة والخسائر والإجراءات', `
            <div class="inv-field-grid" style="grid-template-columns: 1fr; gap: 14px;">${injuryFields}</div>
        `) : '';

        const section4 = this._buildInvestigationFormPrintSection('inv-s3', nextNum(), 'وصف الحادث', `
            <div class="inv-text-panel" style="border-color:#FF9800;">${esc(incident.description || registryEntry?.incidentDetails || 'غير محدد')}</div>
        `);

        const analysisBlocks = [];
        if (incident.rootCause) {
            analysisBlocks.push(`
                <div style="margin-bottom:14px;">
                    <div class="inv-field-label">الأسباب الجذرية</div>
                    <div class="inv-text-panel" style="border-color:#14b8a6;background:#f0fdfa;">${esc(incident.rootCause)}</div>
                </div>
            `);
        }
        if (incident.correctiveAction) {
            analysisBlocks.push(`
                <div style="margin-bottom:14px;">
                    <div class="inv-field-label">الإجراءات التصحيحية الفورية</div>
                    <div class="inv-text-panel" style="border-color:#14b8a6;background:#f0fdfa;">${esc(incident.correctiveAction)}</div>
                </div>
            `);
        }
        if (incident.preventiveAction) {
            analysisBlocks.push(`
                <div>
                    <div class="inv-field-label">الإجراءات الوقائية</div>
                    <div class="inv-text-panel" style="border-color:#14b8a6;background:#f0fdfa;">${esc(incident.preventiveAction)}</div>
                </div>
            `);
        }

        const section5 = analysisBlocks.length
            ? this._buildInvestigationFormPrintSection('inv-s5', nextNum(), 'التحليل والإجراءات الأولية', analysisBlocks.join(''))
            : '';

        const registrySection = registryEntry
            ? this._buildIncidentReportRegistrySection(registryEntry, nextNum())
            : '';

        const hasActionPlan = Array.isArray(incident.actionPlan) && incident.actionPlan.length > 0;
        let actionPlanSection = '';
        if (hasActionPlan) {
            const statusLabel = (status) => {
                if (status === 'completed') return 'تم الإنجاز';
                if (status === 'in_progress') return 'تحت التنفيذ';
                return 'جارٍ';
            };
            const actionRows = incident.actionPlan.map(action => `
                <tr>
                    <td style="padding:10px;border:1px solid #c8e6c9;">${esc(action.actionType === 'corrective' ? 'إجراء تصحيحي' : action.actionType === 'preventive' ? 'إجراء وقائي' : (action.actionType || 'إجراء'))}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;">${esc(action.description || action.correctiveAction || '')}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;text-align:center;">${esc(action.owner || action.responsibleName || '')}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;text-align:center;">${action.dueDate || action.plannedDate ? this._formatIncidentPrintDateOnly(action.dueDate || action.plannedDate) : '—'}</td>
                    <td style="padding:10px;border:1px solid #c8e6c9;text-align:center;">${esc(statusLabel(action.status))}</td>
                </tr>
            `).join('');
            actionPlanSection = this._buildInvestigationFormPrintSection('inv-s6', nextNum(), 'خطة الإجراءات التصحيحية والوقائية', `
                <div class="inv-inner-white" style="border-color:#4CAF50;">
                    <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
                        <thead>
                            <tr style="background:linear-gradient(135deg,#388E3C 0%,#4CAF50 100%);color:white;">
                                <th style="padding:12px;text-align:right;border:1px solid #2E7D32;">نوع الإجراء</th>
                                <th style="padding:12px;text-align:right;border:1px solid #2E7D32;">الوصف</th>
                                <th style="padding:12px;text-align:center;border:1px solid #2E7D32;">المسؤول</th>
                                <th style="padding:12px;text-align:center;border:1px solid #2E7D32;">الاستحقاق</th>
                                <th style="padding:12px;text-align:center;border:1px solid #2E7D32;">الحالة</th>
                            </tr>
                        </thead>
                        <tbody style="background:#f9fff9;">${actionRows}</tbody>
                    </table>
                </div>
            `);
        }

        const exportImages = this._collectIncidentExportImages(incident);
        let imagesSection = '';
        if (exportImages.length) {
            const imageContainerStyle = 'display:inline-block;width:48%;max-width:360px;margin:1%;vertical-align:top;text-align:center;';
            const imageFrameStyle = 'width:100%;height:280px;border:2px solid #1565C0;border-radius:12px;padding:8px;background:#f8fafc;display:flex;align-items:center;justify-content:center;overflow:hidden;';
            const imageStyle = 'max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;';
            imagesSection = this._buildInvestigationFormPrintSection('inv-s1', nextNum(), 'الصور المرفقة', `
                <div style="text-align:center;display:flex;flex-wrap:wrap;justify-content:center;gap:16px;">
                    ${exportImages.map((img, idx) => `
                        <div style="${imageContainerStyle}">
                            <div style="${imageFrameStyle}">
                                <img src="${this.convertGoogleDriveLinkToPrintable(img)}" alt="صورة ${idx + 1}" style="${imageStyle}" onerror="this.parentElement.innerHTML='<div style=\\'color:#94a3b8;font-size:14px;\\'>تعذر تحميل الصورة</div>';">
                            </div>
                            <div style="margin-top:8px;font-size:13px;color:#475569;font-weight:600;">صورة ${idx + 1}</div>
                        </div>
                    `).join('')}
                </div>
            `);
        }

        let investigationAppendix = '';
        if (opts.includeInvestigation !== false) {
            const { investigationData } = this._resolveInvestigationDataForExport(incident.id);
            if (this._hasInvestigationExportData(investigationData)) {
                investigationAppendix = `
                    <div style="page-break-before:always;margin-top:28px;padding-top:12px;border-top:4px solid #1565C0;">
                        <h2 style="text-align:center;color:#1565C0;margin:0 0 20px;font-size:22px;font-weight:800;">ملحق: تقرير التحقيق في الحادث</h2>
                    </div>
                    ${this.buildInvestigationPrintContent(incident, investigationData, { includeStyles: false })}
                `;
            }
        }

        return `
            ${this._getInvestigationFormPrintStyles()}
            <div class="inv-print-wrap">
                ${section1}
                ${section2}
                ${section3}
                ${sectionInjury}
                ${section4}
                ${section5}
                ${registrySection}
                ${actionPlanSection}
                ${imagesSection}
                ${investigationAppendix}
            </div>
        `;
    },

    _buildIncidentReportHtml(incident) {
        const content = this.buildIncidentReportPrintContent(incident);
        const formCode = incident.isoCode || incident.notificationNumber || incident.id || `INC-${new Date().toISOString().slice(0, 10)}`;

        if (typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML) {
            return FormHeader.generatePDFHTML(
                formCode,
                'تقرير الحادث – Incident Report',
                content,
                false,
                false,
                {
                    version: AppState?.companySettings?.formVersion || '1.0',
                    titleAr: 'تقرير الحادث',
                    titleEn: 'Incident Report',
                    includeQRCode: false,
                    'مرجع الحادث': incident.id || '—'
                },
                incident.createdAt || incident.date,
                incident.updatedAt
            );
        }

        return `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${content}</body></html>`;
    },

    _buildRegistryEntryReportHtml(entry) {
        const content = this.buildRegistryEntryReportPrintContent(entry);
        const formCode = `REG-${entry.sequentialNumber || entry.id}`;

        if (typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML) {
            return FormHeader.generatePDFHTML(
                formCode,
                'تقرير سجل الحادث – Incident Registry Report',
                content,
                false,
                false,
                {
                    version: AppState?.companySettings?.formVersion || '1.0',
                    titleAr: 'تقرير سجل الحادث',
                    titleEn: 'Incident Registry Report',
                    includeQRCode: false
                },
                entry.incidentDate,
                entry.updatedAt
            );
        }

        return `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${content}</body></html>`;
    },

    async _exportIncidentReportPdf(incidentId) {
        const incident = AppState.appData.incidents.find(i => i.id === incidentId);
        if (!incident) {
            Notification.error('الحادث غير موجود');
            return false;
        }

        try {
            Loading.show('جاري تحضير تقرير الحادث...');
            const htmlContent = this._buildIncidentReportHtml(incident);
            const ref = incident.isoCode || incident.notificationNumber || incident.id;
            const safeName = `تقرير-حادث-${String(ref).replace(/[^\w\u0600-\u06FF.-]/g, '_')}`;
            const downloaded = await this._downloadHtmlReportAsPdf(htmlContent, safeName);
            Loading.hide();

            if (downloaded) {
                Notification.success('تم تحميل تقرير الحادث بنجاح');
                return true;
            }

            this._openIncidentPrintableHtml(htmlContent, 'تعذّر التحميل المباشر — تم فتح نافذة الطباعة');
            return true;
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير تقرير الحادث:', error);
            Notification.error('فشل تصدير PDF: ' + error.message);
            return false;
        }
    },

    async exportRegistryEntryPDF(entryId) {
        const entry = this.registryData.find(r => r.id === entryId);
        if (!entry) {
            Notification.error('السجل غير موجود');
            return false;
        }

        const linkedIncident = entry.incidentId
            ? AppState.appData.incidents.find(i => i.id === entry.incidentId)
            : null;

        try {
            Loading.show('جاري تحضير تقرير السجل...');
            const htmlContent = linkedIncident
                ? this._buildIncidentReportHtml(linkedIncident)
                : this._buildRegistryEntryReportHtml(entry);
            const ref = entry.sequentialNumber || entry.id;
            const safeName = `سجل-حادث-${String(ref).replace(/[^\w\u0600-\u06FF.-]/g, '_')}`;
            const downloaded = await this._downloadHtmlReportAsPdf(htmlContent, safeName);
            Loading.hide();

            if (downloaded) {
                Notification.success('تم تحميل تقرير السجل بنجاح');
                return true;
            }

            this._openIncidentPrintableHtml(htmlContent, 'تعذّر التحميل المباشر — تم فتح نافذة الطباعة');
            return true;
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير تقرير السجل:', error);
            Notification.error('فشل تصدير PDF: ' + error.message);
            return false;
        }
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

    _stripScriptsFromHtml_(htmlContent) {
        return String(htmlContent || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    },

    async _preloadCairoFontForPdf_() {
        if (!document.getElementById('inc-cairo-font-link')) {
            const link = document.createElement('link');
            link.id = 'inc-cairo-font-link';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
            document.head.appendChild(link);
        }
        try {
            if (document.fonts && typeof document.fonts.load === 'function') {
                await document.fonts.load('400 14px Cairo');
                await document.fonts.load('700 20px Cairo');
                await document.fonts.ready;
            }
        } catch (_e) { /* ignore */ }
    },

    _getIncidentReportPdfA4Styles() {
        return `
<style id="incidents-pdf-a4-layout">
    @page { size: A4 portrait; margin: 0; }
    html, body {
        width: 210mm;
        max-width: 210mm;
        margin: 0 auto !important;
        padding: 0 !important;
        background: #ffffff !important;
        box-sizing: border-box;
    }
    .report-wrapper {
        width: 210mm !important;
        max-width: 210mm !important;
        min-height: auto !important;
        margin: 0 auto !important;
        padding: 8mm 10mm !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        box-sizing: border-box !important;
    }
    .report-body, .inv-print-wrap {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
    }
    .inv-print-section, .rca-print-section {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        break-inside: avoid;
        page-break-inside: avoid;
    }
    .inv-field-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
    .inv-type-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
    table { width: 100% !important; max-width: 100% !important; table-layout: fixed !important; }
    .report-header {
        break-inside: avoid;
        page-break-inside: avoid;
    }
    img { max-width: 100% !important; height: auto !important; }
</style>`;
    },

    _prepareArabicPdfHtml_(htmlContent) {
        const arabicFix = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style id="incidents-arabic-pdf-fix">
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
</style>${this._getIncidentReportPdfA4Styles()}`;
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
                doc.fonts.load('400 12px Cairo'),
                doc.fonts.load('600 14px Cairo'),
                doc.fonts.load('700 18px Cairo'),
                doc.fonts.load('800 24px Cairo')
            ]);
            await doc.fonts.ready;
        } catch (_e) { /* ignore */ }
    },

    async _captureHtmlToCanvas_(root, opts = {}) {
        const pdfWidth = opts.windowWidth || Math.max(root.scrollWidth || 0, 794);
        const baseOpts = {
            scale: 2.5,
            backgroundColor: '#ffffff',
            logging: false,
            width: pdfWidth,
            windowWidth: pdfWidth,
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
        iframe.style.cssText = 'position:fixed;left:-100000px;top:0;width:794px;min-height:1123px;border:0;visibility:hidden;';
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

            const canvas = await this._captureHtmlToCanvas_(root, { windowWidth: 794 });
            if (!canvas) return false;

            const pdf = Utils.PdfExport.createPdf({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            if (!pdf) return false;
            Utils.PdfExport.appendCanvasAsPdfPages(pdf, canvas, { marginMm: 4 });
            Utils.PdfExport.savePdf(pdf, pdfFileName);
            return true;
        } catch (error) {
            Utils.safeWarn('فشل تحميل تقرير PDF:', error);
            return false;
        } finally {
            iframe.remove();
        }
    },

    _buildInvestigationDataFromIncident(incident, existing = {}) {
        const merged = { ...existing };
        if (!merged.investigationNumber) {
            merged.investigationNumber = incident.isoCode
                ? `INV-${String(incident.isoCode).replace(/^ISO-?/i, '')}`
                : `INV-${String(incident.id || '').substring(0, 8)}`;
        }
        if (!merged.investigationDateTime) merged.investigationDateTime = incident.updatedAt || incident.createdAt;
        if (!merged.incidentDateTime) merged.incidentDateTime = incident.date || incident.incidentDateTime;
        if (!merged.factoryName) merged.factoryName = incident.siteName || incident.factory;
        if (!merged.locationName) {
            merged.locationName = [
                incident.sublocationName || incident.sublocation,
                incident.location
            ].filter(v => v && String(v).trim()).join(' — ') || incident.location;
        }
        if (!merged.description) merged.description = incident.description;
        if (!merged.affectedName) merged.affectedName = incident.affectedName;
        if (!merged.affectedJob) merged.affectedJob = incident.affectedJob || incident.affectedRole;
        if (!merged.affectedDepartment) merged.affectedDepartment = incident.affectedDepartment;
        if (!merged.unsafeBehavior && incident.unsafeBehavior) merged.unsafeBehavior = incident.unsafeBehavior;
        if (!merged.unsafeCondition && incident.unsafeCondition) merged.unsafeCondition = incident.unsafeCondition;
        if (!merged.riskResult && (incident.riskResult || incident.riskLevel)) {
            merged.riskResult = incident.riskResult || incident.riskLevel;
        }
        if (!merged.riskExplanation && incident.rootCause) merged.riskExplanation = incident.rootCause;
        if (!merged.actionPlan?.length && Array.isArray(incident.actionPlan) && incident.actionPlan.length) {
            merged.actionPlan = incident.actionPlan.map((action) => ({
                correctiveAction: action.correctiveAction || action.description || '',
                plannedDate: action.plannedDate || action.dueDate || '',
                responsibleName: action.responsibleName || action.owner || '',
                responsibleDepartment: action.responsibleDepartment || '',
                responsibleDate: action.responsibleDate || '',
                followUpName: action.followUpName || '',
                followUpDepartment: action.followUpDepartment || '',
                followUpDate: action.followUpDate || ''
            }));
        }
        if (!merged.incidentTypes?.length && incident.incidentType) {
            merged.incidentTypes = [incident.incidentType];
        }
        if (!merged.rca?.method && existing.rca?.method) {
            merged.rca = existing.rca;
        } else if (!merged.rca?.method) {
            const saved = this._parseIncidentInvestigationSummary(incident);
            if (saved?.rca?.method) merged.rca = saved.rca;
        }
        return merged;
    },

    /** جمع بيانات RCA من معالج التحقيق المفتوح */
    _collectInvestigationRcaData() {
        const rcaContainer = document.getElementById('investigation-rca-wizard');
        if (!rcaContainer || typeof InvestigationRCA === 'undefined') return null;
        try {
            return InvestigationRCA.collect(rcaContainer);
        } catch (e) {
            Utils.safeWarn('تعذّر جمع بيانات RCA للتصدير:', e);
            return null;
        }
    },

    /** دمج بيانات RCA المحفوظة/الحية لتصدير التقرير */
    _mergeInvestigationRcaForExport(investigationData, incident) {
        const data = investigationData ? { ...investigationData } : {};
        const savedInv = this._parseIncidentInvestigationSummary(incident) || {};

        let savedRca = savedInv.rca;
        if (typeof savedRca === 'string') {
            try { savedRca = JSON.parse(savedRca); } catch (_e) { savedRca = null; }
        }

        let existingRca = data.rca;
        if (typeof existingRca === 'string') {
            try { existingRca = JSON.parse(existingRca); } catch (_e) { existingRca = null; }
        }

        const liveRca = this._collectInvestigationRcaData();

        if (liveRca?.method) {
            data.rca = liveRca;
        } else if (existingRca?.method) {
            data.rca = existingRca;
        } else if (savedRca?.method) {
            data.rca = savedRca;
        } else if (liveRca && Object.keys(liveRca.stepsData || {}).length) {
            data.rca = liveRca;
        } else if (savedRca) {
            data.rca = savedRca;
        }

        if (!data.rootCauseSummary && data.rca?.rootCauseSummary) {
            data.rootCauseSummary = data.rca.rootCauseSummary;
        }
        if (!data.riskExplanation && data.rca?.rootCauseSummary) {
            data.riskExplanation = data.rca.rootCauseSummary;
        }

        if (typeof InvestigationRCA !== 'undefined' && data.rca) {
            const normalized = InvestigationRCA.normalizeRcaForExport(data.rca);
            if (normalized) data.rca = normalized;
        }

        return data;
    },

    _resolveInvestigationDataForExport(incidentId) {
        const incident = AppState.appData.incidents.find(i => i.id === incidentId);
        if (!incident) return { incident: null, investigationData: null };

        let investigationData = this.getInvestigationFormData();
        if (!investigationData) {
            investigationData = this._parseIncidentInvestigationSummary(incident) || {};
        }

        if (!investigationData.investigationNumber && !investigationData.description) {
            investigationData = this._buildInvestigationDataFromIncident(incident, investigationData);
        }

        investigationData = this._mergeInvestigationRcaForExport(investigationData, incident);

        return { incident, investigationData };
    },

    _buildInvestigationReportHtml(incident, investigationData) {
        const content = this.buildInvestigationPrintContent(incident, investigationData);
        const formCode = investigationData.investigationNumber
            || incident.isoCode
            || `INV-${String(incident.id || '').substring(0, 8)}`;

        if (typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML) {
            return FormHeader.generatePDFHTML(
                formCode,
                'التحقيق في الحادث – Incident Investigation',
                content,
                false,
                false,
                {
                    version: AppState?.companySettings?.formVersion || '1.0',
                    titleAr: 'التحقيق في الحادث',
                    titleEn: 'Incident Investigation',
                    includeQRCode: false,
                    'مرجع الحادث': incident.id || '—'
                },
                incident.createdAt,
                investigationData.updatedAt || incident.updatedAt
            );
        }

        return `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>body { font-family: 'Tahoma', Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; } @media print { body { margin: 0; padding: 15px; } }</style></head><body>${content}</body></html>`;
    },

    async _exportInvestigationReportPdf(incidentId) {
        const { incident, investigationData } = this._resolveInvestigationDataForExport(incidentId);
        if (!incident) {
            Notification.error('الحادث غير موجود');
            return false;
        }
        if (!investigationData.investigationNumber && !investigationData.description) {
            Notification.warning('لا توجد بيانات كافية للتصدير');
            return false;
        }

        try {
            Loading.show('جاري تحضير تقرير التحقيق...');
            const htmlContent = this._buildInvestigationReportHtml(incident, investigationData);
            const ref = investigationData.investigationNumber || incident.isoCode || incident.id;
            const safeName = `تحقيق-حادث-${String(ref).replace(/[^\w\u0600-\u06FF.-]/g, '_')}`;
            const downloaded = await this._downloadHtmlReportAsPdf(htmlContent, safeName);
            Loading.hide();

            if (downloaded) {
                Notification.success('تم تحميل تقرير التحقيق بنجاح');
                return true;
            }

            this._openIncidentPrintableHtml(htmlContent, 'تعذّر التحميل المباشر — تم فتح نافذة الطباعة');
            return true;
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير PDF:', error);
            Notification.error('فشل تصدير PDF: ' + error.message);
            return false;
        }
    },

    _openIncidentPrintableHtml(htmlContent, successMessage) {
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');
        if (!printWindow) {
            Loading.hide();
            Notification.error('يرجى السماح للنوافذ المنبثقة لعرض التقرير');
            return false;
        }
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                            Loading.hide();
                    Notification.success(successMessage || 'تم تجهيز التقرير للطباعة/الحفظ كـ PDF');
                }, 800);
                    }, 500);
                };
        return true;
    },

    async exportPDF(id) {
        await this._exportIncidentReportPdf(id);
    },

    // تطبيق نظام الصلاحيات
    applyPermissions() {
        const isAdmin = this.isAdmin();
        const canDelete = this.canDeleteIncident();

        if (!isAdmin) {
            document.querySelectorAll('[onclick*="editIncident"]').forEach(btn => {
                btn.style.display = 'none';
            });
            const locationToggleBtn = document.getElementById('incident-location-toggle');
            if (locationToggleBtn) {
                locationToggleBtn.style.display = 'none';
            }
        } else {
            document.querySelectorAll('[onclick*="editIncident"]').forEach(btn => {
                btn.style.display = '';
            });
        }

        document.querySelectorAll('[onclick*="deleteIncident"]').forEach(btn => {
            btn.style.display = canDelete ? '' : 'none';
        });

        // التحقق من صلاحيات إضافة الإجراءات
        const addActionBtn = document.getElementById('add-action-plan-row');
        if (addActionBtn) {
            const canAddActions = isAdmin ||
                (AppState.currentUser?.permissions &&
                    AppState.currentUser.permissions['incidents-add-actions'] === true);
            if (!canAddActions) {
                addActionBtn.disabled = true;
                addActionBtn.title = 'ليس لديك صلاحية لإضافة إجراءات';
            }
        }
    },

    filterIncidents(searchTerm = '', statusFilter = '') {
        const incidents = AppState.appData.incidents || [];
        let filtered = incidents;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter((incident) =>
                incident.title?.toLowerCase().includes(term) ||
                this.getIncidentListLocation(incident).toLowerCase().includes(term) ||
                this.getIncidentListReporter(incident).toLowerCase().includes(term) ||
                this.getIncidentAffectedPartyName(incident).toLowerCase().includes(term) ||
                incident.isoCode?.toLowerCase().includes(term)
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(incident => this.getIncidentDisplayStatus(incident) === statusFilter
                || incident.status === statusFilter);
        }

        const tbody = document.querySelector('#incidents-table-container tbody');
        if (tbody) {
            tbody.innerHTML = filtered.length === 0 ?
                '<tr><td colspan="10" class="text-center text-gray-500 py-8">لا توجد نتائج</td></tr>' :
                filtered.map((incident) => this.renderIncidentsListRow(incident, true)).join('');
        }
    },

    setupAffectedAutocomplete(incidentData = null) {
        setTimeout(() => {
            if (typeof EmployeeHelper !== 'undefined') {
                EmployeeHelper.setupEmployeeCodeSearch('incident-affected-code', 'incident-affected-name', (employee) => {
                    if (!employee) return;
                    const nameInput = document.getElementById('incident-affected-name');
                    const jobInput = document.getElementById('incident-affected-job');
                    const deptInput = document.getElementById('incident-affected-department');
                    const contactInput = document.getElementById('incident-affected-contact');
                    const affectedTypeSelect = document.getElementById('incident-affected-type');

                    if (affectedTypeSelect) affectedTypeSelect.value = 'employee';
                    if (nameInput) nameInput.value = employee.name || employee.fullName || '';
                    if (jobInput) jobInput.value = employee.position || employee.jobTitle || '';
                    if (deptInput) deptInput.value = employee.department || employee.section || '';
                    if (contactInput) {
                        contactInput.value = employee.phone || employee.mobile || employee.email || '';
                    }
                });

                EmployeeHelper.setupAutocomplete('incident-affected-name', (employee) => {
                    if (!employee) return;
                    const codeInput = document.getElementById('incident-affected-code');
                    const jobInput = document.getElementById('incident-affected-job');
                    const deptInput = document.getElementById('incident-affected-department');
                    const contactInput = document.getElementById('incident-affected-contact');
                    const affectedTypeSelect = document.getElementById('incident-affected-type');

                    if (affectedTypeSelect) affectedTypeSelect.value = 'employee';
                    if (codeInput) codeInput.value = employee.code || '';
                    if (jobInput) jobInput.value = employee.position || employee.jobTitle || '';
                    if (deptInput) deptInput.value = employee.department || employee.section || '';
                    if (contactInput) {
                        contactInput.value = employee.phone || employee.mobile || employee.email || '';
                    }
                });
            }

            const initialType = incidentData?.affectedType || 'employee';
            this.handleAffectedTypeChange(initialType);
        }, 200);
    },

    handleAffectedTypeChange(selectedType = 'employee') {
        const codeInput = document.getElementById('incident-affected-code');
        const nameInput = document.getElementById('incident-affected-name');
        const jobInput = document.getElementById('incident-affected-job');
        const deptInput = document.getElementById('incident-affected-department');
        const contactInput = document.getElementById('incident-affected-contact');

        if (!nameInput) return;

        if (selectedType === 'employee') {
            if (codeInput) {
                codeInput.disabled = false;
                codeInput.placeholder = 'ادخل الكود الوظيفي';
            }
            nameInput.readOnly = false;
            nameInput.placeholder = 'ابحث بالاسم أو الكود';
            if (jobInput) jobInput.readOnly = true;
            if (deptInput) deptInput.readOnly = true;
        } else {
            if (codeInput) {
                codeInput.disabled = true;
                codeInput.value = '';
                codeInput.placeholder = 'لا يتطلب كوداً';
            }
            nameInput.readOnly = false;
            if (jobInput) jobInput.readOnly = false;
            if (deptInput) deptInput.readOnly = false;
        }

        if (selectedType !== 'employee') {
            if (jobInput && !jobInput.value) jobInput.value = '';
            if (deptInput && !deptInput.value) deptInput.value = '';
            if (contactInput && !contactInput.value) contactInput.value = '';
        }
    },

    populateActionPlanRows(plan = []) {
        const tbody = document.getElementById('incident-action-plan-body');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (!Array.isArray(plan) || plan.length === 0) {
            this.addActionPlanRow();
            return;
        }

        plan.forEach(item => this.addActionPlanRow(item));
    },

    addActionPlanRow(data = {}) {
        const tbody = document.getElementById('incident-action-plan-body');
        if (!tbody) return;

        const rowId = data.id || Utils.generateId('ACTPLAN');
        const tr = document.createElement('tr');
        tr.className = 'incident-action-row';
        tr.setAttribute('data-row-id', rowId);
        tr.innerHTML = `
            <td style="padding: 8px;">
                <select class="form-input" name="action-type" style="width: 100%;">
                    <option value="corrective" ${data.actionType === 'corrective' ? 'selected' : ''}>إجراء تصحيحي</option>
                    <option value="preventive" ${data.actionType === 'preventive' ? 'selected' : ''}>إجراء وقائي</option>
                </select>
            </td>
            <td style="padding: 8px;">
                <input type="text" class="form-input" name="action-description" value="${Utils.escapeHTML(data.description || '')}" placeholder="وصف الإجراء" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <input type="text" class="form-input" name="action-owner" value="${Utils.escapeHTML(data.owner || '')}" placeholder="اسم المسؤول" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <input type="date" class="form-input" name="action-due" value="${this.safeDateToISOString(data.dueDate, 10)}" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <input type="date" class="form-input" name="action-closed" value="${this.safeDateToISOString(data.closedDate, 10)}" style="width: 100%;">
            </td>
            <td style="padding: 8px;">
                <select class="form-input" name="action-status" style="width: 100%;">
                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>جار</option>
                    <option value="in_progress" ${data.status === 'in_progress' ? 'selected' : ''}>تحت التنفيذ</option>
                    <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>تم إنجازه</option>
                </select>
            </td>
            <td style="padding: 8px; text-align: center;">
                <div class="flex items-center justify-center gap-2">
                    <button type="button" class="btn-icon btn-icon-primary" data-edit-action="${rowId}" title="تعديل">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="btn-icon btn-icon-danger" data-remove-action="${rowId}" title="حذف">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);

        const removeBtn = tr.querySelector(`[data-remove-action="${rowId}"]`);
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeActionPlanRow(rowId));
        }

        // التأكد من أن الصف الجديد يظهر بشكل صحيح
        tr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    removeActionPlanRow(rowId) {
        const tbody = document.getElementById('incident-action-plan-body');
        if (!tbody) return;

        const rows = tbody.querySelectorAll('.incident-action-row');
        if (rows.length <= 1) {
            Notification.warning('لا يمكن حذف الصف الأخير من خطة الإجراءات.');
            return;
        }

        const row = tbody.querySelector(`.incident-action-row[data-row-id="${rowId}"]`);
        if (row) {
            row.remove();
        }
    },

    collectActionPlanRows() {
        const rows = Array.from(document.querySelectorAll('#incident-action-plan-body .incident-action-row'));
        return rows.map(row => {
            const id = row.getAttribute('data-row-id') || Utils.generateId('ACTPLAN');
            const type = row.querySelector('[name="action-type"]')?.value || 'corrective';
            const description = row.querySelector('[name="action-description"]')?.value?.trim() || '';
            const owner = row.querySelector('[name="action-owner"]')?.value?.trim() || '';
            const dueDate = row.querySelector('[name="action-due"]')?.value || '';
            const closedDate = row.querySelector('[name="action-closed"]')?.value || '';
            const status = row.querySelector('[name="action-status"]')?.value || 'pending';

            return {
                id,
                actionType: type,
                description,
                owner,
                dueDate: dueDate ? this.safeDateToISOString(dueDate) || null : null,
                closedDate: closedDate ? this.safeDateToISOString(closedDate) || null : null,
                status,
                updatedAt: new Date().toISOString()
            };
        }).filter(item => item.description || item.owner || item.dueDate);
    },

    async handleAttachmentsChange(fileList) {
        if (!fileList || fileList.length === 0) return;

        const files = Array.from(fileList);
        const validFiles = [];

        for (const file of files) {
            if (file.size > 5 * 1024 * 1024) {
                Notification.error(`الملف ${file.name} يتجاوز الحد الأقصى (5MB)`);
                continue;
            }
            validFiles.push(file);
        }

        if (validFiles.length === 0) {
            return;
        }

        Loading.show('جاري معالجة المرفقات...');
        try {
            for (const file of validFiles) {
                const base64 = await this.readFileAsBase64(file);
                const attachment = this.normalizeAttachment({
                    id: Utils.generateId('ATT'),
                    name: file.name,
                    type: file.type,
                    data: base64,
                    size: Math.round(file.size / 1024)
                });
                this.currentAttachments.push(attachment);
            }
            this.renderAttachmentsList();
            const input = document.getElementById('incident-attachments-input');
            if (input) input.value = '';
        } catch (error) {
            Notification.error('فشل تحميل المرفقات: ' + error.message);
        } finally {
            Loading.hide();
        }
    },

    async readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    },

    normalizeAttachment(attachment) {
        if (!attachment) return null;
        const data = attachment.data || attachment.base64 || '';
        const size = attachment.size || (data ? Math.round((data.length * 3) / 4 / 1024) : 0);
        return {
            id: attachment.id || Utils.generateId('ATT'),
            name: attachment.name || 'attachment',
            type: attachment.type || 'application/octet-stream',
            data,
            size,
            createdAt: attachment.createdAt || new Date().toISOString()
        };
    },

    renderCloudStorageUploadButtons(prefix) {
        const availableServices = CloudStorageIntegration?.getAvailableServices() || [];
        if (availableServices.length === 0) {
            return '';
        }

        return `
            <div class="mt-3 mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
                <label class="block text-xs font-semibold text-gray-700 mb-2">
                    <i class="fas fa-cloud ml-1"></i>
                    رفع إلى التخزين السحابي
                </label>
                <div class="flex items-center gap-2 flex-wrap">
                    ${availableServices.map(service => `
                        <button type="button" 
                                class="btn-secondary text-xs px-2 py-1" 
                                id="${prefix}-cloud-upload-${service}"
                                data-service="${service}"
                                title="رفع إلى ${CloudStorageIntegration.getServiceName(service)}">
                            <i class="fas fa-cloud-upload-alt ml-1"></i>
                            ${CloudStorageIntegration.getServiceName(service)}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    async handleCloudUpload(prefix, service) {
        const input = document.getElementById(`${prefix}-attachments-input`);
        if (!input || !input.files || input.files.length === 0) {
            Notification.warning('يرجى اختيار ملف أولاً');
            return;
        }

        const file = input.files[0];
        try {
            const result = await CloudStorageIntegration.uploadFile(service, file, file.name);

            // Add cloud link to attachments
            const attachment = {
                id: Utils.generateId('ATT'),
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1024),
                cloudLink: {
                    id: result.id,
                    url: result.url,
                    service: result.service,
                    fileName: result.fileName,
                    uploadedAt: result.uploadedAt
                },
                isCloud: true,
                createdAt: new Date().toISOString()
            };

            if (!this.currentAttachments) {
                this.currentAttachments = [];
            }
            this.currentAttachments.push(attachment);
            this.renderAttachmentsList();
            input.value = '';

            Notification.success(`تم رفع الملف إلى ${CloudStorageIntegration.getServiceName(service)} بنجاح`);
        } catch (error) {
            Utils.safeError('Cloud upload error:', error);
            Notification.error(error.message || 'فشل رفع الملف إلى السحابة');
        }
    },

    renderAttachmentsList() {
        const container = document.getElementById('incident-attachments-list');
        if (!container) return;

        if (!this.currentAttachments || this.currentAttachments.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500">لا توجد مرفقات مضافة.</p>';
            return;
        }

        container.innerHTML = this.currentAttachments.map((attachment, index) => {
            const isCloud = attachment.cloudLink || attachment.isCloud;
            const cloudBadge = isCloud ? `
                <span class="badge badge-info text-xs">
                    <i class="fas fa-cloud ml-1"></i>
                    ${CloudStorageIntegration?.getServiceName(attachment.cloudLink?.service) || 'سحابي'}
                </span>
            ` : '';

            return `
                <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2" data-attachment-index="${index}">
                    <div class="flex items-center gap-2">
                        <i class="fas ${isCloud ? 'fa-cloud' : 'fa-paperclip'} text-blue-500"></i>
                        <div>
                            <div class="flex items-center gap-2">
                                <div class="text-sm font-medium text-gray-700">${Utils.escapeHTML(attachment.name || 'attachment')}</div>
                                ${cloudBadge}
                            </div>
                            <div class="text-xs text-gray-500">
                                ${attachment.size || 0} KB
                                ${isCloud && attachment.cloudLink?.url ? `
                                    <a href="${attachment.cloudLink.url}" target="_blank" class="text-blue-600 hover:underline mr-2">
                                        <i class="fas fa-external-link-alt ml-1"></i>فتح
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        ${isCloud ? `
                            <button type="button" class="btn-icon btn-icon-info" title="تحميل من السحابة" data-attachment-cloud-download="${index}">
                                <i class="fas fa-cloud-download-alt"></i>
                            </button>
                        ` : ''}
                        <button type="button" class="btn-icon btn-icon-success" title="تحميل" data-attachment-download="${index}">
                            <i class="fas fa-download"></i>
                        </button>
                        <button type="button" class="btn-icon btn-icon-danger" title="حذف" data-attachment-remove="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.querySelectorAll('[data-attachment-remove]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-attachment-remove'), 10);
                this.removeAttachment(idx);
            });
        });

        container.querySelectorAll('[data-attachment-download]').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-attachment-download'), 10);
                this.downloadAttachment(idx);
            });
        });

        container.querySelectorAll('[data-attachment-cloud-download]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const idx = parseInt(btn.getAttribute('data-attachment-cloud-download'), 10);
                const attachment = this.currentAttachments?.[idx];
                if (attachment && attachment.cloudLink) {
                    try {
                        await CloudStorageIntegration.downloadFile(attachment.cloudLink);
                        Notification.success('تم تحميل الملف بنجاح');
                    } catch (error) {
                        Notification.error(error.message || 'فشل تحميل الملف من السحابة');
                    }
                }
            });
        });
    },

    removeAttachment(index) {
        if (!this.currentAttachments) return;
        this.currentAttachments.splice(index, 1);
        this.renderAttachmentsList();
    },

    downloadAttachment(index) {
        const attachment = this.currentAttachments?.[index];
        if (!attachment || !attachment.data) return;

        const link = document.createElement('a');
        link.href = attachment.data;
        link.download = attachment.name || `attachment-${index + 1}`;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => link.remove(), 0);
    },

    // الحصول على قائمة المواقع من الإعدادات
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
            var opts = '<option value="">اختر الموقع</option>' + (sites || []).map(function(s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
            var loc = document.getElementById('incident-location');
            if (loc && loc.tagName === 'SELECT') { var v = loc.value; loc.innerHTML = opts; if (v) loc.value = v; }
            var sub = document.getElementById('incident-sublocation');
            if (sub && sub.tagName === 'SELECT') {
                var locId = (document.getElementById('incident-location') || {}).value;
                var places = this.getPlaceOptions(locId);
                sub.innerHTML = '<option value="">اختر المكان الفرعي</option>' + (places || []).map(function(p) { return '<option value="' + esc(p.id) + '">' + esc(p.name) + '</option>'; }).join('');
            }
        } catch (e) { if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('⚠️ Incidents.refreshSiteDropdowns:', e); }
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

    getApprovedContractorOptions() {
        const names = new Map();
        const pushName = (value) => {
            const name = String(value || '').trim();
            if (name) names.set(name, name);
        };
        const isActiveRecord = (rec) => {
            if (!rec) return false;
            const inactiveFlags = [rec.isActive, rec.active, rec.status];
            return !inactiveFlags.some((flag) => {
                const value = String(flag ?? '').trim().toLowerCase();
                return value === 'inactive' || value === 'false' || value === 'غير نشط' || value === 'معطل';
            });
        };

        (AppState?.appData?.approvedContractors || []).forEach((rec) => {
            if (!rec || !isActiveRecord(rec)) return;
            const status = String(rec.status || 'approved').trim().toLowerCase();
            if (status && !['approved', 'active', 'نشط', 'معتمد'].includes(status)) return;
            pushName(rec.companyName || rec.name);
        });

        (AppState?.appData?.contractors || []).forEach((rec) => {
            if (!isActiveRecord(rec)) return;
            pushName(rec.companyName || rec.name || rec.company);
        });

        return Array.from(names.values()).sort((a, b) => a.localeCompare(b, 'ar'));
    },

    buildInvestigationAffectedContractorSelectOptions(selected = '') {
        const esc = (v) => Utils.escapeHTML(String(v ?? ''));
        const selectedNorm = String(selected || '').trim();
        const options = this.getApprovedContractorOptions();
        let html = '<option value="">اختر المقاول</option>';
        let found = false;
        options.forEach((name) => {
            const isSelected = name === selectedNorm;
            if (isSelected) found = true;
            html += `<option value="${esc(name)}"${isSelected ? ' selected' : ''}>${esc(name)}</option>`;
        });
        if (selectedNorm && !found) {
            html += `<option value="${esc(selectedNorm)}" selected>${esc(selectedNorm)} (محفوظ)</option>`;
        }
        return html;
    },

    _setInvestigationAffectedFieldLock(input, locked) {
        if (!input) return;
        input.readOnly = !!locked;
        input.style.background = locked ? '#fff7ed' : '';
        input.style.fontWeight = locked ? '600' : '';
    },

    fillInvestigationEmployeeFromCode(modal, options = {}) {
        const codeInput = modal?.querySelector('#investigation-affected-employee-code');
        const nameInput = modal?.querySelector('#investigation-affected-name');
        const jobInput = modal?.querySelector('#investigation-affected-job');
        const deptInput = modal?.querySelector('#investigation-affected-department');
        const ageInput = modal?.querySelector('#investigation-affected-age');
        const affiliationEl = modal?.querySelector('#investigation-affected-affiliation');

        if (!codeInput || !nameInput) return;
        if ((affiliationEl?.value || '') !== 'company') return;

        const employeeCode = codeInput.value.trim();
        if (!employeeCode) {
            if (!options.keepExisting) {
                nameInput.value = '';
                if (jobInput) jobInput.value = '';
                if (deptInput) deptInput.value = '';
                if (ageInput) ageInput.value = '';
            }
            return;
        }

        const employee = this.getEmployeeByCode(employeeCode);
        if (employee) {
            this._applyInvestigationEmployeeToForm(modal, employee, options);
        } else if (!options.silent) {
            nameInput.value = '';
            if (jobInput) jobInput.value = '';
            if (ageInput) ageInput.value = '';
            if (document.activeElement !== codeInput) {
                Notification.warning('لم يتم العثور على موظف بهذا الكود');
            }
        }
    },

    _resolveInvestigationAffectedDepartment(modal) {
        const affiliationEl = modal?.querySelector('#investigation-affected-affiliation');
        const deptInput = modal?.querySelector('#investigation-affected-department');
        const contractorSelect = modal?.querySelector('#investigation-affected-contractor-select');
        const affiliation = affiliationEl?.value || '';

        if (affiliation === 'contractor') {
            return (contractorSelect?.value || deptInput?.value || '').trim();
        }
        return (deptInput?.value || '').trim();
    },

    updateInvestigationAffectedAffiliationUI(modal) {
        if (!modal) return;

        const affiliationEl = modal.querySelector('#investigation-affected-affiliation');
        const codeWrapper = modal.querySelector('#investigation-affected-code-wrapper');
        const contractorWrapper = modal.querySelector('#investigation-affected-contractor-wrapper');
        const departmentWrapper = modal.querySelector('#investigation-affected-department-wrapper');
        const departmentLabel = modal.querySelector('#investigation-affected-department-label');
        const codeInput = modal.querySelector('#investigation-affected-employee-code');
        const contractorSelect = modal.querySelector('#investigation-affected-contractor-select');
        const nameInput = modal.querySelector('#investigation-affected-name');
        const jobInput = modal.querySelector('#investigation-affected-job');
        const deptInput = modal.querySelector('#investigation-affected-department');
        const ageInput = modal.querySelector('#investigation-affected-age');

        const affiliation = affiliationEl?.value || '';
        const isCompany = affiliation === 'company';
        const isContractor = affiliation === 'contractor';

        if (codeWrapper) codeWrapper.style.display = isCompany ? 'block' : 'none';
        if (contractorWrapper) contractorWrapper.style.display = isContractor ? 'block' : 'none';
        if (departmentWrapper) departmentWrapper.style.display = isContractor ? 'none' : 'block';

        if (codeInput) {
            codeInput.required = isCompany;
            if (!isCompany) codeInput.value = '';
        }

        if (contractorSelect) {
            contractorSelect.required = isContractor;
            if (!isContractor) contractorSelect.value = '';
        }

        if (departmentLabel) {
            departmentLabel.textContent = isCompany ? 'الإدارة / القسم' : 'الجهة التابع لها';
        }

        this._setInvestigationAffectedFieldLock(nameInput, isCompany);
        this._setInvestigationAffectedFieldLock(jobInput, isCompany);
        this._setInvestigationAffectedFieldLock(ageInput, isCompany);
        this._setInvestigationAffectedFieldLock(deptInput, false);

        if (isCompany) {
            this.fillInvestigationEmployeeFromCode(modal, { keepExisting: true, silent: true });
        }
    },

    setupInvestigationAffectedPersonUI(modal) {
        if (!modal) return;

        const affiliationEl = modal.querySelector('#investigation-affected-affiliation');
        const codeInput = modal.querySelector('#investigation-affected-employee-code');
        const contractorSelect = modal.querySelector('#investigation-affected-contractor-select');

        if (contractorSelect && !contractorSelect.dataset.bound) {
            contractorSelect.dataset.bound = '1';
            const current = contractorSelect.value;
            contractorSelect.innerHTML = this.buildInvestigationAffectedContractorSelectOptions(current);
        }

        const refreshUI = () => this.updateInvestigationAffectedAffiliationUI(modal);

        if (affiliationEl && !affiliationEl.dataset.bound) {
            affiliationEl.dataset.bound = '1';
            affiliationEl.addEventListener('change', refreshUI);
        }

        if (typeof EmployeeHelper !== 'undefined') {
            EmployeeHelper.setupEmployeeCodeSearch('investigation-affected-employee-code', 'investigation-affected-name', (employee) => {
                if ((affiliationEl?.value || '') !== 'company' || !employee) return;
                this._applyInvestigationEmployeeToForm(modal, employee);
            });
        }

        if (codeInput && !codeInput.dataset.blurBound) {
            codeInput.dataset.blurBound = '1';
            codeInput.addEventListener('blur', () => this.fillInvestigationEmployeeFromCode(modal, { keepExisting: true, silent: true }));
        }

        refreshUI();
    },

    setupInvestigationFormListeners(modal, incidentId, canEdit = true) {
        const self = this;

        // Form submit
        const form = modal.querySelector('#investigation-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!canEdit) {
                    Notification.warning('ليس لديك صلاحية لتعديل التحقيق. يجب أن تكون مسئول السلامة مع صلاحية "استكمال التحقيق" أو مدير النظام.');
                    return;
                }
                this.handleInvestigationSubmit(incidentId);
            });

            // تعطيل الحقول إذا لم يكن للمستخدم صلاحية التعديل
            if (!canEdit) {
                const inputs = form.querySelectorAll('input, textarea, select, button[type="submit"]');
                inputs.forEach(input => {
                    if (input.type !== 'button' && input.id !== 'investigation-number') {
                        input.disabled = true;
                    }
                });
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            }
        }

        // Toggle near miss description
        const nearMissCheckbox = modal.querySelector('#incident-type-nearmiss');
        const nearMissWrapper = modal.querySelector('#nearmiss-description-wrapper');
        if (nearMissCheckbox && nearMissWrapper) {
            nearMissCheckbox.addEventListener('change', (e) => {
                nearMissWrapper.style.display = e.target.checked ? 'block' : 'none';
            });
            // Set initial state
            nearMissWrapper.style.display = nearMissCheckbox.checked ? 'block' : 'none';
        }

        // Risk level calculation
        const riskProbability = modal.querySelector('#investigation-risk-probability');
        const riskSeverity = modal.querySelector('#investigation-risk-severity');
        const riskLevel = modal.querySelector('#investigation-risk-level');

        const calculateRiskLevel = () => {
            const prob = parseInt(riskProbability?.value || 0);
            const sev = parseInt(riskSeverity?.value || 0);
            if (prob > 0 && sev > 0) {
                const level = prob * sev;
                if (riskLevel) {
                    riskLevel.value = level.toString();
                }
            } else if (riskLevel) {
                riskLevel.value = '';
            }
        };

        if (riskProbability) riskProbability.addEventListener('change', calculateRiskLevel);
        if (riskSeverity) riskSeverity.addEventListener('change', calculateRiskLevel);

        // Load factory and location options
        this.loadInvestigationFormOptions(modal);

        // بيانات المصاب — شركة / مقاول
        this.setupInvestigationAffectedPersonUI(modal);

        // فلاتر موظفين لخطة العمل
        this.bindInvestigationActionPlanPickers(modal);

        // معالج تحليل السبب الجذري
        this.initInvestigationRcaWizard(modal, canEdit);
    },

    initInvestigationRcaWizard(modal, canEdit = true) {
        const container = modal.querySelector('#investigation-rca-wizard');
        if (!container || typeof InvestigationRCA === 'undefined') {
            if (container && typeof InvestigationRCA === 'undefined') {
                container.innerHTML = '<p class="text-amber-600 text-sm p-4"><i class="fas fa-exclamation-triangle ml-2"></i>مكوّن تحليل السبب الجذري غير محمّل. يرجى إعادة تحميل الصفحة.</p>';
            }
            return;
        }

        const form = modal.querySelector('#investigation-form');
        const incidentId = form?.dataset?.incidentId;
        let savedRca = null;
        if (incidentId && AppState?.appData?.incidents) {
            const incident = AppState.appData.incidents.find(i => i.id === incidentId);
            let inv = incident?.investigation;
            if (inv && typeof inv === 'string') {
                try { inv = JSON.parse(inv); } catch (_e) { inv = {}; }
            }
            savedRca = inv?.rca || null;
        }

        const descEl = modal.querySelector('#investigation-description');
        const defaultDescription = descEl?.value || '';

        InvestigationRCA.render(container, { savedRca, defaultDescription, canEdit });
        InvestigationRCA.bindEvents(container, { canEdit });
    },

    _getInvestigationModalEl() {
        const form = document.getElementById('investigation-form');
        if (form) return form.closest('.modal-overlay') || form.closest('.modal-content')?.parentElement || document.body;
        return document.querySelector('.modal-overlay:has(#investigation-form)');
    },

    _collectInvestigationAiContext(modal) {
        const root = modal || this._getInvestigationModalEl();
        const q = (sel) => root?.querySelector(sel);
        const getVal = (sel) => (q(sel)?.value || '').trim();

        const typeMap = {
            'incident-type-nearmiss': { key: 'nearmiss', label: 'حادث وشيك' },
            'incident-type-property': { key: 'property', label: 'تلف ممتلكات' },
            'incident-type-injury-no-lost': { key: 'injury-no-lost', label: 'إصابة بدون فقد أيام عمل' },
            'incident-type-injury-lost': { key: 'injury-lost', label: 'إصابة مع فقد أيام عمل' },
            'incident-type-fatality': { key: 'fatality', label: 'وفاة' }
        };

        const incidentTypes = [];
        const incidentTypeLabels = [];
        Object.entries(typeMap).forEach(([id, meta]) => {
            if (q(`#${id}`)?.checked) {
                incidentTypes.push(meta.key);
                incidentTypeLabels.push(meta.label);
            }
        });

        const factorySelect = q('#investigation-factory');
        const locationSelect = q('#investigation-location');
        const factoryName = factorySelect?.selectedOptions?.[0]?.textContent?.trim() || '';
        const locationName = locationSelect?.selectedOptions?.[0]?.textContent?.trim() || '';

        return {
            description: getVal('#investigation-description'),
            nearmissDescription: getVal('#investigation-nearmiss-description'),
            incidentTypes,
            incidentTypeLabels,
            factoryId: getVal('#investigation-factory'),
            factoryName,
            locationId: getVal('#investigation-location'),
            locationName,
            location: [factoryName, locationName].filter(Boolean).join(' — '),
            affectedName: getVal('#investigation-affected-name'),
            affectedJob: getVal('#investigation-affected-job'),
            affectedAge: getVal('#investigation-affected-age'),
            affectedDepartment: getVal('#investigation-affected-department'),
            injuredPart: getVal('#investigation-injured-part'),
            equipmentCause: getVal('#investigation-equipment-cause'),
            unsafeBehavior: getVal('#investigation-unsafe-behavior'),
            unsafeCondition: getVal('#investigation-unsafe-condition')
        };
    },

    async suggestInvestigationWithAI(incidentId) {
        const modal = this._getInvestigationModalEl();
        if (!modal) {
            Notification.error('لم يُعثر على نموذج التحقيق');
            return;
        }

        const context = this._collectInvestigationAiContext(modal);
        if (!context.description) {
            Notification.warning('يرجى إدخال وصف الحادث (القسم 3) أولاً');
            return;
        }
        if (!context.incidentTypes.length) {
            Notification.warning('يرجى اختيار نوع حادث واحد على الأقل (القسم 2)');
            return;
        }

        if (!confirm('سيتم تعبئة RCA والمخاطر وخطة العمل باقتراحات Gemini.\nيجب مراجعتها قبل الحفظ.\n\nهل تريد المتابعة؟')) {
            return;
        }

        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) {
            Notification.error('الاتصال بالخادم غير متاح');
            return;
        }

        try {
            Loading.show('جاري توليد اقتراح التحليل الذكي...');
            const result = await GoogleIntegration.sendRequest({
                action: 'suggestInvestigationAnalysis',
                data: context
            });
            Loading.hide();

            if (!result || result.success === false) {
                Notification.error(result?.message || 'فشل الحصول على اقتراح التحليل');
                return;
            }

            const suggestion = result.data || result;
            this._applyInvestigationAiSuggestion(modal, suggestion);
            Notification.success('تم توليد اقتراح التحليل — راجع الأقسام 5–6 وRCA قبل الحفظ');
        } catch (error) {
            Loading.hide();
            Utils.safeError('suggestInvestigationWithAI:', error);
            Notification.error(error?.message || 'خطأ أثناء الاتصال بالذكاء الاصطناعي');
        }
    },

    _applyInvestigationAiSuggestion(modal, suggestion) {
        if (!suggestion || !modal) return;

        const rcaContainer = modal.querySelector('#investigation-rca-wizard');
        if (rcaContainer && suggestion.rca && typeof InvestigationRCA !== 'undefined') {
            InvestigationRCA.applySuggestion(rcaContainer, suggestion.rca, {
                recommendedMethod: suggestion.recommendedMethod,
                canEdit: true
            });
        }

        const risk = suggestion.risk || {};
        const prob = parseInt(risk.probability, 10);
        const sev = parseInt(risk.severity, 10);
        if (prob >= 1 && prob <= 5 && sev >= 1 && sev <= 5) {
            const probEl = modal.querySelector('#investigation-risk-probability');
            const sevEl = modal.querySelector('#investigation-risk-severity');
            const levelEl = modal.querySelector('#investigation-risk-level');
            if (probEl) probEl.value = String(prob);
            if (sevEl) sevEl.value = String(sev);
            if (levelEl) levelEl.value = String(prob * sev);

            const matrixContainer = modal.querySelector('#investigation-risk-matrix');
            if (matrixContainer && typeof RiskMatrix !== 'undefined') {
                const cell = matrixContainer.querySelector(
                    `.risk-cell[data-likelihood="${prob}"][data-consequence="${sev}"]`
                );
                if (cell) {
                    RiskMatrix.selectCell(cell, 'investigation-risk-matrix');
                }
            }
        }

        const explEl = modal.querySelector('#investigation-risk-explanation');
        if (explEl && risk.explanation) {
            explEl.value = risk.explanation;
        }

        if (suggestion.unsafeBehavior) {
            const el = modal.querySelector('#investigation-unsafe-behavior');
            if (el) el.value = suggestion.unsafeBehavior;
        }
        if (suggestion.unsafeCondition) {
            const el = modal.querySelector('#investigation-unsafe-condition');
            if (el) el.value = suggestion.unsafeCondition;
        }

        const actionPlan = Array.isArray(suggestion.actionPlan) ? suggestion.actionPlan : [];
        const tbody = modal.querySelector('#investigation-action-plan-body');
        if (tbody && actionPlan.length) {
            tbody.innerHTML = this.renderInvestigationActionPlanRows(actionPlan);
            this.bindInvestigationActionPlanPickers(modal);
        }
    },

    async loadInvestigationFormOptions(modal) {
        const factorySelect = modal.querySelector('#investigation-factory');
        const locationSelect = modal.querySelector('#investigation-location');

        // Load factories (using sites as factories) - إزالة التكرارات
        if (factorySelect) {
            const sites = this.getSiteOptions();
            const seenFactoryIds = new Set();
            const seenFactoryNames = new Set();

            // إزالة الخيارات الموجودة مسبقاً (باستثناء الخيار الافتراضي)
            const defaultOption = factorySelect.querySelector('option[value=""]');
            factorySelect.innerHTML = '';
            if (defaultOption) {
                factorySelect.appendChild(defaultOption);
            }

            sites.forEach(site => {
                // التحقق من عدم تكرار ID أو الاسم
                if (!site.id || seenFactoryIds.has(site.id)) {
                    return; // تخطي إذا كان ID مكرر
                }
                if (site.name && seenFactoryNames.has(site.name.trim())) {
                    return; // تخطي إذا كان الاسم مكرر
                }

                seenFactoryIds.add(site.id);
                if (site.name) {
                    seenFactoryNames.add(site.name.trim());
                }

                const option = document.createElement('option');
                option.value = site.id;
                option.textContent = site.name || site.id;
                factorySelect.appendChild(option);
            });
        }

        // إعداد فلترة المواقع الفرعية حسب المصنع المحدد
        if (factorySelect && locationSelect) {
            const updateLocationOptions = () => {
                const selectedFactoryId = factorySelect.value;
                const currentLocationValue = locationSelect.value;

                // إزالة جميع الخيارات الحالية (باستثناء الخيار الافتراضي)
                const defaultLocationOption = locationSelect.querySelector('option[value=""]');
                locationSelect.innerHTML = '';
                if (defaultLocationOption) {
                    locationSelect.appendChild(defaultLocationOption);
                }

                if (selectedFactoryId) {
                    const places = this.getPlaceOptions(selectedFactoryId);
                    const seenLocationIds = new Set();
                    const seenLocationNames = new Set();

                    places.forEach(place => {
                        // التحقق من عدم تكرار ID أو الاسم
                        if (!place.id || seenLocationIds.has(place.id)) {
                            return; // تخطي إذا كان ID مكرر
                        }
                        if (place.name && seenLocationNames.has(place.name.trim())) {
                            return; // تخطي إذا كان الاسم مكرر
                        }

                        seenLocationIds.add(place.id);
                        if (place.name) {
                            seenLocationNames.add(place.name.trim());
                        }

                        const option = document.createElement('option');
                        option.value = place.id;
                        option.textContent = place.name || place.id;
                        locationSelect.appendChild(option);
                    });

                    // استعادة القيمة المحددة إذا كانت موجودة
                    if (currentLocationValue && locationSelect.querySelector(`option[value="${currentLocationValue}"]`)) {
                        locationSelect.value = currentLocationValue;
                    }
                }
            };

            // إضافة مستمع لتغيير المصنع
            factorySelect.addEventListener('change', updateLocationOptions);

            // تحديث المواقع الفرعية عند التحميل الأولي
            updateLocationOptions();
        } else if (locationSelect) {
            // إذا لم يكن هناك حقل مصنع، قم بتحميل جميع المواقع مع إزالة التكرارات
            const sites = this.getSiteOptions();
            const seenLocationIds = new Set();
            const seenLocationNames = new Set();

            // إزالة الخيارات الموجودة مسبقاً (باستثناء الخيار الافتراضي)
            const defaultLocationOption = locationSelect.querySelector('option[value=""]');
            locationSelect.innerHTML = '';
            if (defaultLocationOption) {
                locationSelect.appendChild(defaultLocationOption);
            }

            sites.forEach(site => {
                const places = this.getPlaceOptions(site.id);
                places.forEach(place => {
                    // التحقق من عدم تكرار ID أو الاسم
                    if (!place.id || seenLocationIds.has(place.id)) {
                        return; // تخطي إذا كان ID مكرر
                    }
                    if (place.name && seenLocationNames.has(place.name.trim())) {
                        return; // تخطي إذا كان الاسم مكرر
                    }

                    seenLocationIds.add(place.id);
                    if (place.name) {
                        seenLocationNames.add(place.name.trim());
                    }

                    const option = document.createElement('option');
                    option.value = place.id;
                    option.textContent = `${site.name} - ${place.name}`;
                    locationSelect.appendChild(option);
                });
            });
        }
    },

    loadInvestigationFormData(incident) {
        // Load data from incident if available
        setTimeout(() => {
            // معالجة investigation - تحويل من JSON string إلى object إذا لزم الأمر
            let investigation = incident.investigation;
            if (investigation && typeof investigation === 'string') {
                try {
                    investigation = JSON.parse(investigation);
                } catch (e) {
                    Utils.safeWarn('خطأ في تحليل investigation:', e);
                    investigation = {};
                }
            }

            if (investigation) {
                const inv = investigation;

                // Set factory and location if available
                if (inv.factoryId) {
                    const factorySelect = document.querySelector('#investigation-factory');
                    if (factorySelect) {
                        // التحقق من وجود الخيار في القائمة
                        const matchingOption = Array.from(factorySelect.options).find(opt => opt.value === inv.factoryId);
                        if (matchingOption) {
                            factorySelect.value = inv.factoryId;
                            // Trigger change event to update dependent fields (location options)
                            factorySelect.dispatchEvent(new Event('change', { bubbles: true }));

                            // انتظار قليل لضمان تحديث خيارات الموقع الفرعي
                            setTimeout(() => {
                                if (inv.locationId) {
                                    const locationSelect = document.querySelector('#investigation-location');
                                    if (locationSelect) {
                                        // البحث عن الخيار المطابق في القائمة المحدثة
                                        const locationOption = Array.from(locationSelect.options).find(opt => opt.value === inv.locationId);
                                        if (locationOption) {
                                            locationSelect.value = inv.locationId;
                                        }
                                    }
                                }
                            }, 100);
                        }
                    }
                } else if (inv.locationId) {
                    // إذا لم يكن هناك factoryId، حاول تعيين الموقع مباشرة
                    const locationSelect = document.querySelector('#investigation-location');
                    if (locationSelect) {
                        const locationOption = Array.from(locationSelect.options).find(opt => opt.value === inv.locationId);
                        if (locationOption) {
                            locationSelect.value = inv.locationId;
                        }
                    }
                }
            } else if (incident.siteId) {
                // If no investigation data, try to pre-fill from incident data
                const factorySelect = document.querySelector('#investigation-factory');
                const locationSelect = document.querySelector('#investigation-location');

                if (factorySelect && incident.siteId) {
                    // البحث عن الخيار المطابق في القائمة (بدون تكرار)
                    const matchingOption = Array.from(factorySelect.options).find(opt =>
                        opt.value === incident.siteId ||
                        (incident.siteName && opt.text.trim() === incident.siteName.trim()) ||
                        (incident.location && opt.text.trim() === incident.location.trim())
                    );
                    if (matchingOption) {
                        factorySelect.value = matchingOption.value;
                        // Trigger change event to update location options
                        factorySelect.dispatchEvent(new Event('change', { bubbles: true }));

                        // انتظار قليل لضمان تحديث خيارات الموقع الفرعي
                        setTimeout(() => {
                            if (locationSelect && incident.sublocationId) {
                                // البحث عن الخيار المطابق في القائمة المحدثة (بدون تكرار)
                                const locationMatchingOption = Array.from(locationSelect.options).find(opt =>
                                    opt.value === incident.sublocationId ||
                                    (incident.sublocationName && opt.text.trim() === incident.sublocationName.trim()) ||
                                    (incident.sublocation && opt.text.trim() === incident.sublocation.trim())
                                );
                                if (locationMatchingOption) {
                                    locationSelect.value = locationMatchingOption.value;
                                }
                            }
                        }, 100);
                    }
                } else if (locationSelect && incident.sublocationId) {
                    // إذا لم يكن هناك factorySelect، حاول تعيين الموقع مباشرة
                    const locationMatchingOption = Array.from(locationSelect.options).find(opt =>
                        opt.value === incident.sublocationId ||
                        (incident.sublocationName && opt.text.trim() === incident.sublocationName.trim()) ||
                        (incident.sublocation && opt.text.trim() === incident.sublocation.trim())
                    );
                    if (locationMatchingOption) {
                        locationSelect.value = locationMatchingOption.value;
                    }
                }
            }

            // Load affiliation from notification if available
            if (investigation) {
                const inv = investigation;
                const affectedAffiliationEl = document.querySelector('#investigation-affected-affiliation');
                if (affectedAffiliationEl) {
                    if (inv.affectedAffiliation) {
                        affectedAffiliationEl.value = inv.affectedAffiliation;
                    } else if (incident.affiliation) {
                        // Link affiliation from notification to investigation
                        affectedAffiliationEl.value = incident.affiliation;
                    }
                }
            } else if (incident.affiliation) {
                // If no investigation data, load affiliation from incident
                const affectedAffiliationEl = document.querySelector('#investigation-affected-affiliation');
                if (affectedAffiliationEl) {
                    affectedAffiliationEl.value = incident.affiliation;
                }
            }

            const modalEl = document.getElementById('investigation-form')?.closest('.modal-overlay') || document.querySelector('.modal-overlay');
            if (modalEl) {
                if (investigation) {
                    const inv = investigation;
                    const setVal = (sel, val) => {
                        const el = modalEl.querySelector(sel);
                        if (el && val != null && val !== '') el.value = val;
                    };
                    setVal('#investigation-affected-employee-code', inv.affectedEmployeeCode);
                    setVal('#investigation-affected-name', inv.affectedName);
                    setVal('#investigation-affected-job', inv.affectedJob);
                    setVal('#investigation-affected-age', inv.affectedAge);
                    if (inv.affectedAffiliation === 'contractor') {
                        const contractorSelect = modalEl.querySelector('#investigation-affected-contractor-select');
                        if (contractorSelect) {
                            contractorSelect.innerHTML = this.buildInvestigationAffectedContractorSelectOptions(inv.affectedDepartment || '');
                        }
                    } else {
                        setVal('#investigation-affected-department', inv.affectedDepartment);
                    }
                }
                this.updateInvestigationAffectedAffiliationUI(modalEl);
                this._populateInvestigationFormFields(modalEl, incident, investigation);
            }
        }, 300);
    },

    async handleInvestigationSubmit(incidentId) {
        const modal = document.querySelector('.modal-overlay');
        if (!modal) return;
        if (this._investigationSubmitting) return;

        // فحص العناصر قبل الاستخدام
        const investigationNumberEl = document.getElementById('investigation-number');
        const investigationDateTimeEl = document.getElementById('investigation-datetime');
        const incidentDateTimeEl = document.getElementById('incident-datetime');
        const factoryEl = document.getElementById('investigation-factory');
        const locationEl = document.getElementById('investigation-location');
        const descriptionEl = document.getElementById('investigation-description');
        const nearmissDescriptionEl = document.getElementById('investigation-nearmiss-description');
        const affectedAffiliationEl = document.getElementById('investigation-affected-affiliation');
        const affectedEmployeeCodeEl = document.getElementById('investigation-affected-employee-code');
        const affectedNameEl = document.getElementById('investigation-affected-name');
        const affectedJobEl = document.getElementById('investigation-affected-job');
        const affectedAgeEl = document.getElementById('investigation-affected-age');
        const affectedDepartmentEl = document.getElementById('investigation-affected-department');
        const unsafeBehaviorEl = document.getElementById('investigation-unsafe-behavior');
        const unsafeConditionEl = document.getElementById('investigation-unsafe-condition');
        const riskProbabilityEl = document.getElementById('investigation-risk-probability');
        const riskSeverityEl = document.getElementById('investigation-risk-severity');
        const riskLevelEl = document.getElementById('investigation-risk-level');
        const riskResultEl = document.getElementById('investigation-risk-result');
        const riskExplanationEl = document.getElementById('investigation-risk-explanation');
        const signatureAreaManagerEl = document.getElementById('investigation-signature-area-manager');
        const signatureAreaManagerDateEl = document.getElementById('investigation-signature-area-manager-date');
        const signatureSafetyManagerEl = document.getElementById('investigation-signature-safety-manager');
        const signatureSafetyManagerDateEl = document.getElementById('investigation-signature-safety-manager-date');
        const signatureSafetyDirectorEl = document.getElementById('investigation-signature-safety-director');
        const signatureSafetyDirectorDateEl = document.getElementById('investigation-signature-safety-director-date');

        if (!investigationNumberEl || !investigationDateTimeEl || !incidentDateTimeEl || !factoryEl ||
            !locationEl || !descriptionEl || !affectedAffiliationEl || !affectedNameEl ||
            !affectedJobEl || !affectedAgeEl || !affectedDepartmentEl || !unsafeBehaviorEl ||
            !unsafeConditionEl || !riskProbabilityEl || !riskSeverityEl || !riskLevelEl ||
            !riskResultEl || !riskExplanationEl || !signatureAreaManagerEl || !signatureAreaManagerDateEl ||
            !signatureSafetyManagerEl || !signatureSafetyManagerDateEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        // Collect form data
        // ✅ إصلاح: تحويل datetime-local إلى ISO بشكل صحيح
        const investigationData = {
            investigationNumber: investigationNumberEl.value,
            investigationDateTime: Utils.dateTimeLocalToISO(investigationDateTimeEl.value) || investigationDateTimeEl.value,
            incidentDateTime: Utils.dateTimeLocalToISO(incidentDateTimeEl.value) || incidentDateTimeEl.value,
            factoryId: factoryEl.value,
            factoryName: factoryEl.options[factoryEl.selectedIndex]?.text || '',
            locationId: locationEl.value,
            locationName: locationEl.options[locationEl.selectedIndex]?.text || '',

            // Incident types
            incidentTypes: [],

            // Description
            description: descriptionEl.value,
            nearmissDescription: nearmissDescriptionEl?.value || '',

            // Affected person
            affectedAffiliation: affectedAffiliationEl.value,
            affectedEmployeeCode: affectedEmployeeCodeEl?.value?.trim() || '',
            affectedName: affectedNameEl.value,
            affectedJob: affectedJobEl.value,
            affectedAge: affectedAgeEl.value,
            affectedDepartment: this._resolveInvestigationAffectedDepartment(modal),
            injuredPart: document.getElementById('investigation-injured-part')?.value?.trim() || '',
            equipmentCause: document.getElementById('investigation-equipment-cause')?.value?.trim() || '',

            // Investigator section
            unsafeBehavior: unsafeBehaviorEl.value,
            unsafeCondition: unsafeConditionEl.value,
            riskProbability: parseInt(riskProbabilityEl.value) || 0,
            riskSeverity: parseInt(riskSeverityEl.value) || 0,
            riskLevel: riskLevelEl.value,
            riskResult: riskResultEl.value,
            riskExplanation: riskExplanationEl.value,

            // Action plan
            actionPlan: this.collectInvestigationActionPlan(),

            // Signatures
            signatureAreaManager: {
                name: signatureAreaManagerEl.value,
                date: signatureAreaManagerDateEl.value,
                signature: '' // Note: Signature capture feature can be added in future updates
            },
            signatureSafetyManager: {
                name: signatureSafetyManagerEl.value,
                date: signatureSafetyManagerDateEl.value,
                signature: '' // Note: Signature capture feature can be added in future updates
            },
            signatureSafetyDirector: {
                name: signatureSafetyDirectorEl?.value || '',
                date: signatureSafetyDirectorDateEl?.value || '',
                signature: '' // Note: Signature capture feature can be added in future updates
            },

            updatedAt: new Date().toISOString(),
            updatedBy: AppState.currentUser ? {
                id: AppState.currentUser.id || '',
                name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                email: AppState.currentUser.email || ''
            } : null,
            investigationStatus: 'مكتمل',
            completedAt: new Date().toISOString()
        };

        // Collect incident types
        if (document.getElementById('incident-type-nearmiss')?.checked) investigationData.incidentTypes.push('nearmiss');
        if (document.getElementById('incident-type-property')?.checked) investigationData.incidentTypes.push('property');
        if (document.getElementById('incident-type-injury-no-lost')?.checked) investigationData.incidentTypes.push('injury-no-lost');
        if (document.getElementById('incident-type-injury-lost')?.checked) investigationData.incidentTypes.push('injury-lost');
        if (document.getElementById('incident-type-fatality')?.checked) investigationData.incidentTypes.push('fatality');

        // جمع بيانات تحليل السبب الجذري
        const rcaContainer = document.getElementById('investigation-rca-wizard');
        if (rcaContainer && typeof InvestigationRCA !== 'undefined') {
            const rcaData = InvestigationRCA.collect(rcaContainer);
            if (rcaData && (rcaData.method || Object.keys(rcaData.stepsData || {}).length)) {
                investigationData.rca = InvestigationRCA.normalizeRcaForExport(rcaData) || rcaData;
            }
        }

        // Validation
        if (!investigationData.investigationDateTime || !investigationData.incidentDateTime ||
            !investigationData.factoryId || !investigationData.locationId || !investigationData.description) {
            Notification.error('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        if (investigationData.affectedAffiliation === 'company' && !investigationData.affectedEmployeeCode) {
            Notification.error('يرجى إدخال كود الموظف عند اختيار تبعية «شركة»');
            return;
        }
        if (investigationData.affectedAffiliation === 'contractor' && !investigationData.affectedDepartment) {
            Notification.error('يرجى اختيار المقاول من القائمة');
            return;
        }

        Loading.show('جاري حفظ التحقيق...');
        try {
            this._investigationSubmitting = true;
            // Update incident with investigation data
            const incident = AppState.appData.incidents.find(i => i.id === incidentId);
            if (incident) {
                // معالجة investigation القديم - تحويل من JSON string إلى object إذا لزم الأمر
                if (incident.investigation && typeof incident.investigation === 'string') {
                    try {
                        incident.investigation = JSON.parse(incident.investigation);
                    } catch (e) {
                        Utils.safeWarn('خطأ في تحليل investigation القديم:', e);
                        incident.investigation = {};
                    }
                }

                // دمج بيانات التحقيق الجديدة مع القديمة (إن وجدت)
                incident.investigation = { ...(incident.investigation || {}), ...investigationData };
                this._applyInvestigationToIncident(incident, incident.investigation);

                if (investigationData.rca?.rootCauseSummary) {
                    incident.rootCause = investigationData.rca.rootCauseSummary;
                }
                if (!investigationData.riskExplanation && investigationData.rca?.rootCauseSummary) {
                    incident.investigation.riskExplanation = investigationData.rca.rootCauseSummary;
                }

                incident.updatedAt = new Date().toISOString();

                // التحقق من صلاحيات المستخدم
                const isAdmin = this.isAdmin();

                // التحقق من صلاحية مسئول السلامة
                const isSafetyOfficer = AppState.currentUser?.role === 'safety_officer' ||
                    (AppState.currentUser?.permissions &&
                        AppState.currentUser.permissions['incidents-complete-investigation'] === true);

                // تحديث حالة الحادث:
                // - إذا كان مسئول السلامة: يحتاج موافقة مدير النظام
                const alreadyApproved = !!(incident.approvedAt || this._resolveIncidentApproverInfo(incident.approvedBy).raw)
                    && !this._coerceIncidentBoolean(incident.requiresApproval);

                this._resolveIncidentStatusAfterInvestigationSave(incident, {
                    isAdmin,
                    isSafetyOfficer,
                    alreadyApproved
                });

                // Save data
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }

                await this.persistIncidentToServer(incident, { syncRegistry: true, silent: true });

                Loading.hide();
                
                // رسالة مختلفة حسب نوع المستخدم
                if (!isAdmin && isSafetyOfficer) {
                    Notification.success('تم حفظ التحقيق بنجاح. سيتم مراجعته من قبل مدير النظام للموافقة.');
                } else {
                    Notification.success('تم حفظ التحقيق بنجاح');
                }

                this._closeInvestigationModal();
                await this._refreshIncidentsViewsAfterUpdate(incidentId);
            } else {
                throw new Error('الحادث غير موجود');
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في حفظ التحقيق:', error);
            Notification.error('حدث خطأ: ' + error.message);
        } finally {
            this._investigationSubmitting = false;
        }
    },

    collectInvestigationActionPlan() {
        const actionPlan = [];
        const rows = document.querySelectorAll('#investigation-action-plan-body tr');

        rows.forEach((row) => {
            const correctiveAction = row.querySelector('.inv-ap-corrective')?.value?.trim() || '';
            const plannedDate = row.querySelector('.inv-ap-planned-date')?.value || '';
            const responsibleName = row.querySelector('.inv-ap-responsible-name')?.value?.trim() || '';
            const responsibleDepartment = row.querySelector('.inv-ap-responsible-dept')?.value?.trim() || '';
            const responsibleDate = row.querySelector('.inv-ap-responsible-date')?.value || '';
            const followUpName = row.querySelector('.inv-ap-follow-name')?.value?.trim() || '';
            const followUpDepartment = row.querySelector('.inv-ap-follow-dept')?.value?.trim() || '';
            const followUpDate = row.querySelector('.inv-ap-follow-date')?.value || '';

            if (correctiveAction || plannedDate || responsibleName || followUpName) {
                actionPlan.push({
                    correctiveAction,
                    plannedDate,
                    responsibleName,
                    responsibleDepartment,
                    responsibleDate,
                    followUpName,
                    followUpDepartment,
                    followUpDate
                });
            }
        });

        return actionPlan;
    },

    addInvestigationActionPlanRow(data = {}) {
        const tbody = document.getElementById('investigation-action-plan-body');
        if (!tbody) {
            Notification.error('جدول خطة العمل غير موجود');
            return;
        }

        const rowIndex = tbody.querySelectorAll('tr').length;
        const temp = document.createElement('tbody');
        temp.innerHTML = this._buildInvestigationActionPlanRowHtml(data, rowIndex);
        const newRow = temp.querySelector('tr');
        if (newRow) {
            tbody.appendChild(newRow);
            this.setupInvestigationActionPlanRowPickers(newRow);
        }
    },

    // جمع بيانات نموذج التحقيق للطباعة/التصدير
    getInvestigationFormData() {
        const modal = document.querySelector('.modal-overlay');
        if (!modal) {
            return null;
        }

        const investigationNumberEl = document.getElementById('investigation-number');
        const investigationDateTimeEl = document.getElementById('investigation-datetime');
        const incidentDateTimeEl = document.getElementById('incident-datetime');
        const factoryEl = document.getElementById('investigation-factory');
        const locationEl = document.getElementById('investigation-location');
        const descriptionEl = document.getElementById('investigation-description');
        const nearmissDescriptionEl = document.getElementById('investigation-nearmiss-description');
        const affectedAffiliationEl = document.getElementById('investigation-affected-affiliation');
        const affectedEmployeeCodeEl = document.getElementById('investigation-affected-employee-code');
        const affectedNameEl = document.getElementById('investigation-affected-name');
        const affectedJobEl = document.getElementById('investigation-affected-job');
        const affectedAgeEl = document.getElementById('investigation-affected-age');
        const affectedDepartmentEl = document.getElementById('investigation-affected-department');
        const unsafeBehaviorEl = document.getElementById('investigation-unsafe-behavior');
        const unsafeConditionEl = document.getElementById('investigation-unsafe-condition');
        const riskProbabilityEl = document.getElementById('investigation-risk-probability');
        const riskSeverityEl = document.getElementById('investigation-risk-severity');
        const riskLevelEl = document.getElementById('investigation-risk-level');
        const riskResultEl = document.getElementById('investigation-risk-result');
        const riskExplanationEl = document.getElementById('investigation-risk-explanation');
        const signatureAreaManagerEl = document.getElementById('investigation-signature-area-manager');
        const signatureAreaManagerDateEl = document.getElementById('investigation-signature-area-manager-date');
        const signatureSafetyManagerEl = document.getElementById('investigation-signature-safety-manager');
        const signatureSafetyManagerDateEl = document.getElementById('investigation-signature-safety-manager-date');
        const signatureSafetyDirectorEl = document.getElementById('investigation-signature-safety-director');
        const signatureSafetyDirectorDateEl = document.getElementById('investigation-signature-safety-director-date');

        if (!investigationNumberEl || !investigationDateTimeEl || !incidentDateTimeEl || !factoryEl ||
            !locationEl || !descriptionEl || !affectedAffiliationEl || !affectedNameEl ||
            !affectedJobEl || !affectedAgeEl || !affectedDepartmentEl || !unsafeBehaviorEl ||
            !unsafeConditionEl || !riskProbabilityEl || !riskSeverityEl || !riskLevelEl ||
            !riskResultEl || !riskExplanationEl || !signatureAreaManagerEl || !signatureAreaManagerDateEl ||
            !signatureSafetyManagerEl || !signatureSafetyManagerDateEl) {
            return null;
        }

        // Collect incident types
        const incidentTypes = [];
        if (document.getElementById('incident-type-nearmiss')?.checked) incidentTypes.push('nearmiss');
        if (document.getElementById('incident-type-property')?.checked) incidentTypes.push('property');
        if (document.getElementById('incident-type-injury-no-lost')?.checked) incidentTypes.push('injury-no-lost');
        if (document.getElementById('incident-type-injury-lost')?.checked) incidentTypes.push('injury-lost');
        if (document.getElementById('incident-type-fatality')?.checked) incidentTypes.push('fatality');

        const formData = {
            investigationNumber: investigationNumberEl.value,
            investigationDateTime: Utils.dateTimeLocalToISO(investigationDateTimeEl.value) || investigationDateTimeEl.value,
            incidentDateTime: Utils.dateTimeLocalToISO(incidentDateTimeEl.value) || incidentDateTimeEl.value,
            factoryId: factoryEl.value,
            factoryName: factoryEl.options[factoryEl.selectedIndex]?.text || '',
            locationId: locationEl.value,
            locationName: locationEl.options[locationEl.selectedIndex]?.text || '',
            incidentTypes: incidentTypes,
            description: descriptionEl.value,
            nearmissDescription: nearmissDescriptionEl?.value || '',
            affectedAffiliation: affectedAffiliationEl.value,
            affectedEmployeeCode: affectedEmployeeCodeEl?.value?.trim() || '',
            affectedName: affectedNameEl.value,
            affectedJob: affectedJobEl.value,
            affectedAge: affectedAgeEl.value,
            affectedDepartment: this._resolveInvestigationAffectedDepartment(document.querySelector('.modal-overlay')),
            injuredPart: document.getElementById('investigation-injured-part')?.value?.trim() || '',
            equipmentCause: document.getElementById('investigation-equipment-cause')?.value?.trim() || '',
            unsafeBehavior: unsafeBehaviorEl.value,
            unsafeCondition: unsafeConditionEl.value,
            riskProbability: parseInt(riskProbabilityEl.value) || 0,
            riskSeverity: parseInt(riskSeverityEl.value) || 0,
            riskLevel: riskLevelEl.value,
            riskResult: riskResultEl.value,
            riskExplanation: riskExplanationEl.value,
            actionPlan: this.collectInvestigationActionPlan(),
            signatureAreaManager: {
                name: signatureAreaManagerEl.value,
                date: signatureAreaManagerDateEl.value
            },
            signatureSafetyManager: {
                name: signatureSafetyManagerEl.value,
                date: signatureSafetyManagerDateEl.value
            },
            signatureSafetyDirector: {
                name: signatureSafetyDirectorEl?.value || '',
                date: signatureSafetyDirectorDateEl?.value || ''
            }
        };

        const liveRca = this._collectInvestigationRcaData();
        if (liveRca && (liveRca.method || Object.keys(liveRca.stepsData || {}).length)) {
            formData.rca = typeof InvestigationRCA !== 'undefined'
                ? (InvestigationRCA.normalizeRcaForExport(liveRca) || liveRca)
                : liveRca;
        }

        return formData;
    },

    // طباعة نموذج التحقيق
    printInvestigation(incidentId) {
        try {
            const { incident, investigationData } = this._resolveInvestigationDataForExport(incidentId);
            if (!incident) {
                Notification.error('الحادث غير موجود');
                return;
            }
            if (!investigationData.investigationNumber && !investigationData.description) {
                Notification.warning('لا توجد بيانات تحقيق للطباعة');
                return;
            }

            Loading.show('جاري إعداد الطباعة...');
            const htmlContent = this._buildInvestigationReportHtml(incident, investigationData);
            this._openIncidentPrintableHtml(htmlContent, 'تم تجهيز التقرير للطباعة');
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في طباعة التحقيق:', error);
            Notification.error('فشل الطباعة: ' + error.message);
        }
    },

    // تصدير نموذج التحقيق إلى PDF — تحميل مباشر
    async exportInvestigationPDF(incidentId) {
        await this._exportInvestigationReportPdf(incidentId);
    },

    _getInvestigationFormPrintStyles() {
        return `
            <style>
                .inv-print-wrap { direction: rtl; text-align: right; font-family: 'Cairo', 'Tahoma', Arial, sans-serif; width: 100%; max-width: 100%; box-sizing: border-box; }
                .inv-print-section {
                    border-radius: 12px;
                    padding: 20px 24px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 2px solid;
                    width: 100%;
                    max-width: 100%;
                    box-sizing: border-box;
                }
                .inv-print-section h3 {
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 16px;
                    padding-bottom: 10px;
                    border-bottom: 3px solid;
                }
                .inv-s1 { background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-color: #2196F3; }
                .inv-s1 h3 { color: #1565C0; border-color: #2196F3; }
                .inv-s2 { background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-color: #9C27B0; }
                .inv-s2 h3 { color: #6A1B9A; border-color: #9C27B0; }
                .inv-s3 { background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-color: #FF9800; }
                .inv-s3 h3 { color: #E65100; border-color: #FF9800; }
                .inv-s4 { background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-color: #E91E63; }
                .inv-s4 h3 { color: #AD1457; border-color: #E91E63; }
                .inv-s5 { background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%); border-color: #009688; }
                .inv-s5 h3 { color: #00695C; border-color: #009688; }
                .inv-s6 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-color: #4CAF50; }
                .inv-s6 h3 { color: #2E7D32; border-color: #4CAF50; }
                .inv-s7 { background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%); border-color: #FFC107; }
                .inv-s7 h3 { color: #F57F17; border-color: #FFC107; }
                .inv-s-rca { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-color: #7c3aed; }
                .inv-s-rca h3 { color: #5b21b6; border-color: #7c3aed; }
                ${typeof InvestigationRCA !== 'undefined' && InvestigationRCA.getPrintStyles ? InvestigationRCA.getPrintStyles() : ''}
                .inv-field-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 14px 16px;
                }
                .inv-field-label {
                    font-size: 12px;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 6px;
                }
                .inv-field-value {
                    padding: 10px 12px;
                    background: #fff;
                    border-radius: 8px;
                    font-weight: 500;
                    min-height: 20px;
                }
                .inv-type-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 10px;
                }
                .inv-type-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 12px;
                    background: #fff;
                    border: 2px solid #9C27B0;
                    border-radius: 8px;
                    font-weight: 600;
                    color: #374151;
                }
                .inv-type-item.checked { background: #f3e5f5; }
                .inv-type-box {
                    width: 18px;
                    height: 18px;
                    border: 2px solid #9C27B0;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: 800;
                    color: #7B1FA2;
                    flex-shrink: 0;
                }
                .inv-text-panel {
                    padding: 14px;
                    background: #fff;
                    border: 2px solid;
                    border-radius: 8px;
                    white-space: pre-wrap;
                    line-height: 1.7;
                }
                .inv-inner-white {
                    background: #fff;
                    padding: 14px;
                    border: 2px solid;
                    border-radius: 10px;
                }
                .inv-sig-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 14px;
                }
                .inv-sig-box {
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    padding: 8px;
                    min-height: 64px;
                    background: #f9fafb;
                    text-align: center;
                }
                .inv-sig-box img { max-height: 56px; max-width: 100%; }
            </style>
        `;
    },

    _buildInvestigationFormPrintField(label, value, borderColor = '#2196F3', highlight = false) {
        const bg = highlight ? 'background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%); font-weight: 700; color: #0D47A1;' : '';
        return `
            <div>
                <div class="inv-field-label">${Utils.escapeHTML(label)}</div>
                <div class="inv-field-value" style="border: 2px solid ${borderColor}; ${bg}">${value || '—'}</div>
            </div>
        `;
    },

    _buildInvestigationFormPrintSection(sectionClass, num, title, innerHtml) {
        return `
            <div class="inv-print-section ${sectionClass}">
                <h3>${num}) ${Utils.escapeHTML(title)}</h3>
                ${innerHtml}
            </div>
        `;
    },

    // بناء محتوى HTML للطباعة — مطابق لنموذج التحقيق في الحادث
    buildInvestigationPrintContent(incident, investigationData, opts = {}) {
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            try {
                const date = new Date(dateStr);
                return date.toLocaleString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch {
                return String(dateStr);
            }
        };

        const formatDateOnly = (dateStr) => {
            if (!dateStr) return '';
            try {
                return new Date(dateStr).toLocaleDateString('ar-SA');
            } catch {
                return String(dateStr);
            }
        };

        const esc = (v) => Utils.escapeHTML(String(v ?? ''));
        const incidentTypeOptions = [
            { key: 'nearmiss', label: 'حادث وشيك' },
            { key: 'property', label: 'تلف ممتلكات' },
            { key: 'injury-no-lost', label: 'إصابة بدون فقد أيام عمل' },
            { key: 'injury-lost', label: 'إصابة مع فقد أيام عمل' },
            { key: 'fatality', label: 'وفاة' }
        ];
        const selectedTypes = Array.isArray(investigationData.incidentTypes) ? investigationData.incidentTypes : [];

        const affiliationNames = {
            company: 'شركة',
            'daily-labor': 'عمالة يومية',
            contractor: 'مقاول',
            visitor: 'زائر',
            none: 'لا يوجد'
        };
        const yesNoNames = { yes: 'نعم', no: 'لا' };
        const riskResultNames = { low: 'منخفض', medium: 'متوسط', high: 'عالي' };
        const methodologyMeta = this._getInvestigationMethodologyMeta(investigationData);
        const methodologyDisplay = methodologyMeta.hasMethod
            ? `${methodologyMeta.label}${methodologyMeta.reference ? ` (${methodologyMeta.reference})` : ''}`
            : '—';

        const section1 = this._buildInvestigationFormPrintSection('inv-s1', '1', 'بيانات الحادث الأساسية', `
            <div class="inv-field-grid">
                ${this._buildInvestigationFormPrintField('تاريخ ووقت التحقيق', formatDate(investigationData.investigationDateTime), '#2196F3')}
                ${this._buildInvestigationFormPrintField('تاريخ ووقت الحادث', formatDate(investigationData.incidentDateTime), '#2196F3')}
                ${this._buildInvestigationFormPrintField('المصنع', esc(investigationData.factoryName || 'غير محدد'), '#2196F3')}
                ${this._buildInvestigationFormPrintField('موقع الحادث بالضبط', esc(investigationData.locationName || 'غير محدد'), '#2196F3')}
                ${this._buildInvestigationFormPrintField('رقم التحقيق', esc(investigationData.investigationNumber || '—'), '#1976D2', true)}
                ${incident.isoCode ? this._buildInvestigationFormPrintField('كود الحادث', esc(incident.isoCode), '#2196F3') : ''}
                ${this._buildInvestigationFormPrintField('منهجية تحليل السبب الجذري', esc(methodologyDisplay), '#7c3aed', methodologyMeta.hasMethod)}
            </div>
        `);

        const typeItems = incidentTypeOptions.map((type) => {
            const checked = selectedTypes.includes(type.key);
            return `
                <div class="inv-type-item${checked ? ' checked' : ''}">
                    <div class="inv-type-box">${checked ? '✓' : ''}</div>
                    <span>${esc(type.label)}</span>
                </div>
            `;
        }).join('');

        const section2 = this._buildInvestigationFormPrintSection('inv-s2', '2', 'نوع الحادث', `
            <div class="inv-type-grid">${typeItems}</div>
        `);

        const section3 = this._buildInvestigationFormPrintSection('inv-s3', '3', 'وصف وقائع وظروف الحادث', `
            <div style="margin-bottom: 14px;">
                <div class="inv-field-label">الوصف الرئيسي</div>
                <div class="inv-text-panel" style="border-color:#FF9800;">${esc(investigationData.description || 'غير محدد')}</div>
                </div>
            ${(selectedTypes.includes('nearmiss') || investigationData.nearmissDescription) ? `
            <div>
                <div class="inv-field-label">وصف الحالة الوشيكة</div>
                <div class="inv-text-panel" style="border-color:#FF9800;">${esc(investigationData.nearmissDescription || '—')}</div>
            </div>
            ` : ''}
        `);

        const isCompanyAff = investigationData.affectedAffiliation === 'company';
        const isContractorAff = investigationData.affectedAffiliation === 'contractor';
        const deptPrintLabel = isCompanyAff ? 'الإدارة / القسم' : 'الجهة التابع لها';
        const section4 = this._buildInvestigationFormPrintSection('inv-s4', '4', 'بيانات المصاب', `
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
                ${this._buildInvestigationFormPrintField('تبعية المصاب', affiliationNames[investigationData.affectedAffiliation] || investigationData.affectedAffiliation || '—', '#E91E63')}
                ${isCompanyAff ? this._buildInvestigationFormPrintField('كود الموظف', esc(investigationData.affectedEmployeeCode || '—'), '#E91E63') : ''}
                ${isContractorAff ? this._buildInvestigationFormPrintField('المقاول', esc(investigationData.affectedDepartment || '—'), '#E91E63') : ''}
                ${this._buildInvestigationFormPrintField('الاسم', esc(investigationData.affectedName || '—'), '#E91E63')}
                ${this._buildInvestigationFormPrintField('الوظيفة', esc(investigationData.affectedJob || '—'), '#E91E63')}
                ${this._buildInvestigationFormPrintField('السن', esc(investigationData.affectedAge || '—'), '#E91E63')}
                ${this._buildInvestigationFormPrintField('الأطراف / الجزء المتضرر', esc(investigationData.injuredPart || this.resolveIncidentInjuredPart(incident) || '—'), '#E91E63')}
                ${this._buildInvestigationFormPrintField('المعدة المتسببة في الإصابة', esc(investigationData.equipmentCause || incident.equipmentCause || '—'), '#E91E63')}
                </div>
            ${!isContractorAff ? `
            <div style="margin-top:14px;">
                ${this._buildInvestigationFormPrintField(deptPrintLabel, esc(investigationData.affectedDepartment || '—'), '#E91E63')}
                </div>
            ` : ''}
        `);

        const riskMatrixHtml = typeof RiskMatrix !== 'undefined'
            ? RiskMatrix.generate(`inv-print-risk-${Date.now()}`, {
                selectedLikelihood: investigationData.riskProbability ? parseInt(investigationData.riskProbability, 10) : null,
                selectedConsequence: investigationData.riskSeverity ? parseInt(investigationData.riskSeverity, 10) : null,
                interactive: false
            })
            : '';

        const section5 = this._buildInvestigationFormPrintSection('inv-s5', '5', 'الجزء الخاص بالمحقق', `
            <div class="inv-field-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 14px;">
                ${this._buildInvestigationFormPrintField('سلوك غير آمن', yesNoNames[investigationData.unsafeBehavior] || investigationData.unsafeBehavior || '—', '#009688')}
                ${this._buildInvestigationFormPrintField('وضع غير آمن', yesNoNames[investigationData.unsafeCondition] || investigationData.unsafeCondition || '—', '#009688')}
                    </div>
            ${riskMatrixHtml ? `
            <div style="margin-bottom: 14px;">
                <div class="inv-field-label">مصفوفة تقييم المخاطر</div>
                <div class="inv-inner-white" style="border-color:#14b8a6;">${riskMatrixHtml}</div>
                </div>
                ` : ''}
            <div class="inv-field-grid" style="grid-template-columns: 1fr; gap: 14px;">
                ${this._buildInvestigationFormPrintField(
                    'نتيجة التقييم',
                    riskResultNames[investigationData.riskResult] || investigationData.riskResult || investigationData.riskLevel || '—',
                    '#14b8a6'
                )}
            </div>
            <div style="margin-top:14px;">
                <div class="inv-field-label">شرح الخطر</div>
                <div class="inv-text-panel" style="border-color:#14b8a6; background:#f0fdfa;">${esc(investigationData.riskExplanation || '—')}</div>
                </div>
        `);

        const sectionRca = this._buildInvestigationRcaPrintSection(investigationData, incident, esc, { includeRcaStyles: false });

        const actionPlan = Array.isArray(investigationData.actionPlan) ? investigationData.actionPlan : [];
        const actionRowsCount = Math.max(3, actionPlan.length);
        const actionRows = Array.from({ length: actionRowsCount }, (_, i) => {
            const action = actionPlan[i] || {};
            return `
                <tr style="border-bottom: 1px solid #c8e6c9;">
                    <td style="padding: 12px; border: 1px solid #c8e6c9; vertical-align: top;">${esc(action.correctiveAction || '')}</td>
                    <td style="padding: 12px; border: 1px solid #c8e6c9; text-align: center; vertical-align: top;">${action.plannedDate ? formatDateOnly(action.plannedDate) : ''}</td>
                    <td style="padding: 12px; border: 1px solid #c8e6c9; vertical-align: top;">
                        ${esc(action.responsibleName || '')}
                        ${action.responsibleDepartment ? `<br><span style="font-size:11px;color:#64748b;">${esc(action.responsibleDepartment)}</span>` : ''}
                        ${action.responsibleDate ? `<br><span style="font-size:11px;color:#64748b;">${formatDateOnly(action.responsibleDate)}</span>` : ''}
                    </td>
                    <td style="padding: 12px; border: 1px solid #c8e6c9; vertical-align: top;">
                        ${esc(action.followUpName || '')}
                        ${action.followUpDepartment ? `<br><span style="font-size:11px;color:#64748b;">${esc(action.followUpDepartment)}</span>` : ''}
                        ${action.followUpDate ? `<br><span style="font-size:11px;color:#64748b;">${formatDateOnly(action.followUpDate)}</span>` : ''}
                        </td>
                    </tr>
            `;
        }).join('');

        const section6 = this._buildInvestigationFormPrintSection('inv-s6', '6', 'خطة العمل', `
            <div class="inv-inner-white" style="border-color:#4CAF50;">
                <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #388E3C 0%, #4CAF50 100%); color: white;">
                            <th style="padding: 12px; width: 35%; text-align: right; border: 1px solid #2E7D32;">الإجراء التصحيحي</th>
                            <th style="padding: 12px; width: 15%; text-align: center; border: 1px solid #2E7D32;">التاريخ المخطط</th>
                            <th style="padding: 12px; width: 25%; text-align: center; border: 1px solid #2E7D32;">مسئول التنفيذ</th>
                            <th style="padding: 12px; width: 25%; text-align: center; border: 1px solid #2E7D32;">المتابعة</th>
                    </tr>
                    </thead>
                    <tbody style="background:#f9fff9;">${actionRows}</tbody>
                </table>
            </div>
        `);

        const buildSigCell = (sig, label) => {
            const name = esc(sig?.name || '');
            const date = sig?.date ? formatDateOnly(sig.date) : '';
            const sigSrc = sig?.signature ? String(sig.signature).replace(/"/g, '&quot;') : '';
            const img = sigSrc
                ? `<img src="${sigSrc}" alt="توقيع">`
                : '<span style="color:#9ca3af;font-size:12px;">التوقيع</span>';
            return `
                <div>
                    <div class="inv-field-label">${esc(label)}</div>
                    <div class="inv-field-value" style="border-color:#FFC107;margin-bottom:8px;">${name || '—'}</div>
                    <div class="inv-field-value" style="border-color:#FFC107;margin-bottom:8px;">${date || '—'}</div>
                    <div class="inv-sig-box">${img}</div>
                </div>
            `;
        };

        const section7 = this._buildInvestigationFormPrintSection('inv-s7', '7', 'التوقيعات', `
            <div class="inv-sig-grid">
                ${buildSigCell(investigationData.signatureAreaManager, 'مسئول المنطقة')}
                ${buildSigCell(investigationData.signatureSafetyManager, 'مسئول السلامة والصحة')}
                ${buildSigCell(investigationData.signatureSafetyDirector, 'مدير السلامة والصحة')}
                </div>
        `);

        const wrapStyles = opts.includeStyles !== false ? this._getInvestigationFormPrintStyles() : '';

        return `
            ${wrapStyles}
            <div class="inv-print-wrap">
                ${section1}
                ${section2}
                ${section3}
                ${section4}
                ${section5}
                ${sectionRca}
                ${section6}
                ${section7}
            </div>
        `;
    },


    // ===== Safety Alert Helper Functions =====
    
    /**
     * توليد رقم تسلسلي لـ Safety Alert
     */
    generateSafetyAlertSequentialNumber() {
        const alerts = AppState.appData?.safetyAlerts || [];
        const maxNumber = alerts.reduce((max, alert) => {
            const num = parseInt(alert.sequentialNumber) || 0;
            return num > max ? num : max;
        }, 0);
        return String(maxNumber + 1).padStart(3, '0');
    },

    /**
     * التحقق من صلاحية إنشاء Safety Alert
     */
    canCreateSafetyAlert() {
        const user = AppState.currentUser;
        if (!user) return false;
        if (user.role === 'admin') return true;
        // Safety Team أو System Manager
        return user.permissions?.canCreateSafetyAlert === true || 
               user.permissions?.safetyTeam === true;
    },

    /**
     * التحقق من صلاحية اعتماد Safety Alert
     */
    canApproveSafetyAlert() {
        const user = AppState.currentUser;
        if (!user) return false;
        if (user.role === 'admin') return true;
        // System Manager فقط
        return user.permissions?.canApproveSafetyAlert === true || 
               user.role === 'system-manager';
    },

    canApproveIncident() {
        return this.isAdmin() || this.canDeleteIncident();
    },

    hasInvestigationData(incident) {
        if (!incident || !incident.investigation) return false;
        const inv = this._parseInvestigationRecord(incident);
        return !!(inv && Object.keys(inv).length > 0);
    },

    _parseInvestigationRecord(incidentOrInv) {
        let inv = incidentOrInv?.investigation !== undefined ? incidentOrInv.investigation : incidentOrInv;
        if (!inv) return null;
        if (typeof inv === 'string') {
            try { inv = JSON.parse(inv); } catch (_e) { return null; }
        }
        return inv && typeof inv === 'object' ? inv : null;
    },

    isInvestigationComplete(incident) {
        const inv = this._parseInvestigationRecord(incident);
        if (!inv) return false;
        if (inv.investigationStatus === 'مكتمل' || inv.completedAt) return true;
        return !!(
            inv.investigationNumber &&
            inv.investigationDateTime &&
            inv.incidentDateTime &&
            inv.factoryId &&
            inv.locationId &&
            inv.description &&
            inv.affectedName &&
            inv.affectedAffiliation
        );
    },

    getIncidentDisplayStatus(incident) {
        if (!incident) return '—';
        const state = this.getIncidentApprovalState(incident);
        if (state.approved) return 'مكتمل';
        if (this.isInvestigationComplete(incident)) {
            return state.awaitingApproval ? 'تحقيق منتهي' : 'مكتمل';
        }
        if (this.hasInvestigationData(incident)) return 'قيد التحقيق';
        return incident.status || 'مفتوح';
    },

    _resolveIncidentStatusAfterInvestigationSave(incident, context = {}) {
        const { isAdmin = false, isSafetyOfficer = false, alreadyApproved = false } = context;
        const inv = this._parseInvestigationRecord(incident) || {};
        inv.investigationStatus = 'مكتمل';
        inv.completedAt = new Date().toISOString();
        inv.completedBy = AppState.currentUser ? {
            id: AppState.currentUser.id || '',
            name: AppState.currentUser.name || AppState.currentUser.displayName || '',
            email: AppState.currentUser.email || ''
        } : null;
        incident.investigation = { ...inv };

        if (alreadyApproved) {
            incident.status = 'مكتمل';
            incident.requiresApproval = false;
            return;
        }

        if (isAdmin) {
            incident.status = 'مكتمل';
            incident.requiresApproval = false;
            incident.approvedBy = AppState.currentUser ? {
                id: AppState.currentUser.id || '',
                name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                email: AppState.currentUser.email || ''
            } : incident.approvedBy || null;
            incident.approvedAt = incident.approvedAt || new Date().toISOString();
            incident.rejectedBy = null;
            incident.rejectedAt = null;
            incident.rejectionReason = null;
            return;
        }

        if (isSafetyOfficer) {
            incident.status = 'في انتظار الموافقة';
            incident.requiresApproval = true;
            incident.approvedBy = null;
            incident.approvedAt = null;
            return;
        }

        incident.status = 'مكتمل';
        incident.requiresApproval = false;
    },

    renderApprovalFlowHtml(incident) {
        const esc = (v) => Utils.escapeHTML(String(v ?? ''));
        const investigationComplete = this.isInvestigationComplete(incident);
        const approvalState = this.getIncidentApprovalState(incident);
        const awaitingApproval = approvalState.awaitingApproval;
        const approved = approvalState.approved;
        const rejected = approvalState.rejected;

        const stepState = (done, active, rejectedStep = false) => {
            if (rejectedStep) return { bg: '#FEE2E2', border: '#F87171', color: '#991B1B', icon: 'fa-times' };
            if (done) return { bg: '#DCFCE7', border: '#4ADE80', color: '#166534', icon: 'fa-check' };
            if (active) return { bg: '#FEF3C7', border: '#FBBF24', color: '#92400E', icon: 'fa-clock' };
            return { bg: '#F1F5F9', border: '#CBD5E1', color: '#64748B', icon: 'fa-circle' };
        };

        const steps = [
            { label: 'تسجيل الحادث', done: true, active: false },
            { label: 'إكمال التحقيق', done: investigationComplete, active: !investigationComplete && !approved },
            {
                label: rejected ? 'مرفوض' : (approved ? 'معتمد' : 'اعتماد المدير'),
                done: approved,
                active: awaitingApproval,
                rejected: rejected && !approved
            }
        ];

        const circles = steps.map((step, index) => {
            const st = stepState(step.done, step.active, step.rejected);
            const connector = index < steps.length - 1
                ? `<div style="flex:1;height:3px;margin:0 8px;background:${step.done ? '#4ADE80' : '#CBD5E1'};align-self:center;border-radius:2px;"></div>`
                : '';
            return `
                <div style="display:flex;align-items:center;flex:1;min-width:0;">
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;min-width:88px;">
                        <div style="width:52px;height:52px;border-radius:50%;background:${st.bg};border:3px solid ${st.border};color:${st.color};display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(15,23,42,0.08);">
                            <i class="fas ${st.icon}"></i>
                        </div>
                        <div style="font-size:12px;font-weight:700;color:${st.color};text-align:center;line-height:1.4;">${esc(step.label)}</div>
                    </div>
                    ${connector}
                </div>`;
        }).join('');

        const meta = [];
        if (approvalState.approverName) {
            meta.push(`اعتمد: ${esc(approvalState.approverName)}${approvalState.approvedAt ? ' — ' + esc(Utils.formatDate(approvalState.approvedAt)) : ''}`);
        }
        const rejectedBy = this._resolveIncidentApproverInfo(incident.rejectedBy);
        if (rejectedBy.name) meta.push(`رفض: ${esc(rejectedBy.name)}${incident.rejectionReason ? ' — ' + esc(incident.rejectionReason) : ''}`);

        return `
            <div style="direction:rtl;margin-bottom:20px;padding:18px;border-radius:14px;background:linear-gradient(135deg,#f8fafc,#eff6ff);border:1px solid #bfdbfe;">
                <h4 style="margin:0 0 16px;font-size:15px;font-weight:800;color:#1e40af;text-align:center;">
                    <i class="fas fa-check-circle ml-2"></i>دائرة الموافقة على الحادث
                </h4>
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;flex-wrap:wrap;">
                    ${circles}
                </div>
                ${meta.length ? `<div style="margin-top:14px;padding-top:12px;border-top:1px dashed #cbd5e1;font-size:12px;color:#475569;text-align:center;">${meta.join(' | ')}</div>` : ''}
            </div>`;
    },

    showIncidentApprovalFlow(incidentId) {
        const incident = (AppState.appData?.incidents || []).find(i => i.id === incidentId);
        if (!incident) {
            Notification.error('الحادث غير موجود');
            return;
        }

        this._normalizeIncidentApprovalRecord(incident);

        const canApprove = this.canApproveIncident();
        const approvalState = this.getIncidentApprovalState(incident);
        const showActions = canApprove && approvalState.awaitingApproval && this.hasInvestigationData(incident);

        const modal = document.createElement('div');
        modal.className = 'modal-overlay incident-professional-modal incident-modal-approval';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:720px;">
                <div class="modal-header">
                    <h2 class="modal-title">مسار الموافقة — ${Utils.escapeHTML(incident.title || incident.isoCode || incident.id || '')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    ${this.renderApprovalFlowHtml(incident)}
                    <div style="font-size:13px;color:#64748b;line-height:1.7;">
                        <div><strong>الحالة:</strong> ${Utils.escapeHTML(this.getIncidentDisplayStatus(incident))}</div>
                        <div><strong>بانتظار الاعتماد:</strong> ${approvalState.awaitingApproval ? 'نعم' : 'لا'}</div>
                        <div><strong>حالة الاعتماد:</strong> ${Utils.escapeHTML(approvalState.label)}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    <button class="btn-secondary" onclick="Incidents.viewIncident('${incident.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-eye ml-2"></i>عرض التفاصيل
                    </button>
                    ${showActions ? `
                    <button class="btn-danger" onclick="Incidents.rejectIncident('${incident.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-times ml-2"></i>رفض
                    </button>
                    <button class="btn-success" onclick="Incidents.approveIncident('${incident.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-check ml-2"></i>اعتماد
                    </button>
                    ` : ''}
                </div>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    },

    manageWorkflow(incidentId) {
        this.showIncidentApprovalFlow(incidentId);
    },

    async approveIncident(incidentId) {
        try {
            const incident = AppState.appData.incidents.find(i => i.id === incidentId);
            if (!incident) {
                Notification.error('الحادث غير موجود');
                return;
            }

            this._normalizeIncidentApprovalRecord(incident);

            if (!this.canApproveIncident()) {
                Notification.error('ليس لديك صلاحية للموافقة على الحوادث');
                return;
            }

            if (!confirm('هل أنت متأكد من الموافقة على هذا الحادث؟')) {
                return;
            }

            Loading.show('جاري الموافقة على الحادث...');

            // تحديث الحالة
            incident.status = 'مكتمل';
            incident.requiresApproval = false;
            incident.approvedBy = AppState.currentUser ? {
                id: AppState.currentUser.id || '',
                name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                email: AppState.currentUser.email || ''
            } : null;
            incident.approvedAt = new Date().toISOString();
            incident.updatedAt = new Date().toISOString();
            incident.rejectedBy = null;
            incident.rejectedAt = null;
            incident.rejectionReason = null;

            this._syncIncidentWorkflowOnApproval(incidentId, 'approved');

            // حفظ البيانات محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            await this.persistIncidentToServer(incident, { syncRegistry: true, silent: true });

            Loading.hide();
            Notification.success('تم الموافقة على الحادث بنجاح');

            try {
                if (document.getElementById('incidents-content')) {
                    this.loadIncidentsList();
                }
                const container = document.getElementById('incidents-tab-content');
                if (container) {
                    if (this.currentTab === 'approvals') {
                        container.innerHTML = await this.renderApprovalsTab();
                        this.setupTabEventListeners('approvals');
                    } else if (this.currentTab === 'registry') {
                        container.innerHTML = await this.renderRegistryTab();
                        this.setupTabEventListeners('registry');
                    }
                }
            } catch (e) {
                Utils.safeWarn('تعذر تحديث الواجهة بعد الموافقة:', e);
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في الموافقة على الحادث:', error);
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async rejectIncident(incidentId) {
        try {
            const incident = AppState.appData.incidents.find(i => i.id === incidentId);
            if (!incident) {
                Notification.error('الحادث غير موجود');
                return;
            }

            this._normalizeIncidentApprovalRecord(incident);

            if (!this.canApproveIncident()) {
                Notification.error('ليس لديك صلاحية لرفض الحوادث');
                return;
            }

            const reason = prompt('يرجى إدخال سبب الرفض:');
            if (!reason || reason.trim() === '') {
                Notification.warning('يجب إدخال سبب الرفض');
                return;
            }

            if (!confirm('هل أنت متأكد من رفض هذا الحادث؟')) {
                return;
            }

            Loading.show('جاري رفض الحادث...');

            // تحديث الحالة
            incident.status = 'قيد التحقيق';
            incident.requiresApproval = false;
            incident.rejectedBy = AppState.currentUser ? {
                id: AppState.currentUser.id || '',
                name: AppState.currentUser.name || AppState.currentUser.displayName || '',
                email: AppState.currentUser.email || ''
            } : null;
            incident.rejectedAt = new Date().toISOString();
            incident.rejectionReason = reason.trim();
            incident.updatedAt = new Date().toISOString();
            incident.approvedBy = null;
            incident.approvedAt = null;

            this._syncIncidentWorkflowOnApproval(incidentId, 'rejected');

            // حفظ البيانات محلياً
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            }

            await this.persistIncidentToServer(incident, { syncRegistry: true, silent: true });

            Loading.hide();
            Notification.success('تم رفض الحادث بنجاح');

            try {
                if (document.getElementById('incidents-content')) {
                    this.loadIncidentsList();
                }
                const container = document.getElementById('incidents-tab-content');
                if (container) {
                    if (this.currentTab === 'approvals') {
                        container.innerHTML = await this.renderApprovalsTab();
                        this.setupTabEventListeners('approvals');
                    } else if (this.currentTab === 'registry') {
                        container.innerHTML = await this.renderRegistryTab();
                        this.setupTabEventListeners('registry');
                    }
                }
            } catch (e) {
                Utils.safeWarn('تعذر تحديث الواجهة بعد الرفض:', e);
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في رفض الحادث:', error);
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    /**
     * تصدير Safety Alert إلى PDF (المحدث)
     */
    // جمع بيانات نموذج Safety Alert للطباعة/التصدير
    getSafetyAlertFormData() {
        const modal = document.querySelector('.modal-overlay');
        if (!modal) {
            return null;
        }

        // Get incident type from hidden input (updated by checkboxes) or other input
        const incidentTypeInput = document.getElementById('safety-alert-incident-type');
        const otherInput = document.getElementById('incident-type-other-input');
        const otherCheckbox = document.getElementById('incident-type-other');
        let incidentType = incidentTypeInput?.value || 'نوع الحادث';
        
        // If "other" is selected, use the value from the other input field
        if (otherCheckbox && otherCheckbox.checked && otherInput && otherInput.value.trim()) {
            incidentType = otherInput.value.trim();
        }
        
        // Get sequential number
        const numberDisplay = document.getElementById('safety-alert-number-display');
        const sequentialNumber = numberDisplay ? numberDisplay.textContent.trim() : String((AppState.appData?.safetyAlerts || []).length + 1).padStart(3, '0');

        return {
            sequentialNumber: sequentialNumber,
            incidentType: incidentType,
            incidentDate: document.getElementById('safety-alert-date')?.value || '',
            incidentLocation: document.getElementById('safety-alert-location')?.value || '',
            who: document.getElementById('safety-alert-who')?.value || '',
            description: document.getElementById('safety-alert-description')?.value || '',
            facts: document.getElementById('safety-alert-facts')?.value || '',
            causes: document.getElementById('safety-alert-causes')?.value || '',
            lessonsLearned: document.getElementById('safety-alert-lessons')?.value || '',
            preventiveMeasures: document.getElementById('safety-alert-preventive')?.value || '',
            locationImage: document.getElementById('safety-alert-location-image')?.value || '',
            causesImage: document.getElementById('safety-alert-causes-image')?.value || '',
            notificationNumber: document.getElementById('safety-alert-notification-number')?.value || sequentialNumber,
            preparedBy: document.getElementById('safety-alert-prepared-by')?.value || '',
            approvedBy: document.getElementById('safety-alert-approved-by')?.value || '',
            issueDate: document.getElementById('safety-alert-issue-date')?.value || ''
        };
    },

    // طباعة Safety Alert
    printSafetyAlert(alertId) {
        try {
            // جمع البيانات من النموذج المفتوح أو من البيانات المحفوظة
            let alertData = this.getSafetyAlertFormData();
            
            if (!alertData) {
                // إذا لم يكن النموذج مفتوحاً، استخدم البيانات المحفوظة
                if (!alertId) {
                    Notification.warning('لا توجد بيانات للطباعة. يرجى فتح النموذج أولاً.');
                    return;
                }
                alertData = (AppState.appData?.safetyAlerts || []).find(a => a.id === alertId);
                if (!alertData) {
                    Notification.error('Safety Alert غير موجود');
                    return;
                }
            }

            if (!alertData.sequentialNumber && !alertData.description) {
                Notification.warning('لا توجد بيانات للطباعة');
                return;
            }

            Loading.show('جاري إعداد الطباعة...');

            // استخدام دالة exportSafetyAlertPDF لكن مع البيانات المباشرة
            this.exportSafetyAlertPDFWithData(alertData);
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في طباعة Safety Alert:', error);
            Notification.error('فشل الطباعة: ' + error.message);
        }
    },

    /**
     * تحويل رابط Google Drive إلى رابط قابل للطباعة
     */
    convertGoogleDriveLinkToPrintable(link) {
        if (!link) return '';
        if (typeof window.__convertGoogleDriveUrl === 'function') {
            link = window.__convertGoogleDriveUrl(link);
        }
        // إذا كان base64، استخدمه مباشرة
        if (link.startsWith('data:image/')) {
            return link;
        }
        // تطبيع روابط thumbnail المخزنة قديماً إلى صيغة uc/view الأكثر استقراراً
        if (link.includes('drive.google.com/thumbnail')) {
            const m = link.match(/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/i);
            if (m && m[1]) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
        }
        // إذا كان رابط Google Drive، استخدم صيغة uc/view
        if (link.includes('drive.google.com')) {
            const fileIdMatch = link.match(/\/d\/([a-zA-Z0-9_-]+)/) || link.match(/id=([a-zA-Z0-9_-]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
                return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
            }
        }
        return link;
    },

    // بناء محتوى HTML للطباعة
    buildSafetyAlertPrintContent(alertData) {
        const companyName = AppState?.companySettings?.name || AppState?.companyName || '';
        const companySecondaryName = AppState?.companySettings?.secondaryName || '';
        const companyLogo = AppState?.companyLogo || '';
        const sequentialNumber = alertData.sequentialNumber || '001';
        const notificationNumber = alertData.notificationNumber || sequentialNumber;
        
        // معالجة الصور للتأكد من ظهورها بشكل صحيح
        const locationImageSrc = alertData.locationImage ? this.convertGoogleDriveLinkToPrintable(alertData.locationImage) : '';
        const causesImageSrc = alertData.causesImage ? this.convertGoogleDriveLinkToPrintable(alertData.causesImage) : '';
        const logoSrc = companyLogo ? this.convertGoogleDriveLinkToPrintable(companyLogo) : '';
        
        return `
            <div style="direction: rtl; text-align: right; font-family: 'Tahoma', Arial, sans-serif; page-break-inside: avoid;">
                <!-- Top Header with Logo and Company Name -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; padding-bottom: 12px; border-bottom: 3px solid #003865;">
                    <div style="flex: 0 0 auto; text-align: right; padding-left: 20px;">
                        ${logoSrc ? `<img src="${logoSrc}" alt="شعار الشركة" style="max-height: 60px; max-width: 150px; object-fit: contain; display: block;" onerror="this.style.display='none';">` : ''}
                    </div>
                    <div style="flex: 1; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: #003865; margin-bottom: 5px;">تنبيه - Safety Alert</div>
                        <div style="font-size: 1.3rem; font-weight: 700; color: #003865;">السلامة</div>
                    </div>
                    <div style="flex: 0 0 auto; text-align: left; padding-right: 20px;">
                        <div style="background: #e0f2fe; padding: 8px 16px; border-radius: 8px; font-weight: 600; color: #003865; font-size: 0.95rem;">
                            كود التقرير: SAFETY-ALERT
                        </div>
                        <div style="font-size: 14px; font-weight: 700; color: #1f2937; margin-top: 8px; line-height: 1.3;">
                            <div style="white-space: nowrap; word-break: keep-all;">${Utils.escapeHTML(companyName || '')}</div>
                            ${companySecondaryName ? `<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px;">${Utils.escapeHTML(companySecondaryName)}</div>` : ''}
                        </div>
                    </div>
                </div>

                <!-- Incident Number and Type Section -->
                <div style="text-align: center; margin: 15px 0 20px 0;">
                    <div style="color: #dc2626; font-weight: 700; font-size: 0.75rem; margin-bottom: 2px;">No</div>
                    <div style="color: #dc2626; font-weight: 700; font-size: 12px; margin-bottom: 15px;">${Utils.escapeHTML(sequentialNumber)}</div>
                    <div style="background: #9ca3af; color: white; padding: 14px 20px; text-align: center; font-weight: 700; font-size: 1.15rem; border-radius: 8px; display: inline-block; min-width: 200px;">
                        ${Utils.escapeHTML(alertData.incidentType || '')}
                    </div>
                </div>

                <!-- Incident Details -->
                <div style="background: #9ca3af; height: 4px; margin: 20px 0 15px 0; border-radius: 2px;"></div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px;">
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.95rem;">أين</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; min-height: 70px; font-size: 0.9rem;">
                            ${Utils.escapeHTML(alertData.incidentLocation || '')}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.95rem;">متى</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; min-height: 70px; font-size: 0.9rem;">
                            ${alertData.incidentDate ? new Date(alertData.incidentDate).toLocaleDateString('ar-SA') : ''}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.95rem;">من</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; min-height: 70px; font-size: 0.9rem;">
                            ${Utils.escapeHTML(alertData.who || '')}
                        </div>
                    </div>
                </div>

                <!-- Images -->
                ${locationImageSrc || causesImageSrc ? `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 18px; page-break-inside: avoid;">
                    ${locationImageSrc ? `
                    <div style="text-align: center;">
                        <div style="margin-bottom: 6px; font-size: 0.85rem; font-weight: 600; color: #374151;">صورة توضيحية لمكان الحادث</div>
                        <div style="background: #fbbf24; padding: 8px; text-align: center; border-radius: 6px; border: 2px solid #f59e0b; display: inline-block; max-width: 100%; width: 100%; box-sizing: border-box;">
                            <img src="${locationImageSrc}" alt="صورة المكان" 
                                style="max-width: 100%; max-height: 350px; width: auto; height: auto; border-radius: 4px; object-fit: contain; display: block; margin: 0 auto;"
                                onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding: 20px; color: #666;\\'>فشل تحميل الصورة</div>';">
                        </div>
                    </div>
                    ` : '<div></div>'}
                    ${causesImageSrc ? `
                    <div style="text-align: center;">
                        <div style="margin-bottom: 6px; font-size: 0.85rem; font-weight: 600; color: #374151;">صورة توضيحية لأسباب الحادث</div>
                        <div style="background: #fbbf24; padding: 8px; text-align: center; border-radius: 6px; border: 2px solid #f59e0b; display: inline-block; max-width: 100%; width: 100%; box-sizing: border-box;">
                            <img src="${causesImageSrc}" alt="صورة الأسباب" 
                                style="max-width: 100%; max-height: 350px; width: auto; height: auto; border-radius: 4px; object-fit: contain; display: block; margin: 0 auto;"
                                onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding: 20px; color: #666;\\'>فشل تحميل الصورة</div>';">
                        </div>
                    </div>
                    ` : ''}
                </div>
                ` : ''}

                <!-- Description -->
                <div style="background: #9ca3af; height: 4px; margin: 18px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">وصف الحادث :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(alertData.description || '')}</div>
                </div>

                ${alertData.facts ? `
                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">حقائق عن الحادث :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(alertData.facts)}</div>
                </div>
                ` : ''}

                ${alertData.causes ? `
                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">الأسباب :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(alertData.causes)}</div>
                </div>
                ` : ''}

                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">الدروس المستفادة :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(alertData.lessonsLearned || '')}</div>
                </div>

                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-bottom: 15px; page-break-inside: avoid;">
                    <label style="display: block; font-weight: 600; margin-bottom: 8px; font-size: 0.95rem;">إجراءات منع تكرار الحدث :</label>
                    <div style="white-space: pre-wrap; font-size: 0.85rem; line-height: 1.6;">${Utils.escapeHTML(alertData.preventiveMeasures || '')}</div>
                </div>

                <!-- Footer -->
                <div style="background: #9ca3af; height: 4px; margin: 15px 0 12px 0; border-radius: 2px;"></div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;">
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">رقم الإشعار</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${Utils.escapeHTML(notificationNumber)}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">إعداد</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${Utils.escapeHTML(alertData.preparedBy || '')}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">اعتماد</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${Utils.escapeHTML(alertData.approvedBy || '-')}
                        </div>
                    </div>
                    <div>
                        <div style="background: #9ca3af; color: white; padding: 10px; text-align: center; font-weight: 600; border-radius: 4px; font-size: 0.9rem;">تاريخ الإصدار</div>
                        <div style="background: white; padding: 12px; border-radius: 8px; border: 2px solid #e5e7eb; margin-top: 8px; font-size: 0.85rem; min-height: 50px;">
                            ${alertData.issueDate ? new Date(alertData.issueDate).toLocaleDateString('ar-SA') : '-'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // تصدير Safety Alert إلى PDF باستخدام البيانات المباشرة
    exportSafetyAlertPDFWithData(alertData) {
        try {
            Loading.show('جاري تحضير PDF...');

            const content = this.buildSafetyAlertPrintContent(alertData);

            // استخدام نفس HTML template من exportSafetyAlertPDF
            const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Safety Alert - تنبيه السلامة</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 12mm 15mm;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        body {
            font-family: 'Tahoma', Arial, sans-serif;
            direction: rtl;
            text-align: right;
            background: white;
            color: #1f2937;
            font-size: 11px;
            line-height: 1.4;
            padding: 0;
            margin: 0;
        }
        .content-wrapper {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            padding: 5px;
            page-break-inside: avoid;
            overflow: hidden;
        }
        img {
            max-width: 100%;
            height: auto;
            object-fit: contain;
            display: block;
        }
        .safety-alert-image-container {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        .safety-alert-image-container img {
            max-width: 100%;
            max-height: 350px;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
            margin: 0 auto;
        }
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            .safety-alert-image-container {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            img {
                max-width: 100%;
                max-height: 350px;
                object-fit: contain;
            }
        }
    </style>
</head>
<body>
    <div class="content-wrapper">
        ${content}
    </div>
</body>
</html>`;

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');

            if (printWindow) {
                printWindow.onload = () => {
                    // انتظار تحميل جميع الصور قبل الطباعة
                    const images = printWindow.document.querySelectorAll('img');
                    let imagesLoaded = 0;
                    const totalImages = images.length;
                    
                    if (totalImages === 0) {
                        // لا توجد صور، اطبع مباشرة
                        setTimeout(() => {
                            printWindow.print();
                            setTimeout(() => {
                                URL.revokeObjectURL(url);
                                Loading.hide();
                                Notification.success('تم تجهيز التقرير للطباعة/الحفظ كـ PDF');
                            }, 800);
                        }, 500);
                        return;
                    }
                    
                    // معالجة تحميل الصور
                    const checkAllImagesLoaded = () => {
                        imagesLoaded++;
                        if (imagesLoaded >= totalImages) {
                            // جميع الصور تم تحميلها
                            setTimeout(() => {
                                printWindow.print();
                                setTimeout(() => {
                                    URL.revokeObjectURL(url);
                                    Loading.hide();
                                    Notification.success('تم تجهيز التقرير للطباعة/الحفظ كـ PDF');
                                }, 800);
                            }, 500);
                        }
                    };
                    
                    // إضافة معالجات للأحداث لكل صورة
                    images.forEach((img) => {
                        if (img.complete) {
                            checkAllImagesLoaded();
                        } else {
                            img.onload = checkAllImagesLoaded;
                            img.onerror = () => {
                                // في حالة فشل تحميل الصورة، استمر في الطباعة
                                console.warn('فشل تحميل صورة:', img.src);
                                checkAllImagesLoaded();
                            };
                        }
                    });
                    
                    // timeout احتياطي - اطبع بعد 3 ثوانٍ حتى لو لم يتم تحميل جميع الصور
                    setTimeout(() => {
                        if (imagesLoaded < totalImages) {
                            console.warn('بعض الصور لم يتم تحميلها، لكن سيتم المتابعة مع الطباعة');
                            printWindow.print();
                            setTimeout(() => {
                                URL.revokeObjectURL(url);
                                Loading.hide();
                                Notification.success('تم تجهيز التقرير للطباعة/الحفظ كـ PDF');
                            }, 800);
                        }
                    }, 3000);
                };
            } else {
                Loading.hide();
                Notification.error('يرجى السماح للنوافذ المنبثقة لعرض التقرير');
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير PDF:', error);
            Notification.error('فشل تصدير PDF: ' + error.message);
        }
    },

    async exportSafetyAlertPDF(alertId) {
        try {
            let alert = null;
            
            // إذا كان alertId فارغاً، حاول جمع البيانات من النموذج المفتوح
            if (!alertId || alertId === '') {
                const formData = this.getSafetyAlertFormData();
                if (formData) {
                    // استخدام البيانات من النموذج
                    this.exportSafetyAlertPDFWithData(formData);
                    return;
                } else {
                    Notification.error('لا توجد بيانات للتصدير. يرجى فتح النموذج أولاً.');
                    return;
                }
            }
            
            // إذا كان هناك alertId، استخدم البيانات المحفوظة
            alert = (AppState.appData?.safetyAlerts || []).find(a => a.id === alertId);
            if (!alert) {
                Notification.error('Safety Alert غير موجود');
                return;
            }

            // استخدام البيانات المحفوظة
            this.exportSafetyAlertPDFWithData(alert);
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير PDF:', error);
            Notification.error('فشل تصدير PDF: ' + error.message);
        }
    }
};
// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof Incidents !== 'undefined') {
            window.Incidents = Incidents;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ Incidents module loaded and available on window.Incidents');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير Incidents:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof Incidents !== 'undefined') {
            try {
                window.Incidents = Incidents;
            } catch (e) {
                console.error('❌ فشل تصدير Incidents:', e);
            }
        }
    }
})();
