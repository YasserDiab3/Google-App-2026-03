/**
 * Smoke: حضور العيادة + الأوقات على الإنتاج وExecution API
 * node scripts/smoke-clinic-attendance.mjs
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SCRIPT_ID = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'Backend', '.clasp.json'), 'utf8')
).scriptId;
const PROD_EXEC_URL =
  'https://www.safety-icapp.com/api/exec';

function makeCsrf() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

function loadClaspToken() {
  const p = path.join(os.homedir(), '.clasprc.json');
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const t = j.token || (j.tokens && j.tokens.default) || {};
  if (!t.access_token) throw new Error('no clasp access_token');
  return t;
}

async function postExecOnce(action, data, timeoutMs = 120000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(PROD_EXEC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action,
        data: data || {},
        csrfToken: makeCsrf(),
        clientSessionId: `sid_smoke_att_${Date.now().toString(36)}`,
        userData: { id: 'smoke', email: 'smoke@example.invalid', name: 'smoke', role: 'user' }
      }),
      redirect: 'follow',
      signal: ctrl.signal
    });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch (_e) { /* ignore */ }
    return {
      status: res.status,
      json,
      text,
      html: /<!DOCTYPE|<html/i.test(text),
      doget: json?.errorCode === 'REACHED_DOGET_STATUS'
    };
  } finally {
    clearTimeout(timer);
  }
}

async function postExec(action, data, timeoutMs = 120000) {
  let last = null;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      last = await postExecOnce(action, data, timeoutMs);
    } catch (e) {
      last = { error: e.message, html: false, doget: false };
    }
    const flaky = last.html || last.doget || last.status === 404 || last.error;
    if (!flaky) return last;
    console.log(`  retry ${action} #${attempt} status=${last.status} html=${!!last.html} doget=${!!last.doget} err=${last.error || ''}`);
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  return last;
}

async function scriptsRun(functionName, parameters = [], timeoutMs = 180000) {
  const token = loadClaspToken();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`https://script.googleapis.com/v1/scripts/${SCRIPT_ID}:run`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ function: functionName, parameters, devMode: false }),
      signal: ctrl.signal
    });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch (_e) { /* ignore */ }
    return { status: res.status, json, text };
  } finally {
    clearTimeout(timer);
  }
}

function unwrapRun(result) {
  return result?.json?.response?.result ?? result?.json?.error ?? result?.json ?? null;
}

function hasTimeValue(v) {
  if (v == null || v === '') return false;
  const s = String(v).trim();
  if (!s || s === '—' || s === '-') return false;
  const t = new Date(s).getTime();
  return !Number.isNaN(t) || /\d{1,2}:\d{2}/.test(s);
}

function expectAuthGate(label, res, fail, pass) {
  console.log({
    http: res.status,
    html: !!res.html,
    success: res.json?.success,
    errorCode: res.json?.errorCode,
    message: res.json?.message,
    action: res.json?.action
  });
  if (res.html) fail.push(`${label}-http-html`);
  else if (!res.json) fail.push(`${label}-http-nonjson`);
  else if (String(res.json.message || '').includes('غير معروفة') || res.json.errorCode === 'UNKNOWN_ACTION') {
    fail.push(`${label}-action-missing`);
  } else if (
    res.json.errorCode === 'SESSION_ACTOR_REQUIRED' ||
    res.json.errorCode === 'SESSION_TOKEN_MISSING' ||
    res.json.errorCode === 'AUTH_REQUIRED' ||
    res.json.errorCode === 'ACTOR_IDENTITY_REQUIRED' ||
    /تسجيل الدخول|جلسة|مصادقة|actor/i.test(String(res.json.message || ''))
  ) {
    pass.push(`${label}-action-deployed-auth-gated`);
  } else {
    fail.push(`${label}-http-unexpected`);
  }
}

