import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const screenshotsDir = path.join(projectRoot, 'screenshots');

async function run() {
    console.log('🚀 Capturing dedicated Sustainability Screenshots...');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    
    const indexPath = `file:///${path.join(projectRoot, 'Frontend', 'index.html').replace(/\\/g, '/')}`;
    await page.goto(indexPath, { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Login
    await page.evaluate(async () => {
        window.AppState = window.AppState || {};
        window.AppState.currentUser = {
            email: 'sustainability.director@icapp.com.eg',
            name: 'Director of Environmental Sustainability',
            role: 'admin',
            department: 'HSE & ESG',
            permissions: { all: true, admin: true }
        };
        if (window.HSE_clearUiLock) window.HSE_clearUiLock();
        if (window.UI && window.UI.showMainApp) await window.UI.showMainApp();
    });
    await page.waitForTimeout(2500);

    // 1. Navigate to sustainability (Arabic)
    await page.evaluate(() => {
        const link = document.querySelector('a[data-section="sustainability"]');
        if (link) link.click();
    });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotsDir, 'sus_main_ar.png') });
    console.log('✅ Captured sus_main_ar.png');

    // 2. Switch to English
    await page.evaluate(() => {
        try {
            if (window.i18n && window.i18n.setLanguage) window.i18n.setLanguage('en');
            else if (window.I18n && window.I18n.setLanguage) window.I18n.setLanguage('en');
            localStorage.setItem('language', 'en');
        } catch (e) {}
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotsDir, 'sus_main_en.png') });
    console.log('✅ Captured sus_main_en.png');

    // 3. Click Water Tab
    await page.evaluate(() => {
        if (window.Sustainability && typeof window.Sustainability.switchTab === 'function') {
            window.Sustainability.switchTab('water');
        }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotsDir, 'sus_water.png') });
    console.log('✅ Captured sus_water.png');

    // 4. Click Waste Tab
    await page.evaluate(() => {
        if (window.Sustainability && typeof window.Sustainability.switchTab === 'function') {
            window.Sustainability.switchTab('waste');
        }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotsDir, 'sus_waste.png') });
    console.log('✅ Captured sus_waste.png');

    // 5. Click Energy/Electricity Tab
    await page.evaluate(() => {
        if (window.Sustainability && typeof window.Sustainability.switchTab === 'function') {
            window.Sustainability.switchTab('electricity');
        }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotsDir, 'sus_electricity.png') });
    console.log('✅ Captured sus_electricity.png');

    await browser.close();
    console.log('🎉 Done capturing all sustainability screenshots!');
}

run().catch(console.error);
