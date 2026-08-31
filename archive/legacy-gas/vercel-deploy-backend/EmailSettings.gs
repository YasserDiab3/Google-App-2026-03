/**
 * إعدادات البريد والإرسال المباشر — يضبطها مدير النظام فقط.
 * ورقة Email_Settings: سجل واحد يحتوي JSON كامل للكتالوج.
 */

var EMAIL_SETTINGS_SHEET = 'Email_Settings';

/**
 * كتالوج الموديولات الافتراضي (مفاتيح ثابتة للواجهة والـ API).
 */
function getDefaultEmailModuleCatalog_() {
    return [
        { key: 'incidents', labelAr: 'الحوادث', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: ['create'], recipients: [] },
        { key: 'incidents.alert', labelAr: 'تنبيه سلامة (حوادث)', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'incidents.investigation', labelAr: 'تحقيق حادث', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'violations', labelAr: 'المخالفات', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: ['create'], recipients: [] },
        { key: 'violations.blacklist', labelAr: 'القائمة السوداء', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'ptw', labelAr: 'تصاريح العمل', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'nearmiss', labelAr: 'الحوادث الوشيكة', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: ['create'], recipients: [] },
        { key: 'daily-observations', labelAr: 'الملاحظات اليومية', group: 'ops', enabled: true, manualSend: true, autoSend: true, autoEvents: ['create', 'workflow'], recipients: [] },
        { key: 'daily-observations.analytics', labelAr: 'تحليل الملاحظات', group: 'reports', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'daily-observations.executive', labelAr: 'لوحة تنفيذية للملاحظات', group: 'reports', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'behavior-monitoring', labelAr: 'مراقبة التصرفات', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'chemical-safety', labelAr: 'السلامة الكيميائية', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'ppe', labelAr: 'مهمات الوقاية', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'legal-documents', labelAr: 'الوثائق القانونية', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'sop-jha', labelAr: 'إجراءات العمل والتقييمات', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'action-tracking', labelAr: 'متابعة الإجراءات', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'change-management', labelAr: 'إدارة التغيّر', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'periodic-inspections', labelAr: 'الفحوصات الدورية', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'periodic-equipment', labelAr: 'معدات الفحص الدوري', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'daily-safety-checklist', labelAr: 'المرور اليومي للسلامة', group: 'ops', enabled: true, manualSend: true, autoSend: true, autoEvents: ['create'], recipients: [] },
        { key: 'training', labelAr: 'التدريب', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'employees', labelAr: 'الموظفون', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'contractors', labelAr: 'المقاولون', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'fire-equipment', labelAr: 'معدات الإطفاء', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'emergency', labelAr: 'الطوارئ', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'risk-assessment', labelAr: 'تقييم المخاطر', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'iso', labelAr: 'نظام ISO', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'sustainability', labelAr: 'الاستدامة', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'safety-budget', labelAr: 'ميزانية السلامة', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'user-tasks', labelAr: 'مهام المستخدمين', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'issue-tracking', labelAr: 'تتبع المشاكل', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'safety-calendar', labelAr: 'تقويم السلامة', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'issuing-authorities', labelAr: 'المصرّحون بالتوقيع', group: 'ops', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'clinic.visit', labelAr: 'زيارة عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'clinic.injury', labelAr: 'إصابة عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false, autoEvents: ['create'], recipients: [] },
        { key: 'clinic.sickLeave', labelAr: 'إجازة مرضية', group: 'clinic', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'clinic.medication', labelAr: 'دواء عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'clinic.supply', labelAr: 'طلب مستلزمات عيادة', group: 'clinic', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'reports', labelAr: 'التقارير المجمّعة', group: 'reports', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'safety-performance-kpis', labelAr: 'مؤشرات أداء السلامة', group: 'reports', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'hse', labelAr: 'لوحة HSE', group: 'reports', enabled: true, manualSend: true, autoSend: false, autoEvents: [], recipients: [] },
        { key: 'daily-activity-report', labelAr: 'تقرير نشاط يومي', group: 'system', enabled: true, manualSend: false, autoSend: true, autoEvents: ['daily'], recipients: [] },
        { key: 'system.deleteAudit', labelAr: 'تدقيق الحذف (مدراء)', group: 'system', enabled: true, manualSend: false, autoSend: true, autoEvents: ['delete'], recipients: [] }
    ];
}

function getDefaultEmailSettings_() {
    var modules = {};
    getDefaultEmailModuleCatalog_().forEach(function (m) {
        modules[m.key] = {
            labelAr: m.labelAr,
            group: m.group,
            enabled: !!m.enabled,
            manualSend: !!m.manualSend,
            autoSend: !!m.autoSend,
            autoEvents: m.autoEvents || [],
            recipients: []
        };
    });
    return {
        globalEnabled: false,
        defaultRecipients: [],
        modules: modules,
        updatedAt: '',
        updatedBy: ''
    };
}

function checkEmailSettingsAdmin_(userData) {
    if (!userData) {
        return { hasPermission: false, message: 'يجب تسجيل الدخول أولاً' };
    }
    var role = String(userData.role || '').toLowerCase();
    if (role === 'admin' || role === 'superadmin' || role === 'super_admin') {
        return { hasPermission: true, message: 'صلاحية صحيحة' };
    }
    return { hasPermission: false, message: 'إعدادات البريد متاحة لمدير النظام فقط' };
}

function normalizeEmailList_(list) {
    var out = [];
    var seen = {};
    (list || []).forEach(function (raw) {
        var e = String(raw || '').trim().toLowerCase();
        if (!e || e.indexOf('@') < 1) return;
        if (seen[e]) return;
        seen[e] = true;
        out.push(e);
    });
    return out.slice(0, 50);
}

function mergeEmailSettingsWithDefaults_(raw) {
    var defaults = getDefaultEmailSettings_();
    var src = raw && typeof raw === 'object' ? raw : {};
    var merged = {
        globalEnabled: src.globalEnabled === true,
        defaultRecipients: normalizeEmailList_(src.defaultRecipients || []),
        modules: {},
        updatedAt: String(src.updatedAt || ''),
        updatedBy: String(src.updatedBy || '')
    };
    Object.keys(defaults.modules).forEach(function (key) {
        var d = defaults.modules[key];
        var s = (src.modules && src.modules[key]) ? src.modules[key] : {};
        merged.modules[key] = {
            labelAr: d.labelAr,
            group: d.group,
            enabled: s.enabled === false ? false : (s.enabled === true ? true : d.enabled),
            manualSend: s.manualSend === false ? false : (s.manualSend === true ? true : d.manualSend),
            autoSend: s.autoSend === false ? false : (s.autoSend === true ? true : d.autoSend),
            autoEvents: Array.isArray(s.autoEvents) ? s.autoEvents : (d.autoEvents || []),
            recipients: normalizeEmailList_(s.recipients || [])
        };
    });
    return merged;
}

function initEmailSettingsTable_(spreadsheetId) {
    var finalId = spreadsheetId || getSpreadsheetId();
    if (!finalId) return { success: false, message: 'معرف Google Sheets غير محدد' };
    var spreadsheet = SpreadsheetApp.openById(finalId);
    var sheet = spreadsheet.getSheetByName(EMAIL_SETTINGS_SHEET);
    if (!sheet) {
        sheet = spreadsheet.insertSheet(EMAIL_SETTINGS_SHEET);
    }
    var headerRow = ['id', 'configJson', 'updatedAt', 'updatedBy'];
    var current = sheet.getRange(1, 1, 1, headerRow.length).getValues()[0] || [];
    var needsHeader = String(sheet.getRange(1, 1).getValue() || '').trim() === '' ||
        headerRow.some(function (h, idx) {
            return String(current[idx] || '').trim() !== h;
        });
    if (needsHeader) {
        sheet.getRange(1, 1, 1, headerRow.length).setValues([headerRow]);
        var headerRange = sheet.getRange(1, 1, 1, headerRow.length);
        headerRange.setFontWeight('bold');
        headerRange.setBackground('#0F766E');
        headerRange.setFontColor('#FFFFFF');
    }
    return { success: true, sheet: sheet };
}

var EMAIL_SETTINGS_CACHE_KEY_ = 'email_settings_bundle_v1';
var EMAIL_SETTINGS_CACHE_SEC_ = 180;

function getEmailSettingsBundleCache_() {
    try {
        var raw = CacheService.getScriptCache().get(EMAIL_SETTINGS_CACHE_KEY_);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function putEmailSettingsBundleCache_(bundle) {
    try {
        CacheService.getScriptCache().put(
            EMAIL_SETTINGS_CACHE_KEY_,
            JSON.stringify(bundle),
            EMAIL_SETTINGS_CACHE_SEC_
        );
    } catch (e) {
        // تجاهل فشل الكاش
    }
}

function clearEmailSettingsBundleCache_() {
    try {
        CacheService.getScriptCache().remove(EMAIL_SETTINGS_CACHE_KEY_);
    } catch (e) {
        // تجاهل
    }
}

/**
 * قراءة خام بدون إعادة تهيئة الهيدر في كل طلب (أسرع).
 */
function readEmailSettingsRaw_(spreadsheetId) {
    var finalId = spreadsheetId || getSpreadsheetId();
    if (!finalId) return null;
    var spreadsheet = SpreadsheetApp.openById(finalId);
    var sheet = spreadsheet.getSheetByName(EMAIL_SETTINGS_SHEET);
    if (!sheet) {
        return null;
    }
    var rows = readFromSheet(EMAIL_SETTINGS_SHEET, finalId, true);
    if (!rows || !rows.length) return null;
    var row = rows[0] || {};
    var json = row.configJson;
    if (typeof json === 'string') {
        try {
            return json.trim() ? JSON.parse(json) : null;
        } catch (e) {
            Logger.log('readEmailSettingsRaw_ parse: ' + e.toString());
            return null;
        }
    }
    if (json && typeof json === 'object') return json;
    return null;
}

function loadEmailSettingsBundle_(forceRefresh) {
    if (!forceRefresh) {
        var cached = getEmailSettingsBundleCache_();
        if (cached && cached.data) return cached;
    }
    var spreadsheetId = getSpreadsheetId();
    if (!spreadsheetId) {
        return { data: getDefaultEmailSettings_(), persisted: false };
    }
    var raw = null;
    try {
        raw = readEmailSettingsRaw_(spreadsheetId);
    } catch (eRead) {
        raw = null;
    }
    var data = mergeEmailSettingsWithDefaults_(raw);
    var bundle = { data: data, persisted: !!raw };
    putEmailSettingsBundleCache_(bundle);
    return bundle;
}

/**
 * قراءة إعدادات البريد (أي مستخدم مسجّل).
 */
function getEmailSettings(payload) {
    try {
        var force = !!(payload && payload.force);
        var bundle = loadEmailSettingsBundle_(force);
        return { success: true, data: bundle.data, cached: !force && !!getEmailSettingsBundleCache_() };
    } catch (e) {
        Logger.log('getEmailSettings: ' + e.toString());
        return { success: false, message: String(e), data: getDefaultEmailSettings_() };
    }
}

/**
 * حفظ إعدادات البريد — مدير فقط.
 */
function saveEmailSettings(payload) {
    try {
        var userData = (payload && (payload.userData || payload.user)) || {};
        var perm = checkEmailSettingsAdmin_(userData);
        if (!perm.hasPermission) {
            return { success: false, message: perm.message, errorCode: 'PERMISSION_DENIED' };
        }
        var spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        initEmailSettingsTable_(spreadsheetId);
        var incoming = (payload && payload.settings) ? payload.settings : (payload || {});
        delete incoming.userData;
        delete incoming.user;
        var merged = mergeEmailSettingsWithDefaults_(incoming);
        merged.updatedAt = new Date().toISOString();
        merged.updatedBy = String(userData.name || userData.email || 'admin');
        var row = {
            id: 'email-settings-1',
            configJson: JSON.stringify(merged),
            updatedAt: merged.updatedAt,
            updatedBy: merged.updatedBy
        };
        var saveResult = saveToSheet(EMAIL_SETTINGS_SHEET, [row], spreadsheetId);
        if (saveResult && saveResult.success === false) {
            return saveResult;
        }
        clearEmailSettingsBundleCache_();
        putEmailSettingsBundleCache_({ data: merged, persisted: true });
        return { success: true, message: 'تم حفظ إعدادات البريد', data: merged };
    } catch (e) {
        Logger.log('saveEmailSettings: ' + e.toString());
        return { success: false, message: String(e) };
    }
}

/**
 * هل يُسمح بالإرسال لنوع معيّن؟
 * mode: 'manual' | 'auto'
 * إن لم تُحفظ إعدادات بعد (لا صف في الورقة): الإرسال التلقائي القديم يبقى مسموحاً حتى لا ينكسر السلوك الحالي.
 */
function isEmailModuleAllowed_(moduleKey, mode) {
    try {
        var bundle = loadEmailSettingsBundle_(false);
        var cfg = bundle.data || getDefaultEmailSettings_();
        // لم يحفظ المدير إعدادات بعد → لا نحظر المسارات التلقائية القديمة
        if (!bundle.persisted && mode === 'auto') {
            return { allowed: true, settings: cfg, module: (cfg.modules && cfg.modules[moduleKey]) || null, legacy: true };
        }
        if (!cfg.globalEnabled) return { allowed: false, reason: 'نظام البريد متوقف من المدير', settings: cfg };
        var mod = cfg.modules && cfg.modules[moduleKey];
        if (!mod || !mod.enabled) return { allowed: false, reason: 'هذا النوع غير مفعّل', settings: cfg };
        if (mode === 'manual' && !mod.manualSend) return { allowed: false, reason: 'الإرسال اليدوي غير مفعّل لهذا النوع', settings: cfg };
        if (mode === 'auto' && !mod.autoSend) return { allowed: false, reason: 'الإرسال التلقائي غير مفعّل لهذا النوع', settings: cfg };
        return { allowed: true, settings: cfg, module: mod };
    } catch (e) {
        return { allowed: false, reason: String(e), settings: getDefaultEmailSettings_() };
    }
}

function resolveEmailRecipients_(moduleKey, overrideList) {
    var check = isEmailModuleAllowed_(moduleKey, 'manual');
    // حتى لو فشل manual للفحص، نقرأ المستلمين من الإعدادات
    var cfg = check.settings || getDefaultEmailSettings_();
    var mod = (cfg.modules && cfg.modules[moduleKey]) ? cfg.modules[moduleKey] : null;
    var fromOverride = normalizeEmailList_(overrideList || []);
    if (fromOverride.length) return fromOverride;
    if (mod && mod.recipients && mod.recipients.length) return mod.recipients.slice();
    return normalizeEmailList_(cfg.defaultRecipients || []);
}
