const { test, expect } = require('@playwright/test');

test.describe('offline banner (all users)', () => {
  test('shows banner when browser goes offline and hides when online', async ({ page, context }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const banner = page.locator('#hse-offline-banner');
    await expect(banner).toBeAttached();

    // حالة أولية: متصل → مخفي
    await expect(banner).toBeHidden();

    await context.setOffline(true);
    await page.waitForFunction(() => {
      const el = document.getElementById('hse-offline-banner');
      if (!el) return false;
      const visible = el.classList.contains('is-visible') || getComputedStyle(el).display !== 'none';
      return visible === true;
    }, null, { timeout: 8000 });

    await expect(banner).toBeVisible();
    await expect(page.locator('#hse-offline-banner-msg')).not.toBeEmpty();
    await expect(page.locator('body')).toHaveClass(/hse-has-offline-banner/);

    await context.setOffline(false);
    await page.waitForFunction(() => {
      const el = document.getElementById('hse-offline-banner');
      if (!el) return false;
      const visible = el.classList.contains('is-visible') || getComputedStyle(el).display !== 'none';
      return visible === false;
    }, null, { timeout: 8000 });

    await expect(banner).toBeHidden();
  });

  test('shows backend-mode banner via OfflineBanner API', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.waitForFunction(() => typeof window.OfflineBanner !== 'undefined', null, { timeout: 15000 });

    await page.evaluate(() => {
      window.OfflineBanner.setBackendOffline(true);
    });

    const banner = page.locator('#hse-offline-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAttribute('data-mode', 'backend');

    await page.evaluate(() => {
      window.OfflineBanner.setBackendOffline(false);
    });
    await expect(banner).toBeHidden();
  });
});
