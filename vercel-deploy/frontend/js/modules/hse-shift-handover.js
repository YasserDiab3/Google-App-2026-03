/**
 * HSE Digital Shift Handover & Safety Briefing Module
 * وحدة تقرير تسليم واستلام الوردية الرقمي لفرق السلامة الميدانية
 * v1.2 — 2026-09-27
 *
 * مصممة لتنظيم وتوثيق تسليم الورديات بين مهندسي ومراقبي وفنيي السلامة:
 * - تجميع إحصائيات الملاحظات المرصودة والمغلقة في الوردية.
 * - حصر تصاريح العمل النشطة (أعمال ساخنة، أماكن مغلقة، ارتفاعات).
 * - تسجيل تعليمات وبنود المتابعة الحرجة لمشرف الوردية القادمة.
 * - التحديد التلقائي لمسؤول السلامة المسلِّم بناءً على جلسة الدخول النشطة.
 * - فحص ومزامنة البيانات العالقة أوفلاين قبل إنهاء الوردية (Pre-Handover Sync Check).
 * - الربط التلقائي بموضوع جلسة التوعية اليومية (TBT Linkage) المنفذة بالوردية.
 * - أرشيف وسجل استعراض الورديات السابقة (Shift Handover History & Logs) مع استيراد التوجيهات.
 * - التصدير والمشاركة المباشرة عبر واتساب أو الطباعة المعتمدة (ISO 45001).
 */
