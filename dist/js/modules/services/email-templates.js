const EmailTemplates={escapeHtml(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},_shell(e,o={}){const t=Object.assign({headerBg:"linear-gradient(135deg,#0b2a55 0%,#1e40af 55%,#2563eb 100%)"},o),i=String(e||"").trim();return`
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${this.escapeHtml(t.title||"\u0628\u0631\u064A\u062F \u0627\u0644\u0646\u0638\u0627\u0645")}</title>
<style>
    body, table, td { font-family: 'Tahoma', 'Segoe UI', Arial, sans-serif; }
    body { margin: 0; padding: 0; background: #eef2f7; }
    .wrapper { max-width: 640px; margin: 0 auto; background: #ffffff; direction: rtl; }
    .header { background: ${t.headerBg}; color: #ffffff; padding: 26px 28px 22px; }
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
        ${i}
    </div>
</body>
</html>`},buildDailySafetyChecklist(e={}){const o=(e.meta||[]).map(d=>`
            <tr>
                <td style="padding:7px 10px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:700;font-size:12px;width:38%;color:#334155;">${this.escapeHtml(d.k)}</td>
                <td style="padding:7px 10px;border:1px solid #e5e7eb;font-size:12px;color:#0f172a;">${this.escapeHtml(d.v)}</td>
            </tr>`).join(""),t=e.summary||{},i=`
            <table style="border-collapse:collapse;width:100%;margin:14px 0 0;">
                <tr>
                    <td style="padding:9px;border:1px solid #dcfce7;background:#f0fdf4;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#15803d;">${t.compliant||0}</div>
                        <div style="font-size:10px;color:#166534;font-weight:700;">\u0645\u0637\u0627\u0628\u0642</div>
                    </td>
                    <td style="width:8px;"></td>
                    <td style="padding:9px;border:1px solid #fecaca;background:#fef2f2;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#b91c1c;">${t.nonCompliant||0}</div>
                        <div style="font-size:10px;color:#991b1b;font-weight:700;">\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642</div>
                    </td>
                    <td style="width:8px;"></td>
                    <td style="padding:9px;border:1px solid #bfdbfe;background:#eff6ff;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#1d4ed8;">${t.total||0}</div>
                        <div style="font-size:10px;color:#1e40af;font-weight:700;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0646\u0648\u062F</div>
                    </td>
                    ${t.reading!=null?`
                    <td style="width:8px;"></td>
                    <td style="padding:9px;border:1px solid #c7d2fe;background:#eef2ff;text-align:center;border-radius:10px;">
                        <div style="font-size:18px;font-weight:800;color:#4338ca;" dir="ltr">${this.escapeHtml(t.reading)}</div>
                        <div style="font-size:10px;color:#3730a3;font-weight:700;">\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0636\u063A\u0637</div>
                    </td>`:""}
                </tr>
            </table>`,r=(e.items||[]).map((d,s)=>{const n=String(d.status||"").trim()==="\u0645\u0637\u0627\u0628\u0642",p=d.reading!=null&&d.status==null?`<span style="background:#eef2ff;color:#3730a3;border:1px solid #c7d2fe;font-weight:700;">\u0642\u0631\u0627\u0621\u0629: ${this.escapeHtml(d.reading)}</span>`:n?'<span style="color:#15803d;">\u2714 \u0645\u0637\u0627\u0628\u0642</span>':'<span style="color:#b91c1c;">\u2718 \u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642</span>';return`
            <tr>
                <td style="padding:8px 10px;border:1px solid #e5e7eb;text-align:center;color:#64748b;font-size:11px;width:34px;">${s+1}</td>
                <td style="padding:8px 10px;border:1px solid #e5e7eb;font-size:11.5px;line-height:1.7;color:#1e293b;">${this.escapeHtml(d.label)}</td>
                <td style="padding:8px 10px;border:1px solid #e5e7eb;text-align:center;font-size:11.5px;white-space:nowrap;">${p}</td>
            </tr>`}).join(""),a=(e.notes||"").trim()?`<div style="margin-top:16px;padding:12px 14px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;font-size:12px;color:#92400e;line-height:1.8;">
                    <strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0648\u0631:</strong><br>${this.escapeHtml(e.notes).replace(/\n/g,"<br>")}
                </div>`:"",l=`
            <div class="header">
                <p class="eyebrow">\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u2014 HSE</p>
                <h1>${this.escapeHtml(e.title||"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A \u0644\u0644\u0633\u0644\u0627\u0645\u0629")}</h1>
                <p>${this.escapeHtml(e.subtitle||"\u062A\u0642\u0631\u064A\u0631 \u0645\u0631\u0648\u0631 \u064A\u0648\u0645\u064A \u0639\u0644\u0649 \u0645\u0648\u0627\u0642\u0639 \u0648\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0645\u0646\u0634\u0623\u0629")}</p>
                ${e.badge?`<span class="badge">${this.escapeHtml(e.badge)}</span>`:""}
            </div>
            <div class="body">
                <table style="border-collapse:collapse;width:100%;">${o}</table>
                ${t.total!=null?i:""}
                ${r?`
                    <h3 style="margin:20px 0 10px;font-size:14px;color:#0f2a55;border-bottom:2px solid #e0e7ff;padding-bottom:8px;">\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A\u0629</h3>
                    <table style="border-collapse:collapse;width:100%;">
                        <thead>
                            <tr style="background:linear-gradient(135deg,#0b2a55,#1e40af);">
                                <th style="padding:8px;border:1px solid #0f2a55;color:#fff;font-size:11px;">#</th>
                                <th style="padding:8px;border:1px solid #0f2a55;color:#fff;font-size:11px;">\u0628\u0646\u062F \u0627\u0644\u0645\u0631\u0648\u0631</th>
                                <th style="padding:8px;border:1px solid #0f2a55;color:#fff;font-size:11px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody>${r}</tbody>
                    </table>`:""}
                ${a}
            </div>
            <div class="foot">
                <strong>${this.escapeHtml(e.badge||"")}</strong> \u2014 \u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0645\u0646 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629${e.footerExtra?" \xB7 "+this.escapeHtml(e.footerExtra):""}
            </div>`;return this._shell(l,{title:e.title||"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A"})}};
