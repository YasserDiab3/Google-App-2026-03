/**
 * UserVersionTracking.gs — تتبّع إصدار التطبيق لكل مستخدم
 *
 * الهدف: السماح للمدير بمعرفة:
 *   - أي إصدار يعمل عليه كل مستخدم حالياً
 *   - متى آخر مرة فُتح التطبيق من قبل كل مستخدم
 *   - مَن لم يُحدّث إلى الإصدار الأخير بعد
 *   - توزيع المستخدمين على الإصدارات (للوحة الإدارة)
 *
 * تصميم البيانات: صف واحد لكل مستخدم في ورقة "UserVersions" (upsert بـ userId)
 *
 * الحقول (Headers.gs):
 *   id, userId, userEmail, userName, userRole, userDepartment,
 *   currentVersion, firstSeenVersion, previousVersion,
 *   lastSeenAt, firstSeenAt,
 *   sessionCount, reportCount,
 *   userAgent, platform, isMobile, screenSize, language, updatedAt
 */

var USER_VERSIONS_SHEET = 'UserVersions';

/**
 * تسجيل/تحديث إصدار التطبيق لمستخدم.
 * تُستدعى من الواجهة الأمامية بعد تسجيل الدخول وعند الـ heartbeat الدوري.
 *
 * @param {Object} payload
 * @param {string} payload.userId
 * @param {string} payload.userEmail
 * @param {string} payload.userName
 * @param {string} payload.userRole
 * @param {string} payload.userDepartment
 * @param {string} payload.version - إصدار التطبيق الحالي (مثل "1.0.46")
 * @param {string} [payload.userAgent]
 * @param {string} [payload.platform]
 * @param {boolean} [payload.isMobile]
 * @param {string} [payload.screenSize]
 * @param {string} [payload.language]
 * @param {boolean} [payload.isNewSession] - إذا كان login جديد (لزيادة sessionCount)
 * @returns {{ success: boolean, message: string, isNewUser?: boolean, versionChanged?: boolean }}
 */
