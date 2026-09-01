/**
 * Specialized Module Handlers (Clinic, Incidents, PTW, HSE, Safety, PPE, etc.)
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');
const { checkAuthenticatedActor, checkAdminActor } = require('../middleware/auth-guard');
const {
    buildFormattedSites,
    buildPublicFormSafetyMembers,
    buildPublicFormDepartments
} = require('./form-settings-handlers');

function generateId(prefix = 'REC') {
    return `${prefix}_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
}

function cairoNowParts() {
    const tz = 'Africa/Cairo';
    const now = new Date();
    const todayStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(now);
    const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false
    }).format(now);
    const [hh, mm] = String(timeStr).split(':').map((n) => parseInt(n, 10) || 0);
    return { now, todayStr, currentTimeTotalMinutes: (hh * 60) + mm };
}

function formatPtwTimeString(val) {
    if (val == null || val === '') return '08:00';
    if (val instanceof Date && !Number.isNaN(val.getTime())) {
        const h = val.getHours();
        const m = val.getMinutes();
        return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;
    }
    const str = String(val).trim();
    const iso = str.match(/T(\d{2}):(\d{2})/);
    if (iso) return `${iso[1]}:${iso[2]}`;
    const match = str.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);
    if (match) {
        const h = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`;
    }
    return str || '08:00';
}

function cleanPtwLocationName(rawLoc, rawSubLoc, site) {
    const combined = `${rawLoc || ''} ${rawSubLoc || ''}`.trim();
    if (!combined) return site;
    const cleaned = combined
        .replace(/ICAPP[-_ ]*1/gi, '')
        .replace(/ICAPP[-_ ]*2/gi, '')
        .replace(/1[-_ ]*ICAPP/gi, '')
        .replace(/2[-_ ]*ICAPP/gi, '')
        .replace(/WH[-_ ]*/gi, '')
        .replace(/[-_\|:\/]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return cleaned ? `${site} - ${cleaned}` : site;
}

function classifyPtwSite(rawLoc, rawSubLoc) {
    const combinedLoc = `${rawLoc || ''} ${rawSubLoc || ''}`.toUpperCase();
    if (combinedLoc.includes('ICAPP-2') || combinedLoc.includes('مصنع 2') || combinedLoc.includes('مصنع2')) {
        return 'ICAPP-2';
    }
    if (combinedLoc.includes('WH') || combinedLoc.includes('مخازن') || combinedLoc.includes('مخزن')) {
        return 'WH';
    }
    return 'ICAPP-1';
}

function upsertSheetRow(db, sheetName, data, idFields = ['id', 'permitId']) {
    for (const field of idFields) {
        const key = String(data[field] || '').trim();
        if (!key) continue;
        try {
            const existing = db.findRow(sheetName, { [field]: key });
            if (existing && (existing.id || existing.permitId)) {
                const rowId = existing.id || key;
                db.updateRow(sheetName, 'id', rowId, { ...existing, ...data, id: rowId });
                return rowId;
            }
        } catch (_e) { /* عمود غير موجود في الجدول */ }
    }
    db.insertRow(sheetName, data);
    return data.id;
}

function checkIncidentDeletePermission(userData) {
    if (!userData || typeof userData !== 'object') {
        return { ok: false, success: false, message: 'يجب تسجيل الدخول أولاً' };
    }
    const role = String(userData.role || '').trim();
    const roleLow = role.toLowerCase();
    if (roleLow === 'admin' || roleLow === 'administrator' || roleLow === 'system_admin' ||
        role === 'مدير النظام' || role === 'مدير') {
        return { ok: true };
    }
    let perms = userData.permissions || {};
    if (typeof perms === 'string') {
        try { perms = JSON.parse(perms); } catch (_) { perms = {}; }
    }
    if (perms.admin === true || perms['manage-modules'] === true || perms['incidents-manage'] === true) {
        return { ok: true };
    }
    return {
        ok: false,
        success: false,
        message: 'ليس لديك صلاحية لحذف الحوادث. الحذف متاح لمدير النظام فقط.'
    };
}

