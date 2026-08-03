/**
 * Google Apps Script for HSE System - Logs Module
 * 
 * موديول السجلات - النسخة المحسنة
 */

/**
 * ============================================
 * سجلات التدقيق (Audit Logs)
 * ============================================
 */

/**
 * إضافة سجل تدقيق
 */
function addAuditLogToSheet(logData) {
    try {
        if (!logData) {
            return { success: false, message: 'بيانات السجل غير موجودة' };
        }
        
        const sheetName = 'AuditLog';
        
        // إضافة حقول تلقائية
        if (!logData.id) {
            logData.id = Utilities.getUuid();
        }
        if (!logData.timestamp) {
            logData.timestamp = new Date();
        }
        if (!logData.createdAt) {
            logData.createdAt = new Date();
        }
        
        return appendToSheet(sheetName, logData);
    } catch (error) {
        Logger.log('Error in addAuditLogToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة السجل: ' + error.toString() };
    }
}

/**
 * الحصول على جميع سجلات التدقيق
 */
function getAllAuditLogs(filters = {}) {
    try {
        const sheetName = 'AuditLog';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.userId) {
            data = data.filter(log => log.userId === filters.userId);
        }
        if (filters.action) {
            data = data.filter(log => log.action === filters.action);
        }
        if (filters.module) {
            data = data.filter(log => log.module === filters.module);
        }
        if (filters.startDate) {
            data = data.filter(log => {
                if (!log.timestamp) return false;
                return new Date(log.timestamp) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(log => {
                if (!log.timestamp) return false;
                return new Date(log.timestamp) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب الوقت
        data.sort((a, b) => {
            const dateA = new Date(a.timestamp || a.createdAt || 0);
            const dateB = new Date(b.timestamp || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all audit logs: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة السجلات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * سجلات نشاط المستخدم (User Activity Logs)
 * ============================================
 */

/**
 * إضافة سجل نشاط المستخدم
 */
function addUserActivityLogToSheet(logData) {
    try {
        if (!logData) {
            return { success: false, message: 'بيانات السجل غير موجودة' };
        }

        // توافق مع أوراق قديمة (userName / activity)
        if (logData.username && !logData.userName) {
            logData.userName = logData.username;
        }
        if (logData.actionType && !logData.activity) {
            logData.activity = logData.actionType;
        }
        
        const sheetName = 'UserActivityLog';
        
        // إضافة حقول تلقائية
        if (!logData.id) {
            logData.id = Utilities.getUuid();
        }
        if (!logData.timestamp) {
            logData.timestamp = new Date();
        }
        if (!logData.createdAt) {
            logData.createdAt = new Date();
        }
        
        return appendToSheet(sheetName, logData);
    } catch (error) {
        Logger.log('Error in addUserActivityLogToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة السجل: ' + error.toString() };
    }
}

/**
 * الحصول على جميع سجلات نشاط المستخدم
 */
function getAllUserActivityLogs(filters = {}) {
    try {
        const sheetName = 'UserActivityLog';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.userId) {
            data = data.filter(log => log.userId === filters.userId);
        }
        // دعم كلا من 'activity' و 'actionType' للتوافق
        if (filters.activity) {
            data = data.filter(log => log.activity === filters.activity || log.actionType === filters.activity);
        }
        if (filters.actionType) {
            data = data.filter(log => log.actionType === filters.actionType || log.activity === filters.actionType);
        }
        if (filters.module) {
            data = data.filter(log => log.module === filters.module);
        }
        if (filters.startDate) {
            data = data.filter(log => {
                if (!log.timestamp) return false;
                return new Date(log.timestamp) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(log => {
                if (!log.timestamp) return false;
                return new Date(log.timestamp) <= new Date(filters.endDate);
            });
        }
        if (filters.sessionId) {
            const sid = String(filters.sessionId).trim();
            data = data.filter(log => String(log.sessionId || '').trim() === sid);
        }
        
        // ترتيب حسب الوقت
        data.sort((a, b) => {
            const dateA = new Date(a.timestamp || a.createdAt || 0);
            const dateB = new Date(b.timestamp || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all user activity logs: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة السجلات: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على سجلات نشاط مستخدم محدد
 */
function getUserActivityLogs(userId, filters = {}) {
    try {
        filters.userId = userId;
        return getAllUserActivityLogs(filters);
    } catch (error) {
        Logger.log('Error getting user activity logs: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة السجلات: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على إحصائيات السجلات
 */
function getLogStatistics(filters = {}) {
    try {
        const auditLogs = getAllAuditLogs(filters);
        const activityLogs = getAllUserActivityLogs(filters);
        
        if (!auditLogs.success || !activityLogs.success) {
            return { success: false, message: 'فشل في قراءة السجلات' };
        }
        
        const stats = {
            totalAuditLogs: auditLogs.count,
            totalActivityLogs: activityLogs.count,
            byAction: {},
            byModule: {},
            byUser: {},
            byActivity: {},
            recentActivity: []
        };
        
        // إحصائيات سجلات التدقيق
        auditLogs.data.forEach(log => {
            if (log.action) {
                stats.byAction[log.action] = (stats.byAction[log.action] || 0) + 1;
            }
            if (log.module) {
                stats.byModule[log.module] = (stats.byModule[log.module] || 0) + 1;
            }
            if (log.userId) {
                stats.byUser[log.userId] = (stats.byUser[log.userId] || 0) + 1;
            }
        });
        
        // إحصائيات سجلات النشاط
        activityLogs.data.forEach(log => {
            const actKey = log.activity || log.actionType;
            if (actKey) {
                stats.byActivity[actKey] = (stats.byActivity[actKey] || 0) + 1;
            }
            if (log.module) {
                stats.byModule[log.module] = (stats.byModule[log.module] || 0) + 1;
            }
            if (log.userId) {
                stats.byUser[log.userId] = (stats.byUser[log.userId] || 0) + 1;
            }
        });
        
        // النشاط الأخير (آخر 10)
        const allLogs = auditLogs.data.concat(activityLogs.data);
        allLogs.sort((a, b) => {
            const dateA = new Date(a.timestamp || a.createdAt || 0);
            const dateB = new Date(b.timestamp || b.createdAt || 0);
            return dateB - dateA;
        });
        stats.recentActivity = allLogs.slice(0, 10);
        
        return { success: true, data: stats };
    } catch (error) {
        Logger.log('Error getting log statistics: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حساب الإحصائيات: ' + error.toString() };
    }
}

/**
 * مساعد: نوع الحدث الموحّد من سجل النشاط
 */
function ualNormalizedAction_(log) {
    return String((log && (log.actionType || log.activity)) || '').toLowerCase();
}

/**
 * مساعد: مفتاح المستخدم للتجميع
 */
function ualUserKey_(log) {
    const e = String((log && (log.userEmail || log.email)) || '').trim().toLowerCase();
    if (e) return 'em:' + e;
    const id = String((log && (log.userId || log.userID)) || '').trim();
    if (id) return 'id:' + id;
    const n = String((log && (log.username || log.userName)) || '').trim().toLowerCase();
    return 'nm:' + (n || 'unknown');
}

/**
 * مساعد: طابع زمني للسجل
 */
function ualLogTimestamp_(log) {
    return new Date((log && (log.timestamp || log.createdAt)) || 0);
}

/**
 * مساعد: تاريخ السجل بصيغة yyyy-MM-dd في المنطقة الزمنية المحددة
 */
function ualLogDateInTz_(log, tz) {
    try {
        const zone = tz || Session.getScriptTimeZone();
        return Utilities.formatDate(ualLogTimestamp_(log), zone, 'yyyy-MM-dd');
    } catch (e) {
        return '';
    }
}

/**
 * مساعد: ملخص حدث للتقرير (نص مختصر)
 */
function ualLogSummary_(ev) {
    let det = ev.details;
    if (det && typeof det !== 'string') {
        try {
            det = JSON.stringify(det);
        } catch (e) {
            det = String(det);
        }
    }
    det = String(det || '');
    if (det.length > 200) det = det.substring(0, 200) + '…';
    return {
        id: ev.id || '',
        timestamp: ev.timestamp || ev.createdAt || '',
        actionType: ev.actionType || ev.activity || '',
        module: ev.module || '',
        details: det
    };
}

/**
 * تقرير يومي: تجميع الجلسات (مع sessionId أو استنتاج من login/logout للبيانات القديمة)
 * @param {Object} filters - { date: 'yyyy-MM-dd', timezone: optional IANA (يُفضّل تمريرها من الواجهة) }
 */
function getDailyUserSessionActivityReport(filters) {
    filters = filters || {};
    try {
        const tz = filters.timezone || Session.getScriptTimeZone();
        let dateStr = filters.date;
        if (!dateStr || typeof dateStr !== 'string') {
            dateStr = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
        }

        const sheetRes = readFromSheet('UserActivityLog', getSpreadsheetId());
        if (!Array.isArray(sheetRes)) {
            return { success: false, message: 'تعذر قراءة سجل النشاط', date: dateStr, timezone: tz, sessions: [], count: 0, rawLogCount: 0 };
        }

        const dayLogs = sheetRes.filter(function (log) {
            return ualLogDateInTz_(log, tz) === dateStr;
        });

        dayLogs.sort(function (a, b) {
            return ualLogTimestamp_(a) - ualLogTimestamp_(b);
        });

        const groups = {};
        const inferOpen = {};

        function ensureGroup(key, meta) {
            if (!groups[key]) {
                groups[key] = {
                    sessionKey: key,
                    sessionId: meta.sessionId || '',
                    inferred: !!meta.inferred,
                    orphan: !!meta.orphan,
                    userKey: meta.userKey || '',
                    userEmail: meta.userEmail || '',
                    username: meta.username || '',
                    loginAt: null,
                    logoutAt: null,
                    eventCount: 0,
                    events: [],
                    note: ''
                };
            }
            return groups[key];
        }

        for (let i = 0; i < dayLogs.length; i++) {
            const log = dayLogs[i];
            const uk = ualUserKey_(log);
            const sid = String((log.sessionId || '')).trim();
            const act = ualNormalizedAction_(log);
            const uemail = String((log.userEmail || log.email || '')).trim();
            const uname = String((log.username || log.userName || '')).trim();

            if (sid) {
                const gkeyS = 'S|' + uk + '|' + sid;
                const gS = ensureGroup(gkeyS, { sessionId: sid, userKey: uk, userEmail: uemail, username: uname });
                if (!gS.userEmail && uemail) gS.userEmail = uemail;
                if (!gS.username && uname) gS.username = uname;
                gS.events.push(ualLogSummary_(log));
                gS.eventCount++;
                if (act === 'login' && !gS.loginAt) gS.loginAt = log.timestamp || log.createdAt;
                if (act === 'logout') gS.logoutAt = log.timestamp || log.createdAt;
                continue;
            }

            if (act === 'login') {
                if (inferOpen[uk]) {
                    const prevId = inferOpen[uk].inferredId;
                    const prevKey = 'I|' + uk + '|' + prevId;
                    if (groups[prevKey] && !groups[prevKey].logoutAt) {
                        groups[prevKey].note = 'أُغلقت تلقائياً عند تسجيل دخول لاحق في نفس اليوم';
                    }
                    delete inferOpen[uk];
                }
                const infId = 'INF_' + String(i) + '_' + String((log.id || 'x')).replace(/[^a-zA-Z0-9]/g, '').slice(-8);
                inferOpen[uk] = { inferredId: infId };
                const gkeyI = 'I|' + uk + '|' + infId;
                const gI = ensureGroup(gkeyI, { inferred: true, userKey: uk, userEmail: uemail, username: uname });
                if (!gI.userEmail && uemail) gI.userEmail = uemail;
                if (!gI.username && uname) gI.username = uname;
                gI.loginAt = log.timestamp || log.createdAt;
                gI.events.push(ualLogSummary_(log));
                gI.eventCount++;
            } else if (act === 'logout') {
                const open = inferOpen[uk];
                if (open && open.inferredId) {
                    const gkeyL = 'I|' + uk + '|' + open.inferredId;
                    const gL = groups[gkeyL];
                    if (gL) {
                        gL.events.push(ualLogSummary_(log));
                        gL.eventCount++;
                        gL.logoutAt = log.timestamp || log.createdAt;
                    }
                    delete inferOpen[uk];
                } else {
                    const gkeyO = 'O|' + uk + '|logout_only_' + i;
                    const gO = ensureGroup(gkeyO, { inferred: true, orphan: true, userKey: uk, userEmail: uemail, username: uname });
                    gO.logoutAt = log.timestamp || log.createdAt;
                    gO.events.push(ualLogSummary_(log));
                    gO.eventCount++;
                }
            } else {
                const op = inferOpen[uk];
                if (op && op.inferredId) {
                    const gkeyA = 'I|' + uk + '|' + op.inferredId;
                    const gA = groups[gkeyA];
                    if (gA) {
                        gA.events.push(ualLogSummary_(log));
                        gA.eventCount++;
                    }
                } else {
                    const gkeyOr = 'O|' + uk + '|orphan';
                    const gOr = ensureGroup(gkeyOr, { inferred: true, orphan: true, userKey: uk, userEmail: uemail, username: uname });
                    gOr.events.push(ualLogSummary_(log));
                    gOr.eventCount++;
                }
            }
        }

        const sessions = Object.keys(groups).map(function (k) {
            return groups[k];
        });
        sessions.sort(function (a, b) {
            const ta = a.loginAt ? new Date(a.loginAt) : (a.events[0] ? new Date(a.events[0].timestamp) : 0);
            const tb = b.loginAt ? new Date(b.loginAt) : (b.events[0] ? new Date(b.events[0].timestamp) : 0);
            return ta - tb;
        });

        return {
            success: true,
            date: dateStr,
            timezone: tz,
            rawLogCount: dayLogs.length,
            sessions: sessions,
            count: sessions.length
        };
    } catch (error) {
        Logger.log('getDailyUserSessionActivityReport: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString(), sessions: [], count: 0, rawLogCount: 0 };
    }
}

/**
 * مستلمو البريد اليومي: Script Properties ثم مديرو Users
 */
function getDailyActivityReportRecipients_() {
    const out = [];
    const seen = {};
    function addEmail(raw) {
        if (!raw || typeof raw !== 'string') return;
        const parts = raw.split(/[,;\s]+/).map(function (s) {
            return s.trim();
        }).filter(Boolean);
        for (let i = 0; i < parts.length; i++) {
            const e = parts[i].toLowerCase();
            if (e.indexOf('@') > 0 && !seen[e]) {
                seen[e] = true;
                out.push(parts[i]);
            }
        }
    }
    try {
        const prop = PropertiesService.getScriptProperties().getProperty('DAILY_ACTIVITY_REPORT_EMAILS');
        addEmail(prop || '');
    } catch (e0) { /* ignore */ }

    if (out.length > 0) return out;

    try {
        const users = readFromSheet('Users', getSpreadsheetId());
        if (Array.isArray(users)) {
            for (let j = 0; j < users.length; j++) {
                const u = users[j] || {};
                const role = String(u.role || '').toLowerCase();
                const email = String(u.email || '').trim();
                if (email && (role === 'admin' || role === 'superadmin' || role === 'super_admin')) {
                    addEmail(email);
                }
            }
        }
    } catch (e1) {
        Logger.log('getDailyActivityReportRecipients_: ' + e1.toString());
    }
    return out;
}

/**
 * نص بريد ملخّص التقرير اليومي بالجلسات
 */
function buildDailySessionReportEmailBody_(report) {
    if (!report || !report.success) {
        return 'تعذر إنشاء تقرير نشاط الجلسات.';
    }
    const lines = [];
    lines.push('تقرير نشاط المستخدمين بالجلسات');
    lines.push('التاريخ: ' + report.date + ' — المنطقة الزمنية: ' + report.timezone);
    lines.push('عدد السجلات الخام: ' + report.rawLogCount + ' — عدد الجلسات: ' + report.count);
    lines.push('');
    const sessions = report.sessions || [];
    for (let s = 0; s < sessions.length && s < 50; s++) {
        const ses = sessions[s];
        const who = (ses.userEmail || ses.username || ses.userKey || '').toString();
        const sid = ses.sessionId || (ses.inferred ? '(مستنتج)' : '');
        lines.push('— ' + who + ' | جلسة: ' + (sid || ses.sessionKey) + ' | أحداث: ' + ses.eventCount);
        lines.push('  بداية: ' + (ses.loginAt || '—') + ' | نهاية: ' + (ses.logoutAt || 'بدون تسجيل خروج') + (ses.note ? ' | ' + ses.note : ''));
    }
    if (sessions.length > 50) {
        lines.push('… و' + (sessions.length - 50) + ' جلسة إضافية (عرض مختصر في البريد).');
    }
    lines.push('');
    lines.push('للتفاصيل الكاملة: افتح التطبيق → سجل أنشطة المستخدمين → تقرير الجلسات اليومي.');
    return lines.join('\n');
}

/**
 * إرسال ملخص يومي بالبريد (يُستدعى يدوياً من محرر Apps Script عبر Trigger زمني).
 * يغطي «أمس» بتوقيت المشروع (Session.getScriptTimeZone).
 *
 * إعداد المستلمين الاختياري: في Project Settings → Script properties أضف المفتاح
 * DAILY_ACTIVITY_REPORT_EMAILS = email1@...,email2@...
 * وإلا يُرسل إلى مستخدمي Users بدور admin.
 */
function runDailyUserSessionEmailReport() {
    try {
        const tz = Session.getScriptTimeZone();
        const y = new Date();
        y.setDate(y.getDate() - 1);
        const dateStr = Utilities.formatDate(y, tz, 'yyyy-MM-dd');
        const report = getDailyUserSessionActivityReport({ date: dateStr, timezone: tz });
        const recipients = getDailyActivityReportRecipients_();
        if (!recipients.length) {
            Logger.log('runDailyUserSessionEmailReport: لا مستلمين (DAILY_ACTIVITY_REPORT_EMAILS أو مدير في Users)');
            return { success: false, message: 'لا مستلمين', sent: false };
        }
        const subject = '[HSE] تقرير نشاط الجلسات — ' + dateStr;
        const body = buildDailySessionReportEmailBody_(report);
        MailApp.sendEmail({
            to: recipients.join(','),
            subject: subject,
            body: body
        });
        return { success: true, sent: true, recipients: recipients.length, date: dateStr };
    } catch (e) {
        Logger.log('runDailyUserSessionEmailReport: ' + e.toString());
        return { success: false, message: String(e), sent: false };
    }
}

/**
 * ============================================
 * Client Error Log — أخطاء تظهر للمستخدمين
 * ============================================
 */

function addClientErrorLogToSheet(logData, actorUserData) {
    try {
        if (!logData || typeof logData !== 'object') {
            return { success: false, message: 'بيانات الخطأ غير موجودة' };
        }
        var msg = String(logData.message || '').trim();
        if (!msg) return { success: false, message: 'نص الخطأ مطلوب' };
        if (msg.length > 2000) msg = msg.substring(0, 2000);

        var actor = actorUserData || {};
        var nowIso = new Date().toISOString();
        var entry = {
            id: logData.id || ('CERR_' + Utilities.getUuid().replace(/-/g, '').substring(0, 16)),
            level: String(logData.level || 'error').toLowerCase(),
            message: msg,
            stack: String(logData.stack || '').substring(0, 4000),
            source: String(logData.source || '').substring(0, 500),
            line: logData.line != null ? String(logData.line) : '',
            col: logData.col != null ? String(logData.col) : '',
            module: String(logData.module || '').substring(0, 120),
            action: String(logData.action || '').substring(0, 120),
            pageUrl: String(logData.pageUrl || '').substring(0, 500),
            userAgent: String(logData.userAgent || '').substring(0, 400),
            appVersion: String(logData.appVersion || '').substring(0, 40),
            // هوية الجلسة أولاً — لا تُصدَّق قيم العميل للهوية
            userId: String(actor.id || logData.userId || ''),
            userEmail: String(actor.email || logData.userEmail || '').toLowerCase(),
            username: String(actor.name || actor.username || logData.username || ''),
            sessionId: String(logData.sessionId || '').substring(0, 80),
            fingerprint: String(logData.fingerprint || '').substring(0, 80),
            status: String(logData.status || 'new'),
            extra: typeof logData.extra === 'string'
                ? logData.extra.substring(0, 3000)
                : (logData.extra ? JSON.stringify(logData.extra).substring(0, 3000) : ''),
            createdAt: nowIso,
            updatedAt: nowIso
        };

        if (['error', 'warning', 'unhandled', 'info'].indexOf(entry.level) === -1) {
            entry.level = 'error';
        }

        var result = appendToSheet('ClientErrorLog', entry);
        if (result && result.success) {
            return { success: true, id: entry.id, message: 'تم تسجيل الخطأ' };
        }
        return result || { success: false, message: 'فشل حفظ سجل الخطأ' };
    } catch (error) {
        Logger.log('addClientErrorLogToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تسجيل الخطأ: ' + error.toString() };
    }
}

function getAllClientErrorLogs(filters) {
    try {
        filters = filters || {};
        var data = readFromSheet('ClientErrorLog', getSpreadsheetId()) || [];
        if (!Array.isArray(data)) data = [];

        if (filters.level) {
            var lv = String(filters.level).toLowerCase();
            data = data.filter(function(r) { return String(r.level || '').toLowerCase() === lv; });
        }
        if (filters.status) {
            var st = String(filters.status).toLowerCase();
            data = data.filter(function(r) { return String(r.status || '').toLowerCase() === st; });
        }
        if (filters.module) {
            var mod = String(filters.module).toLowerCase();
            data = data.filter(function(r) { return String(r.module || '').toLowerCase().indexOf(mod) !== -1; });
        }
        if (filters.userEmail) {
            var em = String(filters.userEmail).toLowerCase();
            data = data.filter(function(r) { return String(r.userEmail || '').toLowerCase().indexOf(em) !== -1; });
        }
        if (filters.q) {
            var q = String(filters.q).toLowerCase();
            data = data.filter(function(r) {
                return String(r.message || '').toLowerCase().indexOf(q) !== -1
                    || String(r.source || '').toLowerCase().indexOf(q) !== -1
                    || String(r.username || '').toLowerCase().indexOf(q) !== -1;
            });
        }
        if (filters.startDate) {
            var start = new Date(filters.startDate).getTime();
            data = data.filter(function(r) {
                var t = new Date(r.createdAt || r.updatedAt || 0).getTime();
                return !isNaN(t) && t >= start;
            });
        }
        if (filters.endDate) {
            var end = new Date(filters.endDate).getTime();
            data = data.filter(function(r) {
                var t = new Date(r.createdAt || r.updatedAt || 0).getTime();
                return !isNaN(t) && t <= end;
            });
        }

        data.sort(function(a, b) {
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        });

        var limit = Math.min(500, Math.max(20, Number(filters.limit) || 200));
        if (data.length > limit) data = data.slice(0, limit);

        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('getAllClientErrorLogs: ' + error.toString());
        return { success: false, message: error.toString(), data: [] };
    }
}

function getClientErrorStats(filters) {
    try {
        var res = getAllClientErrorLogs(Object.assign({}, filters || {}, { limit: 500 }));
        var rows = (res && res.data) ? res.data : [];
        var byLevel = {};
        var byModule = {};
        var byStatus = {};
        var last24h = 0;
        var now = Date.now();
        rows.forEach(function(r) {
            var level = String(r.level || 'error').toLowerCase();
            byLevel[level] = (byLevel[level] || 0) + 1;
            var mod = String(r.module || 'unknown') || 'unknown';
            byModule[mod] = (byModule[mod] || 0) + 1;
            var st = String(r.status || 'new').toLowerCase();
            byStatus[st] = (byStatus[st] || 0) + 1;
            var t = new Date(r.createdAt || 0).getTime();
            if (!isNaN(t) && (now - t) <= 24 * 60 * 60 * 1000) last24h += 1;
        });
        return {
            success: true,
            total: rows.length,
            last24h: last24h,
            byLevel: byLevel,
            byModule: byModule,
            byStatus: byStatus
        };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

function updateClientErrorStatus(payload, actorUserData) {
    try {
        var id = String((payload && (payload.id || payload.errorId)) || '').trim();
        var status = String((payload && payload.status) || '').trim().toLowerCase();
        if (!id) return { success: false, message: 'معرف السجل مطلوب' };
        if (['new', 'seen', 'ignored', 'resolved'].indexOf(status) === -1) {
            return { success: false, message: 'حالة غير صالحة' };
        }
        return updateRecordInSheet('ClientErrorLog', id, {
            status: status,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

