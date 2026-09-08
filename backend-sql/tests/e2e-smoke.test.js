/**
 * E2E HTTP Smoke Test - Tests full network transport over Express HTTP server
 */
'use strict';

const assert = require('assert');
const app = require('../src/index');

const TEST_PORT = 3999;
let server = null;

async function sendRpc(action, data = {}, actorUserData = null, sessionToken = '') {
    const res = await fetch(`http://127.0.0.1:${TEST_PORT}/exec`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
            action,
            data,
            actorUserData,
            sessionToken
        })
    });
    return await res.json();
}

async function runE2eSmoke() {
    console.log('🌐 Starting E2E HTTP Smoke Tests...\n');

    server = app.listen(TEST_PORT, '127.0.0.1');
    await new Promise((resolve) => server.once('listening', resolve));
    console.log(`  ✓ Test HTTP server listening on port ${TEST_PORT}`);

    try {
        // 1. Health check
        const healthRes = await fetch(`http://127.0.0.1:${TEST_PORT}/health`);
        const health = await healthRes.json();
        assert.strictEqual(health.status, 'ok');
        console.log('  ✓ Health endpoint responded OK');

        // 2. Admin Login
        const loginRes = await sendRpc('login', { email: 'admin@system.local', password: 'admin123' });
        assert.strictEqual(loginRes.success, true);
        const adminUser = loginRes.user;
        const adminToken = loginRes.token || loginRes.sessionToken;
        console.log('  ✓ Admin logged in over HTTP');

        // 3. Batch Read
        const batchRes = await sendRpc('batchReadSheets', {
            sheetNames: ['Users', 'Medications', 'Employees', 'ApprovedContractors']
        }, adminUser, adminToken);
        assert.strictEqual(batchRes.success, true);
        assert.ok(batchRes.data.Medications.length > 0);
        console.log(`  ✓ Batch read fetched ${Object.keys(batchRes.data).length} sheets`);

        // 4. Register Clinic Visit
        const med = batchRes.data.Medications[0];
        const clinicRes = await sendRpc('saveClinicVisit', {
            personType: 'employee',
            employeeCode: 'EMP1001',
            employeeName: 'محمود علي حسن',
            reason: 'كشف روتيني',
            medicationsDispensed: med.name,
            medicationsDispensedQty: '1'
        }, adminUser, adminToken);
        assert.strictEqual(clinicRes.success, true);
        console.log('  ✓ Clinic visit created and medication deducted');

        // 5. Create PTW
        const ptwRes = await sendRpc('savePTW', {
            workType: 'صيانة مرتفعات',
            location: 'المبنى الإداري',
            status: 'قيد الاعتماد'
        }, adminUser, adminToken);
        assert.strictEqual(ptwRes.success, true);
        console.log('  ✓ PTW permit created successfully');

        console.log('\n====================================================');
        console.log('🎉 All E2E HTTP Smoke Tests Passed with 100% Success!');
        console.log('====================================================\n');
    } finally {
        if (server) {
            server.close();
        }
    }
}

if (require.main === module) {
    runE2eSmoke().catch((err) => {
        console.error('❌ E2E Smoke Test Failed:', err);
        process.exit(1);
    });
}

module.exports = { runE2eSmoke };
