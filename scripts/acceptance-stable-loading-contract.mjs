import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const frontend = path.join(root, 'Frontend');
const read = (rel) => fs.readFileSync(path.join(frontend, rel), 'utf8');

let failed = 0;
const check = (name, cond, detail = '') => {
    if (cond) {
        console.log(`PASS  ${name}`);
    } else {
        failed += 1;
        console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
    }
};

const syncSrc = read('js/modules/sync-improvements.js');
for (const sheet of ['ClinicVisits', 'Training', 'Employees', 'PTW', 'PTWRegistry', 'DailyObservations']) {
    check(`owned-sheet:${sheet}`, syncSrc.includes(`'${sheet}'`));
}

const authSrc = read('js/modules/auth.js');
check('auth-skip-training', /moduleName === 'training'/.test(authSrc));
check('auth-skip-clinic', /moduleName === 'clinic'/.test(authSrc));
check('auth-skip-ptw', /moduleName === 'ptw'/.test(authSrc));
check('auth-skip-daily-obs', /moduleName === 'daily-observations'/.test(authSrc));

const trainingSrc = read('js/modules/modules/training.js');
const start = trainingSrc.indexOf('async _runLoadTrainingDataAsync');
const end = trainingSrc.indexOf('\n    getStats()', start);
const body = trainingSrc.slice(start, end > start ? end : start + 9000);
const programsTail = body.slice(body.lastIndexOf("runAction('getAllTrainings'"));
check('training-has-programs-fetch', body.includes("runAction('getAllTrainings'"));
check('training-attendance-gated', body.includes("if (active === 'attendance')"));
check('training-legal-gated', body.includes("if (active === 'legalTraining')"));
check('training-no-attendance-after-programs', !programsTail.includes("runAction('getAllTrainingAttendance'"));
check('training-no-legal-after-programs', !programsTail.includes("runAction('getAllLegalTrainings'"));
check('training-no-sessions-after-programs', !programsTail.includes("runAction('getAllTrainingSessions'"));

const ptwSrc = read('js/modules/modules/ptw.js');
const ptwCalls = [...ptwSrc.matchAll(/syncRegistryWithPermits\s*\(/g)];
check('ptw-no-auto-registry-sync', ptwCalls.length === 1, `calls=${ptwCalls.length}`);
check('ptw-owned-fetch', ptwSrc.includes("StableLoader.beginOwnedFetch('ptw')"));
check('ptw-mark-paint', ptwSrc.includes("StableLoader.markPaint('ptw'"));

const obsSrc = read('js/modules/modules/dailyobservations.js');
check('obs-lazy-attr', obsSrc.includes('data-obs-lazy'));
check('obs-owned-fetch', obsSrc.includes("beginOwnedFetch('daily-observations')"));
check('obs-mark-paint', obsSrc.includes("markPaint('daily-observations'"));

const loaderSrc = read('js/modules/services/stable-loader.js');
check('loader-markPaint', /markPaint\s*\(/.test(loaderSrc));
check('loader-getMetrics', /getMetrics\s*\(/.test(loaderSrc));
check('loader-watchdog', loaderSrc.includes('OWNED_FETCH_WATCHDOG_MS'));

const clinicSrc = read('js/modules/modules/clinic.js');
check('clinic-mark-paint', clinicSrc.includes("StableLoader.markPaint('clinic'"));
check('clinic-owned-fetch', clinicSrc.includes("beginOwnedFetch('clinic')"));

const empSrc = read('js/modules/modules/employees.js');
check('employees-owned-fetch', empSrc.includes("beginOwnedFetch('employees')"));
check('employees-mark-paint', empSrc.includes("markPaint('employees'"));

console.log(failed ? `\nRESULT  FAIL (${failed})` : '\nRESULT  PASS');
process.exit(failed ? 1 : 0);
