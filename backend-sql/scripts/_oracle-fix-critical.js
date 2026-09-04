'use strict';
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { DatabaseSync } = require('node:sqlite');
const { createPool, qIdent, formatValue } = require('../src/db/oracle-engine');
const config = require('../src/config/config');
const { headersMap } = require('../src/db/headers-schema');

async function recreateAndLoad(conn, sheetName, forceJson) {
  const cols = (headersMap[sheetName] || []).filter((c) => typeof c === 'string');
  if (!cols.length) return { sheet: sheetName, status: 'no-headers' };

  try { await conn.execute(`DROP TABLE ${qIdent(sheetName)} CASCADE CONSTRAINTS PURGE`); } catch (_e) {}

  const useJson = forceJson || cols.length > 1000;
  if (useJson) {
    await conn.execute(`CREATE TABLE ${qIdent(sheetName)} (${qIdent('id')} VARCHAR2(4000), ${qIdent('_rowJson')} CLOB)`);
  } else {
    // All CLOB except tiny keys — avoids ORA-12899 / ORA-01461 on sheet blobs
    const keyish = new Set(['id', 'email', 'status', 'role', 'active', 'date', 'createdAt', 'updatedAt', 'userId', 'permitId']);
    const defs = cols.map((c) => `  ${qIdent(c)} ${keyish.has(c) ? 'VARCHAR2(4000)' : 'CLOB'}`);
    await conn.execute(`CREATE TABLE ${qIdent(sheetName)} (\n${defs.join(',\n')}\n)`);
  }

  const sqlite = new DatabaseSync(require('path').join(__dirname, '..', 'data', 'clinic_hse.db'));
  let rows = [];
  try {
    rows = sqlite.prepare(`SELECT * FROM "${sheetName}"`).all();
  } catch (e) {
    return { sheet: sheetName, status: 'no-sqlite', error: e.message };
  }
  if (!rows.length) return { sheet: sheetName, rows: 0, status: 'empty' };

  let insertSql;
  let binds;
  if (useJson) {
    insertSql = `INSERT INTO ${qIdent(sheetName)} (${qIdent('id')}, ${qIdent('_rowJson')}) VALUES (:1, :2)`;
    binds = rows.map((r) => [formatValue(r.id != null ? r.id : r[cols[0]]), JSON.stringify(r)]);
  } else {
    const placeholders = cols.map((_, i) => `:${i + 1}`).join(', ');
    insertSql = `INSERT INTO ${qIdent(sheetName)} (${cols.map(qIdent).join(', ')}) VALUES (${placeholders})`;
    binds = rows.map((r) => cols.map((c) => formatValue(r[c])));
  }

  let inserted = 0;
  let errors = 0;
  const BATCH = 100;
  for (let i = 0; i < binds.length; i += BATCH) {
    const chunk = binds.slice(i, i + BATCH);
    try {
      const res = await conn.executeMany(insertSql, chunk, { autoCommit: true });
      inserted += res.rowsAffected || chunk.length;
    } catch (_e) {
      for (const b of chunk) {
        try {
          await conn.execute(insertSql, b, { autoCommit: true });
          inserted += 1;
        } catch (e2) {
          errors += 1;
          if (errors <= 2) console.warn(sheetName, String(e2.message || e2).slice(0, 120));
        }
      }
    }
  }
  return { sheet: sheetName, rows: inserted, errors, status: errors ? 'partial' : 'ok' };
}

(async () => {
  const { pool } = await createPool({
    ...config.oracle,
    walletPassword: process.env.ORACLE_WALLET_PASSWORD,
    walletLocation: process.env.ORACLE_WALLET_DIR
  });
  const conn = await pool.getConnection();

  const targets = [
    ['Users', false],
    ['Company_Settings', false],
    ['UserAILog', false],
    ['Violation_Types_DB', false],
    ['PPEMatrix', true],
    ['EmployeeTrainingMatrix', true]
  ];

  for (const [name, json] of targets) {
    const r = await recreateAndLoad(conn, name, json);
    console.log(JSON.stringify(r));
  }

  const check = await conn.execute('SELECT COUNT(*) AS C FROM "Users"');
  console.log('Users count', check.rows);

  await conn.close();
  await pool.close(0);
})().catch((e) => {
  console.error('FATAL', e.message || e);
  process.exit(1);
});
