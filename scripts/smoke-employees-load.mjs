/**
 * دخان توقيت تحميل الموظفين
 * node scripts/smoke-employees-load.mjs
 */
const PROD_EXEC_URL =
  'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';

function makeCsrf() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function post(action, data) {
  const t0 = Date.now();
  const res = await fetch(PROD_EXEC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action,
      data: data || {},
      csrfToken: makeCsrf(),
      clientSessionId: `sid_smoke_${Date.now().toString(36)}`
    }),
    redirect: 'follow'
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch (_e) {}
  return { status: res.status, json, text, clientMs: Date.now() - t0 };
}

async function main() {
  console.log('MCP: غير مناسب — دخان GAS مباشر');
  console.log('PROD:', PROD_EXEC_URL);

  const r1 = await post('getEmployeesLoadSmoke', { nonce: Date.now() });
  console.log('\n=== getEmployeesLoadSmoke ===');
  console.log('HTTP', r1.status, 'clientMs', r1.clientMs);
  if (!r1.json) {
    console.log('NON-JSON', String(r1.text).slice(0, 400));
    process.exit(1);
  }
  console.log(JSON.stringify(r1.json, null, 2));

  // ثانية: يفترض cache-lite أسرع إن نجح المسار
  const r2 = await post('getEmployeesLoadSmoke', { nonce: Date.now() + 1 });
  console.log('\n=== getEmployeesLoadSmoke #2 (كاش؟) ===');
  console.log('clientMs', r2.clientMs);
  if (r2.json?.timings) {
    console.log('timings', r2.json.timings);
    console.log('probe', r2.json.getAllEmployeesProbe);
  }

  console.log('\n=== خلاصة ===');
  const v = r1.json.verdict || [];
  v.forEach((line) => console.log('-', line));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
