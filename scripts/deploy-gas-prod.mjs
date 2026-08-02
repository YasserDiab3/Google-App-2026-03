#!/usr/bin/env node
/**
 * deploy-gas-prod.mjs — نشر Backend إلى Web App الإنتاجي (نفس /exec في الواجهة)
 *
 * الخطوات: clasp push → clasp version → clasp deploy -i PROD_ID → smoke POST
 *
 * الاستخدام من جذر المستودع:
 *   node scripts/deploy-gas-prod.mjs
 *   node scripts/deploy-gas-prod.mjs "وصف النسخة"
 */

import { execSync } from 'child_process';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BACKEND = path.join(ROOT, 'Backend');
const PROD_DEPLOYMENT_ID = 'AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ';
const PROD_EXEC_URL = `https://script.google.com/macros/s/${PROD_DEPLOYMENT_ID}/exec`;

function run(cmd, opts = {}) {
    console.log('\n> ' + cmd);
    execSync(cmd, {
        cwd: opts.cwd || BACKEND,
        stdio: 'inherit',
        shell: true,
        ...opts
    });
}

function smokePost(url) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({ action: 'login', data: { email: '', password: '' } });
        const u = new URL(url);
        const req = https.request({
            hostname: u.hostname,
            path: u.pathname + u.search,
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
                'Content-Length': Buffer.byteLength(body)
            },
            timeout: 60000
        }, (res) => {
            let data = '';
            res.on('data', (c) => { data += c; });
            res.on('end', () => resolve({ status: res.statusCode, body: data }));
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('smoke timeout')); });
        req.write(body);
        req.end();
    });
}

async function main() {
    const desc = (process.argv[2] || `prod deploy ${new Date().toISOString()}`).replace(/"/g, '');
    console.log('════════════════════════════════════════');
    console.log('GAS production deploy');
    console.log('Deployment ID:', PROD_DEPLOYMENT_ID);
    console.log('Exec URL:', PROD_EXEC_URL);
    console.log('════════════════════════════════════════');

    run('clasp push');
    run(`clasp version "${desc}"`);
    run(`clasp deploy -i "${PROD_DEPLOYMENT_ID}" -d "${desc}"`);

    console.log('\nSmoke POST…');
    const result = await smokePost(PROD_EXEC_URL);
    const preview = String(result.body || '').slice(0, 180);
    const isHtml = /<!DOCTYPE|<html/i.test(preview);
    console.log('HTTP', result.status);
    console.log('Preview:', preview);
    if (isHtml) {
        console.error('\nFAIL: production /exec returned HTML — investigate deployment.');
        process.exit(1);
    }
    try {
        JSON.parse(result.body);
        console.log('\nOK: JSON response from production /exec');
    } catch (e) {
        console.error('\nFAIL: response is not JSON');
        process.exit(1);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
