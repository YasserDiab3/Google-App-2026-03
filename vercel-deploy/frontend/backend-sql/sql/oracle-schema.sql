-- HSE Oracle schema (auto-generated from headers-schema.js)
-- Run once on Autonomous DB as HSE_APP user.
-- If table exists, statement fails — skip or DROP manually.

CREATE TABLE "Users" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "password" VARCHAR2(4000),
  "passwordHash" VARCHAR2(4000),
  "role" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "active" VARCHAR2(4000),
  "photo" CLOB,
  "permissions" CLOB,
  "lastLogin" VARCHAR2(4000),
  "lastLogout" VARCHAR2(4000),
  "isOnline" VARCHAR2(4000),
  "loginHistory" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "postLoginPolicySeenAt" VARCHAR2(4000),
  "profilePublicToken" VARCHAR2(4000),
  "profilePublicTokenExpiry" VARCHAR2(4000),
  "mfaEnabled" VARCHAR2(4000),
  "mfaSecretEnc" VARCHAR2(4000),
  "mfaEnrolledAt" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "lastPresenceAt" VARCHAR2(4000),
  "activeSessionId" VARCHAR2(4000),
  "column_26" VARCHAR2(4000)
);

CREATE INDEX "ix_Users_id" ON "Users" ("id");
CREATE INDEX "ix_Users_email" ON "Users" ("email");
CREATE INDEX "ix_Users_createdAt" ON "Users" ("createdAt");

CREATE TABLE "HSE_Settings" (
  "Setting_Key" VARCHAR2(4000),
  "Setting_Value" VARCHAR2(4000),
  "Description" CLOB,
  "Last_Updated" VARCHAR2(4000)
);


CREATE TABLE "SecurityOfficers" (
  "ID" VARCHAR2(4000),
  "Name" VARCHAR2(4000),
  "Role" VARCHAR2(4000),
  "Site" VARCHAR2(4000),
  "Phone" VARCHAR2(4000),
  "Is Active" VARCHAR2(4000),
  "Created At" VARCHAR2(4000),
  "Updated At" VARCHAR2(4000)
);


CREATE TABLE "GateVisitors" (
  "Record ID" VARCHAR2(4000),
  "Entry Date" VARCHAR2(4000),
  "Entry Time" VARCHAR2(4000),
  "Visitor Name" VARCHAR2(4000),
  "Organization / Company" VARCHAR2(4000),
  "National ID / Passport" VARCHAR2(4000),
  "Phone Number" VARCHAR2(4000),
  "Vehicle Plate" VARCHAR2(4000),
  "Target Site" VARCHAR2(4000),
  "Target Hall / Area" VARCHAR2(4000),
  "Host Person & Dept" VARCHAR2(4000),
  "Visit Purpose" VARCHAR2(4000),
  "Badge #" VARCHAR2(4000),
  "Security Officer / Registered By" VARCHAR2(4000),
  "Status" VARCHAR2(4000),
  "Exit Time" VARCHAR2(4000),
  "Duration (Minutes)" VARCHAR2(4000),
  "Signature URL" CLOB,
  "Created At Timestamp" VARCHAR2(4000)
);


