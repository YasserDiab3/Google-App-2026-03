/**
 * Smoke عبر Apps Script API (clasp OAuth) — يتجاوز CSRF/جلسة HTTP
 * node scripts/smoke-employees-clasp-api.mjs
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

function loadClaspToken() {
  const p = path.join(os.homedir(), '.clasprc.json');
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const t = j.token || (j.tokens && j.tokens.default) || {};
  if (!t.access_token) throw new Error('no clasp access_token');
  return t;
}

async function scriptsRun(functionName, parameters = []) {
  const token = loadClaspToken();
  const url = `https://script.googleapis.com/v1/scripts/${SCRIPT_ID}:run`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      function: functionName,
      parameters,
      devMode: true
    })
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch (_e) {}
  return { status: res.status, json, text };
}

function analyzeEmployeesPayload(label, result) {
  console.log(`\n=== ${label} ===`);
  if (!result) {
    console.log('null result');
    return { count: 0, named: 0 };
  }
  const d = result.response?.result ?? result.error ?? result;
  if (result.error || d?.code) {
    console.log('API ERROR:', JSON.stringify(result.error || d).slice(0, 800));
    return { count: 0, named: 0, apiError: true };
  }
  const payload = d;
  const arr = Array.isArray(payload?.data) ? payload.data : [];
  const named = arr.filter((e) => String(e?.name || '').trim()).length;
  const inactive = arr.filter((e) => String(e?.status || '').toLowerCase() === 'inactive').length;
  console.log({
    success: payload?.success,
    message: payload?.message || null,
    count: payload?.count ?? arr.length,
    dataLen: arr.length,
    source: payload?.source || null,
    named,
    emptyName: arr.length - named,
    statusInactive: inactive
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
          keys: Object.keys(e || {}).slice(0, 14)
        })),
        null,
        2
      )
    );
  } else {
    console.log('preview:', JSON.stringify(payload).slice(0, 600));
  }
  return { count: arr.length, named, success: !!payload?.success, source: payload?.source };
}

async function main() {
  console.log('SCRIPT_ID:', SCRIPT_ID);
  console.log('MCP: غير مناسب');

  const r1 = await scriptsRun('getAllEmployees', [{ includeInactive: true }]);
  console.log('\nHTTP', r1.status);
  if (r1.status !== 200) {
    console.log(String(r1.text).slice(0, 1000));
  }
  const s1 = analyzeEmployeesPayload('getAllEmployees includeInactive (Execution API)', r1.json);

  const r2 = await scriptsRun('getAllEmployees', [{}]);
  const s2 = analyzeEmployeesPayload('getAllEmployees default', r2.json);

  // قائمة أوراق النسخ الاحتياطي إن وُجدت دالة مساعدة — وإلا نقرأ عبر getSpreadsheetId + قائمة يدوية في report
  let backupInfo = null;
  try {
    const r3 = await scriptsRun('reportEmployeeDuplicates', [{}]);
    console.log('\n=== reportEmployeeDuplicates ===');
    const d = r3.json?.response?.result || r3.json?.error || r3.json;
    console.log(JSON.stringify(d).slice(0, 1000));
    backupInfo = d;
  } catch (e) {
    console.log('report skip', e.message);
  }

  console.log('\n=== VERDICT ===');
  if (s1.apiError) {
    console.log('ROOT: Execution API فشل — فعّل Apps Script API أو أعد clasp login.');
  } else if (s1.success && s1.count === 0) {
    console.log('ROOT مؤكد: ورقة Employees تُقرأ فارغة (count=0).');
    console.log('NEXT: استعادة من Employees_backup_* في قاعدة SQL ثم أعد فتح المديول.');
  } else if (s1.count > 0 && s1.named === 0) {
    console.log('ROOT: صفوف موجودة بلا أسماء — انزلاق أعمدة/name فارغ.');
  } else if (s1.count > 0 && s1.named > 0) {
    console.log(`ROOT: الخادم سليم — ${s1.named}/${s1.count} بأسماء (source=${s1.source || 'sheet'}).`);
    console.log('فراغ الواجهة إذن من كاش المتصفح/AppState أو فشل جلسة CSRF في العميل — ليس فراغ الورقة.');
  } else {
    console.log('غير حاسم:', s1, s2);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
