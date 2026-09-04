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
    const b64Bag = (process.env.ORACLE_WALLET_FILES_B64 || '').trim().replace(/\s+/g, '');
    let raw = '';
    let source = '';
    if (b64Bag) {
        try {
            raw = Buffer.from(b64Bag, 'base64').toString('utf8').trim();
            source = 'B64';
        } catch (_e) {
            throw new Error('ORACLE_WALLET_FILES_B64 decode failed');
        }
    } else {
        raw = (process.env.ORACLE_WALLET_FILES_JSON || '').trim();
        source = 'JSON';
    }
    if (!raw) return false;
    if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
        raw = raw.slice(1, -1);
    }
    let map;
    try {
        map = JSON.parse(raw);
    } catch (e) {
        throw new Error(`Oracle wallet ${source} invalid (len=${raw.length} head=${JSON.stringify(raw.slice(0, 40))})`);
    }
    ensureDir(destDir);
    let wrote = 0;
    for (const [name, b64] of Object.entries(map)) {
        if (!name || typeof b64 !== 'string') continue;
        const base = path.basename(String(name));
        if (!base || base.includes('..')) continue;
        fs.writeFileSync(path.join(destDir, base), Buffer.from(b64.replace(/\s+/g, ''), 'base64'));
        wrote += 1;
    }
    if (wrote < 1) throw new Error('Oracle wallet files map empty');
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

function materializeFromIndividualFiles(destDir) {
    const mapping = {
        'ewallet.pem': process.env.ORACLE_WALLET_EWALLET_PEM,
        'tnsnames.ora': process.env.ORACLE_WALLET_TNSNAMES_ORA,
        'sqlnet.ora': process.env.ORACLE_WALLET_SQLNET_ORA,
        'cwallet.sso': process.env.ORACLE_WALLET_CWALLET_SSO
    };
    const present = Object.entries(mapping).filter(([, v]) => !!(v && String(v).trim()));
    if (!present.length) return false;
    if (!mapping['ewallet.pem'] || !mapping['tnsnames.ora']) {
        throw new Error('Oracle wallet individual files need EWALLET_PEM + TNSNAMES_ORA');
    }
    ensureDir(destDir);
    for (const [name, val] of present) {
        fs.writeFileSync(path.join(destDir, name), Buffer.from(String(val).replace(/\s+/g, ''), 'base64'));
    }
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

    if (materializeFromIndividualFiles(dest) || materializeFromFilesJson(dest) || materializeFromZip(dest)) {
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
