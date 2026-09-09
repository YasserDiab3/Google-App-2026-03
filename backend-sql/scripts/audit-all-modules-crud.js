/**
 * Comprehensive System CRUD Audit Script across 17 Key Modules
 */
'use strict';

const assert = require('assert');
const { handleRpcRequest } = require('../src/rpc-router');

const adminUser = {
    id: 'USR_AUDIT',
    email: 'admin@system.local',
    role: 'admin',
    isAdmin: true,
    sessionToken: 'SES_AUDIT_SYSTEM_TOKEN_123'
};

const MODULES_TO_TEST = [
    { sheet: 'Employees', add: 'addEmployee', get: 'getAllEmployees', update: 'updateEmployee', delete: 'deleteEmployee' },
    { sheet: 'Training', add: 'addTraining', get: 'getAllTrainings', update: 'updateTraining', delete: 'deleteTraining' },
    { sheet: 'LegalTrainings', add: 'addLegalTraining', get: 'getAllLegalTrainings', update: 'updateLegalTraining', delete: 'deleteLegalTraining' },
    { sheet: 'LegalTrainingAttendees', add: 'addLegalTrainingAttendee', get: 'getAllLegalTrainingAttendees', update: 'updateLegalTrainingAttendee', delete: 'deleteLegalTrainingAttendee' },
    { sheet: 'ContractorTrainings', add: 'addContractorTraining', get: 'getAllContractorTrainings', update: 'updateContractorTraining', delete: 'deleteContractorTraining' },
    { sheet: 'ApprovedContractors', add: 'addApprovedContractors', get: 'getAllApprovedContractors', update: 'updateApprovedContractors', delete: 'deleteApprovedContractors' },
    { sheet: 'ClinicVisits', add: 'addClinicVisits', get: 'getAllClinicVisits', update: 'updateClinicVisits', delete: 'deleteClinicVisits' },
    { sheet: 'Medications', add: 'addMedication', get: 'getAllMedications', update: 'updateMedication', delete: 'deleteMedication' },
    { sheet: 'Injuries', add: 'addInjury', get: 'getAllInjuries', update: 'updateInjury', delete: 'deleteInjury' },
    { sheet: 'Violations', add: 'addViolation', get: 'getAllViolations', update: 'updateViolation', delete: 'deleteViolationFromSheet' },
    { sheet: 'PTW', add: 'addPTW', get: 'getAllPTW', update: 'updatePTW', delete: 'deletePTW' },
    { sheet: 'DailyObservations', add: 'addDailyObservations', get: 'getAllDailyObservations', update: 'updateDailyObservations', delete: 'deleteDailyObservations' },
    { sheet: 'NearMiss', add: 'addNearMiss', get: 'getAllNearMiss', update: 'updateNearMiss', delete: 'deleteNearMiss' },
    { sheet: 'FireEquipmentAssets', add: 'addFireEquipmentAssets', get: 'getAllFireEquipmentAssets', update: 'updateFireEquipmentAssets', delete: 'deleteFireEquipmentAssets' },
    { sheet: 'PeriodicEquipmentAssets', add: 'addPeriodicEquipmentAssets', get: 'getAllPeriodicEquipmentAssets', update: 'updatePeriodicEquipmentAssets', delete: 'deletePeriodicEquipmentAssets' },
    { sheet: 'PPE', add: 'addPPE', get: 'getAllPPE', update: 'updatePPE', delete: 'deletePPE' },
    { sheet: 'BehaviorMonitoring', add: 'addBehaviorMonitoring', get: 'getAllBehaviorMonitoring', update: 'updateBehaviorMonitoring', delete: 'deleteBehaviorMonitoring' },
    
    // Additional System Modules
    { sheet: 'Incidents', add: 'addIncident', get: 'getAllIncidents', update: 'updateIncident', delete: 'deleteIncident' },
    { sheet: 'EmergencyMapItems', add: 'addEmergencyMapItem', get: 'getAllEmergencyMapItems', update: 'updateEmergencyMapItem', delete: 'deleteEmergencyMapItem' },
    { sheet: 'EmergencyFloorPlans', add: 'addEmergencyFloorPlan', get: 'getAllEmergencyFloorPlans', update: 'updateEmergencyFloorPlan', delete: 'deleteEmergencyFloorPlan' },
    { sheet: 'ChemicalSafety', add: 'addChemicalSafety', get: 'getAllChemicalSafety', update: 'updateChemicalSafety', delete: 'deleteChemicalSafety' },
    { sheet: 'ActionTrackingRegister', add: 'addActionTracking', get: 'getAllActionTracking', update: 'updateActionTracking', delete: 'deleteActionTracking' },
    { sheet: 'Sustainability', add: 'addSustainability', get: 'getAllSustainability', update: 'updateSustainability', delete: 'deleteSustainability' },
    { sheet: 'SafetyBudget', add: 'addSafetyBudget', get: 'getAllSafetyBudget', update: 'updateSafetyBudget', delete: 'deleteSafetyBudget' },
    { sheet: 'RiskAssessment', add: 'addRiskAssessment', get: 'getAllRiskAssessment', update: 'updateRiskAssessment', delete: 'deleteRiskAssessment' },
    { sheet: 'LegalDocuments', add: 'addLegalDocuments', get: 'getAllLegalDocuments', update: 'updateLegalDocuments', delete: 'deleteLegalDocuments' },
    { sheet: 'SafetyTeamMembers', add: 'addSafetyTeamMember', get: 'getAllSafetyTeamMembers', update: 'updateSafetyTeamMember', delete: 'deleteSafetyTeamMember' },
    { sheet: 'SafetyTeamTasks', add: 'addSafetyTeamTask', get: 'getAllSafetyTeamTasks', update: 'updateSafetyTeamTask', delete: 'deleteSafetyTeamTask' },
    { sheet: 'SafetyTeamLeave', add: 'addSafetyTeamLeave', get: 'getAllSafetyTeamLeave', update: 'updateSafetyTeamLeave', delete: 'deleteSafetyTeamLeave' },
    { sheet: 'SafetyTeamKPIs', add: 'addSafetyTeamKPI', get: 'getAllSafetyTeamKPIs', update: 'updateSafetyTeamKPI', delete: 'deleteCustomKPI' }
];

