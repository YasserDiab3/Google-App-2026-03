/**
 * HseMetrics — مصدر الحقيقة الموحّد لمؤشرات السلامة (لوحة التحكم + سكوركارد + Lagging).
 * TRIR = Recordables × 200,000 / Man-Hours
 * AFR  = Total Injuries × 1,000,000 / Man-Hours
 * FAR  = Fatalities × 100,000,000 / Man-Hours
 * FR   = LTI × 1,000,000 / Man-Hours
 * SR   = Days Lost × 1,000,000 / Man-Hours
 * IR   = Total Incidents × 1,000,000 / Man-Hours
 */
(function (global) {
    'use strict';

    const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    const DEFAULT_MULTIPLIERS = {
        TRIR: 200000,
        AFR: 1000000,
        FAR: 100000000,
        FR: 1000000,
        SR: 1000000,
        IR: 1000000
    };

    function parseNum(v) {
        if (v === undefined || v === null || v === '') return NaN;
        const x = parseFloat(String(v).replace(/,/g, ''));
        return Number.isFinite(x) ? x : NaN;
    }

    function parseDate(value) {
        if (!value) return null;
        if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    function createMonthlyArray(defaultValue) {
        return new Array(12).fill(defaultValue);
    }

    function loadMultipliers() {
        const ls = typeof localStorage !== 'undefined' ? localStorage : null;
        const read = (key, fallback) => {
            if (!ls) return fallback;
            const n = parseNum(ls.getItem(key));
            return Number.isFinite(n) && n > 0 ? n : fallback;
        };
        return {
            TRIR: read('hse_multiplier_trir', DEFAULT_MULTIPLIERS.TRIR),
            AFR: read('hse_multiplier_afr', DEFAULT_MULTIPLIERS.AFR),
            FAR: read('hse_multiplier_far', DEFAULT_MULTIPLIERS.FAR),
            FR: read('hse_multiplier_fr', DEFAULT_MULTIPLIERS.FR),
            SR: read('hse_multiplier_sr', DEFAULT_MULTIPLIERS.SR),
            IR: read('hse_multiplier_ir', DEFAULT_MULTIPLIERS.IR)
        };
    }

    function getWorkConfig() {
        const ls = typeof localStorage !== 'undefined' ? localStorage : null;
        const hpd = parseNum(ls && ls.getItem('hse_hours_per_day'));
        const dpm = parseNum(ls && ls.getItem('hse_work_days_per_month'));
        const includeRaw = ls && ls.getItem('hse_work_hours_include_contractors');
        const includeContractors = includeRaw === null || includeRaw === ''
            ? true
            : includeRaw !== '0' && String(includeRaw).toLowerCase() !== 'false';
        return {
            hoursPerDay: Number.isFinite(hpd) && hpd > 0 ? hpd : 8,
            workDaysPerMonth: Number.isFinite(dpm) && dpm > 0 ? dpm : 22,
            includeContractors
        };
    }

    function getTextBag(record) {
        if (!record || typeof record !== 'object') return '';
        const investigationTypes = Array.isArray(record.investigation?.incidentTypes)
            ? record.investigation.incidentTypes.join(' ')
            : '';
        return [
            record.incidentType,
            record.type,
            record.title,
            record.description,
            record.reason,
            record.diagnosis,
            record.severity,
            record.result,
            record.status,
            investigationTypes
        ].filter(Boolean).join(' ').toLowerCase();
    }

    function getDaysLost(record, registryEntry) {
        const fromRecord = parseInt(record?.lostDays || record?.daysLost || record?.lostTimeDays || record?.timeOffWork || 0, 10) || 0;
        const fromRegistry = registryEntry
            ? parseInt(registryEntry.totalLeaveDays || registryEntry.lostDays || 0, 10) || 0
            : 0;
        return Math.max(fromRecord, fromRegistry);
    }

    function isEmployeeInactive(employee) {
        if (!employee) return false;
        const status = String(employee.status || employee.employmentStatus || '').trim().toLowerCase();
        if (employee.resignationDate || employee.terminationDate) return true;
        return status === 'inactive' || status === 'غير نشط';
    }

    function getOperationalEmployeesForMonth(employees, year, monthIndex) {
        const monthEnd = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);
        return (employees || []).filter((employee) => {
            if (!employee) return false;
            const hireDate = parseDate(employee.hireDate || employee.startDate || employee.createdAt);
            const resignationDate = parseDate(employee.resignationDate || employee.terminationDate || employee.endDate);
            if (hireDate && hireDate > monthEnd) return false;
            if (resignationDate && resignationDate <= monthEnd) return false;
            if (isEmployeeInactive(employee) && !resignationDate) return false;
            return true;
        }).length;
    }

    function getExternalWorkforceForMonth(year, monthIndex, appData) {
        const monthKey = MONTH_KEYS[monthIndex];
        if (!monthKey) return 0;

        const Emp = typeof Employees !== 'undefined' ? Employees : (global.Employees || null);
        if (Emp && typeof Emp.getAvailableContractorsForExternalWorkforce === 'function' && typeof Emp.getExternalWorkforceRecord === 'function') {
            const contractors = Emp.getAvailableContractorsForExternalWorkforce();
            if (Array.isArray(contractors) && contractors.length > 0) {
                return contractors.reduce((sum, contractor) => {
                    const rec = Emp.getExternalWorkforceRecord(year, contractor.stableKey);
                    if (!rec) return sum;
                    const v = parseFloat(rec[monthKey]);
                    return sum + (Number.isFinite(v) && v >= 0 ? v : 0);
                }, 0);
            }
        }

        return (appData?.externalWorkforceMonthly || []).reduce((sum, record) => {
            if (!record || Number(record.year) !== Number(year)) return sum;
            return sum + (parseFloat(record[monthKey]) || 0);
        }, 0);
    }

    function getManualHoursForMonth(year, monthIndex, appData) {
        const month = String(monthIndex + 1).padStart(2, '0');
        const records = Array.isArray(appData?.safetyPerformanceKPIs) ? appData.safetyPerformanceKPIs : [];
        const record = records.find((r) =>
            r &&
            r.recordType === 'scorecard-manual' &&
            Number(r.year) === Number(year) &&
            String(r.month).padStart(2, '0') === month
        );
        if (!record || record.hoursWorked === undefined || record.hoursWorked === null) return null;
        const trimmed = String(record.hoursWorked).trim();
        if (!trimmed) return null;
        const parsed = parseFloat(trimmed);
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
    }

    function getManHoursForMonth(year, monthIndex, appData) {
        const manual = getManualHoursForMonth(year, monthIndex, appData);
        if (manual !== null) return manual;

        const cfg = getWorkConfig();
        const employees = Array.isArray(appData?.employees) ? appData.employees : [];
        const directCount = getOperationalEmployeesForMonth(employees, year, monthIndex);
        const contractorCount = cfg.includeContractors
            ? getExternalWorkforceForMonth(year, monthIndex, appData)
            : 0;
        const headcount = directCount + contractorCount;
        const derived = headcount * cfg.hoursPerDay * cfg.workDaysPerMonth;
        return parseFloat(derived.toFixed(2));
    }

    function getIncidentDate(record) {
        return parseDate(record?.date || record?.incidentDate || record?.createdAt);
    }

    function getMonthIndexForYear(value, year) {
        const date = parseDate(value);
        if (!date || date.getFullYear() !== year) return -1;
        return date.getMonth();
    }

    function buildRegistryMap(appData) {
        const map = new Map();
        (appData?.incidentsRegistry || []).forEach((entry) => {
            if (!entry) return;
            [entry.id, entry.incidentId, entry.registryId]
                .map((k) => (k != null ? String(k).trim() : ''))
                .filter(Boolean)
                .forEach((key) => {
                    if (!map.has(key)) map.set(key, entry);
                });
        });
        return map;
    }

    /**
     * حوادث لحساب المؤشرات — مصدر قائمة incidents عند توفرها (مطابق لكارت اللوحة)؛
     * السجل يُستخدم للإثراء (أيام ضياع، تصنيف) عبر buildRegistryMap وليس للتضخيم.
     */
    function getIncidentsForMetrics(appData) {
        const incidents = Array.isArray(appData?.incidents) ? appData.incidents.filter(Boolean) : [];
        if (incidents.length > 0) {
            const seen = new Set();
            return incidents.filter((i) => {
                const id = String(i.id || i.incidentId || '').trim();
                if (!id || seen.has(id)) return false;
                seen.add(id);
                return true;
            });
        }
        return getUnifiedIncidents(appData);
    }

    function getUnifiedIncidents(appData) {
        const incidents = Array.isArray(appData?.incidents) ? appData.incidents.filter(Boolean) : [];
        const registry = Array.isArray(appData?.incidentsRegistry) ? appData.incidentsRegistry.filter(Boolean) : [];
        if (incidents.length === 0) return registry;
        const incidentIds = new Set(
            incidents
                .map((r) => String(r?.id || r?.incidentId || '').trim())
                .filter(Boolean)
        );
        const extra = registry.filter((r) => {
            const linkedId = String(r.incidentId || '').trim();
            if (linkedId && incidentIds.has(linkedId)) return false;
            const selfKey = String(r.id || r.registryId || linkedId || '').trim();
            return selfKey && !incidentIds.has(selfKey);
        });
        return extra.length ? incidents.concat(extra) : incidents;
    }

    function isLostTimeIncident(record, registryEntry) {
        const bag = getTextBag(record);
        const types = Array.isArray(record?.investigation?.incidentTypes) ? record.investigation.incidentTypes : [];
        const lostDays = getDaysLost(record, registryEntry);
        if (types.includes('injury-lost')) return true;
        if (lostDays > 0) return true;
        if (bag.includes('lost time') || bag.includes('توقف عن العمل') || bag.includes(' lti')) return true;
        if ((record?.severity || '').toUpperCase().includes('LTI')) return true;
        return false;
    }

    function isFatality(record) {
        const bag = getTextBag(record);
        const types = Array.isArray(record?.investigation?.incidentTypes) ? record.investigation.incidentTypes : [];
        return types.includes('fatality') || bag.includes('fatality') || bag.includes('وفاة');
    }

    function isFirstAidIncident(record) {
        const bag = getTextBag(record);
        return bag.includes('first aid') || bag.includes('اسعافات') || bag.includes('إسعافات') || bag.includes('اسعاف');
    }

    function isNonLostTimeIncident(record, registryEntry) {
        if (isLostTimeIncident(record, registryEntry) || isFirstAidIncident(record)) return false;
        const bag = getTextBag(record);
        const types = Array.isArray(record?.investigation?.incidentTypes) ? record.investigation.incidentTypes : [];
        return types.includes('injury-no-lost') || bag.includes('nlti');
    }

    function isRecordableIncident(record, registryEntry) {
        if (isFatality(record)) return true;
        if (isLostTimeIncident(record, registryEntry) || isNonLostTimeIncident(record, registryEntry)) return true;
        const bag = getTextBag(record);
        return bag.includes('recordable');
    }

    function isInjuryIncident(record, registryEntry) {
        return isRecordableIncident(record, registryEntry) || isFirstAidIncident(record);
    }

    function classifyIncident(record, registryEntry) {
        return {
            isFatality: isFatality(record),
            isLTI: isLostTimeIncident(record, registryEntry),
            isNLTI: isNonLostTimeIncident(record, registryEntry),
            isFirstAid: isFirstAidIncident(record),
            isRecordable: isRecordableIncident(record, registryEntry),
            isInjury: isInjuryIncident(record, registryEntry),
            daysLost: getDaysLost(record, registryEntry)
        };
    }

    function computeRate(numerator, manHours, multiplier) {
        const num = parseFloat(numerator) || 0;
        const hours = parseFloat(manHours) || 0;
        const mult = parseFloat(multiplier) || 0;
        if (hours <= 0) return 0;
        return (num * mult) / hours;
    }

    function formatRate(value, decimals) {
        const d = Number.isFinite(decimals) ? decimals : 2;
        const n = parseFloat(value);
        if (!Number.isFinite(n)) return (0).toFixed(d);
        return n.toFixed(d);
    }

    /** تنسيق عرض المعدلات في الواجهة (فواصل + منازل عشرية) */
    function formatRateDisplay(value, decimals) {
        const d = Number.isFinite(decimals) ? decimals : 2;
        const n = parseFloat(value);
        if (!Number.isFinite(n)) {
            return (0).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
        }
        return n.toLocaleString('en-US', {
            minimumFractionDigits: d,
            maximumFractionDigits: d,
            useGrouping: true
        });
    }

    function computeRates(totals, multipliers) {
        const mult = multipliers || loadMultipliers();
        const hours = totals.manHours || 0;
        return {
            trir: computeRate(totals.recordables, hours, mult.TRIR),
            afr: computeRate(totals.injuries, hours, mult.AFR),
            far: computeRate(totals.fatalities, hours, mult.FAR),
            fr: computeRate(totals.lti, hours, mult.FR),
            sr: computeRate(totals.daysLost, hours, mult.SR),
            ir: computeRate(totals.totalIncidents, hours, mult.IR),
            ltiCount: totals.lti || 0,
            recordables: totals.recordables || 0,
            injuries: totals.injuries || 0,
            fatalities: totals.fatalities || 0,
            daysLost: totals.daysLost || 0,
            totalIncidents: totals.totalIncidents || 0,
            manHours: hours
        };
    }

    function sumSlice(arr, limit) {
        let sum = 0;
        const end = Math.min(limit, (arr || []).length - 1);
        for (let i = 0; i <= end; i += 1) {
            sum += parseFloat(arr[i]) || 0;
        }
        return sum;
    }

    function buildMonthlyBase(year, appData) {
        const data = appData || {};
        const registryMap = buildRegistryMap(data);
        const cfg = getWorkConfig();
        const employees = Array.isArray(data.employees) ? data.employees : [];

        const base = {
            year,
            recordables: createMonthlyArray(0),
            injuries: createMonthlyArray(0),
            fatalities: createMonthlyArray(0),
            lti: createMonthlyArray(0),
            nlti: createMonthlyArray(0),
            firstAid: createMonthlyArray(0),
            daysLost: createMonthlyArray(0),
            totalIncidents: createMonthlyArray(0),
            manHours: createMonthlyArray(0),
            employeeCounts: createMonthlyArray(0)
        };

        for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
            const direct = getOperationalEmployeesForMonth(employees, year, monthIndex);
            const contractor = cfg.includeContractors
                ? getExternalWorkforceForMonth(year, monthIndex, data)
                : 0;
            base.employeeCounts[monthIndex] = direct + contractor;
            base.manHours[monthIndex] = getManHoursForMonth(year, monthIndex, data);
        }

        getIncidentsForMetrics(data).forEach((record) => {
            const monthIndex = getMonthIndexForYear(
                record?.date || record?.incidentDate || record?.createdAt,
                year
            );
            if (monthIndex < 0) return;

            const regId = record.id || record.incidentId;
            const registryEntry = regId ? registryMap.get(String(regId)) : null;
            const c = classifyIncident(record, registryEntry);

            if (c.isLTI) base.lti[monthIndex] += 1;
            else if (c.isNLTI) base.nlti[monthIndex] += 1;
            if (c.isFirstAid) base.firstAid[monthIndex] += 1;
            if (c.isRecordable) base.recordables[monthIndex] += 1;
            if (c.isInjury) base.injuries[monthIndex] += 1;
            if (c.isFatality) base.fatalities[monthIndex] += 1;
            if (c.daysLost > 0) base.daysLost[monthIndex] += c.daysLost;
            base.totalIncidents[monthIndex] += 1;
        });

        return base;
    }

    function buildMonthlyRateSeries(numeratorSeries, hoursSeries, multiplier) {
        return numeratorSeries.map((value, index) =>
            computeRate(value, hoursSeries[index], multiplier)
        );
    }

    function currentYtdLimit(year) {
        const now = new Date();
        return year === now.getFullYear() ? now.getMonth() : 11;
    }

    function resolveYtdManHours(monthlyBase, ytdLimit) {
        const summed = sumSlice(monthlyBase.manHours, ytdLimit);
        const ls = typeof localStorage !== 'undefined' ? localStorage : null;
        if (!ls) return summed;
        const raw = ls.getItem('hse_total_work_hours');
        if (raw == null || String(raw).trim() === '') return summed;
        const annual = parseNum(String(raw).replace(/,/g, ''));
        if (!Number.isFinite(annual) || annual <= 0) return summed;
        const monthsElapsed = Math.min(ytdLimit + 1, 12);
        const mo = parseNum(ls.getItem('hse_work_months_per_year'));
        const monthsPerYear = Number.isFinite(mo) && mo > 0 ? mo : 12;
        return annual * (monthsElapsed / monthsPerYear);
    }

    function resolveYtdManDays(monthlyBase, ytdLimit) {
        const cfg = getWorkConfig();
        let total = 0;
        const limit = Math.min(Math.max(ytdLimit, 0), 11);
        for (let i = 0; i <= limit; i += 1) {
            total += Math.round((monthlyBase.employeeCounts[i] || 0) * cfg.workDaysPerMonth);
        }
        return total;
    }

    function aggregateYtd(monthlyBase, ytdLimit) {
        return {
            recordables: sumSlice(monthlyBase.recordables, ytdLimit),
            injuries: sumSlice(monthlyBase.injuries, ytdLimit),
            fatalities: sumSlice(monthlyBase.fatalities, ytdLimit),
            lti: sumSlice(monthlyBase.lti, ytdLimit),
            daysLost: sumSlice(monthlyBase.daysLost, ytdLimit),
            totalIncidents: sumSlice(monthlyBase.totalIncidents, ytdLimit),
            manHours: resolveYtdManHours(monthlyBase, ytdLimit),
            manDays: resolveYtdManDays(monthlyBase, ytdLimit)
        };
    }

    function aggregatePeriod(start, end, appData) {
        const startDate = start instanceof Date ? start : new Date(start);
        const endDate = end instanceof Date ? end : new Date(end);
        const totals = {
            recordables: 0,
            injuries: 0,
            fatalities: 0,
            lti: 0,
            daysLost: 0,
            totalIncidents: 0,
            manHours: 0
        };

        const year = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        for (let y = year; y <= endYear; y += 1) {
            const monthly = buildMonthlyBase(y, appData);
            for (let m = 0; m < 12; m += 1) {
                const monthStart = new Date(y, m, 1);
                const monthEnd = new Date(y, m + 1, 0, 23, 59, 59, 999);
                if (monthEnd < startDate || monthStart > endDate) continue;
                totals.recordables += monthly.recordables[m] || 0;
                totals.injuries += monthly.injuries[m] || 0;
                totals.fatalities += monthly.fatalities[m] || 0;
                totals.lti += monthly.lti[m] || 0;
                totals.daysLost += monthly.daysLost[m] || 0;
                totals.totalIncidents += monthly.totalIncidents[m] || 0;
                totals.manHours += monthly.manHours[m] || 0;
            }
        }

        return totals;
    }

    function getDashboardSnapshot(appData, options) {
        const opts = options || {};
        const year = opts.year || new Date().getFullYear();
        const ytdLimit = opts.ytdLimit !== undefined ? opts.ytdLimit : currentYtdLimit(year);
        const monthly = buildMonthlyBase(year, appData);
        const totals = aggregateYtd(monthly, ytdLimit);
        const multipliers = loadMultipliers();
        const rates = computeRates(totals, multipliers);
        return {
            year,
            ytdLimit,
            monthly,
            totals,
            rates,
            multipliers,
            formatted: {
                trir: formatRate(rates.trir, 2),
                afr: formatRate(rates.afr, 2),
                far: formatRate(rates.far, 4),
                fr: formatRate(rates.fr, 2),
                sr: formatRate(rates.sr, 2),
                ir: formatRate(rates.ir, 2),
                lti: String(rates.ltiCount)
            }
        };
    }

    function getScorecardRates(monthlyBase, multipliers) {
        const mult = multipliers || loadMultipliers();
        const hours = monthlyBase.manHours;
        return {
            trir: buildMonthlyRateSeries(monthlyBase.recordables, hours, mult.TRIR),
            afr: buildMonthlyRateSeries(monthlyBase.injuries, hours, mult.AFR),
            far: buildMonthlyRateSeries(monthlyBase.fatalities, hours, mult.FAR),
            fr: buildMonthlyRateSeries(monthlyBase.lti, hours, mult.FR),
            ltir: buildMonthlyRateSeries(monthlyBase.lti, hours, mult.FR),
            sr: buildMonthlyRateSeries(monthlyBase.daysLost, hours, mult.SR),
            ir: buildMonthlyRateSeries(monthlyBase.totalIncidents, hours, mult.IR)
        };
    }

    function getYtdRate(numeratorSeries, hoursSeries, ytdLimit, multiplier) {
        const numerator = sumSlice(numeratorSeries, ytdLimit);
        const hours = sumSlice(hoursSeries, ytdLimit);
        return computeRate(numerator, hours, multiplier);
    }

    function calculateRollingSeries(currentYearSeries, previousYearSeries, currentYearHours, previousYearHours, multiplier) {
        const mergedNumerator = [...(previousYearSeries || []), ...(currentYearSeries || [])];
        const mergedHours = [...(previousYearHours || []), ...(currentYearHours || [])];
        const result = createMonthlyArray(0);
        const mult = multiplier || loadMultipliers().FR;

        for (let index = 12; index < 24; index += 1) {
            const start = Math.max(0, index - 11);
            const numerator = mergedNumerator.slice(start, index + 1).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
            const hours = mergedHours.slice(start, index + 1).reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
            result[index - 12] = computeRate(numerator, hours, mult);
        }
        return result;
    }

    const HseMetrics = {
        DEFAULT_MULTIPLIERS,
        loadMultipliers,
        getWorkConfig,
        parseDate,
        getTextBag,
        getDaysLost,
        isFatality,
        isLostTimeIncident,
        isFirstAidIncident,
        isNonLostTimeIncident,
        isRecordableIncident,
        isInjuryIncident,
        classifyIncident,
        computeRate,
        computeRates,
        formatRate,
        formatRateDisplay,
        resolveYtdManHours,
        resolveYtdManDays,
        buildMonthlyBase,
        buildMonthlyRateSeries,
        aggregatePeriod,
        aggregateYtd,
        getDashboardSnapshot,
        getScorecardRates,
        getYtdRate,
        calculateRollingSeries,
        currentYtdLimit,
        getManHoursForMonth,
        getUnifiedIncidents,
        getIncidentsForMetrics,
        sumSlice
    };

    global.HseMetrics = HseMetrics;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = HseMetrics;
    }
})(typeof window !== 'undefined' ? window : globalThis);
