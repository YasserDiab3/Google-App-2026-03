# تفعيل Oracle Autonomous DB (HSE)

## الوضع الموصى به الآن: مرآة SQLite → Oracle

الإنتاج على Vercel يبقى **SQLite** (مستقر). محلياً وكل كتابة على SQLite تُزامَن تلقائياً إلى **Oracle Cloud**.

```env
DB_TYPE=sqlite
ORACLE_MIRROR=1
ORACLE_USER=ADMIN
ORACLE_PASSWORD=********
ORACLE_CONNECT_STRING=mrj8uznak8telasp_high
ORACLE_WALLET_DIR=D:\secrets\oracle-wallet
```

- `ORACLE_MIRROR=1` — تفعيل المرآة الحية (بعد كل `append/update/delete/save`)
- `ORACLE_MIRROR_SYNC=1` — مزامنة فورية بدون debounce (سكربتات)
- استيراد Excel (`import-from-xlsx` / `upsert-xlsx-delta`) يرحّل الجداول المحدّثة إلى Oracle تلقائياً
- `--skip-oracle` أو `ORACLE_MIRROR=0` لتعطيل المزامنة لمرة واحدة

ترحيل يدوي كامل:

```bash
node scripts/migrate-sqlite-to-oracle.js
node scripts/compare-sqlite-oracle.js
```

---

## مسار بديل: Oracle كمحرك أساسي (`DB_TYPE=oracle`)

الإنتاج الحالي يبقى **SQLite** حتى تضبط `DB_TYPE=oracle` وتنجح على بيئة دائمة (يفضّل OCI Compute وليس Vercel Serverless).

## 1) ما يلزم منك في OCI

1. إنشاء Autonomous Database (ATP).
2. مستخدم تطبيق (مثل `HSE_APP`) + كلمة مرور.
3. تنزيل Wallet (أو سلسلة TLS جاهزة).
4. وضع Wallet خارج Git، مثلاً: `D:\secrets\oracle-wallet\`

لا يوجد `~/.oci/config` على هذا الجهاز حالياً — لوحة OCI أو إعداد الملف يدوياً مطلوبان لإنشاء ADB عبر MCP.

## 2) متغيرات البيئة (محرك أساسي)

```bash
DB_TYPE=oracle
ORACLE_USER=HSE_APP
ORACLE_PASSWORD=********
ORACLE_CONNECT_STRING=dbname_high
ORACLE_WALLET_DIR=D:\secrets\oracle-wallet
```

على Vercel أو Compute: نفس المتغيرات كأسرار. لا ترفع Wallet إلى GitHub.

## 3) تثبيت حزم Oracle

```bash
cd backend-sql
npm install oracledb deasync
```

## 4) إنشاء الجداول

```bash
node scripts/oracle-generate-ddl.js
# ينتج: backend-sql/sql/oracle-schema.sql
```

ثم على ADB (SQL Developer / sqlcl) شغّل الملف، أو:

```bash
set APPLY_DDL=1
node scripts/migrate-sqlite-to-oracle.js --apply-ddl
```

## 5) ترحيل بيانات SQLite (نسخة 3 سبتمبر / الحالية)

```bash
# فحص بدون كتابة:
node scripts/migrate-sqlite-to-oracle.js --dry-run

# ترحيل كامل:
node scripts/migrate-sqlite-to-oracle.js --apply-ddl

# جداول محددة:
node scripts/migrate-sqlite-to-oracle.js --tables=Users,ClinicVisits,PTW
```

المصدر الافتراضي: `backend-sql/data/clinic_hse.db`

## 6) تشغيل الخلفية على Oracle

```bash
set DB_TYPE=oracle
npm start
```

فحص الصحة: يجب أن يظهر `dbEngine: "oracle"` و `persistent: true`.

## 7) الواجهة

لا تغيير في الواجهة — نفس `/api/exec`. فقط الخادم يقرأ Oracle بدل SQLite.

## 8) تفعيل الإنتاج على Vercel

الإنتاج يحتاج أسرار البيئة + Wallet كـ Base64 (لا ترفع Wallet إلى Git).

### أ) تجهيز محلي مرة واحدة

```bash
# إنشاء wallet.b64.txt (إن لم يوجد)
# الملف عندنا: D:\secrets\oracle-wallet\wallet.b64.txt
```

### ب) تسجيل Vercel CLI ثم ضبط الأسرار

```bash
npx vercel login
node scripts/set-vercel-oracle-env.mjs
```

المتغيرات التي تُضبط:

- `DB_TYPE=oracle`
- `ORACLE_USER` / `ORACLE_PASSWORD`
- `ORACLE_CONNECT_STRING=mrj8uznak8telasp_high`
- `ORACLE_WALLET_PASSWORD`
- `ORACLE_WALLET_ZIP_BASE64`

### ج) نشر

ادفع إلى `main` أو:

```bash
npx vercel --prod
```

فحص: `https://www.safety-icapp.com/api/health` يجب أن يظهر `dbEngine:"oracle"` و `persistent:true`.
