/**
 * Safety Calendar Events — تجميع أحداث السلامة من AppState (read-only)
 */
(function () {
    'use strict';

    const MAX_EVENTS = 2500;

    const ASSIGNEE_FILTER_CATEGORIES = new Set(['user-tasks', 'action-tracking', 'safety-team-task']);

    function isAssigneeFilteredCategory(category) {
        return ASSIGNEE_FILTER_CATEGORIES.has(category);
    }

    const SAFETY_CALENDAR_CATEGORIES = {
        'periodic-schedule': { labelKey: 'module.sc.cat.periodicSchedule', label: 'جدولة فحوصات', color: '#2563eb', moduleKey: 'periodic-inspections' },
        'periodic-record': { labelKey: 'module.sc.cat.periodicRecord', label: 'سجل فحص', color: '#1d4ed8', moduleKey: 'periodic-inspections' },
        'daily-safety-check': { labelKey: 'module.sc.cat.dailySafetyCheck', label: 'قائمة مرور يومي', color: '#3b82f6', moduleKey: 'periodic-inspections' },
        training: { labelKey: 'module.sc.cat.training', label: 'تدريب', color: '#7c3aed', moduleKey: 'training' },
        'legal-training': { labelKey: 'module.sc.cat.legalTraining', label: 'تدريب قانوني', color: '#6d28d9', moduleKey: 'training' },
        ptw: { labelKey: 'module.sc.cat.ptw', label: 'تصريح عمل', color: '#d97706', moduleKey: 'ptw' },
        incidents: { labelKey: 'module.sc.cat.incidents', label: 'حادث', color: '#dc2626', moduleKey: 'incidents' },
        nearmiss: { labelKey: 'module.sc.cat.nearmiss', label: 'حادث وشيك', color: '#ea580c', moduleKey: 'nearmiss' },
        observations: { labelKey: 'module.sc.cat.observations', label: 'ملاحظة يومية', color: '#0891b2', moduleKey: 'daily-observations' },
        'user-tasks': { labelKey: 'module.sc.cat.userTasks', label: 'مهمة مستخدم', color: '#6366f1', moduleKey: 'user-tasks' },
        'safety-team-task': { labelKey: 'module.sc.cat.safetyTeamTask', label: 'مهمة فريق السلامة', color: '#4f46e5', moduleKey: 'safety-health-management' },
        'hse-audit': { labelKey: 'module.sc.cat.hseAudit', label: 'تدقيق HSE', color: '#0d9488', moduleKey: 'iso' },
        'fire-inspection': { labelKey: 'module.sc.cat.fireInspection', label: 'فحص إطفاء', color: '#b91c1c', moduleKey: 'fire-equipment' },
        emergency: { labelKey: 'module.sc.cat.emergency', label: 'تنبيه طوارئ', color: '#be123c', moduleKey: 'emergency' },
        'action-tracking': { labelKey: 'module.sc.cat.actionTracking', label: 'متابعة إجراء', color: '#059669', moduleKey: 'action-tracking' },
        violations: { labelKey: 'module.sc.cat.violations', label: 'مخالفة', color: '#991b1b', moduleKey: 'violations' },
        behavior: { labelKey: 'module.sc.cat.behavior', label: 'مراقبة سلوك', color: '#ca8a04', moduleKey: 'behavior-monitoring' },
        'clinic-visit': { labelKey: 'module.sc.cat.clinicVisit', label: 'زيارة عيادة', color: '#db2777', moduleKey: 'clinic' },
        'clinic-injury': { labelKey: 'module.sc.cat.clinicInjury', label: 'إصابة عيادة', color: '#c2410c', moduleKey: 'clinic' },
        'clinic-sick-leave': { labelKey: 'module.sc.cat.clinicSickLeave', label: 'إجازة مرضية', color: '#2563eb', moduleKey: 'clinic' },
        'egypt-holiday': { labelKey: 'module.sc.cat.egyptHoliday', label: 'عطلة رسمية (مصر)', color: '#b91c1c', moduleKey: 'safety-calendar' },
        'intl-hse-env': { labelKey: 'module.sc.cat.intlHseEnv', label: 'يوم عالمي (سلامة/بيئة)', color: '#047857', moduleKey: 'safety-calendar' },
        'custom-event': { labelKey: 'module.sc.cat.customEvent', label: 'حدث مخصص', color: '#7c3aed', moduleKey: 'safety-calendar' }
    };

    function scTranslate(key, fallback) {
        if (typeof window !== 'undefined' && window.AppI18n && typeof window.AppI18n.t === 'function') {
            return window.AppI18n.t(key, null, fallback || key);
        }
        if (typeof window !== 'undefined' && window.I18n && typeof window.I18n.t === 'function') {
            return window.I18n.t(key, null, fallback || key);
        }
        return fallback || key;
    }

    function getCategoryLabel(catKey) {
        const cat = SAFETY_CALENDAR_CATEGORIES[catKey];
        if (!cat) return catKey;
        if (cat.labelKey) return scTranslate(cat.labelKey, cat.label);
        return cat.label || catKey;
    }

    function resolveDateKindLabel(kindKey) {
        if (!kindKey) return '';
        return scTranslate(`module.sc.dateKind.${kindKey}`, kindKey);
    }

    function translateFieldLabel(key) {
        return scTranslate(`module.sc.field.${key}`, FIELD_LABELS[key] || key);
    }

    const FIELD_LABELS = {
        id: 'المعرف', title: 'العنوان', name: 'الاسم', description: 'الوصف', location: 'الموقع',
        type: 'النوع', recurring: 'التكرار', enabled: 'مفعّل', color: 'اللون',
        status: 'الحالة', date: 'التاريخ', startDate: 'تاريخ البداية', endDate: 'تاريخ النهاية',
        dueDate: 'تاريخ الاستحقاق', scheduledDate: 'التاريخ المجدول', nextDueDate: 'الموعد القادم',
        inspectionDate: 'تاريخ الفحص', violationDate: 'تاريخ المخالفة', issueDate: 'تاريخ الإصدار',
        originalTargetDate: 'الموعد المستهدف', expectedCompletionDate: 'موعد الإنجاز المتوقع',
        severity: 'الشدة', priority: 'الأولوية', assignedTo: 'المكلف', responsible: 'المسؤول',
        trainer: 'المدرب', workType: 'نوع العمل', workDescription: 'وصف العمل', categoryName: 'الفئة',
        frequency: 'التكرار', result: 'النتيجة', observerName: 'المراقب', reportedBy: 'المُبلّغ',
        incidentType: 'نوع الحادث', violationType: 'نوع المخالفة', taskTitle: 'عنوان المهمة',
        type: 'النوع', message: 'الرسالة', inspectorName: 'المفتش', siteName: 'الموقع',
        department: 'الإدارة', expiryDate: 'تاريخ الانتهاء', sentDate: 'تاريخ الإرسال',
        visitDate: 'تاريخ الزيارة', injuryDate: 'تاريخ الإصابة', employeeName: 'اسم الموظف',
        personName: 'الاسم', diagnosis: 'التشخيص', injuryType: 'نوع الإصابة', reason: 'السبب',
        employeeDepartment: 'الإدارة', contractorName: 'المقاول', externalName: 'اسم خارجي'
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
        if (typeof Permissions !== 'undefined' && typeof Permissions.isAdminRole === 'function') {
            return Permissions.isAdminRole(u.role);
        }
        const role = String(u.role || '').trim().toLowerCase();
        return role === 'admin' || role === 'administrator' || role === 'system_admin';
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
        return 'all';
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
                label: translateFieldLabel(key),
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

    function mergeRecordsById(arrays) {
        const seen = new Set();
        const merged = [];
        (arrays || []).forEach((arr) => {
            (Array.isArray(arr) ? arr : []).forEach((rec) => {
                if (!rec) return;
                const rid = rec.id != null ? String(rec.id) : '';
                if (rid && seen.has(rid)) return;
                if (rid) seen.add(rid);
                merged.push(rec);
            });
        });
        return merged;
    }

    function getClinicVisitRecords() {
        return mergeRecordsById([
            getAppArray('clinicVisits'),
            getAppArray('clinicContractorVisits')
        ]);
    }

    function getClinicInjuryRecords() {
        return mergeRecordsById([
            getAppArray('injuries'),
            getAppArray('clinicContractorInjuries')
        ]);
    }

    function findClinicRecordById(arrays, sourceId) {
        const id = String(sourceId);
        return mergeRecordsById(arrays).find((r) => String(r.id) === id) || null;
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
            case 'clinic-visit':
                return findClinicRecordById([getAppArray('clinicVisits'), getAppArray('clinicContractorVisits')], id);
            case 'clinic-injury':
                return findClinicRecordById([getAppArray('injuries'), getAppArray('clinicContractorInjuries')], id);
            case 'clinic-sick-leave': return findById(getAppArray('sickLeave'));
            case 'custom-event': return findById(getAppArray('safetyCalendarCustomEvents'));
            case 'egypt-holiday':
            case 'intl-hse-env':
                return getReferenceRecord(category, sourceId);
            default: return null;
        }
    }

    function getReferenceRecord(category, sourceId) {
        if (!window.SafetyCalendarReferenceEvents || !sourceId) return null;
        const refs = SafetyCalendarReferenceEvents.getReferenceEvents({});
        const hit = refs.find((r) => r.category === category && String(r.sourceId) === String(sourceId));
        if (!hit) return null;
        return {
            id: hit.sourceId,
            title: hit.title,
            startDate: hit.start,
            endDate: hit.end || '',
            type: category === 'egypt-holiday'
                ? scTranslate('module.sc.refType.egyptHoliday', 'عطلة رسمية — مصر')
                : scTranslate('module.sc.refType.intlDay', 'يوم عالمي — سلامة/بيئة'),
            recurring: hit.recurring || 'yearly'
        };
    }

    function pushEvent(events, meta) {
        if (events.length >= MAX_EVENTS) return false;
        const cat = SAFETY_CALENDAR_CATEGORIES[meta.category];
        if (!cat) return true;
        const start = meta.start;
        if (!start) return true;
        const sourceId = meta.sourceId != null ? String(meta.sourceId) : '';
        const catLabel = getCategoryLabel(meta.category);
        const titleBase = meta.title || catLabel;
        const suffix = meta.dateKind ? ` (${meta.dateKind})` : '';
        const displayTitle = meta.skipCategoryPrefix
            ? `${titleBase}${suffix}`
            : `${catLabel} — ${titleBase}${suffix}`;
        const ev = {
            id: meta.eventId || `${meta.category}:${sourceId}:${meta.dateKind || 'main'}:${start}`,
            title: displayTitle,
            start,
            allDay: meta.allDay !== false,
            backgroundColor: meta.color || cat.color,
            borderColor: meta.color || cat.color,
            extendedProps: {
                category: meta.category,
                categoryLabel: catLabel,
                moduleKey: cat.moduleKey,
                sourceId,
                dateKind: meta.dateKind || 'main',
                assigneeHint: meta.assigneeHint || '',
                isReference: meta.isReference === true,
                isCustom: meta.isCustom === true
            }
        };
        if (meta.end) ev.end = meta.end;
        events.push(ev);
        return true;
    }

    function addReferenceEvents(events, options) {
        if (!window.SafetyCalendarReferenceEvents) return;
        if (options && options.showEgyptHolidays === false && options.showIntlDays === false) return;
        const refs = SafetyCalendarReferenceEvents.getReferenceEvents({
            years: options && options.years
        });
        refs.forEach((ref) => {
            if (events.length >= MAX_EVENTS) return;
            if (ref.category === 'egypt-holiday' && options && options.showEgyptHolidays === false) return;
            if (ref.category === 'intl-hse-env' && options && options.showIntlDays === false) return;
            if (!hasAccess('safety-calendar')) return;
            pushEvent(events, {
                category: ref.category,
                sourceId: ref.sourceId,
                start: ref.start,
                end: ref.end || null,
                title: ref.title,
                eventId: ref.id,
                skipCategoryPrefix: true,
                isReference: true
            });
        });
    }

    function addExclusiveEnd(endInclusive) {
        if (!endInclusive) return null;
        const d = new Date(endInclusive + 'T12:00:00');
        if (isNaN(d.getTime())) return null;
        d.setDate(d.getDate() + 1);
        return parseDateSafe(d);
    }

    function expandCustomStart(rec, years) {
        const recurring = String(rec.recurring || 'once').toLowerCase();
        if (recurring === 'yearly' || recurring === 'سنوي') {
            const base = parseDateSafe(rec.startDate || rec.date);
            if (!base) return [];
            const mmdd = base.slice(5);
            return (years || []).map((y) => `${y}-${mmdd}`);
        }
        const start = parseDateSafe(rec.startDate || rec.date);
        return start ? [start] : [];
    }

    function resolveCustomEnd(rec, startIso, recurring) {
        const endRaw = parseDateSafe(rec.endDate);
        if (!endRaw) return null;
        const isYearly = recurring === 'yearly' || recurring === 'سنوي';
        if (isYearly) {
            const endInclusive = `${startIso.slice(0, 4)}-${endRaw.slice(5)}`;
            if (endInclusive < startIso) return null;
            return addExclusiveEnd(endInclusive);
        }
        if (endRaw < startIso) return null;
        return addExclusiveEnd(endRaw);
    }

    function addCustomCalendarEvents(events, options) {
        if (options && options.showCustomEvents === false) return;
        if (!hasAccess('safety-calendar')) return;
        const years = (window.SafetyCalendarReferenceEvents && SafetyCalendarReferenceEvents.getDefaultYears)
            ? SafetyCalendarReferenceEvents.getDefaultYears()
            : [new Date().getFullYear()];
        getAppArray('safetyCalendarCustomEvents').forEach((rec) => {
            if (!rec || events.length >= MAX_EVENTS) return;
            if (rec.enabled === false || rec.enabled === 'false' || rec.enabled === 0 || rec.enabled === '0') {
                return;
            }
            const recurring = String(rec.recurring || 'once').toLowerCase();
            const starts = expandCustomStart(rec, years);
            const color = rec.color && String(rec.color).trim() ? String(rec.color).trim() : null;
            const title = pickTitle(rec, ['title', 'name', 'description']);
            starts.forEach((start) => {
                if (events.length >= MAX_EVENTS) return;
                pushEvent(events, {
                    category: 'custom-event',
                    sourceId: rec.id,
                    start,
                    end: resolveCustomEnd(rec, start, recurring),
                    title,
                    color,
                    skipCategoryPrefix: true,
                    isCustom: true
                });
            });
        });
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
                        dateKind: resolveDateKindLabel(dk.kindKey || dk.label),
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
                        { field: 'scheduledDate', kindKey: 'scheduled' },
                        { field: 'nextDueDate', kindKey: 'due' },
                        { field: 'expiryDate', kindKey: 'expiry' },
                        { field: 'actualDate', kindKey: 'actual' }
                    ], ctx);
            }
            if (allow('ptw')) {
                addFromList(events, 'ptw', getAppArray('ptw'),
                    null,
                    ['workDescription', 'workType', 'location', 'id'],
                    [
                        { field: 'startDate', kindKey: 'start' },
                        { field: 'endDate', kindKey: 'end' }
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
                        { field: 'date', kindKey: 'observation' },
                        { field: 'expectedCompletionDate', kindKey: 'expectedCompletion' }
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
                        { field: 'scheduledDate', kindKey: 'scheduled' },
                        { field: 'sentDate', kindKey: 'send' }
                    ], ctx);
            }
            if (allow('action-tracking')) {
                addFromList(events, 'action-tracking', getAppArray('actionTrackingRegister'),
                    null,
                    ['typeOfIssue', 'observationIssueHazard', 'id'],
                    [
                        { field: 'originalTargetDate', kindKey: 'target' },
                        { field: 'issueDate', kindKey: 'issue' }
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
            if (allow('clinic-visit')) {
                addFromList(events, 'clinic-visit', getClinicVisitRecords(),
                    ['visitDate', 'createdAt'],
                    ['employeeName', 'contractorName', 'externalName', 'contractorWorkerName', 'diagnosis', 'id'], null, ctx);
            }
            if (allow('clinic-injury')) {
                addFromList(events, 'clinic-injury', getClinicInjuryRecords(),
                    ['injuryDate', 'createdAt'],
                    ['employeeName', 'personName', 'injuryType', 'id'], null, ctx);
            }
            if (allow('clinic-sick-leave')) {
                addFromList(events, 'clinic-sick-leave', getAppArray('sickLeave'),
                    null,
                    ['employeeName', 'personName', 'reason', 'id'],
                    [
                        { field: 'startDate', kindKey: 'start' },
                        { field: 'endDate', kindKey: 'end' }
                    ], ctx);
            }
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('SafetyCalendarEvents build error:', err);
            }
        }

        addReferenceEvents(events, {
            showEgyptHolidays: options && options.showEgyptHolidays === false
                ? false
                : allow('egypt-holiday'),
            showIntlDays: options && options.showIntlDays === false
                ? false
                : allow('intl-hse-env'),
            years: options && options.years
        });
        addCustomCalendarEvents(events, Object.assign({}, options, {
            showCustomEvents: options && options.showCustomEvents === false
                ? false
                : allow('custom-event')
        }));

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
        getCategoryLabel,
        scTranslate,
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
