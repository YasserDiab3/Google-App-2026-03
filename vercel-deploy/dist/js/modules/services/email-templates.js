const EmailTemplates={escapeHtml(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},_shell(e,l={}){const t=Object.assign({headerBg:"linear-gradient(135deg,#0b2a55 0%,#1e40af 55%,#2563eb 100%)"},l),o=String(e||"").trim();return`
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
        ${o}
    </div>
</body>
</html>`},buildDailySafetyChecklist(e={}){const l=(e.meta||[]).map(d=>`
            <tr>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f1f5f9;font-weight:700;font-size:12px;width:36%;color:#334155;">${this.escapeHtml(d.k)}</td>
                <td style="padding:8px 12px;border:1px solid #e5e7eb;font-size:12px;color:#0f172a;font-weight:600;">${this.escapeHtml(d.v)}</td>
            </tr>`).join(""),t=e.summary||{},o=t.total||0,a=t.complianceRate!=null?Number(t.complianceRate):o>0?Math.round((t.compliant||0)/o*100):null,p=a==null?"#94a3b8":a>=85?"#16a34a":a>=60?"#d97706":"#dc2626",r=(d,i,s,c,n,u)=>`
            <td style="padding:10px 8px;border:1px solid ${c};background:${s};text-align:center;border-radius:10px;width:20%;vertical-align:middle;">
                <div style="font-size:19px;font-weight:800;color:${n};${u?"direction:ltr;":""}">${i}</div>
                <div style="font-size:10.5px;color:${n};font-weight:700;margin-top:2px;">${d}</div>
            </td>`,b=`
            <table style="border-collapse:collapse;width:100%;margin:16px 0 0;" role="presentation">
                <tr>
                    ${r("\u0645\u0637\u0627\u0628\u0642",t.compliant||0,"#f0fdf4","#bbf7d0","#15803d")}
                    <td style="width:6px;"></td>
                    ${r("\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642",t.nonCompliant||0,"#fef2f2","#fecaca","#b91c1c")}
                    <td style="width:6px;"></td>
                    ${r("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0646\u0648\u062F",o,"#eff6ff","#bfdbfe","#1e40af")}
                    ${t.reading!=null&&t.reading!==""?`
                    <td style="width:6px;"></td>
                    ${r("\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0636\u063A\u0637",this.escapeHtml(t.reading),"#f0f9ff","#bae6fd","#0369a1",!0)}`:""}
                    <td style="width:6px;"></td>
                    ${r("\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645",a==null?"\u2014":a+"%","#fffbeb","#fde68a",p)}
                </tr>
            </table>
            ${a!=null?`
            <div style="margin-top:12px;">
                <div style="background:#e8eef6;border-radius:99px;height:8px;overflow:hidden;">
                    <div style="width:${Math.max(4,a)}%;height:8px;border-radius:99px;background:${p};"></div>
                </div>
                <div style="font-size:10px;color:#64748b;margin-top:4px;">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0641\u062D\u0648\u0635\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0631\u0648\u0631</div>
            </div>`:""}`,f=(e.items||[]).map((d,i)=>{const s=String(d.status||"").trim()==="\u0645\u0637\u0627\u0628\u0642",n=d.reading!=null&&d.status==null?`<span style="display:inline-block;padding:3px 10px;border-radius:99px;background:#f0f9ff;color:#0369a1;border:1px solid #bae6fd;font-size:11px;font-weight:700;" dir="ltr">\u26A1 ${this.escapeHtml(d.reading)}</span>`:s?'<span style="display:inline-block;padding:3px 10px;border-radius:99px;background:#dcfce7;color:#15803d;border:1px solid #bbf7d0;font-size:11px;font-weight:700;">\u2714 \u0645\u0637\u0627\u0628\u0642</span>':'<span style="display:inline-block;padding:3px 10px;border-radius:99px;background:#fee2e2;color:#b91c1c;border:1px solid #fecaca;font-size:11px;font-weight:700;">\u2718 \u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642</span>';return`
            <tr>
                <td style="padding:9px 10px;border:1px solid #e5e7eb;text-align:center;color:#64748b;font-size:11px;width:36px;${i%2?"background:#fafcff;":""}">${i+1}</td>
                <td style="padding:9px 12px;border:1px solid #e5e7eb;font-size:12px;line-height:1.8;color:#1e293b;${i%2?"background:#fafcff;":""}">${this.escapeHtml(d.label)}</td>
                <td style="padding:9px 10px;border:1px solid #e5e7eb;text-align:center;font-size:11.5px;white-space:nowrap;${i%2?"background:#fafcff;":""}">${n}</td>
            </tr>`}).join(""),g=(t.nonCompliant||0)>0,x=(e.notes||"").trim()?`<div style="margin-top:16px;padding:12px 14px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;font-size:12px;color:#92400e;line-height:1.8;">
                    <strong>\u{1F4DD} \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0645\u0631\u0648\u0631:</strong><br>${this.escapeHtml(e.notes).replace(/\n/g,"<br>")}
                </div>`:"",h=g?`
            <div style="margin-top:16px;padding:12px 14px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;font-size:12px;line-height:1.8;">
                <strong style="color:#b91c1c;">\u26A0 \u062A\u0646\u0628\u064A\u0647:</strong>
                <span style="color:#7f1d1d;">\u064A\u062D\u062A\u0648\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0631\u0648\u0631 \u0639\u0644\u0649 <strong>${t.nonCompliant}</strong> \u0628\u0646\u062F \u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642 \u2014 \u064A\u0644\u0632\u0645 \u0645\u062A\u0627\u0628\u0639\u0629 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D.</span>
            </div>`:"",m=`
            <div class="header">
                <p class="eyebrow">\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u2014 HSE</p>
                <h1>${this.escapeHtml(e.title||"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A \u0644\u0644\u0633\u0644\u0627\u0645\u0629")}</h1>
                <p>${this.escapeHtml(e.subtitle||"\u062A\u0642\u0631\u064A\u0631 \u0645\u0631\u0648\u0631 \u064A\u0648\u0645\u064A \u0639\u0644\u0649 \u0645\u0648\u0627\u0642\u0639 \u0648\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0645\u0646\u0634\u0623\u0629")}</p>
                ${e.badge?`<span class="badge">${this.escapeHtml(e.badge)}</span>`:""}
            </div>
            <div class="body">
                <table style="border-collapse:collapse;width:100%;">${l}</table>
                ${t.total!=null?b:""}
                ${f?`
                    <h3 style="margin:22px 0 10px;font-size:14px;color:#0f2a55;border-bottom:2px solid #bfdbfe;padding-bottom:8px;">
                        \u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A\u0629
                        <span style="display:inline-block;margin-inline-start:8px;background:#2563eb;color:#fff;border-radius:99px;padding:1px 9px;font-size:10px;font-weight:700;vertical-align:middle;">${(e.items||[]).length} \u0628\u0646\u062F</span>
                    </h3>
                    <table style="border-collapse:collapse;width:100%;">
                        <thead>
                            <tr style="background:linear-gradient(90deg,#0b2a55,#1e40af);">
                                <th style="padding:9px;border:1px solid #0f2a55;color:#fff;font-size:11px;">#</th>
                                <th style="padding:9px;border:1px solid #0f2a55;color:#fff;font-size:11px;">\u0628\u0646\u062F \u0627\u0644\u0645\u0631\u0648\u0631</th>
                                <th style="padding:9px;border:1px solid #0f2a55;color:#fff;font-size:11px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            </tr>
                        </thead>
                        <tbody>${f}</tbody>
                    </table>`:""}
                ${x}
                ${h}
            </div>
            <div class="foot">
                <div><strong>${this.escapeHtml(e.badge||"")}</strong> \u2014 \u062A\u0645 \u0625\u0646\u0634\u0627\u0624\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0645\u0646 \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629${e.footerExtra?" \xB7 "+this.escapeHtml(e.footerExtra):""}</div>
                <div style="margin-top:5px;">\u0648\u0642\u062A \u0627\u0644\u0625\u0631\u0633\u0627\u0644: ${this.escapeHtml(new Date().toLocaleString("ar-EG"))} \u2014 \u0628\u0631\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0627 \u064A\u0644\u0632\u0645 \u0627\u0644\u0631\u062F \u0639\u0644\u064A\u0647</div>
            </div>`;return this._shell(m,{title:e.title||"\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u064A\u0648\u0645\u064A"})}};
