/**
 * Smoke CRUD against production Oracle proxy.
 * Usage: node scripts/smoke-oracle-crud.mjs
 */
'use strict';

const BASE = process.env.HSE_API_BASE || 'https://www.safety-icapp.com/api';

async function post(body) {
    const res = await fetch(`${BASE}/exec`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch {
        throw new Error(`Non-JSON ${res.status}: ${text.slice(0, 200)}`);
    }
    return json;
}

function rowsOf(resp) {
    if (Array.isArray(resp?.data)) return resp.data;
    if (Array.isArray(resp?.rows)) return resp.rows;
    if (Array.isArray(resp?.data?.data)) return resp.data.data;
    if (Array.isArray(resp?.data?.rows)) return resp.data.rows;
    return [];
}

async function main() {
    const healthRes = await fetch(`${BASE}/health`);
    const health = await healthRes.json();
    console.log('HEALTH', {
        vercelProxy: health.vercelProxy,
        dbEngine: health.dbEngine,
        dbType: health.dbType,
        persistent: health.persistent,
        ociUpstream: health.ociUpstream
    });

    const login = await post({
        action: 'login',
        email: 'yasser@icapp.com',
        password: 'Yasser@2026'
    });
    if (!login.success) {
        console.error('LOGIN_FAIL', login);
        process.exit(1);
    }
    const token = login.sessionToken || login.token;
    const user = login.user || login.userData;
    console.log('LOGIN ok', { role: user?.role, tokenLen: String(token || '').length });

    const ptw = await post({
        action: 'readFromSheet',
        sessionToken: token,
        actorUserData: user,
        data: { sheetName: 'PTW' }
    });
    const ptwRows = rowsOf(ptw);
    console.log('READ_PTW', { success: ptw.success, count: ptwRows.length, message: ptw.message, code: ptw.errorCode });

    const marker = `SMOKE_OCI_${Date.now()}`;
    const id = `ID_${marker}`;
    const create = await post({
        action: 'appendToSheet',
        sessionToken: token,
        actorUserData: user,
        data: {
            sheetName: 'Notifications',
            data: {
                id,
                title: marker,
                message: 'oracle-crud-smoke',
                status: 'smoke-test',
                type: 'system',
                priority: 'low',
                read: false,
                createdAt: new Date().toISOString()
            }
        }
    });
    console.log('CREATE', { success: create.success, message: create.message, code: create.errorCode });

    const notif = await post({
        action: 'readFromSheet',
        sessionToken: token,
        actorUserData: user,
        data: { sheetName: 'Notifications' }
    });
    const nRows = rowsOf(notif);
    const hit = nRows.find((r) => String(r.id || r.Id || '') === id
        || String(r.title || r.Title || '') === marker
        || String(r.message || r.Message || '').includes('oracle-crud-smoke'));
    console.log('FIND', { found: !!hit, notifCount: nRows.length, hitId: hit && (hit.id || hit.Id) });

    let updateOk = false;
    let deleteOk = false;
    if (hit) {
        const rowId = hit.id || hit.Id || id;
        const upd = await post({
            action: 'saveToSheet',
            sessionToken: token,
            actorUserData: user,
            data: {
                sheetName: 'Notifications',
                data: [{
                    id: rowId,
                    title: marker,
                    message: 'oracle-crud-updated',
                    status: 'smoke-updated',
                    type: hit.type || 'system',
                    priority: hit.priority || 'low',
                    read: false,
                    updatedAt: new Date().toISOString()
                }]
            }
        });
        updateOk = !!upd.success;
        console.log('UPDATE', { success: upd.success, message: upd.message, code: upd.errorCode });

        const del = await post({
            action: 'deleteRow',
            sessionToken: token,
            actorUserData: user,
            data: { sheetName: 'Notifications', id: rowId }
        });
        deleteOk = !!del.success;
        console.log('DELETE', { success: del.success, message: del.message, code: del.errorCode });
    }

    const pass = !!(health.vercelProxy && (health.dbEngine === 'oracle' || health.dbType === 'oracle')
        && login.success && ptw.success && ptwRows.length > 0
        && create.success && hit && updateOk && deleteOk);
    console.log(pass ? 'SMOKE_PASS' : 'SMOKE_FAIL');
    process.exit(pass ? 0 : 2);
}

main().catch((e) => {
    console.error('SMOKE_ERROR', e);
    process.exit(1);
});
