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

async function getProfileImage(query) {
    const id = String(query?.id || query?.fileId || '').trim();
    const userId = String(query?.userId || query?.ownerUserId || '').trim();

    if (!id && !userId) {
        return { success: false, message: 'معرف الملف مطلوب' };
    }

    if (userId) {
        try {
            const profileMeta = await attachmentStore.loadProfilePhotoMeta(userId);
            if (profileMeta) {
                if (profileMeta.publicUrl) {
                    return {
                        success: true,
                        redirectUrl: profileMeta.publicUrl,
                        fileName: profileMeta.fileName || 'profile',
                        source: 'profile-meta-url'
                    };
                }
                if (profileMeta.photo) {
                    const loaded = await attachmentStore.loadAttachment(profileMeta.photo);
                    if (loaded && loaded.buffer) {
                        const mime = loaded.mimeType || 'image/jpeg';
                        return {
                            success: true,
                            dataUri: `data:${mime};base64,${loaded.buffer.toString('base64')}`,
                            fileName: loaded.fileName,
                            source: 'profile-meta-file'
                        };
                    }
                }
            }
        } catch (_) { /* continue */ }
    }

    if (id && id.startsWith('PROFILE_')) {
        const uid = id.slice('PROFILE_'.length);
        return getProfileImage({ userId: uid });
    }

    if (id && attachmentStore.isPersistentEnabled()) {
        try {
            const loaded = await attachmentStore.loadAttachment(id);
            if (loaded) {
                if (loaded.publicUrl) {
                    return {
                        success: true,
                        redirectUrl: loaded.publicUrl,
                        fileName: loaded.fileName,
                        source: 'blob-url'
                    };
                }
                if (loaded.buffer && loaded.buffer.length) {
                    const mime = loaded.mimeType || 'image/jpeg';
                    return {
                        success: true,
                        dataUri: `data:${mime};base64,${loaded.buffer.toString('base64')}`,
                        fileName: loaded.fileName,
                        source: 'persistent-buffer'
                    };
                }
            }
        } catch (_) { /* SQL fallback */ }
    }

    const db = getDatabase();
    ensureAttachmentsTable(db);

    if (id) {
        const row = db.get(`SELECT * FROM "FileAttachments" WHERE "id" = ?`, [id]);
        if (row) {
            if (row.publicUrl) {
                return {
                    success: true,
                    redirectUrl: row.publicUrl,
                    fileName: row.fileName,
                    source: 'sql-url'
                };
            }
            if (row.dataBase64) {
                const mime = row.mimeType || 'image/jpeg';
                return {
                    success: true,
                    dataUri: `data:${mime};base64,${row.dataBase64}`,
                    fileName: row.fileName,
                    source: 'sql-base64'
                };
            }
        }
    }

    if (id && /^[a-zA-Z0-9_-]{20,}$/.test(id)) {
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
