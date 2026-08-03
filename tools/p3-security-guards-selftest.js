/**
 * P3.2 — حراسة أمنية ثابتة (bootstrap / TMP / empty-array guards).
 * تشغيل: node tools/p3-security-guards-selftest.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let failed = 0;

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function assert(cond, label) {
  if (!cond) {
    console.error('FAIL', label);
    failed++;
  } else {
    console.log('PASS', label);
  }
}

const auth = read('Frontend/js/modules/auth.js');
assert(!auth.includes('240be518'), 'auth: لا هاش bootstrap المعروف');
assert(!auth.includes('BOOTSTRAP_ADMIN'), 'auth: لا BOOTSTRAP_ADMIN');
assert(/isBootstrapLoginAllowed\s*\([^)]*\)\s*\{\s*return false\s*;/.test(auth), 'auth: isBootstrapLoginAllowed دائماً false');
assert(auth.includes("e.endsWith('@hse.local')"), 'auth: رفض *@hse.local');
assert(auth.includes('BOOTSTRAP_HASH_REMOVED') || auth.includes('BOOTSTRAP_DISABLED'), 'auth: رموز رفض bootstrap');

const ptw = read('Frontend/js/modules/modules/ptw.js');
assert(ptw.includes('_recordHasTmpId'), 'ptw: _recordHasTmpId موجود');
assert(ptw.includes("includes('_TMP_')"), 'ptw: فلتر _TMP_');
assert(ptw.includes('تخطي autoSave(PTW)') || ptw.includes('معرفات مؤقتة'), 'ptw: تخطي autoSave عند TMP');

const clinic = read('Frontend/js/modules/modules/clinic.js');
assert(clinic.includes('لا تستبدل محلياً غير فارغ بمصفوفة فارغة'), 'clinic: guard فراغ زيارات');

const behavior = read('Frontend/js/modules/modules/behaviormonitoring.js');
assert(behavior.includes('تجاهل behaviorMonitoring فارغ'), 'behavior: guard فراغ');

const ppe = read('Frontend/js/modules/modules/ppe.js');
assert(ppe.includes('PPE preload: تجاهل') || ppe.includes('تجاهل مصفوفة فارغة من الخادم'), 'ppe: guard فراغ');

const violations = read('Frontend/js/modules/modules/violations.js');
assert(violations.includes('تجاهل مخالفات فارغة'), 'violations: guard فراغ');

const users = read('Frontend/js/modules/modules/users.js');
assert(users.includes('data-copy=') || users.includes("data-copy=\"password\""), 'users: لا password في onclick');
assert(!users.includes("writeText('${creds.password}')"), 'users: لا حقن كلمة مرور في onclick');

const code = read('Backend/Code.gs');
assert(code.includes('SESSION_ACTOR_REQUIRED') || code.includes('needsSessionForWrite'), 'GAS: P2 session write gate');
assert(!/'getAllClinicVisitDeletionRequests'\s*,/.test(code.split('const readOnlyActions')[1].split('];')[0]), 'GAS: deletion requests ليست readOnly');
assert(!/'ensureContractorEvaluationApprovalRequestsSheet'\s*,/.test(code.split('const readOnlyActions')[1].split('];')[0]), 'GAS: ensure مقاولين ليست readOnly');
const readOnlyBlock = code.split('const readOnlyActions')[1].split('];')[0];
assert(!/'getAllPPE'\s*,/.test(readOnlyBlock), 'GAS: getAllPPE ليست readOnly (P2.2)');
assert(!/'getPPEItemsList'\s*,/.test(readOnlyBlock), 'GAS: getPPEItemsList ليست readOnly (P2.2)');
// SEC P0: لا إعفاء CSRF/جلسة لـ mfaClear* أو fixClinicSheetHeaders
const csrfExemptBlock = code.split('const csrfExemptActions')[1].split('];')[0];
const sessionExemptBlock = code.split('const sessionExemptActions')[1].split('];')[0];
assert(!csrfExemptBlock.includes("'mfaClearUser'") && !csrfExemptBlock.includes("'mfaClearCorruptSecrets'"), 'GAS: mfaClear* ليست CSRF-exempt');
assert(!csrfExemptBlock.includes("'fixClinicSheetHeaders'"), 'GAS: fixClinicSheetHeaders ليست CSRF-exempt');
assert(!sessionExemptBlock.includes("'mfaClearUser'") && !sessionExemptBlock.includes("'mfaClearCorruptSecrets'"), 'GAS: mfaClear* ليست session-exempt');
assert(!sessionExemptBlock.includes("'fixClinicSheetHeaders'"), 'GAS: fixClinicSheetHeaders ليست session-exempt');
assert(!/action === 'mfaClearUser'[\s\S]{0,80}emergencyClearUserMfa/.test(code), 'GAS: لا مسار mfaClearUser مبكر بدون مصادقة');

const clinicGs = read('Backend/Clinic.gs');
const deleteFn = clinicGs.split('function deleteClinicVisit')[1] || '';
assert(deleteFn.includes('ClinicContractorVisits'), 'GAS: deleteClinicVisit يغطي ClinicContractorVisits');

const handlers = read('Backend/ActionHandlers.gs');
assert(/'addClinicStaff'[\s\S]{0,200}actionRequireAdmin_/.test(handlers), 'GAS: addClinicStaff يتطلب admin');
assert(/'fixClinicSheetHeaders'[\s\S]{0,200}actionRequireAdmin_/.test(handlers), 'GAS: fixClinicSheetHeaders يتطلب admin');

const utils = read('Backend/Utils.gs');
assert(utils.includes('requireAuthenticatedActor_') && /checkSheetDirectWriteAccess_[\s\S]*?requireAuthenticatedActor_/.test(utils), 'GAS: P0.1 write actor gate');

if (failed) {
  console.error(`\nsecurity-guards FAILED: ${failed}`);
  process.exit(1);
}
console.log('\nsecurity-guards OK');
