import { chromium } from '@playwright/test';

async function verifyLive() {
    console.log('Testing live Vercel deployment: https://icapphub.vercel.app/forms-hub');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage();

    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    try {
        await page.goto('https://icapphub.vercel.app/forms-hub', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);

        const version = await page.locator('#lblAppVersion').textContent();
        console.log(`Live Version: ${version}`);

        const hasGuide = await page.evaluate(() => typeof window.HseTechnicalGuide !== 'undefined');
        console.log(`Live HseTechnicalGuide defined: ${hasGuide}`);

        const btnVisible = await page.locator('#hseTgFloatingBtn').isVisible();
        console.log(`Live Floating Button visible: ${btnVisible}`);

        console.log(`Live Console Errors: ${errors.length}`);
        if (errors.length > 0) {
            console.log(errors);
        }
    } finally {
        await browser.close();
    }
}

verifyLive().catch(err => {
    console.error('Live verify note:', err.message);
});
