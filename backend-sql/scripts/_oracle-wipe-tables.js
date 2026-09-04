'use strict';
/**
 * Drop all user tables in Oracle schema (fresh remigrate).
 * Usage: node scripts/_oracle-wipe-tables.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { initOracleEngine } = require('../src/db/oracle-engine');
const config = require('../src/config/config');

const db = initOracleEngine(config.oracle);
const tables = db.all(`SELECT table_name AS "table_name" FROM user_tables`);
console.log('tables found:', tables.length);
for (const t of tables) {
  const name = t.table_name || t.TABLE_NAME;
  try {
    db.exec(`DROP TABLE "${name}" CASCADE CONSTRAINTS PURGE`);
    console.log('dropped', name);
  } catch (e) {
    console.warn('fail drop', name, String(e.message || e).slice(0, 100));
  }
}
console.log('wipe done');
db.close();
