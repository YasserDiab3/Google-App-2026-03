/**
 * Live mirror: SQLite primary writes → Oracle Cloud (sheet-level resync).
 * Enable: ORACLE_MIRROR=1 + Oracle credentials (and DB_TYPE != oracle).
 */
'use strict';

const config = require('../config/config');
const { syncSheetToOracle } = require('./oracle-sheet-sync');

let oracleMirrorDb = null;
let mirrorInitFailed = false;
const pendingSheets = new Set();
let flushTimer = null;
let flushing = false;

const DEBOUNCE_MS = Math.max(200, parseInt(process.env.ORACLE_MIRROR_DEBOUNCE_MS || '800', 10) || 800);
const BLOCKING = process.env.ORACLE_MIRROR_SYNC === '1';

function mirrorEnabled() {
    return !!(config.oracle && config.oracle.mirror);
}

function getOracleMirror() {
    if (!mirrorEnabled() || mirrorInitFailed) return null;
    if (oracleMirrorDb) return oracleMirrorDb;
    try {
        const { initOracleEngine } = require('./oracle-engine');
        oracleMirrorDb = initOracleEngine({
            ...config.oracle,
            enabled: true
        });
        console.log('[oracle-mirror] connected →', config.oracle.connectString);
        return oracleMirrorDb;
    } catch (e) {
        mirrorInitFailed = true;
        console.warn('[oracle-mirror] init failed:', String(e && e.message || e).slice(0, 180));
        return null;
    }
}

function flushPending(sqlitePrimary) {
    if (flushing) return;
    const sheets = [...pendingSheets];
    pendingSheets.clear();
    if (!sheets.length) return;

    const oracleDb = getOracleMirror();
    if (!oracleDb) return;

    flushing = true;
    try {
        for (const sheetName of sheets) {
            const result = syncSheetToOracle(oracleDb, sqlitePrimary, sheetName);
            if (result.status !== 'ok' && result.status !== 'ok-empty') {
                console.warn('[oracle-mirror]', sheetName, result.status, result.error || '');
            } else if (process.env.ORACLE_MIRROR_VERBOSE === '1') {
                console.log('[oracle-mirror] synced', sheetName, result.rows);
            }
        }
    } catch (e) {
        console.warn('[oracle-mirror] flush error:', String(e && e.message || e).slice(0, 180));
    } finally {
        flushing = false;
        if (pendingSheets.size) scheduleFlush(sqlitePrimary);
    }
}

function scheduleFlush(sqlitePrimary) {
    if (BLOCKING) {
        flushPending(sqlitePrimary);
        return;
    }
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = setTimeout(() => {
        flushTimer = null;
        flushPending(sqlitePrimary);
    }, DEBOUNCE_MS);
}

function queueSheet(sqlitePrimary, sheetName) {
    if (!sheetName || !mirrorEnabled()) return;
    pendingSheets.add(sheetName);
    scheduleFlush(sqlitePrimary);
}

/**
 * Wrap SQLite/Turso db so write APIs also sync the sheet to Oracle.
 */
function wrapWithOracleMirror(sqliteDb) {
    if (!mirrorEnabled() || !sqliteDb) return sqliteDb;

    // Warm connection in background (non-blocking)
    try { getOracleMirror(); } catch (_e) {}

    const methods = ['saveToSheet', 'appendToSheet', 'insertRow', 'insertRows', 'updateRow', 'deleteRow', 'deleteRows'];
    for (const name of methods) {
        if (typeof sqliteDb[name] !== 'function') continue;
        const original = sqliteDb[name].bind(sqliteDb);
        sqliteDb[name] = function mirroredWrite(...args) {
            const result = original(...args);
            const sheetName = args[0];
            queueSheet(sqliteDb, sheetName);
            return result;
        };
    }

    sqliteDb.oracleMirror = {
        enabled: true,
        flush() { flushPending(sqliteDb); },
        queue(sheetName) { queueSheet(sqliteDb, sheetName); },
        syncSheet(sheetName) {
            const oracleDb = getOracleMirror();
            if (!oracleDb) return { status: 'no-oracle' };
            return syncSheetToOracle(oracleDb, sqliteDb, sheetName);
        }
    };

    sqliteDb.engineType = `${sqliteDb.engineType || 'sqlite'}+oracle-mirror`;
    return sqliteDb;
}

/** Force-sync sheets now (import scripts). */
function syncSheetsNow(sqliteDb, sheetNames) {
    const oracleDb = getOracleMirror();
    if (!oracleDb) {
        // Allow one-shot even if mirror flag off but credentials exist
        if (!(config.oracle && config.oracle.user && config.oracle.password && config.oracle.connectString)) {
            return { ok: false, reason: 'no-oracle-credentials' };
        }
        try {
            const { initOracleEngine } = require('./oracle-engine');
            oracleMirrorDb = initOracleEngine({ ...config.oracle, enabled: true });
        } catch (e) {
            return { ok: false, reason: String(e.message || e).slice(0, 120) };
        }
    }
    const db = oracleMirrorDb || getOracleMirror();
    const summary = [];
    for (const sheet of sheetNames) {
        summary.push(syncSheetToOracle(db, sqliteDb, sheet));
    }
    return { ok: true, summary };
}

module.exports = {
    mirrorEnabled,
    wrapWithOracleMirror,
    syncSheetsNow,
    queueSheet,
    flushPending
};
