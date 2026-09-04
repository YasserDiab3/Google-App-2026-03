/**
 * Materialize Oracle ADB wallet on serverless (/tmp) from env.
 * Env: ORACLE_WALLET_ZIP_BASE64 or ORACLE_WALLET_DIR (local path)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function unzipWalletBuffer(buf, destDir) {
    // Prefer adm-zip-less: wallet zip is stored (usually STORE/deflate). Use built-in if possible.
    // Node has no built-in unzip; try `yauzl`/`adm-zip` optional, else PowerShell/local already unzipped.
    let AdmZip;
    try {
        AdmZip = require('adm-zip');
    } catch (_e) {
        // Minimal ZIP extractor for standard wallet (stored/deflated files, no encryption)
        extractZipMinimal(buf, destDir);
        return;
    }
    const zip = new AdmZip(buf);
    zip.extractAllTo(destDir, true);
}

function extractZipMinimal(buf, destDir) {
    // Parse local file headers — enough for Oracle wallet ZIPs
    let o = 0;
    while (o + 30 <= buf.length) {
        if (buf.readUInt32LE(o) !== 0x04034b50) break;
        const method = buf.readUInt16LE(o + 8);
        const compSize = buf.readUInt32LE(o + 18);
        const uncompSize = buf.readUInt32LE(o + 22);
        const nameLen = buf.readUInt16LE(o + 26);
        const extraLen = buf.readUInt16LE(o + 28);
        const name = buf.slice(o + 30, o + 30 + nameLen).toString('utf8');
        const dataStart = o + 30 + nameLen + extraLen;
        const data = buf.slice(dataStart, dataStart + compSize);
        o = dataStart + compSize;
        if (!name || name.endsWith('/')) continue;
        const base = path.basename(name);
        if (base !== name && name.includes('/')) {
            // keep flat wallet files
        }
        let out = data;
        if (method === 8) out = zlib.inflateRawSync(data);
        else if (method !== 0) throw new Error(`zip method ${method} unsupported for ${name}`);
        if (uncompSize && out.length !== uncompSize && method === 0 && out.length !== compSize) {
            /* ignore */
        }
        fs.writeFileSync(path.join(destDir, path.basename(name)), out);
    }
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

function resolveOracleWalletDir(preferredDir) {
    const existing = (preferredDir || process.env.ORACLE_WALLET_DIR || process.env.TNS_ADMIN || '').trim();
    if (existing && fs.existsSync(path.join(existing, 'tnsnames.ora'))) {
        return existing;
    }

    const b64 = (process.env.ORACLE_WALLET_ZIP_BASE64 || '').trim();
    if (!b64) {
        return existing || '';
    }

    const dest = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
        ? path.join('/tmp', 'oracle-wallet')
        : path.join(process.cwd(), '.oracle-wallet-tmp');

    const marker = path.join(dest, 'tnsnames.ora');
    if (fs.existsSync(marker)) return dest;

    ensureDir(dest);
    const buf = Buffer.from(b64, 'base64');
    unzipWalletBuffer(buf, dest);
    patchSqlnetOra(dest);
    if (!fs.existsSync(marker)) {
        throw new Error('Oracle wallet extract failed (tnsnames.ora missing)');
    }
    return dest;
}

module.exports = {
    resolveOracleWalletDir,
    patchSqlnetOra
};