function isExecAuthBlocked(run) {
  const status = run?.status;
  const err = run?.json?.error || unwrapRun(run) || {};
  const msg = String(err.message || err.statusMessage || run?.text || '');
  return status === 401
    || status === 403
    || /UNAUTHENTICATED|PERMISSION_DENIED|invalid_grant|permission to run/i.test(msg)
    || err.status === 'UNAUTHENTICATED'
    || err.code === 401;
}

function staticCodeSmoke(fail, pass) {
  const files = {
    auth: path.join(ROOT, 'Frontend', 'js', 'modules', 'auth.js'),
    gi: path.join(ROOT, 'Frontend', 'js', 'modules', 'services', 'google-integration.js'),
    clinic: path.join(ROOT, 'Backend', 'Clinic.gs'),
    authVd: path.join(ROOT, 'vercel-deploy', 'frontend', 'js', 'modules', 'auth.js'),
    giVd: path.join(ROOT, 'vercel-deploy', 'frontend', 'js', 'modules', 'services', 'google-integration.js'),
    clinicVd: path.join(ROOT, 'vercel-deploy', 'backend', 'Clinic.gs')
  };
  const auth = fs.readFileSync(files.auth, 'utf8');
  const gi = fs.readFileSync(files.gi, 'utf8');
  const clinic = fs.readFileSync(files.clinic, 'utf8');
  const checks = [
    [auth.includes('_recordClinicStaffAttendance'), 'fe-auth-punch-helper'],
    [auth.includes("kind === 'logout' ? 'recordClinicStaffLogout'") || auth.includes('recordClinicStaffLogout'), 'fe-auth-logout-action'],
    [auth.includes('wait: true') && auth.includes("_recordClinicStaffAttendance('logout'"), 'fe-auth-logout-wait'],
    [gi.includes('_isClinicAttendanceRpcAction') && gi.includes('_shouldBypassRequestQueue'), 'fe-gi-queue-bypass'],
    [/function upsertClinicStaffAttendanceOnLogin_[\s\S]{0,4000}updateSingleRowInSheet[\s\S]{0,800}appendToSheet/.test(clinic), 'be-login-single-row'],
    [/function upsertClinicStaffAttendanceOnLogout_[\s\S]{0,4000}updateSingleRowInSheet/.test(clinic), 'be-logout-single-row'],
    [fs.readFileSync(files.authVd, 'utf8').includes('_recordClinicStaffAttendance'), 'vd-auth-synced'],
    [fs.readFileSync(files.giVd, 'utf8').includes('_isClinicAttendanceRpcAction'), 'vd-gi-synced'],
    [fs.readFileSync(files.clinicVd, 'utf8').includes('function recordClinicStaffLogin'), 'vd-clinic-synced']
  ];
  for (const [ok, name] of checks) {
    if (ok) pass.push(name);
    else fail.push(name);
  }
}

