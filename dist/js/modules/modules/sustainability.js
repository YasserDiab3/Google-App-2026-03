const Sustainability={currentTab:"dashboard",currentWasteSubTab:"regular",dashboardYear:new Date().getFullYear(),settings:{consumptionLimits:{water:1e4,electricity:5e4,gas:3e4},alertThreshold:1.2},renderIdentityStyles_(){return`
            <style id="sustainability-professional-identity-styles">
                .sustainability-workspace {
                    --sus-forest: #123f35;
                    --sus-forest-2: #195849;
                    --sus-leaf: #24866f;
                    --sus-mint: #5fd0ad;
                    --sus-gold: #d4a936;
                    --sus-water: #1976b9;
                    --sus-power: #b77905;
                    --sus-gas: #c45124;
                    --sus-waste: #258454;
                    --sus-ink: #17322d;
                    --sus-muted: #607a73;
                    --sus-line: #d5e5df;
                    --sus-surface: #ffffff;
                    --sus-soft: #f3f8f6;
                    position: relative;
                    min-width: 0;
                    color: var(--sus-ink);
                    isolation: isolate;
                }
                .sustainability-workspace *,
                .sustainability-workspace *::before,
                .sustainability-workspace *::after { box-sizing: border-box; }
                .sustainability-workspace .sustainability-hero-header {
                    position: relative;
                    overflow: hidden;
                    margin: 0 !important;
                    padding: clamp(19px,2.3vw,29px) !important;
                    border: 1px solid rgba(255,255,255,.12) !important;
                    border-radius: 19px !important;
                    background:
                        radial-gradient(circle at 14% 10%,rgba(95,208,173,.2),transparent 30%),
                        linear-gradient(125deg,#0d332b 0%,var(--sus-forest) 52%,#1b6653 100%) !important;
                    color: #fff;
                    box-shadow: 0 16px 38px rgba(18,63,53,.2);
                }
                .sustainability-workspace .sustainability-hero-header::after {
                    content: "";
                    position: absolute;
                    inset-block: -72px;
                    inset-inline-end: -44px;
                    width: 225px;
                    border: 1px solid rgba(255,255,255,.13);
                    border-radius: 48% 52% 44% 56%;
                    transform: rotate(-18deg);
                    pointer-events: none;
                }
                .sustainability-workspace .sustainability-hero-main {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .sustainability-workspace .sustainability-hero-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 56px;
                    width: 56px;
                    height: 56px;
                    border: 1px solid rgba(255,255,255,.22);
                    border-radius: 17px 17px 17px 5px;
                    background: rgba(255,255,255,.12);
                    color: #a7f3d0;
                    font-size: 1.4rem;
                    box-shadow: inset 0 1px rgba(255,255,255,.2);
                }
                .sustainability-workspace .sustainability-hero-header .section-title {
                    margin: 0 0 5px !important;
                    color: #fff !important;
                    font-size: clamp(1.25rem,2vw,1.72rem) !important;
                    font-weight: 900 !important;
                    letter-spacing: -.02em;
                }
                .sustainability-workspace .sustainability-hero-header .section-subtitle {
                    margin: 0 !important;
                    color: rgba(255,255,255,.74) !important;
                    font-size: .84rem;
                    line-height: 1.7;
                }
                .sustainability-workspace #sustainability-year-toolbar-wrap { margin: 14px 0 !important; }
                .sustainability-workspace #sustainability-year-toolbar-wrap > div {
                    border: 1px solid #cbe1da !important;
                    border-radius: 15px !important;
                    background: linear-gradient(110deg,#eaf6f1,#fff 72%) !important;
                    color: var(--sus-ink) !important;
                    box-shadow: 0 7px 19px rgba(18,63,53,.065) !important;
                }
                .sustainability-workspace #sustainability-year-toolbar-wrap .bg-emerald-600 {
                    background: var(--sus-leaf) !important;
                    color: #fff !important;
                }
                .sustainability-workspace #sustainability-year-toolbar-wrap .text-gray-900,
                .sustainability-workspace #sustainability-year-toolbar-wrap .text-gray-700 { color: var(--sus-ink) !important; }
                .sustainability-workspace #sustainability-year-toolbar-wrap .text-gray-600 { color: var(--sus-muted) !important; }
                .sustainability-workspace #sustainability-quick-stats {
                    display: grid;
                    grid-template-columns: repeat(4,minmax(0,1fr));
                    gap: 13px !important;
                    margin: 0 0 18px !important;
                }
                .sustainability-workspace #sustainability-quick-stats > div {
                    position: relative;
                    overflow: hidden;
                    min-height: 112px;
                    padding: 16px !important;
                    border: 1px solid var(--sus-line) !important;
                    border-radius: 15px !important;
                    background: linear-gradient(145deg,#fff,#f6faf8) !important;
                    color: var(--sus-ink) !important;
                    text-align: start !important;
                    box-shadow: 0 9px 23px rgba(18,63,53,.075);
                }
                .sustainability-workspace #sustainability-quick-stats > div::before {
                    content: "";
                    position: absolute;
                    inset-block: 13px;
                    inset-inline-start: 0;
                    width: 4px;
                    border-radius: 0 8px 8px 0;
                    background: var(--stat-color,var(--sus-leaf));
                }
                .sustainability-workspace #sustainability-quick-stats > div:nth-child(1) { --stat-color: var(--sus-water); }
                .sustainability-workspace #sustainability-quick-stats > div:nth-child(2) { --stat-color: var(--sus-power); }
                .sustainability-workspace #sustainability-quick-stats > div:nth-child(3) { --stat-color: var(--sus-gas); }
                .sustainability-workspace #sustainability-quick-stats > div:nth-child(4) { --stat-color: var(--sus-waste); }
                .sustainability-workspace #sustainability-quick-stats .text-gray-700,
                .sustainability-workspace #sustainability-quick-stats .text-gray-500 { color: var(--sus-muted) !important; }
                .sustainability-workspace .sustainability-tabs-shell {
                    position: relative;
                    margin: 0 0 18px;
                    padding: 8px;
                    border: 1px solid rgba(255,255,255,.1);
                    border-radius: 16px;
                    background: linear-gradient(115deg,var(--sus-forest),var(--sus-forest-2));
                    box-shadow: 0 11px 27px rgba(18,63,53,.15);
                }
                .sustainability-workspace .sustainability-tabs-nav {
                    display: flex;
                    align-items: center;
                    flex-wrap: nowrap !important;
                    gap: 7px !important;
                    margin: 0 !important;
                    padding: 0 0 2px !important;
                    overflow-x: auto;
                    border: 0 !important;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,.38) transparent;
                    overscroll-behavior-inline: contain;
                }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 auto;
                    gap: 8px;
                    min-width: max-content;
                    min-height: 47px;
                    margin: 0 !important;
                    padding: 9px 14px !important;
                    border: 1px solid rgba(255,255,255,.13) !important;
                    border-radius: 11px !important;
                    background: rgba(255,255,255,.07) !important;
                    color: rgba(255,255,255,.82) !important;
                    font-size: .78rem !important;
                    font-weight: 800 !important;
                    white-space: nowrap;
                    box-shadow: none !important;
                    transition: transform .18s ease,background-color .18s ease,color .18s ease;
                }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn i {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 29px;
                    height: 29px;
                    margin: 0 !important;
                    border-radius: 8px;
                    background: rgba(255,255,255,.12);
                    color: #a7f3d0;
                    font-size: .77rem;
                }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn[data-tab="water"] i { color: #bae6fd; }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn[data-tab="electricity"] i { color: #fde68a; }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn[data-tab="gas"] i { color: #fed7aa; }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn[data-tab="waste-management"] i { color: #bbf7d0; }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn[data-tab="settings"] i { color: #ddd6fe; }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn:hover {
                    background: rgba(255,255,255,.15) !important;
                    color: #fff !important;
                    transform: translateY(-1px);
                }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn.active {
                    border-color: #fff !important;
                    background: #fff !important;
                    color: var(--sus-forest) !important;
                    box-shadow: 0 8px 20px rgba(0,0,0,.17) !important;
                }
                .sustainability-workspace .sustainability-tabs-nav > .tab-btn.active i {
                    background: #e6f5ef;
                    color: var(--sus-leaf);
                }
                .sustainability-workspace .sustainability-tabs-nav .sustainability-admin-tools {
                    display: inline-flex;
                    flex: 0 0 auto;
                    margin: 0 !important;
                    padding-inline-start: 8px;
                    border-inline-start: 1px solid rgba(255,255,255,.18);
                }
                .sustainability-workspace .sustainability-tabs-nav .sustainability-admin-tools button,
                .sustainability-workspace .sustainability-tabs-nav .sustainability-refresh-btn {
                    flex: 0 0 auto;
                    min-height: 39px;
                    margin: 0 !important;
                    border: 1px solid rgba(255,255,255,.18) !important;
                    border-radius: 10px !important;
                    background: rgba(255,255,255,.1) !important;
                    color: #fff !important;
                    font-size: .72rem;
                    font-weight: 750;
                    box-shadow: none !important;
                }
                .sustainability-workspace .sustainability-tab-content {
                    min-width: 0;
                    animation: sustainabilitySurfaceIn .24s ease-out;
                }
                @keyframes sustainabilitySurfaceIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: none; }
                }
                .sustainability-workspace .sustainability-tab-content .content-card {
                    overflow: hidden;
                    min-width: 0;
                    border: 1px solid var(--sus-line) !important;
                    border-radius: 15px !important;
                    background: var(--sus-surface) !important;
                    color: var(--sus-ink) !important;
                    box-shadow: 0 9px 25px rgba(18,63,53,.075) !important;
                    transform: none !important;
                }
                .sustainability-workspace .sustainability-tab-content .content-card:hover {
                    box-shadow: 0 12px 29px rgba(18,63,53,.1) !important;
                    transform: none !important;
                }
                .sustainability-workspace .sustainability-tab-content .card-header {
                    position: relative;
                    padding: 16px 18px !important;
                    border-bottom: 1px solid #d9e8e2 !important;
                    background: linear-gradient(115deg,#eaf5f1,#fff 68%,#f7fbf9) !important;
                    color: var(--sus-forest) !important;
                }
                .sustainability-workspace .sustainability-tab-content .card-header::before {
                    content: "";
                    position: absolute;
                    inset-block: 0;
                    inset-inline-start: 0;
                    width: 5px;
                    background: linear-gradient(var(--tab-accent-1,var(--sus-mint)),var(--tab-accent-2,var(--sus-leaf)));
                }
                .sustainability-workspace .sustainability-tab-content[data-tab="water"] { --tab-accent-1:#38bdf8;--tab-accent-2:#1976b9; }
                .sustainability-workspace .sustainability-tab-content[data-tab="electricity"] { --tab-accent-1:#facc15;--tab-accent-2:#b77905; }
                .sustainability-workspace .sustainability-tab-content[data-tab="gas"] { --tab-accent-1:#fb923c;--tab-accent-2:#c45124; }
                .sustainability-workspace .sustainability-tab-content[data-tab="waste-management"] { --tab-accent-1:#4ade80;--tab-accent-2:#258454; }
                .sustainability-workspace .sustainability-tab-content[data-tab="settings"] { --tab-accent-1:#a78bfa;--tab-accent-2:#6d28d9; }
                .sustainability-workspace .sustainability-tab-content .card-title {
                    color: var(--sus-forest) !important;
                    font-size: .98rem !important;
                    font-weight: 900 !important;
                    line-height: 1.55;
                }
                .sustainability-workspace .sustainability-tab-content .card-body { color: var(--sus-ink); }
                .sustainability-workspace .sustainability-tab-content .text-gray-900,
                .sustainability-workspace .sustainability-tab-content .text-gray-800,
                .sustainability-workspace .sustainability-tab-content .text-gray-700 { color: var(--sus-ink) !important; }
                .sustainability-workspace .sustainability-tab-content .text-gray-600,
                .sustainability-workspace .sustainability-tab-content .text-gray-500 { color: var(--sus-muted) !important; }
                .sustainability-workspace .sustainability-tab-content .form-input,
                .sustainability-workspace .sustainability-tab-content input:not([type="checkbox"]):not([type="radio"]):not([type="file"]),
                .sustainability-workspace .sustainability-tab-content select,
                .sustainability-workspace .sustainability-tab-content textarea {
                    min-height: 40px;
                    border-color: #c5d9d2 !important;
                    border-radius: 10px !important;
                    background: #fff !important;
                    color: #18332e !important;
                }
                .sustainability-workspace .sustainability-tab-content .form-input:focus,
                .sustainability-workspace .sustainability-tab-content input:not([type="checkbox"]):not([type="radio"]):not([type="file"]):focus,
                .sustainability-workspace .sustainability-tab-content select:focus,
                .sustainability-workspace .sustainability-tab-content textarea:focus {
                    border-color: var(--sus-leaf) !important;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(36,134,111,.13) !important;
                }
                .sustainability-workspace .sustainability-tab-content .overflow-x-auto,
                .sustainability-workspace .sustainability-tab-content .table-wrapper,
                .sustainability-workspace .sustainability-tab-content .table-responsive {
                    max-width: 100%;
                    overflow-x: auto !important;
                    border-radius: 12px;
                    scrollbar-width: thin;
                    scrollbar-color: #80a99e #edf5f2;
                }
                .sustainability-workspace .sustainability-tab-content table {
                    width: 100%;
                    margin: 0;
                    border: 0 !important;
                    border-collapse: separate !important;
                    border-spacing: 0;
                    color: var(--sus-ink);
                    font-size: .77rem;
                }
                .sustainability-workspace .sustainability-tab-content table thead th {
                    position: sticky;
                    top: 0;
                    z-index: 3;
                    padding: 12px 11px !important;
                    border: 0 !important;
                    border-inline-end: 1px solid rgba(255,255,255,.1) !important;
                    border-bottom: 3px solid var(--sus-gold) !important;
                    border-radius: 0 !important;
                    background: linear-gradient(var(--sus-forest-2),var(--sus-forest)) !important;
                    color: #fff !important;
                    font-size: .72rem !important;
                    font-weight: 850 !important;
                    line-height: 1.5;
                    text-align: center !important;
                    white-space: nowrap;
                }
                .sustainability-workspace .sustainability-tab-content table tbody td {
                    padding: 10px 11px !important;
                    border: 0 !important;
                    border-inline-end: 1px solid #edf3f1 !important;
                    border-bottom: 1px solid #e3eeea !important;
                    background: #fff;
                    color: var(--sus-ink) !important;
                    line-height: 1.6;
                    vertical-align: middle;
                }
                .sustainability-workspace .sustainability-tab-content table tbody tr:nth-child(even) td { background: #f7fbf9; }
                .sustainability-workspace .sustainability-tab-content table tbody tr:hover td { background: #fff9e8 !important; }
                .sustainability-workspace .sustainability-tab-content table button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 34px;
                    min-height: 34px;
                    border-radius: 9px !important;
                }
                .sustainability-workspace .sustainability-tab-content canvas { max-width: 100% !important; }
                .sustainability-workspace .sustainability-tab-content[data-tab="waste-management"] > .space-y-6 > .grid:first-child > div {
                    border: 1px solid var(--sus-line) !important;
                    border-radius: 14px !important;
                    background: #fff !important;
                    color: var(--sus-ink) !important;
                    box-shadow: 0 8px 20px rgba(18,63,53,.07);
                }
                .sustainability-workspace .sustainability-tab-content .tab-btn-internal {
                    min-height: 40px;
                    padding: 8px 14px !important;
                    border: 1px solid #cfe0da !important;
                    border-radius: 10px !important;
                    background: #fff !important;
                    color: var(--sus-muted) !important;
                    font-weight: 750 !important;
                    white-space: nowrap;
                }
                .sustainability-workspace .sustainability-tab-content .tab-btn-internal.active {
                    border-color: var(--sus-leaf) !important;
                    background: #e8f6f1 !important;
                    color: var(--sus-forest) !important;
                    box-shadow: inset 0 -3px var(--sus-leaf);
                }
                [data-theme="dark"] .sustainability-workspace {
                    --sus-ink:#e4efeb;
                    --sus-muted:#abc0b9;
                    --sus-line:#385c52;
                    --sus-surface:#142923;
                    --sus-soft:#10231e;
                }
                [data-theme="dark"] .sustainability-workspace #sustainability-year-toolbar-wrap > div,
                [data-theme="dark"] .sustainability-workspace #sustainability-quick-stats > div,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .content-card,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .card-header,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content[data-tab="waste-management"] > .space-y-6 > .grid:first-child > div {
                    border-color: var(--sus-line) !important;
                    background: #142923 !important;
                    color: #e4efeb !important;
                }
                [data-theme="dark"] .sustainability-workspace #sustainability-year-toolbar-wrap .text-gray-900,
                [data-theme="dark"] .sustainability-workspace #sustainability-year-toolbar-wrap .text-gray-700,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .card-title,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .text-gray-900,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .text-gray-800,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .text-gray-700 { color:#e4efeb !important; }
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content table tbody td { border-color:#2f4c44 !important;background:#142923;color:#e4efeb !important; }
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content table tbody tr:nth-child(even) td { background:#19322b; }
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content table tbody tr:hover td { background:#3b422d !important; }
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .form-input,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content input:not([type="checkbox"]):not([type="radio"]):not([type="file"]),
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content select,
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content textarea { border-color:#46685e !important;background:#0f211c !important;color:#e4efeb !important; }
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .tab-btn-internal { border-color:#46685e !important;background:#142923 !important;color:#b8cbc5 !important; }
                [data-theme="dark"] .sustainability-workspace .sustainability-tab-content .tab-btn-internal.active { border-color:#5fd0ad !important;background:#20473c !important;color:#d7fff2 !important; }
                @media (max-width: 1050px) {
                    .sustainability-workspace #sustainability-quick-stats { grid-template-columns: repeat(2,minmax(0,1fr)); }
                }
                @media (max-width: 820px) {
                    .sustainability-workspace .sustainability-hero-header { padding:18px !important;border-radius:15px !important; }
                    .sustainability-workspace .sustainability-tabs-shell { padding:6px;border-radius:14px; }
                    .sustainability-workspace .sustainability-tabs-nav > .tab-btn { min-height:43px;padding:8px 11px !important;font-size:.74rem !important; }
                    .sustainability-workspace .sustainability-tabs-nav > .tab-btn i { width:26px;height:26px; }
                    .sustainability-workspace .sustainability-tab-content .card-header > div { align-items:stretch !important;flex-direction:column !important; }
                    .sustainability-workspace .sustainability-tab-content .card-header input,
                    .sustainability-workspace .sustainability-tab-content .card-header select,
                    .sustainability-workspace .sustainability-tab-content .card-header button { width:100% !important;max-width:none !important; }
                    .sustainability-workspace .sustainability-tab-content table { min-width:680px; }
                    .sustainability-workspace .sustainability-tab-content .md\\:grid-cols-4,
                    .sustainability-workspace .sustainability-tab-content .md\\:grid-cols-3 { grid-template-columns:repeat(2,minmax(0,1fr)) !important; }
                }
                @media (max-width: 560px) {
                    .sustainability-workspace .sustainability-hero-icon { flex-basis:47px;width:47px;height:47px; }
                    .sustainability-workspace .sustainability-hero-header::after { display:none; }
                    .sustainability-workspace #sustainability-year-toolbar-wrap > div > div { align-items:stretch !important;flex-direction:column !important; }
                    .sustainability-workspace #sustainability-year-toolbar-wrap select { width:100% !important; }
                    .sustainability-workspace #sustainability-quick-stats { grid-template-columns:1fr; }
                    .sustainability-workspace .sustainability-tab-content .md\\:grid-cols-4,
                    .sustainability-workspace .sustainability-tab-content .md\\:grid-cols-3,
                    .sustainability-workspace .sustainability-tab-content .md\\:grid-cols-2 { grid-template-columns:1fr !important; }
                    .sustainability-workspace .sustainability-tab-content .card-body { padding:12px !important; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .sustainability-workspace *,
                    .sustainability-workspace *::before,
                    .sustainability-workspace *::after { animation:none !important;transition:none !important; }
                }
            </style>
        `},hasFullSustainabilityManage(){if(typeof AppState>"u"||!AppState.currentUser)return!1;const t=AppState.currentUser;if(t.role==="admin"||t.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")return!0;if(typeof Permissions<"u"){if(Permissions.isCurrentUserEffectiveAdmin(t))return!0;const a=Permissions.getEffectivePermissions(t);if(a.__isAdmin||a.admin===!0||a["sustainability-manage"]===!0)return!0;const e=Permissions.getAllowedDetailedPermissions("sustainability");return Array.isArray(e)&&e.includes("full-manage")}return!1},canRegisterResourceConsumption(){if(typeof AppState>"u"||!AppState.currentUser||typeof Permissions<"u"&&!Permissions.hasAccess("sustainability"))return!1;if(this.hasFullSustainabilityManage())return!0;if(typeof Permissions<"u"){const t=Permissions.getAllowedDetailedPermissions("sustainability");return Array.isArray(t)&&t.includes("consumption-register")}return!1},canViewSustainabilityConsumptionUi(){return this.canRegisterResourceConsumption()},isAdmin(){return this.hasFullSustainabilityManage()},canEdit(){return this.hasFullSustainabilityManage()},canDelete(){return this.hasFullSustainabilityManage()},canManageSettings(){return this.hasFullSustainabilityManage()},getSustainabilityYearOptions(){const t=new Set,a=new Date().getFullYear();for(let e=-3;e<=1;e++)t.add(a+e);return["water","electricity","gas"].forEach(e=>{(AppState.appData.resourceConsumption?.[e]||[]).forEach(s=>{const i=new Date(s?.date);if(!Number.isNaN(i.getTime())){const n=i.getFullYear();n>2e3&&n<2100&&t.add(n)}})}),Array.from(t).sort((e,s)=>s-e)},ensureDashboardYearInRange(){const t=this.getSustainabilityYearOptions();if(!t.length){this.dashboardYear=new Date().getFullYear();return}t.includes(this.dashboardYear)||(this.dashboardYear=t.includes(new Date().getFullYear())?new Date().getFullYear():t[0])},filterResourceRowsByYear(t,a){const e=Number(a);return Number.isFinite(e)?(t||[]).filter(s=>{const i=new Date(s?.date);return!Number.isNaN(i.getTime())&&i.getFullYear()===e}):t||[]},getViewFilteredConsumption(){const t=AppState.appData.resourceConsumption||{water:[],electricity:[],gas:[]},a=Number(this.dashboardYear)||new Date().getFullYear();return{year:a,water:this.filterResourceRowsByYear(t.water,a),electricity:this.filterResourceRowsByYear(t.electricity,a),gas:this.filterResourceRowsByYear(t.gas,a)}},renderYearFilterToolbarHtml(){return this.canRegisterResourceConsumption()&&["dashboard","water","electricity","gas"].includes(this.currentTab)?(this.ensureDashboardYearInRange(),`
            <div id="sustainability-year-toolbar-wrap" class="mt-4 mb-2">
                <div class="rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 bg-gradient-to-l from-emerald-50/90 via-white to-white dark:from-emerald-950/40 dark:via-gray-900 dark:to-gray-900 shadow-sm">
                    <div class="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
                        <div class="flex items-start gap-3 min-w-0 flex-1">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                                <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                            </div>
                            <div class="min-w-0">
                                <div class="text-sm font-bold text-gray-900 dark:text-gray-100">\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0633\u0646\u0629</div>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                                    \u0639\u0631\u0636 \u0645\u0624\u0634\u0631\u0627\u062A \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u060C \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629\u060C \u0648\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0633\u062A\u0647\u0644\u0627\u0643\u0627\u064B \u0648\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0644\u0644\u0633\u0646\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u2014 \u0628\u0646\u0641\u0633 \u0623\u0633\u0644\u0648\u0628 \u0644\u0648\u062D\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629.
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 shrink-0">
                            <label for="sustainability-dashboard-year" class="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">\u0627\u0644\u0633\u0646\u0629</label>
                            <select id="sustainability-dashboard-year" class="form-input !w-auto min-w-[132px] rounded-xl border-gray-200 dark:border-gray-600 shadow-sm focus:ring-emerald-500 focus:border-emerald-500" title="\u0627\u062E\u062A\u0631 \u0633\u0646\u0629 \u0627\u0644\u0639\u0631\u0636">
                                ${this.getSustainabilityYearOptions().map(s=>`<option value="${s}" ${s===this.dashboardYear?"selected":""}>${s}</option>`).join("")}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `):""},refreshConsumptionYearView(){this.ensureDashboardYearInRange();const t=document.getElementById("sustainability-quick-stats");t&&(t.innerHTML=this.renderQuickStats());const a=document.getElementById("sustainability-dashboard-year");a&&String(a.value)!==String(this.dashboardYear)&&(a.value=String(this.dashboardYear));const e=document.getElementById("sustainability-content");!e||!document.getElementById("sustainability-section")||Promise.resolve(this.renderContent()).then(s=>{e.innerHTML=s,this.currentTab==="dashboard"&&setTimeout(()=>this.renderCharts(),280)}).catch(s=>Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0639\u0631\u0636 \u0627\u0644\u0633\u0646\u0629:",s))},isSystemAdmin(){if(typeof AppState>"u"||!AppState.currentUser)return!1;const t=AppState.currentUser;if(String(t.role||"").trim().toLowerCase()==="admin"||t.role==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645")return!0;if(typeof Permissions<"u"){if(Permissions.isCurrentUserEffectiveAdmin(t))return!0;const e=Permissions.getEffectivePermissions(t);if(e&&(e.__isAdmin===!0||e.admin===!0))return!0}return!1},renderAdminImportExportToolbarHtml(){return this.isSystemAdmin()?`
            <div class="inline-flex flex-wrap items-center gap-2 sustainability-admin-tools mr-2 md:mr-3" id="sustainability-admin-tools-wrap">
                <button type="button" class="btn btn-secondary" id="sustainability-excel-import-open-btn" title="\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel">
                    <i class="fas fa-file-excel ml-2"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel
                </button>
                <button type="button" class="btn btn-secondary" id="sustainability-export-pdf-btn" title="\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PDF">
                    <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                </button>
            </div>
        `:""},showExcelImportModal(){if(!this.isSystemAdmin())return;try{document.getElementById("sustainability-excel-import-modal")?.remove()}catch{}const t=document.createElement("div");t.className="modal-overlay",t.id="sustainability-excel-import-modal",t.innerHTML=`
            <div class="modal-content" style="max-width: 480px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2 text-green-600"></i>\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 Excel</h2>
                    <button type="button" class="modal-close sustainability-excel-modal-close" aria-label="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body space-y-4">
                    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        \u062D\u0645\u0651\u0644 \u0627\u0644\u0642\u0627\u0644\u0628 \u0623\u0648\u0644\u0627\u064B\u060C \u0639\u0628\u0651\u0626 \u0627\u0644\u0635\u0641\u0648\u0641 \u0648\u0641\u0642 \u0627\u0644\u0623\u0639\u0645\u062F\u0629\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0644\u0641 \u0628\u0635\u064A\u063A\u0629 .xlsx \u0623\u0648 .xls. \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0633\u0645\u0648\u062D\u0629 \u0641\u064A \u0639\u0645\u0648\u062F \u0646\u0648\u0639_\u0627\u0644\u0645\u0648\u0627\u0631\u062F: <strong>water</strong> \u0623\u0648 <strong>electricity</strong> \u0623\u0648 <strong>gas</strong> (\u0623\u0648 \u0627\u0644\u0645\u0643\u0627\u0641\u0626 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629).
                    </p>
                    <input type="file" id="sustainability-modal-excel-file-input" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" class="hidden" tabindex="-1" aria-hidden="true">
                    <div class="flex flex-col sm:flex-row gap-2 flex-wrap">
                        <button type="button" id="sustainability-modal-download-template" class="btn-secondary flex-1 min-w-[10rem]">
                            <i class="fas fa-download ml-2"></i>\u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0644\u0628 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F
                        </button>
                        <button type="button" id="sustainability-modal-pick-file" class="btn-primary flex-1 min-w-[10rem]">
                            <i class="fas fa-folder-open ml-2"></i>\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 Excel
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary sustainability-excel-modal-close">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(t);const a=()=>{try{t.remove()}catch{}};t.querySelectorAll(".sustainability-excel-modal-close").forEach(s=>s.addEventListener("click",a)),t.addEventListener("click",s=>{s.target===t&&a()});const e=t.querySelector("#sustainability-modal-excel-file-input");t.querySelector("#sustainability-modal-download-template").addEventListener("click",()=>this.downloadExcelImportTemplate()),t.querySelector("#sustainability-modal-pick-file").addEventListener("click",()=>e?.click()),e&&e.addEventListener("change",async()=>{const s=e.files&&e.files[0];if(e.value="",!!s){a(),typeof Loading<"u"&&Loading.show("\u062C\u0627\u0631\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel...");try{await this.importResourceConsumptionFromExcelFile(s)}finally{typeof Loading<"u"&&Loading.hide()}}})},async ensureSheetJS(){if(!(typeof XLSX<"u")){if(this._sheetJsPromise){await this._sheetJsPromise;return}this._sheetJsPromise=new Promise((t,a)=>{const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",e.onload=()=>t(),e.onerror=()=>{const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",s.onload=()=>t(),s.onerror=()=>{this._sheetJsPromise=null,a(new Error("\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 Excel"))},document.head.appendChild(s)},document.head.appendChild(e)}),await this._sheetJsPromise}},downloadExcelImportTemplate(){this.ensureSheetJS().then(()=>{const t=["\u0646\u0648\u0639_\u0627\u0644\u0645\u0648\u0627\u0631\u062F","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0645\u0648\u0642\u0639_\u0627\u0644\u0645\u0635\u0646\u0639","\u0627\u0644\u0645\u0635\u062F\u0631","\u0642\u0631\u0627\u0621\u0629_\u0627\u0644\u0628\u062F\u0627\u064A\u0629","\u0642\u0631\u0627\u0621\u0629_\u0627\u0644\u0646\u0647\u0627\u064A\u0629","\u0648\u062D\u062F\u0629_\u0627\u0644\u0642\u064A\u0627\u0633","\u0627\u0644\u0642\u0633\u0645","\u0645\u0644\u0627\u062D\u0638\u0627\u062A"],a={\u0646\u0648\u0639_\u0627\u0644\u0645\u0648\u0627\u0631\u062F:"water",\u0627\u0644\u062A\u0627\u0631\u064A\u062E:new Date().toISOString().slice(0,10),\u0627\u0644\u0645\u0648\u0642\u0639_\u0627\u0644\u0645\u0635\u0646\u0639:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0635\u0646\u0639 \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639 \u0643\u0645\u0627 \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",\u0627\u0644\u0645\u0635\u062F\u0631:"\u0645\u064A\u0627\u0647",\u0642\u0631\u0627\u0621\u0629_\u0627\u0644\u0628\u062F\u0627\u064A\u0629:0,\u0642\u0631\u0627\u0621\u0629_\u0627\u0644\u0646\u0647\u0627\u064A\u0629:100,\u0648\u062D\u062F\u0629_\u0627\u0644\u0642\u064A\u0627\u0633:"\u0645\xB3",\u0627\u0644\u0642\u0633\u0645:"",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:"\u0623\u062F\u062E\u0644 water \u0623\u0648 electricity \u0623\u0648 gas \u0641\u064A \u0639\u0645\u0648\u062F \u0646\u0648\u0639_\u0627\u0644\u0645\u0648\u0627\u0631\u062F"},e=XLSX.utils.book_new(),s=XLSX.utils.json_to_sheet([a],{header:t});XLSX.utils.book_append_sheet(e,s,"\u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F"),XLSX.writeFile(e,`\u0642\u0627\u0644\u0628_\u0627\u0633\u062A\u064A\u0631\u0627\u062F_\u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629_${new Date().toISOString().slice(0,10)}.xlsx`),typeof Notification<"u"&&Notification.success("\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u0642\u0627\u0644\u0628")}).catch(t=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 Excel:",t),typeof Notification<"u"&&Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u0643\u062A\u0628\u0629 Excel \u0644\u0644\u0642\u0627\u0644\u0628")})},_parseResourceTypeFromExcelCell(t){const a=String(t??"").trim().toLowerCase();return a?["water","w","\u0645\u064A\u0627\u0647","water_management"].includes(a)?"water":["electricity","electric","e","elc","\u0643\u0647\u0631\u0628\u0627\u0621"].includes(a)?"electricity":["gas","g","\u063A\u0627\u0632","\u063A\u0627\u0632 \u0637\u0628\u064A\u0639\u064A","natural gas","natural_gas"].includes(a)?"gas":null:null},_normalizeExcelRowKeys(t){const a={},e={\u0646\u0648\u0639_\u0627\u0644\u0645\u0648\u0627\u0631\u062F:"type",resource_type:"type",\u0646\u0648\u0639:"type",type:"type",\u0627\u0644\u062A\u0627\u0631\u064A\u062E:"date",date:"date",\u0627\u0644\u0645\u0648\u0642\u0639_\u0627\u0644\u0645\u0635\u0646\u0639:"location",location:"location",\u0645\u0648\u0642\u0639:"location",\u0627\u0644\u0645\u0635\u0646\u0639:"location",\u0627\u0644\u0645\u0635\u062F\u0631:"source",source:"source",\u0642\u0631\u0627\u0621\u0629_\u0627\u0644\u0628\u062F\u0627\u064A\u0629:"startReading",start_reading:"startReading",\u0628\u062F\u0627\u064A\u0629:"startReading",\u0642\u0631\u0627\u0621\u0629_\u0627\u0644\u0646\u0647\u0627\u064A\u0629:"endReading",end_reading:"endReading",\u0646\u0647\u0627\u064A\u0629:"endReading",\u0625\u062C\u0645\u0627\u0644\u064A_\u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643:"totalConsumption",total:"totalConsumption",\u0648\u062D\u062F\u0629_\u0627\u0644\u0642\u064A\u0627\u0633:"unit",unit:"unit",\u0627\u0644\u0642\u0633\u0645:"department",department:"department",\u062C\u0647\u0629:"department",\u0645\u0644\u0627\u062D\u0638\u0627\u062A:"notes",notes:"notes"};return Object.keys(t||{}).forEach(s=>{const i=String(s||"").trim(),n=e[i]||e[i.replace(/\s+/g,"_")]||i;a[n]=t[s]}),a},async importResourceConsumptionFromExcelFile(t){if(!this.isSystemAdmin()){typeof Notification<"u"&&Notification.error("\u063A\u064A\u0631 \u0645\u0635\u0631\u0651\u062D");return}if(!t)return;await this.ensureSheetJS();const a=await t.arrayBuffer(),e=XLSX.read(a,{type:"array"}),s=e.SheetNames[0],i=e.Sheets[s],n=XLSX.utils.sheet_to_json(i,{defval:""});if(!n.length){typeof Notification<"u"&&Notification.warning("\u0627\u0644\u0645\u0644\u0641 \u0641\u0627\u0631\u063A \u0623\u0648 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0635\u0641\u0648\u0641\u0627\u064B");return}AppState.appData.resourceConsumption||(AppState.appData.resourceConsumption={water:[],electricity:[],gas:[]}),["water","electricity","gas"].forEach(c=>{Array.isArray(AppState.appData.resourceConsumption[c])||(AppState.appData.resourceConsumption[c]=[])});let l=0,r=0;const o=[],d={water:[],electricity:[],gas:[]};if(n.forEach((c,m)=>{const b=this._normalizeExcelRowKeys(c),u=this._parseResourceTypeFromExcelCell(b.type),f=b.date!=null&&b.date!==""?String(b.date).trim():"",y=b.location!=null?String(b.location).trim():"";if(!u||!f||!y){r++,o.push(`\u0635\u0641 ${m+2}: \u0646\u0642\u0635 \u0641\u064A \u0627\u0644\u0646\u0648\u0639 \u0623\u0648 \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0623\u0648 \u0627\u0644\u0645\u0648\u0642\u0639`);return}let p=new Date(f);if(isNaN(p.getTime())){r++,o.push(`\u0635\u0641 ${m+2}: \u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u0627\u0644\u062D`);return}const k=parseFloat(b.startReading),h=parseFloat(b.endReading);if(!Number.isFinite(k)||!Number.isFinite(h)){r++,o.push(`\u0635\u0641 ${m+2}: \u0642\u0631\u0627\u0621\u0627\u062A \u063A\u064A\u0631 \u0631\u0642\u0645\u064A\u0629`);return}if(h<k){r++,o.push(`\u0635\u0641 ${m+2}: \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629`);return}let S=parseFloat(b.totalConsumption);Number.isFinite(S)||(S=h-k);const x=String(b.unit||this.getDefaultUnit(u)).trim()||this.getDefaultUnit(u),v=String(b.source||this.getTypeName(u)).trim()||this.getTypeName(u),w=b.department!=null?String(b.department).trim():"",$=b.notes!=null?String(b.notes).trim():"",D=this.getMonthYear(p),T=Utils.generateId(u.toUpperCase().substring(0,3)),R=this.generateSerialNumber(u),W=this.checkConsumptionAlert(u,S,D),M={id:T,serialNumber:R,date:p.toISOString(),monthYear:D,location:y,source:v,startReading:k,endReading:h,totalConsumption:S,unit:x,department:w,notes:$,hasAlert:W,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.email||AppState.currentUser?.name||"System",updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"System"};AppState.appData.resourceConsumption[u].push(M),d[u].push(M.id),l++}),l===0){typeof Notification<"u"&&(Notification.warning("\u0644\u0645 \u064A\u064F\u0633\u062A\u0648\u0631\u062F \u0623\u064A \u0635\u0641 \u0635\u0627\u0644\u062D."+(r?` \u062A\u062E\u0637\u0651\u064A ${r} \u0635\u0641\u064B\u0627.`:"")),o.length&&o.length<=8?o.forEach(c=>Notification.warning(c)):o.length>8&&Notification.warning("\u0631\u0627\u062C\u0639 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A."));return}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const g=await this.saveResourceConsumptionToSheets();if(!g.success){["water","electricity","gas"].forEach(c=>{const m=new Set(d[c]||[]);!m.size||!Array.isArray(AppState.appData.resourceConsumption[c])||(AppState.appData.resourceConsumption[c]=AppState.appData.resourceConsumption[c].filter(b=>!m.has(b.id)))}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),typeof Notification<"u"&&(Notification.error("\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645 \u2014 \u0644\u0645 \u062A\u064F\u0633\u062C\u0651\u064E\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0634\u064A\u062A. "+(g.message||g.error||"")),o.length&&o.length<=8&&o.forEach(c=>Notification.warning(c))),await this.loadResourceConsumptionFromSheets().catch(()=>{}),this.load();return}typeof Notification<"u"&&(Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${l} \u0633\u062C\u0644\u064B\u0627 \u0648\u062D\u0641\u0638\u0647\u0627 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645${r?` \u2014 \u062A\u062E\u0637\u0651\u064A ${r}`:""}`),o.length&&o.length<=8?o.forEach(c=>Notification.warning(c)):o.length>8&&Notification.warning("\u0628\u0639\u0636 \u0627\u0644\u0635\u0641\u0648\u0641 \u0644\u0645 \u062A\u064F\u0633\u062A\u0648\u0631\u062F \u2014 \u0631\u0627\u062C\u0639 \u0627\u0644\u0642\u0627\u0644\u0628 \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")),await this.loadResourceConsumptionFromSheets().catch(()=>{}),this.load()},exportSustainabilityPdfReport(){if(!this.isSystemAdmin()){typeof Notification<"u"&&Notification.error("\u063A\u064A\u0631 \u0645\u0635\u0631\u0651\u062D");return}if(!Sustainability._pdfExportInProgress){Sustainability._pdfExportInProgress=!0;try{typeof Loading<"u"&&Loading.show("\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 PDF...");const t=h=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(h??"")):String(h??""),a=h=>{try{return Utils.formatDate?Utils.formatDate(h):String(h||"")}catch{return String(h||"")}},e=this.getViewFilteredConsumption(),s={water:e.water,electricity:e.electricity,gas:e.gas},i=e.year,n=[{key:"water",label:"\u0627\u0644\u0645\u064A\u0627\u0647"},{key:"electricity",label:"\u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621"},{key:"gas",label:"\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0637\u0628\u064A\u0639\u064A"}];let l="";n.forEach(({key:h,label:S})=>{const x=Array.isArray(s[h])?s[h]:[];l+=`<h2 style="margin-top:1.25em;margin-bottom:10px;font-size:15px;font-weight:700;color:#0f172a;border-bottom:2px solid #003865;padding-bottom:8px;">\u0633\u062C\u0644\u0627\u062A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u2014 ${t(S)} \u2014 \u0633\u0646\u0629 ${i} <span style="color:#64748b;font-weight:600;">(${x.length})</span></h2>`,l+='<table class="report-table" style="width:100%;font-size:12px;margin-bottom:14px;"><thead><tr>',["\u0627\u0644\u0631\u0642\u0645","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0628\u062F\u0627\u064A\u0629","\u0627\u0644\u0646\u0647\u0627\u064A\u0629","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0627\u0644\u0648\u062D\u062F\u0629","\u0627\u0644\u0642\u0633\u0645"].forEach(v=>{l+=`<th style="padding:8px;text-align:right;">${t(v)}</th>`}),l+="</tr></thead><tbody>",x.slice().sort((v,w)=>new Date(w.date)-new Date(v.date)).slice(0,500).forEach(v=>{l+="<tr>",[v.serialNumber||v.id,a(v.date),v.location,v.startReading,v.endReading,v.totalConsumption,v.unit,v.department||"-"].forEach(w=>{l+=`<td style="padding:6px;text-align:right;">${t(w)}</td>`}),l+="</tr>"}),l+="</tbody></table>",x.length>500&&(l+='<p style="font-size:11px;color:#64748b;margin-bottom:12px;">\u0639\u0631\u0636 \u0623\u062D\u062F\u062B 500 \u0633\u062C\u0644 \u0644\u0643\u0644 \u0646\u0648\u0639 \u0636\u0645\u0646 \u0627\u0644\u062A\u0635\u062F\u064A\u0631.</p>')});const r=AppState.appData.wasteManagement;if(r&&this.hasFullSustainabilityManage()){const h=(r.regularWasteRecords||[]).length,S=(r.hazardousWasteRecords||[]).length,x=(r.regularWasteSales||[]).length;l+='<h2 style="margin-top:1.25em;margin-bottom:10px;font-size:15px;font-weight:700;color:#0f172a;border-bottom:2px solid #003865;padding-bottom:8px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A</h2>',l+=`<p style="font-size:13px;line-height:1.7;color:#334155;">\u0633\u062C\u0644\u0627\u062A \u0639\u0627\u062F\u064A\u0629: <strong>${h}</strong> | \u062E\u0637\u0631\u0629: <strong>${S}</strong> | \u0645\u0628\u064A\u0639\u0627\u062A: <strong>${x}</strong></p>`}const o=`\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u2014 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F (${i})`,d=new Date;let g="";try{g=typeof Utils<"u"&&Utils.formatDateTime?Utils.formatDateTime(d,"ar-EG"):d.toLocaleString("ar-SA")}catch{g=d.toLocaleString("ar-SA")}const c=`
                <div style="margin-bottom:18px;padding:14px 16px;border-radius:14px;background:linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.06));border:1px solid rgba(16,185,129,0.3);">
                    <p style="margin:0;font-size:13px;line-height:1.85;color:#0f172a;">
                        \u064A\u062A\u0636\u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0633\u062C\u0644\u0627\u062A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u064A\u0626\u064A\u0629 (\u0645\u064A\u0627\u0647\u060C \u0643\u0647\u0631\u0628\u0627\u0621\u060C \u063A\u0627\u0632 \u0637\u0628\u064A\u0639\u064A) \u0644\u0644\u0633\u0646\u0629 <strong>${t(String(i))}</strong>
                        ${this.hasFullSustainabilityManage()?" \u0645\u0639 \u0645\u0644\u062E\u0635 \u0625\u062D\u0635\u0627\u0626\u064A \u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A.":"."}
                        \u0627\u0633\u062A\u062E\u062F\u0645 \xAB\u0637\u0628\u0627\u0639\u0629\xBB \u062B\u0645 \xAB\u062D\u0641\u0638 \u0643\u0640 PDF\xBB \u0645\u0646 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629.
                    </p>
                </div>
                ${l}`;let m;typeof PDFTemplates<"u"&&PDFTemplates.buildDocument?m=PDFTemplates.buildDocument({title:o,formCode:"SUST-ENV-RC",content:c,createdAt:d,updatedAt:d,meta:{"\u0633\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631":String(i),"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631":g,"\u0645\u0635\u062F\u0631 \u0627\u0644\u062A\u0642\u0631\u064A\u0631":"\u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629"},includeQRCode:!0,qrData:`HSE Sustainability | ResourceConsumption | Year:${i} | ${d.toISOString()}`}):(Utils.safeWarn("PDFTemplates \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u2014 \u062A\u0635\u062F\u064A\u0631 PDF \u0628\u0642\u0627\u0644\u0628 \u0645\u0628\u0633\u0651\u0637"),m=`<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8">
<style>
body{font-family:Tahoma,Arial,sans-serif;padding:16px;color:#111;}
h1{font-size:18px;margin:0 0 12px;}
table{font-family:inherit;}
@media print { body { padding: 0; } }
</style><title>${t(o)}</title></head><body>
<h1>${t(o)}</h1>
<p style="font-size:12px;color:#444;margin-bottom:16px;">\u0633\u0646\u0629 \u0627\u0644\u062A\u0642\u0631\u064A\u0631: <strong>${i}</strong> \u2014 \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631: ${t(g)}</p>
${c}
</body></html>`);const b=new Blob([m],{type:"text/html;charset=utf-8"}),u=URL.createObjectURL(b),y=window.open(u,"hse_sustainability_pdf_export");let p=!1;const k=()=>{if(!(p||!y||y.closed)){p=!0;try{y.focus(),y.print()}catch{}setTimeout(()=>{try{URL.revokeObjectURL(u)}catch{}typeof Loading<"u"&&Loading.hide(),typeof Notification<"u"&&Notification.success("\u0627\u0633\u062A\u062E\u062F\u0645 \xAB\u062D\u0641\u0638 \u0643\u0640 PDF\xBB \u0645\u0646 \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0625\u0646 \u0644\u0632\u0645")},400)}};if(y)y.onload=()=>k(),setTimeout(()=>{!p&&y.document&&y.document.readyState==="complete"&&k()},500);else{try{URL.revokeObjectURL(u)}catch{}typeof Loading<"u"&&Loading.hide(),typeof Notification<"u"&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0639\u0631\u0636 PDF")}}catch(t){typeof Loading<"u"&&Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u062A\u0635\u062F\u064A\u0631 PDF \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629:",t),typeof Notification<"u"&&Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 PDF: "+(t.message||""))}finally{setTimeout(()=>{Sustainability._pdfExportInProgress=!1},1200)}}},bindAdminImportExportToolbar(){this.isSystemAdmin()&&(Sustainability._adminToolbarDocDelegateBound||(Sustainability._adminToolbarDocDelegateBound=!0,document.addEventListener("click",t=>{if(t.target.closest&&t.target.closest("#sustainability-excel-import-open-btn")){t.preventDefault(),Sustainability.showExcelImportModal();return}t.target.closest&&t.target.closest("#sustainability-export-pdf-btn")&&(t.preventDefault(),Sustainability.exportSustainabilityPdfReport())})))},_resolveSitesFromHierarchy(){try{if(typeof Permissions<"u"&&Permissions.formSettingsState&&Array.isArray(Permissions.formSettingsState.sites)&&Permissions.formSettingsState.sites.length>0)return Permissions.formSettingsState.sites;if(typeof AppState<"u"&&Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0)return AppState.appData.observationSites;if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES))return DailyObservations.DEFAULT_SITES}catch{}return[]},getSiteOptions(){try{return this._resolveSitesFromHierarchy().map((a,e)=>({id:a.id||a.siteId||Utils.generateId("SITE"),name:a.name||a.title||a.label||`\u0645\u0648\u0642\u0639 ${e+1}`}))}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639:",t),[]}},async ensureObservationSitesForForms(){try{if(this.getSiteOptions().length>0)return;typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function"&&await Permissions.ensureFormSettingsState(!0)}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062C\u0644\u0628 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0644\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629:",t)}},refreshSiteDropdowns(){try{const t=document.getElementById("sustainability-section");if(!t||!String(t.innerHTML||"").trim())return;this.load()}catch{}},_onFormSettingsUpdatedForSustainability(){this._formSettingsReloadTimer&&clearTimeout(this._formSettingsReloadTimer),this._formSettingsReloadTimer=setTimeout(()=>{this._formSettingsReloadTimer=null;const t=document.getElementById("sustainability-section");!t||!t.isConnected||String(t.innerHTML||"").trim()&&this.load()},40)},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{typeof AppState<"u"&&AppState._languageRefresh||this.load()}),this._languageChangeListenerAdded=!0),this._formSettingsSitesListenerAdded||(typeof window<"u"&&window.addEventListener&&window.addEventListener("formSettingsUpdated",()=>this._onFormSettingsUpdatedForSustainability()),this._formSettingsSitesListenerAdded=!0);const t=document.getElementById("sustainability-section");if(t){if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}await this.ensureObservationSitesForForms(),this.loadSettings(),!this.hasFullSustainabilityManage()&&(this.currentTab==="waste-management"||this.currentTab==="settings")&&(this.currentTab="dashboard"),!this.canRegisterResourceConsumption()&&["dashboard","water","electricity","gas"].includes(this.currentTab)&&(this.currentTab="dashboard"),AppState.appData.resourceConsumption||(AppState.appData.resourceConsumption={water:[],electricity:[],gas:[]}),AppState.appData.wasteManagement||(AppState.appData.wasteManagement={regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]}),this.loadResourceConsumptionFromSheets().catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0645\u0646 Google Sheets:",a)}),this.loadWasteManagementFromSheets().catch(a=>{Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0645\u0646 Google Sheets:",a)});try{t.innerHTML=`
                ${this.renderIdentityStyles_()}
                <div class="sustainability-workspace">
                <div class="section-header sustainability-hero-header">
                    <div class="sustainability-hero-main">
                        <span class="sustainability-hero-icon" aria-hidden="true"><i class="fas fa-leaf"></i></span>
                        <div>
                            <h1 class="section-title">\u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629</h1>
                            <p class="section-subtitle">\u0625\u062F\u0627\u0631\u0629 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u064A\u0626\u064A\u0629 (\u0645\u064A\u0627\u0647\u060C \u0643\u0647\u0631\u0628\u0627\u0621\u060C \u063A\u0627\u0632 \u0637\u0628\u064A\u0639\u064A)</p>
                        </div>
                    </div>
                </div>
                
                ${this.renderYearFilterToolbarHtml()}
                
                <!-- \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 -->
                <div id="sustainability-quick-stats" class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    ${this.renderQuickStats()}
                </div>

                <!-- \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A -->
                <div class="mt-6">
                    <div class="sustainability-tabs-shell">
                    <div class="flex gap-2 mb-6 border-b overflow-x-auto items-center flex-wrap sustainability-tabs-nav" role="tablist" aria-label="\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629">
                        ${this.canRegisterResourceConsumption()?`
                        <button class="tab-btn ${this.currentTab==="dashboard"?"active":""}" role="tab" aria-selected="${this.currentTab==="dashboard"?"true":"false"}" data-tab="dashboard">
                            <i class="fas fa-chart-line ml-2"></i>\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644
                        </button>
                        <button class="tab-btn ${this.currentTab==="water"?"active":""}" role="tab" aria-selected="${this.currentTab==="water"?"true":"false"}" data-tab="water">
                            <i class="fas fa-tint ml-2"></i>\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u064A\u0627\u0647
                        </button>
                        <button class="tab-btn ${this.currentTab==="electricity"?"active":""}" role="tab" aria-selected="${this.currentTab==="electricity"?"true":"false"}" data-tab="electricity">
                            <i class="fas fa-bolt ml-2"></i>\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621
                        </button>
                        <button class="tab-btn ${this.currentTab==="gas"?"active":""}" role="tab" aria-selected="${this.currentTab==="gas"?"true":"false"}" data-tab="gas">
                            <i class="fas fa-fire ml-2"></i>\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0637\u0628\u064A\u0639\u064A
                        </button>
                        `:`
                        <span class="text-sm text-gray-500 dark:text-gray-400 px-2 py-2">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0648\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643. \u064A\u0637\u0644\u0628 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0645\u0646\u062D \xAB\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F\xBB \u0623\u0648 \xAB\u0625\u062F\u0627\u0631\u0629 \u0643\u0627\u0645\u0644\u0629\xBB \u0645\u0646 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629 \u0644\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629.</span>
                        `}
                        ${this.hasFullSustainabilityManage()?`
                        <button class="tab-btn ${this.currentTab==="waste-management"?"active":""}" role="tab" aria-selected="${this.currentTab==="waste-management"?"true":"false"}" data-tab="waste-management">
                            <i class="fas fa-recycle ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A
                        </button>
                        <button class="tab-btn ${this.currentTab==="settings"?"active":""}" role="tab" aria-selected="${this.currentTab==="settings"?"true":"false"}" data-tab="settings">
                            <i class="fas fa-cog ml-2"></i>\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                        </button>
                        `:""}
                        ${this.renderAdminImportExportToolbarHtml()}
                        <button type="button" class="btn btn-secondary sustainability-refresh-btn ml-4" id="sustainability-refresh-btn" data-action="refresh" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 \u0627\u0644\u0645\u0635\u062F\u0631">
                            <i class="fas fa-sync-alt ml-2"></i>\u062A\u062D\u062F\u064A\u062B
                        </button>
                    </div>
                    </div>
                    <div id="sustainability-content" class="sustainability-tab-content" data-tab="${this.currentTab}">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <div style="width: 300px; margin: 0 auto 16px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `,this.setupEventListeners(),setTimeout(async()=>{try{const a=document.getElementById("sustainability-content");if(!a)return;const e=await this.renderContent().catch(s=>(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649:",s),`
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                        <button onclick="Sustainability.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `));a.innerHTML=e,this.currentTab==="dashboard"&&(this.renderCharts(),setTimeout(()=>{const s=document.getElementById("sustainability-quick-stats");s&&(s.innerHTML=this.renderQuickStats())},100))}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u062A\u0648\u0649:",a)}},0)}catch(a){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629:",a),t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Sustainability.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `)}}},renderQuickStats(){if(!this.canRegisterResourceConsumption())return`
                <div class="md:col-span-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4 text-center text-sm text-gray-700 dark:text-gray-300">
                    \u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0645\u0644\u062E\u0635 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643. \u0627\u0637\u0644\u0628 \u0645\u0646 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0645\u0646\u062D \u0635\u0644\u0627\u062D\u064A\u0629 \u0645\u0646\u0627\u0633\u0628\u0629 \u0636\u0645\u0646 \xAB\u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629\xBB (\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644).
                </div>
            `;const{water:t,electricity:a,gas:e,year:s}=this.getViewFilteredConsumption(),i=this.getLatestMonthlyConsumption(t),n=this.getLatestMonthlyConsumption(a),l=this.getLatestMonthlyConsumption(e),r=i.total,o=n.total,d=l.total,g=this.getTrend(t,"water"),c=this.getTrend(a,"electricity"),m=this.getTrend(e,"gas");return`
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">${r.toFixed(2)}</div>
                <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    <i class="fas fa-tint ml-1"></i>\u0645\u064A\u0627\u0647 (\u0645\xB3)
                </div>
                <div class="text-xs mt-1 ${g==="up"?"text-red-600":g==="down"?"text-green-600":"text-gray-500"}">
                    ${g==="up"?"\u2191":g==="down"?"\u2193":"\u2192"} ${this.getTrendText(g)}
                </div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-2 font-medium">\u0633\u0646\u0629 ${s}</div>
            </div>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">${o.toFixed(2)}</div>
                <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    <i class="fas fa-bolt ml-1"></i>\u0643\u0647\u0631\u0628\u0627\u0621 (\u0643.\u0648)
                </div>
                <div class="text-xs mt-1 ${c==="up"?"text-red-600":c==="down"?"text-green-600":"text-gray-500"}">
                    ${c==="up"?"\u2191":c==="down"?"\u2193":"\u2192"} ${this.getTrendText(c)}
                </div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-2 font-medium">\u0633\u0646\u0629 ${s}</div>
            </div>
            <div class="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">${d.toFixed(2)}</div>
                <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    <i class="fas fa-fire ml-1"></i>\u063A\u0627\u0632 (\u0645\xB3)
                </div>
                <div class="text-xs mt-1 ${m==="up"?"text-red-600":m==="down"?"text-green-600":"text-gray-500"}">
                    ${m==="up"?"\u2191":m==="down"?"\u2193":"\u2192"} ${this.getTrendText(m)}
                </div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-2 font-medium">\u0633\u0646\u0629 ${s}</div>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer" onclick="Sustainability.currentTab='dashboard'; Sustainability.load();">
                <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ${this.getTotalAlerts()}
                </div>
                <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    <i class="fas fa-exclamation-triangle ml-1"></i>\u062A\u0646\u0628\u064A\u0647\u0627\u062A
                </div>
                <div class="text-[11px] text-gray-500 dark:text-gray-400 mt-2 font-medium">\u0633\u0646\u0629 ${s}</div>
            </div>
        `},setupEventListeners(){setTimeout(()=>{this._sustainabilityYearFilterDelegateBound||(this._sustainabilityYearFilterDelegateBound=!0,document.addEventListener("change",e=>{const s=e.target;if(!s||s.id!=="sustainability-dashboard-year"||typeof AppState<"u"&&AppState.currentSection!=="sustainability")return;const i=Number(s.value);!Number.isFinite(i)||i<1990||i>2100||(this.dashboardYear=i,this.refreshConsumptionYearView())})),document.querySelectorAll("#sustainability-section .tab-btn").forEach(e=>{e.addEventListener("click",()=>{const s=e.getAttribute("data-tab");if((s==="waste-management"||s==="settings")&&!this.hasFullSustainabilityManage()){typeof Notification<"u"&&Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645");return}if((s==="dashboard"||s==="water"||s==="electricity"||s==="gas")&&!this.canRegisterResourceConsumption()){typeof Notification<"u"&&Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0639\u0631\u0636 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643");return}this.currentTab=s,this.load()})});const a=document.getElementById("sustainability-refresh-btn");a&&a.addEventListener("click",()=>this.handleRefresh()),this.bindAdminImportExportToolbar()},100)},async handleRefresh(){const t=document.getElementById("sustainability-refresh-btn");if(!t)return;const a=t.querySelector("i.fa-sync-alt");t.disabled=!0,a&&a.classList.add("fa-spin");try{await Promise.all([this.loadResourceConsumptionFromSheets(),this.loadWasteManagementFromSheets()]),await this.load()}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629:",e)}finally{t.disabled=!1,a&&a.classList.remove("fa-spin")}},async renderContent(){let t="";switch(this.currentTab){case"dashboard":return this.canRegisterResourceConsumption()?(t=await this.renderDashboard(),setTimeout(()=>{this.renderCharts()},300),t):`
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <p class="text-gray-600 dark:text-gray-400">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0644\u064A\u0644. \u064A\u0637\u0644\u0628 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0645\u0646\u062D \xAB\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F\xBB \u0623\u0648 \xAB\u0625\u062F\u0627\u0631\u0629 \u0643\u0627\u0645\u0644\u0629\xBB \u0636\u0645\u0646 \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A\u0629.</p>
                                </div>
                            </div>
                        </div>
                    `;case"water":return this.canRegisterResourceConsumption()?await this.renderResourceRegister("water","\u0645\u064A\u0627\u0647","tint","blue"):'<div class="content-card"><div class="card-body"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645.</p></div></div>';case"electricity":return this.canRegisterResourceConsumption()?await this.renderResourceRegister("electricity","\u0643\u0647\u0631\u0628\u0627\u0621","bolt","yellow"):'<div class="content-card"><div class="card-body"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645.</p></div></div>';case"gas":return this.canRegisterResourceConsumption()?await this.renderResourceRegister("gas","\u063A\u0627\u0632 \u0637\u0628\u064A\u0639\u064A","fire","orange"):'<div class="content-card"><div class="card-body"><p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645.</p></div></div>';case"waste-management":return this.hasFullSustainabilityManage()?await this.renderWasteManagement():'<div class="content-card"><div class="card-body"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A.</p></div></div>';case"settings":return this.hasFullSustainabilityManage()?await this.renderSettings():'<div class="content-card"><div class="card-body"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.</p></div></div>';default:return this.canRegisterResourceConsumption()?(t=await this.renderDashboard(),setTimeout(()=>{this.renderCharts()},300),t):`
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <p class="text-gray-600 dark:text-gray-400">\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u062A\u0648\u0649.</p>
                                </div>
                            </div>
                        </div>
                    `}},_refreshDashboardTotals(){try{const t=this.calculateAnalytics(),a=[{key:"water",selector:".text-blue-600,.text-blue-400",total:t.water.total},{key:"electricity",selector:".text-yellow-600,.text-yellow-400",total:t.electricity.total},{key:"gas",selector:".text-orange-600,.text-orange-400",total:t.gas.total}],e=document.querySelectorAll(".text-3xl.font-bold.text-blue-600, .text-3xl.font-bold.text-blue-400"),s=document.querySelectorAll(".text-3xl.font-bold.text-yellow-600, .text-3xl.font-bold.text-yellow-400"),i=document.querySelectorAll(".text-3xl.font-bold.text-orange-600, .text-3xl.font-bold.text-orange-400");e.forEach(n=>{n.textContent=t.water.total.toFixed(2)}),s.forEach(n=>{n.textContent=t.electricity.total.toFixed(2)}),i.forEach(n=>{n.textContent=t.gas.total.toFixed(2)})}catch{}},async renderDashboard(){const t=this.calculateAnalytics(),a=this.getActiveAlerts(),e=this.dashboardYear||new Date().getFullYear();return`
            <div class="space-y-6">
                <div class="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 dark:bg-emerald-900/30 px-3 py-1 font-semibold text-emerald-800 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-700">
                        <i class="fas fa-filter text-emerald-600 dark:text-emerald-400" aria-hidden="true"></i>
                        \u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u0633\u0646\u0629 <strong class="mx-1">${e}</strong>
                    </span>
                    <span class="text-xs opacity-90">\u062C\u0645\u064A\u0639 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0627\u062A \u0648\u0627\u0644\u0631\u0633\u0648\u0645 \u0623\u062F\u0646\u0627\u0647 \u0645\u062E\u0635\u0651\u0635\u0629 \u0644\u0647\u0630\u0647 \u0627\u0644\u0633\u0646\u0629.</span>
                </div>
                <!-- \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629 -->
                ${a.length>0?`
                <div class="content-card border-l-4 border-red-500">
                    <div class="card-header bg-red-50 dark:bg-red-900/20">
                        <h2 class="card-title text-red-700 dark:text-red-400">
                            <i class="fas fa-exclamation-triangle ml-2"></i>
                            \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="space-y-3">
                            ${a.map(s=>`
                                <div class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                                    <div class="flex items-center gap-3">
                                        <i class="fas fa-${s.icon} text-red-600 dark:text-red-400 text-xl"></i>
                                        <div>
                                            <div class="font-semibold text-red-700 dark:text-red-300">${s.title}</div>
                                            <div class="text-sm text-red-600 dark:text-red-400">${s.message}</div>
                                        </div>
                                    </div>
                                    <span class="badge badge-danger">${s.percentage.toFixed(1)}%</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
                `:""}

                <!-- \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title text-sm">
                                <i class="fas fa-tint text-blue-500 ml-2"></i>
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u064A\u0627\u0647
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                ${t.water.total.toFixed(2)}
                            </div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">\u0645\xB3</div>
                            <div class="mt-2 text-xs ${t.water.trend==="up"?"text-red-600":t.water.trend==="down"?"text-green-600":"text-gray-500"}">
                                ${t.water.trend==="up"?"\u2191":t.water.trend==="down"?"\u2193":"\u2192"} 
                                ${t.water.trendText}
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title text-sm">
                                <i class="fas fa-bolt text-yellow-500 ml-2"></i>
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                                ${t.electricity.total.toFixed(2)}
                            </div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">\u0643\u064A\u0644\u0648\u0648\u0627\u062A</div>
                            <div class="mt-2 text-xs ${t.electricity.trend==="up"?"text-red-600":t.electricity.trend==="down"?"text-green-600":"text-gray-500"}">
                                ${t.electricity.trend==="up"?"\u2191":t.electricity.trend==="down"?"\u2193":"\u2192"} 
                                ${t.electricity.trendText}
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title text-sm">
                                <i class="fas fa-fire text-orange-500 ml-2"></i>
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u063A\u0627\u0632
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                                ${t.gas.total.toFixed(2)}
                            </div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">\u0645\xB3</div>
                            <div class="mt-2 text-xs ${t.gas.trend==="up"?"text-red-600":t.gas.trend==="down"?"text-green-600":"text-gray-500"}">
                                ${t.gas.trend==="up"?"\u2191":t.gas.trend==="down"?"\u2193":"\u2192"} 
                                ${t.gas.trendText}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- \u0623\u0643\u062B\u0631 \u0645\u0648\u0642\u0639 \u0627\u0633\u062A\u0647\u0644\u0627\u0643\u0627\u064B -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-map-marker-alt ml-2"></i>
                            \u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0633\u062A\u0647\u0644\u0627\u0643\u0627\u064B
                        </h2>
                    </div>
                    <div class="card-body">
                        ${this.renderTopConsumingLocations()}
                    </div>
                </div>

                <!-- \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-chart-bar ml-2"></i>
                                \u0645\u0642\u0627\u0631\u0646\u0629 \u0634\u0647\u0631\u064A\u0629 - \u0627\u0644\u0645\u064A\u0627\u0647 (${e})
                            </h2>
                        </div>
                        <div class="card-body">
                            <div style="position: relative; height: 300px;">
                                <canvas id="water-monthly-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-chart-bar ml-2"></i>
                                \u0645\u0642\u0627\u0631\u0646\u0629 \u0634\u0647\u0631\u064A\u0629 - \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 (${e})
                            </h2>
                        </div>
                        <div class="card-body">
                            <div style="position: relative; height: 300px;">
                                <canvas id="electricity-monthly-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-chart-bar ml-2"></i>
                                \u0645\u0642\u0627\u0631\u0646\u0629 \u0634\u0647\u0631\u064A\u0629 - \u0627\u0644\u063A\u0627\u0632 (${e})
                            </h2>
                        </div>
                        <div class="card-body">
                            <div style="position: relative; height: 300px;">
                                <canvas id="gas-monthly-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-chart-pie ml-2"></i>
                                \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u062F\u0631 (${e})
                            </h2>
                        </div>
                        <div class="card-body">
                            <div style="position: relative; height: 300px;">
                                <canvas id="source-distribution-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderResourceRegister(t,a,e,s){const i=AppState.appData.resourceConsumption?.[t]||[],n=Number(this.dashboardYear)||new Date().getFullYear(),l=this.filterResourceRowsByYear(i,n),r=l.some(o=>o.hasAlert);return`
            <div class="space-y-4">
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex items-center justify-between flex-wrap gap-3">
                            <div>
                            <h2 class="card-title">
                                <i class="fas fa-${e} text-${s}-500 ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 ${a}
                            </h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                \u0639\u0631\u0636 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0633\u0646\u0629 <strong>${n}</strong> \u2014 \u063A\u064A\u0651\u0631 \u0627\u0644\u0633\u0646\u0629 \u0645\u0646 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0623\u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0639\u0631\u0636 \u0623\u0639\u0648\u0627\u0645 \u0623\u062E\u0631\u0649.
                            </p>
                            </div>
                            ${this.canRegisterResourceConsumption()?`
                            <button class="btn-primary" onclick="Sustainability.showResourceForm('${t}')">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F
                            </button>
                            `:""}
                        </div>
                    </div>
                    <div class="card-body">
                        ${l.length===0?`
                            <div class="empty-state">
                                <i class="fas fa-${e} text-4xl text-${s}-400 mb-4"></i>
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 ${a} \u0636\u0645\u0646 \u0633\u0646\u0629 <strong>${n}</strong>. \u062C\u0631\u0651\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0633\u0646\u0629 \u0623\u062E\u0631\u0649 \u0645\u0646 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0623\u0648 \u0623\u0636\u0641 \u0633\u062C\u0644\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B.</p>
                            </div>
                        `:`
                            <div class="filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                                    <div class="filter-field" style="min-width: 180px;">
                                        <label class="filter-label text-sm text-gray-600 mb-1 block font-medium">
                                            <i class="fas fa-search ml-1 text-gray-400"></i> \u0628\u062D\u062B \u0634\u0627\u0645\u0644
                                        </label>
                                        <div class="relative">
                                            <input type="text" id="search-filter-${t}" class="form-input w-full pr-10" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A..." oninput="Sustainability.filterResourceTable('${t}')">
                                            <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                                        </div>
                                    </div>
                                    <div class="filter-field" style="min-width: 160px;">
                                        <label class="filter-label text-sm text-gray-600 mb-1 block font-medium">
                                            <i class="fas fa-industry ml-1 text-gray-400"></i> \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639
                                        </label>
                                        <select id="factory-filter-${t}" class="form-input w-full" onchange="Sustainability.filterResourceTable('${t}')">
                                            <option value="">\u0627\u0644\u0643\u0644</option>
                                            ${[...new Set(l.map(o=>o.location).filter(Boolean))].map(o=>`<option value="${Utils.escapeHTML(o)}">${Utils.escapeHTML(o)}</option>`).join("")}
                                        </select>
                                    </div>
                                    <div class="filter-field" style="min-width: 160px;">
                                        <label class="filter-label text-sm text-gray-600 mb-1 block font-medium">
                                            <i class="fas fa-exclamation-triangle ml-1 text-gray-400"></i> \u0627\u0644\u062D\u0627\u0644\u0629
                                        </label>
                                        <select id="status-filter-${t}" class="form-input w-full" onchange="Sustainability.filterResourceTable('${t}')">
                                            <option value="">\u0627\u0644\u0643\u0644</option>
                                            <option value="alert">\u062A\u0646\u0628\u064A\u0647</option>
                                            <option value="normal">\u0637\u0628\u064A\u0639\u064A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="data-table" id="table-${t}">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                            <th>\u0627\u0644\u0634\u0647\u0631 / \u0627\u0644\u0633\u0646\u0629</th>
                                            <th>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</th>
                                            <th>\u0627\u0644\u0645\u0635\u062F\u0631</th>
                                            <th>\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629</th>
                                            <th>\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629</th>
                                            <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643</th>
                                            <th>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633</th>
                                            <th>\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0642\u0633\u0645</th>
                                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${l.map((o,d)=>`
                                                <tr class="${o.hasAlert?"bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500":""}" data-record-id="${o.id}">
                                                    <td>${d+1}</td>
                                                    <td>${Utils.formatDate(o.date)}</td>
                                                    <td>${o.monthYear||this.getMonthYear(o.date)}</td>
                                                    <td>${Utils.escapeHTML(o.location||"")}</td>
                                                    <td>${Utils.escapeHTML(o.source||"")}</td>
                                                    <td>${parseFloat(o.startReading||0).toFixed(2)}</td>
                                                    <td>${parseFloat(o.endReading||0).toFixed(2)}</td>
                                                    <td class="font-semibold">${parseFloat(o.totalConsumption||0).toFixed(2)}</td>
                                                    <td>${Utils.escapeHTML(o.unit||this.getDefaultUnit(t))}</td>
                                                    <td>${Utils.escapeHTML(o.department||"")}</td>
                                                    <td>
                                                        ${o.hasAlert?`
                                                            <span class="badge badge-danger">
                                                                <i class="fas fa-exclamation-triangle ml-1"></i>
                                                                \u062A\u0646\u0628\u064A\u0647
                                                            </span>
                                                        `:`
                                                            <span class="badge badge-success">\u0637\u0628\u064A\u0639\u064A</span>
                                                        `}
                                                    </td>
                                                    <td>
                                                        <div class="flex items-center gap-2">
                                                            <button onclick="Sustainability.viewResourceRecord('${t}', '${o.id}')" 
                                                                    class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                                                <i class="fas fa-eye"></i>
                                                            </button>
                                                            ${this.canEdit()?`
                                                            <button onclick="Sustainability.editResourceRecord('${t}', '${o.id}')" 
                                                                    class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                                                <i class="fas fa-edit"></i>
                                                            </button>
                                                            `:""}
                                                            ${this.canDelete()?`
                                                            <button onclick="Sustainability.deleteResourceRecord('${t}', '${o.id}')" 
                                                                    class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                            `:""}
                                                        </div>
                                                    </td>
                                                </tr>
                                            `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `},filterResourceTable(t){const a=document.getElementById(`search-filter-${t}`),e=document.getElementById(`factory-filter-${t}`),s=document.getElementById(`status-filter-${t}`),i=a?a.value.toLowerCase():"",n=e?e.value.toLowerCase():"",l=s?s.value:"",r=document.getElementById(`table-${t}`);if(!r)return;const o=r.getElementsByTagName("tbody")[0];if(!o)return;const d=o.getElementsByTagName("tr");for(let g=0;g<d.length;g++){const c=d[g],m=c.textContent.toLowerCase(),b=c.cells[3]?c.cells[3].textContent.toLowerCase():"",u=c.cells[10]?c.cells[10].textContent.trim():"";let f=m.includes(i),y=n===""||b.includes(n),p=!0;l==="alert"?p=u.includes("\u062A\u0646\u0628\u064A\u0647"):l==="normal"&&(p=u.includes("\u0637\u0628\u064A\u0639\u064A")),f&&y&&p?c.style.display="":c.style.display="none"}},showResourceForm(t,a=null){if(a&&!this.hasFullSustainabilityManage()){typeof Notification<"u"&&Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u062A\u0639\u062F\u064A\u0644 \u0623\u0648 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}if(!a&&!this.canRegisterResourceConsumption()){typeof Notification<"u"&&Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643");return}const e=a?(AppState.appData.resourceConsumption?.[t]||[]).find(p=>p.id===a):null,s={water:{name:"\u0645\u064A\u0627\u0647",icon:"tint",grad:"linear-gradient(135deg,#1d4ed8 0%,#0891b2 100%)",sectionBg:"#eff6ff",sectionBorder:"#bfdbfe",badgeBg:"#dbeafe",badgeColor:"#1e40af",saveBg:"linear-gradient(135deg,#2563eb 0%,#0891b2 100%)"},electricity:{name:"\u0643\u0647\u0631\u0628\u0627\u0621",icon:"bolt",grad:"linear-gradient(135deg,#d97706 0%,#f59e0b 100%)",sectionBg:"#fffbeb",sectionBorder:"#fde68a",badgeBg:"#fef3c7",badgeColor:"#92400e",saveBg:"linear-gradient(135deg,#d97706 0%,#f59e0b 100%)"},gas:{name:"\u063A\u0627\u0632 \u0637\u0628\u064A\u0639\u064A",icon:"fire",grad:"linear-gradient(135deg,#c2410c 0%,#ef4444 100%)",sectionBg:"#fff7ed",sectionBorder:"#fed7aa",badgeBg:"#ffedd5",badgeColor:"#9a3412",saveBg:"linear-gradient(135deg,#c2410c 0%,#ef4444 100%)"}},i=s[t]||s.water,n=e?.date?new Date(e.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),l=e?.monthYear||this.getMonthYear(new Date),r=e?.unit||this.getDefaultUnit(t),o=!!a,d=e?.location!=null?String(e.location).trim():"",g=o?null:this.getPreviousConsumptionRecord(t,d),c=!o&&g!=null,m=o?e?.startReading!=null&&e.startReading!==""?String(e.startReading):"":c?String(parseFloat(g.endReading)||0):"",b=e?.endReading!=null&&e.endReading!==""?String(e.endReading):"",u=document.getElementById(`resource-modal-${t}`);u&&u.remove();const f=document.createElement("div");f.id=`resource-modal-${t}`,f.className="modal-overlay",f.innerHTML=`
<div style="background:#fff;width:95%;max-width:680px;border-radius:18px;overflow:hidden;
            box-shadow:0 30px 80px rgba(0,0,0,0.35);position:relative;">

  <!-- ======== HEADER ======== -->
  <div style="background:${i.grad};padding:20px 24px;text-align:center;position:relative;">
    <!-- \u0632\u0631 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 -->
    <button id="close-res-${t}"
            style="position:absolute;top:14px;left:14px;width:34px;height:34px;border-radius:50%;
                   background:rgba(255,255,255,0.25);border:none;cursor:pointer;
                   display:flex;align-items:center;justify-content:center;transition:background .2s;"
            onmouseover="this.style.background='rgba(255,255,255,0.4)'"
            onmouseout="this.style.background='rgba(255,255,255,0.25)'">
      <i class="fas fa-times" style="color:#fff;font-size:15px;"></i>
    </button>
    <!-- \u0627\u0644\u0623\u064A\u0642\u0648\u0646 -->
    <div style="width:56px;height:56px;border-radius:16px;background:rgba(255,255,255,0.22);
                display:flex;align-items:center;justify-content:center;margin:0 auto 12px;">
      <i class="fas fa-${i.icon}" style="font-size:26px;color:#fff;"></i>
    </div>
    <!-- \u0627\u0644\u0639\u0646\u0648\u0627\u0646 -->
    <h2 style="color:#fff;font-size:20px;font-weight:800;margin:0 0 4px;letter-spacing:0.3px;">
      ${e?"\u062A\u0639\u062F\u064A\u0644 \u0633\u062C\u0644":"\u062A\u0633\u062C\u064A\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643"} ${i.name}
    </h2>
    <p style="color:rgba(255,255,255,0.82);font-size:13px;margin:0;">
      ${e?"\u0642\u0645 \u0628\u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644":"\u0623\u062F\u062E\u0644 \u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u062F\u0627\u062F \u0644\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629"}
    </p>
  </div>

  <!-- ======== BODY ======== -->
  <div style="padding:24px;background:#f8fafc;max-height:65vh;overflow-y:auto;">
    <form id="resource-form-${t}" novalidate>

      <!-- \u0627\u0644\u0642\u0633\u0645 1: \u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0645\u0648\u0642\u0639 -->
      <div style="background:${i.sectionBg};border:1.5px solid ${i.sectionBorder};
                  border-radius:12px;padding:16px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <span style="background:${i.badgeBg};color:${i.badgeColor};font-size:12px;
                       font-weight:700;padding:4px 10px;border-radius:8px;">
            <i class="fas fa-calendar-alt" style="margin-left:5px;"></i>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0645\u0648\u0642\u0639
          </span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
          <!-- \u0627\u0644\u062A\u0627\u0631\u064A\u062E -->
          <div>
            <label style="display:block;font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">
              \u0627\u0644\u062A\u0627\u0631\u064A\u062E <span style="color:#ef4444;">*</span>
            </label>
            <input type="date" id="resource-date-${t}" required class="form-input"
                   value="${n}"
                   onchange="Sustainability.updateMonthYear('${t}')"
                   style="width:100%;box-sizing:border-box;">
          </div>
          <!-- \u0627\u0644\u0634\u0647\u0631 / \u0627\u0644\u0633\u0646\u0629 -->
          <div>
            <label style="display:block;font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">
              \u0627\u0644\u0634\u0647\u0631 / \u0627\u0644\u0633\u0646\u0629
            </label>
            <input type="text" id="resource-month-year-${t}" class="form-input"
                   value="${l}" readonly
                   style="width:100%;box-sizing:border-box;background:#e5e7eb;color:#6b7280;">
          </div>
          <!-- \u0627\u0644\u0645\u0648\u0642\u0639 -->
          <div>
            <label style="display:block;font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">
              \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639 <span style="color:#ef4444;">*</span>
            </label>
            <select id="resource-location-${t}" required class="form-input"
                    style="width:100%;box-sizing:border-box;">
              <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
              ${this.getSiteOptions().map(p=>`
                <option value="${Utils.escapeHTML(p.name)}" ${e?.location===p.name?"selected":""}>
                  ${Utils.escapeHTML(p.name)}
                </option>`).join("")}
            </select>
          </div>
          <!-- \u0627\u0644\u0642\u0633\u0645 -->
          <div>
            <label style="display:block;font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">
              \u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0642\u0633\u0645
            </label>
            <input type="text" id="resource-department-${t}" class="form-input"
                   value="${Utils.escapeHTML(e?.department||"")}"
                   placeholder="\u0627\u062E\u062A\u064A\u0627\u0631\u064A"
                   style="width:100%;box-sizing:border-box;">
          </div>
        </div>
      </div>

      <!-- \u0627\u0644\u0642\u0633\u0645 2: \u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u062F\u0627\u062F (3 \u062D\u0642\u0648\u0644 \u0641\u064A \u0635\u0641 \u0648\u0627\u062D\u062F \u0645\u062A\u0633\u0627\u0648\u064A) -->
      <div style="background:${i.sectionBg};border:1.5px solid ${i.sectionBorder};
                  border-radius:12px;padding:16px;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <span style="background:${i.badgeBg};color:${i.badgeColor};font-size:12px;
                       font-weight:700;padding:4px 10px;border-radius:8px;">
            <i class="fas fa-tachometer-alt" style="margin-left:5px;"></i>\u0642\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0639\u062F\u0627\u062F
          </span>
        </div>

        <input type="hidden" id="resource-source-${t}"  value="${Utils.escapeHTML(e?.source||i.name)}">
        <input type="hidden" id="resource-unit-${t}"    value="${Utils.escapeHTML(r)}">

        <!-- \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u0641\u064A \u0635\u0641 \u0648\u0627\u062D\u062F -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;align-items:start;">

          <!-- \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 -->
          <div>
            <label id="resource-start-label-${t}"
                   style="display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:4px;min-height:20px;">
              \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 ${c?"":'<span style="color:#ef4444;">*</span>'}
            </label>
            <p id="resource-start-help-${t}"
               style="font-size:11px;color:#6366f1;margin:0 0 4px;min-height:16px;${c?"":"display:none;"}">
              ${c?'<i class="fas fa-link" style="margin-left:3px;"></i>\u0645\u0646 \u0622\u062E\u0631 \u0633\u062C\u0644':""}
            </p>
            <div style="position:relative;">
              <input type="number" id="resource-start-${t}" step="0.01"
                     ${c?"readonly":"required"}
                     class="form-input"
                     value="${Utils.escapeHTML(m)}"
                     placeholder="0.00"
                     onchange="Sustainability.calculateConsumption('${t}')"
                     style="width:100%;box-sizing:border-box;padding-left:40px;
                            ${c?"background:#e5e7eb;":""}">
              <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);
                           font-size:11px;font-weight:700;color:#9ca3af;">${r}</span>
            </div>
          </div>

          <!-- \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 -->
          <div>
            <label id="resource-end-label-${t}"
                   style="display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:4px;min-height:20px;">
              ${c?"\u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":"\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629"}
              <span style="color:#ef4444;">*</span>
            </label>
            <p style="font-size:11px;color:transparent;margin:0 0 4px;min-height:16px;">-</p>
            <div style="position:relative;">
              <input type="number" id="resource-end-${t}" step="0.01" required
                     class="form-input"
                     value="${Utils.escapeHTML(b)}"
                     placeholder="0.00"
                     oninput="Sustainability.calculateConsumption('${t}')"
                     onchange="Sustainability.calculateConsumption('${t}')"
                     style="width:100%;box-sizing:border-box;padding-left:40px;">
              <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);
                           font-size:11px;font-weight:700;color:#9ca3af;">${r}</span>
            </div>
          </div>

          <!-- \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A -->
          <div>
            <label style="display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:4px;min-height:20px;">
              \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A <span style="font-size:10px;font-weight:400;color:#9ca3af;">(\u062A\u0644\u0642\u0627\u0626\u064A)</span>
            </label>
            <p style="font-size:11px;color:transparent;margin:0 0 4px;min-height:16px;">-</p>
            <div style="position:relative;">
              <input type="number" id="resource-total-${t}" step="0.01" readonly
                     class="form-input"
                     value="${e?.totalConsumption||""}"
                     placeholder="\u2014"
                     style="width:100%;box-sizing:border-box;padding-left:40px;
                            background:#e5e7eb;font-weight:800;color:#111827;">
              <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);
                           font-size:11px;font-weight:700;color:#9ca3af;">${r}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- \u0627\u0644\u0642\u0633\u0645 3: \u0645\u0644\u0627\u062D\u0638\u0627\u062A -->
      <div>
        <label style="display:block;font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">
          <i class="fas fa-sticky-note" style="margin-left:6px;color:#9ca3af;"></i>
          \u0645\u0644\u0627\u062D\u0638\u0627\u062A <span style="font-size:11px;font-weight:400;color:#9ca3af;">(\u0627\u062E\u062A\u064A\u0627\u0631\u064A)</span>
        </label>
        <textarea id="resource-notes-${t}" class="form-input" rows="2"
                  placeholder="\u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."
                  style="width:100%;box-sizing:border-box;">${Utils.escapeHTML(e?.notes||"")}</textarea>
      </div>

    </form>
  </div>

  <!-- ======== FOOTER ======== -->
  <div style="padding:16px 24px;background:#fff;border-top:1.5px solid #e5e7eb;
              display:flex;align-items:center;justify-content:center;gap:12px;">
    <button id="cancel-res-${t}"
            style="min-width:130px;padding:10px 20px;border-radius:10px;border:1.5px solid #d1d5db;
                   background:#fff;color:#374151;font-size:14px;font-weight:600;cursor:pointer;
                   display:flex;align-items:center;justify-content:center;gap:8px;transition:background .2s;"
            onmouseover="this.style.background='#f3f4f6'"
            onmouseout="this.style.background='#fff'">
      <i class="fas fa-ban" style="color:#6b7280;font-size:13px;"></i>
      \u0625\u0644\u063A\u0627\u0621
    </button>
    <button id="save-res-${t}"
            style="min-width:160px;padding:10px 20px;border-radius:10px;border:none;
                   background:${i.saveBg};color:#fff;font-size:14px;font-weight:700;cursor:pointer;
                   display:flex;align-items:center;justify-content:center;gap:8px;
                   box-shadow:0 4px 14px rgba(0,0,0,0.18);transition:opacity .2s;"
            onmouseover="this.style.opacity='0.92'"
            onmouseout="this.style.opacity='1'">
      <i class="fas fa-${e?"check-circle":"plus-circle"}" style="font-size:15px;"></i>
      ${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644"}
    </button>
  </div>

</div>`,document.body.appendChild(f);const y=()=>{f.style.opacity="0",f.style.transition="opacity 0.15s ease",setTimeout(()=>{try{f.remove()}catch{}},160)};if(f.querySelector(`#close-res-${t}`).addEventListener("click",y),f.querySelector(`#cancel-res-${t}`).addEventListener("click",y),f.addEventListener("click",p=>{p.target===f&&y()}),f.querySelector(`#save-res-${t}`).addEventListener("click",()=>this.handleResourceSubmit(t,a,f,y)),a)this.calculateConsumption(t);else{const p=document.getElementById(`resource-location-${t}`);p&&p.addEventListener("change",()=>this.applyResourceStartFromPreviousChain(t,a)),this.applyResourceStartFromPreviousChain(t,a)}},updateMonthYear(t){const a=document.getElementById(`resource-date-${t}`);if(a&&a.value){const e=new Date(a.value),s=this.getMonthYear(e),i=document.getElementById(`resource-month-year-${t}`);i&&(i.value=s)}},calculateConsumption(t){const a=document.getElementById(`resource-start-${t}`),e=document.getElementById(`resource-end-${t}`),s=document.getElementById(`resource-total-${t}`);if(!a||!e||!s)return;const i=parseFloat(a.value),n=parseFloat(e.value),l=!isNaN(i)&&i>=0,r=!isNaN(n)&&n>=0,o=r&&l?n>=i:!0,d="1.5px solid #d1d5db",g="2px solid #ef4444";e.style.border=r&&!o?g:d;let c=document.getElementById(`resource-end-warn-${t}`);!o&&r&&l?(c||(c=document.createElement("p"),c.id=`resource-end-warn-${t}`,c.style.cssText="color:#ef4444;font-size:11px;margin:3px 0 0;",e.parentElement.insertAdjacentElement("afterend",c)),c.textContent="\u26A0\uFE0F \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0623\u0642\u0644 \u0645\u0646 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629!"):c&&c.remove(),l&&r&&o?(s.value=Math.max(0,n-i).toFixed(2),s.style.color="#111827",s.style.background="#e5e7eb"):o?(s.value="",s.style.color="#111827",s.style.background="#e5e7eb"):(s.value="0.00",s.style.color="#ef4444",s.style.background="#fee2e2")},async handleResourceSubmit(t,a,e,s){if(a&&!this.hasFullSustainabilityManage()){typeof Notification<"u"&&Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}if(!a&&!this.canRegisterResourceConsumption()){typeof Notification<"u"&&Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643");return}const i=document.getElementById(`resource-date-${t}`)?.value,n=document.getElementById(`resource-month-year-${t}`)?.value?.trim(),l=document.getElementById(`resource-location-${t}`)?.value?.trim(),r=document.getElementById(`resource-source-${t}`)?.value?.trim(),o=document.getElementById(`resource-start-${t}`)?.value,d=document.getElementById(`resource-end-${t}`)?.value,g=document.getElementById(`resource-total-${t}`)?.value,c=document.getElementById(`resource-unit-${t}`)?.value?.trim()||this.getDefaultUnit(t),m=document.getElementById(`resource-department-${t}`)?.value?.trim()||"",b=document.getElementById(`resource-notes-${t}`)?.value?.trim()||"",u=parseFloat(o),f=parseFloat(d),y=parseFloat(g),p=[];if(i||p.push("\u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u062A\u0627\u0631\u064A\u062E"),l||p.push("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639"),(o===""||isNaN(u))&&p.push("\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0645\u0637\u0644\u0648\u0628\u0629"),(d===""||isNaN(f))&&p.push("\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 / \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0645\u0637\u0644\u0648\u0628\u0629"),!isNaN(u)&&u<0&&p.push("\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0633\u0627\u0644\u0628\u0629"),!isNaN(f)&&f<0&&p.push("\u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0627 \u064A\u0645\u0643\u0646 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0633\u0627\u0644\u0628\u0629"),!isNaN(u)&&!isNaN(f)&&f<u&&p.push(`\u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629 (${f}) \u0623\u0642\u0644 \u0645\u0646 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 (${u}) \u2014 \u064A\u0631\u062C\u0649 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0639\u062F\u0627\u062F`),(isNaN(y)||y<0)&&p.push("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D \u2014 \u062A\u0623\u0643\u062F \u0645\u0646 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0648\u0627\u0644\u0646\u0647\u0627\u064A\u0629"),p.length>0){Notification.error(p[0]);return}const k=new Date(i),h=this.checkConsumptionAlert(t,y,n),S={id:a||Utils.generateId(t.toUpperCase().substring(0,3)),serialNumber:a?(AppState.appData.resourceConsumption?.[t]||[]).find(x=>x.id===a)?.serialNumber:this.generateSerialNumber(t),date:k.toISOString(),monthYear:n,location:l,source:r,startReading:u,endReading:f,totalConsumption:y,unit:c,department:m,notes:b,hasAlert:h,createdAt:a?(AppState.appData.resourceConsumption?.[t]||[]).find(x=>x.id===a)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown",updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown"};AppState.appData.resourceConsumption||(AppState.appData.resourceConsumption={}),AppState.appData.resourceConsumption[t]||(AppState.appData.resourceConsumption[t]=[]),Loading.show();try{let x=null,v=-1;if(a&&(v=AppState.appData.resourceConsumption[t].findIndex(w=>w.id===a),v!==-1))try{x=JSON.parse(JSON.stringify(AppState.appData.resourceConsumption[t][v]))}catch{x=null}if(a){const w=AppState.appData.resourceConsumption[t].findIndex($=>$.id===a);w!==-1&&(AppState.appData.resourceConsumption[t][w]=S)}else AppState.appData.resourceConsumption[t].push(S);if(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success(a?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),typeof s=="function")s();else try{e.remove()}catch{}this._resourceConsumptionFetchPromise=null,this._refreshDashboardTotals(),this.load(),this.saveResourceConsumptionToSheets().then(w=>{w.success||(a&&x!==null&&v!==-1?AppState.appData.resourceConsumption[t][v]=x:a||(AppState.appData.resourceConsumption[t]=AppState.appData.resourceConsumption[t].filter($=>$.id!==S.id)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.error("\u26A0\uFE0F \u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A: "+(w.message||w.error||"")),this._refreshDashboardTotals(),this.load())}).catch(w=>{Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u0634\u064A\u062A:",w)}),h&&Notification.warning(`\u062A\u0646\u0628\u064A\u0647: \u0627\u0633\u062A\u0647\u0644\u0627\u0643 ${this.getTypeName(t)} \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0645\u0633\u0645\u0648\u062D`)}catch(x){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+x.message)}},viewResourceRecord(t,a){const s=(AppState.appData.resourceConsumption?.[t]||[]).find(r=>r.id===a);if(!s){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i={water:{name:"\u0645\u064A\u0627\u0647",icon:"tint",color:"blue"},electricity:{name:"\u0643\u0647\u0631\u0628\u0627\u0621",icon:"bolt",color:"yellow"},gas:{name:"\u063A\u0627\u0632 \u0637\u0628\u064A\u0639\u064A",icon:"fire",color:"orange"}},n=i[t]||i.water,l=document.createElement("div");l.className="modal-overlay",l.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-${n.icon} text-${n.color}-500 ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0633\u062C\u0644 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 ${n.name}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div class="grid grid-cols-2 gap-4">
                            <div><strong>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A:</strong> ${Utils.escapeHTML(s.serialNumber||"")}</div>
                            <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.formatDate(s.date)}</div>
                            <div><strong>\u0627\u0644\u0634\u0647\u0631 / \u0627\u0644\u0633\u0646\u0629:</strong> ${Utils.escapeHTML(s.monthYear||"")}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639:</strong> ${Utils.escapeHTML(s.location||"")}</div>
                            <div><strong>\u0627\u0644\u0645\u0635\u062F\u0631:</strong> ${Utils.escapeHTML(s.source||"")}</div>
                            <div><strong>\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629:</strong> ${parseFloat(s.startReading||0).toFixed(2)}</div>
                            <div><strong>\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629:</strong> ${parseFloat(s.endReading||0).toFixed(2)}</div>
                            <div><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643:</strong> <span class="font-semibold">${parseFloat(s.totalConsumption||0).toFixed(2)} ${Utils.escapeHTML(s.unit||"")}</span></div>
                            <div><strong>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633:</strong> ${Utils.escapeHTML(s.unit||"")}</div>
                            <div><strong>\u0627\u0644\u062C\u0647\u0629 / \u0627\u0644\u0642\u0633\u0645:</strong> ${Utils.escapeHTML(s.department||"-")}</div>
                            <div><strong>\u0627\u0644\u062D\u0627\u0644\u0629:</strong> 
                                ${s.hasAlert?`
                                    <span class="badge badge-danger">
                                        <i class="fas fa-exclamation-triangle ml-1"></i>
                                        \u062A\u0646\u0628\u064A\u0647
                                    </span>
                                `:`
                                    <span class="badge badge-success">\u0637\u0628\u064A\u0639\u064A</span>
                                `}
                            </div>
                        </div>
                        ${s.notes?`
                            <div class="mt-4 pt-4 border-t">
                                <strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong>
                                <p class="text-gray-700 dark:text-gray-300 mt-2">${Utils.escapeHTML(s.notes)}</p>
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u063A\u0644\u0627\u0642
                    </button>
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("sustainability"):""}
                    ${this.canEdit()?`
                    <button type="button" class="btn-primary" onclick="Sustainability.editResourceRecord('${t}', '${a}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(l),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(l,{moduleKey:"sustainability",record:{...s,title:`${n.name} \u2014 ${s.serialNumber||a}`,type:n.name,quantity:s.totalConsumption!=null?String(s.totalConsumption)+" "+(s.unit||""):"",date:s.date||s.monthYear||""},recordId:s.id||a||""}),l.addEventListener("click",r=>{r.target===l&&l.remove()})},editResourceRecord(t,a){if(!this.canEdit()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}this.showResourceForm(t,a)},async deleteResourceRecord(t,a){if(!this.canDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{const e=Array.isArray(AppState.appData.resourceConsumption[t])?[...AppState.appData.resourceConsumption[t]]:[];AppState.appData.resourceConsumption[t]=AppState.appData.resourceConsumption[t].filter(i=>i.id!==a),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const s=await this.saveResourceConsumptionToSheets();if(!s.success){AppState.appData.resourceConsumption[t]=e,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645: "+(s.message||s.error||""));return}Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.load()}catch(e){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message)}finally{Loading.hide()}}},renderSettings(){return this.canManageSettings()?`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-cog ml-2"></i>
                        \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629
                    </h2>
                </div>
                <div class="card-body">
                    <form id="sustainability-settings-form" class="space-y-6">
                        <div>
                            <h3 class="text-lg font-semibold mb-4">\u062D\u062F\u0648\u062F \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0634\u0647\u0631\u064A\u0629</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label for="limit-water" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <i class="fas fa-tint text-blue-500 ml-1"></i>
                                        \u062D\u062F \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u064A\u0627\u0647 (\u0645\xB3)
                                    </label>
                                    <input type="number" id="limit-water" step="0.01" 
                                           class="form-input" 
                                           value="${this.settings.consumptionLimits.water}">
                                </div>
                                <div>
                                    <label for="limit-electricity" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <i class="fas fa-bolt text-yellow-500 ml-1"></i>
                                        \u062D\u062F \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 (\u0643.\u0648)
                                    </label>
                                    <input type="number" id="limit-electricity" step="0.01" 
                                           class="form-input" 
                                           value="${this.settings.consumptionLimits.electricity}">
                                </div>
                                <div>
                                    <label for="limit-gas" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        <i class="fas fa-fire text-orange-500 ml-1"></i>
                                        \u062D\u062F \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u063A\u0627\u0632 (\u0645\xB3)
                                    </label>
                                    <input type="number" id="limit-gas" step="0.01" 
                                           class="form-input" 
                                           value="${this.settings.consumptionLimits.gas}">
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="alert-threshold" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 (% \u0645\u0646 \u0627\u0644\u0645\u062A\u0648\u0633\u0637)
                            </label>
                            <input type="number" id="alert-threshold" step="0.1" min="1" max="2"
                                   class="form-input" 
                                   value="${this.settings.alertThreshold}">
                            <p class="text-xs text-gray-500 mt-1">
                                \u0633\u064A\u062A\u0645 \u0625\u0638\u0647\u0627\u0631 \u062A\u0646\u0628\u064A\u0647 \u0639\u0646\u062F \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0644\u0647\u0630\u0647 \u0627\u0644\u0646\u0633\u0628\u0629 \u0645\u0646 \u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0634\u0647\u0631\u064A
                            </p>
                        </div>
                        <div class="flex justify-end gap-2 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="Sustainability.loadSettings(); Sustainability.currentTab='settings'; Sustainability.load();">
                                \u0625\u0644\u063A\u0627\u0621
                            </button>
                            <button type="button" class="btn-primary" onclick="Sustainability.saveSettings()">
                                <i class="fas fa-save ml-2"></i>
                                \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `:'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</p></div>'},async saveSettings(){if(!this.canManageSettings()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}this.settings.consumptionLimits.water=parseFloat(document.getElementById("limit-water").value)||1e4,this.settings.consumptionLimits.electricity=parseFloat(document.getElementById("limit-electricity").value)||5e4,this.settings.consumptionLimits.gas=parseFloat(document.getElementById("limit-gas").value)||3e4,this.settings.alertThreshold=parseFloat(document.getElementById("alert-threshold").value)||1.2;try{localStorage.setItem("sustainability_settings",JSON.stringify(this.settings)),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),this.load()}catch(t){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A: "+t.message)}},loadSettings(){try{const t=localStorage.getItem("sustainability_settings");t&&(this.settings={...this.settings,...JSON.parse(t)})}catch(t){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062F\u0627\u0645\u0629:",t)}},getMonthYear(t){const a=new Date(t);return`${["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"][a.getMonth()]} ${a.getFullYear()}`},getDefaultUnit(t){return{water:"\u0645\xB3",electricity:"\u0643.\u0648",gas:"\u0645\xB3"}[t]||""},getTypeName(t){return{water:"\u0627\u0644\u0645\u064A\u0627\u0647",electricity:"\u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621",gas:"\u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0637\u0628\u064A\u0639\u064A"}[t]||t},getConsumptionRecordsSortedDesc(t){return[...AppState.appData.resourceConsumption?.[t]||[]].sort((e,s)=>new Date(s.date)-new Date(e.date))},getPreviousConsumptionRecord(t,a){const e=this.getConsumptionRecordsSortedDesc(t);if(!e.length||a==null||String(a).trim()==="")return null;const s=String(a).trim();return e.find(i=>String(i.location||"").trim()===s)||null},applyResourceStartFromPreviousChain(t,a){if(a)return;const e=document.getElementById(`resource-location-${t}`),s=document.getElementById(`resource-start-${t}`);if(!s)return;const i=(e?.value||"").trim(),n=this.getPreviousConsumptionRecord(t,i),l=document.getElementById(`resource-start-help-${t}`),r=document.getElementById(`resource-start-label-${t}`),o=document.getElementById(`resource-end-label-${t}`);if(n!=null){const d=parseFloat(n.endReading);s.value=Number.isFinite(d)?d.toFixed(2):"",s.readOnly=!0,s.classList.add("bg-gray-100","dark:bg-gray-800"),s.removeAttribute("required"),l&&(l.textContent="\u0645\u064F\u0633\u062A\u062E\u0631\u062C\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 \u0642\u0631\u0627\u0621\u0629 \u0646\u0647\u0627\u064A\u0629 \u0622\u062E\u0631 \u0633\u062C\u0644 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639.",l.classList.remove("hidden")),r&&(r.innerHTML="\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 "),o&&(o.innerHTML='\u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 (\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0639\u062F\u0627\u062F) <span class="text-red-500">*</span>')}else s.value="",s.readOnly=!1,s.classList.remove("bg-gray-100","dark:bg-gray-800"),s.setAttribute("required","required"),l&&(l.textContent="",l.classList.add("hidden")),r&&(r.innerHTML='\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 <span class="text-red-500">*</span>'),o&&(o.innerHTML='\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629 <span class="text-red-500">*</span>');this.calculateConsumption(t)},generateSerialNumber(t){const a=AppState.appData.resourceConsumption?.[t]||[],e={water:"WTR",electricity:"ELC",gas:"GAS"}[t]||"RES",s=a.length+1;return`${e}-${String(s).padStart(6,"0")}`},getMonthlyConsumption(t,a,e){return t.filter(s=>{const i=new Date(s.date);return i.getMonth()===a&&i.getFullYear()===e}).reduce((s,i)=>s+(parseFloat(i.totalConsumption)||0),0)},getTrendForYearScopedData(t){if(!t||t.length<2)return"stable";const a=this.getLatestMonthContext(t);if(!a)return"stable";const e=a.month,s=a.year,i=e===0?11:e-1,n=s,l=this.getMonthlyConsumption(t,e,s),r=this.getMonthlyConsumption(t,i,n);if(r===0)return"stable";const o=(l-r)/r*100;return o>5?"up":o<-5?"down":"stable"},getLatestMonthContext(t=[]){const a=(t||[]).map(s=>new Date(s?.date)).filter(s=>!Number.isNaN(s.getTime())).sort((s,i)=>s-i);if(!a.length)return null;const e=a[a.length-1];return{month:e.getMonth(),year:e.getFullYear()}},getLatestMonthlyConsumption(t=[]){const a=this.getLatestMonthContext(t);return a?{total:this.getMonthlyConsumption(t,a.month,a.year),month:a.month,year:a.year}:{total:0,month:null,year:null}},getTrend(t,a){if(t.length<2)return"stable";const e=this.getLatestMonthContext(t);if(!e)return"stable";const s=e.month,i=e.year,n=s===0?11:s-1,l=s===0?i-1:i,r=this.getMonthlyConsumption(t,s,i),o=this.getMonthlyConsumption(t,n,l);if(o===0)return"stable";const d=(r-o)/o*100;return d>5?"up":d<-5?"down":"stable"},getTrendText(t){return{up:"\u0632\u064A\u0627\u062F\u0629",down:"\u0627\u0646\u062E\u0641\u0627\u0636",stable:"\u062B\u0627\u0628\u062A"}[t]||"\u062B\u0627\u0628\u062A"},calculateAnalytics(){const{water:t,electricity:a,gas:e}=this.getViewFilteredConsumption(),s=i=>{const n=i.reduce((d,g)=>d+(parseFloat(g.totalConsumption)||0),0),l=i.length>0?n/i.length:0,r=this.getTrendForYearScopedData(i),o=this.getTrendText(r);return{total:n,current:0,previous:0,average:l,trend:r,trendText:o}};return{water:s(t),electricity:s(a),gas:s(e)}},checkConsumptionAlert(t,a,e){const i=(AppState.appData.resourceConsumption?.[t]||[]).filter(o=>o.monthYear===e);if(i.length===0)return!1;const r=i.reduce((o,d)=>o+(parseFloat(d.totalConsumption)||0),0)/i.length*this.settings.alertThreshold;return a>r},getActiveAlerts(){const t=[],{water:a,electricity:e,gas:s,year:i}=this.getViewFilteredConsumption(),n=(l,r,o,d)=>{const g=this.getLatestMonthContext(l);if(!g||g.year!==i)return;const c=l.filter(f=>{const y=new Date(f.date);return y.getMonth()===g.month&&y.getFullYear()===g.year});if(c.length===0)return;const m=c.reduce((f,y)=>f+(parseFloat(y.totalConsumption)||0),0),b=this.settings.consumptionLimits[r],u=b>0?m/b*100:0;u>100&&t.push({type:r,title:`\u0627\u0633\u062A\u0647\u0644\u0627\u0643 ${o} \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F`,message:`\u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u062D\u0627\u0644\u064A: ${m.toFixed(2)} (${u.toFixed(1)}% \u0645\u0646 \u0627\u0644\u062D\u062F)`,percentage:u,icon:d})};return n(a,"water","\u0627\u0644\u0645\u064A\u0627\u0647","tint"),n(e,"electricity","\u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621","bolt"),n(s,"gas","\u0627\u0644\u063A\u0627\u0632","fire"),t},getTotalAlerts(){return this.getActiveAlerts().length},async renderCharts(){if(!await this.ensureChartJSLoaded()||typeof Chart>"u"){Utils.safeWarn("Chart.js \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0646 \u064A\u062A\u0645 \u0639\u0631\u0636 \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u064A\u0629");return}this.renderMonthlyChart("water-monthly-chart","water","\u0645\u064A\u0627\u0647","rgba(59, 130, 246, 0.8)"),this.renderMonthlyChart("electricity-monthly-chart","electricity","\u0643\u0647\u0631\u0628\u0627\u0621","rgba(245, 158, 11, 0.8)"),this.renderMonthlyChart("gas-monthly-chart","gas","\u063A\u0627\u0632","rgba(249, 115, 22, 0.8)"),this.renderSourceDistributionChart()},async ensureChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(a=>{let e=0;const s=50,i=setInterval(()=>{e++,typeof Chart<"u"?(clearInterval(i),a(!0)):e>=s&&(clearInterval(i),a(!1))},100)}):!1},renderMonthlyChart(t,a,e,s){const i=document.getElementById(t);if(!i)return;i.chart&&i.chart.destroy();const n=this.getViewFilteredConsumption(),l=n[a]||[],r=this.getMonthlyDataForYear(l,n.year),o=i.getContext("2d");i.chart=new Chart(o,{type:"bar",data:{labels:r.map(d=>d.month),datasets:[{label:`\u0627\u0633\u062A\u0647\u0644\u0627\u0643 ${e} (${n.year})`,data:r.map(d=>d.total),backgroundColor:s,borderColor:s.replace("0.8","1"),borderWidth:2,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",rtl:!0},tooltip:{rtl:!0,callbacks:{label:function(d){return`${d.dataset.label}: ${d.parsed.y.toFixed(2)}`}}}},scales:{y:{beginAtZero:!0,ticks:{callback:function(d){return d.toFixed(0)}}}}}})},getMonthlyData(t){const a={};return t.forEach(e=>{const s=new Date(e.date),i=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`,n=this.getMonthYear(s);a[i]||(a[i]={month:n,total:0}),a[i].total+=parseFloat(e.totalConsumption)||0}),Object.entries(a).sort((e,s)=>e[0].localeCompare(s[0])).slice(-12).map(([e,s])=>s)},getMonthlyDataForYear(t,a){const e=Number(a);if(!Number.isFinite(e))return[];const s={};return(t||[]).forEach(i=>{const n=new Date(i.date);if(Number.isNaN(n.getTime())||n.getFullYear()!==e)return;const l=`${e}-${String(n.getMonth()+1).padStart(2,"0")}`,r=this.getMonthYear(n);s[l]||(s[l]={month:r,total:0}),s[l].total+=parseFloat(i.totalConsumption)||0}),Object.entries(s).sort((i,n)=>i[0].localeCompare(n[0])).map(([,i])=>i)},renderSourceDistributionChart(){const t=document.getElementById("source-distribution-chart");if(!t)return;t.chart&&t.chart.destroy();const{water:a,electricity:e,gas:s}=this.getViewFilteredConsumption(),i=a.reduce((o,d)=>o+(parseFloat(d.totalConsumption)||0),0),n=e.reduce((o,d)=>o+(parseFloat(d.totalConsumption)||0),0),l=s.reduce((o,d)=>o+(parseFloat(d.totalConsumption)||0),0),r=t.getContext("2d");t.chart=new Chart(r,{type:"doughnut",data:{labels:["\u0645\u064A\u0627\u0647","\u0643\u0647\u0631\u0628\u0627\u0621","\u063A\u0627\u0632 \u0637\u0628\u064A\u0639\u064A"],datasets:[{data:[i,n,l],backgroundColor:["rgba(59, 130, 246, 0.8)","rgba(245, 158, 11, 0.8)","rgba(249, 115, 22, 0.8)"],borderColor:["rgba(59, 130, 246, 1)","rgba(245, 158, 11, 1)","rgba(249, 115, 22, 1)"],borderWidth:2}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"bottom",rtl:!0},tooltip:{rtl:!0,callbacks:{label:function(o){const d=o.dataset.data.reduce((c,m)=>c+m,0),g=(o.parsed/d*100).toFixed(1);return`${o.label}: ${o.parsed.toFixed(2)} (${g}%)`}}}}}})},async renderWasteManagement(){try{const t={regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]},a=AppState.appData.wasteManagement||t;return a.regularWasteTypes||(a.regularWasteTypes=t.regularWasteTypes),a.regularWasteRecords||(a.regularWasteRecords=[]),a.regularWasteSales||(a.regularWasteSales=[]),a.hazardousWasteRecords||(a.hazardousWasteRecords=[]),`
            <div class="space-y-6">
                <!-- \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                            ${this.getTotalRegularWasteQuantity(a.regularWasteRecords||[])}
                        </div>
                        <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                            <i class="fas fa-recycle ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629
                        </div>
                    </div>
                    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                            ${this.getTotalHazardousWasteQuantity(a.hazardousWasteRecords||[])}
                        </div>
                        <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                            <i class="fas fa-exclamation-triangle ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u062E\u0637\u0631\u0629
                        </div>
                    </div>
                    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            ${this.getTotalSalesRevenue(a.regularWasteSales||[]).toFixed(2)}
                        </div>
                        <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                            <i class="fas fa-money-bill-wave ml-1"></i>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0627\u0626\u062F (\u062C.\u0645)
                        </div>
                    </div>
                    <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
                        <div class="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                            ${(a.regularWasteSales||[]).length}
                        </div>
                        <div class="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                            <i class="fas fa-shopping-cart ml-1"></i>\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0628\u064A\u0639
                        </div>
                    </div>
                </div>

                <!-- \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629 -->
                <div class="mt-6">
                    <div class="flex gap-2 mb-6 border-b overflow-x-auto">
                        <button class="tab-btn-internal ${this.currentWasteSubTab==="regular"?"active":""}" 
                                onclick="Sustainability.currentWasteSubTab='regular'; Sustainability.load();">
                            <i class="fas fa-recycle ml-2"></i>\u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629
                        </button>
                        <button class="tab-btn-internal ${this.currentWasteSubTab==="hazardous"?"active":""}" 
                                onclick="Sustainability.currentWasteSubTab='hazardous'; Sustainability.load();">
                            <i class="fas fa-exclamation-triangle ml-2"></i>\u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u062E\u0637\u0631\u0629
                        </button>
                        <button class="tab-btn-internal ${this.currentWasteSubTab==="analytics"?"active":""}" 
                                onclick="Sustainability.currentWasteSubTab='analytics'; Sustainability.load();">
                            <i class="fas fa-chart-bar ml-2"></i>\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A
                        </button>
                        ${this.isAdmin()?`
                        <button class="tab-btn-internal ${this.currentWasteSubTab==="waste-types"?"active":""}" 
                                onclick="Sustainability.currentWasteSubTab='waste-types'; Sustainability.load();">
                            <i class="fas fa-list ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A
                        </button>
                        `:""}
                    </div>
                    <div id="waste-management-content">
                        ${await this.renderWasteManagementContent()}
                    </div>
                </div>
            </div>
            <style>
                .tab-btn-internal {
                    padding: 10px 20px;
                    border: none;
                    background: transparent;
                    color: #6b7280;
                    font-weight: 500;
                    cursor: pointer;
                    border-bottom: 3px solid transparent;
                    transition: all 0.3s;
                    white-space: nowrap;
                }
                .tab-btn-internal:hover {
                    color: #3b82f6;
                }
                .tab-btn-internal.active {
                    color: #3b82f6;
                    border-bottom-color: #3b82f6;
                    font-weight: 600;
                }
            </style>
        `}catch(t){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A renderWasteManagement:",t),`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0639\u0631\u0636 \u0628\u064A\u0627\u0646\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A</p>
                            <button onclick="Sustainability.load()" class="btn-primary">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `}},async renderWasteManagementContent(){switch(this.currentWasteSubTab||(this.currentWasteSubTab="regular"),this.currentWasteSubTab){case"regular":return await this.renderRegularWaste();case"hazardous":return await this.renderHazardousWaste();case"analytics":return await this.renderWasteAnalytics();case"waste-types":return await this.renderWasteTypesManagement();default:return await this.renderRegularWaste()}},async renderRegularWaste(){const t=AppState.appData.wasteManagement||{regularWasteRecords:[],regularWasteSales:[]},a=t.regularWasteRecords||[],e=t.regularWasteSales||[];return`
            <div class="space-y-6">
                <!-- \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629 -->
                <div class="content-card border-l-4 border-green-500">
                    <div class="card-header bg-green-50 dark:bg-green-900/20">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title text-green-700 dark:text-green-400">
                                <i class="fas fa-recycle ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629
                            </h2>
                            <button class="btn-success" onclick="Sustainability.showRegularWasteForm()">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        ${a.length===0?`
                            <div class="empty-state">
                                <i class="fas fa-recycle text-4xl text-green-400 mb-4"></i>
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629. \u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644\u0627\u062A \u062C\u062F\u064A\u062F\u0629.</p>
                            </div>
                        `:`
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A</th>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                            <th>\u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639</th>
                                            <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A</th>
                                            <th>\u0627\u0644\u0643\u0645\u064A\u0629</th>
                                            <th>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633</th>
                                            <th>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C</th>
                                            <th>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${a.map((s,i)=>`
                                            <tr class="bg-green-50/50 dark:bg-green-900/10" data-record-id="${s.id}">
                                                <td>${i+1}</td>
                                                <td>${Utils.escapeHTML(s.serialNumber||"")}</td>
                                                <td>${Utils.formatDate(s.date)}</td>
                                                <td>${Utils.escapeHTML(s.location||"")}</td>
                                                <td>${Utils.escapeHTML(s.wasteType||"")}</td>
                                                <td class="font-semibold">${parseFloat(s.quantity||0).toFixed(2)}</td>
                                                <td>${Utils.escapeHTML(s.unit||"")}</td>
                                                <td>${Utils.escapeHTML(s.department||"")}</td>
                                                <td>${Utils.escapeHTML(s.storageMethod||"")}</td>
                                                <td>
                                                    <div class="flex items-center gap-2">
                                                        <button onclick="Sustainability.viewRegularWasteRecord('${s.id}')" 
                                                                class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                                            <i class="fas fa-eye"></i>
                                                        </button>
                                                        ${this.canEdit()?`
                                                        <button onclick="Sustainability.editRegularWasteRecord('${s.id}')" 
                                                                class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        `:""}
                                                        ${this.canDelete()?`
                                                        <button onclick="Sustainability.deleteRegularWasteRecord('${s.id}')" 
                                                                class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                        `:""}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>

                <!-- \u0633\u062C\u0644 \u0628\u064A\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629 -->
                <div class="content-card border-l-4 border-blue-500">
                    <div class="card-header bg-blue-50 dark:bg-blue-900/20">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title text-blue-700 dark:text-blue-400">
                                <i class="fas fa-shopping-cart ml-2"></i>
                                \u0633\u062C\u0644 \u0628\u064A\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629
                            </h2>
                            <button class="btn-primary" onclick="Sustainability.showRegularWasteSaleForm()">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644\u064A\u0629 \u0628\u064A\u0639
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        ${e.length===0?`
                            <div class="empty-state">
                                <i class="fas fa-shopping-cart text-4xl text-blue-400 mb-4"></i>
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0628\u064A\u0639 \u0645\u0633\u062C\u0644\u0629. \u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0628\u064A\u0639 \u062C\u062F\u064A\u062F\u0629.</p>
                            </div>
                        `:`
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>\u0631\u0642\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</th>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                            <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                            <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A</th>
                                            <th>\u0627\u0644\u0643\u0645\u064A\u0629</th>
                                            <th>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633</th>
                                            <th>\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629</th>
                                            <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u064A\u0645\u0629</th>
                                            <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u062A\u0631\u064A</th>
                                            <th>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0628\u064A\u0639</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${e.map((s,i)=>`
                                            <tr class="bg-blue-50/50 dark:bg-blue-900/10" data-sale-id="${s.id}">
                                                <td>${i+1}</td>
                                                <td>${Utils.escapeHTML(s.transactionNumber||"")}</td>
                                                <td>${Utils.formatDate(s.date)}</td>
                                                <td>${Utils.escapeHTML(s.location||"")}</td>
                                                <td>${Utils.escapeHTML(s.wasteType||"")}</td>
                                                <td>${parseFloat(s.quantity||0).toFixed(2)}</td>
                                                <td>${Utils.escapeHTML(s.unit||"")}</td>
                                                <td>${parseFloat(s.unitPrice||0).toFixed(2)} \u062C.\u0645</td>
                                                <td class="font-semibold text-green-600">${parseFloat(s.totalValue||0).toFixed(2)} \u062C.\u0645</td>
                                                <td>${Utils.escapeHTML(s.buyerName||"")}</td>
                                                <td>${Utils.escapeHTML(s.paymentMethod||"")}</td>
                                                <td>
                                                    <div class="flex items-center gap-2">
                                                        <button onclick="Sustainability.viewRegularWasteSale('${s.id}')" 
                                                                class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                                            <i class="fas fa-eye"></i>
                                                        </button>
                                                        ${this.canEdit()?`
                                                        <button onclick="Sustainability.editRegularWasteSale('${s.id}')" 
                                                                class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        `:""}
                                                        ${this.canDelete()?`
                                                        <button onclick="Sustainability.deleteRegularWasteSale('${s.id}')" 
                                                                class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                        `:""}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `},async renderHazardousWaste(){const a=(AppState.appData.wasteManagement||{}).hazardousWasteRecords||[];return`
            <div class="space-y-6">
                <div class="content-card border-l-4 border-red-500">
                    <div class="card-header bg-red-50 dark:bg-red-900/20">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title text-red-700 dark:text-red-400">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                \u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u062E\u0637\u0631\u0629
                            </h2>
                            <button class="btn-danger" onclick="Sustainability.showHazardousWasteForm()">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644 \u062C\u062F\u064A\u062F
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        ${a.length===0?`
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                                <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0644\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u062E\u0637\u0631\u0629. \u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0633\u062C\u0644\u0627\u062A \u062C\u062F\u064A\u062F\u0629.</p>
                            </div>
                        `:`
                            <div class="overflow-x-auto">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A</th>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                            <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                            <th>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A</th>
                                            <th>\u0627\u0644\u0643\u0645\u064A\u0629</th>
                                            <th>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633</th>
                                            <th>\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</th>
                                            <th>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646</th>
                                            <th>\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u0642\u0644</th>
                                            <th>\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</th>
                                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0642\u0644</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${a.map((e,s)=>`
                                            <tr class="bg-red-50/50 dark:bg-red-900/10" data-record-id="${e.id}">
                                                <td>${s+1}</td>
                                                <td>${Utils.escapeHTML(e.serialNumber||"")}</td>
                                                <td>${Utils.formatDate(e.date)}</td>
                                                <td>${Utils.escapeHTML(e.location||"")}</td>
                                                <td>${Utils.escapeHTML(e.wasteType||"")}</td>
                                                <td class="font-semibold">${parseFloat(e.quantity||0).toFixed(2)}</td>
                                                <td>${Utils.escapeHTML(e.unit||"")}</td>
                                                <td>
                                                    <span class="badge badge-danger">${Utils.escapeHTML(e.hazardClassification||"")}</span>
                                                </td>
                                                <td>${Utils.escapeHTML(e.storageMethod||"")}</td>
                                                <td>${Utils.escapeHTML(e.transportCompany||"")}</td>
                                                <td>${Utils.escapeHTML(e.treatmentFacility||"")}</td>
                                                <td>${e.transportDate?Utils.formatDate(e.transportDate):"-"}</td>
                                                <td>
                                                    <div class="flex items-center gap-2">
                                                        <button onclick="Sustainability.viewHazardousWasteRecord('${e.id}')" 
                                                                class="btn-icon btn-icon-info" title="\u0639\u0631\u0636">
                                                            <i class="fas fa-eye"></i>
                                                        </button>
                                                        ${this.canEdit()?`
                                                        <button onclick="Sustainability.editHazardousWasteRecord('${e.id}')" 
                                                                class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        `:""}
                                                        ${this.canDelete()?`
                                                        <button onclick="Sustainability.deleteHazardousWasteRecord('${e.id}')" 
                                                                class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                        `:""}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `},async renderWasteAnalytics(){const t=AppState.appData.wasteManagement||{regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]},a=this.getMonthlyWasteData(t);return`
            <div class="space-y-6">
                <!-- \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title text-sm">
                                <i class="fas fa-recycle text-green-500 ml-2"></i>
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0643\u0645\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                ${this.getTotalRegularWasteQuantity(t.regularWasteRecords||[])}
                            </div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">\u0648\u062D\u062F\u0629 \u0642\u064A\u0627\u0633</div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title text-sm">
                                <i class="fas fa-exclamation-triangle text-red-500 ml-2"></i>
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0643\u0645\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u062E\u0637\u0631\u0629
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                                ${this.getTotalHazardousWasteQuantity(t.hazardousWasteRecords||[])}
                            </div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">\u0648\u062D\u062F\u0629 \u0642\u064A\u0627\u0633</div>
                        </div>
                    </div>
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title text-sm">
                                <i class="fas fa-money-bill-wave text-blue-500 ml-2"></i>
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0627\u0626\u062F \u0645\u0646 \u0628\u064A\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                ${this.getTotalSalesRevenue(t.regularWasteSales||[]).toFixed(2)}
                            </div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">\u062C\u0646\u064A\u0647 \u0645\u0635\u0631\u064A</div>
                        </div>
                    </div>
                </div>

                <!-- \u0645\u0642\u0627\u0631\u0646\u0629 \u0634\u0647\u0631\u064A\u0629 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-bar ml-2"></i>
                            \u0645\u0642\u0627\u0631\u0646\u0629 \u0634\u0647\u0631\u064A\u0629 - \u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u0639\u0627\u0626\u062F
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="overflow-x-auto">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>\u0627\u0644\u0634\u0647\u0631</th>
                                        <th>\u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629</th>
                                        <th>\u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u062E\u0637\u0631\u0629</th>
                                        <th>\u0639\u0627\u0626\u062F \u0627\u0644\u0628\u064A\u0639 (\u062C.\u0645)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${a&&a.length>0?a.map(e=>`
                                        <tr>
                                            <td class="font-semibold">${Utils.escapeHTML(e.month||"")}</td>
                                            <td class="text-green-600 font-semibold">${(e.regularQuantity||0).toFixed(2)}</td>
                                            <td class="text-red-600 font-semibold">${(e.hazardousQuantity||0).toFixed(2)}</td>
                                            <td class="text-blue-600 font-semibold">${(e.revenue||0).toFixed(2)}</td>
                                        </tr>
                                    `).join(""):`
                                        <tr>
                                            <td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0639\u0631\u0636</td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `},async renderWasteTypesManagement(){return this.isAdmin()?`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-list ml-2"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u0639\u0627\u062F\u064A\u0629
                    </h2>
                </div>
                <div class="card-body">
                    <div class="space-y-3 mb-4">
                        ${((AppState.appData.wasteManagement||{regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"]}).regularWasteTypes||[]).map((e,s)=>`
                            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span class="font-semibold">${Utils.escapeHTML(e)}</span>
                                <button onclick="Sustainability.deleteWasteType(${s})" 
                                        class="btn-danger btn-sm">
                                    <i class="fas fa-trash ml-2"></i>
                                    \u062D\u0630\u0641
                                </button>
                            </div>
                        `).join("")}
                    </div>
                    <div class="flex gap-2">
                        <input type="text" id="new-waste-type-input" 
                               class="form-input flex-1" 
                               placeholder="\u0623\u062F\u062E\u0644 \u0646\u0648\u0639 \u0645\u062E\u0644\u0641\u0627\u062A \u062C\u062F\u064A\u062F">
                        <button onclick="Sustainability.addWasteType()" class="btn-success">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u062C\u062F\u064A\u062F
                        </button>
                    </div>
                </div>
            </div>
        `:'<div class="empty-state"><p class="text-gray-500">\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645</p></div>'},renderTopConsumingLocations(){const{water:t,electricity:a,gas:e,year:s}=this.getViewFilteredConsumption(),i={};[...t,...a,...e].forEach(l=>{const r=l.location||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";i[r]||(i[r]={water:0,electricity:0,gas:0,total:0});const o=l.source==="\u0645\u064A\u0627\u0647"?"water":l.source==="\u0643\u0647\u0631\u0628\u0627\u0621"?"electricity":l.source==="\u063A\u0627\u0632"?"gas":"other";o!=="other"&&(i[r][o]+=parseFloat(l.totalConsumption)||0,i[r].total+=parseFloat(l.totalConsumption)||0)});const n=Object.entries(i).sort((l,r)=>r[1].total-l[1].total).slice(0,5);return n.length===0?`<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0648\u0627\u0642\u0639 \u0644\u0633\u0646\u0629 <strong>${s}</strong></p>`:`
            <div class="space-y-3">
                ${n.map(([l,r],o)=>`
                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                ${o+1}
                            </div>
                            <div>
                                <div class="font-semibold">${Utils.escapeHTML(l)}</div>
                                <div class="text-xs text-gray-500">
                                    \u0645\u064A\u0627\u0647: ${r.water.toFixed(2)} | \u0643\u0647\u0631\u0628\u0627\u0621: ${r.electricity.toFixed(2)} | \u063A\u0627\u0632: ${r.gas.toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <div class="text-lg font-bold text-blue-600 dark:text-blue-400">
                            ${r.total.toFixed(2)}
                        </div>
                    </div>
                `).join("")}
            </div>
        `},showRegularWasteForm(t=null){const a=AppState.appData.wasteManagement||{regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[]},e=t?(a.regularWasteRecords||[]).find(r=>r.id===t):null,s=e?.date?new Date(e.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),i=a.regularWasteTypes||[],n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-recycle text-green-500 ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u0633\u062C\u0644 \u0645\u062E\u0644\u0641\u0627\u062A \u0639\u0627\u062F\u064A\u0629
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="regular-waste-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u062A\u0627\u0631\u064A\u062E <span class="text-red-500">*</span>
                                </label>
                                <input type="date" id="regular-waste-date" required 
                                       class="form-input" value="${s}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u0645\u0648\u0642\u0639 / \u0627\u0644\u0645\u0635\u0646\u0639 <span class="text-red-500">*</span>
                                </label>
                                <select id="regular-waste-location" required class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                    ${this.getSiteOptions().map(r=>`
                                        <option value="${Utils.escapeHTML(r.name)}" ${e?.location===r.name?"selected":""}>
                                            ${Utils.escapeHTML(r.name)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A <span class="text-red-500">*</span>
                                </label>
                                <select id="regular-waste-type" required class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639 --</option>
                                    ${i.map(r=>`
                                        <option value="${Utils.escapeHTML(r)}" ${e?.wasteType===r?"selected":""}>
                                            ${Utils.escapeHTML(r)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633 <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="regular-waste-unit" required 
                                       class="form-input" 
                                       value="${Utils.escapeHTML(e?.unit||"\u0643\u062C\u0645")}"
                                       placeholder="\u0643\u062C\u0645 / \u0637\u0646 / \u0645\xB3">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0627\u0644\u0643\u0645\u064A\u0629 <span class="text-red-500">*</span>
                            </label>
                            <input type="number" id="regular-waste-quantity" required step="0.01"
                                   class="form-input" 
                                   value="${e?.quantity||""}"
                                   placeholder="0.00">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C
                            </label>
                            <input type="text" id="regular-waste-department" 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.department||"")}"
                                   placeholder="\u0623\u062F\u062E\u0644 \u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0624\u0642\u062A
                            </label>
                            <input type="text" id="regular-waste-storage" 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.storageMethod||"")}"
                                   placeholder="\u0623\u062F\u062E\u0644 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </label>
                            <textarea id="regular-waste-notes" 
                                      class="form-input" rows="3"
                                      placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.notes||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="button" id="save-regular-waste-btn" class="btn-success">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),n.querySelector("#save-regular-waste-btn").addEventListener("click",()=>this.handleRegularWasteSubmit(t,n)),n.addEventListener("click",r=>{r.target===n&&n.remove()})},async handleRegularWasteSubmit(t,a){const e=document.getElementById("regular-waste-form");if(!e.checkValidity()){e.reportValidity();return}const s=new Date(document.getElementById("regular-waste-date").value),i=document.getElementById("regular-waste-location").value.trim(),n=document.getElementById("regular-waste-type").value.trim(),l=parseFloat(document.getElementById("regular-waste-quantity").value),r=document.getElementById("regular-waste-unit").value.trim(),o=document.getElementById("regular-waste-department").value.trim(),d=document.getElementById("regular-waste-storage").value.trim(),g=document.getElementById("regular-waste-notes").value.trim();AppState.appData.wasteManagement||(AppState.appData.wasteManagement={regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]});const c={id:t||Utils.generateId("RWR"),serialNumber:t?(AppState.appData.wasteManagement.regularWasteRecords||[]).find(m=>m.id===t)?.serialNumber:this.generateWasteSerialNumber("regular"),date:s.toISOString(),location:i,wasteType:n,quantity:l,unit:r,department:o,storageMethod:d,notes:g,createdAt:t?(AppState.appData.wasteManagement.regularWasteRecords||[]).find(m=>m.id===t)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown",updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown"};Loading.show();try{if(AppState.appData.wasteManagement.regularWasteRecords||(AppState.appData.wasteManagement.regularWasteRecords=[]),t){const m=AppState.appData.wasteManagement.regularWasteRecords.findIndex(b=>b.id===t);m!==-1&&(AppState.appData.wasteManagement.regularWasteRecords[m]=c,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.wasteManagement.regularWasteRecords.push(c),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Loading.hide(),a.remove(),this.load()}catch(m){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+m.message)}},showRegularWasteSaleForm(t=null){const a=AppState.appData.wasteManagement||{regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteSales:[]},e=t?(a.regularWasteSales||[]).find(r=>r.id===t):null,s=e?.date?new Date(e.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),i=a.regularWasteTypes||[],n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-shopping-cart text-blue-500 ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u0639\u0645\u0644\u064A\u0629 \u0628\u064A\u0639 \u0645\u062E\u0644\u0641\u0627\u062A \u0639\u0627\u062F\u064A\u0629
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="regular-waste-sale-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u062A\u0627\u0631\u064A\u062E <span class="text-red-500">*</span>
                                </label>
                                <input type="date" id="sale-date" required 
                                       class="form-input" value="${s}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u0645\u0648\u0642\u0639 <span class="text-red-500">*</span>
                                </label>
                                <select id="sale-location" required class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                    ${this.getSiteOptions().map(r=>`
                                        <option value="${Utils.escapeHTML(r.name)}" ${e?.location===r.name?"selected":""}>
                                            ${Utils.escapeHTML(r.name)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A <span class="text-red-500">*</span>
                                </label>
                                <select id="sale-waste-type" required class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639 --</option>
                                    ${i.map(r=>`
                                        <option value="${Utils.escapeHTML(r)}" ${e?.wasteType===r?"selected":""}>
                                            ${Utils.escapeHTML(r)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633 <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="sale-unit" required 
                                       class="form-input" 
                                       value="${Utils.escapeHTML(e?.unit||"\u0643\u062C\u0645")}"
                                       placeholder="\u0643\u062C\u0645 / \u0637\u0646 / \u0645\xB3">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u0643\u0645\u064A\u0629 <span class="text-red-500">*</span>
                                </label>
                                <input type="number" id="sale-quantity" required step="0.01"
                                       class="form-input" 
                                       value="${e?.quantity||""}"
                                       placeholder="0.00"
                                       onchange="Sustainability.calculateSaleTotal()">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629 (\u062C.\u0645) <span class="text-red-500">*</span>
                                </label>
                                <input type="number" id="sale-unit-price" required step="0.01"
                                       class="form-input" 
                                       value="${e?.unitPrice||""}"
                                       placeholder="0.00"
                                       onchange="Sustainability.calculateSaleTotal()">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u064A\u0645\u0629 (\u062C.\u0645) <span class="text-red-500">*</span>
                            </label>
                            <input type="number" id="sale-total-value" required step="0.01"
                                   class="form-input font-semibold" 
                                   value="${e?.totalValue||""}"
                                   placeholder="\u0633\u064A\u062A\u0645 \u062D\u0633\u0627\u0628\u0647 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" readonly>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u062A\u0631\u064A / \u0627\u0644\u062C\u0647\u0629 <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="sale-buyer" required 
                                       class="form-input" 
                                       value="${Utils.escapeHTML(e?.buyerName||"")}"
                                       placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u062A\u0631\u064A">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0628\u064A\u0639 <span class="text-red-500">*</span>
                                </label>
                                <select id="sale-payment-method" required class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0628\u064A\u0639 --</option>
                                    <option value="\u0646\u0642\u062F\u064A" ${e?.paymentMethod==="\u0646\u0642\u062F\u064A"?"selected":""}>\u0646\u0642\u062F\u064A</option>
                                    <option value="\u062A\u062D\u0648\u064A\u0644" ${e?.paymentMethod==="\u062A\u062D\u0648\u064A\u0644"?"selected":""}>\u062A\u062D\u0648\u064A\u0644</option>
                                    <option value="\u062A\u0639\u0627\u0642\u062F" ${e?.paymentMethod==="\u062A\u0639\u0627\u0642\u062F"?"selected":""}>\u062A\u0639\u0627\u0642\u062F</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </label>
                            <textarea id="sale-notes" 
                                      class="form-input" rows="3"
                                      placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.notes||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="button" id="save-sale-btn" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),n.querySelector("#save-sale-btn").addEventListener("click",()=>this.handleRegularWasteSaleSubmit(t,n)),n.addEventListener("click",r=>{r.target===n&&n.remove()}),setTimeout(()=>this.calculateSaleTotal(),100)},calculateSaleTotal(){const t=document.getElementById("sale-quantity"),a=document.getElementById("sale-unit-price"),e=document.getElementById("sale-total-value");if(t&&a&&e){const s=parseFloat(t.value)||0,i=parseFloat(a.value)||0,n=s*i;e.value=n.toFixed(2)}},async handleRegularWasteSaleSubmit(t,a){const e=document.getElementById("regular-waste-sale-form");if(!e.checkValidity()){e.reportValidity();return}const s=new Date(document.getElementById("sale-date").value),i=document.getElementById("sale-location").value.trim(),n=document.getElementById("sale-waste-type").value.trim(),l=parseFloat(document.getElementById("sale-quantity").value),r=document.getElementById("sale-unit").value.trim(),o=parseFloat(document.getElementById("sale-unit-price").value),d=parseFloat(document.getElementById("sale-total-value").value),g=document.getElementById("sale-buyer").value.trim(),c=document.getElementById("sale-payment-method").value.trim(),m=document.getElementById("sale-notes").value.trim();AppState.appData.wasteManagement||(AppState.appData.wasteManagement={regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]});const b={id:t||Utils.generateId("RWS"),transactionNumber:t?(AppState.appData.wasteManagement.regularWasteSales||[]).find(u=>u.id===t)?.transactionNumber:this.generateSaleTransactionNumber(),date:s.toISOString(),location:i,wasteType:n,quantity:l,unit:r,unitPrice:o,totalValue:d,buyerName:g,paymentMethod:c,notes:m,createdAt:t?(AppState.appData.wasteManagement.regularWasteSales||[]).find(u=>u.id===t)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown",updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown"};Loading.show();try{if(AppState.appData.wasteManagement.regularWasteSales||(AppState.appData.wasteManagement.regularWasteSales=[]),t){const u=AppState.appData.wasteManagement.regularWasteSales.findIndex(f=>f.id===t);u!==-1&&(AppState.appData.wasteManagement.regularWasteSales[u]=b,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0628\u064A\u0639 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.wasteManagement.regularWasteSales.push(b),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0628\u064A\u0639 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Loading.hide(),a.remove(),this.load()}catch(u){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+u.message)}},showHazardousWasteForm(t=null){const a=AppState.appData.wasteManagement||{hazardousWasteRecords:[]},e=t?(a.hazardousWasteRecords||[]).find(r=>r.id===t):null,s=e?.date?new Date(e.date).toISOString().slice(0,10):new Date().toISOString().slice(0,10),i=e?.transportDate?new Date(e.transportDate).toISOString().slice(0,10):"",n=document.createElement("div");n.className="modal-overlay",n.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-exclamation-triangle text-red-500 ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644":"\u0625\u0636\u0627\u0641\u0629"} \u0633\u062C\u0644 \u0645\u062E\u0644\u0641\u0627\u062A \u062E\u0637\u0631\u0629
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="hazardous-waste-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u062A\u0627\u0631\u064A\u062E <span class="text-red-500">*</span>
                                </label>
                                <input type="date" id="hazardous-waste-date" required 
                                       class="form-input" value="${s}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u0645\u0648\u0642\u0639 <span class="text-red-500">*</span>
                                </label>
                                <select id="hazardous-waste-location" required class="form-input">
                                    <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 --</option>
                                    ${this.getSiteOptions().map(r=>`
                                        <option value="${Utils.escapeHTML(r.name)}" ${e?.location===r.name?"selected":""}>
                                            ${Utils.escapeHTML(r.name)}
                                        </option>
                                    `).join("")}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="hazardous-waste-type" required 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.wasteType||"")}"
                                   placeholder="\u0623\u062F\u062E\u0644 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0627\u0644\u062E\u0637\u0631\u0629">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0627\u0644\u0643\u0645\u064A\u0629 <span class="text-red-500">*</span>
                                </label>
                                <input type="number" id="hazardous-waste-quantity" required step="0.01"
                                       class="form-input" 
                                       value="${e?.quantity||""}"
                                       placeholder="0.00">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    \u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633 <span class="text-red-500">*</span>
                                </label>
                                <input type="text" id="hazardous-waste-unit" required 
                                       class="form-input" 
                                       value="${Utils.escapeHTML(e?.unit||"\u0643\u062C\u0645")}"
                                       placeholder="\u0643\u062C\u0645 / \u0644\u062A\u0631 / \u0645\xB3">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="hazardous-waste-classification" required 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.hazardClassification||"")}"
                                   placeholder="\u0645\u062B\u0627\u0644: \u0633\u0627\u0645 / \u0642\u0627\u0628\u0644 \u0644\u0644\u0627\u0634\u062A\u0639\u0627\u0644 / \u0645\u0633\u0628\u0628 \u0644\u0644\u062A\u0622\u0643\u0644">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646
                            </label>
                            <input type="text" id="hazardous-waste-storage" 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.storageMethod||"")}"
                                   placeholder="\u0623\u062F\u062E\u0644 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u0642\u0644 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629
                            </label>
                            <input type="text" id="hazardous-waste-transport" 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.transportCompany||"")}"
                                   placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u0642\u0644">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629
                            </label>
                            <input type="text" id="hazardous-waste-treatment" 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.treatmentFacility||"")}"
                                   placeholder="\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0642\u0644
                            </label>
                            <input type="date" id="hazardous-waste-transport-date" 
                                   class="form-input" 
                                   value="${i}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0645\u0631\u0641\u0642\u0629 (\u0631\u0627\u0628\u0637)
                            </label>
                            <input type="url" id="hazardous-waste-documents" 
                                   class="form-input" 
                                   value="${Utils.escapeHTML(e?.documents||"")}"
                                   placeholder="https://...">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A
                            </label>
                            <textarea id="hazardous-waste-notes" 
                                      class="form-input" rows="3"
                                      placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.notes||"")}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u0644\u063A\u0627\u0621
                    </button>
                    <button type="button" id="save-hazardous-waste-btn" class="btn-danger">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),n.querySelector("#save-hazardous-waste-btn").addEventListener("click",()=>this.handleHazardousWasteSubmit(t,n)),n.addEventListener("click",r=>{r.target===n&&n.remove()})},async handleHazardousWasteSubmit(t,a){const e=document.getElementById("hazardous-waste-form");if(!e.checkValidity()){e.reportValidity();return}const s=new Date(document.getElementById("hazardous-waste-date").value),i=document.getElementById("hazardous-waste-location").value.trim(),n=document.getElementById("hazardous-waste-type").value.trim(),l=parseFloat(document.getElementById("hazardous-waste-quantity").value),r=document.getElementById("hazardous-waste-unit").value.trim(),o=document.getElementById("hazardous-waste-classification").value.trim(),d=document.getElementById("hazardous-waste-storage").value.trim(),g=document.getElementById("hazardous-waste-transport").value.trim(),c=document.getElementById("hazardous-waste-treatment").value.trim(),m=document.getElementById("hazardous-waste-transport-date").value,b=m?new Date(m).toISOString():null,u=document.getElementById("hazardous-waste-documents").value.trim(),f=document.getElementById("hazardous-waste-notes").value.trim();AppState.appData.wasteManagement||(AppState.appData.wasteManagement={regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]});const y={id:t||Utils.generateId("HWR"),serialNumber:t?(AppState.appData.wasteManagement.hazardousWasteRecords||[]).find(p=>p.id===t)?.serialNumber:this.generateWasteSerialNumber("hazardous"),date:s.toISOString(),location:i,wasteType:n,quantity:l,unit:r,hazardClassification:o,storageMethod:d,transportCompany:g,treatmentFacility:c,transportDate:b,documents:u,notes:f,createdAt:t?(AppState.appData.wasteManagement.hazardousWasteRecords||[]).find(p=>p.id===t)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown",updatedBy:AppState.currentUser?.email||AppState.currentUser?.name||"Unknown"};Loading.show();try{if(AppState.appData.wasteManagement.hazardousWasteRecords||(AppState.appData.wasteManagement.hazardousWasteRecords=[]),t){const p=AppState.appData.wasteManagement.hazardousWasteRecords.findIndex(k=>k.id===t);p!==-1&&(AppState.appData.wasteManagement.hazardousWasteRecords[p]=y,Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.wasteManagement.hazardousWasteRecords.push(y),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Loading.hide(),a.remove(),this.load()}catch(p){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+p.message)}},async addWasteType(){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0625\u0636\u0627\u0641\u0629 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A");return}const t=document.getElementById("new-waste-type-input");if(!t||!t.value.trim()){Notification.warning("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A");return}AppState.appData.wasteManagement||(AppState.appData.wasteManagement={regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]}),AppState.appData.wasteManagement.regularWasteTypes||(AppState.appData.wasteManagement.regularWasteTypes=[]);const a=t.value.trim();if(AppState.appData.wasteManagement.regularWasteTypes.includes(a)){Notification.warning("\u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639 \u0645\u0648\u062C\u0648\u062F \u0628\u0627\u0644\u0641\u0639\u0644");return}AppState.appData.wasteManagement.regularWasteTypes.push(a),t.value="",typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),this.load()},async deleteWasteType(t){if(!this.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0646\u0648\u0639\u061F"))return;const a=AppState.appData.wasteManagement||{};a.regularWasteTypes&&a.regularWasteTypes[t]&&(a.regularWasteTypes.splice(t,1),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),this.load())},viewRegularWasteRecord(t){const e=((AppState.appData.wasteManagement||{}).regularWasteRecords||[]).find(i=>i.id===t);if(!e){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-recycle text-green-500 ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0633\u062C\u0644 \u0645\u062E\u0644\u0641\u0627\u062A \u0639\u0627\u062F\u064A\u0629
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div class="grid grid-cols-2 gap-4">
                            <div><strong>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A:</strong> ${Utils.escapeHTML(e.serialNumber||"")}</div>
                            <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.formatDate(e.date)}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(e.location||"")}</div>
                            <div><strong>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A:</strong> ${Utils.escapeHTML(e.wasteType||"")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${parseFloat(e.quantity||0).toFixed(2)}</div>
                            <div><strong>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633:</strong> ${Utils.escapeHTML(e.unit||"")}</div>
                            <div><strong>\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C:</strong> ${Utils.escapeHTML(e.department||"-")}</div>
                            <div><strong>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646:</strong> ${Utils.escapeHTML(e.storageMethod||"-")}</div>
                        </div>
                        ${e.notes?`
                            <div class="mt-4 pt-4 border-t">
                                <strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong>
                                <p class="text-gray-700 dark:text-gray-300 mt-2">${Utils.escapeHTML(e.notes)}</p>
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u063A\u0644\u0627\u0642
                    </button>
                    ${this.canEdit()?`
                    <button type="button" class="btn-success" onclick="Sustainability.editRegularWasteRecord('${t}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",i=>{i.target===s&&s.remove()})},editRegularWasteRecord(t){if(!this.canEdit()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}this.showRegularWasteForm(t)},async deleteRegularWasteRecord(t){if(!this.canDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{const a=AppState.appData.wasteManagement||{};a.regularWasteRecords&&(a.regularWasteRecords=a.regularWasteRecords.filter(e=>e.id!==t)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.load()}catch(a){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}finally{Loading.hide()}}},viewRegularWasteSale(t){const e=((AppState.appData.wasteManagement||{}).regularWasteSales||[]).find(i=>i.id===t);if(!e){Notification.error("\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0628\u064A\u0639 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-shopping-cart text-blue-500 ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0628\u064A\u0639
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div class="grid grid-cols-2 gap-4">
                            <div><strong>\u0631\u0642\u0645 \u0627\u0644\u0639\u0645\u0644\u064A\u0629:</strong> ${Utils.escapeHTML(e.transactionNumber||"")}</div>
                            <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.formatDate(e.date)}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(e.location||"")}</div>
                            <div><strong>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A:</strong> ${Utils.escapeHTML(e.wasteType||"")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${parseFloat(e.quantity||0).toFixed(2)}</div>
                            <div><strong>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633:</strong> ${Utils.escapeHTML(e.unit||"")}</div>
                            <div><strong>\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629:</strong> ${parseFloat(e.unitPrice||0).toFixed(2)} \u062C.\u0645</div>
                            <div><strong>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0642\u064A\u0645\u0629:</strong> <span class="font-semibold text-green-600">${parseFloat(e.totalValue||0).toFixed(2)} \u062C.\u0645</span></div>
                            <div><strong>\u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u062A\u0631\u064A:</strong> ${Utils.escapeHTML(e.buyerName||"")}</div>
                            <div><strong>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0628\u064A\u0639:</strong> ${Utils.escapeHTML(e.paymentMethod||"")}</div>
                        </div>
                        ${e.notes?`
                            <div class="mt-4 pt-4 border-t">
                                <strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong>
                                <p class="text-gray-700 dark:text-gray-300 mt-2">${Utils.escapeHTML(e.notes)}</p>
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u063A\u0644\u0627\u0642
                    </button>
                    ${this.canEdit()?`
                    <button type="button" class="btn-primary" onclick="Sustainability.editRegularWasteSale('${t}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",i=>{i.target===s&&s.remove()})},editRegularWasteSale(t){if(!this.canEdit()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0628\u064A\u0639");return}this.showRegularWasteSaleForm(t)},async deleteRegularWasteSale(t){if(!this.canDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0628\u064A\u0639");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0628\u064A\u0639 \u0647\u0630\u0647\u061F")){Loading.show();try{const a=AppState.appData.wasteManagement||{};a.regularWasteSales&&(a.regularWasteSales=a.regularWasteSales.filter(e=>e.id!==t)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0628\u064A\u0639 \u0628\u0646\u062C\u0627\u062D"),this.load()}catch(a){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}finally{Loading.hide()}}},viewHazardousWasteRecord(t){const e=((AppState.appData.wasteManagement||{}).hazardousWasteRecords||[]).find(i=>i.id===t);if(!e){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-exclamation-triangle text-red-500 ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0633\u062C\u0644 \u0645\u062E\u0644\u0641\u0627\u062A \u062E\u0637\u0631\u0629
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-3">
                        <div class="grid grid-cols-2 gap-4">
                            <div><strong>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A:</strong> ${Utils.escapeHTML(e.serialNumber||"")}</div>
                            <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.formatDate(e.date)}</div>
                            <div><strong>\u0627\u0644\u0645\u0648\u0642\u0639:</strong> ${Utils.escapeHTML(e.location||"")}</div>
                            <div><strong>\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A:</strong> ${Utils.escapeHTML(e.wasteType||"")}</div>
                            <div><strong>\u0627\u0644\u0643\u0645\u064A\u0629:</strong> ${parseFloat(e.quantity||0).toFixed(2)}</div>
                            <div><strong>\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633:</strong> ${Utils.escapeHTML(e.unit||"")}</div>
                            <div><strong>\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062E\u0637\u0648\u0631\u0629:</strong> <span class="badge badge-danger">${Utils.escapeHTML(e.hazardClassification||"")}</span></div>
                            <div><strong>\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646:</strong> ${Utils.escapeHTML(e.storageMethod||"-")}</div>
                            <div><strong>\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u0642\u0644:</strong> ${Utils.escapeHTML(e.transportCompany||"-")}</div>
                            <div><strong>\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629:</strong> ${Utils.escapeHTML(e.treatmentFacility||"-")}</div>
                            <div><strong>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0642\u0644:</strong> ${e.transportDate?Utils.formatDate(e.transportDate):"-"}</div>
                            ${e.documents?`
                            <div class="col-span-2">
                                <strong>\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0645\u0631\u0641\u0642\u0629:</strong>
                                <a href="${Utils.escapeHTML(e.documents)}" target="_blank" class="text-blue-600 hover:underline">
                                    ${Utils.escapeHTML(e.documents)}
                                </a>
                            </div>
                            `:""}
                        </div>
                        ${e.notes?`
                            <div class="mt-4 pt-4 border-t">
                                <strong>\u0645\u0644\u0627\u062D\u0638\u0627\u062A:</strong>
                                <p class="text-gray-700 dark:text-gray-300 mt-2">${Utils.escapeHTML(e.notes)}</p>
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        \u0625\u063A\u0644\u0627\u0642
                    </button>
                    ${this.canEdit()?`
                    <button type="button" class="btn-danger" onclick="Sustainability.editHazardousWasteRecord('${t}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",i=>{i.target===s&&s.remove()})},editHazardousWasteRecord(t){if(!this.canEdit()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}this.showHazardousWasteForm(t)},async deleteHazardousWasteRecord(t){if(!this.canDelete()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A");return}if(confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644\u061F")){Loading.show();try{const a=AppState.appData.wasteManagement||{};a.hazardousWasteRecords&&(a.hazardousWasteRecords=a.hazardousWasteRecords.filter(e=>e.id!==t)),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),await this.saveWasteManagementToSheets(),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644 \u0628\u0646\u062C\u0627\u062D"),this.load()}catch(a){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+a.message)}finally{Loading.hide()}}},async loadWasteManagementFromSheets(){if(!(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl)&&!(typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function"))try{const t=AppState.googleConfig?.sheets?.spreadsheetId;if(!t)return;const a=await GoogleIntegration.sendRequest({action:"batchReadSheets",data:{sheetNames:["WasteManagement_RegularWasteTypes","WasteManagement_RegularWasteRecords","WasteManagement_RegularWasteSales","WasteManagement_HazardousWasteRecords"],spreadsheetId:t}});if(a&&a.success&&a.data){const e=a.data;if(e.WasteManagement_RegularWasteTypes){const s=e.WasteManagement_RegularWasteTypes.map(i=>i.name).filter(Boolean);s.length>0&&(AppState.appData.wasteManagement.regularWasteTypes=s)}e.WasteManagement_RegularWasteRecords&&(AppState.appData.wasteManagement.regularWasteRecords=e.WasteManagement_RegularWasteRecords),e.WasteManagement_RegularWasteSales&&(AppState.appData.wasteManagement.regularWasteSales=e.WasteManagement_RegularWasteSales),e.WasteManagement_HazardousWasteRecords&&(AppState.appData.wasteManagement.hazardousWasteRecords=e.WasteManagement_HazardousWasteRecords)}else Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062C\u062F\u0627\u0648\u0644 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A \u0623\u0648 \u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0635\u0627\u0644\u062D\u0629",a);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.currentTab==="waste-management"&&this.load()}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A:",t)}},async loadResourceConsumptionFromSheets(){if(!AppState.googleConfig?.appsScript?.enabled||!AppState.googleConfig?.appsScript?.scriptUrl||typeof GoogleIntegration>"u"||typeof GoogleIntegration.sendRequest!="function")return;if(this._resourceConsumptionFetchPromise)return this._resourceConsumptionFetchPromise;const t=AppState.googleConfig?.sheets?.spreadsheetId;if(t)return this._resourceConsumptionFetchPromise=(async()=>{try{AppState.appData.resourceConsumption||(AppState.appData.resourceConsumption={water:[],electricity:[],gas:[]});const a=(n=[])=>(Array.isArray(n)?n:[]).map(l=>this.normalizeResourceConsumptionRecord(l)).filter(Boolean),e=await GoogleIntegration.sendRequest({action:"batchReadSheets",data:{sheetNames:["WaterManagement_Records","GasManagement_Records","ElectricityManagement_Records"],spreadsheetId:t}});if(e&&e.success&&e.data){const n=e.data;n.WaterManagement_Records&&(AppState.appData.resourceConsumption.water=a(n.WaterManagement_Records)),n.GasManagement_Records&&(AppState.appData.resourceConsumption.gas=a(n.GasManagement_Records)),n.ElectricityManagement_Records&&(AppState.appData.resourceConsumption.electricity=a(n.ElectricityManagement_Records))}else Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 batchReadSheets",e);typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const s=document.getElementById("sustainability-quick-stats");if(s&&(s.innerHTML=this.renderQuickStats()),typeof AppState<"u"&&AppState.currentSection==="sustainability"&&document.getElementById("sustainability-section")){if(this.currentTab==="dashboard"){const n=document.getElementById("sustainability-content");n&&(n.innerHTML=await this.renderDashboard(),this.renderCharts())}else if(this.currentTab==="water"||this.currentTab==="electricity"||this.currentTab==="gas"){const n=document.getElementById("sustainability-content");n&&(n.innerHTML=await this.renderContent())}}typeof Dashboard<"u"&&typeof Dashboard.updateReportsStatistics=="function"&&Dashboard.updateReportsStatistics()}catch(a){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F:",a)}finally{this._resourceConsumptionFetchPromise=null}})(),this._resourceConsumptionFetchPromise},normalizeResourceConsumptionRecord(t){if(!t||typeof t!="object")return null;const a=(...o)=>{for(const d of o)if(t[d]!==void 0&&t[d]!==null&&String(t[d]).trim()!=="")return t[d];return""},e=o=>{if(typeof o=="boolean")return o;const d=String(o||"").trim().toLowerCase();return d==="true"||d==="1"||d==="yes"||d==="TRUE"},s=(()=>{const o=a("date","Date","\u0627\u0644\u062A\u0627\u0631\u064A\u062E","recordDate"),d=new Date(o||new Date);return Number.isNaN(d.getTime())?new Date:d})(),i=parseFloat(a("startReading","start_reading","\u0628\u062F\u0627\u064A\u0629","StartReading","\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629")),n=parseFloat(a("endReading","end_reading","\u0646\u0647\u0627\u064A\u0629","EndReading","\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0646\u0647\u0627\u064A\u0629"));let l=parseFloat(a("totalConsumption","total","Total Consumption","\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643","\u0627\u0644\u0627\u0633\u062A\u0647\u0644\u0627\u0643"));Number.isFinite(l)||(l=Number.isFinite(n)&&Number.isFinite(i)?Math.max(0,n-i):0);const r=a("monthYear","month","Month/Year","\u0627\u0644\u0634\u0647\u0631 / \u0627\u0644\u0633\u0646\u0629","\u0627\u0644\u0634\u0647\u0631/\u0627\u0644\u0633\u0646\u0629");return{id:String(a("id","ID","recordId")||Utils.generateId("RES")),serialNumber:String(a("serialNumber","serial","Serial Number","\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u0644\u0633\u0644\u064A")||""),date:s.toISOString(),monthYear:String(r||this.getMonthYear(s)),location:String(a("location","site","locationName","\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0645\u0635\u0646\u0639")||""),source:String(a("source","\u0627\u0644\u0645\u0635\u062F\u0631","Source")||""),startReading:Number.isFinite(i)?i:0,endReading:Number.isFinite(n)?n:0,totalConsumption:l,unit:String(a("unit","\u0648\u062D\u062F\u0629 \u0627\u0644\u0642\u064A\u0627\u0633","Unit")||""),department:String(a("department","\u0627\u0644\u062C\u0647\u0629","\u0627\u0644\u0642\u0633\u0645","Department")||""),notes:String(a("notes","Notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A")||""),hasAlert:e(a("hasAlert","has_alert","HasAlert","\u062A\u0646\u0628\u064A\u0647")),createdAt:String(a("createdAt","Created At","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621")||s.toISOString()),updatedAt:new Date().toISOString(),createdBy:String(a("createdBy","created_by","\u0627\u0644\u0645\u0646\u0634\u0626")||""),updatedBy:String(a("updatedBy","updated_by","\u0627\u0644\u0645\u0639\u062F\u0644")||"")}},async saveWasteManagementToSheets(){const t=AppState.appData.wasteManagement||{regularWasteTypes:["\u062E\u0634\u0628","\u0648\u0631\u0642","\u0627\u0633\u062A\u0631\u062A\u0634","\u0628\u0644\u0627\u0633\u062A\u064A\u0643","\u0634\u0643\u0627\u0626\u0631","\u062C\u0631\u0627\u0643\u0646 \u0641\u0627\u0631\u063A\u0629"],regularWasteRecords:[],regularWasteSales:[],hazardousWasteRecords:[]};try{const a=(t.regularWasteTypes||[]).map((e,s)=>({id:`WT-${s+1}`,name:e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}));return await GoogleIntegration.autoSave("WasteManagement_RegularWasteTypes",a),await GoogleIntegration.autoSave("WasteManagement_RegularWasteRecords",t.regularWasteRecords||[]),await GoogleIntegration.autoSave("WasteManagement_RegularWasteSales",t.regularWasteSales||[]),await GoogleIntegration.autoSave("WasteManagement_HazardousWasteRecords",t.hazardousWasteRecords||[]),{success:!0}}catch(a){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A:",a),{success:!1,error:a.message}}},async saveResourceConsumptionToSheets(){const t=AppState.appData.resourceConsumption||{water:[],electricity:[],gas:[]},a=[{sheetName:"WaterManagement_Records",rows:t.water||[]},{sheetName:"GasManagement_Records",rows:t.gas||[]},{sheetName:"ElectricityManagement_Records",rows:t.electricity||[]}];try{const e=[];for(const{sheetName:n,rows:l}of a){const r=await GoogleIntegration.autoSave(n,l,{silent:!0});e.push({sheetName:n,success:!!(r&&r.success),message:r&&(r.message||"")})}const s=e.filter(n=>!n.success);if(s.length===0)return{success:!0,results:e};const i=s.map(n=>`${n.sheetName}: ${n.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638"}`).join(" \u2014 ");return Utils.safeWarn("\u26A0\uFE0F \u062D\u0641\u0638 \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0644\u0645 \u064A\u0643\u062A\u0645\u0644:",i),{success:!1,results:e,message:i}}catch(e){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0633\u062A\u0647\u0644\u0627\u0643 \u0627\u0644\u0645\u0648\u0627\u0631\u062F:",e),{success:!1,error:e.message,results:[]}}},generateWasteSerialNumber(t){const a=AppState.appData.wasteManagement||{},e=t==="regular"?"RWR":"HWR",i=(t==="regular"?a.regularWasteRecords||[]:a.hazardousWasteRecords||[]).length+1;return`${e}-${String(i).padStart(6,"0")}`},generateSaleTransactionNumber(){const e=((AppState.appData.wasteManagement||{}).regularWasteSales||[]).length+1;return`SALE-${new Date().getFullYear()}-${String(e).padStart(6,"0")}`},getTotalRegularWasteQuantity(t){return!t||t.length===0?"0.00":t.reduce((e,s)=>e+(parseFloat(s.quantity)||0),0).toFixed(2)},getTotalHazardousWasteQuantity(t){return!t||t.length===0?"0.00":t.reduce((e,s)=>e+(parseFloat(s.quantity)||0),0).toFixed(2)},getTotalSalesRevenue(t){return!t||t.length===0?0:t.reduce((a,e)=>a+(parseFloat(e.totalValue)||0),0)},getMonthlyWasteData(t){try{const a={},e=["\u064A\u0646\u0627\u064A\u0631","\u0641\u0628\u0631\u0627\u064A\u0631","\u0645\u0627\u0631\u0633","\u0623\u0628\u0631\u064A\u0644","\u0645\u0627\u064A\u0648","\u064A\u0648\u0646\u064A\u0648","\u064A\u0648\u0644\u064A\u0648","\u0623\u063A\u0633\u0637\u0633","\u0633\u0628\u062A\u0645\u0628\u0631","\u0623\u0643\u062A\u0648\u0628\u0631","\u0646\u0648\u0641\u0645\u0628\u0631","\u062F\u064A\u0633\u0645\u0628\u0631"];return(t?.regularWasteRecords||[]).forEach(s=>{try{if(!s||!s.date)return;const i=new Date(s.date);if(isNaN(i.getTime()))return;const n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`,l=`${e[i.getMonth()]} ${i.getFullYear()}`;a[n]||(a[n]={month:l,regularQuantity:0,hazardousQuantity:0,revenue:0}),a[n].regularQuantity+=parseFloat(s.quantity)||0}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0633\u062C\u0644 \u0645\u062E\u0644\u0641\u0627\u062A \u0639\u0627\u062F\u064A\u0629:",i)}}),(t?.hazardousWasteRecords||[]).forEach(s=>{try{if(!s||!s.date)return;const i=new Date(s.date);if(isNaN(i.getTime()))return;const n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`,l=`${e[i.getMonth()]} ${i.getFullYear()}`;a[n]||(a[n]={month:l,regularQuantity:0,hazardousQuantity:0,revenue:0}),a[n].hazardousQuantity+=parseFloat(s.quantity)||0}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0633\u062C\u0644 \u0645\u062E\u0644\u0641\u0627\u062A \u062E\u0637\u0631\u0629:",i)}}),(t?.regularWasteSales||[]).forEach(s=>{try{if(!s||!s.date)return;const i=new Date(s.date);if(isNaN(i.getTime()))return;const n=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`,l=`${e[i.getMonth()]} ${i.getFullYear()}`;a[n]||(a[n]={month:l,regularQuantity:0,hazardousQuantity:0,revenue:0}),a[n].revenue+=parseFloat(s.totalValue)||0}catch(i){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0639\u0645\u0644\u064A\u0629 \u0628\u064A\u0639:",i)}}),Object.entries(a).sort((s,i)=>i[0].localeCompare(s[0])).slice(0,12).map(([s,i])=>i)}catch(a){return Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A getMonthlyWasteData:",a),[]}}};(function(){"use strict";try{typeof window<"u"&&typeof Sustainability<"u"&&(window.Sustainability=Sustainability,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Sustainability module loaded and available on window.Sustainability"))}catch{if(typeof window<"u"&&typeof Sustainability<"u")try{window.Sustainability=Sustainability}catch{}}})();
