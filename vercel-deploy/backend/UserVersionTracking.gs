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
 * يقرأ كل المستخدمين النشطين من ورقة Users (المصدر الموثَّق لعدد المستخدمين الكلي).
 * يُستخدم لمعرفة من سجَّل/لم يُسجِّل إصداره بعد.
 * @private
 */
function _readActiveUsers_(spreadsheetId) {
    try {
        var users = readFromSheet('Users', spreadsheetId);
        if (!Array.isArray(users)) return [];
        return users.filter(function (u) {
            if (!u) return false;
            // اعتبر المستخدم نشطاً إن لم يكن active === false صراحةً
            var active = u.active;
            if (active === false || active === 'false' || active === 0 || active === '0') return false;
            return !!(u.id || u.email);
        });
    } catch (e) {
        Logger.log('_readActiveUsers_: فشل قراءة Users: ' + e.toString());
        return [];
    }
}

/**
 * يُرجع جميع سجلات إصدارات المستخدمين (لعرض المدير).
 * يضيف حقل isOutdated محسوب ديناميكياً بمقارنة currentVersion بـ latestVersion المُمرَّر.
 * ✅ يدمج أيضاً المستخدمين المسجَّلين في Users لكن لم يُبلِّغوا عن إصدارهم بعد
 *    (يظهرون بحالة "لم يُسجَّل بعد").
 *
 * @param {Object} [payload]
 * @param {string} [payload.latestVersion] - الإصدار الأحدث للمقارنة (يُحدَّد منه isOutdated)
 * @returns {{ success: boolean, data: Array, total: number, reported: number, notReported: number, latestVersion: string }}
 */
