# HSE-04-2026

نظام إدارة السلامة والصحة المهنية (HSE) — واجهة ويب ثابتة + Google Apps Script + Google Sheets.

## هيكل المشروع

| المسار | الوصف |
|--------|--------|
| [`Frontend/`](Frontend/) | **المصدر الأساسي** للواجهة (HTML، CSS، JS). |
| [`Backend/`](Backend/) | **المصدر الأساسي** لسكربت Google Apps Script (ملفات `.gs`). |
| [`vercel-deploy/frontend/`](vercel-deploy/frontend/) | نسخة مطابقة للواجهة للنشر على Vercel. |
| [`vercel-deploy/backend/`](vercel-deploy/backend/) | نسخة مطابقة للخلفية للأرشفة/المزامنة مع المستودع. |
| [`tools/`](tools/) | أمثلة طلبات API للاختبار اليدوي. |

**قاعدة إلزامية:** أي تعديل على `Frontend/` أو `Backend/` يُطبَّق بالتوازي على الملف المقابل داخل `vercel-deploy/` (انظر `.cursor/rules/sync-vercel-deploy.mdc`).

## الخلفية (Google Apps Script)

1. أنشئ مشروعًا على [script.google.com](https://script.google.com).
2. انسخ محتويات [`Backend/`](Backend/) (جميع ملفات `.gs`) إلى المشروع.
3. انشر كنشر ويب: **Deploy → New deployment → Web app**  
   - Execute as: **Me**  
   - Who has access: حسب سياسة الجهة (غالبًا **Anyone** للتطبيق العام).
4. انسخ رابط `/exec` والصقه في إعدادات التطبيق (شاشة المزامنة / `hse_google_config`).

### إعدادات Script Properties (موصى بها للإنتاج)

في المحرر: **Project Settings → Script properties**:

| المفتاح | الوصف |
|---------|--------|
| `HSE_SPREADSHEET_ID` | معرف جدول Google Sheets الرسمي (يُفضَّل على تضمينه في الواجهة). |
| `GEMINI_API_KEY` | مفتاح Google AI Studio / Gemini (لا يُخزَّن في الكود). |
| `GEMINI_MODEL` | اختياري؛ افتراضيًا `gemini-1.5-flash`. |

إذا لم تُضف الخصائص، يُستخدم fallback من [`Backend/Config.gs`](Backend/Config.gs) و[`Backend/AI.gs`](Backend/AI.gs) حيث ينطبق.

## الواجهة الأمامية

- نقطة الدخول: [`Frontend/index.html`](Frontend/index.html).
- التحميل المتدرج والمراحل: [`Frontend/js/app-bootstrap.js`](Frontend/js/app-bootstrap.js).
- المصادقة والجلسات: [`Frontend/js/modules/auth.js`](Frontend/js/modules/auth.js).

**معرّف الجدول في المتصفح:** القيمة الافتراضية في الكود يمكن تركها فارغة؛ يُعرَّف المعرف عبر إعدادات المزامنة (تُحفظ في `localStorage`) أو يعتمد الطلب على المعرف المعرَّف في الخادم عبر Script Properties.

## فحوصات Smoke سريعة

1. فتح التطبيق والاتصال بـ Apps Script (`testConnection` أو تسجيل الدخول).
2. استخدام عيّنات JSON في [`tools/_test-hse-api-body.json`](tools/_test-hse-api-body.json) و[`tools/_test-read-users.json`](tools/_test-read-users.json) مع عميل HTTP (Postman، curl، إلخ).
3. قائمة تحقق أمني إضافية: [`Backend/SECURITY_VERIFICATION_CHECKLIST.md`](Backend/SECURITY_VERIFICATION_CHECKLIST.md).
4. بوابات القبول: [`Frontend/ACCEPTANCE_GATES.md`](Frontend/ACCEPTANCE_GATES.md).

## توثيق إضافي

- [`docs/DATA_POLICY_AR.md`](docs/DATA_POLICY_AR.md) — سياسة البيانات المنظمة في الخلايا والترحيل المستقبلي.
- [`docs/METRICS_AND_MIGRATION_AR.md`](docs/METRICS_AND_MIGRATION_AR.md) — مؤشرات النمو والهجرة المحتملة من Sheets.

## الرفع إلى GitHub

اتبع سياسة المستودع في `.cursor/rules/` (الرفع إلى `origin`؛ لا ترفع إلى `google-TR` إلا بطلب صريح).
