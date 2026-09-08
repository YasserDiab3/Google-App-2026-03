/**
 * Performance Benchmark Test - Evaluates Latency & Throughput
 */
'use strict';

const { handleRpcRequest } = require('../src/rpc-router');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');
const { runSeed } = require('../scripts/seed-demo-data');

async function runBenchmark() {
    console.log('⚡ Starting Performance Benchmark...\n');
    const db = getDatabase();
    initSchema(db);
    runSeed();

    const iterations = 80;
    const latencies = [];

    const login = await handleRpcRequest({
        action: 'login',
        data: { email: 'admin@system.local', password: 'admin123' }
    });
    const auth = { actorUserData: login.user, sessionToken: login.token };

    console.log(`⏱️ Executing ${iterations} read & write RPC cycles...`);
    const totalStart = Date.now();

    for (let i = 0; i < iterations; i++) {
        const t0 = performance.now();

        await handleRpcRequest({
            action: 'readFromSheet',
            data: { sheetName: 'Medications' },
            ...auth
        });

        await handleRpcRequest({
            action: 'appendToSheet',
            data: {
                sheetName: 'Incidents',
                data: {
                    id: `BENCH_INC_${i}`,
                    title: `حادث قياس الأداء ${i}`,
                    severity: 'بسيط'
                }
            },
            ...auth
        });

        const t1 = performance.now();
        latencies.push(t1 - t0);
    }

    const totalDuration = (Date.now() - totalStart) / 1000;
    latencies.sort((a, b) => a - b);

    const avg = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(3);
    const p50 = latencies[Math.floor(latencies.length * 0.5)].toFixed(3);
    const p95 = latencies[Math.floor(latencies.length * 0.95)].toFixed(3);
    const p99 = latencies[Math.floor(latencies.length * 0.99)].toFixed(3);
    const opsPerSec = ((iterations * 2) / totalDuration).toFixed(0);

    console.log(`\n====================================================`);
    console.log(`🚀 Benchmark Results:`);
    console.log(`   - Total Operations: ${iterations * 2} (Reads + Writes)`);
    console.log(`   - Total Time:       ${totalDuration.toFixed(2)}s`);
    console.log(`   - Throughput:       ${opsPerSec} ops/second`);
    console.log(`   - Average Latency:  ${avg} ms`);
    console.log(`   - P50 Latency:      ${p50} ms`);
    console.log(`   - P95 Latency:      ${p95} ms`);
    console.log(`   - P99 Latency:      ${p99} ms`);
    console.log(`====================================================`);
    console.log(`💡 Comparison: Google Apps Script takes ~1,500ms - 3,000ms per request.`);
    console.log(`   SQL Backend is ~${(1500 / parseFloat(avg)).toFixed(0)}x faster!\n`);
}

if (require.main === module) {
    runBenchmark().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = { runBenchmark };
