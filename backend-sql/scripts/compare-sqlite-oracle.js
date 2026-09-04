#!/usr/bin/env node
/**
 * Precise SQLite ↔ Oracle count + content match.
 *
 * Usage:
 *   node backend-sql/scripts/compare-sqlite-oracle.js
 *   node backend-sql/scripts/compare-sqlite-oracle.js --deep=ClinicVisits,Employees,ApprovedContractors
 */
'use strict';

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { headersMap } = require('../src/db/headers-schema');
const { createPool, qIdent, sanitizeIdentifier } = require('../src/db/oracle-engine');
const config = require('../src/config/config');

const CORE_DEEP = [
    'ClinicVisits',
    'Employees',
    'ApprovedContractors',
    'ClinicContractorVisits',
    'ContractorTrainings',
    'PTW',
    'PTWRegistry',
    'DailyObservations',
    'Users'
];

function parseArgs(argv) {
    const out = { deep: CORE_DEEP };
    for (const a of argv) {
        if (a.startsWith('--deep=')) {
            out.deep = a.slice('--deep='.length).split(',').map((s) => s.trim()).filter(Boolean);
        }
        if (a === '--deep-all') out.deep = Object.keys(headersMap);
    }
    return out;
}

function openSqlite(dbPath) {
    try {
        const { DatabaseSync } = require('node:sqlite');
        const db = new DatabaseSync(dbPath);
        return {
            all(sql, params = []) {
                return db.prepare(sql).all(...params);
            },
            get(sql, params = []) {
                return db.prepare(sql).get(...params);
            },
            close() {}
        };
    } catch (_e) {
        const Database = require('better-sqlite3');
        const db = new Database(dbPath, { readonly: true });
        return {
            all(sql, params = []) {
                return db.prepare(sql).all(...params);
            },
            get(sql, params = []) {
                return db.prepare(sql).get(...params);
            },
            close() { try { db.close(); } catch (_e2) {} }
        };
    }
}

function needsJsonRowStorage(columns) {
    if (!Array.isArray(columns) || columns.length > 1000) return true;
    for (const c of columns) {
        if (typeof c !== 'string') return true;
        try {
            sanitizeIdentifier(c);
        } catch (_e) {
            return true;
        }
    }
    return false;
}

function normalizeCell(v) {
    if (v === undefined || v === null) return '';
    if (typeof v === 'object') {
        try { return JSON.stringify(v); } catch (_e) { return String(v); }
    }
    return String(v);
}

function rowFingerprint(row, columns) {
    return columns.map((c) => `${c}=${normalizeCell(row[c])}`).join('\u0001');
}

async function oracleCount(conn, sheetName) {
    const r = await conn.execute(`SELECT COUNT(*) AS CNT FROM ${qIdent(sheetName)}`);
    const row = r.rows && r.rows[0];
    if (!row) return 0;
    return Number(row.CNT != null ? row.CNT : row[0]) || 0;
}

async function oracleRows(conn, sheetName, columns, jsonMode) {
    if (jsonMode) {
        const r = await conn.execute(`SELECT ${qIdent('id')}, ${qIdent('_rowJson')} FROM ${qIdent(sheetName)}`);
        return (r.rows || []).map((row) => {
            const id = row.id != null ? row.id : row[0];
            const raw = row._rowJson != null ? row._rowJson : row[1];
            let parsed = {};
            try {
                parsed = typeof raw === 'string' ? JSON.parse(raw) : (raw || {});
            } catch (_e) {
                parsed = { id, _parseError: true };
            }
            if (parsed && parsed.id == null && id != null) parsed.id = id;
            return parsed;
        });
    }
    const colSql = columns.map(qIdent).join(', ');
    const r = await conn.execute(`SELECT ${colSql} FROM ${qIdent(sheetName)}`);
    const meta = (r.metaData || []).map((m) => m.name);
    return (r.rows || []).map((row) => {
        if (row && !Array.isArray(row) && typeof row === 'object') return row;
        const obj = {};
        meta.forEach((name, i) => { obj[name] = row[i]; });
        // Oracle may upper-case unquoted; our DDL uses quoted names so meta should match.
        return obj;
    });
}

