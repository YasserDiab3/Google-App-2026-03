import { getDatabase } from '../backend-sql/src/db/database.js';
const db = getDatabase();

// 1. حذف BENCH_*
const result = db.run('DELETE FROM "Incidents" WHERE id LIKE ?', ['BENCH_%']);
console.log('Deleted BENCH_* rows:', result.changes);

// 2. فحص المتبقي
const remaining = db.readSheet('Incidents');
console.log('Remaining Incidents:', remaining.length);
console.log('IDs:', remaining.map(r => r.id));
