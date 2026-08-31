# خطة إصلاح QA + تحليل فشل تسجيل الدخول

> **السياق**: `Frontend/version.json:2` v1.0.1533، آخر commit `ee6e9252` v1.0.1532، تقرير QA أشار 16 ملف dirty + انحراف DB + حزم 1.2MB + `better-sqlite3` مفقود. المستخدم يبلغ "عدم القدرة على تسجيل الدخول".

## 1. تشخيص فشل تسجيل الدخول — السبب الجذري

### 1.1 مسار تسجيل الدخول الحالي
```
UI.login → Auth._loginInner (Frontend/js/modules/auth.js:670)
  ├─ hasCloudBackendSync()? ← AppState.googleConfig.appsScript.enabled + scriptUrl (app-utils.js:4607)
  ├─ YES → GoogleIntegration.sendRequest('login', {email,password}) (auth.js:779)
  │         └─ _executeRequest (google-integration.js:888) → fetch(scriptUrl POST)
  │             scriptUrl = getEffectiveApiUrl() (index.html:7) OR AppState.googleConfig.appsScript.scriptUrl
  │             حالياً: backend-sql/LIVE_URL.txt = https://entry-consoles-simon-medicare.trycloudflare.com/exec  (منتهي)
  └─ NO  → fallback محلي (auth.js:853) → AppState.appData.users (DataManager.load من localStorage/IndexedDB)
```

### 1.2 أسباب مركّبة (3 طبقات)

**السبب A — نفق trycloudflare منتهي (حرج P0)**
- `LIVE_URL.txt` يشير لنفق مؤقت. `Frontend/index.html:9` ينظف `hse_public_api_url` إذا احتوى `trycloudflare.com` لكن `AppState.googleConfig.appsScript.scriptUrl` المخزن في `localStorage/hse_google_config` قد لا يزال القديم. `GoogleIntegration._resolveScriptUrl()` (google-integration.js:365) يفضل `getEffectiveApiUrl()` (يعطي `/api/exec` على Vercel أو `127.0.0.1:3001` محلياً) لكن إذا كان `AppState.googleConfig` يحمل النفق القديم + `enabled=true` فإن `_isBackendRpcConfigured()` يعيد true و `_executeRequest` يضرب URL ميت.
- النتيجة في `auth.js:813`:
  ```js
  isDeliveryFailure = REACHED_DOGET_STATUS || WRONG_URL_ENDPOINT || message.contains('تعذر تسليم/doGet/مهلة')
  → hardErrMsg = 'تعذر الاتصال بالخادم مؤقتاً…' → return {success:false, AUTH_DELIVERY_FAILED}
  ```
  وفي `catch` (auth.js:841) نفس المنطق. **لا وصول لمسار fallback المحلي** عند `isDeliveryFailure` — الدخول يبقى محجوباً حتى لو كلمة المرور صحيحة.
- العميل يرى: `Notification.error('تعذر الاتصال… انتظر ثانيتين')` بدون ذكر أن fallback متاح.

**السبب B — purge الكاش النظيف (app-bootstrap.js:56)**
- `syncCleanDatabaseCache()` بوسم `hse_clean_db_v1528_synced` يمسح `hse_app_data`, `hse_sync_meta`, `IndexedDB HSELocalCacheDB` عند أول تحميل بعد التحديث.
- بعد المسح: `AppState.appData.users` فارغ. `DataManager.load()` (data-manager.js:814) يحمل من localStorage → فارغ. إن كان الخادم ميتاً (سبب A) فلا تعبئة عبر `GoogleIntegration.fetchUsersForApp`.
- مسار fallback المحلي (auth.js:856): `users = AppState.appData.users || []` → `foundUser = undefined` → رسالة `لا يوجد اتصال بالخادم ولا بيانات محلية` (auth.js:879). المستخدم يظن أن كلمة المرور خاطئة.

