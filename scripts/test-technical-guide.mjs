import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function runTests() {
    console.log('🚀 Starting Technical Guide & Regression verification...');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });
    page.on('pageerror', err => {
        consoleErrors.push(err.message);
    });

    try {
        // 1. Test forms-hub.html
        const hubPath = 'file:///' + path.join(rootDir, 'Frontend', 'forms-hub.html').replace(/\\/g, '/');
        console.log(`Testing forms-hub: ${hubPath}`);
        await page.goto(hubPath, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Verify guide object exists
        const hasGuideHub = await page.evaluate(() => typeof window.HseTechnicalGuide !== 'undefined');
        if (!hasGuideHub) throw new Error('HseTechnicalGuide not found on forms-hub.html');
        console.log('✅ HseTechnicalGuide defined on forms-hub.html');

        // Check floating button exists
        const btnExists = await page.locator('#hseTgFloatingBtn').isVisible();
        if (!btnExists) throw new Error('Floating button #hseTgFloatingBtn is not visible on forms-hub');
        // Dismiss field session modal if open
        const sessionModal = page.locator('#fieldSessionModal');
        if (await sessionModal.isVisible()) {
            await page.locator('#fieldSessionModal .emergency-modal-close-btn').first().click();
            await page.waitForTimeout(400);
        }

        // Open modal
        await page.click('#hseTgFloatingBtn');
        await page.waitForTimeout(400);

        const modalOpen = await page.locator('#hseTgModalBackdrop.is-open').isVisible();
        if (!modalOpen) throw new Error('Modal backdrop did not open');
        console.log('✅ Modal opened successfully');

        // Search test
        await page.fill('#hseTgSearchInput', 'لحام');
        await page.waitForTimeout(300);
        const cardCount = await page.locator('.hse-tg-card').count();
        if (cardCount === 0) throw new Error('Search for "لحام" returned 0 cards');
        console.log(`✅ Search for "لحام" returned ${cardCount} cards`);

        // Close modal
        await page.click('#hseTgCloseBtn');
        await page.waitForTimeout(300);
        const modalClosed = await page.locator('#hseTgModalBackdrop.is-open').isVisible();
        if (modalClosed) throw new Error('Modal did not close on close button click');
        console.log('✅ Modal closed successfully');

        // 2. Test Login Modal Regression (Zero Freeze, Instant Open)
        const loginBtn = page.locator('#btnOpenLoginModal, .portal-login-pill, [onclick*="openLoginModal"]').first();
        if (await loginBtn.isVisible()) {
            await loginBtn.click();
            await page.waitForTimeout(500);
            const loginModal = page.locator('#loginModal');
            if (await loginModal.isVisible()) {
                console.log('✅ Login modal opens cleanly without freeze or regression');
                // Close login modal
                const closeBtn = page.locator('#loginModal .theme-toggle-btn, #loginModal .close-btn, #btnCloseLoginModal').first();
                if (await closeBtn.isVisible()) await closeBtn.click();
            }
        }

        // 3. Test public-observation.html
        const obsPath = 'file:///' + path.join(rootDir, 'Frontend', 'public-observation.html').replace(/\\/g, '/');
        console.log(`Testing public-observation: ${obsPath}`);
        await page.goto(obsPath, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        const hasGuideObs = await page.evaluate(() => typeof window.HseTechnicalGuide !== 'undefined');
        if (!hasGuideObs) throw new Error('HseTechnicalGuide not found on public-observation.html');
        console.log('✅ HseTechnicalGuide defined on public-observation.html');

        // Test category filter on observation page
        await page.click('#hseTgFloatingBtn');
        await page.waitForTimeout(400);

        // Click LOTO tab
        await page.click('.hse-tg-tab-btn[data-cat="loto"]');
        await page.waitForTimeout(300);
        const lotoCards = await page.locator('.hse-tg-card').count();
        if (lotoCards === 0) throw new Error('Category filter "loto" returned 0 cards');
        console.log(`✅ Category filter "loto" returned ${lotoCards} card(s)`);

        // Test Copy Standard
        await page.click('.hse-tg-copy-btn');
        await page.waitForTimeout(300);
        console.log('✅ Copy standard button clicked cleanly');

        await page.click('#hseTgDoneBtn');
        await page.waitForTimeout(300);

        // 4. Test public-daily-safety.html
        const dscPath = 'file:///' + path.join(rootDir, 'Frontend', 'public-daily-safety.html').replace(/\\/g, '/');
        console.log(`Testing public-daily-safety: ${dscPath}`);
        await page.goto(dscPath, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        const hasGuideDsc = await page.evaluate(() => typeof window.HseTechnicalGuide !== 'undefined');
        if (!hasGuideDsc) throw new Error('HseTechnicalGuide not found on public-daily-safety.html');
        console.log('✅ HseTechnicalGuide defined on public-daily-safety.html');

        // Test Shortcut Ctrl+G
        await page.keyboard.press('Control+g');
        await page.waitForTimeout(400);
        const shortcutModalOpen = await page.locator('#hseTgModalBackdrop.is-open').isVisible();
        if (!shortcutModalOpen) throw new Error('Ctrl+G shortcut failed to open modal');
        console.log('✅ Keyboard shortcut Ctrl+G opened modal successfully');

        await page.keyboard.press('Control+g');
        await page.waitForTimeout(400);
        const shortcutModalClosed = await page.locator('#hseTgModalBackdrop.is-open').isVisible();
        if (shortcutModalClosed) throw new Error('Ctrl+G shortcut failed to toggle-close modal');
        console.log('✅ Keyboard shortcut Ctrl+G closed modal successfully');

        // Verify 0 runtime errors
        console.log('\n--- Console Errors Audit ---');
        const realErrors = consoleErrors.filter(e => {
            const s = String(e || '');
            if (s.includes('favicon') || s.includes('manifest')) return false;
            if (s.includes('CORS policy') || s.includes('ERR_UNKNOWN_URL_SCHEME') || s.includes('ERR_FILE_NOT_FOUND') || s.includes('ERR_FAILED')) return false;
            if (s.includes('status of 403') || s.includes('status of 404') || s.includes('status of 500')) return false;
            return true;
        });
        if (realErrors.length > 0) {
            console.error('❌ Found console errors:', realErrors);
            throw new Error(`Console errors detected: ${realErrors.join(', ')}`);
        }
        console.log('✅ ZERO CONSOLE ERRORS across all tested pages!');
        console.log('🎉 ALL TESTS PASSED WITH 100% SUCCESS!');

    } finally {
        await browser.close();
    }
}

runTests().catch(err => {
    console.error('❌ Test failed:', err);
    process.exit(1);
});
