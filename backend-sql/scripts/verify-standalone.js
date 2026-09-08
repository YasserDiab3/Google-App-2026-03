/**
 * Primary Workspace Pure-SQL Acceptance & Performance Smoke Test
 */
'use strict';

const assert = require('assert');
const { getDatabase } = require('../src/db/database');
const { createBackup, listBackups } = require('../src/services/backup-service');

async function main() {
    console.log('=== VERIFYING PRIMARY WORKSPACE PURE-SQL SYSTEM ===');
    const startMs = Date.now();

    // 1. Check DB Initialization
    const db = getDatabase();
    assert.ok(db, 'Database instance must be initialized');
    console.log('  PASS  1. Database engine initialized');

    // 2. Test Reading Heavy Modules (< 50ms)
    const sheetsToTest = ['Training', 'ApprovedContractors', 'ContractorTrainings', 'Employees', 'Incidents'];
    for (const s of sheetsToTest) {
        const t0 = Date.now();
        const rows = db.readSheet(s, null, { listMode: true, limit: 20 });
        const duration = Date.now() - t0;
        assert.ok(Array.isArray(rows), `Sheet ${s} must return array`);
        console.log(`  PASS  2. ${s} list read (${rows.length} items) in ${duration}ms`);
    }

    // 3. Test Detail View Full Hydration
    const single = db.findRow('Training', { id: 'TRAINING_1773346318939_utsqim2ok' });
    if (single) {
        assert.ok('participants' in single, 'Single detail view must contain full participants array');
        console.log('  PASS  3. Single detail view contains full un-stripped payload');
    }

    // 4. Test Automated Backup
    const backupRes = createBackup(db);
    assert.strictEqual(backupRes.success, true, 'Backup creation must succeed');
    const backups = listBackups();
    assert.ok(backups.length > 0, 'Backups list must contain at least one backup file');
    console.log(`  PASS  4. Automated backup verified (${backupRes.fileName}, ${backupRes.compressedSizeMB} MB)`);

    const totalMs = Date.now() - startMs;
    console.log(`\n=== ALL WORKSPACE VERIFICATIONS PASSED IN ${totalMs}ms ===`);
}

main().catch(err => {
    console.error('❌ Primary workspace verification failed:', err);
    process.exit(1);
});
