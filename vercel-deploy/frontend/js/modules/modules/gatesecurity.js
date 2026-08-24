/**
 * ==============================================================================
 * Gate Security & Visitors Management Module (Admin & HSE Portal)
 * الشركة العالمية للانتاج والتصنيع الزراعي (ICAPP)
 * إدارة الأمن الصناعي وتتبع الزوار والمقاولين بالبوابات
 * ==============================================================================
 */

class GateSecurityModule {
    constructor() {
        this.visitors = [];
        this.filteredVisitors = [];
        this.filterSite = 'all';
        this.filterStatus = 'all';
        this.searchQuery = '';
        this.autoRefreshTimer = null;
        this.init();
    }

    init() {
        window.GateSecurity = this;
        document.addEventListener('DOMContentLoaded', () => {
            this.checkAndApplyVisibility();
        });
    }

    checkAndApplyVisibility() {
        const isAdmin = this.isAdmin();
        const navItem = document.querySelector('a[data-section="gate-security"]');
        if (navItem) {
            navItem.style.display = isAdmin ? 'flex' : 'none';
        }
        const section = document.getElementById('gate-security-section');
        if (section && !isAdmin) {
            section.style.display = 'none';
        }
    }

    isAdmin() {
        try {
            if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function') {
                if (Permissions.isCurrentUserAdmin()) return true;
            }
            if (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function') {
                if (Permissions.isCurrentUserEffectiveAdmin()) return true;
            }
            const role = AppState?.currentUser?.role;
            return role === 'admin' || role === 'hse_manager' || role === 'general_manager' || role === 'security_admin';
        } catch(e) {
            return false;
        }
    }

    render() {
        const container = document.getElementById('gate-security-section');
        if (!container) return;

        if (!this.isAdmin()) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <i class="fas fa-lock text-rose-500" style="font-size: 3rem; margin-bottom: 12px; display:block;"></i>
                    <h3 style="font-size: 1.2rem; font-weight:800;">هذا الموديول مخصص لمدير النظام وإدارة السلامة والأمن فقط</h3>
                </div>
            `;
            return;
        }

        const portalUrl = this.getGatePortalUrl();

        container.innerHTML = `
            <div class="module-header" style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <h2 style="font-size: 1.4rem; font-weight: 900; color: var(--text-primary); display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-shield-halved text-blue-600"></i>
                            <span>منظومة أمن البوابات وسجل الزوار والمقاولين</span>
                            <span style="font-size: 0.72rem; background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px; font-weight: 800;">مدير النظام</span>
                        </h2>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">
                            إدارة روابط أفراد الأمن عند البوابات، رصد المتواجدين حالياً، وكشوف الطوارئ والإخلاء المعتمدة (ISO 45001).
                        </p>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button type="button" class="btn btn-outline-primary" onclick="GateSecurity.refreshData()" style="font-weight: 700;">
                            <i class="fas fa-rotate"></i> تحديث السجل
                        </button>
                        <button type="button" class="btn btn-primary" onclick="GateSecurity.printEmergencyMusterList()" style="font-weight: 700; background: #dc2626; border-color: #dc2626;">
                            <i class="fas fa-print"></i> طباعة كشف حصر الإخلاء
                        </button>
                    </div>
                </div>
            </div>

            <!-- بطاقة رابط تسجيل أمن البوابات المباشر -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: #ffffff; border-radius: 14px; padding: 18px 22px; margin-bottom: 24px; box-shadow: 0 10px 25px -5px rgba(30, 58, 138, 0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                    <div style="max-width: 650px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span style="background: #3b82f6; color: #fff; font-size: 0.72rem; font-weight: 900; padding: 2px 8px; border-radius: 20px;">رابط مخصص لأفراد الأمن</span>
                            <span style="font-size: 0.8rem; color: #bfdbfe; font-weight: 700;">معزول ومستقل تماماً</span>
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 900; margin-bottom: 4px;">رابط تسجيل الزائرين والمقاولين (Gate Security Portal)</h3>
                        <p style="color: #cbd5e1; font-size: 0.82rem; line-height: 1.4; margin-bottom: 0;">
                            افتح هذا الرابط على جهاز تابلت / هاتف بوابة الأمن لتسجيل الدخول والخروج والتوقيع الرقمي دون السماح لهم بالوصول لباقي النظام.
                        </p>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <a href="${portalUrl}" target="_blank" class="btn" style="background: #ffffff; color: #1e40af; font-weight: 800; font-size: 0.85rem; padding: 8px 16px; border-radius: 10px; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <i class="fas fa-external-link-alt"></i> فتح النموذج المباشر
                        </a>
                        <button type="button" class="btn" onclick="GateSecurity.copyGateLink('${portalUrl}')" style="background: rgba(255,255,255,0.15); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); font-weight: 700; font-size: 0.85rem; padding: 8px 14px; border-radius: 10px;">
                            <i class="fas fa-copy"></i> نسخ الرابط
                        </button>
                    </div>
                </div>
            </div>

            <!-- بطاقات الإحصائيات الحية (KPIs) -->
            <div class="grid-4" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #10b981;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">المتواجدون حالياً بالمصانع</span>
                        <i class="fas fa-users text-emerald-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiActiveVisitors" style="font-size: 1.8rem; font-weight: 900; color: #10b981; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: #059669; font-weight: 700;">🟢 بالداخل الآن (Onsite)</span>
                </div>

                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #3b82f6;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">إجمالي زوار اليوم</span>
                        <i class="fas fa-calendar-day text-blue-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiTodayVisitors" style="font-size: 1.8rem; font-weight: 900; color: #3b82f6; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700;">حركات الدخول الموثقة</span>
                </div>

                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #f59e0b;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">تنبيه مدة الزيارة (+4 ساعات)</span>
                        <i class="fas fa-stopwatch text-amber-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiOverstayVisitors" style="font-size: 1.8rem; font-weight: 900; color: #f59e0b; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: #d97706; font-weight: 700;">تحتاج متابعة أمنية</span>
                </div>

                <div class="kpi-card" style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; border-right: 4px solid #6366f1;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">إجمالي زيارات الشهر</span>
                        <i class="fas fa-chart-line text-indigo-500" style="font-size: 1.2rem;"></i>
                    </div>
                    <div id="kpiMonthVisitors" style="font-size: 1.8rem; font-weight: 900; color: #6366f1; margin-top: 6px;">0</div>
                    <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700;">سجل شهر ${new Date().toLocaleDateString('ar-EG', { month: 'long' })}</span>
                </div>
            </div>

            <!-- شريط الفلاتر والبحث -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 14px 18px; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;">
                <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; flex: 1; min-width: 300px;">
                    <div style="position: relative; flex: 1; min-width: 200px;">
                        <i class="fas fa-search" style="position: absolute; right: 12px; top: 12px; color: var(--text-muted);"></i>
                        <input type="text" id="gateVisitorSearchInput" class="form-control" placeholder="بحث بالاسم، الشركة، رقم الكارت، المستضيف..." style="padding-right: 34px; font-size: 0.85rem;" oninput="GateSecurity.handleSearch(this.value)">
                    </div>

                    <select id="gateFilterSite" class="form-select" style="width: auto; min-width: 150px; font-size: 0.85rem;" onchange="GateSecurity.handleFilterSite(this.value)">
                        <option value="all">🏢 جميع المصانع والمواقع</option>
                        <option value="ICAPP-1">ICAPP-1</option>
                        <option value="ICAPP-2">ICAPP-2</option>
                        <option value="ICAPP-3">ICAPP-3</option>
                        <option value="ICAPP-4">ICAPP-4</option>
                        <option value="WH">المخازن العامة (WH)</option>
                        <option value="المبنى الإداري">المبنى الإداري</option>
                        <option value="الموقع العام">الموقع العام والمرافق</option>
                    </select>

                    <select id="gateFilterStatus" class="form-select" style="width: auto; min-width: 150px; font-size: 0.85rem;" onchange="GateSecurity.handleFilterStatus(this.value)">
                        <option value="all">⚡ جميع الحالات</option>
                        <option value="active" selected>🟢 بالداخل حالياً (Onsite)</option>
                        <option value="exited">🚪 تم الخروج (Checked Out)</option>
                    </select>
                </div>

                <div style="display: flex; gap: 8px;">
                    <button type="button" class="btn btn-outline-secondary" onclick="GateSecurity.exportToExcel()" style="font-weight: 700; font-size: 0.82rem;">
                        <i class="fas fa-file-excel text-emerald-600"></i> تصدير Excel
                    </button>
                </div>
            </div>

            <!-- جدول سجل الزوار والمقاولين -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm);">
                <div style="overflow-x: auto;">
                    <table class="table" style="width: 100%; margin-bottom: 0; font-size: 0.84rem; text-align: right;">
                        <thead style="background: var(--bg-card); color: var(--text-secondary); font-weight: 800; border-bottom: 2px solid var(--border-color);">
                            <tr>
                                <th style="padding: 12px 14px;">رقم الكارت</th>
                                <th style="padding: 12px 14px;">الزائر والجهة</th>
                                <th style="padding: 12px 14px;">الهاتف / الرقم القومي</th>
                                <th style="padding: 12px 14px;">المصنع والصالة المستهدفة</th>
                                <th style="padding: 12px 14px;">الموظف المستضيف</th>
                                <th style="padding: 12px 14px;">وقت الدخول / الخروج</th>
                                <th style="padding: 12px 14px;">المدة المنقضية</th>
                                <th style="padding: 12px 14px;">الحالة</th>
                                <th style="padding: 12px 14px; text-align: center;">إجراء</th>
                            </tr>
                        </thead>
                        <tbody id="gateVisitorsTableBody">
                            <tr>
                                <td colspan="9" style="text-align: center; padding: 30px; color: var(--text-muted);">
                                    <i class="fas fa-spinner fa-spin" style="margin-left: 6px;"></i> جاري تحميل بيانات السجل...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.loadVisitorsData();
        this.startAutoRefresh();
    }

    getGatePortalUrl() {
        const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
        const path = window.location.pathname;
        if (path.includes('/Frontend/')) {
            return `${origin}/Frontend/gate-visitor-entry.html`;
        } else if (path.includes('/dist/')) {
            return `${origin}/dist/gate-visitor-entry.html`;
        } else {
            return `${origin}/gate-visitor-entry.html`;
        }
    }

    copyGateLink(url) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                if (typeof Utils !== 'undefined' && Utils.showNotification) {
                    Utils.showNotification('تم نسخ رابط تسجيل أمن البوابات بنجاح ✅', 'success');
                } else {
                    alert('تم نسخ الرابط بنجاح: ' + url);
                }
            });
        } else {
            prompt('انسخ الرابط التالي لمسؤول الأمن عند البوابة:', url);
        }
    }

    async loadVisitorsData() {
        try {
            // First load local cache
            const raw = localStorage.getItem('HSE_GATE_VISITORS_REGISTRY');
            this.visitors = raw ? JSON.parse(raw) : [];

            // Then attempt to fetch from Google Sheets Backend if available
            if (navigator.onLine && typeof GoogleIntegration !== 'undefined') {
                try {
                    const res = await fetch(this.getEffectiveApiUrl() + '?action=getActiveGateVisitors', { method: 'GET', mode: 'cors' });
                    const json = await res.json();
                    if (json && json.success && Array.isArray(json.activeVisitors)) {
                        const cloudActive = json.activeVisitors.map(v => ({
                            ...v,
                            entryTimestamp: new Date(v.entryDate + ' ' + v.entryTime).getTime() || Date.now()
                        }));
                        // Merge
                        const map = new Map();
                        this.visitors.forEach(v => map.set(v.id, v));
                        cloudActive.forEach(v => map.set(v.id, v));
                        this.visitors = Array.from(map.values()).sort((a,b) => (b.entryTimestamp || 0) - (a.entryTimestamp || 0));
                        localStorage.setItem('HSE_GATE_VISITORS_REGISTRY', JSON.stringify(this.visitors));
                    }
                } catch(e) {}
            }

            this.applyFilters();
            this.updateKpis();
        } catch(err) {
            console.error('Error loading gate visitors:', err);
        }
    }

    getEffectiveApiUrl() {
        const DEFAULT_API_URL = 'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';
        try {
            const s1 = localStorage.getItem('HSE_SETTINGS_CACHE');
            if (s1) {
                const parsed = JSON.parse(s1);
                if (parsed && parsed.scriptUrl && parsed.scriptUrl.includes('script.google.com')) return parsed.scriptUrl;
            }
        } catch(e) {}
        return DEFAULT_API_URL;
    }

    updateKpis() {
        const todayStr = new Date().toISOString().split('T')[0];
        const thisMonthStr = todayStr.slice(0, 7);

        const todayList = this.visitors.filter(v => v.entryDate === todayStr);
        const activeList = this.visitors.filter(v => !v.exitTime);
        const monthList = this.visitors.filter(v => v.entryDate && v.entryDate.startsWith(thisMonthStr));

        const nowTs = Date.now();
        const overstayCount = activeList.filter(v => {
            const elMin = (nowTs - (v.entryTimestamp || 0)) / 60000;
            return elMin >= 240;
        }).length;

        const kpiAct = document.getElementById('kpiActiveVisitors');
        if (kpiAct) kpiAct.textContent = activeList.length;

        const kpiTod = document.getElementById('kpiTodayVisitors');
        if (kpiTod) kpiTod.textContent = todayList.length;

        const kpiOvr = document.getElementById('kpiOverstayVisitors');
        if (kpiOvr) kpiOvr.textContent = overstayCount;

        const kpiMon = document.getElementById('kpiMonthVisitors');
        if (kpiMon) kpiMon.textContent = monthList.length;
    }

    applyFilters() {
        let list = [...this.visitors];

        if (this.filterSite !== 'all') {
            list = list.filter(v => v.site === this.filterSite);
        }

        if (this.filterStatus === 'active') {
            list = list.filter(v => !v.exitTime);
        } else if (this.filterStatus === 'exited') {
            list = list.filter(v => !!v.exitTime);
        }

        if (this.searchQuery) {
            const q = this.searchQuery.toLowerCase();
            list = list.filter(v => 
                (v.name && v.name.toLowerCase().includes(q)) ||
                (v.org && v.org.toLowerCase().includes(q)) ||
                (v.badge && v.badge.toLowerCase().includes(q)) ||
                (v.host && v.host.toLowerCase().includes(q)) ||
                (v.phone && v.phone.includes(q)) ||
                (v.vehicle && v.vehicle.toLowerCase().includes(q))
            );
        }

        this.filteredVisitors = list;
        this.renderTable();
    }

    renderTable() {
        const tbody = document.getElementById('gateVisitorsTableBody');
        if (!tbody) return;

        if (this.filteredVisitors.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 36px 12px; color: var(--text-muted);">
                        <i class="fas fa-folder-open" style="font-size: 2rem; color: #94a3b8; display:block; margin-bottom: 8px;"></i>
                        <span style="font-weight: 700;">لا توجد سجلات زوار مطابقة لمعايير البحث الحالية</span>
                    </td>
                </tr>
            `;
            return;
        }

        const nowTs = Date.now();

        tbody.innerHTML = this.filteredVisitors.map(v => {
            const isActive = !v.exitTime;
            const elapsedMin = Math.round((nowTs - (v.entryTimestamp || nowTs)) / 60000);
            const hours = Math.floor(elapsedMin / 60);
            const mins = elapsedMin % 60;
            const isOverstay = isActive && elapsedMin >= 240;

            const durationText = isActive 
                ? (hours > 0 ? `${hours}س ${mins}د` : `${mins}د`)
                : (v.durationMinutes ? `${v.durationMinutes} دقيقة` : 'مكتمل');

            return `
                <tr style="border-bottom: 1px solid var(--border-color); ${isOverstay ? 'background: rgba(254, 242, 242, 0.6);' : ''}">
                    <td style="padding: 10px 14px; font-weight: 900; color: #1e40af;">
                        <span style="background: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem; border: 1px solid #bfdbfe;">
                            🏷️ ${v.badge || 'بدون'}
                        </span>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${v.name}</div>
                        <div style="font-size: 0.76rem; color: #2563eb; font-weight: 700;"><i class="fas fa-building"></i> ${v.org}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 700;"><a href="tel:${v.phone}" style="color: inherit; text-decoration: none;">${v.phone || '-'}</a></div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">رقم القومي: ${v.idNumber || '-'}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <div style="font-weight: 800; color: var(--text-primary);">${v.site}</div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">${v.area}</div>
                    </td>
                    <td style="padding: 10px 14px; font-weight: 700; color: var(--text-secondary);">
                        <i class="fas fa-user-tie text-blue-500"></i> ${v.host}
                    </td>
                    <td style="padding: 10px 14px; font-size: 0.78rem;">
                        <div><strong style="color: #10b981;">دخول:</strong> ${v.entryTime} (${v.entryDate})</div>
                        <div><strong style="color: #64748b;">خروج:</strong> ${v.exitTime || '—'}</div>
                    </td>
                    <td style="padding: 10px 14px;">
                        <span style="font-weight: 800; font-size: 0.78rem; ${isOverstay ? 'color: #dc2626; font-weight: 900;' : 'color: var(--text-secondary);'}">
                            ${durationText}
                            ${isOverstay ? '<span style="display:block; font-size: 0.68rem; color: #dc2626;">⚠️ تأخير +4س</span>' : ''}
                        </span>
                    </td>
                    <td style="padding: 10px 14px;">
                        ${isActive ? `
                            <span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 12px; font-weight: 800; font-size: 0.74rem; display: inline-flex; align-items: center; gap: 4px;">
                                <span style="width:6px; height:6px; border-radius:50%; background:#10b981;"></span> بالداخل
                            </span>
                        ` : `
                            <span style="background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; padding: 3px 8px; border-radius: 12px; font-weight: 700; font-size: 0.74rem;">
                                تم الخروج
                            </span>
                        `}
                    </td>
                    <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                        <button type="button" class="btn btn-sm" onclick="GateSecurity.printVisitorBadge('${v.id}')" style="background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 3px 8px; margin-left: 4px;" title="طباعة كارت الزائر">
                            <i class="fas fa-id-card"></i> كارت
                        </button>
                        ${isActive ? `
                            <button type="button" class="btn btn-sm" onclick="GateSecurity.adminForceCheckOut('${v.id}', '${v.badge}')" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 3px 8px;" title="تسجيل خروج إداري">
                                <i class="fas fa-door-open"></i> خروج
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
        }).join('');
    }

    handleSearch(val) {
        this.searchQuery = val.trim();
        this.applyFilters();
    }

    handleFilterSite(site) {
        this.filterSite = site;
        this.applyFilters();
    }

    handleFilterStatus(status) {
        this.filterStatus = status;
        this.applyFilters();
    }

    async adminForceCheckOut(id, badge) {
        if (!confirm('هل أنت متأكد من تسجيل خروج هذا الزائر إدارياً؟')) return;

        const idx = this.visitors.findIndex(v => v.id === id);
        if (idx !== -1) {
            const now = new Date();
            const exitTime = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
            this.visitors[idx].exitTime = exitTime;
            this.visitors[idx].exitTimestamp = now.getTime();
            localStorage.setItem('HSE_GATE_VISITORS_REGISTRY', JSON.stringify(this.visitors));

            this.applyFilters();
            this.updateKpis();

            // Sync to backend
            try {
                const targetApiUrl = this.getEffectiveApiUrl();
                await fetch(targetApiUrl, {
                    method: 'POST',
                    mode: 'cors',
                    redirect: 'follow',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({
                        action: 'submitGateVisitorCheckOut',
                        id: id,
                        exitTime: exitTime,
                        badge: badge
                    })
                });
            } catch(e) {}

            if (typeof Utils !== 'undefined' && Utils.showNotification) {
                Utils.showNotification('تم تسجيل خروج الزائر بنجاح ✅', 'success');
            }
        }
    }

    refreshData() {
        this.loadVisitorsData();
        if (typeof Utils !== 'undefined' && Utils.showNotification) {
            Utils.showNotification('تم تحديث سجل أمن البوابات بنجاح 🔄', 'info');
        }
    }

    startAutoRefresh() {
        if (this.autoRefreshTimer) clearInterval(this.autoRefreshTimer);
        this.autoRefreshTimer = setInterval(() => {
            this.loadVisitorsData();
        }, 30000);
    }

    printEmergencyMusterList() {
        const active = this.visitors.filter(v => !v.exitTime);
        const win = window.open('', '_blank');
        const now = new Date();

        win.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>كشف حصر الطوارئ والإخلاء للزوار والمقاولين - ICAPP</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 10mm 10mm 12mm 10mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        padding: 10px;
                        direction: rtl;
                        color: #0f172a;
                        background: #ffffff;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    /* ترويسة ISO ثلاثية الصناديق المعتمدة */
                    .iso-print-header {
                        display: grid;
                        grid-template-columns: 160px 1fr 200px;
                        border: 2px solid #0f172a;
                        border-top: 5px solid #1e3a8a;
                        border-radius: 8px;
                        margin-bottom: 16px;
                        overflow: hidden;
                        background: #ffffff;
                    }
                    .iso-box-brand {
                        padding: 8px 10px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-left: 1.5px solid #0f172a;
                        background: #f8fafc;
                        gap: 4px;
                    }
                    .iso-print-logo {
                        max-height: 44px;
                        max-width: 100px;
                        object-fit: contain;
                    }
                    .iso-dept-title {
                        font-size: 11px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        line-height: 1.2;
                    }
                    .iso-box-title {
                        padding: 8px 12px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }
                    .iso-main-title {
                        margin: 0;
                        font-size: 15px;
                        font-weight: 900;
                        color: #b91c1c;
                        line-height: 1.25;
                    }
                    .iso-sub-title {
                        font-size: 10px;
                        font-weight: 700;
                        color: #475569;
                        margin-top: 3px;
                    }
                    .iso-box-meta {
                        padding: 6px 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        border-right: 1.5px solid #0f172a;
                        background: #f8fafc;
                        font-size: 10.5px;
                        gap: 3px;
                    }
                    .meta-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px dashed #cbd5e1;
                        padding-bottom: 2px;
                    }
                    .meta-row:last-child { border-bottom: none; }
                    .meta-row span { color: #64748b; font-size: 10px; font-weight: 700; }
                    .meta-row strong { color: #0f172a; font-size: 10px; }

                    table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 11.5px; }
                    th, td { border: 1.5px solid #334155; padding: 6px 8px; text-align: right; }
                    th { background: #f1f5f9; font-weight: 800; color: #0f172a; font-size: 11px; }

                    /* فوتر الاعتمادات والتوقيعات ثلاثي الصناديق */
                    .iso-print-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 12px;
                        margin-top: 28px;
                        page-break-inside: avoid;
                    }
                    .footer-box {
                        border: 1.5px solid #334155;
                        border-radius: 6px;
                        padding: 8px 10px;
                        background: #f8fafc;
                    }
                    .footer-box-title {
                        font-size: 11px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        border-bottom: 1px solid #cbd5e1;
                        padding-bottom: 5px;
                        margin-bottom: 8px;
                    }
                    .footer-sig-line {
                        font-size: 10.5px;
                        color: #334155;
                        margin-top: 6px;
                        font-weight: 600;
                    }
                    .print-btn-wrap { text-align: center; margin-top: 25px; }
                    @media print {
                        .print-btn-wrap { display: none !important; }
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <!-- ترويسة ISO ثلاثية الصناديق المعتمدة -->
                <div class="iso-print-header">
                    <div class="iso-box-brand">
                        <img src="icons/icapp-logo.png" alt="ICAPP" class="iso-print-logo" onerror="this.src='icons/icapp-logo.png'">
                        <div class="iso-dept-title">إدارة السلامة والصحة المهنية</div>
                    </div>

                    <div class="iso-box-title">
                        <h1 class="iso-main-title">🚨 كشف حصر الطوارئ والإخلاء الفوري للزوار والمقاولين</h1>
                        <div class="iso-sub-title">Emergency Visitor & Contractor Evacuation Headcount Sheet</div>
                    </div>

                    <div class="iso-box-meta">
                        <div class="meta-row">
                            <span>كود الوثيقة:</span>
                            <strong>DOC-HSE-EMR-VIS-01</strong>
                        </div>
                        <div class="meta-row">
                            <span>رقم الإصدار:</span>
                            <strong>Rev. 02</strong>
                        </div>
                        <div class="meta-row">
                            <span>توقيت الطباعة:</span>
                            <strong>${now.toLocaleDateString('ar-EG')} ${now.toLocaleTimeString('ar-EG')}</strong>
                        </div>
                        <div class="meta-row">
                            <span>إجمالي المتواجدين:</span>
                            <strong style="color: #b91c1c; font-size: 11px;">${active.length} فرد</strong>
                        </div>
                    </div>
                </div>

                ${active.length === 0 ? `
                    <div style="text-align: center; padding: 30px 20px; border: 2px dashed #059669; border-radius: 8px; margin: 20px 0; background: #f0fdf4;">
                        <h3 style="color: #059669; margin: 0 0 6px; font-size: 15px;">✅ إفادة خلو المنشأة من أي زوار أو مقاولين خارجيين</h3>
                        <p style="color: #166534; margin: 0; font-size: 12px; font-weight: 600;">تم إجراء الفحص اللحظي لسجل البوابات وتأكيد عدم وجود أي زائر أو مقاول داخل المصانع بتاريخ ووقت الطباعة أعلاه.</p>
                    </div>
                ` : `
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 25px; text-align: center;">#</th>
                                <th style="width: 70px;">رقم الكارت</th>
                                <th>اسم الزائر / المقاول</th>
                                <th>الجهة / الشركة</th>
                                <th>المصنع</th>
                                <th>الموقع الفرعي</th>
                                <th>الموظف المستضيف</th>
                                <th style="width: 70px;">وقت الدخول</th>
                                <th style="width: 140px; text-align: center;">التحقق عند نقطة التجمع (Muster Point)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${active.map((v, i) => `
                                <tr>
                                    <td style="text-align: center;">${i + 1}</td>
                                    <td><strong>${v.badge || '-'}</strong></td>
                                    <td><strong>${v.name}</strong></td>
                                    <td>${v.org}</td>
                                    <td>${v.site}</td>
                                    <td>${v.area}</td>
                                    <td>${v.host}</td>
                                    <td>${v.entryTime}</td>
                                    <td style="text-align: center; font-size: 11px;">[ &nbsp; ] آمن / سليم &nbsp;&nbsp; [ &nbsp; ] مفقود</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `}

                <!-- فوتر الاعتمادات والتوقيعات ثلاثي الصناديق -->
                <div class="iso-print-footer">
                    <div class="footer-box">
                        <div class="footer-box-title">مسؤول السلامة والصحة المهنية</div>
                        <div class="footer-sig-line">الاسم: .......................................</div>
                        <div class="footer-sig-line">التوقيع: ....................................</div>
                    </div>
                    <div class="footer-box">
                        <div class="footer-box-title">مسؤول الإخلاء ونقطة التجمع</div>
                        <div class="footer-sig-line">الاسم: .......................................</div>
                        <div class="footer-sig-line">التوقيع: ....................................</div>
                    </div>
                    <div class="footer-box">
                        <div class="footer-box-title">قائد فريق الطوارئ (Incident Commander)</div>
                        <div class="footer-sig-line">الاسم: .......................................</div>
                        <div class="footer-sig-line">التوقيع: ....................................</div>
                    </div>
                </div>

                <div class="print-btn-wrap">
                    <button onclick="window.print()" style="padding: 10px 24px; background: #1e40af; color: #fff; border:none; border-radius:8px; cursor:pointer; font-weight: 800; font-size: 13px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">🖨️ طباعة كشف الإخلاء الآن</button>
                </div>
            </body>
            </html>
        `);
        win.document.close();
    }

    printVisitorBadge(visitorId) {
        const rec = this.visitors.find(v => v.id === visitorId);
        if (!rec) {
            alert('لم يتم العثور على بيانات هذا الزائر');
            return;
        }

        const win = window.open('', '_blank');
        if (!win) {
            alert('يرجى السماح بالنوافذ المنبثقة لطباعة كارت الزائر (Pop-ups)');
            return;
        }

        const qrData = `ICAPP-VISITOR-PASS | Badge: ${rec.badge} | Name: ${rec.name} | Org: ${rec.org} | Site: ${rec.site} - ${rec.area} | Date: ${rec.entryDate} ${rec.entryTime}`;
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&margin=0&data=${encodeURIComponent(qrData)}`;

        win.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>كارت وتصريح دخول زائر - ${rec.badge} - ${rec.name} - ICAPP</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 10mm 10mm 10mm 10mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        margin: 0;
                        padding: 15px;
                        direction: rtl;
                        color: #0f172a;
                        background: #f1f5f9;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .page-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        min-height: 90vh;
                    }
                    /* كارت الزائر المعتمد */
                    .visitor-badge-card {
                        width: 105mm;
                        min-height: 155mm;
                        background: #ffffff;
                        border: 2.5px solid #0f172a;
                        border-radius: 14px;
                        overflow: hidden;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                        display: flex;
                        flex-direction: column;
                        position: relative;
                    }
                    .lanyard-slot {
                        width: 16mm;
                        height: 3.5mm;
                        background: #e2e8f0;
                        border: 1.5px dashed #64748b;
                        border-radius: 4px;
                        margin: 4px auto 0;
                    }
                    .badge-header {
                        background: #1e3a8a;
                        color: #ffffff;
                        padding: 8px 12px;
                        text-align: center;
                        border-bottom: 3.5px solid #059669;
                    }
                    .badge-logo-row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 4px;
                    }
                    .badge-logo {
                        max-height: 32px;
                        max-width: 80px;
                        object-fit: contain;
                        background: #ffffff;
                        padding: 2px 6px;
                        border-radius: 4px;
                    }
                    .badge-dept {
                        font-size: 9.5px;
                        font-weight: 800;
                        color: #93c5fd;
                        text-align: left;
                    }
                    .badge-main-type {
                        font-size: 13.5px;
                        font-weight: 900;
                        margin: 0;
                        letter-spacing: 0.2px;
                    }
                    .badge-sub-type {
                        font-size: 8.5px;
                        color: #cbd5e1;
                        font-weight: 700;
                    }
                    .badge-code-banner {
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                        color: #ffffff;
                        padding: 8px 12px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .badge-code-label {
                        font-size: 10px;
                        color: #94a3b8;
                        font-weight: 700;
                    }
                    .badge-code-val {
                        font-size: 19px;
                        font-weight: 900;
                        color: #34d399;
                        letter-spacing: 1px;
                        font-family: 'Courier New', monospace;
                    }
                    .badge-body {
                        padding: 10px 12px;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 6px;
                    }
                    .visitor-hero-box {
                        background: #f8fafc;
                        border: 1.5px solid #cbd5e1;
                        border-radius: 8px;
                        padding: 8px 10px;
                        text-align: center;
                    }
                    .visitor-hero-name {
                        font-size: 15px;
                        font-weight: 900;
                        color: #0f172a;
                        margin-bottom: 2px;
                    }
                    .visitor-hero-org {
                        font-size: 11px;
                        font-weight: 800;
                        color: #2563eb;
                    }
                    .badge-fields-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 5px;
                        background: #f8fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                        padding: 6px 8px;
                        font-size: 9.5px;
                    }
                    .b-field {
                        display: flex;
                        flex-direction: column;
                    }
                    .b-field-full {
                        grid-column: span 2;
                    }
                    .b-key {
                        color: #64748b;
                        font-size: 8.5px;
                        font-weight: 700;
                    }
                    .b-val {
                        color: #0f172a;
                        font-weight: 800;
                    }
                    .badge-qr-row {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-top: 4px;
                        background: #ffffff;
                        border: 1px solid #cbd5e1;
                        border-radius: 6px;
                        padding: 6px;
                    }
                    .badge-qr-img {
                        width: 65px;
                        height: 65px;
                        border: 1px solid #94a3b8;
                        border-radius: 4px;
                        flex-shrink: 0;
                    }
                    .badge-rules {
                        font-size: 8px;
                        color: #334155;
                        line-height: 1.35;
                        font-weight: 600;
                    }
                    .badge-footer {
                        background: #f1f5f9;
                        border-top: 1.5px solid #cbd5e1;
                        padding: 6px 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 8.5px;
                        color: #475569;
                        font-weight: 700;
                    }
                    .badge-sig-text {
                        color: #0f172a;
                        font-weight: 800;
                    }
                    .print-btn-wrap {
                        margin-top: 16px;
                        text-align: center;
                    }
                    @media print {
                        body {
                            background: #ffffff;
                            padding: 0;
                        }
                        .page-container {
                            min-height: 0;
                        }
                        .print-btn-wrap {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="page-container">
                    <div class="visitor-badge-card">
                        <div class="lanyard-slot"></div>
                        <div class="badge-header">
                            <div class="badge-logo-row">
                                <img src="icons/icapp-logo.png" alt="ICAPP" class="badge-logo" onerror="this.src='icons/icapp-logo.png'">
                                <div class="badge-dept">
                                    إدارة السلامة والصحة المهنية<br>
                                    منظومة أمن وحراسة البوابات
                                </div>
                            </div>
                            <div class="badge-main-type">🪪 تصريح وشارة دخول زائر / مقاول</div>
                            <div class="badge-sub-type">OFFICIAL VISITOR / CONTRACTOR PASS</div>
                        </div>

                        <div class="badge-code-banner">
                            <div class="badge-code-label">رقم كارت / شارة الزائر:</div>
                            <div class="badge-code-val">🏷️ ${rec.badge}</div>
                        </div>

                        <div class="badge-body">
                            <div class="visitor-hero-box">
                                <div class="visitor-hero-name">👤 ${rec.name}</div>
                                <div class="visitor-hero-org">🏢 ${rec.org}</div>
                            </div>

                            <div class="badge-fields-grid">
                                <div class="b-field">
                                    <span class="b-key">الرقم القومي / الجواز:</span>
                                    <span class="b-val">${rec.idNumber || '-'}</span>
                                </div>
                                <div class="b-field">
                                    <span class="b-key">الهاتف:</span>
                                    <span class="b-val">${rec.phone || '-'}</span>
                                </div>
                                <div class="b-field-full">
                                    <span class="b-key">المصنع والموقع المصرح به:</span>
                                    <span class="b-val" style="color: #1e40af;">📍 ${rec.site} — ${rec.area}</span>
                                </div>
                                <div class="b-field">
                                    <span class="b-key">الموظف المستضيف:</span>
                                    <span class="b-val">${rec.host || '-'}</span>
                                </div>
                                <div class="b-field">
                                    <span class="b-key">وقت وتاريخ الدخول:</span>
                                    <span class="b-val">⏱️ ${rec.entryDate} | ${rec.entryTime}</span>
                                </div>
                                <div class="b-field-full">
                                    <span class="b-key">نوع وغرض الزيارة:</span>
                                    <span class="b-val">${rec.purpose || '-'}</span>
                                </div>
                                ${rec.vehicle ? `
                                    <div class="b-field-full" style="background: #eff6ff; padding: 2px 4px; border-radius: 4px; border: 1px dashed #93c5fd;">
                                        <span class="b-key">🚗 مركبة مصرحة (رقم اللوحة):</span>
                                        <span class="b-val" style="color: #1d4ed8; font-weight: 900;">${rec.vehicle}</span>
                                    </div>
                                ` : ''}
                            </div>

                            <div class="badge-qr-row">
                                <img src="${qrImageUrl}" alt="Pass QR" class="badge-qr-img" onerror="this.src='https://chart.googleapis.com/chart?cht=qr&chs=180x180&chl=${encodeURIComponent(qrData)}';">
                                <div class="badge-rules">
                                    ⚠️ <strong>تعليمات أمنية وإلزامية:</strong><br>
                                    • حمل هذا الكارت بصفة ظاهرة طوال الزيارة.<br>
                                    • الالتزام بارتداء مهمات الوقاية الشخصية (PPE).<br>
                                    • يُمنع التحرك الفردي بدون مرافق رسمي.<br>
                                    • يُسلّم هذا الكارت للبوابة عند تسجيل الخروج.
                                </div>
                            </div>
                        </div>

                        <div class="badge-footer">
                            <div>كود: <strong>DOC-SEC-VIS-PASS-01</strong></div>
                            <div class="badge-sig-text">اعتماد أمن البوابة: ....................</div>
                        </div>
                    </div>

                    <div class="print-btn-wrap">
                        <button onclick="window.print()" style="padding: 10px 24px; background: #1e40af; color: #fff; border:none; border-radius:8px; cursor:pointer; font-weight: 800; font-size: 13px; box-shadow: 0 4px 12px rgba(30,64,175,0.25);">🖨️ طباعة كارت الزائر الآن</button>
                    </div>
                </div>
            </body>
            </html>
        `);
        win.document.close();
    }

    exportToExcel() {
        if (this.filteredVisitors.length === 0) {
            alert('لا توجد بيانات لتصديرها');
            return;
        }

        let csv = '\uFEFFرقم الكارت,اسم الزائر,الجهة / الشركة,رقم الهاتف,الرقم القومي,المصنع المستهدف,المكان المستهدف,المستضيف,غرض الزيارة,تاريخ الدخول,وقت الدخول,وقت الخروج,الحالة\n';
        
        this.filteredVisitors.forEach(v => {
            csv += `"${v.badge || ''}","${v.name || ''}","${v.org || ''}","${v.phone || ''}","${v.idNumber || ''}","${v.site || ''}","${v.area || ''}","${v.host || ''}","${v.purpose || ''}","${v.entryDate || ''}","${v.entryTime || ''}","${v.exitTime || ''}","${v.exitTime ? 'تم الخروج' : 'بالداخل'}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Gate_Visitors_Log_${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Instantiate
new GateSecurityModule();
