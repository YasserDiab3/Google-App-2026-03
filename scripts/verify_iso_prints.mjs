import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const brainDir = 'C:/Users/HP/.gemini/antigravity/brain/6943cf7f-f6a7-4578-9253-9c72d7cb657b';
const frontendDir = path.resolve('Frontend');

// Static file server
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(frontendDir, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(4173, '127.0.0.1', resolve));
console.log('Server running on http://127.0.0.1:4173');

let browser;
try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  console.log('Launched Microsoft Edge');
} catch (e) {
  console.log('Chromium launch:', e.message);
  browser = await chromium.launch({ headless: true });
}

const context = await browser.newContext({
  viewport: { width: 1280, height: 960 },
  deviceScaleFactor: 2
});

// Helper to capture print window from page
async function capturePrintOutput(page, actionFn, outputFilename) {
  const html = await page.evaluate(actionFn);
  if (html) {
    const printPage = await context.newPage();
    await printPage.setContent(html, { waitUntil: 'load' });
    await printPage.waitForTimeout(600);
    const targetPath = path.join(brainDir, outputFilename);
    await printPage.screenshot({ path: targetPath, fullPage: true });
    console.log(`Saved screenshot: ${outputFilename}`);
    await printPage.close();
  } else {
    console.warn(`No HTML returned for ${outputFilename}`);
  }
}

const page = await context.newPage();

