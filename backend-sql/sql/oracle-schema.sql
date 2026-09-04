-- HSE Oracle schema (auto-generated from headers-schema.js)
-- Run once on Autonomous DB as HSE_APP user.
-- If table exists, statement fails — skip or DROP manually.

CREATE TABLE "Users" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "email" VARCHAR2(4000),
  "password" CLOB,
  "passwordHash" CLOB,
  "role" VARCHAR2(4000),
  "department" CLOB,
  "active" VARCHAR2(4000),
  "photo" CLOB,
  "permissions" CLOB,
  "lastLogin" CLOB,
  "lastLogout" CLOB,
  "isOnline" CLOB,
  "loginHistory" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "postLoginPolicySeenAt" CLOB,
  "profilePublicToken" CLOB,
  "profilePublicTokenExpiry" CLOB,
  "mfaEnabled" CLOB,
  "mfaSecretEnc" CLOB,
  "mfaEnrolledAt" CLOB,
  "employeeCode" VARCHAR2(4000),
  "lastPresenceAt" CLOB,
  "activeSessionId" VARCHAR2(4000),
  "column_26" CLOB
);

CREATE INDEX "ix_Users_id" ON "Users" ("id");
CREATE INDEX "ix_Users_email" ON "Users" ("email");
CREATE INDEX "ix_Users_createdAt" ON "Users" ("createdAt");

CREATE TABLE "HSE_Settings" (
  "Setting_Key" CLOB,
  "Setting_Value" CLOB,
  "Description" CLOB,
  "Last_Updated" CLOB
);


CREATE TABLE "SecurityOfficers" (
  "ID" VARCHAR2(4000),
  "Name" CLOB,
  "Role" VARCHAR2(4000),
  "Site" CLOB,
  "Phone" CLOB,
  "Is Active" CLOB,
  "Created At" CLOB,
  "Updated At" CLOB
);


CREATE TABLE "GateVisitors" (
  "Record ID" VARCHAR2(4000),
  "Entry Date" CLOB,
  "Entry Time" CLOB,
  "Visitor Name" CLOB,
  "Organization / Company" CLOB,
  "National ID / Passport" CLOB,
  "Phone Number" CLOB,
  "Vehicle Plate" CLOB,
  "Target Site" CLOB,
  "Target Hall / Area" CLOB,
  "Host Person & Dept" CLOB,
  "Visit Purpose" CLOB,
  "Badge #" CLOB,
  "Security Officer / Registered By" CLOB,
  "Status" VARCHAR2(4000),
  "Exit Time" CLOB,
  "Duration (Minutes)" CLOB,
  "Signature URL" CLOB,
  "Created At Timestamp" CLOB
);


