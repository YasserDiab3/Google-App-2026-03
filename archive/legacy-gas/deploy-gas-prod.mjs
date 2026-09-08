#!/usr/bin/env node
/**
 * deploy-gas-prod.mjs — نشر Backend إلى Web App الإنتاجي (نفس /exec في الواجهة)
 *
 * الخطوات: clasp push → clasp deploy -i PROD_ID → smoke POST + mfaSelfTest
 *
 * الاستخدام من جذر المستودع:
 *   node scripts/deploy-gas-prod.mjs
 *   node scripts/deploy-gas-prod.mjs "وصف النسخة"
 */

import { execSync } from 'child_process';
import path from 'path';
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

/** fetch يتابع 302 إلى script.googleusercontent.com */
async function postJson(url, action, data) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60000);
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action, data: data || {} }),
            redirect: 'follow',
            signal: ctrl.signal
        });
        const text = await res.text();
        return { status: res.status, body: text };
    } finally {
        clearTimeout(timer);
    }
}

async function main() {
    const desc = (process.argv[2] || `prod deploy ${new Date().toISOString()}`).replace(/"/g, '');
    console.log('════════════════════════════════════════');
    console.log('GAS production deploy');
    console.log('Deployment ID:', PROD_DEPLOYMENT_ID);
    console.log('Exec URL:', PROD_EXEC_URL);
    console.log('════════════════════════════════════════');

    run('clasp push');
    run(`clasp deploy -i "${PROD_DEPLOYMENT_ID}" -d "${desc}"`);

    console.log('\nSmoke POST…');
    const result = await postJson(PROD_EXEC_URL, 'login', { email: '', password: '' });
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

    console.log('\nMFA self-test…');
    const mfa = await postJson(PROD_EXEC_URL, 'mfaSelfTest', {});
    console.log('HTTP', mfa.status);
    console.log('Body:', String(mfa.body || '').slice(0, 400));
    try {
        const parsed = JSON.parse(mfa.body);
        if (!parsed.success || !parsed.hotp0Ok || !parsed.roundtripOk || !parsed.highByteTotpOk) {
            console.error('\nFAIL: mfaSelfTest did not pass');
            process.exit(1);
        }
        console.log('\nOK: mfaSelfTest passed (HOTP + encrypt roundtrip + high-byte TOTP)');
    } catch (e) {
        console.error('\nFAIL: mfaSelfTest response is not JSON');
        process.exit(1);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