function getAllUserVersions(payload) {
    try {
        var latestVersion = String((payload && payload.latestVersion) || '').trim();
        var spreadsheetId = getSpreadsheetId();

        var rows = [];
        try {
            rows = readFromSheet(USER_VERSIONS_SHEET, spreadsheetId);
            if (!Array.isArray(rows)) rows = [];
        } catch (e) { rows = []; }

        // إضافة isOutdated لكل صف من UserVersions
        var enriched = rows.map(function (r) {
            if (!r) return null;
            var cur = String(r.currentVersion || '').trim();
            var isOutdated = false;
            if (latestVersion && cur && cur !== latestVersion) {
                isOutdated = compareSemver_(cur, latestVersion) < 0;
            }
            return Object.assign({}, r, { isOutdated: isOutdated, hasReport: true });
        }).filter(function (r) { return r !== null; });

        // ✅ دمج المستخدمين الذين لم يُبلِّغوا بعد (موجودون في Users فقط)
        var activeUsers = _readActiveUsers_(spreadsheetId);
        var reportedIds = {};
        var reportedEmails = {};
        enriched.forEach(function (r) {
            var rid = String(r.userId || '').trim();
            var rem = String(r.userEmail || '').trim().toLowerCase();
            if (rid) reportedIds[rid] = true;
            if (rem) reportedEmails[rem] = true;
        });

        activeUsers.forEach(function (u) {
            var uid = String(u.id || '').trim();
            var em = String(u.email || '').trim().toLowerCase();
            // لو هذا المستخدم بلَّغ بالفعل → تخطّي
            if (uid && reportedIds[uid]) return;
            if (em && reportedEmails[em]) return;

            // مستخدم بدون تقرير — أضفه كصف "لم يُسجَّل بعد"
            enriched.push({
                id: uid || em,
                userId: uid,
                userEmail: em,
                userName: String(u.name || '').trim(),
                userRole: String(u.role || '').trim(),
                userDepartment: String(u.department || '').trim(),
                currentVersion: '',
                firstSeenVersion: '',
                previousVersion: '',
                lastSeenAt: '',
                firstSeenAt: '',
                sessionCount: 0,
                reportCount: 0,
                userAgent: '',
                platform: '',
                isMobile: false,
                screenSize: '',
                language: '',
                updatedAt: '',
                isOutdated: false,
                hasReport: false
            });
        });

        // ترتيب:
        // 1) لم يُسجَّل بعد (أعلى أولوية للظهور — تحتاج متابعة)
        // 2) قديم
        // 3) محدّث، الأحدث نشاطاً أولاً
        enriched.sort(function (a, b) {
            // not-reported أولاً
            if (a.hasReport !== b.hasReport) return a.hasReport ? 1 : -1;
            // ثم القديم قبل المحدّث
            if (a.isOutdated !== b.isOutdated) return a.isOutdated ? -1 : 1;
            // ثم آخر مشاهدة (الأحدث أولاً)
            var da = a.lastSeenAt ? new Date(a.lastSeenAt).getTime() : 0;
            var db = b.lastSeenAt ? new Date(b.lastSeenAt).getTime() : 0;
            return db - da;
        });

        var reportedCount = enriched.filter(function (r) { return r.hasReport; }).length;

        return {
            success: true,
            data: enriched,
            total: enriched.length,
            reported: reportedCount,
            notReported: enriched.length - reportedCount,
            latestVersion: latestVersion
        };
    } catch (error) {
        Logger.log('getAllUserVersions error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString(), data: [], total: 0 };
    }
}

/**
 * إحصائيات سريعة عن توزيع المستخدمين على الإصدارات (لكروت لوحة المدير).
 * ✅ يجمع البيانات من ورقتين:
 *   - Users (للعدد الإجمالي الموثَّق للمستخدمين النشطين)
 *   - UserVersions (لتفاصيل الإصدارات لمن فتحوا التطبيق)
 *
 * @param {Object} [payload]
 * @param {string} [payload.latestVersion]
 * @returns {{
 *   success: boolean,
 *   totalUsers: number,          // إجمالي المستخدمين النشطين في Users
 *   reportedUsers: number,       // عدد من بلَّغوا عن إصدارهم
 *   notReportedUsers: number,    // عدد من لم يفتحوا التطبيق بعد
 *   latestUsers: number,         // على الإصدار الأحدث
 *   outdatedUsers: number,       // على إصدار قديم
 *   activeLast24h: number,
 *   activeLast7d: number,
 *   byVersion: Array,
 *   latestVersion: string
 * }}
 */
function getUserVersionStats(payload) {
    try {
        var latestVersion = String((payload && payload.latestVersion) || '').trim();
        var spreadsheetId = getSpreadsheetId();

        // 1) اقرأ UserVersions (قد لا تكون موجودة بعد إذا لم يُبلِّغ أحد)
        var rows = [];
        try {
            rows = readFromSheet(USER_VERSIONS_SHEET, spreadsheetId);
            if (!Array.isArray(rows)) rows = [];
        } catch (e) { rows = []; }

        // 2) اقرأ Users (المصدر الموثَّق للعدد الإجمالي)
        var activeUsers = _readActiveUsers_(spreadsheetId);
        var totalUsers = activeUsers.length;

        var byVersion = {};
        var latestUsers = 0;
        var outdatedUsers = 0;
        var activeLast24h = 0;
        var activeLast7d = 0;
        var now = Date.now();
        var DAY = 86400000;

        rows.forEach(function (r) {
            if (!r) return;
            var cur = String(r.currentVersion || '').trim();
            if (!cur) return; // تخطّي الصفوف بدون إصدار صريح
            byVersion[cur] = (byVersion[cur] || 0) + 1;

            if (latestVersion && cur === latestVersion) {
                latestUsers++;
            } else if (latestVersion) {
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

        // ✅ احسب من لم يُبلِّغ بعد (موجود في Users لكن ليس في UserVersions)
        var reportedIds = {};
        var reportedEmails = {};
        rows.forEach(function (r) {
            if (!r) return;
            var rid = String(r.userId || '').trim();
            var rem = String(r.userEmail || '').trim().toLowerCase();
            if (rid) reportedIds[rid] = true;
            if (rem) reportedEmails[rem] = true;
        });
        var reportedCount = 0;
        activeUsers.forEach(function (u) {
            var uid = String(u.id || '').trim();
            var em = String(u.email || '').trim().toLowerCase();
            if ((uid && reportedIds[uid]) || (em && reportedEmails[em])) {
                reportedCount++;
            }
        });
        var notReportedUsers = Math.max(0, totalUsers - reportedCount);

        // ✅ أضف "لم يُسجَّل بعد" للتوزيع لو كان فيه
        if (notReportedUsers > 0) {
            byVersion['لم يُسجَّل بعد'] = notReportedUsers;
        }

        // ترتيب الإصدارات: الـ "لم يُسجَّل" في النهاية، ثم semver تنازلياً
        var byVersionArray = Object.keys(byVersion).map(function (v) {
            return { version: v, count: byVersion[v] };
        }).sort(function (a, b) {
            var aNotReported = a.version === 'لم يُسجَّل بعد';
            var bNotReported = b.version === 'لم يُسجَّل بعد';
            if (aNotReported !== bNotReported) return aNotReported ? 1 : -1;
            return compareSemver_(b.version, a.version);
        });

        return {
            success: true,
            totalUsers: totalUsers,
            reportedUsers: reportedCount,
            notReportedUsers: notReportedUsers,
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
