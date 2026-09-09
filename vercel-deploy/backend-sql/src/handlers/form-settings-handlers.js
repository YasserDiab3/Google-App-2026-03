/**
 * إعدادات النماذج: Form_Sites / Form_Places / Form_Departments / Form_SafetyTeam
 * مزود بحماية التكامل المرجعي وقفل الحذف للمواقع والأماكن المرتبطة بسجلات سابقة
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');

function generateId(prefix = 'ID') {
    return `${prefix}_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
}

function normalizeNameKey(name) {
    return String(name || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function checkFormSettingsPermission(userData, actorUserData) {
    const candidates = [];
    if (userData && typeof userData === 'object') candidates.push(userData);
    if (actorUserData && typeof actorUserData === 'object' && actorUserData !== userData) {
        candidates.push(actorUserData);
    }
    if (candidates.length === 0) {
        return { hasPermission: false, message: 'يجب تسجيل الدخول أولاً' };
    }

    const adminRoles = {
        admin: true,
        administrator: true,
        'system admin': true,
        'system_admin': true,
        'مدير': true,
        'مدير النظام': true
    };

    for (const ud of candidates) {
        const role = String(ud.role || '').trim().toLowerCase();
        if (adminRoles[role]) {
            return { hasPermission: true };
        }
        let perms = ud.permissions || {};
        if (typeof perms === 'string') {
            try { perms = JSON.parse(perms); } catch (_) { perms = {}; }
        }
        if (perms.admin === true || perms['manage-settings'] === true || perms['form-settings'] === true) {
            return { hasPermission: true };
        }
    }

    return {
        hasPermission: false,
        message: 'ليس لديك صلاحية لإدارة إعدادات النماذج. هذا القسم متاح للمديرين فقط.'
    };
}

function parseJsonArray(raw, fallback = []) {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string' && raw.trim()) {
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : fallback;
        } catch (_) { /* ignore */ }
    }
    return fallback;
}

function validateSitesNoDuplicates(sites) {
    if (!Array.isArray(sites)) {
        return { valid: false, message: 'صيغة المواقع غير صحيحة.' };
    }
    const siteKeys = {};
    for (const site of sites) {
        const siteName = String(site?.name || '').trim();
        if (!siteName) continue;
        const siteKey = normalizeNameKey(siteName);
        if (siteKeys[siteKey]) {
            return { valid: false, message: `اسم الموقع «${siteName}» مكرر. لا يمكن حفظ موقعين بنفس الاسم.` };
        }
        siteKeys[siteKey] = true;
        const places = Array.isArray(site.places) ? site.places : [];
        const placeKeys = {};
        for (const place of places) {
            const placeName = String(place?.name || '').trim();
            if (!placeName) continue;
            const placeKey = normalizeNameKey(placeName);
            if (placeKeys[placeKey]) {
                return { valid: false, message: `اسم المكان «${placeName}» مكرر داخل الموقع «${siteName}».` };
            }
            placeKeys[placeKey] = true;
        }
    }
    return { valid: true };
}

/**
 * فحص سلامة العلاقات واستخدام الموقع أو المكان في السجلات التاريخية
 */