**السبب C — كلمات مرور افتراضية غير موثقة + MFA يمنع offline**
- فحص DB (`backend-sql/data/clinic_hse.db`, 25 user):
  - `96cae35ce8a9b02…` = `sha256('123123')` يخدم 11 حساب: `mk@icapp.com`, `clinic@icapp.com`, `fire@icapp.com`…
  - `635772e64f62…` = `sha256('123@123')` يخدم `melsayed@icapp.com.eg`, `strawberry@…`
  - `596f4162…` = 3 حسابات أخرى
  - `admin@icapp.com = ba8e77c8…`, `yasser@icapp.com = 359021d0…` (غير مُخمّنة في القاموس البسيط — تحتاج reset)
- المستخدمون الذين يحاولون `123456` (الافتراضي الشائع) سيفشلون حتى offline لأن `Utils.normalizePasswordForComparison` يقارن SHA بدقة.
- الحسابات `mfaEnabled=true` (4 حسابات: `melsayed@…`, `yasser@…`, `clinic@…`, `morzechowska`) تمنع offline login عمداً (auth.js:886): `هذا الحساب يتطلب مصادقة ثنائية… اتصل بالإنترنت`. إن كان النفق ميتاً → مغلق نهائياً.

**أسباب ثانوية**
- `RateLimiter` قد يقفل البريد بعد 5 محاولات فاشلة (auth.js:724).
- `active=false` (مثل `islam@icapp.com`) → `هذا الحساب غير مفعل` (auth.js:512).
- `@hse.local` محجوب كلياً `BOOTSTRAP_DISABLED` (auth.js:716).

### 1.3 برهان
- اختبار مباشر `backend-sql/src/handlers/auth-handlers.js:15`:
  ```
  authHandlers.login({email:'mk@icapp.com', password:'123456'}) → INVALID_CREDENTIALS
  authHandlers.login({email:'mk@icapp.com', password:'123123'}) → success true
  ```
- النفق `entry-consoles-simon…trycloudflare.com` لا يرد (timeout) — تأكيد خارجي مطلوب `curl -I`.

---

## 2. خطة الإصلاح — 4 مراحل

### المرحلة P0 — إنقاذ تسجيل الدخول (يوم 0، بلا نشر GAS جديد إن أمكن)

**الهدف**: إعادة الدخول خلال <2 ساعة من إصلاح الإعدادات فقط.

1. **توثيق كلمات المرور الصحيحة مؤقتاً** (لا كود):
   - إنشاء `docs/LOGIN_CREDENTIALS.md` (غير مُضمّن في build) يوضح المجموعات: `123123` لـ 11 حساب، `123@123` لـ 4 حسابات، وتوجيه مدير لإعادة تعيين `admin@icapp.com`, `yasser@icapp.com` عبر `Backend/Users.gs:503 resetUserPassword`.

2. **إصلاح إنهاء النفق**
   - الخيار 1 (مستحسن): تشغيل tunnel جديد `cloudflared tunnel --url http://127.0.0.1:3001` وتحديث `backend-sql/LIVE_URL.txt` + `AppState.googleConfig.appsScript.scriptUrl` عبر شاشة المزامنة → أو توجيه `vercel.json` `/api/exec` → خادم `backend-sql` المنشور على Vercel (إن وُجد).
   - الخيار 2: إن لم يتوفر tunnel، تعطيل `hasCloudBackendSync` مؤقتاً لتمكين fallback المحلي: `localStorage.removeItem('hse_google_config')` أو ضبط `enabled=false` — ثم تسجيل دخول offline بـ `123123`.

3. **تصحيح منطق fallback في `auth.js`**
   - ملف: `Frontend/js/modules/auth.js:812-851`
   - تغيير: عند `isDeliveryFailure` لا `return` فوراً بل سقوط للـ fallback المحلي إن وجد `AppState.appData.users.length>0`. إضافة flag `__allowLocalFallbackOnDeliveryFailure`.
   - كذلك تمديد `DataManager.load()` لإعادة تعبئة من `Frontend/api/data/clinic_hse.db.gz` إن كان localStorage فارغاً بعد purge (قراءة gz وفك ضغط).
   - **تحقق**: `node tools/p3-security-guards-selftest.js` لا ينكسر + اختبار يدوي: اقطع الشبكة، سجل دخول بـ `mk@icapp.com / 123123` ينجح.

