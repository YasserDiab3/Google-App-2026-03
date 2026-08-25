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
            if (col === 'id' || col === 'Record ID' || col === 'employeeNumber' || col === 'itemId') {
                return `${colName} TEXT`;
            }
            return `${colName} TEXT`;
        });

        // Add auto-incrementing/row order support if needed, plus table creation
        const ddl = `CREATE TABLE IF NOT EXISTS ${tableName} (
            ${colDefs.join(',\n            ')}
        );`;

        db.exec(ddl);

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

    // Initialize Default Admin in Users table if empty
    ensureDefaultAdmin(db);
}

function ensureDefaultAdmin(db = getDatabase()) {
    try {
        const users = db.all('SELECT * FROM "Users" LIMIT 1;');
        if (users.length === 0) {
            // SHA256 for default admin (matches system hashed passwords or standard bcrypt/sha256)
            const now = new Date().toISOString();
            db.insertRow('Users', {
                id: 'USR_ADMIN_01',
                name: 'مدير النظام',
                email: 'admin@system.local',
                passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // sha256 of 'admin'
                role: 'admin',
                department: 'الإدارة العامة والسلامة',
                employeeCode: 'EMP001',
                active: 'true',
                permissions: JSON.stringify(['all']),
                createdAt: now,
                updatedAt: now
            });
        }
    } catch (e) {
        console.error('Error ensuring default admin:', e);
    }
}

module.exports = {
    initSchema,
    ensureDefaultAdmin
};
