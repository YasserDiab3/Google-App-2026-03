/**
 * Smoke: تشخيص فراغ موظفين عبر production /exec
 * node scripts/smoke-employees.mjs
 */
const PROD_EXEC_URL =
  'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';

function makeCsrf() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

const CSRF = makeCsrf();
const CLIENT_SID = `sid_smoke_${Date.now().toString(36)}`;

async function postJson(action, data) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 120000);
  try {
    const body = {
      action,
      data: data || {},
      csrfToken: CSRF,
      clientSessionId: CLIENT_SID
    };
    const res = await fetch(PROD_EXEC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      redirect: 'follow',
      signal: ctrl.signal
    });
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch (_e) {}
    return { status: res.status, json, text, finalUrl: res.url };
  } finally {
    clearTimeout(timer);
  }
}

function summarize(label, payload) {
  console.log(`\n=== ${label} ===`);
  if (!payload?.json) {
    console.log('HTTP', payload?.status, 'finalUrl', payload?.finalUrl);
    console.log('NON-JSON', String(payload?.text || '').slice(0, 350));
    return { ok: false, count: 0, named: 0 };
  }
  const d = payload.json;
  const arr = Array.isArray(d.data) ? d.data : [];
  const named = arr.filter((e) => String(e?.name || '').trim()).length;
  const inactive = arr.filter((e) => String(e?.status || '').toLowerCase() === 'inactive').length;
  const withResig = arr.filter((e) => String(e?.resignationDate || '').trim()).length;
  console.log({
    http: payload.status,
    success: d.success,
    message: d.message || null,
    errorCode: d.errorCode || null,
    count: d.count ?? arr.length,
    dataLen: arr.length,
    source: d.source || null,
    named,
    emptyName: arr.length - named,
    statusInactive: inactive,
    withResignationDate: withResig
  });
  if (arr.length) {
    console.log(
      'sample:',
      JSON.stringify(
        arr.slice(0, 5).map((e) => ({
          id: e.id,
          name: e.name,
          status: e.status,
          employeeNumber: e.employeeNumber,
          resignationDate: e.resignationDate,
          department: e.department,
          keys: Object.keys(e || {}).slice(0, 16)
        })),
        null,
        2
      )
    );
  } else {
    console.log('keys:', Object.keys(d));
    console.log('preview:', JSON.stringify(d).slice(0, 600));
  }
  return { ok: !!d.success, count: arr.length, named, source: d.source, errorCode: d.errorCode };
}

async function main() {
  console.log('PROD:', PROD_EXEC_URL);
  console.log('MCP: غير مناسب — اختبار GAS مباشر');

  const ping = await postJson('login', { email: '', password: '' });
  console.log('\n=== ping login ===');
  console.log('HTTP', ping.status, 'JSON?', !!ping.json, String(ping.text || '').slice(0, 180));

  const health = await postJson('getEmployeesSheetHealth', {});
  console.log('\n=== getEmployeesSheetHealth ===');
  if (health.json) {
    console.log(JSON.stringify(health.json, null, 2).slice(0, 3500));
  } else {
    console.log('NON-JSON', String(health.text || '').slice(0, 400));
  }

  const s1 = summarize(
    'getAllEmployees includeInactive (يتطلب جلسة مستخدم)',
    await postJson('getAllEmployees', { filters: { includeInactive: true } })
  );

  const s2 = summarize('getAllEmployees default (يتطلب جلسة)', await postJson('getAllEmployees', {}));

  console.log('\n=== reportEmployeeDuplicates (يتطلب جلسة) ===');
  const r3 = await postJson('reportEmployeeDuplicates', {});
  if (r3.json) {
    console.log({
      success: r3.json.success,
      message: r3.json.message || null,
      errorCode: r3.json.errorCode || null,
      keys: Object.keys(r3.json).slice(0, 25)
    });
  } else {
    console.log('NON-JSON', String(r3.text || '').slice(0, 300));
  }

  console.log('\n=== VERDICT ===');
  const h = health.json;
  if (h && h.success) {
    if (h.dataRowCount === 0) {
      console.log('ROOT مؤكد: ورقة Employees فارغة (dataRowCount=0).');
      if (Array.isArray(h.backupSheets) && h.backupSheets.length) {
        console.log('يوجد نسخ احتياطية:', h.backupSheets.map((b) => `${b.name}(${b.rows})`).join(', '));
        console.log('NEXT: استعد من أكبر Employees_backup_* ثم أعد فتح المديول.');
      } else {
        console.log('لا توجد أوراق Employees_backup_* ظاهرة — تحقق يدوياً في Sheets.');
      }
    } else if (h.namedCount === 0) {
      console.log(`ROOT: ${h.dataRowCount} صف بلا أسماء (namedCount=0) — انزلاق/عمود name فارغ.`);
      console.log('headers:', h.headers);
    } else {
      console.log(`ROOT ورقة سليمة: ${h.namedCount}/${h.dataRowCount} بأسماء. probe API count=${h.getAllEmployeesProbe?.count}`);
      console.log('فراغ الواجهة إذن كاش متصفح أو فشل جلسة getAllEmployees في العميل.');
      if (s1.errorCode === 'SESSION_ACTOR_REQUIRED') {
        console.log('NOTE: طلب بدون جلسة يُرفض — طبيعي. الواجهة المسجّلة يجب أن ترسل userData+sessionToken.');
      }
    }
  } else if (s1.errorCode === 'SESSION_ACTOR_REQUIRED' && !(h && h.success)) {
    console.log('ROOT جزئي: getAllEmployees محمي بجلسة؛ فشل health أيضاً — راجع النشر.');
  } else {
    console.log('غير حاسم — راجع المخرجات أعلاه.');
  }
}

main().catch((e) => {
  console.error('FAIL', e);
  process.exit(1);
});
