/**
 * Data Manager Service
 * Handles local data storage, sync queue management, and configuration persistence
 */

const DataManager = {
    _pendingSyncQueue: null,
    /** حد آمن لحجم بيانات التطبيق في localStorage (المتصفحات غالباً ~5MB للمجال كاملاً) */
    SAFE_APP_DATA_BYTES: 6 * 1024 * 1024,
    /** أقصى عدد عناصر للمصفوفات الكبيرة في النسخة المخففة */
    MAX_ITEMS_PER_ARRAY_IN_LIGHT: 400,
    /** عتبة اعتبار hse_app_data ضخماً — نُفسح الـ main thread قبل/أثناء التحليل والتعيين */
    LARGE_APP_DATA_CHARS: 350 * 1024,
    /** بعد كم سجل (عناصر مصفوفات) نُعيد التحكم للمتصفح أثناء التعيين */
    LOAD_YIELD_EVERY_ITEMS: 400,
    _lastLightSaveNotification: 0,
    _hasShownLargeDataWarning: false,

    /**
     * إفساح الـ main thread (رسم إطار + macrotask).
     * @param {number} [rounds=1] عدد دورات الإفساح
     */
    async _yieldToMain_(rounds) {
        const n = Math.max(1, Number(rounds) || 1);
        for (let i = 0; i < n; i++) {
            await new Promise((resolve) => {
                if (typeof requestAnimationFrame === 'function') {
                    requestAnimationFrame(() => setTimeout(resolve, 0));
                } else {
                    setTimeout(resolve, 0);
                }
            });
        }
    },

    /**
     * انتظار idle قصير قبل تحليل كاش ضخم — يعطي الأولوية للرسم/الإدخال.
     */
    async _waitForIdleBrief_(timeoutMs) {
        const ms = Math.max(0, Number(timeoutMs) || 120);
        if (typeof requestIdleCallback !== 'function') {
            await new Promise((r) => setTimeout(r, Math.min(ms, 32)));
            return;
        }
        await new Promise((resolve) => {
            let done = false;
            const finish = () => {
                if (done) return;
                done = true;
                resolve();
            };
            try {
                requestIdleCallback(finish, { timeout: ms });
            } catch (_e) {
                finish();
            }
            setTimeout(finish, ms + 30);
        });
    },

    /**
     * تحليل JSON مع إبقاء الواجهة مستجيبة قدر الإمكان.
     * ملاحظة إنتاج: لا نستخدم Worker هنا — postMessage يعمل structured clone
     * للكائن الكامل فيضاعف الذاكرة والتكلفة على كاش ضخم. الأفضل:
     * إفساح للرسم → JSON.parse مرة واحدة على الـ main → تعيين على دفعات.
     */
    async _parseJsonNonBlocking_(text, label) {
        if (text == null || text === '') return null;
        const str = String(text);
        const threshold = this.LARGE_APP_DATA_CHARS || (350 * 1024);
        const large = str.length >= threshold;
        if (large) {
            await this._yieldToMain_(2);
            await this._waitForIdleBrief_(120);
            if (AppState && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog(
                    `⚡ [DataManager] JSON.parse بعد idle (${label || 'payload'}, ${(str.length / 1024).toFixed(0)}KB) — بدون Worker/clone`
                );
            }
        }
        const parsed = JSON.parse(str);
        if (large) {
            await this._yieldToMain_(1);
        }
        return parsed;
    },

    _normalizeObservationSites_(sites) {
        if (!Array.isArray(sites) || sites.length === 0) return [];
        return sites.map((site) => {
            const normalizedSite = {
                id: site.id || site.siteId || (typeof Utils !== 'undefined' && Utils.generateId ? Utils.generateId('SITE') : ('SITE_' + Date.now())),
                name: site.name || site.title || site.label || '',
                description: site.description || '',
                places: []
            };
            const placesSource = Array.isArray(site.places) ? site.places : [];
            normalizedSite.places = placesSource.map((place, idx) => {
                if (typeof place === 'object' && place !== null) {
                    return {
                        id: place.id || place.placeId || place.value || (typeof Utils !== 'undefined' && Utils.generateId ? Utils.generateId('PLACE') : ('PLACE_' + idx)),
                        name: place.name || place.placeName || place.title || place.label || place.locationName || `مكان ${idx + 1}`,
                        siteId: normalizedSite.id
                    };
                }
                if (typeof place === 'string') {
                    return {
                        id: (typeof Utils !== 'undefined' && Utils.generateId ? Utils.generateId('PLACE') : ('PLACE_' + idx)),
                        name: place,
                        siteId: normalizedSite.id
                    };
                }
                return null;
            }).filter(Boolean);
            return normalizedSite;
        }).filter((site) => site.id && site.name);
    },

    /**
     * تعيين مفاتيح AppState على دفعات مع yield — يمنع تجميد بعد JSON.parse الضخم.
     */
    async _assignParsedAppDataChunked_(parsedData) {
        if (!parsedData || typeof parsedData !== 'object') return;

        if (parsedData.users && Array.isArray(parsedData.users) && parsedData.users.length > 0) {
            AppState.appData.users = parsedData.users;
            if (AppState.debugMode) {
                Utils.safeLog(`✅ تم تحميل ${parsedData.users.length} مستخدم من البيانات المحلية`);
            }
        }
        if (parsedData.employees && Array.isArray(parsedData.employees) && parsedData.employees.length > 0) {
            AppState.appData.employees = parsedData.employees;
            if (AppState.debugMode) {
                Utils.safeLog(`✅ تم تحميل ${parsedData.employees.length} موظف من البيانات المحلية`);
            }
        }
        if (parsedData.approvedContractors && Array.isArray(parsedData.approvedContractors) && parsedData.approvedContractors.length > 0) {
            AppState.appData.approvedContractors = parsedData.approvedContractors;
            if (AppState.debugMode) {
                Utils.safeLog(`✅ تم تحميل ${parsedData.approvedContractors.length} مقاول معتمد من البيانات المحلية`);
            }
        }
        if (parsedData.contractors && Array.isArray(parsedData.contractors) && parsedData.contractors.length > 0) {
            AppState.appData.contractors = parsedData.contractors;
            if (AppState.debugMode) {
                Utils.safeLog(`✅ تم تحميل ${parsedData.contractors.length} مقاول من البيانات المحلية`);
            }
        }

        // إفساح قصير بعد البيانات الحرجة لاستعادة الجلسة/الصلاحيات
        await this._yieldToMain_();

        if (parsedData.observationSites && Array.isArray(parsedData.observationSites) && parsedData.observationSites.length > 0) {
            if (parsedData.observationSites.length > 40) {
                await this._yieldToMain_();
            }
            AppState.appData.observationSites = this._normalizeObservationSites_(parsedData.observationSites);
            if (AppState.debugMode) {
                Utils.safeLog(`✅ تم تحميل ${AppState.appData.observationSites.length} موقع من البيانات المحلية`);
            }
        } else if (!AppState.appData.observationSites) {
            AppState.appData.observationSites = [];
        }

        const skipKeys = {
            users: 1,
            employees: 1,
            approvedContractors: 1,
            contractors: 1,
            observationSites: 1,
            _ownerEmail: 1,
            _lightDataMeta: 1
        };
        const keys = Object.keys(parsedData);
        const yieldEvery = this.LOAD_YIELD_EVERY_ITEMS || 400;
        let itemsSinceYield = 0;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (skipKeys[key]) continue;
            const val = parsedData[key];
            if (val && Array.isArray(val)) {
                AppState.appData[key] = val;
                itemsSinceYield += val.length;
                // مصفوفة كبيرة وحدها → إفساح فوري بعد التعيين (مرجع فقط، بدون نسخ)
                if (val.length >= 300 || itemsSinceYield >= yieldEvery) {
                    itemsSinceYield = 0;
                    await this._yieldToMain_(1);
                }
            } else if (key === 'systemStatistics' && val && typeof val === 'object') {
                AppState.appData.systemStatistics = val;
            }
        }
    },

    /**
     * P4.2: حفظ النسخة المحلية بهدوء تام دون إظهار تنبيهات مزعجة
     */
    _notifyLightLocalSave(reason) {
        // صامت تماماً — عدم إظهار أي إشعارات أو بانرات للمستخدم
        if (typeof Utils !== 'undefined' && Utils.safeLog) {
            Utils.safeLog('ℹ️ [DataManager] light save:', reason || '');
        }
    },

    /** حقول حساسة لا تُحفظ في localStorage أبداً */
    _USER_SENSITIVE_FIELDS: ['password', 'passwordHash', 'token', 'loginHistory', 'activeSessionId', 'profilePublicToken', 'profilePublicTokenExpiry', 'mfaSecretEnc'],

    /**
     * مسح البيانات المحلية عند logout أو تبديل المستخدم (منع تسريب بين الجلسات)
     * يعيد Promise إن وُجد IndexedDB حتى يمكن انتظار اكتمال المسح قبل load التالي.
     */
    purgeLocalAppData(reason) {
        let idbClearPromise = Promise.resolve(true);
        try {
            localStorage.removeItem('hse_app_data');
            localStorage.removeItem('hse_sync_meta');
            localStorage.removeItem('hse_cache_timestamps');
            localStorage.removeItem('hse_cached_users');
            localStorage.removeItem('hse_last_user_email');
            localStorage.removeItem('hse_ptw_list');
            localStorage.removeItem('hse_ptw_registry');
            localStorage.removeItem('hse_incidents_registry');
            // مسح كل مفاتيح cache القراءة + مديولات قد تسرّب بين الحسابات
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (!k) continue;
                if (
                    k.startsWith('hse_local_readFromSheet') ||
                    k.startsWith('hse_local_batchReadSheets') ||
                    k.startsWith('hse_cache_') ||
                    k.startsWith('hse_user_') ||
                    k.startsWith('hse_ptw_') ||
                    k.startsWith('hse_incidents_') ||
                    k.startsWith('hse_clinic_') ||
                    k.startsWith('hse_module_')
                ) {
                    keysToRemove.push(k);
                }
            }
            keysToRemove.forEach((k) => localStorage.removeItem(k));
            if (typeof LocalDBCache !== 'undefined' && typeof LocalDBCache.clear === 'function') {
                // مهم: لا نترك clear بدون تتبع — سباق load بعد logout يُعيد بيانات الحساب السابق
                idbClearPromise = LocalDBCache.clear().catch((err) => {
                    Utils.safeWarn('⚠️ فشل تفريغ IndexedDB:', err);
                    return false;
                });
                this._lastIdbPurgePromise = idbClearPromise;
            }
        } catch (e) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ فشل مسح localStorage:', e);
            }
        }
        if (typeof AppState !== 'undefined' && AppState.appData && typeof AppState.appData === 'object') {
            Object.keys(AppState.appData).forEach((key) => {
                if (key === 'systemStatistics') return;
                const val = AppState.appData[key];
                if (Array.isArray(val)) {
                    AppState.appData[key] = [];
                } else if (val && typeof val === 'object') {
                    AppState.appData[key] = {};
                } else {
                    AppState.appData[key] = null;
                }
            });
        }
        if (typeof AppState !== 'undefined') {
            AppState.syncMeta = { sheets: {}, lastSyncTime: 0, userEmail: null };
            AppState._localDataIsTruncated = false;
            AppState._truncatedFields = {};
            AppState._serverReleaseHighlights = null;
        }

        // إرجاع كافة مؤشرات ذاكرة المديولات المؤقتة إلى الحساب الجديد
        if (typeof window !== 'undefined') {
            try { if (window.Clinic) { window.Clinic._visitsBackendFetchOk = false; window.Clinic._approvalsBackendFetchOk = false; } } catch (e) {}
            try { if (window.Training) { window.Training._trainingBackendFetchOk = false; window.Training._trainingDataLoadPromise = null; } } catch (e) {}
            try { if (window.ChemicalSafety) { window.ChemicalSafety._chemicalBackendFetchOk = false; window.ChemicalSafety._chemicalDataLoadPromise = null; } } catch (e) {}
            try { if (window.DailyObservations) { window.DailyObservations._dailyObsBackendFetchOk = false; window.DailyObservations._dailyObsLoadPromise = null; } } catch (e) {}
            try {
                if (window.PTW) {
                    window.PTW._metricsDatasetCache = null;
                    window.PTW._registrySanitizedCache = null;
                    window.PTW._mergedPermitsCache = null;
                }
            } catch (e) {}
        }

        if (AppState && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
            Utils.safeLog('🧹 تم مسح البيانات المحلية' + (reason ? ': ' + reason : ''));
        }
        return idbClearPromise;
    },

    async awaitLastPurge(timeoutMs) {
        const p = this._lastIdbPurgePromise;
        if (!p || typeof p.then !== 'function') return true;
        const ms = Math.max(500, Number(timeoutMs) || 4000);
        let timedOut = false;
        try {
            const result = await Promise.race([
                Promise.resolve(p).then((v) => (v === false ? false : true)).catch(() => false),
                new Promise((resolve) => setTimeout(() => {
                    timedOut = true;
                    resolve('__timeout__');
                }, ms))
            ]);
            if (result === '__timeout__' || timedOut) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ انتهت مهلة انتظار تفريغ IndexedDB — يُرفض التحميل حتى يكتمل المسح');
                }
                return false;
            }
            return result !== false;
        } catch (_e) {
            return false;
        }
    },

    /**
     * انتظار المسح ثم رفض التحميل إن لم يكتمل — للاستخدام قبل DataManager.load
     */
    async ensurePurgeSettledBeforeLoad(timeoutMs) {
        const ok = await this.awaitLastPurge(timeoutMs);
        if (!ok) {
            // محاولة مسح إضافية قصيرة ثم انتظار مرة أخرى
            try {
                if (typeof LocalDBCache !== 'undefined' && typeof LocalDBCache.clear === 'function') {
                    this._lastIdbPurgePromise = LocalDBCache.clear().catch(() => false);
                }
            } catch (_e) { /* ignore */ }
            const retry = await this.awaitLastPurge(Math.max(1500, Number(timeoutMs) || 4000));
            return retry === true;
        }
        return true;
    },

    _resolveSessionEmailHint_() {
        try {
            const sessionStr = sessionStorage.getItem('hse_current_session');
            if (sessionStr) {
                const parsed = JSON.parse(sessionStr);
                if (parsed && parsed.email) return String(parsed.email).trim().toLowerCase();
            }
        } catch (_e) { /* ignore */ }
        try {
            const remStr = localStorage.getItem('hse_remember_user');
            if (remStr) {
                const parsed = JSON.parse(remStr);
                if (parsed && parsed.email) return String(parsed.email).trim().toLowerCase();
            }
        } catch (_e2) { /* ignore */ }
        if (AppState && AppState.currentUser && AppState.currentUser.email) {
            return String(AppState.currentUser.email).trim().toLowerCase();
        }
        try {
            const last = localStorage.getItem('hse_last_user_email');
            if (last) return String(last).trim().toLowerCase();
        } catch (_e3) { /* ignore */ }
        return '';
    },

    _readStoredCacheOwnerEmail_() {
        try {
            const last = localStorage.getItem('hse_last_user_email');
            if (last) return String(last).trim().toLowerCase();
        } catch (_e) { /* ignore */ }
        try {
            const syncMetaStr = localStorage.getItem('hse_sync_meta');
            if (syncMetaStr) {
                const sm = JSON.parse(syncMetaStr);
                if (sm && sm.userEmail) return String(sm.userEmail).trim().toLowerCase();
            }
        } catch (_e2) { /* ignore */ }
        try {
            const raw = localStorage.getItem('hse_app_data');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed._ownerEmail) return String(parsed._ownerEmail).trim().toLowerCase();
            }
        } catch (_e3) { /* ignore */ }
        return '';
    },

    /**
     * إذا تغيّر المستخدم — مسح cache الجلسة السابقة فوراً قبل التحميل لمنع تسريب البيانات
     */
    purgeIfUserChanged(newUserEmail) {
        const next = newUserEmail ? String(newUserEmail).trim().toLowerCase() : '';
        if (!next) return false;

        let prev = '';

        // 1. فحص البريد الإلكتروني للمستخدم السابق من localStorage
        try {
            const lastEmail = localStorage.getItem('hse_last_user_email');
            if (lastEmail) prev = String(lastEmail).trim().toLowerCase();
        } catch (e) {}

        // 2. فحص syncMeta
        if (!prev && AppState && AppState.syncMeta && AppState.syncMeta.userEmail) {
            prev = String(AppState.syncMeta.userEmail).trim().toLowerCase();
        }

        // 3. فحص المستخدم الحالي في AppState
        if (!prev && AppState && AppState.currentUser && AppState.currentUser.email) {
            prev = String(AppState.currentUser.email).trim().toLowerCase();
        }

        // 4. فحص الجلسة المؤقتة في sessionStorage
        if (!prev) {
            try {
                const sessionStr = sessionStorage.getItem('hse_current_session');
                if (sessionStr) {
                    const parsed = JSON.parse(sessionStr);
                    if (parsed && parsed.email) prev = String(parsed.email).trim().toLowerCase();
                }
            } catch (e) {}
        }

        // 5. فحص الجلسة المحفوظة في localStorage
        if (!prev) {
            try {
                const remStr = localStorage.getItem('hse_remember_user');
                if (remStr) {
                    const parsed = JSON.parse(remStr);
                    if (parsed && parsed.email) prev = String(parsed.email).trim().toLowerCase();
                }
            } catch (e) {}
        }

        // 6. مالك الكاش المخزّن (_ownerEmail / syncMeta)
        if (!prev) {
            prev = this._readStoredCacheOwnerEmail_() || '';
        }

        let purged = false;
        const hasLocalPayload = !!(
            localStorage.getItem('hse_app_data') ||
            localStorage.getItem('hse_ptw_list') ||
            localStorage.getItem('hse_ptw_registry') ||
            localStorage.getItem('hse_incidents_registry') ||
            localStorage.getItem('hse_sync_meta')
        );

        if (prev && prev !== next) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn(`🔒 [SECURITY DATA PROTECTION] تم اكتشاف تغيير المستخدم من (${prev}) إلى (${next}) — مسح بيانات وكاش الجلسة السابقة.`);
            }
            this.purgeLocalAppData('user_changed');
            purged = true;
        } else if (!prev) {
            // بدون مالك معروف: امسح LS إن وُجد + IDB دائماً (قد يكون يتيم بدون مفاتيح LS)
            if (hasLocalPayload || typeof LocalDBCache !== 'undefined') {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('🔒 [SECURITY DATA PROTECTION] كاش محلي/IDB بدون مالك — مسح قبل ربط الجلسة الجديدة.');
                }
                this.purgeLocalAppData('orphan_cache_no_owner');
                purged = true;
            }
        }

        // حفظ البريد الإلكتروني للمستخدم الجديد لمنع التسريب في الجلسات القادمة
        try {
            localStorage.setItem('hse_last_user_email', next);
        } catch (e) {}
        if (AppState) {
            if (!AppState.syncMeta) AppState.syncMeta = { sheets: {}, lastSyncTime: 0 };
            AppState.syncMeta.userEmail = next;
        }
        this._lastPurgeBoundEmail = next;

        return purged;
    },

    _isEffectiveAdminForStorage() {
        try {
            return !!(typeof Permissions !== 'undefined'
                && typeof Permissions.isCurrentUserEffectiveAdmin === 'function'
                && AppState.currentUser
                && Permissions.isCurrentUserEffectiveAdmin(AppState.currentUser));
        } catch (e) {
            return false;
        }
    },

    _stripUserRecordForStorage(user, isAdmin, currentEmail) {
        if (!user || typeof user !== 'object') return user;
        const out = { ...user };
        this._USER_SENSITIVE_FIELDS.forEach((f) => {
            if (Object.prototype.hasOwnProperty.call(out, f)) delete out[f];
        });
        const email = out.email ? String(out.email).trim().toLowerCase() : '';
        const isSelf = currentEmail && email === String(currentEmail).trim().toLowerCase();
        if (!isAdmin && !isSelf) {
            delete out.permissions;
        }
        if (!isAdmin) {
            return {
                id: out.id,
                name: out.name,
                email: out.email,
                department: out.department,
                role: out.role,
                active: out.active,
                jobTitle: out.jobTitle,
                phone: out.phone,
                photo: out.photo,
                isOnline: out.isOnline,
                ...(isSelf && out.permissions ? { permissions: out.permissions } : {})
            };
        }
        return out;
    },

    sanitizeAppDataForStorage(appData) {
        if (!appData || typeof appData !== 'object') return appData;
        const isAdmin = this._isEffectiveAdminForStorage();
        const currentEmail = AppState && AppState.currentUser ? AppState.currentUser.email : '';
        const out = { ...appData };
        if (Array.isArray(out.users)) {
            out.users = out.users.map((u) => this._stripUserRecordForStorage(u, isAdmin, currentEmail));
        }
        const owner = String(currentEmail || this._resolveSessionEmailHint_() || '').trim().toLowerCase();
        if (owner) {
            out._ownerEmail = owner;
            try { localStorage.setItem('hse_last_user_email', owner); } catch (_e) { /* ignore */ }
        }
        return out;
    },

    /**
     * تقدير حجم استخدام localStorage بالبايتات (للتشخيص فقط)
     */
    getLocalStorageSize() {
        try {
            let total = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) total += (localStorage.getItem(key) || '').length * 2; // UTF-16
            }
            return total;
        } catch (e) {
            return 0;
        }
    },

    /**
     * بناء نسخة مخففة من appData (قص المصفوفات الكبيرة) لتجنب امتلاء التخزين
     * البيانات الكاملة تبقى في الذاكرة وفي Google Sheets
     */
    buildLightAppData(appData) {
        if (!appData || typeof appData !== 'object') return appData;
        const heavyKeys = [
            'training', 'trainingSessions', 'trainingCertificates', 'trainingAttendance',
            'contractorTrainings', 'violations', 'blacklistRegister', 'incidents',
            'dailyObservations', 'dailySafetyCheckList', 'trainingAnalysisData',
            'contractorEvaluations', 'contractorApprovalRequests', 'contractorEvaluationApprovalRequests', 'contractorDeletionRequests',
            'annualTrainingPlans', 'nearmiss', 'inspections', 'chemicalInventory',
            'clinicVisits', 'clinicMedications', 'clinicInventory', 'clinicInjuries', 'clinicSickLeave', 'clinicStaff', 'clinicStaffAttendance', 'clinicStaffTimeOffRequests'
        ];
        const maxItems = this.MAX_ITEMS_PER_ARRAY_IN_LIGHT;
        const out = {};
        // تتبع الحقول التي تم بترها مع عدد العناصر الحقيقي
        const truncatedFields = {};

        /**
         * إزالة حقول base64 الكبيرة (صور، مرفقات) من سجل واحد
         * لا تُحذف البيانات من الذاكرة — فقط من النسخة المحلية المحفوظة
         */
        const stripHeavyFields = (record) => {
            if (!record || typeof record !== 'object') return record;
            const stripped = { ...record };
            // حذف الصور الكبيرة base64
            for (const field of ['photo', 'photoBase64', 'image', 'imageBase64', 'signature', 'signatureBase64']) {
                if (typeof stripped[field] === 'string' && stripped[field].startsWith('data:')) {
                    stripped[field] = '__stripped__';
                }
            }
            // تقليص المرفقات إلى أسمائها فقط (بدون محتوى base64)
            if (Array.isArray(stripped.attachments)) {
                stripped.attachments = stripped.attachments.map(a => {
                    if (!a || typeof a !== 'object') return a;
                    const { name, fileName, type, size } = a;
                    return { name, fileName, type, size, __stripped: true };
                });
            }
            return stripped;
        };

        for (const key of Object.keys(appData)) {
            const val = appData[key];
            if (heavyKeys.indexOf(key) >= 0 && Array.isArray(val)) {
                // 1. اقتطاع العناصر الزائدة
                const sliced = val.length > maxItems ? val.slice(-maxItems) : val;
                if (val.length > maxItems) truncatedFields[key] = val.length;
                // 2. إزالة base64 من كل عنصر
                out[key] = sliced.map(stripHeavyFields);
            } else if (key === 'employeeTrainingMatrix' && val && typeof val === 'object') {
                const entries = Object.entries(val);
                if (entries.length > 500) {
                    out[key] = Object.fromEntries(entries.slice(-500));
                    truncatedFields[key] = entries.length;
                } else {
                    out[key] = val;
                }
            } else {
                out[key] = val;
            }
        }

        // إضافة metadata تشير إلى أن هذه نسخة مخففة مبتورة
        out._lightDataMeta = {
            isLight: true,
            truncatedAt: Date.now(),
            fields: truncatedFields
        };

        return out;
    },

    /**
     * مسح عناصر تخزين غير ضرورية لتحرير مساحة عند امتلاء التخزين
     */
    _clearNonEssentialStorage() {
        try {
            localStorage.removeItem('hse_pending_sync_queue');
            if (AppState.debugMode) Utils.safeLog('ℹ️ تم مسح قائمة المزامنة المعلقة لتحرير مساحة');
        } catch (e) {
            Utils.safeWarn('⚠️ فشل مسح عناصر التخزين:', e);
        }
    },

    /**
     * تحميل قائمة المزامنة المعلقة من localStorage
     */
    loadPendingSyncQueue() {
        try {
            const saved = localStorage.getItem('hse_pending_sync_queue');
            if (saved) {
                const parsed = JSON.parse(saved);
                const rawQueue = Array.isArray(parsed) ? parsed : [];
                // ترحيل متوافق: تطبيع payloads القديمة عند التحميل قبل أي retry
                this._pendingSyncQueue = rawQueue.map((item) => {
                    if (!item || typeof item !== 'object') return item;
                    const sheetName = item.sheetName;
                    const normalizedData = (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.prepareSheetPayload === 'function')
                        ? GoogleIntegration.prepareSheetPayload(sheetName, item.data)
                        : item.data;
                    return { ...item, data: normalizedData };
                });
                this.savePendingSyncQueue();
            } else {
                this._pendingSyncQueue = [];
            }
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في تحميل قائمة المزامنة المعلقة:', error);
            this._pendingSyncQueue = [];
        }
    },

    /**
     * حفظ قائمة المزامنة المعلقة في localStorage
     */
    savePendingSyncQueue() {
        try {
            if (this._pendingSyncQueue && this._pendingSyncQueue.length > 0) {
                localStorage.setItem('hse_pending_sync_queue', Utils.safeStringify(this._pendingSyncQueue));
            } else {
                localStorage.removeItem('hse_pending_sync_queue');
            }
        } catch (error) {
            Utils.safeWarn('⚠️ خطأ في حفظ قائمة المزامنة المعلقة:', error);
        }
    },

    /**
     * إضافة عنصر جديد إلى قائمة المزامنة المعلقة
     */
    addToPendingSync(sheetName, data, timestamp = null) {
        if (!this._pendingSyncQueue) {
            this.loadPendingSyncQueue();
        }
        
        // البحث عن العنصر - إذا كان موجوداً يتم تحديثه بدلاً من إضافة نسخة جديدة
        const existingIndex = this._pendingSyncQueue.findIndex(
            item => item.sheetName === sheetName
        );

        const normalizedData = (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.prepareSheetPayload === 'function')
            ? GoogleIntegration.prepareSheetPayload(sheetName, data)
            : data;

        const pendingItem = {
            sheetName,
            data: JSON.parse(Utils.safeStringify(normalizedData)), // نسخ عميق
            timestamp: timestamp || new Date().toISOString(),
            retryCount: existingIndex >= 0 ? this._pendingSyncQueue[existingIndex].retryCount || 0 : 0
        };
        
        if (existingIndex >= 0) {
            this._pendingSyncQueue[existingIndex] = pendingItem;
        } else {
            this._pendingSyncQueue.push(pendingItem);
        }
        
        this.savePendingSyncQueue();
        Utils.safeLog(`✅ تمت إضافة ${sheetName} إلى قائمة المزامنة المعلقة بنجاح`);
    },
    
    /**
     * إزالة عنصر من قائمة المزامنة المعلقة بعد نجاح المزامنة
     */
    removeFromPendingSync(sheetName) {
        if (!this._pendingSyncQueue) {
            this.loadPendingSyncQueue();
        }
        
        const index = this._pendingSyncQueue.findIndex(item => item.sheetName === sheetName);
        if (index >= 0) {
            this._pendingSyncQueue.splice(index, 1);
            this.savePendingSyncQueue();
        }
    },
    
    /**
     * إعادة محاولة مزامنة جميع العناصر المعلقة في قائمة الانتظار
     */
    async retryPendingSync() {
        if (!this._pendingSyncQueue) {
            this.loadPendingSyncQueue();
        }
        
        if (!this._pendingSyncQueue || this._pendingSyncQueue.length === 0) {
            return { success: true, synced: 0, failed: 0 };
        }
        
        // التحقق من تفعيل Google Apps Script
        if (!AppState.googleConfig || !AppState.googleConfig.appsScript || !AppState.googleConfig.appsScript.enabled || !AppState.googleConfig.appsScript.scriptUrl) {
            Utils.safeLog('ℹ️ Google Apps Script غير مفعّل، تخطي المزامنة');
            return { success: false, synced: 0, failed: 0, message: 'Google Apps Script غير مفعّل' };
        }
        
        // التحقق من وجود معرف Google Sheets
        const spreadsheetId = AppState.googleConfig.sheets?.spreadsheetId?.trim();
        if (!spreadsheetId || spreadsheetId === '') {
            Utils.safeLog('ℹ️ معرف Google Sheets غير محدد، تخطي المزامنة');
            return { success: false, synced: 0, failed: 0, message: 'معرف Google Sheets غير محدد' };
        }
        
        const results = { success: true, synced: 0, failed: 0, errors: [] };
        const maxRetries = 3;
        
        // نسخ قائمة الانتظار لتجنب التعديل أثناء التكرار
        const queueCopy = [...this._pendingSyncQueue];
        
        for (const item of queueCopy) {
            if (item.retryCount >= maxRetries) {
                // تجاوز الحد الأقصى للمحاولات - إزالة من قائمة الانتظار
                this.removeFromPendingSync(item.sheetName);
                results.failed++;
                results.errors.push(`${item.sheetName}: تجاوز الحد الأقصى للمحاولات`);
                continue;
            }
            
            try {
                // زيادة عداد المحاولات
                item.retryCount = (item.retryCount || 0) + 1;
                const preparedData = (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.prepareSheetPayload === 'function')
                    ? GoogleIntegration.prepareSheetPayload(item.sheetName, item.data)
                    : item.data;
                
                // محاولة المزامنة
                await GoogleIntegration.sendToAppsScript('appendToSheet', {
                    sheetName: item.sheetName,
                    data: preparedData,
                    spreadsheetId: spreadsheetId
                });
                
                // نجحت المزامنة - إزالة من قائمة الانتظار
                this.removeFromPendingSync(item.sheetName);
                results.synced++;
                Utils.safeLog(`✅ تمت مزامنة ${item.sheetName} بنجاح`);
            } catch (error) {
                // فشلت المزامنة - الاحتفاظ في قائمة الانتظار
                const index = this._pendingSyncQueue.findIndex(i => i.sheetName === item.sheetName);
                if (index >= 0) {
                    this._pendingSyncQueue[index] = item;
                }
                this.savePendingSyncQueue();
                results.failed++;
                
                // تسجيل الخطأ فقط إذا لم يكن خطأ "معرف Google Sheets غير محدد"
                const errorMsg = error.message || 'خطأ غير معروف';
                if (!errorMsg.includes('معرف Google Sheets غير محدد') && !errorMsg.includes('Google Sheets غير مفعّل')) {
                    results.errors.push(`${item.sheetName}: ${errorMsg}`);
                    Utils.safeWarn(`⚠️ فشلت مزامنة ${item.sheetName}:`, errorMsg);
                    const rejectedFieldMatch = String(errorMsg).match(/حقل غير مسموح في البيانات:\s*([^\s(]+)/i);
                    if (rejectedFieldMatch && rejectedFieldMatch[1]) {
                        Utils.safeWarn(`⚠️ تم رفض حقل في queue (${item.sheetName}): ${rejectedFieldMatch[1]}`);
                    }
                }
            }
        }
        
        return results;
    },
    
    /**
     * تحميل البيانات المحلية من localStorage
     */
    async load() {
        try {
            // ✅ حماية: التأكد من وجود AppState.appData قبل التحميل
            if (!AppState) {
                Utils.safeError('❌ AppState غير موجود - لا يمكن تحميل البيانات');
                return false;
            }
            if (!AppState.appData) {
                AppState.appData = {};
            }

            // انتظار أي تفريغ IndexedDB سابق — رفض التحميل إن لم يكتمل
            if (typeof this.ensurePurgeSettledBeforeLoad === 'function') {
                const settled = await this.ensurePurgeSettledBeforeLoad(5000);
                if (!settled) {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                        Utils.safeWarn('🔒 تخطي تحميل الكاش — تفريغ IndexedDB لم يكتمل');
                    }
                    return false;
                }
            } else if (typeof this.awaitLastPurge === 'function') {
                const ok = await this.awaitLastPurge(5000);
                if (!ok) return false;
            }

            const expectedOwner = this._resolveSessionEmailHint_();
            const cacheOwner = this._readStoredCacheOwnerEmail_();
            if (expectedOwner && cacheOwner && expectedOwner !== cacheOwner) {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn(`🔒 رفض تحميل كاش محلي لمستخدم آخر (${cacheOwner} ≠ ${expectedOwner})`);
                }
                await this.purgeLocalAppData('load_owner_mismatch');
                return false;
            }
            // كاش بدون مالك + توجد جلسة متوقعة → لا نحمّل بيانات يتيمة
            if (expectedOwner && !cacheOwner) {
                const orphanPayload = !!(
                    localStorage.getItem('hse_app_data') ||
                    localStorage.getItem('hse_ptw_list') ||
                    localStorage.getItem('hse_ptw_registry')
                );
                if (orphanPayload) {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                        Utils.safeWarn('🔒 رفض كاش يتيم أثناء استعادة الجلسة — مسح');
                    }
                    await this.purgeLocalAppData('load_orphan_with_session');
                    return false;
                }
            }
            
            const saved = localStorage.getItem('hse_app_data');
            if (saved) {
                const parsedData = await this._parseJsonNonBlocking_(saved, 'hse_app_data');
                const payloadOwner = parsedData && parsedData._ownerEmail
                    ? String(parsedData._ownerEmail).trim().toLowerCase()
                    : '';
                if (expectedOwner && payloadOwner && expectedOwner !== payloadOwner) {
                    await this.purgeLocalAppData('load_payload_owner_mismatch');
                    return false;
                }

                await this._assignParsedAppDataChunked_(parsedData);

                if (AppState.debugMode) {
                    const totalRecords = Object.keys(parsedData).reduce((sum, key) => {
                        if (Array.isArray(parsedData[key])) {
                            return sum + parsedData[key].length;
                        }
                        return sum;
                    }, 0);
                    Utils.safeLog(`✅ تم تحميل ${totalRecords} سجل من البيانات المحلية`);
                }

                // ✅ اكتشاف البيانات المبتورة: إذا كانت النسخة المحلية مبتورة نُعلم التطبيق
                if (parsedData._lightDataMeta && parsedData._lightDataMeta.isLight) {
                    AppState._localDataIsTruncated = true;
                    AppState._truncatedFields = parsedData._lightDataMeta.fields || {};
                    Utils.safeLog('⚠️ البيانات المحلية مبتورة - سيتم إعادة التحميل من الخادم:', AppState._truncatedFields);
                    try {
                        if (typeof OfflineBanner !== 'undefined' && typeof OfflineBanner.setLightLocalData === 'function') {
                            // بانر قصير فقط عند التحميل — بدون toast إضافي هنا
                            OfflineBanner.setLightLocalData(true);
                        }
                    } catch (_eLight) { /* ignore */ }
                } else {
                    AppState._localDataIsTruncated = false;
                    AppState._truncatedFields = {};
                }
            }

            // ✅ تحميل الكاش عالي السعة من IndexedDB لمنع الفقدان عند تجاوز 5MB
            if (typeof LocalDBCache !== 'undefined') {
                try {
                    const dbData = await LocalDBCache.get('hse_app_data');
                    if (dbData && typeof dbData === 'object') {
                        const idbOwner = dbData._ownerEmail
                            ? String(dbData._ownerEmail).trim().toLowerCase()
                            : '';
                        // استعادة فورية لكاش IndexedDB لضمان سرعة 0ms بدون انتظار الشبكة
                        if (expectedOwner && idbOwner && expectedOwner !== idbOwner) {
                            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                                Utils.safeWarn('🔒 رفض IndexedDB لمستخدم آخر مختلف');
                            }
                        } else {
                        let restoredCount = 0;
                        const idbKeys = Object.keys(dbData);
                        let itemsSinceYield = 0;
                        const yieldEvery = this.LOAD_YIELD_EVERY_ITEMS || 800;
                        for (let ik = 0; ik < idbKeys.length; ik++) {
                            const key = idbKeys[ik];
                            if (key === '_ownerEmail' || key === '_lightDataMeta') continue;
                            if (Array.isArray(dbData[key]) && dbData[key].length > 0) {
                                const currentArr = Array.isArray(AppState.appData[key]) ? AppState.appData[key] : [];
                                if (currentArr.length === 0 || dbData[key].length > currentArr.length) {
                                    AppState.appData[key] = LocalDBCache.sanitizeData(key, dbData[key]);
                                    restoredCount += dbData[key].length;
                                    itemsSinceYield += dbData[key].length;
                                    if (itemsSinceYield >= yieldEvery) {
                                        itemsSinceYield = 0;
                                        await this._yieldToMain_();
                                    }
                                }
                            }
                        }
                        if (restoredCount > 0 && AppState.debugMode) {
                            Utils.safeLog(`⚡ [IndexedDB] تم استعادة ${restoredCount} سجل من الكاش عالي السعة بنجاح (0ms)`);
                        }
                        }
                    }
                    // تنظيف صامت للكاش القديم لتخفيف المساحة
                    if (typeof LocalDBCache.purgeStaleCache === 'function') {
                        LocalDBCache.purgeStaleCache(60).catch(() => {});
                    }
                } catch (dbErr) {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                        Utils.safeWarn('⚠️ استثناء أثناء التحميل من IndexedDB:', dbErr);
                    }
                }
            }

            // ✅ استعادة ودمج بيانات PTW و PTWRegistry من المفاتيح المخصصة دائماً لعدم فقدان أي تصاريح بعد التحديث
            const parsePtwTime = (val) => {
                if (!val) return 0;
                const t = new Date(val).getTime();
                return isNaN(t) ? 0 : t;
            };
            const savedPtwList = localStorage.getItem('hse_ptw_list');
            if (savedPtwList) {
                try {
                    const parsedPtw = await this._parseJsonNonBlocking_(savedPtwList, 'hse_ptw_list');
                    if (Array.isArray(parsedPtw) && parsedPtw.length > 0) {
                        const currentPtw = Array.isArray(AppState.appData.ptw) ? AppState.appData.ptw : [];
                        const ptwMap = new Map();
                        let ptwCounter = 0;
                        const mergedPtw = parsedPtw.concat(currentPtw);
                        for (let pi = 0; pi < mergedPtw.length; pi++) {
                            const item = mergedPtw[pi];
                            if (item && typeof item === 'object') {
                                const key = String(item.id || item.permitId || item.paperPermitNumber || item.permitNumber || item.sequentialNumber || `ptw_fallback_${ptwCounter++}`).trim();
                                if (ptwMap.has(key)) {
                                    const existing = ptwMap.get(key);
                                    const existingTime = parsePtwTime(existing?.updatedAt || existing?.created_at || existing?.date);
                                    const itemTime = parsePtwTime(item?.updatedAt || item?.created_at || item?.date);
                                    if (itemTime >= existingTime) ptwMap.set(key, { ...existing, ...item });
                                } else {
                                    ptwMap.set(key, item);
                                }
                            }
                            if ((pi + 1) % 400 === 0) {
                                await this._yieldToMain_();
                            }
                        }
                        AppState.appData.ptw = Array.from(ptwMap.values());
                    }
                } catch (_) {}
            }
            const savedRegistry = localStorage.getItem('hse_ptw_registry');
            if (savedRegistry) {
                try {
                    const parsedReg = await this._parseJsonNonBlocking_(savedRegistry, 'hse_ptw_registry');
                    if (Array.isArray(parsedReg) && parsedReg.length > 0) {
                        const currentReg = Array.isArray(AppState.appData.ptwRegistry) ? AppState.appData.ptwRegistry : [];
                        const regMap = new Map();
                        let regCounter = 0;
                        const mergedReg = parsedReg.concat(currentReg);
                        for (let ri = 0; ri < mergedReg.length; ri++) {
                            const item = mergedReg[ri];
                            if (item && typeof item === 'object') {
                                const key = String(item.id || item.permitId || item.paperPermitNumber || item.sequentialNumber || `reg_fallback_${regCounter++}`).trim();
                                if (regMap.has(key)) {
                                    const existing = regMap.get(key);
                                    const existingTime = parsePtwTime(existing?.updatedAt || existing?.created_at || existing?.date);
                                    const itemTime = parsePtwTime(item?.updatedAt || item?.created_at || item?.date);
                                    if (itemTime >= existingTime) regMap.set(key, { ...existing, ...item });
                                } else {
                                    regMap.set(key, item);
                                }
                            }
                            if ((ri + 1) % 400 === 0) {
                                await this._yieldToMain_();
                            }
                        }
                        AppState.appData.ptwRegistry = Array.from(regMap.values());
                    }
                } catch (_) {}
            }

            if (typeof window.PTW !== 'undefined') {
                window.PTW._metricsDatasetCache = null;
                window.PTW._registrySanitizedCache = null;
                window.PTW._mergedPermitsCache = null;
                if (typeof window.PTW.initRegistry === 'function') {
                    try { window.PTW.initRegistry(true); } catch (_) {}
                }
            }
            
            // تهيئة systemStatistics إذا لم يكن موجوداً
            if (!AppState.appData.systemStatistics) {
                AppState.appData.systemStatistics = {
                    totalLogins: 0
                };
            } else if (typeof AppState.appData.systemStatistics.totalLogins !== 'number') {
                // التأكد من أن totalLogins هو رقم
                AppState.appData.systemStatistics.totalLogins = 0;
            }

            await this.loadCompanySettings();
            this.loadCloudStorageConfig();
            this.loadPendingSyncQueue();
            
            // ✅ إضافة: تحميل syncMeta
            try {
                const syncMetaStr = localStorage.getItem('hse_sync_meta');
                if (syncMetaStr) {
                    const savedSyncMeta = JSON.parse(syncMetaStr);
                    // التحقق من أن syncMeta ينتمي للمستخدم الحالي
                    const currentUserEmail = (AppState.currentUser?.email || this._resolveSessionEmailHint_() || '').toLowerCase();
                    const metaEmail = savedSyncMeta.userEmail ? String(savedSyncMeta.userEmail).trim().toLowerCase() : '';
                    if (currentUserEmail && !metaEmail) {
                        // جلسة متوقعة + meta بلا مالك — ارفض الدمج
                        if (AppState.syncMeta) {
                            AppState.syncMeta.sheets = {};
                            AppState.syncMeta.userEmail = currentUserEmail;
                            AppState.syncMeta.lastSyncTime = 0;
                        }
                    } else if (!currentUserEmail || metaEmail === currentUserEmail) {
                        AppState.syncMeta = {
                            ...AppState.syncMeta,
                            ...savedSyncMeta,
                            sheets: savedSyncMeta.sheets || {},
                            userEmail: currentUserEmail || metaEmail || savedSyncMeta.userEmail
                        };
                    } else {
                        // تغيير المستخدم - نمسح syncMeta القديم
                        if (AppState.syncMeta) {
                            AppState.syncMeta.sheets = {};
                            AppState.syncMeta.userEmail = currentUserEmail;
                            AppState.syncMeta.lastSyncTime = 0;
                        }
                    }
                }
            } catch (e) {
                Utils.safeWarn('⚠️ فشل تحميل syncMeta:', e);
            }
            
            // ✅ إصلاح: تحديث جلسة المستخدم الحالي بعد تحميل البيانات
            // هذا يضمن أن الصلاحيات محدثة من قاعدة البيانات
            // فقط إذا كانت هناك بيانات مستخدمين محملة ولم يتم تحديث الجلسة مؤخراً
            if (AppState.currentUser && 
                AppState.appData.users && 
                Array.isArray(AppState.appData.users) && 
                AppState.appData.users.length > 0 &&
                typeof window.Auth !== 'undefined' && 
                typeof window.Auth.updateUserSession === 'function') {
                
                // التحقق من وجود المستخدم الحالي في البيانات المحملة
                const currentUserEmail = AppState.currentUser.email?.toLowerCase();
                const userExists = AppState.appData.users.some(u => 
                    u.email && u.email.toLowerCase() === currentUserEmail
                );
                
                if (userExists) {
                    // تأخير بسيط للتأكد من اكتمال تحميل جميع البيانات
                    setTimeout(() => {
                        window.Auth.updateUserSession();
                        if (AppState.debugMode) {
                            Utils.safeLog('✅ تم تحديث الجلسة بعد تحميل البيانات المحلية');
                        }
                    }, 200);
                } else if (AppState.debugMode) {
                    Utils.safeLog('ℹ️ المستخدم الحالي غير موجود في البيانات المحملة - تخطي تحديث الجلسة');
                }
            }
            
            return true;
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل البيانات المحلية:', error);
            Notification.error('❌ فشل تحميل البيانات المحلية');
            return false;
        }
    },

    /**
     * حفظ البيانات المحلية في localStorage (مع debounce 300ms لتجنب الكتابات المتوازية)
     */
    save() {
        if (this._saveDebounceTimer) {
            clearTimeout(this._saveDebounceTimer);
        }
        this._saveDebounceTimer = setTimeout(() => {
            this._saveDebounceTimer = null;
            this._saveImmediate();
        }, 300);
        return true;
    },

    /** حفظ فوري بدون debounce — استخدمه عند تسجيل الخروج أو العمليات الحرجة */
    saveImmediate() {
        if (this._saveDebounceTimer) {
            clearTimeout(this._saveDebounceTimer);
            this._saveDebounceTimer = null;
        }
        return this._saveImmediate();
    },

    /**
     * التنفيذ الفعلي للحفظ — لا تستدعِه مباشرة، استخدم save() أو saveImmediate()
     * ملاحظة مهمة: حفظ البيانات المحلية فقط - لا يتم المزامنة مع Google Sheets هنا
     * يتم المزامنة تلقائياً باستخدام GoogleIntegration.autoSave() عند إضافة أو تعديل البيانات في Google Sheets
     */
    _saveImmediate() {
        try {
            // ✅ حماية: التأكد من وجود AppState.appData قبل الحفظ
            if (!AppState || !AppState.appData) {
                Utils.safeWarn('⚠️ AppState.appData غير موجود - لا يمكن حفظ البيانات');
                return false;
            }
            
            const dataToSave = this.sanitizeAppDataForStorage(AppState.appData);
            
            // ✅ حفظ كامل البيانات في IndexedDB لتفادي قيد الـ 5MB في localStorage وحماية البيانات من الفقد
            if (typeof LocalDBCache !== 'undefined' && typeof LocalDBCache.set === 'function') {
                LocalDBCache.set('hse_app_data', dataToSave).catch(e => {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                        Utils.safeWarn('⚠️ فشل الحفظ في IndexedDB:', e);
                    }
                });
            }

            const serialized = Utils.safeStringify(dataToSave);
            if (!serialized) {
                Utils.safeWarn('⚠️ فشل تسلسل البيانات');
                return false;
            }
            const safeLimit = this.SAFE_APP_DATA_BYTES;
            // إذا تجاوز الحجم الحد الآمن، نحفظ نسخة مخففة مباشرة (بدون محاولة حفظ كاملة)
            if (serialized.length > safeLimit) {
                const light = this.buildLightAppData(this.sanitizeAppDataForStorage(AppState.appData));
                const lightSerialized = Utils.safeStringify(light);
                if (lightSerialized && lightSerialized.length <= safeLimit) {
                    try {
                        localStorage.setItem('hse_app_data', lightSerialized);
                        this._saveSyncMeta();
                        this.saveCompanySettings();
                        // تسجيل في الـ console فقط — لا إشعار مرئي للمستخدم (البيانات الكاملة في الذاكرة وGoogle Sheets)
                        Utils.safeLog('ℹ️ [DataManager] تم حفظ نسخة مخففة محلياً. البيانات الكاملة في الذاكرة وGoogle Sheets.');
                        this._notifyLightLocalSave('over_safe_limit');
                        return true;
                    } catch (e) {
                        Utils.safeWarn('⚠️ فشل حفظ النسخة المخففة:', e);
                    }
                }
                // الحجم كبير جداً حتى بعد التخفيف — سجّل في Console فقط بدون إزعاج المستخدم
                if (!this._hasShownLargeDataWarning) {
                    this._hasShownLargeDataWarning = true;
                    Utils.safeWarn('⚠️ [DataManager] حجم البيانات كبير جداً للـ localStorage — البيانات محفوظة في الذاكرة وGoogle Sheets');
                }
                return false;
            }
            localStorage.setItem('hse_app_data', serialized);
            this.saveCompanySettings();
            this._saveSyncMeta();
            try {
                if (typeof PTW !== 'undefined' && typeof PTW.persistPtwLocalState === 'function') {
                    PTW.persistPtwLocalState();
                }
            } catch (_) {}
            // ملاحظة: _saveCacheTimestamps لا تُستدعى هنا — تُحدَّث timestamps فقط عبر recordServerFetch()
            // بعد الجلب الفعلي من الخادم، لمنع إعادة ضبط TTL عند الحفظ المحلي

            // ✅ تحديث كروت لوحة التحكم فوراً بعد كل حفظ محلي (جميع الموديولات)
            try {
                if (typeof Dashboard !== 'undefined') {
                    if (typeof Dashboard.updateStats === 'function') Dashboard.updateStats();
                    if (typeof Dashboard.updateReportsStatistics === 'function') Dashboard.updateReportsStatistics();
                }
            } catch (_) { /* تجاهل لعدم إيقاف عملية الحفظ */ }

            return true;
        } catch (error) {
            const isQuotaExceeded = (error.name === 'QuotaExceededError' || (error.code === 22)) || (error.message && (error.message.includes('QuotaExceeded') || error.message.includes('quota')));
            const isSecurityError = (error.name === 'SecurityError' || (error.code === 18)) || (error.message && error.message.toLowerCase().includes('security'));
            const isStackOverflow = error.message && (error.message.includes('Maximum call stack') || error.message.includes('stack overflow'));
            
            Utils.safeError('❌ خطأ في حفظ البيانات المحلية:', error.name || error.code, error.message);
            
            if (isStackOverflow) {
                if (!this._hasShownLargeDataWarning) {
                    this._hasShownLargeDataWarning = true;
                    Utils.safeWarn('⚠️ [DataManager] حجم البيانات كبير جداً للـ localStorage — البيانات محفوظة في الذاكرة وGoogle Sheets');
                }
                return false;
            }
            if (isQuotaExceeded) {
                // محاولة تحرير مساحة ثم حفظ نسخة مخففة
                try {
                    this._clearNonEssentialStorage();
                    const light = this.buildLightAppData(this.sanitizeAppDataForStorage(AppState.appData));
                    const lightSerialized = Utils.safeStringify(light);
                    if (lightSerialized && lightSerialized.length < this.SAFE_APP_DATA_BYTES) {
                        localStorage.setItem('hse_app_data', lightSerialized);
                        this._saveSyncMeta();
                        this.saveCompanySettings();
                        Utils.safeLog('ℹ️ [DataManager] تم حفظ نسخة مخففة بعد امتلاء التخزين.');
                        this._notifyLightLocalSave('quota_exceeded');
                        return true;
                    }
                } catch (e2) {
                    Utils.safeWarn('⚠️ فشل حفظ النسخة المخففة بعد امتلاء التخزين:', e2);
                }
                // عدم إظهار رسالة للمستخدم؛ البيانات في الذاكرة وGoogle Sheets
                return false;
            }
            if (isSecurityError) {
                Utils.safeWarn('⚠️ التخزين المحلي غير متاح (وضع خاص أو إعدادات المتصفح)');
                return false;
            }
            // عدم إظهار رسالة للمستخدم؛ المزامنة تتم تلقائياً عند الحاجة
            return false;
        }
    },

    _saveSyncMeta() {
        try {
            if (AppState.syncMeta) {
                localStorage.setItem('hse_sync_meta', Utils.safeStringify(AppState.syncMeta));
            }
        } catch (e) {
            Utils.safeWarn('⚠️ فشل حفظ syncMeta:', e);
        }
    },

    /**
     * ✅ إعادة تحميل الحقول المبتورة من الخادم في الخلفية
     * تُستدعى عند اكتشاف أن البيانات المحلية مبتورة (isLight=true)
     */
    async refreshTruncatedDataFromServer() {
        if (!AppState._localDataIsTruncated) return;
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) return;
        if (!AppState.googleConfig?.appsScript?.enabled) return;

        // خريطة اسم الحقل في AppState → اسم الورقة في Google Sheets
        const fieldToSheetMap = {
            'training': 'Training',
            'trainingSessions': 'Training',
            'violations': 'Violations',
            'incidents': 'Incidents',
            'dailyObservations': 'DailyObservations',
            'dailySafetyCheckList': 'DailySafetyCheckList',
            'ptw': 'PTW',
            'ptwRegistry': 'PTWRegistry',
            'contractorEvaluations': 'ContractorEvaluations',
            'contractorApprovalRequests': 'ContractorApprovalRequests',
            'contractorEvaluationApprovalRequests': 'ContractorEvaluationApprovalRequests',
            'contractorDeletionRequests': 'ContractorDeletionRequests',
            'blacklistRegister': 'Blacklist_Register',
            'annualTrainingPlans': 'AnnualTrainingPlans',
            'trainingCertificates': 'TrainingCertificates',
            'trainingAttendance': 'Training',
            'contractorTrainings': 'ContractorTrainings',
            'trainingAnalysisData': 'Training'
        };

        const truncatedFields = AppState._truncatedFields || {};
        const fieldsToRefresh = Object.keys(truncatedFields).filter(f => fieldToSheetMap[f]);

        if (fieldsToRefresh.length === 0) return;

        Utils.safeLog(`🔄 إعادة تحميل ${fieldsToRefresh.length} حقل مبتور من الخادم...`);

        const refreshPromises = fieldsToRefresh.map(field => {
            const sheetName = fieldToSheetMap[field];
            return GoogleIntegration.sendRequest({
                action: 'readFromSheet',
                data: { sheetName }
            }).then(result => ({ field, result }))
              .catch(err => ({ field, error: err }));
        });

        const results = await Promise.all(refreshPromises);

        let refreshed = 0;
        results.forEach(({ field, result, error }) => {
            if (result && result.success && Array.isArray(result.data)) {
                AppState.appData[field] = result.data;
                refreshed++;
                Utils.safeLog(`✅ تم تحديث ${field}: ${result.data.length} سجل (كان مبتوراً على ${truncatedFields[field]})`);
            } else if (error) {
                Utils.safeWarn(`⚠️ فشل تحديث ${field}:`, error.message || error);
            }
        });

        if (refreshed > 0) {
            // مسح علامة البتر بعد التحديث الناجح
            AppState._localDataIsTruncated = false;
            AppState._truncatedFields = {};
            // حفظ البيانات الكاملة محلياً
            try { this.save(); } catch (e) {}
            Utils.safeLog(`✅ اكتمل تحديث البيانات المبتورة: ${refreshed}/${fieldsToRefresh.length} حقل`);
            // إشعار المستخدم باكتمال التحميل
            try {
                if (typeof Notification !== 'undefined' && Notification.success) {
                    Notification.success('تم تحميل البيانات الكاملة بنجاح');
                }
            } catch (e) { /* ignore */ }
            // إطلاق حدث لتحديث واجهة المستخدم
            try {
                window.dispatchEvent(new CustomEvent('hse:dataRefreshed', {
                    detail: { refreshedFields: fieldsToRefresh.slice(0, refreshed) }
                }));
            } catch (e) { /* ignore */ }
        }
    },

    /**
     * حفظ timestamps فقط للحقول التي تم جلبها حديثاً من الخادم
     * لا يُحدِّث timestamps للحقول غير المتأثرة — لمنع إعادة ضبط عداد TTL عند أي save() محلي
     * @param {string[]} [updatedKeys] - مفاتيح AppState التي تم جلبها من الخادم الآن
     */
    _saveCacheTimestamps(updatedKeys) {
        try {
            // قراءة الـ timestamps الحالية (للاحتفاظ بقيم الحقول غير المحدَّثة)
            let timestamps = {};
            try {
                const existing = localStorage.getItem('hse_cache_timestamps');
                if (existing) timestamps = JSON.parse(existing);
            } catch (e) { /* ignore */ }

            const now = Date.now();

            if (updatedKeys && updatedKeys.length > 0) {
                // ✅ تحديث الحقول المحدَّدة فقط (تم جلبها من الخادم)
                updatedKeys.forEach(key => {
                    timestamps[key] = now;
                });
            }
            // ملاحظة: بدون updatedKeys لا يحدث أي تحديث — يتم استدعاء الدالة فقط مع مفاتيح

            localStorage.setItem('hse_cache_timestamps', JSON.stringify(timestamps));
        } catch (e) {
            // فشل صامت - لا يؤثر على الوظائف الأخرى
        }
    },

    /**
     * تسجيل وقت الجلب الفعلي من الخادم لحقل واحد أو أكثر
     * يُستدعى بعد كل عملية جلب ناجحة من Google Sheets
     * @param {string|string[]} keys - مفتاح appData أو مصفوفة من المفاتيح
     */
    recordServerFetch(keys) {
        const keysArr = Array.isArray(keys) ? keys : [keys];
        this._saveCacheTimestamps(keysArr);
    },

    /**
     * التحقق من صلاحية الـ cache لحقل معين
     * يقارن وقت آخر جلب من الخادم بالعمر الأقصى المسموح به
     * @param {string} sheetKey - مفتاح الحقل في appData
     * @param {number} maxAge - العمر الأقصى بالمللي ثانية (افتراضي: 10 دقائق)
     * @returns {boolean} - true إذا كان الـ cache صالحاً لا يزال
     */
    isCacheValid(sheetKey, maxAge = 10 * 60 * 1000) {
        try {
            const timestampsStr = localStorage.getItem('hse_cache_timestamps');
            if (!timestampsStr) return false;
            
            const timestamps = JSON.parse(timestampsStr);
            const timestamp = timestamps[sheetKey];
            
            if (!timestamp) return false;
            
            const age = Date.now() - timestamp;
            return age < maxAge;
        } catch (e) {
            return false;
        }
    },

    async loadCompanySettings(forceReload = false) {
        try {
            // ✅ إصلاح: التحقق من وجود الشعار في localStorage أولاً (cache)
            // إذا كان موجوداً ولم نطلب إعادة تحميل قسرية، نستخدم localStorage فقط
            if (!forceReload) {
                const cachedLogo = localStorage.getItem('hse_company_logo') || localStorage.getItem('company_logo');
                const cachedSettings = localStorage.getItem('hse_company_settings');
                
                if (cachedLogo && cachedSettings) {
                    try {
                        const parsedSettings = JSON.parse(cachedSettings);
                        if (parsedSettings && parsedSettings.logo) {
                            // استخدام البيانات المخزنة محلياً
                            AppState.companyLogo = cachedLogo;
                            AppState.companySettings = Object.assign({}, AppState.companySettings, parsedSettings || {});
                            AppState.companySettings.logo = cachedLogo;
                            
                            // تحديث الشعار في جميع الأماكن
                            setTimeout(() => {
                                if (typeof UI !== 'undefined') {
                                    if (UI.updateCompanyLogoHeader) UI.updateCompanyLogoHeader();
                                    if (UI.updateLoginLogo) UI.updateLoginLogo();
                                    if (UI.updateDashboardLogo) UI.updateDashboardLogo();
                                    if (UI.updateCompanyBranding) UI.updateCompanyBranding();
                                }
                                window.dispatchEvent(new CustomEvent('companyLogoUpdated', { 
                                    detail: { logoUrl: cachedLogo } 
                                }));
                            }, 50);
                            
                            Utils.safeLog('✅ تم تطبيق الشعار من localStorage مؤقتاً — متابعة جلب إعدادات الشركة من الخادم لتحديث الحقول (مثل روابط الملف الشخصي)');
                            // لا نُرجع هنا: إن أُرجعنا مبكراً لن تُحدَّث profileTeamsUrl / profileWhatsAppUrl وغيرها من الشيت
                        }
                    } catch (e) {
                        Utils.safeWarn('⚠️ خطأ في قراءة البيانات المخزنة محلياً:', e);
                    }
                }
            }
            
            // ✅ محاولة تحميل الإعدادات من Google Sheets فقط عند forceReload أو عدم وجود cache
            // هذا يضمن تحميل الشعار من قاعدة البيانات مرة واحدة فقط
            if (AppState.googleConfig?.appsScript?.enabled && typeof GoogleIntegration !== 'undefined') {
                try {
                    const result = await GoogleIntegration.sendToAppsScript('getCompanySettings', {});
                    if (result && result.success && result.data) {
                        // تحليل postLoginItems (سياسات/تعليمات ما بعد الدخول)
                        let postLoginItems = AppState.companySettings?.postLoginItems;
                        if (result.data.postLoginItems !== undefined) {
                            const raw = result.data.postLoginItems;
                            if (typeof raw === 'string') {
                                if (raw.trim() !== '') {
                                    try {
                                        postLoginItems = JSON.parse(raw);
                                    } catch (e) {
                                        postLoginItems = [];
                                    }
                                } else {
                                    postLoginItems = [];
                                }
                            } else if (Array.isArray(raw)) {
                                postLoginItems = raw;
                            } else {
                                postLoginItems = [];
                            }
                        }
                        if (!Array.isArray(postLoginItems)) postLoginItems = [];

                        // تحليل clinicVisitTypes (أنواع زيارة العيادة المشتركة)
                        let clinicVisitTypes = AppState.companySettings?.clinicVisitTypes;
                        if (result.data.clinicVisitTypes !== undefined) {
                            const rawVisitTypes = result.data.clinicVisitTypes;
                            if (typeof rawVisitTypes === 'string') {
                                if (rawVisitTypes.trim() !== '') {
                                    try {
                                        clinicVisitTypes = JSON.parse(rawVisitTypes);
                                    } catch (e) {
                                        clinicVisitTypes = rawVisitTypes.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
                                    }
                                } else {
                                    clinicVisitTypes = [];
                                }
                            } else if (Array.isArray(rawVisitTypes)) {
                                clinicVisitTypes = rawVisitTypes;
                            } else {
                                clinicVisitTypes = [];
                            }
                        }
                        if (!Array.isArray(clinicVisitTypes)) clinicVisitTypes = [];

                        // حقول استحقاق PPE من الشيت (لم تكن تُحدَّث في الواجهة لأغلب التحميلات)
                        let ppeEligibilityRules = '[]';
                        if (result.data.hasOwnProperty('ppeEligibilityRules') && result.data.ppeEligibilityRules != null) {
                            const pr = result.data.ppeEligibilityRules;
                            if (typeof pr === 'string') {
                                ppeEligibilityRules = pr.trim() || '[]';
                            } else if (Array.isArray(pr)) {
                                try {
                                    ppeEligibilityRules = JSON.stringify(pr);
                                } catch (e) {
                                    ppeEligibilityRules = '[]';
                                }
                            }
                        } else if (AppState.companySettings?.ppeEligibilityRules != null) {
                            ppeEligibilityRules = String(AppState.companySettings.ppeEligibilityRules);
                        }
                        const legacyMonths = 0;
                        const legacyDays = 0;

                        // تحديث AppState بالبيانات من Google Sheets
                        AppState.companySettings = Object.assign({}, AppState.companySettings, {
                            name: result.data.name || AppState.companySettings?.name,
                            secondaryName: result.data.secondaryName || AppState.companySettings?.secondaryName,
                            nameFontSize: result.data.nameFontSize || AppState.companySettings?.nameFontSize || 16,
                            secondaryNameFontSize: result.data.secondaryNameFontSize || AppState.companySettings?.secondaryNameFontSize || 14,
                            secondaryNameColor: result.data.secondaryNameColor || AppState.companySettings?.secondaryNameColor || '#6B7280',
                            formVersion: result.data.formVersion || AppState.companySettings?.formVersion || '1.0',
                            address: result.data.address || AppState.companySettings?.address,
                            phone: result.data.phone || AppState.companySettings?.phone,
                            email: result.data.email || AppState.companySettings?.email,
                            postLoginItems: postLoginItems,
                            clinicMonthlyVisitsAlertThreshold: result.data.clinicMonthlyVisitsAlertThreshold ?? AppState.companySettings?.clinicMonthlyVisitsAlertThreshold ?? 10,
                            employeeImportHireMonths: result.data.employeeImportHireMonths ?? AppState.companySettings?.employeeImportHireMonths ?? 3,
                            clinicVisitTypes: clinicVisitTypes,
                            profileTeamsUrl: String(result.data.profileTeamsUrl ?? AppState.companySettings?.profileTeamsUrl ?? '').trim(),
                            profileWhatsAppUrl: String(result.data.profileWhatsAppUrl ?? AppState.companySettings?.profileWhatsAppUrl ?? '').trim(),
                            ppeEligibilityRules: ppeEligibilityRules,
                            ppeEligibilityMonths: legacyMonths,
                            ppeEligibilityDays: legacyDays,
                            helpContent: result.data.helpContent != null
                                ? String(result.data.helpContent)
                                : (AppState.companySettings?.helpContent || '')
                        });
                        
                        // تحديث شعار الشركة (حتى لو كان فارغاً لمسحه)
                        if (result.data.hasOwnProperty('logo')) {
                            const logoValue = result.data.logo || '';
                            AppState.companyLogo = logoValue;
                            // تحديث الشعار في AppState.companySettings أيضاً
                            if (!AppState.companySettings) {
                                AppState.companySettings = {};
                            }
                            AppState.companySettings.logo = logoValue;
                            // ✅ إصلاح: حفظ في localStorage فقط إذا تغير الشعار
                            const currentLogo = localStorage.getItem('hse_company_logo') || '';
                            if (logoValue && logoValue.trim() !== '') {
                                // إذا تغير الشعار، نحدّث localStorage
                                if (currentLogo !== logoValue) {
                                    localStorage.setItem('hse_company_logo', logoValue);
                                    localStorage.setItem('company_logo', logoValue);
                                    Utils.safeLog('✅ تم تحديث الشعار من قاعدة البيانات (الطول: ' + logoValue.length + ' حرف)');
                                } else {
                                    Utils.safeLog('ℹ️ الشعار لم يتغير - استخدام النسخة المخزنة محلياً');
                                }
                            } else {
                                // إذا تم حذف الشعار من قاعدة البيانات، نمسح localStorage
                                if (currentLogo) {
                                    localStorage.removeItem('hse_company_logo');
                                    localStorage.removeItem('company_logo');
                                    Utils.safeLog('ℹ️ تم حذف الشعار من قاعدة البيانات');
                                }
                            }
                        } else {
                            // ✅ إصلاح: إذا لم يكن logo في البيانات، نتحقق من وجوده في companySettings
                            if (result.data.logo !== undefined) {
                                // logo موجود لكنه فارغ
                                AppState.companyLogo = '';
                                if (!AppState.companySettings) {
                                    AppState.companySettings = {};
                                }
                                AppState.companySettings.logo = '';
                                localStorage.removeItem('hse_company_logo');
                                localStorage.removeItem('company_logo');
                            }
                        }
                        
                        // حفظ في localStorage لاستخدامها لاحقاً
                        localStorage.setItem('hse_company_settings', JSON.stringify(AppState.companySettings || {}));
                        
                            // ✅ إصلاح: تحديث الشعار في جميع الأماكن المخصصة (حتى لو كان فارغاً)
                        // استخدام setTimeout لضمان تحديث الواجهة بعد تحديث AppState
                        const shouldUpdateUI = forceReload || !localStorage.getItem('hse_company_logo');
                        if (shouldUpdateUI) {
                            setTimeout(() => {
                                if (typeof UI !== 'undefined') {
                                    if (UI.updateCompanyLogoHeader) {
                                        UI.updateCompanyLogoHeader();
                                    }
                                    if (UI.updateLoginLogo) {
                                        UI.updateLoginLogo();
                                    }
                                    if (UI.updateDashboardLogo) {
                                        UI.updateDashboardLogo();
                                    }
                                    if (UI.updateCompanyBranding) {
                                        UI.updateCompanyBranding();
                                    }
                                }
                                
                                // إرسال حدث لتحديث الشعار (حتى لو كان فارغاً لمسحه)
                                window.dispatchEvent(new CustomEvent('companyLogoUpdated', { 
                                    detail: { logoUrl: AppState.companyLogo || '' } 
                                }));
                            }, 100);
                        }
                        
                        if (forceReload) {
                            Utils.safeLog('✅ تم تحميل إعدادات الشركة من Google Sheets بنجاح (force reload)');
                        } else {
                            Utils.safeLog('✅ تم تحديث إعدادات الشركة من Google Sheets بنجاح');
                        }
                        return;
                    }
                } catch (error) {
                    Utils.safeWarn('⚠️ فشل تحميل إعدادات الشركة من Google Sheets:', error);
                }
            }
            
            // إذا فشل التحميل من Google Sheets، تحميل من localStorage
            const savedSettings = localStorage.getItem('hse_company_settings');
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                AppState.companySettings = Object.assign({}, AppState.companySettings, parsedSettings || {});
                
                // ✅ إصلاح: تحميل الشعار من companySettings إذا كان موجوداً
                if (parsedSettings && parsedSettings.logo) {
                    AppState.companyLogo = parsedSettings.logo;
                }
            }
            
            // تحميل الشعار من localStorage إذا كان موجوداً (fallback)
            const savedLogo = localStorage.getItem('hse_company_logo') || localStorage.getItem('company_logo');
            if (savedLogo) {
                AppState.companyLogo = savedLogo;
                // تحديث الشعار في AppState.companySettings أيضاً
                if (!AppState.companySettings) {
                    AppState.companySettings = {};
                }
                AppState.companySettings.logo = savedLogo;
            }
            
            // ✅ إصلاح: تحديث الشعار في جميع الأماكن المخصصة بعد التحميل (سواء من companySettings أو localStorage)
            const logoToUse = AppState.companyLogo || (AppState.companySettings && AppState.companySettings.logo) || '';
            
            // استخدام setTimeout لضمان تحديث الواجهة بعد تحديث AppState
            setTimeout(() => {
                if (logoToUse || !AppState.companyLogo) {
                    if (typeof UI !== 'undefined') {
                        if (UI.updateCompanyLogoHeader) {
                            UI.updateCompanyLogoHeader();
                        }
                        if (UI.updateLoginLogo) {
                            UI.updateLoginLogo();
                        }
                        if (UI.updateDashboardLogo) {
                            UI.updateDashboardLogo();
                        }
                        if (UI.updateCompanyBranding) {
                            UI.updateCompanyBranding();
                        }
                    }
                    
                    // إرسال حدث لتحديث الشعار
                    window.dispatchEvent(new CustomEvent('companyLogoUpdated', { 
                        detail: { logoUrl: logoToUse } 
                    }));
                }
            }, 100);
        } catch (error) {
            Utils.safeWarn('⚠️ فشل تحميل إعدادات الشركة من localStorage:', error);
        }
    },

    saveCompanySettings() {
        try {
            localStorage.setItem('hse_company_settings', JSON.stringify(AppState.companySettings || {}));
            return true;
        } catch (error) {
            Utils.safeError('❌ خطأ في حفظ إعدادات الشركة:', error);
            return false;
        }
    },

    /**
     * تحميل إعدادات الاتصال بالخادم الخلفي (المفتاح التاريخي hse_google_config)
     */
    loadGoogleConfig() {
        try {
            const config = localStorage.getItem('hse_google_config');
            if (config) {
                AppState.googleConfig = JSON.parse(config);
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل إعدادات الاتصال بالخادم:', error);
        }
    },

    /**
     * حفظ إعدادات الاتصال بالخادم الخلفي
     */
    saveGoogleConfig() {
        try {
            localStorage.setItem('hse_google_config', JSON.stringify(AppState.googleConfig));
            return true;
        } catch (error) {
            Utils.safeError('❌ خطأ في حفظ إعدادات الاتصال بالخادم:', error);
            return false;
        }
    },

    /**
     * تحميل إعدادات التخزين السحابي
     */
    loadCloudStorageConfig() {
        try {
            const config = localStorage.getItem('hse_cloud_storage_config');
            if (config) {
                AppState.cloudStorageConfig = JSON.parse(config);
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تحميل إعدادات التخزين السحابي:', error);
        }
    },

    /**
     * حفظ إعدادات التخزين السحابي
     */
    saveCloudStorageConfig() {
        try {
            localStorage.setItem('hse_cloud_storage_config', JSON.stringify(AppState.cloudStorageConfig));
            return true;
        } catch (error) {
            Utils.safeError('❌ خطأ في حفظ إعدادات التخزين السحابي:', error);
            return false;
        }
    }
};

// Export to global window (for script tag loading)
if (typeof window !== 'undefined') {
    window.DataManager = DataManager;
}