(() => {
    'use strict';

    if (typeof window === 'undefined') return;
    if (window.HseShiftHandoverInitialized) return;
    window.HseShiftHandoverInitialized = true;

    try {
        let handoverModalEl = null;
        let currentShiftTbtData = null;

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
                <div class="emergency-modal-dialog" style="max-width: 760px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
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

                    <!-- Navigation Tabs Header -->
                    <div style="background: #f1f5f9; padding: 8px 16px; display: flex; gap: 8px; border-bottom: 1px solid #e2e8f0; direction: rtl;">
                        <button type="button" id="hoTabBtnCurrent" onclick="HseShiftHandover.switchTab('current')" style="background: #ffffff; color: #1e3a8a; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s;">
                            <i class="fas fa-file-pen"></i> محضر الوردية الحالية
                        </button>
                        <button type="button" id="hoTabBtnHistory" onclick="HseShiftHandover.switchTab('history')" style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                            <i class="fas fa-clock-rotate-left"></i> سجل المحاضر السابقة
                            <span id="hoHistoryBadgeCount" style="background: #e2e8f0; color: #1e293b; font-size: 0.7rem; padding: 1px 6px; border-radius: 10px; margin-right: 4px;">0</span>
                        </button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 74vh; overflow-y: auto; text-align: right; direction: rtl;">
                        <!-- Pre-Handover Offline Sync Notice Bar -->
                        <div id="hoOfflineSyncNotice" style="display: none; margin-bottom: 14px; padding: 10px 14px; border-radius: 10px; font-size: 0.8rem; border: 1.5px solid #fef08a; background: #fefce8; color: #854d0e; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
                            <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 240px;">
                                <i class="fas fa-triangle-exclamation" style="font-size: 1.1rem; color: #d97706; flex-shrink: 0;"></i>
                                <span id="hoOfflineSyncMsg">يوجد سجلات وملاحظات محفوظة على هذا الجهاز لم يتم رفعها بعد.</span>
                            </div>
                            <button type="button" id="btnHoSyncNow" onclick="HseShiftHandover.triggerPreHandoverSync()" style="background: #d97706; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-weight: 800; font-size: 0.76rem; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; flex-shrink: 0;">
                                <i class="fas fa-rotate"></i> مزامنة السجلات الآن
                            </button>
                        </div>

                        <!-- VIEW 1: Current Handover Form -->
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

                            <!-- TBT Linkage Section -->
                            <div id="hoTbtSection" style="margin-bottom: 16px; background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; padding: 10px 14px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 4px;">
                                    <span style="font-size: 0.8rem; font-weight: 800; color: #166534; display: flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-bullhorn" style="color: #16a34a;"></i> توعية بداية الوردية (Toolbox Talk - TBT):
                                    </span>
                                    <span id="hoTbtBadge" style="font-size: 0.7rem; font-weight: 700; color: #15803d; background: #dcfce7; padding: 2px 8px; border-radius: 6px;">
                                        جاري الفحص...
                                    </span>
                                </div>
                                <div id="hoTbtContent" style="font-size: 0.82rem; color: #1e293b; display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
                                    <div id="hoTbtTitle" style="font-weight: 600;">لا توجد جلسة TBT مسجلة اليوم حتى الآن.</div>
                                    <button type="button" id="btnHoInsertTbt" onclick="HseShiftHandover.insertTbtToInstructions()" style="display: none; background: #16a34a; color: #fff; border: none; padding: 5px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; white-space: nowrap; align-items: center; gap: 5px;">
                                        <i class="fas fa-plus"></i> إدراج بالتوجيهات
                                    </button>
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
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    <button type="button" onclick="HseShiftHandover.saveHandoverToHistory(true)" style="background: #0284c7; color: #ffffff; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-floppy-disk"></i> حفظ بالسجل
                                    </button>
                                    <button type="button" onclick="HseShiftHandover.shareViaWhatsApp()" style="background: #25d366; color: #ffffff; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);">
                                        <i class="fab fa-whatsapp fa-lg"></i> مشاركة عبر واتساب
                                    </button>
                                    <button type="button" onclick="HseShiftHandover.printHandoverReport()" style="background: #334155; color: #ffffff; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                                        <i class="fas fa-print"></i> طباعة المحضر
                                    </button>
                                </div>
                                <button type="button" id="btnCancelHandover" style="padding: 10px 16px; background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
                                    إغلاق
                                </button>
                            </div>
                        </form>

                        <!-- VIEW 2: History View (initially hidden) -->
                        <div id="hoHistoryView" style="display: none;">
                            <div style="margin-bottom: 14px; position: relative;">
                                <input type="text" id="hoHistorySearch" placeholder="بحث في المحاضر السابقة (تاريخ، وردية، مشرف، موقع)..." oninput="HseShiftHandover.renderHistoryList(this.value)" style="width: 100%; padding: 8px 34px 8px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; box-sizing: border-box;" />
                                <i class="fas fa-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
                            </div>
                            <div id="hoHistoryCardsContainer"></div>
                        </div>
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

            // Dynamic date/site change handlers
            const dateInput = modal.querySelector('#hoDate');
            const siteSelect = modal.querySelector('#hoSite');
            if (dateInput) {
                dateInput.onchange = () => {
                    loadTbtSummaryForShift();
                    refreshKpis();
                };
            }
            if (siteSelect) {
                siteSelect.onchange = () => {
                    loadTbtSummaryForShift();
                    refreshKpis();
                };
            }

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

        // ==========================================================
        // ⚠️ Pre-Handover Offline Sync Check
        // ==========================================================
        async function checkPreHandoverOfflineState() {
            const notice = document.getElementById('hoOfflineSyncNotice');
            const msg = document.getElementById('hoOfflineSyncMsg');
            const btn = document.getElementById('btnHoSyncNow');
            if (!notice || !msg) return;

            let counts = { total: 0, obs: 0, nm: 0, ds: 0, fe: 0, tbt: 0 };
            if (window.HseOfflineStore && typeof window.HseOfflineStore.getCounts === 'function') {
                try {
                    counts = await window.HseOfflineStore.getCounts();
                } catch (_) {}
            } else {
                try {
                    const obs = JSON.parse(localStorage.getItem('HSE_OFFLINE_OBS_QUEUE') || '[]').length;
                    const nm = JSON.parse(localStorage.getItem('HSE_OFFLINE_NEARMISS_QUEUE') || '[]').length;
                    const ds = JSON.parse(localStorage.getItem('HSE_OFFLINE_DAILY_SAFETY_QUEUE') || '[]').length;
                    const fe = JSON.parse(localStorage.getItem('HSE_OFFLINE_FIRE_INSPECTION_QUEUE') || '[]').length;
                    const tbt = JSON.parse(localStorage.getItem('HSE_OFFLINE_TBT_QUEUE') || '[]').length;
                    counts = { obs, nm, ds, fe, tbt, total: obs + nm + ds + fe + tbt };
                } catch (_) {}
            }

            if (counts.total > 0) {
                notice.style.display = 'flex';
                notice.style.background = '#fefce8';
                notice.style.borderColor = '#fef08a';
                notice.style.color = '#854d0e';
                const parts = [];
                if (counts.obs) parts.push(`${counts.obs} ملاحظات`);
                if (counts.nm) parts.push(`${counts.nm} وشيك`);
                if (counts.ds) parts.push(`${counts.ds} مرور`);
                if (counts.fe) parts.push(`${counts.fe} إطفاء`);
                if (counts.tbt) parts.push(`${counts.tbt} TBT`);
                msg.innerHTML = `⚠️ <b>تنبيه قبل التسليم:</b> يوجد <b>(${counts.total})</b> سجلات محفوظة على هذا الجهاز لم تُرفع بعد (${parts.join('، ')}). يُوصى بالمزامنة قبل إنهاء الوردية.`;
                if (btn) btn.style.display = 'inline-flex';
            } else {
                notice.style.display = 'flex';
                notice.style.background = '#f0fdf4';
                notice.style.borderColor = '#bbf7d0';
                notice.style.color = '#166534';
                msg.innerHTML = `✅ <b>حالة المزامنة ممتازة:</b> كافة السجلات والملاحظات الميدانية متزامنة سحابياً ولا توجد بيانات معلقة أوفلاين.`;
                if (btn) btn.style.display = 'none';
            }
        }

        async function triggerPreHandoverSync() {
            const btn = document.getElementById('btnHoSyncNow');
            if (!navigator.onLine) {
                alert('الجهاز غير متصل بالإنترنت حالياً. يرجى الاتصال بشبكة المصنع أو الواي فاي أولاً لإتمام المزامنة.');
                return;
            }
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المزامنة...';
            }
            try {
                if (typeof window.syncAllOfflineData === 'function') {
                    await window.syncAllOfflineData();
                } else if (window.HseOfflineSync && typeof window.HseOfflineSync.syncAll === 'function') {
                    await window.HseOfflineSync.syncAll();
                }
            } catch (_) {}

            await checkPreHandoverOfflineState();
            refreshKpis();
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-rotate"></i> مزامنة السجلات الآن';
            }
        }

        // ==========================================================
        // 🤝 TBT Linkage
        // ==========================================================
        async function loadTbtSummaryForShift() {
            const selectedDate = document.getElementById('hoDate')?.value || new Date().toISOString().slice(0, 10);
            currentShiftTbtData = null;
            let foundTbt = null;

            // 1. Search IndexedDB tbt_records
            if (window.HseOfflineStore && typeof window.HseOfflineStore.getAll === 'function') {
                try {
                    const list = await window.HseOfflineStore.getAll('tbt_records');
                    if (Array.isArray(list)) {
                        foundTbt = list.find(r => r.date === selectedDate || (r.clientCreatedAt && r.clientCreatedAt.slice(0, 10) === selectedDate));
                    }
                } catch (_) {}
            }

            // 2. Search HSE_OFFLINE_TBT_QUEUE
            if (!foundTbt) {
                try {
                    const q = JSON.parse(localStorage.getItem('HSE_OFFLINE_TBT_QUEUE') || '[]');
                    if (Array.isArray(q)) {
                        foundTbt = q.find(r => r.date === selectedDate || (r.clientCreatedAt && r.clientCreatedAt.slice(0, 10) === selectedDate));
                    }
                } catch (_) {}
            }

            // 3. Search HSE_TBT_RECORDS_CACHE
            if (!foundTbt) {
                try {
                    const cache = JSON.parse(localStorage.getItem('HSE_TBT_RECORDS_CACHE') || '[]');
                    if (Array.isArray(cache)) {
                        foundTbt = cache.find(r => r.date === selectedDate || (r.clientCreatedAt && r.clientCreatedAt.slice(0, 10) === selectedDate));
                    }
                } catch (_) {}
            }

            // Update UI
            const badge = document.getElementById('hoTbtBadge');
            const titleEl = document.getElementById('hoTbtTitle');
            const insertBtn = document.getElementById('btnHoInsertTbt');

            if (foundTbt) {
                const topic = foundTbt.topic || (foundTbt.employeePayload && foundTbt.employeePayload.name) || 'جلسة توعية ميدانية';
                const attendees = foundTbt.totalAttendees || (foundTbt.participants && foundTbt.participants.length) || 0;
                const trainer = foundTbt.trainer || foundTbt.trainerVal || 'مشرف السلامة';

                currentShiftTbtData = { topic, attendees, trainer, date: selectedDate };

                if (badge) {
                    badge.textContent = 'جلسة مسجلة ✅';
                    badge.style.background = '#dcfce7';
                    badge.style.color = '#15803d';
                }
                if (titleEl) {
                    titleEl.innerHTML = `📌 <b>${escapeHtml(topic)}</b> — الحضور: <span style="color:#16a34a; font-weight:800;">${attendees} عاملاً</span> (المدرب: ${escapeHtml(trainer)})`;
                }
                if (insertBtn) insertBtn.style.display = 'inline-flex';
            } else {
                if (badge) {
                    badge.textContent = 'لم تُسجل بعد';
                    badge.style.background = '#f1f5f9';
                    badge.style.color = '#64748b';
                }
                if (titleEl) {
                    titleEl.textContent = 'لا توجد جلسة توعية (TBT) مسجلة بهذا التاريخ حتى الآن.';
                }
                if (insertBtn) insertBtn.style.display = 'none';
            }
        }

        function insertTbtToInstructions() {
            if (!currentShiftTbtData) return;
            const txtArea = document.getElementById('hoInstructions');
            if (!txtArea) return;
            const bullet = `• تم تنفيذ جلسة توعية (TBT) بعنوان: «${currentShiftTbtData.topic}» بحضور (${currentShiftTbtData.attendees}) عاملاً بقيادة (${currentShiftTbtData.trainer}).\n`;
            if (!txtArea.value.includes(currentShiftTbtData.topic)) {
                txtArea.value = bullet + txtArea.value;
            }
            showTemporaryToast('✅ تم إدراج بيانات جلسة الـ TBT في بنود التوجيهات');
        }

        // ==========================================================
        // 📋 Shift Handover History & Logs
        // ==========================================================
        function updateHistoryBadgeCount() {
            const badge = document.getElementById('hoHistoryBadgeCount');
            if (!badge) return;
            try {
                const list = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
                badge.textContent = Array.isArray(list) ? list.length : 0;
            } catch (_) {
                badge.textContent = '0';
            }
        }

        function switchTab(tab) {
            const currentTabBtn = document.getElementById('hoTabBtnCurrent');
            const historyTabBtn = document.getElementById('hoTabBtnHistory');
            const currentView = document.getElementById('frmShiftHandover');
            const historyView = document.getElementById('hoHistoryView');

            if (tab === 'history') {
                if (currentTabBtn) {
                    currentTabBtn.style.background = 'transparent';
                    currentTabBtn.style.color = '#64748b';
                    currentTabBtn.style.fontWeight = '700';
                    currentTabBtn.style.boxShadow = 'none';
                }
                if (historyTabBtn) {
                    historyTabBtn.style.background = '#ffffff';
                    historyTabBtn.style.color = '#1e3a8a';
                    historyTabBtn.style.fontWeight = '800';
                    historyTabBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }
                if (currentView) currentView.style.display = 'none';
                if (historyView) historyView.style.display = 'block';
                renderHistoryList();
            } else {
                if (historyTabBtn) {
                    historyTabBtn.style.background = 'transparent';
                    historyTabBtn.style.color = '#64748b';
                    historyTabBtn.style.fontWeight = '700';
                    historyTabBtn.style.boxShadow = 'none';
                }
                if (currentTabBtn) {
                    currentTabBtn.style.background = '#ffffff';
                    currentTabBtn.style.color = '#1e3a8a';
                    currentTabBtn.style.fontWeight = '800';
                    currentTabBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }
                if (historyView) historyView.style.display = 'none';
                if (currentView) currentView.style.display = 'block';
            }
        }

        function saveHandoverToHistory(showToast = true) {
            const date = document.getElementById('hoDate')?.value || new Date().toISOString().slice(0, 10);
            const shift = document.getElementById('hoShift')?.value || 'الوردية';
            const site = document.getElementById('hoSite')?.value || 'مصانع ICAPP';
            const outgoing = document.getElementById('hoOutgoingOfficer')?.value.trim() || 'مسؤول السلامة';
            const incoming = document.getElementById('hoIncomingOfficer')?.value.trim() || 'مشرف الاستلام';
            const instructions = document.getElementById('hoInstructions')?.value.trim() || '';

            const total = document.getElementById('hoKpiObsTotal')?.textContent || '0';
            const high = document.getElementById('hoKpiObsHigh')?.textContent || '0';
            const closed = document.getElementById('hoKpiObsClosed')?.textContent || '0';
            const ptw = document.getElementById('hoKpiPtwCount')?.textContent || '0';

            const record = {
                id: 'HO_' + Date.now(),
                createdAt: new Date().toISOString(),
                date,
                shift,
                site,
                outgoing,
                incoming,
                kpis: { total, high, closed, ptw },
                tbtInfo: currentShiftTbtData || null,
                instructions,
                fullSummaryText: generateHandoverText()
            };

            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
            } catch (_) {}

            const isDup = history.some(h => h.date === date && h.shift === shift && h.site === site && (Date.now() - new Date(h.createdAt).getTime() < 60000));
            if (!isDup) {
                history.unshift(record);
                if (history.length > 50) history = history.slice(0, 50);
                localStorage.setItem('HSE_SHIFT_HANDOVERS_HISTORY', JSON.stringify(history));
            }

            updateHistoryBadgeCount();
            if (showToast) {
                showTemporaryToast('✅ تم حفظ واعتماد محضر تسليم الوردية في السجل بنجاح');
            }
            return record;
        }

        function renderHistoryList(filterText = '') {
            const container = document.getElementById('hoHistoryCardsContainer');
            if (!container) return;

            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
            } catch (_) {}

            if (filterText) {
                const q = filterText.toLowerCase();
                history = history.filter(h => 
                    (h.date && h.date.includes(q)) ||
                    (h.shift && h.shift.toLowerCase().includes(q)) ||
                    (h.site && h.site.toLowerCase().includes(q)) ||
                    (h.outgoing && h.outgoing.toLowerCase().includes(q)) ||
                    (h.incoming && h.incoming.toLowerCase().includes(q)) ||
                    (h.instructions && h.instructions.toLowerCase().includes(q))
                );
            }

            if (history.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 36px 16px; color: #64748b;">
                        <i class="fas fa-folder-open" style="font-size: 2.2rem; opacity: 0.4; margin-bottom: 10px;"></i>
                        <div style="font-weight: 700; font-size: 0.9rem;">لا توجد محاضر تسليم مسجلة مسبقاً في السجل</div>
                        <div style="font-size: 0.78rem; opacity: 0.8; margin-top: 4px;">تُحفظ المحاضر تلقائياً هنا عند حفظ أو اعتماد أو مشاركة أي محضر وردية.</div>
                    </div>
                `;
                return;
            }

            container.innerHTML = history.map((h) => `
                <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                        <div>
                            <span style="font-weight: 800; color: #1e3a8a; font-size: 0.9rem;">${escapeHtml(h.shift || 'الوردية')}</span>
                            <span style="font-size: 0.75rem; color: #64748b; margin-right: 6px;">📅 ${escapeHtml(h.date || '')}</span>
                            <span style="font-size: 0.75rem; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 4px; margin-right: 6px;">${escapeHtml(h.site || '')}</span>
                        </div>
                        <div style="font-size: 0.72rem; color: #94a3b8;">
                            ${new Date(h.createdAt || Date.now()).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem; background: #f8fafc; padding: 8px 10px; border-radius: 8px; margin-bottom: 8px;">
                        <div><b>المسلِّم:</b> 👤 ${escapeHtml(h.outgoing || '—')}</div>
                        <div><b>المستلِم:</b> 👥 ${escapeHtml(h.incoming || '—')}</div>
                    </div>

                    <!-- KPIs Badge Row -->
                    <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
                        <span style="background: #eff6ff; color: #1d4ed8; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">ملاحظات: ${h.kpis?.total || 0}</span>
                        <span style="background: #fef2f2; color: #dc2626; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">أخطار عالية: ${h.kpis?.high || 0}</span>
                        <span style="background: #ecfdf5; color: #059669; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">مغلقة: ${h.kpis?.closed || 0}</span>
                        <span style="background: #fefce8; color: #ca8a04; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">تصاريح: ${h.kpis?.ptw || 0}</span>
                        ${h.tbtInfo?.topic ? `<span style="background: #f0fdf4; color: #15803d; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">📢 TBT: ${escapeHtml(h.tbtInfo.topic.slice(0, 24))}...</span>` : ''}
                    </div>

                    <!-- Instructions snippet -->
                    <div style="font-size: 0.8rem; color: #334155; background: #fafafa; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 8px; margin-bottom: 10px; max-height: 60px; overflow: hidden; text-overflow: ellipsis; white-space: pre-line;">
                        ${escapeHtml(h.instructions || 'لا توجد توجيهات مسجلة')}
                    </div>

                    <!-- Actions Row -->
                    <div style="display: flex; gap: 6px; justify-content: flex-end; flex-wrap: wrap;">
                        <button type="button" onclick="HseShiftHandover.copyInstructionsFromHistory('${h.id}')" style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" title="نسخ توجيهات هذه الوردية واستخدامها في الوردية الحالية">
                            <i class="fas fa-copy"></i> استخدام التوجيهات
                        </button>
                        <button type="button" onclick="HseShiftHandover.viewFullHistoryReport('${h.id}')" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                            <i class="fas fa-eye"></i> استعراض
                        </button>
                        <button type="button" onclick="HseShiftHandover.printHistoryReport('${h.id}')" style="background: #334155; color: #ffffff; border: none; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                            <i class="fas fa-print"></i> طباعة
                        </button>
                        <button type="button" onclick="HseShiftHandover.shareHistoryWhatsApp('${h.id}')" style="background: #25d366; color: #ffffff; border: none; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                            <i class="fab fa-whatsapp"></i> واتساب
                        </button>
                        <button type="button" onclick="HseShiftHandover.deleteHistoryItem('${h.id}')" style="background: #fff; color: #ef4444; border: 1px solid #fecaca; padding: 5px 8px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;" title="حذف من السجل المحلي">
                            <i class="fas fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function copyInstructionsFromHistory(id) {
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
            } catch (_) {}
            const item = history.find(h => h.id === id);
            if (!item || !item.instructions) {
                showTemporaryToast('⚠️ لا توجد توجيهات مسجلة في هذا المحضر');
                return;
            }

            const txtArea = document.getElementById('hoInstructions');
            if (txtArea) {
                const prefix = `[متابعة من ${item.shift} — مسلِّم: ${item.outgoing}]:\n`;
                txtArea.value = prefix + item.instructions;
            }
            switchTab('current');
            showTemporaryToast('✅ تم نسخ توجيهات الوردية السابقة للوردية الحالية');
        }

        function buildOfficialHandoverDocumentHtml(data, options = {}) {
            const autoPrint = Boolean(options.autoPrint);

            const date = escapeHtml(data.date || new Date().toISOString().slice(0, 10));
            const shift = escapeHtml(data.shift || 'الوردية الصباحية');
            const site = escapeHtml(data.site || 'كافة مصانع ICAPP');
            const outgoing = escapeHtml(data.outgoing || 'مسؤول السلامة المسلِّم');
            const incoming = escapeHtml(data.incoming || 'مسؤول السلامة المستلِم');

            // Handling instructions
            let instructionsText = data.instructions || '';
            if (!instructionsText && data.fullSummaryText) {
                const match = data.fullSummaryText.match(/توجيهات وبنود المتابعة للوردية القادمة:[\r\n]+([\s\S]*?)(\r?\n─|\r?\n✅|$)/);
                if (match && match[1]) {
                    instructionsText = match[1].trim();
                } else {
                    instructionsText = data.fullSummaryText;
                }
            }
            if (!instructionsText) {
                instructionsText = 'تم تسليم الوردية وفقاً للضوابط التشغيلية المعتمدة دون وجود معوقات حرجة.';
            }

            const kpis = data.kpis || {
                total: '0',
                high: '0',
                closed: '0',
                ptw: '0'
            };

            const tbt = data.tbtInfo || null;

            let printTimeStr = '';
            try {
                const now = data.createdAt ? new Date(data.createdAt) : new Date();
                printTimeStr = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
            } catch (_) {
                printTimeStr = date;
            }

            let logoSrc = '/icons/icapp-logo.png';
            if (typeof window !== 'undefined' && window.location) {
                if (window.location.protocol === 'file:') {
                    logoSrc = 'icons/icapp-logo.png';
                } else if (window.location.origin && window.location.origin !== 'null') {
                    logoSrc = `${window.location.origin}/icons/icapp-logo.png`;
                }
            }
            const logoFallback = 'icons/icon-192x192.png';

            const tbtHtml = (tbt && tbt.topic) ? `
                <div class="tbt-banner">
                    <div>
                        <span style="font-size: 10px; background: #86198f; color: #fff; padding: 2px 7px; border-radius: 4px; font-weight: 800; margin-left: 6px;">TBT مُعتمد</span>
                        <span class="tbt-topic">📢 موضوع التوعية: ${escapeHtml(tbt.topic)}</span>
                    </div>
                    <div class="tbt-meta">
                        <span>👥 الحضور: <strong>${escapeHtml(tbt.attendees || '0')} عامل</strong></span>
                        <span>👤 المشرف/المدرب: <strong>${escapeHtml(tbt.trainer || 'مشرف السلامة')}</strong></span>
                        ${tbt.category ? `<span>🏷️ التصنيف: <strong>${escapeHtml(tbt.category)}</strong></span>` : ''}
                    </div>
                </div>
            ` : '';

            return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>محضر تسليم واستلام وردية السلامة — الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-primary: #1e3a8a;
            --brand-navy: #0f172a;
            --brand-green: #047857;
            --brand-red: #b91c1c;
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

        .report-page-container {
            max-width: 900px;
            margin: 22px auto 40px auto;
            background: #ffffff;
            padding: 28px 34px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
        }

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

        .handover-info-grid {
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

        .officers-bar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 14px;
        }
        .officer-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
            border: 1.5px solid #86efac;
            border-radius: 6px;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .officer-card.incoming-card {
            background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
            border-color: #93c5fd;
        }
        .officer-role {
            font-size: 10.5px;
            font-weight: 800;
            color: #166534;
        }
        .officer-card.incoming-card .officer-role {
            color: #1e40af;
        }
        .officer-name {
            font-size: 12.5px;
            font-weight: 900;
            color: #0f172a;
        }

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
        .kpi-box.ptw { background: #fffbeb; border-color: #fde68a; }
        .kpi-num {
            font-size: 1.35rem;
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 2px;
        }
        .kpi-box.total .kpi-num { color: #0f172a; }
        .kpi-box.high .kpi-num { color: #dc2626; }
        .kpi-box.closed .kpi-num { color: #16a34a; }
        .kpi-box.ptw .kpi-num { color: #d97706; }
        .kpi-text {
            font-size: 10px;
            font-weight: 700;
            color: #475569;
        }

        .tbt-banner {
            background: #fdf4ff;
            border: 1.5px solid #f0abfc;
            border-radius: 6px;
            padding: 8px 12px;
            margin-bottom: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
        }
        .tbt-topic {
            font-weight: 900;
            font-size: 11.5px;
            color: #86198f;
        }
        .tbt-meta {
            font-size: 10.5px;
            font-weight: 700;
            color: #581c87;
            display: flex;
            gap: 10px;
        }

        .instructions-container {
            border: 1.5px solid #cbd5e1;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 18px;
        }
        .instructions-header {
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
        .instructions-body {
            padding: 12px 14px;
            background: #ffffff;
            font-size: 11.5px;
            line-height: 1.65;
            color: #1e293b;
            white-space: pre-wrap;
            min-height: 90px;
        }

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
    </style>
</head>
<body>
    <div class="no-print-bar">
        <div class="brand-badge">
            <span class="pill-tag">ICAPP HSE</span>
            <span class="title-text">محضر تسليم واستلام وردية السلامة الميداني</span>
        </div>
        <div class="action-buttons">
            <button type="button" onclick="window.print()" class="btn-print">
                🖨️ طباعة المحضر
            </button>
            <button type="button" onclick="window.close()" class="btn-close">
                ❌ إغلاق النافذة
            </button>
        </div>
    </div>

    <div class="report-page-container">
        <!-- ترويسة ISO المعتمدة ثلاثية الأعمدة والصناديق -->
        <div class="iso-print-header">
            <div class="iso-box-brand">
                <img src="${logoSrc}" alt="شعار ICAPP" class="iso-print-logo" onerror="this.onerror=null; this.src='${logoFallback}';">
                <div class="iso-company-title">الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</div>
                <div class="iso-dept-title">إدارة السلامة والصحة المهنية والبيئة</div>
            </div>

            <div class="iso-box-title">
                <h1 class="iso-main-title">محضر تسليم واستلام وردية السلامة</h1>
                <div class="iso-sub-title">Shift Safety Handover & Briefing Report</div>
                <div class="iso-badge-std">معتمد طبقاً للمواصفة ISO 45001:2018 & OSHA 1910</div>
            </div>

            <div class="iso-box-meta">
                <div class="meta-row">
                    <span>كود الوثيقة:</span>
                    <strong>DOC-HSE-SHO-01</strong>
                </div>
                <div class="meta-row">
                    <span>رقم الإصدار:</span>
                    <strong>Rev. 02</strong>
                </div>
                <div class="meta-row">
                    <span>تاريخ الاعتماد:</span>
                    <strong>2026-09</strong>
                </div>
                <div class="meta-row">
                    <span>درجة السرية:</span>
                    <strong style="color: #047857;">عام داخلي</strong>
                </div>
            </div>
        </div>

        <!-- شبكة بيانات الوردية والموقع -->
        <div class="handover-info-grid">
            <div class="info-card">
                <div class="card-label">📅 تاريخ الوردية</div>
                <div class="card-value">${date}</div>
            </div>
            <div class="info-card">
                <div class="card-label">⏰ فترة الوردية</div>
                <div class="card-value">${shift}</div>
            </div>
            <div class="info-card">
                <div class="card-label">🏭 الموقع / المصنع</div>
                <div class="card-value">${site}</div>
            </div>
            <div class="info-card">
                <div class="card-label">🕒 توقيت الإصدار</div>
                <div class="card-value">${printTimeStr}</div>
            </div>
        </div>

        <!-- بطاقات مسؤولي السلامة المسلم والمستلم -->
        <div class="officers-bar">
            <div class="officer-card">
                <div>
                    <div class="officer-role">👤 مسؤول السلامة المسلِّم (Outgoing Officer):</div>
                    <div class="officer-name">${outgoing}</div>
                </div>
                <div style="font-size: 18px;">📤</div>
            </div>
            <div class="officer-card incoming-card">
                <div>
                    <div class="officer-role">👥 مسؤول السلامة المستلِم (Incoming Officer):</div>
                    <div class="officer-name">${incoming}</div>
                </div>
                <div style="font-size: 18px;">📥</div>
            </div>
        </div>

        <!-- إحصائيات ومؤشرات الأداء للوردية -->
        <div class="kpi-section-title">
            <span>📊 ملخص مؤشرات ونشاط وردية السلامة الميدانية:</span>
        </div>
        <div class="kpi-grid">
            <div class="kpi-box total">
                <div class="kpi-num">${escapeHtml(kpis.total || '0')}</div>
                <div class="kpi-text">إجمالي الملاحظات المرصودة</div>
            </div>
            <div class="kpi-box high">
                <div class="kpi-num">${escapeHtml(kpis.high || '0')}</div>
                <div class="kpi-text">أخطار حرجة / عالية ⚠️</div>
            </div>
            <div class="kpi-box closed">
                <div class="kpi-num">${escapeHtml(kpis.closed || '0')}</div>
                <div class="kpi-text">ملاحظات تم إغلاقها ✅</div>
            </div>
            <div class="kpi-box ptw">
                <div class="kpi-num">${escapeHtml(kpis.ptw || '0')}</div>
                <div class="kpi-text">تصاريح عمل نشطة (PTW) 📜</div>
            </div>
        </div>

        <!-- نشاط توعية بداية الوردية TBT إن وجد -->
        ${tbtHtml}

        <!-- التوجيهات وبنود المتابعة للوردية القادمة -->
        <div class="instructions-container">
            <div class="instructions-header">
                <span>📝 توجيهات وبنود المتابعة والمهام الميدانية للوردية القادمة:</span>
            </div>
            <div class="instructions-body">${escapeHtml(instructionsText)}</div>
        </div>

        <!-- اعتماد وإقرار التسليم والتسلم الرسمي -->
        <div class="signatures-grid">
            <div class="sig-card">
                <div class="sig-card-title">إقرار مسؤول السلامة المسلِّم</div>
                <div class="sig-card-name">${outgoing}</div>
                <div class="sig-line-area">التوقيع والتاريخ</div>
            </div>
            <div class="sig-card">
                <div class="sig-card-title">إقرار مسؤول السلامة المستلِم</div>
                <div class="sig-card-name">${incoming}</div>
                <div class="sig-line-area">التوقيع والتاريخ</div>
            </div>
            <div class="sig-card">
                <div class="sig-card-title">اعتماد الإدارة العامة للسلامة</div>
                <div class="sig-card-name">إدارة السلامة والصحة المهنية</div>
                <div class="sig-line-area">الختم والاعتماد الرقمي</div>
            </div>
        </div>

        <!-- شريط ضبط وتوثيق الوثيقة المعتمدة (ISO Document Control) -->
        <div class="iso-footer-strip">
            <span>كود الوثيقة: <strong>DOC-HSE-SHO-01</strong></span>
            <span>رقم الإصدار: <strong>Rev. 02</strong></span>
            <span>مرجعية التوثيق: <strong>ISO 45001:2018 (Clause 8.1 & 7.4)</strong></span>
            <span>نظام الجودة: <strong>ICAPP HSE MS</strong></span>
        </div>

        <!-- الفوتر الموحد لمنظومة السلامة -->
        <footer class="portal-unified-footer">
            <div><strong>الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</strong> • منظومة إدارة السلامة والصحة المهنية المتكاملة © 2026</div>
            <div>وثيقة رسمية معتمدة صادرة إلكترونياً من البوابة الرقمية للسلامة والصحة المهنية (ICAPP SafetyHub) • صالحة للتدقيق والمراجعة الداخلية</div>
        </footer>
    </div>

    ${autoPrint ? `<script>window.onload = function() { setTimeout(function() { window.print(); }, 350); };<\/script>` : ''}
</body>
</html>`;
        }

        function viewFullHistoryReport(id) {
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
            } catch (_) {}
            const item = history.find(h => h.id === id);
            if (!item) return;

            const win = window.open('', '_blank');
            if (!win) return;

            win.document.write(buildOfficialHandoverDocumentHtml(item, { autoPrint: false, isArchive: true }));
            win.document.close();
        }

        function printHistoryReport(id) {
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
            } catch (_) {}
            const item = history.find(h => h.id === id);
            if (!item) return;

            const html = buildOfficialHandoverDocumentHtml(item, { autoPrint: false, isArchive: true });
            const fileName = `محضر_تسليم_وردية_${(item.date || 'سجل').replace(/[/\\:]/g, '-')}.pdf`;
            if (window.Utils && typeof window.Utils.downloadHtmlAsPdf === 'function') {
                window.Utils.downloadHtmlAsPdf(html, fileName, { title: 'محضر تسليم واستلام وردية السلامة' });
                return;
            }

            const win = window.open('', '_blank');
            if (!win) return;

            win.document.write(buildOfficialHandoverDocumentHtml(item, { autoPrint: true, isArchive: true }));
            win.document.close();
        }

        function shareHistoryWhatsApp(id) {
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
            } catch (_) {}
            const item = history.find(h => h.id === id);
            if (!item) return;

            const text = item.fullSummaryText || item.instructions || '';
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }

        function deleteHistoryItem(id) {
            if (!confirm('هل أنت متأكد من حذف هذا المحضر من السجل المحلي؟')) return;
            let history = [];
            try {
                history = JSON.parse(localStorage.getItem('HSE_SHIFT_HANDOVERS_HISTORY') || '[]');
            } catch (_) {}
            history = history.filter(h => h.id !== id);
            localStorage.setItem('HSE_SHIFT_HANDOVERS_HISTORY', JSON.stringify(history));
            updateHistoryBadgeCount();
            renderHistoryList();
            showTemporaryToast('🗑️ تم حذف المحضر من السجل');
        }

        function showTemporaryToast(message) {
            let toast = document.getElementById('hoTemporaryToast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'hoTemporaryToast';
                toast.style.cssText = 'position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; z-index: 100000; box-shadow: 0 4px 14px rgba(0,0,0,0.3); pointer-events: none; transition: opacity 0.3s ease; opacity: 0; direction: rtl;';
                document.body.appendChild(toast);
            }
            toast.textContent = message;
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
            }, 2800);
        }

        // ==========================================================
        // Modal Open / Close & Refresh
        // ==========================================================
        function openHandoverModal() {
            const modal = createModalDom();
            populateOfficersDropdowns();
            refreshKpis();
            loadTbtSummaryForShift();
            checkPreHandoverOfflineState();
            updateHistoryBadgeCount();
            switchTab('current');

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

            let tbtLine = '';
            if (currentShiftTbtData && currentShiftTbtData.topic) {
                tbtLine = `\n📢 *توعية بداية الوردية (TBT):* ${currentShiftTbtData.topic} (العدد: ${currentShiftTbtData.attendees} | المدرب: ${currentShiftTbtData.trainer})`;
            }

            const text = 
`📋 *محضر تسليم واستلام وردية السلامة — ICAPP HSE*
🏢 *الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)*
إدارة السلامة والصحة المهنية والبيئة
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
• تصاريح عمل نشطة (PTW): ${ptw} 📜${tbtLine}
────────────────────────
📝 *توجيهات وبنود المتابعة للوردية القادمة:*
${instructions}
────────────────────────
✅ *معتمد طبقاً لمعايير إدارة السلامة والصحة المهنية ISO 45001:2018 & OSHA 1910*`;

            return text;
        }

        function shareViaWhatsApp() {
            saveHandoverToHistory(false);
            const text = generateHandoverText();
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }

        function printHandoverReport() {
            const savedRecord = saveHandoverToHistory(false);
            const date = document.getElementById('hoDate')?.value || new Date().toISOString().slice(0, 10);
            const shift = document.getElementById('hoShift')?.value || 'الوردية الصباحية';
            const site = document.getElementById('hoSite')?.value || 'مصانع ICAPP';
            const outgoing = document.getElementById('hoOutgoingOfficer')?.value.trim() || 'مسؤول السلامة';
            const incoming = document.getElementById('hoIncomingOfficer')?.value.trim() || 'مشرف الاستلام';
            const instructions = document.getElementById('hoInstructions')?.value.trim() || 'لا توجد توجيهات خاصة مسجلة.';

            const total = document.getElementById('hoKpiObsTotal')?.textContent || '0';
            const high = document.getElementById('hoKpiObsHigh')?.textContent || '0';
            const closed = document.getElementById('hoKpiObsClosed')?.textContent || '0';
            const ptw = document.getElementById('hoKpiPtwCount')?.textContent || '0';

            const currentData = {
                id: savedRecord?.id || ('HO_' + Date.now()),
                createdAt: savedRecord?.createdAt || new Date().toISOString(),
                date,
                shift,
                site,
                outgoing,
                incoming,
                instructions,
                kpis: { total, high, closed, ptw },
                tbtInfo: currentShiftTbtData || null
            };

            const html = buildOfficialHandoverDocumentHtml(currentData, { autoPrint: false, isArchive: false });
            const fileName = `محضر_تسليم_وردية_${(date || 'تقرير').replace(/[/\\:]/g, '-')}.pdf`;
            if (window.Utils && typeof window.Utils.downloadHtmlAsPdf === 'function') {
                window.Utils.downloadHtmlAsPdf(html, fileName, { title: 'محضر تسليم واستلام وردية السلامة' });
                return;
            }

            const win = window.open('', '_blank');
            if (!win) return;

            win.document.write(buildOfficialHandoverDocumentHtml(currentData, { autoPrint: true, isArchive: false }));
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
            printHandoverReport,
            triggerPreHandoverSync,
            loadTbtSummaryForShift,
            insertTbtToInstructions,
            switchTab,
            saveHandoverToHistory,
            renderHistoryList,
            copyInstructionsFromHistory,
            viewFullHistoryReport,
            printHistoryReport,
            shareHistoryWhatsApp,
            deleteHistoryItem,
            buildOfficialHandoverDocumentHtml
        };

        window.HseShiftHandover = api;
        window.HseHandover = api;

    } catch (err) {
        console.warn('[HSE Shift Handover] Module initialized safely with note:', err);
    }
})();
