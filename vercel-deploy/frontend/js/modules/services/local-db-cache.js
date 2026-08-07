/**
 * LocalDBCache - خدمة التخزين المحلي عالي السعة عبر IndexedDB
 * توفر استرجاع لحظي (0ms) للبيانات عند الريفرش وتتجاوز حد الـ 5MB للـ localStorage
 */
const LocalDBCache = {
    DB_NAME: 'HSE_Local_Cache_DB',
    DB_VERSION: 1,
    STORE_APP_DATA: 'appData',
    STORE_SYNC_META: 'syncMeta',
    _dbPromise: null,

    /**
     * إعداد وفتح قاعدة البيانات
     */
    async init() {
        if (this._dbPromise) return this._dbPromise;

        this._dbPromise = new Promise((resolve, reject) => {
            if (typeof indexedDB === 'undefined') {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ IndexedDB غير مدعوم في هذا المتصفح — سيعتمد التطبيق على Memory/LocalStorage');
                }
                resolve(null);
                return;
            }

            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.STORE_APP_DATA)) {
                    db.createObjectStore(this.STORE_APP_DATA, { keyPath: 'key' });
                }
                if (!db.objectStoreNames.contains(this.STORE_SYNC_META)) {
                    db.createObjectStore(this.STORE_SYNC_META, { keyPath: 'key' });
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;
                db.onversionchange = () => {
                    db.close();
                    this._dbPromise = null;
                };
                resolve(db);
            };

            request.onerror = (event) => {
                if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                    Utils.safeWarn('⚠️ فشل فتح IndexedDB:', event.target.error);
                }
                resolve(null);
            };
        });

        return this._dbPromise;
    },

    /**
     * تصفية البيانات لحماية النظام وضوابط PTW السليمة (استبعاد _TMP_)
     */
    sanitizeData(key, data) {
        if (!data) return data;

        if (Array.isArray(data)) {
            return data.filter(item => {
                if (!item || typeof item !== 'object') return true;
                const idStr = String(item.id || item.permitId || '');
                return !idStr.includes('_TMP_');
            });
        }

        if (typeof data === 'object') {
            const cleaned = { ...data };
            Object.keys(cleaned).forEach(k => {
                if (Array.isArray(cleaned[k])) {
                    cleaned[k] = this.sanitizeData(k, cleaned[k]);
                }
            });
            return cleaned;
        }

        return data;
    },

    /**
     * حفظ عنصر في IndexedDB
     */
    async set(key, value, storeName = this.STORE_APP_DATA) {
        try {
            const db = await this.init();
            if (!db) return false;

            const sanitized = this.sanitizeData(key, value);

            return new Promise((resolve) => {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const record = {
                    key: key,
                    value: sanitized,
                    updatedAt: Date.now()
                };
                const request = store.put(record);

                request.onsuccess = () => resolve(true);
                request.onerror = (e) => {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                        Utils.safeWarn(`⚠️ فشل حفظ المفتاح ${key} في IndexedDB:`, e.target.error);
                    }
                    resolve(false);
                };
            });
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn(`⚠️ استثناء أثناء حفظ ${key} في IndexedDB:`, error);
            }
            return false;
        }
    },

    /**
     * جلب عنصر من IndexedDB
     */
    async get(key, storeName = this.STORE_APP_DATA) {
        try {
            const db = await this.init();
            if (!db) return null;

            return new Promise((resolve) => {
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const request = store.get(key);

                request.onsuccess = (event) => {
                    const record = event.target.result;
                    resolve(record ? record.value : null);
                };
                request.onerror = () => resolve(null);
            });
        } catch (error) {
            return null;
        }
    },

    /**
     * حذف عنصر
     */
    async remove(key, storeName = this.STORE_APP_DATA) {
        try {
            const db = await this.init();
            if (!db) return false;

            return new Promise((resolve) => {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const request = store.delete(key);
                request.onsuccess = () => resolve(true);
                request.onerror = () => resolve(false);
            });
        } catch (error) {
            return false;
        }
    },

    /**
     * مسح كل البيانات من IndexedDB
     */
    async clear() {
        try {
            const db = await this.init();
            if (!db) return false;

            return new Promise((resolve) => {
                const tx = db.transaction([this.STORE_APP_DATA, this.STORE_SYNC_META], 'readwrite');
                tx.objectStore(this.STORE_APP_DATA).clear();
                tx.objectStore(this.STORE_SYNC_META).clear();
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            });
        } catch (error) {
            return false;
        }
    },

    /**
     * تنظيف دائم وصامت للسجلات التي تجاوزت مدة معينة في الكاش المحرز (افتراضياً 60 يوماً)
     */
    async purgeStaleCache(maxAgeDays = 60) {
        try {
            const db = await this.init();
            if (!db) return false;

            const cutoff = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);

            return new Promise((resolve) => {
                const tx = db.transaction(this.STORE_APP_DATA, 'readwrite');
                const store = tx.objectStore(this.STORE_APP_DATA);
                const request = store.openCursor();

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        const record = cursor.value;
                        if (record && record.updatedAt && record.updatedAt < cutoff) {
                            cursor.delete();
                        }
                        cursor.continue();
                    } else {
                        resolve(true);
                    }
                };
                request.onerror = () => resolve(false);
            });
        } catch (error) {
            return false;
        }
    }
};

if (typeof window !== 'undefined') {
    window.LocalDBCache = LocalDBCache;
}