async function runAudit() {
    console.log('=== RUNNING FULL MODULES CRUD AUDIT ===\n');
    let totalOps = 0;
    let passedOps = 0;

    for (const mod of MODULES_TO_TEST) {
        const testId = `AUDIT_${mod.sheet.toUpperCase()}_${Date.now()}`;
        console.log(`🔍 Testing Module: [${mod.sheet}]`);

        // 1. CREATE (Add)
        totalOps++;
        const addRes = await handleRpcRequest({
            action: mod.add,
            data: { id: testId, name: 'Audit Item', status: 'Active', createdAt: new Date().toISOString() },
            actorUserData: adminUser,
            sessionToken: adminUser.sessionToken
        });
        if (addRes && (addRes.success || addRes.ok || addRes.inserted)) {
            passedOps++;
            console.log(`  ✅ CREATE (${mod.add}): PASS`);
        } else {
            console.error(`  ❌ CREATE (${mod.add}): FAILED`, addRes);
        }

        // 2. READ (Get)
        totalOps++;
        const getRes = await handleRpcRequest({
            action: mod.get,
            data: { limit: 10 },
            actorUserData: adminUser,
            sessionToken: adminUser.sessionToken
        });
        if (getRes && (getRes.success || getRes.ok) && (Array.isArray(getRes.data) || Array.isArray(getRes.injuries))) {
            passedOps++;
            console.log(`  ✅ READ (${mod.get}): PASS`);
        } else {
            console.error(`  ❌ READ (${mod.get}): FAILED`, getRes);
        }

        // 3. UPDATE (Edit)
        totalOps++;
        const updateRes = await handleRpcRequest({
            action: mod.update,
            data: { id: testId, updateData: { status: 'Updated' } },
            actorUserData: adminUser,
            sessionToken: adminUser.sessionToken
        });
        if (updateRes && (updateRes.success || updateRes.ok)) {
            passedOps++;
            console.log(`  ✅ UPDATE (${mod.update}): PASS`);
        } else {
            console.error(`  ❌ UPDATE (${mod.update}): FAILED`, updateRes);
        }

        // 4. DELETE (Remove)
        totalOps++;
        const deleteRes = await handleRpcRequest({
            action: mod.delete,
            data: { id: testId, injuryId: testId, recordId: testId },
            actorUserData: adminUser,
            sessionToken: adminUser.sessionToken
        });
        if (deleteRes && (deleteRes.success || deleteRes.ok)) {
            passedOps++;
            console.log(`  ✅ DELETE (${mod.delete}): PASS`);
        } else {
            console.error(`  ❌ DELETE (${mod.delete}): FAILED`, deleteRes);
        }

        console.log('');
    }

    console.log(`=== AUDIT COMPLETED: ${passedOps} / ${totalOps} CRUD Operations Passed (${((passedOps/totalOps)*100).toFixed(1)}%) ===`);
    if (passedOps < totalOps) {
        process.exit(1);
    }
}

runAudit().catch(err => {
    console.error('❌ Audit Exception:', err);
    process.exit(1);
});
