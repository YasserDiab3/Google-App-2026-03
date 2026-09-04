#!/usr/bin/env node
/**
 * Migrate SQLite clinic_hse.db → Oracle Autonomous DB (batched executeMany).
 *
 * Usage:
 *   node backend-sql/scripts/migrate-sqlite-to-oracle.js
 *   node backend-sql/scripts/migrate-sqlite-to-oracle.js --tables=Users,ClinicVisits
 *   node backend-sql/scripts/migrate-sqlite-to-oracle.js --dry-run
 *   node backend-sql/scripts/migrate-sqlite-to-oracle.js --apply-ddl
 */
'use strict';

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { headersMap } = require('../src/db/headers-schema');
const { createPool, qIdent, formatValue, sanitizeIdentifier, awaitSync } = require('../src/db/oracle-engine');
const config = require('../src/config/config');

const BATCH = 200;

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

function parseArgs(argv) {
    const out = { dryRun: false, tables: null, applyDdl: process.env.APPLY_DDL === '1' };
    for (const a of argv) {
        if (a === '--dry-run') out.dryRun = true;
        if (a === '--apply-ddl') out.applyDdl = true;
        if (a.startsWith('--tables=')) {
            out.tables = a.slice('--tables='.length).split(',').map((s) => s.trim()).filter(Boolean);
        }
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
            close() {}
        };
    } catch (_e) {
        const Database = require('better-sqlite3');
        const db = new Database(dbPath, { readonly: true });
        return {
            all(sql, params = []) {
                return db.prepare(sql).all(...params);
            },
            close() { try { db.close(); } catch (_e2) {} }
        };
    }
}

async function applyDdlFile(conn, ddlPath) {
    if (!fs.existsSync(ddlPath)) {
        throw new Error('DDL missing. Run: node backend-sql/scripts/oracle-generate-ddl.js');
    }
    const raw = fs.readFileSync(ddlPath, 'utf8');
    const stmts = raw
        .replace(/\r\n/g, '\n')
        .split(/;\s*\n/)
        .map((s) => s.trim().replace(/;+\s*$/, ''))
        .filter((s) => s && !s.startsWith('--'));
    let ok = 0;
    let skip = 0;
    for (const stmt of stmts) {
        try {
            await conn.execute(stmt);
            ok += 1;
        } catch (e) {
            const msg = String(e && e.message || e);
            if (/ORA-00955|name is already used|already exists/i.test(msg)) {
                skip += 1;
                continue;
            }
            console.warn('DDL warn:', msg.slice(0, 160));
        }
    }
    console.log(`DDL done: ok=${ok} skipped_existing=${skip}`);
}

async function insertBatches(conn, insertSql, bindRows) {
    let inserted = 0;
    let errors = 0;
    for (let i = 0; i < bindRows.length; i += BATCH) {
        const chunk = bindRows.slice(i, i + BATCH);
        try {
            const result = await conn.executeMany(insertSql, chunk, { autoCommit: true });
            inserted += result.rowsAffected || chunk.length;
        } catch (e) {
            // Fallback row-by-row for the failing batch
            for (const binds of chunk) {
                try {
                    await conn.execute(insertSql, binds, { autoCommit: true });
                    inserted += 1;
                } catch (e2) {
                    errors += 1;
                    if (errors <= 3) {
                        console.warn('ROW fail:', String(e2.message || e2).slice(0, 140));
                    }
                }
            }
        }
    }
    return { inserted, errors };
}

