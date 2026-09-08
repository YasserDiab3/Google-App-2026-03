/**
 * Self-test: حساب أيام الإجازة / فقد أيام العمل في سجل الحوادث.
 * تشغيل: node tools/incidents-leave-days-selftest.js
 */
'use strict';

function calculateTotalLeaveDays(leaveStartDate, returnToWorkDate) {
    if (!leaveStartDate || !returnToWorkDate) return 0;
    const toLocalDate = (value) => {
        const raw = String(value).trim().split('T')[0];
        const parts = raw.split('-').map((part) => parseInt(part, 10));
        if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
        return new Date(parts[0], parts[1] - 1, parts[2]);
    };
    const start = toLocalDate(leaveStartDate);
    const end = toLocalDate(returnToWorkDate);
    if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
    if (end < start) return 0;
    const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
}

function resolveRegistryLeaveFields(incident, existingEntry = null) {
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
        totalLeaveDays: calculateTotalLeaveDays(leaveStartDate, returnToWorkDate)
    };
}

function assertEq(actual, expected, label) {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, got ${actual}`);
    }
}

// بدون تواريخ → 0 يوم (لا فقد عمل)
assertEq(calculateTotalLeaveDays('', ''), 0, 'empty dates');
assertEq(calculateTotalLeaveDays('2026-03-01', ''), 0, 'start only');
assertEq(calculateTotalLeaveDays('', '2026-03-01'), 0, 'end only');

// مع تواريخ → حساب شامل
assertEq(calculateTotalLeaveDays('2026-03-01', '2026-03-01'), 1, 'same day inclusive');
assertEq(calculateTotalLeaveDays('2026-03-01', '2026-03-03'), 3, 'three days inclusive');
assertEq(calculateTotalLeaveDays('2026-03-05', '2026-03-01'), 0, 'invalid range');

// حادث بدون إجازة مسجلة — لا افتراض تاريخ الحادث
const noLeaveIncident = { date: '2026-06-15T10:00:00.000Z' };
const noLeaveFields = resolveRegistryLeaveFields(noLeaveIncident);
assertEq(noLeaveFields.totalLeaveDays, 0, 'incident without leave dates');
assertEq(noLeaveFields.leaveStartDate, '', 'no implicit leave start');

// إصابة بدون فقد أيام عمل في التحقيق
const nltiIncident = {
    investigation: { incidentTypes: ['injury-no-lost'] },
    leaveStartDate: '2026-06-01',
    returnToWorkDate: '2026-06-05'
};
const nltiFields = resolveRegistryLeaveFields(nltiIncident);
assertEq(nltiFields.totalLeaveDays, 0, 'injury-no-lost forces zero days');
assertEq(nltiFields.leaveStartDate, '', 'injury-no-lost clears leave start');

// إصابة مع فقد أيام عمل
const ltiIncident = {
    investigation: { incidentTypes: ['injury-lost'] },
    leaveStartDate: '2026-06-01',
    returnToWorkDate: '2026-06-05'
};
const ltiFields = resolveRegistryLeaveFields(ltiIncident);
assertEq(ltiFields.totalLeaveDays, 5, 'injury-lost with explicit dates');

console.log('incidents-leave-days-selftest: all passed');
