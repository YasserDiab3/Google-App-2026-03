/**
 * Schema Initializer - Automatically creates all tables and indexes
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
        const highFrequencyCols = ['id', 'userId', 'createdAt', 'date', 'status', 'riskLevel', 'observerName', 'siteName', 'permitId', 'entryDate', 'responsibleDepartment'];
        for (const col of highFrequencyCols) {
            if (columns.includes(col)) {
                try {
                    db.exec(`CREATE INDEX IF NOT EXISTS "idx_${sheetName}_${col}" ON ${tableName} ("${col}");`);
                } catch (_) {}
            }
        }
    }

    // إضافة فهارس فريدة تمنع تكرار المعرفات في جدول DailyObservations
    try {
        db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS "idx_DailyObservations_id_unique" ON "DailyObservations" ("id") WHERE "id" IS NOT NULL AND "id" != '';`);
        db.exec(`CREATE INDEX IF NOT EXISTS "idx_DailyObservations_iso" ON "DailyObservations" ("isoCode");`);
    } catch (_) {}

    // دفع DDL (CREATE TABLE/INDEX) إلى Turso إن كان المحرك embedded replica
    try { if (db && typeof db.syncNow === 'function') db.syncNow(); } catch (_) {}
}

module.exports = {
    initSchema
};