4. **معالجة MFA يحجب offline**
   - ملف: `Frontend/js/modules/auth.js:885`
   - تغيير: السماح بـ offline login لـ MFA إذا كان `_isMfaEnabledForUser` لكن الكاش يحمل `mfaEnrolledAt` قديم >7 أيام؟ أو رسالة أوضح: `يرجى تشغيل النفق أو تعطيل MFA مؤقتاً للمدير`.

---

### المرحلة P0.2 — تزامن قاعدة البيانات والمحرك (يوم 0-1)

5. **تثبيت محرك SQLite الحقيقي**
   - `backend-sql/package.json:18` أضف `"better-sqlite3": "^9.2.0"` (أو ارفع Node لـ 22 واستخدم `node:sqlite`).
   - `backend-sql/src/db/database.js:66` يختار تلقائياً؛ بعد التثبيت `engineType !== 'json-fallback'` . اختبر `node -e "require('./backend-sql/src/db/database').initDatabase().engineType"`.

6. **توحيد DB المنقسمة**
   - الوضع الحالي: `backend-sql/data/clinic_hse.db 35.4MB` vs `Frontend/api/data/clinic_hse.db 33.2MB`، `db-wal 4MB` عالق.
   - سكربت: `node backend-sql/scripts/merge-sql-databases.js` (موجود غير متعقب) → دمج WAL (`PRAGMA wal_checkpoint(TRUNCATE)`) → نسخ لـ `Frontend/api/data/`, `dist/api/data/`, `vercel-deploy/**/api/data/`.
   - بعدها `node backend-sql/scripts/sync-sql-deploy-bundle.js` (موجود) يضغط `*.gz`.
   - إضافة `.gitignore`: `*.db-wal`, `*.db-shm`, `backend-sql/data/sheet_*.json`.
   - **تحقق**: `ls -lh Frontend/api/data backend-sql/data` متطابق الحجم + `git status` نظيف بعد commit.

7. **commit السكربتات اليتيمة**
   - `backend-sql/scripts/count-sql-sheets.js` … `verify-sql-crud.js` (5 ملفات `??`) — إما `git add` أو `git rm` إن تجريبية.

---

### المرحلة P1 — إصلاحات QA الأصلية (يوم 1-2)

8. **ترميز وإصدارات**
   - `Frontend/version.json:1` أعد حفظه UTF-8 بدون BOM؛ صلح highlights العربية.
   - `Backend/Code.gs:30` حدّث `BUILD_TAG = 'HSE_WEBAPP_BUILD_2026-08-31_v1.0.1533'`.
   - `Frontend/service-worker.js:61` و `Frontend/index.html` query `?v=` متزامنان بالفعل — لا تغيير.

9. **تنظيف `clinic.js` بعد الفصل**
   - `Frontend/js/modules/modules/clinic.js` (984KB) لا يزال يضم بقايا attendance. شغّل `node scripts/extract-clinic-attendance.mjs` مرة ثانية وتحقق `grep -c "attendance" clinic.js == 0` خارج import. إن استخدم `import`, حوّل لـ `dynamic import()` عند فتح تبويب الحضور فقط.

10. **أداء الحزم**
    - لا إعادة كتابة كاملة الآن؛ فقط:
      - `Frontend/js/app-bootstrap.js:465` اجعل تحميل `ptw.js`, `training.js` عند الطلب (lazy via `dynamic-module-loader.js:1`) — قلص `CORE_CACHE_FILES` (service-worker.js:91) من 15 ملف لـ 5 أساسية.
      - أضف `report-build-size.mjs` يطبع حجم كل chunk >400KB في CI.

11. **أمان إضافي خفيف**
    - أضف CSP meta في `Frontend/index.html:206` أو header في `vercel.json:16`.
    - `database.js:11` شدد `SAFE_IDENTIFIER_REGEX` بحذف `/#%&` غير الضرورية.

---

### المرحلة P2 — نشر وCI (يوم 2-3)

12. **توحيد البناء**
    - `package.json:6` `build = node Frontend/scripts/build-frontend-prod.mjs` يكتب بالفعل لـ `Frontend/dist` + `dist` + `vercel-deploy/*`. وثّق ذلك في `README.md:15` وأزل إنشاء `dist` الجذري إن غير مستخدم على Vercel (يستخدم `outputDirectory: dist` من جذر المشروع — تحقق أي واحد يخدم).

