'use strict';
const path = require('path');
const { initDatabase } = require('../src/db/database');

const sheets = ['ClinicVisits', 'Employees', 'Users', 'Medications', 'PTW', 'Training', 'DailyObservations', 'Incidents', 'ClinicContractorVisits'];
const dbPath = process.argv[2] || path.join(__dirname, '../data/clinic_hse.db');
process.env.SQLITE_PATH = dbPath;
// reset singleton
require('../src/db/database').getDatabase = () => {
  const mod = require('../src/db/database');
  mod.dbInstance = null;
  return mod.initDatabase(dbPath);
};

const db = require('../src/db/database');
db.dbInstance = null;
const instance = db.initDatabase(dbPath);
const out = {};
for (const s of sheets) {
  try { out[s] = instance.readSheet(s).length; } catch (e) { out[s] = `ERR:${e.message}`; }
}
console.log(dbPath);
console.log(JSON.stringify(out, null, 2));
