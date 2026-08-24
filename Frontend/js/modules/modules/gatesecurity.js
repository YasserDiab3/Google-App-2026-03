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
                        <button type="button" class="btn" onclick="GateSecurity.printGateQrPoster()" style="font-weight: 800; background: #2563eb; color: #ffffff; border-color: #2563eb;">
                            <i class="fas fa-qrcode"></i> بوستر QR للبوابات (A4)
                        </button>
                        <button type="button" class="btn" onclick="GateSecurity.printMasterVisitorBadges()" style="font-weight: 800; background: #059669; color: #ffffff; border-color: #059669;">
                            <i class="fas fa-id-badge"></i> كارت وقواعد السلامة للزائرين (A4)
                        </button>
                        <button type="button" class="btn" onclick="GateSecurity.openMapEditorModal()" style="font-weight: 800; background: #8b5cf6; color: #ffffff; border-color: #8b5cf6;">
                            <i class="fas fa-map-marked-alt"></i> محرر الخريطة ونقاط التجمع
                        </button>
                        <button type="button" class="btn btn-primary" onclick="GateSecurity.printEmergencyMusterList()" style="font-weight: 700; background: #dc2626; border-color: #dc2626;">
                            <i class="fas fa-print"></i> طباعة كشف الإخلاء
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
                        ${isActive ? `
                            <button type="button" class="btn btn-sm" onclick="GateSecurity.adminForceCheckOut('${v.id}', '${v.badge}')" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; font-weight: 800; font-size: 0.75rem; border-radius: 6px; padding: 4px 10px;" title="تسجيل خروج إداري">
                                <i class="fas fa-door-open"></i> تسجيل خروج
                            </button>
                        ` : `
                            <span style="color: #94a3b8; font-size: 0.75rem;">—</span>
                        `}
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

    printGateQrPoster() {
        const portalUrl = this.getGatePortalUrl();
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&format=png&margin=0&data=${encodeURIComponent(portalUrl)}`;
        const win = window.open('', '_blank');
        if (!win) {
            alert('يرجى السماح بالنوافذ المنبثقة لطباعة البوستر (Pop-ups)');
            return;
        }

        win.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>لوحة رمز الاستجابة السريع QR - منظومة أمن البوابات والزوار - ICAPP</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 8mm 8mm 8mm 8mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        margin: 0;
                        padding: 10px;
                        direction: rtl;
                        color: #0f172a;
                        background: #ffffff;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .poster-wrapper {
                        border: 3px solid #1e3a8a;
                        border-radius: 12px;
                        padding: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: 96vh;
                        background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
                    }
                    /* ترويسة ISO ثلاثية الصناديق */
                    .iso-print-header {
                        display: grid;
                        grid-template-columns: 160px 1fr 190px;
                        border: 2px solid #0f172a;
                        border-top: 5px solid #1e3a8a;
                        border-radius: 8px;
                        overflow: hidden;
                        background: #ffffff;
                        margin-bottom: 12px;
                    }
                    .iso-box-brand {
                        padding: 6px 10px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-left: 1.5px solid #0f172a;
                        background: #f8fafc;
                        gap: 3px;
                    }
                    .iso-print-logo {
                        max-height: 40px;
                        max-width: 95px;
                        object-fit: contain;
                    }
                    .iso-dept-title {
                        font-size: 10.5px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        line-height: 1.2;
                    }
                    .iso-box-title {
                        padding: 6px 10px;
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
                        color: #1e3a8a;
                        line-height: 1.2;
                    }
                    .iso-sub-title {
                        font-size: 10px;
                        font-weight: 700;
                        color: #475569;
                        margin-top: 2px;
                    }
                    .iso-box-meta {
                        padding: 6px 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        border-right: 1.5px solid #0f172a;
                        background: #f8fafc;
                        font-size: 10px;
                        gap: 2px;
                    }
                    .meta-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px dashed #cbd5e1;
                        padding-bottom: 1px;
                    }
                    .meta-row:last-child { border-bottom: none; }
                    .meta-row span { color: #64748b; font-weight: 700; }
                    .meta-row strong { color: #0f172a; }

                    /* قسم البانر التوجيهي الرئيسي */
                    .hero-banner {
                        text-align: center;
                        background: #1e3a8a;
                        color: #ffffff;
                        padding: 10px 14px;
                        border-radius: 8px;
                        margin-bottom: 10px;
                    }
                    .hero-title {
                        font-size: 18px;
                        font-weight: 900;
                        margin: 0 0 3px;
                        letter-spacing: -0.2px;
                    }
                    .hero-sub {
                        font-size: 11px;
                        color: #93c5fd;
                        font-weight: 700;
                        margin: 0;
                    }

                    /* بطاقة رمز QR المركزية */
                    .qr-card-center {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: #ffffff;
                        border: 2px dashed #2563eb;
                        border-radius: 12px;
                        padding: 14px 10px;
                        margin-bottom: 12px;
                        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
                    }
                    .qr-frame {
                        background: #ffffff;
                        padding: 10px;
                        border: 3px solid #1e293b;
                        border-radius: 12px;
                        display: inline-block;
                        box-shadow: 0 6px 16px rgba(0,0,0,0.1);
                    }
                    .qr-img {
                        width: 220px;
                        height: 220px;
                        display: block;
                    }
                    .qr-tagline {
                        margin-top: 10px;
                        font-size: 11.5px;
                        font-weight: 800;
                        color: #0f172a;
                        background: #dbeafe;
                        padding: 4px 14px;
                        border-radius: 20px;
                        border: 1px solid #93c5fd;
                    }

                    /* شبكة الخطوات الإرشادية 4 خطوات */
                    .steps-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 8px;
                        margin-bottom: 10px;
                    }
                    .step-box {
                        background: #ffffff;
                        border: 1.5px solid #cbd5e1;
                        border-top: 3.5px solid #2563eb;
                        border-radius: 8px;
                        padding: 8px;
                        text-align: center;
                    }
                    .step-num {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        background: #2563eb;
                        color: #ffffff;
                        border-radius: 50%;
                        font-size: 12px;
                        font-weight: 900;
                        margin-bottom: 4px;
                    }
                    .step-title {
                        font-size: 11px;
                        font-weight: 800;
                        color: #0f172a;
                        margin-bottom: 2px;
                    }
                    .step-desc {
                        font-size: 9.5px;
                        color: #475569;
                        line-height: 1.25;
                    }

                    /* شريط التنبيه الأمني والبيئي */
                    .safety-strip {
                        background: #fef2f2;
                        border: 1.5px solid #f87171;
                        border-radius: 8px;
                        padding: 6px 12px;
                        text-align: center;
                        font-size: 10.5px;
                        font-weight: 800;
                        color: #991b1b;
                        margin-bottom: 10px;
                    }

                    /* فوتر الاعتماد ثلاثي الصناديق */
                    .iso-print-footer {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 8px;
                    }
                    .footer-box {
                        border: 1.5px solid #334155;
                        border-radius: 6px;
                        padding: 6px 8px;
                        background: #f8fafc;
                    }
                    .footer-box-title {
                        font-size: 10px;
                        font-weight: 800;
                        color: #1e3a8a;
                        text-align: center;
                        border-bottom: 1px solid #cbd5e1;
                        padding-bottom: 3px;
                        margin-bottom: 5px;
                    }
                    .footer-sig-line {
                        font-size: 9.5px;
                        color: #334155;
                        margin-top: 4px;
                        font-weight: 600;
                    }

                    .print-btn-wrap {
                        text-align: center;
                        margin-top: 15px;
                    }
                    @media print {
                        .print-btn-wrap { display: none !important; }
                        body { padding: 0; }
                        .poster-wrapper { min-height: 98vh; }
                    }
                </style>
            </head>
            <body>
                <div class="poster-wrapper">
                    <!-- ترويسة ISO ثلاثية الصناديق -->
                    <div class="iso-print-header">
                        <div class="iso-box-brand">
                            <img src="icons/icapp-logo.png" alt="ICAPP" class="iso-print-logo" onerror="this.src='../icons/icapp-logo.png'">
                            <div class="iso-dept-title">إدارة السلامة والصحة المهنية</div>
                        </div>

                        <div class="iso-box-title">
                            <h1 class="iso-main-title">🛡️ منظومة أمن البوابات وسجل الزوار والمقاولين</h1>
                            <div class="iso-sub-title">Gate Security Visitor & Contractor Control System</div>
                        </div>

                        <div class="iso-box-meta">
                            <div class="meta-row">
                                <span>كود الوثيقة:</span>
                                <strong>DOC-SEC-QR-01</strong>
                            </div>
                            <div class="meta-row">
                                <span>رقم الإصدار:</span>
                                <strong>Rev. 02</strong>
                            </div>
                            <div class="meta-row">
                                <span>درجة السرية:</span>
                                <strong style="color: #047857;">عام داخلي</strong>
                            </div>
                            <div class="meta-row">
                                <span>نظام الدخول:</span>
                                <strong>تسجيل إلكتروني</strong>
                            </div>
                        </div>
                    </div>

                    <!-- البانر التوجيهي الرئيسي -->
                    <div class="hero-banner">
                        <div class="hero-title">📲 امسح رمز الاستجابة السريع لتسجيل الدخول فورياً</div>
                        <div class="hero-sub">Scan QR Code with your smartphone camera to register your visit pass</div>
                    </div>

                    <!-- بطاقة QR المركزية -->
                    <div class="qr-card-center">
                        <div class="qr-frame">
                            <img src="${qrImageUrl}" alt="Gate Entry QR Code" class="qr-img" onerror="this.src='https://chart.googleapis.com/chart?cht=qr&chs=450x450&chl=${encodeURIComponent(portalUrl)}';">
                        </div>
                        <div class="qr-tagline">
                            🔒 مسح آمن ومباشر عبر الهاتف المحمول | Direct Mobile Check-In
                        </div>
                    </div>

                    <!-- إرشادات الاستخدام 4 خطوات -->
                    <div class="steps-grid">
                        <div class="step-box">
                            <div class="step-num">1</div>
                            <div class="step-title">افتح الكاميرا</div>
                            <div class="step-desc">وجّه كاميرا الهاتف نحو رمز QR أعلاه</div>
                        </div>
                        <div class="step-box">
                            <div class="step-num">2</div>
                            <div class="step-title">افتح الرابط</div>
                            <div class="step-desc">انقر على الإشعار الظاهر لفتح النموذج</div>
                        </div>
                        <div class="step-box">
                            <div class="step-num">3</div>
                            <div class="step-title">سجل البيانات</div>
                            <div class="step-desc">أدخل الاسم والجهة والمستضيف والسيارة</div>
                        </div>
                        <div class="step-box">
                            <div class="step-num">4</div>
                            <div class="step-title">استلم الكارت</div>
                            <div class="step-desc">استلم كارت الزيارة المعتمد من مسؤول الأمن</div>
                        </div>
                    </div>

                    <!-- شريط التنبيه الإلزامي للسلامة والأمن -->
                    <div class="safety-strip">
                        🛡️ تنبيه أمني وإلزامي: يُمنع التواجد داخل المصانع بدون تصريح رسمي، مع الالتزام التام بتعليمات السلامة وارتداء مهمات الوقاية (PPE).
                    </div>

                    <!-- فوتر الاعتماد ثلاثي الصناديق -->
                    <div class="iso-print-footer">
                        <div class="footer-box">
                            <div class="footer-box-title">مسؤول الأمن الصناعي والحراسة</div>
                            <div class="footer-sig-line">الاسم: .......................................</div>
                            <div class="footer-sig-line">التوقيع: ....................................</div>
                        </div>
                        <div class="footer-box">
                            <div class="footer-box-title">مدير إدارة السلامة والصحة المهنية</div>
                            <div class="footer-sig-line">الاسم: .......................................</div>
                            <div class="footer-sig-line">التوقيع: ....................................</div>
                        </div>
                        <div class="footer-box">
                            <div class="footer-box-title">مدير العمليات وإدارة المصانع</div>
                            <div class="footer-sig-line">الاسم: .......................................</div>
                            <div class="footer-sig-line">التوقيع: ....................................</div>
                        </div>
                    </div>
                </div>

                <div class="print-btn-wrap">
                    <button onclick="window.print()" style="padding: 12px 28px; background: #1e40af; color: #fff; border:none; border-radius:8px; cursor:pointer; font-weight: 900; font-size: 14px; box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);">🖨️ طباعة لوحة QR الآن (A4 Poster)</button>
                </div>
            </body>
            </html>
        `);
        win.document.close();
    }

    getMapConfig() {
        const saved = localStorage.getItem('icapp_visitor_map_config');
        if (saved) {
            try { return JSON.parse(saved); } catch(e) {}
        }
        return {
            coords: '30°24\'12.4"N 31°18\'45.2"E',
            siteName: 'مجمع مصانع ICAPP المعادي والإسماعيلية',
            musterPoints: [
                { id: 'm1', name: 'نقطة 1', desc: 'الساحة الرئيسية أمام الإدارة', x: 145, y: 140 },
                { id: 'm2', name: 'نقطة 2', desc: 'ساحة رصيف الشحن والمخازن', x: 410, y: 240 },
                { id: 'm3', name: 'نقطة 3', desc: 'بجوار محطة الخدمات والفنية', x: 110, y: 310 },
                { id: 'm4', name: 'نقطة 4', desc: 'الساحة الشرقية للمصنع', x: 270, y: 30 }
            ],
            exits: [
                { id: 'e1', name: 'بوابة رئيسية', x: 18, y: 135 }
            ],
            buildings: [
                { name: 'المبنى الإداري', sub: 'الإدارة والمختبر', x: 50, y: 50, w: 120, h: 60, fill: '#dbeafe', stroke: '#1d4ed8', color: '#1e3a8a' },
                { name: 'مصنع ICAPP-1', sub: 'خطوط الفاكهة والتصنيع', x: 190, y: 50, w: 160, h: 120, fill: '#fef3c7', stroke: '#d97706', color: '#92400e' },
                { name: 'مصانع ICAPP-2 & 3', sub: 'التجميد والمركزات', x: 190, y: 190, w: 160, h: 115, fill: '#ede9fe', stroke: '#6d28d9', color: '#5b21b6' },
                { name: 'المخازن WH', sub: 'المواد الخام والتعبئة', x: 370, y: 50, w: 80, h: 160, fill: '#f1f5f9', stroke: '#475569', color: '#334155' },
                { name: 'محطة الخدمات الفنية', sub: 'والطاقة (ICAPP-4)', x: 50, y: 190, w: 120, h: 115, fill: '#fce7f3', stroke: '#be185d', color: '#9d174d' }
            ]
        };
    }

    saveMapConfig(config) {
        localStorage.setItem('icapp_visitor_map_config', JSON.stringify(config));
        alert('تم حفظ مخطط الخريطة ونقاط التجمع بنجاح! سيتم اعتماده في جميع الكروت المطبوعة.');
    }

    openMapEditorModal() {
        const config = this.getMapConfig();
        
        let modalHtml = `
            <div id="mapEditorModal" style="position: fixed; inset: 0; background: rgba(15,23,42,0.75); backdrop-filter: blur(4px); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 15px;">
                <div style="background: #ffffff; width: 100%; max-width: 900px; max-height: 92vh; overflow-y: auto; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid #cbd5e1; direction: rtl;">
                    <!-- Modal Header -->
                    <div style="background: #1e3a8a; color: #ffffff; padding: 16px 20px; border-top-left-radius: 16px; border-top-right-radius: 16px; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-map-marked-alt" style="font-size: 1.4rem; color: #60a5fa;"></i>
                            <div>
                                <h3 style="margin: 0; font-size: 1.1rem; font-weight: 900;">محرر الخريطة ونقاط التجمع (Map & Layout Customizer)</h3>
                                <span style="font-size: 0.78rem; color: #bfdbfe;">خاص بمدير النظام - تحديد نقاط التجمع، المباني، مخارج الطوارئ والإحداثيات</span>
                            </div>
                        </div>
                        <button onclick="document.getElementById('mapEditorModal').remove()" style="background: rgba(255,255,255,0.15); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-weight: 900; font-size: 1.1rem;">✕</button>
                    </div>

                    <!-- Modal Body -->
                    <div style="padding: 20px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                            <div>
                                <label style="font-size: 0.85rem; font-weight: 800; color: #1e3a8a; display: block; margin-bottom: 4px;">إحداثيات موقع المصنع (GPS Coordinates):</label>
                                <input type="text" id="editMapCoords" value="${config.coords}" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-weight: 700; font-size: 0.88rem;">
                            </div>
                            <div>
                                <label style="font-size: 0.85rem; font-weight: 800; color: #1e3a8a; display: block; margin-bottom: 4px;">اسم الموقع الرئيسي:</label>
                                <input type="text" id="editSiteName" value="${config.siteName}" style="width: 100%; padding: 8px 12px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-weight: 700; font-size: 0.88rem;">
                            </div>
                        </div>

                        <!-- قائمة نقاط التجمع -->
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <h4 style="margin: 0; font-size: 0.95rem; font-weight: 900; color: #15803d; display: flex; align-items: center; gap: 6px;">
                                    <i class="fas fa-flag"></i> نقاط التجمع المعرفة (Muster Points)
                                </h4>
                                <button type="button" onclick="GateSecurity.addEditorMusterPoint()" style="background: #15803d; color: #fff; border: none; padding: 4px 12px; border-radius: 6px; font-weight: 800; font-size: 0.78rem; cursor: pointer;">
                                    + إضافة نقطة تجمع جديدة
                                </button>
                            </div>
                            <div id="musterPointsList" style="display: flex; flex-direction: column; gap: 8px;">
                                ${config.musterPoints.map((m, idx) => `
                                    <div class="mp-item-row" style="display: grid; grid-template-columns: 80px 1fr 70px 70px 40px; gap: 8px; align-items: center; background: #fff; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
                                        <input type="text" class="mp-name" value="${m.name}" style="padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: 800; font-size: 0.8rem;">
                                        <input type="text" class="mp-desc" value="${m.desc}" style="padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.8rem;">
                                        <div><span style="font-size: 0.7rem; color: #64748b;">X:</span> <input type="number" class="mp-x" value="${m.x}" style="width: 45px; padding: 3px; font-size: 0.78rem;"></div>
                                        <div><span style="font-size: 0.7rem; color: #64748b;">Y:</span> <input type="number" class="mp-y" value="${m.y}" style="width: 45px; padding: 3px; font-size: 0.78rem;"></div>
                                        <button type="button" onclick="this.closest('.mp-item-row').remove()" style="background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer; padding: 3px 6px; font-size: 0.75rem;">✕</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- قائمة المباني الرئيسية -->
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
                            <h4 style="margin: 0 0 10px; font-size: 0.95rem; font-weight: 900; color: #1e3a8a; display: flex; align-items: center; gap: 6px;">
                                <i class="fas fa-building"></i> المباني والمرافق المصممة على الخريطة
                            </h4>
                            <div id="buildingsList" style="display: flex; flex-direction: column; gap: 8px;">
                                ${config.buildings.map((b, idx) => `
                                    <div class="bldg-item-row" style="display: grid; grid-template-columns: 140px 1fr 60px 60px 40px; gap: 8px; align-items: center; background: #fff; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
                                        <input type="text" class="bldg-name" value="${b.name}" style="padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: 800; font-size: 0.8rem;">
                                        <input type="text" class="bldg-sub" value="${b.sub || ''}" style="padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.8rem;">
                                        <div><span style="font-size: 0.7rem; color: #64748b;">X:</span> <input type="number" class="bldg-x" value="${b.x}" style="width: 40px; padding: 3px; font-size: 0.78rem;"></div>
                                        <div><span style="font-size: 0.7rem; color: #64748b;">Y:</span> <input type="number" class="bldg-y" value="${b.y}" style="width: 40px; padding: 3px; font-size: 0.78rem;"></div>
                                        <button type="button" onclick="this.closest('.bldg-item-row').remove()" style="background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer; padding: 3px 6px; font-size: 0.75rem;">✕</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div style="background: #f1f5f9; padding: 14px 20px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0;">
                        <button type="button" onclick="GateSecurity.resetMapConfigToDefault()" style="background: #cbd5e1; color: #334155; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">
                            <i class="fas fa-rotate-left"></i> استعادة المخطط الافتراضي
                        </button>

                        <div style="display: flex; gap: 10px;">
                            <button type="button" onclick="document.getElementById('mapEditorModal').remove()" style="background: #ffffff; border: 1.5px solid #cbd5e1; color: #475569; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 0.85rem; cursor: pointer;">إلغاء</button>
                            <button type="button" onclick="GateSecurity.saveEditorMapConfig()" style="background: #15803d; color: #ffffff; border: none; padding: 8px 20px; border-radius: 8px; font-weight: 900; font-size: 0.88rem; cursor: pointer; box-shadow: 0 4px 12px rgba(21,128,61,0.25);">
                                <i class="fas fa-save"></i> حفظ المخطط واعتماده للطباعة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    addEditorMusterPoint() {
        const list = document.getElementById('musterPointsList');
        if (!list) return;
        const count = list.querySelectorAll('.mp-item-row').length + 1;
        const html = `
            <div class="mp-item-row" style="display: grid; grid-template-columns: 80px 1fr 70px 70px 40px; gap: 8px; align-items: center; background: #fff; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
                <input type="text" class="mp-name" value="نقطة ${count}" style="padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: 800; font-size: 0.8rem;">
                <input type="text" class="mp-desc" value="موقع نقطة التجمع الجديدة" style="padding: 4px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 0.8rem;">
                <div><span style="font-size: 0.7rem; color: #64748b;">X:</span> <input type="number" class="mp-x" value="200" style="width: 45px; padding: 3px; font-size: 0.78rem;"></div>
                <div><span style="font-size: 0.7rem; color: #64748b;">Y:</span> <input type="number" class="mp-y" value="200" style="width: 45px; padding: 3px; font-size: 0.78rem;"></div>
                <button type="button" onclick="this.closest('.mp-item-row').remove()" style="background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; border-radius: 4px; cursor: pointer; padding: 3px 6px; font-size: 0.75rem;">✕</button>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', html);
    }

    saveEditorMapConfig() {
        const coords = document.getElementById('editMapCoords').value || '30°24\'12.4"N 31°18\'45.2"E';
        const siteName = document.getElementById('editSiteName').value || 'مجمع مصانع ICAPP';

        const musterPoints = [];
        document.querySelectorAll('#musterPointsList .mp-item-row').forEach((el, idx) => {
            musterPoints.push({
                id: `m${idx + 1}`,
                name: el.querySelector('.mp-name').value || `نقطة ${idx + 1}`,
                desc: el.querySelector('.mp-desc').value || '',
                x: parseInt(el.querySelector('.mp-x').value) || 200,
                y: parseInt(el.querySelector('.mp-y').value) || 200
            });
        });

        const buildings = [];
        document.querySelectorAll('#buildingsList .bldg-item-row').forEach((el, idx) => {
            buildings.push({
                name: el.querySelector('.bldg-name').value || `مبنى ${idx + 1}`,
                sub: el.querySelector('.bldg-sub').value || '',
                x: parseInt(el.querySelector('.bldg-x').value) || 50,
                y: parseInt(el.querySelector('.bldg-y').value) || 50,
                w: 120,
                h: 60,
                fill: '#dbeafe',
                stroke: '#1d4ed8',
                color: '#1e3a8a'
            });
        });

        const config = { coords, siteName, musterPoints, buildings, exits: [{ id: 'e1', name: 'بوابة رئيسية', x: 18, y: 135 }] };
        this.saveMapConfig(config);
        const modal = document.getElementById('mapEditorModal');
        if (modal) modal.remove();
    }

    resetMapConfigToDefault() {
        if (confirm('هل أنت تأكد من استعادة المخطط الهيكلي الافتراضي للخريطة ونقاط التجمع؟')) {
            localStorage.removeItem('icapp_visitor_map_config');
            alert('تم إعادة المخطط الهيكلي للافتراضي.');
            const modal = document.getElementById('mapEditorModal');
            if (modal) modal.remove();
        }
    }

    printMasterVisitorBadges(paramBadgeNo) {
        const portalUrl = this.getGatePortalUrl();
        const mapConfig = this.getMapConfig();
        
        // حساب وتسلسل رقم الكارت المطابق للنظام
        const todayCount = this.visitors.length || 0;
        const defaultSerial = paramBadgeNo || `VIS-${new Date().getFullYear()}-${(todayCount + 1).toString().padStart(3, '0')}`;

        const win = window.open('', '_blank');
        if (!win) {
            alert('يرجى السماح بالنوافذ المنبثقة لطباعة كارت وقواعد السلامة للزائرين (Pop-ups)');
            return;
        }

        // بناء عناصر نقاط التجمع المعتمدة ديناميكياً على خريطة الـ SVG
        const musterPointsSvg = mapConfig.musterPoints.map(m => `
            <g transform="translate(${m.x}, ${m.y})">
                <rect x="-24" y="-14" width="48" height="28" rx="4" fill="#15803d" stroke="#ffffff" stroke-width="1.5"/>
                <text x="0" y="3" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="Segoe UI">${m.name}</text>
            </g>
        `).join('');

        // بناء المباني والمرافق المصممة ديناميكياً
        const buildingsSvg = mapConfig.buildings.map(b => `
            <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="4" fill="${b.fill}" stroke="${b.stroke}" stroke-width="2"/>
            <text x="${b.x + b.w/2}" y="${b.y + b.h/2 - (b.sub ? 6 : 0)}" font-size="11.5" font-weight="900" fill="${b.color}" text-anchor="middle" font-family="Segoe UI">${b.name}</text>
            ${b.sub ? `<text x="${b.x + b.w/2}" y="${b.y + b.h/2 + 12}" font-size="8.5" font-weight="700" fill="${b.stroke}" text-anchor="middle" font-family="Segoe UI">${b.sub}</text>` : ''}
        `).join('');

        win.document.write(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>كارت قواعد السلامة للزائرين ونقاط التجمع - ICAPP Safety Rules & Assembly Points</title>
                <style>
                    @page {
                        size: A4 landscape;
                        margin: 5mm 5mm 5mm 5mm;
                    }
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
                        margin: 0;
                        padding: 6px;
                        direction: rtl;
                        color: #000000;
                        background: #f1f5f9;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .card-container {
                        width: 100%;
                        max-width: 287mm;
                        margin: 0 auto;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 10px;
                        background: #ffffff;
                        border: 2.5px solid #1e3a8a;
                        padding: 8px;
                        min-height: 190mm;
                    }
                    
                    /* ======================================================== */
                    /* الجانب الأيسر: رسم توضيحي لنقاط التجمع (ASSEMBLY POINT) */
                    /* ======================================================== */
                    .left-panel {
                        border: 2px solid #0f172a;
                        border-radius: 4px;
                        padding: 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background: #ffffff;
                    }
                    .left-header {
                        text-align: center;
                        margin-bottom: 6px;
                        border-bottom: 2px solid #0f172a;
                        padding-bottom: 4px;
                    }
                    .left-header h2 {
                        margin: 0;
                        font-size: 18px;
                        font-weight: 900;
                        color: #000000;
                    }
                    .left-header h3 {
                        margin: 1px 0 0;
                        font-size: 13px;
                        font-weight: 800;
                        color: #000000;
                        letter-spacing: 1px;
                    }
                    
                    .map-canvas-container {
                        flex: 1;
                        border: 1.5px dashed #475569;
                        border-radius: 6px;
                        background: #f8fafc;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 8px;
                        min-height: 132mm;
                    }
                    .schematic-map {
                        width: 100%;
                        height: 100%;
                        max-height: 128mm;
                    }
                    .map-legend-bar {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        background: #e2e8f0;
                        border: 1px solid #94a3b8;
                        border-radius: 4px;
                        padding: 4px 8px;
                        font-size: 9px;
                        font-weight: 800;
                        margin-top: 4px;
                        flex-wrap: wrap;
                        gap: 6px;
                    }
                    .legend-item {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    .legend-color {
                        width: 10px;
                        height: 10px;
                        border-radius: 2px;
                    }
                    .site-coordinates-box {
                        font-size: 8.5px;
                        color: #334155;
                        text-align: center;
                        margin-top: 4px;
                        font-weight: 700;
                        direction: ltr;
                    }

                    /* ======================================================== */
                    /* الجانب الأيمن: قواعد السلامة للزائرين (SAFETY RULES VISITORS) */
                    /* ======================================================== */
                    .right-panel {
                        border: 2px solid #1e3a8a;
                        border-radius: 4px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background: #ffffff;
                    }
                    .right-header-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 6px 10px;
                        border-bottom: 2px solid #1e3a8a;
                        background: #ffffff;
                    }
                    .brand-logo-img {
                        max-height: 38px;
                        max-width: 110px;
                        object-fit: contain;
                    }

                    /* الصندوق الأزرق الرئيسي مع الفصل التام RTL / LTR */
                    .blue-priority-banner {
                        background: #1e40af;
                        color: #ffffff;
                        padding: 5px 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .blue-text-ar {
                        text-align: right;
                        direction: rtl;
                        font-size: 10.5px;
                        font-weight: 900;
                        line-height: 1.25;
                        width: 48%;
                    }
                    .blue-text-en {
                        text-align: left;
                        direction: ltr;
                        font-size: 9px;
                        font-weight: 800;
                        line-height: 1.2;
                        width: 48%;
                    }

                    /* قسم حظر التدخين */
                    .smoking-section {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 5px 8px;
                        border-bottom: 1.5px solid #cbd5e1;
                        gap: 6px;
                    }
                    .smoke-ar {
                        font-size: 9.5px;
                        direction: rtl;
                        text-align: right;
                        line-height: 1.25;
                        font-weight: 800;
                        width: 42%;
                        color: #000000;
                    }
                    .smoke-icon-box {
                        width: 44px;
                        height: 44px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .smoke-en {
                        font-size: 8.5px;
                        direction: ltr;
                        text-align: left;
                        line-height: 1.2;
                        font-weight: 700;
                        width: 42%;
                        color: #000000;
                    }

                    /* قواعد السلامة الرئيسية (الأيقونات الدائرية) */
                    .basic-rules-section {
                        padding: 4px 6px;
                        border-bottom: 1.5px solid #cbd5e1;
                    }
                    .basic-rules-header {
                        display: flex;
                        justify-content: space-between;
                        font-size: 10px;
                        font-weight: 900;
                        color: #000000;
                        margin-bottom: 4px;
                        padding: 0 4px;
                    }
                    .rules-icons-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 2px 4px;
                    }
                    .rule-circle-icon {
                        width: 32px;
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    /* شريط سارينة الإنذار الأحمر والخطوات الصفراء الثلاث */
                    .siren-section {
                        border-bottom: 1.5px solid #cbd5e1;
                    }
                    .siren-red-bar {
                        background: #dc2626;
                        color: #ffffff;
                        padding: 4px 8px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 10.5px;
                        font-weight: 900;
                    }
                    .siren-steps-container {
                        background: #facc15;
                        padding: 4px 6px;
                        display: flex;
                        flex-direction: column;
                        gap: 3px;
                    }
                    .siren-step-row {
                        display: grid;
                        grid-template-columns: 1fr 40px 1fr;
                        align-items: center;
                        gap: 4px;
                        background: #eab308;
                        padding: 2px 6px;
                        border-radius: 3px;
                    }
                    .s-text-ar {
                        font-size: 9.5px;
                        font-weight: 900;
                        direction: rtl;
                        text-align: right;
                        color: #000000;
                    }
                    .s-icon-center {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .s-text-en {
                        font-size: 8.5px;
                        font-weight: 800;
                        direction: ltr;
                        text-align: left;
                        color: #000000;
                    }

                    /* قسم مهمات الوقاية الشخصية PPE */
                    .ppe-section {
                        padding: 4px 6px;
                        border-bottom: 1.5px solid #cbd5e1;
                    }
                    .ppe-header-texts {
                        display: flex;
                        justify-content: space-between;
                        font-size: 9px;
                        font-weight: 800;
                        color: #000000;
                        margin-bottom: 4px;
                        padding: 0 2px;
                    }
                    .ppe-icons-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 4px;
                    }
                    .ppe-icon-circle {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: #0f172a;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffffff;
                    }

                    /* فوتر الطوارئ والاتصال */
                    .emergency-footer {
                        padding: 4px 8px 6px;
                        text-align: center;
                    }
                    .emergency-top-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 11px;
                        font-weight: 900;
                        color: #000000;
                        margin-bottom: 2px;
                    }
                    .phone-icons-box {
                        display: flex;
                        gap: 6px;
                    }
                    .phone-pill {
                        width: 24px;
                        height: 24px;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffffff;
                        font-size: 13px;
                    }
                    .emergency-call-line {
                        font-size: 10px;
                        font-weight: 900;
                        color: #000000;
                        margin-top: 2px;
                        direction: rtl;
                    }

                    /* أدوات التحكم العلوية للطباعة والتسلسل */
                    .toolbar-top {
                        background: #ffffff;
                        border: 1px solid #cbd5e1;
                        border-radius: 8px;
                        padding: 8px 14px;
                        margin-bottom: 8px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    @media print {
                        .toolbar-top { display: none !important; }
                        body { padding: 0; background: #ffffff; }
                        .card-container { min-height: 98vh; max-width: 100%; border: 2px solid #1e3a8a; }
                    }
                </style>
            </head>
            <body>
                <div class="toolbar-top">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span style="font-weight: 800; font-size: 12px; color: #1e3a8a;">تسلسل الكارت:</span>
                        <input type="text" id="badgeSerialInput" value="${defaultSerial}" style="padding: 4px 8px; border-radius: 6px; border: 1.5px solid #059669; font-weight: 900; font-size: 12px; color: #047857; width: 140px; font-family: monospace;" oninput="document.getElementById('badgeSerialBox').textContent = 'Badge: ' + this.value">

                        <span style="font-weight: 800; font-size: 12px; color: #1e3a8a; margin-right: 10px;">اختر الموقع:</span>
                        <select id="siteSelect" onchange="updateSiteMap(this.value)" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-weight: 700; font-size: 12px;">
                            <option value="الموقع العام" selected>${mapConfig.siteName}</option>
                            <option value="ICAPP-1">المصنع الرئيسي (ICAPP-1)</option>
                            <option value="ICAPP-2">مصنع التجميد (ICAPP-2)</option>
                            <option value="ICAPP-3">مصنع المركزات (ICAPP-3)</option>
                            <option value="ICAPP-4">محطة المعالجة والطاقة (ICAPP-4)</option>
                        </select>
                    </div>

                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input type="text" id="customCoords" value="${mapConfig.coords}" style="padding: 4px 10px; border-radius: 6px; border: 1.5px solid #cbd5e1; font-size: 11px; width: 220px;" oninput="document.getElementById('displayCoords').textContent = 'إحداثيات الموقع: ' + this.value + ' | DOC-HSE-MAP-01 Rev.02'">
                        <button onclick="window.print()" style="padding: 6px 18px; background: #1e40af; color: #fff; border:none; border-radius:6px; cursor:pointer; font-weight: 900; font-size: 12px; box-shadow: 0 2px 6px rgba(30,64,175,0.25);">🖨️ طباعة الكارت الآن</button>
                    </div>
                </div>

                <div class="card-container">
                    <!-- الجانب الأيسر: رسم توضيحي لنقاط التجمع -->
                    <div class="left-panel">
                        <div class="left-header">
                            <h2>رسم توضيحي لنقاط التجمع</h2>
                            <h3>ASSEMBLY POINT</h3>
                        </div>

                        <div class="map-canvas-container">
                            <svg class="schematic-map" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="10" width="480" height="340" rx="8" fill="#f1f5f9" stroke="#334155" stroke-width="2.5" stroke-dasharray="6,4"/>
                                <rect x="20" y="20" width="460" height="320" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
                                <rect x="35" y="35" width="430" height="290" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>

                                <!-- المباني والمرافق المعتمدة من مدير النظام -->
                                ${buildingsSvg}

                                <!-- مسارات الإخلاء الخضراء -->
                                <path d="M 110 110 L 110 150 L 190 150" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 270 170 L 270 190" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 350 110 L 370 110" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 270 305 L 270 325" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>
                                <path d="M 50 150 L 35 150" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="6,3"/>

                                <!-- نقاط التجمع المصممة ديناميكياً -->
                                ${musterPointsSvg}

                                <!-- البوابات ومخرجات الطوارئ -->
                                <rect x="18" y="135" width="16" height="30" fill="#dc2626" rx="2"/>
                                <text x="26" y="154" font-size="8" font-weight="900" fill="#ffffff" text-anchor="middle" transform="rotate(-90 26 154)" font-family="Segoe UI">بوابة</text>

                                <!-- بوصلة الشمال -->
                                <g transform="translate(450, 45)">
                                    <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
                                    <polygon points="0,-12 4,0 0,-2 -4,0" fill="#dc2626"/>
                                    <polygon points="0,12 4,0 0,2 -4,0" fill="#0f172a"/>
                                    <text x="0" y="-15" font-size="9" font-weight="900" fill="#dc2626" text-anchor="middle">N</text>
                                </g>
                            </svg>
                        </div>

                        <div class="map-legend-bar">
                            <div class="legend-item">
                                <div class="legend-color" style="background: #15803d;"></div>
                                <span>نقطة تجمع (Muster Point)</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background: #16a34a;"></div>
                                <span>مسار الإخلاء الآمن ➔</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background: #dc2626;"></div>
                                <span>بوابات ومخارج الطوارئ</span>
                            </div>
                        </div>

                        <div class="site-coordinates-box" id="displayCoords">
                            إحداثيات الموقع: ${mapConfig.coords} | DOC-HSE-MAP-01 Rev.02
                        </div>
                    </div>

                    <!-- الجانب الأيمن: قواعد السلامة للزائرين -->
                    <div class="right-panel">
                        <!-- ترويسة الكارت مع شعار الشركة والتسلسل -->
                        <div class="right-header-top">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <img src="icons/icapp-logo.png" alt="ICAPP Logo" class="brand-logo-img" onerror="this.src='../icons/icapp-logo.png';">
                                <div style="text-align: right; direction: rtl;">
                                    <div style="font-size: 17px; font-weight: 900; color: #000000;">قواعد السلامة للزائرين</div>
                                    <div style="font-size: 9.5px; font-weight: 800; color: #1e3a8a;">إدارة السلامة والصحة المهنية والأمن</div>
                                </div>
                            </div>
                            <div style="text-align: left; direction: ltr;">
                                <div style="font-size: 13px; font-weight: 900; color: #000000;">SAFETY RULES VISITORS</div>
                                <div id="badgeSerialBox" style="font-size: 11px; font-weight: 900; color: #047857; font-family: monospace; background: #ecfdf5; border: 1.5px solid #a7f3d0; padding: 2px 8px; border-radius: 6px; margin-top: 2px; display: inline-block;">
                                    Badge: ${defaultSerial}
                                </div>
                            </div>
                        </div>

                        <!-- الصندوق الأزرق الرئيسي مع التوجيه المضبوط LTR / RTL -->
                        <div class="blue-priority-banner">
                            <div class="blue-text-ar">
                                <strong>عزيزي الزائر سلامتك تهمنا</strong><br>
                                يرجى إتباع تعليمات السلامة الموضحة
                            </div>
                            <div class="blue-text-en">
                                <strong>YOUR SAFETY IS OF OUR PRIORITY</strong><br>
                                All visitors are kindly requested to follow the safety instructions here
                            </div>
                        </div>

                        <!-- قسم التدخين -->
                        <div class="smoking-section">
                            <div class="smoke-ar">
                                التدخين غير مسموح به نهائياً داخل أماكن العمل بإستثناء الأماكن المخصصة والتي تم تجهيزها لذلك.
                            </div>
                            <div class="smoke-icon-box">
                                <svg width="40" height="40" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#dc2626" stroke-width="8"/>
                                    <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" stroke-width="8"/>
                                    <rect x="25" y="45" width="40" height="10" fill="#ffffff" stroke="#000" stroke-width="1.5"/>
                                    <rect x="25" y="45" width="12" height="10" fill="#f59e0b"/>
                                    <path d="M 68 43 Q 72 38 76 43 T 80 43" fill="none" stroke="#64748b" stroke-width="2"/>
                                    <path d="M 70 57 Q 74 52 78 57 T 82 57" fill="none" stroke="#64748b" stroke-width="2"/>
                                </svg>
                            </div>
                            <div class="smoke-en">
                                Smoking is prohibited throughout the plant premises except in specially dedicated and adapted areas.
                            </div>
                        </div>

                        <!-- قواعد السلامة الرئيسية 7 أيقونات دائرية -->
                        <div class="basic-rules-section">
                            <div class="basic-rules-header">
                                <span style="direction: rtl; text-align: right;">قواعد السلامة الرئيسية</span>
                                <span style="direction: ltr; text-align: left;">SAFETY BASIC RULES</span>
                            </div>

                            <div class="rules-icons-row">
                                <!-- ممر مشاة -->
                                <div class="rule-circle-icon" title="Pedestrian Walkway">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="46" fill="#1d4ed8"/>
                                        <circle cx="50" cy="30" r="7" fill="#ffffff"/>
                                        <path d="M 45 42 L 55 42 L 58 60 L 65 75 L 58 75 L 53 62 L 48 75 L 42 75 L 47 56 L 40 60 Z" fill="#ffffff"/>
                                    </svg>
                                </div>
                                <!-- كلاركات -->
                                <div class="rule-circle-icon" title="Forklift Caution">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <polygon points="50,15 88,80 12,80" fill="#facc15" stroke="#000" stroke-width="4"/>
                                        <rect x="35" y="55" width="25" height="15" fill="#000"/>
                                        <circle cx="42" cy="72" r="4" fill="#000"/>
                                        <circle cx="56" cy="72" r="4" fill="#000"/>
                                        <line x1="65" y1="45" x2="65" y2="72" stroke="#000" stroke-width="3"/>
                                        <line x1="65" y1="70" x2="75" y2="70" stroke="#000" stroke-width="3"/>
                                    </svg>
                                </div>
                                <!-- سرعة 20 -->
                                <div class="rule-circle-icon" title="Speed Limit 20">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <text x="50" y="52" font-size="28" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">20</text>
                                        <text x="50" y="68" font-size="14" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">km/h</text>
                                    </svg>
                                </div>
                                <!-- أسلحة وأدوات حادة -->
                                <div class="rule-circle-icon" title="No Weapons">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <path d="M 35 65 L 65 35 L 70 40 L 40 70 Z" fill="#000"/>
                                    </svg>
                                </div>
                                <!-- تصوير -->
                                <div class="rule-circle-icon" title="No Photography">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <rect x="30" y="40" width="40" height="28" rx="4" fill="#000"/>
                                        <circle cx="50" cy="54" r="8" fill="#fff"/>
                                        <rect x="42" y="34" width="16" height="6" fill="#000"/>
                                    </svg>
                                </div>
                                <!-- كحوليات -->
                                <div class="rule-circle-icon" title="No Alcohol">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <path d="M 40 35 L 60 35 L 53 52 L 53 68 L 62 68 L 62 72 L 38 72 L 38 68 L 47 68 L 47 52 Z" fill="#000"/>
                                    </svg>
                                </div>
                                <!-- 18 ممنوع -->
                                <div class="rule-circle-icon" title="No Minors">
                                    <svg width="30" height="30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#dc2626" stroke-width="9"/>
                                        <line x1="19" y1="19" x2="81" y2="81" stroke="#dc2626" stroke-width="9"/>
                                        <text x="50" y="60" font-size="34" font-weight="900" fill="#000" text-anchor="middle" font-family="Arial">18</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- في حالة سماع سارينة الإنذار -->
                        <div class="siren-section">
                            <div class="siren-red-bar">
                                <span style="direction: rtl; text-align: right;">في حالة سماع سارينة الإنذار :</span>
                                <span style="direction: ltr; text-align: left;">When you hear the emergency siren:</span>
                            </div>

                            <div class="siren-steps-container">
                                <div class="siren-step-row">
                                    <div class="s-text-ar">١- اتبع تعليمات المرافق لك أو رئيس القسم</div>
                                    <div class="s-icon-center">
                                        <svg width="26" height="26" viewBox="0 0 100 100">
                                            <rect width="100" height="100" fill="#dc2626" rx="6"/>
                                            <circle cx="50" cy="50" r="16" fill="#ffffff"/>
                                            <path d="M 28 35 A 25 25 0 0 1 28 65" fill="none" stroke="#ffffff" stroke-width="6"/>
                                            <path d="M 72 35 A 25 25 0 0 0 72 65" fill="none" stroke="#ffffff" stroke-width="6"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-en">1- Follow your escort's instructions</div>
                                </div>

                                <div class="siren-step-row">
                                    <div class="s-text-ar">٢- إتجه إلى أقرب باب خروج</div>
                                    <div class="s-icon-center">
                                        <svg width="34" height="26" viewBox="0 0 140 100">
                                            <rect width="140" height="100" fill="#15803d" rx="6"/>
                                            <path d="M 35 50 L 15 50 L 25 35 M 15 50 L 25 65" stroke="#ffffff" stroke-width="7" fill="none"/>
                                            <circle cx="70" cy="30" r="9" fill="#ffffff"/>
                                            <path d="M 60 45 L 80 45 L 85 65 L 95 85 L 85 85 L 75 68 L 65 85 L 55 85 L 68 60 L 58 55 Z" fill="#ffffff"/>
                                            <rect x="100" y="20" width="25" height="60" fill="none" stroke="#ffffff" stroke-width="6"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-en">2- Go to the nearest exit door</div>
                                </div>

                                <div class="siren-step-row">
                                    <div class="s-text-ar">٣- إتجه إلى أقرب نقطة تجمع</div>
                                    <div class="s-icon-center">
                                        <svg width="26" height="26" viewBox="0 0 100 100">
                                            <rect width="100" height="100" fill="#15803d" rx="6"/>
                                            <circle cx="50" cy="38" r="7" fill="#ffffff"/>
                                            <path d="M 42 50 L 58 50 L 58 68 L 42 68 Z" fill="#ffffff"/>
                                            <path d="M 20 20 L 35 35 M 35 20 L 35 35 L 20 35" stroke="#ffffff" stroke-width="5" fill="none"/>
                                            <path d="M 80 20 L 65 35 M 65 20 L 65 35 L 80 35" stroke="#ffffff" stroke-width="5" fill="none"/>
                                            <path d="M 20 80 L 35 65 M 35 80 L 35 65 L 20 65" stroke="#ffffff" stroke-width="5" fill="none"/>
                                            <path d="M 80 80 L 65 65 M 65 80 L 65 65 L 80 65" stroke="#ffffff" stroke-width="5" fill="none"/>
                                        </svg>
                                    </div>
                                    <div class="s-text-en">3- Go to the nearest assembly point</div>
                                </div>
                            </div>
                        </div>

                        <!-- مهمات الوقاية الشخصية PPE -->
                        <div class="ppe-section">
                            <div class="ppe-header-texts">
                                <span style="direction: rtl; text-align: right;">يجب الإلتزام بإرتداء ملابس ومهمات الوقاية المناسبة لأماكن الزيارة</span>
                                <span style="direction: ltr; text-align: left;">Use personal protective equipment suitable to the area you enter</span>
                            </div>

                            <div class="ppe-icons-row">
                                <div class="ppe-icon-circle" title="Safety Boots">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 35 25 L 55 25 L 55 55 L 75 65 L 75 75 L 30 75 L 30 35 Z" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Safety Helmet">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 25 60 Q 25 25 50 25 Q 75 25 75 60 Z" fill="#fff"/>
                                        <rect x="18" y="58" width="64" height="8" rx="3" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Ear Protection">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 25 55 Q 25 20 50 20 Q 75 20 75 55" fill="none" stroke="#fff" stroke-width="6"/>
                                        <rect x="20" y="50" width="12" height="22" rx="4" fill="#fff"/>
                                        <rect x="68" y="50" width="12" height="22" rx="4" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Dust Mask">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 25 45 Q 50 35 75 45 L 68 70 Q 50 80 32 70 Z" fill="#fff"/>
                                        <line x1="25" y1="45" x2="10" y2="35" stroke="#fff" stroke-width="5"/>
                                        <line x1="75" y1="45" x2="90" y2="35" stroke="#fff" stroke-width="5"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Safety Gloves">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <path d="M 35 75 L 35 45 Q 35 38 42 38 Q 48 38 48 45 L 48 35 Q 48 28 55 28 Q 62 28 62 35 L 62 45 Q 62 38 68 38 Q 75 38 75 45 L 75 75 Z" fill="#fff"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Face Shield">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <circle cx="50" cy="40" r="18" fill="#fff"/>
                                        <path d="M 30 30 Q 50 20 70 30 L 70 65 Q 50 85 30 65 Z" fill="none" stroke="#fff" stroke-width="6"/>
                                    </svg>
                                </div>
                                <div class="ppe-icon-circle" title="Safety Glasses">
                                    <svg width="20" height="20" viewBox="0 0 100 100">
                                        <circle cx="32" cy="50" r="16" fill="none" stroke="#fff" stroke-width="6"/>
                                        <circle cx="68" cy="50" r="16" fill="none" stroke="#fff" stroke-width="6"/>
                                        <line x1="48" y1="50" x2="52" y2="50" stroke="#fff" stroke-width="6"/>
                                        <line x1="16" y1="50" x2="5" y2="40" stroke="#fff" stroke-width="6"/>
                                        <line x1="84" y1="50" x2="95" y2="40" stroke="#fff" stroke-width="6"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- فوتر الطوارئ -->
                        <div class="emergency-footer">
                            <div class="emergency-top-row">
                                <span style="direction: rtl; text-align: right;">طوارئ المصنع</span>
                                <div class="phone-icons-box">
                                    <div class="phone-pill" style="background: #dc2626;">📞</div>
                                    <div class="phone-pill" style="background: #16a34a;">📱</div>
                                </div>
                                <span style="direction: ltr; text-align: left;">Emergency call</span>
                            </div>
                            <div class="emergency-call-line">
                                في حالة الطوارئ يرجى الإتصال على رقم: <strong>0100000000 / داخلي: 100</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <script>
                    function updateSiteMap(site) {
                        const coordsMap = {
                            'ICAPP-1': '30°24\\'12.4"N 31°18\\'45.2"E - مصنع 1 الفاكهة',
                            'ICAPP-2': '30°24\\'14.1"N 31°18\\'48.6"E - مصنع 2 التجميد',
                            'ICAPP-3': '30°24\\'15.8"N 31°18\\'50.1"E - مصنع 3 المركزات',
                            'ICAPP-4': '30°24\\'10.2"N 31°18\\'42.5"E - محطة المعالجة والطاقة',
                            'WH': '30°24\\'18.0"N 31°18\\'52.3"E - المخازن العامة',
                            'المبنى الإداري': '30°24\\'08.5"N 31°18\\'40.1"E - الإدارة العامة',
                            'الموقع العام': '${mapConfig.coords}'
                        };
                        const c = coordsMap[site] || '${mapConfig.coords}';
                        document.getElementById('customCoords').value = c;
                        document.getElementById('displayCoords').textContent = 'إحداثيات الموقع: ' + c + ' | DOC-HSE-MAP-01 Rev.02';
                    }
                </script>
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
