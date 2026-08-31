# أرشيف Google Apps Script (Legacy)

هذا المجلد يحتوي على نسخة **للقراءة فقط** من خلفية Google Apps Script + Google Sheets.

## الحالة
- **الخادم النشط:** `backend-sql/` + `/api/exec` على SQL
- **GAS:** متوقف عن الاستخدام التشغيلي — محفوظ للمرجعية والترحيل فقط

## المحتويات
- `Backend/` — ملفات `.gs` الأصلية
- `vercel-deploy-backend/` — نسخة النشر القديمة
- ملفات `clasp` للنشر السابق

## لا تستخدم للإنتاج
الواجهة الأمامية (`Frontend/`) تتصل فقط بـ:
- إنتاج: `https://www.safety-icapp.com/api/exec`
- محلي: `http://127.0.0.1:3001/exec`
