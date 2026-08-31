import { getDatabase } from '../backend-sql/src/db/database.js';

const db = getDatabase();

const before = db.all('SELECT COUNT(*) AS c FROM "Employees"')[0].c;
console.log('قبل:', before);

// التحقق أن الأصل (rowid 1..644) مكتمل بدون فقدان
const origNull = db.all('SELECT COUNT(*) AS c FROM "Employees" WHERE rowid <= 644 AND id IS NULL')[0].c;
console.log('سجلات أصلية بدون id:', origNull);

const res = db.run('DELETE FROM "Employees" WHERE rowid > 644');
console.log('محذوف:', res.changes);

const after = db.all('SELECT COUNT(*) AS c FROM "Employees"')[0].c;
console.log('بعد:', after);

// فحص تكرار نهائي بالاسم
const rows = db.readSheet('Employees');
const names = {};
rows.forEach(r => {
    const n = String(r.employeeName || r.name || '').trim();
    if (n) names[n] = (names[n] || 0) + 1;
});
const dups = Object.entries(names).filter(([k, v]) => v > 1);
console.log('أسماء مكررة بعد التنظيف:', dups.length);
