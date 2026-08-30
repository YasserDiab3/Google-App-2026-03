/**
 * Database Abstraction Layer (SQLite & PostgreSQL Compatible)
 */
'use strict';

const config = require('../config/config');
const { headersMap } = require('./headers-schema');

let dbInstance = null;

function initDatabase(overridePath = null) {
    if (dbInstance) return dbInstance;

    const dbPath = overridePath || config.sqlitePath;
    
    // Using Node 22 built-in DatabaseSync
    const { DatabaseSync } = require('node:sqlite');
    const sqliteDb = new DatabaseSync(dbPath);
    
    // Enable WAL mode and foreign keys for high performance concurrency & reliability
    sqliteDb.exec('PRAGMA journal_mode = WAL;');
    sqliteDb.exec('PRAGMA synchronous = NORMAL;');
    sqliteDb.exec('PRAGMA foreign_keys = ON;');

    const wrapper = {
        raw: sqliteDb,
        
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

        transaction(fn) {
            sqliteDb.exec('BEGIN TRANSACTION;');
            try {
                const res = fn();
                sqliteDb.exec('COMMIT;');
                return res;
            } catch (err) {
                sqliteDb.exec('ROLLBACK;');
                throw err;
            }
        },

        // ==========================================
        // High-level Sheet / Table CRUD Helpers
        // ==========================================
        
        getTableName(sheetName) {
            return `"${sheetName}"`;
        },

        getColumnName(col) {
            return `"${col}"`;
        },

        /**
         * Reads all rows from a given sheet table
         */
        readSheet(sheetName) {
            const tableName = this.getTableName(sheetName);
            try {
                return this.all(`SELECT * FROM ${tableName}`);
            } catch (err) {
                if (String(err.message).includes('no such table')) {
                    return [];
                }
                throw err;
            }
        },

        /**
         * Inserts a single row into a sheet table
         */
        insertRow(sheetName, data) {
            const cols = headersMap[sheetName] || Object.keys(data);
            if (!cols || cols.length === 0) return null;

            const presentCols = [];
            const placeholders = [];
            const values = [];

            for (const col of cols) {
                if (data[col] !== undefined) {
                    presentCols.push(this.getColumnName(col));
                    placeholders.push('?');
                    let val = data[col];
                    if (val !== null && typeof val === 'object') {
                        val = JSON.stringify(val);
                    }
                    values.push(val === undefined ? null : val);
                }
            }

            if (presentCols.length === 0) return null;

            const sql = `INSERT INTO ${this.getTableName(sheetName)} (${presentCols.join(', ')}) VALUES (${placeholders.join(', ')})`;
            this.run(sql, values);
            return data;
        },

        /**
         * Inserts multiple rows in a batch transaction
         */
        insertRows(sheetName, rows) {
            if (!Array.isArray(rows) || rows.length === 0) return 0;
            return this.transaction(() => {
                let count = 0;
                for (const row of rows) {
                    this.insertRow(sheetName, row);
                    count++;
                }
                return count;
            });
        },

        /**
         * Updates rows matching a specific key
         */
        updateRow(sheetName, keyColumn, keyValue, updateData) {
            const cols = Object.keys(updateData);
            if (cols.length === 0) return 0;

            const setClauses = [];
            const values = [];

            for (const col of cols) {
                setClauses.push(`${this.getColumnName(col)} = ?`);
                let val = updateData[col];
                if (val !== null && typeof val === 'object') {
                    val = JSON.stringify(val);
                }
                values.push(val === undefined ? null : val);
            }

            values.push(keyValue);
            const sql = `UPDATE ${this.getTableName(sheetName)} SET ${setClauses.join(', ')} WHERE ${this.getColumnName(keyColumn)} = ?`;
            const result = this.run(sql, values);
            return result.changes || 0;
        },

        /**
         * Deletes rows matching a specific key
         */
        deleteRows(sheetName, keyColumn, keyValue) {
            const sql = `DELETE FROM ${this.getTableName(sheetName)} WHERE ${this.getColumnName(keyColumn)} = ?`;
            const result = this.run(sql, [keyValue]);
            return result.changes || 0;
        },

        /**
         * Overwrites all rows in a sheet table
         */
        saveToSheet(sheetName, rows) {
            return this.transaction(() => {
                this.exec(`DELETE FROM ${this.getTableName(sheetName)};`);
                if (Array.isArray(rows) && rows.length > 0) {
                    for (const row of rows) {
                        this.insertRow(sheetName, row);
                    }
                }
                return { success: true, count: Array.isArray(rows) ? rows.length : 0 };
            });
        }
    };

    dbInstance = wrapper;
    return wrapper;
}

function getDatabase() {
    if (!dbInstance) {
        return initDatabase();
    }
    return dbInstance;
}

function resetDatabaseInstance() {
    dbInstance = null;
}

module.exports = {
    initDatabase,
    getDatabase,
    resetDatabaseInstance
};
