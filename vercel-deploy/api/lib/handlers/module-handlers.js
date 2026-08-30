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
