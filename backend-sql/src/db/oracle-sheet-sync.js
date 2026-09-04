#!/usr/bin/env node
/**
 * Sync one or more SQLite sheets → Oracle (DELETE + INSERT, JSON-ROW aware).
 * Used by live ORACLE_MIRROR and by import scripts.
 */
'use strict';

const { headersMap } = require('./headers-schema');
const { qIdent, formatValue, sanitizeIdentifier } = require('./oracle-engine');

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

/**
 * @param {object} oracleDb - Oracle wrapper (run/exec)
 * @param {object} sqliteDb - SQLite wrapper with .all(sql) or better-sqlite/node:sqlite prepare API
 * @param {string} sheetName
 * @returns {{ sheet: string, rows: number, status: string, error?: string }}
 */
function syncSheetToOracle(oracleDb, sqliteDb, sheetName) {
    const cols = headersMap[sheetName];
    if (!Array.isArray(cols) || !cols.length) {
        return { sheet: sheetName, rows: 0, status: 'skip-no-headers' };
    }

    let rows = [];
    try {
        if (typeof sqliteDb.all === 'function' && sqliteDb.all.length >= 1) {
            // Our sqlite wrapper: all(sql, params)
            try {
                rows = sqliteDb.all(`SELECT * FROM "${sheetName}"`);
            } catch (_e) {
                // raw DatabaseSync / better-sqlite3
                rows = sqliteDb.prepare
                    ? sqliteDb.prepare(`SELECT * FROM "${sheetName}"`).all()
                    : [];
            }
        } else if (typeof sqliteDb.prepare === 'function') {
            rows = sqliteDb.prepare(`SELECT * FROM "${sheetName}"`).all();
        } else if (typeof sqliteDb.readFromSheet === 'function') {
            rows = sqliteDb.readFromSheet(sheetName) || [];
        } else {
            return { sheet: sheetName, rows: 0, status: 'skip-no-sqlite-api' };
        }
    } catch (e) {
        return { sheet: sheetName, rows: 0, status: 'skip-missing-sqlite', error: String(e.message || e).slice(0, 100) };
    }

    try {
        oracleDb.exec(`DELETE FROM ${qIdent(sheetName)}`);
    } catch (e) {
        return { sheet: sheetName, rows: rows.length, status: 'no-oracle-table', error: String(e.message || e).slice(0, 100) };
    }

    if (!rows.length) {
        return { sheet: sheetName, rows: 0, status: 'ok-empty' };
    }

    const columns = cols.filter((c) => typeof c === 'string');
    const useJson = needsJsonRowStorage(columns);

    try {
        if (useJson) {
            const insertSql = `INSERT INTO ${qIdent(sheetName)} (${qIdent('id')}, ${qIdent('_rowJson')}) VALUES (?, ?)`;
            for (const row of rows) {
                const id = row.id != null ? formatValue(row.id) : formatValue(row[columns[0]]);
                oracleDb.run(insertSql, [id, JSON.stringify(row)]);
            }
        } else {
            const colNames = columns.map(qIdent).join(', ');
            const placeholders = columns.map(() => '?').join(', ');
            const insertSql = `INSERT INTO ${qIdent(sheetName)} (${colNames}) VALUES (${placeholders})`;
            for (const row of rows) {
                oracleDb.run(insertSql, columns.map((c) => formatValue(row[c])));
            }
        }
        return { sheet: sheetName, rows: rows.length, status: 'ok' };
    } catch (e) {
        return { sheet: sheetName, rows: 0, status: 'fail', error: String(e.message || e).slice(0, 160) };
    }
}

function syncSheetsToOracle(oracleDb, sqliteDb, sheetNames) {
    const summary = [];
    for (const name of sheetNames) {
        summary.push(syncSheetToOracle(oracleDb, sqliteDb, name));
    }
    return summary;
}

module.exports = {
    needsJsonRowStorage,
    syncSheetToOracle,
    syncSheetsToOracle
};
