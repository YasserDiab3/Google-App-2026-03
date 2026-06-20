/**
 * Safety Calendar Events — تجميع أحداث السلامة من AppState (read-only)
 */
(function () {
    'use strict';

    const ASSIGNEE_FILTER_CATEGORIES = new Set(['user-tasks', 'action-tracking', 'safety-team-task']);

    function isAssigneeFilteredCategory(category) {
        return ASSIGNEE_FILTER_CATEGORIES.has(category);
    }

    const SAFETY_CALENDAR_CATEGORIES = {
        'periodic-schedule': { label: 'جدولة فحوصات', color: '#2563eb', moduleKey: 'periodic-inspections' },
        'periodic-record': { label: 'سجل فحص', color: '#1d4ed8', moduleKey: 'periodic-inspections' },
        'daily-safety-check': { label: 'قائمة مرور يومي', color: '#3b82f6', moduleKey: 'periodic-inspections' },
        training: { label: 'تدريب', color: '#7c3aed', moduleKey: 'training' },
        'legal-training': { label: 'تدريب قانوني', color: '#6d28d9', moduleKey: 'training' },
        ptw: { label: 'تصريح عمل', color: '#d97706', moduleKey: 'ptw' },
        incidents: { label: 'حادث', color: '#dc2626', moduleKey: 'incidents' },
        nearmiss: { label: 'حادث وشيك', color: '#ea580c', moduleKey: 'nearmiss' },
        observations: { label: 'ملاحظة يومية', color: '#0891b2', moduleKey: 'daily-observations' },
        'user-tasks': { label: 'مهمة مستخدم', color: '#6366f1', moduleKey: 'user-tasks' },
        'safety-team-task': { label: 'مهمة فريق السلامة', color: '#4f46e5', moduleKey: 'safety-health-management' },
        'hse-audit': { label: 'تدقيق HSE', color: '#0d9488', moduleKey: 'iso' },
        'fire-inspection': { label: 'فحص إطفاء', color: '#b91c1c', moduleKey: 'fire-equipment' },
        emergency: { label: 'تنبيه طوارئ', color: '#be123c', moduleKey: 'emergency' },
        'action-tracking': { label: 'متابعة إجراء', color: '#059669', moduleKey: 'action-tracking' },
        violations: { label: 'مخالفة', color: '#991b1b', moduleKey: 'violations' },
        behavior: { label: 'مراقبة سلوك', color: '#ca8a04', moduleKey: 'behavior-monitoring' }
    };

    const FIELD_LABELS = {
        id: 'المعرف', title: 'العنوان', name: 'الاسم', description: 'الوصف', location: 'الموقع',
        status: 'الحالة', date: 'التاريخ', startDate: 'تاريخ البداية', endDate: 'تاريخ النهاية',
        dueDate: 'تاريخ الاستحقاق', scheduledDate: 'التاريخ المجدول', nextDueDate: 'الموعد القادم',
        inspectionDate: 'تاريخ الفحص', violationDate: 'تاريخ المخالفة', issueDate: 'تاريخ الإصدار',
        originalTargetDate: 'الموعد المستهدف', expectedCompletionDate: 'موعد الإنجاز المتوقع',
        severity: 'الشدة', priority: 'الأولوية', assignedTo: 'المكلف', responsible: 'المسؤول',
        trainer: 'المدرب', workType: 'نوع العمل', workDescription: 'وصف العمل', categoryName: 'الفئة',
        frequency: 'التكرار', result: 'النتيجة', observerName: 'المراقب', reportedBy: 'المُبلّغ',
        incidentType: 'نوع الحادث', violationType: 'نوع المخالفة', taskTitle: 'عنوان المهمة',
        type: 'النوع', message: 'الرسالة', inspectorName: 'المفتش', siteName: 'الموقع',
        department: 'الإدارة', expiryDate: 'تاريخ الانتهاء', sentDate: 'تاريخ الإرسال'
    };

    function esc(str) {
        if (typeof Utils !== 'undefined' && typeof Utils.escapeHTML === 'function') {
            return Utils.escapeHTML(str);
        }
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function hasAccess(moduleKey) {
        if (typeof Permissions === 'undefined' || typeof Permissions.hasAccess !== 'function') {
            return false;
        }
        if (isEffectiveAdmin()) {
            return true;
        }
        return Permissions.hasAccess(moduleKey);
    }

    function isEffectiveAdmin() {
        if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function') {
            return Permissions.isCurrentUserEffectiveAdmin();
        }
        const u = (typeof AppState !== 'undefined' && AppState.currentUser) ? AppState.currentUser : null;
        if (!u) return false;
        return u.role === 'admin' || u.role === 'safety_officer';
    }

    function getCurrentUserIds() {
        const u = (typeof AppState !== 'undefined' && AppState.currentUser) ? AppState.currentUser : {};
        const ids = new Set();
        ['id', 'email', 'name', 'fullName', 'username'].forEach((k) => {
            const v = u[k];
            if (v != null && String(v).trim()) {
                ids.add(String(v).trim().toLowerCase());
            }
        });
        return ids;
    }

    function getCurrentUserDepartment() {
        const u = (typeof AppState !== 'undefined' && AppState.currentUser) ? AppState.currentUser : {};
        return u.department ? String(u.department).trim() : '';
    }

    function normalizeAssigneeId(val) {
        if (val == null) return '';
        return String(val).trim().toLowerCase();
    }

    function valueMatchesUserIds(val, userIds) {
        if (val == null || val === '') return false;
        if (typeof val === 'string') {
            const s = val.trim();
            if (s === 'all' || s === 'جميع المستخدمين') return true;
            try {
                const parsed = JSON.parse(s);
                if (Array.isArray(parsed)) {
                    return parsed.some((x) => userIds.has(normalizeAssigneeId(x)));
                }
            } catch (_e) { /* not json */ }
            return userIds.has(normalizeAssigneeId(s));
        }
        if (Array.isArray(val)) {
            return val.some((x) => userIds.has(normalizeAssigneeId(x)));
        }
        return userIds.has(normalizeAssigneeId(val));
    }

    function matchesDepartmentTask(record, userDept) {
        if (!userDept || !record) return false;
        let departments = record.assignedDepartments;
        if (!departments) return false;
        if (typeof departments === 'string') {
            try {
                departments = JSON.parse(departments);
            } catch (_e) {
                departments = [departments];
            }
        }
        if (!Array.isArray(departments)) departments = [departments];
        return departments.some((d) => String(d).trim() === userDept);
    }

    function isRecordAssignedToUser(record, category, userIds, userDept) {
        if (!record) return false;
        const ids = userIds || getCurrentUserIds();
        const dept = userDept != null ? userDept : getCurrentUserDepartment();
        switch (category) {
            case 'user-tasks':
                if (valueMatchesUserIds(record.userId, ids)) return true;
                if (valueMatchesUserIds(record.assignedTo, ids)) return true;
                if (matchesDepartmentTask(record, dept)) return true;
                return false;
            case 'action-tracking':
                return valueMatchesUserIds(record.responsible, ids)
                    || valueMatchesUserIds(record.assignedTo, ids);
            case 'safety-team-task':
                return valueMatchesUserIds(record.memberId, ids)
                    || valueMatchesUserIds(record.userId, ids)
                    || valueMatchesUserIds(record.assignedTo, ids)
                    || valueMatchesUserIds(record.responsible, ids);
            default:
                return false;
        }
    }

    function getAssigneeHint(record, category) {
        if (!record) return '';
        const fieldsByCat = {
            'user-tasks': ['userId', 'assignedTo'],
            'action-tracking': ['responsible', 'assignedTo'],
            'safety-team-task': ['memberId', 'assignedTo', 'userId', 'responsible']
        };
        const fields = fieldsByCat[category] || ['assignedTo', 'responsible', 'userId'];
        for (let i = 0; i < fields.length; i++) {
            const v = record[fields[i]];
            if (v != null && String(v).trim() && String(v).trim() !== 'all') {
                return String(v).trim();
            }
        }
        return '';
    }

    function resolveDefaultAssigneeMode(options) {
        if (options && (options.assigneeMode === 'all' || options.assigneeMode === 'mine')) {
            return options.assigneeMode;
        }
        return isEffectiveAdmin() ? 'all' : 'mine';
    }

    function parseDateSafe(raw) {
        if (raw == null || raw === '') return null;
        const d = new Date(raw);
        if (isNaN(d.getTime())) return null;
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function firstDate(record, fields) {
        for (let i = 0; i < fields.length; i++) {
            const v = parseDateSafe(record[fields[i]]);
            if (v) return v;
        }
        return null;
    }

    function pickTitle(record, fallbacks) {
        for (let i = 0; i < fallbacks.length; i++) {
            const v = record[fallbacks[i]];
            if (v != null && String(v).trim()) return String(v).trim();
        }
        return '';
    }

    function formatFieldValue(key, val) {
        if (val == null || val === '') return '';
        if (typeof val === 'object') {
            try { return JSON.stringify(val); } catch (_e) { return String(val); }
        }
        if (key.toLowerCase().includes('date') || key === 'dueDate') {
            const parsed = parseDateSafe(val);
            if (parsed && typeof Utils !== 'undefined' && typeof Utils.formatDate === 'function') {
                try { return Utils.formatDate(val); } catch (_e) { return parsed; }
            }
            return parsed || String(val);
        }
        return String(val);
    }

    function buildDetailFields(record) {
        if (!record || typeof record !== 'object') return [];
        const skip = new Set(['photo', 'image', 'attachments', 'comments', 'updates', 'timeLog', 'userProgress']);
        const fields = [];
        Object.keys(record).forEach((key) => {
            if (skip.has(key)) return;
            const val = record[key];
            if (val == null || val === '') return;
            if (typeof val === 'object' && !Array.isArray(val)) return;
            fields.push({
                label: FIELD_LABELS[key] || key,
                value: formatFieldValue(key, val)
            });
        });
        return fields;
    }

    function getAppArray(key) {
        const data = (typeof AppState !== 'undefined' && AppState.appData) ? AppState.appData : {};
        const arr = data[key];
        return Array.isArray(arr) ? arr : [];
    }

    function getRecordForEvent(category, sourceId) {
        if (!sourceId) return null;
        const id = String(sourceId);
        const findById = (arr) => (Array.isArray(arr) ? arr : []).find((r) => String(r.id) === id);

        switch (category) {
            case 'periodic-schedule': return findById(getAppArray('periodicInspectionSchedules'));
            case 'periodic-record': return findById(getAppArray('periodicInspectionRecords'));
            case 'daily-safety-check': return findById(getAppArray('dailySafetyCheckList'));
            case 'training': return findById(getAppArray('training'));
            case 'legal-training': return findById(getAppArray('legalTrainings'));
            case 'ptw': return findById(getAppArray('ptw'));
            case 'incidents': return findById(getAppArray('incidents'));
            case 'nearmiss': return findById(getAppArray('nearmiss'));
            case 'observations': return findById(getAppArray('dailyObservations'));
            case 'user-tasks': return findById(getAppArray('userTasks'));
            case 'safety-team-task': return findById(getAppArray('safetyTeamTasks'));
            case 'hse-audit': return findById(getAppArray('hseAudits'));
            case 'fire-inspection': return findById(getAppArray('fireEquipmentInspections'));
            case 'emergency': return findById(getAppArray('emergencyAlerts'));
            case 'action-tracking': return findById(getAppArray('actionTrackingRegister'));
            case 'violations': return findById(getAppArray('violations'));
            case 'behavior': return findById(getAppArray('behaviorMonitoring'));
            default: return null;
        }
    }

    function pushEvent(events, meta) {
        if (events.length >= MAX_EVENTS) return false;
        const cat = SAFETY_CALENDAR_CATEGORIES[meta.category];
        if (!cat) return true;
        const start = meta.start;
        if (!start) return true;
        const sourceId = meta.sourceId != null ? String(meta.sourceId) : '';
        const titleBase = meta.title || cat.label;
        const suffix = meta.dateKind ? ` (${meta.dateKind})` : '';
        events.push({
            id: `${meta.category}:${sourceId}:${meta.dateKind || 'main'}:${start}`,
            title: `${cat.label} — ${titleBase}${suffix}`,
            start,
            allDay: true,
            backgroundColor: cat.color,
            borderColor: cat.color,
            extendedProps: {
                category: meta.category,
                categoryLabel: cat.label,
                moduleKey: cat.moduleKey,
                sourceId,
                dateKind: meta.dateKind || 'main',
                assigneeHint: meta.assigneeHint || ''
            }
        });
        return true;
    }

    function addFromList(events, category, records, dateFields, titleFields, dateKinds, assigneeContext) {
        const cat = SAFETY_CALENDAR_CATEGORIES[category];
        if (!cat || !hasAccess(cat.moduleKey)) return;
        const assigneeMode = assigneeContext && assigneeContext.mode === 'mine' ? 'mine' : 'all';
        const userIds = (assigneeContext && assigneeContext.userIds) || getCurrentUserIds();
        const userDept = (assigneeContext && assigneeContext.userDept != null)
            ? assigneeContext.userDept
            : getCurrentUserDepartment();
        const assigneeHint = getAssigneeHint.bind(null);

        (records || []).forEach((rec) => {
            if (!rec || events.length >= MAX_EVENTS) return;
            if (assigneeMode === 'mine'
                && isAssigneeFilteredCategory(category)
                && !isRecordAssignedToUser(rec, category, userIds, userDept)) {
                return;
            }
            const sourceId = rec.id;
            const hint = assigneeHint(rec, category);
            if (dateKinds && dateKinds.length) {
                dateKinds.forEach((dk) => {
                    if (events.length >= MAX_EVENTS) return;
                    const start = parseDateSafe(rec[dk.field]);
                    if (!start) return;
                    pushEvent(events, {
                        category,
                        sourceId,
                        start,
                        title: pickTitle(rec, titleFields),
                        dateKind: dk.label,
                        assigneeHint: hint
                    });
                });
            } else {
                const start = firstDate(rec, dateFields);
                pushEvent(events, {
                    category,
                    sourceId,
                    start,
                    title: pickTitle(rec, titleFields),
                    assigneeHint: hint
                });
            }
        });
    }

    function buildSafetyCalendarEvents(options) {
        const events = [];
        const enabledCategories = options && options.categories
            ? new Set(options.categories)
            : null;
        const assigneeMode = resolveDefaultAssigneeMode(options || {});
        const assigneeContext = {
            mode: assigneeMode,
            userIds: getCurrentUserIds(),
            userDept: getCurrentUserDepartment()
        };

        const allow = (cat) => !enabledCategories || enabledCategories.has(cat);
        const ctx = assigneeContext;

        try {
            if (allow('periodic-schedule')) {
                addFromList(events, 'periodic-schedule', getAppArray('periodicInspectionSchedules'),
                    ['nextDueDate', 'scheduledDate', 'startDate'],
                    ['categoryName', 'title', 'location', 'id'], null, ctx);
            }
            if (allow('periodic-record')) {
                addFromList(events, 'periodic-record', getAppArray('periodicInspectionRecords'),
                    ['inspectionDate', 'date'],
                    ['categoryName', 'location', 'inspector', 'id'], null, ctx);
            }
            if (allow('daily-safety-check')) {
                addFromList(events, 'daily-safety-check', getAppArray('dailySafetyCheckList'),
                    ['date'],
                    ['siteName', 'inspectorName', 'reportNumber', 'id'], null, ctx);
            }
            if (allow('training')) {
                addFromList(events, 'training', getAppArray('training'),
                    ['date', 'startDate'],
                    ['name', 'trainer', 'id'], null, ctx);
            }
            if (allow('legal-training')) {
                addFromList(events, 'legal-training', getAppArray('legalTrainings'),
                    null,
                    ['title', 'legalReference', 'id'],
                    [
                        { field: 'scheduledDate', label: 'مجدول' },
                        { field: 'nextDueDate', label: 'استحقاق' },
                        { field: 'expiryDate', label: 'انتهاء' },
                        { field: 'actualDate', label: 'فعلي' }
                    ], ctx);
            }
            if (allow('ptw')) {
                addFromList(events, 'ptw', getAppArray('ptw'),
                    null,
                    ['workDescription', 'workType', 'location', 'id'],
                    [
                        { field: 'startDate', label: 'بداية' },
                        { field: 'endDate', label: 'نهاية' }
                    ], ctx);
            }
            if (allow('incidents')) {
                addFromList(events, 'incidents', getAppArray('incidents'),
                    ['date', 'incidentDate', 'createdAt'],
                    ['title', 'description', 'location', 'id'], null, ctx);
            }
            if (allow('nearmiss')) {
                addFromList(events, 'nearmiss', getAppArray('nearmiss'),
                    ['date'],
                    ['description', 'location', 'observerName', 'id'], null, ctx);
            }
            if (allow('observations')) {
                addFromList(events, 'observations', getAppArray('dailyObservations'),
                    null,
                    ['details', 'locationName', 'observerName', 'id'],
                    [
                        { field: 'date', label: 'الملاحظة' },
                        { field: 'expectedCompletionDate', label: 'إنجاز متوقع' }
                    ], ctx);
            }
            if (allow('user-tasks')) {
                addFromList(events, 'user-tasks', getAppArray('userTasks'),
                    ['dueDate'],
                    ['title', 'taskTitle', 'description', 'id'], null, ctx);
            }
            if (allow('safety-team-task')) {
                addFromList(events, 'safety-team-task', getAppArray('safetyTeamTasks'),
                    ['dueDate'],
                    ['taskTitle', 'taskDescription', 'id'], null, ctx);
            }
            if (allow('hse-audit')) {
                addFromList(events, 'hse-audit', getAppArray('hseAudits'),
                    ['date'],
                    ['type', 'auditor', 'description', 'id'], null, ctx);
            }
            if (allow('fire-inspection')) {
                addFromList(events, 'fire-inspection', getAppArray('fireEquipmentInspections'),
                    ['inspectionDate'],
                    ['assetNumber', 'inspector', 'result', 'id'], null, ctx);
            }
            if (allow('emergency')) {
                addFromList(events, 'emergency', getAppArray('emergencyAlerts'),
                    null,
                    ['title', 'message', 'id'],
                    [
                        { field: 'scheduledDate', label: 'مجدول' },
                        { field: 'sentDate', label: 'إرسال' }
                    ], ctx);
            }
            if (allow('action-tracking')) {
                addFromList(events, 'action-tracking', getAppArray('actionTrackingRegister'),
                    null,
                    ['typeOfIssue', 'observationIssueHazard', 'id'],
                    [
                        { field: 'originalTargetDate', label: 'مستهدف' },
                        { field: 'issueDate', label: 'إصدار' }
                    ], ctx);
            }
            if (allow('violations')) {
                addFromList(events, 'violations', getAppArray('violations'),
                    ['violationDate'],
                    ['violationType', 'employeeName', 'contractorName', 'id'], null, ctx);
            }
            if (allow('behavior')) {
                addFromList(events, 'behavior', getAppArray('behaviorMonitoring'),
                    ['date'],
                    ['employeeName', 'behaviorType', 'description', 'id'], null, ctx);
            }
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('SafetyCalendarEvents build error:', err);
            }
        }

        return {
            events,
            truncated: events.length >= MAX_EVENTS,
            maxEvents: MAX_EVENTS,
            assigneeMode
        };
    }

    function summarizeEvents(events) {
        const today = parseDateSafe(new Date());
        const now = new Date();
        const weekEnd = new Date(now);
        weekEnd.setDate(weekEnd.getDate() + 7);
        const weekEndStr = parseDateSafe(weekEnd);

        let todayCount = 0;
        let weekCount = 0;
        let overdueCount = 0;

        (events || []).forEach((ev) => {
            const d = ev.start;
            if (!d) return;
            if (d === today) todayCount++;
            if (d >= today && d <= weekEndStr) weekCount++;
            if (d < today && (ev.extendedProps.category === 'user-tasks'
                || ev.extendedProps.category === 'safety-team-task'
                || ev.extendedProps.category === 'action-tracking')) {
                overdueCount++;
            }
        });

        return { todayCount, weekCount, overdueCount, today };
    }

    window.SafetyCalendarEvents = {
        MAX_EVENTS,
        SAFETY_CALENDAR_CATEGORIES,
        parseDateSafe,
        buildSafetyCalendarEvents,
        getRecordForEvent,
        buildDetailFields,
        summarizeEvents,
        esc,
        hasAccess,
        isEffectiveAdmin,
        resolveDefaultAssigneeMode,
        getCurrentUserIds,
        getCurrentUserDepartment,
        isRecordAssignedToUser,
        isAssigneeFilteredCategory
    };
})();