function checkLocationUsageInDatabase(db, { siteId, siteName, placeId, placeName }) {
    let totalCount = 0;
    const modules = [];

    const safeSiteId = siteId ? String(siteId).trim() : '';
    const safeSiteName = siteName ? String(siteName).trim() : '';
    const safePlaceId = placeId ? String(placeId).trim() : '';
    const safePlaceName = placeName ? String(placeName).trim() : '';

    function checkTable(countSql, params, moduleLabel) {
        try {
            const row = db.get(countSql, params);
            const count = row ? (row.c || row.count || 0) : 0;
            if (count > 0) {
                totalCount += count;
                modules.push(`${moduleLabel} (${count})`);
            }
        } catch (_) {}
    }

    if (safeSiteId || safeSiteName) {
        checkTable(`SELECT COUNT(*) as c FROM "DailyObservations" WHERE "siteId" = ? OR "siteName" = ?`,
            [safeSiteId, safeSiteName], 'الملاحظات اليومية');

        checkTable(`SELECT COUNT(*) as c FROM "PTW" WHERE "siteId" = ? OR "siteName" = ?`,
            [safeSiteId, safeSiteName], 'تصاريح العمل');

        checkTable(`SELECT COUNT(*) as c FROM "Violations" WHERE "violationLocationId" = ? OR "violationLocation" = ?`,
            [safeSiteId, safeSiteName], 'سجل المخالفات');

        checkTable(`SELECT COUNT(*) as c FROM "GateVisitors" WHERE "Target Site" = ?`,
            [safeSiteName || safeSiteId], 'زوار البوابة');

        checkTable(`SELECT COUNT(*) as c FROM "ClinicVisits" WHERE "siteId" = ?`,
            [safeSiteId], 'العيادة');
    }

    if (safePlaceId || safePlaceName) {
        checkTable(`SELECT COUNT(*) as c FROM "DailyObservations" WHERE "placeId" = ? OR "locationName" = ?`,
            [safePlaceId, safePlaceName], 'الملاحظات اليومية');

        checkTable(`SELECT COUNT(*) as c FROM "PTW" WHERE "sublocationId" = ? OR "sublocationName" = ?`,
            [safePlaceId, safePlaceName], 'تصاريح العمل');

        checkTable(`SELECT COUNT(*) as c FROM "Violations" WHERE "violationPlaceId" = ? OR "violationPlace" = ?`,
            [safePlaceId, safePlaceName], 'سجل المخالفات');

        checkTable(`SELECT COUNT(*) as c FROM "GateVisitors" WHERE "Target Hall / Area" = ?`,
            [safePlaceName], 'زوار البوابة');
    }

    return {
        isUsed: totalCount > 0,
        totalCount,
        modules: modules.join('، ')
    };
}

function buildFormattedSites(db) {
    const sites = db.readSheet('Form_Sites') || [];
    const places = db.readSheet('Form_Places') || [];

    return sites.map((site) => {
        const siteId = String(site.id || '').trim();
        const sitePlaces = places
            .filter((p) => String(p.siteId || '').trim() === siteId && siteId !== '')
            .map((p) => ({ id: p.id || '', name: p.name || '' }));

        return {
            id: site.id,
            name: site.name || '',
            description: site.description || '',
            places: sitePlaces
        };
    });
}

function getDefaultFormSettings() {
    return {
        id: 'FORM-SETTINGS-1',
        sites: [],
        departments: [],
        safetyTeam: [],
        updatedAt: new Date().toISOString(),
        updatedBy: 'System'
    };
}

