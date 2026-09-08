/**
 * Master Test Runner - Executes Parity, Security, Benchmark, and E2E Suites
 */
'use strict';

const { runParityTests } = require('./parity-engine.test');
const { runSecurityTests } = require('./security-guard.test');
const { runBenchmark } = require('./benchmark.test');
const { runE2eSmoke } = require('./e2e-smoke.test');
const { runProfileImageInlineTests } = require('./profile-image-inline.test');

async function main() {
    console.log('====================================================');
    console.log('🏁 HSE SQL Backend Master Verification Suite');
    console.log('====================================================\n');

    try {
        console.log('>>> [1/5] Running Parity Engine Tests...');
        await runParityTests();

        console.log('>>> [2/5] Running Security & RBAC Guard Tests...');
        await runSecurityTests();

        console.log('>>> [3/5] Running Performance Benchmark Tests...');
        await runBenchmark();

        console.log('>>> [4/5] Running Profile Image Inline Tests...');
        await runProfileImageInlineTests();

        console.log('>>> [5/5] Running E2E HTTP Smoke Tests...');
        await runE2eSmoke();

        console.log('====================================================');
        console.log('✨ 100% VERIFICATION PASSED: ALL SUITES COMPLETED');
        console.log('====================================================');
        process.exit(0);
    } catch (err) {
        console.error('\n❌ Suite execution failed:', err);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
