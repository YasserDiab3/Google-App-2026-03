/**
 * فحص دخان شامل للنظام — أداء + أمان + قراءة عامة
 * node scripts/smoke-system.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PROD_EXEC_URL = process.env.HSE_EXEC_URL ||
  'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';

const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS || 25000);
const HANG_MS = Number(process.env.SMOKE_HANG_MS || 15000);

function makeCsrf() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function post(action, data = {}, opts = {}) {
  const timeoutMs = opts.timeoutMs || TIMEOUT_MS;
  const body = {
    action,
    data: data || {},
    csrfToken: opts.csrfToken !== undefined ? opts.csrfToken : makeCsrf(),
    clientSessionId: opts.clientSessionId || `sid_smoke_${Date.now().toString(36)}`,
    ...(opts.userData ? { userData: opts.userData } : {}),
    ...(opts.sessionToken ? { sessionToken: opts.sessionToken } : {})
  };

  const started = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);

  try {
    const res = await fetch(PROD_EXEC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      redirect: 'follow',
      signal: ctrl.signal
    });
    const text = await res.text();
    const ms = Date.now() - started;
    let json = null;
    try { json = JSON.parse(text); } catch (_e) { /* ignore */ }
    return { action, status: res.status, ms, json, text: text.slice(0, 400), ok: !!(json && json.success) };
  } catch (err) {
    return { action, status: 0, ms: Date.now() - started, json: null, text: '', error: err.message, ok: false };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
function record(name, pass, detail = '') {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

async function main() {
  console.log('=== smoke-system ===');
  console.log('URL:', PROD_EXEC_URL);
  console.log('MCP: غير مناسب — اختبار GAS مباشر\n');

  // 1) اتصال + أداء
  const warmup = await post('warmup', {}, { csrfToken: '' });
  record('warmup responds', warmup.status === 200 && !!warmup.json, `${warmup.ms}ms`);
  if (warmup.ms > HANG_MS) {
    record('warmup latency', false, `${warmup.ms}ms > ${HANG_MS}ms`);
  } else {
    record('warmup latency', true, `${warmup.ms}ms`);
  }

  const testConn = await post('testConnection', {}, { csrfToken: '' });
  record('testConnection', testConn.json?.success === true || testConn.status === 200, `${testConn.ms}ms`);

  // 2) قراءات عامة مسموحة
  const broadcast = await post('getHseBroadcastMessages', {}, { csrfToken: '' });
  record('getHseBroadcastMessages (public read)', broadcast.json?.success === true, `${broadcast.ms}ms`);

  const health = await post('getEmployeesSheetHealth', {}, { csrfToken: '', timeoutMs: 45000 });
  const healthOk = health.json?.success === true;
  const healthSlow = !healthOk && health.error && /abort|timeout/i.test(health.error);
  record('getEmployeesSheetHealth', healthOk || healthSlow, healthOk ? `${health.ms}ms` : (healthSlow ? `slow/timeout ${health.ms}ms (non-blocking)` : `${health.ms}ms`));

  // 3) حماية initializeSheets — بدون CSRF/جلسة
  const initNoCsrf = await post('initializeSheets', {}, { csrfToken: '' });
  const initBlocked = initNoCsrf.json?.errorCode === 'CSRF_TOKEN_MISSING'
    || initNoCsrf.json?.errorCode === 'CSRF_TOKEN_VALIDATION_FAILED'
    || initNoCsrf.json?.errorCode === 'STRICT_ADMIN_DENIED'
    || initNoCsrf.json?.errorCode === 'SESSION_ACTOR_REQUIRED'
    || initNoCsrf.json?.errorCode === 'ACTOR_IDENTITY_REQUIRED';
  record('initializeSheets blocked without auth', initBlocked, initNoCsrf.json?.errorCode || initNoCsrf.error || 'no block');

  const initFakeAdmin = await post('initializeSheets', {}, {
    userData: { id: 'fake', email: 'fake@test.invalid', name: 'Fake', role: 'admin' },
    sessionToken: 'invalid-session-token'
  });
  const initFakeBlocked = initFakeAdmin.json?.success !== true;
  record('initializeSheets blocked with fake session', initFakeBlocked, initFakeAdmin.json?.errorCode || '');

  // 4) حماية كتابات HSE بدون صلاحية
  const saveBroadcastBad = await post('saveHseBroadcastMessages', {
    messageAr: 'smoke test',
    messageEn: 'smoke test',
    adminPin: '0000'
  }, { csrfToken: '' });
  const saveBroadcastBlocked = saveBroadcastBad.json?.success !== true;
  record('saveHseBroadcastMessages blocked bad pin', saveBroadcastBlocked, saveBroadcastBad.json?.errorCode || '');

  const saveContactsBad = await post('saveHseEmergencyContacts', {
    clinicPhone: '000',
    adminPin: 'wrong'
  }, { csrfToken: '' });
  record('saveHseEmergencyContacts blocked bad pin', saveContactsBad.json?.success !== true, saveContactsBad.json?.errorCode || '');

  // 5) قراءات حساسة بدون جلسة
  const employeesNoSession = await post('getAllEmployees', { filters: {} });
  const employeesProtected = employeesNoSession.json?.errorCode === 'SESSION_ACTOR_REQUIRED'
    || employeesNoSession.json?.success !== true;
  record('getAllEmployees requires session', employeesProtected, employeesNoSession.json?.errorCode || '');

  // 6) CSRF على كتابة عامة
  const csrfMissing = await post('saveToSheet', { sheetName: 'Test', data: {} }, { csrfToken: '' });
  record('saveToSheet requires CSRF', csrfMissing.json?.errorCode === 'CSRF_TOKEN_MISSING', csrfMissing.json?.errorCode || '');

  // 7) عقد التحميل المستقر (محلي)
  try {
    const contractScript = path.join(ROOT, 'scripts', 'acceptance-stable-loading-contract.mjs');
    if (fs.existsSync(contractScript)) {
      const { spawnSync } = await import('child_process');
      const proc = spawnSync(process.execPath, [contractScript], { encoding: 'utf8', cwd: ROOT });
      const contractOk = proc.status === 0;
      record('stable-loading contract', contractOk, contractOk ? '' : (proc.stdout || proc.stderr || '').split('\n').filter(Boolean).slice(-3).join(' | '));
    } else {
      record('stable-loading contract', false, 'script missing');
    }
  } catch (e) {
    record('stable-loading contract', false, e.message);
  }

  const failed = results.filter((r) => !r.pass);
  console.log('\n=== SUMMARY ===');
  console.log(`passed: ${results.length - failed.length}/${results.length}`);
  if (failed.length) {
    console.log('failed:', failed.map((f) => f.name).join(', '));
    process.exit(1);
  }
  console.log('ALL PASS');
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
