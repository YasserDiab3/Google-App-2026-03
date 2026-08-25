/**
 * Parity Engine Test Suite - 100% Contract & Protocol Verification
 */
'use strict';

const assert = require('assert');
const { handleRpcRequest } = require('../src/rpc-router');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');
const { runSeed } = require('../scripts/seed-demo-data');

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

function runParityTests() {
    console.log('🧪 Starting Parity Engine Tests...\n');

    // Reset database with fresh seeds
    const db = getDatabase();
    initSchema(db);
    runSeed();

    const adminUser = { id: 'USR_ADMIN_01', name: 'مدير النظام', role: 'admin', isAdmin: true };
    const normalUser = { id: 'USR_DOC_01', name: 'طبيب العيادة', role: 'doctor' };

    console.log('\n--- 1. Authentication Parity ---');

    test('login with valid credentials returns user payload & session token', () => {
        const res = handleRpcRequest({
            action: 'login',
            data: { email: 'admin@system.local', password: 'admin123' }
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.user);
        assert.strictEqual(res.user.email, 'admin@system.local');
        assert.ok(res.token);
    });

    test('login with invalid password returns structured failure', () => {
        const res = handleRpcRequest({
            action: 'login',
            data: { email: 'admin@system.local', password: 'wrongpassword' }
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'INVALID_CREDENTIALS');
    });

    test('login with non-existent email returns structured failure', () => {
        const res = handleRpcRequest({
            action: 'login',
            data: { email: 'nonexistent@domain.com', password: 'pass' }
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'INVALID_CREDENTIALS');
    });

    console.log('\n--- 2. Generic Sheet CRUD Parity ---');

    test('readFromSheet returns all rows with metadata', () => {
        const res = handleRpcRequest({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            actorUserData: adminUser
        });
        assert.strictEqual(res.success, true);
        assert.strictEqual(res.sheetName, 'Medications');
        assert.ok(Array.isArray(res.data));
        assert.ok(res.data.length >= 3);
    });

    test('batchReadSheets returns dictionary of requested sheets', () => {
        const res = handleRpcRequest({
            action: 'batchReadSheets',
            data: { sheetNames: ['Medications', 'Employees', 'Incidents'] },
            actorUserData: adminUser
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.data.Medications);
        assert.ok(res.data.Employees);
        assert.ok(res.data.Incidents);
    });

    test('appendToSheet adds new row successfully', () => {
        const testId = `INC_TEST_${Date.now()}`;
        const res = handleRpcRequest({
            action: 'appendToSheet',
            data: {
                sheetName: 'Incidents',
                data: {
                    id: testId,
                    title: 'حادث اختباري للتحقق',
                    severity: 'بسيط',
                    status: 'قيد المراجعة'
                }
            },
            actorUserData: adminUser
        });
        assert.strictEqual(res.success, true);

        // Verify row exists
        const check = handleRpcRequest({
            action: 'readFromSheet',
            data: { sheetName: 'Incidents' },
            actorUserData: adminUser
        });
        const found = check.data.find(r => r.id === testId);
        assert.ok(found);
        assert.strictEqual(found.title, 'حادث اختباري للتحقق');
    });

    test('updateRow updates specific record fields', () => {
        const res = handleRpcRequest({
            action: 'updateRow',
            data: {
                sheetName: 'Medications',
                id: 'MED_01',
                data: { notes: 'تم التحديث بواسطة اختبار Parity' }
            },
            actorUserData: adminUser
        });
        assert.strictEqual(res.success, true);

        const check = handleRpcRequest({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            actorUserData: adminUser
        });
        const med = check.data.find(m => m.id === 'MED_01');
        assert.strictEqual(med.notes, 'تم التحديث بواسطة اختبار Parity');
    });

    console.log('\n--- 3. Module Operations Parity ---');

    test('saveClinicVisit records visit and updates medication stock', () => {
        // Read initial stock of MED_01
        const initial = handleRpcRequest({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            actorUserData: adminUser
        });
        const medBefore = initial.data.find(m => m.id === 'MED_01');
        const qtyBefore = parseInt(medBefore.remainingQuantity, 10);

        const visitRes = handleRpcRequest({
            action: 'saveClinicVisit',
            data: {
                personType: 'employee',
                employeeCode: 'EMP1002',
                employeeName: 'كريم عبد العزيز',
                reason: 'فحص دوري',
                medicationsDispensed: medBefore.name,
                medicationsDispensedQty: '5'
            },
            actorUserData: normalUser
        });
        assert.strictEqual(visitRes.success, true);
        assert.ok(visitRes.id);

        // Verify stock reduced by 5
        const after = handleRpcRequest({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            actorUserData: adminUser
        });
        const medAfter = after.data.find(m => m.id === 'MED_01');
        assert.strictEqual(parseInt(medAfter.remainingQuantity, 10), qtyBefore - 5);
    });

    test('savePTW records permit in PTWRegistry', () => {
        const res = handleRpcRequest({
            action: 'savePTW',
            data: {
                workType: 'أعمال ساخنة ولحام',
                location: 'الورشة المركزية',
                status: 'معتمد'
            },
            actorUserData: adminUser
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.id);
    });

    test('saveNearMiss records near miss incident', () => {
        const res = handleRpcRequest({
            action: 'saveNearMiss',
            data: {
                observerName: 'مراقب السلامة',
                location: 'صالة التغليف',
                description: 'كابل مكشوف تم تداركه قبل التعثر'
            }
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.id);
    });

    test('getAllApprovedContractors returns list of approved contractors', () => {
        const res = handleRpcRequest({
            action: 'getAllApprovedContractors'
        });
        assert.strictEqual(res.success, true);
        assert.ok(Array.isArray(res.contractors));
        assert.ok(res.contractors.length > 0);
    });

    console.log(`\n====================================================`);
    console.log(`Parity Tests Summary: ${passedTests}/${totalTests} Passed (${((passedTests/totalTests)*100).toFixed(1)}%)`);
    console.log(`====================================================\n`);

    if (passedTests !== totalTests) {
        process.exit(1);
    }
}

if (require.main === module) {
    runParityTests();
}

module.exports = { runParityTests };