CREATE TABLE "PeriodicEquipmentInspections" (
  "id" VARCHAR2(4000),
  "assetId" VARCHAR2(4000),
  "assetNumber" VARCHAR2(4000),
  "inspectionDate" VARCHAR2(4000),
  "inspector" VARCHAR2(4000),
  "result" VARCHAR2(4000),
  "checklistResults" CLOB,
  "findings" VARCHAR2(4000),
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
  "assetNumber" VARCHAR2(4000),
  "typeId" VARCHAR2(4000),
  "typeName" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "qrCodeData" CLOB,
  "location" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "manufacturer" VARCHAR2(4000),
  "model" VARCHAR2(4000),
  "manufacturingYear" VARCHAR2(4000),
  "installationDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "notes" CLOB,
  "lastInspection" VARCHAR2(4000),
  "nextInspection" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_PeriodicEquipmentAssets_id" ON "PeriodicEquipmentAssets" ("id");
CREATE INDEX "ix_PeriodicEquipmentAssets_createdAt" ON "PeriodicEquipmentAssets" ("createdAt");
CREATE INDEX "ix_PeriodicEquipmentAssets_status" ON "PeriodicEquipmentAssets" ("status");

CREATE TABLE "Email_Settings" (
  "id" VARCHAR2(4000),
  "configJson" CLOB,
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_Email_Settings_id" ON "Email_Settings" ("id");

CREATE TABLE "ClientErrorLog" (
  "id" VARCHAR2(4000),
  "level" VARCHAR2(4000),
  "message" CLOB,
  "stack" VARCHAR2(4000),
  "source" VARCHAR2(4000),
  "line" VARCHAR2(4000),
  "col" VARCHAR2(4000),
  "module" VARCHAR2(4000),
  "action" VARCHAR2(4000),
  "pageUrl" VARCHAR2(4000),
  "userAgent" VARCHAR2(4000),
  "appVersion" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userEmail" VARCHAR2(4000),
  "username" VARCHAR2(4000),
  "sessionId" VARCHAR2(4000),
  "fingerprint" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "extra" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClientErrorLog_id" ON "ClientErrorLog" ("id");
CREATE INDEX "ix_ClientErrorLog_createdAt" ON "ClientErrorLog" ("createdAt");
CREATE INDEX "ix_ClientErrorLog_status" ON "ClientErrorLog" ("status");

CREATE TABLE "SafetyCalendarCustomEvents" (
  "title" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "description" CLOB,
  "startDate" VARCHAR2(4000),
  "endDate" VARCHAR2(4000),
  "recurring" VARCHAR2(4000),
  "color" VARCHAR2(4000),
  "enabled" VARCHAR2(4000),
  "userData" CLOB,
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyCalendarCustomEvents_id" ON "SafetyCalendarCustomEvents" ("id");
CREATE INDEX "ix_SafetyCalendarCustomEvents_createdAt" ON "SafetyCalendarCustomEvents" ("createdAt");

CREATE TABLE "ClinicStaffLeaveQuota" (
  "staffId" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userName" VARCHAR2(4000),
  "periodType" VARCHAR2(4000),
  "updatedById" VARCHAR2(4000),
  "updatedByName" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "userEmail" VARCHAR2(4000),
  "periodKey" VARCHAR2(4000),
  "leaveDaysQuota" VARCHAR2(4000),
  "permissionCountQuota" CLOB,
  "notes" CLOB,
  "updatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicStaffLeaveQuota_id" ON "ClinicStaffLeaveQuota" ("id");
CREATE INDEX "ix_ClinicStaffLeaveQuota_createdAt" ON "ClinicStaffLeaveQuota" ("createdAt");

CREATE TABLE "ClinicStaffTimeOffRequests" (
  "id" VARCHAR2(4000),
  "requestType" VARCHAR2(4000),
  "staffId" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userName" VARCHAR2(4000),
  "reviewedById" VARCHAR2(4000),
  "reviewedByName" VARCHAR2(4000),
  "userEmail" VARCHAR2(4000),
  "staffRole" VARCHAR2(4000),
  "dateFrom" VARCHAR2(4000),
  "dateTo" VARCHAR2(4000),
  "timeFrom" VARCHAR2(4000),
  "timeTo" VARCHAR2(4000),
  "durationHours" VARCHAR2(4000),
  "durationDays" VARCHAR2(4000),
  "reason" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "reviewNotes" CLOB,
  "requestedAt" VARCHAR2(4000),
  "reviewedAt" VARCHAR2(4000),
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
  "userName" VARCHAR2(4000),
  "sessionId" VARCHAR2(4000),
  "userEmail" VARCHAR2(4000),
  "staffRole" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "checkIn" VARCHAR2(4000),
  "checkOut" VARCHAR2(4000),
  "workDuration" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "source" VARCHAR2(4000),
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
  "userName" VARCHAR2(4000),
  "jobTitle" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "userEmail" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "staffRole" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "userData" CLOB,
  "sortOrder" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicStaff_id" ON "ClinicStaff" ("id");
CREATE INDEX "ix_ClinicStaff_createdAt" ON "ClinicStaff" ("createdAt");

CREATE TABLE "EmergencyMapItems" (
  "floorPlanId" VARCHAR2(4000),
  "itemType" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "label" VARCHAR2(4000),
  "x" VARCHAR2(4000),
  "y" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "userData" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_EmergencyMapItems_id" ON "EmergencyMapItems" ("id");
CREATE INDEX "ix_EmergencyMapItems_createdAt" ON "EmergencyMapItems" ("createdAt");
CREATE INDEX "ix_EmergencyMapItems_status" ON "EmergencyMapItems" ("status");

CREATE TABLE "EmergencyFloorPlans" (
  "name" VARCHAR2(4000),
  "imageDriveId" CLOB,
  "imageWidth" CLOB,
  "id" VARCHAR2(4000),
  "floor" VARCHAR2(4000),
  "imageHeight" CLOB,
  "sortOrder" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "qrToken" VARCHAR2(4000),
  "drawStampsJson" CLOB,
  "userData" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000)
);

CREATE INDEX "ix_EmergencyFloorPlans_id" ON "EmergencyFloorPlans" ("id");
CREATE INDEX "ix_EmergencyFloorPlans_createdAt" ON "EmergencyFloorPlans" ("createdAt");

CREATE TABLE "LegalTrainingAttendees" (
  "id" VARCHAR2(4000),
  "legalTrainingId" VARCHAR2(4000),
  "legalTrainingTitle" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeePosition" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "attendanceDate" VARCHAR2(4000),
  "attendanceStatus" VARCHAR2(4000),
  "score" VARCHAR2(4000),
  "certificateNumber" VARCHAR2(4000),
  "certificateDate" VARCHAR2(4000),
  "certificateExpiryDate" VARCHAR2(4000),
  "certificateImage" CLOB,
  "notes" CLOB,
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_LegalTrainingAttendees_id" ON "LegalTrainingAttendees" ("id");
CREATE INDEX "ix_LegalTrainingAttendees_createdAt" ON "LegalTrainingAttendees" ("createdAt");

CREATE TABLE "LegalTrainings" (
  "id" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "legalReference" VARCHAR2(4000),
  "legalArticle" VARCHAR2(4000),
  "category" VARCHAR2(4000),
  "frequency" VARCHAR2(4000),
  "targetGroup" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "scheduledDate" VARCHAR2(4000),
  "actualDate" VARCHAR2(4000),
  "trainer" VARCHAR2(4000),
  "trainerQualification" VARCHAR2(4000),
  "duration" VARCHAR2(4000),
  "participantsCount" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000),
  "nextDueDate" VARCHAR2(4000),
  "certificateRequired" VARCHAR2(4000),
  "complianceStatus" VARCHAR2(4000),
  "penaltyForNonCompliance" VARCHAR2(4000),
  "notes" CLOB,
  "attachments" CLOB,
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_LegalTrainings_id" ON "LegalTrainings" ("id");
CREATE INDEX "ix_LegalTrainings_createdAt" ON "LegalTrainings" ("createdAt");
CREATE INDEX "ix_LegalTrainings_status" ON "LegalTrainings" ("status");

CREATE TABLE "UserVersions" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "userName" VARCHAR2(4000),
  "userEmail" VARCHAR2(4000),
  "userRole" VARCHAR2(4000),
  "userDepartment" VARCHAR2(4000),
  "currentVersion" VARCHAR2(4000),
  "firstSeenVersion" VARCHAR2(4000),
  "previousVersion" VARCHAR2(4000),
  "lastSeenAt" VARCHAR2(4000),
  "firstSeenAt" VARCHAR2(4000),
  "sessionCount" VARCHAR2(4000),
  "reportCount" CLOB,
  "userAgent" VARCHAR2(4000),
  "platform" VARCHAR2(4000),
  "isMobile" VARCHAR2(4000),
  "screenSize" VARCHAR2(4000),
  "language" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_UserVersions_id" ON "UserVersions" ("id");

CREATE TABLE "ViolationApprovalRequests" (
  "id" VARCHAR2(4000),
  "requestType" VARCHAR2(4000),
  "originalViolationId" VARCHAR2(4000),
  "createdByName" VARCHAR2(4000),
  "approvedByName" VARCHAR2(4000),
  "rejectedByName" VARCHAR2(4000),
  "finalViolationId" VARCHAR2(4000),
  "violationData" CLOB,
  "status" VARCHAR2(4000),
  "approvers" VARCHAR2(4000),
  "currentApproverIndex" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "rejectedBy" VARCHAR2(4000),
  "rejectedAt" VARCHAR2(4000),
  "rejectionReason" VARCHAR2(4000),
  "notes" CLOB,
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_ViolationApprovalRequests_id" ON "ViolationApprovalRequests" ("id");
CREATE INDEX "ix_ViolationApprovalRequests_createdAt" ON "ViolationApprovalRequests" ("createdAt");
CREATE INDEX "ix_ViolationApprovalRequests_status" ON "ViolationApprovalRequests" ("status");

CREATE TABLE "LegalInventory" (
  "id" VARCHAR2(4000),
  "lawNumber" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "issuingAuthority" VARCHAR2(4000),
  "complianceStatement" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "applicationStatus" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_LegalInventory_id" ON "LegalInventory" ("id");
CREATE INDEX "ix_LegalInventory_createdAt" ON "LegalInventory" ("createdAt");

CREATE TABLE "ViolationApprovalSettings" (
  "id" VARCHAR2(4000),
  "updatedByName" VARCHAR2(4000),
  "requireApproval" VARCHAR2(4000),
  "defaultApprovers" VARCHAR2(4000),
  "bypassRoles" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ViolationApprovalSettings_id" ON "ViolationApprovalSettings" ("id");
CREATE INDEX "ix_ViolationApprovalSettings_createdAt" ON "ViolationApprovalSettings" ("createdAt");

CREATE TABLE "Employees" (
  "employeeNumber" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "job" VARCHAR2(4000),
  "nationalId" VARCHAR2(4000),
  "birthDate" VARCHAR2(4000),
  "age" VARCHAR2(4000),
  "hireDate" VARCHAR2(4000),
  "gender" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "insuranceNumber" VARCHAR2(4000),
  "sapId" VARCHAR2(4000),
  "branch" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "position" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "photo" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "resignationDate" VARCHAR2(4000),
  "column_23" VARCHAR2(4000),
  "column_24" VARCHAR2(4000),
  "column_25" VARCHAR2(4000),
  "column_26" VARCHAR2(4000)
);

CREATE INDEX "ix_Employees_id" ON "Employees" ("id");
CREATE INDEX "ix_Employees_email" ON "Employees" ("email");
CREATE INDEX "ix_Employees_createdAt" ON "Employees" ("createdAt");
CREATE INDEX "ix_Employees_status" ON "Employees" ("status");

CREATE TABLE "PPE_Eligibility_Rules" (
  "id" VARCHAR2(4000),
  "equipmentType" CLOB,
  "months" VARCHAR2(4000),
  "days" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "sortOrder" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_PPE_Eligibility_Rules_id" ON "PPE_Eligibility_Rules" ("id");
CREATE INDEX "ix_PPE_Eligibility_Rules_createdAt" ON "PPE_Eligibility_Rules" ("createdAt");

CREATE TABLE "ContractorBehaviorMonitoring" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "behaviorType" VARCHAR2(4000),
  "contractorWorker" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "job" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "photo" CLOB,
  "date" VARCHAR2(4000),
  "rating" VARCHAR2(4000),
  "correctiveAction" VARCHAR2(4000),
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
  "isoCode" VARCHAR2(4000),
  "employeeId" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "behaviorType" VARCHAR2(4000),
  "photo" CLOB,
  "date" VARCHAR2(4000),
  "rating" VARCHAR2(4000),
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "job" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "correctiveAction" VARCHAR2(4000),
  "correctiveActionDetails" CLOB
);

CREATE INDEX "ix_BehaviorMonitoring_id" ON "BehaviorMonitoring" ("id");
CREATE INDEX "ix_BehaviorMonitoring_createdAt" ON "BehaviorMonitoring" ("createdAt");
CREATE INDEX "ix_BehaviorMonitoring_date" ON "BehaviorMonitoring" ("date");

CREATE TABLE "SecurityAuditLog" (
  "timestamp" VARCHAR2(4000),
  "event" VARCHAR2(4000),
  "details" CLOB,
  "source" VARCHAR2(4000),
  "severity" VARCHAR2(4000)
);


CREATE TABLE "PTWContractorIssuingAuthorities" (
  "id" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "departmentId" VARCHAR2(4000),
  "departmentName" VARCHAR2(4000),
  "jobTitle" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "sublocation" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "contractorFlag" VARCHAR2(4000),
  "coldWork" VARCHAR2(4000),
  "loto" VARCHAR2(4000),
  "hotWork" VARCHAR2(4000),
  "workAtHeight" VARCHAR2(4000),
  "confinedSpace" VARCHAR2(4000),
  "excavation" VARCHAR2(4000),
  "contractorPTW" VARCHAR2(4000),
  "liftingPlan" VARCHAR2(4000),
  "sortOrder" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "contractorCompanyName" VARCHAR2(4000)
);

CREATE INDEX "ix_PTWContractorIssuingAuthorities_id" ON "PTWContractorIssuingAuthorities" ("id");
CREATE INDEX "ix_PTWContractorIssuingAuthorities_email" ON "PTWContractorIssuingAuthorities" ("email");
CREATE INDEX "ix_PTWContractorIssuingAuthorities_createdAt" ON "PTWContractorIssuingAuthorities" ("createdAt");

CREATE TABLE "PTWIssuingAuthorities" (
  "id" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "departmentId" VARCHAR2(4000),
  "departmentName" VARCHAR2(4000),
  "jobTitle" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "sublocation" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "contractorFlag" VARCHAR2(4000),
  "coldWork" VARCHAR2(4000),
  "loto" VARCHAR2(4000),
  "hotWork" VARCHAR2(4000),
  "workAtHeight" VARCHAR2(4000),
  "confinedSpace" VARCHAR2(4000),
  "excavation" VARCHAR2(4000),
  "contractorPTW" VARCHAR2(4000),
  "liftingPlan" VARCHAR2(4000),
  "sortOrder" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "contractorCompanyName" VARCHAR2(4000),
  "approvalRole" VARCHAR2(4000)
);

CREATE INDEX "ix_PTWIssuingAuthorities_id" ON "PTWIssuingAuthorities" ("id");
CREATE INDEX "ix_PTWIssuingAuthorities_email" ON "PTWIssuingAuthorities" ("email");
CREATE INDEX "ix_PTWIssuingAuthorities_createdAt" ON "PTWIssuingAuthorities" ("createdAt");

CREATE TABLE "PTWIdMapping" (
  "id" VARCHAR2(4000),
  "entityType" VARCHAR2(4000),
  "oldId" VARCHAR2(4000),
  "newId" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PTWIdMapping_id" ON "PTWIdMapping" ("id");
CREATE INDEX "ix_PTWIdMapping_createdAt" ON "PTWIdMapping" ("createdAt");

CREATE TABLE "PTWRegistry" (
  "id" VARCHAR2(4000),
  "sequentialNumber" VARCHAR2(4000),
  "permitId" VARCHAR2(4000),
  "permitType" VARCHAR2(4000),
  "permitTypeDisplay" VARCHAR2(4000),
  "locationId" VARCHAR2(4000),
  "sublocationId" VARCHAR2(4000),
  "openDate" VARCHAR2(4000),
  "requestingParty" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "sublocation" VARCHAR2(4000),
  "timeFrom" VARCHAR2(4000),
  "timeTo" VARCHAR2(4000),
  "totalTime" VARCHAR2(4000),
  "authorizedParty" VARCHAR2(4000),
  "workDescription" CLOB,
  "supervisor1" VARCHAR2(4000),
  "supervisor2" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "closureDate" VARCHAR2(4000),
  "closureReason" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "paperPermitNumber" VARCHAR2(4000),
  "equipment" CLOB,
  "tools" VARCHAR2(4000),
  "toolsList" VARCHAR2(4000),
  "teamMembersText" VARCHAR2(4000),
  "hotWorkDetails" CLOB,
  "hotWorkOther" VARCHAR2(4000),
  "confinedSpaceDetails" CLOB,
  "confinedSpaceOther" VARCHAR2(4000),
  "heightWorkDetails" CLOB,
  "heightWorkOther" VARCHAR2(4000),
  "electricalWorkType" VARCHAR2(4000),
  "coldWorkType" VARCHAR2(4000),
  "otherWorkType" VARCHAR2(4000),
  "excavationLength" VARCHAR2(4000),
  "excavationWidth" VARCHAR2(4000),
  "excavationDepth" VARCHAR2(4000),
  "soilType" VARCHAR2(4000),
  "preStartChecklist" CLOB,
  "lotoApplied" VARCHAR2(4000),
  "governmentPermits" VARCHAR2(4000),
  "riskAssessmentAttached" VARCHAR2(4000),
  "gasTesting" VARCHAR2(4000),
  "mocRequest" VARCHAR2(4000),
  "ppeNotes" CLOB,
  "requiredPPE" VARCHAR2(4000),
  "riskLikelihood" VARCHAR2(4000),
  "riskConsequence" VARCHAR2(4000),
  "riskScore" VARCHAR2(4000),
  "riskLevel" VARCHAR2(4000),
  "riskNotes" CLOB,
  "manualApprovalsText" CLOB,
  "manualClosureApprovalsText" CLOB,
  "isManualEntry" VARCHAR2(4000),
  "approvalCircuitOwnerId" VARCHAR2(4000),
  "approvalCircuitName" VARCHAR2(4000),
  "skipApprovalFlow" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "updatedById" VARCHAR2(4000)
);

CREATE INDEX "ix_PTWRegistry_id" ON "PTWRegistry" ("id");
CREATE INDEX "ix_PTWRegistry_createdAt" ON "PTWRegistry" ("createdAt");
CREATE INDEX "ix_PTWRegistry_status" ON "PTWRegistry" ("status");
CREATE INDEX "ix_PTWRegistry_permitId" ON "PTWRegistry" ("permitId");

CREATE TABLE "PTW" (
  "id" VARCHAR2(4000),
  "workType" VARCHAR2(4000),
  "siteId" VARCHAR2(4000),
  "siteName" VARCHAR2(4000),
  "sublocationId" VARCHAR2(4000),
  "sublocationName" VARCHAR2(4000),
  "electricalWorkType" VARCHAR2(4000),
  "coldWorkType" VARCHAR2(4000),
  "otherWorkType" VARCHAR2(4000),
  "excavationWidth" VARCHAR2(4000),
  "soilType" VARCHAR2(4000),
  "approvalCircuitOwnerId" VARCHAR2(4000),
  "approvalCircuitName" VARCHAR2(4000),
  "workDescription" CLOB,
  "location" VARCHAR2(4000),
  "sublocation" VARCHAR2(4000),
  "startDate" VARCHAR2(4000),
  "endDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "approvals" CLOB,
  "requiredPPE" VARCHAR2(4000),
  "riskAssessment" VARCHAR2(4000),
  "riskNotes" CLOB,
  "authorizedParty" VARCHAR2(4000),
  "requestingParty" VARCHAR2(4000),
  "equipment" CLOB,
  "tools" VARCHAR2(4000),
  "toolsList" VARCHAR2(4000),
  "teamMembers" VARCHAR2(4000),
  "hotWorkDetails" CLOB,
  "hotWorkOther" VARCHAR2(4000),
  "confinedSpaceDetails" CLOB,
  "confinedSpaceOther" VARCHAR2(4000),
  "heightWorkDetails" CLOB,
  "heightWorkOther" VARCHAR2(4000),
  "excavationLength" VARCHAR2(4000),
  "excavationDepth" VARCHAR2(4000),
  "preStartChecklist" CLOB,
  "lotoApplied" VARCHAR2(4000),
  "governmentPermits" VARCHAR2(4000),
  "riskAssessmentAttached" VARCHAR2(4000),
  "gasTesting" VARCHAR2(4000),
  "mocRequest" VARCHAR2(4000),
  "closureStatus" VARCHAR2(4000),
  "closureTime" VARCHAR2(4000),
  "closureReason" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "isManualEntry" VARCHAR2(4000),
  "closureApproval" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "skipApprovalFlow" VARCHAR2(4000),
  "paperPermitNumber" VARCHAR2(4000),
  "teamMembersText" VARCHAR2(4000),
  "ppeNotes" CLOB,
  "riskLikelihood" VARCHAR2(4000),
  "riskConsequence" VARCHAR2(4000),
  "riskScore" VARCHAR2(4000),
  "riskLevel" VARCHAR2(4000),
  "manualApprovals" CLOB,
  "manualApprovalsText" CLOB,
  "manualClosureApprovals" CLOB,
  "manualClosureApprovalsText" CLOB,
  "closureDate" VARCHAR2(4000),
  "supervisor1" VARCHAR2(4000),
  "supervisor2" VARCHAR2(4000),
  "sequentialNumber" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "updatedById" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_PTW_id" ON "PTW" ("id");
CREATE INDEX "ix_PTW_createdAt" ON "PTW" ("createdAt");
CREATE INDEX "ix_PTW_status" ON "PTW" ("status");

CREATE TABLE "ClinicContractorInjuries" (
  "id" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "personName" VARCHAR2(4000),
  "contractorPosition" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "injuryDate" VARCHAR2(4000),
  "injuryType" VARCHAR2(4000),
  "injuryBodyPart" CLOB,
  "injuryLocation" VARCHAR2(4000),
  "injuryDescription" CLOB,
  "actionsTaken" VARCHAR2(4000),
  "treatment" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "attachments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "employeePosition" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_ClinicContractorInjuries_id" ON "ClinicContractorInjuries" ("id");
CREATE INDEX "ix_ClinicContractorInjuries_createdAt" ON "ClinicContractorInjuries" ("createdAt");
CREATE INDEX "ix_ClinicContractorInjuries_status" ON "ClinicContractorInjuries" ("status");

CREATE TABLE "KPIAnnualPlans" (
  "id" VARCHAR2(4000),
  "indicatorType" VARCHAR2(4000),
  "year" VARCHAR2(4000),
  "objective" VARCHAR2(4000),
  "kpi" VARCHAR2(4000),
  "target" VARCHAR2(4000),
  "goal" VARCHAR2(4000),
  "improvementPlan" VARCHAR2(4000),
  "jan" VARCHAR2(4000),
  "feb" VARCHAR2(4000),
  "mar" VARCHAR2(4000),
  "apr" VARCHAR2(4000),
  "may" VARCHAR2(4000),
  "jun" VARCHAR2(4000),
  "jul" VARCHAR2(4000),
  "aug" VARCHAR2(4000),
  "sep" VARCHAR2(4000),
  "oct" VARCHAR2(4000),
  "nov" VARCHAR2(4000),
  "dec" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_KPIAnnualPlans_id" ON "KPIAnnualPlans" ("id");
CREATE INDEX "ix_KPIAnnualPlans_createdAt" ON "KPIAnnualPlans" ("createdAt");

CREATE TABLE "SafetyBudgetPurchaseOrders" (
  "id" VARCHAR2(4000),
  "itemCodeNo" VARCHAR2(4000),
  "prNo" VARCHAR2(4000),
  "prDate" VARCHAR2(4000),
  "itemsDescription" CLOB,
  "detailsRemarks" CLOB,
  "quantity" VARCHAR2(4000),
  "prStatus" VARCHAR2(4000),
  "poNo" VARCHAR2(4000),
  "poStatus" VARCHAR2(4000),
  "note" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyBudgetPurchaseOrders_id" ON "SafetyBudgetPurchaseOrders" ("id");
CREATE INDEX "ix_SafetyBudgetPurchaseOrders_createdAt" ON "SafetyBudgetPurchaseOrders" ("createdAt");

CREATE TABLE "ExternalWorkforceMonthly" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorCode" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "year" VARCHAR2(4000),
  "nov" VARCHAR2(4000),
  "total" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "apr" VARCHAR2(4000),
  "jan" VARCHAR2(4000),
  "feb" VARCHAR2(4000),
  "mar" VARCHAR2(4000),
  "may" VARCHAR2(4000),
  "jun" VARCHAR2(4000)
);

CREATE INDEX "ix_ExternalWorkforceMonthly_id" ON "ExternalWorkforceMonthly" ("id");
CREATE INDEX "ix_ExternalWorkforceMonthly_createdAt" ON "ExternalWorkforceMonthly" ("createdAt");

CREATE TABLE "MedicationDispenseLog" (
  "id" VARCHAR2(4000),
  "visitId" VARCHAR2(4000),
  "medicationId" VARCHAR2(4000),
  "medicationName" VARCHAR2(4000),
  "previousQuantity" VARCHAR2(4000),
  "deductedQuantity" VARCHAR2(4000),
  "newQuantity" VARCHAR2(4000),
  "dispensedBy" VARCHAR2(4000),
  "dispensedAt" VARCHAR2(4000),
  "notes" CLOB,
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_MedicationDispenseLog_id" ON "MedicationDispenseLog" ("id");

CREATE TABLE "NotificationEvents" (
  "id" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "key" VARCHAR2(4000),
  "message" CLOB,
  "icon" VARCHAR2(4000),
  "action" VARCHAR2(4000),
  "dismissed" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_NotificationEvents_id" ON "NotificationEvents" ("id");
CREATE INDEX "ix_NotificationEvents_createdAt" ON "NotificationEvents" ("createdAt");

CREATE TABLE "DailySafetyCheckList" (
  "id" VARCHAR2(4000),
  "reportNumber" CLOB,
  "siteId" VARCHAR2(4000),
  "siteName" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "inspectorName" VARCHAR2(4000),
  "shift" VARCHAR2(4000),
  "q1" VARCHAR2(4000),
  "q2" VARCHAR2(4000),
  "q3" VARCHAR2(4000),
  "q4" VARCHAR2(4000),
  "q5" VARCHAR2(4000),
  "q6" VARCHAR2(4000),
  "q7" VARCHAR2(4000),
  "q8" VARCHAR2(4000),
  "q9" VARCHAR2(4000),
  "q10" VARCHAR2(4000),
  "q11" VARCHAR2(4000),
  "q12" VARCHAR2(4000),
  "q13" VARCHAR2(4000),
  "q14" VARCHAR2(4000),
  "q15" VARCHAR2(4000),
  "q15Reading" VARCHAR2(4000),
  "q16" VARCHAR2(4000),
  "q17" VARCHAR2(4000),
  "notes" CLOB,
  "formSubmittedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_DailySafetyCheckList_id" ON "DailySafetyCheckList" ("id");
CREATE INDEX "ix_DailySafetyCheckList_createdAt" ON "DailySafetyCheckList" ("createdAt");
CREATE INDEX "ix_DailySafetyCheckList_date" ON "DailySafetyCheckList" ("date");

CREATE TABLE "DocumentVersions" (
  "id" VARCHAR2(4000),
  "documentCodeId" VARCHAR2(4000),
  "documentCode" VARCHAR2(4000),
  "versionNumber" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "revisionDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "isActive" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000)
);

CREATE INDEX "ix_DocumentVersions_id" ON "DocumentVersions" ("id");
CREATE INDEX "ix_DocumentVersions_createdAt" ON "DocumentVersions" ("createdAt");
CREATE INDEX "ix_DocumentVersions_status" ON "DocumentVersions" ("status");

CREATE TABLE "DocumentCodes" (
  "id" VARCHAR2(4000),
  "code" VARCHAR2(4000),
  "documentName" VARCHAR2(4000),
  "documentType" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000)
);

CREATE INDEX "ix_DocumentCodes_id" ON "DocumentCodes" ("id");
CREATE INDEX "ix_DocumentCodes_createdAt" ON "DocumentCodes" ("createdAt");
CREATE INDEX "ix_DocumentCodes_status" ON "DocumentCodes" ("status");

CREATE TABLE "ChangeRequests" (
  "title" VARCHAR2(4000),
  "changeType" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "requestNumber" VARCHAR2(4000),
  "description" CLOB,
  "priority" VARCHAR2(4000),
  "impact" VARCHAR2(4000),
  "relatedModule" VARCHAR2(4000),
  "relatedProcess" VARCHAR2(4000),
  "riskAssessment" VARCHAR2(4000),
  "mitigationActions" VARCHAR2(4000),
  "dueDate" VARCHAR2(4000),
  "requestedBy" VARCHAR2(4000),
  "requestedByEmail" VARCHAR2(4000),
  "requestedAt" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "timeLog" VARCHAR2(4000),
  "attachments" CLOB,
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updateNote" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "closedBy" VARCHAR2(4000),
  "closedAt" VARCHAR2(4000),
  "technicalChangeSubType" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "administrativeChangeSubType" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "fromDepartment" VARCHAR2(4000),
  "toDepartment" VARCHAR2(4000),
  "locationOther" VARCHAR2(4000),
  "changeContinuity" VARCHAR2(4000),
  "temporaryUntilDate" VARCHAR2(4000),
  "priorityUrgentReason" VARCHAR2(4000),
  "attachedDocumentsText" VARCHAR2(4000),
  "requestingDepartment" VARCHAR2(4000),
  "otherDepartments" VARCHAR2(4000),
  "affectedDepartments" VARCHAR2(4000),
  "documentsToAmendJson" CLOB,
  "committeeMembersJson" CLOB,
  "committeeRecommendations" VARCHAR2(4000),
  "currentTasksDescription" CLOB,
  "newTasksDescription" CLOB,
  "responsibleRequestingDepartment" VARCHAR2(4000),
  "responsibleImplementingDepartment" VARCHAR2(4000),
  "previousInjury" VARCHAR2(4000),
  "chronicDiseases" VARCHAR2(4000),
  "healthNotes" CLOB,
  "trainingRequirementsJson" CLOB,
  "implementedBy" VARCHAR2(4000),
  "implementedAt" VARCHAR2(4000),
  "approvalFlowJson" CLOB,
  "currentApprovalStep" CLOB,
  "approvalStatus" CLOB
);

CREATE INDEX "ix_ChangeRequests_id" ON "ChangeRequests" ("id");
CREATE INDEX "ix_ChangeRequests_createdAt" ON "ChangeRequests" ("createdAt");
CREATE INDEX "ix_ChangeRequests_status" ON "ChangeRequests" ("status");

CREATE TABLE "ElectricityManagement_Records" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "monthYear" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "source" VARCHAR2(4000),
  "startReading" VARCHAR2(4000),
  "endReading" VARCHAR2(4000),
  "totalConsumption" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "notes" CLOB,
  "hasAlert" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_ElectricityManagement_Records_id" ON "ElectricityManagement_Records" ("id");
CREATE INDEX "ix_ElectricityManagement_Records_createdAt" ON "ElectricityManagement_Records" ("createdAt");
CREATE INDEX "ix_ElectricityManagement_Records_date" ON "ElectricityManagement_Records" ("date");

CREATE TABLE "GasManagement_Records" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "monthYear" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "source" VARCHAR2(4000),
  "startReading" VARCHAR2(4000),
  "endReading" VARCHAR2(4000),
  "totalConsumption" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "notes" CLOB,
  "hasAlert" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_GasManagement_Records_id" ON "GasManagement_Records" ("id");
CREATE INDEX "ix_GasManagement_Records_createdAt" ON "GasManagement_Records" ("createdAt");
CREATE INDEX "ix_GasManagement_Records_date" ON "GasManagement_Records" ("date");

CREATE TABLE "WaterManagement_Records" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "monthYear" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "source" VARCHAR2(4000),
  "startReading" VARCHAR2(4000),
  "endReading" VARCHAR2(4000),
  "totalConsumption" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "notes" CLOB,
  "hasAlert" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_WaterManagement_Records_id" ON "WaterManagement_Records" ("id");
CREATE INDEX "ix_WaterManagement_Records_createdAt" ON "WaterManagement_Records" ("createdAt");
CREATE INDEX "ix_WaterManagement_Records_date" ON "WaterManagement_Records" ("date");

CREATE TABLE "EmployeePPEMatrixByCode" (
  "112287.0" VARCHAR2(4000),
  "112287.0_1" VARCHAR2(4000),
  "112287.0_2" VARCHAR2(4000),
  "112425.0" VARCHAR2(4000)
);


CREATE TABLE "WasteManagement_RegularWasteTyp" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_WasteManagement_RegularWasteTyp_id" ON "WasteManagement_RegularWasteTyp" ("id");
CREATE INDEX "ix_WasteManagement_RegularWasteTyp_createdAt" ON "WasteManagement_RegularWasteTyp" ("createdAt");

CREATE TABLE "safetyAlerts" (
  "id" VARCHAR2(4000),
  "alertNumber" VARCHAR2(4000),
  "sequentialNumber" VARCHAR2(4000),
  "incidentId" VARCHAR2(4000),
  "incidentType" VARCHAR2(4000),
  "incidentDate" VARCHAR2(4000),
  "incidentLocation" VARCHAR2(4000),
  "notificationNumber" VARCHAR2(4000),
  "who" VARCHAR2(4000),
  "description" CLOB,
  "facts" VARCHAR2(4000),
  "causes" VARCHAR2(4000),
  "lessonsLearned" VARCHAR2(4000),
  "preventiveMeasures" VARCHAR2(4000),
  "locationImage" CLOB,
  "causesImage" CLOB,
  "preparedBy" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_safetyAlerts_id" ON "safetyAlerts" ("id");
CREATE INDEX "ix_safetyAlerts_createdAt" ON "safetyAlerts" ("createdAt");
CREATE INDEX "ix_safetyAlerts_status" ON "safetyAlerts" ("status");

CREATE TABLE "IssueTracking" (
  "title" VARCHAR2(4000),
  "recordId" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "description" CLOB,
  "priority" VARCHAR2(4000),
  "category" VARCHAR2(4000),
  "module" VARCHAR2(4000),
  "pageUrl" VARCHAR2(4000),
  "userAgent" VARCHAR2(4000),
  "reportedBy" CLOB,
  "status" VARCHAR2(4000),
  "context" VARCHAR2(4000),
  "timeLog" VARCHAR2(4000),
  "solutions" VARCHAR2(4000),
  "comments" CLOB,
  "attachments" CLOB,
  "createdBy" VARCHAR2(4000),
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
  "checkDate" VARCHAR2(4000),
  "inspector" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "gaugeReading" VARCHAR2(4000),
  "sealIntact" VARCHAR2(4000),
  "remarks" VARCHAR2(4000),
  "actions" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB,
  "hoseCondition" VARCHAR2(4000),
  "bodyCondition" CLOB,
  "weightOrLevel" VARCHAR2(4000),
  "attachments" CLOB,
  "submittedBy" VARCHAR2(4000),
  "submittedAt" VARCHAR2(4000),
  "approvedById" VARCHAR2(4000),
  "approvalStatus" CLOB,
  "approvedBy" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "reviewNotes" CLOB
);

CREATE INDEX "ix_FireEquipmentInspections_id" ON "FireEquipmentInspections" ("id");
CREATE INDEX "ix_FireEquipmentInspections_createdAt" ON "FireEquipmentInspections" ("createdAt");
CREATE INDEX "ix_FireEquipmentInspections_status" ON "FireEquipmentInspections" ("status");

CREATE TABLE "TrainingAnalysisData" (
  "notes" CLOB,
  "goals" VARCHAR2(4000),
  "recommendations" VARCHAR2(4000),
  "targets" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_TrainingAnalysisData_createdAt" ON "TrainingAnalysisData" ("createdAt");

CREATE TABLE "WasteManagement_RegularWasteRec" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "wasteType" VARCHAR2(4000),
  "quantity" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "storageMethod" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_WasteManagement_RegularWasteRec_id" ON "WasteManagement_RegularWasteRec" ("id");
CREATE INDEX "ix_WasteManagement_RegularWasteRec_createdAt" ON "WasteManagement_RegularWasteRec" ("createdAt");
CREATE INDEX "ix_WasteManagement_RegularWasteRec_date" ON "WasteManagement_RegularWasteRec" ("date");

CREATE TABLE "WasteManagement_RegularWasteSal" (
  "id" VARCHAR2(4000),
  "transactionNumber" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "wasteType" VARCHAR2(4000),
  "quantity" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
  "unitPrice" VARCHAR2(4000),
  "totalValue" VARCHAR2(4000),
  "buyerName" VARCHAR2(4000),
  "paymentMethod" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_WasteManagement_RegularWasteSal_id" ON "WasteManagement_RegularWasteSal" ("id");
CREATE INDEX "ix_WasteManagement_RegularWasteSal_createdAt" ON "WasteManagement_RegularWasteSal" ("createdAt");
CREATE INDEX "ix_WasteManagement_RegularWasteSal_date" ON "WasteManagement_RegularWasteSal" ("date");

CREATE TABLE "WasteManagement_HazardousWasteR" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "wasteType" VARCHAR2(4000),
  "quantity" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
  "hazardClassification" VARCHAR2(4000),
  "storageMethod" VARCHAR2(4000),
  "transportCompany" VARCHAR2(4000),
  "treatmentFacility" VARCHAR2(4000),
  "transportDate" VARCHAR2(4000),
  "documents" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_WasteManagement_HazardousWasteR_id" ON "WasteManagement_HazardousWasteR" ("id");
CREATE INDEX "ix_WasteManagement_HazardousWasteR_createdAt" ON "WasteManagement_HazardousWasteR" ("createdAt");
CREATE INDEX "ix_WasteManagement_HazardousWasteR_date" ON "WasteManagement_HazardousWasteR" ("date");

CREATE TABLE "PTW_MAP_COORDINATES" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "latitude" VARCHAR2(4000),
  "longitude" VARCHAR2(4000),
  "zoom" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_PTW_MAP_COORDINATES_id" ON "PTW_MAP_COORDINATES" ("id");
CREATE INDEX "ix_PTW_MAP_COORDINATES_createdAt" ON "PTW_MAP_COORDINATES" ("createdAt");

CREATE TABLE "PTW_DEFAULT_COORDINATES" (
  "latitude" VARCHAR2(4000),
  "longitude" VARCHAR2(4000),
  "zoom" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);


CREATE TABLE "ClinicContractorVisits" (
  "id" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "contractorWorkerName" VARCHAR2(4000),
  "contractorPosition" VARCHAR2(4000),
  "externalName" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "workArea" VARCHAR2(4000),
  "visitDate" VARCHAR2(4000),
  "exitDate" VARCHAR2(4000),
  "reason" VARCHAR2(4000),
  "diagnosis" VARCHAR2(4000),
  "treatment" VARCHAR2(4000),
  "medicationsDispensed" VARCHAR2(4000),
  "medicationsDispensedQty" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "visitType" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicContractorVisits_id" ON "ClinicContractorVisits" ("id");
CREATE INDEX "ix_ClinicContractorVisits_createdAt" ON "ClinicContractorVisits" ("createdAt");

CREATE TABLE "ClinicVisits" (
  "id" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "contractorWorkerName" VARCHAR2(4000),
  "externalName" VARCHAR2(4000),
  "employeePosition" VARCHAR2(4000),
  "contractorPosition" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "employeeLocation" VARCHAR2(4000),
  "workArea" VARCHAR2(4000),
  "visitDate" VARCHAR2(4000),
  "exitDate" VARCHAR2(4000),
  "reason" VARCHAR2(4000),
  "diagnosis" VARCHAR2(4000),
  "treatment" VARCHAR2(4000),
  "medications" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "medicationsDispensed" VARCHAR2(4000),
  "medicationsDispensedQty" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "visitType" VARCHAR2(4000)
);

CREATE INDEX "ix_ClinicVisits_id" ON "ClinicVisits" ("id");
CREATE INDEX "ix_ClinicVisits_createdAt" ON "ClinicVisits" ("createdAt");

CREATE TABLE "ClinicVisitDeletionRequests" (
  "visitId" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "requestedById" VARCHAR2(4000),
  "requestedByName" VARCHAR2(4000),
  "visitData" CLOB,
  "requestedBy" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "visitDataJSON" CLOB,
  "requestedByJSON" CLOB,
  "createdAt" VARCHAR2(4000),
  "approvedById" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "approvedByJSON" CLOB,
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_ClinicVisitDeletionRequests_id" ON "ClinicVisitDeletionRequests" ("id");
CREATE INDEX "ix_ClinicVisitDeletionRequests_createdAt" ON "ClinicVisitDeletionRequests" ("createdAt");
CREATE INDEX "ix_ClinicVisitDeletionRequests_status" ON "ClinicVisitDeletionRequests" ("status");

CREATE TABLE "Chemical_Register" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "rmName" VARCHAR2(4000),
  "physicalShape" VARCHAR2(4000),
  "purposeOfUse" VARCHAR2(4000),
  "methodOfApplication" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "msdsArabicUrl" VARCHAR2(4000),
  "msdsEnglishUrl" VARCHAR2(4000),
  "localImport" VARCHAR2(4000),
  "manufacturer" VARCHAR2(4000),
  "agentInEgypt" VARCHAR2(4000),
  "containerType" VARCHAR2(4000),
  "containerDisposalMethod" VARCHAR2(4000),
  "hazardClass" VARCHAR2(4000),
  "hazardDescription" CLOB,
  "locationStore" VARCHAR2(4000),
  "qtyPerYear" VARCHAR2(4000),
  "isHazardous" VARCHAR2(4000),
  "nfpaHealth" VARCHAR2(4000),
  "nfpaFire" VARCHAR2(4000),
  "nfpaReactivity" VARCHAR2(4000),
  "nfpaSpecific" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "agentEgypt" VARCHAR2(4000),
  "qtyYear" VARCHAR2(4000),
  "nfpaDiamond" VARCHAR2(4000),
  "sds" VARCHAR2(4000)
);

CREATE INDEX "ix_Chemical_Register_id" ON "Chemical_Register" ("id");
CREATE INDEX "ix_Chemical_Register_createdAt" ON "Chemical_Register" ("createdAt");
CREATE INDEX "ix_Chemical_Register_status" ON "Chemical_Register" ("status");

CREATE TABLE "PPE" (
  "id" VARCHAR2(4000),
  "receiptNumber" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "equipmentType" CLOB,
  "quantity" VARCHAR2(4000),
  "receiptDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "employeePosition" VARCHAR2(4000),
  "employeeBranch" VARCHAR2(4000),
  "employeeLocation" VARCHAR2(4000),
  "notes" CLOB,
  "userData" CLOB,
  "shoeSize" VARCHAR2(4000),
  "recordedBy" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdByUser" VARCHAR2(4000),
  "column_22" VARCHAR2(4000),
  "column_23" VARCHAR2(4000),
  "column_24" VARCHAR2(4000),
  "column_25" VARCHAR2(4000),
  "column_26" VARCHAR2(4000)
);

CREATE INDEX "ix_PPE_id" ON "PPE" ("id");
CREATE INDEX "ix_PPE_createdAt" ON "PPE" ("createdAt");
CREATE INDEX "ix_PPE_status" ON "PPE" ("status");

CREATE TABLE "PPE_Stock" (
  "itemId" VARCHAR2(4000),
  "itemCode" VARCHAR2(4000),
  "itemName" VARCHAR2(4000),
  "category" VARCHAR2(4000),
  "stock_IN" VARCHAR2(4000),
  "stock_OUT" VARCHAR2(4000),
  "balance" VARCHAR2(4000),
  "minThreshold" VARCHAR2(4000),
  "supplier" VARCHAR2(4000),
  "lastUpdate" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_PPE_Stock_createdAt" ON "PPE_Stock" ("createdAt");

CREATE TABLE "PPE_Transactions" (
  "id" VARCHAR2(4000),
  "itemId" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "action" VARCHAR2(4000),
  "quantity" VARCHAR2(4000),
  "issuedTo" VARCHAR2(4000),
  "remarks" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "userData" CLOB,
  "itemName" VARCHAR2(4000),
  "relatedReceiptId" VARCHAR2(4000),
  "notes" CLOB,
  "source" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000)
);

CREATE INDEX "ix_PPE_Transactions_id" ON "PPE_Transactions" ("id");
CREATE INDEX "ix_PPE_Transactions_createdAt" ON "PPE_Transactions" ("createdAt");
CREATE INDEX "ix_PPE_Transactions_date" ON "PPE_Transactions" ("date");

CREATE TABLE "Training" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "trainingType" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "locationName" VARCHAR2(4000),
  "trainer" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "startTime" VARCHAR2(4000),
  "endTime" VARCHAR2(4000),
  "hours" VARCHAR2(4000),
  "startDate" VARCHAR2(4000),
  "participants" VARCHAR2(4000),
  "participantsCount" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "topics" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000)
);

CREATE INDEX "ix_Training_id" ON "Training" ("id");
CREATE INDEX "ix_Training_createdAt" ON "Training" ("createdAt");
CREATE INDEX "ix_Training_date" ON "Training" ("date");
CREATE INDEX "ix_Training_status" ON "Training" ("status");

CREATE TABLE "TrainingAttendance" (
  "id" VARCHAR2(4000),
  "trainingId" VARCHAR2(4000),
  "trainingType" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "position" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "topic" VARCHAR2(4000),
  "trainer" VARCHAR2(4000),
  "startTime" VARCHAR2(4000),
  "endTime" VARCHAR2(4000),
  "totalHours" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000),
  "column_19" VARCHAR2(4000),
  "column_20" VARCHAR2(4000),
  "column_21" VARCHAR2(4000),
  "column_22" VARCHAR2(4000),
  "column_23" VARCHAR2(4000),
  "column_24" VARCHAR2(4000),
  "column_25" VARCHAR2(4000),
  "column_26" VARCHAR2(4000)
);

CREATE INDEX "ix_TrainingAttendance_id" ON "TrainingAttendance" ("id");
CREATE INDEX "ix_TrainingAttendance_createdAt" ON "TrainingAttendance" ("createdAt");
CREATE INDEX "ix_TrainingAttendance_date" ON "TrainingAttendance" ("date");

CREATE TABLE "ContractorTrainings" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "topic" VARCHAR2(4000),
  "trainer" VARCHAR2(4000),
  "traineesCount" VARCHAR2(4000),
  "fromTime" VARCHAR2(4000),
  "toTime" VARCHAR2(4000),
  "durationMinutes" VARCHAR2(4000),
  "totalHours" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "locationId" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "trainingName" VARCHAR2(4000),
  "participants" VARCHAR2(4000),
  "topics" VARCHAR2(4000),
  "startTime" VARCHAR2(4000),
  "endTime" VARCHAR2(4000),
  "status" VARCHAR2(4000)
);

CREATE INDEX "ix_ContractorTrainings_id" ON "ContractorTrainings" ("id");
CREATE INDEX "ix_ContractorTrainings_createdAt" ON "ContractorTrainings" ("createdAt");
CREATE INDEX "ix_ContractorTrainings_date" ON "ContractorTrainings" ("date");
CREATE INDEX "ix_ContractorTrainings_status" ON "ContractorTrainings" ("status");

CREATE TABLE "ContractorDeletionRequests" (
  "id" VARCHAR2(4000),
  "requestType" VARCHAR2(4000),
  "entityId" VARCHAR2(4000),
  "reason" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "approvedByName" VARCHAR2(4000),
  "rejectedAt" VARCHAR2(4000),
  "rejectedBy" VARCHAR2(4000),
  "rejectedByName" VARCHAR2(4000),
  "rejectionReason" VARCHAR2(4000)
);

CREATE INDEX "ix_ContractorDeletionRequests_id" ON "ContractorDeletionRequests" ("id");
CREATE INDEX "ix_ContractorDeletionRequests_createdAt" ON "ContractorDeletionRequests" ("createdAt");
CREATE INDEX "ix_ContractorDeletionRequests_status" ON "ContractorDeletionRequests" ("status");

CREATE TABLE "BackupLog" (
  "id" VARCHAR2(4000),
  "backupType" VARCHAR2(4000),
  "backupName" VARCHAR2(4000),
  "fileId" VARCHAR2(4000),
  "fileUrl" VARCHAR2(4000),
  "fileName" VARCHAR2(4000),
  "fileSize" VARCHAR2(4000),
  "fileSizeFormatted" VARCHAR2(4000),
  "sheetsCount" VARCHAR2(4000),
  "totalRecords" VARCHAR2(4000),
  "sheetsDetails" CLOB,
  "sourceSpreadsheetId" VARCHAR2(4000),
  "sourceSpreadsheetName" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "duration" VARCHAR2(4000),
  "errorMessage" CLOB,
  "restoredFromBackupId" VARCHAR2(4000),
  "restoredSheets" VARCHAR2(4000),
  "errors" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_BackupLog_id" ON "BackupLog" ("id");
CREATE INDEX "ix_BackupLog_createdAt" ON "BackupLog" ("createdAt");
CREATE INDEX "ix_BackupLog_status" ON "BackupLog" ("status");

CREATE TABLE "BackupSettings" (
  "id" VARCHAR2(4000),
  "autoBackupEnabled" VARCHAR2(4000),
  "backupTimes" VARCHAR2(4000),
  "maxBackupFiles" VARCHAR2(4000),
  "backupFolderName" VARCHAR2(4000),
  "retentionDays" VARCHAR2(4000),
  "notifyOnBackup" VARCHAR2(4000),
  "notifyOnFailure" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "updatedById" VARCHAR2(4000)
);

CREATE INDEX "ix_BackupSettings_id" ON "BackupSettings" ("id");

CREATE TABLE "Blacklist_Register" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "locationId" VARCHAR2(4000),
  "fullName" VARCHAR2(4000),
  "idNumber" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "photo" CLOB,
  "job" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "banReason" VARCHAR2(4000),
  "banDate" VARCHAR2(4000),
  "bannedBy" VARCHAR2(4000),
  "editor" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdAt_1" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "contractor" VARCHAR2(4000)
);

CREATE INDEX "ix_Blacklist_Register_id" ON "Blacklist_Register" ("id");
CREATE INDEX "ix_Blacklist_Register_createdAt" ON "Blacklist_Register" ("createdAt");

CREATE TABLE "IncidentsRegistry" (
  "id" VARCHAR2(4000),
  "sequentialNumber" VARCHAR2(4000),
  "incidentId" VARCHAR2(4000),
  "incidentLocation" VARCHAR2(4000),
  "incidentDate" VARCHAR2(4000),
  "incidentDay" VARCHAR2(4000),
  "incidentTime" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "incidentDetails" CLOB,
  "factory" VARCHAR2(4000),
  "shift" VARCHAR2(4000),
  "employeeJob" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "injuredPart" VARCHAR2(4000),
  "equipmentCause" CLOB,
  "leaveStartDate" VARCHAR2(4000),
  "returnToWorkDate" VARCHAR2(4000),
  "totalLeaveDays" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "incidentType" VARCHAR2(4000),
  "incidentDetailsBrief" CLOB,
  "employeeAffiliation" VARCHAR2(4000),
  "injuryDescription" CLOB,
  "losses" VARCHAR2(4000),
  "actionsTaken" VARCHAR2(4000)
);

CREATE INDEX "ix_IncidentsRegistry_id" ON "IncidentsRegistry" ("id");
CREATE INDEX "ix_IncidentsRegistry_createdAt" ON "IncidentsRegistry" ("createdAt");
CREATE INDEX "ix_IncidentsRegistry_status" ON "IncidentsRegistry" ("status");

CREATE TABLE "ContractorEvaluationApprovalReq" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "evaluationData" CLOB,
  "status" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdByName" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "approvedByName" VARCHAR2(4000),
  "rejectedAt" VARCHAR2(4000),
  "rejectedBy" VARCHAR2(4000),
  "rejectedByName" VARCHAR2(4000),
  "rejectionReason" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "updatedByName" VARCHAR2(4000),
  "legacySource" VARCHAR2(4000)
);

CREATE INDEX "ix_ContractorEvaluationApprovalReq_id" ON "ContractorEvaluationApprovalReq" ("id");
CREATE INDEX "ix_ContractorEvaluationApprovalReq_createdAt" ON "ContractorEvaluationApprovalReq" ("createdAt");
CREATE INDEX "ix_ContractorEvaluationApprovalReq_status" ON "ContractorEvaluationApprovalReq" ("status");

CREATE TABLE "ContractorApprovalRequests" (
  "id" VARCHAR2(4000),
  "requestType" VARCHAR2(4000),
  "companyName" VARCHAR2(4000),
  "serviceType" VARCHAR2(4000),
  "licenseNumber" VARCHAR2(4000),
  "createdByName" VARCHAR2(4000),
  "approvedByName" VARCHAR2(4000),
  "contactPerson" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "notes" CLOB,
  "attachments" CLOB,
  "customFields" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "evaluationData" CLOB,
  "rejectedAt" VARCHAR2(4000),
  "rejectedBy" VARCHAR2(4000),
  "rejectedByName" VARCHAR2(4000),
  "rejectionReason" VARCHAR2(4000),
  "contractorData" CLOB
);

CREATE INDEX "ix_ContractorApprovalRequests_id" ON "ContractorApprovalRequests" ("id");
CREATE INDEX "ix_ContractorApprovalRequests_email" ON "ContractorApprovalRequests" ("email");
CREATE INDEX "ix_ContractorApprovalRequests_createdAt" ON "ContractorApprovalRequests" ("createdAt");
CREATE INDEX "ix_ContractorApprovalRequests_status" ON "ContractorApprovalRequests" ("status");

CREATE TABLE "ApprovedContractors" (
  "id" VARCHAR2(4000),
  "code" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "companyName" VARCHAR2(4000),
  "entityType" VARCHAR2(4000),
  "serviceType" VARCHAR2(4000),
  "licenseNumber" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "approvalDate" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "safetyReviewer" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "column_18" VARCHAR2(4000),
  "column_19" VARCHAR2(4000),
  "column_20" VARCHAR2(4000),
  "column_21" VARCHAR2(4000),
  "column_22" VARCHAR2(4000),
  "column_23" VARCHAR2(4000),
  "column_24" VARCHAR2(4000),
  "column_25" VARCHAR2(4000),
  "column_26" VARCHAR2(4000)
);

CREATE INDEX "ix_ApprovedContractors_id" ON "ApprovedContractors" ("id");
CREATE INDEX "ix_ApprovedContractors_createdAt" ON "ApprovedContractors" ("createdAt");
CREATE INDEX "ix_ApprovedContractors_status" ON "ApprovedContractors" ("status");

CREATE TABLE "ClinicSupplyRequests" (
  "id" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "itemName" VARCHAR2(4000),
  "requestedById" VARCHAR2(4000),
  "requestedByName" VARCHAR2(4000),
  "quantity" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
  "notes" CLOB,
  "priority" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "requestedBy" VARCHAR2(4000),
  "requestDate" VARCHAR2(4000),
  "requestedByJSON" CLOB,
  "rejectedBy" VARCHAR2(4000),
  "rejectedAt" VARCHAR2(4000),
  "rejectionReason" VARCHAR2(4000),
  "rejectedByJSON" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "medicationId" VARCHAR2(4000),
  "currentBalanceAtRequest" VARCHAR2(4000),
  "originalStockAtRequest" VARCHAR2(4000),
  "stockStatusAtRequest" VARCHAR2(4000),
  "medicationExpiryDate" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_ClinicSupplyRequests_id" ON "ClinicSupplyRequests" ("id");
CREATE INDEX "ix_ClinicSupplyRequests_createdAt" ON "ClinicSupplyRequests" ("createdAt");
CREATE INDEX "ix_ClinicSupplyRequests_status" ON "ClinicSupplyRequests" ("status");

CREATE TABLE "Company_Settings" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "secondaryName" VARCHAR2(4000),
  "nameFontSize" VARCHAR2(4000),
  "secondaryNameFontSize" VARCHAR2(4000),
  "secondaryNameColor" VARCHAR2(4000),
  "formVersion" VARCHAR2(4000),
  "address" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "logo" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "postLoginItems" VARCHAR2(4000),
  "clinicMonthlyVisitsAlertThreshold" VARCHAR2(4000),
  "clinicVisitTypes" VARCHAR2(4000),
  "profileTeamsUrl" VARCHAR2(4000),
  "profileWhatsAppUrl" VARCHAR2(4000),
  "ppeEligibilityMonths" VARCHAR2(4000),
  "ppeEligibilityDays" VARCHAR2(4000),
  "ppeEligibilityRules" VARCHAR2(4000),
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
  "requestedBy" VARCHAR2(4000),
  "reason" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "medicationDataJSON" CLOB,
  "requestedByJSON" CLOB,
  "approvedAt" VARCHAR2(4000),
  "approvedByJSON" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "updatedAt_2" VARCHAR2(4000)
);

CREATE INDEX "ix_MedicationDeletionRequests_id" ON "MedicationDeletionRequests" ("id");
CREATE INDEX "ix_MedicationDeletionRequests_createdAt" ON "MedicationDeletionRequests" ("createdAt");
CREATE INDEX "ix_MedicationDeletionRequests_status" ON "MedicationDeletionRequests" ("status");

CREATE TABLE "Form_Sites" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "description" CLOB,
  "isActive" VARCHAR2(4000),
  "sortOrder" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_Form_Sites_id" ON "Form_Sites" ("id");
CREATE INDEX "ix_Form_Sites_createdAt" ON "Form_Sites" ("createdAt");

CREATE TABLE "Form_Places" (
  "id" VARCHAR2(4000),
  "siteId" VARCHAR2(4000),
  "siteName" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "description" CLOB,
  "isActive" VARCHAR2(4000),
  "sortOrder" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_Form_Places_id" ON "Form_Places" ("id");
CREATE INDEX "ix_Form_Places_createdAt" ON "Form_Places" ("createdAt");

CREATE TABLE "Form_Departments" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "description" CLOB,
  "isActive" VARCHAR2(4000),
  "sortOrder" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_Form_Departments_id" ON "Form_Departments" ("id");
CREATE INDEX "ix_Form_Departments_createdAt" ON "Form_Departments" ("createdAt");

CREATE TABLE "Form_SafetyTeam" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "position" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "sortOrder" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_Form_SafetyTeam_id" ON "Form_SafetyTeam" ("id");
CREATE INDEX "ix_Form_SafetyTeam_email" ON "Form_SafetyTeam" ("email");
CREATE INDEX "ix_Form_SafetyTeam_createdAt" ON "Form_SafetyTeam" ("createdAt");

CREATE TABLE "Incidents" (
  "id" VARCHAR2(4000),
  "notificationId" VARCHAR2(4000),
  "notificationNumber" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "siteId" VARCHAR2(4000),
  "siteName" VARCHAR2(4000),
  "sublocationId" VARCHAR2(4000),
  "sublocationName" VARCHAR2(4000),
  "incidentType" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "sublocation" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "description" CLOB,
  "injuries" VARCHAR2(4000),
  "losses" VARCHAR2(4000),
  "initialActions" VARCHAR2(4000),
  "reportedBy" CLOB,
  "status" VARCHAR2(4000),
  "severity" VARCHAR2(4000),
  "rootCause" VARCHAR2(4000),
  "correctiveAction" VARCHAR2(4000),
  "preventiveAction" VARCHAR2(4000),
  "attachments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdBy_1" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "affiliation" VARCHAR2(4000),
  "employeeJob" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "injuryDescription" CLOB,
  "actionsTaken" VARCHAR2(4000),
  "investigation" CLOB,
  "contractorName" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "actionPlan" CLOB,
  "affectedType" VARCHAR2(4000),
  "affectedCode" VARCHAR2(4000),
  "affectedName" VARCHAR2(4000),
  "affectedJobTitle" VARCHAR2(4000),
  "affectedDepartment" VARCHAR2(4000),
  "affectedContact" VARCHAR2(4000),
  "image" CLOB,
  "closureDate" VARCHAR2(4000),
  "actionOwner" VARCHAR2(4000),
  "requiresApproval" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "userData" CLOB,
  "approvedAt" VARCHAR2(4000),
  "employeeAffectedCode" VARCHAR2(4000),
  "injuredPart" VARCHAR2(4000),
  "equipmentCause" CLOB,
  "rejectedBy" VARCHAR2(4000),
  "rejectedAt" VARCHAR2(4000),
  "rejectionReason" VARCHAR2(4000),
  "reporterName" CLOB,
  "reporterCode" CLOB,
  "actions" VARCHAR2(4000)
);

CREATE INDEX "ix_Incidents_id" ON "Incidents" ("id");
CREATE INDEX "ix_Incidents_createdAt" ON "Incidents" ("createdAt");
CREATE INDEX "ix_Incidents_date" ON "Incidents" ("date");
CREATE INDEX "ix_Incidents_status" ON "Incidents" ("status");

CREATE TABLE "NearMiss" (
  "id" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "observerName" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "description" CLOB,
  "correctiveProposed" VARCHAR2(4000),
  "correctiveDescription" CLOB,
  "attachments" CLOB,
  "status" VARCHAR2(4000),
  "reportedBy" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "siteName" VARCHAR2(4000),
  "severity" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "potentialConsequences" VARCHAR2(4000),
  "isAnonymous" VARCHAR2(4000),
  "gpsLocation" VARCHAR2(4000),
  "gpsMapLink" VARCHAR2(4000)
);

CREATE INDEX "ix_NearMiss_id" ON "NearMiss" ("id");
CREATE INDEX "ix_NearMiss_createdAt" ON "NearMiss" ("createdAt");
CREATE INDEX "ix_NearMiss_date" ON "NearMiss" ("date");
CREATE INDEX "ix_NearMiss_status" ON "NearMiss" ("status");

CREATE TABLE "Medications" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "usage" VARCHAR2(4000),
  "purchaseDate" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000),
  "quantityAdded" VARCHAR2(4000),
  "remainingQuantity" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "notes" CLOB,
  "status" VARCHAR2(4000),
  "daysRemaining" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "column_18" VARCHAR2(4000),
  "column_19" VARCHAR2(4000),
  "column_20" VARCHAR2(4000),
  "column_21" VARCHAR2(4000),
  "column_22" VARCHAR2(4000),
  "column_23" VARCHAR2(4000),
  "column_24" VARCHAR2(4000),
  "column_25" VARCHAR2(4000),
  "column_26" VARCHAR2(4000)
);

CREATE INDEX "ix_Medications_id" ON "Medications" ("id");
CREATE INDEX "ix_Medications_createdAt" ON "Medications" ("createdAt");
CREATE INDEX "ix_Medications_status" ON "Medications" ("status");

CREATE TABLE "SickLeave" (
  "id" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "employeePosition" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "reason" VARCHAR2(4000),
  "medicalNotes" CLOB,
  "treatingDoctor" VARCHAR2(4000),
  "startDate" VARCHAR2(4000),
  "endDate" VARCHAR2(4000),
  "daysCount" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "linkedRegistryId" VARCHAR2(4000),
  "sourceType" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_SickLeave_id" ON "SickLeave" ("id");
CREATE INDEX "ix_SickLeave_createdAt" ON "SickLeave" ("createdAt");
CREATE INDEX "ix_SickLeave_status" ON "SickLeave" ("status");

CREATE TABLE "Injuries" (
  "id" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "injuryType" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "injuryDate" VARCHAR2(4000),
  "injuryLocation" VARCHAR2(4000),
  "injuryDescription" CLOB,
  "actionsTaken" VARCHAR2(4000),
  "treatment" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "attachments" CLOB,
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "employeePosition" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "injuryBodyPart" CLOB,
  "contractorName" VARCHAR2(4000),
  "personName" VARCHAR2(4000),
  "contractorPosition" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_Injuries_id" ON "Injuries" ("id");
CREATE INDEX "ix_Injuries_createdAt" ON "Injuries" ("createdAt");
CREATE INDEX "ix_Injuries_status" ON "Injuries" ("status");

CREATE TABLE "Violations" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "employeeId" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "violationTypeId" VARCHAR2(4000),
  "violationType" VARCHAR2(4000),
  "employeePosition" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "contractorWorker" VARCHAR2(4000),
  "contractorPosition" VARCHAR2(4000),
  "contractorDepartment" VARCHAR2(4000),
  "violationDate" VARCHAR2(4000),
  "violationTime" VARCHAR2(4000),
  "violationLocation" VARCHAR2(4000),
  "violationPlace" VARCHAR2(4000),
  "severity" VARCHAR2(4000),
  "actionTaken" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "photo" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "personType" VARCHAR2(4000),
  "violationLocationId" VARCHAR2(4000),
  "violationPlaceId" VARCHAR2(4000),
  "violationDetails" CLOB,
  "fineAmount" VARCHAR2(4000),
  "violationSequenceInMonth" VARCHAR2(4000),
  "userData" CLOB,
  "attachments" CLOB
);

CREATE INDEX "ix_Violations_id" ON "Violations" ("id");
CREATE INDEX "ix_Violations_createdAt" ON "Violations" ("createdAt");
CREATE INDEX "ix_Violations_status" ON "Violations" ("status");

CREATE TABLE "DailyObservations" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "siteId" VARCHAR2(4000),
  "siteName" VARCHAR2(4000),
  "placeId" VARCHAR2(4000),
  "locationName" VARCHAR2(4000),
  "observationType" VARCHAR2(4000),
  "observerName" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "shift" VARCHAR2(4000),
  "details" CLOB,
  "correctiveAction" VARCHAR2(4000),
  "responsibleDepartment" VARCHAR2(4000),
  "riskLevel" VARCHAR2(4000),
  "expectedCompletionDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "overdays" VARCHAR2(4000),
  "timestamp" VARCHAR2(4000),
  "reviewedBy" VARCHAR2(4000),
  "remarks" VARCHAR2(4000),
  "attachments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "timeLog" VARCHAR2(4000),
  "updates" CLOB,
  "comments" CLOB,
  "workflowStage" VARCHAR2(4000),
  "specialistReviewedBy" VARCHAR2(4000),
  "specialistReviewedAt" VARCHAR2(4000),
  "specialistComments" CLOB,
  "managerApprovedBy" VARCHAR2(4000),
  "managerApprovedAt" VARCHAR2(4000),
  "managerComments" CLOB,
  "departmentActionBy" VARCHAR2(4000),
  "departmentActionAt" VARCHAR2(4000),
  "rejectionReason" VARCHAR2(4000),
  "assignedToName" VARCHAR2(4000),
  "assignedToEmail" VARCHAR2(4000),
  "afterExecutionImages" CLOB,
  "updatedBy" VARCHAR2(4000),
  "submittedBy" VARCHAR2(4000),
  "submittedByEmail" VARCHAR2(4000),
  "submittedAt" VARCHAR2(4000),
  "subCategory" VARCHAR2(4000),
  "gpsCoordinates" VARCHAR2(4000),
  "gpsAccuracy" VARCHAR2(4000),
  "mapsUrl" VARCHAR2(4000)
);

CREATE INDEX "ix_DailyObservations_id" ON "DailyObservations" ("id");
CREATE INDEX "ix_DailyObservations_createdAt" ON "DailyObservations" ("createdAt");
CREATE INDEX "ix_DailyObservations_date" ON "DailyObservations" ("date");
CREATE INDEX "ix_DailyObservations_status" ON "DailyObservations" ("status");

CREATE TABLE "ISODocuments" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "version" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "revisionDate" VARCHAR2(4000)
);

CREATE INDEX "ix_ISODocuments_id" ON "ISODocuments" ("id");
CREATE INDEX "ix_ISODocuments_createdAt" ON "ISODocuments" ("createdAt");

CREATE TABLE "ISOProcedures" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "version" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ISOProcedures_id" ON "ISOProcedures" ("id");
CREATE INDEX "ix_ISOProcedures_createdAt" ON "ISOProcedures" ("createdAt");

CREATE TABLE "ISOForms" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "version" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "revisionDate" VARCHAR2(4000)
);

CREATE INDEX "ix_ISOForms_id" ON "ISOForms" ("id");
CREATE INDEX "ix_ISOForms_createdAt" ON "ISOForms" ("createdAt");

CREATE TABLE "SOPJHA" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "version" VARCHAR2(4000),
  "procedures" VARCHAR2(4000),
  "hazards" VARCHAR2(4000),
  "requiredPPE" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SOPJHA_id" ON "SOPJHA" ("id");
CREATE INDEX "ix_SOPJHA_createdAt" ON "SOPJHA" ("createdAt");
CREATE INDEX "ix_SOPJHA_status" ON "SOPJHA" ("status");

CREATE TABLE "RiskAssessments" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "activity" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "riskLevel" VARCHAR2(4000),
  "correctiveActions" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_RiskAssessments_id" ON "RiskAssessments" ("id");
CREATE INDEX "ix_RiskAssessments_createdAt" ON "RiskAssessments" ("createdAt");
CREATE INDEX "ix_RiskAssessments_date" ON "RiskAssessments" ("date");
CREATE INDEX "ix_RiskAssessments_status" ON "RiskAssessments" ("status");

CREATE TABLE "LegalDocuments" (
  "id" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "documentName" VARCHAR2(4000),
  "documentType" VARCHAR2(4000),
  "documentNumber" VARCHAR2(4000),
  "issuedBy" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000),
  "alertDays" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "description" CLOB,
  "documentLink" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "column_15" VARCHAR2(4000)
);

CREATE INDEX "ix_LegalDocuments_id" ON "LegalDocuments" ("id");
CREATE INDEX "ix_LegalDocuments_createdAt" ON "LegalDocuments" ("createdAt");
CREATE INDEX "ix_LegalDocuments_status" ON "LegalDocuments" ("status");

CREATE TABLE "HSEAudits" (
  "id" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "auditor" VARCHAR2(4000),
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
  "responsible" VARCHAR2(4000),
  "dueDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_HSECorrectiveActions_id" ON "HSECorrectiveActions" ("id");
CREATE INDEX "ix_HSECorrectiveActions_createdAt" ON "HSECorrectiveActions" ("createdAt");
CREATE INDEX "ix_HSECorrectiveActions_status" ON "HSECorrectiveActions" ("status");

CREATE TABLE "HSEObjectives" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "description" CLOB,
  "dueDate" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_HSEObjectives_id" ON "HSEObjectives" ("id");
CREATE INDEX "ix_HSEObjectives_createdAt" ON "HSEObjectives" ("createdAt");
CREATE INDEX "ix_HSEObjectives_status" ON "HSEObjectives" ("status");

CREATE TABLE "HSERiskAssessments" (
  "id" VARCHAR2(4000),
  "activity" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "riskLevel" VARCHAR2(4000),
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
  "name" VARCHAR2(4000),
  "description" CLOB,
  "impact" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_EnvironmentalAspects_id" ON "EnvironmentalAspects" ("id");
CREATE INDEX "ix_EnvironmentalAspects_createdAt" ON "EnvironmentalAspects" ("createdAt");

CREATE TABLE "EnvironmentalMonitoring" (
  "id" VARCHAR2(4000),
  "aspect" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "value" VARCHAR2(4000),
  "unit" VARCHAR2(4000),
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
  "name" VARCHAR2(4000),
  "description" CLOB,
  "startDate" VARCHAR2(4000),
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
  "source" VARCHAR2(4000),
  "co2Equivalent" VARCHAR2(4000),
  "description" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_CarbonFootprint_id" ON "CarbonFootprint" ("id");
CREATE INDEX "ix_CarbonFootprint_createdAt" ON "CarbonFootprint" ("createdAt");
CREATE INDEX "ix_CarbonFootprint_date" ON "CarbonFootprint" ("date");

CREATE TABLE "PeriodicInspections" (
  "id" VARCHAR2(4000),
  "inspectionType" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "inspector" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "findings" VARCHAR2(4000),
  "recommendations" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "templateId" CLOB,
  "assetCode" VARCHAR2(4000),
  "factoryId" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "subLocationId" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "inspectionNumber" VARCHAR2(4000),
  "category" VARCHAR2(4000),
  "inspectionDate" VARCHAR2(4000),
  "result" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "notes" CLOB,
  "correctiveActions" VARCHAR2(4000),
  "checklistResults" CLOB,
  "userData" CLOB
);

CREATE INDEX "ix_PeriodicInspections_id" ON "PeriodicInspections" ("id");
CREATE INDEX "ix_PeriodicInspections_createdAt" ON "PeriodicInspections" ("createdAt");
CREATE INDEX "ix_PeriodicInspections_date" ON "PeriodicInspections" ("date");
CREATE INDEX "ix_PeriodicInspections_status" ON "PeriodicInspections" ("status");

CREATE TABLE "PeriodicInspectionCategories" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "description" CLOB,
  "frequency" VARCHAR2(4000),
  "isDefault" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionCategories_id" ON "PeriodicInspectionCategories" ("id");
CREATE INDEX "ix_PeriodicInspectionCategories_createdAt" ON "PeriodicInspectionCategories" ("createdAt");

CREATE TABLE "PeriodicInspectionChecklists" (
  "id" VARCHAR2(4000),
  "categoryId" VARCHAR2(4000),
  "categoryName" VARCHAR2(4000),
  "items" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionChecklists_id" ON "PeriodicInspectionChecklists" ("id");
CREATE INDEX "ix_PeriodicInspectionChecklists_createdAt" ON "PeriodicInspectionChecklists" ("createdAt");

CREATE TABLE "PeriodicInspectionSchedules" (
  "id" VARCHAR2(4000),
  "categoryId" VARCHAR2(4000),
  "categoryName" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "scheduledDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "assignedTo" VARCHAR2(4000),
  "frequency" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionSchedules_id" ON "PeriodicInspectionSchedules" ("id");
CREATE INDEX "ix_PeriodicInspectionSchedules_createdAt" ON "PeriodicInspectionSchedules" ("createdAt");
CREATE INDEX "ix_PeriodicInspectionSchedules_status" ON "PeriodicInspectionSchedules" ("status");

CREATE TABLE "PeriodicInspectionRecords" (
  "id" VARCHAR2(4000),
  "categoryId" VARCHAR2(4000),
  "categoryName" VARCHAR2(4000),
  "assetCode" VARCHAR2(4000),
  "internalCode" VARCHAR2(4000),
  "correctiveActionId" VARCHAR2(4000),
  "scheduleId" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "supervisor" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "notes" CLOB,
  "result" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "correctiveActionSummary" VARCHAR2(4000),
  "attachments" CLOB,
  "checklistResults" CLOB,
  "nextDueDate" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_PeriodicInspectionRecords_id" ON "PeriodicInspectionRecords" ("id");
CREATE INDEX "ix_PeriodicInspectionRecords_createdAt" ON "PeriodicInspectionRecords" ("createdAt");
CREATE INDEX "ix_PeriodicInspectionRecords_date" ON "PeriodicInspectionRecords" ("date");
CREATE INDEX "ix_PeriodicInspectionRecords_status" ON "PeriodicInspectionRecords" ("status");

CREATE TABLE "SafetyBudget" (
  "id" VARCHAR2(4000),
  "category" VARCHAR2(4000),
  "description" CLOB,
  "amount" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyBudget_id" ON "SafetyBudget" ("id");
CREATE INDEX "ix_SafetyBudget_createdAt" ON "SafetyBudget" ("createdAt");
CREATE INDEX "ix_SafetyBudget_date" ON "SafetyBudget" ("date");
CREATE INDEX "ix_SafetyBudget_status" ON "SafetyBudget" ("status");

CREATE TABLE "SafetyBudgets" (
  "id" VARCHAR2(4000),
  "year" VARCHAR2(4000),
  "budgetAmount" VARCHAR2(4000),
  "allocatedAmount" VARCHAR2(4000),
  "spentAmount" VARCHAR2(4000),
  "remainingAmount" VARCHAR2(4000),
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
  "category" VARCHAR2(4000),
  "description" CLOB,
  "amount" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "invoiceNumber" VARCHAR2(4000),
  "vendor" VARCHAR2(4000),
  "currency" VARCHAR2(4000),
  "attachments" CLOB
);

CREATE INDEX "ix_SafetyBudgetTransactions_id" ON "SafetyBudgetTransactions" ("id");
CREATE INDEX "ix_SafetyBudgetTransactions_createdAt" ON "SafetyBudgetTransactions" ("createdAt");
CREATE INDEX "ix_SafetyBudgetTransactions_date" ON "SafetyBudgetTransactions" ("date");
CREATE INDEX "ix_SafetyBudgetTransactions_status" ON "SafetyBudgetTransactions" ("status");

CREATE TABLE "SafetyPerformanceKPIs" (
  "id" VARCHAR2(4000),
  "kpiName" VARCHAR2(4000),
  "target" VARCHAR2(4000),
  "actual" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "recordType" VARCHAR2(4000),
  "year" VARCHAR2(4000),
  "month" VARCHAR2(4000),
  "hoursWorked" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "neboshStatus" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyPerformanceKPIs_id" ON "SafetyPerformanceKPIs" ("id");
CREATE INDEX "ix_SafetyPerformanceKPIs_createdAt" ON "SafetyPerformanceKPIs" ("createdAt");
CREATE INDEX "ix_SafetyPerformanceKPIs_date" ON "SafetyPerformanceKPIs" ("date");
CREATE INDEX "ix_SafetyPerformanceKPIs_status" ON "SafetyPerformanceKPIs" ("status");

CREATE TABLE "ActionTrackingRegister" (
  "id" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "typeOfIssue" VARCHAR2(4000),
  "observerName" VARCHAR2(4000),
  "sourceId" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "observationClassification" VARCHAR2(4000),
  "observationIssueHazard" VARCHAR2(4000),
  "correctivePreventiveAction" VARCHAR2(4000),
  "rootCause" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "riskRating" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "originalTargetDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "shift" VARCHAR2(4000),
  "sourceModule" VARCHAR2(4000),
  "sourceData" CLOB,
  "timeLog" VARCHAR2(4000),
  "updates" CLOB,
  "comments" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "createdBy_1" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "actionType" VARCHAR2(4000),
  "description" CLOB,
  "hazardDescription" CLOB,
  "site" VARCHAR2(4000),
  "responsibleDepartment" VARCHAR2(4000),
  "assignedTo" VARCHAR2(4000),
  "priority" VARCHAR2(4000),
  "dueDate" VARCHAR2(4000)
);

CREATE INDEX "ix_ActionTrackingRegister_id" ON "ActionTrackingRegister" ("id");
CREATE INDEX "ix_ActionTrackingRegister_createdAt" ON "ActionTrackingRegister" ("createdAt");
CREATE INDEX "ix_ActionTrackingRegister_status" ON "ActionTrackingRegister" ("status");

CREATE TABLE "Budget" (
  "id" VARCHAR2(4000),
  "category" VARCHAR2(4000),
  "description" CLOB,
  "amount" VARCHAR2(4000),
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
  "name" VARCHAR2(4000),
  "target" VARCHAR2(4000),
  "actual" VARCHAR2(4000),
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
  "title" VARCHAR2(4000),
  "description" CLOB,
  "severity" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "timeline" VARCHAR2(4000),
  "assignedTeams" VARCHAR2(4000),
  "channels" VARCHAR2(4000),
  "impactArea" VARCHAR2(4000),
  "responseInstructions" VARCHAR2(4000),
  "requiresEvacuation" VARCHAR2(4000),
  "autoEscalateMinutes" VARCHAR2(4000),
  "resolvedAt" VARCHAR2(4000),
  "resolvedBy" VARCHAR2(4000),
  "acknowledgedAt" VARCHAR2(4000),
  "acknowledgedBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdAt_1" VARCHAR2(4000),
  "createdBy_1" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000)
);

CREATE INDEX "ix_EmergencyAlerts_id" ON "EmergencyAlerts" ("id");
CREATE INDEX "ix_EmergencyAlerts_createdAt" ON "EmergencyAlerts" ("createdAt");
CREATE INDEX "ix_EmergencyAlerts_date" ON "EmergencyAlerts" ("date");
CREATE INDEX "ix_EmergencyAlerts_status" ON "EmergencyAlerts" ("status");

CREATE TABLE "EmergencyPlans" (
  "id" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "description" CLOB,
  "procedures" VARCHAR2(4000),
  "responsibleTeam" VARCHAR2(4000),
  "equipment" CLOB,
  "contacts" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "lastReview" VARCHAR2(4000),
  "nextReview" VARCHAR2(4000),
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
  "number" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "qrCodeData" CLOB,
  "siteNumber" VARCHAR2(4000),
  "subLocationName" VARCHAR2(4000),
  "factoryName" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "manufacturer" VARCHAR2(4000),
  "model" VARCHAR2(4000),
  "capacity" VARCHAR2(4000),
  "installationDate" VARCHAR2(4000),
  "lastServiceDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "notes" CLOB,
  "manufacturingYear" VARCHAR2(4000),
  "productionDate" VARCHAR2(4000),
  "installationMethod" VARCHAR2(4000),
  "subLocation" VARCHAR2(4000),
  "factory" VARCHAR2(4000),
  "capacityKg" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "code" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "companyName" VARCHAR2(4000),
  "entityType" VARCHAR2(4000),
  "serviceType" VARCHAR2(4000),
  "licenseNumber" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "approvalDate" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000),
  "safetyReviewer" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_FireEquipmentAssets_id" ON "FireEquipmentAssets" ("id");
CREATE INDEX "ix_FireEquipmentAssets_createdAt" ON "FireEquipmentAssets" ("createdAt");
CREATE INDEX "ix_FireEquipmentAssets_status" ON "FireEquipmentAssets" ("status");

CREATE TABLE "ViolationTypes" (
  "v" VARCHAR2(4000),
  "name" VARCHAR2(4000),
  "description" CLOB,
  "severity" VARCHAR2(4000),
  "category" VARCHAR2(4000),
  "defaultAction" VARCHAR2(4000),
  "isActive" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "isDefault" VARCHAR2(4000),
  "order" VARCHAR2(4000),
  "fineAmount" VARCHAR2(4000),
  "column_14" VARCHAR2(4000),
  "column_15" VARCHAR2(4000),
  "column_16" VARCHAR2(4000),
  "column_17" VARCHAR2(4000),
  "column_18" VARCHAR2(4000),
  "column_19" VARCHAR2(4000),
  "column_20" VARCHAR2(4000),
  "column_21" VARCHAR2(4000),
  "column_22" VARCHAR2(4000),
  "column_23" VARCHAR2(4000),
  "column_24" VARCHAR2(4000),
  "column_25" VARCHAR2(4000),
  "column_26" VARCHAR2(4000)
);

CREATE INDEX "ix_ViolationTypes_id" ON "ViolationTypes" ("id");
CREATE INDEX "ix_ViolationTypes_createdAt" ON "ViolationTypes" ("createdAt");

CREATE TABLE "ContractorEvaluations" (
  "id" VARCHAR2(4000),
  "contractorId" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "evaluatorName" VARCHAR2(4000),
  "projectName" VARCHAR2(4000),
  "isoCode" VARCHAR2(4000),
  "evaluationDate" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "generalNotes" CLOB,
  "items" VARCHAR2(4000),
  "compliantCount" VARCHAR2(4000),
  "totalItems" VARCHAR2(4000),
  "finalScore" VARCHAR2(4000),
  "finalRating" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "createdBy_1" VARCHAR2(4000),
  "updatedBy_1" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "approvedAt" VARCHAR2(4000),
  "approvedBy" VARCHAR2(4000),
  "evaluator" VARCHAR2(4000),
  "score" VARCHAR2(4000),
  "comments" CLOB
);

CREATE INDEX "ix_ContractorEvaluations_id" ON "ContractorEvaluations" ("id");
CREATE INDEX "ix_ContractorEvaluations_createdAt" ON "ContractorEvaluations" ("createdAt");
CREATE INDEX "ix_ContractorEvaluations_status" ON "ContractorEvaluations" ("status");

CREATE TABLE "AuditLog" (
  "id" VARCHAR2(4000),
  "recordId" VARCHAR2(4000),
  "timestamp" VARCHAR2(4000),
  "action" VARCHAR2(4000),
  "module" VARCHAR2(4000),
  "details" CLOB,
  "user" VARCHAR2(4000),
  "timestamp_1" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_AuditLog_id" ON "AuditLog" ("id");
CREATE INDEX "ix_AuditLog_createdAt" ON "AuditLog" ("createdAt");

CREATE TABLE "UserActivityLog" (
  "id" VARCHAR2(4000),
  "username" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "actionType" VARCHAR2(4000),
  "recordId" VARCHAR2(4000),
  "userEmail" VARCHAR2(4000),
  "timestamp" VARCHAR2(4000),
  "module" VARCHAR2(4000),
  "details" CLOB,
  "ipAddress" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "updatedAt_2" VARCHAR2(4000),
  "updatedAt_3" VARCHAR2(4000),
  "loginHistory" CLOB,
  "name" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "passwordHash" VARCHAR2(4000),
  "role" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "active" VARCHAR2(4000),
  "photo" CLOB,
  "permissions" CLOB,
  "lastLogin" VARCHAR2(4000),
  "lastLogout" VARCHAR2(4000),
  "isOnline" VARCHAR2(4000),
  "postLoginPolicySeenAt" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "createdById" VARCHAR2(4000),
  "usage" VARCHAR2(4000),
  "purchaseDate" VARCHAR2(4000),
  "expiryDate" VARCHAR2(4000),
  "quantityAdded" VARCHAR2(4000),
  "remainingQuantity" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "notes" CLOB,
  "status" VARCHAR2(4000),
  "daysRemaining" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "serialNumber" VARCHAR2(4000),
  "typeOfIssue" VARCHAR2(4000),
  "observerName" VARCHAR2(4000),
  "sourceId" VARCHAR2(4000),
  "issueDate" VARCHAR2(4000),
  "observationClassification" VARCHAR2(4000),
  "observationIssueHazard" VARCHAR2(4000),
  "correctivePreventiveAction" VARCHAR2(4000),
  "rootCause" VARCHAR2(4000),
  "riskRating" VARCHAR2(4000),
  "responsible" VARCHAR2(4000),
  "originalTargetDate" VARCHAR2(4000),
  "shift" VARCHAR2(4000),
  "sourceModule" VARCHAR2(4000),
  "sourceData" CLOB,
  "timeLog" VARCHAR2(4000),
  "updates" CLOB,
  "comments" CLOB,
  "sessionId" VARCHAR2(4000),
  "sessionLoginTime" VARCHAR2(4000)
);

CREATE INDEX "ix_UserActivityLog_id" ON "UserActivityLog" ("id");
CREATE INDEX "ix_UserActivityLog_email" ON "UserActivityLog" ("email");
CREATE INDEX "ix_UserActivityLog_createdAt" ON "UserActivityLog" ("createdAt");
CREATE INDEX "ix_UserActivityLog_status" ON "UserActivityLog" ("status");

CREATE TABLE "AIAssistantSettings" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "settings" CLOB,
  "preferences" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_AIAssistantSettings_id" ON "AIAssistantSettings" ("id");
CREATE INDEX "ix_AIAssistantSettings_createdAt" ON "AIAssistantSettings" ("createdAt");

CREATE TABLE "UserAILog" (
  "userId" VARCHAR2(4000),
  "userName" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "query" VARCHAR2(4000),
  "intent" VARCHAR2(4000),
  "module" VARCHAR2(4000),
  "response" VARCHAR2(4000),
  "responseTime" VARCHAR2(4000),
  "timestamp" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_UserAILog_id" ON "UserAILog" ("id");
CREATE INDEX "ix_UserAILog_createdAt" ON "UserAILog" ("createdAt");

CREATE TABLE "AnnualTrainingPlans" (
  "id" VARCHAR2(4000),
  "year" VARCHAR2(4000),
  "plans" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_AnnualTrainingPlans_id" ON "AnnualTrainingPlans" ("id");
CREATE INDEX "ix_AnnualTrainingPlans_createdAt" ON "AnnualTrainingPlans" ("createdAt");
CREATE INDEX "ix_AnnualTrainingPlans_status" ON "AnnualTrainingPlans" ("status");

CREATE TABLE "SafetyTeamMembers" (
  "name" VARCHAR2(4000),
  "jobTitle" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "email" VARCHAR2(4000),
  "phone" VARCHAR2(4000),
  "appointmentDate" VARCHAR2(4000),
  "positionLevel" VARCHAR2(4000),
  "photo" CLOB,
  "status" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdAt_1" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "contactInfo" VARCHAR2(4000),
  "employeeNumber" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamMembers_id" ON "SafetyTeamMembers" ("id");
CREATE INDEX "ix_SafetyTeamMembers_email" ON "SafetyTeamMembers" ("email");
CREATE INDEX "ix_SafetyTeamMembers_createdAt" ON "SafetyTeamMembers" ("createdAt");
CREATE INDEX "ix_SafetyTeamMembers_status" ON "SafetyTeamMembers" ("status");

CREATE TABLE "SafetyOrganizationalStructure" (
  "id" VARCHAR2(4000),
  "position" VARCHAR2(4000),
  "positionLevel" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "memberName" VARCHAR2(4000),
  "parentPositionId" VARCHAR2(4000),
  "order" VARCHAR2(4000),
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
  "jobTitle" VARCHAR2(4000),
  "roleDescription" CLOB,
  "responsibilities" VARCHAR2(4000),
  "tasks" VARCHAR2(4000),
  "workScope" VARCHAR2(4000),
  "requiredQualifications" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyJobDescriptions_id" ON "SafetyJobDescriptions" ("id");
CREATE INDEX "ix_SafetyJobDescriptions_createdAt" ON "SafetyJobDescriptions" ("createdAt");

CREATE TABLE "SafetyTeamKPIs" (
  "memberId" VARCHAR2(4000),
  "incidentsHandledCount" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "period" VARCHAR2(4000),
  "inspectionsCount" VARCHAR2(4000),
  "closedActionsCount" VARCHAR2(4000),
  "observationsCount" VARCHAR2(4000),
  "trainingsCount" VARCHAR2(4000),
  "nearMissCount" VARCHAR2(4000),
  "ptwCount" VARCHAR2(4000),
  "commitmentRate" VARCHAR2(4000),
  "targetInspections" VARCHAR2(4000),
  "targetActionsClosure" VARCHAR2(4000),
  "targetObservations" VARCHAR2(4000),
  "targetTrainings" VARCHAR2(4000),
  "targetCommitment" VARCHAR2(4000),
  "customKPIs" VARCHAR2(4000),
  "calculatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "calculatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamKPIs_id" ON "SafetyTeamKPIs" ("id");
CREATE INDEX "ix_SafetyTeamKPIs_createdAt" ON "SafetyTeamKPIs" ("createdAt");

CREATE TABLE "SafetyTeamPerformanceReports" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "period" VARCHAR2(4000),
  "startDate" VARCHAR2(4000),
  "endDate" VARCHAR2(4000),
  "reportData" CLOB,
  "summary" VARCHAR2(4000),
  "generatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamPerformanceReports_id" ON "SafetyTeamPerformanceReports" ("id");
CREATE INDEX "ix_SafetyTeamPerformanceReports_createdAt" ON "SafetyTeamPerformanceReports" ("createdAt");

CREATE TABLE "SafetyTeamAttendance" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "date" VARCHAR2(4000),
  "checkIn" VARCHAR2(4000),
  "checkOut" VARCHAR2(4000),
  "workDuration" VARCHAR2(4000),
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
  "leaveType" VARCHAR2(4000),
  "startDate" VARCHAR2(4000),
  "endDate" VARCHAR2(4000),
  "daysCount" VARCHAR2(4000),
  "reason" VARCHAR2(4000),
  "approvalStatus" CLOB,
  "approvedBy" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamLeaves_id" ON "SafetyTeamLeaves" ("id");
CREATE INDEX "ix_SafetyTeamLeaves_createdAt" ON "SafetyTeamLeaves" ("createdAt");

CREATE TABLE "SafetyHealthManagementSettings" (
  "leaveTypes" VARCHAR2(4000),
  "id" VARCHAR2(4000),
  "attendanceStatuses" VARCHAR2(4000),
  "kpiTargets" VARCHAR2(4000),
  "customKPIs" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyHealthManagementSettings_id" ON "SafetyHealthManagementSettings" ("id");
CREATE INDEX "ix_SafetyHealthManagementSettings_createdAt" ON "SafetyHealthManagementSettings" ("createdAt");

CREATE TABLE "SafetyTeamTasks" (
  "id" VARCHAR2(4000),
  "memberId" VARCHAR2(4000),
  "taskTitle" VARCHAR2(4000),
  "taskDescription" CLOB,
  "taskType" VARCHAR2(4000),
  "priority" VARCHAR2(4000),
  "dueDate" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "assignedBy" VARCHAR2(4000),
  "completedDate" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_SafetyTeamTasks_id" ON "SafetyTeamTasks" ("id");
CREATE INDEX "ix_SafetyTeamTasks_createdAt" ON "SafetyTeamTasks" ("createdAt");
CREATE INDEX "ix_SafetyTeamTasks_status" ON "SafetyTeamTasks" ("status");

CREATE TABLE "ActionTrackingSettings" (
  "id" VARCHAR2(4000),
  "typeOfIssueList" VARCHAR2(4000),
  "typeClassificationMapping" VARCHAR2(4000),
  "classificationList" VARCHAR2(4000),
  "rootCauseList" VARCHAR2(4000),
  "classificationRootCauseMapping" VARCHAR2(4000),
  "statusList" VARCHAR2(4000),
  "riskRatingList" VARCHAR2(4000),
  "departmentList" VARCHAR2(4000),
  "locationList" VARCHAR2(4000),
  "responsibleList" VARCHAR2(4000),
  "shiftList" VARCHAR2(4000),
  "permissions" CLOB,
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ActionTrackingSettings_id" ON "ActionTrackingSettings" ("id");

CREATE TABLE "Violation_Types_DB" (
  "id" VARCHAR2(4000),
  "violationTypes" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000)
);

CREATE INDEX "ix_Violation_Types_DB_id" ON "Violation_Types_DB" ("id");

CREATE TABLE "ModuleManagement" (
  "id" VARCHAR2(4000),
  "moduleId" VARCHAR2(4000),
  "enabled" VARCHAR2(4000),
  "version" VARCHAR2(4000),
  "lastUpdated" VARCHAR2(4000),
  "updatedBy" VARCHAR2(4000),
  "updatedByName" VARCHAR2(4000),
  "notes" CLOB,
  "createdAt" VARCHAR2(4000)
);

CREATE INDEX "ix_ModuleManagement_id" ON "ModuleManagement" ("id");
CREATE INDEX "ix_ModuleManagement_createdAt" ON "ModuleManagement" ("createdAt");

CREATE TABLE "UserTasks" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "taskTitle" VARCHAR2(4000),
  "taskType" VARCHAR2(4000),
  "description" CLOB,
  "taskDescription" CLOB,
  "assignedTo" VARCHAR2(4000),
  "assignedDepartments" VARCHAR2(4000),
  "priority" VARCHAR2(4000),
  "dueDate" VARCHAR2(4000),
  "completionRate" VARCHAR2(4000),
  "userProgress" VARCHAR2(4000),
  "status" VARCHAR2(4000),
  "notes" CLOB,
  "assignedBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "updatedAt_1" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdBy_1" VARCHAR2(4000),
  "assignedBy_1" VARCHAR2(4000),
  "completedDate" VARCHAR2(4000),
  "createdAt_1" VARCHAR2(4000),
  "updatedAt_2" VARCHAR2(4000),
  "createdBy_2" VARCHAR2(4000),
  "createdAt_2" VARCHAR2(4000),
  "updatedAt_3" VARCHAR2(4000),
  "userData" CLOB
);

CREATE INDEX "ix_UserTasks_id" ON "UserTasks" ("id");
CREATE INDEX "ix_UserTasks_createdAt" ON "UserTasks" ("createdAt");
CREATE INDEX "ix_UserTasks_status" ON "UserTasks" ("status");

CREATE TABLE "UserInstructions" (
  "id" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "description" CLOB,
  "content" CLOB,
  "assignedTo" VARCHAR2(4000),
  "assignedDepartments" VARCHAR2(4000),
  "isRead" VARCHAR2(4000),
  "readAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000)
);

CREATE INDEX "ix_UserInstructions_id" ON "UserInstructions" ("id");
CREATE INDEX "ix_UserInstructions_createdAt" ON "UserInstructions" ("createdAt");

CREATE TABLE "Notifications" (
  "id" VARCHAR2(4000),
  "userId" VARCHAR2(4000),
  "type" VARCHAR2(4000),
  "priority" VARCHAR2(4000),
  "title" VARCHAR2(4000),
  "message" CLOB,
  "read" VARCHAR2(4000),
  "readAt" VARCHAR2(4000),
  "relatedId" VARCHAR2(4000),
  "relatedType" VARCHAR2(4000),
  "taskId" VARCHAR2(4000),
  "actionId" VARCHAR2(4000),
  "ptwId" VARCHAR2(4000),
  "scheduleId" VARCHAR2(4000),
  "trainingId" VARCHAR2(4000),
  "dueDate" VARCHAR2(4000),
  "scheduledDate" VARCHAR2(4000),
  "startDate" VARCHAR2(4000),
  "endDate" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "updatedAt" VARCHAR2(4000),
  "link" VARCHAR2(4000),
  "data" CLOB,
  "userEmail" VARCHAR2(4000)
);

CREATE INDEX "ix_Notifications_id" ON "Notifications" ("id");
CREATE INDEX "ix_Notifications_createdAt" ON "Notifications" ("createdAt");

CREATE TABLE "IncidentNotifications" (
  "id" VARCHAR2(4000),
  "notificationNumber" VARCHAR2(4000),
  "siteId" VARCHAR2(4000),
  "siteName" VARCHAR2(4000),
  "sublocationId" VARCHAR2(4000),
  "sublocationName" VARCHAR2(4000),
  "incidentType" VARCHAR2(4000),
  "reporterName" CLOB,
  "reporterCode" CLOB,
  "date" VARCHAR2(4000),
  "location" VARCHAR2(4000),
  "sublocation" VARCHAR2(4000),
  "department" VARCHAR2(4000),
  "description" CLOB,
  "injuries" VARCHAR2(4000),
  "losses" VARCHAR2(4000),
  "actions" VARCHAR2(4000),
  "createdAt" VARCHAR2(4000),
  "createdBy" VARCHAR2(4000),
  "employeeName" VARCHAR2(4000),
  "affiliation" VARCHAR2(4000),
  "employeeJob" VARCHAR2(4000),
  "employeeDepartment" VARCHAR2(4000),
  "injuryDescription" CLOB,
  "updatedAt" VARCHAR2(4000),
  "contractorName" VARCHAR2(4000),
  "employeeCode" VARCHAR2(4000)
);

CREATE INDEX "ix_IncidentNotifications_id" ON "IncidentNotifications" ("id");
CREATE INDEX "ix_IncidentNotifications_createdAt" ON "IncidentNotifications" ("createdAt");
CREATE INDEX "ix_IncidentNotifications_date" ON "IncidentNotifications" ("date");

-- tables: 141