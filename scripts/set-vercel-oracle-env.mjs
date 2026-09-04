#!/usr/bin/env node
/**
 * Set Oracle env vars on Vercel (Production + Preview).
 * Requires: npx vercel login  (once)
 *
 * Usage (from repo root):
 *   node scripts/set-vercel-oracle-env.mjs
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const envPath = path.join(root, 'backend-sql', '.env');
const b64Path = 'D:\\secrets\\oracle-wallet\\wallet.b64.txt';

function loadDotEnv(file) {
    const out = {};
    if (!fs.existsSync(file)) return out;
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
        const m = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
        if (!m) continue;
        out[m[1]] = m[2];
    }
    return out;
}

function vercelEnvAdd(key, value, environment) {
    const r = spawnSync(
        'npx',
        ['vercel', 'env', 'add', key, environment, '--force'],
        {
            input: value + '\n',
            encoding: 'utf8',
            cwd: root,
            shell: true
        }
    );
    if (r.status !== 0) {
        console.error(`FAIL ${key} (${environment}):`, (r.stderr || r.stdout || '').slice(0, 300));
        return false;
    }
    console.log(`OK ${key} → ${environment}`);
    return true;
}

function main() {
    const local = loadDotEnv(envPath);
    if (!fs.existsSync(b64Path)) {
        console.error('Missing wallet base64:', b64Path);
        process.exit(1);
    }
    const b64 = fs.readFileSync(b64Path, 'utf8').trim();

    const vars = {
        DB_TYPE: 'oracle',
        ORACLE_USER: local.ORACLE_USER || 'ADMIN',
        ORACLE_PASSWORD: local.ORACLE_PASSWORD || '',
        ORACLE_CONNECT_STRING: local.ORACLE_CONNECT_STRING || 'mrj8uznak8telasp_high',
        ORACLE_WALLET_PASSWORD: local.ORACLE_WALLET_PASSWORD || '',
        ORACLE_WALLET_ZIP_BASE64: b64
    };

    for (const [k, v] of Object.entries(vars)) {
        if (!v) {
            console.error('Missing value for', k);
            process.exit(1);
        }
    }

    const who = spawnSync('npx', ['vercel', 'whoami'], { encoding: 'utf8', cwd: root, shell: true });
    if (who.status !== 0 || /Logged out|Error/i.test(who.stdout + who.stderr)) {
        console.error('Vercel CLI not logged in. Run: npx vercel login');
        console.error(who.stdout || who.stderr);
        process.exit(1);
    }
    console.log('Vercel user:', (who.stdout || '').trim());

    for (const envName of ['production', 'preview']) {
        for (const [k, v] of Object.entries(vars)) {
            vercelEnvAdd(k, v, envName);
        }
    }
    console.log('\nDone. Redeploy (git push or npx vercel --prod).');
}

main();
