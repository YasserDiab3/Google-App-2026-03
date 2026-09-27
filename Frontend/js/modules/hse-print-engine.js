/**
 * ICAPP SafetyHub — Official ISO Print & Document Engine
 * Unified Master Reporting Template for ISO 45001:2018 & OSHA 1910 Compliance
 * 
 * Standards:
 * - Company: الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)
 * - Dept: الإدارة العامة للسلامة والصحة المهنية وحماية البيئة
 * - ISO Standard: ISO 45001:2018 & OSHA 1910
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.HsePrintEngine = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    const COMPANY_NAME_AR = 'الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)';
    const COMPANY_NAME_EN = 'International Company for Agricultural Production & Processing (ICAPP)';
    const DEPT_NAME_AR = 'الإدارة العامة للسلامة والصحة المهنية وحماية البيئة';
    const DEPT_NAME_EN = 'General Administration of Occupational Safety, Health & Environmental Protection';

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function getLogoUrls() {
        let logoSrc = '/icons/icapp-logo.png';
        if (typeof window !== 'undefined' && window.location) {
            if (window.location.protocol === 'file:') {
                logoSrc = 'icons/icapp-logo.png';
            } else if (window.location.origin && window.location.origin !== 'null') {
                logoSrc = `${window.location.origin}/icons/icapp-logo.png`;
            }
        }
        return {
            logoSrc,
            logoFallback: 'icons/icon-192x192.png'
        };
    }

    function getStylesHtml() {
        return `
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
        
        /* شريط الأدوات العلوي للشاشة */
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

        /* حاوية التقرير الرسمية */
        .report-page-container {
            max-width: 920px;
            margin: 22px auto 40px auto;
            background: #ffffff;
            padding: 28px 34px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
        }

        /* ترويسة ISO ثلاثية الصناديق المعتمدة */
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

        /* شبكة بيانات التقرير */
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

        /* كروت الإحصائيات ومؤشرات الأداء */
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

        /* الجداول الرسمية */
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

        /* صندوق الملاحظات والتوجيهات */
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

        /* بلوك التوقيعات والاعتماد الثلاثي */
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

        /* شريط ضبط الوثيقة ISO في أسفل الصفحة */
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

        /* فوتر النظام الموحد */
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
    </style>`;
    }

    function getHeaderHtml(config = {}) {
        const { logoSrc, logoFallback } = getLogoUrls();
        const docTitle = escapeHtml(config.docTitle || 'نموذج وثيقة سلامة معتمدة');
        const docSubtitle = escapeHtml(config.docSubtitle || 'Official HSE Document Sheet');
        const standardBadge = escapeHtml(config.standardBadge || 'معتمد طبقاً للمواصفة ISO 45001:2018 & OSHA 1910');
        const docCode = escapeHtml(config.docCode || 'DOC-HSE-GEN-01');
        const rev = escapeHtml(config.rev || 'Rev. 02');
        const effectiveDate = escapeHtml(config.effectiveDate || '2026-09');
        const confidentiality = escapeHtml(config.confidentiality || 'عام داخلي');

        return `
        <!-- ترويسة ISO المعتمدة ثلاثية الصناديق -->
        <div class="iso-print-header">
            <div class="iso-box-brand">
                <img src="${logoSrc}" alt="شعار ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${logoFallback}';">
                <div class="iso-company-title">${COMPANY_NAME_AR}</div>
                <div class="iso-dept-title">${DEPT_NAME_AR}</div>
            </div>

            <div class="iso-box-title">
                <h1 class="iso-main-title">${docTitle}</h1>
                <div class="iso-sub-title">${docSubtitle}</div>
                <div class="iso-badge-std">${standardBadge}</div>
            </div>

            <div class="iso-box-meta">
                <div class="meta-row">
                    <span>كود الوثيقة:</span>
                    <strong>${docCode}</strong>
                </div>
                <div class="meta-row">
                    <span>رقم الإصدار:</span>
                    <strong>${rev}</strong>
                </div>
                <div class="meta-row">
                    <span>تاريخ الاعتماد:</span>
                    <strong>${effectiveDate}</strong>
                </div>
                <div class="meta-row">
                    <span>درجة السرية:</span>
                    <strong style="color: #047857;">${confidentiality}</strong>
                </div>
            </div>
        </div>`;
    }

    function getFooterHtml(config = {}) {
        const docCode = escapeHtml(config.docCode || 'DOC-HSE-GEN-01');
        const rev = escapeHtml(config.rev || 'Rev. 02');
        const standardRef = escapeHtml(config.standardRef || 'ISO 45001:2018 (Clause 8.1 & 7.4)');
        const qualitySystem = escapeHtml(config.qualitySystem || 'ICAPP HSE MS');

        return `
        <!-- شريط ضبط وتوثيق الوثيقة المعتمدة (ISO Document Control) -->
        <div class="iso-footer-strip">
            <span>كود الوثيقة: <strong>${docCode}</strong></span>
            <span>رقم الإصدار: <strong>${rev}</strong></span>
            <span>مرجعية التوثيق: <strong>${standardRef}</strong></span>
            <span>نظام الجودة: <strong>${qualitySystem}</strong></span>
        </div>

        <!-- الفوتر الموحد لمنظومة السلامة -->
        <footer class="portal-unified-footer">
            <div><strong>${COMPANY_NAME_AR}</strong> • منظومة إدارة السلامة والصحة المهنية المتكاملة © 2026</div>
            <div>وثيقة رسمية معتمدة صادرة إلكترونياً من البوابة الرقمية للسلامة والصحة المهنية (ICAPP SafetyHub) • صالحة للتدقيق والمراجعة الداخلية</div>
        </footer>`;
    }

    function getSignaturesHtml(signatures = []) {
        if (!signatures || signatures.length === 0) {
            signatures = [
                { title: 'إعداد / القائم بالفحص', name: 'مسؤول السلامة الميداني', line: 'التوقيع والتاريخ' },
                { title: 'مراجعة وتحقق', name: 'أخصائي / رئيس القسم', line: 'التوقيع والتاريخ' },
                { title: 'اعتماد الإدارة العامة للسلامة', name: 'إدارة السلامة والصحة المهنية', line: 'الختم والاعتماد الرقمي' }
            ];
        }

        const cols = signatures.map(s => `
            <div class="sig-card">
                <div class="sig-card-title">${escapeHtml(s.title || '')}</div>
                <div class="sig-card-name">${escapeHtml(s.name || '')}</div>
                <div class="sig-line-area">${escapeHtml(s.line || 'التوقيع والتاريخ')}</div>
            </div>
        `).join('');

        return `
        <div class="signatures-grid" style="grid-template-columns: repeat(${signatures.length}, 1fr);">
            ${cols}
        </div>`;
    }

    function getMetaGridHtml(items = []) {
        if (!items || items.length === 0) return '';
        const cards = items.map(it => `
            <div class="info-card">
                <div class="card-label">${escapeHtml(it.label || '')}</div>
                <div class="card-value">${escapeHtml(it.value || '--')}</div>
            </div>
        `).join('');

        return `
        <div class="report-info-grid" style="grid-template-columns: repeat(${Math.min(items.length, 4)}, 1fr);">
            ${cards}
        </div>`;
    }

    function getKpisHtml(kpis = {}) {
        return `
        <div class="kpi-grid">
            <div class="kpi-box total">
                <div class="kpi-num">${escapeHtml(kpis.total || '0')}</div>
                <div class="kpi-text">${escapeHtml(kpis.totalLabel || 'إجمالي البنود / العمليات')}</div>
            </div>
            <div class="kpi-box high">
                <div class="kpi-num">${escapeHtml(kpis.high || '0')}</div>
                <div class="kpi-text">${escapeHtml(kpis.highLabel || 'عالي الخطورة / حرج ⚠️')}</div>
            </div>
            <div class="kpi-box closed">
                <div class="kpi-num">${escapeHtml(kpis.closed || '0')}</div>
                <div class="kpi-text">${escapeHtml(kpis.closedLabel || 'مكتمل ومغلق ✅')}</div>
            </div>
            <div class="kpi-box ptw">
                <div class="kpi-num">${escapeHtml(kpis.pending || kpis.ptw || '0')}</div>
                <div class="kpi-text">${escapeHtml(kpis.pendingLabel || 'قيد المتابعة / تصاريح سارية 📜')}</div>
            </div>
        </div>`;
    }

    function buildDocumentHtml(config = {}) {
        const pageTitle = escapeHtml(config.pageTitle || config.docTitle || 'تقرير رسمي معتمد') + ' — ' + COMPANY_NAME_AR;
        const autoPrint = Boolean(config.autoPrint);

        const headerHtml = getHeaderHtml(config);
        const metaGridHtml = config.metaItems ? getMetaGridHtml(config.metaItems) : '';
        const kpisHtml = config.kpis ? getKpisHtml(config.kpis) : '';
        const signaturesHtml = getSignaturesHtml(config.signatures);
        const footerHtml = getFooterHtml(config);
        const bodyContent = config.bodyHtml || '';

        return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    ${getStylesHtml()}
</head>
<body>
    <div class="no-print-bar">
        <div class="brand-badge">
            <span class="pill-tag">ICAPP HSE</span>
            <span class="title-text">${escapeHtml(config.docTitle || 'نموذج وثيقة سلامة معتمدة')}</span>
        </div>
        <div class="action-buttons">
            <button type="button" onclick="window.print()" class="btn-print">
                🖨️ طباعة التقرير
            </button>
            <button type="button" onclick="window.close()" class="btn-close">
                ❌ إغلاق النافذة
            </button>
        </div>
    </div>

    <div class="report-page-container">
        ${headerHtml}
        ${metaGridHtml}
        ${kpisHtml}
        ${bodyContent}
        ${signaturesHtml}
        ${footerHtml}
    </div>

    ${autoPrint ? `<script>window.onload = function() { setTimeout(function() { window.print(); }, 350); };<\/script>` : ''}
</body>
</html>`;
    }

    function printDocument(config = {}) {
        const fullHtml = buildDocumentHtml({ ...config, autoPrint: true });
        const win = window.open('', '_blank');
        if (!win) {
            alert('يرجى السماح بالنوافذ المنبثقة (Pop-ups) لإتمام طباعة التقرير');
            return null;
        }
        win.document.write(fullHtml);
        win.document.close();
        return win;
    }

    return {
        COMPANY_NAME_AR,
        COMPANY_NAME_EN,
        DEPT_NAME_AR,
        DEPT_NAME_EN,
        escapeHtml,
        getStylesHtml,
        getHeaderHtml,
        getFooterHtml,
        getSignaturesHtml,
        getMetaGridHtml,
        getKpisHtml,
        buildDocumentHtml,
        printDocument
    };
}));
