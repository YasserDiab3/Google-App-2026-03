# تفعيل Oracle Autonomous DB (HSE)

الإنتاج الحالي يبقى **SQLite** حتى تضبط `DB_TYPE=oracle` وتنجح الترحيل.

## 1) ما يلزم منك في OCI

1. إنشاء Autonomous Database (ATP).
2. مستخدم تطبيق (مثل `HSE_APP`) + كلمة مرور.
3. تنزيل Wallet (أو سلسلة TLS جاهزة).
4. وضع Wallet خارج Git، مثلاً: `D:\secrets\oracle-wallet\`

لا يوجد `~/.oci/config` على هذا الجهاز حالياً — لوحة OCI أو إعداد الملف يدوياً مطلوبان لإنشاء ADB عبر MCP.

## 2) متغيرات البيئة

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

## ملاحظة استقرار Vercel

Wallet + Oracle على Serverless محدود. بعد نجاح الترحيل محلياً، الأنسب للإنتاج: Compute على OCI يشغّل `backend-sql`، وVercel للواجهة فقط.
