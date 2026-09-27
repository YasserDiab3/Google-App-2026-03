/**
 * HSE My Active Tasks & Open Observations Module
 * وحدة متابعة وإغلاق مهام وملاحظات السلامة المفتوحة اليوم
 * v1.0 — 2026-09-27
 *
 * مصممة لتيسير العمل الميداني لفنيي ومراقبي السلامة:
 * 1. حصر سريع للملاحظات المفتوحة التي رصدها الفني في جولته الميدانية.
 * 2. تكامل مباشر بنقرة واحدة مع نافذة التوثيق بالصور "قبل وبعد" (HseActionClosure).
 * 3. العمل بسلاسة أوفلاين مع التخزين المحلي والتحليلات المتزامنة.
 */
(() => {
    'use strict';

    if (typeof window === 'undefined') return;
    if (window.HseMyTasksInitialized) return;
    window.HseMyTasksInitialized = true;

    try {
        let tasksModalEl = null;
        let currentFilter = 'mine'; // 'mine' | 'all' | 'closed'
        let currentSearchQuery = '';

        function getLoggedInUser() {
            try {
                const sessionStr = sessionStorage.getItem('HSE_FIELD_SESSION') || localStorage.getItem('HSE_LAST_USER_NAME');
                if (sessionStr) {
                    let parsed = null;
                    try { parsed = JSON.parse(sessionStr); } catch (_) {}
                    return (parsed && (parsed.userName || parsed.name)) || (typeof sessionStr === 'string' && !sessionStr.startsWith('{') ? sessionStr : '');
                }
            } catch (_) {}
            return '';
        }

        function getAllTasks() {
            const tasksMap = new Map();

            // 1. القراءة من التخزين المحلي للملاحظات على هذا الجهاز
            try {
                const localHistStr = localStorage.getItem('HSE_PUBLIC_OBS_LOCAL_HISTORY');
                if (localHistStr) {
                    const list = JSON.parse(localHistStr);
                    if (Array.isArray(list)) {
                        list.forEach(item => {
                            const ref = item.refCode || (item.data && item.data.instantRefCode) || item.id;
                            if (!ref) return;

                            const data = item.data || item;
                            const isClosed = !!(item.status && (item.status.includes('Closed') || item.status.includes('مغلق')));
                            const site = data.site || data.siteName || 'مصنع ICAPP';
                            const place = data.place || data.locationName || 'الموقع الميداني';
                            const risk = data.riskLevel || data.risk || 'متوسط';
                            const details = data.details || data.description || '';
                            const observer = data.observerName || item.observerName || getLoggedInUser() || 'فني السلامة';

                            tasksMap.set(ref.toUpperCase(), {
                                id: ref,
                                refCode: ref,
                                timestamp: item.timestamp || Date.now(),
                                site,
                                place,
                                riskLevel: risk,
                                details,
                                observerName: observer,
                                isClosed,
                                isMine: true,
                                source: 'local',
                                raw: data
                            });
                        });
                    }
                }
            } catch (err) {
                console.warn('[HseMyTasks] Error reading local history:', err);
            }

            // 2. القراءة من التحليلات المخزنة بالسيرفر / الذاكرة الحية (الملاحظات المفتوحة الحرجة)
            try {
                const critical = (window.rawObservationsAnalyticsData && window.rawObservationsAnalyticsData.criticalOpen) || [];
                const currentUser = getLoggedInUser().trim().toLowerCase();

                critical.forEach(obs => {
                    const ref = obs.isoCode || obs.id || obs.refCode;
                    if (!ref) return;
                    const cleanRef = String(ref).toUpperCase().trim();

                    const obsObserver = String(obs.observerName || '').trim();
                    const isClosed = obs.status === 'Closed' || obs.status === 'مغلق' || String(obs.status).includes('مغلق');
                    const isMine = currentUser && obsObserver.toLowerCase().includes(currentUser);

                    if (!tasksMap.has(cleanRef)) {
                        tasksMap.set(cleanRef, {
                            id: cleanRef,
                            refCode: cleanRef,
                            timestamp: obs.date ? new Date(obs.date).getTime() : Date.now(),
                            site: obs.site || obs.siteName || 'مصنع ICAPP',
                            place: obs.place || obs.locationName || 'الموقع العام',
                            riskLevel: obs.riskLevel || 'متوسط',
                            details: obs.details || '',
                            observerName: obsObserver || 'مشرف السلامة',
                            isClosed,
                            isMine: !!isMine,
                            source: 'server',
                            raw: obs
                        });
                    } else {
                        // تحديث الحالة إذا كانت مغلقة بالسيرفر
                        const existing = tasksMap.get(cleanRef);
                        if (isClosed && !existing.isClosed) {
                            existing.isClosed = true;
                        }
                    }
                });
            } catch (err) {
                console.warn('[HseMyTasks] Error reading analytics open:', err);
            }

            return Array.from(tasksMap.values()).sort((a, b) => b.timestamp - a.timestamp);
        }

        function updateBadgeCount() {
            const all = getAllTasks();
            const openMine = all.filter(t => !t.isClosed && t.isMine).length;
            const openTotal = all.filter(t => !t.isClosed).length;

            const badgeEls = document.querySelectorAll('#badgeMyTasksCount, .badge-my-tasks');
            badgeEls.forEach(badge => {
                if (openMine > 0) {
                    badge.textContent = openMine;
                    badge.style.display = 'inline-flex';
                    badge.style.background = '#ef4444';
                    badge.title = `${openMine} ملاحظة مفتوحة مسجلة على هذا الجهاز`;
                } else if (openTotal > 0) {
                    badge.textContent = openTotal;
                    badge.style.display = 'inline-flex';
                    badge.style.background = '#f59e0b';
                    badge.title = `${openTotal} ملاحظة مفتوحة في الوردية`;
                } else {
                    badge.style.display = 'none';
                }
            });
        }

        function createModalDom() {
            if (document.getElementById('hseMyTasksModal')) {
                return document.getElementById('hseMyTasksModal');
            }

            const modal = document.createElement('div');
            modal.id = 'hseMyTasksModal';
            modal.className = 'emergency-modal-overlay';
            modal.style.display = 'none';

            modal.innerHTML = `
                <div class="emergency-modal-dialog" style="max-width: 680px; animation: fadeInModal 0.25s ease;" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #ffffff; padding: 16px 20px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.15rem;">
                                <i class="fas fa-list-check"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800;">لوحة مهامي وملاحظاتي الميدانية</h3>
                                <p style="margin: 2px 0 0; font-size: 0.75rem; opacity: 0.9;">متابعة ومعالجة الملاحظات المفتوحة وإغلاقها بصور الإثبات (ISO 45001)</p>
                            </div>
                        </div>
                        <button type="button" class="emergency-modal-close-btn" id="btnCloseMyTasksModal" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px; color: #ffffff; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.2); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; padding: 0; outline: none; transition: background 0.2s ease;" title="إغلاق">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 18px 20px; max-height: 75vh; overflow-y: auto; text-align: right; direction: rtl;">
                        <!-- KPI Badges Strip -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; text-align: center;">
                            <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 10px; padding: 10px;">
                                <div style="font-size: 1.25rem; font-weight: 900; color: #1e40af;" id="myTasksKpiTotal">0</div>
                                <div style="font-size: 0.72rem; color: #1e3a8a; font-weight: 700;">إجمالي المسجل اليوم</div>
                            </div>
                            <div style="background: #fef2f2; border: 1.5px solid #fecaca; border-radius: 10px; padding: 10px;">
                                <div style="font-size: 1.25rem; font-weight: 900; color: #dc2626;" id="myTasksKpiOpen">0</div>
                                <div style="font-size: 0.72rem; color: #991b1b; font-weight: 700;">مفتوحة قيد الإصلاح ⏳</div>
                            </div>
                            <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 10px; padding: 10px;">
                                <div style="font-size: 1.25rem; font-weight: 900; color: #166534;" id="myTasksKpiClosed">0</div>
                                <div style="font-size: 0.72rem; color: #14532d; font-weight: 700;">تم إغلاقها بنجاح ✅</div>
                            </div>
                        </div>

                        <!-- Filter Tabs & Search -->
                        <div style="margin-bottom: 14px; display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: flex; gap: 6px; background: #f1f5f9; padding: 4px; border-radius: 10px;">
                                <button type="button" class="my-tasks-tab-btn active" data-tab="mine" onclick="HseMyTasks.setFilter('mine')"
                                        style="flex: 1; padding: 8px 12px; border: none; border-radius: 8px; font-weight: 800; font-size: 0.8rem; cursor: pointer; background: #ffffff; color: #0284c7; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
                                    ملاحظاتي المسجلة
                                </button>
                                <button type="button" class="my-tasks-tab-btn" data-tab="all" onclick="HseMyTasks.setFilter('all')"
                                        style="flex: 1; padding: 8px 12px; border: none; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; background: transparent; color: #64748b;">
                                    كافة ملاحظات الوردية
                                </button>
                                <button type="button" class="my-tasks-tab-btn" data-tab="closed" onclick="HseMyTasks.setFilter('closed')"
                                        style="flex: 1; padding: 8px 12px; border: none; border-radius: 8px; font-weight: 700; font-size: 0.8rem; cursor: pointer; background: transparent; color: #64748b;">
                                    المغلقة حديثاً ✅
                                </button>
                            </div>

                            <div style="position: relative;">
                                <i class="fas fa-magnifying-glass" style="position: absolute; right: 12px; top: 12px; color: #94a3b8; font-size: 0.85rem;"></i>
                                <input type="text" id="myTasksSearchInput" placeholder="بحث باسم الموقع، العنبر، أو كود الملاحظة..."
                                       oninput="HseMyTasks.handleSearch(this.value)"
                                       style="width: 100%; padding: 9px 36px 9px 12px; border: 1.5px solid #cbd5e1; border-radius: 10px; font-size: 0.82rem; outline: none; box-sizing: border-box;" />
                            </div>
                        </div>

                        <!-- Cards Container -->
                        <div id="myTasksListContainer" style="display: flex; flex-direction: column; gap: 10px;">
                            <!-- Rendered dynamically -->
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            tasksModalEl = modal;

            // Events
            modal.onclick = (e) => {
                if (e.target === modal) closeTasksModal();
            };
            const closeBtn = modal.querySelector('#btnCloseMyTasksModal');
            if (closeBtn) closeBtn.onclick = closeTasksModal;

            return modal;
        }

        function renderTasksList() {
            const container = document.getElementById('myTasksListContainer');
            if (!container) return;

            const allTasks = getAllTasks();
            const total = allTasks.length;
            const openCount = allTasks.filter(t => !t.isClosed).length;
            const closedCount = allTasks.filter(t => t.isClosed).length;

            // Update modal KPI strip
            const elTotal = document.getElementById('myTasksKpiTotal');
            const elOpen = document.getElementById('myTasksKpiOpen');
            const elClosed = document.getElementById('myTasksKpiClosed');
            if (elTotal) elTotal.textContent = total;
            if (elOpen) elOpen.textContent = openCount;
            if (elClosed) elClosed.textContent = closedCount;

            // Filter
            let filtered = allTasks;
            if (currentFilter === 'mine') {
                filtered = allTasks.filter(t => !t.isClosed && t.isMine);
                // إذا لم توجد ملاحظات محلية مفتوحة، اعرض كافة المفتوحة تيسيراً عليه
                if (filtered.length === 0 && openCount > 0) {
                    filtered = allTasks.filter(t => !t.isClosed);
                }
            } else if (currentFilter === 'all') {
                filtered = allTasks.filter(t => !t.isClosed);
            } else if (currentFilter === 'closed') {
                filtered = allTasks.filter(t => t.isClosed);
            }

            // Search filter
            if (currentSearchQuery) {
                const q = currentSearchQuery.toLowerCase();
                filtered = filtered.filter(t =>
                    t.refCode.toLowerCase().includes(q) ||
                    t.site.toLowerCase().includes(q) ||
                    t.place.toLowerCase().includes(q) ||
                    t.details.toLowerCase().includes(q)
                );
            }

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 28px 16px; text-align: center; color: #64748b;">
                        <i class="fas fa-clipboard-check fa-3x" style="color: #10b981; margin-bottom: 10px;"></i>
                        <div style="font-weight: 800; font-size: 0.95rem; color: #1e293b; margin-bottom: 4px;">
                            ${currentFilter === 'closed' ? 'لا توجد ملاحظات مغلقة مسجلة اليوم.' : 'ممتاز! لا توجد ملاحظات مفتوحة معلقة.'}
                        </div>
                        <div style="font-size: 0.78rem; color: #64748b;">
                            ${currentFilter === 'closed' ? 'أي ملاحظة تقوم بإغلاقها ستظهر هنا مع إثبات المطابقة.' : 'جميع الملاحظات المرصودة تمت معالجتها وإغلاقها ميدانياً طبقاً للمعايير.'}
                        </div>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(task => {
                const isClosed = task.isClosed;
                const risk = task.riskLevel || 'متوسط';
                let riskBadge = '<span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:12px; font-weight:800; font-size:0.72rem;">🟡 متوسط</span>';
                if (risk.includes('عالي') || risk.includes('high')) {
                    riskBadge = '<span style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:12px; font-weight:800; font-size:0.72rem;">🔴 عالي الخطورة</span>';
                } else if (risk.includes('منخفض') || risk.includes('low')) {
                    riskBadge = '<span style="background:#f0fdf4; color:#15803d; padding:2px 8px; border-radius:12px; font-weight:800; font-size:0.72rem;">🟢 منخفض</span>';
                }

                const timeStr = new Date(task.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

                return `
                    <div style="background: #ffffff; border: 1.5px solid ${isClosed ? '#bbf7d0' : '#e2e8f0'}; border-radius: 12px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.15s ease;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 0.95rem; font-weight: 900; color: #0284c7;">${escapeHtml(task.refCode)}</span>
                                ${riskBadge}
                                ${task.isMine ? '<span style="background:#e0e7ff; color:#3730a3; padding:1px 6px; border-radius:6px; font-size:0.68rem; font-weight:700;">ملاحظتي</span>' : ''}
                            </div>
                            <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 600;">🕒 ${timeStr}</span>
                        </div>

                        <div style="font-size: 0.8rem; font-weight: 800; color: #334155; margin-bottom: 4px;">
                            📍 ${escapeHtml(task.site)} — ${escapeHtml(task.place)}
                        </div>

                        ${task.details ? `
                        <div style="font-size: 0.78rem; color: #64748b; line-height: 1.4; margin-bottom: 10px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border-right: 3px solid #0284c7;">
                            ${escapeHtml(task.details)}
                        </div>` : ''}

                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px dashed #e2e8f0; flex-wrap: wrap; gap: 8px;">
                            <span style="font-size: 0.72rem; color: #64748b;">
                                <i class="fas fa-user-shield"></i> الراصد: <b>${escapeHtml(task.observerName)}</b>
                            </span>

                            ${!isClosed ? `
                            <button type="button" onclick="HseMyTasks.triggerClosure('${task.id}')"
                                    style="background: linear-gradient(135deg, #059669, #047857); color: #ffffff; border: none; padding: 7px 14px; border-radius: 8px; font-weight: 800; font-size: 0.78rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(5,150,105,0.2);">
                                <i class="fas fa-camera"></i>
                                <span>إغلاق ومعالجة الآن 🔒</span>
                            </button>` : `
                            <span style="background: #f0fdf4; color: #166534; padding: 4px 10px; border-radius: 20px; font-size: 0.74rem; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
                                <i class="fas fa-check-circle"></i> تم التحقق والإغلاق
                            </span>`}
                        </div>
                    </div>
                `;
            }).join('');
        }

        function setFilter(filter) {
            currentFilter = filter;
            if (tasksModalEl) {
                const btns = tasksModalEl.querySelectorAll('.my-tasks-tab-btn');
                btns.forEach(btn => {
                    const tab = btn.getAttribute('data-tab');
                    if (tab === filter) {
                        btn.style.background = '#ffffff';
                        btn.style.color = '#0284c7';
                        btn.style.fontWeight = '800';
                        btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                    } else {
                        btn.style.background = 'transparent';
                        btn.style.color = '#64748b';
                        btn.style.fontWeight = '700';
                        btn.style.boxShadow = 'none';
                    }
                });
            }
            renderTasksList();
        }

        function handleSearch(val) {
            currentSearchQuery = String(val || '').trim();
            renderTasksList();
        }

        function openTasksModal() {
            const modal = createModalDom();
            currentSearchQuery = '';
            const searchInput = modal.querySelector('#myTasksSearchInput');
            if (searchInput) searchInput.value = '';

            renderTasksList();
            updateBadgeCount();

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeTasksModal() {
            if (tasksModalEl) {
                tasksModalEl.style.display = 'none';
                document.body.style.overflow = '';
            }
        }

        function triggerClosure(taskId) {
            const allTasks = getAllTasks();
            const found = allTasks.find(t => t.id === taskId || t.refCode === taskId);
            if (found && window.HseActionClosure && typeof window.HseActionClosure.open === 'function') {
                closeTasksModal();
                window.HseActionClosure.open(taskId, found.raw);
            } else if (window.HseActionClosure) {
                closeTasksModal();
                window.HseActionClosure.open(taskId);
            } else {
                alert(`كود الملاحظة: ${taskId}`);
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

        // Initialize on DOM load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', updateBadgeCount);
        } else {
            setTimeout(updateBadgeCount, 500);
        }

        // Public API
        const api = {
            open: openTasksModal,
            close: closeTasksModal,
            setFilter,
            handleSearch,
            refresh: () => {
                updateBadgeCount();
                if (tasksModalEl && tasksModalEl.style.display === 'flex') {
                    renderTasksList();
                }
            },
            triggerClosure,
            updateBadgeCount
        };

        window.HseMyTasks = api;
        window.HseTasks = api;

    } catch (err) {
        console.warn('[HSE My Tasks] Initialized safely with note:', err);
    }
})();
