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
        const colDefs = columns.map(col => {
            const colName = `"${col}"`;
            return `${colName} TEXT`;
        });

        // Table creation
        const ddl = `CREATE TABLE IF NOT EXISTS ${tableName} (
            ${colDefs.join(',\n            ')}
        );`;

        try {
            db.exec(ddl);
        } catch (e) {
            console.error(`Failed to create table ${sheetName}:`, e.message);
        }

        // Create index on primary identifier columns if present
        if (columns.includes('id')) {
            try {
                db.exec(`CREATE INDEX IF NOT EXISTS "idx_${sheetName}_id" ON ${tableName} ("id");`);
            } catch (_) {}
        }
        if (columns.includes('userId')) {
            try {
                db.exec(`CREATE INDEX IF NOT EXISTS "idx_${sheetName}_userId" ON ${tableName} ("userId");`);
            } catch (_) {}
        }
        if (columns.includes('createdAt')) {
            try {
                db.exec(`CREATE INDEX IF NOT EXISTS "idx_${sheetName}_createdAt" ON ${tableName} ("createdAt");`);
            } catch (_) {}
        }
    }
}

module.exports = {
    initSchema
};