function reportUserVersion(payload) {
    try {
        if (!payload || typeof payload !== 'object') {
            return { success: false, message: 'بيانات الطلب فارغة' };
        }

        var userId = String(payload.userId || '').trim();
        var userEmail = String(payload.userEmail || '').trim().toLowerCase();
        var version = String(payload.version || '').trim();

        // المفتاح الأساسي = userId، fallback لـ email لو userId فارغ
        var primaryKey = userId || userEmail;
        if (!primaryKey) {
            return { success: false, message: 'لا يوجد userId ولا email' };
        }
        if (!version) {
            return { success: false, message: 'الإصدار مطلوب' };
        }

        var spreadsheetId = getSpreadsheetId();
        var now = new Date();
        var nowIso = now.toISOString();

        // محاولة قراءة الصف الموجود (lookup بـ userId أو email)
        var existing = null;
        try {
            var existingRows = readFromSheet(USER_VERSIONS_SHEET, spreadsheetId);
            if (Array.isArray(existingRows) && existingRows.length > 0) {
                for (var i = 0; i < existingRows.length; i++) {
                    var r = existingRows[i];
                    if (!r) continue;
                    var rUserId = String(r.userId || '').trim();
                    var rEmail = String(r.userEmail || '').trim().toLowerCase();
                    if ((userId && rUserId === userId) || (userEmail && rEmail === userEmail)) {
                        existing = r;
                        break;
                    }
                }
            }
        } catch (readErr) {
            Logger.log('reportUserVersion: تعذّر قراءة UserVersions (أول مرة؟): ' + readErr.toString());
        }

        var isNewUser = !existing;
        var versionChanged = existing && existing.currentVersion !== version;

        var record;
        if (existing) {
            // تحديث الصف الموجود
            var prevSessionCount = parseInt(existing.sessionCount, 10);
            if (isNaN(prevSessionCount)) prevSessionCount = 0;
            var prevReportCount = parseInt(existing.reportCount, 10);
            if (isNaN(prevReportCount)) prevReportCount = 0;

            record = {
                id: existing.id || primaryKey,
                userId: userId || existing.userId || '',
                userEmail: userEmail || existing.userEmail || '',
                userName: String(payload.userName || existing.userName || '').trim(),
                userRole: String(payload.userRole || existing.userRole || '').trim(),
                userDepartment: String(payload.userDepartment || existing.userDepartment || '').trim(),
                currentVersion: version,
                firstSeenVersion: existing.firstSeenVersion || version,
                previousVersion: versionChanged ? existing.currentVersion : (existing.previousVersion || ''),
                lastSeenAt: nowIso,
                firstSeenAt: existing.firstSeenAt || nowIso,
                sessionCount: payload.isNewSession ? (prevSessionCount + 1) : prevSessionCount,
                reportCount: prevReportCount + 1,
                userAgent: String(payload.userAgent || existing.userAgent || ''),
                platform: String(payload.platform || existing.platform || ''),
                isMobile: payload.isMobile !== undefined ? !!payload.isMobile : !!existing.isMobile,
                screenSize: String(payload.screenSize || existing.screenSize || ''),
                language: String(payload.language || existing.language || ''),
                updatedAt: nowIso
            };
        } else {
            // إنشاء صف جديد
            record = {
                id: primaryKey,
                userId: userId,
                userEmail: userEmail,
                userName: String(payload.userName || '').trim(),
                userRole: String(payload.userRole || '').trim(),
                userDepartment: String(payload.userDepartment || '').trim(),
                currentVersion: version,
                firstSeenVersion: version,
                previousVersion: '',
                lastSeenAt: nowIso,
                firstSeenAt: nowIso,
                sessionCount: payload.isNewSession ? 1 : 0,
                reportCount: 1,
                userAgent: String(payload.userAgent || ''),
                platform: String(payload.platform || ''),
                isMobile: !!payload.isMobile,
                screenSize: String(payload.screenSize || ''),
                language: String(payload.language || ''),
                updatedAt: nowIso
            };
        }

        // upsert: نستخدم saveToSheet مع كائن واحد — يحدّث الصف بنفس id أو يضيفه
        var saveResult = saveToSheet(USER_VERSIONS_SHEET, record, spreadsheetId);
        if (!saveResult || !saveResult.success) {
            return {
                success: false,
                message: 'فشل حفظ بيانات الإصدار: ' + (saveResult ? saveResult.message : 'unknown')
            };
        }

        return {
            success: true,
            message: 'تم تسجيل الإصدار',
            isNewUser: isNewUser,
            versionChanged: !!versionChanged,
            version: version
        };
    } catch (error) {
        Logger.log('reportUserVersion error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * يُرجع جميع سجلات إصدارات المستخدمين (لعرض المدير).
 * يضيف حقل isOutdated محسوب ديناميكياً بمقارنة currentVersion بـ latestVersion المُمرَّر.
 *
 * @param {Object} [payload]
 * @param {string} [payload.latestVersion] - الإصدار الأحدث للمقارنة (يُحدَّد منه isOutdated)
 * @returns {{ success: boolean, data: Array, total: number, latestVersion: string }}
 */
function getAllUserVersions(payload) {
    try {
        var latestVersion = String((payload && payload.latestVersion) || '').trim();
        var spreadsheetId = getSpreadsheetId();
        var rows = readFromSheet(USER_VERSIONS_SHEET, spreadsheetId);
        if (!Array.isArray(rows)) rows = [];

        // إضافة isOutdated لكل صف
        var enriched = rows.map(function (r) {
            if (!r) return null;
            var cur = String(r.currentVersion || '').trim();
            var isOutdated = false;
            if (latestVersion && cur && cur !== latestVersion) {
                isOutdated = compareSemver_(cur, latestVersion) < 0;
            }
            return Object.assign({}, r, { isOutdated: isOutdated });
        }).filter(function (r) { return r !== null; });

        // ترتيب: الإصدارات القديمة أولاً، ثم آخر مشاهدة (الأحدث أولاً)
        enriched.sort(function (a, b) {
            if (a.isOutdated !== b.isOutdated) return a.isOutdated ? -1 : 1;
            var da = a.lastSeenAt ? new Date(a.lastSeenAt).getTime() : 0;
            var db = b.lastSeenAt ? new Date(b.lastSeenAt).getTime() : 0;
            return db - da;
        });

        return {
            success: true,
            data: enriched,
            total: enriched.length,
            latestVersion: latestVersion
        };
    } catch (error) {
        Logger.log('getAllUserVersions error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString(), data: [], total: 0 };
    }
}

/**
 * إحصائيات سريعة عن توزيع المستخدمين على الإصدارات (لكروت لوحة المدير).
 * @param {Object} [payload]
 * @param {string} [payload.latestVersion]
 * @returns {{ success, totalUsers, latestUsers, outdatedUsers, activeLast24h, activeLast7d, byVersion, latestVersion }}
 */
function getUserVersionStats(payload) {
    try {
        var latestVersion = String((payload && payload.latestVersion) || '').trim();
        var spreadsheetId = getSpreadsheetId();
        var rows = readFromSheet(USER_VERSIONS_SHEET, spreadsheetId);
        if (!Array.isArray(rows)) rows = [];

        var byVersion = {};
        var latestUsers = 0;
        var outdatedUsers = 0;
        var activeLast24h = 0;
        var activeLast7d = 0;
        var now = Date.now();
        var DAY = 86400000;

        rows.forEach(function (r) {
            if (!r) return;
            var cur = String(r.currentVersion || 'غير محدد').trim() || 'غير محدد';
            byVersion[cur] = (byVersion[cur] || 0) + 1;

            if (latestVersion && cur === latestVersion) {
                latestUsers++;
            } else if (latestVersion && cur) {
                outdatedUsers++;
            }

            if (r.lastSeenAt) {
                try {
                    var lastTime = new Date(r.lastSeenAt).getTime();
                    if (!isNaN(lastTime)) {
                        if (now - lastTime <= DAY) activeLast24h++;
                        if (now - lastTime <= 7 * DAY) activeLast7d++;
                    }
                } catch (e) {}
            }
        });

        // ترتيب الإصدارات تنازلياً
        var byVersionArray = Object.keys(byVersion).map(function (v) {
            return { version: v, count: byVersion[v] };
        }).sort(function (a, b) {
            // الإصدار الأحدث في الأعلى (semver comparison)
            return compareSemver_(b.version, a.version);
        });

        return {
            success: true,
            totalUsers: rows.length,
            latestUsers: latestUsers,
            outdatedUsers: outdatedUsers,
            activeLast24h: activeLast24h,
            activeLast7d: activeLast7d,
            byVersion: byVersionArray,
            latestVersion: latestVersion
        };
    } catch (error) {
        Logger.log('getUserVersionStats error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * مقارنة semver — يُرجع -1 / 0 / 1
 *   compareSemver_('1.0.5', '1.0.10') === -1
 *   compareSemver_('1.0.10', '1.0.5') === 1
 *   compareSemver_('1.0.5', '1.0.5')  === 0
 * يتعامل مع غير الأرقام كـ 0.
 */
function compareSemver_(a, b) {
    var pa = String(a || '0').split('.').map(function (p) { return parseInt(p, 10) || 0; });
    var pb = String(b || '0').split('.').map(function (p) { return parseInt(p, 10) || 0; });
    var len = Math.max(pa.length, pb.length);
    for (var i = 0; i < len; i++) {
        var x = pa[i] || 0;
        var y = pb[i] || 0;
        if (x < y) return -1;
        if (x > y) return 1;
    }
    return 0;
}
