/**
 * Schema Initializer - Automatically creates all tables and optimized database indexes
 */
'use strict';

const { headersMap } = require('./headers-schema');
const { getDatabase } = require('./database');

function initSchema(db = getDatabase()) {
    for (const [sheetName, columns] of Object.entries(headersMap)) {
        const tableName = `"${sheetName}"`;
        
        // Determine column DDL definitions
        const colDefs = columns
            .filter((col) => typeof col === 'string' && /^[a-zA-Z0-9_\s\-\/#\(\)\.\&%:\+,أ-ي]+$/.test(col.trim()) && !col.includes('--') && !col.includes(';') && !col.includes('"'))
            .map(col => {
            const colName = `"${col}"`;
            return `${colName} TEXT`;
        });
        if (!colDefs.length) continue;

        // Table creation
        const ddl = `CREATE TABLE IF NOT EXISTS ${tableName} (
            ${colDefs.join(',\n            ')}
        );`;

        try {
            db.exec(ddl);
        } catch (e) {
            console.error(`Failed to create table ${sheetName}:`, e.message);
        }

        // Create index on primary identifier and high-frequency query columns
        const highFrequencyCols = [
            'id', 'userId', 'createdAt', 'date', 'status', 'riskLevel', 
            'observerName', 'siteName', 'permitId', 'entryDate', 'responsibleDepartment',
            'siteId', 'placeId', 'sublocationId', 'visitDate', 'incidentDate', 'violationDate'
        ];
        for (const col of highFrequencyCols) {
            if (columns.includes(col)) {
                try {
                    db.exec(`CREATE INDEX IF NOT EXISTS "idx_${sheetName}_${col}" ON ${tableName} ("${col}");`);
                } catch (_) {}
            }
        }
    }

    // Specialized High-Performance Composite and Covering Indexes
    const specializedIndexes = [
        // DailyObservations
        `CREATE UNIQUE INDEX IF NOT EXISTS "idx_DailyObservations_id_unique" ON "DailyObservations" ("id") WHERE "id" IS NOT NULL AND "id" != '';`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObservations_iso" ON "DailyObservations" ("isoCode");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_site_date" ON "DailyObservations" ("siteId", "date");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_place_date" ON "DailyObservations" ("placeId", "date");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_status" ON "DailyObservations" ("status");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_dept" ON "DailyObservations" ("responsibleDepartment");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_workflow" ON "DailyObservations" ("workflowStage");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_shift" ON "DailyObservations" ("shift");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_site_name" ON "DailyObservations" ("siteName");`,
        `CREATE INDEX IF NOT EXISTS "idx_DailyObs_loc_name" ON "DailyObservations" ("locationName");`,

        // PTW (Permit To Work)
        `CREATE INDEX IF NOT EXISTS "idx_PTW_site_start" ON "PTW" ("siteId", "startDate");`,
        `CREATE INDEX IF NOT EXISTS "idx_PTW_subloc_start" ON "PTW" ("sublocationId", "startDate");`,
        `CREATE INDEX IF NOT EXISTS "idx_PTW_status" ON "PTW" ("status");`,
        `CREATE INDEX IF NOT EXISTS "idx_PTW_workType" ON "PTW" ("workType");`,
        `CREATE INDEX IF NOT EXISTS "idx_PTW_dates" ON "PTW" ("startDate", "endDate");`,
        `CREATE INDEX IF NOT EXISTS "idx_PTW_circuit" ON "PTW" ("approvalCircuitOwnerId");`,
        `CREATE INDEX IF NOT EXISTS "idx_PTW_site_name" ON "PTW" ("siteName");`,
        `CREATE INDEX IF NOT EXISTS "idx_PTW_subloc_name" ON "PTW" ("sublocationName");`,

        // Violations
        `CREATE INDEX IF NOT EXISTS "idx_Violations_loc_date" ON "Violations" ("violationLocationId", "violationDate");`,
        `CREATE INDEX IF NOT EXISTS "idx_Violations_place_date" ON "Violations" ("violationPlaceId", "violationDate");`,
        `CREATE INDEX IF NOT EXISTS "idx_Violations_type" ON "Violations" ("violationTypeId");`,
        `CREATE INDEX IF NOT EXISTS "idx_Violations_loc_name" ON "Violations" ("violationLocation");`,
        `CREATE INDEX IF NOT EXISTS "idx_Violations_place_name" ON "Violations" ("violationPlace");`,

        // GateVisitors
        `CREATE INDEX IF NOT EXISTS "idx_GateVisitors_entryDate" ON "GateVisitors" ("Entry Date");`,
        `CREATE INDEX IF NOT EXISTS "idx_GateVisitors_site" ON "GateVisitors" ("Target Site");`,
        `CREATE INDEX IF NOT EXISTS "idx_GateVisitors_status" ON "GateVisitors" ("Status");`,
        `CREATE INDEX IF NOT EXISTS "idx_GateVisitors_visitor" ON "GateVisitors" ("Visitor Name");`,
        `CREATE INDEX IF NOT EXISTS "idx_GateVisitors_area" ON "GateVisitors" ("Target Hall / Area");`,

        // ClinicVisits
        `CREATE INDEX IF NOT EXISTS "idx_ClinicVisits_date" ON "ClinicVisits" ("visitDate");`,
        `CREATE INDEX IF NOT EXISTS "idx_ClinicVisits_site" ON "ClinicVisits" ("siteId");`,
        `CREATE INDEX IF NOT EXISTS "idx_ClinicVisits_patient" ON "ClinicVisits" ("patientId");`,

        // Incidents
        `CREATE INDEX IF NOT EXISTS "idx_Incidents_date" ON "Incidents" ("incidentDate");`,
        `CREATE INDEX IF NOT EXISTS "idx_Incidents_site" ON "Incidents" ("siteId");`,
        `CREATE INDEX IF NOT EXISTS "idx_Incidents_type" ON "Incidents" ("incidentType");`,

        // Users & Security
        `CREATE INDEX IF NOT EXISTS "idx_Users_email" ON "Users" ("email");`,
        `CREATE INDEX IF NOT EXISTS "idx_Users_role" ON "Users" ("role");`,
        `CREATE INDEX IF NOT EXISTS "idx_Users_active" ON "Users" ("active");`,
        `CREATE INDEX IF NOT EXISTS "idx_UserActivityLog_user_time" ON "UserActivityLog" ("userId", "timestamp");`,
        `CREATE INDEX IF NOT EXISTS "idx_UserActivityLog_module" ON "UserActivityLog" ("module");`,

        // Form Settings Structure
        `CREATE INDEX IF NOT EXISTS "idx_FormSites_id" ON "Form_Sites" ("id");`,
        `CREATE INDEX IF NOT EXISTS "idx_FormSites_name" ON "Form_Sites" ("name");`,
        `CREATE INDEX IF NOT EXISTS "idx_FormPlaces_id" ON "Form_Places" ("id");`,
        `CREATE INDEX IF NOT EXISTS "idx_FormPlaces_siteId" ON "Form_Places" ("siteId");`,
        `CREATE INDEX IF NOT EXISTS "idx_FormPlaces_name" ON "Form_Places" ("name");`,
        `CREATE INDEX IF NOT EXISTS "idx_FormDept_name" ON "Form_Departments" ("name");`,
        `CREATE INDEX IF NOT EXISTS "idx_FormSafety_name" ON "Form_SafetyTeam" ("name");`
    ];

    for (const sql of specializedIndexes) {
        try {
            db.exec(sql);
        } catch (idxErr) {
            // Ignored if table or column doesn't exist
        }
    }

    // دفع DDL (CREATE TABLE/INDEX) إلى Turso إن كان المحرك embedded replica
    try { if (db && typeof db.syncNow === 'function') db.syncNow(); } catch (_) {}
}

module.exports = {
    initSchema
};
