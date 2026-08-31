/**
 * Persistent attachment storage — Vercel Blob (production) + local disk (dev)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BLOB_API = 'https://blob.vercel-storage.com';
const ROOT = path.resolve(__dirname, '../..');

function getBlobToken() {
    return String(
        process.env.BLOB_READ_WRITE_TOKEN ||
        process.env.VERCEL_BLOB_READ_WRITE_TOKEN ||
        ''
    ).trim();
}

function onVercel() {
    return !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function getLocalRoot() {
    if (onVercel()) return '';
    const dataDir = path.join(ROOT, 'data', 'attachments');
    return dataDir;
}

function isBlobEnabled() {
    return getBlobToken().length > 10;
}

function isPersistentEnabled() {
    return isBlobEnabled() || !!getLocalRoot();
}

function safeKey(key) {
    return String(key || '').replace(/[^a-zA-Z0-9_\-./]/g, '_');
}

function ensureLocalDir(subdir) {
    const root = getLocalRoot();
    if (!root) return '';
    const dir = path.join(root, subdir || '');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
}

function localMetaPath(category, id) {
    const dir = ensureLocalDir(category);
    if (!dir) return '';
    return path.join(dir, `${safeKey(id)}.meta.json`);
}

function localBinPath(category, id) {
    const dir = ensureLocalDir(category);
    if (!dir) return '';
    return path.join(dir, `${safeKey(id)}.bin`);
}

function writeLocalMeta(category, id, meta) {
    const p = localMetaPath(category, id);
    if (!p) return false;
    fs.writeFileSync(p, JSON.stringify(meta, null, 0), 'utf8');
    return true;
}

function readLocalMeta(category, id) {
    const p = localMetaPath(category, id);
    if (!p || !fs.existsSync(p)) return null;
    try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch (_) {
        return null;
    }
}

function writeLocalBin(category, id, buffer) {
    const p = localBinPath(category, id);
    if (!p) return false;
    fs.writeFileSync(p, buffer);
    return true;
}

function readLocalBin(category, id) {
    const p = localBinPath(category, id);
    if (!p || !fs.existsSync(p)) return null;
    try {
        return fs.readFileSync(p);
    } catch (_) {
        return null;
    }
}

async function blobPut(pathname, buffer, contentType) {
    const token = getBlobToken();
    try {
        const { put } = require('@vercel/blob');
        return put(pathname, buffer, {
            access: 'public',
            contentType: contentType || 'application/octet-stream',
            addRandomSuffix: false,
            allowOverwrite: true,
            token
        });
    } catch (_) {
        const res = await fetch(`${BLOB_API}/${pathname.split('/').map(encodeURIComponent).join('/')}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': contentType || 'application/octet-stream',
                'x-content-type': contentType || 'application/octet-stream',
                'x-api-version': '7',
                'x-add-random-suffix': '0',
                'x-allow-overwrite': '1',
                'x-access': 'public'
            },
            body: buffer
        });
        if (!res.ok) {
            const errText = await res.text().catch(() => '');
            throw new Error(`Blob upload failed (${res.status}): ${errText.slice(0, 240)}`);
        }
        return res.json();
    }
}

async function blobFetchPublic(url) {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return null;
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
}

/**
 * @param {{ fileId, buffer, mimeType, fileName, moduleName?, ownerUserId? }} opts
 */
async function saveAttachment(opts) {
    const fileId = String(opts.fileId || '').trim();
    const buffer = opts.buffer;
    const mimeType = String(opts.mimeType || 'application/octet-stream');
    const fileName = String(opts.fileName || fileId);
    if (!fileId || !buffer || !Buffer.isBuffer(buffer)) {
        throw new Error('saveAttachment: fileId and buffer required');
    }

    const meta = {
        fileId,
        fileName,
        mimeType,
        moduleName: opts.moduleName || null,
        ownerUserId: opts.ownerUserId || null,
        createdAt: new Date().toISOString(),
        storage: 'local'
    };

    if (isBlobEnabled()) {
        const pathname = `hse/attachments/${fileId}.bin`;
        const blob = await blobPut(pathname, buffer, mimeType);
        meta.storage = 'blob';
        meta.pathname = blob.pathname || pathname;
        meta.publicUrl = blob.url || blob.downloadUrl || '';
    }

    writeLocalBin('files', fileId, buffer);
    writeLocalMeta('files', fileId, meta);

    if (opts.ownerUserId && String(opts.moduleName || '') === 'Users') {
        await saveProfilePhotoMeta(opts.ownerUserId, {
            photo: fileId,
            publicUrl: meta.publicUrl || '',
            fileName,
            mimeType,
            updatedAt: meta.createdAt
        });
    }

    return meta;
}

/**
 * @returns {Promise<{ buffer, mimeType, fileName, publicUrl }|null>}
 */
async function loadAttachment(fileId) {
    const id = String(fileId || '').trim();
    if (!id) return null;

    let meta = readLocalMeta('files', id);

    if (meta && meta.storage === 'blob' && meta.publicUrl) {
        const buf = await blobFetchPublic(meta.publicUrl);
        if (buf && buf.length) {
            return {
                buffer: buf,
                mimeType: meta.mimeType || 'application/octet-stream',
                fileName: meta.fileName || id,
                publicUrl: meta.publicUrl
            };
        }
    }

    const localBuf = readLocalBin('files', id);
    if (localBuf && localBuf.length) {
        return {
            buffer: localBuf,
            mimeType: (meta && meta.mimeType) || 'application/octet-stream',
            fileName: (meta && meta.fileName) || id,
            publicUrl: (meta && meta.publicUrl) || ''
        };
    }

    return null;
}

async function saveProfilePhotoMeta(userId, data) {
    const uid = String(userId || '').trim();
    if (!uid) return null;
    const meta = {
        userId: uid,
        photo: String(data.photo || '').trim(),
        publicUrl: String(data.publicUrl || '').trim(),
        fileName: data.fileName || '',
        mimeType: data.mimeType || '',
        updatedAt: data.updatedAt || new Date().toISOString()
    };

    writeLocalMeta('profiles', uid, meta);

    if (isBlobEnabled()) {
        const pathname = `hse/profiles/${uid}.meta.json`;
        const buf = Buffer.from(JSON.stringify(meta), 'utf8');
        const blob = await blobPut(pathname, buf, 'application/json');
        meta.blobMetaUrl = blob.url || '';
    }

    return meta;
}

async function loadProfilePhotoMeta(userId) {
    const uid = String(userId || '').trim();
    if (!uid) return null;

    let meta = readLocalMeta('profiles', uid);
    if (meta && meta.photo) return meta;

    if (isBlobEnabled()) {
        try {
            const pathname = `hse/profiles/${uid}.meta.json`;
            const token = getBlobToken();
            const res = await fetch(`${BLOB_API}/${encodeURIComponent(pathname)}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`,
                    'x-api-version': '7'
                }
            });
            if (res.ok) {
                meta = JSON.parse(await res.text());
                if (meta) writeLocalMeta('profiles', uid, meta);
                return meta;
            }
        } catch (_) { /* fallback */ }
    }

    return meta;
}

module.exports = {
    isBlobEnabled,
    isPersistentEnabled,
    saveAttachment,
    loadAttachment,
    saveProfilePhotoMeta,
    loadProfilePhotoMeta
};
