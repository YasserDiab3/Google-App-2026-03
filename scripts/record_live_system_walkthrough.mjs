import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const seedPath = path.join(projectRoot, 'scripts', 'real_seed_data.json');
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

const videoOutputDir = path.join(projectRoot, 'videos');
if (!fs.existsSync(videoOutputDir)) {
    fs.mkdirSync(videoOutputDir, { recursive: true });
}

const screenshotsDir = path.join(projectRoot, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

const FFMPEG_PATH = 'C:\\Users\\HP\\AppData\\Local\\ms-playwright\\ffmpeg-1011\\ffmpeg-win64.exe';

async function recordWalkthrough() {
    console.log('🎬 Starting 2-Minute Live System Walkthrough Recording with Real Data...');
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        recordVideo: {
            dir: videoOutputDir,
            size: { width: 1440, height: 900 }
        }
    });

    const page = await context.newPage();
    const indexPath = `file:///${path.join(projectRoot, 'Frontend', 'index.html').replace(/\\/g, '/')}`;

    console.log('1️⃣ Step 1: Login Portal Interaction...');
    await page.goto(indexPath, { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Realistic typing in login
    await page.fill('#username', 'safety.director@icapp.com.eg');
    await page.waitForTimeout(1000);
    await page.fill('#password', 'ICAPP_HSE_2026_Secure!');
    await page.waitForTimeout(1000);

    const rememberMe = page.locator('#remember-me');
    if (await rememberMe.count() > 0) {
        await rememberMe.check();
        await page.waitForTimeout(800);
    }

    // Capture realistic login with credentials filled
    await page.screenshot({ path: path.join(screenshotsDir, '01_login_realistic.png') });
    console.log('   Saved 01_login_realistic.png');

    // Simulate MFA popup/step
    await page.evaluate(() => {
        const mfaStep = document.getElementById('login-mfa-step');
        if (mfaStep) {
            mfaStep.style.display = 'block';
            const mfaInput = document.getElementById('mfa-code');
            if (mfaInput) mfaInput.value = '849201';
        }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(screenshotsDir, '02_login_2fa_realistic.png') });
    console.log('   Saved 02_login_2fa_realistic.png');

    // Inject full real seed data into localStorage & AppState
    console.log('2️⃣ Step 2: Injecting Real Database Records & Entering Main App...');
    await page.evaluate((seed) => {
        const mfaStep = document.getElementById('login-mfa-step');
        if (mfaStep) mfaStep.style.display = 'none';

        window.AppState = window.AppState || {};
        window.AppState.currentUser = {
            email: 'safety.director@icapp.com.eg',
            name: 'م. ياسر دياب — مدير السلامة والصحة المهنية والبيئة',
            role: 'admin',
            department: 'HSE & Environmental Affairs',
            permissions: { all: true, admin: true }
        };
        window.AppState.appData = window.AppState.appData || {};
        Object.assign(window.AppState.appData, seed);

        localStorage.setItem('hse_ptw_list', JSON.stringify(seed.ptw));
        localStorage.setItem('hse_ptw_registry', JSON.stringify(seed.ptwRegistry));
        localStorage.setItem('hse_daily_observations', JSON.stringify(seed.dailyObservations));
        localStorage.setItem('dailyObservations_analysisItems', JSON.stringify(seed.dailyObservations));
        localStorage.setItem('hse_clinic_visits', JSON.stringify(seed.clinicVisits));
        localStorage.setItem('clinicContractorVisits', JSON.stringify(seed.clinicVisits));
        localStorage.setItem('hse_fire_equipment_assets', JSON.stringify(seed.fireEquipment));
        localStorage.setItem('fireEquipmentAssets', JSON.stringify(seed.fireEquipment));
        localStorage.setItem('hse_violations', JSON.stringify(seed.violations));
        localStorage.setItem('violations', JSON.stringify(seed.violations));
        localStorage.setItem('hse_training', JSON.stringify(seed.training));
        localStorage.setItem('hse_contractor_trainings', JSON.stringify(seed.contractorTrainings));
        localStorage.setItem('hse_action_tracking', JSON.stringify(seed.actionTracking));
        localStorage.setItem('actionTrackingRegister', JSON.stringify(seed.actionTracking));
        localStorage.setItem('hse_ppe', JSON.stringify(seed.ppe));
        localStorage.setItem('ppeItems', JSON.stringify(seed.ppe));
        localStorage.setItem('hse_waste_types', JSON.stringify(seed.wasteTypes));
        localStorage.setItem('hse_app_data', JSON.stringify(seed));

        if (window.HSE_clearUiLock) window.HSE_clearUiLock();
        if (window.UI && window.UI.showMainApp) window.UI.showMainApp();
    }, seedData);

    await page.waitForTimeout(3000);

    // 3️⃣ Dashboard Walkthrough
    console.log('3️⃣ Step 3: Executive Dashboard with Live KPI Cards...');
    await page.mouse.wheel(0, 350);
    await page.waitForTimeout(3000);
    await page.mouse.wheel(0, -350);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotsDir, '03_dashboard_realistic.png') });
    console.log('   Saved 03_dashboard_realistic.png');

    // Array of modules to walk through
    const walkthroughSteps = [
        {
            section: 'ptw',
            name: 'تصاريح العمل الإلكترونية (e-PTW)',
            screenshot: '04_ptw_realistic.png',
            customAction: async () => {
                await page.evaluate((seed) => {
                    if (window.PTW) {
                        window.PTW._metricsDatasetCache = null;
                        window.PTW.registryData = seed.ptwRegistry;
                        if (window.PTW.initRegistry) window.PTW.initRegistry(true);
                        if (window.PTW.load) window.PTW.load();
                    }
                }, seedData);
            }
        },
        {
            section: 'incidents',
            name: 'إدارة الحوادث والتحقيقات العميقة (Incidents & RCA)',
            screenshot: '05_incidents_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.Incidents && window.Incidents.load) window.Incidents.load();
                });
            }
        },
        {
            section: 'nearmiss',
            name: 'الحوادث الوشيكة (Near-Miss)',
            screenshot: '06_nearmiss_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.NearMiss && window.NearMiss.load) window.NearMiss.load();
                });
            }
        },
        {
            section: 'clinic',
            name: 'العيادة الطبية والصحة المهنية (Clinic)',
            screenshot: '07_clinic_realistic.png',
            customAction: async () => {
                await page.evaluate((seed) => {
                    if (window.Clinic && window.Clinic.load) window.Clinic.load();
                }, seedData);
            }
        },
        {
            section: 'fire-equipment',
            name: 'فحص معدات الحريق ومكافحة الطوارئ',
            screenshot: '08_fire_equipment_realistic.png',
            customAction: async () => {
                await page.evaluate((seed) => {
                    if (window.FireEquipment && window.FireEquipment.load) window.FireEquipment.load();
                }, seedData);
            }
        },
        {
            section: 'contractors',
            name: 'إدارة وتأهيل المقاولين (Contractors)',
            screenshot: '09_contractors_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.Contractors && window.Contractors.load) window.Contractors.load();
                });
            }
        },
        {
            section: 'ppe',
            name: 'مهمات الوقاية الشخصية والمخزون (PPE)',
            screenshot: '10_ppe_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.PPE && window.PPE.load) window.PPE.load();
                });
            }
        },
        {
            section: 'chemical-safety',
            name: 'السلامة الكيميائية وصحائف MSDS',
            screenshot: '11_chemical_safety_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.ChemicalSafety && window.ChemicalSafety.load) window.ChemicalSafety.load();
                });
            }
        },
        {
            section: 'periodic-inspections',
            name: 'الفحوصات الدورية للمعدات والمنشآت',
            screenshot: '12_periodic_inspections_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.PeriodicInspections && window.PeriodicInspections.load) window.PeriodicInspections.load();
                });
            }
        },
        {
            section: 'violations',
            name: 'إدارة المخالفات ولائحة الجزاءات',
            screenshot: '13_violations_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.Violations && window.Violations.load) window.Violations.load();
                });
            }
        },
        {
            section: 'risk-assessment',
            name: 'تقييم المخاطر ومصفوفة 5x5',
            screenshot: '14_risk_assessment_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.RiskAssessment && window.RiskAssessment.load) window.RiskAssessment.load();
                });
            }
        },
        {
            section: 'training',
            name: 'إدارة التدريب والتأهيل (Training)',
            screenshot: '15_training_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.Training && window.Training.load) window.Training.load();
                });
            }
        },
        {
            section: 'forms-hub',
            name: 'بوابة النماذج الميدانية (Forms Hub)',
            screenshot: '16_forms_hub_realistic.png'
        },
        {
            section: 'sustainability',
            name: 'الاستدامة البيئية وإدارة الموارد',
            screenshot: '17_sustainability_realistic.png',
            customAction: async () => {
                await page.evaluate(() => {
                    if (window.Sustainability && window.Sustainability.load) window.Sustainability.load();
                });
            }
        },
        {
            section: 'ai-assistant',
            name: 'مساعد الذكاء الاصطناعي (Gemini AI)',
            screenshot: '18_ai_assistant_realistic.png'
        }
    ];

    for (const step of walkthroughSteps) {
        console.log(`▶ Step: Navigating to ${step.name}...`);
        await page.evaluate((sec) => {
            const link = document.querySelector(`a[data-section="${sec}"]`);
            if (link) link.click();
            else if (window.UI && window.UI.navigateToSection) window.UI.navigateToSection(sec);
        }, step.section);

        await page.waitForTimeout(2000);

        if (step.customAction) {
            try {
                await step.customAction();
                await page.waitForTimeout(1500);
            } catch (e) {
                console.log(`Notice in custom action for ${step.section}:`, e.message);
            }
        }

        // Realistic mouse scroll to explore data
        await page.mouse.wheel(0, 300);
        await page.waitForTimeout(2000);
        await page.mouse.wheel(0, -300);
        await page.waitForTimeout(1500);

        // Capture updated realistic screenshot
        await page.screenshot({ path: path.join(screenshotsDir, step.screenshot) });
        console.log(`   Captured ${step.screenshot}`);
    }

    console.log('✅ Finalizing Video Walkthrough Recording...');
    await page.waitForTimeout(3000);

    const video = page.video();
    await page.close();
    await context.close();
    await browser.close();

    if (video) {
        const videoPath = await video.path();
        const webmDest = path.join(videoOutputDir, 'SafetyHub_ICAPP_Live_System_Walkthrough.webm');
        const mp4Dest = path.join(videoOutputDir, 'SafetyHub_ICAPP_Live_System_Walkthrough.mp4');

        fs.copyFileSync(videoPath, webmDest);
        console.log(`🎉 WebM Video saved: ${webmDest}`);

        if (fs.existsSync(FFMPEG_PATH)) {
            try {
                console.log('🔄 Converting WebM to MP4 via FFmpeg...');
                execSync(`"${FFMPEG_PATH}" -y -i "${webmDest}" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 22 "${mp4Dest}"`, { stdio: 'inherit' });
                console.log(`🎉 MP4 Video successfully generated at: ${mp4Dest}`);
            } catch (convErr) {
                console.warn('Conversion to MP4 warning:', convErr.message);
            }
        }
    }
}

recordWalkthrough().catch(console.error);
