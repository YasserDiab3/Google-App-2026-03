/**
 * Clinic Action Handlers
 */
const ClinicHandlers = {
    'addClinicVisit': function(payload, postData, action, actorUserData, spreadsheetId) {
        var result = { success: false, message: '' };
        Logger.log('🚀 [ClinicHandlers] addClinicVisit action تم استدعاؤها');

        // Use the robust data extraction logic from ActionHandlers
        let visitDataToUse = payload;
        if (!visitDataToUse || typeof visitDataToUse !== 'object' || Object.keys(visitDataToUse).length === 0) {
            visitDataToUse = postData.data;
        }
        if (!visitDataToUse || typeof visitDataToUse !== 'object' || Object.keys(visitDataToUse).length === 0) {
            const postDataCopy = {};
            for (var key in postData) {
                if (postData.hasOwnProperty(key) && key !== 'action' && key !== 'csrfToken' && key !== 'skipCSRFCheck' && key !== 'skipCSRF') {
                    postDataCopy[key] = postData[key];
                }
            }
            if (Object.keys(postDataCopy).length > 0) {
                visitDataToUse = postDataCopy;
            }
        }

        if (!visitDataToUse || typeof visitDataToUse !== 'object' || Object.keys(visitDataToUse).length === 0) {
            result = { success: false, message: 'بيانات الزيارة غير موجودة أو غير صحيحة' };
        } else {
            result = addClinicVisitToSheet(visitDataToUse);
        }
        return result;
    },

    'updateClinicVisit': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateClinicVisit(payload.visitId || payload.id, payload.updateData || payload);
    },

    'getAllClinicVisits': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllClinicVisits(payload.filters || {});
    },

    'deleteClinicVisit': function(payload, postData, action, actorUserData, spreadsheetId) {
        return deleteClinicVisit(payload.visitId || payload.id);
    },

    'addMedication': function(payload, postData, action, actorUserData, spreadsheetId) {
        return addMedicationToSheet(payload);
    },

    'updateMedication': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateMedication(payload.medicationId || payload.id, payload.updateData || payload);
    },

    'deleteMedication': function(payload, postData, action, actorUserData, spreadsheetId) {
        return deleteMedication(payload.medicationId || payload.id);
    },

    'getAllMedications': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllMedications(payload.filters || {});
    },

    'getMedicationAlerts': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getMedicationAlerts();
    },

    'addSickLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        return addSickLeaveToSheet(payload);
    },

    'updateSickLeave': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateSickLeave(payload.leaveId || payload.id, payload.updateData || payload);
    },

    'getAllSickLeaves': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllSickLeaves(payload.filters || {});
    },

    'addInjury': function(payload, postData, action, actorUserData, spreadsheetId) {
        return addInjuryToSheet(payload);
    },

    'updateInjury': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateInjury(payload.injuryId || payload.id, payload.updateData || payload);
    },

    'getAllInjuries': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllInjuries(payload.filters || {});
    },

    'addClinicInventory': function(payload, postData, action, actorUserData, spreadsheetId) {
        return addClinicInventoryToSheet(payload);
    },

    'updateClinicInventory': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateClinicInventory(payload.inventoryId || payload.id, payload.updateData || payload);
    },

    'getAllClinicInventory': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllClinicInventory(payload.filters || {});
    },

    'addMedicationDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return addMedicationDeletionRequest(payload);
    },

    'updateMedicationDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateMedicationDeletionRequest(payload.requestId || payload.id, payload.updateData || payload);
    },

    'getAllMedicationDeletionRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllMedicationDeletionRequests(payload.filters || {});
    },

    'approveMedicationDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        return approveMedicationDeletion(payload.requestId || payload.id, payload.approverData || payload.approver);
    },

    'rejectMedicationDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        return rejectMedicationDeletion(payload.requestId || payload.id, payload.rejectorData || payload.rejector, payload.reason);
    },

    'addSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return addSupplyRequest(payload);
    },

    'updateSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateSupplyRequest(payload.requestId || payload.id, payload.updateData || payload);
    },

    'getAllSupplyRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllSupplyRequests(payload.filters || {});
    },

    'approveSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return approveSupplyRequest(payload.requestId || payload.id, payload.approverData || payload.approver);
    },

    'rejectSupplyRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return rejectSupplyRequest(payload.requestId || payload.id, payload.rejectorData || payload.rejector, payload.reason);
    },

    'addClinicVisitDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return addClinicVisitDeletionRequest(payload);
    },

    'updateClinicVisitDeletionRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
        return updateClinicVisitDeletionRequest(payload.requestId || payload.id, payload.updateData || payload);
    },

    'getAllClinicVisitDeletionRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
        return getAllClinicVisitDeletionRequests(payload.filters || {});
    },

    'approveClinicVisitDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        return approveClinicVisitDeletion(payload.requestId || payload.id, payload.approverData || payload.approver);
    },

    'rejectClinicVisitDeletion': function(payload, postData, action, actorUserData, spreadsheetId) {
        return rejectClinicVisitDeletion(payload.requestId || payload.id, payload.rejectorData || payload.rejector, payload.reason);
    },

    'processPendingMedicationDeductions': function(payload, postData, action, actorUserData, spreadsheetId) {
        return processPendingMedicationDeductions();
    }
};
