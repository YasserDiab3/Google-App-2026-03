const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const FRONTEND = path.join(ROOT, 'Frontend');

function readFrontend(rel) {
    return fs.readFileSync(path.join(FRONTEND, rel), 'utf8');
}

test.describe('stable loading acceptance — contract', () => {
    test('owned sheets stay out of global sync', () => {
        const src = readFrontend('js/modules/sync-improvements.js');
        for (const sheet of [
            'ClinicVisits', 'Training', 'Employees', 'PTW', 'PTWRegistry', 'DailyObservations'
        ]) {
            expect(src.includes(`'${sheet}'`), sheet).toBeTruthy();
        }
    });

    test('auth preload skips heavy modules', () => {
        const src = readFrontend('js/modules/auth.js');
        expect(src).toMatch(/moduleName === 'training'/);
        expect(src).toMatch(/moduleName === 'clinic'/);
        expect(src).toMatch(/moduleName === 'ptw'/);
        expect(src).toMatch(/moduleName === 'daily-observations'/);
    });

    test('training programs path does not prefetch secondary tabs', () => {
        const src = readFrontend('js/modules/modules/training.js');
        const start = src.indexOf('async _runLoadTrainingDataAsync');
        const end = src.indexOf('\n    getStats()', start);
        const body = src.slice(start, end > start ? end : start + 8000);
        expect(body.includes("runAction('getAllTrainings'")).toBeTruthy();
        expect(body.includes("runAction('getAllTrainingAttendance'")).toBeTruthy();
        expect(body.includes("if (active === 'attendance')")).toBeTruthy();
        expect(body.includes("if (active === 'legalTraining')")).toBeTruthy();
        const programsTail = body.slice(body.lastIndexOf("runAction('getAllTrainings'"));
        expect(programsTail.includes("runAction('getAllTrainingAttendance'")).toBeFalsy();
        expect(programsTail.includes("runAction('getAllLegalTrainings'")).toBeFalsy();
        expect(programsTail.includes("runAction('getAllTrainingSessions'")).toBeFalsy();
    });

    test('PTW never auto-calls syncRegistryWithPermits', () => {
        const src = readFrontend('js/modules/modules/ptw.js');
        const calls = [...src.matchAll(/syncRegistryWithPermits\s*\(/g)];
        expect(calls.length).toBe(1);
        expect(src).toMatch(/async syncRegistryWithPermits\s*\(/);
        expect(src).toMatch(/StableLoader\.beginOwnedFetch\('ptw'\)/);
        expect(src).toMatch(/StableLoader\.markPaint\('ptw'/);
    });

    test('daily observations lazy secondary tabs + owned fetch', () => {
        const src = readFrontend('js/modules/modules/dailyobservations.js');
        expect(src).toMatch(/data-obs-lazy/);
        expect(src).toMatch(/beginOwnedFetch\('daily-observations'\)/);
        expect(src).toMatch(/markPaint\('daily-observations'/);
    });

    test('StableLoader exposes paint metrics and watchdog', () => {
        const src = readFrontend('js/modules/services/stable-loader.js');
        expect(src).toMatch(/markPaint\s*\(/);
        expect(src).toMatch(/getMetrics\s*\(/);
        expect(src).toMatch(/OWNED_FETCH_WATCHDOG_MS/);
        expect(src).toMatch(/watchdog-release/);
    });
});

test.describe('stable loading acceptance — runtime local-first', () => {
    test.beforeEach(async ({ page }) => {
        test.setTimeout(180000);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => (
            window.Training && window.Employees && window.Clinic && window.PTW &&
            window.DailyObservations && window.StableLoader && window.AppState &&
            window.GoogleIntegration && window.Utils
        ), null, { timeout: 120000 });

        await page.evaluate(() => {
            window.__accCalls = [];
            window.AppState.debugMode = true;
            window.AppState.currentUser = {
                id: 'acc-user',
                email: 'acc@test.local',
                name: 'مستخدم القبول',
                role: 'admin',
                department: 'HSE'
            };
            window.AppState.googleConfig = window.AppState.googleConfig || {};
            window.AppState.googleConfig.appsScript = {
                enabled: true,
                scriptUrl: 'https://script.google.com/macros/s/acceptance-fake/exec'
            };
            window.AppState.appData = window.AppState.appData || {};
            window.AppState.appData.training = Array.from({ length: 24 }, (_, i) => ({
                id: `TRN-${i + 1}`,
                name: `برنامج قبول ${i + 1}`,
                title: `برنامج قبول ${i + 1}`,
                status: i % 3 === 0 ? 'مكتمل' : 'مخطط',
                startDate: '2026-09-01',
                participants: []
            }));
            window.AppState.appData.trainingAttendance = [];
            window.AppState.appData.trainingSessions = [];
            window.AppState.appData.trainingCertificates = [];
            window.AppState.appData.legalTrainings = [{ id: 'L1', name: 'قانوني محلي' }];
            window.AppState.appData.legalTrainingAttendees = [];
            window.AppState.appData.legalRegister = [];
            window.AppState.appData.contractorTrainings = [{ id: 'C1', companyName: 'شركة قبول', trainingName: 'سلامة' }];
            window.AppState.appData.employees = Array.from({ length: 20 }, (_, i) => ({
                id: `EMP-${i + 1}`,
                employeeId: `E${1000 + i}`,
                name: `موظف قبول ${i + 1}`,
                fullName: `موظف قبول ${i + 1}`,
                department: 'HSE',
                jobTitle: 'فني',
                status: 'نشط',
                active: true
            }));
            window.AppState.appData.clinicVisits = Array.from({ length: 18 }, (_, i) => ({
                id: `VIS-${i + 1}`,
                visitId: `VIS-${i + 1}`,
                employeeName: `موظف عيادة ${i + 1}`,
                employeeId: `E${2000 + i}`,
                visitDate: '2026-08-01',
                visitType: 'كشف',
                department: 'HSE',
                complaint: 'صداع'
            }));
            window.AppState.appData.ptw = Array.from({ length: 16 }, (_, i) => ({
                id: `PTW-${i + 1}`,
                permitNumber: `P-2026-${i + 1}`,
                workDescription: `عمل قبول ${i + 1}`,
                status: 'مفتوح',
                location: 'موقع أ',
                startDate: '2026-08-01'
            }));
            window.AppState.appData.dailyObservations = Array.from({ length: 15 }, (_, i) => ({
                id: `OBS-${i + 1}`,
                observationNumber: `O-${i + 1}`,
                description: `ملاحظة قبول ${i + 1}`,
                status: 'مفتوحة',
                location: 'موقع ب',
                date: '2026-08-01',
                riskLevel: 'متوسط'
            }));

            window.Permissions = window.Permissions || {};
            window.Permissions.hasDetailedPermission = () => true;
            window.Permissions.getAccessibleModules = () => [
                'training', 'clinic', 'ptw', 'daily-observations', 'employees'
            ];
            window.Permissions.ensureFormSettingsState = async () => ({});
            window.Notification = window.Notification || {
                success() {}, info() {}, error() {}, warning() {}
            };
            window.DataManager = window.DataManager || { save() {}, load() {} };
            if (typeof window.PTW === 'object') {
                window.PTW.registryData = Array.from({ length: 12 }, (_, i) => ({
                    id: `REG-${i + 1}`,
                    serial: i + 1,
                    paperPermitNo: `PAP-${i + 1}`,
                    status: 'مفتوح',
                    workDescription: `سجل قبول ${i + 1}`
                }));
            }

            const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            const origSend = typeof GoogleIntegration.sendRequest === 'function'
                ? GoogleIntegration.sendRequest.bind(GoogleIntegration)
                : null;
            GoogleIntegration._isBackendRpcConfigured = () => true;
            GoogleIntegration.sendRequest = async (payload) => {
                const action = payload && payload.action;
                window.__accCalls.push({ t: Date.now(), kind: 'sendRequest', action, data: payload && payload.data });
                await delay(1600);
                if (action === 'batchReadSheets') {
                    return {
                        success: true,
                        data: {
                            PTW: AppState.appData.ptw.slice(),
                            PTWRegistry: (window.PTW && window.PTW.registryData) || []
                        }
                    };
                }
                if (action === 'getAllTrainings') return { success: true, data: AppState.appData.training.slice() };
                if (action === 'getAllTrainingAttendance') return { success: true, data: [] };
                if (action === 'getAllLegalTrainings') return { success: true, data: AppState.appData.legalTrainings.slice() };
                if (action === 'getAllLegalTrainingAttendees') return { success: true, data: [] };
                if (action === 'getAllLegalRegisters') return { success: true, data: [] };
                if (action === 'getAllEmployees') return { success: true, data: AppState.appData.employees.slice() };
                if (action === 'getAllClinicVisits') return { success: true, data: AppState.appData.clinicVisits.slice() };
                return origSend ? origSend(payload) : { success: true, data: [] };
            };
            GoogleIntegration.readFromSheets = async (sheetName) => {
                window.__accCalls.push({ t: Date.now(), kind: 'readFromSheets', sheetName });
                await delay(1600);
                if (sheetName === 'DailyObservations') return AppState.appData.dailyObservations.slice();
                if (sheetName === 'Employees') return AppState.appData.employees.slice();
                if (sheetName === 'PTW') return AppState.appData.ptw.slice();
                return [];
            };

            const hide = (id) => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            };
            hide('login-screen');
            ['training-section', 'employees-section', 'clinic-section', 'ptw-section', 'daily-observations-section']
                .forEach((id) => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.style.display = 'none';
                        el.classList.remove('hidden');
                    }
                });
        });
    });

    async function measureModule(page, moduleKey) {
        return page.evaluate(async (moduleKey) => {
            const map = {
                training: {
                    sectionId: 'training-section',
                    section: 'training',
                    loader: () => {
                        Training._trainingBackendFetchOk = false;
                        Training._trainingTabFetchOk = { programs: false, attendance: false, legalTraining: false };
                        return Training.load();
                    },
                    detect: () => /برنامج قبول/.test(document.getElementById('training-table-container')?.innerText || '')
                },
                employees: {
                    sectionId: 'employees-section',
                    section: 'employees',
                    loader: () => Employees.load(),
                    detect: () => /موظف قبول/.test(
                        document.getElementById('employees-table-container')?.innerText ||
                        document.getElementById('employees-section')?.innerText ||
                        ''
                    )
                },
                clinic: {
                    sectionId: 'clinic-section',
                    section: 'clinic',
                    loader: async () => {
                        Clinic.state = Clinic.state || {};
                        Clinic.state.activeTab = 'visits';
                        await Clinic.load();
                        if (typeof Clinic.switchTab === 'function') {
                            try { Clinic.switchTab('visits'); } catch (_e) {}
                        }
                        if (typeof Clinic.renderVisitsTab === 'function') {
                            await Clinic.renderVisitsTab(false);
                        }
                    },
                    detect: () => {
                        const panel = document.querySelector('.clinic-tab-panel[data-tab-panel="visits"]');
                        const text = (panel && panel.innerText) || document.getElementById('clinic-section')?.innerText || '';
                        return /موظف عيادة|VIS-|كشف/.test(text);
                    }
                },
                ptw: {
                    sectionId: 'ptw-section',
                    section: 'ptw',
                    loader: () => PTW.load(),
                    detect: () => /عمل قبول|P-2026-|قائمة التصاريح/.test(document.getElementById('ptw-section')?.innerText || '')
                },
                observations: {
                    sectionId: 'daily-observations-section',
                    section: 'daily-observations',
                    loader: () => DailyObservations.load(),
                    detect: () => /ملاحظة قبول|سجل الملاحظات/.test(document.getElementById('daily-observations-section')?.innerText || '')
                }
            };
            const spec = map[moduleKey];
            const section = document.getElementById(spec.sectionId);
            if (!section) return { ok: false, error: 'missing-section' };
            section.style.display = 'block';
            AppState.currentSection = spec.section;
            window.__accCalls = [];
            const t0 = performance.now();
            const loadPromise = spec.loader();
            const deadline = Date.now() + 8000;
            let painted = false;
            while (Date.now() < deadline) {
                if (spec.detect()) {
                    painted = true;
                    break;
                }
                await new Promise((r) => requestAnimationFrame(r));
            }
            const paintMs = performance.now() - t0;
            await Promise.race([
                Promise.resolve(loadPromise).catch((e) => ({ loadError: String(e && e.message || e) })),
                new Promise((r) => setTimeout(r, 2500))
            ]);
            const overlay = document.querySelector(
                '#loading-overlay, .loading-overlay, #sync-progress-indicator, [data-sync-progress]'
            );
            const overlayVisible = !!(overlay && overlay.offsetParent !== null && getComputedStyle(overlay).display !== 'none');
            return {
                ok: painted,
                paintMs,
                calls: (window.__accCalls || []).map((c) => c.action || c.sheetName || c.kind),
                detailedCalls: window.__accCalls || [],
                metrics: (window.StableLoader && StableLoader.getMetrics && StableLoader.getMetrics()) || [],
                overlayVisible,
                sampleText: (section.innerText || '').slice(0, 180)
            };
        }, moduleKey);
    }

    test('training paints local programs under 800ms and fetches programs only', async ({ page }) => {
        const result = await measureModule(page, 'training');
        expect(result.ok, result.sampleText || result.error).toBeTruthy();
        expect(result.paintMs).toBeLessThan(800);
        expect(result.overlayVisible).toBeFalsy();
        const early = result.detailedCalls.filter((c) => c.kind === 'sendRequest');
        expect(early.some((c) => c.action === 'getAllTrainings')).toBeTruthy();
        expect(early.some((c) => c.action === 'getAllTrainingAttendance')).toBeFalsy();
        expect(early.some((c) => c.action === 'getAllLegalTrainings')).toBeFalsy();
    });

    test('training attendance tab fetch starts only after switchTab', async ({ page }) => {
        await page.evaluate(async () => {
            const section = document.getElementById('training-section');
            section.style.display = 'block';
            Training._trainingBackendFetchOk = false;
            Training._trainingTabFetchOk = { programs: false, attendance: false, legalTraining: false };
            await Training.load();
        });
        await page.evaluate(() => { window.__accCalls = []; });
        await page.evaluate(async () => {
            await Training.switchTab('attendance');
        });
        await page.waitForTimeout(200);
        const actions = await page.evaluate(() => (window.__accCalls || []).map((c) => c.action));
        expect(actions).toContain('getAllTrainingAttendance');
    });

    test('employees paints local list under 800ms', async ({ page }) => {
        const result = await measureModule(page, 'employees');
        expect(result.ok, result.sampleText || result.error).toBeTruthy();
        expect(result.paintMs).toBeLessThan(800);
        expect(result.overlayVisible).toBeFalsy();
    });

    test('clinic visits paints local records under 800ms', async ({ page }) => {
        const result = await measureModule(page, 'clinic');
        expect(result.ok, result.sampleText || result.error).toBeTruthy();
        expect(result.paintMs).toBeLessThan(800);
        expect(result.overlayVisible).toBeFalsy();
    });

    test('PTW paints local permits under 800ms without registry sync action', async ({ page }) => {
        const result = await measureModule(page, 'ptw');
        expect(result.ok, result.sampleText || result.error).toBeTruthy();
        expect(result.paintMs).toBeLessThan(800);
        expect(result.overlayVisible).toBeFalsy();
        expect(result.calls.join(',')).not.toMatch(/syncRegistry/i);
    });

    test('daily observations paints local registry under 800ms and keeps other tabs lazy', async ({ page }) => {
        const result = await measureModule(page, 'observations');
        expect(result.ok, result.sampleText || result.error).toBeTruthy();
        expect(result.paintMs).toBeLessThan(800);
        expect(result.overlayVisible).toBeFalsy();
        const lazy = await page.evaluate(() => ({
            top10: document.getElementById('tab-top-10-observations')?.getAttribute('data-obs-lazy'),
            analysis: document.getElementById('tab-data-analysis')?.getAttribute('data-obs-lazy')
        }));
        expect(lazy.top10 === '1' || lazy.analysis === '1').toBeTruthy();
    });
});
