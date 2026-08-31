/**
 * رفع الملفات وعرض الصور — بديل SQL لـ DriveUpload.gs
 */
'use strict';

const { getDatabase } = require('../db/database');

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
        "createdAt" TEXT
    );`);
}

function cleanBase64(input) {
    return String(input || '').replace(/^data:[^;]+;base64,/, '');
}

function uploadFileToDrive(payload) {
    if (payload?.files && Array.isArray(payload.files)) {
        return uploadMultipleFiles(payload);
    }
    const base64Data = payload?.base64Data;
    const fileName = payload?.fileName;
    const mimeType = String(payload?.mimeType || '').toLowerCase();
    const moduleName = payload?.moduleName || null;

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
    const createdAt = new Date().toISOString();

    db.run(
        `INSERT INTO "FileAttachments" ("id", "moduleName", "fileName", "mimeType", "dataBase64", "createdAt") VALUES (?, ?, ?, ?, ?, ?)`,
        [fileId, moduleName, fileName, mimeType, clean, createdAt]
    );

    const dataUri = `data:${mimeType};base64,${clean}`;
    return {
        success: true,
        fileId,
        fileName,
        directLink: dataUri,
        shareableLink: dataUri,
        message: 'تم رفع الملف بنجاح'
    };
}

function uploadMultipleFiles(payload) {
    const files = payload?.files;
    if (!Array.isArray(files) || files.length === 0) {
        return { success: false, message: 'لا توجد ملفات للرفع' };
    }
    const results = [];
    for (const f of files) {
        const r = uploadFileToDrive({
            base64Data: f.data || f.base64Data,
            fileName: f.name || f.fileName || 'attachment',
            mimeType: f.type || f.mimeType || 'application/octet-stream',
            moduleName: payload?.moduleName
        });
        results.push(r);
    }
    const ok = results.filter((r) => r.success).length;
    return { success: ok > 0, results, uploaded: ok, total: files.length };
}

function getProfileImage(query) {
    const id = String(query?.id || query?.fileId || '').trim();
    if (!id) {
        return { success: false, message: 'معرف الملف مطلوب' };
    }

    const db = getDatabase();
    ensureAttachmentsTable(db);

    const row = db.get(`SELECT * FROM "FileAttachments" WHERE "id" = ?`, [id]);
    if (row && row.dataBase64) {
        const mime = row.mimeType || 'image/jpeg';
        return {
            success: true,
            dataUri: `data:${mime};base64,${row.dataBase64}`,
            fileName: row.fileName
        };
    }

    // روابط Drive القديمة — إرجاع رابط مباشر للعرض إن أمكن
    if (/^[a-zA-Z0-9_-]{20,}$/.test(id)) {
        return {
            success: true,
            redirectUrl: `https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`
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
