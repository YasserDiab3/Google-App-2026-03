/**
 * استيراد من GAS حي (يتطلب HSE_ADMIN_EMAIL + HSE_ADMIN_PASSWORD)
 * node scripts/import-missing-from-gas.js
 */
'use strict';

const path = require('path');
const { migrateFromLiveGas } = require('./migrate-from-sheets');

const GAS_URL = process.env.HSE_GAS_EXEC_URL ||
  'https://www.safety-icapp.com/api/exec';

const PRIORITY_SHEETS = [
    'ClinicVisits', 'ClinicContractorVisits', 'Employees', 'Users', 'Medications',
    'Incidents', 'ClinicStaff', 'ClinicStaffAttendance', 'Training', 'PTW', 'PTWRegistry'
];

async function login() {
    const email = process.env.HSE_ADMIN_EMAIL;
    const password = process.env.HSE_ADMIN_PASSWORD;
    if (!email || !password) return null;

    const res = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'login', data: { email, password } })
    });
    const json = await res.json();
    if (!json.success || !json.user) throw new Error(json.message || 'login failed');
    return { ...json.user, sessionToken: json.token || json.sessionToken || '' };
}

async function fetchSheets(actor) {
    const res = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
            action: 'batchReadSheets',
            data: { sheetNames: PRIORITY_SHEETS },
            actorUserData: actor,
            sessionToken: actor.sessionToken || ''
        })
    });
    const json = await res.json();
    if (!json.success || !json.data) throw new Error(json.message || json.errorCode || 'batchReadSheets failed');
    return json.data;
}

async function main() {
    const actor = await login();
    if (!actor) {
        console.log('SKIP GAS live import — set HSE_ADMIN_EMAIL and HSE_ADMIN_PASSWORD');
        process.exit(0);
    }
    console.log('Logged in as', actor.email || actor.name);
    const data = await fetchSheets(actor);
    const { migrateFromData } = require('./migrate-from-sheets');
    await migrateFromData(data);
    console.log('GAS import done');
}

main().catch((e) => {
    console.error('GAS import failed:', e.message);
    process.exit(1);
});
