/**
 * P3.1 — parity Frontend ↔ vercel-deploy/frontend للملفات الحساسة.
 * تشغيل: node tools/p3-parity-selftest.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CRITICAL = [
  'js/modules/auth.js',
  'js/modules/app-utils.js',
  'js/modules/modules/clinic.js',
  'js/modules/modules/ptw.js',
  'js/modules/modules/users.js',
  'js/modules/modules/contractors.js',
  'js/modules/modules/behaviormonitoring.js',
  'js/modules/modules/ppe.js',
  'js/modules/modules/violations.js',
  'js/modules/modules/safetyperformancekpis.js',
  'js/modules/modules/periodicinspections.js',
  'js/modules/services/google-integration.js',
  'version.json',
  'service-worker.js',
];

let failed = 0;
for (const rel of CRITICAL) {
  const a = path.join(ROOT, 'Frontend', rel);
  const b = path.join(ROOT, 'vercel-deploy', 'frontend', rel);
  if (!fs.existsSync(a)) {
    console.error('FAIL missing FE', rel);
    failed++;
    continue;
  }
  if (!fs.existsSync(b)) {
    console.error('FAIL missing VD', rel);
    failed++;
    continue;
  }
  const eq = fs.readFileSync(a).equals(fs.readFileSync(b));
  if (!eq) {
    console.error('FAIL parity', rel);
    failed++;
  } else {
    console.log('PASS', rel);
  }
}

if (failed) {
  console.error(`\nparity FAILED: ${failed} file(s)`);
  process.exit(1);
}
console.log(`\nparity OK: ${CRITICAL.length} files`);
