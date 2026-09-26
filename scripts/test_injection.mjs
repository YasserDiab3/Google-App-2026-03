import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const seedPath = path.join(projectRoot, 'scripts', 'real_seed_data.json');
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

async function testInjection() {
    console.log('Testing injection...');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    const indexPath = `file:///${path.join(projectRoot, 'Frontend', 'index.html').replace(/\\/g, '/')}`;
    await page.goto(indexPath, { waitUntil: 'load' });
    await page.waitForTimeout(2500);

    const res = await page.evaluate((seed) => {
        try {
            window.AppState = window.AppState || {};
            window.AppState.currentUser = {
                email: 'safety.director@icapp.com.eg',
                name: 'مدير السلامة والصحة المهنية والبيئة',
                role: 'admin',
                department: 'HSE Department',
                permissions: { all: true, admin: true }
            };
            window.AppState.appData = window.AppState.appData || {};
            Object.assign(window.AppState.appData, seed);

            localStorage.setItem('hse_ptw_list', JSON.stringify(seed.ptw));
            localStorage.setItem('hse_ptw_registry', JSON.stringify(seed.ptwRegistry));
            localStorage.setItem('hse_daily_observations', JSON.stringify(seed.dailyObservations));
            localStorage.setItem('dailyObservations_analysisItems', JSON.stringify(seed.dailyObservations));
            localStorage.setItem('hse_clinic_visits', JSON.stringify(seed.clinicVisits));
            localStorage.setItem('hse_fire_equipment_assets', JSON.stringify(seed.fireEquipment));
            localStorage.setItem('hse_violations', JSON.stringify(seed.violations));
            localStorage.setItem('hse_action_tracking', JSON.stringify(seed.actionTracking));
            localStorage.setItem('hse_app_data', JSON.stringify(seed));

            if (window.HSE_clearUiLock) window.HSE_clearUiLock();
            if (window.UI && window.UI.showMainApp) window.UI.showMainApp();

            return { success: true };
        } catch (e) {
            return { error: e.message };
        }
    }, seedData);

    console.log('Injection result:', res);
    await page.waitForTimeout(2000);

    // Click PTW
    await page.evaluate(() => {
        const link = document.querySelector('a[data-section="ptw"]');
        if (link) link.click();
    });
    await page.waitForTimeout(2500);

    const ptwRowsCount = await page.evaluate(() => {
        const rows = document.querySelectorAll('table tbody tr');
        return rows.length;
    });
    console.log('PTW Rendered Rows Count:', ptwRowsCount);

    await page.screenshot({ path: path.join(projectRoot, 'screenshots', 'test_ptw_real.png') });
    console.log('Saved test_ptw_real.png!');
    await browser.close();
}

testInjection().catch(console.error);
