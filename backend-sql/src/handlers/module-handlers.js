/**
 * Specialized Module Handlers (Clinic, Incidents, PTW, HSE, Safety, PPE, etc.)
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');
const { checkAuthenticatedActor, checkAdminActor } = require('../middleware/auth-guard');

function generateId(prefix = 'REC') {
    return `${prefix}_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
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
        data.createdAt = data.createdAt || new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const db = getDatabase();
        db.insertRow('PTWRegistry', data);

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
    }
};

module.exports = moduleHandlers;
