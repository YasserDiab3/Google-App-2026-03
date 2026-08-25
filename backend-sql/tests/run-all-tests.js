/**
 * Master Test Runner - Executes Parity, Security, Benchmark, and E2E Suites
 */
'use strict';

const { runParityTests } = require('./parity-engine.test');
const { runSecurityTests } = require('./security-guard.test');
const { runBenchmark } = require('./benchmark.test');
const { runE2eSmoke } = require('./e2e-smoke.test');

async function main() {
    console.log('====================================================');
    console.log('🏁 HSE SQL Backend Master Verification Suite');
    console.log('====================================================\n');

    try {
        console.log('>>> [1/4] Running Parity Engine Tests...');
        runParityTests();

        console.log('>>> [2/4] Running Security & RBAC Guard Tests...');
        runSecurityTests();

        console.log('>>> [3/4] Running Performance Benchmark Tests...');
        runBenchmark();

        console.log('>>> [4/4] Running E2E HTTP Smoke Tests...');
        await runE2eSmoke();

        console.log('====================================================');
        console.log('✨ 100% VERIFICATION PASSED: ALL SUITES COMPLETED');
        console.log('====================================================');
    } catch (err) {
        console.error('\n❌ Suite execution failed:', err);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}
