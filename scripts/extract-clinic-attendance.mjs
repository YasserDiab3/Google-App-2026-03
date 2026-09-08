import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clinicPath = path.join(root, 'Frontend/js/modules/modules/clinic.js');
const outPath = path.join(root, 'Frontend/js/modules/modules/clinic-attendance.js');

const lines = fs.readFileSync(clinicPath, 'utf8').split(/\r?\n/);
const start = 15701;
const end = 18087;
const chunk = lines.slice(start, end + 1);
const body = chunk.join('\n');

const out = `/**
 * Clinic Attendance submodule — extracted from clinic.js
 */
const ClinicAttendanceMixin = {
${body}
};

if (typeof Clinic !== 'undefined') {
    Object.assign(Clinic, ClinicAttendanceMixin);
}
`;

fs.writeFileSync(outPath, out, 'utf8');

const newLines = lines.slice(0, start).concat([
    '    // — attendance methods in clinic-attendance.js —'
], lines.slice(end + 1));
fs.writeFileSync(clinicPath, newLines.join('\n'), 'utf8');

console.log(`extracted ${end - start + 1} lines -> clinic-attendance.js`);
