/**
 * Database Abstraction Layer (Universal Signature Support & Engine Fallback)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const config = require('../config/config');
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

function isSafeIdentifier(name) {
    try {
        sanitizeIdentifier(name);
        return true;
    } catch (_) {
        return false;
    }
}

/** حد استجابة Vercel ~4.5MB — نُبقي هامش JSON/التغليف */
const MAX_RPC_LIST_BYTES = 3 * 1024 * 1024;

function capRowsForRpc(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return rows;
    let jsonLen = 0;
    try {
        jsonLen = JSON.stringify(rows).length;
    } catch (_e) {
        return rows.slice(0, Math.min(80, rows.length));
    }
    if (jsonLen <= MAX_RPC_LIST_BYTES) return rows;
    let lo = 1;
    let hi = rows.length;
    let best = rows.slice(-1);
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const slice = rows.slice(-mid);
        let n = 0;
        try {
            n = JSON.stringify(slice).length;
        } catch (_e) {
            hi = mid - 1;
            continue;
        }
        if (n <= MAX_RPC_LIST_BYTES) {
            best = slice;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return best;
}

function formatSqliteValue(val) {
    if (val === undefined || val === null) return null;
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'object') return JSON.stringify(val);
    return val;
}

function parseSqliteValue(val) {
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

function hydrateSheetRow(row) {
    if (!row || typeof row !== 'object') return row;
    const out = {};
    for (const [k, v] of Object.entries(row)) {
        out[k] = parseSqliteValue(v);
    }
    return out;
}

/** أعمدة Blob لا تُجلب في قوائم الموديولات — الصور تُحمَّل عند عرض سجل واحد */
const HEAVY_LIST_FIELDS = {
    DailyObservations: ['attachments', 'afterExecutionImages', 'timeLog', 'updates', 'comments'],
    Incidents: ['attachments', 'investigation', 'actionPlan', 'image', 'injuries', 'losses', 'actions', 'userData'],
    Employees: ['photo'],
    PTW: [
        'approvals', 'riskAssessment', 'teamMembers', 'hotWorkDetails', 'confinedSpaceDetails',
        'heightWorkDetails', 'equipment', 'tools', 'toolsList', 'requiredPPE', 'preStartChecklist',
        'gasTesting', 'governmentPermits', 'mocRequest', 'closureApproval', 'manualApprovals',
        'manualClosureApprovals'
    ],
    PTWRegistry: [
        'equipment', 'tools', 'toolsList', 'hotWorkDetails', 'confinedSpaceDetails',
        'heightWorkDetails', 'preStartChecklist', 'governmentPermits', 'gasTesting',
        'mocRequest', 'requiredPPE'
    ],
    NearMiss: ['attachments']
};

function isListModeRead(filter, options) {
    return !!(options && options.listMode) && !filter;
}

function countStoredBlob(val) {
    if (val == null || val === '') return 0;
    if (Array.isArray(val)) return val.length;
    if (typeof val === 'string') {
        const s = val.trim();
        return s.length > 2 ? 1 : 0;
    }
    if (typeof val === 'object') return 1;
    return 0;
}

function slimRowsForList(sheetName, rows) {
    const omit = HEAVY_LIST_FIELDS[sheetName];
    if (!omit || !Array.isArray(rows) || rows.length === 0) return rows;
    return rows.map((row) => {
        if (!row || typeof row !== 'object') return row;
        const out = { ...row };
        if (omit.includes('attachments')) {
            out.attachmentCount = Number(out.attachmentCount) || countStoredBlob(out.attachments);
            out.attachments = out.attachmentCount > 0 ? [{ __listOnly: true }] : [];
        }
        if (omit.includes('afterExecutionImages')) {
            out.afterImageCount = Number(out.afterImageCount) || countStoredBlob(out.afterExecutionImages);
            out.afterExecutionImages = [];
        }
        for (const field of omit) {
            if (field === 'attachments' || field === 'afterExecutionImages') continue;
            if (!(field in out)) continue;
            out[field] = Array.isArray(out[field]) ? [] : '';
        }
        return out;
    });
}

function buildListSelectSql(sheetName, tableName) {
    const allCols = headersMap[sheetName] || [];
    const omit = (HEAVY_LIST_FIELDS[sheetName] || []).filter((c) => allCols.includes(c));
    if (!allCols.length || !omit.length) return `SELECT * FROM ${tableName}`;
    const cols = allCols
        .filter((c) => !omit.includes(c) && isSafeIdentifier(c))
        .map((c) => `"${c.trim()}"`);
    if (omit.includes('attachments')) {
        cols.push('CASE WHEN "attachments" IS NOT NULL AND length("attachments") > 2 THEN 1 ELSE 0 END AS attachmentCount');
    }
    if (omit.includes('afterExecutionImages')) {
        cols.push('CASE WHEN "afterExecutionImages" IS NOT NULL AND length("afterExecutionImages") > 2 THEN 1 ELSE 0 END AS afterImageCount');
    }
    return `SELECT ${cols.join(', ')} FROM ${tableName}`;
}

let dbInstance = null;

function initDatabase(overridePath = null) {
    if (dbInstance) return dbInstance;

    const dbPath = overridePath || config.sqlitePath;
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
        try { fs.mkdirSync(dbDir, { recursive: true }); } catch (_) {}
    }

    // Auto-decompress lightweight bundled database on serverless cold start
    if (!fs.existsSync(dbPath) || fs.statSync(dbPath).size === 0) {
        const zlib = require('zlib');
        const candidateGz = [
            dbPath + '.gz',
            path.join(__dirname, '..', 'data', 'clinic_hse.db.gz'),
            path.join(__dirname, '..', '..', 'data', 'sql', 'clinic_hse.db.gz'),
            path.join(process.cwd(), 'data', 'sql', 'clinic_hse.db.gz'),
            path.join(process.cwd(), 'backend-sql', 'data', 'clinic_hse.db.gz')
        ];
        for (const gzFile of candidateGz) {
            if (fs.existsSync(gzFile)) {
                try {
                    const decompressed = zlib.gunzipSync(fs.readFileSync(gzFile));
                    fs.writeFileSync(dbPath, decompressed);
                    break;
                } catch (_) {}
            }
        }
    }

    let sqliteDb = null;
    let engineType = 'node:sqlite';

    // 1. Try Node 22+ built-in node:sqlite
    try {
        const { DatabaseSync } = require('node:sqlite');
        sqliteDb = new DatabaseSync(dbPath);
        sqliteDb.exec('PRAGMA journal_mode = WAL;');
        sqliteDb.exec('PRAGMA synchronous = NORMAL;');
        sqliteDb.exec('PRAGMA foreign_keys = ON;');
    } catch (_) {
        // 2. Try better-sqlite3 (Node 18/20)
        try {
            const Database = require('better-sqlite3');
            sqliteDb = new Database(dbPath);
            sqliteDb.pragma('journal_mode = WAL');
            sqliteDb.pragma('synchronous = NORMAL');
            sqliteDb.pragma('foreign_keys = ON');
            engineType = 'better-sqlite3';
        } catch (_) {
            engineType = 'json-fallback';
        }
    }

    let wrapper;

    if (sqliteDb && engineType !== 'json-fallback') {
        wrapper = {
            raw: sqliteDb,
            engineType,

            exec(sql) {
                return sqliteDb.exec(sql);
            },

            run(sql, params = []) {
                const stmt = sqliteDb.prepare(sql);
                return stmt.run(...params);
            },

            get(sql, params = []) {
                const stmt = sqliteDb.prepare(sql);
                return stmt.get(...params);
            },

            all(sql, params = []) {
                const stmt = sqliteDb.prepare(sql);
                return stmt.all(...params);
            },

            readFromSheet(sheetName, filter = null, options = {}) {
                const safeTable = sanitizeIdentifier(sheetName);
                const tableName = `"${safeTable}"`;
                const listMode = isListModeRead(filter, options);
                try {
                    let sql = listMode ? buildListSelectSql(sheetName, tableName) : `SELECT * FROM ${tableName}`;
                    const params = [];

                    if (filter && typeof filter === 'object') {
                        const conditions = [];
                        for (const [key, val] of Object.entries(filter)) {
                            const safeKey = sanitizeIdentifier(key);
                            conditions.push(`"${safeKey}" = ?`);
                            params.push(val);
                        }
                        if (conditions.length > 0) {
                            sql += ` WHERE ` + conditions.join(' AND ');
                        }
                    }

                    let rows;
                    try {
                        rows = this.all(sql, params).map(hydrateSheetRow);
                    } catch (queryErr) {
                        if (!listMode) throw queryErr;
                        sql = `SELECT * FROM ${tableName}`;
                        if (params.length) sql += ' WHERE ' + Object.keys(filter).map((key) => `"${sanitizeIdentifier(key)}" = ?`).join(' AND ');
                        rows = this.all(sql, params).map(hydrateSheetRow);
                    }
                    const slim = listMode ? slimRowsForList(sheetName, rows) : rows;
                    return listMode ? capRowsForRpc(slim) : slim;
                } catch (e) {
                    if (e.message && e.message.includes('no such table')) {
                        return [];
                    }
                    throw e;
                }
            },

            readSheet(sheetName, filter = null, options = {}) {
                return this.readFromSheet(sheetName, filter, options);
            },

            findRow(...args) {
                let sheetName, filter;
                if (args.length === 3) {
                    sheetName = args[0];
                    filter = { [args[1]]: args[2] };
                } else if (args.length === 2) {
                    sheetName = args[0];
                    if (typeof args[1] === 'string') {
                        filter = { id: args[1] };
                    } else {
                        filter = args[1];
                    }
                }
                const rows = this.readFromSheet(sheetName, filter);
                return rows.length > 0 ? rows[0] : null;
            },

            saveToSheet(sheetName, rows) {
                if (!Array.isArray(rows) || rows.length === 0) return 0;
                const safeTable = sanitizeIdentifier(sheetName);
                const tableName = `"${safeTable}"`;
                const columns = (headersMap[sheetName] || Object.keys(rows[0])).map(c => sanitizeIdentifier(c));

                this.exec(`DELETE FROM ${tableName}`);

                const colNames = columns.map(c => `"${c}"`).join(', ');
                const placeholders = columns.map(() => '?').join(', ');
                const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;
                const stmt = sqliteDb.prepare(insertSql);

                let count = 0;
                for (const row of rows) {
                    const values = columns.map(c => formatSqliteValue(row[c]));
                    stmt.run(...values);
                    count++;
                }
                return count;
            },

            appendToSheet(sheetName, row) {
                const safeTable = sanitizeIdentifier(sheetName);
                const tableName = `"${safeTable}"`;
                const columns = (headersMap[sheetName] || Object.keys(row)).map(c => sanitizeIdentifier(c));
                const colNames = columns.map(c => `"${c}"`).join(', ');
                const placeholders = columns.map(() => '?').join(', ');
                const insertSql = `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders})`;

                const values = columns.map(c => formatSqliteValue(row[c]));

                this.run(insertSql, values);
                return row;
            },

            insertRow(sheetName, row) {
                return this.appendToSheet(sheetName, row);
            },

            insertRows(sheetName, rows) {
                if (!Array.isArray(rows)) return 0;
                for (const r of rows) {
                    this.appendToSheet(sheetName, r);
                }
                return rows.length;
            },

            updateRow(...args) {
                let sheetName, keyCol, keyVal, updatedFields;
                if (args.length === 4) {
                    [sheetName, keyCol, keyVal, updatedFields] = args;
                } else {
                    [sheetName, keyVal, updatedFields] = args;
                    keyCol = 'id';
                }

                const safeTable = sanitizeIdentifier(sheetName);
                const safeKeyCol = sanitizeIdentifier(keyCol);
                const tableName = `"${safeTable}"`;
                const setClauses = [];
                const values = [];
                const validCols = headersMap[sheetName] ? new Set(headersMap[sheetName]) : null;

                for (const [key, val] of Object.entries(updatedFields || {})) {
                    if (key === keyCol) continue;
                    if (validCols && !validCols.has(key)) continue;
                    const safeCol = sanitizeIdentifier(key);
                    setClauses.push(`"${safeCol}" = ?`);
                    values.push(formatSqliteValue(val));
                }

                if (setClauses.length === 0) return 0;

                values.push(formatSqliteValue(keyVal));
                const updateSql = `UPDATE ${tableName} SET ${setClauses.join(', ')} WHERE "${safeKeyCol}" = ?`;
                const result = this.run(updateSql, values);
                return result.changes;
            },

            deleteRow(...args) {
                let sheetName, keyCol, keyVal;
                if (args.length === 3) {
                    [sheetName, keyCol, keyVal] = args;
                } else {
                    [sheetName, keyVal] = args;
                    keyCol = 'id';
                }

                const safeTable = sanitizeIdentifier(sheetName);
                const safeKeyCol = sanitizeIdentifier(keyCol);
                const tableName = `"${safeTable}"`;
                const deleteSql = `DELETE FROM ${tableName} WHERE "${safeKeyCol}" = ?`;
                const result = this.run(deleteSql, [keyVal]);
                return result.changes;
            },

            deleteRows(...args) {
                return this.deleteRow(...args);
            }
        };
    } else {
        // Pure-JS JSON File Engine Fallback for Node without native SQLite binaries
        const jsonStore = {};
        const getStore = (s) => {
            if (!jsonStore[s]) {
                const file = path.join(dbDir, `sheet_${s}.json`);
                if (fs.existsSync(file)) {
                    try { jsonStore[s] = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (_) { jsonStore[s] = []; }
                } else { jsonStore[s] = []; }
            }
            return jsonStore[s];
        };
        const saveStore = (s) => {
            try {
                const file = path.join(dbDir, `sheet_${s}.json`);
                fs.writeFileSync(file, JSON.stringify(jsonStore[s] || [], null, 2));
            } catch (_) {}
        };

        wrapper = {
            raw: jsonStore,
            engineType: 'json-fallback',
            exec() { return true; },
            run() { return { changes: 1 }; },
            get() { return null; },
            all() { return []; },
            readFromSheet(sheetName, filter = null, options = {}) {
                const list = (getStore(sheetName) || []).map(hydrateSheetRow);
                const filtered = !filter
                    ? list
                    : list.filter(row => Object.entries(filter).every(([k, v]) => String(row[k]) === String(v)));
                const slim = isListModeRead(filter, options) ? slimRowsForList(sheetName, filtered) : filtered;
                return isListModeRead(filter, options) ? capRowsForRpc(slim) : slim;
            },
            readSheet(sheetName, filter = null, options = {}) {
                return this.readFromSheet(sheetName, filter, options);
            },
            findRow(sheetName, filter) {
                const rows = this.readFromSheet(sheetName, filter);
                return rows.length > 0 ? rows[0] : null;
            },
            saveToSheet(sheetName, rows) {
                jsonStore[sheetName] = Array.isArray(rows) ? [...rows] : [];
                saveStore(sheetName);
                return jsonStore[sheetName].length;
            },
            appendToSheet(sheetName, row) {
                const list = getStore(sheetName);
                list.push(row);
                saveStore(sheetName);
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
                let sheetName, keyCol, keyVal, updatedFields;
                if (args.length === 4) {
                    [sheetName, keyCol, keyVal, updatedFields] = args;
                } else {
                    [sheetName, keyVal, updatedFields] = args;
                    keyCol = 'id';
                }
                const list = getStore(sheetName);
                const idx = list.findIndex(r => String(r[keyCol]) === String(keyVal));
                if (idx !== -1) {
                    list[idx] = { ...list[idx], ...updatedFields };
                    saveStore(sheetName);
                    return 1;
                }
                return 0;
            },
            deleteRow(...args) {
                let sheetName, keyCol, keyVal;
                if (args.length === 3) {
                    [sheetName, keyCol, keyVal] = args;
                } else {
                    [sheetName, keyVal] = args;
                    keyCol = 'id';
                }
                const list = getStore(sheetName);
                const before = list.length;
                jsonStore[sheetName] = list.filter(r => String(r[keyCol]) !== String(keyVal));
                saveStore(sheetName);
                return before - jsonStore[sheetName].length;
            },
            deleteRows(...args) {
                return this.deleteRow(...args);
            }
        };
    }

    dbInstance = wrapper;
    return dbInstance;
}

function getDatabase() {
    if (!dbInstance) {
        return initDatabase();
    }
    return dbInstance;
}

module.exports = {
    initDatabase,
    getDatabase
};