async function mainAsync() {
    const args = parseArgs(process.argv.slice(2));
    const sqlitePath = process.env.SQLITE_PATH || config.sqlitePath;
    if (!fs.existsSync(sqlitePath)) {
        console.error('SQLite source missing:', sqlitePath);
        process.exit(1);
    }

    console.log('Source SQLite:', sqlitePath);
    console.log('Target Oracle:', process.env.ORACLE_CONNECT_STRING || config.oracle.connectString || '(missing)');
    if (args.dryRun) console.log('DRY RUN — no writes');

    const oracleCfg = {
        ...config.oracle,
        user: process.env.ORACLE_USER || config.oracle.user,
        password: process.env.ORACLE_PASSWORD || config.oracle.password,
        connectString: process.env.ORACLE_CONNECT_STRING || config.oracle.connectString,
        walletLocation: process.env.ORACLE_WALLET_DIR || config.oracle.walletLocation,
        walletPassword: process.env.ORACLE_WALLET_PASSWORD || config.oracle.walletPassword
    };
    if ((!oracleCfg.user || !oracleCfg.password || !oracleCfg.connectString) && !args.dryRun) {
        console.error('Set ORACLE_USER / ORACLE_PASSWORD / ORACLE_CONNECT_STRING (DB_TYPE=oracle optional for migrate)');
        process.exit(1);
    }

    const sqlite = openSqlite(sqlitePath);
    let pool = null;
    let conn = null;
    if (!args.dryRun) {
        const created = await createPool(oracleCfg);
        pool = created.pool;
        conn = await pool.getConnection();
        if (args.applyDdl) {
            const ddlPath = path.join(__dirname, '..', 'sql', 'oracle-schema.sql');
            await applyDdlFile(conn, ddlPath);
        }
    }

    const tableNames = args.tables || Object.keys(headersMap);
    let totalRows = 0;
    const summary = [];

    for (const sheetName of tableNames) {
        const cols = headersMap[sheetName];
        if (!Array.isArray(cols) || !cols.length) continue;
        let rows = [];
        try {
            rows = sqlite.all(`SELECT * FROM "${sheetName}"`);
        } catch (e) {
            summary.push({ sheet: sheetName, rows: 0, status: 'skip-missing-sqlite' });
            continue;
        }
        if (!rows.length) {
            summary.push({ sheet: sheetName, rows: 0, status: 'empty' });
            continue;
        }

        if (args.dryRun) {
            summary.push({ sheet: sheetName, rows: rows.length, status: 'dry-run' });
            totalRows += rows.length;
            continue;
        }

        try {
            await conn.execute(`DELETE FROM ${qIdent(sheetName)}`, {}, { autoCommit: true });
        } catch (e) {
            summary.push({ sheet: sheetName, rows: rows.length, status: 'no-oracle-table', error: String(e.message || e).slice(0, 80) });
            continue;
        }

        const columns = cols.filter((c) => typeof c === 'string');
        const useJsonRows = needsJsonRowStorage(columns);
        let insertSql;
        let bindRows;
        if (useJsonRows) {
            insertSql = `INSERT INTO ${qIdent(sheetName)} (${qIdent('id')}, ${qIdent('_rowJson')}) VALUES (:1, :2)`;
            bindRows = rows.map((row) => {
                const id = row.id != null ? formatValue(row.id) : formatValue(row[columns[0]]);
                return [id, JSON.stringify(row)];
            });
            console.log(`JSON-ROW ${sheetName}: ${columns.length} cols / ${rows.length} rows`);
        } else {
            const colNames = columns.map(qIdent).join(', ');
            const placeholders = columns.map((_, i) => `:${i + 1}`).join(', ');
            insertSql = `INSERT INTO ${qIdent(sheetName)} (${colNames}) VALUES (${placeholders})`;
            bindRows = rows.map((row) => columns.map((c) => formatValue(row[c])));
        }

        const { inserted, errors } = await insertBatches(conn, insertSql, bindRows);
        totalRows += inserted;
        const status = errors ? (inserted ? 'partial' : 'fail') : 'ok';
        summary.push({ sheet: sheetName, rows: inserted, status, error: errors ? `${errors} row errors` : undefined });
        console.log(`${status === 'ok' ? 'OK' : status.toUpperCase()} ${sheetName}: ${inserted}` + (errors ? ` (errors=${errors})` : ''));
    }

    sqlite.close();
    if (conn) {
        try { await conn.close(); } catch (_e) {}
    }
    if (pool) {
        try { await pool.close(0); } catch (_e) {}
    }

    console.log('\n=== SUMMARY ===');
    console.log('tables:', summary.length, 'rows:', totalRows);
    const failed = summary.filter((s) => s.status !== 'ok' && s.status !== 'empty' && s.status !== 'dry-run' && s.status !== 'skip-missing-sqlite');
    if (failed.length) {
        console.log('issues:', failed.length);
        failed.slice(0, 30).forEach((f) => console.log(' -', f.sheet, f.status, f.error || ''));
    }
    console.log(args.dryRun ? 'DRY RUN complete' : 'Migration complete');
}

mainAsync().catch((e) => {
    console.error('FATAL', e.message || e);
    process.exit(1);
});