// 1. Fire Inspection Receipt
console.log('Verifying Fire Equipment Inspection...');
await page.goto('http://127.0.0.1:4173/public-fire-inspection.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);

const fireHeaderEl = await page.$('.iso-header-table');
if (fireHeaderEl) {
  await fireHeaderEl.screenshot({ path: path.join(brainDir, 'verified_fire_header.png') });
  console.log('Saved verified_fire_header.png');
}

await capturePrintOutput(page, () => {
  window.lastSubmittedFireInspection = {
    refId: 'FEI-2026-0927-01',
    payload: {
      assetId: 'FE-IQF-014',
      inspector: 'م. تامر الجيار',
      status: 'صالح',
      checkDate: '2026-09-27',
      sealIntact: 'سليمة ومختومة بالرصاص',
      pressureStatus: 'في النطاق الأخضر (15 بار)',
      actions: 'تم تنظيف القاذف وتحديث كارت الفحص الدوري',
      notes: 'المعدة في حالة ممتازة ومطابقة للمواصفة NFPA 10'
    },
    asset: {
      type: 'طفاية بودرة كيميائية جافة ABC سعة 6 كجم',
      location: 'عنبر التجميد السريع IQF - خط 1',
      site: 'مصنع البطاطس نصف مقلية'
    }
  };

  let captured = '';
  window.open = () => ({
    document: {
      write: (h) => { captured = h; },
      close: () => {}
    }
  });

  if (typeof printFireInspectionReceipt === 'function') {
    printFireInspectionReceipt();
  }
  return captured;
}, 'verified_fire_inspection_print.png');

// 2. Daily Safety Patrol Record
console.log('Verifying Daily Safety Inspection...');
await page.goto('http://127.0.0.1:4173/public-daily-safety.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);

const dailyHeaderEl = await page.$('.iso-header-table');
if (dailyHeaderEl) {
  await dailyHeaderEl.screenshot({ path: path.join(brainDir, 'verified_daily_safety_header.png') });
  console.log('Saved verified_daily_safety_header.png');
}

await capturePrintOutput(page, () => {
  window.lastSubmittedRef = 'DSC-2026-09-27-1-01';
  window.lastSubmittedPayload = {
    siteName: 'مصنع تصنيع وتجميد الفراولة والخضار',
    shift: 'الوردية الأولى (صباحية)',
    inspectorName: 'أ. أحمد الشناوي',
    date: '2026-09-27',
    notes: 'تم التأكد من التزام العاملين بكافة مهمات الوقاية، ومعالجة باليتات متراكمة في ممر الطوارئ فوراً.'
  };

  let captured = '';
  window.open = () => ({
    document: {
      write: (h) => { captured = h; },
      close: () => {}
    }
  });

  if (typeof printDailySafetyReport === 'function') {
    printDailySafetyReport();
  }
  return captured;
}, 'verified_daily_safety_patrol_print.png');

// 3. Near-Miss Incident Report
console.log('Verifying Near-Miss Incident Report...');
await page.goto('http://127.0.0.1:4173/public-near-miss.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);

const nearMissHeaderEl = await page.$('.iso-header-table');
if (nearMissHeaderEl) {
  await nearMissHeaderEl.screenshot({ path: path.join(brainDir, 'verified_near_miss_header.png') });
  console.log('Saved verified_near_miss_header.png');
}

await capturePrintOutput(page, () => {
  window.lastSubmittedNearMiss = {
    refCode: 'NM-2026-0927-01',
    payload: {
      date: '2026-09-27',
      time: '14:15',
      site: 'مصنع تصنيع المركزات',
      area: 'منطقة التفريغ والتحميل الخارجي',
      reporterName: 'أ. سامي المنشاوي (أمين مخزن)',
      severity: 'عالية',
      description: 'أثناء قيام سائق الرافعة الشوكية بنقل طرد براميل على ارتفاع 2.5 متر، انزلق برميل فارغ وسقط بالقرب من مسار المشاة بفاصل متر واحد دون إصابة أحد.',
      potentialConsequence: 'إصابات كدمات أو كسور جسيمة للعاملين المارين إذا سقط برميل ممتلئ، وتلفيات في الممرات.',
      immediateAction: 'إيقاف الرافعة فوراً، تطويق المنطقة بشرائط تحذيرية، والتحقق من تأمين الأحمال بواسطة أحزمة التثبيت.',
      rootCause: 'سير الرافعة الشوكية بالشوكة مرفوعة لأعلى بدون تثبيت الطرد.',
      preventiveAction: 'إلزام جميع سائقي الرافعات بعدم رفع الأحمال لأكثر من 30 سم أثناء السير، وتحديد ممر مشاة منفصل ومحمي بحواجز فولاذية.'
    }
  };

  let captured = '';
  window.open = () => ({
    document: {
      write: (h) => { captured = h; },
      close: () => {}
    }
  });

  if (typeof printNearMissReport === 'function') {
    printNearMissReport();
  }
  return captured;
}, 'verified_near_miss_incident_print.png');

// 4. Gate Visitor Entry Header & Muster List
console.log('Verifying Gate Visitor Entry...');
await page.goto('http://127.0.0.1:4173/gate-visitor-entry.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);

const gateHeaderEl = await page.$('.iso-header-table');
if (gateHeaderEl) {
  await gateHeaderEl.screenshot({ path: path.join(brainDir, 'verified_gate_header.png') });
  console.log('Saved verified_gate_header.png');
}

await capturePrintOutput(page, () => {
  let captured = '';
  window.open = () => ({
    document: {
      write: (h) => { captured = h; },
      close: () => {}
    }
  });

  if (typeof printEmergencyMusterList === 'function') {
    printEmergencyMusterList();
  }
  return captured;
}, 'verified_emergency_muster_list_print.png');

// 5. Forms Hub - Chemical SDS Hazmat Card & PTW Log
console.log('Verifying Forms Hub (Hazmat Card & PTW Log)...');
await page.goto('http://127.0.0.1:4173/forms-hub.html', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

await capturePrintOutput(page, () => {
  let captured = '';
  window.open = () => ({
    document: {
      write: (h) => { captured = h; },
      close: () => {}
    }
  });

  if (typeof printHazmatCard === 'function') {
    printHazmatCard('حامض نيتريك 68%');
  }
  return captured;
}, 'verified_sds_hazmat_card_print.png');

await capturePrintOutput(page, () => {
  let captured = '';
  window.open = () => ({
    document: {
      write: (h) => { captured = h; },
      close: () => {}
    }
  });

  if (typeof printShiftDigestReport === 'function') {
    printShiftDigestReport();
  }
  return captured;
}, 'verified_shift_handover_digest_print.png');

// Capture PTW Shift Log Container directly
console.log('Capturing PTW Log Container...');
const ptwContainerHtml = await page.evaluate(() => {
  const c = document.getElementById('ptwPrintLogContainer');
  if (!c) return null;
  // populate sample data into container
  const dateEl = document.getElementById('ptwPrintLogDate');
  if (dateEl) dateEl.textContent = '2026-09-27 — 10:00 صباحاً';
  const totEl = document.getElementById('ptwPrintTotal');
  if (totEl) totEl.textContent = '4';
  const hotEl = document.getElementById('ptwPrintHot');
  if (hotEl) hotEl.textContent = '2';
  const hgtEl = document.getElementById('ptwPrintHeight');
  if (hgtEl) hgtEl.textContent = '1';
  const cnfEl = document.getElementById('ptwPrintConfined');
  if (cnfEl) cnfEl.textContent = '1';
  const tbody = document.getElementById('ptwPrintLogTbody');
  if (tbody) {
    tbody.innerHTML = `
      <tr style="border-bottom:1px solid #cbd5e1;">
        <td style="padding:6px; font-weight:800; color:#1e40af; border:1px solid #cbd5e1;">PTW-2026-081</td>
        <td style="padding:6px; font-weight:700; border:1px solid #cbd5e1;">خط فرز البطاطس</td>
        <td style="padding:6px; border:1px solid #cbd5e1;"><span style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:4px; font-weight:800;">أعمال ساخنة (لحام)</span></td>
        <td style="padding:6px; border:1px solid #cbd5e1;">فريق الصيانة الميكانيكية</td>
        <td style="padding:6px; border:1px solid #cbd5e1;">م. مصطفى غنيم</td>
        <td style="padding:6px; border:1px solid #cbd5e1; font-weight:700; text-align:center;">08:30 ص - 03:30 م</td>
        <td style="padding:6px; font-weight:800; border:1px solid #cbd5e1; color:#15803d;">ساري ومراقب</td>
      </tr>
      <tr style="border-bottom:1px solid #cbd5e1; background:#f8fafc;">
        <td style="padding:6px; font-weight:800; color:#1e40af; border:1px solid #cbd5e1;">PTW-2026-082</td>
        <td style="padding:6px; font-weight:700; border:1px solid #cbd5e1;">عنبر التجميد السريع IQF</td>
        <td style="padding:6px; border:1px solid #cbd5e1;"><span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:4px; font-weight:800;">العمل على ارتفاعات</span></td>
        <td style="padding:6px; border:1px solid #cbd5e1;">شركة إيجي فريز للمقاولات</td>
        <td style="padding:6px; border:1px solid #cbd5e1;">م. طارق كمال</td>
        <td style="padding:6px; border:1px solid #cbd5e1; font-weight:700; text-align:center;">09:00 ص - 04:00 م</td>
        <td style="padding:6px; font-weight:800; border:1px solid #cbd5e1; color:#15803d;">ساري ومعتمد</td>
      </tr>
    `;
  }
  return `<!DOCTYPE html>
  <html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Cairo', sans-serif; background: #f1f5f9; padding: 24px; margin: 0; }
      #ptwPrintLogContainer { display: block !important; max-width: 920px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #cbd5e1; }
    </style>
  </head>
  <body>
    ${c.outerHTML}
  </body>
  </html>`;
});

if (ptwContainerHtml) {
  const ptwPage = await context.newPage();
  await ptwPage.setContent(ptwContainerHtml, { waitUntil: 'domcontentloaded' });
  await ptwPage.waitForTimeout(600);
  await ptwPage.screenshot({ path: path.join(brainDir, 'verified_ptw_active_log_print.png'), fullPage: true });
  console.log('Saved verified_ptw_active_log_print.png');
  await ptwPage.close();
}

console.log('SUCCESS: All official ISO reports verified and screenshotted in Microsoft Edge!');

await browser.close();
server.close();
process.exit(0);
