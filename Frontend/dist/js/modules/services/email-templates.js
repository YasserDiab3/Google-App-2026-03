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
                <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f1f5f9;font-weight:700;font-size:12px;width:36%;color:#334155;">${this.escapeHtml(m.k)}</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:12px;color:#0f172a;font-weight:600;">${this.escapeHtml(m.v)}</td>
            </tr>`).join('');
        const s = opts.summary || {};
        const total = s.total || 0;
        const complianceRate = (s.complianceRate != null)
            ? Number(s.complianceRate)
            : (total > 0 ? Math.round(((s.compliant || 0) / total) * 100) : null);
        const barColor = complianceRate == null
            ? '#94a3b8'
            : (complianceRate >= 85 ? '#16a34a' : complianceRate >= 60 ? '#d97706' : '#dc2626');
        const statCell = (label, value, bg, border, color, ltr) => `
            <td style="padding:10px 8px;border:1px solid ${border};background:${bg};text-align:center;border-radius:10px;width:20%;vertical-align:middle;">
                <div style="font-size:19px;font-weight:800;color:${color};${ltr ? 'direction:ltr;' : ''}">${value}</div>
                <div style="font-size:10.5px;color:${color};font-weight:700;margin-top:2px;">${label}</div>
            </td>`;
        const summaryChips = `
            <table style="border-collapse:collapse;width:100%;margin:16px 0 0;" role="presentation">
                <tr>
                    ${statCell('مطابق', s.compliant || 0, '#f0fdf4', '#bbf7d0', '#15803d')}
                    <td style="width:6px;"></td>
                    ${statCell('غير مطابق', s.nonCompliant || 0, '#fef2f2', '#fecaca', '#b91c1c')}
                    <td style="width:6px;"></td>
                    ${statCell('إجمالي البنود', total, '#eff6ff', '#bfdbfe', '#1e40af')}
                    ${s.reading != null && s.reading !== '' ? `
                    <td style="width:6px;"></td>
                    ${statCell('قراءة الضغط', this.escapeHtml(s.reading), '#f0f9ff', '#bae6fd', '#0369a1', true)}` : ''}
                    <td style="width:6px;"></td>
                    ${statCell('نسبة الالتزام', complianceRate == null ? '—' : complianceRate + '%', '#fffbeb', '#fde68a', barColor)}
                </tr>
            </table>
            ${complianceRate != null ? `
            <div style="margin-top:12px;">
                <div style="background:#e8eef6;border-radius:99px;height:8px;overflow:hidden;">
                    <div style="width:${Math.max(4, complianceRate)}%;height:8px;border-radius:99px;background:${barColor};"></div>
                </div>
                <div style="font-size:10px;color:#64748b;margin-top:4px;">نسبة الالتزام بالبنود المفحوصة في هذا المرور</div>
            </div>` : ''}`;
        const items = (opts.items || []).map((it, i) => {
            const isOk = String(it.status || '').trim() === 'مطابق';
            const isReadingItem = it.reading != null && it.status == null;
            const badgeHtml = isReadingItem
                ? `<span style="display:inline-block;padding:3px 10px;border-radius:99px;background:#f0f9ff;color:#0369a1;border:1px solid #bae6fd;font-size:11px;font-weight:700;" dir="ltr">⚡ ${this.escapeHtml(it.reading)}</span>`
                : isOk
                    ? `<span style="display:inline-block;padding:3px 10px;border-radius:99px;background:#dcfce7;color:#15803d;border:1px solid #bbf7d0;font-size:11px;font-weight:700;">✔ مطابق</span>`
                    : `<span style="display:inline-block;padding:3px 10px;border-radius:99px;background:#fee2e2;color:#b91c1c;border:1px solid #fecaca;font-size:11px;font-weight:700;">✘ غير مطابق</span>`;
            return `
            <tr>
                <td style="padding:9px 10px;border:1px solid #e5e7eb;text-align:center;color:#64748b;font-size:11px;width:36px;${i % 2 ? 'background:#fafcff;' : ''}">${i + 1}</td>
                <td style="padding:9px 12px;border:1px solid #e5e7eb;font-size:12px;line-height:1.8;color:#1e293b;${i % 2 ? 'background:#fafcff;' : ''}">${this.escapeHtml(it.label)}</td>
                <td style="padding:9px 10px;border:1px solid #e5e7eb;text-align:center;font-size:11.5px;white-space:nowrap;${i % 2 ? 'background:#fafcff;' : ''}">${badgeHtml}</td>
            </tr>`;
        }).join('');
        const hasIssues = (s.nonCompliant || 0) > 0;
        const notesHtml = (opts.notes || '').trim()
            ? `<div style="margin-top:16px;padding:12px 14px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;font-size:12px;color:#92400e;line-height:1.8;">
                    <strong>📝 ملاحظات المرور:</strong><br>${this.escapeHtml(opts.notes).replace(/\n/g, '<br>')}
                </div>` : '';
        const issuesBanner = hasIssues ? `
            <div style="margin-top:16px;padding:12px 14px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;font-size:12px;line-height:1.8;">
                <strong style="color:#b91c1c;">⚠ تنبيه:</strong>
                <span style="color:#7f1d1d;">يحتوي هذا المرور على <strong>${s.nonCompliant}</strong> بند غير مطابق — يلزم متابعة إجراءات التصحيح.</span>
            </div>` : '';
        const inner = `
            <div class="header" style="background-color:#1e40af;background-image:linear-gradient(135deg,#0b2a55 0%,#1e40af 55%,#2563eb 100%);color:#fff;padding:26px 28px 22px;">
                <p class="eyebrow">منظومة السلامة والصحة المهنية — HSE</p>
                <h1>${this.escapeHtml(opts.title || 'قائمة المرور اليومي للسلامة')}</h1>
                <p>${this.escapeHtml(opts.subtitle || 'تقرير مرور يومي على مواقع ومرافق المنشأة')}</p>
                ${opts.badge ? `<span class="badge">${this.escapeHtml(opts.badge)}</span>` : ''}
            </div>
            <div class="body">
                <table style="border-collapse:collapse;width:100%;">${metaBlock}</table>
                ${s.total != null ? summaryChips : ''}
                ${items ? `
                    <h3 style="margin:22px 0 10px;font-size:14px;color:#0f2a55;border-bottom:2px solid #bfdbfe;padding-bottom:8px;">
                        بنود المرور اليومية
                        <span style="display:inline-block;margin-inline-start:8px;background:#2563eb;color:#fff;border-radius:99px;padding:1px 9px;font-size:10px;font-weight:700;vertical-align:middle;">${(opts.items || []).length} بند</span>
                    </h3>
                    <table style="border-collapse:collapse;width:100%;">
                        <thead>
                            <tr>
                                <th bgcolor="#1e40af" style="background-color:#1e40af;padding:10px 9px;border:1px solid #0f2a55;color:#ffffff;font-size:11px;font-weight:700;text-align:center;">#</th>
                                <th bgcolor="#1e40af" style="background-color:#1e40af;padding:10px 12px;border:1px solid #0f2a55;color:#ffffff;font-size:11px;font-weight:700;text-align:right;">بند المرور</th>
                                <th bgcolor="#1e40af" style="background-color:#1e40af;padding:10px 9px;border:1px solid #0f2a55;color:#ffffff;font-size:11px;font-weight:700;text-align:center;">الحالة</th>
                            </tr>
                        </thead>
                        <tbody>${items}</tbody>
                    </table>` : ''}
                ${notesHtml}
                ${issuesBanner}
            </div>
            <div class="foot">
                <div><strong>${this.escapeHtml(opts.badge || '')}</strong> — تم إنشاؤه تلقائيًا من نظام إدارة السلامة والصحة المهنية${opts.footerExtra ? ' · ' + this.escapeHtml(opts.footerExtra) : ''}</div>
                <div style="margin-top:5px;">وقت الإرسال: ${this.escapeHtml(new Date().toLocaleString('ar-EG'))} — بريد تلقائي لا يلزم الرد عليه</div>
            </div>`;
        return this._shell(inner, { title: opts.title || 'تقرير المرور اليومي' });
    }
};