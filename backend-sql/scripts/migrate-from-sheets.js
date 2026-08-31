/**
 * Data Migration Tool - Migrates data from قاعدة SQL (or JSON Backup) into SQL Database
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');
const { headersMap } = require('../src/db/headers-schema');

/**
 * Migrates data from a local JSON backup file or exported sheets dictionary
 * @param {string|Object} source JSON file path or in-memory dictionary of { SheetName: [rows] }
 */
async function migrateFromData(source) {
    console.log('🔄 Initializing SQL Database for migration...');
    const db = getDatabase();
    initSchema(db);

    let dataToMigrate = {};

    if (typeof source === 'string') {
        if (!fs.existsSync(source)) {
            throw new Error(`Migration source file not found: ${source}`);
        }
        console.log(`📂 Reading backup from: ${source}`);
        const content = fs.readFileSync(source, 'utf8');
        dataToMigrate = JSON.parse(content);
    } else if (typeof source === 'object' && source !== null) {
        dataToMigrate = source;
    } else {
        throw new Error('Invalid migration source provided.');
    }

    console.log('🚀 Starting data import into SQL tables...');
    const startTime = Date.now();
    let totalSheets = 0;
    let totalRecords = 0;

    for (const [sheetName, rows] of Object.entries(dataToMigrate)) {
        if (!Array.isArray(rows) || rows.length === 0) continue;

        // Verify sheet is in headersMap or create table
        if (headersMap[sheetName]) {
            try {
                const count = db.saveToSheet(sheetName, rows);
                console.log(`  ✓ Sheet [${sheetName}]: imported ${rows.length} rows`);
                totalSheets++;
                totalRecords += rows.length;
            } catch (err) {
                console.error(`  ❌ Failed to import [${sheetName}]:`, err.message);
            }
        } else {
            console.log(`  ⚠️ Skipped unknown sheet: ${sheetName}`);
        }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`====================================================`);
    console.log(`✅ Migration complete!`);
    console.log(`📊 Imported: ${totalRecords} records across ${totalSheets} tables`);
    console.log(`⏱️ Duration: ${duration}s`);
    console.log(`====================================================`);

    return { totalSheets, totalRecords, duration };
}

/**
 * Direct Live Migration from خادم SQL Web App via HTTP POST batchReadSheets
 */
async function migrateFromLiveGas(scriptUrl, adminCredentials) {
    if (!scriptUrl) {
        throw new Error('خادم SQL URL is required for live migration.');
    }

    console.log(`🌐 Connecting to خادم SQL at: ${scriptUrl}`);
    const sheetNames = Object.keys(headersMap);

    const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
            action: 'batchReadSheets',
            data: { sheetNames },
            actorUserData: adminCredentials || { role: 'admin', isAdmin: true }
        })
    });

    const result = await response.json();
    if (!result || !result.success || !result.data) {
        throw new Error(`Failed to fetch sheets from live URL: ${result?.message || 'Unknown error'}`);
    }

    return await migrateFromData(result.data);
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const sourceArg = args[0];

    if (!sourceArg) {
        console.log('Usage: node scripts/migrate-from-sheets.js <path-to-json-backup.json>');
        console.log('Or use programmatically via migrateFromData() or migrateFromLiveGas()');
    } else {
        migrateFromData(sourceArg).catch(console.error);
    }
}

module.exports = {
    migrateFromData,
    migrateFromLiveGas
};