const formSettingsHandlers = {
    getFormSettings(payload, postData) {
        try {
            const db = getDatabase();
            const formattedSites = buildFormattedSites(db);
            let departments = (db.readSheet('Form_Departments') || [])
                .map((d) => String(d.name || '').trim())
                .filter(Boolean);
            if (departments.length === 0) {
                departments = buildPublicFormDepartments(db);
            }

            let safetyTeam = (db.readSheet('Form_SafetyTeam') || [])
                .map((m) => String(m.name || '').trim())
                .filter(Boolean);
            if (safetyTeam.length === 0) {
                safetyTeam = buildPublicFormSafetyMembers(db).map(m => m.name).filter(Boolean);
            }

            return {
                success: true,
                data: {
                    id: 'FORM-SETTINGS-1',
                    sites: formattedSites,
                    departments,
                    safetyTeam,
                    updatedAt: new Date().toISOString(),
                    updatedBy: 'System'
                }
            };
        } catch (err) {
            return {
                success: false,
                message: 'حدث خطأ أثناء قراءة إعدادات النماذج: ' + (err.message || err),
                data: getDefaultFormSettings()
            };
        }
    },

    checkLocationUsage(payload) {
        try {
            const db = getDatabase();
            const usage = checkLocationUsageInDatabase(db, {
                siteId: payload?.siteId,
                siteName: payload?.siteName,
                placeId: payload?.placeId,
                placeName: payload?.placeName
            });
            return {
                success: true,
                ...usage
            };
        } catch (e) {
            return { success: false, message: e.message };
        }
    },

    saveFormSettings(payload, postData, action, actorUserData) {
        const data = payload?.data || payload || postData?.data || postData || {};
        const userData = data.userData || data.user || actorUserData || {};
        const perm = checkFormSettingsPermission(userData, actorUserData);
        if (!perm.hasPermission) {
            return {
                success: false,
                message: perm.message || 'ليس لديك صلاحية لحفظ إعدادات النماذج',
                errorCode: 'PERMISSION_DENIED'
            };
        }

        let sites = parseJsonArray(data.sites, []);
        let departments = parseJsonArray(data.departments, []);
        let safetyTeam = parseJsonArray(data.safetyTeam, []);

        const duplicateCheck = validateSitesNoDuplicates(sites);
        if (!duplicateCheck.valid) {
            return {
                success: false,
                message: duplicateCheck.message || 'لا يمكن حفظ مواقع أو أماكن مكررة.',
                errorCode: 'DUPLICATE_ENTRY'
            };
        }

        const db = getDatabase();
        const nowIso = new Date().toISOString();
        const actorName = String(userData.name || userData.email || 'System').trim() || 'System';

        const existingSites = db.readSheet('Form_Sites') || [];
        const existingPlaces = db.readSheet('Form_Places') || [];
        const existingDepartments = db.readSheet('Form_Departments') || [];
        const existingSafetyTeam = db.readSheet('Form_SafetyTeam') || [];

        const sitesToSave = [];
        const placesToSave = [];

        sites.forEach((site, siteIndex) => {
            const siteName = String(site?.name || '').trim();
            if (!siteName) return;

            const siteId = String(site.id || '').trim() || generateId('SITE');
            sitesToSave.push({
                id: siteId,
                name: siteName,
                description: site.description || '',
                isActive: 'نشط',
                sortOrder: String(siteIndex),
                createdAt: site.createdAt || nowIso,
                updatedAt: nowIso,
                createdBy: site.createdBy || actorName,
                updatedBy: actorName
            });

            const places = Array.isArray(site.places) ? site.places : [];
            places.forEach((place, placeIndex) => {
                const placeName = String(place?.name || '').trim();
                if (!placeName) return;
                placesToSave.push({
                    id: String(place.id || '').trim() || generateId('PLACE'),
                    siteId,
                    siteName,
                    name: placeName,
                    description: place.description || '',
                    isActive: 'نشط',
                    sortOrder: String(placeIndex),
                    createdAt: place.createdAt || nowIso,
                    updatedAt: nowIso,
                    createdBy: place.createdBy || actorName,
                    updatedBy: actorName
                });
            });
        });

        // 🛡️ قفل الحذف للمواقع المرتبطة بسجلات سابقة
        const newSiteIds = new Set(sitesToSave.map(s => String(s.id).trim()));
        for (const exSite of existingSites) {
            const sId = String(exSite.id || '').trim();
            if (sId && !newSiteIds.has(sId)) {
                const usage = checkLocationUsageInDatabase(db, { siteId: sId, siteName: exSite.name });
                if (usage.isUsed) {
                    return {
                        success: false,
                        message: `قفل الحذف: لا يمكن حذف الموقع «${exSite.name || sId}» لوجود ${usage.totalCount} سجل مرتبط به في (${usage.modules}). يُرجى تعديل الاسم أو إلغاء تفعيله بدلاً من حذفه.`,
                        errorCode: 'REFERENTIAL_INTEGRITY_LOCKED',
                        details: usage
                    };
                }
            }
        }

        // 🛡️ قفل الحذف للأماكن الفرعية المرتبطة بسجلات سابقة
        const newPlaceIds = new Set(placesToSave.map(p => String(p.id).trim()));
        for (const exPlace of existingPlaces) {
            const pId = String(exPlace.id || '').trim();
            if (pId && !newPlaceIds.has(pId)) {
                const usage = checkLocationUsageInDatabase(db, { placeId: pId, placeName: exPlace.name });
                if (usage.isUsed) {
                    return {
                        success: false,
                        message: `قفل الحذف: لا يمكن حذف المكان الفرعي «${exPlace.name || pId}» لوجود ${usage.totalCount} سجل مرتبط به في (${usage.modules}). يُرجى تعديل الاسم أو إلغاء تفعيله بدلاً من حذفه.`,
                        errorCode: 'REFERENTIAL_INTEGRITY_LOCKED',
                        details: usage
                    };
                }
            }
        }

        db.saveToSheet('Form_Sites', sitesToSave);
        db.saveToSheet('Form_Places', placesToSave);

        const departmentsToSave = [];
        departments.forEach((dept, index) => {
            const deptName = typeof dept === 'string' ? dept : dept?.name;
            const name = String(deptName || '').trim();
            if (!name) return;
            const existing = existingDepartments.find((d) => String(d.name || '').trim() === name);
            departmentsToSave.push({
                id: existing?.id || generateId('DEPT'),
                name,
                description: typeof dept === 'object' ? (dept.description || '') : '',
                isActive: 'نشط',
                sortOrder: String(index),
                createdAt: existing?.createdAt || nowIso,
                updatedAt: nowIso,
                createdBy: existing?.createdBy || actorName,
                updatedBy: actorName
            });
        });

        const safetyToSave = [];
        safetyTeam.forEach((member, index) => {
            const memberName = typeof member === 'string' ? member : member?.name;
            const name = String(memberName || '').trim();
            if (!name) return;
            const existing = existingSafetyTeam.find((m) => String(m.name || '').trim() === name);
            safetyToSave.push({
                id: existing?.id || generateId('SAFE'),
                name,
                position: typeof member === 'object' ? (member.position || '') : '',
                phone: typeof member === 'object' ? (member.phone || '') : '',
                email: typeof member === 'object' ? (member.email || '') : '',
                isActive: 'نشط',
                sortOrder: String(index),
                createdAt: existing?.createdAt || nowIso,
                updatedAt: nowIso,
                createdBy: existing?.createdBy || actorName,
                updatedBy: actorName
            });
        });

        if (departmentsToSave.length > 0) {
            db.saveToSheet('Form_Departments', departmentsToSave);
        }
        if (safetyToSave.length > 0) {
            db.saveToSheet('Form_SafetyTeam', safetyToSave);
        }

        return {
            success: true,
            message: `تم حفظ إعدادات النماذج: ${sitesToSave.length} موقع، ${placesToSave.length} مكان`,
            sitesCount: sitesToSave.length,
            placesCount: placesToSave.length
        };
    }
};

