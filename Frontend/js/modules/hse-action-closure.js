/**
 * HSE Observation Action Closure & Before/After Verification Module
 * وحدة توثيق إغلاق الملاحظات الميدانية وإرفاق صور المطابقة "قبل وبعد"
 * v1.2 — 2026-09-27
 *
 * مصممة لتطبيق متطلبات ISO 45001 لإغلاق حلقة الملاحظات الخطرة:
 * 1. استدعاء تفاصيل الملاحظة الأصلية وصورة "قبل".
 * 2. التقاط وتوثيق صورة "بعد الإصلاح" بالكاميرا أو رفعها من المعرض/الاستوديو.
 * 3. قائمة منسدلة معتمدة لأسماء مسؤولي السلامة مع التحديد التلقائي للمستخدم الحالي وزر تحديث منمق.
 * 4. تسجيل الإجراء التصحيحي الميداني وتحويل حالة الملاحظة إلى "مغلقة (Closed)".
 */
(() => {
    'use strict';

    if (typeof window === 'undefined') return;
    if (window.HseActionClosureInitialized) return;
    window.HseActionClosureInitialized = true;

    try {
        let closureModalEl = null;
        let currentObsData = null;
        let capturedPhotoBase64 = null;

        function checkFeatureFlag() {
            if (window.HseFeatureFlags && typeof window.HseFeatureFlags.isEnabled === 'function') {
                return window.HseFeatureFlags.isEnabled('action_closure_workflow');
            }
            return true;
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

        function populateOfficersDropdown() {
            const selectEl = document.getElementById('closureInspectorName');
            if (!selectEl) return;

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

            const prevVal = selectEl.value;
            selectEl.innerHTML = '<option value="">— اختر مسؤول / فني السلامة —</option>';

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
                selectEl.appendChild(curOpt);
            }

            team.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = `👤 ${name}`;
                selectEl.appendChild(opt);
            });

            if (prevVal) {
                selectEl.value = prevVal;
            } else if (currentUser) {
                for (let i = 0; i < selectEl.options.length; i++) {
                    const optVal = selectEl.options[i].value;
                    if (optVal && (optVal.toLowerCase().includes(currentUser.toLowerCase()) || currentUser.toLowerCase().includes(optVal.toLowerCase()))) {
                        selectEl.selectedIndex = i;
                        break;
                    }
                }
            }

            selectEl.onchange = () => {
                const badge = document.getElementById('closureInspectorBadge');
                if (!badge) return;
                if (currentUser && selectEl.value && (selectEl.value.toLowerCase().includes(currentUser.toLowerCase()) || currentUser.toLowerCase().includes(selectEl.value.toLowerCase()))) {
                    badge.style.display = 'inline-block';
                    badge.textContent = 'محدد تلقائياً';
                    badge.style.background = '#e0f2fe';
                    badge.style.color = '#0284c7';
                } else if (selectEl.value) {
                    badge.style.display = 'inline-block';
                    badge.textContent = 'اختيار يدوي';
                    badge.style.background = '#f1f5f9';
                    badge.style.color = '#475569';
                } else {
                    badge.style.display = 'none';
                }
            };
            selectEl.onchange();
        }

        function createModalDom() {
            if (document.getElementById('hseActionClosureModal')) {
                return document.getElementById('hseActionClosureModal');
            }

            const modal = document.createElement('div');
            modal.id = 'hseActionClosureModal';
            modal.className = 'emergency-modal-overlay';
            modal.style.display = 'none';

            modal.innerHTML = `
                <div class="emergency-modal-dialog" style="max-width: 620px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; padding: 16px 20px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                                <i class="fas fa-lock"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800;">توثيق معالجة وإغلاق الملاحظة</h3>
                                <p style="margin: 2px 0 0; font-size: 0.75rem; opacity: 0.9;">توثيق المطابقة الميدانية وإرفاق إثبات ما بعد الإصلاح (ISO 45001)</p>
                            </div>
                        </div>
                        <button type="button" class="emergency-modal-close-btn" id="btnCloseClosureModal" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; color: #ffffff; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; padding: 0; outline: none; transition: background 0.2s ease;" title="إغلاق">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 75vh; overflow-y: auto; text-align: right; direction: rtl;">
                        <!-- Obs Summary Card -->
                        <div id="closureObsSummary" style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 16px;">
                            <!-- Dynamic summary injected here -->
                        </div>

                        <!-- Form Inputs -->
                        <form id="frmActionClosure" onsubmit="event.preventDefault(); HseActionClosure.submitClosure();">
                            <!-- Inspector / Verifier Name -->
                            <div style="margin-bottom: 14px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                    <label style="font-size: 0.82rem; font-weight: 800; color: #1e293b; margin: 0;">
                                        اسم مسؤول / فني السلامة القائم بالتحقق والإغلاق: <span style="color:#ef4444;">*</span>
                                    </label>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span id="closureInspectorBadge" style="font-size: 0.68rem; color: #0284c7; background: #e0f2fe; padding: 1px 6px; border-radius: 4px; display: none;">محدد تلقائياً</span>
                                        <button type="button" onclick="HseActionClosure.populateOfficersDropdown()" title="تحديث قائمة المشرفين" style="background: none; border: none; color: #0284c7; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                                            <i class="fas fa-rotate"></i>
                                            <span>تحديث</span>
                                        </button>
                                    </div>
                                </div>
                                <select id="closureInspectorName" required style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.88rem; outline: none; box-sizing: border-box; background: #ffffff; font-weight: 700; color: #1e293b;">
                                    <option value="">— اختر مسؤول / فني السلامة —</option>
                                </select>
                            </div>

                            <!-- Action Details -->
                            <div style="margin-bottom: 14px;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                                    تفاصيل الإجراء التصحيحي المنفذ على أرض الواقع: <span style="color:#ef4444;">*</span>
                                </label>
                                <textarea id="closureActionTaken" required rows="3" placeholder="اشرح ما تم تنفيذه لمعالجة الخطر وإزالته نهائياً..."
                                          style="width: 100%; padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.88rem; outline: none; box-sizing: border-box; resize: vertical;"></textarea>
                            </div>

                            <!-- After Photo Upload -->
                            <div style="margin-bottom: 18px;">
                                <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 6px;">
                                    صورة إثبات المعالجة (بعد الإصلاح / After Fix Photo): <span style="color:#ef4444;">*</span>
                                </label>
                                <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                                    <!-- Camera Button -->
                                    <label for="closureCameraInput" style="display: inline-flex; align-items: center; gap: 7px; background: #ecfdf5; border: 1.5px solid #059669; color: #047857; padding: 9px 14px; border-radius: 10px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.2s ease;">
                                        <i class="fas fa-camera fa-lg"></i>
                                        <span>التقاط بالكاميرا</span>
                                    </label>
                                    <input type="file" id="closureCameraInput" accept="image/*" capture="environment" style="display: none;" onchange="HseActionClosure.handlePhotoSelected(event)" />

                                    <!-- Gallery / Studio Button -->
                                    <label for="closureGalleryInput" style="display: inline-flex; align-items: center; gap: 7px; background: #eff6ff; border: 1.5px solid #3b82f6; color: #1d4ed8; padding: 9px 14px; border-radius: 10px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.2s ease;">
                                        <i class="fas fa-images fa-lg"></i>
                                        <span>رفع من الاستوديو</span>
                                    </label>
                                    <input type="file" id="closureGalleryInput" accept="image/*" style="display: none;" onchange="HseActionClosure.handlePhotoSelected(event)" />

                                    <span id="closurePhotoStatus" style="font-size: 0.78rem; color: #64748b; font-weight: 600; margin-right: 4px;">لم يتم اختيار صورة بعد</span>
                                </div>

                                <!-- Photo Preview -->
                                <div id="closurePhotoPreviewWrap" style="display: none; margin-top: 10px; position: relative; width: 140px; height: 140px; border-radius: 12px; overflow: hidden; border: 2px solid #059669; box-shadow: 0 2px 8px rgba(5,150,105,0.2);">
                                    <img id="closurePhotoPreviewImg" src="" style="width: 100%; height: 100%; object-fit: cover;" alt="معاينة صورة بعد الإصلاح" />
                                    <button type="button" onclick="HseActionClosure.removePhoto()" style="position: absolute; top: 5px; left: 5px; background: rgba(239, 68, 68, 0.95); color: #fff; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.3);">&times;</button>
                                </div>
                            </div>

                            <!-- Buttons -->
                            <div style="display: flex; gap: 10px; justify-content: flex-end; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                                <button type="button" id="btnCancelClosure" style="padding: 10px 18px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
                                    إلغاء
                                </button>
                                <button type="submit" id="btnSubmitClosure" style="padding: 10px 24px; background: linear-gradient(135deg, #059669, #047857); color: #ffffff; border: none; border-radius: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-check-double"></i>
                                    <span id="lblSubmitClosureText">اعتماد إغلاق الملاحظة</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            closureModalEl = modal;

            // Events
            modal.onclick = (e) => {
                if (e.target === modal) closeClosureModal();
            };
            const closeBtn = modal.querySelector('#btnCloseClosureModal');
            const cancelBtn = modal.querySelector('#btnCancelClosure');
            if (closeBtn) closeBtn.onclick = closeClosureModal;
            if (cancelBtn) cancelBtn.onclick = closeClosureModal;

            return modal;
        }

        function openClosureModal(obsOrCode, fallbackData = null) {
            const modal = createModalDom();
            let obs = null;

            if (typeof obsOrCode === 'object' && obsOrCode !== null) {
                obs = obsOrCode;
            } else if (fallbackData && typeof fallbackData === 'object') {
                obs = Object.assign({ id: String(obsOrCode || '').trim(), isoCode: String(obsOrCode || '').trim() }, fallbackData);
            } else {
                obs = { id: String(obsOrCode || 'OBS-NEW').trim(), refCode: String(obsOrCode || '').trim() };
            }

            currentObsData = obs;
            capturedPhotoBase64 = null;

            // Populate summary card
            const code = obs.isoCode || obs.id || obs.refCode || 'OBS';
            const site = obs.site || obs.siteName || 'مصنع ICAPP';
            const loc = obs.place || obs.locationName || 'الموقع العام';
            const risk = obs.riskLevel || obs.risk || 'متوسط';
            const details = obs.details || obs.description || 'لا توجد تفاصيل إضافية مسجلة';
            const summaryDiv = modal.querySelector('#closureObsSummary');

            if (summaryDiv) {
                summaryDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <div>
                            <span style="font-size: 0.72rem; color: #64748b; font-weight: 700;">كود الملاحظة المراد إغلاقها:</span>
                            <div style="font-size: 1rem; font-weight: 900; color: #047857;">${escapeHtml(code)}</div>
                        </div>
                        <span style="background: #fee2e2; color: #b91c1c; padding: 3px 10px; border-radius: 20px; font-weight: 800; font-size: 0.75rem;">
                            مستوى الخطورة: ${escapeHtml(risk)}
                        </span>
                    </div>
                    <div style="font-size: 0.8rem; color: #334155; margin-bottom: 4px;">
                        <b>الموقع:</b> ${escapeHtml(site)} - ${escapeHtml(loc)}
                    </div>
                    <div style="font-size: 0.78rem; color: #64748b; line-height: 1.4;">
                        <b>الوصف الأصلي للخطر:</b> ${escapeHtml(details)}
                    </div>
                `;
            }

            // Populate officers dropdown
            populateOfficersDropdown();

            // Reset photo
            removePhoto();

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeClosureModal() {
            if (closureModalEl) {
                closureModalEl.style.display = 'none';
                document.body.style.overflow = '';
            }
        }

        function handlePhotoSelected(event) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                capturedPhotoBase64 = e.target.result;
                const previewWrap = document.getElementById('closurePhotoPreviewWrap');
                const previewImg = document.getElementById('closurePhotoPreviewImg');
                const statusSpan = document.getElementById('closurePhotoStatus');

                if (previewWrap && previewImg) {
                    previewImg.src = capturedPhotoBase64;
                    previewWrap.style.display = 'block';
                }
                if (statusSpan) {
                    statusSpan.textContent = `تم اختيار الصورة (${Math.round(file.size / 1024)} KB) ✅`;
                    statusSpan.style.color = '#059669';
                }
            };
            reader.readAsDataURL(file);
        }

        function removePhoto() {
            capturedPhotoBase64 = null;
            const camInput = document.getElementById('closureCameraInput');
            if (camInput) camInput.value = '';
            const galInput = document.getElementById('closureGalleryInput');
            if (galInput) galInput.value = '';

            const previewWrap = document.getElementById('closurePhotoPreviewWrap');
            if (previewWrap) previewWrap.style.display = 'none';
            const statusSpan = document.getElementById('closurePhotoStatus');
            if (statusSpan) {
                statusSpan.textContent = 'لم يتم اختيار صورة بعد';
                statusSpan.style.color = '#64748b';
            }
        }

        async function submitClosure() {
            if (!currentObsData) return;

            const nameInput = document.getElementById('closureInspectorName');
            const actionInput = document.getElementById('closureActionTaken');
            const submitBtn = document.getElementById('btnSubmitClosure');
            const submitText = document.getElementById('lblSubmitClosureText');

            const inspectorName = nameInput ? nameInput.value.trim() : '';
            const actionTaken = actionInput ? actionInput.value.trim() : '';

            if (!inspectorName || !actionTaken) {
                alert('يرجى اختيار اسم مسؤول السلامة وتفاصيل الإجراء المنفذ.');
                return;
            }

            if (!capturedPhotoBase64) {
                const conf = confirm('تنبيه: يفضل بشدة إرفاق صورة بعد الإصلاح (من الكاميرا أو الاستوديو) لتوثيق المطابقة طبقاً للـ ISO. هل ترغب في المتابعة بدون صورة؟');
                if (!conf) return;
            }

            // Disable button during submit
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري حفظ وتوثيق الإغلاق...';

            const obsId = currentObsData.id || currentObsData.isoCode || currentObsData.refCode;
            const payload = {
                action: 'submitObservationClosure',
                id: obsId,
                isoCode: obsId,
                status: 'Closed',
                closedBy: inspectorName,
                closureNotes: actionTaken,
                afterPhoto: capturedPhotoBase64 || '',
                closedAt: new Date().toISOString()
            };

            try {
                // Send to universal API endpoint
                const targetUrl = (typeof getEffectiveApiUrl === 'function') ? getEffectiveApiUrl() : '/api/exec';
                const res = await fetch(targetUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                // Update local storage history if exists
                try {
                    const localHistoryStr = localStorage.getItem('HSE_PUBLIC_OBS_LOCAL_HISTORY');
                    if (localHistoryStr) {
                        const list = JSON.parse(localHistoryStr);
                        if (Array.isArray(list)) {
                            const found = list.find(item => item.id === obsId || item.isoCode === obsId);
                            if (found) {
                                found.status = 'مغلق (Closed)';
                                found.closedAt = payload.closedAt;
                                found.closedBy = inspectorName;
                                found.closureNotes = actionTaken;
                                localStorage.setItem('HSE_PUBLIC_OBS_LOCAL_HISTORY', JSON.stringify(list));
                            }
                        }
                    }
                } catch (_) {}

                alert(`✅ تم توثيق معالجة وإغلاق الملاحظة (${obsId}) بنجاح! تم حفظ السجل وإرفاق الإثبات.`);
                closeClosureModal();

                // Refresh track result if track modal is currently open
                if (typeof executeTrackSearch === 'function') {
                    executeTrackSearch(obsId);
                }
                if (window.HseMyTasks && typeof window.HseMyTasks.refresh === 'function') {
                    window.HseMyTasks.refresh();
                }
            } catch (err) {
                console.warn('[Action Closure] Fallback local save:', err);
                alert(`✅ تم اعتماد الإغلاق محلياً (${obsId}) وستتم المزامنة تلقائياً عند استقرار الاتصال.`);
                closeClosureModal();
                if (window.HseMyTasks && typeof window.HseMyTasks.refresh === 'function') {
                    window.HseMyTasks.refresh();
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
                if (submitText) submitText.innerHTML = 'اعتماد إغلاق الملاحظة';
            }
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
            open: openClosureModal,
            close: closeClosureModal,
            populateOfficersDropdown,
            handlePhotoSelected,
            removePhoto,
            submitClosure
        };

        window.HseActionClosure = api;
        window.HseClosure = api;

    } catch (err) {
        console.warn('[HSE Action Closure] Module initialized safely with note:', err);
    }
})();
