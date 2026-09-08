#!/usr/bin/env node
/**
 * deploy-gas-prod.mjs — clasp push → (تنظيف deployments قديمة) → clasp deploy للإنتاج → smoke
 *
 * من جذر المستودع:
 *   node scripts/deploy-gas-prod.mjs
 *   node scripts/deploy-gas-prod.mjs "وصف النسخة"
 *
 * إن ظهر حد 200 إصدار: افتح Project History واحذف إصدارات قديمة (Bulk delete)
 * ثم أعد تشغيل هذا السكربت.
 */

import { execSync, spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BACKEND = path.join(ROOT, 'Backend');
const PROD_DEPLOYMENT_ID = 'AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ';
const HEAD_DEPLOYMENT_ID = 'AKfycbweqBqZUiavxb_-23pASfFK8HKbXAICEoAdPa5fWfc';
const SCRIPT_ID = '1J9jfmP0BV6MNULal_ei9Jg3eTNPQ_r0WD00vm7PGQEgC4JhHru0MC_E-';
const PROD_EXEC_URL = `https://script.google.com/macros/s/${PROD_DEPLOYMENT_ID}/exec`;
const HISTORY_URL = `https://script.google.com/home/projects/${SCRIPT_ID}/edit`;
const KEEP_DEPLOYMENTS = new Set([PROD_DEPLOYMENT_ID, HEAD_DEPLOYMENT_ID]);

function run(cmd, opts = {}) {
    console.log('\n> ' + cmd);
    execSync(cmd, {
        cwd: opts.cwd || ROOT,
        stdio: 'inherit',
        shell: true,
        ...opts
    });
}

function runCapture(cmd) {
    const res = spawnSync(cmd, {
        cwd: ROOT,
        shell: true,
        encoding: 'utf8'
    });
    return {
        status: res.status ?? 1,
        out: `${res.stdout || ''}${res.stderr || ''}`
    };
}

function listDeploymentIds() {
    const { out } = runCapture('clasp deployments');
    const ids = [...out.matchAll(/AKfycb[A-Za-z0-9_-]+/g)].map((m) => m[0]);
    return [...new Set(ids)];
}

function undeployOrphans() {
    const ids = listDeploymentIds();
    console.log(`\nDeployments found: ${ids.length}`);
    for (const id of ids) {
        if (KEEP_DEPLOYMENTS.has(id)) {
            console.log('KEEP', id);
            continue;
        }
        console.log('UNDEPLOY', id);
        const r = runCapture(`clasp undeploy ${id}`);
        console.log(r.out.trim() || `(exit ${r.status})`);
    }
}

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

function printVersionLimitHelp() {
    console.error('\n════════════════════════════════════════');
    console.error('BLOCKED: Apps Script version limit (200)');
    console.error('════════════════════════════════════════');
    console.error('1) افتح: ' + HISTORY_URL);
    console.error('2) Project History → Bulk delete versions');
    console.error('3) احذف 40–80 إصداراً قديماً (غير المستخدمين بالنشر الحالي)');
    console.error('4) أعد: node scripts/deploy-gas-prod.mjs');
    console.error('ملاحظة: تم الإبقاء على نشر الإنتاج + HEAD فقط.');
}

async function main() {
    const desc = (process.argv[2] || `prod deploy ${new Date().toISOString()}`).replace(/"/g, '');
    console.log('════════════════════════════════════════');
    console.log('GAS production deploy');
    console.log('Deployment ID:', PROD_DEPLOYMENT_ID);
    console.log('Exec URL:', PROD_EXEC_URL);
    console.log('════════════════════════════════════════');

    undeployOrphans();
    run('clasp push --force');

    const deploy = runCapture(
        `clasp deploy -i "${PROD_DEPLOYMENT_ID}" -d "${desc}"`
    );
    console.log(deploy.out.trim());
    if (deploy.status !== 0 || /reached the limit of 200 versions/i.test(deploy.out)) {
        printVersionLimitHelp();
        try {
            run('clasp open-script');
        } catch (_e) { /* ignore */ }
        process.exit(2);
    }

    console.log('\nSmoke POST…');
    const result = await postJson(PROD_EXEC_URL, 'login', { email: '', password: '' });
    const preview = String(result.body || '').slice(0, 180);
    const isHtml = /<!DOCTYPE|<html/i.test(preview);
    console.log('HTTP', result.status);
    console.log('Preview:', preview);
    if (isHtml) {
        console.error('\nFAIL: production /exec returned HTML');
        process.exit(1);
    }
    try {
        JSON.parse(result.body);
        console.log('\nOK: JSON response from production /exec');
    } catch (_e) {
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
        console.log('\nOK: mfaSelfTest passed');
    } catch (_e) {
        console.error('\nFAIL: mfaSelfTest response is not JSON');
        process.exit(1);
    }

    console.log('\nDONE. بعد النجاح: من الواجهة أعد توليد قالب السلايدات (createDefaultDailyObservationsPptTemplate).');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
