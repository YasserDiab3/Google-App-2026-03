/**
 * Security Guards Test Suite - Asserts RBAC, Gates, and Exception Handling
 */
'use strict';

const assert = require('assert');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');
const { rpc, createTestRunner } = require('./_rpc');
const { runSeed } = require('../scripts/seed-demo-data');

async function runSecurityTests() {
    console.log('🔒 Starting Security & Guard Tests...\n');
    const { test, summary } = createTestRunner();
    const db = getDatabase();
    initSchema(db);
    runSeed();

    const normalUser = { id: 'USR_DOC_01', name: 'طبيب العيادة', role: 'doctor' };

    await test('Null or empty request body is rejected gracefully', async () => {
        const res = await rpc(null);
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'NULL_REQUEST_OBJECT');
    });

    await test('Missing action parameter is rejected with ACTION_REQUIRED', async () => {
        const res = await rpc({ data: {} });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'ACTION_REQUIRED');
    });

    await test('Unrecognized action without actor is rejected before dispatch', async () => {
        const res = await rpc({ action: 'nonExistentHseAction123' });
        assert.strictEqual(res.success, false);
        assert.ok(['ACTION_NOT_RECOGNIZED', 'ACTOR_IDENTITY_REQUIRED'].includes(res.errorCode));
    });

    await test('Unauthenticated user writing to sheet is rejected with ACTOR_IDENTITY_REQUIRED', async () => {
        const res = await rpc({
            action: 'saveToSheet',
            data: { sheetName: 'Incidents', data: [] },
            actorUserData: null
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'ACTOR_IDENTITY_REQUIRED');
    });

    await test('Non-admin user writing to Users table is rejected with STRICT_ADMIN_DENIED', async () => {
        const doc = await rpc({
            action: 'login',
            data: { email: 'doctor@system.local', password: 'doctor123' }
        });
        assert.strictEqual(doc.success, true);
        const res = await rpc({
            action: 'saveToSheet',
            data: { sheetName: 'Users', data: [] },
            actorUserData: doc.user,
            sessionToken: doc.token
        });
        assert.strictEqual(res.success, false);
        assert.ok(
            res.errorCode === 'STRICT_ADMIN_DENIED' || res.errorCode === 'DIRECT_SHEET_WRITE_BLOCKED',
            'expected admin/write block, got ' + res.errorCode
        );
    });

    await test('Non-admin user writing to BackupSettings table is rejected with STRICT_ADMIN_DENIED', async () => {
        const doc = await rpc({
            action: 'login',
            data: { email: 'doctor@system.local', password: 'doctor123' }
        });
        const res = await rpc({
            action: 'saveToSheet',
            data: { sheetName: 'BackupSettings', data: [] },
            actorUserData: doc.user,
            sessionToken: doc.token
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'STRICT_ADMIN_DENIED');
    });

    await test('Non-admin user calling getUsers is rejected with STRICT_ADMIN_DENIED', async () => {
        const doc = await rpc({
            action: 'login',
            data: { email: 'doctor@system.local', password: 'doctor123' }
        });
        const res = await rpc({
            action: 'getUsers',
            actorUserData: doc.user,
            sessionToken: doc.token
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'STRICT_ADMIN_DENIED');
    });

    summary('Security Tests');
}

if (require.main === module) {
    runSecurityTests().catch((err) => {
        console.error(err.message || err);
        process.exit(1);
    });
}

module.exports = { runSecurityTests };
