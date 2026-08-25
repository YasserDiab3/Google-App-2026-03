/**
 * Security Guards Test Suite - Asserts RBAC, Gates, and Exception Handling
 */
'use strict';

const assert = require('assert');
const { handleRpcRequest } = require('../src/rpc-router');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
    totalTests++;
    try {
        fn();
        console.log(`  ✓ PASS: ${name}`);
        passedTests++;
    } catch (err) {
        console.error(`  ❌ FAIL: ${name}`);
        console.error(`     Error: ${err.message}`);
    }
}

function runSecurityTests() {
    console.log('🔒 Starting Security & Guard Tests...\n');
    const db = getDatabase();
    initSchema(db);

    const normalUser = { id: 'USR_DOC_01', name: 'طبيب العيادة', role: 'doctor' };

    test('Null or empty request body is rejected gracefully', () => {
        const res = handleRpcRequest(null);
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'NULL_REQUEST_OBJECT');
    });

    test('Missing action parameter is rejected with ACTION_REQUIRED', () => {
        const res = handleRpcRequest({ data: {} });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'ACTION_REQUIRED');
    });

    test('Unrecognized action is rejected with ACTION_NOT_RECOGNIZED', () => {
        const res = handleRpcRequest({ action: 'nonExistentHseAction123' });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'ACTION_NOT_RECOGNIZED');
    });

    test('Unauthenticated user writing to sheet is rejected with ACTOR_IDENTITY_REQUIRED', () => {
        const res = handleRpcRequest({
            action: 'saveToSheet',
            data: { sheetName: 'Incidents', data: [] },
            actorUserData: null
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'ACTOR_IDENTITY_REQUIRED');
    });

    test('Non-admin user writing to Users table is rejected with STRICT_ADMIN_DENIED', () => {
        const res = handleRpcRequest({
            action: 'saveToSheet',
            data: { sheetName: 'Users', data: [] },
            actorUserData: normalUser
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'STRICT_ADMIN_DENIED');
    });

    test('Non-admin user writing to BackupSettings table is rejected with STRICT_ADMIN_DENIED', () => {
        const res = handleRpcRequest({
            action: 'saveToSheet',
            data: { sheetName: 'BackupSettings', data: [] },
            actorUserData: normalUser
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'STRICT_ADMIN_DENIED');
    });

    test('Non-admin user calling getUsers is rejected with STRICT_ADMIN_DENIED', () => {
        const res = handleRpcRequest({
            action: 'getUsers',
            actorUserData: normalUser
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'STRICT_ADMIN_DENIED');
    });

    console.log(`\n====================================================`);
    console.log(`Security Tests Summary: ${passedTests}/${totalTests} Passed (${((passedTests/totalTests)*100).toFixed(1)}%)`);
    console.log(`====================================================\n`);

    if (passedTests !== totalTests) {
        process.exit(1);
    }
}

if (require.main === module) {
    runSecurityTests();
}

module.exports = { runSecurityTests };