function buildPublicFormSafetyMembers(db) {
    const seen = new Set();
    const members = [];

    function addMember(raw) {
        if (!raw || typeof raw !== 'object') return;
        const name = String(raw.name || raw.fullName || '').trim();
        if (!name) return;
        const key = name.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        members.push({
            name,
            id: String(raw.id || '').trim(),
            role: String(raw.role || raw.jobTitle || raw.position || '').trim()
        });
    }

    (db.readSheet('Form_SafetyTeam') || []).forEach(addMember);
    (db.readSheet('SafetyTeamMembers') || []).forEach(addMember);
    return members;
}

function buildPublicFormDepartments(db) {
    const list = (db.readSheet('Form_Departments') || [])
        .map((d) => String(d.name || d || '').trim())
        .filter(Boolean);
    if (list.length > 0) return list;

    const deptRows = (db.readSheet('Departments') || [])
        .map((d) => String(d.name || d.department || d['Department Name'] || d || '').trim())
        .filter(Boolean);
    if (deptRows.length > 0) return Array.from(new Set(deptRows));

    const empDepts = (db.readSheet('Employees') || [])
        .map(e => String(e.department || e['Department'] || '').trim())
        .filter(Boolean);
    if (empDepts.length > 0) return Array.from(new Set(empDepts));

    return [
        'إدارة السلامة والصحة المهنية',
        'إدارة الصيانة',
        'إدارة الإنتاج',
        'إدارة الجودة',
        'إدارة المخازن',
        'إدارة الموارد البشرية',
        'إدارة الأمن والحراسة',
        'إدارة المشروعات',
        'إدارة المشتريات',
        'إدارة الخدمات اللوجستية',
        'إدارة الزراعة',
        'الإدارة المالية',
        'إدارة تكنولوجيا المعلومات',
        'الإدارة العامة'
    ];
}

module.exports = {
    ...formSettingsHandlers,
    checkLocationUsageInDatabase,
    buildFormattedSites,
    buildPublicFormSafetyMembers,
    buildPublicFormDepartments
};
