import { getDatabase } from '../backend-sql/src/db/database.js';
import XLSX from 'xlsx';

const db = getDatabase();
const wb = XLSX.readFile('tools/V.3-HSE-Database.xlsx');

const TARGET_SHEETS = ['Employees', 'ClinicVisits', 'DailyObservations', 'ClinicContractorVisits', 'Training', 'PTW', 'PTWRegistry'];

console.log('=== مقارنة واستيراد الجداول الناقصة ===\n');

for (const sheet of TARGET_SHEETS) {
    if (!wb.SheetNames.includes(sheet)) {
        console.log(sheet + ': غير موجود في Excel — تخطي');
        continue;
    }

    const ws = wb.Sheets[sheet];
    const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
    const headers = excelData[0] || [];
    const rows = excelData.slice(1).filter(r => r.some(c => c !== undefined && c !== ''));

    const idCol = headers.findIndex(h => h === 'id');
    if (idCol === -1) {
        console.log(sheet + ': لا يوجد عمود id — تخطي');
        continue;
    }

    let existing = [];
    try {
        existing = db.readSheet(sheet);
    } catch (e) {
        console.log(sheet + ': الجدول غير موجود في SQL — ' + e.message);
        continue;
    }

    const existingIds = new Set(existing.map(r => String(r.id)));
    const newRows = rows.filter(r => !existingIds.has(String(r[idCol])));

    console.log(sheet + ': Excel=' + rows.length + ' | SQL=' + existing.length + ' | جديد=' + newRows.length);

    if (newRows.length > 0) {
        let inserted = 0;
        let failed = 0;
        for (const row of newRows) {
            const obj = {};
            headers.forEach((h, i) => {
                if (h && row[i] !== undefined) obj[h] = row[i];
            });
            try {
                db.appendToSheet(sheet, obj);
                inserted++;
            } catch (e) {
                failed++;
                if (failed <= 2) console.log('  خطأ في ' + obj.id + ': ' + e.message.slice(0, 80));
            }
        }
        console.log('  → تم الإدراج: ' + inserted + (failed ? ' | فشل: ' + failed : ''));
    }
}

console.log('\n=== الأعداد النهائية في SQL ===');
for (const sheet of TARGET_SHEETS) {
    try {
        console.log(sheet + ': ' + db.readSheet(sheet).length);
    } catch (_) {}
}