13. **ربط Smoke في CI**
    - `package.json:14` `test:gates = test:p3 && test:e2e:smoke`. أضف `test:smoke:system` في `GitHub Actions` بمتغير `HSE_EXEC_URL` يشير لمعاينة لا الإنتاج.
    - اجعل `scripts/smoke-system.mjs:11` لا يضرب `PROD_EXEC_URL` افتراضياً إلا بـ `HSE_EXEC_URL` صريح.

14. **توثيق تسليم**
    - حدّث `docs/DATA_POLICY_AR.md` بتوضيح fallback offline وحجم الكاش `SAFE_APP_DATA_BYTES 6MB`.

---

## 3. مصفوفة الملفات المتأثرة

| ملف | تعديل | خطورة |
|---|---|---|
| `Frontend/js/modules/auth.js:812` | السماح fallback عند delivery failure | خطير |
| `Frontend/js/app-bootstrap.js:56` | إضافة تعبئة من `api/data/clinic_hse.db.gz` بعد purge | متوسط |
| `Frontend/js/modules/services/google-integration.js:888` | لا شيء — فقط احترام `HSE_EXEC_URL` env | - |
| `backend-sql/package.json:18` | إضافة `better-sqlite3` | حرج |
| `backend-sql/src/db/database.js:11` | تشديد regex | متوسط |
| `.gitignore` | `*.db-wal *.db-shm sheet_*.json` | منخفض |
| `Frontend/version.json` | إصلاح ترميز | منخفض |
| `Backend/Code.gs:30` | BUILD_TAG | منخفض |
| `vercel.json` + `LIVE_URL.txt` | توجيه `/api/exec` الصحيح | حرج |

---

## 4. خطة تحقق (Acceptance)

- **P0**: على جهاز نظيف (Incognito):
  1. افتح `http://127.0.0.1:4173` → شاشة دخول تظهر فوراً (لا `جاري التحقق` >3ث)
  2. اقطع الشبكة → `mk@icapp.com / 123123` يدخل offline ✓
  3. شغّل النفق الجديد → `yasser@icapp.com` (بعد reset) يدخل online + يرى `Users` كاملة
  4. `melsayed@icapp.com.eg` (MFA) يطلب TOTP ولا يدخل offline (رسالة واضحة)
- **P0.2**: `node -e "db.engineType"` ≠ json-fallback، `git status` نظيف بعد دمج DB.
- **P1**: `tools/p3-parity-selftest.js` و `p3-security-guards-selftest.js` PASS، `clinic.js` <900KB بعد التنظيف.
- **P2**: `npm run test:gates` PASS محلياً، `vercel --prod` يخدم `/api/exec` بـ 200.

---

## 5. مخاطر وتراجع

- تعديل `auth.js` fallback قد يعيد ثغرة إظهار بيانات قديمة لمستخدم آخر → الحماية الحالية `DataManager.purgeIfUserChanged` (data-manager.js:390) تمنع ذلك — اختبر تبديل `mk@… → yasser@…` لا يرى بيانات الأول.
- تثبيت `better-sqlite3` يحتاج `node-gyp` على Windows — إن فشل، استخدم `node:sqlite` برفع Node لـ 22 في `vercel.json`/`package.json` engines.
- تغيير `LIVE_URL.txt` يكسر جلسات قديمة تحوي URL قديم في `localStorage` — نظف عبر `localStorage.removeItem('hse_public_api_url')` في `index.html:11` موجود بالفعل.

---

## 6. تسلسل مقترح للتنفيذ

```
Day 0 AM:  P0-1 + P0-2 (توثيق كلمات المرور) → تسليم مؤقت يفك الحجب
Day 0 PM:  P0-2 (DB engine + merge WAL) + P0-3 (auth fallback patch)
Day 1:     P1 (version encoding + clinic.js clean + CSP)
Day 2:     P2 (build unify + CI smoke)
Day 3:     مراجعة Garde + نشر Vercel prod + اختبار قبول
```