CREATE TABLE "PeriodicEquipmentInspections" (
  "id" VARCHAR2(4000),
  "assetId" VARCHAR2(4000),
  "assetNumber" CLOB,
  "inspectionDate" CLOB,
  "inspector" CLOB,
  "result" CLOB,
  "checklistResults" CLOB,
  "findings" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_PeriodicEquipmentInspections_id" ON "PeriodicEquipmentInspections" ("id");
CREATE INDEX "ix_PeriodicEquipmentInspections_createdAt" ON "PeriodicEquipmentInspections" ("createdAt");
CREATE INDEX "ix_PeriodicEquipmentInspections_status" ON "PeriodicEquipmentInspections" ("status");

CREATE TABLE "PeriodicEquipmentAssets" (
  "id" VARCHAR2(4000),
  "assetNumber" CLOB,
  "typeId" VARCHAR2(4000),
  "typeName" CLOB,
  "factoryId" VARCHAR2(4000),
  "serialNumber" CLOB,
  "qrCodeData" CLOB,
  "location" CLOB,
  "subLocation" CLOB,
  "factory" CLOB,
  "manufacturer" CLOB,
  "model" CLOB,
  "manufacturingYear" CLOB,
  "installationDate" CLOB,
  "status" VARCHAR2(4000),
  "responsible" CLOB,
  "notes" CLOB,
  "lastInspection" CLOB,
  "nextInspection" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryName" CLOB,
  "subLocationId" VARCHAR2(4000),
  "subLocationName" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_PeriodicEquipmentAssets_id" ON "PeriodicEquipmentAssets" ("id");
CREATE INDEX "ix_PeriodicEquipmentAssets_createdAt" ON "PeriodicEquipmentAssets" ("createdAt");
CREATE INDEX "ix_PeriodicEquipmentAssets_status" ON "PeriodicEquipmentAssets" ("status");

CREATE TABLE "Email_Settings" (
  "id" VARCHAR2(4000),
  "configJson" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB
);

CREATE INDEX "ix_Email_Settings_id" ON "Email_Settings" ("id");

CREATE TABLE "ClientErrorLog" (
  "id" VARCHAR2(4000),
  "level" CLOB,
  "message" CLOB,
  "stack" CLOB,
  "source" CLOB,
  "line" CLOB,
  "col" CLOB,
  "module" CLOB,
  "action" CLOB,
  "pageUrl" CLOB,
  "userAgent" CLOB,
  "appVersion" CLOB,
  "userId" VARCHAR2(4000),
  "userEmail" CLOB,
  "username" CLOB,
  "sessionId" VARCHAR2(4000),
  "fingerprint" CLOB,
  "status" VARCHAR2(4000),
  "extra" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClientErrorLog_id" ON "ClientErrorLog" ("id");
CREATE INDEX "ix_ClientErrorLog_createdAt" ON "ClientErrorLog" ("createdAt");
CREATE INDEX "ix_ClientErrorLog_status" ON "ClientErrorLog" ("status");

CREATE TABLE "SafetyCalendarCustomEvents" (
  "title" CLOB,
  "id" VARCHAR2(4000),
  "description" CLOB,
  "startDate" CLOB,
  "endDate" CLOB,
  "recurring" CLOB,
  "color" CLOB,
  "enabled" CLOB,
  "userData" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyCalendarCustomEvents_id" ON "SafetyCalendarCustomEvents" ("id");
CREATE INDEX "ix_SafetyCalendarCustomEvents_createdAt" ON "SafetyCalendarCustomEvents" ("createdAt");

CREATE TABLE "ClinicStaffLeaveQuota" (
  "staffId" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userName" CLOB,
  "periodType" CLOB,
  "updatedById" VARCHAR2(4000),
  "updatedByName" CLOB,
  "id" VARCHAR2(4000),
  "userEmail" CLOB,
  "periodKey" CLOB,
  "leaveDaysQuota" CLOB,
  "permissionCountQuota" CLOB,
  "notes" CLOB,
  "updatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicStaffLeaveQuota_id" ON "ClinicStaffLeaveQuota" ("id");
CREATE INDEX "ix_ClinicStaffLeaveQuota_createdAt" ON "ClinicStaffLeaveQuota" ("createdAt");

CREATE TABLE "ClinicStaffTimeOffRequests" (
  "id" VARCHAR2(4000),
  "requestType" CLOB,
  "staffId" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userName" CLOB,
  "reviewedById" VARCHAR2(4000),
  "reviewedByName" CLOB,
  "userEmail" CLOB,
  "staffRole" CLOB,
  "dateFrom" CLOB,
  "dateTo" CLOB,
  "timeFrom" CLOB,
  "timeTo" CLOB,
  "durationHours" CLOB,
  "durationDays" CLOB,
  "reason" CLOB,
  "status" VARCHAR2(4000),
  "reviewNotes" CLOB,
  "requestedAt" CLOB,
  "reviewedAt" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicStaffTimeOffRequests_id" ON "ClinicStaffTimeOffRequests" ("id");
CREATE INDEX "ix_ClinicStaffTimeOffRequests_createdAt" ON "ClinicStaffTimeOffRequests" ("createdAt");
CREATE INDEX "ix_ClinicStaffTimeOffRequests_status" ON "ClinicStaffTimeOffRequests" ("status");

CREATE TABLE "ClinicStaffAttendance" (
  "id" VARCHAR2(4000),
  "staffId" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userName" CLOB,
  "sessionId" VARCHAR2(4000),
  "userEmail" CLOB,
  "staffRole" CLOB,
  "date" VARCHAR2(4000),
  "checkIn" CLOB,
  "checkOut" CLOB,
  "workDuration" CLOB,
  "status" VARCHAR2(4000),
  "source" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicStaffAttendance_id" ON "ClinicStaffAttendance" ("id");
CREATE INDEX "ix_ClinicStaffAttendance_createdAt" ON "ClinicStaffAttendance" ("createdAt");
CREATE INDEX "ix_ClinicStaffAttendance_date" ON "ClinicStaffAttendance" ("date");
CREATE INDEX "ix_ClinicStaffAttendance_status" ON "ClinicStaffAttendance" ("status");

CREATE TABLE "ClinicStaff" (
  "userId" VARCHAR2(4000),
  "userName" CLOB,
  "jobTitle" CLOB,
  "id" VARCHAR2(4000),
  "userEmail" CLOB,
  "department" CLOB,
  "staffRole" CLOB,
  "isActive" CLOB,
  "userData" CLOB,
  "sortOrder" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicStaff_id" ON "ClinicStaff" ("id");
CREATE INDEX "ix_ClinicStaff_createdAt" ON "ClinicStaff" ("createdAt");

CREATE TABLE "EmergencyMapItems" (
  "floorPlanId" VARCHAR2(4000),
  "itemType" CLOB,
  "id" VARCHAR2(4000),
  "label" CLOB,
  "x" CLOB,
  "y" CLOB,
  "status" VARCHAR2(4000),
  "userData" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_EmergencyMapItems_id" ON "EmergencyMapItems" ("id");
CREATE INDEX "ix_EmergencyMapItems_createdAt" ON "EmergencyMapItems" ("createdAt");
CREATE INDEX "ix_EmergencyMapItems_status" ON "EmergencyMapItems" ("status");

CREATE TABLE "EmergencyFloorPlans" (
  "name" CLOB,
  "imageDriveId" VARCHAR2(4000),
  "imageWidth" CLOB,
  "id" VARCHAR2(4000),
  "floor" CLOB,
  "imageHeight" CLOB,
  "sortOrder" CLOB,
  "isActive" CLOB,
  "qrToken" CLOB,
  "drawStampsJson" CLOB,
  "userData" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "factoryName" CLOB,
  "factory" CLOB,
  "subLocationId" VARCHAR2(4000),
  "subLocationName" CLOB
);

CREATE INDEX "ix_EmergencyFloorPlans_id" ON "EmergencyFloorPlans" ("id");
CREATE INDEX "ix_EmergencyFloorPlans_createdAt" ON "EmergencyFloorPlans" ("createdAt");

CREATE TABLE "LegalTrainingAttendees" (
  "id" VARCHAR2(4000),
  "legalTrainingId" VARCHAR2(4000),
  "legalTrainingTitle" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeName" CLOB,
  "employeePosition" CLOB,
  "department" CLOB,
  "factory" CLOB,
  "factoryName" CLOB,
  "attendanceDate" CLOB,
  "attendanceStatus" CLOB,
  "score" CLOB,
  "certificateNumber" CLOB,
  "certificateDate" CLOB,
  "certificateExpiryDate" CLOB,
  "certificateImage" CLOB,
  "notes" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_LegalTrainingAttendees_id" ON "LegalTrainingAttendees" ("id");
CREATE INDEX "ix_LegalTrainingAttendees_createdAt" ON "LegalTrainingAttendees" ("createdAt");

CREATE TABLE "LegalTrainings" (
  "id" VARCHAR2(4000),
  "title" CLOB,
  "legalReference" CLOB,
  "legalArticle" CLOB,
  "category" CLOB,
  "frequency" CLOB,
  "targetGroup" CLOB,
  "department" CLOB,
  "factory" CLOB,
  "factoryName" CLOB,
  "scheduledDate" CLOB,
  "actualDate" CLOB,
  "trainer" CLOB,
  "trainerQualification" CLOB,
  "duration" CLOB,
  "participantsCount" CLOB,
  "status" VARCHAR2(4000),
  "expiryDate" CLOB,
  "nextDueDate" CLOB,
  "certificateRequired" CLOB,
  "complianceStatus" CLOB,
  "penaltyForNonCompliance" CLOB,
  "notes" CLOB,
  "attachments" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_LegalTrainings_id" ON "LegalTrainings" ("id");
CREATE INDEX "ix_LegalTrainings_createdAt" ON "LegalTrainings" ("createdAt");
CREATE INDEX "ix_LegalTrainings_status" ON "LegalTrainings" ("status");

CREATE TABLE "UserVersions" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userName" CLOB,
  "userEmail" CLOB,
  "userRole" CLOB,
  "userDepartment" CLOB,
  "currentVersion" CLOB,
  "firstSeenVersion" CLOB,
  "previousVersion" CLOB,
  "lastSeenAt" CLOB,
  "firstSeenAt" CLOB,
  "sessionCount" CLOB,
  "reportCount" CLOB,
  "userAgent" CLOB,
  "platform" CLOB,
  "isMobile" CLOB,
  "screenSize" CLOB,
  "language" CLOB,
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_UserVersions_id" ON "UserVersions" ("id");

CREATE TABLE "ViolationApprovalRequests" (
  "id" VARCHAR2(4000),
  "requestType" CLOB,
  "originalViolationId" VARCHAR2(4000),
  "createdByName" CLOB,
  "approvedByName" CLOB,
  "rejectedByName" CLOB,
  "finalViolationId" VARCHAR2(4000),
  "violationData" CLOB,
  "status" VARCHAR2(4000),
  "approvers" CLOB,
  "currentApproverIndex" CLOB,
  "approvedBy" CLOB,
  "approvedAt" CLOB,
  "rejectedBy" CLOB,
  "rejectedAt" CLOB,
  "rejectionReason" CLOB,
  "notes" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB
);

CREATE INDEX "ix_ViolationApprovalRequests_id" ON "ViolationApprovalRequests" ("id");
CREATE INDEX "ix_ViolationApprovalRequests_createdAt" ON "ViolationApprovalRequests" ("createdAt");
CREATE INDEX "ix_ViolationApprovalRequests_status" ON "ViolationApprovalRequests" ("status");

CREATE TABLE "LegalInventory" (
  "id" VARCHAR2(4000),
  "lawNumber" CLOB,
  "issueDate" CLOB,
  "issuingAuthority" CLOB,
  "complianceStatement" CLOB,
  "responsible" CLOB,
  "applicationStatus" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_LegalInventory_id" ON "LegalInventory" ("id");
CREATE INDEX "ix_LegalInventory_createdAt" ON "LegalInventory" ("createdAt");

CREATE TABLE "ViolationApprovalSettings" (
  "id" VARCHAR2(4000),
  "updatedByName" CLOB,
  "requireApproval" CLOB,
  "defaultApprovers" CLOB,
  "bypassRoles" CLOB,
  "updatedBy" CLOB,
  "updatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ViolationApprovalSettings_id" ON "ViolationApprovalSettings" ("id");
CREATE INDEX "ix_ViolationApprovalSettings_createdAt" ON "ViolationApprovalSettings" ("createdAt");

CREATE TABLE "Employees" (
  "employeeNumber" CLOB,
  "name" CLOB,
  "department" CLOB,
  "job" CLOB,
  "nationalId" VARCHAR2(4000),
  "birthDate" CLOB,
  "age" CLOB,
  "hireDate" CLOB,
  "gender" CLOB,
  "phone" CLOB,
  "insuranceNumber" CLOB,
  "sapId" VARCHAR2(4000),
  "branch" CLOB,
  "location" CLOB,
  "position" CLOB,
  "email" VARCHAR2(4000),
  "photo" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "resignationDate" CLOB,
  "column_23" CLOB,
  "column_24" CLOB,
  "column_25" CLOB,
  "column_26" CLOB
);

CREATE INDEX "ix_Employees_id" ON "Employees" ("id");
CREATE INDEX "ix_Employees_email" ON "Employees" ("email");
CREATE INDEX "ix_Employees_createdAt" ON "Employees" ("createdAt");
CREATE INDEX "ix_Employees_status" ON "Employees" ("status");

CREATE TABLE "PPE_Eligibility_Rules" (
  "id" VARCHAR2(4000),
  "equipmentType" CLOB,
  "months" CLOB,
  "days" CLOB,
  "isActive" CLOB,
  "sortOrder" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_PPE_Eligibility_Rules_id" ON "PPE_Eligibility_Rules" ("id");
CREATE INDEX "ix_PPE_Eligibility_Rules_createdAt" ON "PPE_Eligibility_Rules" ("createdAt");

CREATE TABLE "ContractorBehaviorMonitoring" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "contractorId" VARCHAR2(4000),
  "contractorName" CLOB,
  "factoryId" VARCHAR2(4000),
  "factoryName" CLOB,
  "subLocationId" VARCHAR2(4000),
  "subLocationName" CLOB,
  "behaviorType" CLOB,
  "contractorWorker" CLOB,
  "department" CLOB,
  "job" CLOB,
  "factory" CLOB,
  "subLocation" CLOB,
  "photo" CLOB,
  "date" VARCHAR2(4000),
  "rating" CLOB,
  "correctiveAction" CLOB,
  "correctiveActionDetails" CLOB,
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ContractorBehaviorMonitoring_id" ON "ContractorBehaviorMonitoring" ("id");
CREATE INDEX "ix_ContractorBehaviorMonitoring_createdAt" ON "ContractorBehaviorMonitoring" ("createdAt");
CREATE INDEX "ix_ContractorBehaviorMonitoring_date" ON "ContractorBehaviorMonitoring" ("date");

CREATE TABLE "BehaviorMonitoring" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "employeeId" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" CLOB,
  "employeeName" CLOB,
  "behaviorType" CLOB,
  "photo" CLOB,
  "date" VARCHAR2(4000),
  "rating" CLOB,
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "factoryName" CLOB,
  "subLocationId" VARCHAR2(4000),
  "subLocationName" CLOB,
  "department" CLOB,
  "job" CLOB,
  "factory" CLOB,
  "subLocation" CLOB,
  "correctiveAction" CLOB,
  "correctiveActionDetails" CLOB
);

CREATE INDEX "ix_BehaviorMonitoring_id" ON "BehaviorMonitoring" ("id");
CREATE INDEX "ix_BehaviorMonitoring_createdAt" ON "BehaviorMonitoring" ("createdAt");
CREATE INDEX "ix_BehaviorMonitoring_date" ON "BehaviorMonitoring" ("date");

CREATE TABLE "SecurityAuditLog" (
  "timestamp" CLOB,
  "event" CLOB,
  "details" CLOB,
  "source" CLOB,
  "severity" CLOB
);


CREATE TABLE "PTWContractorIssuingAuthorities" (
  "id" VARCHAR2(4000),
  "personType" CLOB,
  "employeeCode" VARCHAR2(4000),
  "name" CLOB,
  "departmentId" VARCHAR2(4000),
  "departmentName" CLOB,
  "jobTitle" CLOB,
  "factory" CLOB,
  "location" CLOB,
  "sublocation" CLOB,
  "email" VARCHAR2(4000),
  "phone" CLOB,
  "isActive" CLOB,
  "contractorFlag" CLOB,
  "coldWork" CLOB,
  "loto" CLOB,
  "hotWork" CLOB,
  "workAtHeight" CLOB,
  "confinedSpace" CLOB,
  "excavation" CLOB,
  "contractorPTW" CLOB,
  "liftingPlan" CLOB,
  "sortOrder" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB,
  "contractorCompanyName" CLOB
);

CREATE INDEX "ix_PTWContractorIssuingAuthorities_id" ON "PTWContractorIssuingAuthorities" ("id");
CREATE INDEX "ix_PTWContractorIssuingAuthorities_email" ON "PTWContractorIssuingAuthorities" ("email");
CREATE INDEX "ix_PTWContractorIssuingAuthorities_createdAt" ON "PTWContractorIssuingAuthorities" ("createdAt");

CREATE TABLE "PTWIssuingAuthorities" (
  "id" VARCHAR2(4000),
  "personType" CLOB,
  "employeeCode" VARCHAR2(4000),
  "name" CLOB,
  "departmentId" VARCHAR2(4000),
  "departmentName" CLOB,
  "jobTitle" CLOB,
  "factory" CLOB,
  "location" CLOB,
  "sublocation" CLOB,
  "email" VARCHAR2(4000),
  "phone" CLOB,
  "isActive" CLOB,
  "contractorFlag" CLOB,
  "coldWork" CLOB,
  "loto" CLOB,
  "hotWork" CLOB,
  "workAtHeight" CLOB,
  "confinedSpace" CLOB,
  "excavation" CLOB,
  "contractorPTW" CLOB,
  "liftingPlan" CLOB,
  "sortOrder" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB,
  "contractorCompanyName" CLOB,
  "approvalRole" CLOB
);

CREATE INDEX "ix_PTWIssuingAuthorities_id" ON "PTWIssuingAuthorities" ("id");
CREATE INDEX "ix_PTWIssuingAuthorities_email" ON "PTWIssuingAuthorities" ("email");
CREATE INDEX "ix_PTWIssuingAuthorities_createdAt" ON "PTWIssuingAuthorities" ("createdAt");

CREATE TABLE "PTWIdMapping" (
  "id" VARCHAR2(4000),
  "entityType" CLOB,
  "oldId" VARCHAR2(4000),
  "newId" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PTWIdMapping_id" ON "PTWIdMapping" ("id");
CREATE INDEX "ix_PTWIdMapping_createdAt" ON "PTWIdMapping" ("createdAt");

CREATE TABLE "PTWRegistry" (
  "id" VARCHAR2(4000),
  "sequentialNumber" CLOB,
  "permitId" VARCHAR2(4000),
  "permitType" CLOB,
  "permitTypeDisplay" CLOB,
  "locationId" VARCHAR2(4000),
  "sublocationId" VARCHAR2(4000),
  "openDate" CLOB,
  "requestingParty" CLOB,
  "location" CLOB,
  "sublocation" CLOB,
  "timeFrom" CLOB,
  "timeTo" CLOB,
  "totalTime" CLOB,
  "authorizedParty" CLOB,
  "workDescription" CLOB,
  "supervisor1" CLOB,
  "supervisor2" CLOB,
  "status" VARCHAR2(4000),
  "closureDate" CLOB,
  "closureReason" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "paperPermitNumber" CLOB,
  "equipment" CLOB,
  "tools" CLOB,
  "toolsList" CLOB,
  "teamMembersText" CLOB,
  "hotWorkDetails" CLOB,
  "hotWorkOther" CLOB,
  "confinedSpaceDetails" CLOB,
  "confinedSpaceOther" CLOB,
  "heightWorkDetails" CLOB,
  "heightWorkOther" CLOB,
  "electricalWorkType" CLOB,
  "coldWorkType" CLOB,
  "otherWorkType" CLOB,
  "excavationLength" CLOB,
  "excavationWidth" CLOB,
  "excavationDepth" CLOB,
  "soilType" CLOB,
  "preStartChecklist" CLOB,
  "lotoApplied" CLOB,
  "governmentPermits" CLOB,
  "riskAssessmentAttached" CLOB,
  "gasTesting" CLOB,
  "mocRequest" CLOB,
  "ppeNotes" CLOB,
  "requiredPPE" CLOB,
  "riskLikelihood" CLOB,
  "riskConsequence" CLOB,
  "riskScore" CLOB,
  "riskLevel" CLOB,
  "riskNotes" CLOB,
  "manualApprovalsText" CLOB,
  "manualClosureApprovalsText" CLOB,
  "isManualEntry" CLOB,
  "approvalCircuitOwnerId" VARCHAR2(4000),
  "approvalCircuitName" CLOB,
  "skipApprovalFlow" CLOB,
  "createdBy" CLOB,
  "createdById" VARCHAR2(4000),
  "updatedBy" CLOB,
  "updatedById" VARCHAR2(4000)
);

CREATE INDEX "ix_PTWRegistry_id" ON "PTWRegistry" ("id");
CREATE INDEX "ix_PTWRegistry_createdAt" ON "PTWRegistry" ("createdAt");
CREATE INDEX "ix_PTWRegistry_status" ON "PTWRegistry" ("status");
CREATE INDEX "ix_PTWRegistry_permitId" ON "PTWRegistry" ("permitId");

CREATE TABLE "PTW" (
  "id" VARCHAR2(4000),
  "workType" CLOB,
  "siteId" VARCHAR2(4000),
  "siteName" CLOB,
  "sublocationId" VARCHAR2(4000),
  "sublocationName" CLOB,
  "electricalWorkType" CLOB,
  "coldWorkType" CLOB,
  "otherWorkType" CLOB,
  "excavationWidth" CLOB,
  "soilType" CLOB,
  "approvalCircuitOwnerId" VARCHAR2(4000),
  "approvalCircuitName" CLOB,
  "workDescription" CLOB,
  "location" CLOB,
  "sublocation" CLOB,
  "startDate" CLOB,
  "endDate" CLOB,
  "status" VARCHAR2(4000),
  "approvals" CLOB,
  "requiredPPE" CLOB,
  "riskAssessment" CLOB,
  "riskNotes" CLOB,
  "authorizedParty" CLOB,
  "requestingParty" CLOB,
  "equipment" CLOB,
  "tools" CLOB,
  "toolsList" CLOB,
  "teamMembers" CLOB,
  "hotWorkDetails" CLOB,
  "hotWorkOther" CLOB,
  "confinedSpaceDetails" CLOB,
  "confinedSpaceOther" CLOB,
  "heightWorkDetails" CLOB,
  "heightWorkOther" CLOB,
  "excavationLength" CLOB,
  "excavationDepth" CLOB,
  "preStartChecklist" CLOB,
  "lotoApplied" CLOB,
  "governmentPermits" CLOB,
  "riskAssessmentAttached" CLOB,
  "gasTesting" CLOB,
  "mocRequest" CLOB,
  "closureStatus" CLOB,
  "closureTime" CLOB,
  "closureReason" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "isManualEntry" CLOB,
  "closureApproval" CLOB,
  "approvedAt" CLOB,
  "department" CLOB,
  "responsible" CLOB,
  "skipApprovalFlow" CLOB,
  "paperPermitNumber" CLOB,
  "teamMembersText" CLOB,
  "ppeNotes" CLOB,
  "riskLikelihood" CLOB,
  "riskConsequence" CLOB,
  "riskScore" CLOB,
  "riskLevel" CLOB,
  "manualApprovals" CLOB,
  "manualApprovalsText" CLOB,
  "manualClosureApprovals" CLOB,
  "manualClosureApprovalsText" CLOB,
  "closureDate" CLOB,
  "supervisor1" CLOB,
  "supervisor2" CLOB,
  "sequentialNumber" CLOB,
  "createdById" VARCHAR2(4000),
  "updatedById" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_PTW_id" ON "PTW" ("id");
CREATE INDEX "ix_PTW_createdAt" ON "PTW" ("createdAt");
CREATE INDEX "ix_PTW_status" ON "PTW" ("status");

CREATE TABLE "ClinicContractorInjuries" (
  "id" VARCHAR2(4000),
  "personType" CLOB,
  "contractorName" CLOB,
  "personName" CLOB,
  "contractorPosition" CLOB,
  "department" CLOB,
  "factory" CLOB,
  "factoryName" CLOB,
  "subLocation" CLOB,
  "subLocationName" CLOB,
  "injuryDate" CLOB,
  "injuryType" CLOB,
  "injuryBodyPart" CLOB,
  "injuryLocation" CLOB,
  "injuryDescription" CLOB,
  "actionsTaken" CLOB,
  "treatment" CLOB,
  "status" VARCHAR2(4000),
  "attachments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB,
  "employeeName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" CLOB,
  "createdById" VARCHAR2(4000),
  "employeePosition" CLOB,
  "employeeDepartment" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_ClinicContractorInjuries_id" ON "ClinicContractorInjuries" ("id");
CREATE INDEX "ix_ClinicContractorInjuries_createdAt" ON "ClinicContractorInjuries" ("createdAt");
CREATE INDEX "ix_ClinicContractorInjuries_status" ON "ClinicContractorInjuries" ("status");

CREATE TABLE "KPIAnnualPlans" (
  "id" VARCHAR2(4000),
  "indicatorType" CLOB,
  "year" CLOB,
  "objective" CLOB,
  "kpi" CLOB,
  "target" CLOB,
  "goal" CLOB,
  "improvementPlan" CLOB,
  "jan" CLOB,
  "feb" CLOB,
  "mar" CLOB,
  "apr" CLOB,
  "may" CLOB,
  "jun" CLOB,
  "jul" CLOB,
  "aug" CLOB,
  "sep" CLOB,
  "oct" CLOB,
  "nov" CLOB,
  "dec" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_KPIAnnualPlans_id" ON "KPIAnnualPlans" ("id");
CREATE INDEX "ix_KPIAnnualPlans_createdAt" ON "KPIAnnualPlans" ("createdAt");

CREATE TABLE "SafetyBudgetPurchaseOrders" (
  "id" VARCHAR2(4000),
  "itemCodeNo" CLOB,
  "prNo" CLOB,
  "prDate" CLOB,
  "itemsDescription" CLOB,
  "detailsRemarks" CLOB,
  "quantity" CLOB,
  "prStatus" CLOB,
  "poNo" CLOB,
  "poStatus" CLOB,
  "note" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB
);

CREATE INDEX "ix_SafetyBudgetPurchaseOrders_id" ON "SafetyBudgetPurchaseOrders" ("id");
CREATE INDEX "ix_SafetyBudgetPurchaseOrders_createdAt" ON "SafetyBudgetPurchaseOrders" ("createdAt");

CREATE TABLE "ExternalWorkforceMonthly" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorCode" CLOB,
  "contractorName" CLOB,
  "year" CLOB,
  "nov" CLOB,
  "total" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB,
  "apr" CLOB,
  "jan" CLOB,
  "feb" CLOB,
  "mar" CLOB,
  "may" CLOB,
  "jun" CLOB
);

CREATE INDEX "ix_ExternalWorkforceMonthly_id" ON "ExternalWorkforceMonthly" ("id");
CREATE INDEX "ix_ExternalWorkforceMonthly_createdAt" ON "ExternalWorkforceMonthly" ("createdAt");

CREATE TABLE "MedicationDispenseLog" (
  "id" VARCHAR2(4000),
  "visitId" VARCHAR2(4000),
  "medicationId" VARCHAR2(4000),
  "medicationName" CLOB,
  "previousQuantity" CLOB,
  "deductedQuantity" CLOB,
  "newQuantity" CLOB,
  "dispensedBy" CLOB,
  "dispensedAt" CLOB,
  "notes" CLOB,
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_MedicationDispenseLog_id" ON "MedicationDispenseLog" ("id");

CREATE TABLE "NotificationEvents" (
  "id" VARCHAR2(4000),
  "type" CLOB,
  "title" CLOB,
  "key" CLOB,
  "message" CLOB,
  "icon" CLOB,
  "action" CLOB,
  "dismissed" CLOB,
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_NotificationEvents_id" ON "NotificationEvents" ("id");
CREATE INDEX "ix_NotificationEvents_createdAt" ON "NotificationEvents" ("createdAt");

CREATE TABLE "DailySafetyCheckList" (
  "id" VARCHAR2(4000),
  "reportNumber" CLOB,
  "siteId" VARCHAR2(4000),
  "siteName" CLOB,
  "date" VARCHAR2(4000),
  "inspectorName" CLOB,
  "shift" CLOB,
  "q1" CLOB,
  "q2" CLOB,
  "q3" CLOB,
  "q4" CLOB,
  "q5" CLOB,
  "q6" CLOB,
  "q7" CLOB,
  "q8" CLOB,
  "q9" CLOB,
  "q10" CLOB,
  "q11" CLOB,
  "q12" CLOB,
  "q13" CLOB,
  "q14" CLOB,
  "q15" CLOB,
  "q15Reading" CLOB,
  "q16" CLOB,
  "q17" CLOB,
  "notes" CLOB,
  "formSubmittedAt" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_DailySafetyCheckList_id" ON "DailySafetyCheckList" ("id");
CREATE INDEX "ix_DailySafetyCheckList_createdAt" ON "DailySafetyCheckList" ("createdAt");
CREATE INDEX "ix_DailySafetyCheckList_date" ON "DailySafetyCheckList" ("date");

CREATE TABLE "DocumentVersions" (
  "id" VARCHAR2(4000),
  "documentCodeId" VARCHAR2(4000),
  "documentCode" CLOB,
  "versionNumber" CLOB,
  "issueDate" CLOB,
  "revisionDate" CLOB,
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "isActive" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB
);

CREATE INDEX "ix_DocumentVersions_id" ON "DocumentVersions" ("id");
CREATE INDEX "ix_DocumentVersions_createdAt" ON "DocumentVersions" ("createdAt");
CREATE INDEX "ix_DocumentVersions_status" ON "DocumentVersions" ("status");

CREATE TABLE "DocumentCodes" (
  "id" VARCHAR2(4000),
  "code" CLOB,
  "documentName" CLOB,
  "documentType" CLOB,
  "department" CLOB,
  "status" VARCHAR2(4000),
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB
);

CREATE INDEX "ix_DocumentCodes_id" ON "DocumentCodes" ("id");
CREATE INDEX "ix_DocumentCodes_createdAt" ON "DocumentCodes" ("createdAt");
CREATE INDEX "ix_DocumentCodes_status" ON "DocumentCodes" ("status");

CREATE TABLE "ChangeRequests" (
  "title" CLOB,
  "changeType" CLOB,
  "id" VARCHAR2(4000),
  "requestNumber" CLOB,
  "description" CLOB,
  "priority" CLOB,
  "impact" CLOB,
  "relatedModule" CLOB,
  "relatedProcess" CLOB,
  "riskAssessment" CLOB,
  "mitigationActions" CLOB,
  "dueDate" CLOB,
  "requestedBy" CLOB,
  "requestedByEmail" CLOB,
  "requestedAt" CLOB,
  "status" VARCHAR2(4000),
  "timeLog" CLOB,
  "attachments" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updateNote" CLOB,
  "updatedBy" CLOB,
  "approvedBy" CLOB,
  "approvedAt" CLOB,
  "closedBy" CLOB,
  "closedAt" CLOB,
  "technicalChangeSubType" CLOB,
  "employeeName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "administrativeChangeSubType" CLOB,
  "factoryId" VARCHAR2(4000),
  "factoryName" CLOB,
  "subLocationId" VARCHAR2(4000),
  "subLocationName" CLOB,
  "fromDepartment" CLOB,
  "toDepartment" CLOB,
  "locationOther" CLOB,
  "changeContinuity" CLOB,
  "temporaryUntilDate" CLOB,
  "priorityUrgentReason" CLOB,
  "attachedDocumentsText" CLOB,
  "requestingDepartment" CLOB,
  "otherDepartments" CLOB,
  "affectedDepartments" CLOB,
  "documentsToAmendJson" CLOB,
  "committeeMembersJson" CLOB,
  "committeeRecommendations" CLOB,
  "currentTasksDescription" CLOB,
  "newTasksDescription" CLOB,
  "responsibleRequestingDepartment" CLOB,
  "responsibleImplementingDepartment" CLOB,
  "previousInjury" CLOB,
  "chronicDiseases" CLOB,
  "healthNotes" CLOB,
  "trainingRequirementsJson" CLOB,
  "implementedBy" CLOB,
  "implementedAt" CLOB,
  "approvalFlowJson" CLOB,
  "currentApprovalStep" CLOB,
  "approvalStatus" CLOB
);

CREATE INDEX "ix_ChangeRequests_id" ON "ChangeRequests" ("id");
CREATE INDEX "ix_ChangeRequests_createdAt" ON "ChangeRequests" ("createdAt");
CREATE INDEX "ix_ChangeRequests_status" ON "ChangeRequests" ("status");

CREATE TABLE "ElectricityManagement_Records" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "date" VARCHAR2(4000),
  "monthYear" CLOB,
  "location" CLOB,
  "source" CLOB,
  "startReading" CLOB,
  "endReading" CLOB,
  "totalConsumption" CLOB,
  "unit" CLOB,
  "department" CLOB,
  "notes" CLOB,
  "hasAlert" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_ElectricityManagement_Records_id" ON "ElectricityManagement_Records" ("id");
CREATE INDEX "ix_ElectricityManagement_Records_createdAt" ON "ElectricityManagement_Records" ("createdAt");
CREATE INDEX "ix_ElectricityManagement_Records_date" ON "ElectricityManagement_Records" ("date");

CREATE TABLE "GasManagement_Records" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "date" VARCHAR2(4000),
  "monthYear" CLOB,
  "location" CLOB,
  "source" CLOB,
  "startReading" CLOB,
  "endReading" CLOB,
  "totalConsumption" CLOB,
  "unit" CLOB,
  "department" CLOB,
  "notes" CLOB,
  "hasAlert" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_GasManagement_Records_id" ON "GasManagement_Records" ("id");
CREATE INDEX "ix_GasManagement_Records_createdAt" ON "GasManagement_Records" ("createdAt");
CREATE INDEX "ix_GasManagement_Records_date" ON "GasManagement_Records" ("date");

CREATE TABLE "WaterManagement_Records" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "date" VARCHAR2(4000),
  "monthYear" CLOB,
  "location" CLOB,
  "source" CLOB,
  "startReading" CLOB,
  "endReading" CLOB,
  "totalConsumption" CLOB,
  "unit" CLOB,
  "department" CLOB,
  "notes" CLOB,
  "hasAlert" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_WaterManagement_Records_id" ON "WaterManagement_Records" ("id");
CREATE INDEX "ix_WaterManagement_Records_createdAt" ON "WaterManagement_Records" ("createdAt");
CREATE INDEX "ix_WaterManagement_Records_date" ON "WaterManagement_Records" ("date");

CREATE TABLE "EmployeePPEMatrixByCode" (
  "112287.0" CLOB,
  "112287.0_1" CLOB,
  "112287.0_2" CLOB,
  "112425.0" CLOB
);


CREATE TABLE "WasteManagement_RegularWasteTyp" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_WasteManagement_RegularWasteTyp_id" ON "WasteManagement_RegularWasteTyp" ("id");
CREATE INDEX "ix_WasteManagement_RegularWasteTyp_createdAt" ON "WasteManagement_RegularWasteTyp" ("createdAt");

CREATE TABLE "safetyAlerts" (
  "id" VARCHAR2(4000),
  "alertNumber" CLOB,
  "sequentialNumber" CLOB,
  "incidentId" VARCHAR2(4000),
  "incidentType" CLOB,
  "incidentDate" CLOB,
  "incidentLocation" CLOB,
  "notificationNumber" CLOB,
  "who" CLOB,
  "description" CLOB,
  "facts" CLOB,
  "causes" CLOB,
  "lessonsLearned" CLOB,
  "preventiveMeasures" CLOB,
  "locationImage" CLOB,
  "causesImage" CLOB,
  "preparedBy" CLOB,
  "approvedBy" CLOB,
  "issueDate" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "approvedAt" CLOB
);

CREATE INDEX "ix_safetyAlerts_id" ON "safetyAlerts" ("id");
CREATE INDEX "ix_safetyAlerts_createdAt" ON "safetyAlerts" ("createdAt");
CREATE INDEX "ix_safetyAlerts_status" ON "safetyAlerts" ("status");

CREATE TABLE "IssueTracking" (
  "title" CLOB,
  "recordId" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "description" CLOB,
  "priority" CLOB,
  "category" CLOB,
  "module" CLOB,
  "pageUrl" CLOB,
  "userAgent" CLOB,
  "reportedBy" CLOB,
  "status" VARCHAR2(4000),
  "context" CLOB,
  "timeLog" CLOB,
  "solutions" CLOB,
  "comments" CLOB,
  "attachments" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB,
  "sourceErrorId" VARCHAR2(4000)
);

CREATE INDEX "ix_IssueTracking_id" ON "IssueTracking" ("id");
CREATE INDEX "ix_IssueTracking_createdAt" ON "IssueTracking" ("createdAt");
CREATE INDEX "ix_IssueTracking_status" ON "IssueTracking" ("status");

CREATE TABLE "FireEquipmentInspections" (
  "id" VARCHAR2(4000),
  "assetId" VARCHAR2(4000),
  "checkDate" CLOB,
  "inspector" CLOB,
  "status" VARCHAR2(4000),
  "gaugeReading" CLOB,
  "sealIntact" CLOB,
  "remarks" CLOB,
  "actions" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB,
  "hoseCondition" CLOB,
  "bodyCondition" CLOB,
  "weightOrLevel" CLOB,
  "attachments" CLOB,
  "submittedBy" CLOB,
  "submittedAt" CLOB,
  "approvedById" VARCHAR2(4000),
  "approvalStatus" CLOB,
  "approvedBy" CLOB,
  "approvedAt" CLOB,
  "reviewNotes" CLOB
);

CREATE INDEX "ix_FireEquipmentInspections_id" ON "FireEquipmentInspections" ("id");
CREATE INDEX "ix_FireEquipmentInspections_createdAt" ON "FireEquipmentInspections" ("createdAt");
CREATE INDEX "ix_FireEquipmentInspections_status" ON "FireEquipmentInspections" ("status");

CREATE TABLE "TrainingAnalysisData" (
  "notes" CLOB,
  "goals" CLOB,
  "recommendations" CLOB,
  "targets" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB,
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_TrainingAnalysisData_createdAt" ON "TrainingAnalysisData" ("createdAt");

CREATE TABLE "WasteManagement_RegularWasteRec" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "date" VARCHAR2(4000),
  "location" CLOB,
  "wasteType" CLOB,
  "quantity" CLOB,
  "unit" CLOB,
  "department" CLOB,
  "storageMethod" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_WasteManagement_RegularWasteRec_id" ON "WasteManagement_RegularWasteRec" ("id");
CREATE INDEX "ix_WasteManagement_RegularWasteRec_createdAt" ON "WasteManagement_RegularWasteRec" ("createdAt");
CREATE INDEX "ix_WasteManagement_RegularWasteRec_date" ON "WasteManagement_RegularWasteRec" ("date");

CREATE TABLE "WasteManagement_RegularWasteSal" (
  "id" VARCHAR2(4000),
  "transactionNumber" CLOB,
  "date" VARCHAR2(4000),
  "location" CLOB,
  "wasteType" CLOB,
  "quantity" CLOB,
  "unit" CLOB,
  "unitPrice" CLOB,
  "totalValue" CLOB,
  "buyerName" CLOB,
  "paymentMethod" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_WasteManagement_RegularWasteSal_id" ON "WasteManagement_RegularWasteSal" ("id");
CREATE INDEX "ix_WasteManagement_RegularWasteSal_createdAt" ON "WasteManagement_RegularWasteSal" ("createdAt");
CREATE INDEX "ix_WasteManagement_RegularWasteSal_date" ON "WasteManagement_RegularWasteSal" ("date");

CREATE TABLE "WasteManagement_HazardousWasteR" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "date" VARCHAR2(4000),
  "location" CLOB,
  "wasteType" CLOB,
  "quantity" CLOB,
  "unit" CLOB,
  "hazardClassification" CLOB,
  "storageMethod" CLOB,
  "transportCompany" CLOB,
  "treatmentFacility" CLOB,
  "transportDate" CLOB,
  "documents" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_WasteManagement_HazardousWasteR_id" ON "WasteManagement_HazardousWasteR" ("id");
CREATE INDEX "ix_WasteManagement_HazardousWasteR_createdAt" ON "WasteManagement_HazardousWasteR" ("createdAt");
CREATE INDEX "ix_WasteManagement_HazardousWasteR_date" ON "WasteManagement_HazardousWasteR" ("date");

CREATE TABLE "PTW_MAP_COORDINATES" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "latitude" CLOB,
  "longitude" CLOB,
  "zoom" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_PTW_MAP_COORDINATES_id" ON "PTW_MAP_COORDINATES" ("id");
CREATE INDEX "ix_PTW_MAP_COORDINATES_createdAt" ON "PTW_MAP_COORDINATES" ("createdAt");

CREATE TABLE "PTW_DEFAULT_COORDINATES" (
  "latitude" CLOB,
  "longitude" CLOB,
  "zoom" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB
);


CREATE TABLE "ClinicContractorVisits" (
  "id" VARCHAR2(4000),
  "personType" CLOB,
  "contractorName" CLOB,
  "contractorWorkerName" CLOB,
  "contractorPosition" CLOB,
  "externalName" CLOB,
  "factory" CLOB,
  "factoryName" CLOB,
  "workArea" CLOB,
  "visitDate" CLOB,
  "exitDate" CLOB,
  "reason" CLOB,
  "diagnosis" CLOB,
  "treatment" CLOB,
  "medicationsDispensed" CLOB,
  "medicationsDispensedQty" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB,
  "visitType" CLOB
);

CREATE INDEX "ix_ClinicContractorVisits_id" ON "ClinicContractorVisits" ("id");
CREATE INDEX "ix_ClinicContractorVisits_createdAt" ON "ClinicContractorVisits" ("createdAt");

CREATE TABLE "ClinicVisits" (
  "id" VARCHAR2(4000),
  "personType" CLOB,
  "employeeName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" CLOB,
  "contractorName" CLOB,
  "contractorWorkerName" CLOB,
  "externalName" CLOB,
  "employeePosition" CLOB,
  "contractorPosition" CLOB,
  "employeeDepartment" CLOB,
  "employeeLocation" CLOB,
  "workArea" CLOB,
  "visitDate" CLOB,
  "exitDate" CLOB,
  "reason" CLOB,
  "diagnosis" CLOB,
  "treatment" CLOB,
  "medications" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryName" CLOB,
  "factory" CLOB,
  "medicationsDispensed" CLOB,
  "medicationsDispensedQty" CLOB,
  "createdBy" CLOB,
  "updatedBy" CLOB,
  "visitType" CLOB
);

CREATE INDEX "ix_ClinicVisits_id" ON "ClinicVisits" ("id");
CREATE INDEX "ix_ClinicVisits_createdAt" ON "ClinicVisits" ("createdAt");

CREATE TABLE "ClinicVisitDeletionRequests" (
  "visitId" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "requestedById" VARCHAR2(4000),
  "requestedByName" CLOB,
  "visitData" CLOB,
  "requestedBy" CLOB,
  "status" VARCHAR2(4000),
  "visitDataJSON" CLOB,
  "requestedByJSON" CLOB,
  "createdAt" VARCHAR2(4000),
  "approvedById" VARCHAR2(4000),
  "approvedBy" CLOB,
  "approvedAt" CLOB,
  "approvedByJSON" CLOB,
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_ClinicVisitDeletionRequests_id" ON "ClinicVisitDeletionRequests" ("id");
CREATE INDEX "ix_ClinicVisitDeletionRequests_createdAt" ON "ClinicVisitDeletionRequests" ("createdAt");
CREATE INDEX "ix_ClinicVisitDeletionRequests_status" ON "ClinicVisitDeletionRequests" ("status");

CREATE TABLE "Chemical_Register" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "rmName" CLOB,
  "physicalShape" CLOB,
  "purposeOfUse" CLOB,
  "methodOfApplication" CLOB,
  "department" CLOB,
  "msdsArabicUrl" CLOB,
  "msdsEnglishUrl" CLOB,
  "localImport" CLOB,
  "manufacturer" CLOB,
  "agentInEgypt" CLOB,
  "containerType" CLOB,
  "containerDisposalMethod" CLOB,
  "hazardClass" CLOB,
  "hazardDescription" CLOB,
  "locationStore" CLOB,
  "qtyPerYear" CLOB,
  "isHazardous" CLOB,
  "nfpaHealth" CLOB,
  "nfpaFire" CLOB,
  "nfpaReactivity" CLOB,
  "nfpaSpecific" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "status" VARCHAR2(4000),
  "agentEgypt" CLOB,
  "qtyYear" CLOB,
  "nfpaDiamond" CLOB,
  "sds" CLOB
);

CREATE INDEX "ix_Chemical_Register_id" ON "Chemical_Register" ("id");
CREATE INDEX "ix_Chemical_Register_createdAt" ON "Chemical_Register" ("createdAt");
CREATE INDEX "ix_Chemical_Register_status" ON "Chemical_Register" ("status");

CREATE TABLE "PPE" (
  "id" VARCHAR2(4000),
  "receiptNumber" CLOB,
  "employeeName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" CLOB,
  "equipmentType" CLOB,
  "quantity" CLOB,
  "receiptDate" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "employeeDepartment" CLOB,
  "employeePosition" CLOB,
  "employeeBranch" CLOB,
  "employeeLocation" CLOB,
  "notes" CLOB,
  "userData" CLOB,
  "shoeSize" CLOB,
  "recordedBy" CLOB,
  "createdBy" CLOB,
  "createdByUser" CLOB,
  "column_22" CLOB,
  "column_23" CLOB,
  "column_24" CLOB,
  "column_25" CLOB,
  "column_26" CLOB
);

CREATE INDEX "ix_PPE_id" ON "PPE" ("id");
CREATE INDEX "ix_PPE_createdAt" ON "PPE" ("createdAt");
CREATE INDEX "ix_PPE_status" ON "PPE" ("status");

CREATE TABLE "PPE_Stock" (
  "itemId" VARCHAR2(4000),
  "itemCode" CLOB,
  "itemName" CLOB,
  "category" CLOB,
  "stock_IN" CLOB,
  "stock_OUT" CLOB,
  "balance" CLOB,
  "minThreshold" CLOB,
  "supplier" CLOB,
  "lastUpdate" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_PPE_Stock_createdAt" ON "PPE_Stock" ("createdAt");

CREATE TABLE "PPE_Transactions" (
  "id" VARCHAR2(4000),
  "itemId" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "action" CLOB,
  "quantity" CLOB,
  "issuedTo" CLOB,
  "remarks" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB,
  "itemName" CLOB,
  "relatedReceiptId" VARCHAR2(4000),
  "notes" CLOB,
  "source" CLOB,
  "createdBy" CLOB
);

CREATE INDEX "ix_PPE_Transactions_id" ON "PPE_Transactions" ("id");
CREATE INDEX "ix_PPE_Transactions_createdAt" ON "PPE_Transactions" ("createdAt");
CREATE INDEX "ix_PPE_Transactions_date" ON "PPE_Transactions" ("date");

CREATE TABLE "Training" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "trainingType" CLOB,
  "factoryName" CLOB,
  "locationName" CLOB,
  "trainer" CLOB,
  "date" VARCHAR2(4000),
  "factory" CLOB,
  "location" CLOB,
  "startTime" CLOB,
  "endTime" CLOB,
  "hours" CLOB,
  "startDate" CLOB,
  "participants" CLOB,
  "participantsCount" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "topics" CLOB,
  "expiryDate" CLOB
);

CREATE INDEX "ix_Training_id" ON "Training" ("id");
CREATE INDEX "ix_Training_createdAt" ON "Training" ("createdAt");
CREATE INDEX "ix_Training_date" ON "Training" ("date");
CREATE INDEX "ix_Training_status" ON "Training" ("status");

CREATE TABLE "TrainingAttendance" (
  "id" VARCHAR2(4000),
  "trainingId" VARCHAR2(4000),
  "trainingType" CLOB,
  "factoryName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeName" CLOB,
  "date" VARCHAR2(4000),
  "factory" CLOB,
  "position" CLOB,
  "department" CLOB,
  "topic" CLOB,
  "trainer" CLOB,
  "startTime" CLOB,
  "endTime" CLOB,
  "totalHours" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "expiryDate" CLOB,
  "column_19" CLOB,
  "column_20" CLOB,
  "column_21" CLOB,
  "column_22" CLOB,
  "column_23" CLOB,
  "column_24" CLOB,
  "column_25" CLOB,
  "column_26" CLOB
);

CREATE INDEX "ix_TrainingAttendance_id" ON "TrainingAttendance" ("id");
CREATE INDEX "ix_TrainingAttendance_createdAt" ON "TrainingAttendance" ("createdAt");
CREATE INDEX "ix_TrainingAttendance_date" ON "TrainingAttendance" ("date");

CREATE TABLE "ContractorTrainings" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" CLOB,
  "date" VARCHAR2(4000),
  "topic" CLOB,
  "trainer" CLOB,
  "traineesCount" CLOB,
  "fromTime" CLOB,
  "toTime" CLOB,
  "durationMinutes" CLOB,
  "totalHours" CLOB,
  "location" CLOB,
  "subLocation" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "locationId" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "trainingName" CLOB,
  "participants" CLOB,
  "topics" CLOB,
  "startTime" CLOB,
  "endTime" CLOB,
  "status" VARCHAR2(4000)
);

CREATE INDEX "ix_ContractorTrainings_id" ON "ContractorTrainings" ("id");
CREATE INDEX "ix_ContractorTrainings_createdAt" ON "ContractorTrainings" ("createdAt");
CREATE INDEX "ix_ContractorTrainings_date" ON "ContractorTrainings" ("date");
CREATE INDEX "ix_ContractorTrainings_status" ON "ContractorTrainings" ("status");

CREATE TABLE "ContractorDeletionRequests" (
  "id" VARCHAR2(4000),
  "requestType" CLOB,
  "entityId" VARCHAR2(4000),
  "reason" CLOB,
  "status" VARCHAR2(4000),
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "approvedAt" CLOB,
  "approvedBy" CLOB,
  "approvedByName" CLOB,
  "rejectedAt" CLOB,
  "rejectedBy" CLOB,
  "rejectedByName" CLOB,
  "rejectionReason" CLOB
);

CREATE INDEX "ix_ContractorDeletionRequests_id" ON "ContractorDeletionRequests" ("id");
CREATE INDEX "ix_ContractorDeletionRequests_createdAt" ON "ContractorDeletionRequests" ("createdAt");
CREATE INDEX "ix_ContractorDeletionRequests_status" ON "ContractorDeletionRequests" ("status");

CREATE TABLE "BackupLog" (
  "id" VARCHAR2(4000),
  "backupType" CLOB,
  "backupName" CLOB,
  "fileId" VARCHAR2(4000),
  "fileUrl" CLOB,
  "fileName" CLOB,
  "fileSize" CLOB,
  "fileSizeFormatted" CLOB,
  "sheetsCount" CLOB,
  "totalRecords" CLOB,
  "sheetsDetails" CLOB,
  "sourceSpreadsheetId" VARCHAR2(4000),
  "sourceSpreadsheetName" CLOB,
  "status" VARCHAR2(4000),
  "duration" CLOB,
  "errorMessage" CLOB,
  "restoredFromBackupId" VARCHAR2(4000),
  "restoredSheets" CLOB,
  "errors" CLOB,
  "createdBy" CLOB,
  "createdById" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_BackupLog_id" ON "BackupLog" ("id");
CREATE INDEX "ix_BackupLog_createdAt" ON "BackupLog" ("createdAt");
CREATE INDEX "ix_BackupLog_status" ON "BackupLog" ("status");

CREATE TABLE "BackupSettings" (
  "id" VARCHAR2(4000),
  "autoBackupEnabled" CLOB,
  "backupTimes" CLOB,
  "maxBackupFiles" CLOB,
  "backupFolderName" CLOB,
  "retentionDays" CLOB,
  "notifyOnBackup" CLOB,
  "notifyOnFailure" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB,
  "updatedById" VARCHAR2(4000)
);

CREATE INDEX "ix_BackupSettings_id" ON "BackupSettings" ("id");

CREATE TABLE "Blacklist_Register" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "factoryId" VARCHAR2(4000),
  "locationId" VARCHAR2(4000),
  "fullName" CLOB,
  "idNumber" CLOB,
  "factory" CLOB,
  "location" CLOB,
  "photo" CLOB,
  "job" CLOB,
  "department" CLOB,
  "banReason" CLOB,
  "banDate" CLOB,
  "bannedBy" CLOB,
  "editor" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdAt_1" CLOB,
  "updatedAt_1" CLOB,
  "contractor" CLOB
);

CREATE INDEX "ix_Blacklist_Register_id" ON "Blacklist_Register" ("id");
CREATE INDEX "ix_Blacklist_Register_createdAt" ON "Blacklist_Register" ("createdAt");

CREATE TABLE "IncidentsRegistry" (
  "id" VARCHAR2(4000),
  "sequentialNumber" CLOB,
  "incidentId" VARCHAR2(4000),
  "incidentLocation" CLOB,
  "incidentDate" CLOB,
  "incidentDay" CLOB,
  "incidentTime" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeName" CLOB,
  "incidentDetails" CLOB,
  "factory" CLOB,
  "shift" CLOB,
  "employeeJob" CLOB,
  "employeeDepartment" CLOB,
  "injuredPart" CLOB,
  "equipmentCause" CLOB,
  "leaveStartDate" CLOB,
  "returnToWorkDate" CLOB,
  "totalLeaveDays" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "incidentType" CLOB,
  "incidentDetailsBrief" CLOB,
  "employeeAffiliation" CLOB,
  "injuryDescription" CLOB,
  "losses" CLOB,
  "actionsTaken" CLOB
);

CREATE INDEX "ix_IncidentsRegistry_id" ON "IncidentsRegistry" ("id");
CREATE INDEX "ix_IncidentsRegistry_createdAt" ON "IncidentsRegistry" ("createdAt");
CREATE INDEX "ix_IncidentsRegistry_status" ON "IncidentsRegistry" ("status");

CREATE TABLE "ContractorEvaluationApprovalReq" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" CLOB,
  "evaluationData" CLOB,
  "status" VARCHAR2(4000),
  "createdBy" CLOB,
  "createdByName" CLOB,
  "createdAt" VARCHAR2(4000),
  "approvedAt" CLOB,
  "approvedBy" CLOB,
  "approvedByName" CLOB,
  "rejectedAt" CLOB,
  "rejectedBy" CLOB,
  "rejectedByName" CLOB,
  "rejectionReason" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB,
  "updatedByName" CLOB,
  "legacySource" CLOB
);

CREATE INDEX "ix_ContractorEvaluationApprovalReq_id" ON "ContractorEvaluationApprovalReq" ("id");
CREATE INDEX "ix_ContractorEvaluationApprovalReq_createdAt" ON "ContractorEvaluationApprovalReq" ("createdAt");
CREATE INDEX "ix_ContractorEvaluationApprovalReq_status" ON "ContractorEvaluationApprovalReq" ("status");

CREATE TABLE "ContractorApprovalRequests" (
  "id" VARCHAR2(4000),
  "requestType" CLOB,
  "companyName" CLOB,
  "serviceType" CLOB,
  "licenseNumber" CLOB,
  "createdByName" CLOB,
  "approvedByName" CLOB,
  "contactPerson" CLOB,
  "phone" CLOB,
  "email" VARCHAR2(4000),
  "notes" CLOB,
  "attachments" CLOB,
  "customFields" CLOB,
  "status" VARCHAR2(4000),
  "approvedAt" CLOB,
  "approvedBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedAt" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" CLOB,
  "evaluationData" CLOB,
  "rejectedAt" CLOB,
  "rejectedBy" CLOB,
  "rejectedByName" CLOB,
  "rejectionReason" CLOB,
  "contractorData" CLOB
);

CREATE INDEX "ix_ContractorApprovalRequests_id" ON "ContractorApprovalRequests" ("id");
CREATE INDEX "ix_ContractorApprovalRequests_email" ON "ContractorApprovalRequests" ("email");
CREATE INDEX "ix_ContractorApprovalRequests_createdAt" ON "ContractorApprovalRequests" ("createdAt");
CREATE INDEX "ix_ContractorApprovalRequests_status" ON "ContractorApprovalRequests" ("status");

CREATE TABLE "ApprovedContractors" (
  "id" VARCHAR2(4000),
  "code" CLOB,
  "isoCode" CLOB,
  "companyName" CLOB,
  "entityType" CLOB,
  "serviceType" CLOB,
  "licenseNumber" CLOB,
  "contractorId" VARCHAR2(4000),
  "approvalDate" CLOB,
  "expiryDate" CLOB,
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "safetyReviewer" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "approvedBy" CLOB,
  "isActive" CLOB,
  "column_18" CLOB,
  "column_19" CLOB,
  "column_20" CLOB,
  "column_21" CLOB,
  "column_22" CLOB,
  "column_23" CLOB,
  "column_24" CLOB,
  "column_25" CLOB,
  "column_26" CLOB
);

CREATE INDEX "ix_ApprovedContractors_id" ON "ApprovedContractors" ("id");
CREATE INDEX "ix_ApprovedContractors_createdAt" ON "ApprovedContractors" ("createdAt");
CREATE INDEX "ix_ApprovedContractors_status" ON "ApprovedContractors" ("status");

CREATE TABLE "ClinicSupplyRequests" (
  "id" VARCHAR2(4000),
  "type" CLOB,
  "itemName" CLOB,
  "requestedById" VARCHAR2(4000),
  "requestedByName" CLOB,
  "quantity" CLOB,
  "unit" CLOB,
  "notes" CLOB,
  "priority" CLOB,
  "status" VARCHAR2(4000),
  "requestedBy" CLOB,
  "requestDate" CLOB,
  "requestedByJSON" CLOB,
  "rejectedBy" CLOB,
  "rejectedAt" CLOB,
  "rejectionReason" CLOB,
  "rejectedByJSON" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" CLOB,
  "medicationId" VARCHAR2(4000),
  "currentBalanceAtRequest" CLOB,
  "originalStockAtRequest" CLOB,
  "stockStatusAtRequest" CLOB,
  "medicationExpiryDate" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_ClinicSupplyRequests_id" ON "ClinicSupplyRequests" ("id");
CREATE INDEX "ix_ClinicSupplyRequests_createdAt" ON "ClinicSupplyRequests" ("createdAt");
CREATE INDEX "ix_ClinicSupplyRequests_status" ON "ClinicSupplyRequests" ("status");

CREATE TABLE "Company_Settings" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "secondaryName" CLOB,
  "nameFontSize" CLOB,
  "secondaryNameFontSize" CLOB,
  "secondaryNameColor" CLOB,
  "formVersion" CLOB,
  "address" CLOB,
  "phone" CLOB,
  "email" VARCHAR2(4000),
  "logo" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "postLoginItems" CLOB,
  "clinicMonthlyVisitsAlertThreshold" CLOB,
  "clinicVisitTypes" CLOB,
  "profileTeamsUrl" CLOB,
  "profileWhatsAppUrl" CLOB,
  "ppeEligibilityMonths" CLOB,
  "ppeEligibilityDays" CLOB,
  "ppeEligibilityRules" CLOB,
  "helpContent" CLOB
);

CREATE INDEX "ix_Company_Settings_id" ON "Company_Settings" ("id");
CREATE INDEX "ix_Company_Settings_email" ON "Company_Settings" ("email");
CREATE INDEX "ix_Company_Settings_createdAt" ON "Company_Settings" ("createdAt");

CREATE TABLE "MedicationDeletionRequests" (
  "medicationId" VARCHAR2(4000),
  "requestedById" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "medicationData" CLOB,
  "requestedBy" CLOB,
  "reason" CLOB,
  "status" VARCHAR2(4000),
  "medicationDataJSON" CLOB,
  "requestedByJSON" CLOB,
  "approvedAt" CLOB,
  "approvedByJSON" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" CLOB,
  "updatedAt_2" CLOB
);

CREATE INDEX "ix_MedicationDeletionRequests_id" ON "MedicationDeletionRequests" ("id");
CREATE INDEX "ix_MedicationDeletionRequests_createdAt" ON "MedicationDeletionRequests" ("createdAt");
CREATE INDEX "ix_MedicationDeletionRequests_status" ON "MedicationDeletionRequests" ("status");

CREATE TABLE "Form_Sites" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "description" CLOB,
  "isActive" CLOB,
  "sortOrder" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_Form_Sites_id" ON "Form_Sites" ("id");
CREATE INDEX "ix_Form_Sites_createdAt" ON "Form_Sites" ("createdAt");

CREATE TABLE "Form_Places" (
  "id" VARCHAR2(4000),
  "siteId" VARCHAR2(4000),
  "siteName" CLOB,
  "name" CLOB,
  "description" CLOB,
  "isActive" CLOB,
  "sortOrder" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_Form_Places_id" ON "Form_Places" ("id");
CREATE INDEX "ix_Form_Places_createdAt" ON "Form_Places" ("createdAt");

CREATE TABLE "Form_Departments" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "description" CLOB,
  "isActive" CLOB,
  "sortOrder" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_Form_Departments_id" ON "Form_Departments" ("id");
CREATE INDEX "ix_Form_Departments_createdAt" ON "Form_Departments" ("createdAt");

CREATE TABLE "Form_SafetyTeam" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "position" CLOB,
  "phone" CLOB,
  "email" VARCHAR2(4000),
  "isActive" CLOB,
  "sortOrder" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_Form_SafetyTeam_id" ON "Form_SafetyTeam" ("id");
CREATE INDEX "ix_Form_SafetyTeam_email" ON "Form_SafetyTeam" ("email");
CREATE INDEX "ix_Form_SafetyTeam_createdAt" ON "Form_SafetyTeam" ("createdAt");

CREATE TABLE "Incidents" (
  "id" VARCHAR2(4000),
  "notificationId" VARCHAR2(4000),
  "notificationNumber" CLOB,
  "title" CLOB,
  "siteId" VARCHAR2(4000),
  "siteName" CLOB,
  "sublocationId" VARCHAR2(4000),
  "sublocationName" CLOB,
  "incidentType" CLOB,
  "employeeCode" VARCHAR2(4000),
  "location" CLOB,
  "sublocation" CLOB,
  "date" VARCHAR2(4000),
  "department" CLOB,
  "description" CLOB,
  "injuries" CLOB,
  "losses" CLOB,
  "initialActions" CLOB,
  "reportedBy" CLOB,
  "status" VARCHAR2(4000),
  "severity" CLOB,
  "rootCause" CLOB,
  "correctiveAction" CLOB,
  "preventiveAction" CLOB,
  "attachments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "createdBy_1" CLOB,
  "employeeName" CLOB,
  "employeeNumber" CLOB,
  "affiliation" CLOB,
  "employeeJob" CLOB,
  "employeeDepartment" CLOB,
  "injuryDescription" CLOB,
  "actionsTaken" CLOB,
  "investigation" CLOB,
  "contractorName" CLOB,
  "isoCode" CLOB,
  "actionPlan" CLOB,
  "affectedType" CLOB,
  "affectedCode" CLOB,
  "affectedName" CLOB,
  "affectedJobTitle" CLOB,
  "affectedDepartment" CLOB,
  "affectedContact" CLOB,
  "image" CLOB,
  "closureDate" CLOB,
  "actionOwner" CLOB,
  "requiresApproval" CLOB,
  "approvedBy" CLOB,
  "userData" CLOB,
  "approvedAt" CLOB,
  "employeeAffectedCode" CLOB,
  "injuredPart" CLOB,
  "equipmentCause" CLOB,
  "rejectedBy" CLOB,
  "rejectedAt" CLOB,
  "rejectionReason" CLOB,
  "reporterName" CLOB,
  "reporterCode" CLOB,
  "actions" CLOB
);

CREATE INDEX "ix_Incidents_id" ON "Incidents" ("id");
CREATE INDEX "ix_Incidents_createdAt" ON "Incidents" ("createdAt");
CREATE INDEX "ix_Incidents_date" ON "Incidents" ("date");
CREATE INDEX "ix_Incidents_status" ON "Incidents" ("status");

CREATE TABLE "NearMiss" (
  "id" VARCHAR2(4000),
  "type" CLOB,
  "date" VARCHAR2(4000),
  "observerName" CLOB,
  "phone" CLOB,
  "location" CLOB,
  "department" CLOB,
  "description" CLOB,
  "correctiveProposed" CLOB,
  "correctiveDescription" CLOB,
  "attachments" CLOB,
  "status" VARCHAR2(4000),
  "reportedBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "isoCode" CLOB,
  "siteName" CLOB,
  "severity" CLOB,
  "subLocation" CLOB,
  "potentialConsequences" CLOB,
  "isAnonymous" CLOB,
  "gpsLocation" CLOB,
  "gpsMapLink" CLOB
);

CREATE INDEX "ix_NearMiss_id" ON "NearMiss" ("id");
CREATE INDEX "ix_NearMiss_createdAt" ON "NearMiss" ("createdAt");
CREATE INDEX "ix_NearMiss_date" ON "NearMiss" ("date");
CREATE INDEX "ix_NearMiss_status" ON "NearMiss" ("status");

CREATE TABLE "Medications" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "type" CLOB,
  "createdById" VARCHAR2(4000),
  "usage" CLOB,
  "purchaseDate" CLOB,
  "expiryDate" CLOB,
  "quantityAdded" CLOB,
  "remainingQuantity" CLOB,
  "location" CLOB,
  "notes" CLOB,
  "status" VARCHAR2(4000),
  "daysRemaining" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB,
  "column_18" CLOB,
  "column_19" CLOB,
  "column_20" CLOB,
  "column_21" CLOB,
  "column_22" CLOB,
  "column_23" CLOB,
  "column_24" CLOB,
  "column_25" CLOB,
  "column_26" CLOB
);

CREATE INDEX "ix_Medications_id" ON "Medications" ("id");
CREATE INDEX "ix_Medications_createdAt" ON "Medications" ("createdAt");
CREATE INDEX "ix_Medications_status" ON "Medications" ("status");

CREATE TABLE "SickLeave" (
  "id" VARCHAR2(4000),
  "personType" CLOB,
  "employeeName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" CLOB,
  "createdById" VARCHAR2(4000),
  "employeePosition" CLOB,
  "employeeDepartment" CLOB,
  "reason" CLOB,
  "medicalNotes" CLOB,
  "treatingDoctor" CLOB,
  "startDate" CLOB,
  "endDate" CLOB,
  "daysCount" CLOB,
  "status" VARCHAR2(4000),
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "linkedRegistryId" VARCHAR2(4000),
  "sourceType" CLOB,
  "updatedBy" CLOB
);

CREATE INDEX "ix_SickLeave_id" ON "SickLeave" ("id");
CREATE INDEX "ix_SickLeave_createdAt" ON "SickLeave" ("createdAt");
CREATE INDEX "ix_SickLeave_status" ON "SickLeave" ("status");

CREATE TABLE "Injuries" (
  "id" VARCHAR2(4000),
  "personType" CLOB,
  "employeeName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" CLOB,
  "injuryType" CLOB,
  "createdById" VARCHAR2(4000),
  "employeeDepartment" CLOB,
  "department" CLOB,
  "injuryDate" CLOB,
  "injuryLocation" CLOB,
  "injuryDescription" CLOB,
  "actionsTaken" CLOB,
  "treatment" CLOB,
  "status" VARCHAR2(4000),
  "attachments" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB,
  "employeePosition" CLOB,
  "factory" CLOB,
  "factoryName" CLOB,
  "subLocation" CLOB,
  "subLocationName" CLOB,
  "injuryBodyPart" CLOB,
  "contractorName" CLOB,
  "personName" CLOB,
  "contractorPosition" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_Injuries_id" ON "Injuries" ("id");
CREATE INDEX "ix_Injuries_createdAt" ON "Injuries" ("createdAt");
CREATE INDEX "ix_Injuries_status" ON "Injuries" ("status");

CREATE TABLE "Violations" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "employeeId" VARCHAR2(4000),
  "employeeName" CLOB,
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" CLOB,
  "contractorId" VARCHAR2(4000),
  "contractorName" CLOB,
  "violationTypeId" VARCHAR2(4000),
  "violationType" CLOB,
  "employeePosition" CLOB,
  "employeeDepartment" CLOB,
  "contractorWorker" CLOB,
  "contractorPosition" CLOB,
  "contractorDepartment" CLOB,
  "violationDate" CLOB,
  "violationTime" CLOB,
  "violationLocation" CLOB,
  "violationPlace" CLOB,
  "severity" CLOB,
  "actionTaken" CLOB,
  "status" VARCHAR2(4000),
  "photo" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "personType" CLOB,
  "violationLocationId" VARCHAR2(4000),
  "violationPlaceId" VARCHAR2(4000),
  "violationDetails" CLOB,
  "fineAmount" CLOB,
  "violationSequenceInMonth" CLOB,
  "userData" CLOB,
  "attachments" CLOB
);

CREATE INDEX "ix_Violations_id" ON "Violations" ("id");
CREATE INDEX "ix_Violations_createdAt" ON "Violations" ("createdAt");
CREATE INDEX "ix_Violations_status" ON "Violations" ("status");

CREATE TABLE "DailyObservations" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "siteId" VARCHAR2(4000),
  "siteName" CLOB,
  "placeId" VARCHAR2(4000),
  "locationName" CLOB,
  "observationType" CLOB,
  "observerName" CLOB,
  "date" VARCHAR2(4000),
  "shift" CLOB,
  "details" CLOB,
  "correctiveAction" CLOB,
  "responsibleDepartment" CLOB,
  "riskLevel" CLOB,
  "expectedCompletionDate" CLOB,
  "status" VARCHAR2(4000),
  "overdays" CLOB,
  "timestamp" CLOB,
  "reviewedBy" CLOB,
  "remarks" CLOB,
  "attachments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "timeLog" CLOB,
  "updates" CLOB,
  "comments" CLOB,
  "workflowStage" CLOB,
  "specialistReviewedBy" CLOB,
  "specialistReviewedAt" CLOB,
  "specialistComments" CLOB,
  "managerApprovedBy" CLOB,
  "managerApprovedAt" CLOB,
  "managerComments" CLOB,
  "departmentActionBy" CLOB,
  "departmentActionAt" CLOB,
  "rejectionReason" CLOB,
  "assignedToName" CLOB,
  "assignedToEmail" CLOB,
  "afterExecutionImages" CLOB,
  "updatedBy" CLOB,
  "submittedBy" CLOB,
  "submittedByEmail" CLOB,
  "submittedAt" CLOB,
  "subCategory" CLOB,
  "gpsCoordinates" CLOB,
  "gpsAccuracy" CLOB,
  "mapsUrl" CLOB
);

CREATE INDEX "ix_DailyObservations_id" ON "DailyObservations" ("id");
CREATE INDEX "ix_DailyObservations_createdAt" ON "DailyObservations" ("createdAt");
CREATE INDEX "ix_DailyObservations_date" ON "DailyObservations" ("date");
CREATE INDEX "ix_DailyObservations_status" ON "DailyObservations" ("status");

CREATE TABLE "ISODocuments" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "name" CLOB,
  "type" CLOB,
  "version" CLOB,
  "department" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "issueDate" CLOB,
  "revisionDate" CLOB
);

CREATE INDEX "ix_ISODocuments_id" ON "ISODocuments" ("id");
CREATE INDEX "ix_ISODocuments_createdAt" ON "ISODocuments" ("createdAt");

CREATE TABLE "ISOProcedures" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "name" CLOB,
  "department" CLOB,
  "version" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ISOProcedures_id" ON "ISOProcedures" ("id");
CREATE INDEX "ix_ISOProcedures_createdAt" ON "ISOProcedures" ("createdAt");

CREATE TABLE "ISOForms" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "name" CLOB,
  "type" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "version" CLOB,
  "issueDate" CLOB,
  "revisionDate" CLOB
);

CREATE INDEX "ix_ISOForms_id" ON "ISOForms" ("id");
CREATE INDEX "ix_ISOForms_createdAt" ON "ISOForms" ("createdAt");

CREATE TABLE "SOPJHA" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "type" CLOB,
  "title" CLOB,
  "department" CLOB,
  "issueDate" CLOB,
  "status" VARCHAR2(4000),
  "version" CLOB,
  "procedures" CLOB,
  "hazards" CLOB,
  "requiredPPE" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SOPJHA_id" ON "SOPJHA" ("id");
CREATE INDEX "ix_SOPJHA_createdAt" ON "SOPJHA" ("createdAt");
CREATE INDEX "ix_SOPJHA_status" ON "SOPJHA" ("status");

CREATE TABLE "RiskAssessments" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "activity" CLOB,
  "location" CLOB,
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "riskLevel" CLOB,
  "correctiveActions" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_RiskAssessments_id" ON "RiskAssessments" ("id");
CREATE INDEX "ix_RiskAssessments_createdAt" ON "RiskAssessments" ("createdAt");
CREATE INDEX "ix_RiskAssessments_date" ON "RiskAssessments" ("date");
CREATE INDEX "ix_RiskAssessments_status" ON "RiskAssessments" ("status");

CREATE TABLE "LegalDocuments" (
  "id" VARCHAR2(4000),
  "isoCode" CLOB,
  "documentName" CLOB,
  "documentType" CLOB,
  "documentNumber" CLOB,
  "issuedBy" CLOB,
  "issueDate" CLOB,
  "expiryDate" CLOB,
  "alertDays" CLOB,
  "status" VARCHAR2(4000),
  "description" CLOB,
  "documentLink" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "column_15" CLOB
);

CREATE INDEX "ix_LegalDocuments_id" ON "LegalDocuments" ("id");
CREATE INDEX "ix_LegalDocuments_createdAt" ON "LegalDocuments" ("createdAt");
CREATE INDEX "ix_LegalDocuments_status" ON "LegalDocuments" ("status");

CREATE TABLE "HSEAudits" (
  "id" VARCHAR2(4000),
  "type" CLOB,
  "date" VARCHAR2(4000),
  "auditor" CLOB,
  "status" VARCHAR2(4000),
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_HSEAudits_id" ON "HSEAudits" ("id");
CREATE INDEX "ix_HSEAudits_createdAt" ON "HSEAudits" ("createdAt");
CREATE INDEX "ix_HSEAudits_date" ON "HSEAudits" ("date");
CREATE INDEX "ix_HSEAudits_status" ON "HSEAudits" ("status");

CREATE TABLE "HSENonConformities" (
  "id" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "description" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_HSENonConformities_id" ON "HSENonConformities" ("id");
CREATE INDEX "ix_HSENonConformities_createdAt" ON "HSENonConformities" ("createdAt");
CREATE INDEX "ix_HSENonConformities_date" ON "HSENonConformities" ("date");
CREATE INDEX "ix_HSENonConformities_status" ON "HSENonConformities" ("status");

CREATE TABLE "HSECorrectiveActions" (
  "id" VARCHAR2(4000),
  "description" CLOB,
  "responsible" CLOB,
  "dueDate" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_HSECorrectiveActions_id" ON "HSECorrectiveActions" ("id");
CREATE INDEX "ix_HSECorrectiveActions_createdAt" ON "HSECorrectiveActions" ("createdAt");
CREATE INDEX "ix_HSECorrectiveActions_status" ON "HSECorrectiveActions" ("status");

CREATE TABLE "HSEObjectives" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "description" CLOB,
  "dueDate" CLOB,
  "responsible" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_HSEObjectives_id" ON "HSEObjectives" ("id");
CREATE INDEX "ix_HSEObjectives_createdAt" ON "HSEObjectives" ("createdAt");
CREATE INDEX "ix_HSEObjectives_status" ON "HSEObjectives" ("status");

CREATE TABLE "HSERiskAssessments" (
  "id" VARCHAR2(4000),
  "activity" CLOB,
  "location" CLOB,
  "date" VARCHAR2(4000),
  "riskLevel" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_HSERiskAssessments_id" ON "HSERiskAssessments" ("id");
CREATE INDEX "ix_HSERiskAssessments_createdAt" ON "HSERiskAssessments" ("createdAt");
CREATE INDEX "ix_HSERiskAssessments_date" ON "HSERiskAssessments" ("date");
CREATE INDEX "ix_HSERiskAssessments_status" ON "HSERiskAssessments" ("status");

CREATE TABLE "EnvironmentalAspects" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "description" CLOB,
  "impact" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_EnvironmentalAspects_id" ON "EnvironmentalAspects" ("id");
CREATE INDEX "ix_EnvironmentalAspects_createdAt" ON "EnvironmentalAspects" ("createdAt");

CREATE TABLE "EnvironmentalMonitoring" (
  "id" VARCHAR2(4000),
  "aspect" CLOB,
  "date" VARCHAR2(4000),
  "value" CLOB,
  "unit" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_EnvironmentalMonitoring_id" ON "EnvironmentalMonitoring" ("id");
CREATE INDEX "ix_EnvironmentalMonitoring_createdAt" ON "EnvironmentalMonitoring" ("createdAt");
CREATE INDEX "ix_EnvironmentalMonitoring_date" ON "EnvironmentalMonitoring" ("date");
CREATE INDEX "ix_EnvironmentalMonitoring_status" ON "EnvironmentalMonitoring" ("status");

CREATE TABLE "Sustainability" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "description" CLOB,
  "startDate" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_Sustainability_id" ON "Sustainability" ("id");
CREATE INDEX "ix_Sustainability_createdAt" ON "Sustainability" ("createdAt");
CREATE INDEX "ix_Sustainability_status" ON "Sustainability" ("status");

CREATE TABLE "CarbonFootprint" (
  "id" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "source" CLOB,
  "co2Equivalent" CLOB,
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_CarbonFootprint_id" ON "CarbonFootprint" ("id");
CREATE INDEX "ix_CarbonFootprint_createdAt" ON "CarbonFootprint" ("createdAt");
CREATE INDEX "ix_CarbonFootprint_date" ON "CarbonFootprint" ("date");

CREATE TABLE "PeriodicInspections" (
  "id" VARCHAR2(4000),
  "inspectionType" CLOB,
  "location" CLOB,
  "date" VARCHAR2(4000),
  "inspector" CLOB,
  "status" VARCHAR2(4000),
  "findings" CLOB,
  "recommendations" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "templateId" VARCHAR2(4000),
  "assetCode" CLOB,
  "factoryId" VARCHAR2(4000),
  "factoryName" CLOB,
  "subLocationId" VARCHAR2(4000),
  "subLocationName" CLOB,
  "inspectionNumber" CLOB,
  "category" CLOB,
  "inspectionDate" CLOB,
  "result" CLOB,
  "factory" CLOB,
  "subLocation" CLOB,
  "notes" CLOB,
  "correctiveActions" CLOB,
  "checklistResults" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_PeriodicInspections_id" ON "PeriodicInspections" ("id");
CREATE INDEX "ix_PeriodicInspections_createdAt" ON "PeriodicInspections" ("createdAt");
CREATE INDEX "ix_PeriodicInspections_date" ON "PeriodicInspections" ("date");
CREATE INDEX "ix_PeriodicInspections_status" ON "PeriodicInspections" ("status");

CREATE TABLE "PeriodicInspectionCategories" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "description" CLOB,
  "frequency" CLOB,
  "isDefault" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionCategories_id" ON "PeriodicInspectionCategories" ("id");
CREATE INDEX "ix_PeriodicInspectionCategories_createdAt" ON "PeriodicInspectionCategories" ("createdAt");

CREATE TABLE "PeriodicInspectionChecklists" (
  "id" VARCHAR2(4000),
  "categoryId" VARCHAR2(4000),
  "categoryName" CLOB,
  "items" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionChecklists_id" ON "PeriodicInspectionChecklists" ("id");
CREATE INDEX "ix_PeriodicInspectionChecklists_createdAt" ON "PeriodicInspectionChecklists" ("createdAt");

CREATE TABLE "PeriodicInspectionSchedules" (
  "id" VARCHAR2(4000),
  "categoryId" VARCHAR2(4000),
  "categoryName" CLOB,
  "location" CLOB,
  "scheduledDate" CLOB,
  "status" VARCHAR2(4000),
  "assignedTo" CLOB,
  "frequency" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionSchedules_id" ON "PeriodicInspectionSchedules" ("id");
CREATE INDEX "ix_PeriodicInspectionSchedules_createdAt" ON "PeriodicInspectionSchedules" ("createdAt");
CREATE INDEX "ix_PeriodicInspectionSchedules_status" ON "PeriodicInspectionSchedules" ("status");

CREATE TABLE "PeriodicInspectionRecords" (
  "id" VARCHAR2(4000),
  "categoryId" VARCHAR2(4000),
  "categoryName" CLOB,
  "assetCode" CLOB,
  "internalCode" CLOB,
  "correctiveActionId" VARCHAR2(4000),
  "scheduleId" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "responsible" CLOB,
  "supervisor" CLOB,
  "location" CLOB,
  "notes" CLOB,
  "result" CLOB,
  "status" VARCHAR2(4000),
  "correctiveActionSummary" CLOB,
  "attachments" CLOB,
  "checklistResults" CLOB,
  "nextDueDate" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionRecords_id" ON "PeriodicInspectionRecords" ("id");
CREATE INDEX "ix_PeriodicInspectionRecords_createdAt" ON "PeriodicInspectionRecords" ("createdAt");
CREATE INDEX "ix_PeriodicInspectionRecords_date" ON "PeriodicInspectionRecords" ("date");
CREATE INDEX "ix_PeriodicInspectionRecords_status" ON "PeriodicInspectionRecords" ("status");

CREATE TABLE "SafetyBudget" (
  "id" VARCHAR2(4000),
  "category" CLOB,
  "description" CLOB,
  "amount" CLOB,
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "approvedBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyBudget_id" ON "SafetyBudget" ("id");
CREATE INDEX "ix_SafetyBudget_createdAt" ON "SafetyBudget" ("createdAt");
CREATE INDEX "ix_SafetyBudget_date" ON "SafetyBudget" ("date");
CREATE INDEX "ix_SafetyBudget_status" ON "SafetyBudget" ("status");

CREATE TABLE "SafetyBudgets" (
  "id" VARCHAR2(4000),
  "year" CLOB,
  "budgetAmount" CLOB,
  "allocatedAmount" CLOB,
  "spentAmount" CLOB,
  "remainingAmount" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyBudgets_id" ON "SafetyBudgets" ("id");
CREATE INDEX "ix_SafetyBudgets_createdAt" ON "SafetyBudgets" ("createdAt");
CREATE INDEX "ix_SafetyBudgets_status" ON "SafetyBudgets" ("status");

CREATE TABLE "SafetyBudgetTransactions" (
  "id" VARCHAR2(4000),
  "budgetId" VARCHAR2(4000),
  "category" CLOB,
  "description" CLOB,
  "amount" CLOB,
  "type" CLOB,
  "date" VARCHAR2(4000),
  "approvedBy" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "invoiceNumber" CLOB,
  "vendor" CLOB,
  "currency" CLOB,
  "attachments" CLOB
);

CREATE INDEX "ix_SafetyBudgetTransactions_id" ON "SafetyBudgetTransactions" ("id");
CREATE INDEX "ix_SafetyBudgetTransactions_createdAt" ON "SafetyBudgetTransactions" ("createdAt");
CREATE INDEX "ix_SafetyBudgetTransactions_date" ON "SafetyBudgetTransactions" ("date");
CREATE INDEX "ix_SafetyBudgetTransactions_status" ON "SafetyBudgetTransactions" ("status");

CREATE TABLE "SafetyPerformanceKPIs" (
  "id" VARCHAR2(4000),
  "kpiName" CLOB,
  "target" CLOB,
  "actual" CLOB,
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "recordType" CLOB,
  "year" CLOB,
  "month" CLOB,
  "hoursWorked" CLOB,
  "updatedBy" CLOB,
  "neboshStatus" CLOB
);

CREATE INDEX "ix_SafetyPerformanceKPIs_id" ON "SafetyPerformanceKPIs" ("id");
CREATE INDEX "ix_SafetyPerformanceKPIs_createdAt" ON "SafetyPerformanceKPIs" ("createdAt");
CREATE INDEX "ix_SafetyPerformanceKPIs_date" ON "SafetyPerformanceKPIs" ("date");
CREATE INDEX "ix_SafetyPerformanceKPIs_status" ON "SafetyPerformanceKPIs" ("status");

CREATE TABLE "ActionTrackingRegister" (
  "id" VARCHAR2(4000),
  "serialNumber" CLOB,
  "typeOfIssue" CLOB,
  "observerName" CLOB,
  "sourceId" VARCHAR2(4000),
  "issueDate" CLOB,
  "observationClassification" CLOB,
  "observationIssueHazard" CLOB,
  "correctivePreventiveAction" CLOB,
  "rootCause" CLOB,
  "department" CLOB,
  "location" CLOB,
  "riskRating" CLOB,
  "responsible" CLOB,
  "originalTargetDate" CLOB,
  "status" VARCHAR2(4000),
  "shift" CLOB,
  "sourceModule" CLOB,
  "sourceData" CLOB,
  "timeLog" CLOB,
  "updates" CLOB,
  "comments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedAt_1" CLOB,
  "createdBy_1" CLOB,
  "updatedBy" CLOB,
  "title" CLOB,
  "actionType" CLOB,
  "description" CLOB,
  "hazardDescription" CLOB,
  "site" CLOB,
  "responsibleDepartment" CLOB,
  "assignedTo" CLOB,
  "priority" CLOB,
  "dueDate" CLOB
);

CREATE INDEX "ix_ActionTrackingRegister_id" ON "ActionTrackingRegister" ("id");
CREATE INDEX "ix_ActionTrackingRegister_createdAt" ON "ActionTrackingRegister" ("createdAt");
CREATE INDEX "ix_ActionTrackingRegister_status" ON "ActionTrackingRegister" ("status");

CREATE TABLE "Budget" (
  "id" VARCHAR2(4000),
  "category" CLOB,
  "description" CLOB,
  "amount" CLOB,
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_Budget_id" ON "Budget" ("id");
CREATE INDEX "ix_Budget_createdAt" ON "Budget" ("createdAt");
CREATE INDEX "ix_Budget_date" ON "Budget" ("date");
CREATE INDEX "ix_Budget_status" ON "Budget" ("status");

CREATE TABLE "KPIs" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "target" CLOB,
  "actual" CLOB,
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_KPIs_id" ON "KPIs" ("id");
CREATE INDEX "ix_KPIs_createdAt" ON "KPIs" ("createdAt");
CREATE INDEX "ix_KPIs_date" ON "KPIs" ("date");
CREATE INDEX "ix_KPIs_status" ON "KPIs" ("status");

CREATE TABLE "EmergencyAlerts" (
  "id" VARCHAR2(4000),
  "title" CLOB,
  "description" CLOB,
  "severity" CLOB,
  "status" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "timeline" CLOB,
  "assignedTeams" CLOB,
  "channels" CLOB,
  "impactArea" CLOB,
  "responseInstructions" CLOB,
  "requiresEvacuation" CLOB,
  "autoEscalateMinutes" CLOB,
  "resolvedAt" CLOB,
  "resolvedBy" CLOB,
  "acknowledgedAt" CLOB,
  "acknowledgedBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "createdAt_1" CLOB,
  "createdBy_1" CLOB,
  "updatedAt_1" CLOB
);

CREATE INDEX "ix_EmergencyAlerts_id" ON "EmergencyAlerts" ("id");
CREATE INDEX "ix_EmergencyAlerts_createdAt" ON "EmergencyAlerts" ("createdAt");
CREATE INDEX "ix_EmergencyAlerts_date" ON "EmergencyAlerts" ("date");
CREATE INDEX "ix_EmergencyAlerts_status" ON "EmergencyAlerts" ("status");

CREATE TABLE "EmergencyPlans" (
  "id" VARCHAR2(4000),
  "name" CLOB,
  "type" CLOB,
  "description" CLOB,
  "procedures" CLOB,
  "responsibleTeam" CLOB,
  "equipment" CLOB,
  "contacts" CLOB,
  "status" VARCHAR2(4000),
  "lastReview" CLOB,
  "nextReview" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_EmergencyPlans_id" ON "EmergencyPlans" ("id");
CREATE INDEX "ix_EmergencyPlans_createdAt" ON "EmergencyPlans" ("createdAt");
CREATE INDEX "ix_EmergencyPlans_status" ON "EmergencyPlans" ("status");

-- EmployeeTrainingMatrix: 1504 cols > 1000 — JSON row storage
CREATE TABLE "EmployeeTrainingMatrix" (
  "id" VARCHAR2(4000),
  "_rowJson" CLOB
);
CREATE INDEX "ix_EmployeeTrainingMatrix_id" ON "EmployeeTrainingMatrix" ("id");

CREATE TABLE "FireEquipmentAssets" (
  "id" VARCHAR2(4000),
  "number" CLOB,
  "type" CLOB,
  "qrCodeData" CLOB,
  "siteNumber" CLOB,
  "subLocationName" CLOB,
  "factoryName" CLOB,
  "serialNumber" CLOB,
  "location" CLOB,
  "manufacturer" CLOB,
  "model" CLOB,
  "capacity" CLOB,
  "installationDate" CLOB,
  "lastServiceDate" CLOB,
  "status" VARCHAR2(4000),
  "responsible" CLOB,
  "notes" CLOB,
  "manufacturingYear" CLOB,
  "productionDate" CLOB,
  "installationMethod" CLOB,
  "subLocation" CLOB,
  "factory" CLOB,
  "capacityKg" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "code" CLOB,
  "isoCode" CLOB,
  "companyName" CLOB,
  "entityType" CLOB,
  "serviceType" CLOB,
  "licenseNumber" CLOB,
  "contractorId" VARCHAR2(4000),
  "approvalDate" CLOB,
  "expiryDate" CLOB,
  "safetyReviewer" CLOB,
  "approvedBy" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_FireEquipmentAssets_id" ON "FireEquipmentAssets" ("id");
CREATE INDEX "ix_FireEquipmentAssets_createdAt" ON "FireEquipmentAssets" ("createdAt");
CREATE INDEX "ix_FireEquipmentAssets_status" ON "FireEquipmentAssets" ("status");

CREATE TABLE "ViolationTypes" (
  "v" CLOB,
  "name" CLOB,
  "description" CLOB,
  "severity" CLOB,
  "category" CLOB,
  "defaultAction" CLOB,
  "isActive" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "isDefault" CLOB,
  "order" CLOB,
  "fineAmount" CLOB,
  "column_14" CLOB,
  "column_15" CLOB,
  "column_16" CLOB,
  "column_17" CLOB,
  "column_18" CLOB,
  "column_19" CLOB,
  "column_20" CLOB,
  "column_21" CLOB,
  "column_22" CLOB,
  "column_23" CLOB,
  "column_24" CLOB,
  "column_25" CLOB,
  "column_26" CLOB
);

CREATE INDEX "ix_ViolationTypes_id" ON "ViolationTypes" ("id");
CREATE INDEX "ix_ViolationTypes_createdAt" ON "ViolationTypes" ("createdAt");

-- PPEMatrix: unsafe column names — JSON row storage
CREATE TABLE "PPEMatrix" (
  "id" VARCHAR2(4000),
  "_rowJson" CLOB
);
CREATE INDEX "ix_PPEMatrix_id" ON "PPEMatrix" ("id");

CREATE TABLE "ContractorEvaluations" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" CLOB,
  "evaluatorName" CLOB,
  "projectName" CLOB,
  "isoCode" CLOB,
  "evaluationDate" CLOB,
  "location" CLOB,
  "generalNotes" CLOB,
  "items" CLOB,
  "compliantCount" CLOB,
  "totalItems" CLOB,
  "finalScore" CLOB,
  "finalRating" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "updatedBy" CLOB,
  "updatedAt_1" CLOB,
  "createdBy_1" CLOB,
  "updatedBy_1" CLOB,
  "status" VARCHAR2(4000),
  "approvedAt" CLOB,
  "approvedBy" CLOB,
  "evaluator" CLOB,
  "score" CLOB,
  "comments" CLOB
);

CREATE INDEX "ix_ContractorEvaluations_id" ON "ContractorEvaluations" ("id");
CREATE INDEX "ix_ContractorEvaluations_createdAt" ON "ContractorEvaluations" ("createdAt");
CREATE INDEX "ix_ContractorEvaluations_status" ON "ContractorEvaluations" ("status");

CREATE TABLE "AuditLog" (
  "id" VARCHAR2(4000),
  "recordId" VARCHAR2(4000),
  "timestamp" CLOB,
  "action" CLOB,
  "module" CLOB,
  "details" CLOB,
  "user" CLOB,
  "timestamp_1" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_AuditLog_id" ON "AuditLog" ("id");
CREATE INDEX "ix_AuditLog_createdAt" ON "AuditLog" ("createdAt");

CREATE TABLE "UserActivityLog" (
  "id" VARCHAR2(4000),
  "username" CLOB,
  "userId" VARCHAR2(4000),
  "actionType" CLOB,
  "recordId" VARCHAR2(4000),
  "userEmail" CLOB,
  "timestamp" CLOB,
  "module" CLOB,
  "details" CLOB,
  "ipAddress" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" CLOB,
  "updatedAt_2" CLOB,
  "updatedAt_3" CLOB,
  "loginHistory" CLOB,
  "name" CLOB,
  "email" VARCHAR2(4000),
  "passwordHash" CLOB,
  "role" VARCHAR2(4000),
  "department" CLOB,
  "active" VARCHAR2(4000),
  "photo" CLOB,
  "permissions" CLOB,
  "lastLogin" CLOB,
  "lastLogout" CLOB,
  "isOnline" CLOB,
  "postLoginPolicySeenAt" CLOB,
  "type" CLOB,
  "createdById" VARCHAR2(4000),
  "usage" CLOB,
  "purchaseDate" CLOB,
  "expiryDate" CLOB,
  "quantityAdded" CLOB,
  "remainingQuantity" CLOB,
  "location" CLOB,
  "notes" CLOB,
  "status" VARCHAR2(4000),
  "daysRemaining" CLOB,
  "createdBy" CLOB,
  "updatedBy" CLOB,
  "serialNumber" CLOB,
  "typeOfIssue" CLOB,
  "observerName" CLOB,
  "sourceId" VARCHAR2(4000),
  "issueDate" CLOB,
  "observationClassification" CLOB,
  "observationIssueHazard" CLOB,
  "correctivePreventiveAction" CLOB,
  "rootCause" CLOB,
  "riskRating" CLOB,
  "responsible" CLOB,
  "originalTargetDate" CLOB,
  "shift" CLOB,
  "sourceModule" CLOB,
  "sourceData" CLOB,
  "timeLog" CLOB,
  "updates" CLOB,
  "comments" CLOB,
  "sessionId" VARCHAR2(4000),
  "sessionLoginTime" CLOB
);

CREATE INDEX "ix_UserActivityLog_id" ON "UserActivityLog" ("id");
CREATE INDEX "ix_UserActivityLog_email" ON "UserActivityLog" ("email");
CREATE INDEX "ix_UserActivityLog_createdAt" ON "UserActivityLog" ("createdAt");
CREATE INDEX "ix_UserActivityLog_status" ON "UserActivityLog" ("status");

CREATE TABLE "AIAssistantSettings" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "settings" CLOB,
  "preferences" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_AIAssistantSettings_id" ON "AIAssistantSettings" ("id");
CREATE INDEX "ix_AIAssistantSettings_createdAt" ON "AIAssistantSettings" ("createdAt");

CREATE TABLE "UserAILog" (
  "userId" VARCHAR2(4000),
  "userName" CLOB,
  "id" VARCHAR2(4000),
  "query" CLOB,
  "intent" CLOB,
  "module" CLOB,
  "response" CLOB,
  "responseTime" CLOB,
  "timestamp" CLOB,
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_UserAILog_id" ON "UserAILog" ("id");
CREATE INDEX "ix_UserAILog_createdAt" ON "UserAILog" ("createdAt");

CREATE TABLE "AnnualTrainingPlans" (
  "id" VARCHAR2(4000),
  "year" CLOB,
  "plans" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_AnnualTrainingPlans_id" ON "AnnualTrainingPlans" ("id");
CREATE INDEX "ix_AnnualTrainingPlans_createdAt" ON "AnnualTrainingPlans" ("createdAt");
CREATE INDEX "ix_AnnualTrainingPlans_status" ON "AnnualTrainingPlans" ("status");

CREATE TABLE "SafetyTeamMembers" (
  "name" CLOB,
  "jobTitle" CLOB,
  "employeeCode" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "department" CLOB,
  "email" VARCHAR2(4000),
  "phone" CLOB,
  "appointmentDate" CLOB,
  "positionLevel" CLOB,
  "photo" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdAt_1" CLOB,
  "updatedAt_1" CLOB,
  "contactInfo" CLOB,
  "employeeNumber" CLOB
);

CREATE INDEX "ix_SafetyTeamMembers_id" ON "SafetyTeamMembers" ("id");
CREATE INDEX "ix_SafetyTeamMembers_email" ON "SafetyTeamMembers" ("email");
CREATE INDEX "ix_SafetyTeamMembers_createdAt" ON "SafetyTeamMembers" ("createdAt");
CREATE INDEX "ix_SafetyTeamMembers_status" ON "SafetyTeamMembers" ("status");

CREATE TABLE "SafetyOrganizationalStructure" (
  "id" VARCHAR2(4000),
  "position" CLOB,
  "positionLevel" CLOB,
  "memberId" VARCHAR2(4000),
  "memberName" CLOB,
  "parentPositionId" VARCHAR2(4000),
  "order" CLOB,
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyOrganizationalStructure_id" ON "SafetyOrganizationalStructure" ("id");
CREATE INDEX "ix_SafetyOrganizationalStructure_createdAt" ON "SafetyOrganizationalStructure" ("createdAt");

CREATE TABLE "SafetyJobDescriptions" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "employeeId" VARCHAR2(4000),
  "jobTitle" CLOB,
  "roleDescription" CLOB,
  "responsibilities" CLOB,
  "tasks" CLOB,
  "workScope" CLOB,
  "requiredQualifications" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyJobDescriptions_id" ON "SafetyJobDescriptions" ("id");
CREATE INDEX "ix_SafetyJobDescriptions_createdAt" ON "SafetyJobDescriptions" ("createdAt");

CREATE TABLE "SafetyTeamKPIs" (
  "memberId" VARCHAR2(4000),
  "incidentsHandledCount" CLOB,
  "id" VARCHAR2(4000),
  "period" CLOB,
  "inspectionsCount" CLOB,
  "closedActionsCount" CLOB,
  "observationsCount" CLOB,
  "trainingsCount" CLOB,
  "nearMissCount" CLOB,
  "ptwCount" CLOB,
  "commitmentRate" CLOB,
  "targetInspections" CLOB,
  "targetActionsClosure" CLOB,
  "targetObservations" CLOB,
  "targetTrainings" CLOB,
  "targetCommitment" CLOB,
  "customKPIs" CLOB,
  "calculatedAt" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" CLOB,
  "calculatedBy" CLOB
);

CREATE INDEX "ix_SafetyTeamKPIs_id" ON "SafetyTeamKPIs" ("id");
CREATE INDEX "ix_SafetyTeamKPIs_createdAt" ON "SafetyTeamKPIs" ("createdAt");

CREATE TABLE "SafetyTeamPerformanceReports" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "period" CLOB,
  "startDate" CLOB,
  "endDate" CLOB,
  "reportData" CLOB,
  "summary" CLOB,
  "generatedAt" CLOB,
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamPerformanceReports_id" ON "SafetyTeamPerformanceReports" ("id");
CREATE INDEX "ix_SafetyTeamPerformanceReports_createdAt" ON "SafetyTeamPerformanceReports" ("createdAt");

CREATE TABLE "SafetyTeamAttendance" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "checkIn" CLOB,
  "checkOut" CLOB,
  "workDuration" CLOB,
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamAttendance_id" ON "SafetyTeamAttendance" ("id");
CREATE INDEX "ix_SafetyTeamAttendance_createdAt" ON "SafetyTeamAttendance" ("createdAt");
CREATE INDEX "ix_SafetyTeamAttendance_date" ON "SafetyTeamAttendance" ("date");
CREATE INDEX "ix_SafetyTeamAttendance_status" ON "SafetyTeamAttendance" ("status");

CREATE TABLE "SafetyTeamLeaves" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "leaveType" CLOB,
  "startDate" CLOB,
  "endDate" CLOB,
  "daysCount" CLOB,
  "reason" CLOB,
  "approvalStatus" CLOB,
  "approvedBy" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamLeaves_id" ON "SafetyTeamLeaves" ("id");
CREATE INDEX "ix_SafetyTeamLeaves_createdAt" ON "SafetyTeamLeaves" ("createdAt");

CREATE TABLE "SafetyHealthManagementSettings" (
  "leaveTypes" CLOB,
  "id" VARCHAR2(4000),
  "attendanceStatuses" CLOB,
  "kpiTargets" CLOB,
  "customKPIs" CLOB,
  "updatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyHealthManagementSettings_id" ON "SafetyHealthManagementSettings" ("id");
CREATE INDEX "ix_SafetyHealthManagementSettings_createdAt" ON "SafetyHealthManagementSettings" ("createdAt");

CREATE TABLE "SafetyTeamTasks" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "taskTitle" CLOB,
  "taskDescription" CLOB,
  "taskType" CLOB,
  "priority" CLOB,
  "dueDate" CLOB,
  "status" VARCHAR2(4000),
  "assignedBy" CLOB,
  "completedDate" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamTasks_id" ON "SafetyTeamTasks" ("id");
CREATE INDEX "ix_SafetyTeamTasks_createdAt" ON "SafetyTeamTasks" ("createdAt");
CREATE INDEX "ix_SafetyTeamTasks_status" ON "SafetyTeamTasks" ("status");

CREATE TABLE "ActionTrackingSettings" (
  "id" VARCHAR2(4000),
  "typeOfIssueList" CLOB,
  "typeClassificationMapping" CLOB,
  "classificationList" CLOB,
  "rootCauseList" CLOB,
  "classificationRootCauseMapping" CLOB,
  "statusList" CLOB,
  "riskRatingList" CLOB,
  "departmentList" CLOB,
  "locationList" CLOB,
  "responsibleList" CLOB,
  "shiftList" CLOB,
  "permissions" CLOB,
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ActionTrackingSettings_id" ON "ActionTrackingSettings" ("id");

CREATE TABLE "Violation_Types_DB" (
  "id" VARCHAR2(4000),
  "violationTypes" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" CLOB
);

CREATE INDEX "ix_Violation_Types_DB_id" ON "Violation_Types_DB" ("id");

CREATE TABLE "ModuleManagement" (
  "id" VARCHAR2(4000),
  "moduleId" VARCHAR2(4000),
  "enabled" CLOB,
  "version" CLOB,
  "lastUpdated" CLOB,
  "updatedBy" CLOB,
  "updatedByName" CLOB,
  "notes" CLOB,
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ModuleManagement_id" ON "ModuleManagement" ("id");
CREATE INDEX "ix_ModuleManagement_createdAt" ON "ModuleManagement" ("createdAt");

CREATE TABLE "UserTasks" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "title" CLOB,
  "taskTitle" CLOB,
  "taskType" CLOB,
  "description" CLOB,
  "taskDescription" CLOB,
  "assignedTo" CLOB,
  "assignedDepartments" CLOB,
  "priority" CLOB,
  "dueDate" CLOB,
  "completionRate" CLOB,
  "userProgress" CLOB,
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "assignedBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" CLOB,
  "createdBy" CLOB,
  "createdBy_1" CLOB,
  "assignedBy_1" CLOB,
  "completedDate" CLOB,
  "createdAt_1" CLOB,
  "updatedAt_2" CLOB,
  "createdBy_2" CLOB,
  "createdAt_2" CLOB,
  "updatedAt_3" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_UserTasks_id" ON "UserTasks" ("id");
CREATE INDEX "ix_UserTasks_createdAt" ON "UserTasks" ("createdAt");
CREATE INDEX "ix_UserTasks_status" ON "UserTasks" ("status");

CREATE TABLE "UserInstructions" (
  "id" VARCHAR2(4000),
  "type" CLOB,
  "title" CLOB,
  "description" CLOB,
  "content" CLOB,
  "assignedTo" CLOB,
  "assignedDepartments" CLOB,
  "isRead" CLOB,
  "readAt" CLOB,
  "createdBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_UserInstructions_id" ON "UserInstructions" ("id");
CREATE INDEX "ix_UserInstructions_createdAt" ON "UserInstructions" ("createdAt");

CREATE TABLE "Notifications" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "type" CLOB,
  "priority" CLOB,
  "title" CLOB,
  "message" CLOB,
  "read" CLOB,
  "readAt" CLOB,
  "relatedId" VARCHAR2(4000),
  "relatedType" CLOB,
  "taskId" VARCHAR2(4000),
  "actionId" VARCHAR2(4000),
  "ptwId" VARCHAR2(4000),
  "scheduleId" VARCHAR2(4000),
  "trainingId" VARCHAR2(4000),
  "dueDate" CLOB,
  "scheduledDate" CLOB,
  "startDate" CLOB,
  "endDate" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "link" CLOB,
  "data" CLOB,
  "userEmail" CLOB
);

CREATE INDEX "ix_Notifications_id" ON "Notifications" ("id");
CREATE INDEX "ix_Notifications_createdAt" ON "Notifications" ("createdAt");

CREATE TABLE "IncidentNotifications" (
  "id" VARCHAR2(4000),
  "notificationNumber" CLOB,
  "siteId" VARCHAR2(4000),
  "siteName" CLOB,
  "sublocationId" VARCHAR2(4000),
  "sublocationName" CLOB,
  "incidentType" CLOB,
  "reporterName" CLOB,
  "reporterCode" CLOB,
  "date" VARCHAR2(4000),
  "location" CLOB,
  "sublocation" CLOB,
  "department" CLOB,
  "description" CLOB,
  "injuries" CLOB,
  "losses" CLOB,
  "actions" CLOB,
  "createdAt" VARCHAR2(4000),
  "createdBy" CLOB,
  "employeeName" CLOB,
  "affiliation" CLOB,
  "employeeJob" CLOB,
  "employeeDepartment" CLOB,
  "injuryDescription" CLOB,
  "updatedAt" VARCHAR2(4000),
  "contractorName" CLOB,
  "employeeCode" VARCHAR2(4000)
);

CREATE INDEX "ix_IncidentNotifications_id" ON "IncidentNotifications" ("id");
CREATE INDEX "ix_IncidentNotifications_createdAt" ON "IncidentNotifications" ("createdAt");
CREATE INDEX "ix_IncidentNotifications_date" ON "IncidentNotifications" ("date");

-- tables: 142