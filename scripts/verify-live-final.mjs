import { chromium } from '@playwright/test';

async function verifyLiveProduction() {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(err.message));

    console.log('Testing live: https://www.safety-icapp.com/forms-hub');
    await page.goto('https://www.safety-icapp.com/forms-hub', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    // Dismiss session modal if open
    const sessionModal = page.locator('#fieldSessionModal');
    if (await sessionModal.isVisible()) {
        await page.locator('#fieldSessionModal .emergency-modal-close-btn').first().click();
        await page.waitForTimeout(300);
    }

    // Click floating guide button
    await page.click('#hseTgFloatingBtn');
    await page.waitForTimeout(500);
    const isOpen = await page.locator('#hseTgModalBackdrop.is-open').isVisible();
    console.log('Guide Modal is open:', isOpen);

    // Filter by risk matrix
    await page.click('.hse-tg-tab-btn[data-cat="risk_matrix"]');
    await page.waitForTimeout(300);
    const count = await page.locator('.hse-tg-card').count();
    console.log('Risk matrix cards count:', count);

    // Search for LOTO
    await page.fill('#hseTgSearchInput', 'LOTO');
    await page.waitForTimeout(300);
    const lotoCards = await page.locator('.hse-tg-card').count();
    console.log('Search LOTO cards count:', lotoCards);

    // Test Copy Standard button
    await page.click('.hse-tg-copy-btn');
    await page.waitForTimeout(300);
    console.log('Copy standard button clicked successfully');

    // Close modal
    await page.click('#hseTgCloseBtn');
    await page.waitForTimeout(300);
    const isClosed = !(await page.locator('#hseTgModalBackdrop.is-open').isVisible());
    console.log('Guide Modal is closed:', isClosed);

    // Test Login Modal (Zero Freeze Verification)
    const loginBtn = page.locator('.portal-login-pill, #btnOpenLoginModal, [onclick*="openLoginModal"]').first();
    if (await loginBtn.isVisible()) {
        await loginBtn.click();
        await page.waitForTimeout(500);
        const loginModalVisible = await page.locator('#loginModal').isVisible();
        console.log('Login modal opens cleanly:', loginModalVisible);
        const closeLoginBtn = page.locator('#loginModal .theme-toggle-btn, #loginModal .close-btn').first();
        if (await closeLoginBtn.isVisible()) await closeLoginBtn.click();
    }

    console.log('Live console errors count:', errors.length);
    if (errors.length > 0) {
        console.log('Errors:', errors);
    }

    await browser.close();
}

verifyLiveProduction().catch(e => {
    console.error('Verify error:', e);
});
