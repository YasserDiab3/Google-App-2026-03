#!/usr/bin/env node
/**
 * Generate Oracle DDL for all HSE sheets.
 * Usage: node backend-sql/scripts/oracle-generate-ddl.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { headersMap } = require('../src/db/headers-schema');

const SAFE_IDENTIFIER_REGEX = /^[a-zA-Z0-9_\s\-\/#\(\)\.\&%:\+,أ-ي]+$/;

function sanitizeIdentifier(name) {
    const clean = String(name || '').trim();
    if (!SAFE_IDENTIFIER_REGEX.test(clean)) {
        throw new Error(`bad ident: ${name}`);
    }
    return clean;
}

function qIdent(name) {
    return `"${sanitizeIdentifier(name)}"`;
}

function colType(colName) {
    const c = String(colName || '').toLowerCase();
    // Short key-like fields stay VARCHAR2; everything else CLOB (sheet blobs / JSON / base64)
    if (c === 'id' || c === 'email' || c === 'status' || c === 'role' || c === 'active'
        || c === 'date' || c === 'createdat' || c === 'updatedat' || c === 'userid'
        || c === 'permitid' || c === 'employeeid' || c === 'employeecode' || c.endsWith('id') && c.length <= 24) {
        return 'VARCHAR2(4000)';
    }
    return 'CLOB';
}

function indexName(sheetName, col) {
    const raw = `ix_${sheetName}_${col}`.replace(/[^a-zA-Z0-9_]/g, '_');
    return `"${raw.slice(0, 120)}"`;
}

function buildDdl() {
    const lines = [];
    lines.push('-- HSE Oracle schema (auto-generated from headers-schema.js)');
    lines.push('-- Run once on Autonomous DB as HSE_APP user.');
    lines.push('-- If table exists, statement fails — skip or DROP manually.');
    lines.push('');

    let tableCount = 0;
    for (const [sheetName, columns] of Object.entries(headersMap)) {
        if (!Array.isArray(columns) || !columns.length) continue;
        let safeCols;
        try {
            safeCols = columns
                .filter((col) => typeof col === 'string')
                .map((col) => sanitizeIdentifier(col));
        } catch (_e) {
            // Columns with unusual characters — store as JSON rows
            const table = qIdent(sheetName);
            lines.push(`-- ${sheetName}: unsafe column names — JSON row storage`);
            lines.push(`CREATE TABLE ${table} (`);
            lines.push(`  ${qIdent('id')} VARCHAR2(4000),`);
            lines.push(`  ${qIdent('_rowJson')} CLOB`);
            lines.push(`);`);
            lines.push(`CREATE INDEX ${indexName(sheetName, 'id')} ON ${table} (${qIdent('id')});`);
            lines.push('');
            tableCount += 1;
            continue;
        }
        if (!safeCols.length) continue;

        const table = qIdent(sheetName);
        // Oracle max 1000 columns — wide sheets stored as id + row JSON
        if (safeCols.length > 1000) {
            lines.push(`-- ${sheetName}: ${safeCols.length} cols > 1000 — JSON row storage`);
            lines.push(`CREATE TABLE ${table} (`);
            lines.push(`  ${qIdent('id')} VARCHAR2(4000),`);
            lines.push(`  ${qIdent('_rowJson')} CLOB`);
            lines.push(`);`);
            lines.push(`CREATE INDEX ${indexName(sheetName, 'id')} ON ${table} (${qIdent('id')});`);
            lines.push('');
            tableCount += 1;
            continue;
        }

        const defs = safeCols.map((c) => `  ${qIdent(c)} ${colType(c)}`);
        lines.push(`CREATE TABLE ${table} (`);
        lines.push(defs.join(',\n'));
        lines.push(`);`);
        lines.push('');

        for (const c of ['id', 'email', 'createdAt', 'date', 'status', 'permitId']) {
            if (!safeCols.includes(c)) continue;
            lines.push(`CREATE INDEX ${indexName(sheetName, c)} ON ${table} (${qIdent(c)});`);
        }
        lines.push('');
        tableCount += 1;
    }
    lines.push(`-- tables: ${tableCount}`);
    return { sql: lines.join('\n'), tableCount };
}

function main() {
    const { sql, tableCount } = buildDdl();
    const outDir = path.join(__dirname, '..', 'sql');
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'oracle-schema.sql');
    fs.writeFileSync(outFile, sql, 'utf8');
    console.log('Wrote', outFile);
    console.log('Tables:', tableCount);
}

main();
