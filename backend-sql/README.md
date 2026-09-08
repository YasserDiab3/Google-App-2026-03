# HSE SQL Backend & Database Engine

خادم قاعدة بيانات SQL فائق السرعة ومستقل تماماً لنظام السلامة والصحة المهنية والعيادة (HSE Clinic System).

---

## الميزات الرئيسية

* **عزل تام (Zero-Impact):** يعمل في مجلد مستقل ولا يعدل على ملفات التطبيق الحالي أو Google Apps Script.
* **مطابقة بروتوكولية بنسبة 100%:** يستقبل نفس طلبات الـ RPC بصيغة `{ action, data, actorUserData }` ويعيد نفس هيكل الردود.
* **سرعة فائقة (High Performance):** زمن استجابة يتراوح بين 1ms - 5ms محلياً (<50ms على السيرفر) مقارنة بـ 2000ms في Google Apps Script.
* **تزامن كامل (ACID Compliant):** يدعم المعاملات المقفلة (Transactions) وحماية تضارب البيانات.
* **أداة هجرة البيانات:** سكربت لسحب البيانات من Google Sheets وتخزينها في جداول SQL بضغطة زر.

---

## التشغيل السريع محلياً (Local Quickstart)

1. **تثبيت الحزم:**
```bash
cd backend-sql
npm install
```

2. **تجهيز الجداول والبيانات التجريبية:**
```bash
npm run seed
```

3. **تشغيل الخادم:**
```bash
npm start
# يعمل على: http://localhost:3001
```

---

## تشغيل الاختبارات والتحقق الشامل (100% Parity Tests)

لتشغيل كافة اختبارات المطابقة والأمان والأداء والـ HTTP E2E:
```bash
npm test
```

أو تشغيل كل جناح اختبار على حدة:
* **اختبارات المطابقة 1:1:** `npm run test:parity`
* **اختبارات بوابات الأمان والصلاحيات:** `npm run test:security`
* **اختبار قياس السرعة والأداء:** `npm run test:benchmark`
* **اختبار الشبكة E2E:** `npm run test:e2e`

---

## كيفية ربط الواجهة الأمامية (Frontend Switching)

للتبديل بين Google Apps Script وسيرفر الـ SQL:
1. في إعدادات التطبيق بالواجهة (`AppState.googleConfig.appsScript.scriptUrl`)، قم بتغيير الرابط إلى:
   `http://localhost:3001/exec` (محلياً) أو رابط خادم الـ VPS.
2. لا حاجة لأي تعديل في كود الواجهة الأمامية!

---

## النشر على خادم VPS (Production Deployment)

### باستخدام PM2 و Nginx:
```bash
# تثبيت PM2
npm install -g pm2

# تشغيل الخادم كـ Service تعمل في الخلفية
pm2 start src/index.js --name "hse-sql-backend"

# حفظ الحالة عند إعادة تشغيل السيرفر
pm2 save
pm2 startup
```

### إعداد Nginx كـ Reverse Proxy:
```nginx
server {
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
