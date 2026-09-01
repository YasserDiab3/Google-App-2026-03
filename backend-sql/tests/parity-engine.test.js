/**
 * Parity Engine Test Suite - 100% Contract & Protocol Verification
 */
'use strict';

const assert = require('assert');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');
const { runSeed } = require('../scripts/seed-demo-data');
const { rpc, createTestRunner } = require('./_rpc');

async function runParityTests() {
    console.log('🧪 Starting Parity Engine Tests...\n');
    const { test, summary } = createTestRunner();

    const db = getDatabase();
    initSchema(db);
    runSeed();

    const adminUser = { id: 'USR_ADMIN_01', name: 'مدير النظام', role: 'admin', isAdmin: true };
    const normalUser = { id: 'USR_DOC_01', name: 'طبيب العيادة', role: 'doctor' };

    let adminAuth = { actorUserData: adminUser, sessionToken: '' };
    let doctorAuth = { actorUserData: normalUser, sessionToken: '' };

    console.log('\n--- 1. Authentication Parity ---');

    await test('login with valid credentials returns user payload & session token', async () => {
        const res = await rpc({
            action: 'login',
            data: { email: 'admin@system.local', password: 'admin123' }
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.user);
        assert.strictEqual(res.user.email, 'admin@system.local');
        assert.ok(res.token);
        adminAuth = { actorUserData: res.user, sessionToken: res.token };
    });

    await test('login with invalid password returns structured failure', async () => {
        const res = await rpc({
            action: 'login',
            data: { email: 'admin@system.local', password: 'wrongpassword' }
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'INVALID_CREDENTIALS');
    });

    await test('login with non-existent email returns structured failure', async () => {
        const res = await rpc({
            action: 'login',
            data: { email: 'nonexistent@domain.com', password: 'pass' }
        });
        assert.strictEqual(res.success, false);
        assert.strictEqual(res.errorCode, 'INVALID_CREDENTIALS');
    });

    console.log('\n--- 2. Generic Sheet CRUD Parity ---');

    await test('readFromSheet returns all rows with metadata', async () => {
        const res = await rpc({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            ...adminAuth
        });
        assert.strictEqual(res.success, true);
        assert.strictEqual(res.sheetName, 'Medications');
        assert.ok(Array.isArray(res.data));
        assert.ok(res.data.length >= 3);
    });

    await test('batchReadSheets returns dictionary of requested sheets', async () => {
        const res = await rpc({
            action: 'batchReadSheets',
            data: { sheetNames: ['Medications', 'Employees', 'Incidents'] },
            ...adminAuth
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.data.Medications);
        assert.ok(res.data.Employees);
        assert.ok(res.data.Incidents);
    });

    await test('appendToSheet adds new row successfully', async () => {
        const testId = `INC_TEST_${Date.now()}`;
        const res = await rpc({
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
            ...adminAuth
        });
        assert.strictEqual(res.success, true);

        const check = await rpc({
            action: 'readFromSheet',
            data: { sheetName: 'Incidents' },
            ...adminAuth
        });
        const found = check.data.find(r => r.id === testId);
        assert.ok(found);
        assert.strictEqual(found.title, 'حادث اختباري للتحقق');
    });

    await test('updateRow updates specific record fields', async () => {
        const res = await rpc({
            action: 'updateRow',
            data: {
                sheetName: 'Medications',
                id: 'MED_01',
                data: { notes: 'تم التحديث بواسطة اختبار Parity' }
            },
            ...adminAuth
        });
        assert.strictEqual(res.success, true);

        const check = await rpc({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            ...adminAuth
        });
        const med = check.data.find(m => m.id === 'MED_01');
        assert.strictEqual(med.notes, 'تم التحديث بواسطة اختبار Parity');
    });

    console.log('\n--- 3. Module Operations Parity ---');

    await test('saveClinicVisit records visit and updates medication stock', async () => {
        const docLogin = await rpc({
            action: 'login',
            data: { email: 'doctor@system.local', password: 'doctor123' }
        });
        assert.strictEqual(docLogin.success, true);
        doctorAuth = { actorUserData: docLogin.user, sessionToken: docLogin.token };

        const initial = await rpc({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            ...adminAuth
        });
        const medBefore = initial.data.find(m => m.id === 'MED_01');
        const qtyBefore = parseInt(medBefore.remainingQuantity, 10);

        const visitRes = await rpc({
            action: 'saveClinicVisit',
            data: {
                personType: 'employee',
                employeeCode: 'EMP1002',
                employeeName: 'كريم عبد العزيز',
                reason: 'فحص دوري',
                medicationsDispensed: medBefore.name,
                medicationsDispensedQty: '5'
            },
            ...doctorAuth
        });
        assert.strictEqual(visitRes.success, true);
        assert.ok(visitRes.id);

        const after = await rpc({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            ...adminAuth
        });
        const medAfter = after.data.find(m => m.id === 'MED_01');
        assert.strictEqual(parseInt(medAfter.remainingQuantity, 10), qtyBefore - 5);
    });

    await test('savePTW records permit in PTWRegistry', async () => {
        const res = await rpc({
            action: 'savePTW',
            data: {
                workType: 'أعمال ساخنة ولحام',
                location: 'الورشة المركزية',
                status: 'معتمد'
            },
            ...adminAuth
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.id);
    });

    await test('getPublicLivePTWSummary returns activeList radar contract', async () => {
        const saveRes = await rpc({
            action: 'savePTW',
            data: {
                id: 'PTW_RADAR_TEST',
                permitId: 'PTW_RADAR_TEST',
                workType: 'أعمال ساخنة ولحام',
                location: 'ICAPP-1 الورشة',
                status: 'ساري',
                timeFrom: '08:00',
                timeTo: '17:00',
                requestingParty: 'الصيانة'
            },
            ...adminAuth
        });
        assert.strictEqual(saveRes.success, true);

        const res = await rpc({ action: 'getPublicLivePTWSummary' });
        assert.strictEqual(res.success, true);
        assert.ok(Array.isArray(res.activeList), 'activeList missing');
        assert.ok(res.todayDate);
        const row = res.activeList.find((p) => p.id === 'PTW_RADAR_TEST');
        assert.ok(row, 'saved permit not in radar');
        assert.strictEqual(row.typeKey, 'hot');
        assert.ok(row.site);
        assert.ok(row.statusKey);
        assert.ok(row.timeFrom);
    });

    await test('saveNearMiss records near miss incident', async () => {
        const res = await rpc({
            action: 'saveNearMiss',
            data: {
                observerName: 'مراقب السلامة',
                location: 'صالة التغليف',
                description: 'كابل مكشوف تم تداركه قبل التعثر'
            },
            ...adminAuth
        });
        assert.strictEqual(res.success, true);
        assert.ok(res.id);
    });

    await test('getAllApprovedContractors returns list of approved contractors', async () => {
        const res = await rpc({
            action: 'getAllApprovedContractors',
            ...adminAuth
        });
        assert.strictEqual(res.success, true);
        const list = res.contractors || res.data || [];
        assert.ok(Array.isArray(list));
        assert.ok(list.length > 0);
    });

    summary('Parity Tests');
}

if (require.main === module) {
    runParityTests().catch((err) => {
        console.error(err.message || err);
        process.exit(1);
    });
}

module.exports = { runParityTests };
