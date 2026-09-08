import { getDatabase } from '../backend-sql/src/db/database.js';
const db = getDatabase();

const sheets = ['Training', 'DailyObservations', 'ClinicContractorVisits', 'PTW', 'Incidents', 'IncidentsRegistry', 'Employees', 'ClinicVisits', 'PTWRegistry'];

for (const sheet of sheets) {
    let rows;
    try {
        rows = db.all(`SELECT rowid AS rid, id FROM "${sheet}"`);
    } catch (e) {
        console.log(sheet + ': تخطي — ' + e.message.slice(0, 50));
        continue;
    }
    const seen = {};
    const toDelete = [];
    rows.forEach(r => {
        const k = String(r.id);
        if (seen[k]) {
            toDelete.push(r.rid);
        } else {
            seen[k] = r.rid;
        }
    });
    if (toDelete.length === 0) {
        console.log(sheet + ': لا تكرار');
        continue;
    }
    let deleted = 0;
    for (const rid of toDelete) {
        deleted += db.run(`DELETE FROM "${sheet}" WHERE rowid = ?`, [rid]).changes;
    }
    console.log(sheet + ': حذف ' + deleted + ' نسخة مكررة');
}

console.log('\n=== الأعداد النهائية ===');
for (const sheet of sheets) {
    try {
        console.log(sheet + ': ' + db.readSheet(sheet).length);
    } catch (_) {}
}