async function main() {
  const fail = [];
  const pass = [];
  const skip = [];
  console.log('SCRIPT_ID:', SCRIPT_ID);
  console.log('EXEC:', PROD_EXEC_URL);
  console.log('MCP: غير مناسب — اختبار HTTP + Execution API + فحص كود\n');

  console.log('=== 0) فحص كود الإصلاح محلياً ===');
  staticCodeSmoke(fail, pass);
  console.log('static pass so far:', pass.filter((p) => /^(fe|be|vd)-/.test(p)).join(', '));

  console.log('\n=== 1) HTTP warmup /exec ===');
  let warm;
  try {
    warm = await postExec('warmup', {});
  } catch (e) {
    warm = { error: e.message };
  }
  if (warm?.json || (warm?.status && !warm.html)) {
    console.log('HTTP', warm.status, 'json=', !!warm.json, 'html=', !!warm.html, 'msg=', warm.json?.message || warm.json?.success);
    pass.push('exec-reachable');
  } else {
    console.log('warmup fail', warm?.error || String(warm?.text || '').slice(0, 180));
    fail.push('exec-unreachable');
  }

  console.log('\n=== 1b) HTTP testConnection ===');
  const conn = await postExec('testConnection', {});
  console.log({ success: conn.json?.success, message: conn.json?.message });
  if (conn.json?.success === true) pass.push('backend-connection-ok');
  else fail.push('backend-connection-fail');

  console.log('\n=== 2) HTTP recordClinicStaffLogin بدون جلسة ===');
  expectAuthGate('login', await postExec('recordClinicStaffLogin', { email: 'smoke@example.invalid' }), fail, pass);

  await new Promise((r) => setTimeout(r, 800));
  console.log('\n=== 3) HTTP recordClinicStaffLogout بدون جلسة ===');
  expectAuthGate('logout', await postExec('recordClinicStaffLogout', { email: 'smoke@example.invalid' }), fail, pass);

  await new Promise((r) => setTimeout(r, 800));
  console.log('\n=== 3b) HTTP قراءة/تحديث حضور بدون جلسة ===');
  expectAuthGate('staff-list', await postExec('getAllClinicStaff', {}), fail, pass);
  await new Promise((r) => setTimeout(r, 800));
  expectAuthGate('attendance-read', await postExec('getClinicStaffAttendance', {}), fail, pass);
  await new Promise((r) => setTimeout(r, 800));
  expectAuthGate('attendance-update', await postExec('updateClinicStaffAttendance', {
    recordId: 'smoke-nope',
    checkIn: '2026-08-05T08:00:00'
  }), fail, pass);

  console.log('\n=== 4) Execution API getAllClinicStaff ===');
  const staffRun = await scriptsRun('getAllClinicStaff', [{ activeOnly: true }]);
  const staffPayload = unwrapRun(staffRun);
  if (isExecAuthBlocked(staffRun)) {
    console.log('SKIP Execution API — توكن clasp منتهٍ / بلا صلاحية تشغيل');
    console.log(String(JSON.stringify(staffRun.json || staffRun.text)).slice(0, 240));
    skip.push('staff-api-auth');
  } else if (staffRun.json?.error || staffPayload?.code) {
    console.log('API ERROR', JSON.stringify(staffRun.json?.error || staffPayload).slice(0, 500));
    fail.push('staff-api-error');
  } else {
    const staff = Array.isArray(staffPayload?.data) ? staffPayload.data : [];
    const active = staff.filter((s) => String(s?.isActive || 'true').toLowerCase() !== 'false');
    console.log({ success: staffPayload?.success, count: staff.length, active: active.length });
    if (staffPayload?.success && staff.length > 0) pass.push('staff-list-ok');
    else if (staffPayload?.success && staff.length === 0) {
      console.log('تحذير: لا يوجد مسئولو عيادة — الحضور سيُتخطى للجميع');
      fail.push('no-clinic-staff');
    } else fail.push('staff-list-fail');
  }

  console.log('\n=== 5) Execution API recordClinicStaffLogin لمستخدم غير مسئول (آمن) ===');
  if (skip.includes('staff-api-auth')) {
    skip.push('login-skip-nonstaff');
    console.log('SKIP — نفس قفل Execution API');
  } else {
    const fakeLogin = await scriptsRun('recordClinicStaffLogin', [{
      email: 'smoke-attendance-nonstaff@example.invalid',
      userId: 'SMOKE_ATT_NONSTAFF',
      userName: 'smoke'
    }]);
    const fakeLoginPayload = unwrapRun(fakeLogin);
    console.log(JSON.stringify(fakeLoginPayload).slice(0, 400));
    if (fakeLoginPayload?.success === true && fakeLoginPayload?.skipped === true) {
      pass.push('login-skip-nonstaff');
    } else if (fakeLoginPayload?.success === true) {
      fail.push('login-wrote-nonstaff');
    } else {
      fail.push('login-fn-failed');
    }
  }

  console.log('\n=== 6) Execution API recordClinicStaffLogout لمستخدم غير مسئول (آمن) ===');
  if (skip.includes('staff-api-auth')) {
    skip.push('logout-skip-nonstaff');
    console.log('SKIP — نفس قفل Execution API');
  } else {
    const fakeLogout = await scriptsRun('recordClinicStaffLogout', [{
      email: 'smoke-attendance-nonstaff@example.invalid',
      userId: 'SMOKE_ATT_NONSTAFF'
    }]);
    const fakeLogoutPayload = unwrapRun(fakeLogout);
    console.log(JSON.stringify(fakeLogoutPayload).slice(0, 400));
    if (fakeLogoutPayload?.success === true && fakeLogoutPayload?.skipped === true) {
      pass.push('logout-skip-nonstaff');
    } else if (fakeLogoutPayload?.success === true) {
      fail.push('logout-wrote-nonstaff');
    } else {
      fail.push('logout-fn-failed');
    }
  }

  console.log('\n=== 7) Execution API getClinicStaffAttendance (قراءة) ===');
  if (skip.includes('staff-api-auth')) {
    skip.push('attendance-read');
    console.log('SKIP — نفس قفل Execution API. كتابة/قراءة صف حقيقي تحتاج جلسة متصفح أو clasp login.');
  } else {
    const attRun = await scriptsRun('getClinicStaffAttendance', [{}, { role: 'admin', email: 'smoke-reader@local' }]);
    const attPayload = unwrapRun(attRun);
    if (attRun.json?.error || attPayload?.code) {
      console.log('API ERROR', JSON.stringify(attRun.json?.error || attPayload).slice(0, 500));
      fail.push('attendance-api-error');
    } else {
      const rows = Array.isArray(attPayload?.data) ? attPayload.data : [];
      const withIn = rows.filter((r) => hasTimeValue(r?.checkIn)).length;
      const withOut = rows.filter((r) => hasTimeValue(r?.checkOut)).length;
      const withBoth = rows.filter((r) => hasTimeValue(r?.checkIn) && hasTimeValue(r?.checkOut)).length;
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' });
      const todayRows = rows.filter((r) => String(r?.date || '').slice(0, 10) === today);
      const todayIn = todayRows.filter((r) => hasTimeValue(r?.checkIn)).length;
      const todayOut = todayRows.filter((r) => hasTimeValue(r?.checkOut)).length;
      console.log({
        success: attPayload?.success,
        rows: rows.length,
        withCheckIn: withIn,
        withCheckOut: withOut,
        withBoth,
        today,
        todayRows: todayRows.length,
        todayCheckIn: todayIn,
        todayCheckOut: todayOut
      });
      if (rows.length) {
        console.log(
          'sample:',
          JSON.stringify(
            rows.slice(0, 3).map((r) => ({
              date: r.date,
              hasIn: hasTimeValue(r.checkIn),
              hasOut: hasTimeValue(r.checkOut),
              duration: r.workDuration || '',
              status: r.status || '',
              checkInPreview: String(r.checkIn || '').slice(0, 25),
              checkOutPreview: String(r.checkOut || '').slice(0, 25)
            })),
            null,
            2
          )
        );
      }
      if (attPayload?.success) pass.push('attendance-read-ok');
      else fail.push('attendance-read-fail');
      if (rows.length > 0 && withIn === 0) fail.push('no-checkin-times-in-sheet');
      if (todayRows.length > 0 && todayIn === 0) fail.push('today-rows-missing-checkin');
    }
  }

  console.log('\n=== VERDICT ===');
  console.log('PASS:', pass.join(', ') || '—');
  console.log('SKIP:', skip.join(', ') || '—');
  console.log('FAIL:', fail.join(', ') || '—');
  if (fail.length) {
    console.log('النتيجة: يوجد خلل أو بيانات ناقصة — راجع FAIL.');
    process.exit(1);
  }
  if (skip.length) {
    console.log('النتيجة: دخان الإنتاج نجح. كتابة صف حضور حقيقي مؤجلة — Execution API مقفل (clasp login).');
    return;
  }
  console.log('النتيجة: دخان الحضور نجح — الأكشن منشور، الدوال تعمل، القراءة سليمة.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
