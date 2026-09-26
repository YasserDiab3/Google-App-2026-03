import { chromium } from '@playwright/test';

async function checkLiveUrl(url) {
    console.log(`\n========================================`);
    console.log(`Checking Live URL: ${url}`);
    console.log(`========================================`);
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage();
    const errors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000);

    // Close session modal if shown
    const sessionModal = page.locator('#fieldSessionModal');
    if (await sessionModal.isVisible()) {
        const closeBtn = page.locator('#fieldSessionModal .emergency-modal-close-btn').first();
        if (await closeBtn.isVisible()) await closeBtn.click();
        await page.waitForTimeout(300);
    }

    // 1. Verify Phase 1: Flags button hidden from worker footer
    const flagsBtnVisible = await page.locator('#lblHubFlagsBtn').isVisible();
    console.log('[Phase 1] Visible #lblHubFlagsBtn in footer:', flagsBtnVisible, '(Expected: false)');

    // 2. Verify Phase 2: Action Closure Module is loaded
    const hasClosure = await page.evaluate(() => typeof window.HseActionClosure === 'object');
    console.log('[Phase 2] window.HseActionClosure defined:', hasClosure, '(Expected: true)');

    // 3. Verify Phase 3: Shift Handover Button & Module
    const hasHandover = await page.evaluate(() => typeof window.HseShiftHandover === 'object');
    console.log('[Phase 3] window.HseShiftHandover defined:', hasHandover, '(Expected: true)');

    const handoverBtn = page.locator('#btnShiftHandoverTool');
    const isHandoverVisible = await handoverBtn.isVisible();
    console.log('[Phase 3] #btnShiftHandoverTool visible in tools grid:', isHandoverVisible, '(Expected: true)');

    // Open Shift Handover modal
    if (isHandoverVisible) {
        await handoverBtn.click();
        await page.waitForTimeout(500);
        const handoverModalOpen = await page.locator('#hseShiftHandoverModal').isVisible();
        console.log('[Phase 3] Shift Handover modal opens on click:', handoverModalOpen, '(Expected: true)');
        if (handoverModalOpen) {
            await page.locator('#btnCloseHandoverModal').click();
            await page.waitForTimeout(300);
        }
    }

    // Version check
    const versionText = await page.locator('#lblAppVersionBadge').innerText().catch(() => 'N/A');
    console.log('Live App Version badge:', versionText);

    console.log('Console errors count:', errors.length);
    if (errors.length > 0) {
        console.log('Sample errors:', errors.slice(0, 3));
    }

    await browser.close();
    return { hasClosure, hasHandover, isHandoverVisible, flagsHidden: !flagsBtnVisible };
}

async function run() {
    console.log('Waiting 15 seconds for Vercel build & propagation...');
    await new Promise(r => setTimeout(r, 15000));

    try {
        await checkLiveUrl('https://icapphub.vercel.app/forms-hub');
    } catch (e) {
        console.warn('icapphub check note:', e.message);
    }

    try {
        await checkLiveUrl('https://www.safety-icapp.com/forms-hub');
    } catch (e) {
        console.warn('safety-icapp check note:', e.message);
    }
}

run();
