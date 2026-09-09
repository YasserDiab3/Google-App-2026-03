/**
 * إرسال وإعدادات النماذج العامة (بوابة النماذج الموحدة) — 100% SQL Backend
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');
const { uploadFileToDrive } = require('./file-handlers');
const {
    buildFormattedSites,
    buildPublicFormSafetyMembers,
    buildPublicFormDepartments
} = require('./form-settings-handlers');

function extractPayload(payload, postData) {
    const p = payload && typeof payload === 'object' ? payload : {};
    const d = postData && typeof postData === 'object' ? postData : {};
    if (p.siteName || p.details || p.locationName || p.assetId || p.inspectorName || p.inspector) return p;
    if (d.siteName || d.details || d.locationName || d.assetId || d.inspectorName || d.inspector) return d;
    if (p.data && typeof p.data === 'object') return p.data;
    if (d.data && typeof d.data === 'object') return d.data;
    return Object.keys(p).length ? p : d;
}

function isHoneypot(data) {
    return !!(data._hp_field || data.website || data.hp);
}

function generateObservationCodes(db, instantRefCode) {
    const ref = String(instantRefCode || '').trim();
    if (ref) return { id: ref, isoCode: ref };

    const rows = db.readSheet('DailyObservations') || [];
    const ym = new Date().toISOString().slice(0, 7).replace('-', '');
    let maxSeq = 0;
    for (const r of rows) {
        const candidates = [String(r.id || '').trim(), String(r.isoCode || '').trim()];
        for (const code of candidates) {
            if (!code) continue;
            let num = 0;
            const mObs = code.match(/^OBS-(\d{6})-(\d+)/i);
            if (mObs) {
                num = parseInt(mObs[2], 10);
            } else {
                const mDob = code.match(/^DOB-(\d+)$/i);
                if (mDob) {
                    num = parseInt(mDob[1], 10);
                } else {
                    const mTrail = code.match(/(\d+)$/);
                    if (mTrail) num = parseInt(mTrail[1], 10);
                }
            }
            if (!isNaN(num) && num > maxSeq) maxSeq = num;
        }
    }
    const nextSeq = maxSeq + 1;
    const seq = String(nextSeq).padStart(4, '0');
    const obsId = `DOB-${seq}`;
    const isoCode = `OBS-${ym}-${seq}`;
    return { id: obsId, isoCode: isoCode };
}

async function uploadFormPhotos(obsId, photos, moduleName) {
    const attachments = [];
    const list = Array.isArray(photos) ? photos.filter((p) => p && String(p).length > 50) : [];
    for (let idx = 0; idx < list.length; idx++) {
        try {
            const uploadRes = await uploadFileToDrive({
                base64Data: list[idx],
                fileName: `${moduleName}_${obsId}_${idx + 1}_${Date.now()}.jpg`,
                mimeType: 'image/jpeg',
                moduleName
            });
            if (uploadRes?.success) {
                const fileId = uploadRes.fileId || '';
                const url = uploadRes.publicUrl || uploadRes.directLink || uploadRes.shareableLink || '';
                attachments.push({
                    id: fileId || `ATT_${Date.now()}_${idx}`,
                    name: `image-${idx + 1}`,
                    url: url || (fileId ? `FILE_${fileId}` : ''),
                    directLink: url,
                    shareableLink: uploadRes.shareableLink || url,
                    fileId,
                    type: 'image/jpeg',
                    uploadedAt: new Date().toISOString()
                });
            }
        } catch (err) {
            console.error(`[public-forms] photo upload failed (${moduleName}):`, err.message);
        }
    }
    return attachments;
}

function getCompanySettingsSummary(db) {
    try {
        const rows = db.readSheet('Company_Settings') || [];
        const first = rows[0] || {};
        return {
            companyName: first.companyName || 'ICAPP',
            companyLogo: first.companyLogo || ''
        };
    } catch (_) {
        return { companyName: 'ICAPP', companyLogo: '' };
    }
}

const publicFormsHandlers = {
    // 1. إعدادات نموذج الملاحظات اليومية
    getPublicObservationConfig() {
        try {
            const db = getDatabase();
            const sites = buildFormattedSites(db);
            const departments = buildPublicFormDepartments(db);
            const safetyMembers = buildPublicFormSafetyMembers(db);
            const { companyName, companyLogo } = getCompanySettingsSummary(db);

            // جلب أحدث الملاحظات المفتوحة لعرض شريط التنبيهات
            let recentOpenHazards = [];
            try {
                const obsRows = db.all(`
                    SELECT id, isoCode, siteName, locationName, observationType, riskLevel, date, details 
                    FROM "DailyObservations" 
                    WHERE "status" = 'مفتوح' OR "status" = 'قيد المتابعة' 
                    ORDER BY "date" DESC LIMIT 5
                `, []);
                recentOpenHazards = obsRows || [];
            } catch (_) {}

            return {
                success: true,
                sites,
                departments,
                safetyMembers,
                companyLogo,
                companyName,
                recentOpenHazards
            };
        } catch (e) {
            return { success: false, message: e.message, sites: [] };
        }
    },

    // 2. إعدادات نموذج المرور اليومي (Daily Safety Checklist)
    getPublicDailySafetyConfig() {
        try {
            const db = getDatabase();
            const sites = buildFormattedSites(db);
            const safetyMembers = buildPublicFormSafetyMembers(db);
            const { companyName, companyLogo } = getCompanySettingsSummary(db);

            return {
                success: true,
                sites,
                safetyMembers,
                companyLogo,
                companyName
            };
        } catch (e) {
            return { success: false, message: e.message, sites: [] };
        }
    },

    // 3. إعدادات نموذج فحص أجهزة ومعدات الإطفاء
    getPublicFireInspectionConfig() {
        try {
            const db = getDatabase();
            const sites = buildFormattedSites(db);
            const safetyMembers = buildPublicFormSafetyMembers(db);
            const { companyName, companyLogo } = getCompanySettingsSummary(db);

            let devices = [];
            try {
                devices = db.all(`SELECT id, type, location, siteId, factory, status, barcode FROM "FireEquipmentAssets" ORDER BY id ASC`, []) || [];
            } catch (_) {}

            return {
                success: true,
                sites,
                safetyMembers,
                devices,
                companyLogo,
                companyName
            };
        } catch (e) {
            return { success: false, message: e.message, sites: [] };
        }
    },

    // 4. إعدادات نموذج بلاغات الحوادث الوشيكة (Near Miss)
    getPublicNearMissConfig() {
        try {
            const db = getDatabase();
            const sites = buildFormattedSites(db);
            const departments = buildPublicFormDepartments(db);
            const { companyName, companyLogo } = getCompanySettingsSummary(db);

            return {
                success: true,
                sites,
                departments,
                companyLogo,
                companyName
            };
        } catch (e) {
            return { success: false, message: e.message, sites: [] };
        }
    },

    // 5. إعدادات بوابة النماذج الموحدة (Forms Hub)
    getFormsHubConfig() {
        try {
            const db = getDatabase();
            const sites = buildFormattedSites(db);
            const departments = buildPublicFormDepartments(db);
            const safetyMembers = buildPublicFormSafetyMembers(db);
            const { companyName, companyLogo } = getCompanySettingsSummary(db);

            return {
                success: true,
                sites,
                departments,
                safetyMembers,
                companyLogo,
                companyName
            };
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    // 6. إرجاع المواقع والأماكن العامة
    getSitesAndPlaces() {
        try {
            const db = getDatabase();
            const sites = buildFormattedSites(db);
            return { success: true, sites, data: sites };
        } catch (e) {
            return { success: false, message: e.message, sites: [], data: [] };
        }
    },

    getObservationSites() {
        return publicFormsHandlers.getSitesAndPlaces();
    },

    // 7. رسائل البث الإخباري والتنبيهات للسلامة
    getHseBroadcastMessages() {
        try {
            const db = getDatabase();
            const row = db.get(`SELECT "Setting_Value" FROM "HSE_Settings" WHERE "Setting_Key" = 'BROADCAST_MESSAGES'`, []);
            let messages = [];
            if (row && row.Setting_Value) {
                try { messages = JSON.parse(row.Setting_Value); } catch (_) {}
            }
            return { success: true, data: messages, messages };
        } catch (e) {
            return { success: true, data: [], messages: [] };
        }
    },

    saveHseBroadcastMessages(payload) {
        try {
            const db = getDatabase();
            const messages = payload?.messages || payload?.data || payload || [];
            const jsonVal = JSON.stringify(messages);
            db.exec(`
                INSERT INTO "HSE_Settings" ("Setting_Key", "Setting_Value", "Description", "Last_Updated")
                VALUES ('BROADCAST_MESSAGES', '${jsonVal.replace(/'/g, "''")}', 'HSE Broadcast Alerts', datetime('now'))
                ON CONFLICT("Setting_Key") DO UPDATE SET "Setting_Value" = excluded."Setting_Value", "Last_Updated" = datetime('now');
            `);
            return { success: true, message: 'تم حفظ رسائل البث بنجاح' };
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    // 8. أرقام وخطوط الطوارئ الميدانية
    getHseEmergencyContacts() {
        try {
            const db = getDatabase();
            const row = db.get(`SELECT "Setting_Value" FROM "HSE_Settings" WHERE "Setting_Key" = 'EMERGENCY_CONTACTS'`, []);
            let contacts = {};
            if (row && row.Setting_Value) {
                try { contacts = JSON.parse(row.Setting_Value); } catch (_) {}
            }
            return { success: true, data: contacts, contacts };
        } catch (e) {
            return { success: true, data: {}, contacts: {} };
        }
    },

    saveHseEmergencyContacts(payload) {
        try {
            const db = getDatabase();
            const contacts = payload?.contacts || payload?.data || payload || {};
            const jsonVal = JSON.stringify(contacts);
            db.exec(`
                INSERT INTO "HSE_Settings" ("Setting_Key", "Setting_Value", "Description", "Last_Updated")
                VALUES ('EMERGENCY_CONTACTS', '${jsonVal.replace(/'/g, "''")}', 'HSE Emergency Contacts', datetime('now'))
                ON CONFLICT("Setting_Key") DO UPDATE SET "Setting_Value" = excluded."Setting_Value", "Last_Updated" = datetime('now');
            `);
            return { success: true, message: 'تم حفظ أرقام الطوارئ بنجاح' };
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    // 9. إحصائيات عامة للملاحظات (بدون إفشاء بيانات حساسة)
    getPublicObservationsAnalytics() {
        try {
            const db = getDatabase();
            const totalRow = db.get(`SELECT COUNT(*) as total FROM "DailyObservations"`, []);
            const openRow = db.get(`SELECT COUNT(*) as openCount FROM "DailyObservations" WHERE "status" = 'مفتوح' OR "status" = 'قيد المتابعة'`, []);
            const closedRow = db.get(`SELECT COUNT(*) as closedCount FROM "DailyObservations" WHERE "status" = 'مغلق' OR "status" = 'Closed'`, []);
            const highRiskRow = db.get(`SELECT COUNT(*) as highCount FROM "DailyObservations" WHERE "riskLevel" = 'عالي' OR "riskLevel" = 'High'`, []);

            return {
                success: true,
                data: {
                    totalObservations: totalRow ? totalRow.total : 0,
                    openObservations: openRow ? openRow.openCount : 0,
                    closedObservations: closedRow ? closedRow.closedCount : 0,
                    highRiskCount: highRiskRow ? highRiskRow.highCount : 0
                }
            };
        } catch (e) {
            return { success: false, message: e.message, data: {} };
        }
    },

    // 10. ملخص حي لتصاريح العمل النشطة للوحة العامة
    getPublicLivePTWSummary() {
        try {
            const db = getDatabase();
            const activePermits = db.all(`
                SELECT id, workType, siteName, location, sublocationName, startDate, endDate, status 
                FROM "PTW" 
                WHERE "status" = 'Approved' OR "status" = 'موافق عليه' OR "status" = 'معتمد' OR "status" = 'Active' 
                ORDER BY "startDate" DESC LIMIT 15
            `, []) || [];

            return {
                success: true,
                activeCount: activePermits.length,
                permits: activePermits
            };
        } catch (e) {
            return { success: false, message: e.message, activeCount: 0, permits: [] };
        }
    },

    // 11. تتبع حالة بلاغ أو ملاحظة بالكود المرجعي
    trackObservation(payload) {
        try {
            const db = getDatabase();
            const code = String(payload?.refCode || payload?.code || payload?.id || '').trim();
            if (!code) return { success: false, message: 'كود الملاحظة مطلوب للبحث' };

            const row = db.get(`
                SELECT id, isoCode, siteName, locationName, observationType, status, workflowStage, date, expectedCompletionDate, details, submittedAt
                FROM "DailyObservations" 
                WHERE "id" = ? OR "isoCode" = ?
            `, [code, code]);

            if (!row) {
                return { success: false, message: `لم يتم العثور على ملاحظة مسجلة بالكود: ${code}` };
            }

            return {
                success: true,
                data: row,
                message: `تم العثور على الملاحظة (${row.isoCode || row.id})`
            };
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    // 12. إرسال الملاحظات اليومية
    async submitPublicObservation(payload, postData) {
        const data = extractPayload(payload, postData);
        if (isHoneypot(data)) {
            return { success: true, message: 'تم إرسال الملاحظة بنجاح' };
        }

        const siteName = String(data.siteName || data.site || data.factory || data.factoryName || '').trim();
        const locationName = String(data.locationName || data.place || data.subLocation || data.subLocationName || '').trim();
        const details = String(data.details || data.description || '').trim();

        if (!siteName || !locationName || !details) {
            return {
                success: false,
                message: 'يرجى إكمال الموقع والمكان وتفاصيل الملاحظة',
                errorCode: 'VALIDATION_FAILED'
            };
        }

        const db = getDatabase();
        const { id, isoCode } = generateObservationCodes(db, data.instantRefCode);

        let photosToUpload = [];
        if (Array.isArray(data.photos) && data.photos.length) {
            photosToUpload = data.photos;
        } else if (data.photoBase64 && String(data.photoBase64).length > 50) {
            photosToUpload = [data.photoBase64];
        }
        const attachments = await uploadFormPhotos(id, photosToUpload, 'DailyObservations');

        const subCategory = String(data.subCategory || '').trim();
        let detailsText = details;
        if (subCategory && !detailsText.includes(subCategory)) {
            detailsText = `[${subCategory}] ${detailsText}`;
        }

        let observerName = String(data.observerName || data.reporterName || 'ملاحظة عامة (مجهول)').trim();
        if (data.reporterPhone) observerName += ` (${data.reporterPhone})`;

        const gpsCoords = String(data.gpsCoordinates || data.coordinates || data.gps || '').trim();
        const mapsUrl = String(
            data.mapsUrl || (gpsCoords ? `https://maps.google.com/?q=${encodeURIComponent(gpsCoords)}` : '')
        ).trim();
        const gpsAcc = data.gpsAccuracy ? ` (دقة: ±${Math.round(Number(data.gpsAccuracy))}م)` : '';

        let remarksText = subCategory ? `التصنيف الفرعي: ${subCategory}` : 'المصدر: نموذج عام ميداني';
        if (gpsCoords) remarksText += ` | إحداثيات GPS: ${gpsCoords}${gpsAcc}`;

        const nowIso = new Date().toISOString();
        const dateVal = data.date ? String(data.date).trim() : nowIso.replace('T', ' ').slice(0, 19);

        const obsRecord = {
            id,
            isoCode,
            siteId: siteName,
            siteName,
            placeId: locationName,
            locationName,
            observationType: data.observationType || data.behaviorType || 'سلوك غير آمن',
            subCategory,
            date: dateVal,
            shift: data.shift || 'الأولى',
            details: detailsText,
            correctiveAction: String(data.correctiveAction || '').trim(),
            responsibleDepartment: data.responsibleDepartment || data.department || 'إدارة السلامة والصحة المهنية',
            riskLevel: data.riskLevel || 'متوسط',
            observerName,
            expectedCompletionDate: data.expectedCompletionDate || data.expectedDate || '',
            status: data.status || 'مفتوح',
            workflowStage: 'pending_specialist',
            gpsCoordinates: gpsCoords,
            gpsAccuracy: data.gpsAccuracy || '',
            mapsUrl,
            submittedBy: 'نموذج عام (Public Form)',
            submittedByEmail: '',
            submittedAt: nowIso,
            remarks: remarksText,
            attachments: JSON.stringify(attachments),
            createdAt: nowIso,
            updatedAt: nowIso
        };

        db.insertRow('DailyObservations', obsRecord);

        return {
            success: true,
            id: id,
            isoCode: isoCode,
            refCode: isoCode || id,
            data: { id, isoCode, refCode: isoCode || id },
            message: 'تم تسجيل الملاحظة اليومية بنجاح، شكراً لمشاركتكم في حماية بيئة العمل.'
        };
    },

    // 13. إرسال بلاغ حادث وشيك
    async submitPublicNearMiss(payload, postData) {
        const data = extractPayload(payload, postData);
        if (isHoneypot(data)) {
            return { success: true, message: 'تم تسجيل الحادث الوشيك بنجاح' };
        }

        const db = getDatabase();
        const id = `NRM_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
        const isoCode = String(data.instantRefCode || data.isoCode || `NM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`).trim();
        const corrective = data.correctiveProposed || data.correctiveAction || data.correctiveDescription || '';

        let attachments = '[]';
        const photoData = data.photoBase64 || data.image || '';
        if (photoData && String(photoData).length > 50) {
            const uploaded = await uploadFormPhotos(id, [photoData], 'NearMiss');
            if (uploaded.length) attachments = JSON.stringify(uploaded);
        }

        const nowIso = new Date().toISOString();
        const record = {
            id,
            isoCode,
            type: data.observationType || data.type || 'سقوط أشياء / أحمال',
            severity: data.riskLevel || data.severity || 'متوسط',
            date: data.date || nowIso.slice(0, 10),
            observerName: data.observerName || 'فاعل خير (سري)',
            phone: data.observerPhone || data.phone || '',
            location: data.location || `${data.siteName || ''}${data.subLocation || data.locationName ? ` - ${data.subLocation || data.locationName}` : ''}`,
            siteName: data.siteName || '',
            subLocation: data.subLocation || data.locationName || '',
            department: data.responsibleDepartment || data.department || 'إدارة السلامة والصحة المهنية',
            description: data.details || data.description || '',
            potentialConsequences: data.potentialConsequences || '',
            correctiveProposed: corrective,
            correctiveDescription: corrective,
            attachments,
            status: 'جديد',
            reportedBy: data.observerName || 'Public Form',
            isAnonymous: (data.isAnonymous === true || data.isAnonymous === 'نعم') ? 'نعم' : 'لا',
            gpsLocation: data.gpsLocation || data.gpsCoordinates || '',
            gpsMapLink: data.gpsMapLink || data.mapsUrl || '',
            createdAt: nowIso,
            updatedAt: nowIso
        };

        db.insertRow('NearMiss', record);
        return { success: true, id, isoCode, message: 'تم تسجيل الحادث الوشيك بنجاح' };
    },

    // 14. إرسال فحص طفايات الحريق
    async submitPublicFireInspection(payload, postData) {
        const data = extractPayload(payload, postData);
        if (isHoneypot(data)) {
            return { success: true, message: 'تم إرسال الفحص بنجاح' };
        }

        const assetId = String(data.assetId || data.id || '').trim();
        const inspectorName = String(data.inspector || data.inspectorName || '').trim();
        if (!assetId) {
            return { success: false, message: 'يرجى تحديد أو مسح معرف جهاز الإطفاء (DeviceID)' };
        }
        if (!inspectorName) {
            return { success: false, message: 'يرجى اختيار أو إدخال اسم مسؤول الفحص' };
        }

        let attachments = '[]';
        if (data.photoBase64 && String(data.photoBase64).length > 50) {
            const uploaded = await uploadFormPhotos(assetId, [data.photoBase64], 'FireEquipment');
            if (uploaded.length) attachments = JSON.stringify(uploaded);
        }

        const nowIso = new Date().toISOString();
        const inspectionId = `FINSP_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
        const inspectionRecord = {
            id: inspectionId,
            assetId,
            checkDate: data.checkDate ? String(data.checkDate).trim() : nowIso.slice(0, 10),
            inspector: inspectorName,
            status: String(data.status || 'صالح').trim(),
            gaugeReading: String(data.gaugeReading || '').trim(),
            sealIntact: String(data.sealIntact || '').trim(),
            hoseCondition: String(data.hoseCondition || '').trim(),
            bodyCondition: String(data.bodyCondition || '').trim(),
            weightOrLevel: String(data.weightOrLevel || '').trim(),
            remarks: String(data.remarks || '').trim(),
            actions: String(data.actions || data.correctiveAction || '').trim(),
            attachments,
            submittedBy: 'بوابة الفحص العام (Public Fire Inspection Portal)',
            submittedAt: nowIso,
            approvalStatus: 'pending',
            approvedBy: '',
            approvedById: '',
            approvedAt: '',
            reviewNotes: '',
            createdAt: nowIso,
            updatedAt: nowIso
        };

        const db = getDatabase();
        db.insertRow('FireEquipmentInspections', inspectionRecord);
        return { success: true, id: inspectionId, message: 'تم حفظ سجل الفحص بنجاح' };
    },

    submitFireInspection(payload, postData) {
        return publicFormsHandlers.submitPublicFireInspection(payload, postData);
    },

    // 15. إرسال تقرير المرور اليومي
    async submitPublicDailySafetyChecklist(payload, postData) {
        const data = extractPayload(payload, postData);
        if (isHoneypot(data)) {
            return { success: true, message: 'تم إرسال تقرير المرور اليومي بنجاح' };
        }

        const siteName = String(data.siteName || data.siteId || '').trim();
        const inspectorName = String(data.inspectorName || data.inspector || '').trim();
        if (!siteName) return { success: false, message: 'يرجى اختيار المصنع / الموقع' };
        if (!inspectorName) return { success: false, message: 'يرجى اختيار اسم مسؤول السلامة القائم بالمرور' };

        const db = getDatabase();
        const nowIso = new Date().toISOString();
        const id = `DSC_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
        const reportNumber = data.reportNumber || `DSR-${nowIso.slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

        const record = {
            id,
            reportNumber,
            siteId: siteName,
            siteName,
            date: data.date ? String(data.date).trim().slice(0, 10) : nowIso.slice(0, 10),
            inspectorName,
            shift: String(data.shift || 'الأولى').trim(),
            notes: data.notes || '',
            formSubmittedAt: nowIso,
            createdAt: nowIso,
            updatedAt: nowIso
        };

        for (let q = 1; q <= 17; q++) {
            record[`q${q}`] = data[`q${q}`] != null ? String(data[`q${q}`]) : '';
        }
        if (data.q15Reading != null) record.q15Reading = String(data.q15Reading);

        db.insertRow('DailySafetyCheckList', record);
        return { success: true, id, reportNumber, message: 'تم إرسال تقرير المرور اليومي بنجاح' };
    }
};

module.exports = publicFormsHandlers;
