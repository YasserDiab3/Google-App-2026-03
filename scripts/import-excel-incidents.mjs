import { getDatabase } from '../backend-sql/src/db/database.js';
import XLSX from 'xlsx';

const db = getDatabase();
const wb = XLSX.readFile('tools/V.3-HSE-Database.xlsx');

console.log('=== استيراد Incidents من Excel ===');

// 1. Incidents (الرئيسية)
const ws = wb.Sheets['Incidents'];
const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
const headers = excelData[0];
const rows = excelData.slice(1).filter(r => r.some(c => c !== undefined && c !== ''));

console.log('Excel rows:', rows.length);

// تحويل إلى كائنات
const incidents = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => {
        if (h && row[i] !== undefined) {
            obj[h] = row[i];
        }
    });
    return obj;
});

// فحص التكرار
const existing = db.readSheet('Incidents');
const existingIds = new Set(existing.map(r => String(r.id)));
const newIncidents = incidents.filter(r => !existingIds.has(String(r.id)));

console.log('New to insert:', newIncidents.length);
console.log('Existing (skip):', incidents.length - newIncidents.length);

if (newIncidents.length > 0) {
    for (const row of newIncidents) {
        db.appendToSheet('Incidents', row);
    }
    console.log('Inserted Incidents:', newIncidents.length);
}

// 2. IncidentsRegistry
console.log('');
console.log('=== استيراد IncidentsRegistry ===');

const ws2 = wb.Sheets['IncidentsRegistry'];
const excelData2 = XLSX.utils.sheet_to_json(ws2, { header: 1 });
const headers2 = excelData2[0];
const rows2 = excelData2.slice(1).filter(r => r.some(c => c !== undefined && c !== ''));

console.log('Excel rows:', rows2.length);

const registry = rows2.map(row => {
    const obj = {};
    headers2.forEach((h, i) => {
        if (h && row[i] !== undefined) {
            obj[h] = row[i];
        }
    });
    return obj;
});

const existingReg = db.readSheet('IncidentsRegistry');
const existingRegIds = new Set(existingReg.map(r => String(r.id)));
const newRegistry = registry.filter(r => !existingRegIds.has(String(r.id)));

console.log('New to insert:', newRegistry.length);
console.log('Existing (skip):', registry.length - newRegistry.length);

if (newRegistry.length > 0) {
    for (const row of newRegistry) {
        db.appendToSheet('IncidentsRegistry', row);
    }
    console.log('Inserted IncidentsRegistry:', newRegistry.length);
}

// 3. النتيجة النهائية
console.log('');
console.log('=== النتيجة النهائية ===');
console.log('Incidents:', db.readSheet('Incidents').length);
console.log('IncidentsRegistry:', db.readSheet('IncidentsRegistry').length);
