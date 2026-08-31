/**
 * حلّ أسماء إجراءات GAS (مفرد/مخصص) → CRUD على جداول SQL
 */
'use strict';

const { getDatabase } = require('../db/database');
const { headersMap } = require('../db/headers-schema');
const { checkSheetDirectWriteAccess, checkAuthenticatedActor } = require('../middleware/auth-guard');

/** action → { sheet, op, idFields[], dataField? } */
const ACTION_MAP = {
    // Incidents
    addIncident: { sheet: 'Incidents', op: 'upsert', idFields: ['id', 'incidentId'] },
    updateIncident: { sheet: 'Incidents', op: 'upsert', idFields: ['incidentId', 'id'], dataField: 'updateData' },
    deleteIncident: { sheet: 'Incidents', op: 'delete', idFields: ['incidentId', 'id'] },
    addIncidentNotification: { sheet: 'IncidentNotifications', op: 'upsert', idFields: ['id'] },
    deleteSafetyAlert: { sheet: 'SafetyAlerts', op: 'delete', idFields: ['alertId', 'id'] },

    // NearMiss — handled by saveNearMiss; add/update/delete aliases
    addNearMiss: { sheet: 'NearMiss', op: 'upsert', idFields: ['id'] },
    updateNearMiss: { sheet: 'NearMiss', op: 'upsert', idFields: ['nearMissId', 'id'], dataField: 'updateData' },
    deleteNearMiss: { sheet: 'NearMiss', op: 'delete', idFields: ['nearMissId', 'id'] },

    // Daily Observations
    deleteObservation: { sheet: 'DailyObservations', op: 'delete', idFields: ['observationId', 'id'] },
    deleteAllObservations: { sheet: 'DailyObservations', op: 'deleteAll' },
    updateObservation: { sheet: 'DailyObservations', op: 'upsert', idFields: ['observationId', 'id'], dataField: 'updateData' },

    // Clinic
    addClinicVisit: { sheet: 'ClinicVisits', op: 'upsert', idFields: ['id'] },
    updateClinicVisit: { sheet: 'ClinicVisits', op: 'upsert', idFields: ['visitId', 'id'], dataField: 'updateData' },
    addMedication: { sheet: 'Medications', op: 'upsert', idFields: ['id'] },
    updateMedication: { sheet: 'Medications', op: 'upsert', idFields: ['medicationId', 'id'], dataField: 'updateData' },
    deleteMedication: { sheet: 'Medications', op: 'delete', idFields: ['medicationId', 'id'] },
    addInjury: { sheet: 'Injuries', op: 'upsert', idFields: ['id'] },
    updateInjury: { sheet: 'Injuries', op: 'upsert', idFields: ['injuryId', 'id'], dataField: 'updateData' },
    addClinicVisitDeletionRequest: { sheet: 'ClinicVisitDeletionRequests', op: 'upsert', idFields: ['id'] },
    addMedicationDeletionRequest: { sheet: 'MedicationDeletionRequests', op: 'upsert', idFields: ['id'] },
    addSupplyRequest: { sheet: 'SupplyRequests', op: 'upsert', idFields: ['id'] },
    addClinicStaffTimeOffRequest: { sheet: 'ClinicStaffTimeOffRequests', op: 'upsert', idFields: ['id'] },

    // Employees / Users
    addEmployee: { sheet: 'Employees', op: 'upsert', idFields: ['id', 'employeeNumber'] },
    updateEmployee: { sheet: 'Employees', op: 'upsert', idFields: ['employeeId', 'id'], dataField: 'updateData' },
    deleteEmployee: { sheet: 'Employees', op: 'delete', idFields: ['employeeId', 'id'] },

    // Training
    addTraining: { sheet: 'Training', op: 'upsert', idFields: ['id'] },
    updateTraining: { sheet: 'Training', op: 'upsert', idFields: ['trainingId', 'id'], dataField: 'updateData' },
    deleteTraining: { sheet: 'Training', op: 'delete', idFields: ['trainingId', 'id'] },
    addLegalTraining: { sheet: 'LegalTraining', op: 'upsert', idFields: ['id'] },
    updateLegalTraining: { sheet: 'LegalTraining', op: 'upsert', idFields: ['id'], dataField: 'updateData' },
    deleteLegalTraining: { sheet: 'LegalTraining', op: 'delete', idFields: ['id', 'trainingId'] },
    addLegalTrainingAttendee: { sheet: 'LegalTrainingAttendees', op: 'upsert', idFields: ['id'] },
    updateLegalTrainingAttendee: { sheet: 'LegalTrainingAttendees', op: 'upsert', idFields: ['id'], dataField: 'updateData' },
    deleteLegalTrainingAttendee: { sheet: 'LegalTrainingAttendees', op: 'delete', idFields: ['id', 'attendeeId'] },
    addLegalRegister: { sheet: 'LegalRegister', op: 'upsert', idFields: ['id'] },
    updateLegalRegister: { sheet: 'LegalRegister', op: 'upsert', idFields: ['id'], dataField: 'updateData' },
    deleteLegalRegister: { sheet: 'LegalRegister', op: 'delete', idFields: ['id', 'registerId'] },
    addContractorTraining: { sheet: 'ContractorTraining', op: 'upsert', idFields: ['id'] },
    updateContractorTraining: { sheet: 'ContractorTraining', op: 'upsert', idFields: ['id'], dataField: 'updateData' },
    deleteContractorTraining: { sheet: 'ContractorTraining', op: 'delete', idFields: ['id'] },

    // Violations
    addViolation: { sheet: 'Violations', op: 'upsert', idFields: ['id'] },
    updateViolation: { sheet: 'Violations', op: 'upsert', idFields: ['violationId', 'id'], dataField: 'updateData' },
    deleteViolationFromSheet: { sheet: 'Violations', op: 'delete', idFields: ['violationId', 'id'] },

    // PTW
    addPTW: { sheet: 'PTW', op: 'upsert', idFields: ['id'] },
    updatePTW: { sheet: 'PTW', op: 'upsert', idFields: ['ptwId', 'id', 'permitId'], dataField: 'updateData' },
    deletePTW: { sheet: 'PTW', op: 'delete', idFields: ['ptwId', 'id', 'permitId'] },

    // Fire Equipment
    deleteFireEquipment: { sheet: 'FireEquipmentAssets', op: 'delete', idFields: ['equipmentId', 'assetId', 'id'] },
    deleteFireEquipmentInspection: { sheet: 'FireEquipmentInspections', op: 'delete', idFields: ['inspectionId', 'id'] },
    saveOrUpdateFireEquipmentAsset: { sheet: 'FireEquipmentAssets', op: 'upsert', idFields: ['id', 'assetId'] },
    addFireEquipmentApprovalRequest: { sheet: 'FireEquipmentApprovalRequests', op: 'upsert', idFields: ['id'] },

    // Emergency
    addEmergencyMapItem: { sheet: 'EmergencyMapItems', op: 'upsert', idFields: ['id', 'itemId'] },
    updateEmergencyMapItem: { sheet: 'EmergencyMapItems', op: 'upsert', idFields: ['itemId', 'id'], dataField: 'updateData' },
    deleteEmergencyMapItem: { sheet: 'EmergencyMapItems', op: 'delete', idFields: ['itemId', 'id'] },
    addEmergencyFloorPlan: { sheet: 'EmergencyFloorPlans', op: 'upsert', idFields: ['id', 'planId'] },
    updateEmergencyFloorPlan: { sheet: 'EmergencyFloorPlans', op: 'upsert', idFields: ['planId', 'id'], dataField: 'updateData' },
    deleteEmergencyFloorPlan: { sheet: 'EmergencyFloorPlans', op: 'delete', idFields: ['planId', 'id'] },

    // Safety Health Management
    deleteSafetyTeamMember: { sheet: 'SafetyTeamMembers', op: 'delete', idFields: ['memberId', 'id'] },
    deleteSafetyTeamTask: { sheet: 'SafetyTeamTasks', op: 'delete', idFields: ['taskId', 'id'] },
    deleteSafetyTeamLeave: { sheet: 'SafetyTeamLeave', op: 'delete', idFields: ['leaveId', 'id'] },
    deleteSafetyTeamAttendance: { sheet: 'SafetyTeamAttendance', op: 'delete', idFields: ['id'] },
    deleteCustomKPI: { sheet: 'SafetyTeamKPIs', op: 'delete', idFields: ['kpiId', 'id'] },
    addSafetyTeamTask: { sheet: 'SafetyTeamTasks', op: 'upsert', idFields: ['id'] },
    updateSafetyTeamTask: { sheet: 'SafetyTeamTasks', op: 'upsert', idFields: ['taskId', 'id'], dataField: 'updateData' },
    addSafetyTeamLeave: { sheet: 'SafetyTeamLeave', op: 'upsert', idFields: ['id'] },
    updateSafetyTeamLeave: { sheet: 'SafetyTeamLeave', op: 'upsert', idFields: ['leaveId', 'id'], dataField: 'updateData' },
    addSafetyTeamKPI: { sheet: 'SafetyTeamKPIs', op: 'upsert', idFields: ['id'] },
    updateSafetyTeamKPI: { sheet: 'SafetyTeamKPIs', op: 'upsert', idFields: ['kpiId', 'id'], dataField: 'updateData' },

    // Periodic equipment / inspections
    deletePeriodicEquipmentAsset: { sheet: 'PeriodicEquipmentAssets', op: 'delete', idFields: ['assetId', 'id'] },
    deletePeriodicEquipmentType: { sheet: 'PeriodicEquipmentTypes', op: 'delete', idFields: ['typeId', 'id'] },
    saveOrUpdatePeriodicEquipmentAsset: { sheet: 'PeriodicEquipmentAssets', op: 'upsert', idFields: ['id', 'assetId'] },
    savePeriodicEquipmentType: { sheet: 'PeriodicEquipmentTypes', op: 'upsert', idFields: ['id', 'typeId'] },
    addPeriodicEquipmentInspection: { sheet: 'PeriodicEquipmentInspections', op: 'upsert', idFields: ['id'] },
    addPeriodicInspection: { sheet: 'PeriodicInspections', op: 'upsert', idFields: ['id'] },
    updatePeriodicInspection: { sheet: 'PeriodicInspections', op: 'upsert', idFields: ['id'], dataField: 'updateData' },

    // User tasks / issues / change
    addUserTask: { sheet: 'UserTasks', op: 'upsert', idFields: ['id'] },
    updateUserTask: { sheet: 'UserTasks', op: 'upsert', idFields: ['taskId', 'id'], dataField: 'updateData' },
    deleteUserTask: { sheet: 'UserTasks', op: 'delete', idFields: ['taskId', 'id'] },
    addIssue: { sheet: 'IssueTracking', op: 'upsert', idFields: ['id'] },
    addChangeRequest: { sheet: 'ChangeRequests', op: 'upsert', idFields: ['id'] },
    updateChangeRequest: { sheet: 'ChangeRequests', op: 'upsert', idFields: ['id'], dataField: 'updateData' },

    // Generic sheet ops aliases
    deleteFromSheet: { sheet: null, op: 'deleteFromPayload' },
    deleteRow: { sheet: null, op: 'deleteFromPayload' },

    // Settings / structure (upsert to settings sheets)
    saveOrganizationalStructure: { sheet: 'OrganizationalStructure', op: 'upsert', idFields: ['id'] },
    saveCompanySettings: { sheet: 'CompanySettings', op: 'upsert', idFields: ['id'] },
    saveHseEmergencyContacts: { sheet: 'HseEmergencyContacts', op: 'upsert', idFields: ['id'] },
    updateKPITargets: { sheet: 'KPITargets', op: 'upsert', idFields: ['id'] },
    updateLeaveTypes: { sheet: 'LeaveTypes', op: 'upsert', idFields: ['id'] },
    upsertClinicStaffLeaveQuota: { sheet: 'ClinicStaffLeaveQuota', op: 'upsert', idFields: ['id'] },
    updateAttendanceStatuses: { sheet: 'ClinicStaffAttendance', op: 'upsert', idFields: ['id'] },

    // Contractor extras
    addContractorEvaluationApprovalRequest: { sheet: 'ContractorEvaluationApprovalRequests', op: 'upsert', idFields: ['id'] },

    // Notifications
    addNotification: { sheet: 'Notifications', op: 'upsert', idFields: ['id'] },

    // Misc approval flows — upsert by id in payload
    approveClinicStaffTimeOffRequest: { sheet: 'ClinicStaffTimeOffRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    rejectClinicStaffTimeOffRequest: { sheet: 'ClinicStaffTimeOffRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    cancelClinicStaffTimeOffRequest: { sheet: 'ClinicStaffTimeOffRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    approveClinicVisitDeletion: { sheet: 'ClinicVisitDeletionRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    rejectClinicVisitDeletion: { sheet: 'ClinicVisitDeletionRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    approveMedicationDeletion: { sheet: 'MedicationDeletionRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    rejectMedicationDeletion: { sheet: 'MedicationDeletionRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    approveSupplyRequest: { sheet: 'SupplyRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    rejectSupplyRequest: { sheet: 'SupplyRequests', op: 'upsert', idFields: ['id', 'requestId'] },
    approveFireEquipmentInspection: { sheet: 'FireEquipmentInspections', op: 'upsert', idFields: ['id', 'inspectionId'] },
    rejectFireEquipmentInspection: { sheet: 'FireEquipmentInspections', op: 'upsert', idFields: ['id', 'inspectionId'] },
    updateFireEquipmentApprovalRequest: { sheet: 'FireEquipmentApprovalRequests', op: 'upsert', idFields: ['id'] },

    saveTestReport: { sheet: 'TestReports', op: 'upsert', idFields: ['id'] },
    syncDailySafetyFormData: { sheet: 'DailySafetyCheckList', op: 'upsert', idFields: ['id'] },
    markUserOffline: { sheet: 'UserActivityLog', op: 'upsert', idFields: ['id', 'userId'] }
};

function pickId(payload, postData, idFields) {
    const sources = [payload, postData?.data, postData];
    for (const field of idFields) {
        for (const src of sources) {
            if (src && src[field] !== undefined && src[field] !== null && String(src[field]).trim() !== '') {
                return String(src[field]).trim();
            }
        }
    }
    return null;
}

function pickRowData(payload, postData, dataField) {
    if (dataField && payload?.[dataField]) return payload[dataField];
    if (payload?.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) return payload.data;
    if (payload?.updateData) return payload.updateData;
    if (payload?.record) return payload.record;
    if (payload && typeof payload === 'object' && payload.id) return payload;
    return payload?.data || payload || {};
}

function resolveSheetName(spec, payload, postData) {
    if (spec.sheet) return spec.sheet;
    return payload?.sheetName || postData?.sheetName || postData?.data?.sheetName || null;
}

function upsertRow(db, sheetName, row) {
    if (!row || typeof row !== 'object') {
        return { success: false, message: 'بيانات السجل مطلوبة' };
    }
    if (!row.id) {
        row.id = `${sheetName.substring(0, 3).toUpperCase()}_${Date.now()}`;
    }
    row.updatedAt = new Date().toISOString();
    row.createdAt = row.createdAt || row.updatedAt;
    const existing = db.readFromSheet(sheetName, { id: row.id });
    if (existing && existing.length > 0) {
        db.updateRow(sheetName, 'id', row.id, row);
        return { success: true, message: 'تم التحديث بنجاح', id: row.id, updated: true };
    }
    db.insertRow(sheetName, row);
    return { success: true, message: 'تم الحفظ بنجاح', id: row.id, inserted: true };
}

function buildEntityHandler(actionName, spec) {
    return function entityHandler(payload, postData, action, actorUserData) {
        const sheetName = resolveSheetName(spec, payload, postData);
        if (!sheetName) {
            return { success: false, message: 'اسم الجدول مطلوب', errorCode: 'SHEET_NAME_REQUIRED' };
        }
        if (!headersMap[sheetName]) {
            return { success: false, message: `جدول غير معروف: ${sheetName}`, errorCode: 'SHEET_NOT_FOUND' };
        }

        const gate = checkSheetDirectWriteAccess(sheetName, actorUserData, actionName);
        if (!gate.ok) return gate;

        const db = getDatabase();

        try {
            if (spec.op === 'deleteAll') {
                db.exec(`DELETE FROM "${sheetName}"`);
                return { success: true, message: 'تم حذف جميع السجلات', deleted: true };
            }

            if (spec.op === 'deleteFromPayload' || spec.op === 'delete') {
                const id = pickId(payload, postData, spec.idFields || ['id']);
                if (!id) return { success: false, message: 'معرف السجل مطلوب للحذف' };
                const changes = db.deleteRows(sheetName, 'id', id);
                return {
                    success: true,
                    message: changes > 0 ? 'تم الحذف بنجاح' : 'لم يتم العثور على السجل',
                    deleted: changes > 0,
                    id
                };
            }

            if (spec.op === 'upsert') {
                const row = pickRowData(payload, postData, spec.dataField);
                const id = pickId(payload, postData, spec.idFields || ['id']);
                if (id && !row.id) row.id = id;
                return upsertRow(db, sheetName, row);
            }

            return { success: false, message: `عملية غير مدعومة: ${spec.op}` };
        } catch (err) {
            return { success: false, message: err.message || 'خطأ في تنفيذ الإجراء', errorCode: 'ENTITY_ACTION_ERROR' };
        }
    };
}

function getEntityActionHandlers() {
    const handlers = {};
    for (const [actionName, spec] of Object.entries(ACTION_MAP)) {
        handlers[actionName] = buildEntityHandler(actionName, spec);
    }
    return handlers;
}

function resolveEntityAction(action) {
    const spec = ACTION_MAP[action];
    if (!spec) return null;
    return buildEntityHandler(action, spec);
}

module.exports = {
    ACTION_MAP,
    getEntityActionHandlers,
    resolveEntityAction
};
