/**
 * Safety Calendar — أعياد مصر + مناسبات عالمية (سلامة/بيئة)
 * fixed = تكرار سنوي (شهر/يوم) | dated = تواريخ محددة (أعياد متحركة)
 */
(function () {
    'use strict';

    /** @type {{month:number,day:number,title:string}[]} */
    const EGYPT_FIXED = [
        { month: 1, day: 7, title: 'عيد الميلاد المجيد' },
        { month: 1, day: 25, title: 'عيد الثورة 25 يناير' },
        { month: 4, day: 25, title: 'عيد تحرير سيناء' },
        { month: 5, day: 1, title: 'عيد العمال' },
        { month: 6, day: 30, title: 'عيد ثورة 30 يونيو' },
        { month: 7, day: 23, title: 'عيد ثورة 23 يوليو' },
        { month: 10, day: 6, title: 'عيد القوات المسلحة' }
    ];

    /** @type {{start:string,end?:string,title:string}[]} */
    const EGYPT_DATED = [
        { start: '2025-04-20', title: 'عيد القيامة المجيد (أقباط)' },
        { start: '2025-04-21', title: 'شم النسيم' },
        { start: '2025-03-30', end: '2025-04-02', title: 'عيد الفطر المبارك' },
        { start: '2025-06-06', end: '2025-06-09', title: 'عيد الأضحى المبارك' },
        { start: '2025-06-26', title: 'رأس السنة الهجرية' },
        { start: '2025-09-05', title: 'المولد النبوي الشريف' },
        { start: '2026-04-12', title: 'عيد القيامة المجيد (أقباط)' },
        { start: '2026-04-13', title: 'شم النسيم' },
        { start: '2026-03-20', end: '2026-03-23', title: 'عيد الفطر المبارك' },
        { start: '2026-05-27', end: '2026-05-30', title: 'عيد الأضحى المبارك' },
        { start: '2026-06-16', title: 'رأس السنة الهجرية' },
        { start: '2026-08-25', title: 'المولد النبوي الشريف' },
        { start: '2027-04-04', title: 'عيد القيامة المجيد (أقباط)' },
        { start: '2027-04-05', title: 'شم النسيم' },
        { start: '2027-03-10', end: '2027-03-13', title: 'عيد الفطر المبارك' },
        { start: '2027-05-17', end: '2027-05-20', title: 'عيد الأضحى المبارك' },
        { start: '2027-06-06', title: 'رأس السنة الهجرية' },
        { start: '2027-08-15', title: 'المولد النبوي الشريف' }
    ];

    /** @type {{month:number,day:number,title:string}[]} */
    const INTL_HSE_ENV = [
        { month: 2, day: 4, title: 'اليوم العالمي للسرطان' },
        { month: 3, day: 21, title: 'اليوم العالمي للغابات' },
        { month: 3, day: 22, title: 'اليوم العالمي للمياه' },
        { month: 4, day: 7, title: 'اليوم العالمي للصحة' },
        { month: 4, day: 28, title: 'اليوم العالمي للسلامة والصحة المهنية' },
        { month: 5, day: 31, title: 'اليوم العالمي لرفض التدخين' },
        { month: 6, day: 5, title: 'اليوم العالمي للبيئة' },
        { month: 6, day: 8, title: 'اليوم العالمي للمحيطات' },
        { month: 6, day: 17, title: 'اليوم العالمي لمكافحة التصحر' },
        { month: 9, day: 16, title: 'اليوم العالمي لحماية طبقة الأوزون' },
        { month: 9, day: 21, title: 'اليوم العالمي للسلام' },
        { month: 10, day: 13, title: 'اليوم الدولي للحد من مخاطر الكوارث' },
        { month: 11, day: 14, title: 'اليوم العالمي للسكري' },
        { month: 12, day: 3, title: 'اليوم العالمي لذوي الإعاقة' },
        { month: 12, day: 5, title: 'اليوم العالمي للتربة' }
    ];

    function pad2(n) {
        return String(n).padStart(2, '0');
    }

    function toIso(y, m, d) {
        return `${y}-${pad2(m)}-${pad2(d)}`;
    }

    function addExclusiveEnd(endInclusive) {
        if (!endInclusive) return null;
        const d = new Date(endInclusive + 'T12:00:00');
        if (isNaN(d.getTime())) return null;
        d.setDate(d.getDate() + 1);
        return toIso(d.getFullYear(), d.getMonth() + 1, d.getDate());
    }

    function expandFixedForYears(fixedList, years, category, idPrefix) {
        const out = [];
        (years || []).forEach((year) => {
            (fixedList || []).forEach((item, idx) => {
                out.push({
                    id: `${idPrefix}:fixed:${year}:${item.month}-${item.day}:${idx}`,
                    title: item.title,
                    start: toIso(year, item.month, item.day),
                    category,
                    sourceId: `${idPrefix}-${item.month}-${item.day}`,
                    recurring: 'yearly'
                });
            });
        });
        return out;
    }

    function expandDatedForYears(datedList, years) {
        const yearSet = new Set(years || []);
        const out = [];
        (datedList || []).forEach((item, idx) => {
            const y = parseInt(String(item.start).slice(0, 4), 10);
            if (!yearSet.has(y)) return;
            out.push({
                id: `egypt-holiday:dated:${item.start}:${idx}`,
                title: item.title,
                start: item.start,
                end: item.end ? addExclusiveEnd(item.end) : null,
                category: 'egypt-holiday',
                sourceId: `egypt-dated-${item.start}`,
                recurring: 'once'
            });
        });
        return out;
    }

    function getDefaultYears() {
        const y = new Date().getFullYear();
        return [y - 1, y, y + 1, y + 2];
    }

    /**
     * @param {{years?: number[]}} options
     * @returns {Array<{id:string,title:string,start:string,end?:string|null,category:string,sourceId:string,recurring?:string}>}
     */
    function getReferenceEvents(options) {
        const years = (options && Array.isArray(options.years) && options.years.length)
            ? options.years
            : getDefaultYears();
        const egyptFixed = expandFixedForYears(EGYPT_FIXED, years, 'egypt-holiday', 'egypt');
        const egyptDated = expandDatedForYears(EGYPT_DATED, years);
        const intl = expandFixedForYears(INTL_HSE_ENV, years, 'intl-hse-env', 'intl');
        return egyptFixed.concat(egyptDated, intl);
    }

    window.SafetyCalendarReferenceEvents = {
        getReferenceEvents,
        getDefaultYears,
        EGYPT_FIXED,
        EGYPT_DATED,
        INTL_HSE_ENV
    };
})();
