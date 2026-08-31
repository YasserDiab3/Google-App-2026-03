/**
 * CRUD + تحميل/عرض على قاعدة SQL الإنتاجية (بدون seed)
 * node scripts/verify-sql-crud.js
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { handleRpcRequest } = require('../src/rpc-router');
const { getDatabase } = require('../src/db/database');
const config = require('../src/config/config');

const adminUser = { id: 'USR_VERIFY', name: 'فحص SQL', role: 'admin', isAdmin: true, email: 'admin@system.local' };

const LOAD_SHEETS = [
    'ClinicVisits', 'ClinicContractorVisits', 'Employees', 'Medications',
    'PTW', 'PTWRegistry', 'Training', 'DailyObservations', 'Incidents', 'Users'
];

let passed = 0;
let failed = 0;

function check(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  PASS  ${name}`);
    } catch (e) {
        failed++;
        console.log(`  FAIL  ${name} — ${e.message}`);
    }
}

function rpc(action, data = {}) {
    return handleRpcRequest({ action, data, actorUserData: adminUser });
}

async function tryLiveUrl() {
    const liveFile = path.join(__dirname, '..', 'LIVE_URL.txt');
    if (!fs.existsSync(liveFile)) return;
    const text = fs.readFileSync(liveFile, 'utf8');
    const m = text.match(/https:\/\/[^\s]+\/health/);
    if (!m) return;
    const healthUrl = m[0];
    try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(healthUrl, { signal: ctrl.signal });
        clearTimeout(t);
        const json = await res.json();
        check('live tunnel /health', () => {
            assert.strictEqual(json.status, 'ok');
        });
    } catch (e) {
        console.log(`  SKIP  live tunnel — ${e.message}`);
    }
}

async function main() {
    console.log('=== SQL CRUD + Load Verification ===');
    console.log('DB:', config.sqlitePath);

    const db = getDatabase();
    check('database file accessible', () => {
        assert.ok(db);
    });

    console.log('\n--- قراءة / تحميل (عرض) ---');
    const counts = {};
    for (const sheet of LOAD_SHEETS) {
        const res = rpc('readFromSheet', { sheetName: sheet });
        check(`readFromSheet:${sheet}`, () => {
            assert.strictEqual(res.success, true, res.message || res.errorCode);
            assert.ok(Array.isArray(res.data));
            counts[sheet] = res.data.length;
        });
    }
    console.log('         counts:', JSON.stringify(counts));

    const batch = rpc('batchReadSheets', {
        sheetNames: ['ClinicVisits', 'Employees', 'PTW', 'PTWRegistry', 'DailyObservations']
    });
    check('batchReadSheets (frontend load pattern)', () => {
        assert.strictEqual(batch.success, true);
        assert.ok(batch.data.ClinicVisits);
        assert.ok(batch.data.Employees);
        assert.ok(typeof batch.count === 'number');
        console.log(`         batch rows: ${batch.count}`);
    });

    console.log('\n--- CRUD دورة كاملة (ClientErrorLog) ---');
    const testId = `SQL_CRUD_${Date.now()}`;
    const create = rpc('appendToSheet', {
        sheetName: 'ClientErrorLog',
        data: {
            id: testId,
            message: 'smoke crud verify',
            module: 'verify-sql-crud',
            severity: 'info',
            createdAt: new Date().toISOString()
        }
    });
    check('CREATE appendToSheet', () => {
        assert.strictEqual(create.success, true, create.message);
    });

    const readOne = rpc('readFromSheet', { sheetName: 'ClientErrorLog' });
    check('READ after create', () => {
        const row = readOne.data.find(r => String(r.id) === testId);
        assert.ok(row, 'row not found');
        assert.strictEqual(row.message, 'smoke crud verify');
    });

    const update = rpc('updateRow', {
        sheetName: 'ClientErrorLog',
        id: testId,
        data: { message: 'smoke crud updated' }
    });
    check('UPDATE updateRow', () => {
        assert.strictEqual(update.success, true);
        assert.ok(update.changes > 0);
    });

    const readUpdated = rpc('readFromSheet', { sheetName: 'ClientErrorLog' });
    check('READ after update', () => {
        const row = readUpdated.data.find(r => String(r.id) === testId);
        assert.strictEqual(row.message, 'smoke crud updated');
    });

    const del = rpc('deleteRow', {
        sheetName: 'ClientErrorLog',
        id: testId
    });
    check('DELETE deleteRow', () => {
        assert.strictEqual(del.success, true);
        assert.ok(del.changes > 0);
    });

    const readAfterDelete = rpc('readFromSheet', { sheetName: 'ClientErrorLog' });
    check('READ after delete', () => {
        const row = readAfterDelete.data.find(r => String(r.id) === testId);
        assert.strictEqual(row, undefined);
    });

    console.log('\n--- saveToSheet upsert ---');
    const upsertId = `SQL_UPSERT_${Date.now()}`;
    check('saveToSheet insert', () => {
        const r = rpc('saveToSheet', {
            sheetName: 'ClientErrorLog',
            data: { id: upsertId, message: 'upsert new', module: 'verify' }
        });
        assert.strictEqual(r.success, true);
    });
    check('saveToSheet update', () => {
        const r = rpc('saveToSheet', {
            sheetName: 'ClientErrorLog',
            data: { id: upsertId, message: 'upsert updated', module: 'verify' }
        });
        assert.strictEqual(r.success, true);
        const row = rpc('readFromSheet', { sheetName: 'ClientErrorLog' }).data.find(x => x.id === upsertId);
        assert.strictEqual(row.message, 'upsert updated');
    });
    rpc('deleteRow', { sheetName: 'ClientErrorLog', id: upsertId });

    await tryLiveUrl();

    console.log('\n=== SUMMARY ===');
    console.log(`passed: ${passed}/${passed + failed}`);
    if (failed) process.exit(1);
    console.log('ALL PASS');
}

main().catch((e) => {
    console.error('FATAL', e);
    process.exit(1);
});
