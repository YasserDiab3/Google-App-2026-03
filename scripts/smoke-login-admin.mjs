/**
 * فحص دخان تسجيل دخول المدير
 * node scripts/smoke-login-admin.mjs [execUrl] [email] [password]
 */
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const EXEC_URL = process.argv[2] || process.env.HSE_EXEC_URL || 'https://www.safety-icapp.com/api/exec';
const EMAIL = (process.argv[3] || process.env.SMOKE_ADMIN_EMAIL || 'yasser@icapp.com').trim().toLowerCase();
const PASSWORD = process.argv[4] || process.env.SMOKE_ADMIN_PASSWORD || 'Yasser@2026';

async function postLogin(url, email, password) {
  const started = Date.now();
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'login', data: { email, password } })
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch (_e) {}
  return { status: res.status, ms: Date.now() - started, json, text: text.slice(0, 300) };
}

async function localLogin(email, password) {
  const routerPath = path.join(ROOT, 'backend-sql', 'src', 'rpc-router.js');
  const { handleRpcRequest } = await import(pathToFileURL(routerPath).href);
  const started = Date.now();
  const json = await handleRpcRequest({ action: 'login', data: { email, password } });
  return { status: 200, ms: Date.now() - started, json };
}

function pass(name, detail = '') {
  console.log(`PASS  ${name}${detail ? ` — ${detail}` : ''}`);
}

function fail(name, detail = '') {
  console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
}

async function assertLogin(label, result) {
  const j = result.json;
  if (!j) {
    fail(label, `no JSON (${result.status}) ${result.text || ''}`);
    return false;
  }
  if (j.errorCode === 'INVALID_CREDENTIALS') {
    fail(label, 'كلمة المرور أو البريد غير صحيح');
    return false;
  }
  if (j.success !== true) {
    fail(label, j.errorCode || j.message || 'login failed');
    return false;
  }
  if (j.mfaRequired === true && j.challengeToken) {
    pass(label, `MFA challenge OK (${result.ms}ms)`);
    return true;
  }
  if (j.user && (j.user.role === 'admin' || j.user.role === 'مدير النظام')) {
    pass(label, `admin session OK (${result.ms}ms)`);
    return true;
  }
  if (j.user) {
    pass(label, `login OK role=${j.user.role} (${result.ms}ms)`);
    return true;
  }
  fail(label, 'unexpected login response');
  return false;
}

async function main() {
  console.log('=== smoke-login-admin ===');
  console.log('email:', EMAIL);
  console.log('remote:', EXEC_URL);
  console.log('');

  let ok = true;

  const local = await localLogin(EMAIL, PASSWORD);
  if (!(await assertLogin('local RPC login', local))) ok = false;

  const remote = await postLogin(EXEC_URL, EMAIL, PASSWORD);
  if (!(await assertLogin('production login', remote))) ok = false;

  const bad = await postLogin(EXEC_URL, EMAIL, 'wrong-password-smoke');
  if (bad.json?.errorCode === 'INVALID_CREDENTIALS') {
    pass('bad password rejected', bad.json.errorCode);
  } else {
    fail('bad password rejected', bad.json?.errorCode || bad.json?.message || 'unexpected');
    ok = false;
  }

  console.log('\n=== SUMMARY ===');
  if (!ok) {
    console.log('FAILED — admin login smoke test');
    process.exit(1);
  }
  console.log('ALL PASS — admin credentials verified');
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
