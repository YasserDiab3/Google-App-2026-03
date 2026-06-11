/**
 * مطابقة عدّ الصفوف بين AppState والخادم (مدير / وضع debug)
 */
const DataIntegrity = {
    SHEET_TO_APP_KEY: {
        Users: 'users',
        Incidents: 'incidents',
        NearMiss: 'nearmiss',
        Employees: 'employees',
        Training: 'training',
        PTW: 'ptw',
        Violations: 'violations',
        ClinicVisits: 'clinicVisits',
        ApprovedContractors: 'approvedContractors',
        Contractors: 'contractors'
    },

    _isAdmin() {
        try {
            return !!(AppState.currentUser
                && typeof Permissions !== 'undefined'
                && typeof Permissions.isCurrentUserEffectiveAdmin === 'function'
                && Permissions.isCurrentUserEffectiveAdmin(AppState.currentUser));
        } catch (e) {
            return false;
        }
    },

    _localCount(appKey) {
        const val = AppState && AppState.appData ? AppState.appData[appKey] : null;
        return Array.isArray(val) ? val.length : (val && typeof val === 'object' ? Object.keys(val).length : 0);
    },

    /**
     * مقارنة AppState.appData مع snapshot الخادم
     * @returns {Promise<{ok:boolean, mismatches:Array, counts:Object}>}
     */
    async check(options = {}) {
        const sheetNames = options.sheetNames || Object.keys(this.SHEET_TO_APP_KEY);
        const silent = options.silent === true;

        if (!this._isAdmin()) {
            const msg = 'أداة مطابقة البيانات متاحة للمدير فقط';
            if (!silent && typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn(msg);
            return { ok: false, mismatches: [], counts: {}, message: msg };
        }

        if (typeof GoogleIntegration === 'undefined' || typeof GoogleIntegration.sendRequest !== 'function') {
            const msg = 'GoogleIntegration غير متاح';
            if (!silent && typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn(msg);
            return { ok: false, mismatches: [], counts: {}, message: msg };
        }

        const currentEmail = AppState.currentUser?.email
            ? String(AppState.currentUser.email).trim().toLowerCase()
            : '';
        const metaEmail = AppState.syncMeta?.userEmail
            ? String(AppState.syncMeta.userEmail).trim().toLowerCase()
            : '';
        if (currentEmail && metaEmail && currentEmail !== metaEmail) {
            const msg = 'تعارض جلسة: syncMeta.userEmail لا يطابق المستخدم الحالي';
            if (!silent && typeof Notification !== 'undefined' && Notification.warning) {
                Notification.warning(msg);
            }
            if (!silent && typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn(msg);
            return { ok: false, mismatches: [], counts: {}, message: msg };
        }

        let result;
        try {
            result = await GoogleIntegration.sendRequest({
                action: 'getDataIntegritySnapshot',
                data: { sheetNames, userData: AppState.currentUser }
            });
        } catch (err) {
            const msg = err?.message || String(err);
            if (!silent && typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('فشل getDataIntegritySnapshot:', msg);
            return { ok: false, mismatches: [], counts: {}, message: msg };
        }

        const serverCounts = (result && result.counts) ? result.counts : {};
        const mismatches = [];

        sheetNames.forEach((sheetName) => {
            const appKey = this.SHEET_TO_APP_KEY[sheetName] || sheetName;
            const serverCount = typeof serverCounts[sheetName] === 'number' ? serverCounts[sheetName] : null;
            const localCount = this._localCount(appKey);
            if (serverCount === null || serverCount < 0) return;
            if (serverCount !== localCount) {
                mismatches.push({
                    sheetName,
                    appKey,
                    serverCount,
                    localCount,
                    delta: localCount - serverCount
                });
            }
        });

        const ok = mismatches.length === 0;
        const summary = { ok, mismatches, counts: serverCounts, checkedAt: new Date().toISOString() };

        if (!silent) {
            if (ok) {
                if (typeof Utils !== 'undefined' && Utils.safeLog) {
                    Utils.safeLog('✅ مطابقة البيانات: لا اختلاف في العدّ', summary);
                }
            } else {
                const detail = mismatches.map((m) =>
                    `${m.sheetName}: خادم=${m.serverCount} محلي=${m.localCount}`
                ).join(' | ');
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ اختلاف مطابقة البيانات:', mismatches);
                }
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning('اختلاف في عدّ البيانات: ' + detail);
                }
            }
        }

        return summary;
    }
};

if (typeof window !== 'undefined') {
    window.DataIntegrity = DataIntegrity;
}
