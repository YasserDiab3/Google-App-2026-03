/**
 * EmailTemplates — قوالب HTML احترافية لرسائل النظام (بريد مباشر عبر Apps Script).
 * كل القوالب CSS مضمّن (inline/embedded) لمتوافقية عملاء البريد.
 */
const EmailTemplates = {
    escapeHtml(v) {
        return String(v == null ? '' : v)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    },

    _shell(inner, opts = {}) {
        const o = Object.assign({ headerBg: 'linear-gradient(135deg,#0b2a55 0%,#1e40af 55%,#2563eb 100%)' }, opts);
        const trimmed = String(inner || '').trim();
        return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${this.escapeHtml(o.title || 'بريد النظام')}</title>
<style>
    body, table, td { font-family: 'Tahoma', 'Segoe UI', Arial, sans-serif; }
    body { margin: 0; padding: 0; background: #eef2f7; }
    .wrapper { max-width: 640px; margin: 0 auto; background: #ffffff; direction: rtl; }
    .header { background: ${o.headerBg}; color: #ffffff; padding: 26px 28px 22px; }
    .header .eyebrow { font-size: 11px; letter-spacing: 1px; color: #bfdbfe; font-weight: 700; margin: 0 0 6px; }
    .header h1 { margin: 0; font-size: 21px; font-weight: 800; }
    .header p { margin: 6px 0 0; font-size: 12px; color: #dbeafe; }
    .header .badge { display: inline-block; margin-top: 10px; padding: 5px 12px; border-radius: 99px; background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.25); font-size: 11px; font-weight: 700; }
    .body { padding: 20px 24px; }
    .foot { background: #f1f5f9; padding: 14px 20px; font-size: 10.5px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .foot strong { color: #334155; }
</style>
</head>
<body>
    <div class="wrapper">
        ${trimmed}
    </div>
</body>
</html>`;
    },

    /**
     * قالب: تقرير المرور اليومي للسلامة (Daily Safety Checklist).
     * opts: { title, subtitle, badge, meta: [{k,v}], summary: { total, compliant, nonCompliant, reading },
     *         items: [{label, status, reading}], notes, footerExtra }
     */
    buildDailySafetyChecklist(opts = {}) {
        const metaBlock = (opts.meta || []).map(m => `
            <tr>
                <td style="padding:7px 10px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:700;font-size:12px;width:38%;color:#334155;">${this.escapeHtml(m.k)}</td>
                <td style="padding:7px 10px;border:1px solid #e5e7eb;font-size:12px;color:#0f172a;">${this.escapeHtml(m.v)}</td>
            </tr>`).join('');
        const s = opts.summary || {};
        const summaryChips = `
            <table style="border-collapse:collapse;width:100%;margin:14px 0 0;">
                <tr>
                    <td style="padding:9px;border:1px solid #dcfce7;background:#f0fdf4;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#15803d;">${s.compliant || 0}</div>
                        <div style="font-size:10px;color:#166534;font-weight:700;">مطابق</div>
                    </td>
                    <td style="width:8px;"></td>
                    <td style="padding:9px;border:1px solid #fecaca;background:#fef2f2;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#b91c1c;">${s.nonCompliant || 0}</div>
                        <div style="font-size:10px;color:#991b1b;font-weight:700;">غير مطابق</div>
                    </td>
                    <td style="width:8px;"></td>
                    <td style="padding:9px;border:1px solid #bfdbfe;background:#eff6ff;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#1d4ed8;">${s.total || 0}</div>
                        <div style="font-size:10px;color:#1e40af;font-weight:700;">إجمالي البنود</div>
                    </td>
                    ${s.reading != null ? `
                    <td style="width:8px;"></td>
                    <td style="padding:9px;border:1px solid #c7d2fe;background:#eef2ff;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#4338ca;" dir="ltr">${this.escapeHtml(s.reading)}</div>
                        <div style="font-size:10px;color:#3730a3;font-weight:700;">قراءة الضغط</div>
                    </td>` : ''}
                </tr>
            </table>`;
        const items = (opts.items || []).map((it, i) => {
            const isOk = String(it.status || '').trim() === 'مطابق';
            const isReadingItem = it.reading != null && it.status == null;
            const badgeHtml = isReadingItem
                ? `<span style="background:#eef2ff;color:#3730a3;border:1px solid #c7d2fe;font-weight:700;">قراءة: ${this.escapeHtml(it.reading)}</span>`
                : isOk
                    ? '<span style="color:#15803d;">✔ مطابق</span>'
                    : '<span style="color:#b91c1c;">✘ غير مطابق</span>';
            return `
            <tr>
                <td style="padding:8px 10px;border:1px solid #e5e7eb;text-align:center;color:#64748b;font-size:11px;width:34px;">${i + 1}</td>
                <td style="padding:8px 10px;border:1px solid #e5e7eb;font-size:11.5px;line-height:1.7;color:#1e293b;">${this.escapeHtml(it.label)}</td>
                <td style="padding:8px 10px;border:1px solid #e5e7eb;text-align:center;font-size:11.5px;white-space:nowrap;">${badgeHtml}</td>
            </tr>`;
        }).join('');
        const notesHtml = (opts.notes || '').trim()
            ? `<div style="margin-top:16px;padding:12px 14px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;font-size:12px;color:#92400e;line-height:1.8;">
                    <strong>ملاحظات المرور:</strong><br>${this.escapeHtml(opts.notes).replace(/\n/g, '<br>')}
                </div>` : '';
        const inner = `
            <div class="header">
                <p class="eyebrow">منظومة السلامة والصحة المهنية — HSE</p>
                <h1>${this.escapeHtml(opts.title || 'قائمة المرور اليومي للسلامة')}</h1>
                <p>${this.escapeHtml(opts.subtitle || 'تقرير مرور يومي على مواقع ومرافق المنشأة')}</p>
                ${opts.badge ? `<span class="badge">${this.escapeHtml(opts.badge)}</span>` : ''}
            </div>
            <div class="body">
                <table style="border-collapse:collapse;width:100%;">${metaBlock}</table>
                ${s.total != null ? summaryChips : ''}
                ${items ? `
                    <h3 style="margin:20px 0 10px;font-size:14px;color:#0f2a55;border-bottom:2px solid #e0e7ff;padding-bottom:8px;">بنود المرور اليومية</h3>
                    <table style="border-collapse:collapse;width:100%;">
                        <thead>
                            <tr style="background:linear-gradient(135deg,#0b2a55,#1e40af);">
                                <th style="padding:8px;border:1px solid #0f2a55;color:#fff;font-size:11px;">#</th>
                                <th style="padding:8px;border:1px solid #0f2a55;color:#fff;font-size:11px;">بند المرور</th>
                                <th style="padding:8px;border:1px solid #0f2a55;color:#fff;font-size:11px;">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>${items}</tbody>
                    </table>` : ''}
                ${notesHtml}
            </div>
            <div class="foot">
                <strong>${this.escapeHtml(opts.badge || '')}</strong> — تم إنشاؤه تلقائيًا من نظام إدارة السلامة والصحة المهنية${opts.footerExtra ? ' · ' + this.escapeHtml(opts.footerExtra) : ''}
            </div>`;
        return this._shell(inner, { title: opts.title || 'تقرير المرور اليومي' });
    }
};