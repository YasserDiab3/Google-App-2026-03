/**
 * رفع الملفات وعرض الصور — Vercel Blob / قرص محلي + SQL (legacy)
 */
'use strict';

const { getDatabase } = require('../db/database');
const attachmentStore = require('../services/attachment-store');

const ALLOWED_MIME = new Set([
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]);

function ensureAttachmentsTable(db) {
    db.exec(`CREATE TABLE IF NOT EXISTS "FileAttachments" (
        "id" TEXT PRIMARY KEY,
        "moduleName" TEXT,
        "fileName" TEXT,
        "mimeType" TEXT,
        "dataBase64" TEXT,
        "publicUrl" TEXT,
        "createdAt" TEXT
    );`);
    try {
        db.exec(`ALTER TABLE "FileAttachments" ADD COLUMN "publicUrl" TEXT`);
    } catch (_) { /* exists */ }
}

function cleanBase64(input) {
    return String(input || '').replace(/^data:[^;]+;base64,/, '');
}

function looksLikeImageBuffer(buf) {
    if (!buf || buf.length < 24) return false;
    const b0 = buf[0];
    const b1 = buf[1];
    if (b0 === 0xff && b1 === 0xd8) return 'image/jpeg';
    if (b0 === 0x89 && b1 === 0x50) return 'image/png';
    if (b0 === 0x47 && b1 === 0x49) return 'image/gif';
    if (buf.slice(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
    return '';
}

const MAX_INLINE_IMAGE_BYTES = 8 * 1024 * 1024;

function isAllowedInlineImageUrl(url) {
    try {
        const u = new URL(String(url || '').trim());
        if (u.protocol !== 'https:') return false;
        const h = u.hostname.toLowerCase();
        return (
            h.endsWith('.vercel-storage.com') ||
            h === 'blob.vercel-storage.com' ||
            h.endsWith('.googleusercontent.com') ||
            h === 'lh3.googleusercontent.com' ||
            h === 'drive.google.com' ||
            h === 'docs.google.com' ||
            h.endsWith('.google.com')
        );
    } catch (_) {
        return false;
    }
}

function wantsInlineDataUri(query) {
    const raw = query && (query.inline ?? query.dataUri ?? query.requireDataUri);
    if (raw === true || raw === 1) return true;
    const s = String(raw || '').trim().toLowerCase();
    return s === '1' || s === 'true' || s === 'yes';
}

function dataUriFromBuffer(buffer, mimeType, fileName, source) {
    if (!buffer || !buffer.length) return null;
    const detected = looksLikeImageBuffer(buffer);
    const mime = detected || (String(mimeType || '').toLowerCase().startsWith('image/') ? mimeType : 'image/jpeg');
    return {
        success: true,
        dataUri: `data:${mime};base64,${buffer.toString('base64')}`,
        fileName: fileName || 'image',
        source: source || 'buffer'
    };
}

async function fetchAllowedImageAsDataUri(url) {
    const src = String(url || '').trim();
    if (!isAllowedInlineImageUrl(src)) return null;
    try {
        const res = await fetch(src, {
            redirect: 'follow',
            headers: { 'User-Agent': 'Mozilla/5.0 HSE-PPT-Image' }
        });
        if (!res.ok) return null;
        const buf = Buffer.from(await res.arrayBuffer());
        if (!buf.length || buf.length > MAX_INLINE_IMAGE_BYTES) return null;
        const detected = looksLikeImageBuffer(buf);
        const headerMime = String(res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
        const mime = detected || (headerMime.startsWith('image/') ? headerMime : '');
        if (!mime) return null;
        return `data:${mime};base64,${buf.toString('base64')}`;
    } catch (_) {
        return null;
    }
}

async function fetchDriveFileDataUri(fileId) {
    const id = String(fileId || '').trim();
    if (!id || !/^[a-zA-Z0-9_-]{20,}$/.test(id) || id.startsWith('FILE_') || id.startsWith('ATT-')) {
        return null;
    }
    const candidates = [
        `https://lh3.googleusercontent.com/d/${id}=w1400`,
        `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1400`,
        `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}&confirm=t`,
        `https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`
    ];
    for (const url of candidates) {
        try {
            const res = await fetch(url, {
                redirect: 'follow',
                headers: { 'User-Agent': 'Mozilla/5.0 HSE-PPT-Image' }
            });
            if (!res.ok) continue;
            const buf = Buffer.from(await res.arrayBuffer());
            const mime = looksLikeImageBuffer(buf);
            if (!mime) continue;
            return `data:${mime};base64,${buf.toString('base64')}`;
        } catch (_) { /* try next */ }
    }
    return null;
}

async function uploadFileToDrive(payload) {
    if (payload?.files && Array.isArray(payload.files)) {
        return uploadMultipleFiles(payload);
    }
    const base64Data = payload?.base64Data;
    const fileName = payload?.fileName;
    const mimeType = String(payload?.mimeType || '').toLowerCase();
    const moduleName = payload?.moduleName || null;
    const ownerUserId = payload?.ownerUserId || payload?.userId || null;

    if (!base64Data || !fileName || !mimeType) {
        return { success: false, message: 'البيانات غير كاملة (base64Data, fileName, mimeType)' };
    }
    if (!ALLOWED_MIME.has(mimeType)) {
        return { success: false, message: 'نوع الملف غير مدعوم' };
    }

    const db = getDatabase();
    ensureAttachmentsTable(db);

    const fileId = `FILE_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const clean = cleanBase64(base64Data);
    const buffer = Buffer.from(clean, 'base64');
    const createdAt = new Date().toISOString();

    let publicUrl = '';
    let storage = 'sqlite';

    if (attachmentStore.isPersistentEnabled()) {
        try {
            const meta = await attachmentStore.saveAttachment({
                fileId,
                buffer,
                mimeType,
                fileName,
                moduleName,
                ownerUserId
            });
            publicUrl = meta.publicUrl || '';
            storage = meta.storage || 'persistent';
        } catch (err) {
            console.error('[uploadFileToDrive] persistent store failed:', err.message);
            if (attachmentStore.isBlobEnabled()) {
                return {
                    success: false,
                    message: 'فشل حفظ الملف في التخزين الدائم. تحقق من BLOB_READ_WRITE_TOKEN على Vercel.',
                    errorCode: 'BLOB_STORE_FAILED'
                };
            }
        }
    }

    db.run(
        `INSERT INTO "FileAttachments" ("id", "moduleName", "fileName", "mimeType", "dataBase64", "publicUrl", "createdAt") VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [fileId, moduleName, fileName, mimeType, attachmentStore.isBlobEnabled() ? '' : clean, publicUrl, createdAt]
    );

    const dataUri = publicUrl || `data:${mimeType};base64,${clean}`;
    return {
        success: true,
        fileId,
        fileName,
        directLink: dataUri,
        shareableLink: publicUrl || dataUri,
        publicUrl,
        storage,
        message: 'تم رفع الملف بنجاح'
    };
}

async function uploadMultipleFiles(payload) {
    const files = payload?.files;
    if (!Array.isArray(files) || files.length === 0) {
        return { success: false, message: 'لا توجد ملفات للرفع' };
    }
    const results = [];
    for (const f of files) {
        const r = await uploadFileToDrive({
            base64Data: f.data || f.base64Data,
            fileName: f.name || f.fileName || 'attachment',
            mimeType: f.type || f.mimeType || 'application/octet-stream',
            moduleName: payload?.moduleName,
            ownerUserId: payload?.ownerUserId || payload?.userId
        });
        results.push(r);
    }
    const ok = results.filter((r) => r.success).length;
    return { success: ok > 0, results, uploaded: ok, total: files.length };
}

async function respondStoredImage({ buffer, mimeType, fileName, publicUrl, source, inline }) {
    if (inline) {
        const fromBuf = dataUriFromBuffer(buffer, mimeType, fileName, source + '-inline');
        if (fromBuf) return fromBuf;
        if (publicUrl) {
            const dataUri = await fetchAllowedImageAsDataUri(publicUrl);
            if (dataUri) {
                return { success: true, dataUri, fileName: fileName || 'image', source: source + '-fetch' };
            }
        }
    }
    if (publicUrl) {
        return {
            success: true,
            redirectUrl: publicUrl,
            fileName: fileName || 'image',
            source: source || 'url'
        };
    }
    return dataUriFromBuffer(buffer, mimeType, fileName, source);
}

async function getProfileImage(query) {
    const id = String(query?.id || query?.fileId || '').trim();
    const userId = String(query?.userId || query?.ownerUserId || '').trim();
    const rawUrl = String(query?.url || query?.src || '').trim();
    const inline = wantsInlineDataUri(query);

    if (!id && !userId && !rawUrl) {
        return { success: false, message: 'معرف الملف مطلوب' };
    }

    if (rawUrl) {
        const dataUri = await fetchAllowedImageAsDataUri(rawUrl);
        if (dataUri) {
            return { success: true, dataUri, source: 'url-inline' };
        }
        if (!id && !userId) {
            return { success: false, message: 'تعذر جلب الصورة من الرابط' };
        }
    }

    if (userId) {
        try {
            const profileMeta = await attachmentStore.loadProfilePhotoMeta(userId);
            if (profileMeta) {
                if (profileMeta.photo) {
                    const loaded = await attachmentStore.loadAttachment(profileMeta.photo);
                    if (loaded) {
                        const answered = await respondStoredImage({
                            buffer: loaded.buffer,
                            mimeType: loaded.mimeType,
                            fileName: loaded.fileName || profileMeta.fileName || 'profile',
                            publicUrl: loaded.publicUrl || profileMeta.publicUrl,
                            source: 'profile-meta-file',
                            inline
                        });
                        if (answered) return answered;
                    }
                }
                if (profileMeta.publicUrl) {
                    const answered = await respondStoredImage({
                        publicUrl: profileMeta.publicUrl,
                        fileName: profileMeta.fileName || 'profile',
                        source: 'profile-meta-url',
                        inline
                    });
                    if (answered) return answered;
                }
            }
        } catch (_) { /* continue */ }
    }

    if (id && id.startsWith('PROFILE_')) {
        const uid = id.slice('PROFILE_'.length);
        return getProfileImage({ userId: uid, inline: inline ? '1' : '' });
    }

    if (id && attachmentStore.isPersistentEnabled()) {
        try {
            const loaded = await attachmentStore.loadAttachment(id);
            if (loaded) {
                const answered = await respondStoredImage({
                    buffer: loaded.buffer,
                    mimeType: loaded.mimeType,
                    fileName: loaded.fileName,
                    publicUrl: loaded.publicUrl,
                    source: loaded.buffer ? 'persistent-buffer' : 'blob-url',
                    inline
                });
                if (answered) return answered;
            }
        } catch (_) { /* SQL fallback */ }
    }

    const db = getDatabase();
    ensureAttachmentsTable(db);

    if (id) {
        const row = db.get(`SELECT * FROM "FileAttachments" WHERE "id" = ?`, [id]);
        if (row) {
            if (row.dataBase64) {
                const mime = row.mimeType || 'image/jpeg';
                const buf = Buffer.from(String(row.dataBase64).replace(/^data:[^;]+;base64,/, ''), 'base64');
                const answered = await respondStoredImage({
                    buffer: buf,
                    mimeType: mime,
                    fileName: row.fileName,
                    publicUrl: row.publicUrl,
                    source: 'sql-base64',
                    inline
                });
                if (answered) return answered;
            }
            if (row.publicUrl) {
                const answered = await respondStoredImage({
                    publicUrl: row.publicUrl,
                    fileName: row.fileName,
                    source: 'sql-url',
                    inline
                });
                if (answered) return answered;
            }
        }
    }

    if (id && /^[a-zA-Z0-9_-]{20,}$/.test(id) && !id.startsWith('FILE_') && !id.startsWith('ATT-')) {
        const dataUri = await fetchDriveFileDataUri(id);
        if (dataUri) {
            return {
                success: true,
                dataUri,
                source: 'drive-fetch'
            };
        }
        return {
            success: true,
            redirectUrl: `https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`,
            source: 'drive-legacy'
        };
    }

    return { success: false, message: 'الملف غير موجود' };
}

module.exports = {
    uploadFileToDrive,
    uploadMultipleFiles,
    getProfileImage,
    ensureAttachmentsTable
};