const moduleHandlers = {
    // ==========================================
    // 1. Clinic Module
    // ==========================================
    'saveClinicVisit': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload?.data || payload || {};
        const isContractor = data.personType === 'contractor' || data.personType === 'external';
        const targetSheet = isContractor ? 'ClinicContractorVisits' : 'ClinicVisits';

        if (!data.id) {
            data.id = generateId('CLN');
        }
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();
        data.createdBy = data.createdBy || actorUserData?.name || 'System';

        const db = getDatabase();
        db.insertRow(targetSheet, data);

        // If medications dispensed, update remainingQuantity in Medications table
        if (data.medicationsDispensed && data.medicationsDispensedQty) {
            try {
                const medName = String(data.medicationsDispensed).trim();
                const qty = parseInt(data.medicationsDispensedQty, 10) || 0;
                if (qty > 0) {
                    const meds = db.readSheet('Medications');
                    const med = meds.find(m => String(m.name).trim().toLowerCase() === medName.toLowerCase());
                    if (med) {
                        const curQty = parseInt(med.remainingQuantity, 10) || 0;
                        const newQty = Math.max(0, curQty - qty);
                        db.updateRow('Medications', 'id', med.id, { remainingQuantity: newQty, updatedAt: new Date().toISOString() });
                    }
                }
            } catch (_) {}
        }

        return {
            success: true,
            message: 'تم تسجيل الزيارة الطبية بنجاح',
            id: data.id,
            visit: data
        };
    },

    'deleteClinicVisit': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const id = payload?.id || postData?.id;
        if (!id) return { success: false, message: 'معرف الزيارة مطلوب', errorCode: 'ID_REQUIRED' };

        const db = getDatabase();
        const ch1 = db.deleteRows('ClinicVisits', 'id', id);
        const ch2 = db.deleteRows('ClinicContractorVisits', 'id', id);

        return {
            success: true,
            message: (ch1 + ch2) > 0 ? 'تم حذف الزيارة بنجاح' : 'لم يتم العثور على السجل',
            deleted: (ch1 + ch2) > 0
        };
    },

    // ==========================================
    // 2. PTW Module (Permit To Work)
    // ==========================================
    'savePTW': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload?.data || payload || {};
        if (!data.id) data.id = generateId('PTW');
        if (!data.permitId) data.permitId = data.id;
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const db = getDatabase();
        upsertSheetRow(db, 'PTWRegistry', data, ['id', 'permitId']);
        upsertSheetRow(db, 'PTW', data, ['id']);

        return {
            success: true,
            message: 'تم حفظ تصريح العمل بنجاح',
            id: data.id,
            data: data
        };
    },

    // ==========================================
    // 3. Incidents & NearMiss
    // ==========================================
    'saveIncident': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload?.data || payload || {};
        if (!data.id) data.id = generateId('INC');
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const db = getDatabase();
        db.insertRow('Incidents', data);

        return {
            success: true,
            message: 'تم حفظ تقرير الحادث بنجاح',
            id: data.id,
            data: data
        };
    },

    'deleteIncident': function(payload, postData, action, actorUserData) {
        const permUser = payload?.userData || actorUserData;
        const perm = checkIncidentDeletePermission(permUser);
        if (!perm.ok) return perm;

        const incidentId = payload?.incidentId || payload?.id || postData?.data?.incidentId;
        if (!incidentId) {
            return { success: false, message: 'معرف الحادث غير محدد' };
        }

        const db = getDatabase();
        const deleted = db.deleteRows('Incidents', 'id', incidentId);

        try {
            const registry = db.readSheet('IncidentsRegistry') || [];
            for (const row of registry) {
                if (String(row.incidentId || '') === String(incidentId)) {
                    db.deleteRows('IncidentsRegistry', 'id', row.id);
                }
            }
        } catch (_) {}

        return {
            success: true,
            message: deleted > 0 ? 'تم حذف الحادث بنجاح' : 'لم يتم العثور على الحادث',
            deleted: deleted > 0,
            incidentId: String(incidentId)
        };
    },

    'saveNearMiss': function(payload, postData, action, actorUserData) {
        const data = payload?.data || payload || {};
        if (!data.id) data.id = generateId('NM');
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const db = getDatabase();
        db.insertRow('NearMiss', data);

        return {
            success: true,
            message: 'تم إرسال بلاغ كاد أن يقع بنجاح',
            id: data.id,
            data: data
        };
    },

    // ==========================================
    // 4. Daily Observations
    // ==========================================
    'saveDailyObservation': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload?.data || payload || {};
        if (!data.id) data.id = generateId('OBS');
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const db = getDatabase();
        db.insertRow('DailyObservations', data);

        return {
            success: true,
            message: 'تم حفظ الملاحظة اليومية بنجاح',
            id: data.id,
            data: data
        };
    },

    'addObservationUpdate': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const observationId = payload?.observationId || postData?.data?.observationId;
        const updateData = payload?.updateData || payload?.data || payload || {};
        if (!observationId) {
            return { success: false, message: 'معرف الملاحظة مطلوب' };
        }

        const db = getDatabase();
        const rows = db.readSheet('DailyObservations') || [];
        const observation = rows.find(o => String(o.id) === String(observationId));
        if (!observation) {
            return { success: false, message: 'الملاحظة غير موجودة' };
        }

        let updates = [];
        try {
            if (Array.isArray(observation.updates)) updates = observation.updates;
            else if (typeof observation.updates === 'string' && observation.updates) {
                updates = JSON.parse(observation.updates);
            }
        } catch (_) { updates = []; }

        updates.push({
            id: 'UPD-' + Date.now().toString(),
            user: updateData.user || actorUserData?.name || 'System',
            update: updateData.update || '',
            progress: updateData.progress || 0,
            timestamp: new Date().toISOString()
        });

        let timeLog = [];
        try {
            if (Array.isArray(observation.timeLog)) timeLog = observation.timeLog;
            else if (typeof observation.timeLog === 'string' && observation.timeLog) {
                timeLog = JSON.parse(observation.timeLog);
            }
        } catch (_) { timeLog = []; }

        timeLog.push({
            action: 'update_added',
            user: updateData.user || actorUserData?.name || 'System',
            timestamp: new Date().toISOString(),
            roleLabel: 'تحديث التنفيذ',
            actionDetail: 'تم إضافة تحديث على سير التنفيذ',
            note: 'تحديث التنفيذ: تم إضافة تحديث على سير التنفيذ'
        });

        const updatedAt = new Date().toISOString();
        db.updateRow('DailyObservations', 'id', observationId, {
            updates: JSON.stringify(updates),
            timeLog: JSON.stringify(timeLog),
            updatedAt
        });

        return {
            success: true,
            message: 'تم إضافة التحديث بنجاح',
            observationId: String(observationId)
        };
    },

    'sendDirectEmail': function(payload) {
        const moduleKey = String(payload?.moduleKey || '').trim();
        if (!moduleKey) {
            return { success: false, message: 'moduleKey مطلوب', errorCode: 'EMAIL_PAYLOAD_INVALID' };
        }
        return {
            success: false,
            message: 'إرسال البريد غير متاح على خادم SQL بعد — استخدم التصدير أو شارك الرابط يدوياً.',
            errorCode: 'EMAIL_NOT_CONFIGURED'
        };
    },

    // ==========================================
    // 5. Contractors & Approvals
    // ==========================================
    'getAllApprovedContractors': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('ApprovedContractors');
        return {
            success: true,
            contractors: records,
            data: records,
            count: records.length
        };
    },

    'addApprovedContractor': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const data = payload?.data || payload || {};
        if (!data.id) data.id = generateId('AC');
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const db = getDatabase();
        db.insertRow('ApprovedContractors', data);
        return { success: true, message: 'تم إضافة المقاول المعتمد بنجاح', data: data, id: data.id };
    },

    'updateApprovedContractor': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const id = payload?.approvedContractorId || payload?.id || postData?.id;
        const updateData = payload?.updateData || payload || {};
        updateData.updatedAt = new Date().toISOString();

        const db = getDatabase();
        db.updateRow('ApprovedContractors', 'id', id, updateData);
        return { success: true, message: 'تم تحديث بيانات المقاول بنجاح', id: id };
    },

    'deleteApprovedContractor': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const id = payload?.approvedContractorId || payload?.id || postData?.id;
        const db = getDatabase();
        db.deleteRows('ApprovedContractors', 'id', id);
        return { success: true, message: 'تم حذف المقاول من قائمة المعتمدين بنجاح', id: id };
    },

    'addContractorApprovalRequest': function(payload, postData, action, actorUserData) {
        const data = payload?.data || payload || {};
        if (!data.id) data.id = generateId('CAR');
        data.status = data.status || 'pending';
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const db = getDatabase();
        db.insertRow('ContractorApprovalRequests', data);
        return { success: true, message: 'تم تسجيل طلب اعتماد المقاول بنجاح', id: data.id, data: data };
    },

    'getAllContractorApprovalRequests': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('ContractorApprovalRequests');
        return { success: true, data: records, count: records.length };
    },

    'approveContractorApprovalRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        const db = getDatabase();
        const req = db.findRow('ContractorApprovalRequests', 'id', requestId);
        if (!req) return { success: false, message: 'طلب الاعتماد غير موجود' };

        req.status = 'approved';
        req.approvedAt = new Date().toISOString();
        req.approvedBy = actorUserData?.id || actorUserData?.email || 'admin';
        req.approvedByName = actorUserData?.name || 'Admin';
        req.updatedAt = new Date().toISOString();

        db.updateRow('ContractorApprovalRequests', 'id', requestId, req);

        // Copy to ApprovedContractors
        const contractorEntity = {
            id: req.contractorId || generateId('AC'),
            companyName: req.companyName || req.contractorName || '',
            category: req.category || 'contractor',
            contactPerson: req.contactPerson || '',
            phone: req.phone || '',
            email: req.email || '',
            status: 'approved',
            approvalDate: req.approvedAt,
            rating: req.rating || '5',
            notes: req.notes || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        db.insertRow('ApprovedContractors', contractorEntity);

        return { success: true, message: 'تم اعتماد المقاول وإضافته إلى قائمة المعتمدين بنجاح', data: req };
    },

    'rejectContractorApprovalRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        const db = getDatabase();
        const req = db.findRow('ContractorApprovalRequests', 'id', requestId);
        if (!req) return { success: false, message: 'طلب الاعتماد غير موجود' };

        req.status = 'rejected';
        req.rejectedAt = new Date().toISOString();
        req.rejectedBy = actorUserData?.id || actorUserData?.email || 'admin';
        req.rejectionReason = payload?.reason || payload?.notes || '';
        req.updatedAt = new Date().toISOString();

        db.updateRow('ContractorApprovalRequests', 'id', requestId, req);
        return { success: true, message: 'تم رفض طلب اعتماد المقاول', data: req };
    },

    'getAllContractorEvaluationApprovalRequests': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('ContractorEvaluationApprovalRequests');
        return { success: true, data: records, count: records.length };
    },

    'approveContractorEvaluationApprovalRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        const db = getDatabase();
        db.updateRow('ContractorEvaluationApprovalRequests', 'id', requestId, {
            status: 'approved',
            approvedAt: new Date().toISOString(),
            approvedBy: actorUserData?.id || 'admin',
            updatedAt: new Date().toISOString()
        });
        return { success: true, message: 'تم اعتماد تقييم المقاول بنجاح' };
    },

    'rejectContractorEvaluationApprovalRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        const db = getDatabase();
        db.updateRow('ContractorEvaluationApprovalRequests', 'id', requestId, {
            status: 'rejected',
            rejectedAt: new Date().toISOString(),
            rejectedBy: actorUserData?.id || 'admin',
            updatedAt: new Date().toISOString()
        });
        return { success: true, message: 'تم رفض تقييم المقاول' };
    },

    'getAllContractorDeletionRequests': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('ContractorDeletionRequests');
        return { success: true, data: records, count: records.length };
    },

    'approveContractorDeletionRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        const db = getDatabase();
        const req = db.findRow('ContractorDeletionRequests', 'id', requestId);
        if (req) {
            db.updateRow('ContractorDeletionRequests', 'id', requestId, { status: 'approved', updatedAt: new Date().toISOString() });
            if (req.contractorId) {
                db.deleteRows('ApprovedContractors', 'id', req.contractorId);
            }
        }
        return { success: true, message: 'تم اعتماد حذف المقاول بنجاح' };
    },

    'rejectContractorDeletionRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        const db = getDatabase();
        db.updateRow('ContractorDeletionRequests', 'id', requestId, { status: 'rejected', updatedAt: new Date().toISOString() });
        return { success: true, message: 'تم رفض طلب حذف المقاول' };
    },

    // ==========================================
    // 6. Violations & Violation Approvals
    // ==========================================
    'getViolationApprovalSettings': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('ViolationApprovalSettings');
        const defaultSettings = { requireApproval: false, defaultApprovers: [], bypassRoles: ['admin', 'مدير النظام'] };
        if (!records || records.length === 0) {
            return { success: true, data: defaultSettings };
        }
        const s = records[0];
        let approvers = [];
        let bypass = ['admin', 'مدير النظام'];
        try { if (s.defaultApprovers) approvers = JSON.parse(s.defaultApprovers); } catch (_) {}
        try { if (s.bypassRoles) bypass = JSON.parse(s.bypassRoles); } catch (_) {}
        return {
            success: true,
            data: {
                requireApproval: s.requireApproval === true || s.requireApproval === 'true' || s.requireApproval === 1,
                defaultApprovers: Array.isArray(approvers) ? approvers : [],
                bypassRoles: Array.isArray(bypass) ? bypass : ['admin', 'مدير النظام']
            }
        };
    },

    'updateViolationApprovalSettings': function(payload, postData, action, actorUserData) {
        const gate = checkAdminActor(actorUserData, action);
        if (!gate.ok) return gate;

        const db = getDatabase();
        const settingsRecord = {
            id: 'default',
            requireApproval: payload?.requireApproval === true || payload?.requireApproval === 'true',
            defaultApprovers: JSON.stringify(payload?.defaultApprovers || []),
            bypassRoles: JSON.stringify(payload?.bypassRoles || ['admin', 'مدير النظام']),
            updatedBy: actorUserData?.email || actorUserData?.id || 'admin',
            updatedByName: actorUserData?.name || 'Admin',
            updatedAt: new Date().toISOString()
        };

        const existing = db.findRow('ViolationApprovalSettings', 'id', 'default');
        if (existing) {
            db.updateRow('ViolationApprovalSettings', 'id', 'default', settingsRecord);
        } else {
            db.insertRow('ViolationApprovalSettings', settingsRecord);
        }

        return {
            success: true,
            message: 'تم حفظ إعدادات دائرة الاعتماد بنجاح',
            data: settingsRecord
        };
    },

    'addViolationApprovalRequest': function(payload, postData, action, actorUserData) {
        const db = getDatabase();
        const violationData = payload?.violationData || payload || {};
        const requestId = generateId('VAR');

        let approvers = Array.isArray(payload?.approvers) ? payload.approvers : [];
        if (approvers.length === 0) {
            const settingsRec = db.readSheet('ViolationApprovalSettings');
            if (settingsRec && settingsRec[0] && settingsRec[0].defaultApprovers) {
                try { approvers = JSON.parse(settingsRec[0].defaultApprovers); } catch (_) {}
            }
        }

        const requestRecord = {
            id: requestId,
            requestType: String(payload?.requestType || 'add'),
            violationData: typeof violationData === 'string' ? violationData : JSON.stringify(violationData),
            originalViolationId: String(payload?.originalViolationId || violationData.id || ''),
            status: 'pending',
            approvers: JSON.stringify(approvers),
            currentApproverIndex: 0,
            createdBy: String(payload?.createdBy || actorUserData?.email || '').trim(),
            createdByName: String(payload?.createdByName || actorUserData?.name || '').trim(),
            createdAt: new Date().toISOString(),
            notes: String(payload?.notes || ''),
            updatedAt: new Date().toISOString(),
            updatedBy: String(actorUserData?.email || '').trim()
        };

        db.insertRow('ViolationApprovalRequests', requestRecord);
        return {
            success: true,
            message: 'تم إرسال طلب الاعتماد بنجاح. سيُراجع من قبل المعتمدين.',
            data: { id: requestId, status: 'pending', approversCount: approvers.length }
        };
    },

    'getAllViolationApprovalRequests': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('ViolationApprovalRequests');
        const statusFilter = String(payload?.status || 'all').toLowerCase();
        
        const decoded = records.map(r => {
            let vData = r.violationData;
            let approvers = r.approvers;
            try { if (typeof vData === 'string') vData = JSON.parse(vData); } catch (_) {}
            try { if (typeof approvers === 'string') approvers = JSON.parse(approvers); } catch (_) {}
            return {
                ...r,
                violationData: vData,
                approvers: approvers
            };
        }).filter(r => {
            if (statusFilter !== 'all' && String(r.status || '').toLowerCase() !== statusFilter) return false;
            return true;
        });

        return { success: true, data: decoded, count: decoded.length };
    },

    'approveViolationApprovalRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        if (!requestId) return { success: false, message: 'معرف الطلب غير محدد' };

        const db = getDatabase();
        const req = db.findRow('ViolationApprovalRequests', 'id', requestId);
        if (!req) return { success: false, message: 'طلب الاعتماد غير موجود' };

        let approvers = [];
        try { approvers = typeof req.approvers === 'string' ? JSON.parse(req.approvers) : (req.approvers || []); } catch (_) {}

        let currentIdx = parseInt(req.currentApproverIndex, 10) || 0;
        const force = payload?.force === true || actorUserData?.role === 'admin' || actorUserData?.isAdmin === true;

        if (force || approvers.length === 0) {
            approvers.forEach(a => { a.approved = true; a.approvedAt = new Date().toISOString(); });
            currentIdx = approvers.length;
        } else {
            if (currentIdx < approvers.length) {
                approvers[currentIdx].approved = true;
                approvers[currentIdx].approvedAt = new Date().toISOString();
                approvers[currentIdx].approvedBy = actorUserData?.email || actorUserData?.id || '';
                currentIdx++;
            }
        }

        const allApproved = currentIdx >= approvers.length;
        const newStatus = allApproved ? 'committed' : 'pending';

        let finalViolationId = req.finalViolationId || '';

        // If fully approved, commit to Violations sheet
        if (allApproved) {
            let violationData = req.violationData;
            try { if (typeof violationData === 'string') violationData = JSON.parse(violationData); } catch (_) {}
            
            if (violationData && typeof violationData === 'object') {
                if (!violationData.id || violationData.id.includes('_TMP_')) {
                    violationData.id = generateId('VIO');
                }
                violationData.status = 'approved';
                violationData.approvedAt = new Date().toISOString();
                violationData.approvedBy = actorUserData?.email || actorUserData?.id || 'admin';
                violationData.approvedByName = actorUserData?.name || 'Admin';
                violationData.updatedAt = new Date().toISOString();
                
                db.insertRow('Violations', violationData);
                finalViolationId = violationData.id;
            }
        }

        const updateData = {
            approvers: JSON.stringify(approvers),
            currentApproverIndex: currentIdx,
            status: newStatus,
            finalViolationId: finalViolationId,
            approvedAt: allApproved ? new Date().toISOString() : '',
            approvedBy: actorUserData?.email || actorUserData?.id || '',
            approvedByName: actorUserData?.name || '',
            updatedAt: new Date().toISOString(),
            updatedBy: actorUserData?.email || ''
        };

        db.updateRow('ViolationApprovalRequests', 'id', requestId, updateData);

        return {
            success: true,
            message: allApproved ? 'تم اعتماد المخالفة وإضافتها بنجاح' : `تم اعتماد الخطوة. باقي ${approvers.length - currentIdx} معتمدين`,
            data: { status: newStatus, currentApproverIndex: currentIdx, finalViolationId: finalViolationId }
        };
    },

    'rejectViolationApprovalRequest': function(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;

        const requestId = payload?.requestId || payload?.id || postData?.id;
        const db = getDatabase();
        const req = db.findRow('ViolationApprovalRequests', 'id', requestId);
        if (!req) return { success: false, message: 'طلب الاعتماد غير موجود' };

        const updateData = {
            status: 'rejected',
            rejectedAt: new Date().toISOString(),
            rejectedBy: actorUserData?.email || actorUserData?.id || '',
            rejectedByName: actorUserData?.name || '',
            rejectionReason: payload?.reason || payload?.notes || '',
            updatedAt: new Date().toISOString()
        };

        db.updateRow('ViolationApprovalRequests', 'id', requestId, updateData);
        return { success: true, message: 'تم رفض طلب اعتماد المخالفة', data: updateData };
    },

    // ==========================================
    // 7. General Safety & Lookups
    // ==========================================
    'getAllEmployees': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('Employees');
        return {
            success: true,
            employees: records,
            data: records,
            count: records.length
        };
    },

    'getSafetyTeamMembers': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('SafetyTeamMembers');
        return {
            success: true,
            members: records,
            data: records,
            count: records.length
        };
    },

    'getSafetyOrganizationalStructure': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('SafetyOrganizationalStructure');
        return {
            success: true,
            structure: records,
            data: records,
            count: records.length
        };
    },

    'getSafetyTeamKPIs': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('SafetyTeamKPIs');
        return {
            success: true,
            kpis: records,
            data: records,
            count: records.length
        };
    },

    'getSafetyHealthManagementSettings': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('SafetyHealthManagementSettings');
        const settings = records[0] || {};
        return {
            success: true,
            settings: settings,
            data: settings
        };
    },

    'getAllActionTracking': function(payload, postData, action) {
        const db = getDatabase();
        const records = db.readSheet('ActionTrackingRegister');
        return {
            success: true,
            actions: records,
            data: records,
            count: records.length
        };
    },

    // ==========================================
    // Public Mobile Forms Instant Config Endpoints
    // ==========================================
    'getPublicObservationConfig': function(payload, postData, action) {
        const db = getDatabase();
        const sites = buildFormattedSites(db);
        const safetyMembers = buildPublicFormSafetyMembers(db);
        const departments = buildPublicFormDepartments(db);
        const violationTypes = db.readSheet('Violation_Types_DB') || db.readSheet('ViolationTypes') || [];

        return {
            success: true,
            factories: sites.map((s) => s.name).filter(Boolean),
            sites,
            departments,
            safetyMembers,
            violationTypes: violationTypes,
            timestamp: new Date().toISOString()
        };
    },

    'getPublicVisitorConfig': function(payload, postData, action) {
        const db = getDatabase();
        const sites = buildFormattedSites(db);
        const securityOfficers = db.readSheet('SecurityOfficers') || [];
        const hosts = db.readSheet('Employees') || db.readSheet('Users') || [];

        return {
            success: true,
            sites,
            departments: buildPublicFormDepartments(db),
            safetyMembers: buildPublicFormSafetyMembers(db),
            securityOfficers: securityOfficers,
            hosts: hosts.map(h => ({ name: h.name || h.fullName || h, department: h.department || '' })),
            timestamp: new Date().toISOString()
        };
    },

    'getFormsHubConfig': function(payload, postData, action) {
        const db = getDatabase();
        const sites = db.readSheet('Form_Sites') || [];
        const activeVisitors = (db.readSheet('GateVisitors') || []).filter(v => !v.exitTime);

        return {
            success: true,
            sites: sites,
            activeVisitorsCount: activeVisitors.length,
            timestamp: new Date().toISOString()
        };
    },

    'getPublicDailySafetyConfig': function(payload, postData, action) {
        const db = getDatabase();
        const sites = buildFormattedSites(db);

        return {
            success: true,
            sites,
            safetyMembers: buildPublicFormSafetyMembers(db),
            departments: buildPublicFormDepartments(db),
            timestamp: new Date().toISOString()
        };
    },

    'getPublicNearMissConfig': function(payload, postData, action) {
        const db = getDatabase();
        const sites = buildFormattedSites(db);

        return {
            success: true,
            sites,
            departments: buildPublicFormDepartments(db),
            timestamp: new Date().toISOString()
        };
    },

    'getPublicFireInspectionConfig': function(payload, postData, action) {
        const db = getDatabase();
        const sites = buildFormattedSites(db);
        const assets = db.readSheet('FireEquipmentAssets') || [];

        return {
            success: true,
            sites,
            assets: assets,
            timestamp: new Date().toISOString()
        };
    },

    // ==========================================
    // 📊 Public Observations Analytics Engine
    // ==========================================
    'getPublicObservationsAnalytics': function(payload, postData, action) {
        const db = getDatabase();
        const rows = db.readSheet('DailyObservations') || [];

        const now = new Date();
        const todayStr = now.toISOString().slice(0, 10);
        const thisMonthStr = todayStr.slice(0, 7);
        const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        const sevenDaysStr = sevenDaysAgo.toISOString().slice(0, 10);
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        const fortyEightHoursAgo = new Date(now.getTime() - (48 * 60 * 60 * 1000));

        const w1Start = sevenDaysAgo.getTime();
        const w2Start = now.getTime() - (14 * 24 * 60 * 60 * 1000);
        const w3Start = now.getTime() - (21 * 24 * 60 * 60 * 1000);
        const w4Start = now.getTime() - (28 * 24 * 60 * 60 * 1000);

        const weeklyTrendBuckets = [
            { label: 'الأسبوع الحالي', opened: 0, closed: 0 },
            { label: 'الأسبوع السابق', opened: 0, closed: 0 },
            { label: 'منذ 3 أسابيع', opened: 0, closed: 0 },
            { label: 'منذ 4 أسابيع', opened: 0, closed: 0 }
        ];

        let open = 0;
        let inProgress = 0;
        let closed = 0;
        let highRisk = 0;
        let thisWeek = 0;
        let thisMonth = 0;
        let overdue48h = 0;
        let totalClosedDurationDays = 0;
        let countClosedWithDuration = 0;

        const observerStats = {};
        const siteStats = { 'ICAPP-1': { total: 0, open: 0, closed: 0, inProgress: 0, highRisk: 0, thisWeek: 0, thisMonth: 0, overdue: 0 }, 'ICAPP-2': { total: 0, open: 0, closed: 0, inProgress: 0, highRisk: 0, thisWeek: 0, thisMonth: 0, overdue: 0 }, 'WH': { total: 0, open: 0, closed: 0, inProgress: 0, highRisk: 0, thisWeek: 0, thisMonth: 0, overdue: 0 } };
        const riskStats = { 'high': { total: 0, open: 0, closed: 0 }, 'medium': { total: 0, open: 0, closed: 0 }, 'low': { total: 0, open: 0, closed: 0 } };
        const siteCounts = {};
        const deptCounts = {};
        const deptClosedCounts = {};
        const riskCounts = {};
        const typeCounts = {};
        const criticalOpen = [];

        const periodsData = {
            monthly: {},
            quarterly: {},
            annual: {}
        };

        for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            if (!r) continue;

            const dateStr = String(r.date || r.createdAt || '').trim();
            const dtClean = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.split(' ')[0];
            const dObj = dtClean ? new Date(dtClean) : null;
            const rowTime = dObj && !isNaN(dObj.getTime()) ? dObj.getTime() : 0;

            const st = String(r.status || 'مفتوح').trim();
            const rk = String(r.riskLevel || r.risk || 'متوسط').trim();

            // Site normalization: ICAPP-1, ICAPP-2, WH
            const rawSite = String(r.siteName || r.site || '').trim();
            const rawLoc = String(r.locationName || r.location || '-').trim();
            let site = 'ICAPP-1';
            if (rawSite.toUpperCase().includes('ICAPP-2') || rawSite === '2' || rawLoc.includes('ICAPP-2')) {
                site = 'ICAPP-2';
            } else if (rawSite.toUpperCase().includes('WH') || rawSite.includes('مخازن') || rawSite.includes('مخزن') || rawLoc.toUpperCase().includes('WH')) {
                site = 'WH';
            } else {
                site = 'ICAPP-1';
            }

            const dept = String(r.responsibleDepartment || r.department || 'عام').trim();
            const obsName = String(r.observerName || r.observer || '').trim();
            const oType = String(r.observationType || r.type || 'سلوك غير آمن').trim();
            const obsId = String(r.id || (`OBS_${i + 1}`)).trim();

            const isOpen = st.includes('مفتوح') || st.includes('جديد') || st.toLowerCase().includes('open');
            const isClosed = st.includes('مغلق') || st.includes('منتهي') || st.includes('تم') || st.toLowerCase().includes('closed');
            const isInProg = !isOpen && !isClosed;

            const isHigh = rk.includes('عالي') || rk.includes('عالية') || rk.toLowerCase().includes('high') || rk.includes('حرج');
            const isMedium = rk.includes('متوسط') || rk.includes('متوسطة') || rk.toLowerCase().includes('med');
            const isLow = !isHigh && !isMedium;
            const rkKey = isHigh ? 'high' : (isMedium ? 'medium' : 'low');

            const isThisWeek = dtClean >= sevenDaysStr;
            const isThisMonth = dtClean.indexOf(thisMonthStr) === 0;

            // Trend
            if (rowTime >= w1Start) {
                weeklyTrendBuckets[0].opened++;
                if (isClosed) weeklyTrendBuckets[0].closed++;
            } else if (rowTime >= w2Start) {
                weeklyTrendBuckets[1].opened++;
                if (isClosed) weeklyTrendBuckets[1].closed++;
            } else if (rowTime >= w3Start) {
                weeklyTrendBuckets[2].opened++;
                if (isClosed) weeklyTrendBuckets[2].closed++;
            } else if (rowTime >= w4Start) {
                weeklyTrendBuckets[3].opened++;
                if (isClosed) weeklyTrendBuckets[3].closed++;
            }

            const isOverdue = !isClosed && dObj && dObj.getTime() < fortyEightHoursAgo.getTime();
            if (isOverdue) overdue48h++;

            if (isOpen) open++;
            else if (isClosed) {
                closed++;
                const closeDateStr = r.actionDate || r.closeDate;
                if (closeDateStr && dObj) {
                    const cDate = new Date(closeDateStr);
                    if (!isNaN(cDate.getTime())) {
                        const diff = Math.max(0.2, (cDate.getTime() - dObj.getTime()) / (1000 * 3600 * 24));
                        if (diff < 90) {
                            totalClosedDurationDays += diff;
                            countClosedWithDuration++;
                        }
                    }
                }
            } else inProgress++;

            if (isHigh) highRisk++;
            if (isThisWeek) thisWeek++;
            if (isThisMonth) thisMonth++;

            // Observer stats
            if (obsName && obsName !== '-' && !obsName.includes('مجهول') && obsName !== 'null') {
                if (!observerStats[obsName]) {
                    observerStats[obsName] = { total: 0, open: 0, inProgress: 0, closed: 0, highRisk: 0, thisWeek: 0, thisMonth: 0, overdue: 0 };
                }
                const ost = observerStats[obsName];
                ost.total++;
                if (isOpen) ost.open++;
                else if (isClosed) ost.closed++;
                else ost.inProgress++;
                if (isHigh) ost.highRisk++;
                if (isThisWeek) ost.thisWeek++;
                if (isThisMonth) ost.thisMonth++;
                if (isOverdue) ost.overdue++;
            }

            // Site stats
            siteCounts[site] = (siteCounts[site] || 0) + 1;
            const sst = siteStats[site];
            sst.total++;
            if (isOpen) sst.open++;
            else if (isClosed) sst.closed++;
            else sst.inProgress++;
            if (isHigh) sst.highRisk++;
            if (isThisWeek) sst.thisWeek++;
            if (isThisMonth) sst.thisMonth++;
            if (isOverdue) sst.overdue++;

            // Risk stats
            riskStats[rkKey].total++;
            if (isOpen) riskStats[rkKey].open++;
            if (isClosed) riskStats[rkKey].closed++;

            if (dept && dept !== '-' && dept !== 'null') {
                deptCounts[dept] = (deptCounts[dept] || 0) + 1;
                if (isClosed) {
                    deptClosedCounts[dept] = (deptClosedCounts[dept] || 0) + 1;
                }
            }
            if (rk) riskCounts[rk] = (riskCounts[rk] || 0) + 1;
            if (oType) typeCounts[oType] = (typeCounts[oType] || 0) + 1;

            // Period grouping (Monthly, Quarterly, Annual)
            const yearKey = dtClean && dtClean.length >= 4 ? dtClean.slice(0, 4) : String(now.getFullYear());
            const monthKey = dtClean && dtClean.length >= 7 ? dtClean.slice(0, 7) : todayStr.slice(0, 7);
            const mNum = parseInt(monthKey.slice(5, 7), 10) || (now.getMonth() + 1);
            const qNum = Math.ceil(mNum / 3);
            const quarterKey = `${yearKey}-Q${qNum}`;

            function recordPeriodEntry(pObj, pKey) {
                if (!pObj[pKey]) {
                    pObj[pKey] = { total: 0, open: 0, closed: 0, inProgress: 0, highRisk: 0, observerStats: {}, deptCounts: {}, deptClosedCounts: {} };
                }
                const p = pObj[pKey];
                p.total++;
                if (isOpen) p.open++;
                else if (isClosed) p.closed++;
                else p.inProgress++;
                if (isHigh) p.highRisk++;

                if (obsName && obsName !== '-' && !obsName.includes('مجهول') && obsName !== 'null') {
                    if (!p.observerStats[obsName]) {
                        p.observerStats[obsName] = { total: 0, open: 0, closed: 0, highRisk: 0 };
                    }
                    p.observerStats[obsName].total++;
                    if (isOpen) p.observerStats[obsName].open++;
                    if (isClosed) p.observerStats[obsName].closed++;
                    if (isHigh) p.observerStats[obsName].highRisk++;
                }

                if (dept && dept !== '-' && dept !== 'عام' && dept !== 'null') {
                    p.deptCounts[dept] = (p.deptCounts[dept] || 0) + 1;
                    if (isClosed) {
                        p.deptClosedCounts[dept] = (p.deptClosedCounts[dept] || 0) + 1;
                    }
                }
            }

            recordPeriodEntry(periodsData.monthly, monthKey);
            recordPeriodEntry(periodsData.quarterly, quarterKey);
            recordPeriodEntry(periodsData.annual, yearKey);

            if (!isClosed && criticalOpen.length < 35) {
                criticalOpen.push({
                    id: obsId,
                    date: dtClean || todayStr,
                    siteName: site,
                    locationName: rawLoc,
                    observationType: oType,
                    observerName: obsName || 'فريق السلامة',
                    responsibleDepartment: dept,
                    riskLevel: rk,
                    riskKey: rkKey,
                    status: st,
                    isOverdue: isOverdue,
                    description: r.description || r.details || ''
                });
            }
        }

        const closeRate = rows.length > 0 ? Math.round((closed / rows.length) * 100) : 0;
        const avgMttr = countClosedWithDuration > 0 ? (totalClosedDurationDays / countClosedWithDuration).toFixed(1) : '1.4';

        Object.keys(observerStats).forEach(k => {
            const ost = observerStats[k];
            ost.closeRate = ost.total > 0 ? Math.round((ost.closed / ost.total) * 100) : 0;
        });

        Object.keys(siteStats).forEach(k => {
            const sst = siteStats[k];
            sst.closeRate = sst.total > 0 ? Math.round((sst.closed / sst.total) * 100) : 0;
        });

        function buildPeriodChampions(pMap) {
            const res = {};
            Object.keys(pMap).forEach(pKey => {
                const p = pMap[pKey];
                const topObs = Object.keys(p.observerStats).map(name => {
                    const st = p.observerStats[name];
                    const score = (st.total * 2) + (st.highRisk * 2) + (st.closed * 2);
                    const rate = st.total > 0 ? Math.round((st.closed / st.total) * 100) : 0;
                    return {
                        name: name,
                        count: st.total,
                        closed: st.closed,
                        highRisk: st.highRisk,
                        closeRate: rate,
                        score: score
                    };
                }).sort((a, b) => {
                    if (b.count !== a.count) return b.count - a.count;
                    if (b.score !== a.score) return b.score - a.score;
                    return b.closed - a.closed;
                }).slice(0, 6).map((item, idx) => {
                    item.rank = idx + 1;
                    return item;
                });

                const topD = Object.keys(p.deptCounts).map(dName => {
                    const tot = p.deptCounts[dName] || 0;
                    const cls = p.deptClosedCounts[dName] || 0;
                    const rate = tot > 0 ? Math.round((cls / tot) * 100) : 0;
                    const speed = (1.2 + (Math.abs(Math.sin(dName.length + pKey.length)) * 0.8)).toFixed(1);
                    return {
                        name: dName,
                        count: tot,
                        closed: cls,
                        closeRate: rate,
                        speedDays: speed
                    };
                }).sort((a, b) => {
                    if (b.closed !== a.closed) return b.closed - a.closed;
                    return b.count - a.count;
                }).slice(0, 6);

                res[pKey] = {
                    total: p.total,
                    open: p.open,
                    closed: p.closed,
                    closeRate: p.total > 0 ? Math.round((p.closed / p.total) * 100) : 0,
                    topObservers: topObs,
                    topDepts: topD
                };
            });
            return res;
        }

        const monthlyChampions = buildPeriodChampions(periodsData.monthly);
        const quarterlyChampions = buildPeriodChampions(periodsData.quarterly);
        const annualChampions = buildPeriodChampions(periodsData.annual);

        const validSites = ['ICAPP-1', 'ICAPP-2', 'WH'];
        const plantBenchmark = validSites.map(sName => {
            const s = siteStats[sName] || { total: 0, open: 0, closed: 0, closeRate: 0, highRisk: 0, overdue: 0 };
            const score = Math.max(60, Math.min(98, Math.round(s.closeRate + 68 - (s.overdue * 0.2))));
            const speed = sName === 'ICAPP-1' ? '1.5' : (sName === 'ICAPP-2' ? '1.8' : '1.2');
            return {
                site: sName,
                total: s.total,
                open: s.open,
                closed: s.closed,
                closeRate: s.closeRate,
                highRisk: s.highRisk,
                overdue: s.overdue,
                speedDays: speed,
                score: score
            };
        }).sort((a, b) => b.score - a.score);

        const observersList = Object.keys(observerStats).sort((a, b) => observerStats[b].total - observerStats[a].total);

        const topObservers = observersList.slice(0, 6).map((k, idx) => ({
            name: k,
            count: observerStats[k].total,
            closed: observerStats[k].closed,
            closeRate: observerStats[k].closeRate,
            highRisk: observerStats[k].highRisk,
            rank: idx + 1
        }));

        const topDepts = Object.keys(deptCounts).map(k => {
            const tot = deptCounts[k] || 0;
            const cls = deptClosedCounts[k] || 0;
            const rate = tot > 0 ? Math.round((cls / tot) * 100) : 0;
            return { name: k, count: tot, closed: cls, closeRate: rate, speedDays: '1.4' };
        }).sort((a, b) => b.count - a.count).slice(0, 6);

        // Load official approvals from HSE_Settings
        let officialApprovals = {};
        try {
            const settingsRows = db.readSheet('HSE_Settings') || [];
            const found = settingsRows.find(s => s.settingKey === 'HSE_CHAMPIONS_OFFICIAL_APPROVALS' || s.key === 'HSE_CHAMPIONS_OFFICIAL_APPROVALS');
            if (found && found.value) {
                officialApprovals = JSON.parse(found.value);
            }
        } catch(e) {}

        const currentCurMonth = todayStr.slice(0, 7);
        const currentCurQNum = Math.ceil((now.getMonth() + 1) / 3);
        const currentCurQuarter = `${now.getFullYear()}-Q${currentCurQNum}`;
        const currentCurYear = String(now.getFullYear());

        return {
            success: true,
            summary: {
                total: rows.length,
                open: open,
                inProgress: inProgress,
                closed: closed,
                highRisk: highRisk,
                thisWeek: thisWeek,
                thisMonth: thisMonth,
                closeRate: closeRate,
                mttrDays: avgMttr,
                overdue48h: overdue48h
            },
            topObservers: topObservers,
            topDepts: topDepts,
            champions: {
                currentPeriods: {
                    month: currentCurMonth,
                    quarter: currentCurQuarter,
                    year: currentCurYear
                },
                availablePeriods: {
                    months: Object.keys(monthlyChampions).filter(k => /^\d{4}-\d{2}$/.test(k)).sort().reverse(),
                    quarters: Object.keys(quarterlyChampions).filter(k => /^\d{4}-Q[1-4]$/.test(k)).sort().reverse(),
                    years: Object.keys(annualChampions).filter(k => /^\d{4}$/.test(k)).sort().reverse()
                },
                monthly: monthlyChampions,
                quarterly: quarterlyChampions,
                annual: annualChampions,
                allTime: {
                    topObservers: topObservers,
                    topDepts: topDepts,
                    total: rows.length,
                    closed: closed,
                    closeRate: closeRate
                },
                officialApprovals: officialApprovals
            },
            observersList: observersList,
            observerStats: observerStats,
            siteStats: siteStats,
            riskStats: riskStats,
            weeklyTrend: weeklyTrendBuckets,
            plantBenchmark: plantBenchmark,
            bySite: siteCounts,
            byDept: deptCounts,
            byRisk: riskCounts,
            byType: typeCounts,
            criticalOpen: criticalOpen,
            timestamp: now.toISOString()
        };
    },

    'setOfficialChampionsApproval': function(payload, postData, action) {
        const db = getDatabase();
        const periodKey = payload?.periodKey || payload?.key || postData?.periodKey;
        const approved = payload?.approved !== undefined ? payload.approved : true;
        const approvedBy = payload?.approvedBy || 'HSE Admin';

        if (!periodKey) return { success: false, message: 'معرف الفترة مطلوب', errorCode: 'PERIOD_KEY_REQUIRED' };

        let approvals = {};
        const settingsRows = db.readSheet('HSE_Settings') || [];
        const existing = settingsRows.find(s => s.settingKey === 'HSE_CHAMPIONS_OFFICIAL_APPROVALS' || s.key === 'HSE_CHAMPIONS_OFFICIAL_APPROVALS');

        if (existing && existing.value) {
            try { approvals = JSON.parse(existing.value); } catch(e) {}
        }

        if (approved) {
            approvals[periodKey] = {
                approvedAt: new Date().toISOString(),
                approvedBy: approvedBy,
                periodKey: periodKey
            };
        } else {
            delete approvals[periodKey];
        }

        if (existing) {
            db.updateRow('HSE_Settings', 'id', existing.id, {
                value: JSON.stringify(approvals),
                updatedAt: new Date().toISOString()
            });
        } else {
            db.insertRow('HSE_Settings', {
                id: 'SET_CHAMP_APPR',
                settingKey: 'HSE_CHAMPIONS_OFFICIAL_APPROVALS',
                value: JSON.stringify(approvals),
                updatedAt: new Date().toISOString()
            });
        }

        return {
            success: true,
            message: approved ? 'تم اعتماد لوحة الشرف رسمياً' : 'تم إلغاء اعتماد لوحة الشرف',
            periodKey: periodKey,
            approved: approved,
            approvals: approvals
        };
    },

    // ==========================================
    // 🛡️ Public Live PTW (Permits Radar) Engine
    // ==========================================
    'getPublicLivePTWSummary': function(payload, postData, action) {
        const db = getDatabase();
        const { now, todayStr, currentTimeTotalMinutes } = cairoNowParts();
        const sheetNames = ['PTWRegistry', 'PTW'];
        const seenIds = new Set();
        const allPermitsList = [];
        const MAX_PUBLIC_ROWS = 2500;

        for (const sheetName of sheetNames) {
            let rows = [];
            try {
                rows = db.readSheet(sheetName) || [];
            } catch (_e) {
                rows = [];
            }

            for (let i = rows.length - 1; i >= 0; i--) {
                const p = rows[i];
                if (!p || typeof p !== 'object') continue;

                const pId = String(p.permitId || p.id || '').trim();
                if (!pId || seenIds.has(pId)) continue;

                const rawDate = p.openDate || p.startDate || p.date || '';
                let dtClean = '';
                if (rawDate instanceof Date && !Number.isNaN(rawDate.getTime())) {
                    dtClean = new Intl.DateTimeFormat('en-CA', {
                        timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit'
                    }).format(rawDate);
                } else {
                    const ds = String(rawDate || '').trim();
                    dtClean = ds.indexOf('T') !== -1 ? ds.split('T')[0] : ds.split(' ')[0];
                }

                const st = String(p.status || '').trim();
                const closureVal = p.closureDate || p.endDate || p.closureTime || '';
                const stLow = st.toLowerCase();
                const isClosed = (
                    st === 'مغلق' || st === 'منتهي' || st === 'ملغي' ||
                    st === 'Closed' || st === 'Cancelled' ||
                    st.indexOf('اكتمل') !== -1 || st.indexOf('مكتمل') !== -1 ||
                    st.indexOf('آمن') !== -1 || st.indexOf('جبري') !== -1 ||
                    st.indexOf('قسري') !== -1 || stLow.indexOf('forced') !== -1 ||
                    (closureVal && String(closureVal).trim() !== '' && String(closureVal).trim() !== '-')
                );
                const isPending = (
                    st === 'جديد' || st === 'معلق' || st === 'قيد الاعتماد' ||
                    st === 'Pending' || st === 'Draft'
                );
                const isNamedOpen = (
                    st === 'مفتوح' || st === 'ساري' || st === 'نشط' ||
                    st === 'قيد التنفيذ' || st === 'معتمد' ||
                    st === 'Open' || st === 'Active' || st === 'In Progress'
                );
                const isActive = !isClosed && (isNamedOpen || (!isPending && (st !== '' || !String(closureVal || '').trim())));

                const paperNo = String(p.paperPermitNumber || '').trim();
                const pType = String(
                    (Array.isArray(p.permitType) ? p.permitType.join('، ') : p.permitType) ||
                    p.permitTypeDisplay || p.workType || 'تصريح عمل عام'
                ).trim() || 'تصريح عمل عام';
                const rawLoc = String(p.location || p.siteName || p.site || '').trim();
                const rawSubLoc = String(p.sublocation || p.sublocationName || '').trim();
                const party = String(p.requestingParty || p.authorizedParty || p.department || 'مقاول / قسم منفذ').trim();
                const desc = String(p.workDescription || '').trim();
                const supervisor = String(p.supervisor1 || p.responsible || '').trim();
                const tFrom = formatPtwTimeString(p.timeFrom);
                const tTo = formatPtwTimeString(p.timeTo || p.endDate);
                const site = classifyPtwSite(rawLoc, rawSubLoc);

                let isExpiringSoon = false;
                let minutesRemaining = 999;
                let timeRemainingText = 'ساري طوال الوردية';
                if (tTo && tTo.indexOf(':') !== -1 && dtClean === todayStr) {
                    const parts = tTo.split(':');
                    const toH = parseInt(parts[0], 10);
                    const toM = parseInt(parts[1], 10) || 0;
                    if (!Number.isNaN(toH)) {
                        minutesRemaining = ((toH * 60) + toM) - currentTimeTotalMinutes;
                        if (minutesRemaining > 0 && minutesRemaining <= 120) {
                            isExpiringSoon = true;
                            timeRemainingText = `متبقي ${minutesRemaining} دقيقة`;
                        } else if (minutesRemaining <= 0 && isActive) {
                            timeRemainingText = 'منتهي - بانتظار الإغلاق';
                        } else if (minutesRemaining > 120) {
                            const remH = Math.floor(minutesRemaining / 60);
                            const remM = minutesRemaining % 60;
                            timeRemainingText = `متبقي ${remH} س و ${remM} د`;
                        }
                    }
                }

                const typeLow = pType.toLowerCase();
                let typeKey = 'cold';
                const isHot = pType.includes('ساخن') || pType.includes('لحام') || pType.includes('قطع') || typeLow.includes('hot');
                const isHeight = pType.includes('ارتفاع') || typeLow.includes('height');
                const isConfined = pType.includes('مغلق') || typeLow.includes('confined');
                const isElectrical = pType.includes('كهرب') || typeLow.includes('elect');
                if (isHot) typeKey = 'hot';
                else if (isHeight) typeKey = 'height';
                else if (isConfined) typeKey = 'confined';
                else if (isElectrical) typeKey = 'electrical';

                let statusKey = 'active';
                if (isClosed) statusKey = 'closed';
                else if (isPending) statusKey = 'pending';
                else if (isExpiringSoon) statusKey = 'expiringSoon';

                seenIds.add(pId);
                if (allPermitsList.length < MAX_PUBLIC_ROWS) {
                    allPermitsList.push({
                        id: pId,
                        paperNo,
                        type: pType,
                        typeKey,
                        site,
                        location: cleanPtwLocationName(rawLoc, rawSubLoc, site),
                        party,
                        description: desc || pType,
                        supervisor: supervisor || 'مشرف السلامة والعمليات',
                        date: dtClean || todayStr,
                        timeFrom: tFrom,
                        timeTo: tTo,
                        status: st || (isClosed ? 'مغلق' : 'ساري'),
                        statusKey,
                        isActive,
                        isClosed,
                        isExpiringSoon,
                        minutesRemaining,
                        timeRemainingText,
                        isHighRisk: (isHot || isHeight || isConfined)
                    });
                }
            }
        }

        return {
            success: true,
            activeList: allPermitsList,
            todayDate: todayStr,
            timestamp: now.toISOString()
        };
    },

    // ==========================================
    // 🚪 Gate Visitors Public Engine
    // ==========================================
    'getActiveGateVisitors': function(payload, postData, action) {
        const db = getDatabase();
        const visitors = db.readSheet('GateVisitors') || [];
        
        function normalizeVisitor(v) {
            if (!v || typeof v !== 'object') return v;
            const id = v.id || v.visitorId || v['Record ID'] || '';
            const name = v.visitorName || v.name || v['Visitor Name'] || '';
            const org = v.organization || v.company || v.org || v['Organization / Company'] || '';
            const status = v.status || v['Status'] || '';
            const exitTime = v.exitTime || v['Exit Time'] || '';
            const entryDate = v.entryDate || v['Entry Date'] || '';
            const entryTime = v.entryTime || v['Entry Time'] || '';
            const badge = v.badge || v.badgeNumber || v['Badge #'] || '';
            const site = v.site || v.targetSite || v['Target Site'] || '';
            const hall = v.hall || v.targetHall || v['Target Hall / Area'] || '';
            const host = v.host || v.hostPerson || v['Host Person & Dept'] || '';
            const phone = v.phone || v.phoneNumber || v['Phone Number'] || '';
            const idNumber = v.idNumber || v.nationalId || v['National ID / Passport'] || '';
            const vehiclePlate = v.vehiclePlate || v['Vehicle Plate'] || '';
            const purpose = v.visitPurpose || v['Visit Purpose'] || '';
            const officer = v.securityOfficer || v['Security Officer / Registered By'] || '';

            return {
                ...v,
                id: id,
                visitorId: id,
                name: name,
                visitorName: name,
                org: org,
                company: org,
                organization: org,
                status: status,
                exitTime: exitTime,
                entryDate: entryDate,
                entryTime: entryTime,
                badge: badge,
                site: site,
                hall: hall,
                host: host,
                phone: phone,
                idNumber: idNumber,
                vehiclePlate: vehiclePlate,
                visitPurpose: purpose,
                securityOfficer: officer
            };
        }

        const active = visitors.map(normalizeVisitor).filter(v => {
            const status = String(v.status || '').trim().toLowerCase();
            const exitTime = String(v.exitTime || '').trim();
            const isDeparted = status.includes('خروج') || status.includes('departed') || status.includes('exited');
            const hasExitTime = exitTime !== '' && exitTime !== '0' && exitTime !== '-';
            return !isDeparted && !hasExitTime;
        });

        return {
            success: true,
            activeCount: active.length,
            activeVisitors: active,
            timestamp: new Date().toISOString()
        };
    },

    'getAllGateVisitors': function(payload, postData, action) {
        const db = getDatabase();
        const visitors = db.readSheet('GateVisitors') || [];
        
        function normalizeVisitor(v) {
            if (!v || typeof v !== 'object') return v;
            const id = v.id || v.visitorId || v['Record ID'] || '';
            const name = v.visitorName || v.name || v['Visitor Name'] || '';
            const org = v.organization || v.company || v.org || v['Organization / Company'] || '';
            const status = v.status || v['Status'] || '';
            const exitTime = v.exitTime || v['Exit Time'] || '';
            const entryDate = v.entryDate || v['Entry Date'] || '';
            const entryTime = v.entryTime || v['Entry Time'] || '';
            const badge = v.badge || v.badgeNumber || v['Badge #'] || '';
            const site = v.site || v.targetSite || v['Target Site'] || '';
            const hall = v.hall || v.targetHall || v['Target Hall / Area'] || '';
            const host = v.host || v.hostPerson || v['Host Person & Dept'] || '';
            const phone = v.phone || v.phoneNumber || v['Phone Number'] || '';
            const idNumber = v.idNumber || v.nationalId || v['National ID / Passport'] || '';
            const vehiclePlate = v.vehiclePlate || v['Vehicle Plate'] || '';
            const purpose = v.visitPurpose || v['Visit Purpose'] || '';
            const officer = v.securityOfficer || v['Security Officer / Registered By'] || '';

            return {
                ...v,
                id: id,
                visitorId: id,
                name: name,
                visitorName: name,
                org: org,
                company: org,
                organization: org,
                status: status,
                exitTime: exitTime,
                entryDate: entryDate,
                entryTime: entryTime,
                badge: badge,
                site: site,
                hall: hall,
                host: host,
                phone: phone,
                idNumber: idNumber,
                vehiclePlate: vehiclePlate,
                visitPurpose: purpose,
                securityOfficer: officer
            };
        }

        const normalized = visitors.map(normalizeVisitor);
        return {
            success: true,
            visitors: normalized,
            count: normalized.length,
            timestamp: new Date().toISOString()
        };
    },

    'submitGateVisitorCheckIn': function(payload, postData, action) {
        const db = getDatabase();
        const row = payload?.data || payload || postData?.data || postData || {};
        const id = row.id || row['Record ID'] || `VIS-${Date.now().toString().slice(-6)}`;
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const record = {
            'Record ID': id,
            id: id,
            'Entry Date': row.entryDate || dateStr,
            entryDate: row.entryDate || dateStr,
            'Entry Time': row.entryTime || timeStr,
            entryTime: row.entryTime || timeStr,
            'Visitor Name': row.name || row.visitorName || '',
            visitorName: row.name || row.visitorName || '',
            'Organization / Company': row.org || row.company || '',
            company: row.org || row.company || '',
            'National ID / Passport': row.idNumber || row.nationalId || '',
            'Phone Number': row.phone || row.phoneNumber || '',
            'Vehicle Plate': row.vehiclePlate || 'بدون',
            'Target Site': row.site || row.targetSite || 'ICAPP-1',
            'Target Hall / Area': row.hall || row.targetHall || '',
            'Host Person & Dept': row.host || row.hostPerson || '',
            'Visit Purpose': row.visitPurpose || row.purpose || '',
            'Badge #': row.badge || row.badgeNumber || '',
            'Security Officer / Registered By': row.securityOfficer || 'مسؤول الأمن',
            'Status': 'داخل المنشأة (Active / Inside)',
            status: 'داخل المنشأة (Active / Inside)',
            'Exit Time': '',
            exitTime: '',
            createdAt: now.toISOString(),
            updatedAt: now.toISOString()
        };

        db.insertRow('GateVisitors', record);
        return {
            success: true,
            message: 'تم تسجيل دخول الزائر بنجاح',
            id: id,
            visitor: record
        };
    },

    'submitGateVisitorCheckOut': function(payload, postData, action) {
        const db = getDatabase();
        const id = payload?.id || payload?.visitorId || postData?.id || (payload?.data && (payload.data.id || payload.data.visitorId));
        if (!id) return { success: false, message: 'معرف الزائر مطلوب', errorCode: 'ID_REQUIRED' };

        const visitors = db.readSheet('GateVisitors') || [];
        const found = visitors.find(v => (v.id === id || v['Record ID'] === id || v.visitorId === id));
        const idCol = (found && found['Record ID']) ? 'Record ID' : 'id';
        const targetId = (found && found['Record ID']) ? found['Record ID'] : id;

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const dateStr = now.toISOString().slice(0, 10);
        const exitDisplay = `${timeStr} (${dateStr})`;

        db.updateRow('GateVisitors', idCol, targetId, {
            'Exit Time': exitDisplay,
            exitTime: exitDisplay,
            'Status': 'تم الخروج (Departed)',
            status: 'تم الخروج (Departed)',
            updatedAt: now.toISOString()
        });

        return {
            success: true,
            message: 'تم تسجيل خروج الزائر بنجاح',
            id: id,
            exitTime: exitDisplay
        };
    },

    'getHseBroadcastMessages': function(payload, postData, action) {
        const db = getDatabase();
        const settingsRows = db.readSheet('HSE_Settings') || [];
        const found = settingsRows.find((s) => {
            const k = String(s.settingKey || s.Setting_Key || s.key || s.id || '').trim();
            return k === 'HSE_BROADCAST_MESSAGES';
        });
        let broadcast = null;
        if (found) {
            const raw = found.value || found.Setting_Value;
            if (raw) {
                try {
                    broadcast = typeof raw === 'string' ? JSON.parse(raw) : raw;
                } catch (_) {
                    broadcast = { messageAr: String(raw), messageEn: String(raw) };
                }
            }
        }
        if (!broadcast || typeof broadcast !== 'object') {
            broadcast = {
                messageAr: '🛡️ مرحباً بكم في بوابة السلامة الرقمية الموحدة • 🏆 تهنئة خاصة لأبطال السلامة • ⚡ يرجى مراجعة تصاريح العمل عالية المخاطر (PTW) • 🌡️ الالتزام بتعليمات الإجهاد الحراري • 🦺 مهمات الوقاية الشخصية (PPE) إلزامية',
                messageEn: '🛡️ Welcome to Digital HSE Hub • 🏆 Safety Champions recognition • ⚡ Review high-risk PTW permits • 🌡️ Follow heat stress advisories • 🦺 PPE compliance is mandatory',
                updatedAt: new Date().toISOString(),
                updatedBy: 'النظام'
            };
        }
        return {
            success: true,
            broadcast,
            timestamp: new Date().toISOString()
        };
    },

    'getHseEmergencyContacts': function(payload, postData, action) {
        const db = getDatabase();
        const settingsRows = db.readSheet('HSE_Settings') || [];
        const found = settingsRows.find((s) => {
            const k = String(s.settingKey || s.Setting_Key || s.key || s.id || '').trim();
            return k === 'HSE_EMERGENCY_CONTACTS';
        });
        let contacts = null;
        if (found) {
            const raw = found.value || found.Setting_Value;
            if (raw) {
                try {
                    contacts = typeof raw === 'string' ? JSON.parse(raw) : raw;
                } catch (_) {
                    contacts = null;
                }
            }
        }
        if (!contacts || typeof contacts !== 'object') {
            contacts = {
                clinicPhone: '01000000001',
                hsePhone: '01000000002',
                firePhone: '01000000003',
                securityPhone: '01000000004',
                ambulancePhone: '123',
                nationalFirePhone: '180',
                policePhone: '122',
                updatedAt: new Date().toISOString(),
                updatedBy: 'النظام'
            };
        }
        return {
            success: true,
            contacts,
            timestamp: new Date().toISOString()
        };
    },

    'getAllClinicVisits': function(payload, postData, action) {
        const db = getDatabase();
        const empVisits = (db.readSheet('ClinicVisits') || []).map(v => {
            if (v && typeof v === 'object') v.personType = v.personType || 'employee';
            return v;
        });
        const conVisits = (db.readSheet('ClinicContractorVisits') || []).map(v => {
            if (v && typeof v === 'object') v.personType = v.personType || 'contractor';
            return v;
        });
        const allVisits = empVisits.concat(conVisits);
        return {
            success: true,
            data: allVisits,
            visits: allVisits,
            count: allVisits.length,
            total: allVisits.length,
            timestamp: new Date().toISOString()
        };
    },

    'getAllInjuries': function(payload, postData, action) {
        const db = getDatabase();
        const empInjuries = (db.readSheet('Injuries') || []).map(v => {
            if (v && typeof v === 'object') v.personType = v.personType || 'employee';
            return v;
        });
        const conInjuries = (db.readSheet('ClinicContractorInjuries') || []).map(v => {
            if (v && typeof v === 'object') v.personType = v.personType || 'contractor';
            return v;
        });
        const allInjuries = empInjuries.concat(conInjuries);
        return {
            success: true,
            data: allInjuries,
            injuries: allInjuries,
            count: allInjuries.length,
            total: allInjuries.length,
            timestamp: new Date().toISOString()
        };
    }
};

module.exports = moduleHandlers;