async function deepCompare(sqlite, conn, sheetName) {
    const columns = (headersMap[sheetName] || []).filter((c) => typeof c === 'string');
    if (!columns.length) return { sheet: sheetName, status: 'no-headers' };
    const jsonMode = needsJsonRowStorage(columns);
    let sqliteRows = [];
    try {
        sqliteRows = sqlite.all(`SELECT * FROM "${sheetName}"`);
    } catch (e) {
        return { sheet: sheetName, status: 'missing-sqlite', error: String(e.message || e).slice(0, 80) };
    }

    let oracleRowList;
    try {
        oracleRowList = await oracleRows(conn, sheetName, columns, jsonMode);
    } catch (e) {
        return { sheet: sheetName, status: 'missing-oracle', error: String(e.message || e).slice(0, 120) };
    }

    const idCol = columns.includes('id') ? 'id' : columns[0];
    // Multiset fingerprint — handles duplicate ids in source Excel/SQLite.
    const sqliteFp = sqliteRows.map((row) => rowFingerprint(row, columns)).sort();
    const oracleFp = oracleRowList.map((row) => {
        const normalized = {};
        for (const c of columns) {
            normalized[c] = row[c] != null ? row[c] : row[String(c).toUpperCase()];
        }
        return rowFingerprint(normalized, columns);
    }).sort();

    let mismatchAt = -1;
    const max = Math.max(sqliteFp.length, oracleFp.length);
    for (let i = 0; i < max; i += 1) {
        if (sqliteFp[i] !== oracleFp[i]) {
            mismatchAt = i;
            break;
        }
    }

    // Also report duplicate id counts (data quality, not engine mismatch).
    const sqliteIdCounts = new Map();
    for (const row of sqliteRows) {
        const id = normalizeCell(row[idCol]);
        sqliteIdCounts.set(id, (sqliteIdCounts.get(id) || 0) + 1);
    }
    const dupIds = [...sqliteIdCounts.entries()].filter(([, n]) => n > 1).map(([id, n]) => ({ id, n }));

    const status = mismatchAt < 0 ? 'match' : 'diff';
    let sampleDiff = null;
    if (mismatchAt >= 0) {
        const sParts = (sqliteFp[mismatchAt] || '').split('\u0001').slice(0, 6);
        const oParts = (oracleFp[mismatchAt] || '').split('\u0001').slice(0, 6);
        sampleDiff = { index: mismatchAt, sqlite: sParts, oracle: oParts };
    }
    return {
        sheet: sheetName,
        status,
        sqliteCount: sqliteRows.length,
        oracleCount: oracleRowList.length,
        onlySqlite: 0,
        onlyOracle: 0,
        fieldDiffRows: mismatchAt < 0 ? 0 : 1,
        sampleOnlySqlite: [],
        sampleOnlyOracle: [],
        sampleFieldDiffs: sampleDiff ? [sampleDiff] : [],
        duplicateIds: dupIds.slice(0, 10),
        jsonMode
    };
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const sqlitePath = process.env.SQLITE_PATH || config.sqlitePath;
    if (!fs.existsSync(sqlitePath)) {
        console.error('SQLite missing:', sqlitePath);
        process.exit(1);
    }

    const oracleCfg = {
        ...config.oracle,
        user: process.env.ORACLE_USER || config.oracle.user,
        password: process.env.ORACLE_PASSWORD || config.oracle.password,
        connectString: process.env.ORACLE_CONNECT_STRING || config.oracle.connectString,
        walletLocation: process.env.ORACLE_WALLET_DIR || config.oracle.walletLocation,
        walletPassword: process.env.ORACLE_WALLET_PASSWORD || config.oracle.walletPassword
    };
    if (!oracleCfg.user || !oracleCfg.password || !oracleCfg.connectString) {
        console.error('Oracle credentials missing');
        process.exit(1);
    }

    const sqlite = openSqlite(sqlitePath);
    const { pool } = await createPool(oracleCfg);
    const conn = await pool.getConnection();

    console.log('=== COUNT COMPARE ===');
    const countRows = [];
    let countMismatch = 0;
    let totalSqlite = 0;
    let totalOracle = 0;
    for (const sheetName of Object.keys(headersMap)) {
        let sCount = 0;
        try {
            const r = sqlite.get(`SELECT COUNT(*) AS c FROM "${sheetName}"`);
            sCount = Number(r && r.c) || 0;
        } catch (_e) {
            continue;
        }
        let oCount = 0;
        try {
            oCount = await oracleCount(conn, sheetName);
        } catch (_e) {
            countRows.push({ sheet: sheetName, sqlite: sCount, oracle: 'ERR', ok: false });
            countMismatch += 1;
            continue;
        }
        totalSqlite += sCount;
        totalOracle += oCount;
        const ok = sCount === oCount;
        if (!ok) countMismatch += 1;
        countRows.push({ sheet: sheetName, sqlite: sCount, oracle: oCount, ok });
        const mark = ok ? '✓' : '✗';
        console.log(`${mark} ${sheetName}: sqlite=${sCount} oracle=${oCount}`);
    }
    console.log(`COUNT totals: sqlite=${totalSqlite} oracle=${totalOracle} mismatches=${countMismatch}`);

    console.log('\n=== DEEP CONTENT COMPARE ===');
    const deepResults = [];
    for (const sheetName of args.deep) {
        if (!headersMap[sheetName]) {
            console.log(`skip ${sheetName}: not in headers`);
            continue;
        }
        const result = await deepCompare(sqlite, conn, sheetName);
        deepResults.push(result);
        if (result.status === 'match') {
            const dupNote = (result.duplicateIds && result.duplicateIds.length)
                ? ` (note: ${result.duplicateIds.length} duplicate id groups in source)`
                : '';
            console.log(`✓ ${sheetName}: content match (${result.sqliteCount} rows${result.jsonMode ? ', json' : ''})${dupNote}`);
        } else {
            console.log(`✗ ${sheetName}:`, JSON.stringify({
                status: result.status,
                sqlite: result.sqliteCount,
                oracle: result.oracleCount,
                onlySqlite: result.onlySqlite,
                onlyOracle: result.onlyOracle,
                fieldDiffRows: result.fieldDiffRows,
                sampleOnlySqlite: result.sampleOnlySqlite,
                sampleOnlyOracle: result.sampleOnlyOracle,
                sampleFieldDiffs: result.sampleFieldDiffs,
                error: result.error
            }));
        }
    }

    sqlite.close();
    try { await conn.close(); } catch (_e) {}
    try { await pool.close(0); } catch (_e) {}

    const deepFail = deepResults.filter((r) => r.status !== 'match');
    console.log('\n=== FINAL ===');
    console.log({
        countMismatch,
        deepChecked: deepResults.length,
        deepFail: deepFail.length,
        pass: countMismatch === 0 && deepFail.length === 0
    });
    process.exit(countMismatch === 0 && deepFail.length === 0 ? 0 : 2);
}

main().catch((e) => {
    console.error('FATAL', e.message || e);
    process.exit(1);
});
