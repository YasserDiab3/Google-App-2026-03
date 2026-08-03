/**
 * LegalDocuments Module
 * ØªÙ… Ø§Ø³ØªØ®Ø±Ø§Ø¬Ù‡ …Ù† app-modules.js
 */
// ===== Legal Documents Module (المستندات القانونية والتشريعية) =====
const LegalDocuments = {
    state: {
        activeTab: 'documents',
        filters: {
            documents: {
                search: '',
                type: '',
                status: '',
                issuedBy: '',
                dateFrom: '',
                dateTo: ''
            }
        }
    },

    /**
     * معالجة الصور (تحويل روابط Google Drive القديمة و Base64)
     */
    processPhoto(photoData) {
        if (typeof Utils !== 'undefined' && typeof Utils.normalizeImageSource === 'function') {
            return Utils.normalizeImageSource(photoData) || null;
        }
        if (!photoData || typeof photoData !== 'string') return null;
        return photoData.trim() || null;
    },

    async load() {
        // Add language change listener
        if (!this._languageChangeListenerAdded) {
            document.addEventListener('language-changed', () => {
                if (typeof AppState !== 'undefined' && AppState._languageRefresh) return;
                this.load();
            });
            this._languageChangeListenerAdded = true;
        }

        const section = document.getElementById('legal-documents-section');
        if (!section) return;

        // التحقق من وجود AppState
        if (typeof AppState === 'undefined') {
            // لا تترك الواجهة فارغة
            section.innerHTML = `
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                            <p class="text-gray-500 mb-2">تعذر تحميل الوثائق القانونية</p>
                            <p class="text-sm text-gray-400">AppState غير متوفر حالياً. جرّب تحديث الصفحة.</p>
                            <button onclick="location.reload()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                تحديث الصفحة
                            </button>
                        </div>
                    </div>
                </div>
            `;
            if (typeof Utils !== 'undefined' && Utils.safeError) Utils.safeError('AppState غير متوفر!');
            else console.error('AppState غير متوفر!');
            return;
        }

        try {
            // Skeleton فوري قبل أي render قد يكون بطيئاً
            section.innerHTML = `
                <div class="section-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-gavel ml-3"></i>
                                المستندات القانونية والتشريعية
                            </h1>
                            <p class="section-subtitle">جاري التحميل...</p>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">جاري تجهيز الواجهة...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const title = (typeof i18n !== 'undefined' && i18n.translate) ? i18n.translate('legal.title') : 'المستندات القانونية والتشريعية';
            const subtitle = (typeof i18n !== 'undefined' && i18n.translate) ? i18n.translate('legal.subtitle') : 'متابعة المستندات القانونية وترة صلاحيتها والتحديثات';
            const checkUpdates = (typeof i18n !== 'undefined' && i18n.translate) ? i18n.translate('legal.checkUpdates') : 'التحقق من التحديثات القانونية';
            const addDocument = (typeof i18n !== 'undefined' && i18n.translate) ? i18n.translate('legal.addDocument') : 'إضافة مستند قانوني';

            section.innerHTML = `
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-gavel ml-3"></i>
                            ${title}
                        </h1>
                        <p class="section-subtitle">${subtitle}</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="check-legal-updates-btn" class="btn-warning">
                            <i class="fas fa-sync-alt ml-2"></i>
                            ${checkUpdates}
                        </button>
                        <button id="add-legal-document-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            ${addDocument}
                        </button>
                    </div>
                </div>
            </div>
            <div id="legal-documents-content" class="mt-6">
                <!-- Tabs Navigation -->
                <div class="flex flex-wrap gap-2 mb-4" id="legal-tab-nav">
                    <button type="button" class="btn-secondary legal-tab-btn ${this.state.activeTab === 'documents' ? 'active' : ''}" data-tab="documents">
                        <i class="fas fa-file-contract ml-2"></i>المستندات القانونية
                    </button>
                    <button type="button" class="btn-secondary legal-tab-btn ${this.state.activeTab === 'inventory' ? 'active' : ''}" data-tab="inventory">
                        <i class="fas fa-clipboard-list ml-2"></i>سجل حصر التشريعات والقوانين
                    </button>
                </div>
                
                <!-- Tab Panels -->
                <div id="legal-tab-panels">
                    <div class="legal-tab-panel" data-tab-panel="documents" style="display: ${this.state.activeTab === 'documents' ? 'block' : 'none'}">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <div style="width: 300px; margin: 0 auto 16px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-500">جاري تحميل المستندات...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="legal-tab-panel" data-tab-panel="inventory" style="display: ${this.state.activeTab === 'inventory' ? 'block' : 'none'}">
                        <div id="legal-register-section">
                            <div class="legal-kpi-grid">
                                <div class="legal-kpi-card kpi-blue">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-balance-scale"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">إجمالي التشريعات</p>
                                            <p class="kpi-value" id="lr-total-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-green">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-check-circle"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">نافذ</p>
                                            <p class="kpi-value" id="lr-applicable-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-amber">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-edit"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">معدل</p>
                                            <p class="kpi-value" id="lr-amended-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-red">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-times-circle"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">ملغي</p>
                                            <p class="kpi-value" id="lr-repealed-count">0</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="legal-kpi-card kpi-purple">
                                    <div class="flex items-center gap-3">
                                        <div class="kpi-icon-wrap"><i class="fas fa-percentage"></i></div>
                                        <div class="min-w-0">
                                            <p class="kpi-label">نسبة النفاذ</p>
                                            <p class="kpi-value" id="lr-compliance-rate">0%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="legal-filters-bar">
                                <div class="filter-group">
                                    <label>التصنيف:</label>
                                    <select id="lr-category-filter" class="form-input" style="max-width: 200px;">
                                        <option value="">الكل</option>
                                        ${this.LEGAL_REGISTER_CATEGORIES ? this.LEGAL_REGISTER_CATEGORIES.map(c => `<option value="${c.value}">${c.label}</option>`).join('') : ''}
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>الحالة:</label>
                                    <select id="lr-status-filter" class="form-input" style="max-width: 160px;">
                                        <option value="">الكل</option>
                                        ${this.LEGAL_REGISTER_STATUSES ? this.LEGAL_REGISTER_STATUSES.map(s => `<option value="${s.value}">${s.label}</option>`).join('') : ''}
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>الأولوية:</label>
                                    <select id="lr-priority-filter" class="form-input" style="max-width: 160px;">
                                        <option value="">الكل</option>
                                        ${this.LEGAL_PRIORITIES ? this.LEGAL_PRIORITIES.map(p => `<option value="${p.value}">${p.label}</option>`).join('') : ''}
                                    </select>
                                </div>
                                <button id="lr-reset-filter-btn" class="btn-secondary btn-sm">
                                    <i class="fas fa-redo ml-2"></i>إعادة تعيين
                                </button>
                                <button id="lr-add-btn" class="btn-primary btn-sm">
                                    <i class="fas fa-plus ml-2"></i>إضافة تشريع
                                </button>
                            </div>

                            <div class="lr-table-card">
                                <div class="card-header">
                                    <div class="legal-header-row">
                                        <div class="legal-title-section">
                                            <h3 class="card-title"><i class="fas fa-balance-scale ml-2"></i>سجل حصر التشريعات والقوانين</h3>
                                        </div>
                                        <div class="legal-header-actions">
                                            <div class="legal-search-wrapper">
                                                <i class="fas fa-search legal-search-icon"></i>
                                                <input type="text" id="lr-search" class="legal-search-input" placeholder="بحث في التشريعات...">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body" id="lr-container">
                                    <div class="text-center py-8 text-gray-500">جاري تحميل السجل…</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            this.setupEventListeners();
            this.bindTabEvents();
            
            // ✅ تحميل محتوى التبويبات فوراً بعد عرض الواجهة
            setTimeout(async () => {
                try {
                    const documentsPanel = document.querySelector('[data-tab-panel="documents"]');
                    const inventoryPanel = document.querySelector('[data-tab-panel="inventory"]');
                    
                    // تحميل محتوى المستندات
                    if (documentsPanel) {
                        const listContent = await this.renderList().catch(error => {
                            Utils.safeWarn('⚠️ خطأ في تحميل قائمة المستندات:', error);
                            return `
                                <div class="content-card">
                                    <div class="card-body">
                                        <div class="empty-state">
                                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                            <p class="text-gray-500 mb-4">حدث خطأ في تحميل البيانات</p>
                                            <button onclick="LegalDocuments.load()" class="btn-primary">
                                                <i class="fas fa-redo ml-2"></i>
                                                إعادة المحاولة
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                        documentsPanel.innerHTML = listContent;
                        
                        if (this.state.activeTab === 'documents') {
                            this.loadLegalDocumentsList();
                            this.checkExpiringDocuments();
                        }
                    }
                    
                    // تحميل محتوى سجل الحصر
                    if (inventoryPanel) {
                        const inventoryContent = await this.renderInventoryTab().catch(error => {
                            Utils.safeWarn('⚠️ خطأ في تحميل سجل الحصر:', error);
                            return `
                                <div class="content-card">
                                    <div class="card-body">
                                        <div class="empty-state">
                                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                            <p class="text-gray-500 mb-4">حدث خطأ في تحميل البيانات</p>
                                            <button onclick="LegalDocuments.load()" class="btn-primary">
                                                <i class="fas fa-redo ml-2"></i>
                                                إعادة المحاولة
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                        inventoryPanel.innerHTML = inventoryContent;
                        
                        if (this.state.activeTab === 'inventory') {
                            this.loadLegalRegisterList();
                        }
                    }
                } catch (error) {
                    Utils.safeWarn('⚠️ خطأ في تحميل التبويبات:', error);
                }
            }, 0);
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('❌ خطأ في تحميل مديول المستندات القانونية:', error);
            } else {
                console.error('❌ خطأ في تحميل مديول المستندات القانونية:', error);
            }
            if (section) {
                section.innerHTML = `
                    <div class="section-header">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-gavel ml-3"></i>
                                المستندات القانونية والتشريعية
                            </h1>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="content-card">
                            <div class="card-body">
                                <div class="empty-state">
                                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                    <p class="text-gray-500 mb-2">حدث خطأ أثناء تحميل البيانات</p>
                                    <p class="text-sm text-gray-400 mb-4">${error && error.message ? Utils.escapeHTML(error.message) : 'خطأ غير معروف'}</p>
                                    <button onclick="LegalDocuments.load()" class="btn-primary">
                                        <i class="fas fa-redo ml-2"></i>
                                        إعادة المحاولة
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    },

    /**
     * حساب إحصائيات المستندات القانونية
     */
    getStatistics() {
        try {
            const documents = AppState.appData.legalDocuments || [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let total = documents.length;
            let expired = 0;
            let active = 0;
            let expiringSoon = 0;

            documents.forEach(doc => {
                if (!doc) return; // تخطي المستندات الفارغة

                // التحقق من وجود تاريخ انتهاء صحيح
                let hasExpiryDate = false;
                let expiryDate = null;
                let daysRemaining = 0;
                let isExpired = false;

                if (doc.expiryDate) {
                    try {
                        expiryDate = new Date(doc.expiryDate);
                        // التحقق من أن التاريخ صحيح
                        if (!isNaN(expiryDate.getTime())) {
                            hasExpiryDate = true;
                            expiryDate.setHours(0, 0, 0, 0);
                            daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                            isExpired = expiryDate < today;
                        }
                    } catch (error) {
                        // في حالة خطأ في تحويل التاريخ، نتجاهل تاريخ الانتهاء
                        console.warn('خطأ في تحويل تاريخ الانتهاء للمستند:', doc.id, error);
                    }
                }

                // حساب المستندات المنتهية (بغض النظر عن الحالة)
                if (hasExpiryDate && isExpired) {
                    expired++;
                }

                // حساب المستندات السارية (نشطة ولم تنتهِ صلاحيتها)
                if (doc.status === 'نشط') {
                    // مستند نشط إما لا يوجد له تاريخ انتهاء أو لم ينتهِ بعد
                    if (!hasExpiryDate || !isExpired) {
                        active++;
                        
                        // حساب المستندات قريبة على الانتهاء (جزء من السارية)
                        if (hasExpiryDate && !isExpired) {
                            const alertDays = parseInt(doc.alertDays) || 30;
                            if (daysRemaining <= alertDays && daysRemaining > 0) {
                                expiringSoon++;
                            }
                        }
                    }
                }
            });

            return {
                total,
                expired,
                active,
                expiringSoon
            };
        } catch (error) {
            console.error('خطأ في حساب إحصائيات المستندات:', error);
            return {
                total: 0,
                expired: 0,
                active: 0,
                expiringSoon: 0
            };
        }
    },

    /**
     * عرض كروت الإحصائيات
     */
    renderStatisticsCards() {
        let stats;
        try {
            stats = this.getStatistics();
            // التأكد من أن جميع القيم موجودة وصحيحة
            stats = {
                total: stats.total || 0,
                expired: stats.expired || 0,
                active: stats.active || 0,
                expiringSoon: stats.expiringSoon || 0
            };
        } catch (error) {
            console.error('خطأ في حساب إحصائيات المستندات:', error);
            // قيم افتراضية في حالة الخطأ
            stats = {
                total: 0,
                expired: 0,
                active: 0,
                expiringSoon: 0
            };
        }
        
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- إجمالي المستندات -->
                <div class="content-card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-file-contract ml-2"></i>إجمالي المستندات
                            </p>
                            <p class="text-3xl font-bold text-blue-600">${stats.total}</p>
                            <p class="text-xs text-gray-500 mt-1">مستند قانوني مسجل</p>
                        </div>
                        <div class="bg-blue-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-file-contract text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- المستندات المنتهية -->
                <div class="content-card bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-exclamation-circle ml-2"></i>المستندات المنتهية
                            </p>
                            <p class="text-3xl font-bold text-red-600">${stats.expired}</p>
                            <p class="text-xs text-gray-500 mt-1">${stats.total > 0 ? Math.round((stats.expired / stats.total) * 100) : 0}% من الإجمالي</p>
                        </div>
                        <div class="bg-red-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-exclamation-circle text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- المستندات السارية -->
                <div class="content-card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-check-circle ml-2"></i>المستندات السارية
                            </p>
                            <p class="text-3xl font-bold text-green-600">${stats.active}</p>
                            <p class="text-xs text-gray-500 mt-1">مستندات نشطة وصالحة</p>
                        </div>
                        <div class="bg-green-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-check-circle text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
                
                <!-- مستندات قريبة على الانتهاء -->
                <div class="content-card bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-600 mb-1">
                                <i class="fas fa-clock ml-2"></i>قريبة على الانتهاء
                            </p>
                            <p class="text-3xl font-bold text-yellow-600">${stats.expiringSoon}</p>
                            <p class="text-xs text-gray-500 mt-1">تحتاج متابعة عاجلة</p>
                        </div>
                        <div class="bg-yellow-500 rounded-full p-4 shadow-md">
                            <i class="fas fa-clock text-white text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async renderList() {
        return `
            <!-- كروت الإحصائيات -->
            <div id="legal-documents-stats-container" class="mb-6">
                ${this.renderStatisticsCards()}
            </div>
            
            <div class="content-card">
                    <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title"><i class="fas fa-list ml-2"></i>${(typeof i18n !== 'undefined' && i18n.translate) ? i18n.translate('legal.list') : 'قائمة المستندات القانونية'}</h2>
                        <button id="export-legal-excel-btn" class="btn-success">
                            <i class="fas fa-file-excel ml-2"></i>${(typeof i18n !== 'undefined' && i18n.translate) ? i18n.translate('legal.exportExcel') : 'تصدير Excel'}
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div id="legal-documents-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">جاري التحميل...</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="content-card mt-6">
                <div class="card-header">
                    <h2 class="card-title"><i class="fas fa-link ml-2"></i>متابعة التحديثات القانونية</h2>
                </div>
                <div class="card-body">
                    <div class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded p-4">
                            <p class="text-sm text-blue-800 mb-3">
                                <i class="fas fa-info-circle ml-2"></i>
                                <strong>متابعة التحديثات:</strong> يمكنك متابعة التحديثات القانونية والتشريعية عبر بوابة التشريعات والقوانين الرسمية
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-globe ml-2"></i>
                                        رابط بوابة التشريعات
                                    </label>
                                    <input type="url" id="legal-portal-url" class="form-input" 
                                        value="${AppState.legalPortalUrl || ''}" 
                                        placeholder="https://example.com/legal-portal">
                                    <p class="text-xs text-gray-500 mt-1">رابط بوابة التشريعات الرسمية لمتابعة التحديثات</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-bell ml-2"></i>
                                        تفعيل التنبيهات التلقائية
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" id="legal-auto-notify" class="rounded border-gray-300 text-blue-600"
                                            ${AppState.legalAutoNotify ? 'checked' : ''}>
                                        <span class="mr-2 text-sm text-gray-700">تنبيه تلقائي عند وجود تحديثات</span>
                                    </label>
                                </div>
                            </div>
                            <div class="mt-4">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-keywords ml-2"></i>
                                    كلمات متاحية للمتابعة
                                </label>
                                <textarea id="legal-keywords" class="form-input" rows="3"
                                    placeholder="أدخل الكلمات المتاحية للمتابعة (مصولة بواصل)">${(AppState.legalKeywords || []).join(', ')}</textarea>
                                <p class="text-xs text-gray-500 mt-1">مثال: سلامة مهنية، بيئة، صحة، تشريعات العمل</p>
                            </div>
                            <button type="button" id="save-legal-settings-btn" class="btn-primary mt-3">
                                <i class="fas fa-save ml-2"></i>حفظ إعدادات المتابعة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * تحديث كروت الإحصائيات
     */
    updateStatisticsCards() {
        const statsContainer = document.getElementById('legal-documents-stats-container');
        if (statsContainer) {
            statsContainer.innerHTML = this.renderStatisticsCards();
        }
    },

    normalizeSearchText(value) {
        if (value === null || value === undefined) return '';
        return String(value)
            .toLowerCase()
            .replace(/[\u064B-\u065F\u0670]/g, '')
            .replace(/ـ/g, '')
            .replace(/[أإآ]/g, 'ا')
            .replace(/ى/g, 'ي')
            .replace(/ة/g, 'ه')
            .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
            .replace(/\s+/g, ' ')
            .trim();
    },

    getFilteredLegalDocuments() {
        const documents = AppState.appData.legalDocuments || [];
        const filters = this.state.filters?.documents || {};
        const searchTerm = this.normalizeSearchText(filters.search || '');
        const typeFilter = String(filters.type || '').trim();
        const statusFilter = String(filters.status || '').trim();
        const issuedByFilter = String(filters.issuedBy || '').trim();
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

        if (fromDate && !isNaN(fromDate.getTime())) fromDate.setHours(0, 0, 0, 0);
        if (toDate && !isNaN(toDate.getTime())) toDate.setHours(23, 59, 59, 999);

        return documents.filter((doc) => {
            const docType = String(doc.documentType || '');
            const expiryDate = doc.expiryDate ? new Date(doc.expiryDate) : null;
            const today = new Date();
            const alertDays = parseInt(doc.alertDays, 10) || 30;
            const daysRemaining = expiryDate && !isNaN(expiryDate.getTime())
                ? Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
                : null;
            const isExpired = daysRemaining !== null ? daysRemaining <= 0 : false;
            const isExpiringSoon = daysRemaining !== null ? (daysRemaining > 0 && daysRemaining <= alertDays) : false;
            const computedStatus = isExpired ? 'منتهي' : isExpiringSoon ? 'قارب على الانتهاء' : 'نشط';

            const docStatus = String(computedStatus || doc.status || '');
            const docIssuedBy = String(doc.issuedBy || '');
            const issueDate = doc.issueDate ? new Date(doc.issueDate) : null;

            const searchableText = this.normalizeSearchText([
                doc.documentName || '',
                doc.documentNumber || '',
                doc.isoCode || '',
                doc.documentType || '',
                doc.issuedBy || '',
                doc.description || ''
            ].join(' '));

            const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
            const matchesType = !typeFilter || docType === typeFilter;
            const matchesStatus = !statusFilter || docStatus === statusFilter;
            const matchesIssuedBy = !issuedByFilter || docIssuedBy === issuedByFilter;

            let matchesDate = true;
            if (issueDate && !isNaN(issueDate.getTime())) {
                if (fromDate && issueDate < fromDate) matchesDate = false;
                if (toDate && issueDate > toDate) matchesDate = false;
            } else if (fromDate || toDate) {
                matchesDate = false;
            }

            return matchesSearch && matchesType && matchesStatus && matchesIssuedBy && matchesDate;
        });
    },

    resetLegalDocumentFilters() {
        if (!this.state.filters) this.state.filters = {};
        this.state.filters.documents = {
            search: '',
            type: '',
            status: '',
            issuedBy: '',
            dateFrom: '',
            dateTo: ''
        };
    },

    bindLegalDocumentsFilterEvents(container) {
        if (!container) return;

        const searchInput = container.querySelector('#legal-docs-search');
        const typeFilter = container.querySelector('#legal-docs-filter-type');
        const statusFilter = container.querySelector('#legal-docs-filter-status');
        const issuedByFilter = container.querySelector('#legal-docs-filter-issued-by');
        const dateFromInput = container.querySelector('#legal-docs-date-from');
        const dateToInput = container.querySelector('#legal-docs-date-to');
        const resetBtn = container.querySelector('#legal-docs-reset-filters');

        if (searchInput) {
            let isComposing = false;
            const triggerSearch = (value, caretPos = null) => {
                this.state.filters.documents.search = value || '';
                if (this._legalDocsSearchDebounceTimer) {
                    clearTimeout(this._legalDocsSearchDebounceTimer);
                }
                this._legalDocsSearchDebounceTimer = setTimeout(() => {
                    this.loadLegalDocumentsList();
                    requestAnimationFrame(() => {
                        const newInput = document.getElementById('legal-docs-search');
                        if (!newInput) return;
                        newInput.focus();
                        const pos = typeof caretPos === 'number' ? caretPos : newInput.value.length;
                        try {
                            newInput.setSelectionRange(pos, pos);
                        } catch (e) { /* ignore */ }
                    });
                }, 120);
            };

            searchInput.addEventListener('compositionstart', () => {
                isComposing = true;
            });
            searchInput.addEventListener('compositionend', (event) => {
                isComposing = false;
                triggerSearch(event.target.value, event.target.selectionStart);
            });
            searchInput.addEventListener('input', (event) => {
                if (isComposing) return;
                triggerSearch(event.target.value, event.target.selectionStart);
            });
        }

        if (typeFilter) {
            typeFilter.addEventListener('change', (event) => {
                this.state.filters.documents.type = event.target.value || '';
                this.loadLegalDocumentsList();
            });
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', (event) => {
                this.state.filters.documents.status = event.target.value || '';
                this.loadLegalDocumentsList();
            });
        }

        if (issuedByFilter) {
            issuedByFilter.addEventListener('change', (event) => {
                this.state.filters.documents.issuedBy = event.target.value || '';
                this.loadLegalDocumentsList();
            });
        }

        if (dateFromInput) {
            dateFromInput.addEventListener('change', (event) => {
                this.state.filters.documents.dateFrom = event.target.value || '';
                this.loadLegalDocumentsList();
            });
        }

        if (dateToInput) {
            dateToInput.addEventListener('change', (event) => {
                this.state.filters.documents.dateTo = event.target.value || '';
                this.loadLegalDocumentsList();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetLegalDocumentFilters();
                this.loadLegalDocumentsList();
            });
        }
    },

    async loadLegalDocumentsList() {
        const container = document.getElementById('legal-documents-table-container');
        if (!container) return;

        // تحديث كروت الإحصائيات
        this.updateStatisticsCards();

        const documents = AppState.appData.legalDocuments || [];
        const filteredDocuments = this.getFilteredLegalDocuments();
        const filters = this.state.filters?.documents || {};

        const uniqueTypes = [...new Set(documents.map((doc) => String(doc.documentType || '').trim()).filter(Boolean))].sort();
        const uniqueStatuses = ['نشط', 'قارب على الانتهاء', 'منتهي'];
        const uniqueIssuedBy = [...new Set(documents.map((doc) => String(doc.issuedBy || '').trim()).filter(Boolean))].sort();
        const hasActiveFilters = !!(filters.search || filters.type || filters.status || filters.issuedBy || filters.dateFrom || filters.dateTo);

        if (documents.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-gavel text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">لا توجد مستندات قانونية</p>
                    <button id="add-legal-document-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة مستند قانوني
                    </button>
                </div>
            `;
            // ربط حدث الزر الذي تم إنشاؤه ديناميكياً
            setTimeout(() => {
                const addEmptyBtn = document.getElementById('add-legal-document-empty-btn');
                if (addEmptyBtn) {
                    addEmptyBtn.addEventListener('click', () => this.showForm());
                }
            }, 50);
            return;
        }

        container.innerHTML = `
            <div class="visits-filters-row" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 16px 20px; margin: 0 -20px 14px -20px; width: calc(100% + 40px);">
                <div class="filters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
                    <div class="filter-field" style="min-width: 180px;">
                        <label class="filter-label" for="legal-docs-search">
                            <i class="fas fa-search ml-1"></i>بحث
                        </label>
                        <div class="relative w-full">
                            <input type="text" id="legal-docs-search" class="form-input pr-10 filter-input" placeholder="بحث بالاسم أو الرقم أو الكود" value="${Utils.escapeHTML(filters.search || '')}">
                            <i class="fas fa-search absolute top-3 right-3 text-gray-400"></i>
                        </div>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-type">
                            <i class="fas fa-tags ml-1"></i>النوع
                            ${filters.type ? `<span class="filter-count-badge" title="عدد النتائج">${filteredDocuments.length}</span>` : ''}
                        </label>
                        <select id="legal-docs-filter-type" class="form-input filter-input">
                            <option value="">الكل</option>
                            ${uniqueTypes.map((type) => `<option value="${Utils.escapeHTML(type)}" ${filters.type === type ? 'selected' : ''}>${Utils.escapeHTML(type)}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-status">
                            <i class="fas fa-signal ml-1"></i>الحالة
                            ${filters.status ? `<span class="filter-count-badge" title="عدد النتائج">${filteredDocuments.length}</span>` : ''}
                        </label>
                        <select id="legal-docs-filter-status" class="form-input filter-input">
                            <option value="">الكل</option>
                            ${uniqueStatuses.map((status) => `<option value="${Utils.escapeHTML(status)}" ${filters.status === status ? 'selected' : ''}>${Utils.escapeHTML(status)}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-field" style="min-width: 160px;">
                        <label class="filter-label" for="legal-docs-filter-issued-by">
                            <i class="fas fa-building ml-1"></i>الجهة الصادرة
                            ${filters.issuedBy ? `<span class="filter-count-badge" title="عدد النتائج">${filteredDocuments.length}</span>` : ''}
                        </label>
                        <select id="legal-docs-filter-issued-by" class="form-input filter-input">
                            <option value="">الكل</option>
                            ${uniqueIssuedBy.map((issuer) => `<option value="${Utils.escapeHTML(issuer)}" ${filters.issuedBy === issuer ? 'selected' : ''}>${Utils.escapeHTML(issuer)}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="legal-docs-date-from"><i class="fas fa-calendar-alt ml-1"></i>من تاريخ الإصدار</label>
                        <input type="date" id="legal-docs-date-from" class="form-input filter-input" value="${filters.dateFrom || ''}">
                    </div>
                    <div class="filter-field">
                        <label class="filter-label" for="legal-docs-date-to"><i class="fas fa-calendar-check ml-1"></i>إلى تاريخ الإصدار</label>
                        <input type="date" id="legal-docs-date-to" class="form-input filter-input" value="${filters.dateTo || ''}">
                    </div>
                    <div class="filter-field" style="min-width: 170px;">
                        <button
                            type="button"
                            id="legal-docs-reset-filters"
                            class="filter-reset-btn"
                            title="إلغاء جميع الفلاتر والعودة للوضع الافتراضي"
                            style="width: 100%; min-height: 42px; border-radius: 12px; border: 1px solid #cbd5e1; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); color: #0f172a; font-weight: 700; letter-spacing: 0.2px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08); transition: all 0.2s ease;"
                            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 14px rgba(15, 23, 42, 0.16)'; this.style.borderColor='#94a3b8';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(15, 23, 42, 0.08)'; this.style.borderColor='#cbd5e1';"
                        >
                            <i class="fas fa-rotate-left ml-1"></i>
                            إعادة تعيين الفلاتر
                        </button>
                    </div>
                </div>
            </div>
            ${hasActiveFilters && filteredDocuments.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-filter text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500 mb-2">لا توجد نتائج مطابقة للفلاتر الحالية</p>
                    <button type="button" id="legal-docs-clear-empty-filters" class="btn-secondary mt-2">
                        <i class="fas fa-undo-alt ml-2"></i>
                        مسح الفلاتر
                    </button>
                </div>
            ` : ''}
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>كود ISO</th>
                            <th>اسم المستند</th>
                            <th>النوع</th>
                            <th>رقم المستند</th>
                            <th>تاريخ الإصدار</th>
                            <th>تاريخ الانتهاء</th>
                            <th>مدة الصلاحية (أيام)</th>
                            <th>الحالة</th>
                            <th>المسئول عن المتابعة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredDocuments.map(doc => {
            const expiryDate = new Date(doc.expiryDate);
            const today = new Date();
            const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            const isExpired = expiryDate < today;
            const isExpiringSoon = daysRemaining <= doc.alertDays && daysRemaining > 0;

            return `
                            <tr class="${isExpired ? 'bg-red-50' : isExpiringSoon ? 'bg-yellow-50' : ''}">
                                <td>${Utils.escapeHTML(doc.isoCode || '')}</td>
                                <td>${Utils.escapeHTML(doc.documentName || '')}</td>
                                <td>${Utils.escapeHTML(doc.documentType || '')}</td>
                                <td>${Utils.escapeHTML(doc.documentNumber || '')}</td>
                                <td>${doc.issueDate ? Utils.formatDate(doc.issueDate) : '-'}</td>
                                <td>${doc.expiryDate ? Utils.formatDate(doc.expiryDate) : '-'}</td>
                                <td>
                                    <span class="${isExpired ? 'text-red-600 font-bold' : isExpiringSoon ? 'text-yellow-600 font-bold' : 'text-green-600'}">
                                        ${isExpired ? 'منتهي' : isExpiringSoon ? `${daysRemaining} يوم` : `${daysRemaining} يوم`}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-${isExpired ? 'danger' : isExpiringSoon ? 'warning' : 'success'}">
                                        ${isExpired ? 'منتهي' : isExpiringSoon ? 'قارب على الانتهاء' : 'نشط'}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(doc.followUpResponsible || '-')}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button onclick="LegalDocuments.viewDocument('${doc.id}')" class="btn-icon btn-icon-info" title="عرض">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button onclick="LegalDocuments.exportPDF('${doc.id}')" class="btn-icon btn-icon-success" title="تصدير PDF">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                        <button onclick="LegalDocuments.editDocument('${doc.id}')" class="btn-icon btn-icon-primary" title="تعديل">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="LegalDocuments.deleteDocument('${doc.id}')" class="btn-icon btn-icon-danger" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.bindLegalDocumentsFilterEvents(container);
        const clearEmptyFiltersBtn = document.getElementById('legal-docs-clear-empty-filters');
        if (clearEmptyFiltersBtn) {
            clearEmptyFiltersBtn.addEventListener('click', () => {
                this.resetLegalDocumentFilters();
                this.loadLegalDocumentsList();
            });
        }
    },

    bindTabEvents() {
        const buttons = document.querySelectorAll('.legal-tab-btn');
        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                if (!tab || tab === this.state.activeTab) return;
                this.state.activeTab = tab;
                this.renderTabNavigation();
                this.renderActiveTabContent();
            });
        });
    },

    renderTabNavigation() {
        const buttons = document.querySelectorAll('.legal-tab-btn');
        buttons.forEach((btn) => {
            const tab = btn.getAttribute('data-tab');
            if (tab === this.state.activeTab) {
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-primary', 'active');
            } else {
                btn.classList.remove('btn-primary', 'active');
                btn.classList.add('btn-secondary');
            }
        });
    },

    renderActiveTabContent() {
        const active = this.state.activeTab || 'documents';
        const panels = document.querySelectorAll('.legal-tab-panel');
        panels.forEach((panel) => {
            const panelKey = panel.getAttribute('data-tab-panel');
            panel.style.display = panelKey === active ? 'block' : 'none';
        });

        if (active === 'documents') {
            this.loadLegalDocumentsList();
            this.checkExpiringDocuments();
        } else if (active === 'inventory') {
            this.loadLegalRegisterList();
        }
    },

    setupEventListeners() {
        setTimeout(() => {
            const addBtn = document.getElementById('add-legal-document-btn');
            const addEmptyBtn = document.getElementById('add-legal-document-empty-btn');
            if (addBtn) addBtn.addEventListener('click', () => this.showForm());
            if (addEmptyBtn) addEmptyBtn.addEventListener('click', () => this.showForm());

            const exportExcelBtn = document.getElementById('export-legal-excel-btn');
            if (exportExcelBtn) {
                exportExcelBtn.addEventListener('click', () => this.exportToExcel());
            }

            const checkUpdatesBtn = document.getElementById('check-legal-updates-btn');
            if (checkUpdatesBtn) {
                checkUpdatesBtn.addEventListener('click', () => this.checkLegalUpdates());
            }

            const saveSettingsBtn = document.getElementById('save-legal-settings-btn');
            if (saveSettingsBtn) {
                saveSettingsBtn.addEventListener('click', () => this.saveLegalSettings());
            }

            // أزرار السجل الجديد
            const addInventoryBtn = document.getElementById('add-legal-inventory-btn');
            if (addInventoryBtn) {
                addInventoryBtn.addEventListener('click', () => this.showInventoryForm());
            }

            const addInventoryEmptyBtn = document.getElementById('add-legal-inventory-empty-btn');
            if (addInventoryEmptyBtn) {
                addInventoryEmptyBtn.addEventListener('click', () => this.showInventoryForm());
            }

            const exportInventoryExcelBtn = document.getElementById('export-legal-inventory-excel-btn');
            if (exportInventoryExcelBtn) {
                exportInventoryExcelBtn.addEventListener('click', () => this.exportInventoryToExcel());
            }
        }, 100);
    },

    async showForm(data = null) {
        const isEdit = !!data;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">${isEdit ? 'تعديل مستند قانوني' : 'إضافة مستند قانوني جديد'}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="legal-document-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">اسم المستند *</label>
                                <input type="text" id="legal-doc-name" required class="form-input"
                                    value="${Utils.escapeHTML(data?.documentName || '')}" placeholder="اسم المستند القانوني">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">نوع المستند *</label>
                                <select id="legal-doc-type" required class="form-input">
                                    <option value="">اختر النوع</option>
                                    <option value="ترخيص" ${data?.documentType === 'ترخيص' ? 'selected' : ''}>ترخيص</option>
                                    <option value="شهادة" ${data?.documentType === 'شهادة' ? 'selected' : ''}>شهادة</option>
                                    <option value="عقد" ${data?.documentType === 'عقد' ? 'selected' : ''}>عقد</option>
                                    <option value="وثيقة قانونية" ${data?.documentType === 'وثيقة قانونية' ? 'selected' : ''}>وثيقة قانونية</option>
                                    <option value="تشريع" ${data?.documentType === 'تشريع' ? 'selected' : ''}>تشريع</option>
                                    <option value="لوائح" ${data?.documentType === 'لوائح' ? 'selected' : ''}>لوائح</option>
                                    <option value="أخرى" ${data?.documentType === 'أخرى' ? 'selected' : ''}>أخرى</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">رقم المستند *</label>
                                <input type="text" id="legal-doc-number" required class="form-input"
                                    value="${Utils.escapeHTML(data?.documentNumber || '')}" placeholder="رقم المستند">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الصادر عن *</label>
                                <input type="text" id="legal-doc-issued-by" required class="form-input"
                                    value="${Utils.escapeHTML(data?.issuedBy || '')}" placeholder="الجهة الصادرة">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">المسئول عن متابعة المستند *</label>
                                <input type="text" id="legal-doc-followup-responsible" required class="form-input"
                                    value="${Utils.escapeHTML(data?.followUpResponsible || '')}" placeholder="اسم المسئول عن المتابعة">
                                <p class="text-xs text-gray-500 mt-1">يستخدم في حالات قرب الانتهاء أو انتهاء صلاحية المستند</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الإصدار *</label>
                                <input type="date" id="legal-doc-issue-date" required class="form-input"
                                    value="${data?.issueDate ? new Date(data.issueDate).toISOString().slice(0, 10) : ''}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">تاريخ الانتهاء *</label>
                                <input type="date" id="legal-doc-expiry-date" required class="form-input"
                                    value="${data?.expiryDate ? new Date(data.expiryDate).toISOString().slice(0, 10) : ''}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">عدد أيام التنبيه قبل الانتهاء *</label>
                                <input type="number" id="legal-doc-alert-days" required class="form-input"
                                    value="${data?.alertDays || 30}" min="1" placeholder="30">
                                <p class="text-xs text-gray-500 mt-1">سيتم إرسال تنبيه قبل انتهاء الصلاحية بهذا العدد من الأيام</p>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الحالة *</label>
                                <select id="legal-doc-status" required class="form-input">
                                    <option value="نشط" ${data?.status === 'نشط' || !data ? 'selected' : ''}>نشط</option>
                                    <option value="منتهي" ${data?.status === 'منتهي' ? 'selected' : ''}>منتهي</option>
                                    <option value="ملغي" ${data?.status === 'ملغي' ? 'selected' : ''}>ملغي</option>
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">الوصف / الملاحظات</label>
                                <textarea id="legal-doc-description" class="form-input" rows="4"
                                    placeholder="وصف المستند أو ملاحظات إضافية">${Utils.escapeHTML(data?.description || '')}</textarea>
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-link ml-2"></i>
                                    رابط المستند (إن وجد)
                                </label>
                                <input type="url" id="legal-doc-link" class="form-input"
                                    value="${Utils.escapeHTML(data?.documentLink || '')}" placeholder="https://example.com/document">
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    <i class="fas fa-image ml-2"></i>
                                    صورة المستند (غير إلزامي)
                                </label>
                                <input type="file" id="legal-doc-image-input" accept="image/*" class="form-input">
                                <p class="text-xs text-gray-500 mt-1">الحد الأقصى لحجم الصورة 5MB. الصيغ المدعومة: JPG, PNG, GIF</p>
                                <div id="legal-doc-image-preview" class="mt-2 ${data?.documentImage ? '' : 'hidden'}">
                                    <img src="${data?.documentImage || ''}" alt="صورة المستند" class="w-48 h-48 object-cover rounded border mt-2" id="legal-doc-image-img">
                                    <button type="button" onclick="document.getElementById('legal-doc-image-input').value=''; document.getElementById('legal-doc-image-preview').classList.add('hidden');" class="mt-1 text-xs text-red-600 hover:text-red-800">
                                        <i class="fas fa-trash ml-1"></i>حذف الصورة
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${isEdit ? 'حفظ التعديلات' : 'إضافة المستند'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const form = modal.querySelector('#legal-document-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(data?.id, modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Setup image preview
        setTimeout(() => {
            const imageInput = document.getElementById('legal-doc-image-input');
            const imagePreview = document.getElementById('legal-doc-image-preview');
            const imageImg = document.getElementById('legal-doc-image-img');
            if (imageInput && imagePreview && imageImg) {
                imageInput.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                            Notification.error('حجم الصورة كبير جداً. الحد الأقصى 5MB');
                            imageInput.value = '';
                            return;
                        }
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            imageImg.src = e.target.result;
                            imagePreview.classList.remove('hidden');
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        }, 100);
    },

    async convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    async handleSubmit(editId, modal) {
        if (!AppState.appData.legalDocuments) {
            AppState.appData.legalDocuments = [];
        }

        // Helper function to safely get element value
        const getElementValue = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : '';
        };

        const getElementValueOrNull = (id) => {
            const element = document.getElementById(id);
            return element ? element.value : null;
        };

        const issueDateElement = document.getElementById('legal-doc-issue-date');
        const expiryDateElement = document.getElementById('legal-doc-expiry-date');
        let issueDateISO, expiryDateISO;
        
        if (issueDateElement && issueDateElement.value) {
            try {
                issueDateISO = new Date(issueDateElement.value).toISOString();
            } catch (error) {
                issueDateISO = new Date().toISOString();
            }
        } else {
            issueDateISO = new Date().toISOString();
        }

        if (expiryDateElement && expiryDateElement.value) {
            try {
                expiryDateISO = new Date(expiryDateElement.value).toISOString();
            } catch (error) {
                expiryDateISO = new Date().toISOString();
            }
        } else {
            expiryDateISO = new Date().toISOString();
        }

        const alertDaysElement = document.getElementById('legal-doc-alert-days');
        const alertDays = alertDaysElement && alertDaysElement.value ? parseInt(alertDaysElement.value) : 30;

        // معالجة الصورة
        let documentImage = editId
            ? (AppState.appData.legalDocuments.find(d => d.id === editId)?.documentImage || '')
            : '';
        const imageInput = document.getElementById('legal-doc-image-input');
        if (imageInput && imageInput.files.length > 0) {
            const file = imageInput.files[0];
            if (file.size > 5 * 1024 * 1024) {
                Notification.error('حجم الصورة كبير جداً. الحد الأقصى 5MB');
                return;
            }
            try {
                documentImage = await this.convertImageToBase64(file);
            } catch (error) {
                Notification.error('حدث خطأ في تحميل الصورة: ' + error.message);
                return;
            }
        }

        const formData = {
            id: editId || Utils.generateId('LEGAL'),
            isoCode: generateISOCode('LEGAL', AppState.appData.legalDocuments),
            documentName: getElementValue('legal-doc-name'),
            documentType: getElementValue('legal-doc-type'),
            documentNumber: getElementValue('legal-doc-number'),
            issuedBy: getElementValue('legal-doc-issued-by'),
            followUpResponsible: getElementValue('legal-doc-followup-responsible'),
            issueDate: issueDateISO,
            expiryDate: expiryDateISO,
            alertDays: alertDays,
            status: getElementValue('legal-doc-status'),
            description: getElementValue('legal-doc-description'),
            documentLink: getElementValue('legal-doc-link'),
            documentImage: documentImage,
            createdAt: editId ? AppState.appData.legalDocuments?.find(d => d.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        Loading.show();
        try {
            if (editId) {
                const index = AppState.appData.legalDocuments.findIndex(d => d.id === editId);
                if (index !== -1) {
                    AppState.appData.legalDocuments[index] = formData;
                    Notification.success('تم تحديث المستند بنجاح');
                }
            } else {
                AppState.appData.legalDocuments.push(formData);
                Notification.success('تم إضافة المستند بنجاح');
            }

            // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
            await GoogleIntegration.autoSave('LegalDocuments', AppState.appData.legalDocuments);

            Loading.hide();
            modal.remove();
            this.load();
            // تحديث كروت الإحصائيات
            setTimeout(() => this.updateStatisticsCards(), 100);
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async editDocument(id) {
        const document = AppState.appData.legalDocuments?.find(d => d.id === id);
        if (document) await this.showForm(document);
    },

    async viewDocument(id) {
        const doc = AppState.appData.legalDocuments?.find(d => d.id === id);
        if (!doc) {
            Notification.error('المستند غير موجود');
            return;
        }

        const expiryDate = new Date(doc.expiryDate);
        const today = new Date();
        const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        const isExpired = expiryDate < today;
        const isExpiringSoon = daysRemaining <= doc.alertDays && daysRemaining > 0;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${Utils.escapeHTML(doc.documentName || '')}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm font-semibold text-gray-600">كود ISO:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(doc.isoCode || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">نوع المستند:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(doc.documentType || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">رقم المستند:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(doc.documentNumber || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الصادر عن:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(doc.issuedBy || '')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">المسئول عن المتابعة:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(doc.followUpResponsible || '-')}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">تاريخ الإصدار:</label>
                                <p class="text-gray-800">${doc.issueDate ? Utils.formatDate(doc.issueDate) : '-'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">تاريخ الانتهاء:</label>
                                <p class="text-gray-800">${doc.expiryDate ? Utils.formatDate(doc.expiryDate) : '-'}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">مدة الصلاحية المتبقية:</label>
                                <p class="text-gray-800 ${isExpired ? 'text-red-600 font-bold' : isExpiringSoon ? 'text-yellow-600 font-bold' : 'text-green-600'}">
                                    ${isExpired ? 'منتهي' : `${daysRemaining} يوم`}
                                </p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الحالة:</label>
                                <span class="badge badge-${isExpired ? 'danger' : isExpiringSoon ? 'warning' : 'success'}">
                                    ${doc.status || '-'}
                                </span>
                            </div>
                        </div>
                        ${doc.description ? `
                            <div>
                                <label class="text-sm font-semibold text-gray-600">الوصف:</label>
                                <p class="text-gray-800 whitespace-pre-wrap">${Utils.escapeHTML(doc.description)}</p>
                            </div>
                        ` : ''}
                        ${doc.documentLink ? `
                            <div>
                                <label class="text-sm font-semibold text-gray-600">رابط المستند:</label>
                                <a href="${Utils.escapeHTML(doc.documentLink)}" target="_blank" class="text-blue-600 hover:underline">
                                    ${Utils.escapeHTML(doc.documentLink)}
                                    <i class="fas fa-external-link-alt mr-2"></i>
                                </a>
                            </div>
                        ` : ''}
                        ${doc.documentImage ? `
                            <div>
                                <label class="text-sm font-semibold text-gray-600 mb-2">صورة المستند:</label>
                                <div class="mt-2">
                                    ${(() => {
                                        const pu = this.processPhoto(doc.documentImage);
                                        const disp = pu && typeof Utils.resolveDriveAwareImgDisplay === 'function'
                                            ? Utils.resolveDriveAwareImgDisplay(pu)
                                            : { canonical: pu || '', displaySrc: pu || '', needsProxy: false, proxyFileId: '' };
                                        const pa = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(disp) : '';
                                        return `<img src="${Utils.escapeHTML(disp.displaySrc)}" alt="صورة المستند"${pa} class="legal-doc-view-img max-w-full h-auto rounded border shadow-sm" style="max-height: 400px;"
                                         onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';">`;
                                    })()}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إغلاق</button>
                    ${typeof EmailDispatch !== 'undefined' ? EmailDispatch.renderFooterButtonHtml('legal-documents') : ''}
                    <button class="btn-success" onclick="LegalDocuments.exportPDF('${doc.id}');">
                        <i class="fas fa-file-pdf ml-2"></i>تصدير PDF
                    </button>
                    <button class="btn-primary" onclick="LegalDocuments.editDocument('${doc.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>تعديل
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        if (typeof EmailDispatch !== 'undefined') {
            EmailDispatch.bindFooterButtons(modal, { moduleKey: 'legal-documents', record: doc, recordId: doc.id || doc.isoCode || '' });
        }
        if (typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal, {
                onFetchFail: (img) => {
                    try {
                        img.onerror = null;
                        img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';
                    } catch (e) { /* ignore */ }
                }
            });
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    async deleteDocument(id) {
        if (!confirm('هل أنت متأكد من حذف هذا المستند؟')) return;
        Loading.show();
        try {
            AppState.appData.legalDocuments = AppState.appData.legalDocuments.filter(d => d.id !== id);
            // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
            Loading.hide();
            Notification.success('تم حذف المستند بنجاح');
            this.load();
            // تحديث كروت الإحصائيات
            setTimeout(() => this.updateStatisticsCards(), 100);
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
        }
    },

    async exportPDF(id) {
        const doc = AppState.appData.legalDocuments?.find(d => d.id === id);
        if (!doc) {
            Notification.error('المستند غير موجود');
            return;
        }

        try {
            Loading.show();

            const formCode = doc.isoCode || doc.documentNumber || doc.id?.substring(0, 12) || 'LEGAL-UNKNOWN';
            const formTitle = 'المستند القانوني';

            const expiryDate = new Date(doc.expiryDate);
            const today = new Date();
            const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            const isExpired = expiryDate < today;
            const isExpiringSoon = daysRemaining <= doc.alertDays && daysRemaining > 0;

            const content = `
                <table>
                    <tr><th>كود ISO</th><td>${Utils.escapeHTML(doc.isoCode || 'N/A')}</td></tr>
                    <tr><th>اسم المستند</th><td>${Utils.escapeHTML(doc.documentName || 'N/A')}</td></tr>
                    <tr><th>نوع المستند</th><td>${Utils.escapeHTML(doc.documentType || 'N/A')}</td></tr>
                    <tr><th>رقم المستند</th><td>${Utils.escapeHTML(doc.documentNumber || 'N/A')}</td></tr>
                    <tr><th>الصادر عن</th><td>${Utils.escapeHTML(doc.issuedBy || 'N/A')}</td></tr>
                    <tr><th>المسئول عن المتابعة</th><td>${Utils.escapeHTML(doc.followUpResponsible || 'N/A')}</td></tr>
                    <tr><th>تاريخ الإصدار</th><td>${doc.issueDate ? Utils.formatDate(doc.issueDate) : 'N/A'}</td></tr>
                    <tr><th>تاريخ الانتهاء</th><td>${doc.expiryDate ? Utils.formatDate(doc.expiryDate) : 'N/A'}</td></tr>
                    <tr><th>مدة الصلاحية المتبقية</th><td class="${isExpired ? 'text-red-600 font-bold' : isExpiringSoon ? 'text-yellow-600 font-bold' : 'text-green-600'}">${isExpired ? 'منتهي' : `${daysRemaining} يوم`}</td></tr>
                    <tr><th>الحالة</th><td>${Utils.escapeHTML(doc.status || 'N/A')}</td></tr>
                </table>
                ${doc.description ? `
                    <div class="section-title">الوصف:</div>
                    <div class="description">${Utils.escapeHTML(doc.description)}</div>
                ` : ''}
                ${doc.documentLink ? `
                    <div class="section-title">رابط المستند:</div>
                    <div class="description"><a href="${Utils.escapeHTML(doc.documentLink)}" target="_blank">${Utils.escapeHTML(doc.documentLink)}</a></div>
                ` : ''}
                ${(() => {
                    const imageUrl = this.processPhoto(doc.documentImage);
                    return imageUrl ? `
                    <div class="section-title">صورة المستند:</div>
                    <div class="description">
                        <img src="${Utils.escapeHTML(imageUrl)}" alt="صورة المستند" style="max-width: 100%; max-height: 400px; border: 1px solid #ddd; border-radius: 4px;"
                             onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3Eلا توجد صورة%3C/text%3E%3C/svg%3E';">
                    </div>
                ` : '';})()}
            `;

            const htmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
                ? FormHeader.generatePDFHTML(formCode, formTitle, content, true, true)
                : `<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><style>@page { size: A4 portrait; margin: 1cm; } @media print { @page { size: A4 portrait; margin: 1cm; } body { padding: 0; } }</style><title>المستندات القانونية</title></head><body>${content}</body></html>`;

            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const printWindow = window.open(url, '_blank');

            if (printWindow) {
                printWindow.onload = () => {
                    setTimeout(() => {
                        printWindow.print();
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                            Loading.hide();
                            Notification.success('تم تحويل التقرير للطباعة/الحفظ كـ PDF');
                        }, 1000);
                    }, 500);
                };
            } else {
                Loading.hide();
                Notification.error('يرجى السماح للنواذ المنبثقة لعرض التقرير');
            }
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير PDF:', error);
            Notification.error('فشل تصدير PDF: ' + error.message);
        }
    },

    async exportToExcel() {
        try {
            Loading.show();

            if (typeof XLSX === 'undefined') {
                Loading.hide();
                Notification.error('مكتبة SheetJS غير محمّلة. يرجى تحديث الصفحة');
                return;
            }

            const documents = AppState.appData.legalDocuments || [];

            const excelData = documents.map(doc => {
                const expiryDate = new Date(doc.expiryDate);
                const today = new Date();
                const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                const isExpired = expiryDate < today;

                return {
                    'كود ISO': doc.isoCode || '',
                    'اسم المستند': doc.documentName || '',
                    'نوع المستند': doc.documentType || '',
                    'رقم المستند': doc.documentNumber || '',
                    'الصادر عن': doc.issuedBy || '',
                    'المسئول عن المتابعة': doc.followUpResponsible || '',
                    'تاريخ الإصدار': doc.issueDate ? Utils.formatDate(doc.issueDate) : '',
                    'تاريخ الانتهاء': doc.expiryDate ? Utils.formatDate(doc.expiryDate) : '',
                    'مدة الصلاحية المتبقية': isExpired ? 'منتهي' : `${daysRemaining} يوم`,
                    'الحالة': doc.status || '',
                    'تاريخ الإنشاء': doc.createdAt ? Utils.formatDate(doc.createdAt) : ''
                };
            });

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);

            ws['!cols'] = [
                { wch: 15 }, { wch: 30 }, { wch: 20 }, { wch: 20 }, { wch: 25 },
                { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 15 }
            ];

            XLSX.utils.book_append_sheet(wb, ws, 'المستندات القانونية');

            const date = new Date().toISOString().slice(0, 10);
            const filename = `سجل_المستندات_القانونية_${date}.xlsx`;

            XLSX.writeFile(wb, filename);

            Loading.hide();
            Notification.success('تم تصدير سجل المستندات القانونية بنجاح');
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في تصدير Excel:', error);
            Notification.error('شل تصدير Excel: ' + error.message);
        }
    },

    checkExpiringDocuments() {
        const documents = AppState.appData.legalDocuments || [];
        const today = new Date();
        const alerts = [];

        documents.forEach(doc => {
            if (doc.status === 'نشط' && doc.expiryDate) {
                const expiryDate = new Date(doc.expiryDate);
                const daysRemaining = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

                if (daysRemaining <= doc.alertDays && daysRemaining > 0) {
                    alerts.push({
                        type: 'warning',
                        message: `مستند قانوني "${doc.documentName}" سينتهي خلال ${daysRemaining} يوم`
                    });
                } else if (daysRemaining <= 0) {
                    alerts.push({
                        type: 'critical',
                        message: `مستند قانوني "${doc.documentName}" منتهي صلاحيته!`
                    });
                }
            }
        });

        // إرسال إشعارات للإيميلات المسجلة
        if (alerts.length > 0 && AppState.notificationEmails && AppState.notificationEmails.length > 0) {
            this.sendEmailNotifications(alerts);
        }

        // عرض الإشعارات للمستخدم
        alerts.forEach(alert => {
            if (alert.type === 'critical') {
                Notification.error(alert.message);
            } else {
                Notification.warning(alert.message);
            }
        });
    },

    async sendEmailNotifications(alerts) {
        if (typeof EmailDispatch !== 'undefined') {
            const allowed = await EmailDispatch.ensureCanManualSend('legal-documents');
            if (allowed) {
                const firstAlert = Array.isArray(alerts) ? alerts[0] : alerts;
                const record = firstAlert && typeof firstAlert === 'object' ? firstAlert : {};
                EmailDispatch.openSendModal({
                    moduleKey: 'legal-documents',
                    recordId: record.id || record.isoCode || record.documentId || '',
                    title: EmailDispatch.getModuleLabel('legal-documents'),
                    fields: EmailDispatch.fieldsFromRecord('legal-documents', record)
                });
                return;
            }
        }
        if (typeof Notification !== 'undefined') {
            Notification.warning('استخدم زر إرسال البريد من شاشة تفاصيل المستند، أو فعّل الإرسال في إعدادات البريد.');
        }
    },

    async checkLegalUpdates() {
        Loading.show();
        try {
            const portalUrl = document.getElementById('legal-portal-url')?.value || AppState.legalPortalUrl;
            const keywords = (document.getElementById('legal-keywords')?.value || '').split(',').map(k => k.trim()).filter(k => k);

            if (!portalUrl) {
                Loading.hide();
                Notification.warning('يرجى إدخال رابط بوابة التشريعات أولاً');
                return;
            }

            // في الإنتاج، يجب إجراء فحص على من البوابة
            // هنا سنعرض فقط إشعار تجريبي
            await new Promise(resolve => setTimeout(resolve, 1500));

            Loading.hide();
            Notification.success(`تم التحقق من التحديثات القانونية. ${keywords.length > 0 ? `تم البحث عن: ${keywords.join(', ')}` : 'لم يتم تحديد كلمات متاحية'}`);

            // يمكن إضافة منطق علي للتحقق من التحديثات هنا
            // مثل: استدعاء API أو فحص صحة ويب

        } catch (error) {
            Loading.hide();
            Notification.error('فشل التحقق من التحديثات: ' + error.message);
        }
    },

    saveLegalSettings() {
        const portalUrl = document.getElementById('legal-portal-url')?.value.trim();
        const keywordsText = document.getElementById('legal-keywords')?.value || '';
        const autoNotify = document.getElementById('legal-auto-notify')?.checked || false;

        AppState.legalPortalUrl = portalUrl;
        AppState.legalKeywords = keywordsText.split(',').map(k => k.trim()).filter(k => k);
        AppState.legalAutoNotify = autoNotify;

        // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }
        Notification.success('تم حفظ إعدادات متابعة التحديثات القانونية بنجاح');
    },

    LEGAL_LAW_TYPES: [
        { value: 'law', label: 'قانون' },
        { value: 'regulation', label: 'لائحة / قرار وزاري' },
        { value: 'decree', label: 'مرسوم' },
        { value: 'standard', label: 'مواصفة قياسية' },
        { value: 'code', label: 'كود / دليل' },
        { value: 'other', label: 'أخرى' }
    ],

    LEGAL_REGISTER_STATUSES: [
        { value: 'applicable', label: 'نافذ', color: 'green' },
        { value: 'amended', label: 'معدل', color: 'amber' },
        { value: 'repealed', label: 'ملغي', color: 'red' },
        { value: 'pending', label: 'قيد الإصدار', color: 'blue' }
    ],

    LEGAL_PRIORITIES: [
        { value: 'high', label: 'عالية', color: 'red' },
        { value: 'medium', label: 'متوسطة', color: 'amber' },
        { value: 'low', label: 'منخفضة', color: 'green' }
    ],

    LEGAL_REGISTER_CATEGORIES: [
        { value: 'labor', label: 'قوانين العمل' },
        { value: 'safety', label: 'السلامة والصحة المهنية' },
        { value: 'environment', label: 'البيئة' },
        { value: 'civil_defense', label: 'الدفاع المدني والحريق' },
        { value: 'social_insurance', label: 'التأمينات الاجتماعية' },
        { value: 'tax', label: 'الضرائب' },
        { value: 'municipal', label: 'القوانين البلدية' },
        { value: 'industry', label: 'القوانين الصناعية' },
        { value: 'quality', label: 'الجودة والمواصفات' },
        { value: 'other', label: 'أخرى' }
    ],

    getLegalRegisterStats() {
        const items = AppState.appData.legalRegister || [];
        let applicable = 0, amended = 0, repealed = 0, pending = 0;
        let high = 0, medium = 0, low = 0;
        let withAmendments = 0;
        items.forEach(r => {
            const s = r.status || '';
            if (s === 'applicable') applicable++;
            else if (s === 'amended') amended++;
            else if (s === 'repealed') repealed++;
            else if (s === 'pending') pending++;
            const p = r.priority || '';
            if (p === 'high') high++;
            else if (p === 'medium') medium++;
            else if (p === 'low') low++;
            let amds = r.amendments;
            if (typeof amds === 'string') { try { amds = JSON.parse(amds); } catch (e) { amds = []; } }
            if (Array.isArray(amds) && amds.length > 0) withAmendments++;
        });
        const total = items.length;
        const complianceRate = total > 0 ? Math.round(((applicable + amended) / total) * 100) : 0;
        return { total, applicable, amended, repealed, pending, high, medium, low, withAmendments, complianceRate };
    },


    loadLegalRegisterList() {
        const container = document.getElementById('lr-container');
        if (!container) return;

        const stats = this.getLegalRegisterStats();
        const ids = ['lr-total-count', 'lr-applicable-count', 'lr-amended-count', 'lr-repealed-count', 'lr-compliance-rate'];
        const vals = [stats.total, stats.applicable, stats.amended, stats.repealed, stats.complianceRate + '%'];
        ids.forEach((id, i) => { const el = document.getElementById(id); if (el) el.textContent = vals[i]; });

        let items = AppState.appData.legalRegister || [];
        const catFilter = document.getElementById('lr-category-filter');
        const statusFilter = document.getElementById('lr-status-filter');
        const priorityFilter = document.getElementById('lr-priority-filter');
        const searchInput = document.getElementById('lr-search');

        if (catFilter && catFilter.value) items = items.filter(r => r.category === catFilter.value);
        if (statusFilter && statusFilter.value) items = items.filter(r => r.status === statusFilter.value);
        if (priorityFilter && priorityFilter.value) items = items.filter(r => r.priority === priorityFilter.value);
        if (searchInput && searchInput.value.trim()) {
            const q = searchInput.value.trim().toLowerCase();
            items = items.filter(r =>
                (r.title || '').toLowerCase().includes(q) ||
                (r.legalReference || '').toLowerCase().includes(q) ||
                (r.issuingAuthority || '').toLowerCase().includes(q) ||
                (r.lawNumber || '').toLowerCase().includes(q)
            );
        }

        if (items.length === 0) {
            container.innerHTML = '<div class="text-center py-8 text-gray-500"><i class="fas fa-balance-scale text-4xl mb-3 text-gray-300"></i><p>لا توجد تشريعات مسجلة</p></div>';
            this._bindLegalRegisterEvents();
            return;
        }

        const statusBadge = (status) => {
            const map = {
                'applicable': '<span class="lr-badge lr-badge-green">نافذ</span>',
                'amended': '<span class="lr-badge lr-badge-amber">معدل</span>',
                'repealed': '<span class="lr-badge lr-badge-red">ملغي</span>',
                'pending': '<span class="lr-badge lr-badge-blue">قيد الإصدار</span>'
            };
            return map[status] || '<span class="lr-badge lr-badge-gray">—</span>';
        };

        const priorityBadge = (priority) => {
            const map = {
                'high': '<span class="lr-priority lr-priority-high">عالية</span>',
                'medium': '<span class="lr-priority lr-priority-medium">متوسطة</span>',
                'low': '<span class="lr-priority lr-priority-low">منخفضة</span>'
            };
            return map[priority] || '<span class="lr-priority">—</span>';
        };

        const lawTypeLabel = (type) => {
            const found = this.LEGAL_LAW_TYPES.find(t => t.value === type);
            return found ? found.label : type || '—';
        };

        const countAmendments = (record) => {
            let amds = record.amendments;
            if (typeof amds === 'string') { try { amds = JSON.parse(amds); } catch (e) { amds = []; } }
            return Array.isArray(amds) ? amds.length : 0;
        };

        const rows = items.map(r => {
            const amdCount = countAmendments(r);
            return `
            <tr>
                <td class="text-sm font-mono text-gray-500">${r.id || '—'}</td>
                <td class="text-sm font-medium">${r.title || '—'}</td>
                <td class="text-sm text-gray-600">${r.issuingAuthority || '—'}</td>
                <td class="text-sm text-gray-600">${lawTypeLabel(r.lawType)} ${r.lawNumber ? 'رقم ' + r.lawNumber : ''} ${r.lawYear ? '(' + r.lawYear + ')' : ''}</td>
                <td class="text-sm text-gray-600">${r.legalReference || '—'}</td>
                <td>${statusBadge(r.status)}</td>
                <td>${priorityBadge(r.priority)}</td>
                <td class="text-sm text-center">${r.issueDate || '—'}</td>
                <td class="text-sm text-center">
                    <button class="lr-amd-btn" onclick="LegalDocuments.showLegalAmendments('${r.id}')" title="عرض التحديثات القانونية">
                        <i class="fas fa-history"></i>
                        ${amdCount > 0 ? `<span class="lr-amd-badge">${amdCount}</span>` : ''}
                    </button>
                </td>
                <td>
                    <div class="flex items-center gap-1">
                        <button class="btn-icon btn-sm" onclick="LegalDocuments.showLegalRegisterForm('${r.id}')" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-sm text-red-600" onclick="LegalDocuments.deleteLegalRegisterRecord('${r.id}')" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        container.innerHTML = `
            <div style="overflow-x: auto;">
                <table class="data-table lr-data-table">
                    <thead>
                        <tr>
                            <th>المعرف</th>
                            <th>التشريع / القانون</th>
                            <th>جهة الإصدار</th>
                            <th>النوع / الرقم</th>
                            <th>المرجع</th>
                            <th>الحالة</th>
                            <th>الأولوية</th>
                            <th>تاريخ الإصدار</th>
                            <th>التحديثات</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
        this._bindLegalRegisterEvents();
    },

    _bindLegalRegisterEvents() {
        const catFilter = document.getElementById('lr-category-filter');
        const statusFilter = document.getElementById('lr-status-filter');
        const priorityFilter = document.getElementById('lr-priority-filter');
        const searchInput = document.getElementById('lr-search');
        const resetBtn = document.getElementById('lr-reset-filter-btn');
        const addBtn = document.getElementById('lr-add-btn');

        const reload = () => this.loadLegalRegisterList();

        if (catFilter) catFilter.onchange = reload;
        if (statusFilter) statusFilter.onchange = reload;
        if (priorityFilter) priorityFilter.onchange = reload;
        if (searchInput) searchInput.oninput = Utils.debounce ? Utils.debounce(reload, 300) : reload;
        if (resetBtn) resetBtn.onclick = () => {
            if (catFilter) catFilter.value = '';
            if (statusFilter) statusFilter.value = '';
            if (priorityFilter) priorityFilter.value = '';
            if (searchInput) searchInput.value = '';
            reload();
        };
        if (addBtn) addBtn.onclick = () => this.showLegalRegisterForm();
    },

    showLegalRegisterForm(editId) {
        this.ensureData();
        let existing = null;
        if (editId) existing = (AppState.appData.legalRegister || []).find(r => r.id === editId);
        const isEdit = !!existing;
        const val = (f, def) => (existing && existing[f] != null) ? existing[f] : (def || '');

        const lawTypeOpts = '<option value="">اختر النوع</option>' + this.LEGAL_LAW_TYPES.map(t =>
            `<option value="${t.value}" ${val('lawType') === t.value ? 'selected' : ''}>${t.label}</option>`
        ).join('');

        const statusOpts = this.LEGAL_REGISTER_STATUSES.map(s =>
            `<option value="${s.value}" ${val('status', 'applicable') === s.value ? 'selected' : ''}>${s.label}</option>`
        ).join('');

        const priorityOpts = this.LEGAL_PRIORITIES.map(p =>
            `<option value="${p.value}" ${val('priority', 'medium') === p.value ? 'selected' : ''}>${p.label}</option>`
        ).join('');

        const catOpts = '<option value="">اختر التصنيف</option>' + this.LEGAL_REGISTER_CATEGORIES.map(c =>
            `<option value="${c.value}" ${val('category') === c.value ? 'selected' : ''}>${c.label}</option>`
        ).join('');

        const html = `
            <div class="modal-overlay active" id="lr-modal">
                <div class="modal-content" style="max-width: 860px; max-height: 92vh; overflow-y: auto;">
                    <div class="lr-modal-header">
                        <h3><i class="fas fa-balance-scale"></i>${isEdit ? 'تعديل' : 'إضافة'} سجل تشريع وقانون</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="lr-form" onsubmit="LegalDocuments.handleLegalRegisterSubmit(event)">
                        <input type="hidden" id="lr-edit-id" value="${editId || ''}">
                        <div class="modal-body">
                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-info-circle"></i>معلومات أساسية</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group col-span-2">
                                        <label class="form-label">عنوان التشريع / القانون <span class="text-red-500">*</span></label>
                                        <input type="text" id="lr-title" class="form-input" value="${val('title')}" required placeholder="مثال: قانون العمل رقم 12 لسنة 2003">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">جهة الإصدار <span class="text-red-500">*</span></label>
                                        <input type="text" id="lr-issuingAuthority" class="form-input" value="${val('issuingAuthority')}" required placeholder="مثال: وزارة القوى العاملة">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">نوع التشريع <span class="text-red-500">*</span></label>
                                        <select id="lr-lawType" class="form-input" required>${lawTypeOpts}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">رقم القانون / القرار</label>
                                        <input type="text" id="lr-lawNumber" class="form-input" value="${val('lawNumber')}" placeholder="مثال: 12">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">سنة الإصدار</label>
                                        <input type="text" id="lr-lawYear" class="form-input" value="${val('lawYear')}" placeholder="مثال: 2003">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">التصنيف <span class="text-red-500">*</span></label>
                                        <select id="lr-category" class="form-input" required>${catOpts}</select>
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-calendar-alt"></i>التواريخ</div>
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">تاريخ الإصدار</label>
                                        <input type="date" id="lr-issueDate" class="form-input" value="${val('issueDate')}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">تاريخ النفاذ</label>
                                        <input type="date" id="lr-effectiveDate" class="form-input" value="${val('effectiveDate')}">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">تاريخ المراجعة القادم</label>
                                        <input type="date" id="lr-nextReviewDate" class="form-input" value="${val('nextReviewDate')}">
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-file-alt"></i>التفاصيل القانونية</div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">المرجع القانوني</label>
                                        <input type="text" id="lr-legalReference" class="form-input" value="${val('legalReference')}" placeholder="مثال: قانون العمل">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">المواد / البنود</label>
                                        <input type="text" id="lr-legalArticles" class="form-input" value="${val('legalArticles')}" placeholder="مثال: 208، 209، 210">
                                    </div>
                                    <div class="form-group col-span-2">
                                        <label class="form-label">نطاق التطبيق</label>
                                        <input type="text" id="lr-scopeOfApplication" class="form-input" value="${val('scopeOfApplication')}" placeholder="مثال: جميع المنشآت الخاضعة للقانون">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">الجهة المسؤولة</label>
                                        <input type="text" id="lr-responsibleDepartment" class="form-input" value="${val('responsibleDepartment')}" placeholder="مثال: إدارة الموارد البشرية">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">الأولوية</label>
                                        <select id="lr-priority" class="form-input">${priorityOpts}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">الحالة</label>
                                        <select id="lr-status" class="form-input">${statusOpts}</select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">تاريخ المراجعة القادم</label>
                                        <input type="date" id="lr-nextReviewDate2" class="form-input" value="${val('nextReviewDate')}">
                                    </div>
                                </div>
                            </div>

                            <div class="lr-form-section">
                                <div class="section-title"><i class="fas fa-align-left"></i>ملخص وملاحظات</div>
                                <div class="form-group">
                                    <textarea id="lr-summary" class="form-input" rows="3" placeholder="ملخص التشريع ومتطلباته">${val('summary')}</textarea>
                                </div>
                                <div class="form-group" style="margin-top: 12px;">
                                    <textarea id="lr-notes" class="form-input" rows="2" placeholder="ملاحظات إضافية">${val('notes')}</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('lr-modal').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${isEdit ? 'حفظ التعديلات' : 'إضافة التشريع'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const existingModal = document.getElementById('lr-modal');
        if (existingModal) existingModal.remove();
        document.body.insertAdjacentHTML('beforeend', html);
    },

    async handleLegalRegisterSubmit(e) {
        e.preventDefault();
        const editId = document.getElementById('lr-edit-id')?.value;
        const isEdit = !!editId;

        const g = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };

        const data = {
            title: g('lr-title'),
            issuingAuthority: g('lr-issuingAuthority'),
            lawType: g('lr-lawType'),
            lawNumber: g('lr-lawNumber'),
            lawYear: g('lr-lawYear'),
            category: g('lr-category'),
            issueDate: g('lr-issueDate'),
            effectiveDate: g('lr-effectiveDate'),
            nextReviewDate: g('lr-nextReviewDate') || g('lr-nextReviewDate2'),
            legalReference: g('lr-legalReference'),
            legalArticles: g('lr-legalArticles'),
            scopeOfApplication: g('lr-scopeOfApplication'),
            responsibleDepartment: g('lr-responsibleDepartment'),
            priority: g('lr-priority'),
            status: g('lr-status'),
            summary: g('lr-summary'),
            notes: g('lr-notes')
        };

        if (!data.title || !data.issuingAuthority || !data.lawType || !data.category) {
            if (typeof Notification !== 'undefined' && Notification.error)
                Notification.error('يرجى ملء الحقول المطلوبة: العنوان، جهة الإصدار، النوع، التصنيف');
            return;
        }

        const modal = document.getElementById('lr-modal');

        try {
            if (isEdit) {
                data.id = editId;
                data.updatedAt = new Date().toISOString();
                const items = AppState.appData.legalRegister || [];
                const idx = items.findIndex(r => r.id === editId);
                if (idx !== -1) {
                    const existingAmendments = items[idx].amendments || [];
                    data.amendments = existingAmendments;
                    Object.assign(items[idx], data);
                    this._legalRegisterLocalSaveTime = Date.now();
                }
                if (modal) modal.remove();
                this.loadLegalRegisterList();
                if (typeof Notification !== 'undefined' && Notification.success)
                    Notification.success('تم تحديث السجل القانوني بنجاح');
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                    GoogleIntegration.sendRequest({
                        action: 'updateLegalRegister',
                        data: { registerId: editId, updateData: data }
                    }).catch(() => {});
                }
            } else {
                data.createdAt = new Date().toISOString();
                data.updatedAt = data.createdAt;
                data.amendments = [];
                if (!AppState.appData.legalRegister) AppState.appData.legalRegister = [];
                const tempId = 'LR-LOCAL-' + Date.now();
                data.id = tempId;
                AppState.appData.legalRegister.unshift(data);
                this._legalRegisterLocalSaveTime = Date.now();
                if (modal) modal.remove();
                this.loadLegalRegisterList();
                if (typeof Notification !== 'undefined' && Notification.success)
                    Notification.success('جاري حفظ السجل القانوني...');
                if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                    const serverData = Object.assign({}, data);
                    delete serverData.id;
                    GoogleIntegration.sendRequest({
                        action: 'addLegalRegister',
                        data: serverData
                    }).then(resp => {
                        if (resp && resp.success && resp.data && resp.data.id) {
                            const items = AppState.appData.legalRegister || [];
                            const localIdx = items.findIndex(r => r.id === tempId);
                            if (localIdx !== -1) items[localIdx].id = resp.data.id;
                            if (typeof Notification !== 'undefined' && Notification.success)
                                Notification.success('تم حفظ السجل القانوني بنجاح ✅');
                        }
                    }).catch(err => Utils.safeWarn('⚠️ خطأ في حفظ السجل القانوني:', err));
                }
            }
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) window.DataManager.save();
        } catch (error) {
            Utils.safeError('❌ خطأ في حفظ السجل القانوني:', error);
            if (typeof Notification !== 'undefined' && Notification.error)
                Notification.error('حدث خطأ أثناء الحفظ');
        }
    },

    async deleteLegalRegisterRecord(registerId) {
        if (!confirm('هل أنت متأكد من حذف هذا السجل القانوني؟')) return;
        try {
            const items = AppState.appData.legalRegister || [];
            AppState.appData.legalRegister = items.filter(r => r.id !== registerId);
            this._legalRegisterLocalSaveTime = Date.now();
            if (typeof DataManager !== 'undefined' && DataManager.save) DataManager.save();
            this.loadLegalRegisterList();
            if (typeof Notification !== 'undefined' && Notification.success)
                Notification.success('تم حذف السجل القانوني');
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
                GoogleIntegration.sendRequest({
                    action: 'deleteLegalRegister',
                    data: { registerId }
                }).catch(err => Utils.safeWarn('⚠️ تعذر حذف السجل القانوني من الخادم:', err));
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في حذف السجل القانوني:', error);
        }
    },

    // آلية التحديثات القانونية (Amendments)

    showLegalAmendments(registerId) {
        this.ensureData();
        const record = (AppState.appData.legalRegister || []).find(r => r.id === registerId);
        if (!record) { if (typeof Notification !== 'undefined' && Notification.error) Notification.error('السجل القانوني غير موجود'); return; }

        let amendments = record.amendments;
        if (typeof amendments === 'string') { try { amendments = JSON.parse(amendments); } catch (e) { amendments = []; } }
        if (!Array.isArray(amendments)) amendments = [];

        const html = `
            <div class="modal-overlay active" id="lr-amendments-modal">
                <div class="modal-content" style="max-width: 780px; max-height: 90vh; overflow-y: auto;">
                    <div class="lr-modal-header lr-modal-header-alt">
                        <h3><i class="fas fa-history"></i>التحديثات القانونية</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-amendments-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="lr-amd-record-info">
                            <div><i class="fas fa-file-alt"></i> ${record.title || '—'}</div>
                            <div><i class="fas fa-hashtag"></i> ${record.id || ''}</div>
                        </div>

                        ${amendments.length === 0 ? `
                            <div class="lr-amd-empty">
                                <i class="fas fa-history text-4xl text-gray-300 mb-3"></i>
                                <p>لا توجد تحديثات قانونية مسجلة لهذا التشريع</p>
                            </div>
                        ` : `
                            <div class="lr-amd-timeline">
                                ${amendments.map((a, i) => {
                                    const side = i % 2 === 0 ? 'right' : 'left';
                                    return `
                                    <div class="lr-amd-item lr-amd-${side}">
                                        <div class="lr-amd-dot"></div>
                                        <div class="lr-amd-content">
                                            <div class="lr-amd-header">
                                                <span class="lr-amd-num">تحديث ${a.amendmentNumber || i + 1}</span>
                                                <span class="lr-amd-date">${a.date || ''}</span>
                                            </div>
                                            <h4 class="lr-amd-title">${a.title || 'تحديث'}</h4>
                                            <p class="lr-amd-desc">${a.description || ''}</p>
                                            ${a.affectedArticles ? `<div class="lr-amd-articles"><i class="fas fa-gavel"></i> المواد المتأثرة: ${a.affectedArticles}</div>` : ''}
                                            ${a.newRequirements ? `<div class="lr-amd-req"><i class="fas fa-clipboard-list"></i> المتطلبات الجديدة: ${a.newRequirements}</div>` : ''}
                                            ${a.referenceLaw ? `<div class="lr-amd-ref"><i class="fas fa-book"></i> المرجع: ${a.referenceLaw}</div>` : ''}
                                        </div>
                                    </div>`;
                                }).join('')}
                            </div>
                        `}

                        <button id="lr-add-amendment-btn" class="btn-primary btn-sm" style="width: 100%; justify-content: center; margin-top: 16px;">
                            <i class="fas fa-plus ml-2"></i>إضافة تحديث قانوني
                        </button>
                    </div>
                </div>
            </div>
        `;

        const existingModal = document.getElementById('lr-amendments-modal');
        if (existingModal) existingModal.remove();
        document.body.insertAdjacentHTML('beforeend', html);

        document.getElementById('lr-add-amendment-btn').onclick = () => {
            document.getElementById('lr-amendments-modal').remove();
            this.showLegalAmendmentForm(registerId);
        };
    },

    showLegalAmendmentForm(registerId) {
        this.ensureData();
        const html = `
            <div class="modal-overlay active" id="lr-amd-form-modal">
                <div class="modal-content" style="max-width: 640px;">
                    <div class="lr-modal-header lr-modal-header-alt">
                        <h3><i class="fas fa-plus-circle"></i>إضافة تحديث قانوني</h3>
                        <button class="modal-close" onclick="document.getElementById('lr-amd-form-modal').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="lr-amd-form" onsubmit="LegalDocuments.handleAmendmentSubmit(event, '${registerId}')">
                        <input type="hidden" id="lr-amd-registerId" value="${registerId}">
                        <div class="modal-body">
                            <div class="lr-form-section">
                                <div class="form-group">
                                    <label class="form-label">رقم التحديث <span class="text-red-500">*</span></label>
                                    <input type="text" id="lr-amd-number" class="form-input" required placeholder="مثال: 1">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">تاريخ التحديث</label>
                                    <input type="date" id="lr-amd-date" class="form-input">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">عنوان التحديث <span class="text-red-500">*</span></label>
                                    <input type="text" id="lr-amd-title" class="form-input" required placeholder="مثال: تعديل المادة 208 من قانون العمل">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">وصف التحديث</label>
                                    <textarea id="lr-amd-description" class="form-input" rows="3" placeholder="شرح التعديلات والتحديثات"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">المواد المتأثرة</label>
                                    <input type="text" id="lr-amd-articles" class="form-input" placeholder="مثال: 208، 209، 210">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">المتطلبات الجديدة</label>
                                    <textarea id="lr-amd-requirements" class="form-input" rows="2" placeholder="المتطلبات الجديدة الناتجة عن التعديل"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">المرجع القانوني للتعديل</label>
                                    <input type="text" id="lr-amd-reference" class="form-input" placeholder="مثال: قانون رقم 180 لسنة 2023">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-secondary" onclick="document.getElementById('lr-amd-form-modal').remove()">إلغاء</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>إضافة التحديث
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        const existingModal = document.getElementById('lr-amd-form-modal');
        if (existingModal) existingModal.remove();
        document.body.insertAdjacentHTML('beforeend', html);
    },

    async handleAmendmentSubmit(e, registerId) {
        e.preventDefault();
        const g = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };

        const amendment = {
            id: 'AMD-' + Date.now(),
            amendmentNumber: g('lr-amd-number'),
            date: g('lr-amd-date'),
            title: g('lr-amd-title'),
            description: g('lr-amd-description'),
            affectedArticles: g('lr-amd-articles'),
            newRequirements: g('lr-amd-requirements'),
            referenceLaw: g('lr-amd-reference'),
            createdAt: new Date().toISOString()
        };

        if (!amendment.title || !amendment.amendmentNumber) {
            if (typeof Notification !== 'undefined' && Notification.error)
                Notification.error('يرجى إدخال رقم التحديث والعنوان');
            return;
        }

        const items = AppState.appData.legalRegister || [];
        const record = items.find(r => r.id === registerId);
        if (!record) {
            if (typeof Notification !== 'undefined' && Notification.error)
                Notification.error('السجل القانوني غير موجود');
            return;
        }

        let amendments = record.amendments;
        if (typeof amendments === 'string') { try { amendments = JSON.parse(amendments); } catch (e) { amendments = []; } }
        if (!Array.isArray(amendments)) amendments = [];

        amendments.push(amendment);
        record.amendments = amendments;
        record.updatedAt = new Date().toISOString();

        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) window.DataManager.save();

        const modal = document.getElementById('lr-amd-form-modal');
        if (modal) modal.remove();

        this.loadLegalRegisterList();
        if (typeof Notification !== 'undefined' && Notification.success)
            Notification.success('تم إضافة التحديث القانوني بنجاح');

        if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.sendRequest) {
            GoogleIntegration.sendRequest({
                action: 'updateLegalRegister',
                data: { registerId, updateData: { amendments: JSON.stringify(amendments), updatedAt: record.updatedAt } }
            }).catch(() => {});
        }

        this.showLegalAmendments(registerId);
    },

    exportLegalTrainingExcel() {
        try {
            this.ensureData();
            const items = AppState.appData.legalTrainings || [];
            if (items.length === 0) {
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning('لا توجد بيانات للتصدير');
                }
                return;
            }

            const headers = ['الرقم', 'عنوان التدريب', 'التصنيف', 'المرجع القانوني', 'المادة/البند', 'الدورية', 'الفئة المستهدفة', 'القسم', 'المصنع', 'التاريخ المخطط', 'التاريخ الفعلي', 'المدرب', 'مؤهلات المدرب', 'المدة (ساعة)', 'المشاركين', 'الحالة', 'حالة الامتثال', 'تاريخ الانتهاء', 'الاستحقاق التالي', 'يتطلب شهادة', 'عقوبة عدم الامتثال', 'ملاحظات'];

            const rows = items.map(t => [
                t.id || '', t.title || '', t.category || '', t.legalReference || '', t.legalArticle || '',
                t.frequency || '', t.targetGroup || '', t.department || '', t.factory || '',
                t.scheduledDate || '', t.actualDate || '', t.trainer || '', t.trainerQualification || '',
                t.duration || '', t.participantsCount || '', t.status || '', t.complianceStatus || '',
                t.expiryDate || '', t.nextDueDate || '', t.certificateRequired || '', t.penaltyForNonCompliance || '', t.notes || ''
            ]);

            if (typeof XLSX !== 'undefined') {
                const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'التدريبات القانونية');
                XLSX.writeFile(wb, 'التدريبات_القانونية_' + new Date().toISOString().slice(0, 10) + '.xlsx');
            } else {
                Utils.safeWarn('مكتبة XLSX غير متوفرة');
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تصدير Excel:', error);
        }
    },

    async exportLegalTrainingPdf() {
        try {
            this.ensureData();
            const items = AppState.appData.legalTrainings || [];
            if (items.length === 0) {
                if (typeof Notification !== 'undefined' && Notification.warning) {
                    Notification.warning('لا توجد بيانات للتصدير');
                }
                return;
            }

            const origBtn = document.getElementById('export-legal-training-pdf-btn');
            if (origBtn) { origBtn.disabled = true; origBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-1"></i> جاري التصدير...'; }

            const loadLib = (src, check) => new Promise((res, rej) => {
                if (check()) return res();
                const s = document.createElement('script'); s.src = src; s.onload = () => res(); s.onerror = () => rej(); document.head.appendChild(s);
            });

            await loadLib('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', () => typeof html2canvas !== 'undefined');
            await loadLib('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', () => typeof window.jspdf !== 'undefined');

            const stats = this.getLegalTrainingStats();
            const container = document.getElementById('legal-training-container');
            const origHtml = container ? container.innerHTML : '';

            const companyName = (AppState && AppState.companySettings && AppState.companySettings.name)
                ? String(AppState.companySettings.name).trim()
                : (AppState && AppState.companyName) ? String(AppState.companyName).trim() : '';
            const logoUrl = (AppState && (AppState.companyLogo || (AppState.companySettings && AppState.companySettings.logo)))
                ? (AppState.companyLogo || AppState.companySettings.logo || '') : '';
            const logoHtml = logoUrl ? `<img src="${logoUrl}" alt="" style="max-height:50px; max-width:130px; object-fit:contain;">` : '';

            const reportHtml = `
                <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; padding: 30px; background: #fff; direction: rtl;">
                    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1e40af; padding-bottom: 16px; margin-bottom: 20px;">
                        <div style="text-align: right;">
                            ${companyName ? `<div style="font-size: 18px; font-weight: 700; color: #1e40af; margin-bottom: 4px; white-space: nowrap; word-break: keep-all;">${companyName}</div>` : ''}
                            <h1 style="font-size: 20px; color: #1e293b; margin: 0 0 2px;">تقرير التدريبات القانونية</h1>
                            <p style="font-size: 12px; color: #64748b; margin: 0;">الامتثال للقوانين المصرية — Egyptian Law Compliance</p>
                        </div>
                        ${logoHtml ? `<div style="flex-shrink: 0;">${logoHtml}</div>` : ''}
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; gap: 12px; flex-wrap: wrap;">
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">التاريخ</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${new Date().toLocaleDateString('ar-EG')}</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">إجمالي السجلات</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${items.length}</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">نسبة الامتثال</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${stats.complianceRate}%</p>
                        </div>
                        <div style="background: #f8fafc; padding: 12px 18px; border-radius: 10px; flex: 1; min-width: 140px; border: 1px solid #e2e8f0;">
                            <p style="font-size: 11px; color: #64748b; margin: 0 0 2px;">ممتثل / غير ممتثل</p>
                            <p style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0;">${stats.compliant} / ${stats.nonCompliant}</p>
                        </div>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <thead>
                            <tr style="background: #1e40af; color: #fff;">
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">#</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">عنوان التدريب</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">التصنيف</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: right;">المرجع القانوني</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">الدورية</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">التاريخ المخطط</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">الحالة</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">الامتثال</th>
                                <th style="padding: 8px 10px; border: 1px solid #1e3a8a; text-align: center;">تاريخ الانتهاء</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map((t, i) => `
                                <tr style="background: ${i % 2 === 0 ? '#fff' : '#f8fafc'};">
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center; color: #64748b;">${i + 1}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; font-weight: 600;">${t.title || '—'}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; color: #475569;">${t.category || '—'}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: right; color: #475569;">${t.legalReference || '—'}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${t.frequency || '—'}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${t.scheduledDate || '—'}</td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">
                                        <span style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;
                                            background: ${t.status === 'مكتمل' ? '#dcfce7' : t.status === 'مخطط' ? '#dbeafe' : t.status === 'قيد التنفيذ' ? '#fef3c7' : '#f1f5f9'};
                                            color: ${t.status === 'مكتمل' ? '#166534' : t.status === 'مخطط' ? '#1e40af' : t.status === 'قيد التنفيذ' ? '#92400e' : '#475569'};">
                                            ${t.status || '—'}
                                        </span>
                                    </td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">
                                        <span style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;
                                            background: ${t.complianceStatus === 'ممتثل' ? '#dcfce7' : t.complianceStatus === 'غير ممتثل' ? '#fecaca' : t.complianceStatus === 'قارب على الانتهاء' ? '#fef3c7' : '#dbeafe'};
                                            color: ${t.complianceStatus === 'ممتثل' ? '#166534' : t.complianceStatus === 'غير ممتثل' ? '#991b1b' : t.complianceStatus === 'قارب على الانتهاء' ? '#92400e' : '#1e40af'};">
                                            ${t.complianceStatus || '—'}
                                        </span>
                                    </td>
                                    <td style="padding: 6px 10px; border: 1px solid #e2e8f0; text-align: center;">${t.expiryDate || '—'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; text-align: center; color: #94a3b8; font-size: 11px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                        تم التصدير في ${new Date().toLocaleString('ar-EG')} — نظام إدارة HSE
                    </div>
                </div>
            `;

            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position: absolute; left: -9999px; top: 0; z-index: -1;';
            wrapper.innerHTML = reportHtml;
            document.body.appendChild(wrapper);

            try {
                const canvas = await html2canvas(wrapper, { scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false });
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
                const pW = pdf.internal.pageSize.getWidth();
                const pH = pdf.internal.pageSize.getHeight();
                const mg = 8;
                const cW = pW - mg * 2;
                const ratio = cW / canvas.width;
                const pgH = pH - mg * 2;
                const pgPx = pgH / ratio;
                const total = Math.ceil(canvas.height / pgPx);

                for (let p = 0; p < total; p++) {
                    if (p > 0) pdf.addPage();
                    const sc = document.createElement('canvas');
                    const sH = Math.min(pgPx, canvas.height - p * pgPx);
                    sc.width = canvas.width;
                    sc.height = sH;
                    sc.getContext('2d').drawImage(canvas, 0, p * pgPx, canvas.width, sH, 0, 0, canvas.width, sH);
                    pdf.addImage(sc.toDataURL('image/jpeg', 0.95), 'JPEG', mg, mg, cW, sH * ratio);
                    pdf.setDrawColor(37, 99, 235);
                    pdf.setLineWidth(0.3);
                    pdf.line(mg, pH - mg + 1, pW - mg, pH - mg + 1);
                    pdf.setTextColor(148, 163, 184);
                    pdf.setFontSize(7);
                    pdf.text(new Date().toISOString().slice(0, 10), mg, pH - 3);
                    pdf.text(`${p + 1} / ${total}`, pW - mg, pH - 3, { align: 'right' });
                }

                pdf.save(`Legal_Trainings_${new Date().toISOString().slice(0, 10)}.pdf`);
                if (typeof Notification !== 'undefined' && Notification.success) {
                    Notification.success('تم تصدير تقرير PDF بنجاح');
                }
            } finally {
                document.body.removeChild(wrapper);
            }
        } catch (error) {
            Utils.safeError('❌ خطأ في تصدير PDF:', error);
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error('تعذر تصدير PDF');
            }
        } finally {
            const btn = document.getElementById('export-legal-training-pdf-btn');
            if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-file-pdf ml-1" style="font-size: 14px;"></i>PDF'; }
        }
    },

};

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof LegalDocuments !== 'undefined') {
            window.LegalDocuments = LegalDocuments;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ LegalDocuments module loaded and available on window.LegalDocuments');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير LegalDocuments:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof LegalDocuments !== 'undefined') {
            try {
                window.LegalDocuments = LegalDocuments;
            } catch (e) {
                console.error('❌ فشل تصدير LegalDocuments:', e);
            }
        }
    }
})();
