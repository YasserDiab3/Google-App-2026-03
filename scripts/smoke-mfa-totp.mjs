/**
 * Smoke: تشخيص تأخير/فشل TOTP على الإنتاج
 * node scripts/smoke-mfa-totp.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PROD_EXEC_URL =
  'https://www.safety-icapp.com/api/exec';

function makeCsrf() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function postOnce(action, data = {}, timeoutMs = 90000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  const t0 = Date.now();
  try {
    const res = await fetch(PROD_EXEC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action,
        data,
        csrfToken: makeCsrf(),
        clientSessionId: `sid_smoke_mfa_${Date.now().toString(36)}`,
        userData: { id: 'smoke', email: 'smoke-mfa@example.invalid', name: 'smoke', role: 'user' }
      }),
      redirect: 'follow',
      signal: ctrl.signal
    });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch (_e) { /* ignore */ }
    return {
      ms: Date.now() - t0,
      status: res.status,
      json,
      html: /<!DOCTYPE|<html/i.test(text),
      doget: json?.errorCode === 'REACHED_DOGET_STATUS' || json?.errorCode === 'WRONG_URL_ENDPOINT',
      preview: String(text || '').slice(0, 160)
    };
  } catch (e) {
    return { ms: Date.now() - t0, error: e.message, html: false, doget: false };
  } finally {
    clearTimeout(timer);
  }
}

/** يحاكي إعادة إرسال الواجهة عند 404/HTML/doGet (حتى 5) */
async function postLikeFrontend(action, data = {}) {
  const attempts = [];
  let last = null;
  const t0 = Date.now();
  for (let i = 0; i < 6; i++) {
    last = await postOnce(action, data);
    attempts.push({
      n: i + 1,
      ms: last.ms,
      status: last.status,
      html: !!last.html,
      doget: !!last.doget,
      errorCode: last.json?.errorCode || (last.error ? 'FETCH_ERR' : null),
      success: last.json?.success
    });
    const flaky = last.html || last.doget || last.status === 404 || last.error;
    if (!flaky) break;
    if (i < 5) await new Promise((r) => setTimeout(r, 300 + i * 500));
  }
  return { totalMs: Date.now() - t0, attempts, last };
}

function staticChecks(fail, pass, notes) {
  const auth = fs.readFileSync(path.join(ROOT, 'Frontend', 'js', 'modules', 'auth.js'), 'utf8');
  const gi = fs.readFileSync(path.join(ROOT, 'Frontend', 'js', 'modules', 'services', 'google-integration.js'), 'utf8');
  const ui = fs.readFileSync(path.join(ROOT, 'Frontend', 'js', 'modules', 'app-ui.js'), 'utf8');
  const users = fs.readFileSync(path.join(ROOT, 'Backend', 'Users.gs'), 'utf8');
  const mfa = fs.readFileSync(path.join(ROOT, 'Backend', 'Mfa.gs'), 'utf8');

  const checks = [
    [gi.includes("'startMfaEnrollment'") && gi.includes('_shouldBypassRequestQueue'), 'fe-queue-bypass-mfa'],
    [/if \(!this\._shouldBypassRequestQueue\(action\)\)[\s\S]{0,80}_checkCircuitBreaker/.test(gi), 'fe-cb-bypass-mfa'],
    [gi.includes('AUTH_TOTAL_BUDGET_MS = 75000'), 'fe-auth-budget-75s'],
    [gi.includes("isAuthAction ? 90000"), 'fe-auth-timeout-90s'],
    [gi.includes('maxDogetRetries = isAuthAction ? 5 : 3') || gi.includes('maxHtmlRetries = isAuthAction ? 5 : 3'), 'fe-auth-retry-5x'],
    [auth.includes('startMfaEnrollment') && auth.includes('__timeoutMs: 45000'), 'fe-enroll-timeout-45s'],
    [ui.includes('Auth.startMfaEnrollment') && ui.includes('جاري التحميل'), 'fe-modal-waits-startMfa'],
    [/function startMfaEnrollment[\s\S]{0,800}bypassFullScan:\s*true/.test(users), 'be-enroll-bypass-fullscan'],
    [mfa.includes('function mfaSelfTest_') && mfa.includes("hotp0 === '755224'"), 'be-mfa-selftest'],
    [mfa.includes('normalizeGasByteArray_') && mfa.includes('hmacSha1Totp_'), 'be-hmac-signed-bytes']
  ];
  for (const [ok, name] of checks) {
    if (ok) pass.push(name);
    else fail.push(name);
  }

  if (gi.includes('AUTH_TOTAL_BUDGET_MS = 75000') && gi.includes('maxDogetRetries = isAuthAction ? 5 : 3')) {
    notes.push('واجهة: حتى 5 إعادات + ميزانية 75ث عند تذبذب Google — المستخدم يرى سبنر طويل');
  }
  if (auth.includes('__timeoutMs: 45000') && gi.includes('isAuthAction ? 90000')) {
    notes.push('بدء التسجيل يمرّر 45ث بينما مهلة auth العامة 90ث — أول محاولة قد تُجهض قبل اكتمال cold-start');
  }
}

