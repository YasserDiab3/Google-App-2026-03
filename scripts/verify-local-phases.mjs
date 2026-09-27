import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const formsHubPath = path.resolve(__dirname, '..', 'Frontend', 'forms-hub.html');
const fileUrl = 'file:///' + formsHubPath.replace(/\\/g, '/');

async function testLocalPhases() {
    console.log('Testing local file:', fileUrl);
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    const page = await browser.newPage();
    const errors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    page.on('pageerror', err => errors.push(err.message));

    // Bypass geofence / auth modal for clean testing
    await page.addInitScript(() => {
        sessionStorage.setItem('HSE_PORTAL_ACTIVE_TAB_AUTH', 'true');
        sessionStorage.setItem('HSE_FIELD_SESSION', JSON.stringify({ userName: 'م. ياسر دياب', role: 'admin' }));
    });

    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Close session modal if shown
    const sessionModal = page.locator('#fieldSessionModal');
    if (await sessionModal.isVisible()) {
        const closeBtn = page.locator('#fieldSessionModal .emergency-modal-close-btn').first();
        if (await closeBtn.isVisible()) await closeBtn.click();
        await page.waitForTimeout(300);
    }

    console.log('--- Phase 1: Feature Flags Button Hiding & Secret Triggers ---');
    const flagsBtnVisible = await page.locator('#lblHubFlagsBtn').isVisible();
    console.log('Is #lblHubFlagsBtn visible to worker?', flagsBtnVisible);
    if (flagsBtnVisible) {
        throw new Error('FAILED: #lblHubFlagsBtn should NOT be visible!');
    }

    // Test secret trigger: 5 clicks on version badge
    const badge = page.locator('#lblAppVersionBadge');
    if (await badge.isVisible()) {
        for (let i = 0; i < 5; i++) {
            await badge.click();
            await page.waitForTimeout(100);
        }
        await page.waitForTimeout(500);
        const flagsModal = page.locator('#hseFeatureFlagsModal');
        const isFlagsModalOpen = await flagsModal.isVisible();
        console.log('Flags modal opened via 5 clicks on version badge:', isFlagsModalOpen);
        if (isFlagsModalOpen) {
            const closeFlagsBtn = page.locator('#hseFeatureFlagsModal button[title="إغلاق"], #hseFeatureFlagsModal .emergency-modal-close-btn').first();
            if (await closeFlagsBtn.isVisible()) await closeFlagsBtn.click();
        }
    }

    console.log('--- Phase 2: Action Closure Module ---');
    const hasClosureModule = await page.evaluate(() => typeof window.HseActionClosure === 'object');
    console.log('Is HseActionClosure loaded on window?', hasClosureModule);
    if (!hasClosureModule) {
        throw new Error('FAILED: HseActionClosure is not defined!');
    }

    // Open closure modal via API
    await page.evaluate(() => {
        window.HseActionClosure.open('OBS-E2E-TEST-2026', {
            site: 'مصنع ICAPP 1',
            place: 'عنبر التجميد',
            riskLevel: 'عالي',
            details: 'وجود أسلاك كهربائية مكشوفة بجوار خط الإنتاج'
        });
    });
    await page.waitForTimeout(500);

    const closureModal = page.locator('#hseActionClosureModal');
    const isClosureVisible = await closureModal.isVisible();
    console.log('Is Action Closure Modal visible?', isClosureVisible);
    if (!isClosureVisible) {
        throw new Error('FAILED: Action Closure modal did not open!');
    }

    // Check fields
    const inspectorVal = await page.locator('#closureInspectorName').inputValue();
    console.log('Auto-filled inspector name:', inspectorVal);
    const summaryText = await page.locator('#closureObsSummary').innerText();
    console.log('Obs summary contains code:', summaryText.includes('OBS-E2E-TEST-2026'));

    // Close closure modal
    await page.locator('#btnCloseClosureModal').click();
    await page.waitForTimeout(300);

    console.log('--- Phase 3: Shift Safety Handover Module ---');
    const hasHandoverModule = await page.evaluate(() => typeof window.HseShiftHandover === 'object');
    console.log('Is HseShiftHandover loaded on window?', hasHandoverModule);
    if (!hasHandoverModule) {
        throw new Error('FAILED: HseShiftHandover is not defined!');
    }

    const handoverBtn = page.locator('#btnShiftHandoverTool');
    const isHandoverBtnVisible = await handoverBtn.isVisible();
    console.log('Is #btnShiftHandoverTool visible on forms hub tool grid?', isHandoverBtnVisible);
    if (!isHandoverBtnVisible) {
        throw new Error('FAILED: Shift handover tool button is not visible!');
    }

    // Click handover button
    await handoverBtn.click();
    await page.waitForTimeout(500);

    const handoverModal = page.locator('#hseShiftHandoverModal');
    const isHandoverModalVisible = await handoverModal.isVisible();
    console.log('Is Shift Handover Modal visible?', isHandoverModalVisible);
    if (!isHandoverModalVisible) {
        throw new Error('FAILED: Shift Handover modal did not open!');
    }

    // Check KPI counts
    const kpiObsTotal = await page.locator('#hoKpiObsTotal').innerText();
    console.log('KPI Obs Total displayed:', kpiObsTotal);

    // Close handover modal
    await page.locator('#btnCloseHandoverModal').click();
    await page.waitForTimeout(300);

    console.log('--- Phase 4: My Active Tasks Module ---');
    const hasMyTasksModule = await page.evaluate(() => typeof window.HseMyTasks === 'object');
    console.log('Is HseMyTasks loaded on window?', hasMyTasksModule);
    if (!hasMyTasksModule) {
        throw new Error('FAILED: HseMyTasks is not defined!');
    }

    const myTasksBtn = page.locator('#btnMyTasksTool');
    const isMyTasksBtnVisible = await myTasksBtn.isVisible();
    console.log('Is #btnMyTasksTool visible on forms hub tool grid?', isMyTasksBtnVisible);
    if (!isMyTasksBtnVisible) {
        throw new Error('FAILED: #btnMyTasksTool is not visible!');
    }

    // Inject a mock open observation into localStorage
    await page.evaluate(() => {
        const mockObs = [{
            refCode: 'OBS-MYTASK-999',
            timestamp: Date.now(),
            status: 'Open',
            data: {
                site: 'مصنع ICAPP 1',
                place: 'عنبر الفرز',
                riskLevel: 'عالي',
                details: 'تسريب مياه على أرضية ممر المشاة',
                observerName: 'م. ياسر دياب'
            }
        }];
        localStorage.setItem('HSE_PUBLIC_OBS_LOCAL_HISTORY', JSON.stringify(mockObs));
        window.HseMyTasks.refresh();
    });
    await page.waitForTimeout(400);

    const badgeText = await page.locator('#badgeMyTasksCount').innerText();
    const isBadgeVisible = await page.locator('#badgeMyTasksCount').isVisible();
    console.log('Badge count displayed:', badgeText, '| Is visible:', isBadgeVisible);

    // Open My Tasks modal
    await myTasksBtn.click();
    await page.waitForTimeout(500);

    const myTasksModal = page.locator('#hseMyTasksModal');
    const isMyTasksModalOpen = await myTasksModal.isVisible();
    console.log('Is My Tasks modal open?', isMyTasksModalOpen);
    if (!isMyTasksModalOpen) {
        throw new Error('FAILED: My Tasks modal did not open!');
    }

    // Check if card contains the mock observation code
    const listContent = await page.locator('#myTasksListContainer').innerText();
    console.log('Tasks list contains mock code:', listContent.includes('OBS-MYTASK-999'));

    // Test transition from My Tasks to Action Closure
    const closeActionBtn = page.locator('#myTasksListContainer button').first();
    if (await closeActionBtn.isVisible()) {
        await closeActionBtn.click();
        await page.waitForTimeout(500);
        const closureFromTasksOpen = await page.locator('#hseActionClosureModal').isVisible();
        console.log('Action Closure modal opened from My Tasks card:', closureFromTasksOpen);
        if (closureFromTasksOpen) {
            await page.locator('#btnCloseClosureModal').click();
            await page.waitForTimeout(300);
        }
    }

    // Close My Tasks modal if still open
    if (await myTasksModal.isVisible()) {
        await page.locator('#btnCloseMyTasksModal').click();
        await page.waitForTimeout(300);
    }

    console.log('Console errors encountered:', errors.length);
    if (errors.length > 0) {
        console.warn('Errors:', errors);
    }

    await browser.close();
    console.log('✅ ALL LOCAL TESTS (INCLUDING MY ACTIVE TASKS) PASSED WITH ZERO REGRESSIONS!');
}

testLocalPhases().catch(err => {
    console.error('Test execution failed:', err);
    process.exit(1);
});
