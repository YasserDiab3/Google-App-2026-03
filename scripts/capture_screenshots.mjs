import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const screenshotsDir = path.join(projectRoot, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function capture() {
    console.log('🚀 Launching Edge browser via Playwright...');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1.5 // High DPI for crisp presentation images
    });
    const page = await context.newPage();

    const indexPath = `file:///${path.join(projectRoot, 'Frontend', 'index.html').replace(/\\/g, '/')}`;
    console.log(`📄 Navigating to: ${indexPath}`);
    await page.goto(indexPath, { waitUntil: 'load' });
    await page.waitForTimeout(3000);

    // 1. Capture Arabic Login Screen
    console.log('📸 Capturing 01_login_ar.png ...');
    await page.screenshot({ path: path.join(screenshotsDir, '01_login_ar.png') });

    // 2. Switch language to English and capture English Login Screen
    console.log('📸 Switching to English & capturing 02_login_en.png ...');
    await page.evaluate(() => {
        try {
            const dropdownBtn = document.getElementById('login-language-toggle-btn');
            if (dropdownBtn) dropdownBtn.click();
            const enBtn = document.querySelector('[data-lang="en"]');
            if (enBtn) enBtn.click();
            if (window.i18n && window.i18n.setLanguage) window.i18n.setLanguage('en');
        } catch (e) {
            console.error('Lang switch error:', e);
        }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotsDir, '02_login_en.png') });

    // 3. Switch back to Arabic & Log into Main App
    console.log('🔑 Logging into system...');
    await page.evaluate(async () => {
        try {
            const arBtn = document.querySelector('[data-lang="ar"]');
            if (arBtn) arBtn.click();
            if (window.i18n && window.i18n.setLanguage) window.i18n.setLanguage('ar');

            window.AppState = window.AppState || {};
            window.AppState.currentUser = {
                email: 'safety.director@icapp.com.eg',
                name: 'مدير السلامة والصحة المهنية والبيئة',
                role: 'admin',
                department: 'HSE Department',
                permissions: { all: true, admin: true }
            };

            if (typeof window.HSE_clearUiLock === 'function') {
                window.HSE_clearUiLock();
            }

            if (window.UI && typeof window.UI.showMainApp === 'function') {
                await window.UI.showMainApp();
            } else {
                const loginScreen = document.getElementById('login-screen');
                const mainApp = document.getElementById('main-app');
                if (loginScreen) loginScreen.style.display = 'none';
                if (mainApp) mainApp.style.display = 'flex';
            }
        } catch (err) {
            console.error('Login simulation err:', err);
        }
    });

    await page.waitForTimeout(3000);

    // 4. Capture Dashboard
    console.log('📸 Capturing 03_dashboard.png ...');
    await page.screenshot({ path: path.join(screenshotsDir, '03_dashboard.png') });

    // Helper to click section and capture screenshot
    const sectionsToCapture = [
        { section: 'ptw', filename: '04_ptw.png', name: 'تصاريح العمل' },
        { section: 'incidents', filename: '05_incidents.png', name: 'الحوادث والتحقيقات' },
        { section: 'nearmiss', filename: '06_nearmiss.png', name: 'الحوادث الوشيكة' },
        { section: 'clinic', filename: '07_clinic.png', name: 'العيادة الطبية' },
        { section: 'fire-equipment', filename: '08_fire_equipment.png', name: 'فحص معدات الحريق' },
        { section: 'contractors', filename: '09_contractors.png', name: 'المقاولين' },
        { section: 'ppe', filename: '10_ppe.png', name: 'مهمات الوقاية' },
        { section: 'chemical-safety', filename: '11_chemical_safety.png', name: 'المواد الكيميائية' },
        { section: 'periodic-inspections', filename: '12_periodic_inspections.png', name: 'الفحوصات الدورية' },
        { section: 'violations', filename: '13_violations.png', name: 'المخالفات' },
        { section: 'risk-assessment', filename: '14_risk_assessment.png', name: 'تقييم المخاطر' },
        { section: 'training', filename: '15_training.png', name: 'التدريب' },
        { section: 'forms-hub', filename: '16_forms_hub.png', name: 'بوابة النماذج' },
        { section: 'sustainability', filename: '17_sustainability.png', name: 'الاستدامة البيئية' },
        { section: 'ai-assistant', filename: '18_ai_assistant.png', name: 'مساعد الذكاء الاصطناعي' }
    ];

    for (const item of sectionsToCapture) {
        console.log(`📸 Navigating to ${item.name} (${item.section}) ...`);
        await page.evaluate((sec) => {
            try {
                // Try clicking navigation item
                const link = document.querySelector(`a[data-section="${sec}"]`);
                if (link) {
                    link.click();
                } else if (window.UI && typeof window.UI.navigateToSection === 'function') {
                    window.UI.navigateToSection(sec);
                }
            } catch (e) {
                console.error('Nav error for ' + sec, e);
            }
        }, item.section);

        await page.waitForTimeout(2000);
        await page.screenshot({ path: path.join(screenshotsDir, item.filename) });
        console.log(`   Saved ${item.filename}`);
    }

    console.log('✅ ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
    await browser.close();
}

capture().catch((err) => {
    console.error('Fatal error during capture:', err);
    process.exit(1);
});
