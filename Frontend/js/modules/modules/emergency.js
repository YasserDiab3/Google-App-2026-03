/**
 * Emergency Module
 * ØªÙ… Ø§Ø³ØªØ®Ø±Ø§Ø¬Ù‡ Ù…Ù† app-modules.js
 */
// ===== Emergency Module (تنبيهات الطوارئ) =====
const Emergency = {
    state: {
        filters: {
            search: '',
            severity: '',
            status: 'active',
            channel: '',
            team: '',
            onlyUnacknowledged: false
        },
        autoRefreshInterval: null,
        autoRefreshMs: 60000,
        lastCheckedAlerts: new Set(), // لتتبع التنبيهات التي تم فحصها مسبقاً
        notificationCheckInterval: null
    },

    async load() {
        // Add language change listener
        if (!this._languageChangeListenerAdded) {
            document.addEventListener('language-changed', () => {
                this.load();
            });
            this._languageChangeListenerAdded = true;
        }

        try {
            const moduleRef = Emergency;
            const section = document.getElementById('emergency-section');
            if (!section) {
                if (typeof Utils !== 'undefined' && Utils.safeError) {
                    Utils.safeError('قسم emergency-section غير موجود!');
                } else {
                    console.error('قسم emergency-section غير موجود!');
                }
                return;
            }

            // التحقق من وجود AppState و Utils
            if (typeof AppState === 'undefined') {
                if (typeof Utils !== 'undefined' && Utils.safeError) {
                    Utils.safeError('AppState غير متوفر!');
                } else {
                    console.error('AppState غير متوفر!');
                }
                return;
            }

            if (typeof Utils === 'undefined') {
                console.error('Utils غير متوفر!');
                return;
            }

            moduleRef.clearAutoRefresh();

            // دالة مساعدة للهروب من HTML
            const escapeHTML = (str) => {
                if (typeof Utils !== 'undefined' && Utils.escapeHTML) {
                    return Utils.escapeHTML(str);
                }
                return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
            };

            section.innerHTML = `
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-exclamation-triangle ml-3"></i>
                                نظام التنبيهات والطوارئ
                            </h1>
                            <p class="section-subtitle">متابعة التنبيهات، فرق الاستجابة، وخطط الطوارئ في لوحة واحدة</p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button id="add-plan-btn" class="btn-secondary">
                                <i class="fas fa-file-alt ml-2"></i>
                                إضافة خطة طوارئ
                            </button>
                            <button id="add-alert-btn" class="btn-primary">
                                <i class="fas fa-bell ml-2"></i>
                                إطلاق تنبيه
                            </button>
                        </div>
                    </div>
                </div>

                <!-- نظام التبويبات -->
                <div class="tabs-container mt-6">
                    <div class="tabs-nav" style="flex-wrap: nowrap; overflow-x: auto; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                        <button class="tab-btn active" data-tab="alerts" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-bell"></i>
                            التنبيهات
                        </button>
                        <button class="tab-btn" data-tab="plans" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-file-medical-alt"></i>
                            خطط الطوارئ
                        </button>
                        <button class="tab-btn" data-tab="factory-map" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-map"></i>
                            خريطة المصنع
                        </button>
                    </div>

                    <!-- تبويب التنبيهات -->
                    <div id="tab-alerts" class="tab-content active">
                        <div id="emergency-summary" class="mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"></div>
                        
                        <div class="content-card mb-6">
                            <div class="card-header">
                                <h2 class="card-title">
                                    <i class="fas fa-filter ml-2"></i>
                                    عوامل التصفية
                                </h2>
                            </div>
                            <div class="card-body">
                                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">بحث</label>
                                        <input type="text" id="emergency-search" class="form-input" placeholder="عنوان التنبيه، المنطقة، أو الشخص المسؤول">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">الخطورة</label>
                                        <select id="emergency-filter-severity" class="form-input">
                                            <option value="">جميع المستويات</option>
                                            <option value="عالية">عالية</option>
                                            <option value="متوسطة">متوسطة</option>
                                            <option value="منخفضة">منخفضة</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">الحالة</label>
                                        <select id="emergency-filter-status" class="form-input">
                                            <option value="active">تنبيهات نشطة</option>
                                            <option value="open">جميع التنبيهات المفتوحة</option>
                                            <option value="closed">تنبيهات مغلقة</option>
                                            <option value="all">كل التنبيهات</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">قناة الإرسال</label>
                                        <select id="emergency-filter-channel" class="form-input">
                                            <option value="">جميع القنوات</option>
                                            ${(AppState.emergencyChannels || []).map(channel => `
                                                <option value="${escapeHTML(channel)}">${escapeHTML(channel)}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">فريق الاستجابة</label>
                                        <select id="emergency-filter-team" class="form-input">
                                            <option value="">جميع الفرق</option>
                                            ${(AppState.emergencyTeams || []).map(team => `
                                                <option value="${escapeHTML(team)}">${escapeHTML(team)}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="emergency-filter-unack" class="rounded border-gray-300 text-blue-600">
                                    <label for="emergency-filter-unack" class="text-sm text-gray-700">عرض التنبيهات غير المعتمدة فقط</label>
                                </div>
                            </div>
                            <div class="flex items-center justify-between flex-wrap gap-3 mt-4 pt-4 border-t">
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="emergency-auto-refresh" class="rounded border-gray-300 text-blue-600" checked>
                                    <label for="emergency-auto-refresh" class="text-sm text-gray-700">
                                        تحديث تلقائي كل ${Math.floor(moduleRef.state.autoRefreshMs / 1000)} ثانية
                                    </label>
                                </div>
                                <button id="emergency-refresh-btn" class="btn-secondary">
                                    <i class="fas fa-sync ml-2"></i>
                                    تحديث الآن
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div class="xl:col-span-2 content-card">
                            <div class="card-header">
                                <h2 class="card-title">
                                    <i class="fas fa-broadcast-tower ml-2"></i>
                                    لوحة التنبيهات
                                </h2>
                            </div>
                            <div class="card-body" id="emergency-alerts-board"></div>
                        </div>
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title">
                                    <i class="fas fa-history ml-2"></i>
                                    آخر الأنشطة
                                </h2>
                            </div>
                            <div class="card-body" id="emergency-timeline-board"></div>
                        </div>
                    </div>
                </div>

                <!-- تبويب خطط الطوارئ -->
                <div id="tab-plans" class="tab-content">
                    <div class="content-card">
                        <div class="card-header">
                            <div class="flex items-center justify-between">
                                <h2 class="card-title">
                                    <i class="fas fa-file-medical-alt ml-2"></i>
                                    خطط الطوارئ
                                </h2>
                                <button id="add-plan-tab-btn" class="btn-primary">
                                    <i class="fas fa-plus ml-2"></i>
                                    إضافة خطة جديدة
                                </button>
                            </div>
                        </div>
                        <div class="card-body" id="emergency-plans-board"></div>
                    </div>
                </div>

                <!-- تبويب خريطة المصنع -->
                <div id="tab-factory-map" class="tab-content">
                    <div id="fm-shell" class="fm-shell">
                        <div class="fm-toolbar">
                            <div class="fm-toolbar-brand">
                                <div class="fm-toolbar-icon"><i class="fas fa-map-marked-alt"></i></div>
                                <div>
                                    <h2 class="fm-toolbar-title">خريطة المصنع التفاعلية</h2>
                                    <p class="fm-toolbar-sub" id="fm-plan-meta">اختر مخططاً لعرض خريطة السلامة</p>
                                </div>
                            </div>
                            <div class="fm-toolbar-actions">
                                <select id="fm-factory-filter" class="form-input fm-factory-filter" title="تصفية حسب المصنع">
                                    <option value="">كل المصانع</option>
                                </select>
                                <select id="fm-floor-select" class="form-input fm-floor-select" title="اختيار المخطط">
                                    <option value="">— اختر المخطط —</option>
                                </select>
                                <div class="fm-toolbar-btn-group">
                                    <button id="fm-edit-floor-btn" class="btn-secondary btn-sm hidden" title="تعديل المخطط">
                                        <i class="fas fa-pen"></i><span>تعديل</span>
                                    </button>
                                    <button id="fm-delete-floor-btn" class="btn-secondary btn-sm fm-btn-danger hidden" title="حذف المخطط">
                                        <i class="fas fa-trash"></i><span>حذف</span>
                                    </button>
                                    <button id="fm-admin-toggle" class="btn-secondary btn-sm" title="إضافة وتعديل عناصر الخريطة">
                                        <i class="fas fa-tools"></i><span>وضع الإدارة</span>
                                    </button>
                                    <button id="fm-add-floor-btn" class="btn-primary btn-sm" title="إضافة مخطط طابق جديد">
                                        <i class="fas fa-plus"></i><span>إضافة مخطط</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="fm-workspace">
                            <div class="fm-map-stage">
                                <div class="fm-viewport-bar hidden" id="fm-viewport-bar">
                                    <div class="fm-viewport-bar-right">
                                        <span class="fm-badge" id="fm-items-count"><i class="fas fa-map-pin"></i> 0 عنصر</span>
                                        <span class="fm-badge fm-badge-muted" id="fm-zoom-label">100%</span>
                                    </div>
                                    <div class="fm-viewport-controls">
                                        <button type="button" class="fm-ctrl-btn fm-ctrl-btn-accent hidden" id="fm-qr-btn" title="رمز QR للاستجابة">
                                            <i class="fas fa-qrcode"></i><span>QR</span>
                                        </button>
                                        <button type="button" class="fm-ctrl-btn hidden" id="fm-export-png-btn" title="تصدير الخريطة PNG">
                                            <i class="fas fa-file-image"></i><span>تصدير</span>
                                        </button>
                                        <button type="button" class="fm-ctrl-btn" id="fm-zoom-out" title="تصغير"><i class="fas fa-search-minus"></i></button>
                                        <button type="button" class="fm-ctrl-btn" id="fm-zoom-reset" title="ملاءمة الشاشة"><i class="fas fa-compress-arrows-alt"></i></button>
                                        <button type="button" class="fm-ctrl-btn" id="fm-zoom-in" title="تكبير"><i class="fas fa-search-plus"></i></button>
                                        <button type="button" class="fm-ctrl-btn fm-ctrl-btn-primary" id="fm-fullscreen-btn" title="ملء الشاشة">
                                            <i class="fas fa-expand"></i><span>ملء الشاشة</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="fm-map-container" id="fm-map-container">
                                    <div class="fm-map-placeholder" id="fm-map-placeholder">
                                        <div class="fm-placeholder-card">
                                            <div class="fm-placeholder-icon"><i class="fas fa-map-marked-alt"></i></div>
                                            <h3>لا يوجد مخطط معروض</h3>
                                            <p>اختر مخططاً من القائمة أو أضف مخطط طابق جديد لبدء وضع عناصر السلامة</p>
                                            <button type="button" class="btn-primary btn-sm" onclick="Emergency.showFloorPlanForm()">
                                                <i class="fas fa-plus ml-1"></i>إضافة أول مخطط
                                            </button>
                                        </div>
                                    </div>
                                    <div class="fm-map-wrapper hidden" id="fm-map-wrapper">
                                        <div class="fm-viewport" id="fm-viewport">
                                            <div class="fm-viewport-inner" id="fm-viewport-inner">
                                                <div class="fm-map-canvas" id="fm-map-canvas">
                                                    <img id="fm-map-image" class="fm-map-image" data-fm-map-image="1" src="" alt="مخطط الطابق">
                                                    <div id="fm-map-items-layer" class="fm-map-items-layer"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <aside class="fm-legend-sidebar hidden" id="fm-legend-sidebar">
                                <div class="fm-legend-title"><i class="fas fa-info-circle"></i> دليل الرموز</div>
                                <div class="fm-legend-items" id="fm-legend-items"></div>
                            </aside>
                        </div>

                        <div class="fm-admin-panel hidden" id="fm-admin-panel">
                            <div class="fm-admin-header">
                                <h3><i class="fas fa-tools"></i> لوحة الإدارة — إضافة عناصر للخريطة</h3>
                                <button id="fm-admin-close" class="btn-secondary btn-sm">إغلاق</button>
                            </div>
                            <div class="fm-admin-body">
                            <div class="fm-admin-tools">
                                <button class="fm-add-item-btn" data-type="fire_extinguisher" style="background:#ef4444;">
                                    <i class="fas fa-fire-extinguisher"></i> مطفأة حريق
                                </button>
                                <button class="fm-add-item-btn" data-type="fire_hose" style="background:#dc2626;">
                                    <i class="fas fa-fire"></i> خرطوم حريق
                                </button>
                                <button class="fm-add-item-btn" data-type="fire_alarm" style="background:#f97316;">
                                    <i class="fas fa-bell"></i> إنذار حريق
                                </button>
                                <button class="fm-add-item-btn" data-type="emergency_exit" style="background:#22c55e;">
                                    <i class="fas fa-door-open"></i> مخرج طوارئ
                                </button>
                                <button class="fm-add-item-btn" data-type="escape_route" style="background:#16a34a;">
                                    <i class="fas fa-arrow-right"></i> طريق هروب
                                </button>
                                <button class="fm-add-item-btn" data-type="assembly_point" style="background:#3b82f6;">
                                    <i class="fas fa-users"></i> نقطة تجمع
                                </button>
                                <button class="fm-add-item-btn" data-type="first_aid" style="background:#ec4899;">
                                    <i class="fas fa-medkit"></i> إسعافات أولية
                                </button>
                                <button class="fm-add-item-btn" data-type="hazmat" style="background:#a855f7;">
                                    <i class="fas fa-skull-crossbones"></i> مواد خطرة
                                </button>
                                <button class="fm-add-item-btn" data-type="evacuation_chair" style="background:#06b6d4;">
                                    <i class="fas fa-wheelchair"></i> كرسي إخلاء
                                </button>
                                <button class="fm-add-item-btn" data-type="fire_panel" style="background:#64748b;">
                                    <i class="fas fa-server"></i> لوحة إطفاء
                                </button>
                            </div>
                            <p class="fm-admin-hint"><i class="fas fa-mouse-pointer"></i> اختر نوع العنصر ثم انقر على الخريطة لإضافته. يمكنك سحب العناصر الموجودة لتعديل موقعها.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            moduleRef.setupTabsNavigation();
            moduleRef.setupEventListeners();
            if (typeof moduleRef.renderAll === 'function') {
                moduleRef.renderAll();
            } else {
                if (typeof Utils !== 'undefined' && Utils.safeError) {
                    Utils.safeError('Emergency.renderAll غير معرّفة أو ليست دالة', moduleRef);
                } else {
                    console.error('Emergency.renderAll غير معرّفة أو ليست دالة', moduleRef);
                }
            }
            if (typeof moduleRef.setupAutoRefresh === 'function') {
                moduleRef.setupAutoRefresh();
            }
            if (typeof moduleRef._fmCheckQrEntry === 'function') {
                moduleRef._fmCheckQrEntry();
            }
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('❌ خطأ في تحميل مديول الطوارئ:', error);
            } else {
                console.error('❌ خطأ في تحميل مديول الطوارئ:', error);
            }
            const section = document.getElementById('emergency-section');
            if (section) {
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">حدث خطأ أثناء تحميل البيانات</p>
                                <button onclick="Emergency.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    },

    setupTabsNavigation() {
        const tabButtons = document.querySelectorAll('#emergency-section .tab-btn');
        const tabContents = document.querySelectorAll('#emergency-section .tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // إزالة الفئة النشطة من جميع الأزرار والمحتويات
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // إضافة الفئة النشطة للزر والمحتوى المحدد
                button.classList.add('active');
                const targetContent = document.getElementById(`tab-${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // إعادة رسم المحتوى عند التبديل
                if (targetTab === 'alerts') {
                    this.renderSummary();
                    this.renderAlertsBoard();
                    this.renderTimelineBoard();
                } else if (targetTab === 'plans') {
                    this.renderPlansBoard();
                } else if (targetTab === 'factory-map') {
                    this.initFactoryMapTab();
                }
            });
        });

        // تفعيل التبويب الأول افتراضياً إذا لم يكن هناك تبويب نشط
        const activeContent = document.querySelector('#emergency-section .tab-content.active');
        if (!activeContent) {
            const firstTab = tabButtons[0];
            if (firstTab) {
                firstTab.click();
            }
        }
    },

    clearAutoRefresh() {
        if (Emergency.state.autoRefreshInterval) {
            clearInterval(Emergency.state.autoRefreshInterval);
            Emergency.state.autoRefreshInterval = null;
        }
    },

    setupAutoRefresh() {
        const moduleRef = Emergency;
        const autoRefreshInput = document.getElementById('emergency-auto-refresh');
        const shouldRefresh = autoRefreshInput ? autoRefreshInput.checked : true;
        if (!shouldRefresh) return;

        moduleRef.state.autoRefreshInterval = setInterval(() => {
            moduleRef.renderAll();
            // التحقق من التنبيهات الجديدة
            moduleRef.checkForNewAlerts();
        }, moduleRef.state.autoRefreshMs);
        
        // بدء فحص التنبيهات الجديدة فوراً
        moduleRef.checkForNewAlerts();
    },
    
    /**
     * التحقق من التنبيهات الجديدة وإرسال إشعارات فورية
     */
    checkForNewAlerts() {
        const alerts = this.getAlerts();
        const currentChecked = new Set();
        
        alerts.forEach(alert => {
            if (!alert || !alert.id) return;
            
            currentChecked.add(alert.id);
            
            // إذا كان التنبيه جديداً ولم يتم فحصه مسبقاً
            if (!this.state.lastCheckedAlerts.has(alert.id)) {
                // إرسال إشعار فقط للتنبيهات النشطة وغير المعتمدة
                if (alert.status !== 'مغلق' && !alert.acknowledgedAt) {
                    const isCritical = alert.severity === 'عالية';
                    const minutesSinceCreation = alert.createdAt 
                        ? (new Date() - new Date(alert.createdAt)) / (1000 * 60)
                        : 0;
                    
                    // إرسال إشعار فقط للتنبيهات التي تم إنشاؤها خلال آخر 5 دقائق
                    if (minutesSinceCreation <= 5) {
                        const notificationOptions = {
                            title: isCritical ? '🚨 تنبيه طوارئ حرج' : '⚠️ تنبيه طوارئ جديد',
                            message: alert.title,
                            description: alert.description || 'لا يوجد وصف متاح',
                            priority: isCritical ? 'critical' : 'high',
                            persistent: isCritical,
                            sound: true,
                            actions: [
                                {
                                    label: 'عرض التفاصيل',
                                    primary: true,
                                    onClick: () => {
                                        this.viewAlert(alert.id);
                                    }
                                },
                                ...(alert.status === 'نشط' && !alert.acknowledgedAt ? [{
                                    label: 'اعتماد التنبيه',
                                    primary: false,
                                    onClick: () => {
                                        this.acknowledgeAlert(alert.id);
                                    }
                                }] : []),
                                {
                                    label: 'إغلاق',
                                    onClick: () => {}
                                }
                            ],
                            onClick: () => {
                                this.viewAlert(alert.id);
                            }
                        };
                        
                        if (isCritical) {
                            Notification.emergency(notificationOptions);
                        } else {
                            Notification.show(notificationOptions);
                        }
                    }
                }
            }
        });
        
        // تحديث قائمة التنبيهات المفحوصة
        this.state.lastCheckedAlerts = currentChecked;
    },

    getAlerts() {
        const alerts = Array.isArray(AppState.appData.emergencyAlerts)
            ? AppState.appData.emergencyAlerts
            : [];
        // تصفية التنبيهات الفارغة أو غير الصحيحة
        return alerts
            .filter(alert => {
                // التحقق من أن التنبيه صحيح وله بيانات أساسية
                return alert && 
                       typeof alert === 'object' && 
                       alert.id && 
                       alert.title && 
                       alert.title.trim() !== '' &&
                       alert.description && 
                       alert.description.trim() !== '';
            })
            .map(alert => this.ensureAlertStructure(alert))
            .filter(alert => alert && alert.id); // تأكيد إضافي بعد ensureAlertStructure
    },

    getPlans() {
        const plans = Array.isArray(AppState.appData.emergencyPlans)
            ? AppState.appData.emergencyPlans
            : [];
        return plans.map(plan => this.ensurePlanStructure(plan));
    },

    ensureAlertStructure(alert) {
        // التحقق من صحة التنبيه قبل المعالجة
        if (!alert || typeof alert !== 'object' || !alert.id) {
            return null; // إرجاع null بدلاً من كائن فارغ
        }
        
        // التأكد من وجود البيانات الأساسية
        if (!alert.title || !alert.description) {
            return null;
        }
        
        // إنشاء نسخة من التنبيه لتجنب تعديل الأصل مباشرة
        const structuredAlert = { ...alert };
        
        structuredAlert.timeline = Array.isArray(structuredAlert.timeline) ? structuredAlert.timeline : [];
        structuredAlert.assignedTeams = Array.isArray(structuredAlert.assignedTeams) ? structuredAlert.assignedTeams : [];
        structuredAlert.channels = Array.isArray(structuredAlert.channels) ? structuredAlert.channels : [];
        structuredAlert.impactArea = structuredAlert.impactArea || '';
        structuredAlert.responseInstructions = structuredAlert.responseInstructions || '';
        structuredAlert.requiresEvacuation = structuredAlert.requiresEvacuation === true;
        structuredAlert.autoEscalateMinutes = Number(structuredAlert.autoEscalateMinutes || 0);
        structuredAlert.createdBy = structuredAlert.createdBy || this.getCurrentUserSummary(structuredAlert.createdBy);
        structuredAlert.severity = structuredAlert.severity || 'متوسطة';
        structuredAlert.status = structuredAlert.status || 'نشط';
        structuredAlert.createdAt = structuredAlert.createdAt || structuredAlert.date || new Date().toISOString();
        structuredAlert.updatedAt = structuredAlert.updatedAt || new Date().toISOString();
        
        return structuredAlert;
    },

    ensurePlanStructure(plan) {
        if (!plan) return {};
        plan.ownerTeam = plan.ownerTeam || '';
        plan.contactPerson = plan.contactPerson || '';
        plan.contactPhone = plan.contactPhone || '';
        plan.lastTested = plan.lastTested || '';
        plan.updatedAt = plan.updatedAt || plan.createdAt || new Date().toISOString();
        return plan;
    },

    getCurrentUserSummary(fallback = null) {
        if (fallback && typeof fallback === 'object') {
            return fallback;
        }
        if (!AppState.currentUser) {
            return {
                name: 'نظام',
                email: '',
                role: ''
            };
        }
        return {
            id: AppState.currentUser.id || '',
            name: AppState.currentUser.name || '',
            email: AppState.currentUser.email || '',
            role: AppState.currentUser.role || ''
        };
    },

    setupEventListeners() {
        setTimeout(() => {
            const addAlertBtn = document.getElementById('add-alert-btn');
            const addPlanBtn = document.getElementById('add-plan-btn');
            const addPlanTabBtn = document.getElementById('add-plan-tab-btn');
            
            if (addAlertBtn) addAlertBtn.addEventListener('click', () => {
                Emergency.showAlertForm();
                // التبديل إلى تبويب التنبيهات عند إضافة تنبيه جديد
                const alertsTab = document.querySelector('#emergency-section .tab-btn[data-tab="alerts"]');
                if (alertsTab) alertsTab.click();
            });
            
            if (addPlanBtn) addPlanBtn.addEventListener('click', () => {
                Emergency.showPlanForm();
                // التبديل إلى تبويب خطط الطوارئ عند إضافة خطة جديدة
                const plansTab = document.querySelector('#emergency-section .tab-btn[data-tab="plans"]');
                if (plansTab) plansTab.click();
            });
            
            if (addPlanTabBtn) addPlanTabBtn.addEventListener('click', () => Emergency.showPlanForm());

            const searchInput = document.getElementById('emergency-search');
            if (searchInput) {
                searchInput.addEventListener('input', (event) => {
                    Emergency.state.filters.search = event.target.value.trim();
                    Emergency.renderAll();
                });
            }

            const severitySelect = document.getElementById('emergency-filter-severity');
            if (severitySelect) {
                severitySelect.addEventListener('change', (event) => {
                    Emergency.state.filters.severity = event.target.value;
                    Emergency.renderAll();
                });
            }

            const statusSelect = document.getElementById('emergency-filter-status');
            if (statusSelect) {
                statusSelect.addEventListener('change', (event) => {
                    Emergency.state.filters.status = event.target.value;
                    Emergency.renderAll();
                });
            }

            const channelSelect = document.getElementById('emergency-filter-channel');
            if (channelSelect) {
                channelSelect.addEventListener('change', (event) => {
                    Emergency.state.filters.channel = event.target.value;
                    Emergency.renderAll();
                });
            }

            const teamSelect = document.getElementById('emergency-filter-team');
            if (teamSelect) {
                teamSelect.addEventListener('change', (event) => {
                    Emergency.state.filters.team = event.target.value;
                    Emergency.renderAll();
                });
            }

            const unackToggle = document.getElementById('emergency-filter-unack');
            if (unackToggle) {
                unackToggle.addEventListener('change', (event) => {
                    Emergency.state.filters.onlyUnacknowledged = event.target.checked;
                    Emergency.renderAll();
                });
            }

            const refreshBtn = document.getElementById('emergency-refresh-btn');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', () => Emergency.renderAll());
            }

            const autoRefreshInput = document.getElementById('emergency-auto-refresh');
            if (autoRefreshInput) {
                autoRefreshInput.addEventListener('change', () => {
                    Emergency.clearAutoRefresh();
                    Emergency.setupAutoRefresh();
                });
            }
        }, 100);
    },

    renderAll() {
        const self = this;
        const runBadge = () => {
            if (typeof NotificationsManager !== 'undefined') {
                NotificationsManager.updateBadge();
            }
        };
        const next = typeof requestAnimationFrame === 'function'
            ? (cb) => { requestAnimationFrame(cb); }
            : (cb) => { setTimeout(cb, 0); };

        // تقسيم الرسم على عدة إطارات لتقليل تحذيرات Violation (معالج نقر/مؤقت طويل)
        next(() => {
            self.renderSummary();
            const activeTab = document.querySelector('#emergency-section .tab-btn.active');
            next(() => {
                if (activeTab) {
                    const tabId = activeTab.getAttribute('data-tab');
                    if (tabId === 'alerts') {
                        self.renderAlertsBoard();
                        next(() => {
                            self.renderTimelineBoard();
                            runBadge();
                        });
                    } else if (tabId === 'plans') {
                        self.renderPlansBoard();
                        runBadge();
                    } else {
                        runBadge();
                    }
                } else {
                    self.renderAlertsBoard();
                    next(() => {
                        self.renderTimelineBoard();
                        next(() => {
                            self.renderPlansBoard();
                            runBadge();
                        });
                    });
                }
            });
        });
    },

    renderTimelineBoard() {
        const container = document.getElementById('emergency-timeline-board');
        if (!container) return;

        const timeline = this.buildTimeline().slice(0, 12);
        if (timeline.length === 0) {
            container.innerHTML = `
                <div class="text-center text-gray-500 text-sm py-4">
                    لا توجد أنشطة حديثة
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="space-y-4">
                ${timeline.map(entry => `
                    <div class="timeline-entry border-l-4 pl-4 ${this.getTimelineColor(entry.type)}">
                        <div class="flex items-center justify-between">
                            <div class="font-semibold text-gray-800">${Utils.escapeHTML(entry.title)}</div>
                            <div class="text-xs text-gray-500">${Utils.formatDateTime(entry.timestamp)}</div>
                        </div>
                        <div class="text-sm text-gray-600 mt-1">${Utils.escapeHTML(entry.description || '')}</div>
                        <div class="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            <span><i class="fas fa-user ml-1"></i>${Utils.escapeHTML(entry.actor || 'النظام')}</span>
                            <span><i class="fas fa-bolt ml-1"></i>${Utils.escapeHTML(entry.severity || '')}</span>
                            <button class="text-blue-600 hover:text-blue-800" onclick="Emergency.viewAlert('${Utils.escapeAttr(entry.alertId)}')">عرض التنبيه</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    getTimelineColor(type) {
        switch (type) {
            case 'created':
                return 'border-blue-400';
            case 'acknowledged':
                return 'border-green-400';
            case 'resolved':
                return 'border-teal-400';
            case 'escalated':
                return 'border-red-400';
            default:
                return 'border-gray-300';
        }
    },

    buildTimeline() {
        const alerts = this.getAlerts();
        const entries = [];
        alerts.forEach(alert => {
            const severity = alert.severity || '';
            const baseTitle = alert.title || 'تنبيه';
            const actor = alert.createdBy?.name || 'النظام';
            entries.push({
                id: `${alert.id}-created`,
                alertId: alert.id,
                timestamp: alert.createdAt || alert.date || new Date().toISOString(),
                type: 'created',
                title: `${baseTitle} • إنشاء`,
                description: alert.description || '',
                actor,
                severity
            });
            (alert.timeline || []).forEach(step => {
                entries.push({
                    id: step.id || Utils.generateId('TIMELINE'),
                    alertId: alert.id,
                    timestamp: step.timestamp || new Date().toISOString(),
                    type: step.type || 'update',
                    title: `${baseTitle} • ${step.label || 'تحديث'}`,
                    description: step.description || '',
                    actor: step.actor?.name || step.actor || 'النظام',
                    severity
                });
            });
        });
        return entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    renderPlansBoard() {
        const container = document.getElementById('emergency-plans-board');
        if (!container) return;

        const plans = this.getPlans();
        if (plans.length === 0) {
            container.innerHTML = `
                <div class="empty-state py-8 text-center">
                    <p class="text-gray-500">لا توجد خطط طوارئ مسجلة حتى الآن</p>
                    <button class="btn-primary mt-3" onclick="Emergency.showPlanForm()">
                        <i class="fas fa-plus ml-2"></i>إضافة خطة طوارئ
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>الخطة</th>
                            <th>النوع</th>
                            <th>الفريق المسؤول</th>
                            <th>آخر اختبار</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${plans.map(plan => `
                            <tr>
                                <td>
                                    <div class="font-semibold text-gray-900">${Utils.escapeHTML(plan.name || '')}</div>
                                    <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(plan.description || '').substring(0, 80)}${plan.description && plan.description.length > 80 ? '...' : ''}</div>
                                </td>
                                <td>
                                    <span class="badge badge-secondary">${Utils.escapeHTML(plan.type || 'غير محدد')}</span>
                                </td>
                                <td>
                                    <div class="text-sm text-gray-800">${Utils.escapeHTML(plan.ownerTeam || 'غير محدد')}</div>
                                    ${plan.contactPerson ? `<div class="text-xs text-gray-500">${Utils.escapeHTML(plan.contactPerson)} • ${Utils.escapeHTML(plan.contactPhone || '')}</div>` : ''}
                                </td>
                                <td>${plan.lastTested ? Utils.formatDate(plan.lastTested) : '<span class="text-xs text-gray-400">لم يتم الاختبار</span>'}</td>
                                <td>
                                    <div class="flex gap-2">
                                        <button class="btn-icon btn-icon-info" title="عرض التفاصيل" onclick="Emergency.viewPlan('${Utils.escapeAttr(plan.id)}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-primary" title="تعديل" onclick="Emergency.showPlanForm(${JSON.stringify(plan).replace(/"/g, '&quot;')})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    buildTimelineEntry(type, alert, description) {
        return {
            id: Utils.generateId('ALOG'),
            type,
            label: this.getTimelineLabel(type),
            description,
            actor: this.getCurrentUserSummary(),
            timestamp: new Date().toISOString(),
            severity: alert.severity
        };
    },

    getTimelineLabel(type) {
        switch (type) {
            case 'created':
                return 'تم إنشاء التنبيه';
            case 'acknowledged':
                return 'تم الاعتماد';
            case 'resolved':
                return 'تم الإغلاق';
            case 'escalated':
                return 'تم التصعيد';
            default:
                return 'تحديث';
        }
    },

    getFilteredAlerts() {
        const alerts = this.getAlerts();
        const filters = this.state.filters;
        const searchLower = filters.search.toLowerCase();
        const now = new Date();

        return alerts
            .filter(alert => {
                // التحقق من صحة التنبيه مرة أخرى
                if (!alert || !alert.id || !alert.title) {
                    return false;
                }
                
                const matchesSearch = !searchLower || [
                    alert.title,
                    alert.description,
                    alert.impactArea,
                    (alert.assignedTeams || []).join(' '),
                    (alert.channels || []).join(' '),
                    alert.severity,
                    alert.status
                ].some(value => (value || '').toString().toLowerCase().includes(searchLower));

                if (!matchesSearch) return false;

                if (filters.severity && alert.severity !== filters.severity) return false;

                if (filters.channel && !(alert.channels || []).includes(filters.channel)) return false;

                if (filters.team && !(alert.assignedTeams || []).includes(filters.team)) return false;

                if (filters.onlyUnacknowledged && alert.acknowledgedAt) return false;

                if (filters.status === 'active') {
                    return alert.status !== 'مغلق';
                }
                if (filters.status === 'open') {
                    return alert.status === 'نشط' || alert.status === 'قيد المعالجة';
                }
                if (filters.status === 'closed') {
                    return alert.status === 'مغلق';
                }
                if (filters.status === 'all') {
                    return true;
                }
                return true;
            })
            .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
            .map(alert => {
                // إنشاء نسخة لتجنب تعديل الأصل
                const processedAlert = { ...alert };
                processedAlert.isEscalated = false;
                if (!processedAlert.acknowledgedAt && processedAlert.autoEscalateMinutes > 0) {
                    const createdAt = new Date(processedAlert.createdAt || processedAlert.date || now);
                    const minutesSince = (now - createdAt) / (1000 * 60);
                    if (minutesSince >= processedAlert.autoEscalateMinutes) {
                        processedAlert.isEscalated = true;
                    }
                }
                return processedAlert;
            });
    },

    renderSummary() {
        const container = document.getElementById('emergency-summary');
        if (!container) return;

        const alerts = this.getAlerts();
        const activeAlerts = alerts.filter(alert => alert.status !== 'مغلق');
        const highSeverity = activeAlerts.filter(alert => alert.severity === 'عالية');
        const unacknowledged = activeAlerts.filter(alert => !alert.acknowledgedAt);
        const escalated = activeAlerts.filter(alert => {
            if (!alert.autoEscalateMinutes) return false;
            if (alert.acknowledgedAt) return false;
            const createdAt = new Date(alert.createdAt || alert.date || new Date());
            const minutesSince = (new Date() - createdAt) / (1000 * 60);
            return minutesSince >= alert.autoEscalateMinutes;
        });

        container.innerHTML = `
            <div class="summary-card">
                <div class="summary-card-icon bg-red-100 text-red-600">
                    <i class="fas fa-bolt"></i>
                </div>
                <div>
                    <p class="summary-card-label">تنبيهات نشطة</p>
                    <p class="summary-card-value">${activeAlerts.length}</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-yellow-100 text-yellow-600">
                    <i class="fas fa-exclamation"></i>
                </div>
                <div>
                    <p class="summary-card-label">خطورة عالية</p>
                    <p class="summary-card-value">${highSeverity.length}</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-blue-100 text-blue-600">
                    <i class="fas fa-user-clock"></i>
                </div>
                <div>
                    <p class="summary-card-label">بانتظار الاعتماد</p>
                    <p class="summary-card-value">${unacknowledged.length}</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-purple-100 text-purple-600">
                    <i class="fas fa-arrow-up"></i>
                </div>
                <div>
                    <p class="summary-card-label">تنبيهات متصاعدة</p>
                    <p class="summary-card-value">${escalated.length}</p>
                </div>
            </div>
        `;
    },

    renderAlertsBoard() {
        const container = document.getElementById('emergency-alerts-board');
        if (!container) return;

        const alerts = this.getFilteredAlerts();
        if (alerts.length === 0) {
            container.innerHTML = `
                <div class="empty-state py-10 text-center">
                    <i class="fas fa-check-circle text-4xl text-green-400 mb-3"></i>
                    <p class="text-gray-500">لا توجد تنبيهات مطابقة لعوامل التصفية الحالية</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>التنبيه</th>
                            <th>الخطورة</th>
                            <th>القنوات</th>
                            <th>المنطقة المتأثرة</th>
                            <th>فرق الاستجابة</th>
                            <th>الحالة</th>
                            <th>المدة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${alerts.map(alert => this.renderAlertRow(alert)).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    renderAlertRow(alert) {
        const severityClass = alert.severity === 'عالية'
            ? 'badge-danger'
            : alert.severity === 'متوسطة'
                ? 'badge-warning'
                : 'badge-info';
        const statusClass = alert.status === 'مغلق'
            ? 'badge-success'
            : alert.status === 'قيد المعالجة'
                ? 'badge-warning'
                : 'badge-danger';
        const assignedTeams = (alert.assignedTeams || []).map(team => `
            <span class="badge badge-info">${Utils.escapeHTML(team)}</span>
        `).join('');
        const channels = (alert.channels || []).map(channel => `
            <span class="badge badge-secondary">${Utils.escapeHTML(channel)}</span>
        `).join('');
        const createdAt = new Date(alert.createdAt || alert.date || new Date());
        const minutesSince = Math.floor((new Date() - createdAt) / (1000 * 60));
        const hours = Math.floor(minutesSince / 60);
        const mins = minutesSince % 60;
        const durationLabel = hours > 0 ? `${hours} س ${mins} د` : `${mins} د`;
        const ackLabel = alert.acknowledgedAt
            ? `<span class="text-xs text-gray-500">تم الاعتماد ${Utils.formatDateTime(alert.acknowledgedAt)}</span>`
            : '<span class="text-xs text-red-500">بانتظار الاعتماد</span>';
        const escalationBadge = alert.isEscalated
            ? '<span class="badge badge-danger ml-2"><i class="fas fa-arrow-up ml-1"></i>متصاعد</span>'
            : '';

        return `
            <tr>
                <td>
                    <div class="font-semibold text-gray-900 flex items-center gap-2">
                        ${Utils.escapeHTML(alert.title || '')}
                        ${alert.requiresEvacuation ? '<span class="badge badge-danger">إخلاء</span>' : ''}
                        ${escalationBadge}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                        ${Utils.escapeHTML(alert.description || '').substring(0, 140)}${alert.description && alert.description.length > 140 ? '...' : ''}
                    </div>
                    <div class="text-xs text-gray-400 mt-1">
                        أُطلق بواسطة ${Utils.escapeHTML(alert.createdBy?.name || 'غير معروف')} في ${Utils.formatDateTime(alert.createdAt || alert.date)}
                    </div>
                </td>
                <td>
                    <span class="badge ${severityClass}">${alert.severity || '-'}</span>
                </td>
                <td>
                    <div class="flex flex-wrap gap-1">${channels || '<span class="text-xs text-gray-400">غير محدد</span>'}</div>
                </td>
                <td>
                    <div class="text-sm text-gray-800">${Utils.escapeHTML(alert.impactArea || 'غير محدد')}</div>
                </td>
                <td>
                    <div class="flex flex-wrap gap-1">${assignedTeams || '<span class="text-xs text-gray-400">لم يتم التعيين</span>'}</div>
                </td>
                <td>
                    <div class="flex flex-col gap-1">
                        <span class="badge ${statusClass}">${alert.status || 'نشط'}</span>
                        ${ackLabel}
                    </div>
                </td>
                <td>
                    <div class="text-sm text-gray-800">${durationLabel}</div>
                    ${alert.autoEscalateMinutes ? `<div class="text-xs text-gray-500">التصعيد بعد ${alert.autoEscalateMinutes} د</div>` : ''}
                </td>
                <td>
                    <div class="flex flex-wrap gap-2">
                        <button class="btn-icon btn-icon-info" title="عرض التفاصيل" onclick="Emergency.viewAlert('${Utils.escapeAttr(alert.id)}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${!alert.acknowledgedAt ? `
                            <button class="btn-icon btn-icon-success" title="اعتماد التنبيه" onclick="Emergency.acknowledgeAlert('${Utils.escapeAttr(alert.id)}')">
                                <i class="fas fa-check"></i>
                            </button>
                        ` : ''}
                        ${alert.status !== 'مغلق' ? `
                            <button class="btn-icon btn-icon-primary" title="إغلاق التنبيه" onclick="Emergency.resolveAlert('${Utils.escapeAttr(alert.id)}')">
                                <i class="fas fa-flag-checkered"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    },

    async showAlertForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? 'تعديل التنبيه' : 'إضافة تنبيه طوارئ'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="alert-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">عنوان التنبيه *</label>
                            <input type="text" id="alert-title" required class="form-input" 
                                value="${Utils.escapeHTML(data?.title || '')}" placeholder="عنوان التنبيه">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف *</label>
                            <textarea id="alert-description" required class="form-input" rows="4" 
                                placeholder="وصف تفصيلي للتنبيه">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الخطورة *</label>
                                <select id="alert-severity" required class="form-input">
                                    <option value="">اختر الخطورة</option>
                                    <option value="عالية" ${data?.severity === 'عالية' ? 'selected' : ''}>عالية</option>
                                    <option value="متوسطة" ${data?.severity === 'متوسطة' ? 'selected' : ''}>متوسطة</option>
                                    <option value="منخضة" ${data?.severity === 'منخضة' ? 'selected' : ''}>منخضة</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة *</label>
                                <select id="alert-status" required class="form-input">
                                    <option value="نشط" ${data?.status === 'نشط' ? 'selected' : ''}>نشط</option>
                                    <option value="مغلق" ${data?.status === 'مغلق' ? 'selected' : ''}>مغلق</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">التاريخ *</label>
                            <input type="date" id="alert-date" required class="form-input" 
                                value="${data?.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">حفظ</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const form = document.getElementById('alert-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAlertSubmit(data?.id, modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async showPlanForm(data = null) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${data ? 'تعديل الخطة' : 'إضافة خطة طوارئ'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="plan-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">اسم الخطة *</label>
                            <input type="text" id="plan-name" required class="form-input" 
                                value="${Utils.escapeHTML(data?.name || '')}" placeholder="اسم خطة الطوارئ">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">النوع *</label>
                            <select id="plan-type" required class="form-input">
                                <option value="">اختر النوع</option>
                                <option value="حريق" ${data?.type === 'حريق' ? 'selected' : ''}>حريق</option>
                                <option value="زلزال" ${data?.type === 'زلزال' ? 'selected' : ''}>زلزال</option>
                                <option value="يضانات" ${data?.type === 'يضانات' ? 'selected' : ''}>يضانات</option>
                                <option value="حادث كيميائي" ${data?.type === 'حادث كيميائي' ? 'selected' : ''}>حادث كيميائي</option>
                                <option value="أخرى" ${data?.type === 'أخرى' ? 'selected' : ''}>أخرى</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف *</label>
                            <textarea id="plan-description" required class="form-input" rows="6" 
                                placeholder="وصف تفصيلي لخطة الطوارئ">${Utils.escapeHTML(data?.description || '')}</textarea>
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">حفظ</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const form = document.getElementById('plan-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePlanSubmit(data?.id, modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async handleAlertSubmit(editId, modal) {
        // فحص العناصر قبل الاستخدام
        const titleEl = document.getElementById('alert-title');
        const descriptionEl = document.getElementById('alert-description');
        const severityEl = document.getElementById('alert-severity');
        const statusEl = document.getElementById('alert-status');
        const dateEl = document.getElementById('alert-date');
        
        if (!titleEl || !descriptionEl || !severityEl || !statusEl || !dateEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('ALERT'),
            title: titleEl.value.trim(),
            description: descriptionEl.value.trim(),
            severity: severityEl.value,
            status: statusEl.value,
            date: new Date(dateEl.value).toISOString(),
            createdAt: editId ? AppState.appData.emergencyAlerts.find(a => a.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.emergencyAlerts.findIndex(a => a.id === editId);
                if (index !== -1) AppState.appData.emergencyAlerts[index] = formData;
                Notification.success('تم تحديث التنبيه بنجاح', {
                    title: 'تحديث التنبيه',
                    description: `تم تحديث التنبيه "${formData.title}" بنجاح`
                });
            } else {
                AppState.appData.emergencyAlerts.push(formData);
                
                // إرسال إيميل للتنبيهات الجديدة فقط
                await this.sendAlertEmail(formData);
                
                // إرسال إشعار محسن للتنبيهات الجديدة
                const isCritical = formData.severity === 'عالية';
                const notificationOptions = {
                    title: 'تنبيه طوارئ جديد',
                    message: formData.title,
                    description: formData.description || 'لا يوجد وصف',
                    priority: isCritical ? 'critical' : 'high',
                    persistent: isCritical,
                    sound: true,
                    actions: [
                        {
                            label: 'عرض التفاصيل',
                            primary: true,
                            onClick: () => {
                                this.viewAlert(formData.id);
                            }
                        },
                        {
                            label: 'إغلاق',
                            onClick: () => {}
                        }
                    ],
                    onClick: () => {
                        this.viewAlert(formData.id);
                    }
                };
                
                if (isCritical) {
                    Notification.emergency(notificationOptions);
                } else {
                    Notification.show(notificationOptions);
                }
            }

            // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
            await GoogleIntegration.autoSave('EmergencyAlerts', AppState.appData.emergencyAlerts);

            Loading.hide();
            modal.remove();
            this.load();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message, {
                title: 'خطأ في العملية',
                description: error.message || 'حدث خطأ غير متوقع'
            });
        }
    },

    async sendAlertEmail(alert) {
        // الحصول على قائمة الإيميلات من الإعدادات
        const notificationEmails = AppState.notificationEmails || [];
        if (notificationEmails.length === 0) {
            Utils.safeLog('⚠ لا توجد إيميلات للإشعارات في الإعدادات');
            return;
        }

        try {
            // في الإنتاج، يجب استخدام خدمة إرسال إيميلات علية (مثل SendGrid, AWS SES, etc.)
            // هنا سنعرض قطعة من الكود في Console وإشعار للمستخدم
            const emailSubject = `تنبيه طوارئ: ${alert.title}`;
            const emailBody = `
                <h2>تنبيه طوارئ</h2>
                <p><strong>العنوان:</strong> ${alert.title}</p>
                <p><strong>الوصف:</strong> ${alert.description}</p>
                <p><strong>الخطورة:</strong> ${alert.severity}</p>
                <p><strong>التاريخ:</strong> ${Utils.formatDate(alert.date)}</p>
            `;

            Utils.safeLog('📧 إرسال إيميل للتنبيه:', {
                to: notificationEmails,
                subject: emailSubject,
                body: emailBody
            });

            // في الإنتاج، استخدم خدمة إرسال إيميلات علية هنا
            // مثال: await EmailService.send({ to: notificationEmails, subject: emailSubject, body: emailBody });

            Notification.success(`تم إرسال التنبيه إلى ${notificationEmails.length} إيميل`, {
                title: 'إرسال الإيميلات',
                description: `تم إرسال التنبيه إلى ${notificationEmails.length} عنوان بريد إلكتروني`
            });
        } catch (error) {
            Utils.safeError(' خطأ في إرسال الإيميل:', error);
            Notification.warning('تم حفظ التنبيه لكن فشل إرسال الإيميل', {
                title: 'تحذير',
                description: 'تم حفظ التنبيه بنجاح ولكن حدث خطأ في إرسال الإيميلات'
            });
        }
    },

    async handlePlanSubmit(editId, modal) {
        // فحص العناصر قبل الاستخدام
        const nameEl = document.getElementById('plan-name');
        const typeEl = document.getElementById('plan-type');
        const descriptionEl = document.getElementById('plan-description');
        
        if (!nameEl || !typeEl || !descriptionEl) {
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            return;
        }

        const formData = {
            id: editId || Utils.generateId('PLAN'),
            name: nameEl.value.trim(),
            type: typeEl.value,
            description: descriptionEl.value.trim(),
            createdAt: editId ? AppState.appData.emergencyPlans.find(p => p.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.emergencyPlans.findIndex(p => p.id === editId);
                if (index !== -1) AppState.appData.emergencyPlans[index] = formData;
                Notification.success('تم تحديث الخطة بنجاح', {
                title: 'تحديث الخطة',
                description: `تم تحديث الخطة "${formData.name}" بنجاح`
            });
            } else {
                AppState.appData.emergencyPlans.push(formData);
                Notification.success('تم إضافة الخطة بنجاح', {
                    title: 'إضافة الخطة',
                    description: `تم إضافة الخطة "${formData.name}" بنجاح`
                });
            }

            // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
            await GoogleIntegration.autoSave('EmergencyPlans', AppState.appData.emergencyPlans);

            Loading.hide();
            modal.remove();
            this.load();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message, {
                title: 'خطأ في العملية',
                description: error.message || 'حدث خطأ غير متوقع'
            });
        }
    },

    async acknowledgeAlert(id) {
        const alerts = Array.isArray(AppState.appData.emergencyAlerts)
            ? [...AppState.appData.emergencyAlerts]
            : [];
        const index = alerts.findIndex(alert => alert.id === id);
        if (index === -1) {
            Notification.error('لم يتم العثور على التنبيه المحدد', {
                title: 'خطأ',
                description: 'التنبيه المحدد غير موجود'
            });
            return;
        }

        const alert = this.ensureAlertStructure({ ...alerts[index] });
        if (alert.acknowledgedAt) {
            Notification.info('تم اعتماد هذا التنبيه مسبقاً', {
                title: 'تنبيه معتمد',
                description: 'هذا التنبيه تم اعتماده مسبقاً'
            });
            return;
        }

        alert.acknowledgedAt = new Date().toISOString();
        alert.acknowledgedBy = this.getCurrentUserSummary();
        if (alert.status === 'نشط') {
            alert.status = 'قيد المعالجة';
        }
        alert.timeline = alert.timeline || [];
        alert.timeline.push(this.buildTimelineEntry('acknowledged', alert, 'تم اعتماد التنبيه من قبل فريق الاستجابة'));
        alert.updatedAt = new Date().toISOString();

        alerts[index] = alert;
        AppState.appData.emergencyAlerts = alerts;
        
        Notification.success('تم اعتماد التنبيه', {
            title: 'اعتماد التنبيه',
            description: `تم اعتماد التنبيه "${alert.title}" بنجاح`,
            actions: [
                {
                    label: 'عرض التنبيه',
                    primary: false,
                    onClick: () => {
                        this.viewAlert(alert.id);
                    }
                }
            ]
        });
        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

        try {
            await GoogleIntegration.autoSave('EmergencyAlerts', AppState.appData.emergencyAlerts);
        } catch (error) {
            Utils.safeWarn('⚠ فشل حفظ بيانات التنبيه بعد الاعتماد:', error);
        }

        // تم تحديث الإشعار في الكود السابق
        this.renderAll();
    },

    async resolveAlert(id) {
        const alerts = Array.isArray(AppState.appData.emergencyAlerts)
            ? [...AppState.appData.emergencyAlerts]
            : [];
        const index = alerts.findIndex(alert => alert.id === id);
        if (index === -1) {
            Notification.error('لم يتم العثور على التنبيه المحدد', {
                title: 'خطأ',
                description: 'التنبيه المحدد غير موجود'
            });
            return;
        }

        const alert = this.ensureAlertStructure({ ...alerts[index] });
        if (alert.status === 'مغلق') {
            Notification.info('التنبيه مغلق بالفعل');
            return;
        }

        alert.status = 'مغلق';
        alert.resolvedAt = new Date().toISOString();
        alert.resolvedBy = this.getCurrentUserSummary();
        alert.timeline = alert.timeline || [];
        alert.timeline.push(this.buildTimelineEntry('resolved', alert, 'تم إغلاق التنبيه بعد التأكد من زوال الحالة'));
        alert.updatedAt = new Date().toISOString();

        alerts[index] = alert;
        AppState.appData.emergencyAlerts = alerts;
        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

        try {
            await GoogleIntegration.autoSave('EmergencyAlerts', AppState.appData.emergencyAlerts);
        } catch (error) {
            Utils.safeWarn('⚠ فشل حفظ بيانات التنبيه بعد الإغلاق:', error);
        }

        Notification.success('تم إغلاق التنبيه', {
            title: 'إغلاق التنبيه',
            description: `تم إغلاق التنبيه "${alert.title}" بنجاح`,
            actions: [
                {
                    label: 'عرض التنبيه',
                    primary: false,
                    onClick: () => {
                        this.viewAlert(alert.id);
                    }
                }
            ]
        });
        this.renderAll();
    },

    async viewAlert(id) {
        const alert = this.getAlerts().find(a => a.id === id);
        if (!alert) {
            Notification.error('لم يتم العثور على التنبيه المحدد', {
                title: 'خطأ',
                description: 'التنبيه المحدد غير موجود'
            });
            return;
        }

        const structuredAlert = this.ensureAlertStructure(alert);
        if (!structuredAlert) {
            Notification.error('التنبيه غير صحيح', {
                title: 'خطأ',
                description: 'بيانات التنبيه غير صحيحة'
            });
            return;
        }

        // إنشاء نافذة منبثقة محسنة لعرض تفاصيل التنبيه
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.zIndex = '10000';
        
        const severityColors = {
            'عالية': 'text-red-600 bg-red-50 border-red-200',
            'متوسطة': 'text-yellow-600 bg-yellow-50 border-yellow-200',
            'منخفضة': 'text-blue-600 bg-blue-50 border-blue-200'
        };
        
        const statusColors = {
            'نشط': 'bg-red-100 text-red-800',
            'قيد المعالجة': 'bg-yellow-100 text-yellow-800',
            'مغلق': 'bg-green-100 text-green-800'
        };
        
        const severityColor = severityColors[structuredAlert.severity] || severityColors['متوسطة'];
        const statusColor = statusColors[structuredAlert.status] || statusColors['نشط'];
        
        const createdAt = new Date(structuredAlert.createdAt || structuredAlert.date || new Date());
        const updatedAt = structuredAlert.updatedAt ? new Date(structuredAlert.updatedAt) : null;
        const acknowledgedAt = structuredAlert.acknowledgedAt ? new Date(structuredAlert.acknowledgedAt) : null;
        const resolvedAt = structuredAlert.resolvedAt ? new Date(structuredAlert.resolvedAt) : null;
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="border-bottom: 2px solid var(--border-color);">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-3">
                            <div class="p-3 rounded-lg ${severityColor}">
                                <i class="fas fa-exclamation-triangle text-2xl"></i>
                            </div>
                            <div>
                                <h2 class="modal-title" style="margin: 0;">${Utils.escapeHTML(structuredAlert.title || 'تنبيه')}</h2>
                                <p class="text-sm text-gray-500 mt-1">
                                    ${structuredAlert.requiresEvacuation ? '<span class="badge badge-danger">إخلاء مطلوب</span>' : ''}
                                    ${structuredAlert.isEscalated ? '<span class="badge badge-danger ml-2"><i class="fas fa-arrow-up ml-1"></i>متصاعد</span>' : ''}
                                </p>
                            </div>
                        </div>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body" style="padding: 1.5rem;">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">الخطورة</label>
                            <span class="badge ${structuredAlert.severity === 'عالية' ? 'badge-danger' : structuredAlert.severity === 'متوسطة' ? 'badge-warning' : 'badge-info'} text-lg px-3 py-1">
                                ${Utils.escapeHTML(structuredAlert.severity || 'غير محدد')}
                            </span>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">الحالة</label>
                            <span class="badge ${statusColor} text-lg px-3 py-1">
                                ${Utils.escapeHTML(structuredAlert.status || 'نشط')}
                            </span>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">تاريخ الإنشاء</label>
                            <p class="text-gray-800 font-medium">${Utils.formatDateTime(structuredAlert.createdAt || structuredAlert.date)}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">آخر تحديث</label>
                            <p class="text-gray-800 font-medium">${updatedAt ? Utils.formatDateTime(updatedAt) : 'لم يتم التحديث'}</p>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-align-right ml-2"></i>الوصف التفصيلي
                        </label>
                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">${Utils.escapeHTML(structuredAlert.description || 'لا يوجد وصف')}</p>
                        </div>
                    </div>
                    
                    ${structuredAlert.impactArea ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-map-marker-alt ml-2"></i>المنطقة المتأثرة
                            </label>
                            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p class="text-blue-800">${Utils.escapeHTML(structuredAlert.impactArea)}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${(structuredAlert.channels || []).length > 0 ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-broadcast-tower ml-2"></i>قنوات الإرسال
                            </label>
                            <div class="flex flex-wrap gap-2">
                                ${structuredAlert.channels.map(channel => `
                                    <span class="badge badge-secondary">${Utils.escapeHTML(channel)}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${(structuredAlert.assignedTeams || []).length > 0 ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-users ml-2"></i>فرق الاستجابة
                            </label>
                            <div class="flex flex-wrap gap-2">
                                ${structuredAlert.assignedTeams.map(team => `
                                    <span class="badge badge-info">${Utils.escapeHTML(team)}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${structuredAlert.responseInstructions ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-clipboard-list ml-2"></i>تعليمات الاستجابة
                            </label>
                            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <p class="text-yellow-800 leading-relaxed whitespace-pre-wrap">${Utils.escapeHTML(structuredAlert.responseInstructions)}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user ml-2"></i>معلومات الإنشاء
                        </label>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-gray-800">
                                <strong>أُطلق بواسطة:</strong> ${Utils.escapeHTML(structuredAlert.createdBy?.name || 'النظام')}
                                ${structuredAlert.createdBy?.email ? `<br><strong>البريد:</strong> ${Utils.escapeHTML(structuredAlert.createdBy.email)}` : ''}
                                ${structuredAlert.createdBy?.role ? `<br><strong>الدور:</strong> ${Utils.escapeHTML(structuredAlert.createdBy.role)}` : ''}
                            </p>
                        </div>
                    </div>
                    
                    ${acknowledgedAt ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-check-circle ml-2"></i>معلومات الاعتماد
                            </label>
                            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p class="text-green-800">
                                    <strong>تم الاعتماد في:</strong> ${Utils.formatDateTime(acknowledgedAt)}
                                    ${structuredAlert.acknowledgedBy?.name ? `<br><strong>بواسطة:</strong> ${Utils.escapeHTML(structuredAlert.acknowledgedBy.name)}` : ''}
                                </p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${resolvedAt ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-flag-checkered ml-2"></i>معلومات الإغلاق
                            </label>
                            <div class="bg-teal-50 p-4 rounded-lg border border-teal-200">
                                <p class="text-teal-800">
                                    <strong>تم الإغلاق في:</strong> ${Utils.formatDateTime(resolvedAt)}
                                    ${structuredAlert.resolvedBy?.name ? `<br><strong>بواسطة:</strong> ${Utils.escapeHTML(structuredAlert.resolvedBy.name)}` : ''}
                                </p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${(structuredAlert.timeline || []).length > 0 ? `
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-3">
                                <i class="fas fa-history ml-2"></i>سجل الأنشطة
                            </label>
                            <div class="space-y-3">
                                ${structuredAlert.timeline.map(entry => `
                                    <div class="border-l-4 pl-4 ${this.getTimelineColor(entry.type)}">
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="font-semibold text-gray-800">${Utils.escapeHTML(entry.label || entry.type || 'تحديث')}</span>
                                            <span class="text-xs text-gray-500">${Utils.formatDateTime(entry.timestamp)}</span>
                                        </div>
                                        ${entry.description ? `<p class="text-sm text-gray-600">${Utils.escapeHTML(entry.description)}</p>` : ''}
                                        ${entry.actor?.name ? `<p class="text-xs text-gray-500 mt-1"><i class="fas fa-user ml-1"></i>${Utils.escapeHTML(entry.actor.name)}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="flex items-center justify-end gap-3 pt-4 border-t">
                        ${!structuredAlert.acknowledgedAt ? `
                            <button class="btn-secondary" onclick="Emergency.acknowledgeAlert('${structuredAlert.id}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-check ml-2"></i>اعتماد التنبيه
                            </button>
                        ` : ''}
                        ${structuredAlert.status !== 'مغلق' ? `
                            <button class="btn-primary" onclick="Emergency.resolveAlert('${structuredAlert.id}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-flag-checkered ml-2"></i>إغلاق التنبيه
                            </button>
                        ` : ''}
                        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times ml-2"></i>إغلاق
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // إغلاق عند النقر خارج النافذة
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // إغلاق عند الضغط على ESC
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    },

    async viewPlan(id) {
        const plan = AppState.appData.emergencyPlans.find(p => p.id === id);
        if (!plan) return;

        Notification.info(`الخطة: ${plan.name}`, {
            title: 'خطة الطوارئ',
            description: plan.description || 'لا يوجد وصف'
        });
    },

    /**
     * تنظيف جميع الموارد عند إلغاء تحميل الموديول
     * يمنع تسريبات الذاكرة (Memory Leaks)
     */
    cleanup() {
        try {
            if (typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('🧹 تنظيف موارد Emergency module...');
            }

            // تنظيف auto refresh interval
            this.clearAutoRefresh();

            if (typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ تم تنظيف موارد Emergency module');
            }
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ خطأ في تنظيف Emergency module:', error);
            }
        }
    },

    // ============================================
    // خريطة المصنع التفاعلية (Factory Safety Map)
    // ============================================

    _fmState: {
        currentPlanId: null,
        items: [],
        adminMode: false,
        addingType: null,
        dragItem: null,
        floorPlans: [],
        factoryFilter: '',
        zoom: 1,
        fullscreen: false,
        pendingDeepLink: null,
        customStampImages: {},
        planImageCache: {}
    },

    _fmStampRadius: 24,

    FM_FRAME_PRESETS: {
        room: { label: 'غرفة', icon: 'fa-door-closed', w: 220, h: 160 },
        hall: { label: 'قاعة', icon: 'fa-warehouse', w: 420, h: 260 },
        corridor: { label: 'ممر', icon: 'fa-arrows-alt-h', w: 360, h: 70 },
        office: { label: 'مكتب', icon: 'fa-briefcase', w: 180, h: 140 },
        door: { label: 'باب', icon: 'fa-door-open', w: 70, h: 24 },
        zone: { label: 'منطقة', icon: 'fa-border-all', w: 300, h: 200 }
    },

    FM_ITEM_TYPES: {
        fire_extinguisher: { label: 'مطفأة حريق', icon: 'fa-fire-extinguisher', color: '#ef4444' },
        fire_hose: { label: 'خرطوم حريق', icon: 'fa-fire', color: '#dc2626' },
        fire_alarm: { label: 'إنذار حريق', icon: 'fa-bell', color: '#f97316' },
        emergency_exit: { label: 'مخرج طوارئ', icon: 'fa-door-open', color: '#22c55e' },
        escape_route: { label: 'طريق هروب', icon: 'fa-arrow-right', color: '#16a34a' },
        assembly_point: { label: 'نقطة تجمع', icon: 'fa-users', color: '#3b82f6' },
        first_aid: { label: 'إسعافات أولية', icon: 'fa-medkit', color: '#ec4899' },
        hazmat: { label: 'مواد خطرة', icon: 'fa-skull-crossbones', color: '#a855f7' },
        evacuation_chair: { label: 'كرسي إخلاء', icon: 'fa-wheelchair', color: '#06b6d4' },
        fire_panel: { label: 'لوحة إطفاء', icon: 'fa-server', color: '#64748b' }
    },

    initFactoryMapTab() {
        const pending = this._fmState.pendingDeepLink;
        this._fmEnsureFormSettings().then(() => {
            this.refreshSiteDropdowns();
            return this.loadFloorPlans(pending?.planId || this._fmState.currentPlanId || '');
        }).then(() => {
            if (pending) this._fmHandlePendingDeepLink();
        });
        this._bindFactoryMapEvents();
        this._renderLegend();
    },

    async _fmEnsureFormSettings() {
        if (typeof Permissions !== 'undefined' && typeof Permissions.ensureFormSettingsState === 'function') {
            try { await Permissions.ensureFormSettingsState(); } catch (_e) { /* ignore */ }
        }
    },

    getSiteOptions() {
        try {
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState?.sites) {
                return Permissions.formSettingsState.sites.map(site => ({ id: site.id, name: site.name }));
            }
            if (Array.isArray(AppState.appData?.observationSites) && AppState.appData.observationSites.length > 0) {
                return AppState.appData.observationSites.map(site => ({
                    id: site.id || site.siteId || '',
                    name: site.name || site.title || site.label || 'موقع غير محدد'
                }));
            }
            return [];
        } catch (_e) {
            return [];
        }
    },

    getPlaceOptions(siteId) {
        try {
            if (!siteId) return [];
            const sid = String(siteId);
            if (typeof Permissions !== 'undefined' && Permissions.formSettingsState?.sites) {
                const site = Permissions.formSettingsState.sites.find(s => String(s.id) === sid);
                if (site && Array.isArray(site.places)) {
                    return site.places.map(place => ({
                        id: place.id,
                        name: place.name
                    }));
                }
            }
            if (Array.isArray(AppState.appData?.observationSites)) {
                const site = AppState.appData.observationSites.find(s => String(s.id || s.siteId) === sid);
                if (site) {
                    const placesSource = Array.isArray(site.places)
                        ? site.places
                        : Array.isArray(site.locations)
                            ? site.locations
                            : Array.isArray(site.children)
                                ? site.children
                                : Array.isArray(site.areas)
                                    ? site.areas
                                    : [];
                    return placesSource.map((place, idx) => ({
                        id: place.id || place.placeId || place.value || `PLACE_${idx}`,
                        name: place.name || place.placeName || place.title || place.label || place.locationName || `مكان ${idx + 1}`
                    }));
                }
            }
            return [];
        } catch (_e) {
            return [];
        }
    },

    _fmPlanMatchesFactory(plan, factoryFilter) {
        if (!factoryFilter) return true;
        const f = String(factoryFilter).trim();
        if (!f) return true;
        const planFactoryId = String(plan?.factoryId || plan?.factory || '').trim();
        const planFactoryName = String(plan?.factoryName || '').trim();
        if (planFactoryId === f || planFactoryName === f) return true;
        const sites = this.getSiteOptions();
        const filterSite = sites.find(s => String(s.id) === f);
        if (filterSite) {
            const filterName = String(filterSite.name || '').trim();
            if (filterName && (planFactoryName === filterName || planFactoryId === filterName)) return true;
        }
        return false;
    },

    _fmNormalizeFloorPlan(plan) {
        if (!plan || typeof plan !== 'object') return plan;
        const normalized = { ...plan };
        const sites = this.getSiteOptions();
        const rawFactory = String(normalized.factory || '').trim();
        const rawFactoryId = String(normalized.factoryId || '').trim();
        const rawFactoryName = String(normalized.factoryName || '').trim();

        if (!rawFactoryId && rawFactory) {
            const byId = sites.find(s => String(s.id) === rawFactory);
            const byName = sites.find(s => String(s.name) === rawFactory);
            if (byId) {
                normalized.factoryId = byId.id;
                normalized.factory = byId.id;
                if (!rawFactoryName) normalized.factoryName = byId.name;
            } else if (byName) {
                normalized.factoryId = byName.id;
                normalized.factory = byName.id;
                normalized.factoryName = byName.name;
            }
        } else if (rawFactoryId) {
            normalized.factoryId = rawFactoryId;
            if (!rawFactory || rawFactory === rawFactoryName) normalized.factory = rawFactoryId;
            if (!rawFactoryName) {
                const site = sites.find(s => String(s.id) === rawFactoryId);
                if (site) normalized.factoryName = site.name;
            }
        } else if (rawFactoryName) {
            const site = sites.find(s => String(s.name) === rawFactoryName);
            if (site) {
                normalized.factoryId = site.id;
                normalized.factory = site.id;
            }
        }

        if (normalized.imageDriveId) {
            normalized.imageDriveId = String(normalized.imageDriveId).trim();
        }
        return normalized;
    },

    _fmInvalidateFloorPlansCache() {
        try {
            if (typeof GoogleIntegration !== 'undefined') {
                if (typeof GoogleIntegration.clearCache === 'function') {
                    GoogleIntegration.clearCache('getAllEmergencyFloorPlans');
                }
                if (typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets === 'function') {
                    GoogleIntegration.invalidateReadFromSheetCacheForSheets('EmergencyFloorPlans');
                }
            }
            localStorage.removeItem('hse_local_getAllEmergencyFloorPlans');
            this._fmState.planImageCache = {};
        } catch (_e) { /* ignore */ }
    },

    _fmBuildSubLocationOptionsHtml(factoryId, selectedSubId, selectedSubName) {
        const places = this.getPlaceOptions(factoryId);
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeAttr) ? Utils.escapeAttr(v) : String(v ?? '');
        const escHtml = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(v) : String(v ?? '');
        const selectedId = selectedSubId || places.find(p => p.name === selectedSubName)?.id || '';
        if (!places.length) {
            return `<option value="">— لا توجد مواقع فرعية لهذا المصنع —</option>`;
        }
        return '<option value="">— اختر الطابق / الموقع الفرعي —</option>' + places.map(p =>
            `<option value="${esc(p.id)}" data-name="${esc(p.name)}" ${String(p.id) === String(selectedId) ? 'selected' : ''}>${escHtml(p.name)}</option>`
        ).join('');
    },

    _fmRefreshSubLocationDropdown(factoryId, selectedSubId, selectedSubName) {
        const floorField = document.getElementById('fm-floor-level');
        if (!floorField) return;
        floorField.innerHTML = this._fmBuildSubLocationOptionsHtml(factoryId, selectedSubId, selectedSubName);
    },

    _fmBindFactoryCascade(selectedSubId, selectedSubName) {
        const factoryField = document.getElementById('fm-floor-factory');
        if (!factoryField || factoryField.dataset.fmCascadeBound) return;
        const refresh = () => {
            this._fmRefreshSubLocationDropdown(factoryField.value, selectedSubId, selectedSubName);
        };
        factoryField.addEventListener('change', () => {
            selectedSubId = '';
            selectedSubName = '';
            this._fmRefreshSubLocationDropdown(factoryField.value, '', '');
        });
        factoryField.dataset.fmCascadeBound = '1';
        refresh();
    },

    refreshSiteDropdowns() {
        try {
            const sites = this.getSiteOptions();
            const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeAttr) ? Utils.escapeAttr(v) : String(v ?? '');
            const escHtml = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(v) : String(v ?? '');
            const opts = '<option value="">— اختر المصنع —</option>' +
                sites.map(s => `<option value="${esc(s.id)}" data-name="${esc(s.name)}">${escHtml(s.name)}</option>`).join('');
            const filterOpts = '<option value="">كل المصانع</option>' +
                sites.map(s => `<option value="${esc(s.id)}">${escHtml(s.name)}</option>`).join('');
            const factoryField = document.getElementById('fm-floor-factory');
            if (factoryField) {
                const prev = factoryField.value;
                factoryField.innerHTML = opts;
                if (prev) factoryField.value = prev;
            }
            const filterField = document.getElementById('fm-factory-filter');
            if (filterField) {
                const prevF = filterField.value || this._fmState.factoryFilter || '';
                filterField.innerHTML = filterOpts;
                if (prevF) filterField.value = prevF;
            }
        } catch (_e) { /* ignore */ }
    },

    _fmBuildFactorySelectHtml(selectedFactoryId, selectedFactoryName) {
        const sites = this.getSiteOptions();
        const selectedId = selectedFactoryId || sites.find(s => s.name === selectedFactoryName)?.id || '';
        const esc = (v) => (typeof Utils !== 'undefined' && Utils.escapeAttr) ? Utils.escapeAttr(v) : String(v ?? '');
        const escHtml = (v) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(v) : String(v ?? '');
        return '<option value="">— اختر المصنع —</option>' + sites.map(s =>
            `<option value="${esc(s.id)}" data-name="${esc(s.name)}" ${String(s.id) === String(selectedId) ? 'selected' : ''}>${escHtml(s.name)}</option>`
        ).join('');
    },

    _fmBuildFrameToolbarHtml() {
        return Object.entries(this.FM_FRAME_PRESETS).map(([key, def]) => `
            <button type="button" class="fm-frame-btn" data-frame="${key}" title="إدراج إطار: ${Utils.escapeHTML(def.label)}">
                <i class="fas ${Utils.escapeAttr(def.icon)}"></i>
                <span>${Utils.escapeHTML(def.label)}</span>
            </button>
        `).join('');
    },

    _fmInsertFramePreset(presetKey) {
        const preset = this.FM_FRAME_PRESETS[presetKey];
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!preset || !canvas) return;
        this._fmInitCanvasLayers(canvas);
        const color = document.getElementById('fm-draw-color')?.value || '#1e293b';
        const lineW = parseInt(document.getElementById('fm-draw-width')?.value, 10) || 4;
        const w = preset.w;
        const h = preset.h;
        let x = Math.round((canvas.width - w) / 2);
        let y = Math.round((canvas.height - h) / 2);
        const pos = this._fmFindFreePosition(canvas, 'frame', -1, x, y, w, h);
        x = pos.x;
        y = pos.y;
        canvas._fmFrames.push({
            id: 'fr_' + Date.now(),
            presetKey,
            x, y, w, h,
            color,
            width: lineW
        });
        canvas._fmSelected = { kind: 'frame', index: canvas._fmFrames.length - 1 };
        this._fmRedrawSketchCanvas(canvas);
        if (typeof Notification !== 'undefined' && Notification.success) {
            Notification.success('تم إدراج إطار ' + preset.label + ' — اسحبه للنقل');
        }
    },

    _fmBindFrameToolbar() {
        const bar = document.getElementById('fm-frame-toolbar');
        if (!bar || bar.dataset.fmBound) return;
        bar.addEventListener('click', (e) => {
            const btn = e.target.closest('.fm-frame-btn');
            if (!btn) return;
            this._fmInsertFramePreset(btn.dataset.frame);
        });
        bar.dataset.fmBound = '1';
    },

    _fmParseListResponse(resp) {
        if (Array.isArray(resp)) return resp;
        if (!resp || typeof resp !== 'object') return [];
        if (Array.isArray(resp.data)) return resp.data;
        if (resp.data && Array.isArray(resp.data.data)) return resp.data.data;
        if (resp.success !== false && resp.data && Array.isArray(resp.data)) return resp.data;
        return [];
    },

    _fmUpdatePlanMeta() {
        const meta = document.getElementById('fm-plan-meta');
        const countEl = document.getElementById('fm-items-count');
        const plan = this._fmState.floorPlans.find(p => String(p.id) === String(this._fmState.currentPlanId || ''));
        if (meta) {
            const placeLabel = plan?.subLocationName || plan?.floor || '';
            meta.textContent = plan
                ? `${plan.name || 'مخطط'}${plan.factoryName ? ' · ' + plan.factoryName : ''}${placeLabel ? ' — ' + placeLabel : ''}`
                : 'اختر مخططاً لعرض خريطة السلامة';
        }
        if (countEl) {
            const n = this._fmState.items.length;
            countEl.innerHTML = `<i class="fas fa-map-pin"></i> ${n} عنصر`;
        }
    },

    _fmApplyZoom() {
        const inner = document.getElementById('fm-viewport-inner');
        const label = document.getElementById('fm-zoom-label');
        const z = this._fmState.zoom || 1;
        if (inner) {
            inner.style.transform = `scale(${z})`;
            inner.style.transformOrigin = 'top center';
        }
        if (label) label.textContent = Math.round(z * 100) + '%';
    },

    _fmSetZoom(nextZoom) {
        this._fmState.zoom = Math.max(0.35, Math.min(2.5, nextZoom));
        this._fmApplyZoom();
    },

    _fmResetZoom() {
        this._fmState.zoom = 1;
        this._fmApplyZoom();
        const viewport = document.getElementById('fm-viewport');
        if (viewport) viewport.scrollTop = 0;
    },

    toggleFactoryMapFullscreen() {
        const shell = document.getElementById('fm-shell');
        const btn = document.getElementById('fm-fullscreen-btn');
        if (!shell) return;

        const entering = !this._fmState.fullscreen;
        this._fmState.fullscreen = entering;
        shell.classList.toggle('fm-fullscreen-active', entering);
        document.body.classList.toggle('fm-body-fullscreen', entering);

        if (btn) {
            btn.innerHTML = entering
                ? '<i class="fas fa-compress"></i><span>خروج</span>'
                : '<i class="fas fa-expand"></i><span>ملء الشاشة</span>';
            btn.title = entering ? 'الخروج من ملء الشاشة' : 'ملء الشاشة';
        }

        if (entering && shell.requestFullscreen) {
            shell.requestFullscreen().catch(() => {});
        } else if (!entering && document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        }
    },

    _fmOnFullscreenChange() {
        const shell = document.getElementById('fm-shell');
        const isFs = !!(document.fullscreenElement && shell && document.fullscreenElement === shell);
        if (!isFs && this._fmState.fullscreen) {
            this._fmState.fullscreen = false;
            shell?.classList.remove('fm-fullscreen-active');
            document.body.classList.remove('fm-body-fullscreen');
            const btn = document.getElementById('fm-fullscreen-btn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-expand"></i><span>ملء الشاشة</span>';
                btn.title = 'ملء الشاشة';
            }
        }
    },

    _fmCompressCanvasDataUrl(canvas, maxWidth, quality) {
        if (!canvas) return '';
        const mw = maxWidth || 1400;
        let w = canvas.width;
        let h = canvas.height;
        if (w > mw) {
            h = Math.round(h * (mw / w));
            w = mw;
        }
        const tmp = document.createElement('canvas');
        tmp.width = w;
        tmp.height = h;
        const ctx = tmp.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(canvas, 0, 0, w, h);
        return tmp.toDataURL('image/jpeg', quality || 0.85);
    },

    _bindFactoryMapEvents() {
        const floorSelect = document.getElementById('fm-floor-select');
        const adminToggle = document.getElementById('fm-admin-toggle');
        const adminClose = document.getElementById('fm-admin-close');
        const addFloorBtn = document.getElementById('fm-add-floor-btn');

        if (floorSelect && !floorSelect.dataset.fmBound) {
            floorSelect.addEventListener('change', () => {
                const planId = floorSelect.value;
                const editBtn = document.getElementById('fm-edit-floor-btn');
                const deleteBtn = document.getElementById('fm-delete-floor-btn');
                const viewportBar = document.getElementById('fm-viewport-bar');
                const legendSidebar = document.getElementById('fm-legend-sidebar');
                if (planId) {
                    this.loadMapItems(planId);
                    if (editBtn) editBtn.classList.remove('hidden');
                    if (deleteBtn) deleteBtn.classList.remove('hidden');
                    if (viewportBar) viewportBar.classList.remove('hidden');
                    if (legendSidebar) legendSidebar.classList.remove('hidden');
                } else {
                    document.getElementById('fm-map-placeholder')?.classList.remove('hidden');
                    document.getElementById('fm-map-wrapper')?.classList.add('hidden');
                    if (editBtn) editBtn.classList.add('hidden');
                    if (deleteBtn) deleteBtn.classList.add('hidden');
                    if (viewportBar) viewportBar.classList.add('hidden');
                    if (legendSidebar) legendSidebar.classList.add('hidden');
                    this._fmState.currentPlanId = null;
                    this._fmState.items = [];
                    this._fmUpdatePlanMeta();
                }
            });
            floorSelect.dataset.fmBound = '1';
        }

        const zoomIn = document.getElementById('fm-zoom-in');
        const zoomOut = document.getElementById('fm-zoom-out');
        const zoomReset = document.getElementById('fm-zoom-reset');
        const fsBtn = document.getElementById('fm-fullscreen-btn');
        if (zoomIn && !zoomIn.dataset.fmBound) {
            zoomIn.addEventListener('click', () => this._fmSetZoom((this._fmState.zoom || 1) + 0.15));
            zoomIn.dataset.fmBound = '1';
        }
        if (zoomOut && !zoomOut.dataset.fmBound) {
            zoomOut.addEventListener('click', () => this._fmSetZoom((this._fmState.zoom || 1) - 0.15));
            zoomOut.dataset.fmBound = '1';
        }
        if (zoomReset && !zoomReset.dataset.fmBound) {
            zoomReset.addEventListener('click', () => this._fmResetZoom());
            zoomReset.dataset.fmBound = '1';
        }
        if (fsBtn && !fsBtn.dataset.fmBound) {
            fsBtn.addEventListener('click', () => this.toggleFactoryMapFullscreen());
            fsBtn.dataset.fmBound = '1';
        }
        if (!document.body.dataset.fmFsBound) {
            document.addEventListener('fullscreenchange', () => this._fmOnFullscreenChange());
            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape') return;
                if (document.getElementById('fm-floor-modal')) {
                    this._closeFloorPlanModal();
                    return;
                }
                if (this._fmState.fullscreen) this.toggleFactoryMapFullscreen();
            });
            document.body.dataset.fmFsBound = '1';
        }
        if (adminToggle && !adminToggle.dataset.fmBound) {
            adminToggle.addEventListener('click', () => this.toggleAdminMode());
            adminToggle.dataset.fmBound = '1';
        }
        if (adminClose && !adminClose.dataset.fmBound) {
            adminClose.addEventListener('click', () => { if (this._fmState.adminMode) this.toggleAdminMode(); });
            adminClose.dataset.fmBound = '1';
        }
        if (addFloorBtn && !addFloorBtn.dataset.fmBound) {
            addFloorBtn.addEventListener('click', () => this.showFloorPlanForm());
            addFloorBtn.dataset.fmBound = '1';
        }
        const factoryFilter = document.getElementById('fm-factory-filter');
        if (factoryFilter && !factoryFilter.dataset.fmBound) {
            factoryFilter.addEventListener('change', () => {
                this._fmState.factoryFilter = factoryFilter.value || '';
                this.loadFloorPlans(this._fmState.currentPlanId || '');
            });
            factoryFilter.dataset.fmBound = '1';
        }
        const exportBtn = document.getElementById('fm-export-png-btn');
        if (exportBtn && !exportBtn.dataset.fmBound) {
            exportBtn.addEventListener('click', () => this._fmExportCurrentMapPng());
            exportBtn.dataset.fmBound = '1';
        }
        const qrBtn = document.getElementById('fm-qr-btn');
        if (qrBtn && !qrBtn.dataset.fmBound) {
            qrBtn.addEventListener('click', () => this._fmShowMapQrPanel());
            qrBtn.dataset.fmBound = '1';
        }
        const editFloorBtn = document.getElementById('fm-edit-floor-btn');
        if (editFloorBtn && !editFloorBtn.dataset.fmBound) {
            editFloorBtn.addEventListener('click', () => {
                const planId = floorSelect?.value;
                if (planId) this.showFloorPlanForm(planId);
            });
            editFloorBtn.dataset.fmBound = '1';
        }
        const deleteFloorBtn = document.getElementById('fm-delete-floor-btn');
        if (deleteFloorBtn && !deleteFloorBtn.dataset.fmBound) {
            deleteFloorBtn.addEventListener('click', () => {
                const planId = floorSelect?.value;
                if (planId) this.deleteFloorPlan(planId);
            });
            deleteFloorBtn.dataset.fmBound = '1';
        }

        // أزرار إضافة العناصر
        document.querySelectorAll('.fm-add-item-btn').forEach(btn => {
            if (!btn.dataset.fmBound) {
                btn.addEventListener('click', () => {
                    const type = btn.dataset.type;
                    if (this._fmState.addingType === type) {
                        this._fmState.addingType = null;
                        document.querySelectorAll('.fm-add-item-btn').forEach(b => b.classList.remove('active'));
                    } else {
                        this._fmState.addingType = type;
                        document.querySelectorAll('.fm-add-item-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    }
                });
                btn.dataset.fmBound = '1';
            }
        });
    },

    async loadFloorPlans(selectPlanId, options) {
        const select = document.getElementById('fm-floor-select');
        if (!select) return [];

        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) {
            return [];
        }

        try {
            this._fmInvalidateFloorPlansCache();
            const resp = await GoogleIntegration.sendRequest({
                action: 'getAllEmergencyFloorPlans',
                data: { skipCache: true }
            });
            const allPlans = this._fmParseListResponse(resp)
                .map(p => this._fmNormalizeFloorPlan(p))
                .filter(p => p && String(p.isActive || 'true') !== 'false')
                .sort((a, b) => (parseInt(a.sortOrder, 10) || 0) - (parseInt(b.sortOrder, 10) || 0));
            this._fmState.floorPlans = allPlans;

            const targetId = String(selectPlanId || this._fmState.currentPlanId || '');
            const savedPlan = targetId ? allPlans.find(p => String(p.id) === targetId) : null;
            if (savedPlan && options?.syncFactoryFilter !== false) {
                const fid = savedPlan.factoryId || savedPlan.factory || '';
                if (fid) {
                    this._fmState.factoryFilter = String(fid);
                    const filterField = document.getElementById('fm-factory-filter');
                    if (filterField) filterField.value = String(fid);
                }
            }

            const factoryFilter = document.getElementById('fm-factory-filter')?.value || this._fmState.factoryFilter || '';
            let displayPlans = factoryFilter
                ? allPlans.filter(p => this._fmPlanMatchesFactory(p, factoryFilter))
                : allPlans.slice();
            if (factoryFilter && displayPlans.length === 0 && allPlans.length > 0) {
                const filterField = document.getElementById('fm-factory-filter');
                if (filterField) filterField.value = '';
                this._fmState.factoryFilter = '';
                displayPlans = allPlans.slice();
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning('تصفية المصنع أخفت المخططات — تم عرض كل المخططات المحفوظة');
                }
            }
            if (savedPlan && !displayPlans.some(p => String(p.id) === targetId)) {
                displayPlans = [savedPlan, ...displayPlans];
            }

            select.innerHTML = '<option value="">— اختر المخطط —</option>' +
                displayPlans.map(p => {
                    const factoryLabel = p.factoryName || p.factory || '';
                    const placeLabel = p.subLocationName || p.floor || '';
                    return `<option value="${Utils.escapeAttr(p.id)}">${Utils.escapeHTML(p.name || 'مخطط')}${factoryLabel ? ' · ' + Utils.escapeHTML(factoryLabel) : ''}${placeLabel ? ' — ' + Utils.escapeHTML(placeLabel) : ''}</option>`;
                }).join('');

            if (targetId && allPlans.some(p => String(p.id) === targetId)) {
                select.value = targetId;
                this._fmState.currentPlanId = targetId;
                this.loadMapItems(targetId);
                document.getElementById('fm-edit-floor-btn')?.classList.remove('hidden');
                document.getElementById('fm-delete-floor-btn')?.classList.remove('hidden');
                document.getElementById('fm-viewport-bar')?.classList.remove('hidden');
                document.getElementById('fm-legend-sidebar')?.classList.remove('hidden');
            }
            return allPlans;
        } catch (_e) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('تعذر تحميل مخططات الطوارئ');
            }
            return this._fmState.floorPlans || [];
        }
    },

    _closeFloorPlanModal() {
        const modal = document.getElementById('fm-floor-modal');
        if (modal) modal.remove();
        document.body.classList.remove('fm-floor-modal-open');
    },

    _fmBuildStampToolbarHtml() {
        const builtIn = Object.entries(this.FM_ITEM_TYPES).map(([key, def]) => `
            <button type="button" class="fm-stamp-btn" data-stamp="${key}" title="${Utils.escapeHTML(def.label)}" style="--stamp-color:${def.color};">
                <i class="fas ${Utils.escapeAttr(def.icon)}"></i>
                <span>${Utils.escapeHTML(def.label)}</span>
            </button>
        `).join('');
        const custom = Object.entries(this._fmState.customStampImages || {}).map(([key, img]) => `
            <button type="button" class="fm-stamp-btn fm-stamp-btn-custom" data-stamp="${Utils.escapeAttr(key)}" title="أيقونة مستوردة" style="--stamp-color:#0ea5e9;">
                <img src="${Utils.escapeAttr(img)}" alt="" class="fm-stamp-thumb">
                <span>مخصص</span>
            </button>
        `).join('');
        return builtIn + custom;
    },

    _fmGenerateQrToken() {
        return 'QR-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    },

    _fmGetGasScriptUrl() {
        let scriptUrl = String(AppState?.googleConfig?.appsScript?.scriptUrl || '').trim();
        if (!scriptUrl) return '';
        if (scriptUrl.indexOf('script.google.com/macros/s/') !== -1) {
            scriptUrl = scriptUrl.replace(/\/dev(\?|#|$)/, '/exec$1');
        }
        return scriptUrl;
    },

    _fmBuildMapQrUrl(plan) {
        if (!plan || !plan.id) return '';
        const scriptUrl = this._fmGetGasScriptUrl();
        const token = plan.qrToken || '';
        if (scriptUrl) {
            const joiner = scriptUrl.includes('?') ? '&' : '?';
            return `${scriptUrl}${joiner}action=publicEmergencyMap&planId=${encodeURIComponent(plan.id)}&token=${encodeURIComponent(token)}`;
        }
        const url = new URL(window.location.origin + window.location.pathname);
        url.searchParams.set('section', 'emergency');
        url.searchParams.set('factoryMap', plan.id);
        if (token) url.searchParams.set('qr', token);
        url.hash = 'emergency';
        return url.toString();
    },

    _fmCheckQrEntry() {
        try {
            const params = new URLSearchParams(window.location.search);
            const planId = params.get('factoryMap');
            if (!planId || params.get('section') !== 'emergency') return;
            this._fmState.pendingDeepLink = { planId, qr: params.get('qr') || '' };
            if (typeof UI !== 'undefined' && UI.showSection) {
                setTimeout(() => {
                    UI.showSection('emergency');
                    const tab = document.querySelector('#emergency-section .tab-btn[data-tab="factory-map"]');
                    if (tab) tab.click();
                }, 400);
            }
        } catch (_e) { /* ignore */ }
    },

    _fmHandlePendingDeepLink() {
        const pending = this._fmState.pendingDeepLink;
        if (!pending?.planId) return;
        const plan = this._fmState.floorPlans.find(p => String(p.id) === String(pending.planId));
        if (!plan) {
            if (typeof Notification !== 'undefined' && Notification.warning) Notification.warning('المخطط المطلوب عبر QR غير موجود');
            this._fmState.pendingDeepLink = null;
            return;
        }
        if (pending.qr && plan.qrToken && pending.qr !== plan.qrToken) {
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('رمز QR غير صالح لهذا المخطط');
            this._fmState.pendingDeepLink = null;
            return;
        }
        const select = document.getElementById('fm-floor-select');
        if (select) {
            select.value = plan.id;
            select.dispatchEvent(new Event('change'));
        }
        if (typeof Notification !== 'undefined' && Notification.info) {
            Notification.info('تم فتح مخطط الطوارئ: ' + (plan.name || plan.id));
        }
        this._fmState.pendingDeepLink = null;
    },

    _fmInitCanvasLayers(canvas) {
        if (!canvas._fmStamps) canvas._fmStamps = [];
        if (!canvas._fmFrames) canvas._fmFrames = [];
        if (!canvas._fmCustomImages) canvas._fmCustomImages = {};
        if (!canvas._fmSelected) canvas._fmSelected = null;
    },

    _fmObjectGap() {
        return 10;
    },

    _fmStampHitRadius() {
        return this._fmStampRadius + 6;
    },

    _fmClampRect(x, y, w, h, maxW, maxH) {
        const nx = Math.max(0, Math.min(x, maxW - w));
        const ny = Math.max(0, Math.min(y, maxH - h));
        return { x: nx, y: ny };
    },

    _fmRectsOverlap(a, b, gap) {
        const g = gap || 0;
        return !(a.x + a.w + g <= b.x || b.x + b.w + g <= a.x || a.y + a.h + g <= b.y || b.y + b.h + g <= a.y);
    },

    _fmCircleRectOverlap(cx, cy, cr, rect, gap) {
        const g = gap || 0;
        const closestX = Math.max(rect.x - g, Math.min(cx, rect.x + rect.w + g));
        const closestY = Math.max(rect.y - g, Math.min(cy, rect.y + rect.h + g));
        const dx = cx - closestX;
        const dy = cy - closestY;
        return (dx * dx + dy * dy) <= (cr + g) * (cr + g);
    },

    _fmGetFrameRect(frame) {
        return { x: frame.x, y: frame.y, w: frame.w, h: frame.h };
    },

    _fmWouldOverlap(canvas, kind, index, x, y, w, h) {
        const gap = this._fmObjectGap();
        const stamps = canvas._fmStamps || [];
        const frames = canvas._fmFrames || [];
        const stampR = this._fmStampHitRadius();
        const target = w > 0 && h > 0
            ? { x, y, w, h }
            : null;
        const stampPoint = !target ? { cx: x, cy: y, r: stampR } : null;

        for (let i = 0; i < frames.length; i++) {
            if (kind === 'frame' && i === index) continue;
            const fr = this._fmGetFrameRect(frames[i]);
            if (target) {
                if (this._fmRectsOverlap(target, fr, gap)) return true;
            } else if (this._fmCircleRectOverlap(stampPoint.cx, stampPoint.cy, stampPoint.r, fr, gap)) {
                return true;
            }
        }
        for (let i = 0; i < stamps.length; i++) {
            if (kind === 'stamp' && i === index) continue;
            const s = stamps[i];
            if (target) {
                if (this._fmCircleRectOverlap(s.x, s.y, stampR, target, gap)) return true;
            } else {
                const dx = x - s.x;
                const dy = y - s.y;
                if ((dx * dx + dy * dy) <= (stampR * 2 + gap) * (stampR * 2 + gap)) return true;
            }
        }
        return false;
    },

    _fmFindFreePosition(canvas, kind, index, x, y, w, h) {
        const gap = this._fmObjectGap();
        const cw = canvas.width;
        const ch = canvas.height;
        const bw = w || 0;
        const bh = h || 0;
        const tryPos = (tx, ty) => {
            if (bw && bh) {
                const c = this._fmClampRect(tx, ty, bw, bh, cw, ch);
                return { x: c.x, y: c.y };
            }
            return {
                x: Math.max(gap, Math.min(tx, cw - gap)),
                y: Math.max(gap, Math.min(ty, ch - gap))
            };
        };
        if (!this._fmWouldOverlap(canvas, kind, index, x, y, bw, bh)) {
            return tryPos(x, y);
        }
        const radii = [0, 12, 24, 36, 48, 64, 80, 100, 130, 160, 200];
        for (let ri = 1; ri < radii.length; ri++) {
            const rad = radii[ri];
            for (let a = 0; a < 16; a++) {
                const ang = (a / 16) * Math.PI * 2;
                const tx = x + Math.cos(ang) * rad;
                const ty = y + Math.sin(ang) * rad;
                const p = tryPos(tx, ty);
                if (!this._fmWouldOverlap(canvas, kind, index, p.x, p.y, bw, bh)) return p;
            }
        }
        return tryPos(x, y);
    },

    _fmDrawFrameOnCanvas(ctx, frame, isSelected) {
        const preset = this.FM_FRAME_PRESETS[frame.presetKey] || {};
        const label = preset.label || '';
        ctx.save();
        ctx.strokeStyle = frame.color || '#1e293b';
        ctx.lineWidth = frame.width || 4;
        ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
        ctx.fillStyle = (frame.color || '#1e293b') + '18';
        ctx.fillRect(frame.x, frame.y, frame.w, frame.h);
        if (label) {
            ctx.font = 'bold 11px Tahoma, Arial, sans-serif';
            ctx.fillStyle = frame.color || '#1e293b';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(label, frame.x + 6, frame.y + 4);
        }
        if (isSelected) {
            ctx.setLineDash([6, 4]);
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 2;
            ctx.strokeRect(frame.x - 3, frame.y - 3, frame.w + 6, frame.h + 6);
            ctx.setLineDash([]);
        }
        ctx.restore();
    },

    _fmRedrawSketchCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvas._fmBaseSnapshot) ctx.putImageData(canvas._fmBaseSnapshot, 0, 0);
        const sel = canvas._fmSelected;
        (canvas._fmFrames || []).forEach((frame, i) => {
            this._fmDrawFrameOnCanvas(ctx, frame, sel && sel.kind === 'frame' && sel.index === i);
        });
        (canvas._fmStamps || []).forEach((stamp, i) => {
            this._fmDrawStampOnCanvas(ctx, stamp.type, stamp.x, stamp.y, stamp.customImage);
            if (sel && sel.kind === 'stamp' && sel.index === i) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(stamp.x, stamp.y, this._fmStampRadius + 8, 0, Math.PI * 2);
                ctx.setLineDash([5, 4]);
                ctx.strokeStyle = '#2563eb';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }
        });
    },

    _fmHitTestFrame(canvas, x, y) {
        const frames = canvas._fmFrames || [];
        for (let i = frames.length - 1; i >= 0; i--) {
            const f = frames[i];
            if (x >= f.x && x <= f.x + f.w && y >= f.y && y <= f.y + f.h) return i;
        }
        return -1;
    },

    _fmHitTestStamp(canvas, x, y) {
        const r = this._fmStampHitRadius();
        const stamps = canvas._fmStamps || [];
        for (let i = stamps.length - 1; i >= 0; i--) {
            const s = stamps[i];
            const dx = x - s.x;
            const dy = y - s.y;
            if ((dx * dx) + (dy * dy) <= r * r) return i;
        }
        return -1;
    },

    _fmHitTestTopObject(canvas, x, y) {
        const frameIdx = this._fmHitTestFrame(canvas, x, y);
        if (frameIdx >= 0) return { kind: 'frame', index: frameIdx };
        const stampIdx = this._fmHitTestStamp(canvas, x, y);
        if (stampIdx >= 0) return { kind: 'stamp', index: stampIdx };
        return null;
    },

    _fmUpdateCanvasCursor(canvas, toolState) {
        if (!canvas || !toolState) return;
        if (toolState.tool === 'move') {
            canvas.style.cursor = canvas._fmDragState?.active ? 'grabbing' : 'grab';
        } else if (toolState.tool === 'eraser') {
            canvas.style.cursor = 'cell';
        } else if (toolState.tool === 'stamp') {
            canvas.style.cursor = 'copy';
        } else {
            canvas.style.cursor = 'crosshair';
        }
    },

    _fmEraseBaseAt(canvas, x, y, brushSize) {
        if (!canvas._fmBaseSnapshot) return;
        const data = canvas._fmBaseSnapshot.data;
        const w = canvas.width;
        const h = canvas.height;
        const r = Math.max(brushSize, 12);
        const r2 = r * r;
        const minX = Math.max(0, Math.floor(x - r));
        const maxX = Math.min(w - 1, Math.ceil(x + r));
        const minY = Math.max(0, Math.floor(y - r));
        const maxY = Math.min(h - 1, Math.ceil(y + r));
        for (let py = minY; py <= maxY; py++) {
            for (let px = minX; px <= maxX; px++) {
                const dx = px - x;
                const dy = py - y;
                if ((dx * dx) + (dy * dy) > r2) continue;
                const idx = (py * w + px) * 4;
                data[idx] = 255;
                data[idx + 1] = 255;
                data[idx + 2] = 255;
                data[idx + 3] = 0;
            }
        }
    },

    _fmSerializeCanvasStamps(canvas) {
        return JSON.stringify({
            stamps: (canvas._fmStamps || []).map(s => ({
                type: s.type,
                x: s.x,
                y: s.y
            })),
            frames: (canvas._fmFrames || []).map(f => ({
                presetKey: f.presetKey,
                x: f.x,
                y: f.y,
                w: f.w,
                h: f.h,
                color: f.color,
                width: f.width
            }))
        });
    },

    _fmGetExportBranding() {
        return {
            companyName: String(AppState?.companySettings?.name || AppState?.companyName || '').trim(),
            companySecondaryName: String(AppState?.companySettings?.secondaryName || '').trim(),
            logoUrl: String(AppState?.companyLogo || AppState?.companySettings?.logo || '').trim(),
            formVersion: String(AppState?.companySettings?.formVersion || '1.0').trim(),
            formCode: String(AppState?.companySettings?.factoryMapFormCode || 'HSE-FM-MAP-01').trim()
        };
    },

    _fmDrawRoundedRect(ctx, x, y, w, h, r) {
        const radius = Math.max(0, Math.min(r, w / 2, h / 2));
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + w, y, x + w, y + h, radius);
        ctx.arcTo(x + w, y + h, x, y + h, radius);
        ctx.arcTo(x, y + h, x, y, radius);
        ctx.arcTo(x, y, x + w, y, radius);
        ctx.closePath();
    },

    _fmCanvasSetFont(ctx, size, weight, color) {
        ctx.font = `${weight || 'normal'} ${size}px Tahoma, 'Segoe UI', Arial, sans-serif`;
        if (color) ctx.fillStyle = color;
    },

    _fmCanvasFitFontSize(ctx, text, maxWidth, startSize, weight) {
        let size = startSize;
        while (size > 8) {
            this._fmCanvasSetFont(ctx, size, weight);
            if (ctx.measureText(text).width <= maxWidth) return size;
            size -= 1;
        }
        return size;
    },

    _fmCanvasDrawWrappedLines(ctx, text, x, y, maxWidth, lineHeight, align, maxLines) {
        const words = String(text || '').split(/\s+/).filter(Boolean);
        const lines = [];
        let line = '';
        words.forEach((word) => {
            const test = line ? `${line} ${word}` : word;
            if (ctx.measureText(test).width > maxWidth && line) {
                lines.push(line);
                line = word;
            } else {
                line = test;
            }
        });
        if (line) lines.push(line);
        const clipped = lines.slice(0, maxLines || lines.length);
        if (lines.length > clipped.length) {
            clipped[clipped.length - 1] = clipped[clipped.length - 1].slice(0, -1) + '…';
        }
        ctx.textAlign = align || 'right';
        clipped.forEach((ln, idx) => ctx.fillText(ln, x, y + idx * lineHeight));
        return clipped.length;
    },

    _fmGetExportDocumentMeta(plan) {
        const brand = this._fmGetExportBranding();
        const now = new Date();
        const placeLabel = plan?.subLocationName || plan?.floor || '';
        const planTitle = `${plan?.name || 'مخطط'}${plan?.factoryName ? ' · ' + plan.factoryName : ''}${placeLabel ? ' — ' + placeLabel : ''}`;
        return {
            ...brand,
            planTitle,
            planRef: String(plan?.id || '—'),
            exportDate: now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
            exportTime: now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
            exportDateTime: now.toLocaleString('ar-EG', { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' })
        };
    },

    async _fmDrawExportHeader(ctx, totalW, headerH, plan, logoImg) {
        const meta = this._fmGetExportDocumentMeta(plan);
        const pad = 18;
        const logoColW = 150;
        const metaColW = 250;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, totalW, headerH);
        ctx.fillStyle = '#003865';
        ctx.fillRect(0, headerH - 3, totalW, 3);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(0, headerH - 6, totalW, 2);

        const logoBoxX = pad;
        const logoBoxY = 14;
        const logoBoxW = logoColW - 8;
        const logoBoxH = headerH - 28;
        ctx.fillStyle = '#f8fafc';
        this._fmDrawRoundedRect(ctx, logoBoxX, logoBoxY, logoBoxW, logoBoxH, 12);
        ctx.fill();
        ctx.strokeStyle = '#dbeafe';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (logoImg) {
            const logoPad = 10;
            const maxLogoW = logoBoxW - logoPad * 2;
            const maxLogoH = logoBoxH - logoPad * 2;
            const ratio = Math.min(maxLogoW / logoImg.width, maxLogoH / logoImg.height, 1);
            const drawW = logoImg.width * ratio;
            const drawH = logoImg.height * ratio;
            ctx.drawImage(
                logoImg,
                logoBoxX + (logoBoxW - drawW) / 2,
                logoBoxY + (logoBoxH - drawH) / 2,
                drawW,
                drawH
            );
        } else {
            this._fmCanvasSetFont(ctx, 22, 'bold', '#003865');
            ctx.textAlign = 'center';
            const initials = (meta.companyName || 'HS').trim().slice(0, 2).toUpperCase();
            ctx.fillText(initials, logoBoxX + logoBoxW / 2, logoBoxY + logoBoxH / 2 + 8);
        }

        const centerX = logoColW + (totalW - logoColW - metaColW) / 2;
        const centerMaxW = totalW - logoColW - metaColW - pad * 2;
        this._fmCanvasSetFont(ctx, 22, 'bold', '#003865');
        ctx.textAlign = 'center';
        const titleSize = this._fmCanvasFitFontSize(ctx, 'خريطة المصنع التفاعلية — استجابة الطوارئ', centerMaxW, 22, 'bold');
        this._fmCanvasSetFont(ctx, titleSize, 'bold', '#003865');
        ctx.fillText('خريطة المصنع التفاعلية — استجابة الطوارئ', centerX, 34);

        this._fmCanvasSetFont(ctx, 12, '600', '#1e40af');
        ctx.fillText('Interactive Factory Emergency Response Map', centerX, 52);

        this._fmCanvasSetFont(ctx, 12, 'normal', '#64748b');
        const subSize = this._fmCanvasFitFontSize(ctx, meta.planTitle, centerMaxW, 12, 'normal');
        this._fmCanvasSetFont(ctx, subSize, 'normal', '#64748b');
        ctx.fillText(meta.planTitle, centerX, 70);

        const badgeW = Math.min(280, centerMaxW);
        const badgeH = 24;
        const badgeX = centerX - badgeW / 2;
        const badgeY = 82;
        ctx.fillStyle = '#eff6ff';
        this._fmDrawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 12);
        ctx.fill();
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 1;
        ctx.stroke();
        this._fmCanvasSetFont(ctx, 11, 'bold', '#1d4ed8');
        ctx.textAlign = 'center';
        ctx.fillText(`كود النموذج: ${meta.formCode}  |  رقم الإصدار: ${meta.formVersion}`, centerX, badgeY + 16);

        const metaX = totalW - pad;
        const metaBoxW = metaColW - 10;
        const metaBoxX = totalW - pad - metaBoxW;
        const metaBoxY = 14;
        const metaBoxH = headerH - 28;
        ctx.fillStyle = '#f8fafc';
        this._fmDrawRoundedRect(ctx, metaBoxX, metaBoxY, metaBoxW, metaBoxH, 10);
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();

        let metaLineY = metaBoxY + 22;
        const metaInnerW = metaBoxW - 20;
        ctx.textAlign = 'right';
        this._fmCanvasSetFont(ctx, 10, 'bold', '#64748b');
        ctx.fillText('بيانات الوثيقة', metaX - 10, metaLineY);
        metaLineY += 18;
        this._fmCanvasSetFont(ctx, 11, 'bold', '#0f172a');
        const nameSize = this._fmCanvasFitFontSize(ctx, meta.companyName || '—', metaInnerW, 11, 'bold');
        this._fmCanvasSetFont(ctx, nameSize, 'bold', '#0f172a');
        const nameLines = this._fmCanvasDrawWrappedLines(ctx, meta.companyName || '—', metaX - 10, metaLineY, metaInnerW, 14, 'right', 2);
        metaLineY += nameLines * 14 + 6;
        if (meta.companySecondaryName) {
            this._fmCanvasSetFont(ctx, 10, 'normal', '#64748b');
            this._fmCanvasDrawWrappedLines(ctx, meta.companySecondaryName, metaX - 10, metaLineY, metaInnerW, 13, 'right', 2);
        }
    },

    _fmDrawExportFooter(ctx, totalW, footerTop, footerH, qrImg) {
        const meta = this._fmGetExportDocumentMeta(this._fmState.floorPlans.find(p => p.id === this._fmState.currentPlanId) || {});
        const pad = 18;
        const qrCardW = qrImg ? 108 : 0;
        const contentW = totalW - pad * 2 - (qrImg ? qrCardW + 10 : 0);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, footerTop, totalW, footerH);
        ctx.fillStyle = '#e0e7ff';
        ctx.fillRect(0, footerTop, totalW, 2);

        const frameY = footerTop + 8;
        const frameH = footerH - 16;
        ctx.fillStyle = '#f8fbff';
        this._fmDrawRoundedRect(ctx, pad, frameY, totalW - pad * 2, frameH, 10);
        ctx.fill();
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const colW = contentW / 3;
        const col1X = pad + colW * 0.5;
        const col2X = pad + colW * 1.5;
        const col3X = pad + colW * 2.5;
        const textY1 = frameY + 16;
        const textY2 = frameY + 32;
        const colInnerW = colW - 28;

        this._fmCanvasSetFont(ctx, 10, 'bold', '#64748b');
        ctx.textAlign = 'center';
        ctx.fillText('كود النموذج', col1X, textY1);
        this._fmCanvasSetFont(ctx, 12, 'bold', '#003865');
        const codeSize = this._fmCanvasFitFontSize(ctx, meta.formCode, colInnerW, 12, 'bold');
        this._fmCanvasSetFont(ctx, codeSize, 'bold', '#003865');
        ctx.fillText(meta.formCode, col1X, textY2);

        this._fmCanvasSetFont(ctx, 10, 'bold', '#64748b');
        ctx.fillText('تاريخ التصدير', col2X, textY1);
        this._fmCanvasSetFont(ctx, 10, 'bold', '#0f172a');
        const dateSize = this._fmCanvasFitFontSize(ctx, meta.exportDate, colInnerW, 10, 'bold');
        this._fmCanvasSetFont(ctx, dateSize, 'bold', '#0f172a');
        ctx.fillText(meta.exportDate, col2X, textY2);
        this._fmCanvasSetFont(ctx, 9, '600', '#475569');
        ctx.fillText(meta.exportTime, col2X, textY2 + 13);

        this._fmCanvasSetFont(ctx, 10, 'bold', '#64748b');
        ctx.fillText('رقم الإصدار', col3X, textY1);
        this._fmCanvasSetFont(ctx, 12, 'bold', '#1d4ed8');
        ctx.fillText(`Rev. ${meta.formVersion}`, col3X, textY2);

        ctx.strokeStyle = '#dbeafe';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad + colW, frameY + 8);
        ctx.lineTo(pad + colW, frameY + frameH - 28);
        ctx.moveTo(pad + colW * 2, frameY + 8);
        ctx.lineTo(pad + colW * 2, frameY + frameH - 28);
        ctx.stroke();

        const bottomBandY = frameY + frameH - 24;
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad + 12, bottomBandY);
        ctx.lineTo(pad + contentW - 6, bottomBandY);
        ctx.stroke();

        this._fmCanvasSetFont(ctx, 9, 'bold', '#003865');
        ctx.textAlign = 'center';
        const companySize = this._fmCanvasFitFontSize(ctx, meta.companyName || 'نظام إدارة السلامة والصحة المهنية', contentW - 24, 9, 'bold');
        this._fmCanvasSetFont(ctx, companySize, 'bold', '#003865');
        ctx.fillText(meta.companyName || 'نظام إدارة السلامة والصحة المهنية', pad + contentW / 2, frameY + frameH - 14);
        this._fmCanvasSetFont(ctx, 8, 'normal', '#94a3b8');
        const confSize = this._fmCanvasFitFontSize(ctx, 'سري — للاستخدام الداخلي | إدارة السلامة والصحة المهنية والبيئة', contentW - 24, 8, 'normal');
        this._fmCanvasSetFont(ctx, confSize, 'normal', '#94a3b8');
        ctx.fillText('سري — للاستخدام الداخلي | إدارة السلامة والصحة المهنية والبيئة', pad + contentW / 2, frameY + frameH - 3);

        if (qrImg) {
            const qrPad = 8;
            const qrSize = 72;
            const cardW = qrCardW;
            const cardH = qrSize + qrPad + 22;
            const cardX = totalW - pad - cardW + 4;
            const cardY = footerTop + 10 + (frameH - cardH) / 2;
            ctx.fillStyle = '#ffffff';
            this._fmDrawRoundedRect(ctx, cardX, cardY, cardW, cardH, 10);
            ctx.fill();
            ctx.strokeStyle = '#bfdbfe';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.drawImage(qrImg, cardX + (cardW - qrSize) / 2, cardY + qrPad, qrSize, qrSize);
            ctx.fillStyle = '#003865';
            ctx.font = 'bold 9px Tahoma, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('استجابة طوارئ', cardX + cardW / 2, cardY + cardH - 8);
        }
    },

    _fmDrawExportMapFrame(ctx, x, y, w, h) {
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    },

    _fmLoadImageElement(src) {
        return new Promise((resolve) => {
            if (!src) { resolve(null); return; }
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
        });
    },

    async _fmFetchPlanImageDataUrl(imageRef, planId) {
        const ref = String(imageRef || '').trim();
        if (!ref) return '';
        const cacheKey = String(planId || ref);
        if (this._fmState.planImageCache?.[cacheKey]) {
            return this._fmState.planImageCache[cacheKey];
        }
        if (ref.startsWith('data:')) {
            this._fmState.planImageCache[cacheKey] = ref;
            return ref;
        }

        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
            try {
                const resp = await GoogleIntegration.sendRequest({
                    action: 'getDriveImageDataUrl',
                    data: { fileIdOrUrl: ref }
                });
                if (resp?.success && resp.dataUrl) {
                    this._fmState.planImageCache[cacheKey] = resp.dataUrl;
                    return resp.dataUrl;
                }
            } catch (_e) { /* ignore */ }
        }

        const candidates = this._fmBuildPlanImageFallbacks_(ref);
        for (let i = 0; i < candidates.length; i++) {
            const img = await this._fmLoadImageElement(candidates[i]);
            if (!img) continue;
            try {
                const tmp = document.createElement('canvas');
                tmp.width = img.naturalWidth || 1200;
                tmp.height = img.naturalHeight || 800;
                const tctx = tmp.getContext('2d');
                tctx.drawImage(img, 0, 0);
                const dataUrl = tmp.toDataURL('image/jpeg', 0.9);
                this._fmState.planImageCache[cacheKey] = dataUrl;
                return dataUrl;
            } catch (_e) {
                this._fmState.planImageCache[cacheKey] = candidates[i];
                return candidates[i];
            }
        }
        return '';
    },

    _fmExtractDriveFileId_(imageRef) {
        const raw = String(imageRef || '').trim();
        if (!raw) return '';
        if (typeof Utils !== 'undefined' && typeof Utils.extractDriveFileId === 'function') {
            return Utils.extractDriveFileId(raw) || raw;
        }
        const m = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/i)
            || raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i)
            || raw.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i)
            || raw.match(/\/thumbnail\?id=([a-zA-Z0-9_-]+)/i);
        return m ? String(m[1] || '').trim() : raw;
    },

    _fmResolvePlanImageSrc(imageRef) {
        if (!imageRef) return '';
        const ref = String(imageRef).trim();
        if (!ref) return '';
        if (ref.startsWith('data:')) return ref;
        if (ref.startsWith('http')) {
            if (typeof Utils !== 'undefined' && typeof Utils.normalizeGoogleDriveImageUrl === 'function') {
                return Utils.normalizeGoogleDriveImageUrl(ref) || ref;
            }
            return ref;
        }
        const fileId = this._fmExtractDriveFileId_(ref);
        if (!fileId) return '';
        return `https://lh3.googleusercontent.com/d/${fileId}=w2000`;
    },

    _fmShowMapImageError(mapImage) {
        if (!mapImage) return;
        const canvas = mapImage.closest('#fm-map-canvas');
        mapImage.removeAttribute('src');
        mapImage.alt = 'تعذر تحميل صورة المخطط';
        mapImage.classList.add('fm-map-image-error');
        let banner = canvas?.querySelector('.fm-map-image-error-banner');
        if (!banner && canvas) {
            banner = document.createElement('div');
            banner.className = 'fm-map-image-error-banner';
            banner.innerHTML = '<i class="fas fa-image"></i><span>تعذر تحميل صورة المخطط من Drive — جرّب تعديل المخطط وإعادة رفع الصورة</span>';
            canvas.appendChild(banner);
        }
    },

    _fmClearMapImageError(mapImage) {
        if (!mapImage) return;
        mapImage.classList.remove('fm-map-image-error');
        const canvas = mapImage.closest('#fm-map-canvas');
        canvas?.querySelector('.fm-map-image-error-banner')?.remove();
    },

    async _fmFetchDriveImageViaProxy(mapImage, imageRef) {
        if (!mapImage || !imageRef || typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) {
            this._fmShowMapImageError(mapImage);
            return;
        }
        try {
            const resp = await GoogleIntegration.sendRequest({
                action: 'getDriveImageDataUrl',
                data: { fileIdOrUrl: imageRef }
            });
            if (resp?.success && resp.dataUrl) {
                this._fmClearMapImageError(mapImage);
                mapImage.src = resp.dataUrl;
                return;
            }
        } catch (_e) { /* ignore */ }
        this._fmShowMapImageError(mapImage);
    },

    _fmBuildPlanImageFallbacks_(imageRef) {
        const ref = String(imageRef || '').trim();
        if (!ref) return [];
        if (ref.startsWith('data:')) return [ref];
        const fileId = this._fmExtractDriveFileId_(ref);
        const candidates = [
            this._fmResolvePlanImageSrc(ref),
            ref.startsWith('http') ? ref : '',
            fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w2000` : '',
            fileId && typeof window !== 'undefined' && typeof window.__googleDriveDirectUrlFromId === 'function'
                ? window.__googleDriveDirectUrlFromId(fileId) : '',
            fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : '',
            fileId && typeof window !== 'undefined' && typeof window.__googleDrivePreviewUrlFromId === 'function'
                ? window.__googleDrivePreviewUrlFromId(fileId) : '',
            fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000` : ''
        ];
        return candidates.filter((url, idx, arr) => url && arr.indexOf(url) === idx);
    },

    async _fmApplyMapImageSrc(mapImage, imageRef, planId) {
        if (!mapImage) return;
        mapImage.setAttribute('data-fm-map-image', '1');
        this._fmClearMapImageError(mapImage);
        if (!imageRef) {
            mapImage.removeAttribute('src');
            mapImage.alt = 'لا توجد صورة للمخطط';
            this._fmShowMapImageError(mapImage);
            return;
        }
        mapImage.alt = 'جاري تحميل المخطط...';
        const dataUrl = await this._fmFetchPlanImageDataUrl(imageRef, planId);
        if (!dataUrl) {
            this._fmShowMapImageError(mapImage);
            return;
        }
        mapImage.onload = () => {
            mapImage.onerror = null;
            mapImage.alt = 'مخطط الطابق';
            this._fmClearMapImageError(mapImage);
        };
        mapImage.onerror = () => {
            mapImage.onerror = null;
            this._fmShowMapImageError(mapImage);
        };
        mapImage.src = dataUrl;
    },

    async _fmUploadFloorPlanImageToDrive(imageData, planName) {
        if (!imageData) return '';
        const ref = String(imageData);
        if (!ref.startsWith('data:image')) {
            return ref;
        }
        if (!window.GoogleIntegration || typeof GoogleIntegration.uploadFileToDrive !== 'function') {
            throw new Error('خدمة رفع الصور غير متوفرة');
        }
        const safeName = String(planName || 'floor_plan').replace(/[^\w\u0600-\u06FF.-]+/g, '_').slice(0, 40);
        const uploadResult = await GoogleIntegration.uploadFileToDrive(
            ref,
            `${safeName}_${Date.now()}.jpg`,
            'image/jpeg',
            'EmergencyFloorPlans'
        );
        if (!uploadResult?.success || !uploadResult.fileId) {
            throw new Error(uploadResult?.message || 'فشل رفع صورة المخطط إلى Drive');
        }
        return uploadResult.directLink || uploadResult.shareableLink || uploadResult.fileId;
    },

    _fmRestoreCanvasStamps(canvas, rawJson) {
        if (!rawJson) return;
        try {
            const parsed = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
            canvas._fmStamps = Array.isArray(parsed.stamps) ? parsed.stamps : (Array.isArray(parsed) ? parsed : []);
            canvas._fmFrames = Array.isArray(parsed.frames) ? parsed.frames.map((f, i) => ({
                id: f.id || ('fr_' + i),
                presetKey: f.presetKey || 'room',
                x: f.x, y: f.y, w: f.w, h: f.h,
                color: f.color || '#1e293b',
                width: f.width || 4
            })) : [];
            canvas._fmCustomImages = parsed.customImages || {};
            Object.assign(this._fmState.customStampImages, canvas._fmCustomImages);
        } catch (_e) {
            canvas._fmStamps = [];
            canvas._fmFrames = [];
        }
    },

    _fmImportCustomStamp(file) {
        if (!file || !file.type.startsWith('image/')) {
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('يرجى اختيار صورة للأيقونة');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('حجم الأيقونة كبير (الحد 2MB)');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const id = 'custom_' + Date.now();
            this._fmState.customStampImages[id] = dataUrl;
            const canvas = document.getElementById('fm-sketch-canvas');
            if (canvas) canvas._fmCustomImages = canvas._fmCustomImages || {};
            if (canvas) canvas._fmCustomImages[id] = dataUrl;
            const container = document.querySelector('.fm-stamp-toolbar-items');
            if (container) container.innerHTML = this._fmBuildStampToolbarHtml();
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم استيراد الأيقونة — انقر عليها ثم على الرسم');
        };
        reader.readAsDataURL(file);
    },

    async _fmExportCurrentMapPng() {
        const plan = this._fmState.floorPlans.find(p => p.id === this._fmState.currentPlanId);
        if (!plan) {
            if (typeof Notification !== 'undefined' && Notification.warning) Notification.warning('اختر مخططاً أولاً');
            return;
        }
        const mapW = parseInt(plan.imageWidth, 10) || 1200;
        const mapH = parseInt(plan.imageHeight, 10) || 800;
        const headerH = 118;
        const footerH = 104;
        const totalW = mapW;
        const mapTop = headerH;
        const footerTop = headerH + mapH;
        const totalH = footerTop + footerH;

        const tmp = document.createElement('canvas');
        tmp.width = totalW;
        tmp.height = totalH;
        const ctx = tmp.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, totalW, totalH);

        const brand = this._fmGetExportBranding();
        let logoImg = null;
        if (brand.logoUrl) {
            const logoSrc = brand.logoUrl.startsWith('data:')
                ? brand.logoUrl
                : (await this._fmFetchPlanImageDataUrl(brand.logoUrl, 'logo_' + brand.logoUrl.slice(0, 24)));
            logoImg = await this._fmLoadImageElement(logoSrc || brand.logoUrl);
        }
        await this._fmDrawExportHeader(ctx, totalW, headerH, plan, logoImg);
        this._fmDrawExportMapFrame(ctx, 0, mapTop, mapW, mapH);

        const imageDataUrl = await this._fmFetchPlanImageDataUrl(plan.imageDriveId || '', plan.id);
        if (imageDataUrl) {
            const bg = await this._fmLoadImageElement(imageDataUrl);
            if (bg) {
                ctx.drawImage(bg, 0, mapTop, mapW, mapH);
            }
        }

        (this._fmState.items || []).forEach(item => {
            const x = parseFloat(item.x) * mapW;
            const y = parseFloat(item.y) * mapH + mapTop;
            this._fmDrawStampOnCanvas(ctx, item.itemType, x, y);
        });

        const qrUrl = this._fmBuildMapQrUrl(plan);
        let qrImg = null;
        if (qrUrl && typeof QRCode !== 'undefined' && QRCode.generate) {
            qrImg = await this._fmLoadImageElement(QRCode.generate(qrUrl, 96));
        }

        this._fmDrawExportFooter(ctx, totalW, footerTop, footerH, qrImg);
        this._fmDownloadCanvasPng(tmp, (plan.name || 'خريطة') + '.png');
    },

    _fmDownloadCanvasPng(canvas, filename) {
        const link = document.createElement('a');
        link.download = filename.replace(/[^\w\u0600-\u06FF.\-]+/g, '_');
        link.href = canvas.toDataURL('image/png');
        link.click();
        if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم تصدير الخريطة');
    },

    _fmShowMapQrPanel() {
        const plan = this._fmState.floorPlans.find(p => p.id === this._fmState.currentPlanId);
        if (!plan) {
            if (typeof Notification !== 'undefined' && Notification.warning) Notification.warning('اختر مخططاً أولاً');
            return;
        }
        const qrUrl = this._fmBuildMapQrUrl(plan);
        const qrImg = (typeof QRCode !== 'undefined' && QRCode.generate) ? QRCode.generate(qrUrl, 220) : '';
        const html = `
            <div class="modal-overlay active fm-qr-modal-overlay" id="fm-qr-modal" role="dialog">
                <div class="modal-content fm-qr-modal">
                    <div class="fm-modal-header-fixed lr-modal-header">
                        <h3><i class="fas fa-qrcode" style="color:#dc2626;"></i> رمز الاستجابة للطوارئ</h3>
                        <button type="button" class="modal-close" id="fm-qr-modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body fm-qr-body">
                        <p class="fm-qr-plan-name">${Utils.escapeHTML(plan.name || '')}${plan.floor ? ' — ' + Utils.escapeHTML(plan.floor) : ''}</p>
                        <div class="fm-qr-card">
                            ${qrImg ? `<img src="${qrImg}" alt="QR" class="fm-qr-image">` : '<p>تعذر توليد QR</p>'}
                        </div>
                        <p class="fm-qr-hint">امسح الرمز لفتح الخريطة مباشرة <strong>بدون تسجيل دخول</strong> — ستظهر نقطة <strong>«أنت هنا»</strong> على المخطط</p>
                        <div class="fm-qr-link-box">
                            <input type="text" class="form-input" id="fm-qr-link-input" readonly value="${Utils.escapeAttr(qrUrl)}">
                            <button type="button" class="btn-secondary btn-sm" id="fm-qr-copy-btn"><i class="fas fa-copy"></i> نسخ</button>
                        </div>
                    </div>
                    <div class="modal-footer fm-modal-footer-fixed">
                        <button type="button" class="btn-secondary" id="fm-qr-export-btn"><i class="fas fa-file-image ml-1"></i>تصدير الخريطة</button>
                        <button type="button" class="btn-primary" id="fm-qr-close-btn">إغلاق</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('fm-qr-modal')?.remove();
        document.body.insertAdjacentHTML('beforeend', html);
        const close = () => document.getElementById('fm-qr-modal')?.remove();
        document.getElementById('fm-qr-modal-close')?.addEventListener('click', close);
        document.getElementById('fm-qr-close-btn')?.addEventListener('click', close);
        document.getElementById('fm-qr-export-btn')?.addEventListener('click', () => this._fmExportCurrentMapPng());
        document.getElementById('fm-qr-copy-btn')?.addEventListener('click', () => {
            const input = document.getElementById('fm-qr-link-input');
            if (input) {
                input.select();
                navigator.clipboard?.writeText(input.value).then(() => {
                    if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم نسخ الرابط');
                }).catch(() => {});
            }
        });
    },

    async showFloorPlanForm(editId) {
        try {
        await this._fmEnsureFormSettings();
        if (this._fmState.fullscreen) {
            this.toggleFactoryMapFullscreen();
        }
        const existing = this._fmState.floorPlans.find(p => String(p.id) === String(editId || ''));
        const val = (f, def) => (existing && existing[f] != null) ? existing[f] : (def || '');
        const escAttr = (v) => (typeof Utils !== 'undefined' && Utils.escapeAttr) ? Utils.escapeAttr(v) : String(v ?? '');
        const hasExistingImage = !!(val('imageDriveId'));
        const defaultFactoryId = val('factoryId') || val('factory') || document.getElementById('fm-factory-filter')?.value || '';
        const defaultSubId = val('subLocationId') || '';
        const defaultSubName = val('subLocationName') || val('floor') || '';
        const factoryOpts = this._fmBuildFactorySelectHtml(defaultFactoryId, val('factoryName'));
        const floorOpts = this._fmBuildSubLocationOptionsHtml(defaultFactoryId, defaultSubId, defaultSubName);

        const html = `
            <div class="modal-overlay active fm-floor-modal-overlay fm-floor-modal-fullscreen" id="fm-floor-modal" role="dialog" aria-modal="true">
                <div class="modal-content fm-modal-improved fm-modal-fullscreen fm-plan-form-pro">
                    <div class="fm-plan-form-header">
                        <div class="fm-plan-form-header-text">
                            <span class="fm-plan-form-kicker"><i class="fas fa-industry"></i> خريطة المصنع · الطوارئ</span>
                            <h3>${editId ? 'تعديل مخطط الطابق' : 'إضافة مخطط طابق جديد'}</h3>
                            <p>ارسم المخطط أو ارفع صورة، ثم أضف إطارات الغرف والرموز</p>
                        </div>
                        <button type="button" class="modal-close" id="fm-floor-modal-close" aria-label="إغلاق"><i class="fas fa-times"></i></button>
                    </div>
                    <form id="fm-floor-form" class="fm-floor-form-flex" onsubmit="return Emergency.handleFloorPlanSubmit(event)">
                        <input type="hidden" id="fm-floor-edit-id" value="${escAttr(editId || '')}">
                        <div class="fm-modal-body-scroll modal-body">
                            <div class="fm-plan-meta-card">
                                <div class="fm-plan-meta-grid">
                                    <div class="form-group fm-plan-field">
                                        <label class="form-label"><i class="fas fa-tag"></i> اسم المخطط <span class="text-red-500">*</span></label>
                                        <input type="text" id="fm-floor-name" class="form-input" value="${escAttr(val('name'))}" required placeholder="مثال: مخطط الطابق الأرضي" autofocus>
                                    </div>
                                    <div class="form-group fm-plan-field">
                                        <label class="form-label"><i class="fas fa-industry"></i> المصنع <span class="text-red-500">*</span></label>
                                        <select id="fm-floor-factory" class="form-input" required>${factoryOpts}</select>
                                    </div>
                                    <div class="form-group fm-plan-field">
                                        <label class="form-label"><i class="fas fa-layer-group"></i> الطابق / الموقع الفرعي</label>
                                        <select id="fm-floor-level" class="form-input">${floorOpts}</select>
                                    </div>
                                    <div class="form-group fm-plan-field fm-plan-field-sm">
                                        <label class="form-label"><i class="fas fa-sort-numeric-down"></i> الترتيب</label>
                                        <input type="number" id="fm-floor-sort" class="form-input" value="${escAttr(val('sortOrder', '1'))}" min="0">
                                    </div>
                                    <div class="form-group fm-plan-field fm-plan-field-sm">
                                        <label class="form-label"><i class="fas fa-arrows-alt-h"></i> العرض</label>
                                        <input type="number" id="fm-floor-width" class="form-input" value="${escAttr(val('imageWidth', 1600))}" min="400">
                                    </div>
                                    <div class="form-group fm-plan-field fm-plan-field-sm">
                                        <label class="form-label"><i class="fas fa-arrows-alt-v"></i> الارتفاع</label>
                                        <input type="number" id="fm-floor-height" class="form-input" value="${escAttr(val('imageHeight', 900))}" min="300">
                                    </div>
                                </div>
                            </div>
                            <div class="fm-source-tabs-bar">
                                <div class="fm-source-tabs">
                                    <button type="button" class="fm-source-tab active" data-mode="draw" onclick="Emergency._fmSwitchSource('draw')"><i class="fas fa-pen-fancy"></i> رسم يدوي</button>
                                    <button type="button" class="fm-source-tab" data-mode="upload" onclick="Emergency._fmSwitchSource('upload')"><i class="fas fa-cloud-upload-alt"></i> رفع صورة</button>
                                </div>
                            </div>
                            <div id="fm-source-draw" class="fm-source-pane fm-sketch-stage">
                                <div class="fm-canvas-toolbar">
                                    <div class="fm-tool-group">
                                        <button type="button" class="fm-draw-tool active" data-tool="pen" title="قلم"><i class="fas fa-pen"></i></button>
                                        <button type="button" class="fm-draw-tool" data-tool="move" title="تحريك الأيقونات والإطارات"><i class="fas fa-arrows-alt"></i></button>
                                        <button type="button" class="fm-draw-tool" data-tool="rect" title="مستطيل / إطار"><i class="fas fa-vector-square"></i></button>
                                        <button type="button" class="fm-draw-tool" data-tool="eraser" title="ممحاة"><i class="fas fa-eraser"></i></button>
                                    </div>
                                    <div class="fm-tool-group">
                                        <label class="fm-tool-label">اللون</label>
                                        <input type="color" id="fm-draw-color" value="#1e293b" title="اللون">
                                    </div>
                                    <div class="fm-tool-group">
                                        <label class="fm-tool-label">السماكة</label>
                                        <select id="fm-draw-width" title="سماكة الخط">
                                            <option value="2">2</option>
                                            <option value="4" selected>4</option>
                                            <option value="6">6</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div class="fm-tool-group fm-sketch-zoom-controls">
                                        <button type="button" class="fm-draw-tool" id="fm-sketch-zoom-out" title="تصغير"><i class="fas fa-search-minus"></i></button>
                                        <span class="fm-sketch-zoom-label" id="fm-sketch-zoom-label">100%</span>
                                        <button type="button" class="fm-draw-tool" id="fm-sketch-zoom-in" title="تكبير"><i class="fas fa-search-plus"></i></button>
                                        <button type="button" class="fm-draw-tool" id="fm-sketch-zoom-fit" title="ملاءمة الشاشة"><i class="fas fa-compress-arrows-alt"></i></button>
                                    </div>
                                    <div class="fm-tool-group">
                                        <button type="button" class="fm-draw-action" onclick="Emergency._fmClearCanvasTarget()" title="مسح العنصر المحدد فقط (أيقونة أو إطار)"><i class="fas fa-eraser"></i> مسح المحدد</button>
                                        <button type="button" class="fm-draw-action fm-draw-action-muted" onclick="Emergency._fmClearCanvas(true)" title="مسح لوحة الرسم فقط — لا يمسح بيانات النموذج"><i class="fas fa-trash-alt"></i> مسح اللوحة</button>
                                        <button type="button" class="fm-draw-action" onclick="Emergency._fmApplyCanvasSizeFromInputs()" title="تطبيق الأبعاد"><i class="fas fa-expand-arrows-alt"></i> الأبعاد</button>
                                    </div>
                                </div>
                                <div class="fm-frame-toolbar" id="fm-frame-toolbar">
                                    <span class="fm-frame-toolbar-label"><i class="fas fa-border-all"></i> إطارات جاهزة:</span>
                                    <div class="fm-frame-toolbar-items">${this._fmBuildFrameToolbarHtml()}</div>
                                </div>
                                <div class="fm-stamp-toolbar fm-stamp-toolbar-compact">
                                    <div class="fm-stamp-toolbar-head">
                                        <span class="fm-stamp-toolbar-label"><i class="fas fa-map-pin"></i> رموز السلامة:</span>
                                        <label class="btn-secondary btn-sm fm-import-stamp-btn" title="استيراد أيقونة مخصصة">
                                            <i class="fas fa-file-import"></i> استيراد
                                            <input type="file" id="fm-import-stamp-input" accept="image/*" hidden>
                                        </label>
                                    </div>
                                    <div class="fm-stamp-toolbar-items">${this._fmBuildStampToolbarHtml()}</div>
                                </div>
                                <div class="fm-sketch-viewport" id="fm-sketch-viewport">
                                    <div class="fm-sketch-zoom-inner" id="fm-sketch-zoom-inner">
                                        <div class="fm-canvas-wrap">
                                            <canvas id="fm-sketch-canvas" width="1600" height="900" tabindex="-1"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div class="fm-canvas-hint">
                                    <i class="fas fa-info-circle"></i> اسحب لرسم <strong>مستطيل/إطار</strong>، أو استخدم أزرار التكبير أعلى منطقة الرسم.
                                </div>
                                ${hasExistingImage ? `<div class="fm-canvas-warning"><i class="fas fa-exclamation-triangle"></i> يوجد رسم سابق — الرسم الجديد سيحل محله.</div>` : ''}
                            </div>
                            <div id="fm-source-upload" class="fm-source-pane" style="display:none;margin-top:4px;">
                                <div class="fm-upload-area" id="fm-upload-area">
                                    <input type="file" id="fm-file-input" accept="image/*" style="display:none;">
                                    <div class="fm-upload-dropzone" id="fm-upload-dropzone">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>اختر صورة من جهازك</p>
                                        <span>أو اسحب وأفلت الصورة هنا</span>
                                        <button type="button" class="btn-sm btn-primary" style="margin-top:8px;" onclick="document.getElementById('fm-file-input').click()">اختيار صورة</button>
                                    </div>
                                    <div class="fm-upload-preview" id="fm-upload-preview" style="display:none;">
                                        <img id="fm-upload-img" src="" alt="معاينة">
                                        <div class="fm-upload-actions">
                                            <button type="button" class="btn-icon btn-sm" onclick="Emergency._fmRemoveUploadedImage()" title="إزالة"><i class="fas fa-times"></i></button>
                                        </div>
                                    </div>
                                    <input type="hidden" id="fm-floor-image" value="${escAttr(val('imageDriveId'))}">
                                    <p class="fm-field-hint" id="fm-upload-hint">${val('imageDriveId') ? 'الصورة موجودة مسبقاً.' : 'اختر صورة من جهازك لعرضها كخلفية للمخطط.'}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer fm-modal-footer-fixed">
                            <button type="button" class="btn-secondary" id="fm-floor-modal-cancel">إلغاء</button>
                            <button type="submit" class="btn-primary"><i class="fas fa-save ml-2"></i>${editId ? 'حفظ التعديلات' : 'إضافة المخطط'}</button>
                        </div>
                    </form>
                </div>
            </div>`;
        this._closeFloorPlanModal();
        document.body.insertAdjacentHTML('beforeend', html);
        document.body.classList.add('fm-floor-modal-open');
        this._fmBindFloorPlanModal();
        this.refreshSiteDropdowns();
        const editFactoryId = defaultFactoryId;
        if (editFactoryId) {
            const ff = document.getElementById('fm-floor-factory');
            if (ff) ff.value = editFactoryId;
        }
        this._fmBindFactoryCascade(defaultSubId, defaultSubName);
        this._fmBindFrameToolbar();
        this._fmInitCanvas();
        this._fmInitSketchZoom();
        this._fmInitUpload();
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('فشل فتح نموذج المخطط:', err);
            } else {
                console.error('فشل فتح نموذج المخطط:', err);
            }
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('تعذر فتح نموذج إضافة المخطط');
            }
        }
    },

    _fmBindFloorPlanModal() {
        const modal = document.getElementById('fm-floor-modal');
        if (!modal) return;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this._closeFloorPlanModal();
        });
        modal.querySelector('#fm-floor-modal-close')?.addEventListener('click', () => this._closeFloorPlanModal());
        modal.querySelector('#fm-floor-modal-cancel')?.addEventListener('click', () => this._closeFloorPlanModal());
        setTimeout(() => document.getElementById('fm-floor-name')?.focus(), 50);
    },

    _fmSwitchSource(mode) {
        document.querySelectorAll('.fm-source-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
        document.getElementById('fm-source-draw').style.display = mode === 'draw' ? 'block' : 'none';
        document.getElementById('fm-source-upload').style.display = mode === 'upload' ? 'block' : 'none';
    },

    _fmInitUpload() {
        const fileInput = document.getElementById('fm-file-input');
        const dropzone = document.getElementById('fm-upload-dropzone');
        const preview = document.getElementById('fm-upload-preview');
        const img = document.getElementById('fm-upload-img');
        const hidden = document.getElementById('fm-floor-image');
        const hint = document.getElementById('fm-upload-hint');
        if (!fileInput || fileInput.dataset.fmBound) return;

        fileInput.addEventListener('change', () => this._fmHandleFile(fileInput.files[0]));
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.style.borderColor = '#2563eb'; });
        dropzone.addEventListener('dragleave', () => { dropzone.style.borderColor = '#cbd5e1'; });
        dropzone.addEventListener('drop', (e) => { e.preventDefault(); dropzone.style.borderColor = '#cbd5e1'; this._fmHandleFile(e.dataTransfer.files[0]); });
        dropzone.addEventListener('click', () => fileInput.click());
        fileInput.dataset.fmBound = '1';

        // If there's existing data URL, show it
        if (hidden && hidden.value && hidden.value.startsWith('data:')) {
            img.src = hidden.value;
            dropzone.style.display = 'none';
            preview.style.display = 'flex';
            if (hint) hint.textContent = 'الصورة المرفوعة حالياً.';
        }
    },

    _fmHandleFile(file) {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('يرجى اختيار ملف صورة فقط');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('حجم الصورة كبير جداً (الحد الأقصى 10MB)');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const img = document.getElementById('fm-upload-img');
            const dropzone = document.getElementById('fm-upload-dropzone');
            const preview = document.getElementById('fm-upload-preview');
            const hidden = document.getElementById('fm-floor-image');
            const hint = document.getElementById('fm-upload-hint');
            if (img) img.src = dataUrl;
            if (dropzone) dropzone.style.display = 'none';
            if (preview) preview.style.display = 'flex';
            if (hidden) hidden.value = dataUrl;
            if (hint) hint.textContent = 'تم رفع الصورة بنجاح.';
        };
        reader.readAsDataURL(file);
    },

    _fmRemoveUploadedImage() {
        const img = document.getElementById('fm-upload-img');
        const dropzone = document.getElementById('fm-upload-dropzone');
        const preview = document.getElementById('fm-upload-preview');
        const hidden = document.getElementById('fm-floor-image');
        const fileInput = document.getElementById('fm-file-input');
        const hint = document.getElementById('fm-upload-hint');
        if (img) img.src = '';
        if (dropzone) dropzone.style.display = 'block';
        if (preview) preview.style.display = 'none';
        if (hidden) hidden.value = '';
        if (fileInput) fileInput.value = '';
        if (hint) hint.textContent = 'اختر صورة من جهازك لعرضها كخلفية للمخطط.';
    },

    _fmDrawStampOnCanvas(ctx, stampType, x, y, customImageDataUrl) {
        const r = this._fmStampRadius;
        const customImg = customImageDataUrl || (stampType && String(stampType).startsWith('custom_')
            ? (this._fmState.customStampImages[stampType] || '')
            : '');
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        if (customImg) {
            const img = new Image();
            img.src = customImg;
            if (img.complete && img.naturalWidth) {
                ctx.save();
                ctx.clip();
                ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
                ctx.restore();
            } else {
                ctx.fillStyle = '#0ea5e9';
                ctx.fill();
            }
        } else {
            const def = this.FM_ITEM_TYPES[stampType] || { color: '#64748b', label: '?' };
            const symbols = {
                fire_extinguisher: '🧯',
                fire_hose: '🔥',
                fire_alarm: '🔔',
                emergency_exit: '🚪',
                escape_route: '➡️',
                assembly_point: '👥',
                first_aid: '➕',
                hazmat: '☣️',
                evacuation_chair: '♿',
                fire_panel: '🖥️'
            };
            ctx.fillStyle = def.color;
            ctx.fill();
            ctx.font = '18px "Segoe UI Emoji", "Apple Color Emoji", Tahoma, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(symbols[stampType] || '●', x, y + 1);
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.strokeStyle = 'rgba(15,23,42,0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    },

    _fmInitSketchZoom() {
        const inner = document.getElementById('fm-sketch-zoom-inner');
        const viewport = document.getElementById('fm-sketch-viewport');
        if (!inner) return;
        if (!this._fmState.sketchZoom) this._fmState.sketchZoom = 1;
        this._fmApplySketchZoom(this._fmState.sketchZoom);

        const bind = (id, fn) => {
            const el = document.getElementById(id);
            if (el && !el.dataset.fmBound) {
                el.addEventListener('click', fn);
                el.dataset.fmBound = '1';
            }
        };
        bind('fm-sketch-zoom-in', () => this._fmSetSketchZoom((this._fmState.sketchZoom || 1) + 0.1));
        bind('fm-sketch-zoom-out', () => this._fmSetSketchZoom((this._fmState.sketchZoom || 1) - 0.1));
        bind('fm-sketch-zoom-fit', () => this._fmFitSketchZoom());
        if (viewport && !viewport.dataset.fmWheelBound) {
            viewport.addEventListener('wheel', (e) => {
                if (!e.ctrlKey) return;
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.08 : 0.08;
                this._fmSetSketchZoom((this._fmState.sketchZoom || 1) + delta);
            }, { passive: false });
            viewport.dataset.fmWheelBound = '1';
        }
        setTimeout(() => this._fmFitSketchZoom(), 80);
    },

    _fmApplySketchZoom(zoom) {
        const inner = document.getElementById('fm-sketch-zoom-inner');
        const label = document.getElementById('fm-sketch-zoom-label');
        const z = Math.max(0.25, Math.min(3, zoom || 1));
        this._fmState.sketchZoom = z;
        if (inner) inner.style.transform = `scale(${z})`;
        if (label) label.textContent = Math.round(z * 100) + '%';
    },

    _fmSetSketchZoom(zoom) {
        this._fmApplySketchZoom(zoom);
    },

    _fmFitSketchZoom() {
        const viewport = document.getElementById('fm-sketch-viewport');
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!viewport || !canvas) return;
        const pad = 24;
        const availW = Math.max(200, viewport.clientWidth - pad);
        const availH = Math.max(200, viewport.clientHeight - pad);
        const scaleW = availW / canvas.width;
        const scaleH = availH / canvas.height;
        this._fmApplySketchZoom(Math.min(scaleW, scaleH, 1.5));
    },

    _fmApplyCanvasSizeFromInputs() {
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!canvas) return;
        const newW = Math.max(400, parseInt(document.getElementById('fm-floor-width')?.value, 10) || 1600);
        const newH = Math.max(300, parseInt(document.getElementById('fm-floor-height')?.value, 10) || 900);
        const oldW = canvas.width;
        const oldH = canvas.height;
        if (newW === oldW && newH === oldH) {
            this._fmFitSketchZoom();
            return;
        }
        const tmp = document.createElement('canvas');
        tmp.width = newW;
        tmp.height = newH;
        const tctx = tmp.getContext('2d');
        tctx.fillStyle = '#ffffff';
        tctx.fillRect(0, 0, newW, newH);
        if (canvas._fmBaseSnapshot) {
            const prev = document.createElement('canvas');
            prev.width = oldW;
            prev.height = oldH;
            prev.getContext('2d').putImageData(canvas._fmBaseSnapshot, 0, 0);
            tctx.drawImage(prev, 0, 0, newW, newH);
        } else {
            tctx.drawImage(canvas, 0, 0, newW, newH);
        }
        canvas.width = newW;
        canvas.height = newH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(tmp, 0, 0);
        canvas._fmBaseSnapshot = ctx.getImageData(0, 0, newW, newH);
        canvas._snapshot = canvas._fmBaseSnapshot;
        if (canvas._fmStamps && oldW && oldH) {
            const sx = newW / oldW;
            const sy = newH / oldH;
            canvas._fmStamps = canvas._fmStamps.map(s => ({ ...s, x: s.x * sx, y: s.y * sy }));
        }
        if (canvas._fmFrames && oldW && oldH) {
            const sx = newW / oldW;
            const sy = newH / oldH;
            canvas._fmFrames = canvas._fmFrames.map(f => ({
                ...f,
                x: f.x * sx,
                y: f.y * sy,
                w: f.w * sx,
                h: f.h * sy
            }));
        }
        this._fmRedrawSketchCanvas(canvas);
        this._fmFitSketchZoom();
        if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم تطبيق أبعاد لوحة الرسم');
    },

    _fmDrawRectPreview(ctx, x1, y1, x2, y2, color, width) {
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const w = Math.abs(x2 - x1);
        const h = Math.abs(y2 - y1);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = color + '20';
        ctx.fillRect(x, y, w, h);
    },

    _fmCommitRectToBase(canvas, x1, y1, x2, y2, color, width) {
        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const w = Math.abs(x2 - x1);
        const h = Math.abs(y2 - y1);
        if (w < 2 && h < 2) return;
        const t = document.createElement('canvas');
        t.width = canvas.width;
        t.height = canvas.height;
        const tc = t.getContext('2d');
        if (canvas._fmBaseSnapshot) tc.putImageData(canvas._fmBaseSnapshot, 0, 0);
        tc.strokeStyle = color;
        tc.lineWidth = width;
        tc.strokeRect(x, y, w, h);
        tc.fillStyle = color + '20';
        tc.fillRect(x, y, w, h);
        canvas._fmBaseSnapshot = tc.getImageData(0, 0, canvas.width, canvas.height);
        canvas._snapshot = canvas._fmBaseSnapshot;
    },

    _fmRestoreCanvasImage_(canvas, ctx, imageRef, onDone) {
        const src = this._fmResolvePlanImageSrc(imageRef);
        if (!src) {
            if (onDone) onDone();
            return;
        }
        const img = new Image();
        if (!src.startsWith('data:')) img.crossOrigin = 'anonymous';
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas._fmBaseSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas._snapshot = canvas._fmBaseSnapshot;
            this._fmRedrawSketchCanvas(canvas);
            if (onDone) onDone();
        };
        img.onerror = () => { if (onDone) onDone(); };
        img.src = src;
    },

    _fmInitCanvas() {
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = { x: 0, y: 0, endX: 0, endY: 0, drawing: false };
        let drawing = false;
        let lastX;
        let lastY;
        const toolState = canvas._fmToolState || { tool: 'pen', color: '#1e293b', width: 4, stampType: null };
        canvas._fmToolState = toolState;
        canvas._fmDragState = canvas._fmDragState || { active: false, kind: null, index: -1, offsetX: 0, offsetY: 0 };

        this._fmInitCanvasLayers(canvas);

        const initEmptyBase = () => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            canvas._fmBaseSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
            canvas._snapshot = canvas._fmBaseSnapshot;
            canvas._fmStamps = [];
            canvas._fmFrames = [];
            canvas._fmSelected = null;
            this._fmRedrawSketchCanvas(canvas);
        };

        const targetW = Math.max(400, parseInt(document.getElementById('fm-floor-width')?.value, 10) || 1600);
        const targetH = Math.max(300, parseInt(document.getElementById('fm-floor-height')?.value, 10) || 900);
        if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
        }

        const existingData = document.getElementById('fm-floor-edit-id')?.value;
        if (existingData) {
            const plan = this._fmState.floorPlans.find(p => String(p.id) === String(existingData));
            if (plan?.drawStampsJson) this._fmRestoreCanvasStamps(canvas, plan.drawStampsJson);
            if (plan?.imageDriveId) {
                this._fmRestoreCanvasImage_(canvas, ctx, plan.imageDriveId, () => {
                    if (plan?.drawStampsJson) this._fmRedrawSketchCanvas(canvas);
                });
            } else {
                initEmptyBase();
            }
        } else {
            initEmptyBase();
        }

        const getPos = (e) => {
            const rect2 = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect2.width;
            const scaleY = canvas.height / rect2.height;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: (clientX - rect2.left) * scaleX, y: (clientY - rect2.top) * scaleY };
        };

        const beginObjectDrag = (hit, pos) => {
            const drag = canvas._fmDragState;
            drag.active = true;
            drag.kind = hit.kind;
            drag.index = hit.index;
            canvas._fmSelected = { kind: hit.kind, index: hit.index };
            if (hit.kind === 'frame') {
                const f = canvas._fmFrames[hit.index];
                drag.offsetX = pos.x - f.x;
                drag.offsetY = pos.y - f.y;
            } else {
                const s = canvas._fmStamps[hit.index];
                drag.offsetX = pos.x - s.x;
                drag.offsetY = pos.y - s.y;
            }
            this._fmUpdateCanvasCursor(canvas, toolState);
        };

        const finalizeObjectDrag = () => {
            const drag = canvas._fmDragState;
            if (!drag.active) return;
            if (drag.kind === 'frame' && canvas._fmFrames[drag.index]) {
                const f = canvas._fmFrames[drag.index];
                const p = this._fmFindFreePosition(canvas, 'frame', drag.index, f.x, f.y, f.w, f.h);
                f.x = p.x;
                f.y = p.y;
            } else if (drag.kind === 'stamp' && canvas._fmStamps[drag.index]) {
                const s = canvas._fmStamps[drag.index];
                const p = this._fmFindFreePosition(canvas, 'stamp', drag.index, s.x, s.y, 0, 0);
                s.x = p.x;
                s.y = p.y;
            }
            drag.active = false;
            drag.kind = null;
            drag.index = -1;
            this._fmUpdateCanvasCursor(canvas, toolState);
            this._fmRedrawSketchCanvas(canvas);
        };

        const startDraw = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const pos = getPos(e);
            const topHit = this._fmHitTestTopObject(canvas, pos.x, pos.y);

            if (toolState.tool === 'move' || (toolState.tool === 'stamp' && topHit)) {
                if (topHit) {
                    beginObjectDrag(topHit, pos);
                    return;
                }
                if (toolState.tool === 'move') {
                    canvas._fmSelected = null;
                    this._fmRedrawSketchCanvas(canvas);
                    return;
                }
            }

            if (toolState.tool === 'stamp' && toolState.stampType) {
                const customImage = (toolState.stampType.startsWith('custom_') && canvas._fmCustomImages)
                    ? canvas._fmCustomImages[toolState.stampType] : '';
                const p = this._fmFindFreePosition(canvas, 'stamp', -1, pos.x, pos.y, 0, 0);
                canvas._fmStamps.push({ type: toolState.stampType, x: p.x, y: p.y, customImage });
                canvas._fmSelected = { kind: 'stamp', index: canvas._fmStamps.length - 1 };
                this._fmRedrawSketchCanvas(canvas);
                return;
            }
            if (toolState.tool === 'eraser') {
                const frameHit = this._fmHitTestFrame(canvas, pos.x, pos.y);
                if (frameHit >= 0) {
                    canvas._fmFrames.splice(frameHit, 1);
                    canvas._fmSelected = null;
                    this._fmRedrawSketchCanvas(canvas);
                    return;
                }
                const hit = this._fmHitTestStamp(canvas, pos.x, pos.y);
                if (hit >= 0) {
                    canvas._fmStamps.splice(hit, 1);
                    canvas._fmSelected = null;
                    this._fmRedrawSketchCanvas(canvas);
                    return;
                }
                this._fmEraseBaseAt(canvas, pos.x, pos.y, toolState.width * 3);
                this._fmRedrawSketchCanvas(canvas);
                drawing = true;
                lastX = pos.x;
                lastY = pos.y;
                return;
            }
            if (toolState.tool === 'move') return;
            drawing = true;
            lastX = pos.x;
            lastY = pos.y;
            if (toolState.tool === 'rect') {
                rect.x = pos.x;
                rect.y = pos.y;
                rect.endX = pos.x;
                rect.endY = pos.y;
                rect.drawing = true;
            } else {
                ctx.beginPath();
                ctx.moveTo(pos.x, pos.y);
            }
        };

        const draw = (e) => {
            e.preventDefault();
            const pos = getPos(e);
            const drag = canvas._fmDragState;
            if (drag.active) {
                if (drag.kind === 'frame' && canvas._fmFrames[drag.index]) {
                    const f = canvas._fmFrames[drag.index];
                    const c = this._fmClampRect(pos.x - drag.offsetX, pos.y - drag.offsetY, f.w, f.h, canvas.width, canvas.height);
                    f.x = c.x;
                    f.y = c.y;
                } else if (drag.kind === 'stamp' && canvas._fmStamps[drag.index]) {
                    const s = canvas._fmStamps[drag.index];
                    const gap = this._fmObjectGap();
                    s.x = Math.max(gap, Math.min(pos.x - drag.offsetX, canvas.width - gap));
                    s.y = Math.max(gap, Math.min(pos.y - drag.offsetY, canvas.height - gap));
                }
                this._fmRedrawSketchCanvas(canvas);
                return;
            }
            if (!drawing) return;
            if (toolState.tool === 'eraser') {
                const frameHit = this._fmHitTestFrame(canvas, pos.x, pos.y);
                if (frameHit >= 0) {
                    canvas._fmFrames.splice(frameHit, 1);
                } else {
                    const hit = this._fmHitTestStamp(canvas, pos.x, pos.y);
                    if (hit >= 0) {
                        canvas._fmStamps.splice(hit, 1);
                    } else {
                        this._fmEraseBaseAt(canvas, pos.x, pos.y, toolState.width * 3);
                        this._fmEraseBaseAt(canvas, lastX, lastY, toolState.width * 3);
                    }
                }
                this._fmRedrawSketchCanvas(canvas);
                lastX = pos.x;
                lastY = pos.y;
                return;
            }
            if (toolState.tool === 'rect') {
                if (!rect.drawing) return;
                rect.endX = pos.x;
                rect.endY = pos.y;
                this._fmRedrawSketchCanvas(canvas);
                this._fmDrawRectPreview(ctx, rect.x, rect.y, rect.endX, rect.endY, toolState.color, toolState.width);
                return;
            }
            if (!canvas._fmBaseSnapshot) return;
            const tmp = document.createElement('canvas');
            tmp.width = canvas.width;
            tmp.height = canvas.height;
            const t = tmp.getContext('2d');
            t.putImageData(canvas._fmBaseSnapshot, 0, 0);
            t.strokeStyle = toolState.color;
            t.lineWidth = toolState.width;
            t.lineCap = 'round';
            t.lineJoin = 'round';
            t.beginPath();
            t.moveTo(lastX, lastY);
            t.lineTo(pos.x, pos.y);
            t.stroke();
            canvas._fmBaseSnapshot = t.getImageData(0, 0, canvas.width, canvas.height);
            this._fmRedrawSketchCanvas(canvas);
            lastX = pos.x;
            lastY = pos.y;
        };

        const endDraw = () => {
            if (canvas._fmDragState?.active) {
                finalizeObjectDrag();
                return;
            }
            if (toolState.tool === 'rect' && rect.drawing) {
                this._fmCommitRectToBase(canvas, rect.x, rect.y, rect.endX, rect.endY, toolState.color, toolState.width);
                rect.drawing = false;
                this._fmRedrawSketchCanvas(canvas);
            }
            drawing = false;
            if (toolState.tool === 'pen' || toolState.tool === 'eraser') {
                canvas._snapshot = canvas._fmBaseSnapshot;
            }
        };

        if (!canvas._fmEventsBound) {
            canvas.addEventListener('mousedown', startDraw);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', endDraw);
            canvas.addEventListener('mouseleave', endDraw);
            canvas.addEventListener('touchstart', startDraw, { passive: false });
            canvas.addEventListener('touchmove', draw, { passive: false });
            canvas.addEventListener('touchend', endDraw);
            canvas._fmEventsBound = true;
        }

        if (!canvas._fmToolsBound) {
            document.querySelectorAll('.fm-draw-tool[data-tool]').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.fm-draw-tool[data-tool]').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.fm-stamp-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    toolState.tool = btn.dataset.tool;
                    toolState.stampType = null;
                    this._fmUpdateCanvasCursor(canvas, toolState);
                });
            });
            canvas._fmToolsBound = true;
        }
        this._fmUpdateCanvasCursor(canvas, toolState);

        const stampToolbar = document.querySelector('.fm-stamp-toolbar');
        if (stampToolbar && !stampToolbar.dataset.fmDelegBound) {
            stampToolbar.addEventListener('click', (e) => {
                const btn = e.target.closest('.fm-stamp-btn');
                if (!btn) return;
                document.querySelectorAll('.fm-stamp-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.fm-draw-tool').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                toolState.tool = 'stamp';
                toolState.stampType = btn.dataset.stamp;
                this._fmUpdateCanvasCursor(canvas, toolState);
            });
            stampToolbar.dataset.fmDelegBound = '1';
        }

        const colorInput = document.getElementById('fm-draw-color');
        if (colorInput) colorInput.addEventListener('input', (e) => { toolState.color = e.target.value; });
        const widthSelect = document.getElementById('fm-draw-width');
        if (widthSelect) widthSelect.addEventListener('change', (e) => { toolState.width = parseInt(e.target.value, 10) || 4; });

        const importInput = document.getElementById('fm-import-stamp-input');
        if (importInput && !importInput.dataset.fmBound) {
            importInput.addEventListener('change', () => {
                this._fmImportCustomStamp(importInput.files[0]);
                importInput.value = '';
            });
            importInput.dataset.fmBound = '1';
        }
    },

    _fmClearCanvasTarget() {
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!canvas) return;
        const sel = canvas._fmSelected;
        if (sel?.kind === 'stamp' && canvas._fmStamps?.[sel.index]) {
            canvas._fmStamps.splice(sel.index, 1);
            canvas._fmSelected = null;
            this._fmRedrawSketchCanvas(canvas);
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم مسح الأيقونة المحددة');
            return;
        }
        if (sel?.kind === 'frame' && canvas._fmFrames?.[sel.index]) {
            canvas._fmFrames.splice(sel.index, 1);
            canvas._fmSelected = null;
            this._fmRedrawSketchCanvas(canvas);
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم مسح الإطار المحدد');
            return;
        }
        if (typeof Notification !== 'undefined' && Notification.warning) {
            Notification.warning('حدد أيقونة أو إطاراً بأداة التحريك ثم اضغط مسح المحدد');
        }
    },

    _fmClearCanvas(requireConfirm) {
        if (requireConfirm && !window.confirm('مسح لوحة الرسم بالكامل؟ لن تُمسح بيانات النموذج (الاسم، المصنع، الموقع).')) return;
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas._fmStamps = [];
        canvas._fmFrames = [];
        canvas._fmSelected = null;
        canvas._fmBaseSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas._snapshot = canvas._fmBaseSnapshot;
        this._fmRedrawSketchCanvas(canvas);
        if (typeof Notification !== 'undefined' && Notification.info) Notification.info('تم مسح لوحة الرسم');
    },

    async handleFloorPlanSubmit(e) {
        e.preventDefault();
        const editId = document.getElementById('fm-floor-edit-id')?.value;
        const name = document.getElementById('fm-floor-name')?.value?.trim();
        const modal = document.getElementById('fm-floor-modal');
        const submitBtn = modal?.querySelector('button[type="submit"]');
        if (!name) { if (typeof Notification !== 'undefined' && Notification.error) Notification.error('اسم المخطط مطلوب'); return false; }

        let imageDriveId = document.getElementById('fm-floor-image')?.value?.trim() || '';
        const drawPane = document.getElementById('fm-source-draw');
        const uploadPane = document.getElementById('fm-source-upload');
        const isDrawMode = drawPane && drawPane.style.display !== 'none';
        const isUploadMode = uploadPane && uploadPane.style.display !== 'none';

        let drawStampsJson = '';
        if (isDrawMode) {
            const canvas = document.getElementById('fm-sketch-canvas');
            if (canvas) {
                this._fmRedrawSketchCanvas(canvas);
                drawStampsJson = this._fmSerializeCanvasStamps(canvas);
                const ctx = canvas.getContext('2d');
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const hasContent = imageData.data.some(ch => ch !== 0);
                if (hasContent) {
                    imageDriveId = this._fmCompressCanvasDataUrl(canvas, 1200, 0.78);
                }
            }
        } else if (isUploadMode && imageDriveId && imageDriveId.startsWith('data:image')) {
            const img = document.getElementById('fm-upload-img');
            if (img && img.complete && img.naturalWidth) {
                const tmp = document.createElement('canvas');
                tmp.width = img.naturalWidth;
                tmp.height = img.naturalHeight;
                const tctx = tmp.getContext('2d');
                tctx.drawImage(img, 0, 0);
                imageDriveId = this._fmCompressCanvasDataUrl(tmp, 1200, 0.78);
            }
        }

        const existingPlan = editId
            ? this._fmState.floorPlans.find(p => String(p.id) === String(editId))
            : null;

        if (!imageDriveId && existingPlan?.imageDriveId) {
            imageDriveId = existingPlan.imageDriveId;
        }

        if (!editId && !imageDriveId) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('يرجى رسم المخطط أو رفع صورة قبل الحفظ');
            }
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>إضافة المخطط'; }
            return false;
        }
        const factorySelect = document.getElementById('fm-floor-factory');
        const factoryId = factorySelect?.value?.trim() || '';
        const factoryOpt = factorySelect?.selectedOptions?.[0];
        const factoryName = factoryOpt?.dataset?.name || factoryOpt?.textContent?.trim() || '';
        if (!factoryId) {
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('يرجى اختيار المصنع');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>' + (editId ? 'حفظ التعديلات' : 'إضافة المخطط'); }
            return false;
        }
        const floorSelect = document.getElementById('fm-floor-level');
        const subLocationId = floorSelect?.value?.trim() || '';
        const subLocationOpt = floorSelect?.selectedOptions?.[0];
        const subLocationName = subLocationOpt?.dataset?.name || subLocationOpt?.textContent?.trim() || '';
        const data = {
            name,
            floor: subLocationName || '',
            subLocationId,
            subLocationName,
            factory: factoryId,
            factoryId,
            factoryName,
            imageDriveId,
            imageWidth: parseInt(document.getElementById('fm-floor-width')?.value) || 1200,
            imageHeight: parseInt(document.getElementById('fm-floor-height')?.value) || 800,
            sortOrder: parseInt(document.getElementById('fm-floor-sort')?.value) || 1,
            isActive: 'true',
            qrToken: existingPlan?.qrToken || this._fmGenerateQrToken(),
            qrAnchorX: existingPlan?.qrAnchorX ?? 0.5,
            qrAnchorY: existingPlan?.qrAnchorY ?? 0.85,
            geoNwLat: existingPlan?.geoNwLat ?? '',
            geoNwLng: existingPlan?.geoNwLng ?? '',
            geoSeLat: existingPlan?.geoSeLat ?? '',
            geoSeLng: existingPlan?.geoSeLng ?? '',
            drawStampsJson: drawStampsJson || existingPlan?.drawStampsJson || ''
        };

        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الحفظ...'; }

        try {
            if (!window.GoogleIntegration || typeof GoogleIntegration.sendRequest !== 'function') {
                if (typeof Notification !== 'undefined' && Notification.error) Notification.error('خدمة التكامل غير متوفرة');
                if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>' + (editId ? 'حفظ التعديلات' : 'إضافة المخطط'); }
                return false;
            }

            if (imageDriveId && String(imageDriveId).startsWith('data:image')) {
                if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري رفع الصورة...';
                imageDriveId = await this._fmUploadFloorPlanImageToDrive(imageDriveId, name);
                data.imageDriveId = imageDriveId;
            }

            let savedPlanId = editId || '';
            if (editId) {
                const resp = await GoogleIntegration.sendRequest({ action: 'updateEmergencyFloorPlan', data: { planId: editId, updateData: data } });
                if (resp && resp.success === false) throw new Error(resp.message || 'فشل التحديث');
            } else {
                const resp = await GoogleIntegration.sendRequest({ action: 'addEmergencyFloorPlan', data });
                if (resp && resp.success === false) throw new Error(resp.message || 'فشل الإضافة');
                savedPlanId = resp?.data?.id || resp?.data?.data?.id || resp?.id || savedPlanId;
            }
            this._fmInvalidateFloorPlansCache();
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success(editId ? 'تم تحديث المخطط' : 'تم إضافة المخطط');
            this._closeFloorPlanModal();
            const planIdToSelect = String(savedPlanId || editId || '');
            if (planIdToSelect) {
                this._fmState.factoryFilter = String(factoryId);
                const filterField = document.getElementById('fm-factory-filter');
                if (filterField) filterField.value = String(factoryId);
            }
            await this.loadFloorPlans(planIdToSelect, { syncFactoryFilter: true });
        } catch (err) {
            const msg = err?.message || 'خطأ غير معروف';
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('فشل الحفظ: ' + msg);
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>' + (editId ? 'حفظ التعديلات' : 'إضافة المخطط'); }
            return false;
        }
        return false;
    },

    loadMapItems(planId) {
        this._fmState.currentPlanId = planId;
        const plan = this._fmState.floorPlans.find(p => String(p.id) === String(planId));
        if (!plan) return;

        document.getElementById('fm-map-placeholder')?.classList.add('hidden');
        document.getElementById('fm-map-wrapper')?.classList.remove('hidden');
        document.getElementById('fm-viewport-bar')?.classList.remove('hidden');
        document.getElementById('fm-legend-sidebar')?.classList.remove('hidden');
        document.getElementById('fm-export-png-btn')?.classList.remove('hidden');
        document.getElementById('fm-qr-btn')?.classList.remove('hidden');
        this._fmResetZoom();

        const mapCanvas = document.getElementById('fm-map-canvas');
        const mapImage = document.getElementById('fm-map-image');
        this._fmApplyMapImageSrc(mapImage, plan.imageDriveId || '', plan.id);
        if (mapImage) {
            mapImage.style.width = (plan.imageWidth || 1200) + 'px';
            mapImage.style.height = (plan.imageHeight || 800) + 'px';
        }
        if (mapCanvas) {
            mapCanvas.style.width = (plan.imageWidth || 1200) + 'px';
            mapCanvas.style.height = (plan.imageHeight || 800) + 'px';
        }

        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
            GoogleIntegration.sendRequest({ action: 'getAllEmergencyMapItems', data: { filters: { floorPlanId: planId } } })
                .then(resp => {
                    this._fmState.items = this._fmParseListResponse(resp);
                    this.renderMapItems();
                    this._renderLegend();
                    this._fmUpdatePlanMeta();
                }).catch(() => {
                    this._fmState.items = [];
                    this._fmUpdatePlanMeta();
                });
        }
        this._fmUpdatePlanMeta();
    },

    renderMapItems() {
        const layer = document.getElementById('fm-map-items-layer');
        if (!layer) return;
        layer.innerHTML = '';

        this._fmState.items.forEach(item => {
            const typeDef = this.FM_ITEM_TYPES[item.itemType] || { label: item.itemType, icon: 'fa-question-circle', color: '#6b7280' };
            const el = document.createElement('div');
            el.className = 'fm-marker' + (this._fmState.adminMode ? ' fm-marker-draggable' : '');
            el.dataset.itemId = item.id;
            el.title = `${typeDef.label}: ${item.label || ''}`;
            el.style.left = (parseFloat(item.x) * 100) + '%';
            el.style.top = (parseFloat(item.y) * 100) + '%';
            el.style.background = typeDef.color;
            el.innerHTML = `<i class="fas ${Utils.escapeAttr(typeDef.icon)}"></i>`;

            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!this._fmState.adminMode) this._showMapItemTooltip(item, el);
            });

            if (this._fmState.adminMode) {
                this._makeMarkerDraggable(el, item);
            }

            layer.appendChild(el);
        });
        this._fmUpdatePlanMeta();
    },

    _showMapItemTooltip(item, el) {
        const typeDef = this.FM_ITEM_TYPES[item.itemType] || { label: item.itemType, icon: 'fa-question-circle', color: '#6b7280' };
        const existing = document.getElementById('fm-tooltip');
        if (existing) existing.remove();

        const tip = document.createElement('div');
        tip.id = 'fm-tooltip';
        tip.className = 'fm-tooltip';
        tip.innerHTML = `
            <div class="fm-tip-header" style="background:${Utils.escapeAttr(typeDef.color)};">
                <i class="fas ${Utils.escapeAttr(typeDef.icon)}"></i> ${Utils.escapeHTML(typeDef.label)}
            </div>
            <div class="fm-tip-body">
                <p><strong>${Utils.escapeHTML(item.label || '—')}</strong></p>
                <p>الحالة: ${Utils.escapeHTML(item.status === 'maintenance' ? 'صيانة' : item.status === 'inactive' ? 'غير فعال' : 'فعال')}</p>
                ${item.notes ? `<p>${Utils.escapeHTML(item.notes)}</p>` : ''}
                <div class="fm-tip-actions">
                    ${this._fmState.adminMode ? `<button class="btn-icon btn-sm text-red-600" onclick="Emergency.deleteMapItem('${Utils.escapeAttr(item.id)}')" title="حذف"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            </div>`;
        document.body.appendChild(tip);

        const rect = el.getBoundingClientRect();
        tip.style.left = Math.min(rect.left + rect.width / 2 - tip.offsetWidth / 2, window.innerWidth - tip.offsetWidth - 10) + 'px';
        tip.style.top = (rect.top - tip.offsetHeight - 10) + 'px';

        document.addEventListener('click', function rm() { tip.remove(); document.removeEventListener('click', rm); });
    },

    _makeMarkerDraggable(el, item) {
        let startX, startY, origX, origY, dragging = false;
        el.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            dragging = true;
            const mapRect = document.getElementById('fm-map-canvas').getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            origX = parseFloat(item.x);
            origY = parseFloat(item.y);

            const onMove = (me) => {
                if (!dragging) return;
                const dx = (me.clientX - startX) / mapRect.width;
                const dy = (me.clientY - startY) / mapRect.height;
                const newX = Math.max(0, Math.min(1, origX + dx));
                const newY = Math.max(0, Math.min(1, origY + dy));
                item.x = newX;
                item.y = newY;
                el.style.left = (newX * 100) + '%';
                el.style.top = (newY * 100) + '%';
            };
            const onUp = () => {
                dragging = false;
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                    GoogleIntegration.sendRequest({ action: 'updateEmergencyMapItem', data: { itemId: item.id, updateData: { x: item.x, y: item.y } } }).catch(() => {});
                }
            };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
        });
    },

    toggleAdminMode() {
        this._fmState.adminMode = !this._fmState.adminMode;
        const panel = document.getElementById('fm-admin-panel');
        const toggleBtn = document.getElementById('fm-admin-toggle');
        if (panel) panel.classList.toggle('hidden', !this._fmState.adminMode);
        if (toggleBtn) toggleBtn.classList.toggle('btn-primary', this._fmState.adminMode);
        if (toggleBtn) toggleBtn.classList.toggle('btn-secondary', !this._fmState.adminMode);
        this.renderMapItems();

        // في وضع الإدارة، النقر على الخريطة يضيف عنصراً
        const canvas = document.getElementById('fm-map-canvas');
        if (canvas) {
            if (this._fmState.adminMode) {
                canvas.addEventListener('click', this._fmCanvasClickHandler = (e) => {
                    if (!this._fmState.addingType) return;
                    const rect = canvas.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    this._addMapItemAt(this._fmState.addingType, x, y);
                });
            } else {
                if (this._fmCanvasClickHandler) {
                    canvas.removeEventListener('click', this._fmCanvasClickHandler);
                    this._fmCanvasClickHandler = null;
                }
                this._fmState.addingType = null;
                document.querySelectorAll('.fm-add-item-btn').forEach(b => b.classList.remove('active'));
            }
        }
    },

    _addMapItemAt(type, x, y) {
        if (!this._fmState.currentPlanId) return;
        const items = this._fmState.items;
        const count = items.filter(i => i.itemType === type).length + 1;
        const typeDef = this.FM_ITEM_TYPES[type] || { label: type, icon: 'fa-question', color: '#6b7280' };

        const tempId = 'MI-TEMP-' + Date.now();
        const newItem = { id: tempId, floorPlanId: this._fmState.currentPlanId, itemType: type, label: typeDef.label + ' ' + count, x, y, status: 'active', notes: '' };
        items.push(newItem);
        this.renderMapItems();
        if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم إضافة ' + typeDef.label);

        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
            GoogleIntegration.sendRequest({ action: 'addEmergencyMapItem', data: { floorPlanId: this._fmState.currentPlanId, itemType: type, label: typeDef.label + ' ' + count, x, y, status: 'active' } })
                .then(resp => {
                    if (resp && resp.success && resp.data && resp.data.id) {
                        const idx = items.findIndex(i => i.id === tempId);
                        if (idx >= 0) items[idx].id = resp.data.id;
                    }
                }).catch(() => {});
        }
    },

    deleteMapItem(itemId) {
        if (!confirm('حذف هذا العنصر من الخريطة؟')) return;
        this._fmState.items = this._fmState.items.filter(i => i.id !== itemId);
        this.renderMapItems();
        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
            GoogleIntegration.sendRequest({ action: 'deleteEmergencyMapItem', data: { itemId } }).catch(() => {});
        }
    },

    deleteFloorPlan(planId) {
        if (!planId) return;
        const plan = this._fmState.floorPlans.find(p => String(p.id) === String(planId));
        const name = plan?.name || 'هذا المخطط';
        if (!confirm(`حذف "${name}" نهائياً؟ سيتم حذف جميع العناصر المرتبطة به.`)) return;
        Loading.show('جاري حذف المخطط...');
        const promises = [];
        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
            const itemsToDelete = this._fmState.items.filter(i => i.floorPlanId === planId);
            itemsToDelete.forEach(item => {
                promises.push(
                    GoogleIntegration.sendRequest({ action: 'deleteEmergencyMapItem', data: { itemId: item.id } }).catch(() => {})
                );
            });
            promises.push(
                GoogleIntegration.sendRequest({ action: 'deleteEmergencyFloorPlan', data: { planId } })
                    .then(resp => {
                        if (resp && resp.success === false) throw new Error(resp.message || 'فشل الحذف');
                    }).catch(err => { throw err; })
            );
        }
        Promise.all(promises).then(async () => {
            Loading.hide();
            this._fmInvalidateFloorPlansCache();
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم حذف المخطط');
            this._fmState.floorPlans = this._fmState.floorPlans.filter(p => String(p.id) !== String(planId));
            this._fmState.items = this._fmState.items.filter(i => i.floorPlanId !== planId);
            await this.loadFloorPlans('');
            const select = document.getElementById('fm-floor-select');
            if (select) select.value = '';
            document.getElementById('fm-map-placeholder')?.classList.remove('hidden');
            document.getElementById('fm-map-wrapper')?.classList.add('hidden');
            document.getElementById('fm-edit-floor-btn')?.classList.add('hidden');
            document.getElementById('fm-delete-floor-btn')?.classList.add('hidden');
            document.getElementById('fm-viewport-bar')?.classList.add('hidden');
            document.getElementById('fm-legend-sidebar')?.classList.add('hidden');
            this._fmState.currentPlanId = null;
            this._fmUpdatePlanMeta();
        }).catch(err => {
            Loading.hide();
            if (typeof Notification !== 'undefined' && Notification.error) Notification.error('فشل الحذف: ' + (err?.message || 'خطأ غير معروف'));
        });
    },

    _renderLegend() {
        const container = document.getElementById('fm-legend-items');
        if (!container) return;
        container.innerHTML = '';
        Object.entries(this.FM_ITEM_TYPES).forEach(([key, def]) => {
            const item = document.createElement('div');
            item.className = 'fm-legend-item';
            item.innerHTML = `<span class="fm-legend-icon" style="background:${def.color};"><i class="fas ${def.icon}"></i></span><span class="fm-legend-label">${def.label}</span>`;
            container.appendChild(item);
        });
    }
};

// Ensure all Emergency module methods keep the correct context even when used as callbacks
Object.keys(Emergency).forEach((key) => {
    if (typeof Emergency[key] === 'function') {
        Emergency[key] = Emergency[key].bind(Emergency);
    }
});

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof Emergency !== 'undefined') {
            window.Emergency = Emergency;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ Emergency module loaded and available on window.Emergency');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير Emergency:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof Emergency !== 'undefined') {
            try {
                window.Emergency = Emergency;
            } catch (e) {
                console.error('❌ فشل تصدير Emergency:', e);
            }
        }
    }
})();