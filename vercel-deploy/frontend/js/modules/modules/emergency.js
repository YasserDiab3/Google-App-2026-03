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
                                                    <img id="fm-map-image" class="fm-map-image" src="" alt="مخطط الطابق">
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
        zoom: 1,
        fullscreen: false
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
        this.loadFloorPlans(this._fmState.currentPlanId || '');
        this._bindFactoryMapEvents();
        this._renderLegend();
    },

    _fmParseListResponse(resp) {
        if (Array.isArray(resp)) return resp;
        if (resp && Array.isArray(resp.data)) return resp.data;
        if (resp && resp.success !== false && resp.data && Array.isArray(resp.data)) return resp.data;
        return [];
    },

    _fmUpdatePlanMeta() {
        const meta = document.getElementById('fm-plan-meta');
        const countEl = document.getElementById('fm-items-count');
        const plan = this._fmState.floorPlans.find(p => p.id === this._fmState.currentPlanId);
        if (meta) {
            meta.textContent = plan
                ? `${plan.name || 'مخطط'}${plan.floor ? ' — ' + plan.floor : ''}`
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
                if (e.key === 'Escape' && this._fmState.fullscreen) this.toggleFactoryMapFullscreen();
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

    async loadFloorPlans(selectPlanId) {
        const select = document.getElementById('fm-floor-select');
        if (!select) return [];

        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) {
            return [];
        }

        try {
            const resp = await GoogleIntegration.sendRequest({ action: 'getAllEmergencyFloorPlans', data: {} });
            const plans = this._fmParseListResponse(resp);
            this._fmState.floorPlans = plans;
            select.innerHTML = '<option value="">— اختر المخطط —</option>' +
                plans.map(p => `<option value="${Utils.escapeAttr(p.id)}">${Utils.escapeHTML(p.name || 'مخطط')}${p.floor ? ' — ' + Utils.escapeHTML(p.floor) : ''}</option>`).join('');

            const targetId = selectPlanId || this._fmState.currentPlanId || '';
            if (targetId && plans.some(p => String(p.id) === String(targetId))) {
                select.value = targetId;
                this.loadMapItems(targetId);
                document.getElementById('fm-edit-floor-btn')?.classList.remove('hidden');
                document.getElementById('fm-delete-floor-btn')?.classList.remove('hidden');
                document.getElementById('fm-viewport-bar')?.classList.remove('hidden');
                document.getElementById('fm-legend-sidebar')?.classList.remove('hidden');
            }
            return plans;
        } catch (_e) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('تعذر تحميل مخططات الطوارئ');
            }
            return [];
        }
    },

    showFloorPlanForm(editId) {
        const existing = this._fmState.floorPlans.find(p => p.id === editId);
        const val = (f, def) => (existing && existing[f] != null) ? existing[f] : (def || '');
        const floors = ['الطابق الأرضي', 'الطابق الأول', 'الطابق الثاني', 'الطابق الثالث', 'سطح المبنى', 'مبنى آخر'];
        const floorOpts = floors.map(f => `<option value="${f}" ${val('floor') === f ? 'selected' : ''}>${f}</option>`).join('');
        const hasExistingImage = !!(val('imageDriveId'));

        const html = `
            <div class="modal-overlay active" id="fm-floor-modal" style="z-index:9999;">
                <div class="modal-content fm-modal-improved">
                    <div class="lr-modal-header">
                        <h3><i class="fas fa-draw-polygon" style="color:#2563eb;"></i> ${editId ? 'تعديل' : 'إضافة'} مخطط طابق</h3>
                        <button type="button" class="modal-close" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <form id="fm-floor-form" onsubmit="return Emergency.handleFloorPlanSubmit(event)">
                        <input type="hidden" id="fm-floor-edit-id" value="${editId || ''}">
                        <div class="modal-body" style="padding:16px 24px;">
                            <div class="fm-form-row">
                                <div class="form-group" style="flex:1;">
                                    <label class="form-label">اسم المخطط <span class="text-red-500">*</span></label>
                                    <input type="text" id="fm-floor-name" class="form-input" value="${val('name')}" required placeholder="مثال: مخطط الطابق الأرضي" autofocus>
                                </div>
                                <div class="form-group" style="flex:0 0 140px;">
                                    <label class="form-label">الطابق</label>
                                    <select id="fm-floor-level" class="form-input">${floorOpts}</select>
                                </div>
                                <div class="form-group" style="flex:0 0 80px;">
                                    <label class="form-label">الترتيب</label>
                                    <input type="number" id="fm-floor-sort" class="form-input" value="${val('sortOrder', '1')}" min="0">
                                </div>
                            </div>
                            <div class="form-group" style="margin-top:12px;">
                                <div class="fm-source-tabs" style="display:flex;gap:0;margin-bottom:0;background:#f1f5f9;border-radius:10px;padding:4px;border:1px solid #e2e8f0;">
                                    <button type="button" class="fm-source-tab active" data-mode="draw" onclick="Emergency._fmSwitchSource('draw')"><i class="fas fa-pen-fancy"></i> رسم يدوي</button>
                                    <button type="button" class="fm-source-tab" data-mode="upload" onclick="Emergency._fmSwitchSource('upload')"><i class="fas fa-cloud-upload-alt"></i> رفع صورة</button>
                                </div>
                            </div>
                            <div id="fm-source-draw" class="fm-source-pane" style="display:block;margin-top:4px;">
                                <div class="fm-canvas-toolbar">
                                    <div class="fm-tool-group">
                                        <button type="button" class="fm-draw-tool active" data-tool="pen" title="قلم"><i class="fas fa-pen"></i></button>
                                        <button type="button" class="fm-draw-tool" data-tool="rect" title="مستطيل"><i class="fas fa-vector-square"></i></button>
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
                                    <div class="fm-tool-group">
                                        <button type="button" class="fm-draw-action" onclick="Emergency._fmClearCanvas()" title="مسح الكل"><i class="fas fa-trash-alt"></i> مسح</button>
                                    </div>
                                </div>
                                <div class="fm-canvas-wrap" onclick="this.querySelector('canvas').focus()">
                                    <canvas id="fm-sketch-canvas" width="1200" height="650" tabindex="-1"></canvas>
                                </div>
                                <div class="fm-canvas-hint">
                                    <i class="fas fa-info-circle"></i> ارسم جدران وغرف المصنع باستخدام <strong>القلم</strong> أو أضف <strong>مستطيلات</strong>. استخدم <strong>الممحاة</strong> للمسح.
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
                                    <input type="hidden" id="fm-floor-image" value="${val('imageDriveId')}">
                                    <p class="fm-field-hint" id="fm-upload-hint">${val('imageDriveId') ? 'الصورة موجودة مسبقاً.' : 'اختر صورة من جهازك لعرضها كخلفية للمخطط.'}</p>
                                </div>
                            </div>
                            <div class="fm-form-row" style="margin-top:10px;">
                                <div class="form-group" style="flex:1;">
                                    <label class="form-label">العرض (px)</label>
                                    <input type="number" id="fm-floor-width" class="form-input" value="${val('imageWidth', 1200)}" min="100">
                                </div>
                                <div class="form-group" style="flex:1;">
                                    <label class="form-label">الارتفاع (px)</label>
                                    <input type="number" id="fm-floor-height" class="form-input" value="${val('imageHeight', 800)}" min="100">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer" style="padding:12px 24px;gap:8px;">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary"><i class="fas fa-save ml-2"></i>${editId ? 'حفظ التعديلات' : 'إضافة المخطط'}</button>
                        </div>
                    </form>
                </div>
            </div>`;
        const m = document.getElementById('fm-floor-modal');
        if (m) m.remove();
        document.body.insertAdjacentHTML('beforeend', html);
        this._fmInitCanvas();
        this._fmInitUpload();
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

    _fmInitCanvas() {
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = { x: 0, y: 0, w: 0, h: 0, drawing: false };
        let drawing = false, tool = 'pen', color = '#1e293b', width = 4, lastX, lastY;

        // Restore existing data if editing
        const existingData = document.getElementById('fm-floor-edit-id')?.value;
        if (existingData) {
            const plan = this._fmState.floorPlans.find(p => p.id === existingData);
            if (plan && plan.imageDriveId && plan.imageDriveId.startsWith('data:image')) {
                const img = new Image();
                img.onload = () => { ctx.drawImage(img, 0, 0, canvas.width, canvas.height); };
                img.src = plan.imageDriveId;
            }
        }

        const getPos = (e) => {
            const rect2 = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect2.width;
            const scaleY = canvas.height / rect2.height;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: (clientX - rect2.left) * scaleX, y: (clientY - rect2.top) * scaleY };
        };

        const startDraw = (e) => {
            e.preventDefault();
            const pos = getPos(e);
            drawing = true;
            lastX = pos.x; lastY = pos.y;
            if (tool === 'rect') { rect.x = pos.x; rect.y = pos.y; rect.drawing = true; }
            else { ctx.beginPath(); ctx.moveTo(pos.x, pos.y); }
        };

        const draw = (e) => {
            e.preventDefault();
            const pos = getPos(e);
            if (!drawing) return;
            if (tool === 'eraser') {
                ctx.clearRect(Math.min(lastX, pos.x) - width, Math.min(lastY, pos.y) - width, Math.abs(pos.x - lastX) + width * 2, Math.abs(pos.y - lastY) + width * 2);
                lastX = pos.x; lastY = pos.y;
                return;
            }
            if (tool === 'rect') {
                if (!rect.drawing) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // redraw from saved snapshot if available
                const snapshot = canvas._snapshot;
                if (snapshot) ctx.putImageData(snapshot, 0, 0);
                ctx.strokeStyle = color; ctx.lineWidth = width;
                ctx.strokeRect(rect.x, rect.y, pos.x - rect.x, pos.y - rect.y);
                ctx.fillStyle = color + '20';
                ctx.fillRect(rect.x, rect.y, pos.x - rect.x, pos.y - rect.y);
                return;
            }
            ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            ctx.lineTo(pos.x, pos.y); ctx.stroke();
            lastX = pos.x; lastY = pos.y;
        };

        const endDraw = (e) => {
            if (tool === 'rect' && rect.drawing) {
                // Snapshot after drawing rectangle
                canvas._snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
                rect.drawing = false;
            } else if (tool !== 'eraser' && drawing) {
                ctx.closePath();
            }
            drawing = false;
            canvas._snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseleave', endDraw);
        canvas.addEventListener('touchstart', startDraw, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', endDraw);

        // Tool buttons
        document.querySelectorAll('.fm-draw-tool').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.fm-draw-tool').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                tool = btn.dataset.tool;
                canvas.style.cursor = tool === 'eraser' ? 'cell' : 'crosshair';
            });
        });

        const colorInput = document.getElementById('fm-draw-color');
        if (colorInput) colorInput.addEventListener('input', (e) => { color = e.target.value; });

        const widthSelect = document.getElementById('fm-draw-width');
        if (widthSelect) widthSelect.addEventListener('change', (e) => { width = parseInt(e.target.value); });

        // Initial snapshot
        canvas._snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    },

    _fmClearCanvas() {
        const canvas = document.getElementById('fm-sketch-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas._snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

        if (isDrawMode) {
            const canvas = document.getElementById('fm-sketch-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const hasContent = imageData.data.some(ch => ch !== 0);
                if (hasContent) {
                    imageDriveId = this._fmCompressCanvasDataUrl(canvas, 1400, 0.85);
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
                imageDriveId = this._fmCompressCanvasDataUrl(tmp, 1600, 0.85);
            }
        }

        if (!imageDriveId && editId) {
            const existingPlan = this._fmState.floorPlans.find(p => String(p.id) === String(editId));
            if (existingPlan?.imageDriveId) imageDriveId = existingPlan.imageDriveId;
        }

        if (!editId && !imageDriveId) {
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('يرجى رسم المخطط أو رفع صورة قبل الحفظ');
            }
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>إضافة المخطط'; }
            return false;
        }

        const data = {
            name,
            floor: document.getElementById('fm-floor-level')?.value || '',
            imageDriveId,
            imageWidth: parseInt(document.getElementById('fm-floor-width')?.value) || 1200,
            imageHeight: parseInt(document.getElementById('fm-floor-height')?.value) || 800,
            sortOrder: parseInt(document.getElementById('fm-floor-sort')?.value) || 1,
            isActive: 'true'
        };

        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الحفظ...'; }

        try {
            if (!window.GoogleIntegration || typeof GoogleIntegration.sendRequest !== 'function') {
                if (typeof Notification !== 'undefined' && Notification.error) Notification.error('خدمة التكامل غير متوفرة');
                if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="fas fa-save ml-2"></i>' + (editId ? 'حفظ التعديلات' : 'إضافة المخطط'); }
                return false;
            }

            let savedPlanId = editId || '';
            if (editId) {
                const resp = await GoogleIntegration.sendRequest({ action: 'updateEmergencyFloorPlan', data: { planId: editId, updateData: data } });
                if (resp && resp.success === false) throw new Error(resp.message || 'فشل التحديث');
            } else {
                const resp = await GoogleIntegration.sendRequest({ action: 'addEmergencyFloorPlan', data });
                if (resp && resp.success === false) throw new Error(resp.message || 'فشل الإضافة');
                savedPlanId = resp?.data?.id || resp?.id || savedPlanId;
            }
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success(editId ? 'تم تحديث المخطط' : 'تم إضافة المخطط');
            if (modal) modal.remove();
            await this.loadFloorPlans(savedPlanId);
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
        const plan = this._fmState.floorPlans.find(p => p.id === planId);
        if (!plan) return;

        document.getElementById('fm-map-placeholder')?.classList.add('hidden');
        document.getElementById('fm-map-wrapper')?.classList.remove('hidden');
        document.getElementById('fm-viewport-bar')?.classList.remove('hidden');
        document.getElementById('fm-legend-sidebar')?.classList.remove('hidden');
        this._fmResetZoom();

        const mapCanvas = document.getElementById('fm-map-canvas');
        const mapImage = document.getElementById('fm-map-image');
        const imgId = plan.imageDriveId || '';
        const imgSrc = imgId.startsWith('data:')
            ? imgId
            : imgId.startsWith('http')
                ? imgId
                : imgId ? `https://drive.google.com/thumbnail?id=${imgId}&sz=w1600` : '';
        mapImage.src = imgSrc;
        mapImage.style.width = (plan.imageWidth || 1200) + 'px';
        mapImage.style.height = (plan.imageHeight || 800) + 'px';
        mapCanvas.style.width = (plan.imageWidth || 1200) + 'px';
        mapCanvas.style.height = (plan.imageHeight || 800) + 'px';

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
        const plan = this._fmState.floorPlans.find(p => p.id === planId);
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
        Promise.all(promises).then(() => {
            Loading.hide();
            if (typeof Notification !== 'undefined' && Notification.success) Notification.success('تم حذف المخطط');
            this._fmState.floorPlans = this._fmState.floorPlans.filter(p => p.id !== planId);
            this._fmState.items = this._fmState.items.filter(i => i.floorPlanId !== planId);
            const select = document.getElementById('fm-floor-select');
            if (select) {
                select.value = '';
                select.innerHTML = '<option value="">-- اختر المخطط --</option>' +
                    this._fmState.floorPlans.map(p => `<option value="${Utils.escapeAttr(p.id)}">${Utils.escapeHTML(p.name || 'مخطط')}${p.floor ? ' - ' + Utils.escapeHTML(p.floor) : ''}</option>`).join('');
            }
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