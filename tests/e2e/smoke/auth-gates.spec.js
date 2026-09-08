const { test, expect } = require('@playwright/test');

async function waitForAuth(page) {
  await page.goto('/', { waitUntil: 'load' });
  await expect(page.locator('#login-form')).toBeAttached({ timeout: 30000 });
  await page.waitForFunction(
    () => typeof window.Auth === 'object' && typeof window.Auth.login === 'function',
    null,
    { timeout: 120000 }
  );
}

test.describe('auth gates (smoke)', () => {
  test('empty credentials rejected via Auth.login', async ({ page }) => {
    test.setTimeout(180000);
    await waitForAuth(page);

    const result = await page.evaluate(async () => {
      return await window.Auth.login('', '');
    });

    expect(result && result.success).toBeFalsy();
    expect(String((result && result.message) || '')).toMatch(/البريد|كلمة|إدخال/i);
  });

  test('bootstrap helpers always deny @hse.local', async ({ page }) => {
    test.setTimeout(180000);
    await waitForAuth(page);

    const flags = await page.evaluate(() => ({
      allowed: window.Auth.isBootstrapLoginAllowed([]),
      isBootstrap: window.Auth.isBootstrapEmail('admin@hse.local'),
      isAnyHse: window.Auth.isBootstrapEmail('qa@hse.local'),
      notBootstrap: window.Auth.isBootstrapEmail('user@icapp.com'),
    }));

    expect(flags.allowed).toBe(false);
    expect(flags.isBootstrap).toBe(true);
    expect(flags.isAnyHse).toBe(true);
    expect(flags.notBootstrap).toBe(false);
  });

  test('Auth.login rejects admin@hse.local', async ({ page }) => {
    test.setTimeout(180000);
    await waitForAuth(page);

    const result = await page.evaluate(async () => {
      return await window.Auth.login('admin@hse.local', 'admin123');
    });

    expect(result && result.success).toBeFalsy();
    expect(String((result && result.errorCode) || '')).toMatch(/BOOTSTRAP/i);
    expect(String((result && result.message) || '')).toMatch(/تجهيز|معطّل|معطل|bootstrap|الخادم/i);
  });

  test('UI: login fields required and screen present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#login-screen')).toBeAttached({ timeout: 15000 });

    const username = page.locator('#username');
    const password = page.locator('#password');
    await expect(username).toBeAttached({ timeout: 15000 });
    await expect(password).toBeAttached({ timeout: 15000 });
    await expect(username).toHaveAttribute('required', '');
    await expect(password).toHaveAttribute('required', '');
  });
});
