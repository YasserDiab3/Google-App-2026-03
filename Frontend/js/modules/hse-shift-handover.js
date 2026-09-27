/**
 * HSE Digital Shift Handover & Safety Briefing Module
 * وحدة تقرير تسليم واستلام الوردية الرقمي لفرق السلامة الميدانية
 * v1.0 — 2026-09-26
 *
 * مصممة لتنظيم وتوثيق تسليم الورديات بين مهندسي وفنيي السلامة:
 * - تجميع إحصائيات الملاحظات المرصودة والمغلقة في الوردية.
 * - حصر تصاريح العمل النشطة (أعمال ساخنة، أماكن مغلقة، ارتفاعات).
 * - تسجيل تعليمات وبنود المتابعة الحرجة لمشرف الوردية القادمة.
 * - التصدير والمشاركة المباشرة عبر واتساب أو الطباعة المعتمدة (ISO 45001).
 */
(() => {
    'use strict';

    if (typeof window === 'undefined') return;
    if (window.HseShiftHandoverInitialized) return;
    window.HseShiftHandoverInitialized = true;

    try {
        let handoverModalEl = null;

        function createModalDom() {
            if (document.getElementById('hseShiftHandoverModal')) {
                return document.getElementById('hseShiftHandoverModal');
            }

            const modal = document.createElement('div');
            modal.id = 'hseShiftHandoverModal';
            modal.className = 'emergency-modal-overlay';
            modal.style.display = 'none';

            const todayStr = new Date().toISOString().slice(0, 10);
            const currentHour = new Date().getHours();
            let defaultShift = 'الأولى (07:00 - 15:00)';
            if (currentHour >= 15 && currentHour < 23) {
                defaultShift = 'الثانية (15:00 - 23:00)';
            } else if (currentHour >= 23 || currentHour < 7) {
                defaultShift = 'الثالثة (23:00 - 07:00)';
            }

            modal.innerHTML = `
                <div class="emergency-modal-dialog" style="max-width: 720px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1e3a8a, #0284c7); color: #ffffff; padding: 16px 20px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.15rem;">
                                <i class="fas fa-clipboard-user"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800;">محضر تسليم واستلام وردية السلامة الرقمي</h3>
                                <p style="margin: 2px 0 0; font-size: 0.75rem; opacity: 0.9;">ملخص نشاط السلامة وتوثيق التعليمات الميدانية بين الورديات</p>
                            </div>
                        </div>
                        <button type="button" class="emergency-modal-close-btn" id="btnCloseHandoverModal" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; color: #ffffff; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; padding: 0; outline: none; transition: background 0.2s ease;" title="إغلاق">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 76vh; overflow-y: auto; text-align: right; direction: rtl;">
                        <form id="frmShiftHandover" onsubmit="event.preventDefault();">
                            <!-- Basic Shift Meta -->
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px;">
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">تاريخ الوردية:</label>
                                    <input type="date" id="hoDate" value="${todayStr}" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" />
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">الوردية المُسلَّمة:</label>
                                    <select id="hoShift" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;">
                                        <option value="الوردية الأولى (07:00 - 15:00)" ${defaultShift.includes('الأولى') ? 'selected' : ''}>الوردية الأولى (07:00 - 15:00)</option>
                                        <option value="الوردية الثانية (15:00 - 23:00)" ${defaultShift.includes('الثانية') ? 'selected' : ''}>الوردية الثانية (15:00 - 23:00)</option>
                                        <option value="الوردية الثالثة (23:00 - 07:00)" ${defaultShift.includes('الثالثة') ? 'selected' : ''}>الوردية الثالثة (23:00 - 07:00)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">المصنع / الموقع:</label>
                                    <select id="hoSite" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;">
                                        <option value="كافة المواقع والمصانع">كافة المواقع (ICAPP 1 + ICAPP 2)</option>
                                        <option value="مصنع ICAPP 1">مصنع ICAPP 1</option>
                                        <option value="مصنع ICAPP 2">مصنع ICAPP 2</option>
                                        <option value="المخازن المركزية">المخازن المركزية</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Officers Info -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0;">
                                <div>
                                    <label style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">
                                        <span>مسؤول السلامة المسلِّم:</span>
                                        <span id="hoOutgoingBadge" style="font-size: 0.68rem; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 4px; display: none;">محدد تلقائياً</span>
                                    </label>
                                    <select id="hoOutgoingOfficer" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box; background: #ffffff; font-weight: 700; color: #1e293b;">
                                        <option value="">— اختر المشرف المسلِّم —</option>
                                    </select>
                                </div>
                                <div>
                                    <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 4px;">مسؤول السلامة المستلِم: <span style="color:#ef4444;">*</span></label>
                                    <select id="hoIncomingOfficer" style="width: 100%; padding: 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box; background: #ffffff; font-weight: 700; color: #1e293b;">
                                        <option value="">— اختر المشرف المستلِم —</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Auto KPI Strip -->
                            <div style="margin-bottom: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                    <span style="font-size: 0.82rem; font-weight: 800; color: #1e293b;">مؤشرات ونشاط السلامة المسجل بالوردية:</span>
                                    <button type="button" onclick="HseShiftHandover.refreshKpis()" style="background: none; border: none; color: #0284c7; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                                        <i class="fas fa-rotate"></i> تحديث الإحصائيات
                                    </button>
                                </div>
                                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center;">
                                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #1d4ed8;" id="hoKpiObsTotal">0</div>
                                        <div style="font-size: 0.72rem; color: #1e40af; font-weight: 700;">ملاحظات الوردية</div>
                                    </div>
                                    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #dc2626;" id="hoKpiObsHigh">0</div>
                                        <div style="font-size: 0.72rem; color: #991b1b; font-weight: 700;">أخطار عالية</div>
                                    </div>
                                    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #059669;" id="hoKpiObsClosed">0</div>
                                        <div style="font-size: 0.72rem; color: #065f46; font-weight: 700;">تم إغلاقها</div>
                                    </div>
                                    <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 10px 6px;">
                                        <div style="font-size: 1.25rem; font-weight: 900; color: #ca8a04;" id="hoKpiPtwCount">0</div>
                                        <div style="font-size: 0.72rem; color: #854d0e; font-weight: 700;">تصاريح نشطة (PTW)</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Critical Handover Instructions -->
                            <div style="margin-bottom: 16px;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                                    بنود المتابعة الحرجة وتوجيهات الاستلام للوردية القادمة: <span style="color:#ef4444;">*</span>
                                </label>
                                <textarea id="hoInstructions" rows="4" required placeholder="مثال:
1. متابعة موقع اللحام بعنبر التجميد والتأكد من خلوه من أي دخان بعد انتهاء الوردية.
2. التأكد من غلق لوحة الكهرباء رقم 4 بعد انتهاء الصيانة.
3. استكمال جولة فحص الطفايات في مخزن الكرتون..."
                                          style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.88rem; outline: none; box-sizing: border-box; resize: vertical; line-height: 1.5;"></textarea>
                            </div>

                            <!-- Buttons -->
                            <div style="display: flex; gap: 10px; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid #e2e8f0; flex-wrap: wrap;">
                                <div style="display: flex; gap: 8px;">
                                    <button type="button" onclick="HseShiftHandover.shareViaWhatsApp()" style="background: #25d366; color: #ffffff; border: none; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);">
                                        <i class="fab fa-whatsapp fa-lg"></i> مشاركة عبر واتساب
                                    </button>
                                    <button type="button" onclick="HseShiftHandover.printHandoverReport()" style="background: #334155; color: #ffffff; border: none; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-print"></i> طباعة المحضر
                                    </button>
                                </div>
                                <button type="button" id="btnCancelHandover" style="padding: 10px 16px; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                    إغلاق
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            handoverModalEl = modal;

            // Events
            modal.onclick = (e) => {
                if (e.target === modal) closeHandoverModal();
            };
            const closeBtn = modal.querySelector('#btnCloseHandoverModal');
            const cancelBtn = modal.querySelector('#btnCancelHandover');
            if (closeBtn) closeBtn.onclick = closeHandoverModal;
            if (cancelBtn) cancelBtn.onclick = closeHandoverModal;

            return modal;
        }

        function getSafetyTeamList() {
            const names = new Set();

            if (typeof window.getSystemSafetyTeamMembers === 'function') {
                try {
                    const list = window.getSystemSafetyTeamMembers();
                    if (Array.isArray(list)) list.forEach(n => n && names.add(n.trim()));
                } catch (_) {}
            }

            try {
                const obsCfg = JSON.parse(localStorage.getItem('HSE_PUBLIC_OBS_CONFIG') || '{}');
                if (Array.isArray(obsCfg.safetyMembers)) {
                    obsCfg.safetyMembers.forEach(m => {
                        const n = typeof m === 'string' ? m.trim() : (m && m.name ? m.name.trim() : '');
                        if (n) names.add(n);
                    });
                }
            } catch (_) {}

            try {
                const dMembers = JSON.parse(localStorage.getItem('HSE_DAILY_SAFETY_MEMBERS') || '[]');
                if (Array.isArray(dMembers)) {
                    dMembers.forEach(m => {
                        const n = typeof m === 'string' ? m.trim() : (m && m.name ? m.name.trim() : '');
                        if (n) names.add(n);
                    });
                }
            } catch (_) {}

            if (names.size === 0) {
                ['م/ محمد سعيد', 'م/ حسام السيد', 'أ/ أحمد فؤاد', 'م/ عماد طارق', 'م/ محمود علي', 'أ/ طارق مصطفى'].forEach(n => names.add(n));
            }

            return Array.from(names).sort((a, b) => a.localeCompare(b, 'ar'));
        }

        function populateOfficersDropdowns() {
            const outSel = document.getElementById('hoOutgoingOfficer');
            const inSel = document.getElementById('hoIncomingOfficer');
            if (!outSel || !inSel) return;

            const team = getSafetyTeamList();

            // Detect current logged-in user
            let currentUser = '';
            try {
                const sessionStr = sessionStorage.getItem('HSE_FIELD_SESSION') || localStorage.getItem('HSE_LAST_USER_NAME');
                if (sessionStr) {
                    let parsed = null;
                    try { parsed = JSON.parse(sessionStr); } catch (_) {}
                    currentUser = (parsed && (parsed.userName || parsed.name || parsed.inspector)) || 
                                  (typeof sessionStr === 'string' && !sessionStr.startsWith('{') ? sessionStr : '');
                    if (currentUser) currentUser = currentUser.trim();
                }
            } catch (_) {}

            // Populate Outgoing Officer
            const prevOut = outSel.value;
            outSel.innerHTML = '<option value="">— اختر المشرف المسلِّم —</option>';
            
            let foundCurrentUserInList = false;
            team.forEach(name => {
                if (currentUser && (name.toLowerCase().includes(currentUser.toLowerCase()) || currentUser.toLowerCase().includes(name.toLowerCase()))) {
                    foundCurrentUserInList = true;
                }
            });

            if (currentUser && !foundCurrentUserInList) {
                const curOpt = document.createElement('option');
                curOpt.value = currentUser;
                curOpt.textContent = `👤 ${currentUser} (المستخدم الحالي)`;
                outSel.appendChild(curOpt);
            }

            team.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = `👤 ${name}`;
                outSel.appendChild(opt);
            });

            // Set Outgoing value to current user by default
            if (prevOut) {
                outSel.value = prevOut;
            } else if (currentUser) {
                for (let i = 0; i < outSel.options.length; i++) {
                    const optVal = outSel.options[i].value;
                    if (optVal && (optVal.toLowerCase().includes(currentUser.toLowerCase()) || currentUser.toLowerCase().includes(optVal.toLowerCase()))) {
                        outSel.selectedIndex = i;
                        break;
                    }
                }
            }

            outSel.onchange = () => {
                const badge = document.getElementById('hoOutgoingBadge');
                if (!badge) return;
                if (currentUser && outSel.value && (outSel.value.toLowerCase().includes(currentUser.toLowerCase()) || currentUser.toLowerCase().includes(outSel.value.toLowerCase()))) {
                    badge.style.display = 'inline-block';
                    badge.textContent = 'محدد تلقائياً';
                    badge.style.background = '#e0f2fe';
                    badge.style.color = '#0284c7';
                } else if (outSel.value) {
                    badge.style.display = 'inline-block';
                    badge.textContent = 'اختيار يدوي';
                    badge.style.background = '#f1f5f9';
                    badge.style.color = '#475569';
                } else {
                    badge.style.display = 'none';
                }
            };
            outSel.onchange();

            // Populate Incoming Officer
            const prevIn = inSel.value;
            inSel.innerHTML = '<option value="">— اختر المشرف المستلِم —</option>';
            team.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = `👥 ${name}`;
                inSel.appendChild(opt);
            });
            if (prevIn) inSel.value = prevIn;
        }

        function openHandoverModal() {
            const modal = createModalDom();
            populateOfficersDropdowns();

            refreshKpis();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeHandoverModal() {
            if (handoverModalEl) {
                handoverModalEl.style.display = 'none';
                document.body.style.overflow = '';
            }
        }

        function refreshKpis() {
            let total = 0;
            let high = 0;
            let closed = 0;
            let ptw = 0;

            try {
                // 1. Read from local observations history
                const localStr = localStorage.getItem('HSE_PUBLIC_OBS_LOCAL_HISTORY');
                if (localStr) {
                    const list = JSON.parse(localStr);
                    if (Array.isArray(list)) {
                        total = list.length;
                        list.forEach(item => {
                            const r = String(item.riskLevel || item.risk || '').toLowerCase();
                            if (r.includes('عالي') || r.includes('high')) high++;
                            const s = String(item.status || '').toLowerCase();
                            if (s.includes('مغلق') || s.includes('closed')) closed++;
                        });
                    }
                }

                // 2. Read live observations analytics if present
                if (window.rawObservationsAnalyticsData) {
                    const d = window.rawObservationsAnalyticsData;
                    if (d.totalObservations) total = Math.max(total, d.totalObservations);
                    if (d.highRiskCount) high = Math.max(high, d.highRiskCount);
                    if (d.closedCount) closed = Math.max(closed, d.closedCount);
                }

                // 3. Estimate active PTW
                const ptwSummary = document.getElementById('ptwSummaryCount');
                if (ptwSummary) {
                    const parsedPtw = parseInt(ptwSummary.textContent, 10);
                    if (!isNaN(parsedPtw)) ptw = parsedPtw;
                }
            } catch (_) {}

            const elTotal = document.getElementById('hoKpiObsTotal');
            const elHigh = document.getElementById('hoKpiObsHigh');
            const elClosed = document.getElementById('hoKpiObsClosed');
            const elPtw = document.getElementById('hoKpiPtwCount');

            if (elTotal) elTotal.textContent = total;
            if (elHigh) elHigh.textContent = high;
            if (elClosed) elClosed.textContent = closed;
            if (elPtw) elPtw.textContent = ptw;
        }

        function generateHandoverText() {
            const date = document.getElementById('hoDate')?.value || new Date().toISOString().slice(0, 10);
            const shift = document.getElementById('hoShift')?.value || 'الوردية';
            const site = document.getElementById('hoSite')?.value || 'مصانع ICAPP';
            const outgoing = document.getElementById('hoOutgoingOfficer')?.value.trim() || 'مسؤول السلامة';
            const incoming = document.getElementById('hoIncomingOfficer')?.value.trim() || 'مشرف الاستلام';
            const instructions = document.getElementById('hoInstructions')?.value.trim() || 'لا توجد توجيهات خاصة مسجلة.';

            const total = document.getElementById('hoKpiObsTotal')?.textContent || '0';
            const high = document.getElementById('hoKpiObsHigh')?.textContent || '0';
            const closed = document.getElementById('hoKpiObsClosed')?.textContent || '0';
            const ptw = document.getElementById('hoKpiPtwCount')?.textContent || '0';

            const text = 
`📋 *محضر تسليم واستلام وردية السلامة — ICAPP HSE*
────────────────────────
📅 *التاريخ:* ${date}
⏰ *الوردية:* ${shift}
🏭 *الموقع:* ${site}
👤 *المسلِّم:* ${outgoing}
👤 *المستلِم:* ${incoming}
────────────────────────
📊 *إحصائيات نشاط الوردية:*
• إجمالي الملاحظات: ${total}
• أخطار حرجة/عالية: ${high} ⚠️
• ملاحظات تم إغلاقها: ${closed} ✅
• تصاريح عمل نشطة (PTW): ${ptw} 📜
────────────────────────
📝 *توجيهات وبنود المتابعة للوردية القادمة:*
${instructions}
────────────────────────
✅ *معتمد طبقاً لمعايير إدارة السلامة والصحة المهنية ISO 45001*`;

            return text;
        }

        function shareViaWhatsApp() {
            const text = generateHandoverText();
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }

        function printHandoverReport() {
            const text = generateHandoverText();
            const win = window.open('', '_blank');
            if (!win) return;

            win.document.write(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="utf-8">
                    <title>محضر تسليم واستلام وردية السلامة</title>
                    <style>
                        body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; direction: rtl; color: #0f172a; line-height: 1.6; }
                        .report-header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 20px; }
                        .report-header h2 { margin: 0 0 6px 0; font-size: 1.4rem; color: #1e3a8a; }
                        .report-header p { margin: 0; font-size: 0.9rem; color: #64748b; }
                        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .meta-table td { padding: 8px 12px; border: 1px solid #cbd5e1; font-size: 0.9rem; }
                        .meta-table td b { color: #1e3a8a; }
                        .content-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; white-space: pre-wrap; font-size: 0.95rem; margin-bottom: 30px; }
                        .sig-grid { display: flex; justify-content: space-between; margin-top: 40px; padding: 0 40px; }
                        .sig-box { text-align: center; font-size: 0.9rem; font-weight: bold; }
                        .sig-line { width: 180px; border-bottom: 1.5px dashed #475569; margin-top: 50px; }
                        @media print { body { padding: 0; } }
                    </style>
                </head>
                <body>
                    <div class="report-header">
                        <h2>شركة الإسكندرية للصناعات الغذائية (ICAPP)</h2>
                        <p>الإدارة العامة للسلامة والصحة المهنية والبيئة • محضر تسليم واستلام الوردية</p>
                    </div>
                    <div class="content-box">${escapeHtml(text)}</div>
                    <div class="sig-grid">
                        <div class="sig-box">
                            <div>توقيع مسؤول السلامة المسلِّم</div>
                            <div class="sig-line"></div>
                        </div>
                        <div class="sig-box">
                            <div>توقيع مسؤول السلامة المستلِم</div>
                            <div class="sig-line"></div>
                        </div>
                    </div>
                    <script>window.onload = () => { window.print(); };<\/script>
                </body>
                </html>
            `);
            win.document.close();
        }

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        // Export API
        const api = {
            open: openHandoverModal,
            close: closeHandoverModal,
            refreshKpis,
            shareViaWhatsApp,
            printHandoverReport
        };

        window.HseShiftHandover = api;
        window.HseHandover = api;

    } catch (err) {
        console.warn('[HSE Shift Handover] Module initialized safely with note:', err);
    }
})();
