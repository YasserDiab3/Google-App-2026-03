/**
 * Self-test: تطابق لوحة التحكم YTD مع السكوركارد + صحة الصيغ.
 * تشغيل: node tools/hse-metrics-selftest.js
 */
'use strict';

const HseMetrics = require('../Frontend/js/modules/services/hse-metrics.js');

function assertClose(actual, expected, label, tolerance = 0.01) {
    const a = parseFloat(actual);
    const e = parseFloat(expected);
    if (Math.abs(a - e) > tolerance) {
        throw new Error(`${label}: expected ${e}, got ${a}`);
    }
}

function assertEq(actual, expected, label) {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, got ${actual}`);
    }
}

// ─── صيغ أساسية ───
assertClose(
    HseMetrics.computeRate(2, 1000000, 200000),
    0.4,
    'TRIR formula (2 recordables, 1M hours)'
);
assertClose(
    HseMetrics.computeRate(3, 500000, 1000000),
    6,
    'AFR formula (3 injuries, 500k hours)'
);
assertClose(
    HseMetrics.computeRate(1, 1000000, 100000000),
    100,
    'FAR formula (1 fatality, 1M hours)'
);
assertClose(
    HseMetrics.computeRate(5, 1000000, 1000000),
    5,
    'SR formula (5 lost days, 1M hours)'
);
assertClose(
    HseMetrics.computeRate(10, 500000, 1000000),
    20,
    'IR formula (10 incidents, 500k hours)'
);

// ─── تنسيق عرض ───
assertEq(HseMetrics.formatRateDisplay(852.2727, 2), '852.27', 'formatRateDisplay 2dp');
assertEq(HseMetrics.formatRateDisplay(0.12345, 4), '0.1235', 'formatRateDisplay 4dp FAR');

const fixtures = {
    employees: [{ id: 'e1', status: 'active', hireDate: '2020-01-01' }],
    incidents: [
        { id: 'i1', date: '2026-01-15', investigation: { incidentTypes: ['injury-lost'] }, lostDays: 5 },
        { id: 'i2', date: '2026-02-10', investigation: { incidentTypes: ['injury-no-lost'] } },
        { id: 'i3', date: '2026-03-05', description: 'first aid case' },
        { id: 'i4', date: '2026-04-01', investigation: { incidentTypes: ['fatality'] } }
    ],
    externalWorkforceMonthly: []
};

const monthly = HseMetrics.buildMonthlyBase(2026, fixtures);
const hoursJan = monthly.manHours[0];
if (hoursJan <= 0) throw new Error('manHours should be > 0');
assertEq(hoursJan, 176, '1 employee × 8 × 22 hours per month');

const snap = HseMetrics.getDashboardSnapshot(fixtures, { year: 2026, ytdLimit: 3 });
const ytdTrir = HseMetrics.getYtdRate(monthly.recordables, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.TRIR);
const ytdAfr = HseMetrics.getYtdRate(monthly.injuries, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.AFR);
const ytdFar = HseMetrics.getYtdRate(monthly.fatalities, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.FAR);
const ytdFr = HseMetrics.getYtdRate(monthly.lti, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.FR);
const ytdSr = HseMetrics.getYtdRate(monthly.daysLost, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.SR);
const ytdIr = HseMetrics.getYtdRate(monthly.totalIncidents, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.IR);

assertClose(snap.rates.trir, ytdTrir, 'Dashboard TRIR = Scorecard YTD TRIR');
assertClose(snap.rates.afr, ytdAfr, 'Dashboard AFR = Scorecard YTD AFR');
assertClose(snap.rates.far, ytdFar, 'Dashboard FAR = Scorecard YTD FAR');
assertClose(snap.rates.fr, ytdFr, 'Dashboard FR = Scorecard YTD FR');
assertClose(snap.rates.sr, ytdSr, 'Dashboard SR = Scorecard YTD SR');
assertClose(snap.rates.ir, ytdIr, 'Dashboard IR = Scorecard YTD IR');

const ytdHours = HseMetrics.sumSlice(monthly.manHours, 3);
assertEq(ytdHours, 704, 'YTD hours 4 months × 176');
assertClose(snap.rates.trir, (3 * 200000) / ytdHours, 'TRIR matches manual formula');
assertClose(snap.rates.afr, (4 * 1000000) / ytdHours, 'AFR matches manual formula');
assertClose(snap.rates.sr, (5 * 1000000) / ytdHours, 'SR matches manual formula');
assertClose(snap.rates.ir, (4 * 1000000) / ytdHours, 'IR matches manual formula');

assertClose(snap.totals.recordables, 3, 'recordables YTD');
assertClose(snap.totals.injuries, 4, 'injuries YTD');
assertClose(snap.totals.fatalities, 1, 'fatalities YTD');
assertClose(snap.totals.lti, 1, 'LTI count YTD (Jan only)');
assertClose(snap.totals.totalIncidents, 4, 'total incidents YTD');
assertClose(snap.totals.daysLost, 5, 'days lost YTD');
assertEq(snap.rates.ltiCount, 1, 'LTI card integer');

const ytdHoursSnap = snap.totals.manHours;
const expectedManDays = Math.round(ytdHoursSnap / 8);
assertClose(snap.totals.manDays, expectedManDays, 'manDays YTD = round(YTD hours / 8)');
assertClose(snap.totals.manDays, 88, 'manDays YTD (1 employee × 22 days × 4 months)');

// دمج سجل الحوادث مع incidents
const mergedFixtures = {
    employees: fixtures.employees,
    incidents: [{ id: 'i1', date: '2026-05-10', title: 'حادث بسيط' }],
    incidentsRegistry: [
        { id: 'r99', incidentDate: '2026-05-20', totalLeaveDays: 3, title: 'من السجل فقط' }
    ]
};
const mergedMonthly = HseMetrics.buildMonthlyBase(2026, mergedFixtures);
assertClose(mergedMonthly.lti[4], 0, 'registry-only excluded when incidents list exists');
assertClose(mergedMonthly.recordables[4], 0, 'no recordable from excluded registry-only row');
assertClose(mergedMonthly.totalIncidents[4], 1, 'incidents list only in May when present');

const registryOnlyFixtures = {
    employees: fixtures.employees,
    incidents: [],
    incidentsRegistry: [
        { id: 'r99', incidentDate: '2026-05-20', totalLeaveDays: 3, title: 'من السجل فقط' }
    ]
};
const registryOnlyMonthly = HseMetrics.buildMonthlyBase(2026, registryOnlyFixtures);
assertClose(registryOnlyMonthly.lti[4], 1, 'registry-only LTI when no incidents list');
assertClose(registryOnlyMonthly.totalIncidents[4], 1, 'registry fallback when incidents empty');

// لا يُعدّ سجل مرتبط بنفس incidentId مرتين
const linkedFixtures = {
    employees: fixtures.employees,
    incidents: [
        { id: 'INC-1', date: '2026-06-01', title: 'حادث 1' },
        { id: 'INC-2', date: '2026-06-02', title: 'حادث 2' }
    ],
    incidentsRegistry: [
        { id: 'INCR-1', incidentId: 'INC-1', incidentDate: '2026-06-01' },
        { id: 'INCR-2', incidentId: 'INC-2', incidentDate: '2026-06-02' },
        { id: 'INCR-3', incidentId: 'INC-DELETED', incidentDate: '2026-06-03', title: 'يتيم' }
    ]
};
assertEq(HseMetrics.getUnifiedIncidents(linkedFixtures).length, 3, 'linked registry rows not double-counted; orphan kept');
const linkedMonthly = HseMetrics.buildMonthlyBase(2026, linkedFixtures);
assertClose(linkedMonthly.totalIncidents[5], 2, 'June incidents: incidents list only when present (orphan registry excluded)');

// buildRegistryMap يربط السجل بـ incidentId
const regMapFixtures = {
    incidents: [{ id: 'INC-1', date: '2026-07-01', investigation: { incidentTypes: ['injury-lost'] }, lostDays: 0 }],
    incidentsRegistry: [{ id: 'INCR-1', incidentId: 'INC-1', incidentDate: '2026-07-01', totalLeaveDays: 7 }]
};
const regMapMonthly = HseMetrics.buildMonthlyBase(2026, regMapFixtures);
assertClose(regMapMonthly.daysLost[6], 7, 'registry totalLeaveDays applied via incidentId map');
assertClose(regMapMonthly.lti[6], 1, 'LTI from incident with registry enrichment');

console.log('hse-metrics-selftest: OK');
