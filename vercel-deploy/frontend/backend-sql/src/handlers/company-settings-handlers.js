/**
 * إعدادات الشركة + قواعد استحقاق PPE (جدول PPE_Eligibility_Rules)
 */
'use strict';

const { getDatabase } = require('../db/database');

const COMPANY_SETTINGS_SHEET = 'Company_Settings';
const DEFAULT_SETTINGS_ID = 'COMPANY-SETTINGS-1';

function getDefaultCompanySettings() {
    return {
        id: DEFAULT_SETTINGS_ID,
        name: 'الشركة العالمية للانتاج والتصنيع الزراعي',
        secondaryName: '',
        nameFontSize: 16,
        secondaryNameFontSize: 14,
        secondaryNameColor: '#6B7280',
        formVersion: '1.0',
        address: '',
        phone: '',
        email: '',
        logo: '',
        postLoginItems: '[]',
        clinicMonthlyVisitsAlertThreshold: 10,
        employeeImportHireMonths: 3,
        clinicVisitTypes: '',
        profileTeamsUrl: '',
        profileWhatsAppUrl: '',
        ppeEligibilityRules: '[]',
        ppeEligibilityMonths: 0,
        ppeEligibilityDays: 0,
        helpContent: ''
    };
}

function readPpeEligibilityRulesFromTable(db) {
    try {
        const rows = db.readSheet('PPE_Eligibility_Rules') || [];
        const out = [];
        for (const obj of rows) {
            const equipmentType = String(obj.equipmentType || '').trim();
            let months = parseInt(obj.months, 10);
            if (!equipmentType) continue;
            if (isNaN(months) || months < 1) continue;
            const isActiveRaw = String(obj.isActive == null ? '1' : obj.isActive).toLowerCase().trim();
            const isActive = !(isActiveRaw === '0' || isActiveRaw === 'false' || isActiveRaw === 'no');
            if (!isActive) continue;
            out.push({
                equipmentType,
                months: Math.min(120, months),
                days: Math.min(3650, parseInt(obj.days, 10) || 0)
            });
        }
        return out;
    } catch (_) {
        return [];
    }
}

function normalizePpeRulesArray(raw) {
    if (!raw) return [];
    try {
        if (Array.isArray(raw)) return raw;
        if (typeof raw === 'string') {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        }
    } catch (_) { /* ignore */ }
    return [];
}

function savePpeEligibilityRulesTable(db, rulesArray, actorUserData) {
    const now = new Date().toISOString();
    const user = String(actorUserData?.name || actorUserData?.email || 'System').trim() || 'System';
    const rules = normalizePpeRulesArray(rulesArray);

    try {
        db.exec('DELETE FROM "PPE_Eligibility_Rules"');
    } catch (_) {
        /* table may be empty */
    }

    rules.forEach((rule, idx) => {
        const equipmentType = String(rule.equipmentType || rule.itemName || '').trim();
        if (!equipmentType) return;
        let months = parseInt(rule.months, 10);
        if (isNaN(months) || months < 1) months = 1;
        months = Math.min(120, months);
        let days = parseInt(rule.days, 10);
        if (isNaN(days) || days < 0) days = 0;
        days = Math.min(3650, days);

        db.insertRow('PPE_Eligibility_Rules', {
            id: `PPE-RULE-${idx + 1}`,
            equipmentType,
            months,
            days,
            isActive: '1',
            sortOrder: String(idx + 1),
            notes: '',
            createdAt: now,
            updatedAt: now,
            createdBy: user,
            updatedBy: user
        });
    });

    return { success: true, count: rules.length };
}

function mergeSettingsWithPpeRules(db, rawRow) {
    const defaults = getDefaultCompanySettings();
    const settingsData = Object.assign({}, defaults, rawRow || {});
    const rulesFromTable = readPpeEligibilityRulesFromTable(db);
    if (rulesFromTable.length > 0) {
        settingsData.ppeEligibilityRules = JSON.stringify(rulesFromTable);
    } else if (!settingsData.ppeEligibilityRules) {
        settingsData.ppeEligibilityRules = '[]';
    }
    settingsData.ppeEligibilityMonths = 0;
    settingsData.ppeEligibilityDays = 0;
    return settingsData;
}

const companySettingsHandlers = {
    getCompanySettings(payload, postData) {
        const db = getDatabase();
        const rows = db.readSheet(COMPANY_SETTINGS_SHEET) || [];
        const settingsData = rows.length > 0
            ? mergeSettingsWithPpeRules(db, rows[0])
            : mergeSettingsWithPpeRules(db, null);

        return { success: true, data: settingsData };
    },

    saveCompanySettings(payload, postData, action, actorUserData) {
        const db = getDatabase();
        const data = payload?.data || payload || postData?.data || postData || {};
        const now = new Date().toISOString();
        const user = String(actorUserData?.name || actorUserData?.email || 'System').trim() || 'System';

        const ppeRulesRaw = data.ppeEligibilityRules;
        if (ppeRulesRaw !== undefined && ppeRulesRaw !== null) {
            const rulesSave = savePpeEligibilityRulesTable(db, ppeRulesRaw, actorUserData);
            if (!rulesSave.success) {
                return { success: false, message: 'تعذر حفظ قواعد استحقاق مهمات الوقاية' };
            }
        }

        const rows = db.readSheet(COMPANY_SETTINGS_SHEET) || [];
        const existing = rows[0] || {};
        const id = data.id || existing.id || DEFAULT_SETTINGS_ID;

        const toSave = Object.assign({}, getDefaultCompanySettings(), existing, data, {
            id,
            updatedAt: now,
            updatedBy: user,
            createdAt: existing.createdAt || now,
            createdBy: existing.createdBy || user
        });

        if (ppeRulesRaw !== undefined && ppeRulesRaw !== null) {
            const rulesFromTable = readPpeEligibilityRulesFromTable(db);
            toSave.ppeEligibilityRules = rulesFromTable.length
                ? JSON.stringify(rulesFromTable)
                : (typeof ppeRulesRaw === 'string' ? ppeRulesRaw : JSON.stringify(normalizePpeRulesArray(ppeRulesRaw)));
        }

        if (rows.length > 0) {
            db.updateRow(COMPANY_SETTINGS_SHEET, 'id', id, toSave);
        } else {
            db.insertRow(COMPANY_SETTINGS_SHEET, toSave);
        }

        return {
            success: true,
            message: 'تم حفظ إعدادات الشركة بنجاح',
            data: mergeSettingsWithPpeRules(db, toSave)
        };
    }
};

module.exports = companySettingsHandlers;
