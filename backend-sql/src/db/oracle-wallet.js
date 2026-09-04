/**
 * Materialize Oracle ADB wallet on serverless (/tmp) from env.
 * Prefer ORACLE_WALLET_FILES_JSON = {"ewallet.pem":"<b64>", "tnsnames.ora":"<b64>", ...}
 * Fallback: ORACLE_WALLET_ZIP_BASE64 (requires adm-zip) or ORACLE_WALLET_DIR (local).
 */
'use strict';

const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function patchSqlnetOra(destDir) {
    const sqlnet = path.join(destDir, 'sqlnet.ora');
    const body = [
        `WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="${destDir.replace(/\\/g, '/')}")))`,
        'SSL_SERVER_DN_MATCH=yes',
        ''
    ].join('\n');
    fs.writeFileSync(sqlnet, body, 'utf8');
}

function materializeFromFilesJson(destDir) {
    const raw = (process.env.ORACLE_WALLET_FILES_JSON || '').trim();
    if (!raw) return false;
    let map;
    try {
        map = JSON.parse(raw);
    } catch (e) {
        throw new Error('ORACLE_WALLET_FILES_JSON invalid JSON');
    }
    ensureDir(destDir);
    let wrote = 0;
    for (const [name, b64] of Object.entries(map)) {
        if (!name || typeof b64 !== 'string') continue;
        const base = path.basename(String(name));
        if (!base || base.includes('..')) continue;
        fs.writeFileSync(path.join(destDir, base), Buffer.from(b64, 'base64'));
        wrote += 1;
    }
    if (wrote < 1) throw new Error('ORACLE_WALLET_FILES_JSON empty');
    patchSqlnetOra(destDir);
    return true;
}

function materializeFromZip(destDir) {
    const b64 = (process.env.ORACLE_WALLET_ZIP_BASE64 || '').trim();
    if (!b64) return false;
    let AdmZip;
    try {
        AdmZip = require('adm-zip');
    } catch (_e) {
        throw new Error('ORACLE_WALLET_ZIP_BASE64 set but adm-zip missing — use ORACLE_WALLET_FILES_JSON');
    }
    ensureDir(destDir);
    const zip = new AdmZip(Buffer.from(b64, 'base64'));
    zip.extractAllTo(destDir, true);
    patchSqlnetOra(destDir);
    return true;
}

function resolveOracleWalletDir(preferredDir) {
    const existing = (preferredDir || process.env.ORACLE_WALLET_DIR || process.env.TNS_ADMIN || '').trim();
    if (existing && fs.existsSync(path.join(existing, 'tnsnames.ora'))) {
        return existing;
    }

    const dest = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
        ? path.join('/tmp', 'oracle-wallet')
        : path.join(process.cwd(), '.oracle-wallet-tmp');

    const marker = path.join(dest, 'tnsnames.ora');
    if (fs.existsSync(marker) && fs.existsSync(path.join(dest, 'ewallet.pem'))) {
        return dest;
    }

    if (materializeFromFilesJson(dest) || materializeFromZip(dest)) {
        if (!fs.existsSync(marker)) {
            throw new Error('Oracle wallet extract failed (tnsnames.ora missing)');
        }
        return dest;
    }

    return existing || '';
}

module.exports = {
    resolveOracleWalletDir,
    patchSqlnetOra
};
