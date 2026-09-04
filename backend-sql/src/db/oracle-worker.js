/**
 * Worker thread: owns oracledb pool (async), answers sync RPC from parent via MessagePort + Atomics.
 */
'use strict';

const { parentPort, workerData } = require('worker_threads');
const oracledb = require('oracledb');

let pool = null;

function toOracleBinds(sql, params) {
    const list = Array.isArray(params) ? params : [];
    let i = 0;
    const binds = {};
    const outSql = String(sql).replace(/\?/g, () => {
        i += 1;
        const key = `b${i}`;
        binds[key] = list[i - 1] === undefined ? null : list[i - 1];
        return `:${key}`;
    });
    return { sql: outSql, binds };
}

function reply(msg, payload) {
    const { port, sab } = msg;
    if (port) {
        port.postMessage(payload);
        try { port.close(); } catch (_e) {}
    } else {
        parentPort.postMessage(payload);
    }
    if (sab) {
        const signal = new Int32Array(sab);
        Atomics.store(signal, 0, 1);
        Atomics.notify(signal, 0, 1);
    }
}

async function init() {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    try { oracledb.fetchAsString = [oracledb.CLOB]; } catch (_e) {}
    oracledb.autoCommit = true;

    const cfg = workerData || {};
    if (cfg.walletLocation) {
        process.env.TNS_ADMIN = cfg.walletLocation;
    }

    const poolOpts = {
        user: cfg.user,
        password: cfg.password,
        connectString: cfg.connectString,
        poolMin: 0,
        poolMax: cfg.poolMax || 1,
        poolIncrement: 1,
        stmtCacheSize: 20
    };
    if (cfg.walletLocation) {
        poolOpts.configDir = cfg.walletLocation;
        poolOpts.walletLocation = cfg.walletLocation;
    }
    if (cfg.walletPassword) {
        poolOpts.walletPassword = cfg.walletPassword;
    }
    pool = await oracledb.createPool(poolOpts);
    const conn = await pool.getConnection();
    try {
        await conn.execute('SELECT 1 AS ok FROM DUAL');
    } finally {
        await conn.close();
    }
}

async function handle(msg) {
    const { id, op, sql, params } = msg;
    try {
        if (op === 'ping') {
            reply(msg, { id, ok: true, result: { engineType: 'oracle', persistent: true } });
            return;
        }
        if (op === 'close') {
            if (pool) await pool.close(0);
            pool = null;
            reply(msg, { id, ok: true, result: true });
            return;
        }
        const conn = await pool.getConnection();
        try {
            if (op === 'exec') {
                await conn.execute(sql, {}, { autoCommit: true });
                reply(msg, { id, ok: true, result: null });
                return;
            }
            const { sql: oSql, binds } = toOracleBinds(sql, params || []);
            if (op === 'run') {
                const result = await conn.execute(oSql, binds, { autoCommit: true });
                reply(msg, { id, ok: true, result: { changes: result.rowsAffected || 0, lastInsertRowid: null } });
                return;
            }
            if (op === 'all') {
                const result = await conn.execute(oSql, binds, {
                    outFormat: oracledb.OUT_FORMAT_OBJECT,
                    autoCommit: true
                });
                reply(msg, { id, ok: true, result: result.rows || [] });
                return;
            }
            throw new Error(`unknown op ${op}`);
        } finally {
            try { await conn.close(); } catch (_e) {}
        }
    } catch (e) {
        reply(msg, { id, ok: false, error: e && e.message ? e.message : String(e) });
    }
}

parentPort.on('message', (msg) => {
    Promise.resolve()
        .then(() => handle(msg))
        .catch((e) => {
            reply(msg || {}, {
                id: msg && msg.id,
                ok: false,
                error: e && e.message ? e.message : String(e)
            });
        });
});

function signalReady(ok) {
    const sab = workerData && workerData.readySab;
    if (sab) {
        const view = new Int32Array(sab);
        Atomics.store(view, 0, ok ? 1 : 2);
        Atomics.notify(view, 0, 1);
    }
    parentPort.postMessage({ id: 0, ok: !!ok, ready: !!ok, error: ok ? undefined : 'init failed' });
}

init()
    .then(() => signalReady(true))
    .catch((e) => {
        console.error('[oracle-worker] init failed:', e && e.message ? e.message : e);
        signalReady(false);
    });
