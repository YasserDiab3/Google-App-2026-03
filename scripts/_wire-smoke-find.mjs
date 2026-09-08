import fs from 'fs';
const p = 'Backend/Code.gs';
let s = fs.readFileSync(p, 'utf8');
if (s.includes("action === 'smokeFindDscByNeedle'")) {
  console.log('already wired handler');
} else {
  const a = `} else if (action === 'getPublicDailySafetyConfig' && typeof getPublicDailySafetyConfig === 'function') {
                result = getPublicDailySafetyConfig();
            } else if (action === 'submitGateVisitorCheckIn`;
  const b = `} else if (action === 'getPublicDailySafetyConfig' && typeof getPublicDailySafetyConfig === 'function') {
                result = getPublicDailySafetyConfig();
            } else if (action === 'smokeFindDscByNeedle' && typeof smokeFindDscByNeedle === 'function') {
                result = smokeFindDscByNeedle(payload || postData.data || postData || {});
            } else if (action === 'submitGateVisitorCheckIn`;
  if (!s.includes(a)) {
    console.error('handler anchor missing');
    process.exit(1);
  }
  s = s.replace(a, b);
}
if (!s.includes("'smokeFindDscByNeedle', 'submitGateVisitorCheckIn'")) {
  s = s.replace(
    "'getPublicDailySafetyConfig', 'submitGateVisitorCheckIn'",
    "'getPublicDailySafetyConfig', 'smokeFindDscByNeedle', 'submitGateVisitorCheckIn'"
  );
}
if (!s.includes("'getPublicDailySafetyConfig', 'smokeFindDscByNeedle'")) {
  s = s.replace(
    `'submitPublicDailySafetyChecklist', 'getPublicDailySafetyConfig',
            'submitGateVisitorCheckIn`,
    `'submitPublicDailySafetyChecklist', 'getPublicDailySafetyConfig', 'smokeFindDscByNeedle',
            'submitGateVisitorCheckIn`
  );
}
fs.writeFileSync(p, s);
console.log('done', s.includes('smokeFindDscByNeedle'));
