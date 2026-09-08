import { getDatabase } from '../backend-sql/src/db/database.js';

const db = getDatabase();

// فحص rowid
const sample = db.all('SELECT rowid, id FROM "Employees" LIMIT 5');
console.log('عينة rowid:', sample);

const total = db.all('SELECT COUNT(*) AS c FROM "Employees"');
console.log('الإجمالي:', total);
