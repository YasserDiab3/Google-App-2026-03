const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('acceptance gates (smoke)', () => {
  test('Gate 1: login screen present without active session', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const login = page.locator('#login-screen');
    await expect(login).toBeAttached({ timeout: 15000 });

    // بدون جلسة: شاشة الدخول يجب أن تكون في DOM (قد تكون مخفية لاحقاً بعد bootstrap سريع)
    const hasLoginForm =
      (await page.locator('#login-form, form[data-login], input[type="password"], #login-email, #email').count()) > 0
      || (await page.getByRole('button', { name: /دخول|login|تسجيل/i }).count()) > 0
      || (await login.count()) > 0;

    expect(hasLoginForm).toBeTruthy();
  });

  test('critical client services bootstrap', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.waitForFunction(() => typeof window.OfflineBanner !== 'undefined', null, { timeout: 20000 });

    const flags = await page.evaluate(() => ({
      offlineBanner: typeof window.OfflineBanner === 'object' && typeof window.OfflineBanner.sync === 'function',
      bannerEl: !!document.getElementById('hse-offline-banner'),
      versionJsonOk: true
    }));

    expect(flags.offlineBanner).toBeTruthy();
    expect(flags.bannerEl).toBeTruthy();

    const verRes = await page.request.get('/version.json');
    expect(verRes.ok()).toBeTruthy();
    const ver = await verRes.json();
    expect(String(ver.version || '')).toMatch(/^\d+\.\d+\.\d+/);
  });

  test('DATA-02: clinic_last_sync not sacrificial in PTW quota path', async () => {
    const ptwPath = path.join(__dirname, '..', '..', '..', 'Frontend', 'js', 'modules', 'modules', 'ptw.js');
    const src = fs.readFileSync(ptwPath, 'utf8');

    const blockMatch = src.match(/const sacrificialKeys\s*=\s*\[([\s\S]*?)\];/);
    expect(blockMatch, 'sacrificialKeys block missing').toBeTruthy();

    const block = blockMatch[1];
    const protectedKeys = [
      'clinic_last_sync',
      'violations_last_sync',
      'daily_observations_last_sync',
      'chemical_safety_last_sync',
      'hse_pending_sync_queue'
    ];

    for (const key of protectedKeys) {
      expect(block.includes(`'${key}'`) || block.includes(`"${key}"`), `${key} must stay out of sacrificialKeys`).toBeFalsy();
    }

    expect(block.includes('appTesterHistory') || block.includes('hse_read_notifications')).toBeTruthy();
  });
});
