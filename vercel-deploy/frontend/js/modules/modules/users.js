/**
 * Users Module
 * تم استخراجه من app-modules.js
 */

// ===== Users Module =====
const Users = {
    currentView: 'list', // list, form, edit
    currentEditId: null,
    autoRefreshInterval: null, // لتخزين معرف التحديث التلقائي
    refreshInterval: 15000, // تحديث كل 15 ثانية — تقليل الضغط على الخلفية
    sectionChangeHandler: null, // لتخزين معالج حدث تغيير القسم
    _getI18nCore() {
        return (window.AppI18n && typeof window.AppI18n.t === 'function')
            ? window.AppI18n
            : ((window.I18n && typeof window.I18n.t === 'function') ? window.I18n : null);
    },
    t(key, fallback) {
        const i18nCore = this._getI18nCore();
        if (i18nCore) return i18nCore.t(key, null, fallback || key);
        return fallback || key;
    },
    applyModuleI18n(root) {
        const i18nCore = this._getI18nCore();
        if (!i18nCore) return;
        const target = root || document.getElementById('users-section') || document;
        if (typeof i18nCore.applyI18n === 'function') i18nCore.applyI18n(target);
        if (typeof i18nCore.applyLiteralTranslations === 'function') i18nCore.applyLiteralTranslations(target);
    },

    generateRandomPassword(length = 10) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
        let password = '';
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint32Array(length);
            window.crypto.getRandomValues(array);
            for (let i = 0; i < length; i++) {
                password += chars[array[i] % chars.length];
            }
        } else {
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        }
        return password;
    },

    showUserCredentialsModal(creds) {
        if (!creds || !creds.email) return;
        const existing = document.getElementById('user-credentials-modal-overlay');
        if (existing) existing.remove();

        const roleLabels = {
            admin: '🔴 مدير النظام (Admin)',
            safety_officer: '🔵 مسئول السلامة (Safety Officer)',
            user: '🟢 مستخدم عادي (Regular User)',
            read_only: '🟣 قراءة فقط (Read Only)'
        };
        const roleText = roleLabels[creds.role] || creds.role || 'مستخدم';
        const loginUrl = window.location.origin + window.location.pathname;

        const formattedSummary = `مرحباً ${creds.name || 'المستخدم'}،

تم إنشاء/تحديث حسابك بنجاح في نظام إدارة السلامة والصحة المهنية (ICAPP HSE).

بيانات تسجيل الدخول:
• البريد الإلكتروني: ${creds.email}
• كلمة المرور: ${creds.password || '••••••••'}
• الدور الوظيفي: ${roleText}
• القسم: ${creds.department || '—'}
• رابط النظام: ${loginUrl}

يرجى الاحتفاظ بهذه البيانات وتغيير كلمة المرور عند أول تسجيل دخول.`;

        const mailtoSubject = encodeURIComponent(`بيانات حسابك في نظام إدارة السلامة والصحة المهنية - ${creds.name || ''}`);
        const mailtoBody = encodeURIComponent(formattedSummary);
        const mailtoUrl = `mailto:${encodeURIComponent(creds.email)}?subject=${mailtoSubject}&body=${mailtoBody}`;

        const modal = document.createElement('div');
        modal.id = 'user-credentials-modal-overlay';
        modal.className = 'modal-overlay animate-fade-in';
        modal.style.zIndex = '9999';
        modal.style.backdropFilter = 'blur(8px)';
        modal.innerHTML = `
            <div class="modal-content animate-scale-up" style="max-width: 580px; width: 95%; border-radius: 20px; padding: 0; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2);">
                <div style="background: linear-gradient(135deg, #003865 0%, #1d4ed8 50%, #005696 100%); padding: 28px 24px; text-align: center; color: white; position: relative; border-bottom: 3px solid #FFC72C;">
                    <button type="button" class="modal-close text-white opacity-80 hover:opacity-100" onclick="document.getElementById('user-credentials-modal-overlay')?.remove()" style="position: absolute; left: 16px; top: 16px; background: rgba(255,255,255,0.15); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; color: white;">
                        <i class="fas fa-times"></i>
                    </button>
                    <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; border: 2px solid rgba(255,255,255,0.4); box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                        <i class="fas fa-user-check text-3xl text-amber-300"></i>
                    </div>
                    <h3 style="font-size: 22px; font-weight: 800; margin: 0 0 6px; color: #ffffff;">تم حفظ بيانات الحساب بنجاح!</h3>
                    <p style="font-size: 13px; opacity: 0.9; margin: 0; color: #e2e8f0;">جاهز لمشاركة بيانات تسجيل الدخول مع المستخدم</p>
                </div>

                <div style="padding: 24px; background: #ffffff;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-user ml-1 text-blue-600"></i> الاسم الكامل</span>
                            <strong style="font-size: 14px; color: #1e293b;">${Utils.escapeHTML(creds.name || '')}</strong>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-envelope ml-1 text-blue-600"></i> البريد الإلكتروني</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <code style="font-size: 13px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 8px; border-radius: 6px; direction: ltr;">${Utils.escapeHTML(creds.email || '')}</code>
                                <button type="button" onclick="navigator.clipboard.writeText('${creds.email}').then(() => Notification.success('تم نسخ البريد الإلكتروني')).catch(() => {})" title="نسخ البريد" style="background: #e2e8f0; border: none; border-radius: 6px; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569;">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-key ml-1 text-amber-600"></i> كلمة المرور</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <code id="cred-modal-pass-text" style="font-size: 15px; font-weight: 800; color: #059669; background: #ecfdf5; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px; direction: ltr;">${Utils.escapeHTML(creds.password || '••••••••')}</code>
                                <button type="button" onclick="navigator.clipboard.writeText('${creds.password}').then(() => Notification.success('تم نسخ كلمة المرور')).catch(() => {})" title="نسخ كلمة المرور" style="background: #d1fae5; border: none; border-radius: 6px; width: 28px; height: 28px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #047857;">
                                    <i class="fas fa-copy text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-user-shield ml-1 text-purple-600"></i> الدور والقسم</span>
                            <span style="font-size: 12px; font-weight: 700; color: #334155; background: #f1f5f9; padding: 3px 10px; border-radius: 20px;">${Utils.escapeHTML(roleText)} - ${Utils.escapeHTML(creds.department || '')}</span>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="font-size: 12px; font-weight: 600; color: #64748b;"><i class="fas fa-link ml-1 text-blue-600"></i> رابط النظام</span>
                            <a href="${loginUrl}" target="_blank" style="font-size: 12px; color: #2563eb; font-weight: 600; text-decoration: underline; direction: ltr;">${loginUrl}</a>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
                        <button type="button" id="copy-all-creds-btn" class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: linear-gradient(135deg, #003865, #005696); border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; border: none;">
                            <i class="fas fa-copy"></i>
                            نسخ بيانات الحساب
                        </button>
                        <a href="${mailtoUrl}" class="btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; text-align: center;">
                            <i class="fas fa-envelope"></i>
                            مشاركة عبر البريد
                        </a>
                    </div>

                    <button type="button" onclick="document.getElementById('user-credentials-modal-overlay')?.remove()" style="width: 100%; padding: 10px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 13px;">
                        <i class="fas fa-check ml-1"></i> تم والإغلاق
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        const copyAllBtn = modal.querySelector('#copy-all-creds-btn');
        if (copyAllBtn) {
            copyAllBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(formattedSummary).then(() => {
                    Notification.success('تم نسخ كافة بيانات الحساب بنجاح!');
                }).catch(() => {
                    Notification.error('تعذر نسخ البيانات تلقائياً');
                });
            });
        }
    },

    // ===== Photo loading guards (avoid repeated 503) =====
    _photoFailKey(photoKey) {
        return `hse_user_photo_failed_${String(photoKey || '').trim()}`;
    },
    _getDriveIdFromUrl(url) {
        try {
            const s = String(url || '').trim();
            if (!s) return '';
            const m = s.match(/[?&]id=([^&]+)/) || s.match(/\/file\/d\/([^/]+)/);
            return m ? String(m[1] || '').trim() : '';
        } catch (e) {
            return '';
        }
    },
    _normalizeUserPhotoUrl(photoUrl, userId = '') {
        try {
            const raw = typeof Utils !== 'undefined' && typeof Utils.extractImageSourceCandidate === 'function'
                ? String(Utils.extractImageSourceCandidate(photoUrl) || '').trim()
                : String(photoUrl || '').trim();
            if (!raw) return '';

            // ✅ إصلاح: السماح بـ base64 data URLs مباشرة دون تحويل
            let normalized = raw;
            if (typeof Utils !== 'undefined' && typeof Utils.normalizeImageSource === 'function') {
                normalized = Utils.normalizeImageSource(raw) || raw;
            } else if (raw.startsWith('data:image/')) {
                normalized = raw;
            } else if (typeof window !== 'undefined' && typeof window.__convertGoogleDriveUrl === 'function') {
                normalized = window.__convertGoogleDriveUrl(raw) || raw;
            }

            const driveId = this._getDriveIdFromUrl(normalized);
            const photoKey = driveId || userId || normalized;
            
            // ✅ إصلاح: السماح بإعادة المحاولة بعد 5 دقائق بدلاً من الحظر الدائم
            const failedAt = sessionStorage.getItem(this._photoFailKey(photoKey));
            if (failedAt) {
                const failedTime = parseInt(failedAt, 10);
                const now = Date.now();
                const fiveMinutes = 5 * 60 * 1000;
                
                // إذا مر أقل من 5 دقائق على الفشل، لا نحاول مرة أخرى
                if (now - failedTime < fiveMinutes) {
                    return '';
                }
                
                // إذا مر أكثر من 5 دقائق، نحذف الحذر ونسمح بالمحاولة
                sessionStorage.removeItem(this._photoFailKey(photoKey));
            }

            return normalized;
        } catch (e) {
            return '';
        }
    },
    _setupUserPhotoFallbacks(rootEl) {
        try {
            const root = rootEl || document;
            const images = root.querySelectorAll('img[data-user-photo="1"]');
            if (!images || images.length === 0) return;

            images.forEach((img) => {
                if (!img || img.dataset._fallbackBound === '1') return;
                img.dataset._fallbackBound = '1';
                const photoKey = (img.dataset.photoKey || '').trim();
                const originalSrc = img.src;

                img.addEventListener('error', () => {
                    try {
                        // تسجيل الفشل في sessionStorage مع الوقت
                        if (photoKey) sessionStorage.setItem(this._photoFailKey(photoKey), Date.now().toString());
                    } catch (e) { /* ignore */ }
                    requestAnimationFrame(() => {
                        try {
                            const d = document.createElement('div');
                            d.className = 'w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center';
                            d.title = 'الصورة غير متاحة';
                            d.innerHTML = '<i class="fas fa-user text-gray-400"></i>';
                            img.replaceWith(d);
                        } catch (e2) { /* ignore */ }
                    });
                }, { passive: true });
                
                // ✅ محاولة إعادة تحميل الصورة إذا كانت محجوبة سابقاً
                if (photoKey && img.src) {
                    const failedAt = sessionStorage.getItem(this._photoFailKey(photoKey));
                    if (failedAt) {
                        const failedTime = parseInt(failedAt, 10);
                        const now = Date.now();
                        const fiveMinutes = 5 * 60 * 1000;
                        
                        if (now - failedTime >= fiveMinutes) {
                            // إعادة المحاولة بعد 5 دقائق
                            sessionStorage.removeItem(this._photoFailKey(photoKey));
                            img.src = originalSrc + (originalSrc.includes('?') ? '&' : '?') + 'retry=' + Date.now();
                        }
                    }
                }
            });
        } catch (e) {
            // ignore
        }
    },

    async load() {
        // Add language change listener
        if (!this._languageChangeListenerAdded) {
            document.addEventListener('language-changed', () => {
                this.load();
            });
            this._languageChangeListenerAdded = true;
        }
        const section = document.getElementById('users-section');
        if (!section) return;

        // التحقق من الصلاحيات - فقط المدير يمكنه الوصول
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function')
            ? Permissions.isCurrentUserAdmin()
            : (AppState.currentUser?.role || '').toLowerCase() === 'admin';

        if (!isAdmin) {
            section.innerHTML = `
                <div class="content-card">
                    <div class="empty-state">
                        <i class="fas fa-lock text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">ليس لديك صلاحية للوصول إلى إدارة المستخدمين</p>
                        <p class="text-sm text-gray-400 mt-2">يجب أن تكون مدير النظام للوصول إلى هذه الصفحة</p>
                    </div>
                </div>
            `;
            return;
        }

        try {
            section.innerHTML = `
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-users ml-3" aria-hidden="true"></i>
                            ${this.t('module.users.title', 'إدارة المستخدمين')}
                        </h1>
                        <p class="section-subtitle">${this.t('module.users.subtitle', 'إدارة المستخدمين وصلاحياتهم')}</p>
                    </div>
                    <button id="add-user-btn" class="btn-primary">
                        <i class="fas fa-plus ml-2" aria-hidden="true"></i>
                        ${this.t('module.users.addNewUser', 'إضافة مستخدم جديد')}
                    </button>
                </div>
            </div>

            <div id="users-content" class="mt-6">
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${this.t('module.users.loadingList', 'جاري تحميل قائمة المستخدمين...')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
            this.applyModuleI18n(section);

            this.setupEventListeners();
            
            // ✅ تحميل القائمة فوراً بعد عرض الواجهة مع تجزئة بسيطة لتخفيف handler
            try {
                const contentArea = document.getElementById('users-content');
                if (contentArea) {
                    const listContent = await this.renderList().catch(error => {
                        Utils.safeWarn('⚠️ خطأ في تحميل القائمة:', error);
                        return `
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-4">حدث خطأ في تحميل البيانات</p>
                                        <button onclick="Users.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            إعادة المحاولة
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    contentArea.innerHTML = listContent;
                    this.applyModuleI18n(contentArea);
                    setTimeout(() => this.loadUsersList(), 0);
                }
            } catch (error) {
                Utils.safeWarn('⚠️ خطأ في تحميل القائمة:', error);
            }
            
            // بدء التحديث التلقائي لحالة الاتصال وآخر تسجيل دخول
            this.startAutoRefresh();
            
            // الاستماع لتغيير الأقسام لإيقاف التحديث التلقائي عند إغلاق الموديول
            this.setupSectionChangeListener();
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('❌ خطأ في تحميل مديول المستخدمين:', error);
            } else {
                console.error('❌ خطأ في تحميل مديول المستخدمين:', error);
            }
            if (section) {
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">حدث خطأ أثناء تحميل البيانات</p>
                                <button onclick="Users.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    إعادة المحاولة
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                this.applyModuleI18n(section);
            }
        }
    },

    async renderList() {
        return `
            <div class="content-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <h2 class="card-title">
                            <i class="fas fa-list ml-2" aria-hidden="true"></i>
                            ${this.t('module.users.listTitle', 'قائمة المستخدمين')}
                        </h2>
                        <div class="flex items-center gap-4">
                            <input 
                                type="text" 
                                id="users-search" 
                                class="form-input" 
                                style="max-width: 300px;"
                                placeholder="${this.t('module.users.searchPlaceholder', 'البحث عن مستخدم...')}"
                            >
                            <select id="users-filter-role" class="form-input" style="max-width: 200px;">
                                <option value="">${this.t('module.users.allRoles', 'جميع الأدوار')}</option>
                                <option value="admin">${this.t('module.users.roleAdmin', 'مدير')}</option>
                                <option value="safety_officer">${this.t('module.users.roleSafetyOfficer', 'مسؤول السلامة')}</option>
                                <option value="user">${this.t('module.users.roleUser', 'مستخدم')}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div id="users-table-container">
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">${this.t('module.users.loading', 'جاري التحميل...')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async renderForm(userData = null) {
        const isEdit = !!userData;
        return `
            <form id="user-form" class="space-y-6">
                <!-- ==================== SECTION 1: USER PROFILE & IDENTITY ==================== -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
                        <div style="width: 32px; height: 32px; border-radius: 8px; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                            <i class="fas fa-id-card"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: #1e293b;">1. بيانات الحساب والملف الشخصي</h4>
                            <p style="margin: 0; font-size: 12px; color: #64748b;">المعلومات الأساسية وصورة المستخدم والبريد الإلكتروني</p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                        <!-- Photo Upload Block -->
                        <div style="grid-column: 1 / -1; display: flex; align-items: center; gap: 16px; background: #ffffff; padding: 14px; border-radius: 12px; border: 1px solid #cbd5e1;">
                            <div style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #3b82f6; overflow: hidden; background: #f1f5f9; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <img id="user-photo-preview" src="${userData?.photo || ''}" alt="صورة المستخدم" style="width: 100%; height: 100%; object-fit: cover; display: ${userData?.photo ? 'block' : 'none'};">
                                <i id="user-photo-icon" class="fas fa-user text-2xl text-gray-400" style="display: ${userData?.photo ? 'none' : 'block'}"></i>
                            </div>
                            <div style="flex: 1;">
                                <label for="user-photo-input" style="display: block; font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">
                                    <i class="fas fa-camera ml-1 text-blue-600"></i> صورة الملف الشخصي
                                </label>
                                <input 
                                    type="file" 
                                    id="user-photo-input" 
                                    accept="image/*"
                                    class="form-input"
                                    style="padding: 6px 10px; font-size: 12px; height: auto;"
                                >
                                <p style="margin: 4px 0 0; font-size: 11px; color: #64748b;">موصى بها: صورة مربعة بحجم أقصى 2 ميجابايت (PNG / JPG)</p>
                            </div>
                        </div>

                        <!-- Full Name -->
                        <div>
                            <label for="user-name" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user ml-1 text-blue-600"></i> الاسم الكامل <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="user-name" 
                                name="name" 
                                required
                                class="form-input"
                                value="${Utils.escapeHTML(userData?.name || '')}"
                                placeholder="أدخل الاسم الكامل"
                                style="border-radius: 8px; border-color: #cbd5e1;"
                            >
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="user-email" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-envelope ml-1 text-blue-600"></i> البريد الإلكتروني <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="user-email" 
                                name="email" 
                                autocomplete="email"
                                required
                                class="form-input"
                                value="${Utils.escapeHTML(userData?.email || '')}"
                                placeholder="example@company.com"
                                ${isEdit ? 'readonly' : ''}
                                style="border-radius: 8px; border-color: #cbd5e1; direction: ltr;"
                            >
                        </div>

                        <!-- Department -->
                        <div>
                            <label for="user-department" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-building ml-1 text-blue-600"></i> القسم / الإدارة <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="user-department" 
                                name="department" 
                                required
                                class="form-input"
                                value="${Utils.escapeHTML(userData?.department || '')}"
                                placeholder="مثال: إدارة السلامة والصحة المهنية"
                                style="border-radius: 8px; border-color: #cbd5e1;"
                            >
                        </div>
                    </div>
                </div>

                <!-- ==================== SECTION 2: SECURITY & ROLE CONFIGURATION ==================== -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0;">
                        <div style="width: 32px; height: 32px; border-radius: 8px; background: #fff7ed; color: #ea580c; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: #1e293b;">2. الأمان والدور الوظيفي</h4>
                            <p style="margin: 0; font-size: 12px; color: #64748b;">تعيين كلمة السر والدور الوظيفي وحالة تفعيل الحساب</p>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                        <!-- Password & Auto-generator -->
                        <div style="grid-column: 1 / -1;">
                            <label for="user-password" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-key ml-1 text-amber-500"></i> كلمة المرور ${isEdit ? '<span style="color: #64748b; font-weight: normal;">(اتركه فارغاً للإبقاء على كلمة السر الحالية)</span>' : '<span style="color: #ef4444;">*</span>'}
                            </label>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="position: relative; flex: 1;">
                                    <input 
                                        type="password" 
                                        id="user-password" 
                                        name="password" 
                                        autocomplete="new-password"
                                        ${isEdit ? '' : 'required'}
                                        class="form-input"
                                        placeholder="••••••••"
                                        style="direction: ltr; padding-left: 40px; border-radius: 8px; border-color: #cbd5e1;"
                                    >
                                    <button 
                                        type="button" 
                                        id="toggle-password-visibility-btn"
                                        style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px;"
                                        title="إظهار / إخفاء كلمة المرور"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <button 
                                    type="button" 
                                    id="generate-password-btn" 
                                    style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: white; border: none; border-radius: 8px; padding: 10px 16px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap; box-shadow: 0 2px 4px rgba(217, 119, 6, 0.2);"
                                    title="توليد كلمة مرور عشوائية قوية وحفظها"
                                >
                                    <i class="fas fa-wand-magic-sparkles"></i>
                                    توليد كلمة سر
                                </button>
                            </div>
                            <div id="generated-pass-notice" class="hidden" style="margin-top: 6px; font-size: 12px; font-weight: 700; color: #059669; display: flex; align-items: center; gap: 4px;">
                                <i class="fas fa-check-circle"></i> تم توليد كلمة مرور عشوائية قوية وتطبيقها بنجاح!
                            </div>
                        </div>

                        <!-- Role Selector -->
                        <div>
                            <label for="user-role" style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-user-tag ml-1 text-blue-600"></i> الدور الوظيفي <span style="color: #ef4444;">*</span>
                            </label>
                            <select id="user-role" name="role" required class="form-input" style="border-radius: 8px; border-color: #cbd5e1; font-weight: 600;">
                                <option value="">اختر الدور الوظيفي...</option>
                                <option value="admin" ${userData?.role === 'admin' ? 'selected' : ''}>🔴 مدير النظام (System Administrator)</option>
                                <option value="safety_officer" ${userData?.role === 'safety_officer' ? 'selected' : ''}>🔵 مسئول السلامة (Safety Officer)</option>
                                <option value="user" ${userData?.role === 'user' ? 'selected' : ''}>🟢 مستخدم عادي (Regular User)</option>
                                <option value="read_only" ${userData?.role === 'read_only' ? 'selected' : ''}>🟣 قراءة فقط (Read Only)</option>
                            </select>
                        </div>

                        <!-- Account Status Switch -->
                        <div>
                            <label style="display: block; font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-toggle-on ml-1 text-emerald-600"></i> حالة الحساب
                            </label>
                            <label style="display: flex; align-items: center; gap: 10px; background: #ffffff; padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; cursor: pointer;">
                                <input 
                                    type="checkbox" 
                                    id="user-active" 
                                    name="active"
                                    style="width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer;"
                                    ${userData?.active !== false ? 'checked' : ''}
                                >
                                <span style="font-size: 13px; font-weight: 700; color: #1e293b;">حساب نشط (يمكنه تسجيل الدخول)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- ==================== SECTION 3: MODULE PERMISSIONS MATRIX ==================== -->
                <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 14px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 34px; height: 34px; border-radius: 8px; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                                <i class="fas fa-user-lock"></i>
                            </div>
                            <div>
                                <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: #1e293b;">3. مصفوفة صلاحيات الوصول للوحدات</h4>
                                <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">تحديد المديولات المتاحة والصلاحيات التفصيلية للمستخدم</p>
                            </div>
                        </div>

                        <div id="permissions-action-btns" style="display: flex; gap: 8px;">
                            <button type="button" id="select-all-permissions-btn" style="background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 8px; padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;">
                                <i class="fas fa-check-double"></i> تحديد الكل
                            </button>
                            <button type="button" id="deselect-all-permissions-btn" style="background: #f8fafc; color: #64748b; border: 1px solid #cbd5e1; border-radius: 8px; padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;">
                                <i class="fas fa-times"></i> إلغاء الكل
                            </button>
                        </div>
                    </div>

                    <!-- Admin Info Banner -->
                    <div id="admin-permissions-banner" style="display: ${userData?.role === 'admin' ? 'flex' : 'none'}; align-items: center; gap: 10px; background: #eff6ff; border: 1px solid #93c5fd; border-radius: 10px; padding: 12px 16px; margin-bottom: 16px; color: #1e40af;">
                        <i class="fas fa-shield-halved text-xl text-blue-600"></i>
                        <span style="font-size: 13px; font-weight: 700;">مدير النظام يمتلك صلاحيات الوصول الشاملة لكافة الوحدات والخصائص تلقائياً.</span>
                    </div>

                    <!-- Modules Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;" id="modules-permissions-container">
                        ${MODULE_PERMISSIONS_CONFIG.map(module => {
                            const hasPermission = userData?.permissions && userData.permissions[module.key] === true;
                            const selectedRole = document.getElementById('user-role')?.value || userData?.role;
                            const isAdmin = selectedRole === 'admin' || userData?.role === 'admin';
                            const hasDetailedPerms = module.hasDetailedPermissions && MODULE_DETAILED_PERMISSIONS[module.key];
                            
                            return `
                                <div class="module-perm-card" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                                    <label style="display: flex; align-items: center; gap: 8px; flex: 1; cursor: ${isAdmin ? 'not-allowed' : 'pointer'}; margin: 0;">
                                        <input 
                                            type="checkbox" 
                                            class="user-permission-checkbox" 
                                            data-module="${module.key}"
                                            ${hasPermission || isAdmin ? 'checked' : ''}
                                            ${isAdmin ? 'disabled' : ''}
                                            style="width: 16px; height: 16px; accent-color: #2563eb; cursor: ${isAdmin ? 'not-allowed' : 'pointer'};"
                                        >
                                        <i class="fas ${module.icon}" style="color: #64748b; font-size: 14px; width: 16px; text-align: center;"></i>
                                        <span style="font-size: 13px; font-weight: 700; color: #1e293b; flex: 1;">${module.label}</span>
                                    </label>
                                    ${hasDetailedPerms ? `
                                        <button 
                                            type="button" 
                                            class="detailed-perm-btn"
                                            data-action="show-detailed-permissions" 
                                            data-module="${module.key}"
                                            title="تخصيص الصلاحيات التفصيلية لـ ${module.label}"
                                            style="background: #e0e7ff; color: #4338ca; border: none; border-radius: 6px; padding: 4px 8px; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s; white-space: nowrap;"
                                        >
                                            <i class="fas fa-sliders text-xs"></i> تخصيص
                                        </button>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Modal Actions Footer -->
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding-top: 16px; margin-top: 8px; border-top: 1px solid #e2e8f0;">
                    <button type="button" id="cancel-user-btn" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer;">
                        إلغاء
                    </button>
                    <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #003865 0%, #005696 100%); color: white; border: none; border-radius: 10px; padding: 10px 24px; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 12px rgba(0, 56, 101, 0.2); display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-save"></i>
                        ${isEdit ? 'حفظ التعديلات' : 'حفظ وإضافة المستخدم'}
                    </button>
                </div>
            </form>
        `;
    },

    async loadUsersList() {
        const container = document.getElementById('users-table-container');
        if (!container) return;

        let users = AppState.appData.users || [];

        if (users.length === 0 && typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserEffectiveAdmin === 'function' && Permissions.isCurrentUserEffectiveAdmin()) {
            if (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.syncUsers === 'function') {
                try {
                    container.innerHTML = `
                        <div class="empty-state">
                            <div style="width: 300px; margin: 0 auto 16px;">
                                <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                    <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                </div>
                            </div>
                            <p class="text-gray-500">جاري جلب المستخدمين من الخادم...</p>
                        </div>
                    `;
                    await GoogleIntegration.syncUsers(true);
                    users = AppState.appData.users || [];
                } catch (e) {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('تعذر مزامنة المستخدمين:', e);
                }
            }
        }

        if (users.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">لا يوجد مستخدمين</p>
                    <button id="add-user-empty-btn" class="btn-primary mt-4">
                        <i class="fas fa-plus ml-2"></i>
                        إضافة مستخدم جديد
                    </button>
                </div>
            `;
            this.applyModuleI18n(container);
            return;
        }

        const tableHTML = `
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>البريد الإلكتروني</th>
                            <th>كلمة المرور</th>
                            <th>كلمة المرور المشفرة</th>
                            <th>الدور</th>
                            <th>القسم</th>
                            <th>الحالة</th>
                            <th>الحالة الاتصال</th>
                            <th>آخر تسجيل دخول</th>
                            <th>تاريخ الإنشاء</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => {
            const isOnline = user.isOnline === true;
            const lastLoginTime = user.lastLogin ? Utils.formatDateTime(user.lastLogin) : '-';
            return `
                            <tr>
                                <td>
                                    <div class="flex items-center gap-3">
                                        ${(() => {
                                            const driveId = this._getDriveIdFromUrl(user.photo || '');
                                            const photoKey = (driveId || user.id || user.email || user.name || '').toString();
                                            const photoSrc = this._normalizeUserPhotoUrl(user.photo, user.id);
                                            if (!photoSrc) {
                                                return `<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>`;
                                            }
                                            const disp = typeof Utils.resolveDriveAwareImgDisplay === 'function'
                                                ? Utils.resolveDriveAwareImgDisplay(photoSrc)
                                                : { canonical: photoSrc, displaySrc: photoSrc, needsProxy: false, proxyFileId: '' };
                                            const pa = typeof Utils.driveProxyImgAttrs === 'function' ? Utils.driveProxyImgAttrs(disp) : '';
                                            return `<img data-user-photo="1" data-photo-key="${Utils.escapeHTML(photoKey)}" src="${Utils.escapeHTML(disp.displaySrc)}" alt="${Utils.escapeHTML(user.name || '')}"${pa} class="w-10 h-10 rounded-full object-cover" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
                                        })()}
                                        <span>${Utils.escapeHTML(user.name || '')}</span>
                                    </div>
                                </td>
                                <td>${Utils.escapeHTML(user.email || '')}${(typeof Auth !== 'undefined' && Auth._isMfaEnabledForUser && Auth._isMfaEnabledForUser(user)) ? ' <span class="badge badge-info text-xs" title="مصادقة ثنائية"><i class="fas fa-shield-halved"></i> MFA</span>' : ''}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-lock text-gray-400 text-sm"></i>
                                        <span class="text-sm text-gray-600" title="كلمة المرور مخفية للأمان">
                                            ${user.password && user.password !== '***' ? '••••••••' : '<span class="text-gray-400">***</span>'}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-key text-gray-400 text-sm"></i>
                                        <span class="text-sm text-gray-600 font-mono" title="${user.passwordHash || 'غير محدد'}">
                                            ${user.passwordHash ? (user.passwordHash.substring(0, 8) + '...') : '<span class="text-gray-400">غير محدد</span>'}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-${this.getRoleBadgeClass(user.role)}">
                                        ${this.getRoleName(user.role)}
                                    </span>
                                </td>
                                <td>${Utils.escapeHTML(user.department || '')}</td>
                                <td>
                                    <span class="badge badge-${user.active !== false ? 'success' : 'danger'}">
                                        ${user.active !== false ? 'نشط' : 'غير نشط'}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <div class="w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}" style="animation: ${isOnline ? 'pulse 2s infinite' : 'none'};"></div>
                                        <span class="text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}">
                                            ${isOnline ? 'متصل' : 'غير متصل'}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span class="text-sm text-gray-600" title="${user.lastLogin || '-'}">
                                        ${lastLoginTime}
                                    </span>
                                </td>
                                <td>${user.createdAt ? Utils.formatDate(user.createdAt) : '-'}</td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button 
                                            onclick="Users.resetUserPassword('${user.id}', '${user.email}')" 
                                            class="btn-icon btn-icon-warning"
                                            title="إعادة تعيين كلمة المرور"
                                        >
                                            <i class="fas fa-key"></i>
                                        </button>
                                        ${(typeof Auth !== 'undefined' && Auth._isMfaEnabledForUser && Auth._isMfaEnabledForUser(user)) ? `
                                        <button 
                                            onclick="Users.disableUserMfa('${user.id}', '${user.email}')" 
                                            class="btn-icon btn-icon-secondary"
                                            title="تعطيل MFA"
                                        >
                                            <i class="fas fa-shield-halved"></i>
                                        </button>` : ''}
                                        <button 
                                            onclick="Users.editUser('${user.id}')" 
                                            class="btn-icon btn-icon-primary"
                                            title="تعديل"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button 
                                            onclick="Users.deleteUser('${user.id}')" 
                                            class="btn-icon btn-icon-danger"
                                            title="حذف"
                                        >
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

        container.innerHTML = tableHTML;
        this.applyModuleI18n(container);

        // ✅ تثبيت fallback لصور المستخدمين (503 Drive) بعد تحديث DOM
        const runUserPhotoEnhancements = () => {
            this._setupUserPhotoFallbacks(container);
            if (typeof Utils.hydrateDriveProxyImages === 'function') {
                Utils.hydrateDriveProxyImages(container, {
                    onFetchFail: (img) => {
                        try {
                            const pk = (img.dataset.photoKey || '').trim();
                            if (pk) sessionStorage.setItem(this._photoFailKey(pk), Date.now().toString());
                        } catch (e) { /* ignore */ }
                        try {
                            const d = document.createElement('div');
                            d.className = 'w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center';
                            d.innerHTML = '<i class="fas fa-user text-gray-400"></i>';
                            img.replaceWith(d);
                        } catch (e2) { /* ignore */ }
                    }
                });
            }
        };
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(() => runUserPhotoEnhancements(), { timeout: 600 });
        } else {
            setTimeout(() => runUserPhotoEnhancements(), 0);
        }
    },

    getRoleName(role) {
        const roles = {
            'admin': '🔴 مدير النظام',
            'safety_officer': '🔵 مسئول السلامة',
            'user': '🟢 مستخدم عادي',
            'read_only': '🟣 قراءة فقط'
        };
        return roles[role] || role;
    },

    getRoleBadgeClass(role) {
        const classes = {
            'admin': 'danger',
            'safety_officer': 'warning',
            'user': 'info',
            'read_only': 'secondary'
        };
        return classes[role] || 'secondary';
    },

    setupEventListeners() {
        // إضافة مستخدم جديد
        setTimeout(() => {
            const addBtn = document.getElementById('add-user-btn');
            const addEmptyBtn = document.getElementById('add-user-empty-btn');

            if (addBtn) {
                addBtn.addEventListener('click', () => this.showForm());
            }
            if (addEmptyBtn) {
                addEmptyBtn.addEventListener('click', () => this.showForm());
            }

            // استيراد Excel
            const importExcelBtn = document.getElementById('import-excel-btn');
            if (importExcelBtn) {
                importExcelBtn.addEventListener('click', () => this.showImportExcel());
            }

            // البحث والتصفية
            const searchInput = document.getElementById('users-search');
            const filterRole = document.getElementById('users-filter-role');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => this.filterUsers(e.target.value, filterRole?.value));
            }
            if (filterRole) {
                filterRole.addEventListener('change', (e) => this.filterUsers(searchInput?.value, e.target.value));
            }

            // نموذج المستخدم
            const userForm = document.getElementById('user-form');
            if (userForm) {
                userForm.addEventListener('submit', (e) => this.handleSubmit(e));
            }

            const cancelBtn = document.getElementById('cancel-user-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => this.showList());
            }

            this.setupPhotoPreview();
        }, 100);
    },

    async showForm(userData = null) {
        Utils.safeLog('🔧 عرض نموذج إضافة/تعديل مستخدم (Modal):', userData ? 'تعديل' : 'إضافة جديد');
        this.currentEditId = userData?.id || null;
        
        // تحميل الصلاحيات التفصيلية الحالية + تطبيع صلاحيات المديولات الأساسية للنموذج
        this.currentDetailedPermissions = {};
        let normalizedBasePermissions = null;

        if (userData && userData.permissions) {
            let perms;
            try {
                if (typeof Permissions !== 'undefined' && typeof Permissions.normalizePermissions === 'function') {
                    perms = Permissions.normalizePermissions(userData.permissions);
                } else if (typeof userData.permissions === 'string') {
                    const trimmed = userData.permissions.trim();
                    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                        perms = JSON.parse(trimmed);
                    } else {
                        try {
                            const lines = trimmed.split('\n').filter(line => line.trim());
                            perms = {};
                            lines.forEach(line => {
                                const match = line.match(/^([^:]+):\s*(.+)$/);
                                if (match) {
                                    const key = match[1].trim();
                                    const value = match[2].trim();
                                    if (value === 'true') {
                                        perms[key] = true;
                                    } else if (value === 'false') {
                                        perms[key] = false;
                                    } else if (!isNaN(value)) {
                                        perms[key] = Number(value);
                                    } else {
                                        perms[key] = value;
                                    }
                                }
                            });
                        } catch (parseError) { perms = {}; }
                    }
                } else { perms = userData.permissions; }
            } catch (error) { perms = {}; }

            if (!perms || typeof perms !== 'object' || Array.isArray(perms)) { perms = {}; }

            const basePermissions = {};
            Object.keys(perms).forEach(key => {
                const value = perms[key];
                if (key.endsWith('Permissions') && typeof value === 'object' && !Array.isArray(value)) {
                    this.currentDetailedPermissions[key] = value;
                } else if (!key.endsWith('Permissions')) {
                    basePermissions[key] = value === true;
                }
            });

            normalizedBasePermissions = basePermissions;
        }

        const normalizedUserData = userData
            ? {
                ...userData,
                permissions: normalizedBasePermissions
                    ?? (userData.permissions && typeof userData.permissions === 'object' && !Array.isArray(userData.permissions)
                        ? userData.permissions
                        : {})
            }
            : null;

        // إزالة أي modal سابق
        const existingModal = document.getElementById('user-form-modal-overlay');
        if (existingModal) existingModal.remove();

        const isEdit = !!userData;
        const modal = document.createElement('div');
        modal.id = 'user-form-modal-overlay';
        modal.className = 'modal-overlay animate-fade-in';
        modal.style.zIndex = '9990';
        modal.style.backdropFilter = 'blur(6px)';
        modal.innerHTML = `
            <div class="modal-content animate-scale-up" style="max-width: 840px; width: 95%; max-height: 90vh; display: flex; flex-direction: column; padding: 0; border-radius: 18px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2);">
                <div class="modal-header" style="background: linear-gradient(135deg, #003865 0%, #005696 100%); color: white; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #FFC72C;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(255,255,255,0.15); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; font-size: 20px; color: #FFC72C;">
                            <i class="fas fa-${isEdit ? 'user-pen' : 'user-plus'}"></i>
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 18px; font-weight: 800; color: white;">
                                ${isEdit ? 'تعديل بيانات المستخدم' : 'إضافة مستخدم جديد للنظام'}
                            </h3>
                            <p style="margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,0.8);">
                                ${isEdit ? 'تحديث المعلومات الشخصية والدور والصلاحيات' : 'أدخل بيانات الحساب الجديد وتعيين كلمة السر والصلاحيات المتاحة'}
                            </p>
                        </div>
                    </div>
                    <button type="button" class="modal-close-btn" onclick="document.getElementById('user-form-modal-overlay')?.remove()" style="background: rgba(255,255,255,0.15); border: none; color: white; border-radius: 50%; width: 34px; height: 34px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 24px; overflow-y: auto; flex: 1; background: #ffffff;">
                    ${await this.renderForm(normalizedUserData)}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.applyModuleI18n(modal);
        this.setupEventListeners();

        // ربط أزرار مولد كلمة السر وإعادة تعيين الحقول
        setTimeout(() => {
            const genBtn = modal.querySelector('#generate-password-btn');
            if (genBtn) {
                genBtn.addEventListener('click', () => {
                    const passInput = modal.querySelector('#user-password');
                    if (passInput) {
                        const newPass = this.generateRandomPassword(10);
                        passInput.value = newPass;
                        passInput.type = 'text';
                        const toggleIcon = modal.querySelector('#toggle-password-visibility-btn i');
                        if (toggleIcon) toggleIcon.className = 'fas fa-eye-slash text-amber-600';
                        const notice = modal.querySelector('#generated-pass-notice');
                        if (notice) notice.classList.remove('hidden');
                        Notification.success('تم توليد كلمة مرور عشوائية قوية');
                    }
                });
            }

            const toggleBtn = modal.querySelector('#toggle-password-visibility-btn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    const passInput = modal.querySelector('#user-password');
                    if (passInput) {
                        const isPass = passInput.type === 'password';
                        passInput.type = isPass ? 'text' : 'password';
                        const icon = toggleBtn.querySelector('i');
                        if (icon) icon.className = isPass ? 'fas fa-eye-slash text-amber-600' : 'fas fa-eye text-gray-400';
                    }
                });
            }

            const roleSelect = modal.querySelector('#user-role');
            if (roleSelect) {
                roleSelect.addEventListener('change', () => {
                    this.updatePermissionsUI();
                });
            }

            const cancelBtn = modal.querySelector('#cancel-user-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => modal.remove());
            }

            this.setupSelectAllButtons();
            this.setupDetailedPermissionsButtons();
            this.updatePermissionsUI();
        }, 100);
    },

    updatePermissionsUI() {
        const roleSelect = document.getElementById('user-role');
        const selectedRole = roleSelect?.value;
        const isAdmin = selectedRole === 'admin';
        const checkboxes = document.querySelectorAll('.user-permission-checkbox');

        checkboxes.forEach(checkbox => {
            if (isAdmin) {
                checkbox.disabled = true;
                checkbox.checked = true;
                const card = checkbox.closest('.module-perm-card') || checkbox.parentElement;
                if (card) {
                    card.style.opacity = '0.75';
                    card.style.cursor = 'not-allowed';
                }
            } else {
                checkbox.disabled = false;
                const card = checkbox.closest('.module-perm-card') || checkbox.parentElement;
                if (card) {
                    card.style.opacity = '1';
                    card.style.cursor = 'pointer';
                }
            }
        });

        const adminBanner = document.getElementById('admin-permissions-banner');
        if (adminBanner) {
            adminBanner.style.display = isAdmin ? 'flex' : 'none';
        }

        const actionBtns = document.getElementById('permissions-action-btns');
        if (actionBtns) {
            actionBtns.style.display = isAdmin ? 'none' : 'flex';
        }
    },

    setupSelectAllButtons() {
        const selectAllBtn = document.getElementById('select-all-permissions-btn');
        const deselectAllBtn = document.getElementById('deselect-all-permissions-btn');

        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => {
                const checkboxes = document.querySelectorAll('.user-permission-checkbox:not([disabled])');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = true;
                });
                Notification.success('تم تحديد جميع الصلاحيات');
            });
        }

        if (deselectAllBtn) {
            deselectAllBtn.addEventListener('click', () => {
                const checkboxes = document.querySelectorAll('.user-permission-checkbox:not([disabled])');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                Notification.success('تم إلغاء جميع الصلاحيات');
            });
        }
    },

    setupDetailedPermissionsButtons() {
        const buttons = document.querySelectorAll('[data-action="show-detailed-permissions"]');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const moduleName = button.getAttribute('data-module');
                this.showDetailedPermissionsModal(moduleName);
            });
        });
    },

    showDetailedPermissionsModal(moduleName) {
        const moduleDetails = MODULE_DETAILED_PERMISSIONS[moduleName];
        if (!moduleDetails) {
            Notification.error('لا توجد صلاحيات تفصيلية لهذا المديول');
            return;
        }

        // الحصول على الصلاحيات الحالية
        const currentPermissions = this.currentDetailedPermissions || {};
        const modulePerms = currentPermissions[`${moduleName}Permissions`] || {};

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        ${moduleDetails.label}
                    </h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="text-sm text-gray-600 mb-4">
                        <i class="fas fa-info-circle ml-1"></i>
                        حدد الصلاحيات التفصيلية التي تريد منحها للمستخدم داخل هذا المديول
                    </p>
                    <div class="space-y-2">
                        ${moduleDetails.permissions.map(perm => {
                            const checked = perm.key === 'observations-view-department'
                                ? modulePerms[perm.key] !== false
                                : modulePerms[perm.key] === true;
                            return `
                            <label class="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    class="detailed-permission-checkbox rounded border-gray-300 text-blue-600 mr-2" 
                                    data-module="${moduleName}"
                                    data-permission="${perm.key}"
                                    ${checked ? 'checked' : ''}
                                >
                                <i class="fas ${perm.icon} ml-2 text-gray-600"></i>
                                <span class="text-sm text-gray-700">${perm.label}</span>
                            </label>
                        `;
                        }).join('')}
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button type="button" id="select-all-detailed-btn" class="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            <i class="fas fa-check-double ml-1"></i>
                            تحديد الكل
                        </button>
                        <button type="button" id="deselect-all-detailed-btn" class="text-xs px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                            <i class="fas fa-times ml-1"></i>
                            إلغاء الكل
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        إلغاء
                    </button>
                    <button type="button" class="btn-primary" id="save-detailed-permissions-btn">
                        <i class="fas fa-save ml-2"></i>
                        حفظ الصلاحيات
                    </button>
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

        // أزرار تحديد/إلغاء الكل
        const selectAllDetailedBtn = modal.querySelector('#select-all-detailed-btn');
        const deselectAllDetailedBtn = modal.querySelector('#deselect-all-detailed-btn');

        if (selectAllDetailedBtn) {
            selectAllDetailedBtn.addEventListener('click', () => {
                const checkboxes = modal.querySelectorAll('.detailed-permission-checkbox');
                checkboxes.forEach(cb => cb.checked = true);
            });
        }

        if (deselectAllDetailedBtn) {
            deselectAllDetailedBtn.addEventListener('click', () => {
                const checkboxes = modal.querySelectorAll('.detailed-permission-checkbox');
                checkboxes.forEach(cb => cb.checked = false);
            });
        }

        // حفظ الصلاحيات
        const saveBtn = modal.querySelector('#save-detailed-permissions-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const checkboxes = modal.querySelectorAll('.detailed-permission-checkbox');
                const permissions = {};
                
                checkboxes.forEach(checkbox => {
                    const permKey = checkbox.getAttribute('data-permission');
                    permissions[permKey] = checkbox.checked;
                });

                // حفظ الصلاحيات التفصيلية
                if (!this.currentDetailedPermissions) {
                    this.currentDetailedPermissions = {};
                }
                this.currentDetailedPermissions[`${moduleName}Permissions`] = permissions;

                Notification.success('تم حفظ الصلاحيات التفصيلية');
                modal.remove();
            });
        }
    },

    async showList() {
        this.currentEditId = null;
        const content = document.getElementById('users-content');
        if (content) {
            content.innerHTML = await this.renderList();
            this.setupEventListeners();
            this.loadUsersList();
        }
    },

    async handleSubmit(e) {
        e.preventDefault();

        // منع النقر المتكرر
        const submitBtn = e.target?.querySelector('button[type="submit"]') || 
                         document.querySelector('#user-form button[type="submit"]');
        
        if (submitBtn && submitBtn.disabled) {
            return; // النموذج قيد المعالجة
        }

        // تعطيل الزر لمنع النقر المتكرر
        let originalText = '';
        if (submitBtn) {
            originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الحفظ...';
        }

        // عرض مؤشر التحميل فوراً
        Loading.show();

        // التحقق من الصلاحيات
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function')
            ? Permissions.isCurrentUserAdmin()
            : (AppState.currentUser?.role || '').toLowerCase() === 'admin';

        if (!isAdmin) {
            Loading.hide();
            Notification.error('ليس لديك صلاحية لإضافة أو تعديل المستخدمين');
            // استعادة الزر عند الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        const userData = this.currentEditId ? AppState.appData.users.find(u => u.id === this.currentEditId) : null;

        // معالجة الصورة
        let photoBase64 = userData?.photo || '';
        const photoInput = document.getElementById('user-photo-input');
        if (photoInput && photoInput.files.length > 0) {
            const file = photoInput.files[0];
            if (file.size > 2 * 1024 * 1024) {
                Loading.hide();
                Notification.error('حجم الصورة كبير جداً. الحد الأقصى 2MB');
                // استعادة الزر عند الخطأ
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                return;
            }
            photoBase64 = await this.convertImageToBase64(file);
        }

        const passwordInputElement = document.getElementById('user-password');
        const rawPasswordInput = passwordInputElement ? passwordInputElement.value : '';
        const trimmedPasswordInput = rawPasswordInput ? rawPasswordInput.trim() : '';

        const existingPasswordHash = userData?.passwordHash || (Utils.isSha256Hex(userData?.password) ? userData?.password : '');
        const existingDisplayPassword = userData?.password && userData.password !== '' ? userData.password : '***';

        // فحص العناصر قبل الاستخدام
        const nameEl = document.getElementById('user-name');
        const emailEl = document.getElementById('user-email');
        const roleEl = document.getElementById('user-role');
        const departmentEl = document.getElementById('user-department');
        const activeEl = document.getElementById('user-active');
        
        if (!nameEl || !emailEl || !roleEl || !departmentEl || !activeEl) {
            Loading.hide();
            Notification.error('بعض الحقول المطلوبة غير موجودة. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        // ✅ إصلاح: جمع الصلاحيات بشكل صحيح
        const collectedPermissions = this.collectPermissions();
        
        const formData = {
            id: this.currentEditId || Utils.generateId('USER'),
            name: nameEl.value.trim(),
            email: emailEl.value.trim().toLowerCase(),
            role: roleEl.value,
            department: departmentEl.value.trim(),
            active: activeEl.checked,
            photo: photoBase64,
            // ✅ إصلاح: التأكد من حفظ الصلاحيات حتى لو كانت فارغة (لكن ليس undefined)
            // حفظ الصلاحيات ككائن فارغ {} بدلاً من undefined لضمان عدم فقدانها
            permissions: collectedPermissions && typeof collectedPermissions === 'object' ? collectedPermissions : {},
            createdAt: this.currentEditId
                ? AppState.appData.users.find(u => u.id === this.currentEditId)?.createdAt
                : new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // إضافة حقول جديدة لتسجيل الدخول
            lastLogin: userData?.lastLogin || null,
            lastLogout: userData?.lastLogout || null,
            isOnline: userData?.isOnline || false,
            loginHistory: userData?.loginHistory || []
        };

        // التحقق من البيانات
        if (!formData.name || !formData.email || !formData.role || !formData.department) {
            Loading.hide();
            Notification.error('يرجى ملء جميع الحقول المطلوبة');
            // استعادة الزر عند الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        if (!Utils.isValidEmail(formData.email)) {
            Loading.hide();
            Notification.error('يرجى إدخال بريد إلكتروني صحيح');
            // استعادة الزر عند الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        const isNewUser = !this.currentEditId;
        const passwordUpdated = trimmedPasswordInput.length > 0;
        const previousUser = this.currentEditId
            ? AppState.appData.users.find(u => u.id === this.currentEditId)
            : null;

        // الهاش الصالح فقط هو SHA-256 بطول 64 — '***' و '' ليست هاش حقيقي
        const _isValidHash = (h) => !!(h && h !== '***' && typeof Utils !== 'undefined' && Utils.isSha256Hex && Utils.isSha256Hex(h));
        let passwordHashToStore = _isValidHash(previousUser?.passwordHash) ? previousUser.passwordHash : '';
        let forcePasswordChange = previousUser?.forcePasswordChange ?? false;
        let passwordChangedFlag = previousUser?.passwordChanged ?? false;

        if (isNewUser) {
            if (!passwordUpdated) {
                Loading.hide();
                Notification.error('يرجى إدخال كلمة المرور');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                return;
            }
            if (trimmedPasswordInput.length < 6) {
                Loading.hide();
                Notification.error('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                return;
            }
            passwordHashToStore = await Utils.hashPassword(trimmedPasswordInput);
            forcePasswordChange = true;
            passwordChangedFlag = false;
        } else if (passwordUpdated) {
            if (trimmedPasswordInput.length < 6) {
                Loading.hide();
                Notification.error('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
                return;
            }
            passwordHashToStore = await Utils.hashPassword(trimmedPasswordInput);
            forcePasswordChange = true;
            passwordChangedFlag = false;
        }
        // ملاحظة: إذا لم يتم تغيير كلمة المرور ولم يكن هناك هاش محلي صالح،
        // لا نُوقف الحفظ — الـ backend يحتفظ بالهاش الموجود في الشيت.

        formData.password = '***';
        // إرسال passwordHash فقط إذا كان هناك هاش صالح (تم تغيير كلمة المرور أو كان محفوظاً محلياً)
        // عدم الإرسال = الـ backend يحتفظ بالهاش الحالي في Google Sheets تلقائياً
        if (passwordHashToStore) {
            formData.passwordHash = passwordHashToStore;
        } else {
            delete formData.passwordHash;
        }
        formData.forcePasswordChange = forcePasswordChange;
        formData.passwordChanged = passwordChangedFlag;

        // التحقق من عدم تكرار البريد الإلكتروني
        const existingUser = AppState.appData.users.find(u =>
            u.email === formData.email && u.id !== formData.id
        );
        if (existingUser) {
            Loading.hide();
            Notification.error('البريد الإلكتروني مستخدم بالفعل');
            // استعادة الزر عند الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            return;
        }

        try {
            const isNewUser = !this.currentEditId;

            if (isNewUser) {
                // إضافة مستخدم جديد
                AppState.appData.users.push(formData);

                // حفظ البيانات محلياً أولاً
                // حفظ البيانات باستخدام window.DataManager
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                } else {
                    Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                }

                // إزالة الحسابات الافتراضية إذا تم إضافة مستخدم جديد
                if (typeof removeDefaultUsersIfNeeded === 'function') {
                    try {
                        await removeDefaultUsersIfNeeded();
                    } catch (removeError) {
                        Utils.safeWarn('⚠ خطأ في إزالة الحسابات الافتراضية:', removeError);
                    }
                }

                // إظهار رسالة نجاح فورية للمستخدم
                Notification.success('تم إضافة المستخدم بنجاح');
                
                // إخفاء مؤشر التحميل بعد الحفظ المحلي
                Loading.hide();
                
                // المزامنة مع Google Sheets في الخلفية (غير متزامنة)
                if (AppState.googleConfig.appsScript.enabled) {
                    // تشغيل المزامنة في الخلفية بدون انتظار
                    GoogleIntegration.immediateSyncWithRetry('addUser', formData, 3)
                        .then(addUserResult => {
                            if (addUserResult && addUserResult.success) {
                                Utils.safeLog('✅ تم إضافة المستخدم الجديد إلى Google Sheets بنجاح');
                                Notification.success('تم المزامنة مع Google Sheets بنجاح');
                            } else if (addUserResult && addUserResult.shouldDefer) {
                                // فشلت جميع المحاولات - أضف إلى قائمة الانتظار
                                Utils.safeWarn('⚠️ فشلت المزامنة بعد 3 محاولات:', addUserResult?.message);
                                if (typeof DataManager !== 'undefined' && DataManager.addToPendingSync) {
                                    DataManager.addToPendingSync('Users', AppState.appData.users);
                                }
                                Notification.warning('سيتم المزامنة مع Google Sheets تلقائياً لاحقاً.');
                            } else {
                                // خطأ في البيانات أو مشكلة أخرى
                                Utils.safeWarn('⚠️ فشل إضافة المستخدم:', addUserResult?.message);
                                Notification.warning('فشلت المزامنة مع Google Sheets. سيتم المحاولة لاحقاً.');
                            }
                        })
                        .catch(addUserError => {
                            Utils.safeError('❌ خطأ غير متوقع في إضافة المستخدم:', addUserError);
                            Notification.warning('حدث خطأ في المزامنة مع Google Sheets. سيتم المحاولة لاحقاً.');
                        });
                }
            } else {
                // تحديث مستخدم موجود
                const index = AppState.appData.users.findIndex(u => u.id === this.currentEditId);
                if (index !== -1) {
                    const previous = AppState.appData.users[index];
                    // الحفاظ على حالة isOnline إذا كان المستخدم متصل حالياً
                    const isCurrentlyLoggedIn = AppState.currentUser && 
                        AppState.currentUser.email && 
                        formData.email.toLowerCase() === AppState.currentUser.email.toLowerCase();
                    const finalFormData = {
                        ...formData,
                        // إذا كان المستخدم متصل حالياً، نحافظ على isOnline = true
                        isOnline: isCurrentlyLoggedIn ? true : formData.isOnline
                    };
                    AppState.appData.users[index] = { ...previous, ...finalFormData };
                }

                // حفظ البيانات محلياً
                // حفظ البيانات باستخدام window.DataManager
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                } else {
                    Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
                }

                // إظهار رسالة نجاح فورية للمستخدم
                Notification.success('تم تحديث المستخدم بنجاح');
                
                // إخفاء مؤشر التحميل بعد الحفظ المحلي
                Loading.hide();
                
                // المزامنة مع Google Sheets في الخلفية (غير متزامنة)
                if (AppState.googleConfig.appsScript.enabled) {
                    // تشغيل المزامنة في الخلفية بدون انتظار
                    GoogleIntegration.immediateSyncWithRetry('updateUser', {
                        userId: formData.id,
                        updateData: formData
                    }, 3)
                        .then(updateResult => {
                            if (updateResult && updateResult.success) {
                                Utils.safeLog('✅ تم تحديث المستخدم في Google Sheets بنجاح');
                                Notification.success('تم المزامنة مع Google Sheets بنجاح');
                            } else if (updateResult && updateResult.shouldDefer) {
                                // فشلت جميع المحاولات - أضف إلى قائمة الانتظار
                                Utils.safeWarn('⚠️ فشلت المزامنة بعد 3 محاولات:', updateResult?.message);
                                GoogleIntegration.autoSave('Users', AppState.appData.users)
                                    .catch(err => Utils.safeWarn('⚠️ خطأ في autoSave:', err));
                                Notification.warning('سيتم المزامنة مع Google Sheets تلقائياً لاحقاً.');
                            } else {
                                // خطأ في البيانات
                                Utils.safeWarn('⚠️ فشل تحديث المستخدم:', updateResult?.message);
                                Notification.warning('فشلت المزامنة مع Google Sheets. سيتم المحاولة لاحقاً.');
                            }
                        })
                        .catch(updateError => {
                            Utils.safeError('❌ خطأ غير متوقع في تحديث المستخدم:', updateError);
                            GoogleIntegration.autoSave('Users', AppState.appData.users)
                                .catch(err => Utils.safeWarn('⚠️ خطأ في autoSave:', err));
                            Notification.warning('حدث خطأ في المزامنة مع Google Sheets. سيتم المحاولة لاحقاً.');
                        });
                }
            }

            // ✅ إصلاح: تحديث صورة المستخدم والصلاحيات في الشريط الجانبي إذا كان المستخدم الحالي
            // المقارنة غير حساسة لحالة الأحرف: formData.email دائماً lowercase بينما جلسة الدخول قد تحتفظ بالبريد كما أُدخل
            const isEditingCurrentUser = AppState.currentUser && (
                (formData.email || '').toLowerCase() === (AppState.currentUser.email || '').toLowerCase() ||
                (formData.id && AppState.currentUser.id && String(formData.id).trim() === String(AppState.currentUser.id).trim())
            );
            if (isEditingCurrentUser) {
                // ✅ إصلاح: تحديث بيانات المستخدم الحالي مع الحفاظ على loginTime
                AppState.currentUser = { 
                    ...AppState.currentUser, 
                    ...formData,
                    loginTime: AppState.currentUser.loginTime // الحفاظ على وقت تسجيل الدخول
                };
                
                // ✅ إصلاح: تطبيع الصلاحيات قبل التحديث
                if (formData.permissions && typeof formData.permissions === 'object') {
                    const normalizedPermissions = typeof Permissions !== 'undefined' && typeof Permissions.normalizePermissions === 'function'
                        ? Permissions.normalizePermissions(formData.permissions)
                        : formData.permissions;
                    AppState.currentUser.permissions = normalizedPermissions || {};
                } else {
                    AppState.currentUser.permissions = {};
                }
                
                // ✅ إصلاح: تحديث الجلسة بالصلاحيات الجديدة (مزامنة فورية)
                let sessionUpdated = false;
                if (typeof window.Auth !== 'undefined' && typeof window.Auth.updateUserSession === 'function') {
                    sessionUpdated = !!window.Auth.updateUserSession();
                    if (sessionUpdated) {
                        Utils.safeLog('✅ تم تحديث جلسة المستخدم الحالي بالصلاحيات الجديدة');
                        Notification.success('تم تحديث صلاحياتك بنجاح. الصلاحيات الجديدة متاحة الآن بدون الحاجة لتسجيل الخروج.');
                    }
                } else {
                    if (typeof Permissions !== 'undefined' && typeof Permissions.updateNavigation === 'function') {
                        Permissions.updateNavigation();
                    }
                    Notification.info('تم تحديث بياناتك. قد تحتاج لتحديث الصفحة لرؤية التغييرات.');
                }
                // إذا تخطّى Auth.updateUserSession (مهلة 500ms أو قيد تنفيذ) لم يُستدعَ تحديث الصورة داخل Auth — نحدّث الشريط من AppState
                if (!sessionUpdated && typeof UI !== 'undefined' && typeof UI.updateUserProfilePhoto === 'function') {
                    UI.updateUserProfilePhoto();
                }
                if (typeof UI !== 'undefined' && AppState.currentSection === 'profile' && typeof UI.renderMyProfileSection === 'function') {
                    Promise.resolve(UI.renderMyProfileSection()).catch(() => { /* ignore */ });
                }
            } else {
                // ✅ إصلاح: تحديث جلسة المستخدم المعدل إذا كان متصل حالياً
                // البحث عن المستخدم المعدل في الجلسات النشطة
                const updatedUser = AppState.appData.users.find(u => u.id === formData.id);
                if (updatedUser && updatedUser.isOnline === true) {
                    // المستخدم متصل - يجب تحديث جلسته
                    // سيتم تحديث الجلسة تلقائياً عند المزامنة التالية
                    Utils.safeLog(`✅ تم تحديث بيانات المستخدم ${updatedUser.email} - سيتم تحديث جلسته عند المزامنة التالية`);
                }
            }
            
            // ✅ إصلاح: تحديث القائمة الجانبية تلقائياً بعد تحديث الصلاحيات
            if (typeof Permissions !== 'undefined' && typeof Permissions.updateNavigation === 'function') {
                Permissions.updateNavigation();
                Utils.safeLog('✅ تم تحديث القائمة الجانبية بعد تحديث الصلاحيات');
            }

            // ✅ تحديث فوري للصلاحيات في نفس المتصفح (تبويبات متعددة) + طلب مزامنة للأجهزة الأخرى
            try {
                if (typeof window.RealtimeSyncManager !== 'undefined' && typeof window.RealtimeSyncManager.broadcast === 'function') {
                    // إرسال تحديث مباشر (للجهاز/المتصفح نفسه)
                    window.RealtimeSyncManager.broadcast('user-permissions-updated', 'users', {
                        id: formData.id,
                        email: formData.email,
                        role: formData.role,
                        active: formData.active,
                        permissions: formData.permissions
                    });
                    // طلب مزامنة users (يفيد في تبويب آخر أو لتسريع الالتقاط في الدورة القادمة)
                    window.RealtimeSyncManager.broadcast('sync-request', 'users');
                }
            } catch (e) { /* ignore */ }
            
            // استعادة الزر بعد النجاح
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }

            // إغلاق نافذة الإضافة/التعديل المنبثقة
            document.getElementById('user-form-modal-overlay')?.remove();

            // عرض بطاقة الحساب الجديدة للمشاركة والنسخ عند الإضافة أو تحديث كلمة المرور
            if (isNewUser || passwordUpdated) {
                this.showUserCredentialsModal({
                    name: formData.name,
                    email: formData.email,
                    password: rawPasswordInput || trimmedPasswordInput,
                    role: formData.role,
                    department: formData.department
                });
            }

            this.showList();
        } catch (error) {
            Loading.hide();
            Utils.safeError('خطأ في حفظ المستخدم:', error);
            Notification.error('حدث خطأ: ' + error.message);
            
            // استعادة الزر في حالة الخطأ
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            
            // في حالة الخطأ، نعيد المستخدم إلى النموذج بدلاً من القائمة
            // this.showList(); // تم تعطيله ليبقى المستخدم في النموذج لتصحيح الخطأ
        }
    },

    async editUser(userId) {
        // التحقق من الصلاحيات
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function')
            ? Permissions.isCurrentUserAdmin()
            : (AppState.currentUser?.role || '').toLowerCase() === 'admin';

        if (!isAdmin) {
            Notification.error('ليس لديك صلاحية لتعديل المستخدمين');
            return;
        }

        const user = AppState.appData.users.find(u => u.id === userId);
        if (user) {
            await this.showForm(user);
        } else {
            Notification.error('المستخدم غير موجود');
        }
    },

    async disableUserMfa(userId, userEmail) {
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function')
            ? Permissions.isCurrentUserAdmin()
            : (AppState.currentUser?.role || '').toLowerCase() === 'admin';

        if (!isAdmin) {
            Notification.error('ليس لديك صلاحية لتعطيل MFA');
            return;
        }

        const user = (AppState.appData.users || []).find(u => u && (u.id === userId || u.email === userEmail));
        if (!user) {
            Notification.error('المستخدم غير موجود');
            return;
        }
        const confirmed = await Utils.confirmDialog(
            'تعطيل MFA',
            `تعطيل المصادقة الثنائية للمستخدم "${user.name}" (${user.email})؟`,
            'تعطيل',
            'إلغاء'
        );
        if (!confirmed) return;
        Loading.show();
        try {
            const result = await Auth.adminDisableUserMfa(user.email);
            Loading.hide();
            if (result && result.success) this.load();
        } catch (e) {
            Loading.hide();
            Notification.error('فشل تعطيل MFA');
        }
    },

    async resetUserPassword(userId, userEmail) {
        // التحقق من الصلاحيات
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function')
            ? Permissions.isCurrentUserAdmin()
            : (AppState.currentUser?.role || '').toLowerCase() === 'admin';

        if (!isAdmin) {
            Notification.error('ليس لديك صلاحية لإعادة تعيين كلمة المرور');
            return;
        }

        const user = AppState.appData.users.find(u => u.id === userId || u.email === userEmail);
        if (!user) {
            Notification.error('المستخدم غير موجود');
            return;
        }

        const confirmed = await Utils.confirmDialog(
            'إعادة تعيين كلمة المرور',
            `هل أنت متأكد من إعادة تعيين كلمة المرور للمستخدم "${user.name}" (${user.email})؟\n\nسيتم إنشاء كلمة مرور مؤقتة جديدة.`,
            'إعادة التعيين',
            'إلغاء'
        );

        if (!confirmed) return;

        try {
            Loading.show();

            // استدعاء دالة إعادة تعيين كلمة المرور
            const result = await Auth.resetPassword(user.email);

            Loading.hide();

            if (result && result.success) {
                // عرض كلمة المرور المؤقتة للمدير
                const tempPassword = result.tempPassword || 'غير متاح';
                const passwordMessage = `
                    <div style="text-align: right; direction: rtl;">
                        <p style="margin-bottom: 10px; font-weight: bold;">تم إعادة تعيين كلمة المرور بنجاح!</p>
                        <p style="margin-bottom: 10px;">كلمة المرور المؤقتة للمستخدم <strong>${Utils.escapeHTML(user.email)}</strong>:</p>
                        <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 10px 0; font-family: monospace; font-size: 16px; text-align: center; direction: ltr;">
                            <strong>${Utils.escapeHTML(tempPassword)}</strong>
                        </div>
                        <p style="margin-top: 10px; color: #666; font-size: 14px;">
                            ⚠️ يرجى إبلاغ المستخدم بكلمة المرور المؤقتة. سيُطلب منه تغييرها عند تسجيل الدخول.
                        </p>
                    </div>
                `;

                // إنشاء modal لعرض كلمة المرور
                const modal = document.createElement('div');
                modal.className = 'modal-overlay';
                modal.innerHTML = `
                    <div class="modal-content" style="max-width: 500px;">
                        <div class="modal-header">
                            <h3>كلمة المرور المؤقتة</h3>
                            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            ${passwordMessage}
                        </div>
                        <div class="modal-footer">
                            <button class="btn-primary" onclick="this.closest('.modal-overlay').remove()">
                                <i class="fas fa-check ml-2"></i>
                                تم
                            </button>
                            <button class="btn-secondary" onclick="navigator.clipboard.writeText('${tempPassword}').then(() => Notification.success('تم نسخ كلمة المرور')).catch(() => {})">
                                <i class="fas fa-copy ml-2"></i>
                                نسخ
                            </button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                // إغلاق عند النقر خارج الـ modal
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });

                // تحديث قائمة المستخدمين
                this.loadUsersList();
            } else {
                Notification.error(result?.message || 'فشل إعادة تعيين كلمة المرور');
            }
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + error.message);
            Utils.safeError('خطأ في إعادة تعيين كلمة المرور:', error);
        }
    },

    async deleteUser(userId) {
        // التحقق من الصلاحيات
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function')
            ? Permissions.isCurrentUserAdmin()
            : (AppState.currentUser?.role || '').toLowerCase() === 'admin';

        if (!isAdmin) {
            Notification.error('ليس لديك صلاحية لحذف المستخدمين');
            return;
        }

        const user = AppState.appData.users.find(u => u.id === userId);
        if (!user) {
            Notification.error('المستخدم غير موجود');
            return;
        }

        // منع حذف المستخدم الحالي
        if (AppState.currentUser && user.id === AppState.currentUser.id) {
            Notification.error('لا يمكنك حذف حسابك الخاص');
            return;
        }

        // منع حذف آخر مدير في النظام
        const adminUsers = AppState.appData.users.filter(u => u.role === 'admin' && u.active !== false);
        if (user.role === 'admin' && adminUsers.length === 1) {
            Notification.error('لا يمكن حذف آخر مدير في النظام');
            return;
        }

        const confirmed = await Utils.confirmDialog(
            'حذف المستخدم',
            `هل أنت متأكد من حذف المستخدم "${user.name}" (${user.email})؟\n\nهذا الإجراء لا يمكن التراجع عنه.`,
            'حذف',
            'إلغاء'
        );

        if (!confirmed) return;

        Loading.show();

        try {
            let deleteSuccess = false;

            // 1) حذف من قاعدة البيانات (Google Sheets) أولاً ثم تحديث الواجهة
            if (AppState.googleConfig.appsScript.enabled) {
                try {
                    const result = await GoogleIntegration.sendToAppsScript('deleteUser', { userId });
                    deleteSuccess = result && result.success === true;
                    if (!deleteSuccess && result && result.message) {
                        throw new Error(result.message);
                    }
                } catch (error) {
                    // محاولة بديلة: حفظ قائمة المستخدمين بعد إزالة المستخدم
                    const filteredUsers = AppState.appData.users.filter(u => u.id !== userId);
                    try {
                        await GoogleIntegration.autoSave('Users', filteredUsers);
                        deleteSuccess = true;
                    } catch (autoSaveErr) {
                        Utils.safeWarn('⚠️ فشل الحذف من Google Sheets وبديل autoSave:', autoSaveErr);
                        Loading.hide();
                        Notification.error('فشل حذف المستخدم من قاعدة البيانات: ' + (error.message || error));
                        Utils.safeError('خطأ في حذف المستخدم:', error);
                        return;
                    }
                }
            } else {
                await GoogleIntegration.autoSave('Users', AppState.appData.users.filter(u => u.id !== userId));
                deleteSuccess = true;
            }

            if (!deleteSuccess) {
                Loading.hide();
                Notification.error('فشل حذف المستخدم من قاعدة البيانات');
                return;
            }

            // 2) بعد نجاح الحذف في الخلفية: تحديث الحالة المحلية والحفظ المحلي
            AppState.appData.users = AppState.appData.users.filter(u => u.id !== userId);
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                window.DataManager.save();
            } else {
                Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
            }

            Loading.hide();
            Notification.success('تم حذف المستخدم بنجاح');
            this.loadUsersList();
        } catch (error) {
            Loading.hide();
            Notification.error('حدث خطأ: ' + (error && error.message ? error.message : String(error)));
            Utils.safeError('خطأ في حذف المستخدم:', error);
        }
    },

    filterUsers(searchTerm = '', roleFilter = '') {
        const users = AppState.appData.users || [];
        let filtered = users;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(user =>
                user.name?.toLowerCase().includes(term) ||
                user.email?.toLowerCase().includes(term) ||
                user.department?.toLowerCase().includes(term)
            );
        }

        if (roleFilter) {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        // تحديث الجدول
        const tbody = document.querySelector('#users-table-container tbody');
        if (tbody) {
            if (filtered.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center text-gray-500 py-8">
                            لا توجد نتائج
                        </td>
                    </tr>
                `;
            } else {
                tbody.innerHTML = filtered.map(user => `
                    <tr>
                        <td>${Utils.escapeHTML(user.name || '')}</td>
                        <td>${Utils.escapeHTML(user.email || '')}</td>
                        <td>
                            <span class="badge badge-${this.getRoleBadgeClass(user.role)}">
                                ${this.getRoleName(user.role)}
                            </span>
                        </td>
                        <td>${Utils.escapeHTML(user.department || '')}</td>
                        <td>
                            <span class="badge badge-${user.active !== false ? 'success' : 'danger'}">
                                ${user.active !== false ? 'نشط' : 'غير نشط'}
                            </span>
                        </td>
                        <td>${user.createdAt ? Utils.formatDate(user.createdAt) : '-'}</td>
                        <td>
                            <div class="flex items-center gap-2">
                                <button 
                                    onclick="Users.editUser('${user.id}')" 
                                    class="btn-icon btn-icon-primary"
                                    title="تعديل"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button 
                                    onclick="Users.deleteUser('${user.id}')" 
                                    class="btn-icon btn-icon-danger"
                                    title="حذف"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }
        }
    },

    async showImportExcel() {
        // التحقق من الصلاحيات
        const isAdmin = (typeof Permissions !== 'undefined' && typeof Permissions.isCurrentUserAdmin === 'function')
            ? Permissions.isCurrentUserAdmin()
            : (AppState.currentUser?.role || '').toLowerCase() === 'admin';

        if (!isAdmin) {
            Notification.error('ليس لديك صلاحية لاستيراد المستخدمين');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-file-excel ml-2"></i>استيراد الموظين من ملف Excel</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded p-4">
                            <p class="text-sm text-blue-800 mb-2"><strong>ملاحظة مهمة:</strong></p>
                            <p class="text-sm text-blue-700">يجب أن يحتوي ملف Excel على الأعمدة التالية:</p>
                            <ul class="text-sm text-blue-700 list-disc mr-6 mt-2">
                                <li><strong>الاسم</strong> أو <strong>Name</strong> - إلزامي</li>
                                <li><strong>البريد الإلكتروني</strong> أو <strong>Email</strong> - إلزامي</li>
                                <li><strong>الدور</strong> أو <strong>Role</strong> (مدير، مسؤول السلامة، مستخدم)</li>
                                <li><strong>القسم</strong> أو <strong>Department</strong></li>
                            </ul>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-file-excel ml-2"></i>
                                اختر ملف Excel (.xlsx, .xls)
                            </label>
                            <input type="file" id="excel-file-input" accept=".xlsx,.xls" class="form-input">
                        </div>
                        <div id="import-preview" class="hidden">
                            <h3 class="text-sm font-semibold mb-2">معاينة البيانات (أول 5 صو):</h3>
                            <div class="max-h-60 overflow-auto border rounded">
                                <table class="data-table text-xs">
                                    <thead id="preview-head"></thead>
                                    <tbody id="preview-body"></tbody>
                                </table>
                            </div>
                            <p id="preview-count" class="text-sm text-gray-600 mt-2"></p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                    <button id="confirm-import-btn" class="btn-primary" disabled>
                        <i class="fas fa-upload ml-2"></i>استيراد البيانات
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const fileInput = document.getElementById('excel-file-input');
        const confirmBtn = document.getElementById('confirm-import-btn');
        let importedData = [];

        // تحميل SheetJS إذا لم يكن محملاً
        const loadSheetJS = () => {
            if (typeof XLSX === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
                script.onerror = function() {
                    this.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
                };
                script.onload = () => {
                    fileInput.addEventListener('change', (e) => {
                        importedData = [];
                        this.handleExcelFile(e.target.files[0], modal, confirmBtn, (data) => {
                            importedData = data;
                        });
                    });
                };
                document.head.appendChild(script);
            } else {
                fileInput.addEventListener('change', (e) => {
                    importedData = [];
                    this.handleExcelFile(e.target.files[0], modal, confirmBtn, (data) => {
                        importedData = data;
                    });
                });
            }
        };

        loadSheetJS();

        confirmBtn.addEventListener('click', async () => {
            if (importedData.length === 0) {
                Notification.error('يرجى تحميل مل Excel أولاً');
                return;
            }
            await this.processImport(importedData, modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    handleExcelFile(file, modal, confirmBtn, callback) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                Loading.show();
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                if (jsonData.length === 0) {
                    Loading.hide();
                    Notification.error('الملف فارغ أو غير صحيح');
                    return;
                }

                if (callback) callback(jsonData);

                // عرض المعاينة
                const preview = document.getElementById('import-preview');
                const previewHead = document.getElementById('preview-head');
                const previewBody = document.getElementById('preview-body');
                const previewCount = document.getElementById('preview-count');

                if (preview && jsonData.length > 0) {
                    const headers = Object.keys(jsonData[0]);
                    previewHead.innerHTML = `<tr>${headers.map(h => `<th class="px-2 py-1">${Utils.escapeHTML(h)}</th>`).join('')}</tr>`;
                    previewBody.innerHTML = jsonData.slice(0, 5).map(row =>
                        `<tr>${headers.map(h => `<td class="px-2 py-1">${Utils.escapeHTML(String(row[h] || ''))}</td>`).join('')}</tr>`
                    ).join('');
                    previewCount.textContent = `إجمالي الصفوف: ${jsonData.length}`;
                    preview.classList.remove('hidden');
                    confirmBtn.disabled = false;
                }

                Loading.hide();
            } catch (error) {
                Loading.hide();
                Notification.error('فشل قراءة الملف: ' + error.message);
            }
        };
        reader.readAsArrayBuffer(file);
    },

    async processImport(data, modal) {
        try {
            Loading.show();
            let successCount = 0;
            let errorCount = 0;
            const errors = [];

            for (const row of data) {
                try {
                    const nameField = row['الاسم'] || row['Name'] || row['name'] || row['NAME'] || '';
                    const emailField = row['البريد الإلكتروني'] || row['Email'] || row['email'] || row['EMAIL'] || '';
                    const roleField = row['الدور'] || row['Role'] || row['role'] || row['ROLE'] || 'user';
                    const deptField = row['القسم'] || row['Department'] || row['department'] || row['DEPARTMENT'] || '';

                    if (!nameField || !emailField) {
                        errorCount++;
                        errors.push(`صف بدون اسم أو بريد: ${JSON.stringify(row)}`);
                        continue;
                    }

                    if (!Utils.isValidEmail(emailField)) {
                        errorCount++;
                        errors.push(`بريد غير صحيح: ${emailField}`);
                        continue;
                    }

                    // التحقق من عدم التكرار
                    const existing = AppState.appData.users.find(u => u.email === emailField.toLowerCase());
                    if (existing) {
                        errorCount++;
                        continue;
                    }

                    // إنشاء كلمة مرور مؤقتة قوية
                    const randomPart = Math.random().toString(36).substring(2, 10);
                    const timestamp = Date.now().toString(36).substring(5, 9);
                    const tempPassword = 'Temp' + randomPart + timestamp + '!';

                    // تشفير كلمة المرور
                    const passwordHash = await Utils.hashPassword(tempPassword);

                    const user = {
                        id: Utils.generateId('USER'),
                        name: nameField.trim(),
                        email: emailField.toLowerCase().trim(),
                        password: '***',
                        passwordHash: passwordHash,
                        role: this.mapRole(roleField),
                        department: deptField.trim(),
                        active: true,
                        permissions: this.mapRole(roleField) === 'admin' ? {} : undefined,
                        forcePasswordChange: true,
                        passwordChanged: false,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };

                    AppState.appData.users.push(user);
                    successCount++;
                } catch (err) {
                    errorCount++;
                }
            }

            // إزالة الحسابات الافتراضية بعد استيراد المستخدمين
            if (successCount > 0 && typeof removeDefaultUsersIfNeeded === 'function') {
                try {
                    await removeDefaultUsersIfNeeded();
                } catch (removeError) {
                    Utils.safeWarn('⚠ خطأ في إزالة الحسابات الافتراضية بعد الاستيراد:', removeError);
                }
            }

            // حفظ البيانات باستخدام window.DataManager
        if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
            window.DataManager.save();
        } else {
            Utils.safeWarn('⚠️ DataManager غير متاح - لم يتم حفظ البيانات');
        }

            // حفظ تلقائي في Google Sheets
            if (successCount > 0) {
                await GoogleIntegration.autoSave('Users', AppState.appData.users);
            }

            Loading.hide();
            Notification.success(`تم استيراد ${successCount} موظ${errorCount > 0 ? ` (فشل ${errorCount})` : ''}`);
            modal.remove();
            this.loadUsersList();
        } catch (error) {
            Loading.hide();
            Notification.error('فشل الاستيراد: ' + error.message);
        }
    },

    mapRole(roleText) {
        const text = String(roleText || '').toLowerCase().trim();
        if (text.includes('مدير') || text.includes('admin')) return 'admin';
        if (text.includes('سلامة') || text.includes('safety')) return 'safety_officer';
        return 'user';
    },

    async convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    collectPermissions() {
        const permissions = {};
        
        // جميع الموديولات المتاحة غير الخاصة بالإدارة العليا
        if (typeof MODULE_PERMISSIONS_CONFIG !== 'undefined' && Array.isArray(MODULE_PERMISSIONS_CONFIG)) {
            MODULE_PERMISSIONS_CONFIG.forEach(module => {
                if (!module.adminOnly) {
                    const checkbox = document.querySelector(`.user-permission-checkbox[data-module="${module.key}"]`);
                    if (checkbox && !checkbox.disabled) {
                        permissions[module.key] = checkbox.checked;
                    }
                }
            });
        }

        // إضافة الصلاحيات التفصيلية بشكل صحيح
        if (this.currentDetailedPermissions && typeof this.currentDetailedPermissions === 'object') {
            Object.assign(permissions, this.currentDetailedPermissions);
        }

        // تنظيف الصلاحيات التفصيلية للموديولات غير المحددة
        if (typeof MODULE_PERMISSIONS_CONFIG !== 'undefined') {
            MODULE_PERMISSIONS_CONFIG.forEach(module => {
                if (!permissions[module.key]) {
                    delete permissions[`${module.key}Permissions`];
                }
            });
        }

        return permissions;
    },

    setupPhotoPreview() {
        const photoInput = document.getElementById('user-photo-input');
        const preview = document.getElementById('user-photo-preview');
        const icon = document.getElementById('user-photo-icon');

        if (photoInput && preview && icon) {
            photoInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        preview.src = e.target.result;
                        preview.style.display = 'block';
                        icon.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    },

    /**
     * بدء التحديث التلقائي لحالة الاتصال وآخر تسجيل دخول
     */
    startAutoRefresh() {
        // إيقاف التحديث السابق إن وجد
        this.stopAutoRefresh();

        // بدء التحديث التلقائي كل 5 ثوان
        this.autoRefreshInterval = setInterval(() => {
            // التحقق من أن الموديول مفتوح حالياً
            const section = document.getElementById('users-section');
            if (section && section.style.display !== 'none' && !section.hidden) {
                // تحديث الجدول فقط (بدون إعادة تحميل كامل)
                this.refreshUsersTable();
            }
        }, this.refreshInterval);

        Utils.safeLog('✅ تم تفعيل التحديث التلقائي لحالة الاتصال وآخر تسجيل دخول');
    },

    /**
     * إيقاف التحديث التلقائي
     */
    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
            Utils.safeLog('🛑 تم إيقاف التحديث التلقائي');
        }
    },

    /**
     * تحديث جدول المستخدمين فقط (بدون إعادة تحميل كامل)
     * يركز على تحديث حالة الاتصال وآخر تسجيل دخول
     */
    refreshUsersTable() {
        const container = document.getElementById('users-table-container');
        if (!container) return;

        const tbody = container.querySelector('tbody');
        if (!tbody) {
            // إذا لم يكن الجدول موجوداً، نقوم بتحميله كاملاً
            this.loadUsersList();
            return;
        }

        const users = AppState.appData.users || [];
        
        // تحديث كل صف في الجدول باستخدام email للبحث
        tbody.querySelectorAll('tr').forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 9) return;

            // الحصول على email من العمود الثاني (index 1)
            const rowEmail = cells[1]?.textContent?.trim();
            if (!rowEmail) return;

            // البحث عن المستخدم المناسب في المصفوفة
            const user = users.find(u => u.email && u.email.toLowerCase().trim() === rowEmail.toLowerCase().trim());
            if (!user) return;

            const isOnline = user.isOnline === true;
            const lastLoginTime = user.lastLogin ? Utils.formatDateTime(user.lastLogin) : '-';

            // خلية حالة الاتصال (العمود 8 - index 7)
            const connectionCell = cells[7];
            if (connectionCell) {
                connectionCell.innerHTML = `
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}" style="animation: ${isOnline ? 'pulse 2s infinite' : 'none'};"></div>
                        <span class="text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}">
                            ${isOnline ? 'متصل' : 'غير متصل'}
                        </span>
                    </div>
                `;
            }

            // خلية آخر تسجيل دخول (العمود 9 - index 8)
            const lastLoginCell = cells[8];
            if (lastLoginCell) {
                lastLoginCell.innerHTML = `
                    <span class="text-sm text-gray-600" title="${user.lastLogin || '-'}">
                        ${lastLoginTime}
                    </span>
                `;
            }
        });
    },

    /**
     * تحديث حالة مستخدم محدد في الجدول
     */
    updateUserStatus(userId) {
        const container = document.getElementById('users-table-container');
        if (!container) return;

        const tbody = container.querySelector('tbody');
        if (!tbody) return;

        const user = AppState.appData.users.find(u => u.id === userId);
        if (!user) return;

        // البحث عن الصف المناسب
        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                // التحقق من أن هذا الصف للمستخدم المطلوب
                // يمكن التحقق من خلال email أو id في البيانات
                const userEmail = user.email;
                const rowEmail = cells[1]?.textContent?.trim();
                
                if (rowEmail === userEmail) {
                    const isOnline = user.isOnline === true;
                    const lastLoginTime = user.lastLogin ? Utils.formatDateTime(user.lastLogin) : '-';

                    // تحديث حالة الاتصال
                    if (cells[7]) {
                        cells[7].innerHTML = `
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}" style="animation: ${isOnline ? 'pulse 2s infinite' : 'none'};"></div>
                                <span class="text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}">
                                    ${isOnline ? 'متصل' : 'غير متصل'}
                                </span>
                            </div>
                        `;
                    }

                    // تحديث آخر تسجيل دخول
                    if (cells[8]) {
                        cells[8].innerHTML = `
                            <span class="text-sm text-gray-600" title="${user.lastLogin || '-'}">
                                ${lastLoginTime}
                            </span>
                        `;
                    }
                    
                    // إذا كان المستخدم المحدث هو المستخدم الحالي، نحدث زر حالة الاتصال
                    if (AppState.currentUser && AppState.currentUser.email && 
                        userEmail.toLowerCase() === AppState.currentUser.email.toLowerCase() &&
                        typeof UI !== 'undefined' && typeof UI.updateUserConnectionStatus === 'function') {
                        setTimeout(() => {
                            UI.updateUserConnectionStatus();
                        }, 100);
                    }
                }
            }
        });
    },

    /**
     * إعداد الاستماع لتغيير الأقسام
     */
    setupSectionChangeListener() {
        // إزالة المستمع السابق إن وجد
        if (this.sectionChangeHandler) {
            document.removeEventListener('section-changed', this.sectionChangeHandler);
        }

        // إضافة مستمع جديد
        this.sectionChangeHandler = (event) => {
            const currentSection = event.detail?.section;
            const previousSection = event.detail?.previousSection;

            // إذا كان القسم الحالي هو users، نبدأ التحديث التلقائي
            if (currentSection === 'users') {
                this.startAutoRefresh();
            } 
            // إذا كان القسم السابق هو users والقسم الحالي ليس users، نوقف التحديث التلقائي
            else if (previousSection === 'users' && currentSection !== 'users') {
                this.stopAutoRefresh();
            }
        };

        document.addEventListener('section-changed', this.sectionChangeHandler);
    },

    /**
     * تنظيف جميع الموارد عند إلغاء تحميل الموديول
     * يمنع تسريبات الذاكرة (Memory Leaks)
     */
    cleanup() {
        try {
            if (typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('🧹 تنظيف موارد Users module...');
            }

            // إيقاف التحديث التلقائي
            this.stopAutoRefresh();

            // إزالة section change listener
            if (this.sectionChangeHandler) {
                document.removeEventListener('section-changed', this.sectionChangeHandler);
                this.sectionChangeHandler = null;
            }

            if (typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ تم تنظيف موارد Users module');
            }
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('⚠️ خطأ في تنظيف Users module:', error);
            }
        }
    }
};

// ===== Export module to global scope =====
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof Users !== 'undefined') {
            window.Users = Users;
        } else {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('❌ users.js: فشل التصدير');
            }
        }
    } catch (error) {
        if (typeof window !== 'undefined' && typeof Users !== 'undefined') {
            try {
                window.Users = Users;
            } catch (e) { /* ignore */ }
        }
    }
})();
