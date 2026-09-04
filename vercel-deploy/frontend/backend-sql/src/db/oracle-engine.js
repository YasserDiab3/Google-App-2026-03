/**
 * Oracle Autonomous DB engine — same sheet API as SQLite wrapper (sync).
 * Env: ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING
 * Optional: ORACLE_WALLET_DIR / TNS_ADMIN / ORACLE_WALLET_PASSWORD
 */
'use strict';

const { headersMap } = require('./headers-schema');

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
    let deasync;
    try {
        deasync = require('deasync');
    } catch (_e) {
        throw new Error('حزمة deasync مطلوبة لمحرك Oracle. نفّذ: npm install deasync --prefix backend-sql');
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

async function createPool(oracleCfg) {
    let oracledb;
    try {
        oracledb = require('oracledb');
    } catch (e) {
        throw new Error('حزمة oracledb غير مثبتة. نفّذ: npm install oracledb --prefix backend-sql');
    }

    if (oracleCfg.walletLocation) {
        process.env.TNS_ADMIN = oracleCfg.walletLocation;
        try {
            oracledb.initOracleClient({ configDir: oracleCfg.walletLocation });
        } catch (_e) { /* thin TLS may still work */ }
    }

    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    try {
        oracledb.fetchAsString = [oracledb.CLOB];
    } catch (_e) { /* older versions */ }
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

function buildOracleWrapper(pool, oracledb) {
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
            const tableName = qIdent(sheetName);
            const columns = (headersMap[sheetName] || Object.keys(rows[0])).map(sanitizeIdentifier);
            this.exec(`DELETE FROM ${tableName}`);
            const colNames = columns.map(qIdent).join(', ');
            const placeholders = columns.map(() => '?').join(', ');
            const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;
            let count = 0;
            for (const row of rows) {
                this.run(insertSql, columns.map((c) => formatValue(row[c])));
                count += 1;
            }
            return count;
        },

        appendToSheet(sheetName, row) {
            const tableName = qIdent(sheetName);
            const columns = (headersMap[sheetName] || Object.keys(row)).map(sanitizeIdentifier);
            const colNames = columns.map(qIdent).join(', ');
            const placeholders = columns.map(() => '?').join(', ');
            const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;
            this.run(insertSql, columns.map((c) => formatValue(row[c])));
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
    const { oracledb, pool } = awaitSync(createPool(oracleCfg));
    awaitSync((async () => {
        const conn = await pool.getConnection();
        try {
            await conn.execute('SELECT 1 AS ok FROM DUAL');
        } finally {
            await conn.close();
        }
    })());
    return buildOracleWrapper(pool, oracledb);
}

module.exports = {
    initOracleEngine,
    createPool,
    sanitizeIdentifier,
    qIdent,
    formatValue,
    toOracleBinds,
    awaitSync
};
