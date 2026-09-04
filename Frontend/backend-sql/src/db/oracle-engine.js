/**
 * Oracle Autonomous DB engine — same sheet API as SQLite wrapper (sync).
 * Uses a worker_threads bridge (no deasync required) — Vercel-safe thin mode.
 * Env: ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING
 * Optional: ORACLE_WALLET_DIR / ORACLE_WALLET_ZIP_BASE64 / ORACLE_WALLET_PASSWORD
 */
'use strict';

const path = require('path');
const { Worker, MessageChannel, receiveMessageOnPort } = require('worker_threads');
const { headersMap } = require('./headers-schema');
const { resolveOracleWalletDir } = require('./oracle-wallet');

const SAFE_IDENTIFIER_REGEX = /^[a-zA-Z0-9_\s\-\/#\(\)\.\&%:\+,أ-ي]+$/;

function sanitizeIdentifier(name) {
    if (!name || typeof name !== 'string') {
        throw new Error('اسم الحقل أو الجدول غير صالح');
    }
    const clean = name.trim();
    if (!SAFE_IDENTIFIER_REGEX.test(clean) || clean.includes('"') || clean.includes(';') || clean.includes('--') || clean.includes('/*')) {
        throw new Error(`محاولة إدخال غير آمنة في اسم الحقل/الجدول: "${name}"`);
    }
    return clean;
}

function formatValue(val) {
    if (val === undefined || val === null) return null;
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
}

function parseValue(val) {
    if (typeof val !== 'string') return val;
    const s = val.trim();
    if (s.length < 2) return val;
    const first = s[0];
    const last = s[s.length - 1];
    if ((first === '{' && last === '}') || (first === '[' && last === ']')) {
        try { return JSON.parse(s); } catch (_) { return val; }
    }
    return val;
}

function hydrateRow(row) {
    if (!row || typeof row !== 'object') return row;
    const out = {};
    for (const [k, v] of Object.entries(row)) {
        out[k] = parseValue(v);
    }
    return out;
}

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

function qIdent(name) {
    return `"${sanitizeIdentifier(name)}"`;
}

function awaitSync(promise) {
    // Kept for migrate scripts that still import awaitSync with native promises in-process.
    let deasync;
    try {
        deasync = require('deasync');
    } catch (_e) {
        throw new Error('awaitSync يحتاج deasync محلياً، أو استخدم مسار Worker');
    }
    let done = false;
    let err = null;
    let value = null;
    Promise.resolve(promise).then((v) => {
        value = v;
        done = true;
    }).catch((e) => {
        err = e;
        done = true;
    });
    deasync.loopWhile(() => !done);
    if (err) throw err;
    return value;
}

function createSyncWorker(oracleCfg) {
    const workerPath = path.join(__dirname, 'oracle-worker.js');
    const readySab = new SharedArrayBuffer(8);
    const readyView = new Int32Array(readySab);
    // readyView[0] = 0 pending | 1 ok | 2 fail
    Atomics.store(readyView, 0, 0);

    const worker = new Worker(workerPath, {
        workerData: {
            user: oracleCfg.user,
            password: oracleCfg.password,
            connectString: oracleCfg.connectString,
            walletLocation: oracleCfg.walletLocation || '',
            walletPassword: oracleCfg.walletPassword || '',
            poolMax: oracleCfg.poolMax || (process.env.VERCEL ? 1 : 4),
            readySab
        }
    });

    const readyStart = Date.now();
    while (Atomics.load(readyView, 0) === 0) {
        if (Date.now() - readyStart > 90000) {
            try { worker.terminate(); } catch (_e) {}
            throw new Error('Oracle worker ready timeout');
        }
        Atomics.wait(readyView, 0, 0, 100);
    }
    if (Atomics.load(readyView, 0) !== 1) {
        try { worker.terminate(); } catch (_e) {}
        throw new Error('Oracle worker failed to start (check wallet / credentials)');
    }

    let nextId = 1;

    function call(op, sql, params) {
        const id = nextId++;
        const { port1, port2 } = new MessageChannel();
        const sab = new SharedArrayBuffer(4);
        const signal = new Int32Array(sab);
        Atomics.store(signal, 0, 0);
        worker.postMessage({ id, op, sql, params, port: port2, sab }, [port2]);

        const start = Date.now();
        const timeoutMs = Number(process.env.ORACLE_SYNC_TIMEOUT_MS || 120000);
        let msg;
        while (!(msg = receiveMessageOnPort(port1))) {
            if (Date.now() - start > timeoutMs) {
                try { port1.close(); } catch (_e) {}
                throw new Error('Oracle worker timeout');
            }
            Atomics.wait(signal, 0, 0, 50);
        }
        try { port1.close(); } catch (_e) {}
        const payload = msg.message;
        if (!payload || payload.ok === false) {
            throw new Error((payload && payload.error) || 'Oracle worker error');
        }
        return payload.result;
    }

    return { worker, call };
}

async function createPool(oracleCfg) {
    // Used by migrate scripts (async). Thin mode only — never force Instant Client on Vercel.
    let oracledb;
    try {
        oracledb = require('oracledb');
    } catch (e) {
        throw new Error('حزمة oracledb غير مثبتة. نفّذ: npm install oracledb --prefix backend-sql');
    }

    const walletLocation = resolveOracleWalletDir(oracleCfg.walletLocation);
    if (walletLocation) {
        process.env.TNS_ADMIN = walletLocation;
        oracleCfg = { ...oracleCfg, walletLocation };
    }

    if (walletLocation && !process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
        try {
            oracledb.initOracleClient({ configDir: walletLocation });
        } catch (_e) { /* thin */ }
    }

    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    try { oracledb.fetchAsString = [oracledb.CLOB]; } catch (_e) {}
    oracledb.autoCommit = true;

    const poolOpts = {
        user: oracleCfg.user,
        password: oracleCfg.password,
        connectString: oracleCfg.connectString,
        poolMin: 0,
        poolMax: oracleCfg.poolMax || 4,
        poolIncrement: 1,
        stmtCacheSize: 30
    };
    if (oracleCfg.walletLocation) {
        poolOpts.configDir = oracleCfg.walletLocation;
        poolOpts.walletLocation = oracleCfg.walletLocation;
    }
    if (oracleCfg.walletPassword) {
        poolOpts.walletPassword = oracleCfg.walletPassword;
    }
    const pool = await oracledb.createPool(poolOpts);
    return { oracledb, pool };
}

function buildOracleWrapperFromWorker(bridge) {
    const wrapper = {
        raw: bridge.worker,
        engineType: 'oracle',
        persistent: true,

        syncNow() {},

        close() {
            try { bridge.call('close'); } catch (_e) {}
            try { bridge.worker.terminate(); } catch (_e2) {}
        },

        exec(sql) {
            return bridge.call('exec', sql, []);
        },

        run(sql, params = []) {
            return bridge.call('run', sql, params);
        },

        get(sql, params = []) {
            const rows = this.all(sql, params);
            return rows[0] || null;
        },

        all(sql, params = []) {
            const rows = bridge.call('all', sql, params) || [];
            return rows.map(hydrateRow);
        },

        readFromSheet(sheetName, filter = null) {
            const tableName = qIdent(sheetName);
            try {
                let sql = `SELECT * FROM ${tableName}`;
                const params = [];
                if (filter && typeof filter === 'object') {
                    const conditions = [];
                    for (const [key, val] of Object.entries(filter)) {
                        conditions.push(`${qIdent(key)} = ?`);
                        params.push(formatValue(val));
                    }
                    if (conditions.length) sql += ` WHERE ${conditions.join(' AND ')}`;
                }
                const rows = this.all(sql, params);
                return rows.map((row) => {
                    if (row && row._rowJson != null) {
                        try {
                            const parsed = typeof row._rowJson === 'string' ? JSON.parse(row._rowJson) : row._rowJson;
                            return { ...parsed, id: parsed.id != null ? parsed.id : row.id };
                        } catch (_e) {
                            return hydrateRow(row);
                        }
                    }
                    return hydrateRow(row);
                });
            } catch (e) {
                const msg = String(e && e.message || e);
                if (/ORA-00942|does not exist|no such table/i.test(msg)) return [];
                throw e;
            }
        },

        readSheet(sheetName, filter = null) {
            return this.readFromSheet(sheetName, filter);
        },

        findRow(...args) {
            let sheetName;
            let filter;
            if (args.length === 3) {
                sheetName = args[0];
                filter = { [args[1]]: args[2] };
            } else if (args.length === 2) {
                sheetName = args[0];
                filter = typeof args[1] === 'string' ? { id: args[1] } : args[1];
            }
            const rows = this.readFromSheet(sheetName, filter);
            return rows.length ? rows[0] : null;
        },

        saveToSheet(sheetName, rows) {
            if (!Array.isArray(rows) || !rows.length) return 0;
            const { needsJsonRowStorage } = require('./oracle-sheet-sync');
            const tableName = qIdent(sheetName);
            const columns = (headersMap[sheetName] || Object.keys(rows[0])).filter((c) => typeof c === 'string');
            this.exec(`DELETE FROM ${tableName}`);
            if (needsJsonRowStorage(columns)) {
                const insertSql = `INSERT INTO ${tableName} (${qIdent('id')}, ${qIdent('_rowJson')}) VALUES (?, ?)`;
                let count = 0;
                for (const row of rows) {
                    const id = row.id != null ? formatValue(row.id) : formatValue(row[columns[0]]);
                    this.run(insertSql, [id, JSON.stringify(row)]);
                    count += 1;
                }
                return count;
            }
            const safeCols = columns.map(sanitizeIdentifier);
            const colNames = safeCols.map(qIdent).join(', ');
            const placeholders = safeCols.map(() => '?').join(', ');
            const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;
            let count = 0;
            for (const row of rows) {
                this.run(insertSql, safeCols.map((c) => formatValue(row[c])));
                count += 1;
            }
            return count;
        },

        appendToSheet(sheetName, row) {
            const { needsJsonRowStorage } = require('./oracle-sheet-sync');
            const tableName = qIdent(sheetName);
            const columns = (headersMap[sheetName] || Object.keys(row)).filter((c) => typeof c === 'string');
            if (needsJsonRowStorage(columns)) {
                const id = row.id != null ? formatValue(row.id) : formatValue(row[columns[0]]);
                this.run(
                    `INSERT INTO ${tableName} (${qIdent('id')}, ${qIdent('_rowJson')}) VALUES (?, ?)`,
                    [id, JSON.stringify(row)]
                );
                return row;
            }
            const safeCols = columns.map(sanitizeIdentifier);
            const colNames = safeCols.map(qIdent).join(', ');
            const placeholders = safeCols.map(() => '?').join(', ');
            const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;
            this.run(insertSql, safeCols.map((c) => formatValue(row[c])));
            return row;
        },

        insertRow(sheetName, row) {
            return this.appendToSheet(sheetName, row);
        },

        insertRows(sheetName, rows) {
            if (!Array.isArray(rows)) return 0;
            for (const r of rows) this.appendToSheet(sheetName, r);
            return rows.length;
        },

        updateRow(...args) {
            let sheetName;
            let keyCol;
            let keyVal;
            let updatedFields;
            if (args.length === 4) {
                [sheetName, keyCol, keyVal, updatedFields] = args;
            } else {
                [sheetName, keyVal, updatedFields] = args;
                keyCol = 'id';
            }
            const { needsJsonRowStorage } = require('./oracle-sheet-sync');
            const columns = (headersMap[sheetName] || []).filter((c) => typeof c === 'string');
            if (needsJsonRowStorage(columns)) {
                const existing = this.findRow(sheetName, keyVal);
                const merged = { ...(existing || {}), ...(updatedFields || {}), [keyCol]: keyVal };
                this.deleteRow(sheetName, keyCol, keyVal);
                this.appendToSheet(sheetName, merged);
                return 1;
            }
            const tableName = qIdent(sheetName);
            const setClauses = [];
            const values = [];
            const validCols = headersMap[sheetName] ? new Set(headersMap[sheetName]) : null;
            for (const [key, val] of Object.entries(updatedFields || {})) {
                if (key === keyCol) continue;
                if (validCols && !validCols.has(key)) continue;
                setClauses.push(`${qIdent(key)} = ?`);
                values.push(formatValue(val));
            }
            if (!setClauses.length) return 0;
            values.push(formatValue(keyVal));
            const sql = `UPDATE ${tableName} SET ${setClauses.join(', ')} WHERE ${qIdent(keyCol)} = ?`;
            return this.run(sql, values).changes || 0;
        },

        deleteRow(...args) {
            let sheetName;
            let keyCol;
            let keyVal;
            if (args.length === 3) {
                [sheetName, keyCol, keyVal] = args;
            } else {
                [sheetName, keyVal] = args;
                keyCol = 'id';
            }
            const sql = `DELETE FROM ${qIdent(sheetName)} WHERE ${qIdent(keyCol)} = ?`;
            return this.run(sql, [formatValue(keyVal)]).changes || 0;
        },

        deleteRows(...args) {
            return this.deleteRow(...args);
        }
    };
    return wrapper;
}

function buildOracleWrapperInProcess(pool, oracledb) {
    async function withConn(fn) {
        const conn = await pool.getConnection();
        try {
            return await fn(conn);
        } finally {
            try { await conn.close(); } catch (_e) {}
        }
    }

    const wrapper = {
        raw: pool,
        engineType: 'oracle',
        persistent: true,
        syncNow() {},
        close() {
            return awaitSync(pool.close(0));
        },
        exec(sql) {
            return awaitSync(withConn(async (conn) => {
                await conn.execute(sql, {}, { autoCommit: true });
            }));
        },
        run(sql, params = []) {
            return awaitSync(withConn(async (conn) => {
                const { sql: oSql, binds } = toOracleBinds(sql, params);
                const result = await conn.execute(oSql, binds, { autoCommit: true });
                return { changes: result.rowsAffected || 0, lastInsertRowid: null };
            }));
        },
        get(sql, params = []) {
            const rows = this.all(sql, params);
            return rows[0] || null;
        },
        all(sql, params = []) {
            return awaitSync(withConn(async (conn) => {
                const { sql: oSql, binds } = toOracleBinds(sql, params);
                const result = await conn.execute(oSql, binds, {
                    outFormat: oracledb.OUT_FORMAT_OBJECT,
                    autoCommit: true
                });
                return (result.rows || []).map(hydrateRow);
            }));
        },
        readFromSheet(sheetName, filter = null) {
            const tableName = qIdent(sheetName);
            try {
                let sql = `SELECT * FROM ${tableName}`;
                const params = [];
                if (filter && typeof filter === 'object') {
                    const conditions = [];
                    for (const [key, val] of Object.entries(filter)) {
                        conditions.push(`${qIdent(key)} = ?`);
                        params.push(formatValue(val));
                    }
                    if (conditions.length) sql += ` WHERE ${conditions.join(' AND ')}`;
                }
                const rows = this.all(sql, params);
                return rows.map((row) => {
                    if (row && row._rowJson != null) {
                        try {
                            const parsed = typeof row._rowJson === 'string' ? JSON.parse(row._rowJson) : row._rowJson;
                            return { ...parsed, id: parsed.id != null ? parsed.id : row.id };
                        } catch (_e) {
                            return hydrateRow(row);
                        }
                    }
                    return hydrateRow(row);
                });
            } catch (e) {
                const msg = String(e && e.message || e);
                if (/ORA-00942|does not exist|no such table/i.test(msg)) return [];
                throw e;
            }
        },
        readSheet(sheetName, filter = null) {
            return this.readFromSheet(sheetName, filter);
        },
        findRow(...args) {
            let sheetName;
            let filter;
            if (args.length === 3) {
                sheetName = args[0];
                filter = { [args[1]]: args[2] };
            } else if (args.length === 2) {
                sheetName = args[0];
                filter = typeof args[1] === 'string' ? { id: args[1] } : args[1];
            }
            const rows = this.readFromSheet(sheetName, filter);
            return rows.length ? rows[0] : null;
        },
        saveToSheet(sheetName, rows) {
            if (!Array.isArray(rows) || !rows.length) return 0;
            const { needsJsonRowStorage } = require('./oracle-sheet-sync');
            const tableName = qIdent(sheetName);
            const columns = (headersMap[sheetName] || Object.keys(rows[0])).filter((c) => typeof c === 'string');
            this.exec(`DELETE FROM ${tableName}`);
            if (needsJsonRowStorage(columns)) {
                const insertSql = `INSERT INTO ${tableName} (${qIdent('id')}, ${qIdent('_rowJson')}) VALUES (?, ?)`;
                let count = 0;
                for (const row of rows) {
                    const id = row.id != null ? formatValue(row.id) : formatValue(row[columns[0]]);
                    this.run(insertSql, [id, JSON.stringify(row)]);
                    count += 1;
                }
                return count;
            }
            const safeCols = columns.map(sanitizeIdentifier);
            const colNames = safeCols.map(qIdent).join(', ');
            const placeholders = safeCols.map(() => '?').join(', ');
            const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;
            let count = 0;
            for (const row of rows) {
                this.run(insertSql, safeCols.map((c) => formatValue(row[c])));
                count += 1;
            }
            return count;
        },
        appendToSheet(sheetName, row) {
            const { needsJsonRowStorage } = require('./oracle-sheet-sync');
            const tableName = qIdent(sheetName);
            const columns = (headersMap[sheetName] || Object.keys(row)).filter((c) => typeof c === 'string');
            if (needsJsonRowStorage(columns)) {
                const id = row.id != null ? formatValue(row.id) : formatValue(row[columns[0]]);
                this.run(
                    `INSERT INTO ${tableName} (${qIdent('id')}, ${qIdent('_rowJson')}) VALUES (?, ?)`,
                    [id, JSON.stringify(row)]
                );
                return row;
            }
            const safeCols = columns.map(sanitizeIdentifier);
            const colNames = safeCols.map(qIdent).join(', ');
            const placeholders = safeCols.map(() => '?').join(', ');
            const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;
            this.run(insertSql, safeCols.map((c) => formatValue(row[c])));
            return row;
        },
        insertRow(sheetName, row) {
            return this.appendToSheet(sheetName, row);
        },
        insertRows(sheetName, rows) {
            if (!Array.isArray(rows)) return 0;
            for (const r of rows) this.appendToSheet(sheetName, r);
            return rows.length;
        },
        updateRow(...args) {
            let sheetName;
            let keyCol;
            let keyVal;
            let updatedFields;
            if (args.length === 4) {
                [sheetName, keyCol, keyVal, updatedFields] = args;
            } else {
                [sheetName, keyVal, updatedFields] = args;
                keyCol = 'id';
            }
            const { needsJsonRowStorage } = require('./oracle-sheet-sync');
            const columns = (headersMap[sheetName] || []).filter((c) => typeof c === 'string');
            if (needsJsonRowStorage(columns)) {
                const existing = this.findRow(sheetName, keyVal);
                const merged = { ...(existing || {}), ...(updatedFields || {}), [keyCol]: keyVal };
                this.deleteRow(sheetName, keyCol, keyVal);
                this.appendToSheet(sheetName, merged);
                return 1;
            }
            const tableName = qIdent(sheetName);
            const setClauses = [];
            const values = [];
            const validCols = headersMap[sheetName] ? new Set(headersMap[sheetName]) : null;
            for (const [key, val] of Object.entries(updatedFields || {})) {
                if (key === keyCol) continue;
                if (validCols && !validCols.has(key)) continue;
                setClauses.push(`${qIdent(key)} = ?`);
                values.push(formatValue(val));
            }
            if (!setClauses.length) return 0;
            values.push(formatValue(keyVal));
            const sql = `UPDATE ${tableName} SET ${setClauses.join(', ')} WHERE ${qIdent(keyCol)} = ?`;
            return this.run(sql, values).changes || 0;
        },
        deleteRow(...args) {
            let sheetName;
            let keyCol;
            let keyVal;
            if (args.length === 3) {
                [sheetName, keyCol, keyVal] = args;
            } else {
                [sheetName, keyVal] = args;
                keyCol = 'id';
            }
            const sql = `DELETE FROM ${qIdent(sheetName)} WHERE ${qIdent(keyCol)} = ?`;
            return this.run(sql, [formatValue(keyVal)]).changes || 0;
        },
        deleteRows(...args) {
            return this.deleteRow(...args);
        }
    };
    return wrapper;
}

function initOracleEngine(oracleCfg) {
    if (!oracleCfg || !oracleCfg.user || !oracleCfg.password || !oracleCfg.connectString) {
        throw new Error('Oracle: اضبط ORACLE_USER و ORACLE_PASSWORD و ORACLE_CONNECT_STRING');
    }

    // Ensure bundlers/NFT see this dependency from the main module graph
    try { require('oracledb'); } catch (_e) {}

    const walletLocation = resolveOracleWalletDir(oracleCfg.walletLocation);
    const cfg = {
        ...oracleCfg,
        walletLocation: walletLocation || oracleCfg.walletLocation || '',
        walletPassword: oracleCfg.walletPassword || process.env.ORACLE_WALLET_PASSWORD || '',
        poolMax: oracleCfg.poolMax || (process.env.VERCEL ? 1 : 4)
    };

    // Vercel: in-process + deasync (worker cannot resolve oracledb in NFT bundle)
    const forceWorker = process.env.ORACLE_USE_WORKER === '1';
    if (!forceWorker) {
        const { oracledb, pool } = awaitSync(createPool(cfg));
        return buildOracleWrapperInProcess(pool, oracledb);
    }

    const bridge = createSyncWorker(cfg);
    try {
        bridge.call('ping');
    } catch (e) {
        try { bridge.worker.terminate(); } catch (_e) {}
        throw e;
    }
    return buildOracleWrapperFromWorker(bridge);
}

module.exports = {
    initOracleEngine,
    createPool,
    sanitizeIdentifier,
    qIdent,
    formatValue,
    toOracleBinds,
    awaitSync,
    resolveOracleWalletDir
};
