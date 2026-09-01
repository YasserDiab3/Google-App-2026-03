/**
 * RPC test helper — handleRpcRequest is async.
 */
'use strict';

const { handleRpcRequest } = require('../src/rpc-router');

async function rpc(body) {
    return await handleRpcRequest(body);
}

function createTestRunner() {
    let passedTests = 0;
    let totalTests = 0;

    async function test(name, fn) {
        totalTests++;
        try {
            await fn();
            console.log(`  ✓ PASS: ${name}`);
            passedTests++;
        } catch (err) {
            console.error(`  ❌ FAIL: ${name}`);
            console.error(`     Error: ${err.message}`);
        }
    }

    function summary(label) {
        console.log(`\n====================================================`);
        console.log(`${label} Summary: ${passedTests}/${totalTests} Passed (${((passedTests / totalTests) * 100).toFixed(1)}%)`);
        console.log(`====================================================\n`);
        if (passedTests !== totalTests) {
            throw new Error(`${label} failed: ${passedTests}/${totalTests}`);
        }
    }

    return { test, summary };
}

module.exports = { rpc, createTestRunner };