function classifyLatency(ms) {
  if (ms < 2500) return 'سريع';
  if (ms < 8000) return 'مقبول';
  if (ms < 20000) return 'بطيء';
  return 'بطيء جداً';
}

function authGatedOk(res) {
  const code = res?.json?.errorCode;
  const msg = String(res?.json?.message || '');
  return code === 'AUTH_REQUIRED'
    || code === 'SESSION_TOKEN_MISSING'
    || code === 'SESSION_ACTOR_REQUIRED'
    || code === 'ACTOR_IDENTITY_REQUIRED'
    || /تسجيل الدخول|جلسة|مصادقة/.test(msg);
}

async function main() {
  const fail = [];
  const pass = [];
  const notes = [];
  const timings = [];

  console.log('EXEC:', PROD_EXEC_URL);
  console.log('MCP: غير مناسب — دخان HTTP + فحص كود TOTP\n');

  console.log('=== 0) فحص كود MFA ===');
  staticChecks(fail, pass, notes);
  console.log('static:', pass.filter((p) => /^(fe|be)-/.test(p)).join(', ') || '—');
  if (fail.some((f) => /^(fe|be)-/.test(f))) {
    console.log('static FAIL:', fail.filter((f) => /^(fe|be)-/.test(f)).join(', '));
  }

  console.log('\n=== 1) تسخين + cold/warm ===');
  const cold = await postOnce('warmup');
  timings.push({ name: 'warmup-cold', ms: cold.ms, class: classifyLatency(cold.ms), ok: !!(cold.json || (!cold.html && cold.status)) });
  console.log('cold warmup', { ms: cold.ms, class: classifyLatency(cold.ms), success: cold.json?.success, serverMs: cold.json?.serverMs });
  await new Promise((r) => setTimeout(r, 400));
  const warm = await postOnce('warmup');
  timings.push({ name: 'warmup-warm', ms: warm.ms, class: classifyLatency(warm.ms), ok: !!(warm.json?.success) });
  console.log('warm warmup', { ms: warm.ms, class: classifyLatency(warm.ms), success: warm.json?.success, serverMs: warm.json?.serverMs });
  if (cold.ms >= 8000) notes.push(`cold-start GAS ≈ ${cold.ms}ms — أول فتح MFA بعد خمول السكربت بطيء`);
  if (warm.ms >= 5000) notes.push(`حتى بعد التسخين warmup=${warm.ms}ms — الشبكة/Google بطيئة الآن`);

  console.log('\n=== 2) testConnection ===');
  const conn = await postLikeFrontend('testConnection');
  timings.push({ name: 'testConnection', ms: conn.totalMs, attempts: conn.attempts.length, class: classifyLatency(conn.totalMs), ok: conn.last?.json?.success === true });
  console.log({ totalMs: conn.totalMs, attempts: conn.attempts, success: conn.last?.json?.success, message: conn.last?.json?.message });
  if (conn.last?.json?.success === true) pass.push('backend-alive');
  else fail.push('backend-dead');

  console.log('\n=== 3) mfaSelfTest (HOTP/تشفير/بايت عالي) ===');
  const self1 = await postLikeFrontend('mfaSelfTest');
  const st = self1.last?.json || {};
  timings.push({ name: 'mfaSelfTest', ms: self1.totalMs, attempts: self1.attempts.length, class: classifyLatency(self1.totalMs), ok: st.success === true });
  console.log({
    totalMs: self1.totalMs,
    attempts: self1.attempts.length,
    success: st.success,
    hotp0: st.hotp0,
    hotp0Ok: st.hotp0Ok,
    roundtripOk: st.roundtripOk,
    highByteTotpOk: st.highByteTotpOk,
    step: st.step,
    serverTime: st.serverTime,
    message: st.message,
    errorCode: st.errorCode
  });
  if (st.success === true && st.hotp0Ok && st.roundtripOk && st.highByteTotpOk !== false) {
    pass.push('totp-crypto-ok');
  } else if (st.errorCode === 'UNKNOWN_ACTION' || String(st.message || '').includes('غير معروفة')) {
    fail.push('mfaSelfTest-not-deployed');
  } else if (!self1.last?.json) {
    fail.push('mfaSelfTest-no-json');
  } else {
    fail.push('totp-crypto-fail');
    notes.push('خوارزمية TOTP على الخادم فشلت — الرمز من Authenticator لن يطابق');
  }

  console.log('\n=== 4) startMfaEnrollment (مسار فتح النافذة) ===');
  const enroll = await postLikeFrontend('startMfaEnrollment');
  timings.push({
    name: 'startMfaEnrollment',
    ms: enroll.totalMs,
    attempts: enroll.attempts.length,
    class: classifyLatency(enroll.totalMs),
    ok: authGatedOk(enroll.last) || enroll.last?.json?.success === true
  });
  console.log({
    totalMs: enroll.totalMs,
    attempts: enroll.attempts,
    success: enroll.last?.json?.success,
    errorCode: enroll.last?.json?.errorCode,
    message: enroll.last?.json?.message,
    action: enroll.last?.json?.action
  });
  if (enroll.last?.html) fail.push('enroll-html');
  else if (String(enroll.last?.json?.message || '').includes('غير معروفة') || enroll.last?.json?.errorCode === 'UNKNOWN_ACTION') {
    fail.push('enroll-action-missing');
  } else if (authGatedOk(enroll.last)) {
    pass.push('enroll-deployed-auth-gated');
    if (enroll.totalMs >= 8000) notes.push(`فتح MFA ينتظر الخادم ${enroll.totalMs}ms قبل ظهور QR — هذا سبب السبنر`);
    if (enroll.attempts.length > 1) notes.push(`startMfaEnrollment احتاج ${enroll.attempts.length} محاولات بسبب 404/doGet — تذبذب Google وليس منطق TOTP`);
  } else {
    fail.push('enroll-unexpected');
  }

  console.log('\n=== 5) confirmMfaEnrollment / verifyMfaLogin / disableMfa ===');
  for (const [name, action, data] of [
    ['confirmMfaEnrollment', 'confirmMfaEnrollment', { code: '000000' }],
    ['verifyMfaLogin', 'verifyMfaLogin', { email: 'smoke-mfa@example.invalid', code: '000000', challengeToken: 'x' }],
    ['disableMfa', 'disableMfa', { email: 'smoke-mfa@example.invalid', password: 'x' }]
  ]) {
    const r = await postLikeFrontend(action, data);
    timings.push({
      name,
      ms: r.totalMs,
      attempts: r.attempts.length,
      class: classifyLatency(r.totalMs),
      ok: authGatedOk(r.last) || r.last?.json?.success === false || r.last?.json?.success === true
    });
    console.log(name, {
      totalMs: r.totalMs,
      attempts: r.attempts.length,
      errorCode: r.last?.json?.errorCode,
      message: r.last?.json?.message,
      success: r.last?.json?.success
    });
    if (String(r.last?.json?.message || '').includes('غير معروفة') || r.last?.json?.errorCode === 'UNKNOWN_ACTION') {
      fail.push(`${name}-missing`);
    } else if (r.last?.html && r.attempts.length >= 6) {
      fail.push(`${name}-html-exhausted`);
    } else if (authGatedOk(r.last) || r.last?.json) {
      pass.push(`${name}-live`);
      if (r.attempts.length > 1) notes.push(`${name}: ${r.attempts.length} محاولات / ${r.totalMs}ms`);
    } else {
      fail.push(`${name}-unexpected`);
    }
    await new Promise((res) => setTimeout(res, 500));
  }

  console.log('\n=== 6) محاكاة ميزانية الواجهة (45ث enroll) ===');
  const enrollAttemptMs = enroll.attempts[0]?.ms || enroll.totalMs;
  if (enrollAttemptMs > 45000) {
    notes.push('أول محاولة startMfaEnrollment تجاوزت 45ث — الواجهة تجهض قبل رد Google');
    fail.push('enroll-exceeds-fe-timeout');
  } else {
    pass.push('enroll-within-fe-45s');
  }

  const flakyCount = timings.filter((t) => (t.attempts || 1) > 1).length;
  if (flakyCount >= 2) {
    notes.push('تذبذب Google (404/doGet) متكرر — السبب الرئيسي للتأخير وليس حساب TOTP نفسه');
  }

  console.log('\n=== TIMINGS ===');
  console.table(timings);

  console.log('\n=== NOTES ===');
  notes.forEach((n, i) => console.log(`${i + 1}. ${n}`));

  console.log('\n=== VERDICT ===');
  console.log('PASS:', pass.join(', ') || '—');
  console.log('FAIL:', fail.join(', ') || '—');

  const slow = timings.filter((t) => t.ms >= 8000);
  if (fail.includes('totp-crypto-fail')) {
    console.log('النتيجة: خوارزمية TOTP على الخادم مكسورة — الرمز لن يُقبل.');
    process.exit(1);
  }
  if (fail.includes('enroll-action-missing')) {
    console.log('النتيجة: startMfaEnrollment غير منشور على /exec.');
    process.exit(1);
  }
  if (fail.length) {
    console.log('النتيجة: دخان وجد خللاً — راجع FAIL.');
    process.exit(1);
  }
  if (slow.length) {
    console.log('النتيجة: الأكشن حي والخوارزمية سليمة. التأخير من زمن Google/إعادة الإرسال، ليس من حساب الرمز.');
    return;
  }
  console.log('النتيجة: دخان TOTP سريع وسليم على الإنتاج.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
