/**
 * Self-test: تطابق لوحة التحكم YTD مع السكوركارد عبر HseMetrics.
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

// ثابت 8×22×1 موظف
const monthly = HseMetrics.buildMonthlyBase(2026, fixtures);
const hoursJan = monthly.manHours[0];
if (hoursJan <= 0) throw new Error('manHours should be > 0');

const snap = HseMetrics.getDashboardSnapshot(fixtures, { year: 2026, ytdLimit: 3 });
const ytdTrir = HseMetrics.getYtdRate(monthly.recordables, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.TRIR);
const ytdAfr = HseMetrics.getYtdRate(monthly.injuries, monthly.manHours, 3, HseMetrics.DEFAULT_MULTIPLIERS.AFR);

assertClose(snap.rates.trir, ytdTrir, 'Dashboard TRIR = Scorecard YTD TRIR');
assertClose(snap.rates.afr, ytdAfr, 'Dashboard AFR = Scorecard YTD AFR');

// Jan LTI + Feb NLTI + Mar first aid (injury) + Apr fatality (recordable)
assertClose(snap.totals.recordables, 3, 'recordables YTD through April index 3');
assertClose(snap.totals.injuries, 4, 'injuries YTD through April index 3');
assertClose(snap.totals.fatalities, 1, 'fatality in April');

console.log('hse-metrics-selftest: OK');
