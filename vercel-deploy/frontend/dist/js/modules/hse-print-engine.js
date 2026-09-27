(function(n,a){typeof define=="function"&&define.amd?define([],a):typeof module=="object"&&module.exports?module.exports=a():n.HsePrintEngine=a()})(typeof self<"u"?self:this,function(){"use strict";const n="\u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0644\u0644\u0625\u0646\u062A\u0627\u062C \u0648\u0627\u0644\u062A\u0635\u0646\u064A\u0639 \u0627\u0644\u0632\u0631\u0627\u0639\u064A (ICAPP)",a="International Company for Agricultural Production & Processing (ICAPP)",f="\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0628\u064A\u0626\u0629",w="General Administration of Occupational Safety, Health & Environmental Protection";function o(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function k(){let t="/icons/icapp-logo.png";return typeof window<"u"&&window.location&&(window.location.protocol==="file:"?t="icons/icapp-logo.png":window.location.origin&&window.location.origin!=="null"&&(t=`${window.location.origin}/icons/icapp-logo.png`)),{logoSrc:t,logoFallback:"icons/icon-192x192.png"}}function g(){return`
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-primary: #1e3a8a;
            --brand-navy: #0f172a;
            --brand-green: #047857;
            --brand-red: #b91c1c;
            --brand-amber: #b45309;
            --border-color: #cbd5e1;
        }
        * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        body {
            font-family: 'Cairo', system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8fafc;
            color: #0f172a;
            line-height: 1.5;
            direction: rtl;
        }
        
        /* \u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0639\u0644\u0648\u064A \u0644\u0644\u0634\u0627\u0634\u0629 */
        .no-print-bar {
            position: sticky;
            top: 0;
            z-index: 9999;
            background: #0f172a;
            color: #ffffff;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
            border-bottom: 3px solid #2563eb;
        }
        .no-print-bar .brand-badge {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .no-print-bar .pill-tag {
            background: #2563eb;
            color: #ffffff;
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: 800;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .no-print-bar .title-text {
            font-size: 13.5px;
            font-weight: 800;
        }
        .no-print-bar .action-buttons {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        .btn-print {
            padding: 8px 20px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-weight: 800;
            font-size: 13px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(37,99,235,0.4);
        }
        .btn-print:hover { background: #1d4ed8; }
        .btn-close {
            padding: 8px 18px;
            background: #475569;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-weight: 800;
            font-size: 13px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        .btn-close:hover { background: #334155; }

        /* \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0631\u0633\u0645\u064A\u0629 */
        .report-page-container {
            max-width: 920px;
            margin: 22px auto 40px auto;
            background: #ffffff;
            padding: 28px 34px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
        }

        /* \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 */
        .iso-print-header {
            display: grid;
            grid-template-columns: 240px 1fr 200px;
            border: 2px solid #0f172a;
            border-top: 5px solid #1e3a8a;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
            margin-bottom: 18px;
        }
        .iso-box-brand {
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-left: 1.5px solid #0f172a;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            gap: 4px;
            text-align: center;
        }
        .iso-print-logo {
            max-height: 46px;
            max-width: 130px;
            object-fit: contain;
            margin-bottom: 2px;
        }
        .iso-company-title {
            font-size: 10.5px;
            font-weight: 900;
            color: #0f172a;
            line-height: 1.3;
        }
        .iso-dept-title {
            font-size: 9.5px;
            font-weight: 800;
            color: #1e3a8a;
            line-height: 1.25;
        }
        
        .iso-box-title {
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            background: #ffffff;
        }
        .iso-main-title {
            margin: 0;
            font-size: 16px;
            font-weight: 900;
            color: #1e3a8a;
            line-height: 1.3;
        }
        .iso-sub-title {
            font-size: 10.5px;
            font-weight: 700;
            color: #475569;
            margin-top: 3px;
        }
        .iso-badge-std {
            display: inline-block;
            margin-top: 5px;
            background: #eff6ff;
            color: #1d4ed8;
            border: 1px solid #bfdbfe;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 9.5px;
            font-weight: 800;
        }

        .iso-box-meta {
            padding: 8px 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1.5px solid #0f172a;
            background: #f8fafc;
            gap: 3px;
        }
        .meta-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px dashed #cbd5e1;
            padding-bottom: 2px;
            font-size: 10px;
        }
        .meta-row:last-child { border-bottom: none; }
        .meta-row span { color: #64748b; font-weight: 700; }
        .meta-row strong { color: #0f172a; font-family: monospace, inherit; font-size: 10px; }

        /* \u0634\u0628\u0643\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0642\u0631\u064A\u0631 */
        .report-info-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 14px;
        }
        .info-card {
            background: #f8fafc;
            border: 1.5px solid #cbd5e1;
            border-radius: 6px;
            padding: 7px 10px;
        }
        .info-card .card-label {
            font-size: 9.5px;
            color: #64748b;
            font-weight: 700;
            margin-bottom: 2px;
        }
        .info-card .card-value {
            font-size: 11.5px;
            font-weight: 800;
            color: #0f172a;
        }

        /* \u0643\u0631\u0648\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0648\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 */
        .kpi-section-title {
            font-size: 11.5px;
            font-weight: 800;
            color: #334155;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 14px;
            text-align: center;
        }
        .kpi-box {
            border-radius: 6px;
            padding: 8px 6px;
            border: 1.5px solid #cbd5e1;
            background: #ffffff;
        }
        .kpi-box.total { background: #f8fafc; border-color: #cbd5e1; }
        .kpi-box.high { background: #fef2f2; border-color: #fca5a5; }
        .kpi-box.closed { background: #f0fdf4; border-color: #86efac; }
        .kpi-box.ptw, .kpi-box.pending { background: #fffbeb; border-color: #fde68a; }
        .kpi-num {
            font-size: 1.35rem;
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 2px;
        }
        .kpi-box.total .kpi-num { color: #0f172a; }
        .kpi-box.high .kpi-num { color: #dc2626; }
        .kpi-box.closed .kpi-num { color: #16a34a; }
        .kpi-box.ptw .kpi-num, .kpi-box.pending .kpi-num { color: #d97706; }
        .kpi-text {
            font-size: 10px;
            font-weight: 700;
            color: #475569;
        }

        /* \u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u0631\u0633\u0645\u064A\u0629 */
        table.report-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            margin: 12px 0;
        }
        table.report-table th, table.report-table td {
            border: 1.5px solid #cbd5e1;
            padding: 6px 8px;
            text-align: right;
        }
        table.report-table th {
            background: #0f172a;
            color: #ffffff;
            font-weight: 800;
            font-size: 10.5px;
        }
        table.report-table tbody tr:nth-child(even) {
            background: #f8fafc;
        }

        /* \u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u062C\u064A\u0647\u0627\u062A */
        .report-section-box {
            border: 1.5px solid #cbd5e1;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 16px;
        }
        .report-section-header {
            background: #f8fafc;
            border-bottom: 1.5px solid #cbd5e1;
            padding: 8px 12px;
            font-weight: 900;
            font-size: 11.5px;
            color: #1e3a8a;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .report-section-body {
            padding: 12px 14px;
            background: #ffffff;
            font-size: 11.5px;
            line-height: 1.65;
            color: #1e293b;
        }

        /* \u0628\u0644\u0648\u0643 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062B\u0644\u0627\u062B\u064A */
        .signatures-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin-top: 18px;
            page-break-inside: avoid;
        }
        .sig-card {
            border: 1.5px solid #cbd5e1;
            border-radius: 6px;
            padding: 10px;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 115px;
        }
        .sig-card-title {
            font-size: 10.5px;
            font-weight: 800;
            color: #1e3a8a;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 3px;
            margin-bottom: 5px;
            text-align: center;
        }
        .sig-card-name {
            font-size: 11px;
            font-weight: 900;
            color: #0f172a;
            text-align: center;
        }
        .sig-line-area {
            margin-top: 20px;
            border-top: 1.5px dashed #64748b;
            padding-top: 3px;
            text-align: center;
            font-size: 9.5px;
            color: #64748b;
            font-weight: 700;
        }

        /* \u0634\u0631\u064A\u0637 \u0636\u0628\u0637 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 ISO \u0641\u064A \u0623\u0633\u0641\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 */
        .iso-footer-strip {
            margin-top: 18px;
            border: 1.5px solid #0f172a;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 12px;
            background: #f8fafc;
            font-size: 9.5px;
            font-weight: 800;
            color: #334155;
            page-break-inside: avoid;
        }
        .iso-footer-strip span strong {
            color: #0f172a;
            font-family: monospace, inherit;
        }

        /* \u0641\u0648\u062A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u0648\u062D\u062F */
        .portal-unified-footer {
            margin-top: 10px;
            text-align: center;
            font-size: 9px;
            color: #64748b;
            line-height: 1.45;
            page-break-inside: avoid;
        }
        .portal-unified-footer strong {
            color: #1e3a8a;
            font-weight: 800;
        }

        @media print {
            body {
                background: #ffffff !important;
                padding: 0 !important;
            }
            .no-print-bar {
                display: none !important;
            }
            .report-page-container {
                max-width: 100% !important;
                margin: 0 !important;
                padding: 5px 8px !important;
                border: none !important;
                box-shadow: none !important;
            }
            @page {
                size: A4 portrait;
                margin: 8mm 10mm 8mm 10mm;
            }
        }
    </style>`}function b(t={}){const{logoSrc:i,logoFallback:e}=k(),r=o(t.docTitle||"\u0646\u0645\u0648\u0630\u062C \u0648\u062B\u064A\u0642\u0629 \u0633\u0644\u0627\u0645\u0629 \u0645\u0639\u062A\u0645\u062F\u0629"),d=o(t.docSubtitle||"Official HSE Document Sheet"),s=o(t.standardBadge||"\u0645\u0639\u062A\u0645\u062F \u0637\u0628\u0642\u0627\u064B \u0644\u0644\u0645\u0648\u0627\u0635\u0641\u0629 ISO 45001:2018 & OSHA 1910"),l=o(t.docCode||"DOC-HSE-GEN-01"),p=o(t.rev||"Rev. 02"),c=o(t.effectiveDate||"2026-09"),$=o(t.confidentiality||"\u0639\u0627\u0645 \u062F\u0627\u062E\u0644\u064A");return`
        <!-- \u062A\u0631\u0648\u064A\u0633\u0629 ISO \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u062B\u0644\u0627\u062B\u064A\u0629 \u0627\u0644\u0635\u0646\u0627\u062F\u064A\u0642 -->
        <div class="iso-print-header">
            <div class="iso-box-brand">
                <img src="${i}" alt="\u0634\u0639\u0627\u0631 ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${e}';">
                <div class="iso-company-title">${n}</div>
                <div class="iso-dept-title">${f}</div>
            </div>

            <div class="iso-box-title">
                <h1 class="iso-main-title">${r}</h1>
                <div class="iso-sub-title">${d}</div>
                <div class="iso-badge-std">${s}</div>
            </div>

            <div class="iso-box-meta">
                <div class="meta-row">
                    <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629:</span>
                    <strong>${l}</strong>
                </div>
                <div class="meta-row">
                    <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631:</span>
                    <strong>${p}</strong>
                </div>
                <div class="meta-row">
                    <span>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</span>
                    <strong>${c}</strong>
                </div>
                <div class="meta-row">
                    <span>\u062F\u0631\u062C\u0629 \u0627\u0644\u0633\u0631\u064A\u0629:</span>
                    <strong style="color: #047857;">${$}</strong>
                </div>
            </div>
        </div>`}function x(t={}){const i=o(t.docCode||"DOC-HSE-GEN-01"),e=o(t.rev||"Rev. 02"),r=o(t.standardRef||"ISO 45001:2018 (Clause 8.1 & 7.4)"),d=o(t.qualitySystem||"ICAPP HSE MS");return`
        <!-- \u0634\u0631\u064A\u0637 \u0636\u0628\u0637 \u0648\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 (ISO Document Control) -->
        <div class="iso-footer-strip">
            <span>\u0643\u0648\u062F \u0627\u0644\u0648\u062B\u064A\u0642\u0629: <strong>${i}</strong></span>
            <span>\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: <strong>${e}</strong></span>
            <span>\u0645\u0631\u062C\u0639\u064A\u0629 \u0627\u0644\u062A\u0648\u062B\u064A\u0642: <strong>${r}</strong></span>
            <span>\u0646\u0638\u0627\u0645 \u0627\u0644\u062C\u0648\u062F\u0629: <strong>${d}</strong></span>
        </div>

        <!-- \u0627\u0644\u0641\u0648\u062A\u0631 \u0627\u0644\u0645\u0648\u062D\u062F \u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 -->
        <footer class="portal-unified-footer">
            <div><strong>${n}</strong> \u2022 \u0645\u0646\u0638\u0648\u0645\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \xA9 2026</div>
            <div>\u0648\u062B\u064A\u0642\u0629 \u0631\u0633\u0645\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0635\u0627\u062F\u0631\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 (ICAPP SafetyHub) \u2022 \u0635\u0627\u0644\u062D\u0629 \u0644\u0644\u062A\u062F\u0642\u064A\u0642 \u0648\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629</div>
        </footer>`}function m(t=[]){(!t||t.length===0)&&(t=[{title:"\u0625\u0639\u062F\u0627\u062F / \u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0641\u062D\u0635",name:"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u064A\u062F\u0627\u0646\u064A",line:"\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E"},{title:"\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u062A\u062D\u0642\u0642",name:"\u0623\u062E\u0635\u0627\u0626\u064A / \u0631\u0626\u064A\u0633 \u0627\u0644\u0642\u0633\u0645",line:"\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E"},{title:"\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0633\u0644\u0627\u0645\u0629",name:"\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",line:"\u0627\u0644\u062E\u062A\u0645 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0631\u0642\u0645\u064A"}]);const i=t.map(e=>`
            <div class="sig-card">
                <div class="sig-card-title">${o(e.title||"")}</div>
                <div class="sig-card-name">${o(e.name||"")}</div>
                <div class="sig-line-area">${o(e.line||"\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E")}</div>
            </div>
        `).join("");return`
        <div class="signatures-grid" style="grid-template-columns: repeat(${t.length}, 1fr);">
            ${i}
        </div>`}function u(t=[]){if(!t||t.length===0)return"";const i=t.map(e=>`
            <div class="info-card">
                <div class="card-label">${o(e.label||"")}</div>
                <div class="card-value">${o(e.value||"--")}</div>
            </div>
        `).join("");return`
        <div class="report-info-grid" style="grid-template-columns: repeat(${Math.min(t.length,4)}, 1fr);">
            ${i}
        </div>`}function h(t={}){return`
        <div class="kpi-grid">
            <div class="kpi-box total">
                <div class="kpi-num">${o(t.total||"0")}</div>
                <div class="kpi-text">${o(t.totalLabel||"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0646\u0648\u062F / \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A")}</div>
            </div>
            <div class="kpi-box high">
                <div class="kpi-num">${o(t.high||"0")}</div>
                <div class="kpi-text">${o(t.highLabel||"\u0639\u0627\u0644\u064A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 / \u062D\u0631\u062C \u26A0\uFE0F")}</div>
            </div>
            <div class="kpi-box closed">
                <div class="kpi-num">${o(t.closed||"0")}</div>
                <div class="kpi-text">${o(t.closedLabel||"\u0645\u0643\u062A\u0645\u0644 \u0648\u0645\u063A\u0644\u0642 \u2705")}</div>
            </div>
            <div class="kpi-box ptw">
                <div class="kpi-num">${o(t.pending||t.ptw||"0")}</div>
                <div class="kpi-text">${o(t.pendingLabel||"\u0642\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 / \u062A\u0635\u0627\u0631\u064A\u062D \u0633\u0627\u0631\u064A\u0629 \u{1F4DC}")}</div>
            </div>
        </div>`}function v(t={}){const i=o(t.pageTitle||t.docTitle||"\u062A\u0642\u0631\u064A\u0631 \u0631\u0633\u0645\u064A \u0645\u0639\u062A\u0645\u062F")+" \u2014 "+n,e=!!t.autoPrint,r=b(t),d=t.metaItems?u(t.metaItems):"",s=t.kpis?h(t.kpis):"",l=m(t.signatures),p=x(t),c=t.bodyHtml||"";return`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${i}</title>
    ${g()}
</head>
<body>
    <div class="no-print-bar">
        <div class="brand-badge">
            <span class="pill-tag">ICAPP HSE</span>
            <span class="title-text">${o(t.docTitle||"\u0646\u0645\u0648\u0630\u062C \u0648\u062B\u064A\u0642\u0629 \u0633\u0644\u0627\u0645\u0629 \u0645\u0639\u062A\u0645\u062F\u0629")}</span>
        </div>
        <div class="action-buttons">
            <button type="button" onclick="window.print()" class="btn-print">
                \u{1F5A8}\uFE0F \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631
            </button>
            <button type="button" onclick="window.close()" class="btn-close">
                \u274C \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629
            </button>
        </div>
    </div>

    <div class="report-page-container">
        ${r}
        ${d}
        ${s}
        ${c}
        ${l}
        ${p}
    </div>

    ${e?"<script>window.onload = function() { setTimeout(function() { window.print(); }, 350); };<\/script>":""}
</body>
</html>`}function y(t={}){const i=v({...t,autoPrint:!0}),e=window.open("","_blank");return e?(e.document.write(i),e.document.close(),e):(alert("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 (Pop-ups) \u0644\u0625\u062A\u0645\u0627\u0645 \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"),null)}return{COMPANY_NAME_AR:n,COMPANY_NAME_EN:a,DEPT_NAME_AR:f,DEPT_NAME_EN:w,escapeHtml:o,getStylesHtml:g,getHeaderHtml:b,getFooterHtml:x,getSignaturesHtml:m,getMetaGridHtml:u,getKpisHtml:h,buildDocumentHtml:v,printDocument:y}});
