import { getDatabase } from '../backend-sql/src/db/database.js';
const db = getDatabase();
const rows = db.readSheet('Training');
const seen = {};
rows.forEach(r => {
    const k = String(r.id).replace(/\.0$/, '');
    if (!seen[k]) seen[k] = [];
    seen[k].push(r);
});
const dups = Object.entries(seen).filter(([k, v]) => v.length > 1);
console.log('تكرارات:', dups.length);

for (let i = 0; i < Math.min(3, dups.length); i++) {
    const [k, list] = dups[i];
    console.log('\n--- id: ' + k + ' (' + list.length + ' نسخ) ---');
    list.forEach(r => {
        console.log('  id=' + r.id + ' | name=' + String(r.trainingName || r.title || '').slice(0, 40) + ' | date=' + (r.date || r.trainingDate || '') + ' | trainer=' + (r.trainer || ''));
    });
}
