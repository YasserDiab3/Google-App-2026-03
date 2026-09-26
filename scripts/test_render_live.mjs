import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const seedPath = path.join(projectRoot, 'scripts', 'real_seed_data.json');
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

async function testPtwRender() {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    const indexPath = `file:///${path.join(projectRoot, 'Frontend', 'index.html').replace(/\\/g, '/')}`;
    await page.goto(indexPath, { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const check = await page.evaluate((seed) => {
        window.AppState = window.AppState || {};
        window.AppState.currentUser = {
            email: 'safety.director@icapp.com.eg',
            name: 'مدير السلامة والصحة المهنية',
            role: 'admin',
            department: 'HSE Department',
            permissions: { all: true, admin: true }
        };
        window.AppState.appData = window.AppState.appData || {};
        window.AppState.appData.ptw = seed.ptw;
        window.AppState.appData.ptwRegistry = seed.ptwRegistry;

        localStorage.setItem('hse_ptw_list', JSON.stringify(seed.ptw));
        localStorage.setItem('hse_ptw_registry', JSON.stringify(seed.ptwRegistry));

        if (window.HSE_clearUiLock) window.HSE_clearUiLock();
        if (window.UI && window.UI.showMainApp) window.UI.showMainApp();

        if (window.PTW) {
            window.PTW._metricsDatasetCache = null;
            window.PTW.registryData = seed.ptwRegistry;
            if (window.PTW.initRegistry) window.PTW.initRegistry(true);
            if (window.PTW.load) window.PTW.load();
        }

        const openEl = document.getElementById('ptw-open-count');
        const totalEl = document.getElementById('ptw-total-count');
        return {
            openText: openEl ? openEl.textContent : 'none',
            totalText: totalEl ? totalEl.textContent : 'none',
            hasTable: !!document.querySelector('#ptw-table, table')
        };
    }, seedData);

    console.log('PTW Render Check:', check);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(projectRoot, 'screenshots', 'test_ptw_live_rendered.png') });
    console.log('Saved test_ptw_live_rendered.png!');
    await browser.close();
}

testPtwRender().catch(console.error);
