/**
 * NearMiss Module
 * منظومة إدارة وبلاغات الحوادث الوشيكة (SafetyHub | ICAPP)
 */
const NearMiss = {
    TYPES: [
        { value: 'سقوط أشياء / أحمال', label: 'سقوط أشياء / أحمال', icon: 'fa-arrow-down' },
        { value: 'تعثر / انزلاق', label: 'تعثر / انزلاق', icon: 'fa-walking' },
        { value: 'اقتراب معدات / فوركلفت', label: 'اقتراب معدات / فوركلفت', icon: 'fa-truck-pickup' },
        { value: 'خطر كهربائي وشيك', label: 'خطر كهربائي وشيك', icon: 'fa-bolt' },
        { value: 'تسريب مواد كيميائية / غاز', label: 'تسريب مواد كيميائية / غاز', icon: 'fa-flask' },
        { value: 'حريق وشيك', label: 'حريق وشيك', icon: 'fa-fire' },
        { value: 'حادث وشيك', label: 'حادث وشيك عام', icon: 'fa-exclamation-triangle' },
        { value: 'تصرف غير آمن', label: 'تصرف غير آمن', icon: 'fa-user-times' },
        { value: 'وضع غير آمن', label: 'وضع غير آمن', icon: 'fa-ban' },
        { value: 'مقترح', label: 'مقترح تحسين', icon: 'fa-lightbulb' }
    ],

    state: {
        activeTab: 'register', // 'register' | 'analytics'
        filters: {
            search: '',
            type: '',
            department: '',
            startDate: '',
            endDate: '',
            period: '365'
        },
        currentAttachments: [],
        editingId: null
    },

    _charts: {},

    applyModuleI18n(root) {
        const target = root || document;
        const i18nCore = (window.AppI18n && typeof window.AppI18n.applyI18n === 'function')
            ? window.AppI18n
            : ((window.I18n && typeof window.I18n.applyI18n === 'function') ? window.I18n : null);
        if (!i18nCore) return;
        if (typeof i18nCore.applyI18n === 'function') i18nCore.applyI18n(target);
        if (typeof i18nCore.applyLiteralTranslations === 'function') i18nCore.applyLiteralTranslations(target);
    },

    ensureI18nObservers(section) {},

    
    async fetchLiveNearMisses() {
        try {
            if (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.sendRequest === 'function') {
                let res = await GoogleIntegration.sendRequest({ action: 'getAllNearMisses', data: {} });
                if (!res || !res.success || !Array.isArray(res.data) || res.data.length === 0) {
                    res = await GoogleIntegration.sendRequest({
                        action: 'readFromSheet',
                        data: {
                            sheetName: 'NearMiss',
                            spreadsheetId: AppState.googleConfig?.sheets?.spreadsheetId
                        }
                    });
                }
                if (res && res.success && Array.isArray(res.data)) {
                    AppState.appData.nearmiss = res.data.map(item => this.normalizeRecord(item));
                    this.renderKpiStrip();
                    this.renderActiveTabContent();
                    if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                        try { window.DataManager.save(); } catch (_e) {}
                    }
                    console.log('✅ Fetched live Near Miss data from Google Sheets/SQL:', res.data.length);
                }
            }
        } catch(e) {
            console.warn('Could not fetch live Near Miss data:', e);
        }
    },

    async load() {
        try {
            const section = document.getElementById('nearmiss-section');
            if (!section) return;

            this.ensureDataIntegrity();
            this.renderMainLayout(section);
            this.fetchLiveNearMisses();
        } catch (error) {
            console.error('Error loading NearMiss module:', error);
        }
    },

    ensureDataIntegrity() {
        let raw = AppState.appData.nearmiss || AppState.appData.NearMiss || [];
        if (!Array.isArray(raw)) raw = [];
        AppState.appData.nearmiss = raw.map((item) => this.normalizeRecord(item));
    },

    normalizeRecord(record = {}) {
        const defaultType = this.TYPES[0].value;
        const id = record.id || record['المعرف'] || record['كود'] || record['رقم البلاغ'] || record['id'] || (typeof Utils !== 'undefined' && Utils.generateId ? Utils.generateId('NEARMISS') : ('NRM-' + Math.floor(Math.random()*100000)));
        let isoDate;
        try {
            const rawDate = record.date || record['التاريخ'] || record['تاريخ'] || record.createdAt || record['تاريخ البلاغ'];
            isoDate = rawDate ? new Date(rawDate).toISOString() : new Date().toISOString();
        } catch (error) {
            isoDate = new Date().toISOString();
        }
        
        // معالجة attachments بدقة مع دعم كافة الصيغ (Array, JSON String, Object, Base64, Google Drive, Vercel Blob, Arabic Headers)
        let attachments = [];
        const rawAtts = record.attachments || record.images || record.photos
            || record['المرفقات'] || record['مرفقات'] || record['الصور'] || record['الصورة'] || record['صورة']
            || record['رابط الصورة'] || record['رابط_الصورة'] || record['المرفق'] || record['مرفق'];
        if (Array.isArray(rawAtts)) {
            attachments = rawAtts.map(att => this.normalizeAttachment(att)).filter(Boolean);
        } else if (typeof rawAtts === 'string' && rawAtts.trim()) {
            const trimmed = rawAtts.trim();
            if (trimmed.startsWith('[')) {
                try {
                    const parsed = JSON.parse(trimmed);
                    if (Array.isArray(parsed)) attachments = parsed.map(att => this.normalizeAttachment(att)).filter(Boolean);
                } catch(e) {}
            } else if (trimmed.startsWith('{')) {
                try {
                    const parsed = JSON.parse(trimmed);
                    const norm = this.normalizeAttachment(parsed);
                    if (norm) attachments.push(norm);
                } catch(e) {}
            } else if (trimmed.length > 5 && !trimmed.startsWith('undefined') && !trimmed.startsWith('null')) {
                const parts = trimmed.split(/[\r\n,]+/).map(p => p.trim()).filter(Boolean);
                for (const p of parts) {
                    const norm = this.normalizeAttachment(p);
                    if (norm) attachments.push(norm);
                }
            }
        } else if (rawAtts && typeof rawAtts === 'object') {
            const norm = this.normalizeAttachment(rawAtts);
            if (norm) attachments.push(norm);
        }

        // فحص الحقول البديلة المباشرة للصورة (photoBase64, image, photo, photoUrl, fileId, Arabic aliases)
        const directPhoto = record.photoBase64 || record.image || record.photo || record.photoUrl || record.fileId
            || record['photoBase64'] || record['image'] || record['photo'] || record['photoUrl']
            || record['الصورة'] || record['صورة'] || record['الصور'] || record['رابط الصورة'] || record['رابط_الصورة']
            || record['صورة الحادث'] || record['معرف الملف'];
        if (directPhoto && typeof directPhoto === 'string' && directPhoto.trim().length > 5 && directPhoto.trim() !== '__stripped__') {
            const photoStr = directPhoto.trim();
            const hasExisting = attachments.some(a => a && (a.data === photoStr || a.url === photoStr || a.fileId === photoStr));
            if (!hasExisting) {
                const normDirect = this.normalizeAttachment(photoStr);
                if (normDirect) attachments.push(normDirect);
            }
        }

        const rawCorrectiveProposed = record.correctiveProposed ?? record['الإجراء المقترح'] ?? record['مقترح الإجراء'];
        const correctiveProposed = rawCorrectiveProposed === true || rawCorrectiveProposed === 'نعم' || Boolean(record.correctiveDescription || record.correctiveAction || record['الإجراء الوقائي'] || record['الإجراء التصحيحي']);

        return {
            id,
            isoCode: record.isoCode || record['الكود'] || record['الرقم المرجعي'] || record['رقم البلاغ'] || record.id || id,
            type: record.type || record['نوع الحادث'] || record['النوع'] || record['التصنيف'] || defaultType,
            severity: record.severity || record['الخطورة'] || record['مستوى الخطورة'] || record['درجة الخطورة'] || 'متوسط',
            date: isoDate,
            observerName: record.observerName || record.reportedBy || record['اسم الراصد'] || record['المبلّغ'] || record['صاحب البلاغ'] || record['الراصد'] || 'فاعل خير (سري)',
            phone: record.phone || record['الهاتف'] || record['رقم الهاتف'] || record['الجوال'] || '',
            location: record.location || record.place || record['الموقع'] || record['المصنع'] || record['الموقع / المصنع'] || '',
            department: record.department || record.departmentName || record['الإدارة'] || record['القسم'] || record['الإدارة المسؤولة'] || '',
            description: record.description || record.details || record['الوصف'] || record['تفاصيل الحادث'] || record['تفاصيل'] || '',
            correctiveProposed,
            correctiveDescription: record.correctiveDescription || record.correctiveProposed || record.correctiveAction || record['الإجراء الوقائي'] || record['الإجراء التصحيحي'] || record['الإجراء'] || '',
            attachments,
            status: record.status || record['الحالة'] || (correctiveProposed ? 'مفتوح' : 'مغلق'),
            createdAt: record.createdAt || record['تاريخ الإنشاء'] || isoDate,
            updatedAt: record.updatedAt || record['تاريخ التحديث'] || isoDate
        };
    },

    extractCleanUrl(text) {
        if (!text || typeof text !== 'string') return '';
        const trimmed = text.trim();
        if (trimmed.startsWith('data:image/') || trimmed.startsWith('blob:')) return trimmed;
        const m = trimmed.match(/https?:\/\/[^\s"',]+/i);
        return m ? m[0] : '';
    },

    extractDriveFileId(str) {
        if (!str || typeof str !== 'string') return '';
        const s = str.trim();
        const m = s.match(/[?&]id=([a-zA-Z0-9_-]{20,})/i)
            || s.match(/\/file\/d\/([a-zA-Z0-9_-]{20,})/i)
            || s.match(/\/d\/([a-zA-Z0-9_-]{20,})/i)
            || s.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]{20,})/i)
            || s.match(/\/thumbnail\?id=([a-zA-Z0-9_-]{20,})/i)
            || s.match(/\/open\?id=([a-zA-Z0-9_-]{20,})/i);
        if (m && m[1]) return m[1];
        if (/^[a-zA-Z0-9_-]{25,}$/.test(s) && !s.includes('http') && !s.startsWith('att-') && !s.startsWith('ATT_')) {
            return s;
        }
        if (typeof Utils !== 'undefined' && typeof Utils.extractDriveFileId === 'function') {
            const uId = Utils.extractDriveFileId(s);
            if (uId) return uId;
        }
        return '';
    },

    normalizeAttachment(attachment) {
        if (!attachment) return null;
        if (typeof attachment === 'string') {
            const str = attachment.trim();
            if (!str || str === '[]' || str === '{}' || str === 'null' || str === 'undefined' || str === '__stripped__') return null;
            if (str.startsWith('{') && str.endsWith('}')) {
                try {
                    const parsed = JSON.parse(str);
                    return this.normalizeAttachment(parsed);
                } catch(e) {}
            }

            const cleanUrl = this.extractCleanUrl(str);
            const fileId = this.extractDriveFileId(cleanUrl || str);
            let name = 'صورة الحادث الوشيك';
            const namePrefixMatch = str.match(/^(.+?)\s*-\s*https?:\/\//i);
            if (namePrefixMatch && namePrefixMatch[1]) {
                const cleanName = namePrefixMatch[1].trim();
                if (cleanName && cleanName.length < 100) name = cleanName;
            }

            const resolvedUrl = cleanUrl || (fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : str);
            const dataUri = resolvedUrl.startsWith('data:') ? resolvedUrl : '';

            return {
                id: fileId || ('att-' + Math.random().toString(36).substring(2, 9)),
                name: name,
                url: resolvedUrl,
                data: dataUri,
                fileId: fileId,
                type: 'image/jpeg'
            };
        }
        if (typeof attachment === 'object') {
            if (attachment.__listOnly && !attachment.url && !attachment.data && !attachment.fileId) {
                return { __listOnly: true, name: 'صورة المرفق' };
            }
            const rawSrc = String(attachment.data || attachment.url || attachment.directLink || attachment.shareableLink || attachment.link || '').trim();
            const cleanUrl = this.extractCleanUrl(rawSrc);
            const existingFileId = String(attachment.fileId || attachment.driveId || '').trim();
            const fileId = (existingFileId && !existingFileId.startsWith('att-') && !existingFileId.startsWith('ATT_'))
                ? existingFileId
                : this.extractDriveFileId(cleanUrl || rawSrc || attachment.id || '');

            const resolvedUrl = cleanUrl || (fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : rawSrc);
            const dataUri = attachment.data || (resolvedUrl.startsWith('data:') ? resolvedUrl : '');

            return {
                id: fileId || attachment.id || ('att-' + Math.random().toString(36).substring(2, 9)),
                name: attachment.name || attachment.fileName || 'صورة الحادث الوشيك',
                type: attachment.type || attachment.mimeType || 'image/jpeg',
                url: resolvedUrl,
                data: dataUri,
                fileId: fileId,
                size: attachment.size || 0,
                __listOnly: !!attachment.__listOnly
            };
        }
        return null;
    },

    getNearMissAttachmentSrc(att) {
        if (!att) return '';
        if (typeof att === 'string') {
            const clean = this.extractCleanUrl(att);
            if (clean) return clean;
            const fid = this.extractDriveFileId(att);
            if (fid) return `https://drive.google.com/thumbnail?id=${fid}&sz=w1000`;
            return att.trim();
        }
        const src = String(att.data || att.url || att.directLink || att.shareableLink || att.link || '').trim();
        const clean = this.extractCleanUrl(src);
        if (clean) return clean;
        const fid = att.fileId || this.extractDriveFileId(src);
        if (fid) return `https://drive.google.com/thumbnail?id=${fid}&sz=w1000`;
        return src;
    },

    resolveNearMissDriveFileId(att) {
        if (!att) return '';
        if (typeof att === 'object' && att.fileId && !String(att.fileId).startsWith('att-') && !String(att.fileId).startsWith('ATT_')) {
            return String(att.fileId).trim();
        }
        const src = typeof att === 'string' ? att : this.getNearMissAttachmentSrc(att);
        return this.extractDriveFileId(src);
    },

    renderMainLayout(section) {
        section.innerHTML = `
            <!-- ══════════════════════════════════════════════════════
                 ترويسة القيادة والهوية البصرية لموديول الحوادث الوشيكة
            ══════════════════════════════════════════════════════ -->
            <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); border-radius: 18px; padding: 22px 28px; color: #fff; margin-bottom: 22px; box-shadow: 0 10px 25px -5px rgba(49, 46, 129, 0.4); border: 1px solid rgba(255,255,255,0.12);">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div class="flex items-center gap-4">
                        <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(255,255,255,0.18); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                            <i class="fas fa-shield-virus text-3xl text-amber-300"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h1 style="font-size: 1.45rem; font-weight: 800; margin: 0; color: #fff; letter-spacing: -0.5px;">إدارة وبلاغات الحوادث الوشيكة</h1>
                                <span style="background: rgba(245, 158, 11, 0.25); border: 1px solid rgba(245, 158, 11, 0.6); color: #fef08a; font-size: 0.72rem; font-weight: 700; padding: 2px 10px; border-radius: 20px;">Near Miss Suite</span>
                            </div>
                            <p style="font-size: 0.85rem; margin: 4px 0 0 0; color: #c7d2fe;">رصد استباقي للمخاطر • تحليل الأسباب الجذرية • ثقافة السلامة الإيجابية | SafetyHub ICAPP</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2.5 flex-wrap">
                        <button id="nearmiss-refresh-btn" class="btn-secondary flex items-center gap-2" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 9px 16px; border-radius: 12px; transition: all 0.2s; cursor: pointer;" onclick="NearMiss.fetchLiveNearMisses(); alert('جاري تحديث البيانات من السحابة...');">
                            <i class="fas fa-sync-alt text-cyan-300"></i>
                            <span>تحديث السحابة 🔄</span>
                        </button>
                        <button id="nearmiss-public-qr-btn" class="btn-secondary flex items-center gap-2" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.35); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 9px 16px; border-radius: 12px; transition: all 0.2s; cursor: pointer;">
                            <i class="fas fa-qrcode text-amber-300"></i>
                            <span>النموذج العام ورموز QR 📱</span>
                        </button>
                        <button id="nearmiss-print-badges-btn" class="btn-secondary flex items-center gap-2" style="background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.45); color: #a7f3d0; font-size: 0.85rem; font-weight: 700; padding: 9px 16px; border-radius: 12px; transition: all 0.2s; cursor: pointer;">
                            <i class="fas fa-print"></i>
                            <span>ملصقات المواقع 🖨️</span>
                        </button>
                        <button id="nearmiss-create-new-btn" class="btn-primary flex items-center gap-2" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #fff; font-size: 0.85rem; font-weight: 800; padding: 9px 18px; border-radius: 12px; border: none; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4); cursor: pointer;">
                            <i class="fas fa-plus-circle"></i>
                            <span>تسجيل بلاغ وشيك ➕</span>
                        </button>
                    </div>
                </div>

                <!-- شريط التبويبات الرئيسي -->
                <div style="display: flex; gap: 8px; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px;">
                    <button class="nrm-nav-tab ${this.state.activeTab === 'register' ? 'active' : ''}" data-tab="register" style="padding: 8px 18px; border-radius: 10px; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all .2s; background: ${this.state.activeTab === 'register' ? '#fff' : 'rgba(255,255,255,0.12)'}; color: ${this.state.activeTab === 'register' ? '#1e1b4b' : '#fff'};">
                        <i class="fas fa-clipboard-list ml-2"></i> سجل البلاغات والملاحظات
                    </button>
                    <button class="nrm-nav-tab ${this.state.activeTab === 'analytics' ? 'active' : ''}" data-tab="analytics" style="padding: 8px 18px; border-radius: 10px; font-size: 0.88rem; font-weight: 700; border: none; cursor: pointer; transition: all .2s; background: ${this.state.activeTab === 'analytics' ? '#fff' : 'rgba(255,255,255,0.12)'}; color: ${this.state.activeTab === 'analytics' ? '#1e1b4b' : '#fff'};">
                        <i class="fas fa-chart-pie ml-2"></i> لوحة التحليل البياني والإحصاءات 📊
                    </button>
                </div>
            </div>

            <!-- بطاقات المؤشرات الإحصائية السريعة -->
            <div id="nearmiss-kpi-strip"></div>

            <!-- محتوى التبويب النشط -->
            <div id="nearmiss-tab-content"></div>
        `;

        this.renderKpiStrip();
        this.renderActiveTabContent();
        this.bindEvents();
    },

    renderKpiStrip() {
        const container = document.getElementById('nearmiss-kpi-strip');
        if (!container) return;

        const records = AppState.appData.nearmiss || [];
        const total = records.length;
        const corrective = records.filter(r => r.correctiveProposed).length;
        const highSeverity = records.filter(r => {
            const s = (r.severity || '').toLowerCase();
            return s.includes('عالي') || s.includes('high') || s.includes('كارثي') || s.includes('critical') || s.includes('وشيك');
        }).length;

        const now = new Date();
        const thisMonth = records.filter(r => {
            const d = new Date(r.date);
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        }).length;

        const deptCounts = {};
        records.forEach(r => {
            const d = (r.department || '').trim();
            if (d) deptCounts[d] = (deptCounts[d] || 0) + 1;
        });
        const topDept = Object.entries(deptCounts).sort((a,b) => b[1] - a[1])[0];
        const topDeptName = topDept ? `${topDept[0]} (${topDept[1]})` : 'لا توجد بيانات بعد';

        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- إجمالي البلاغات -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #e0e7ff; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); color:#3730a3; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">إجمالي الحوادث الوشيكة</div>
                        <div style="font-size:1.6rem; font-weight:800; color:#1e1b4b; line-height:1.2;">${total}</div>
                        <div style="font-size:0.72rem; color:#4338ca; font-weight:600; margin-top:2px;">+${thisMonth} بلاغ هذا الشهر 📅</div>
                    </div>
                </div>

                <!-- بلاغات عالية الخطورة -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #fee2e2; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); color:#dc2626; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">بلاغات عالية الخطورة</div>
                        <div style="font-size:1.6rem; font-weight:800; color:#b91c1c; line-height:1.2;">${highSeverity}</div>
                        <div style="font-size:0.72rem; color:#dc2626; font-weight:600; margin-top:2px;">مخاطر وشيكة محتملة 🚨</div>
                    </div>
                </div>

                <!-- إجراءات تصحيحية -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #fef3c7; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color:#d97706; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">إجراءات تصحيحية (CAPA)</div>
                        <div style="font-size:1.6rem; font-weight:800; color:#b45309; line-height:1.2;">${corrective}</div>
                        <div style="font-size:0.72rem; color:#d97706; font-weight:600; margin-top:2px;">متابعة الإغلاق والمعالجة 🔄</div>
                    </div>
                </div>

                <!-- أعلى إدارة رصداً -->
                <div style="background:#fff; border-radius:16px; padding:18px 20px; border:1px solid #d1fae5; box-shadow:0 4px 15px rgba(0,0,0,0.03); display:flex; align-items:center; gap:16px;">
                    <div style="width:50px; height:50px; border-radius:12px; background:linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); color:#059669; display:flex; align-items:center; justify-content:center; font-size:1.4rem;">
                        <i class="fas fa-building"></i>
                    </div>
                    <div>
                        <div style="font-size:0.72rem; font-weight:700; color:#64748b; text-transform:uppercase;">أعلى إدارة رصداً</div>
                        <div style="font-size:1.05rem; font-weight:800; color:#065f46; line-height:1.2; margin-top:3px;">${Utils.escapeHTML(topDeptName)}</div>
                        <div style="font-size:0.72rem; color:#059669; font-weight:600; margin-top:2px;">ثقافة إيجابية مشجعة 🏆</div>
                    </div>
                </div>
            </div>
        `;
    },

    renderActiveTabContent() {
        const container = document.getElementById('nearmiss-tab-content');
        if (!container) return;

        if (this.state.activeTab === 'register') {
            this.renderRegisterTab(container);
        } else {
            this.renderAnalyticsTab(container);
        }
    },

    renderRegisterTab(container) {
        const f = this.state.filters;
        const activeCount = this._getActiveFilterCount();
        const severityOptions = [
            { value: '', label: 'جميع المستويات' },
            { value: 'منخفض', label: '🟢 منخفض' },
            { value: 'متوسط', label: '🟡 متوسط' },
            { value: 'عالي', label: '🔴 عالي' },
            { value: 'كارثي', label: '🚨 كارثي / وشيك' }
        ];

        container.innerHTML = `
            <style>
                .nrm-filter-bar { background:#fff; border-radius:16px; border:1px solid #e2e8f0; overflow:hidden; margin-bottom:0; box-shadow:0 1px 3px rgba(0,0,0,.04); }
                .nrm-filter-header { padding:12px 20px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; border-bottom:1px solid #f1f5f9; }
                .nrm-filter-toggle { display:flex; align-items:center; gap:8px; cursor:pointer; background:none; border:none; font-size:0.82rem; font-weight:700; color:#1e1b4b; padding:0; }
                .nrm-filter-toggle .nrm-chevron { transition:transform .25s ease; font-size:.7rem; color:#6366f1; }
                .nrm-filter-toggle .nrm-chevron.open { transform:rotate(180deg); }
                .nrm-filter-badge { background:linear-gradient(135deg,#6366f1,#4f46e5); color:#fff; font-size:.65rem; font-weight:800; min-width:18px; height:18px; border-radius:99px; display:inline-flex; align-items:center; justify-content:center; padding:0 5px; }
                .nrm-filter-actions { display:flex; align-items:center; gap:8px; }
                .nrm-filter-reset { background:none; border:1px solid #e2e8f0; border-radius:8px; padding:5px 12px; font-size:.72rem; font-weight:700; color:#6366f1; cursor:pointer; display:flex; align-items:center; gap:4px; transition:all .2s; }
                .nrm-filter-reset:hover { background:#eef2ff; border-color:#c7d2fe; }
                .nrm-filter-body { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; padding:14px 20px 16px; transition:all .3s ease; }
                .nrm-filter-body.collapsed { display:none; }
                .nrm-filter-group { position:relative; }
                .nrm-filter-group label { display:block; font-size:.68rem; font-weight:700; color:#64748b; margin-bottom:4px; letter-spacing:.02em; text-transform:uppercase; }
                .nrm-filter-group input, .nrm-filter-group select { width:100%; padding:8px 10px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:.78rem; color:#1e1b4b; background:#f8fafc; transition:all .2s; outline:none; font-family:inherit; }
                .nrm-filter-group input:focus, .nrm-filter-group select:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,.1); }
                .nrm-filter-group input.has-value, .nrm-filter-group select.has-value { border-color:#6366f1; background:#eef2ff; }
                .nrm-filter-group .nrm-search-icon { position:absolute; left:10px; top:26px; color:#94a3b8; font-size:.75rem; pointer-events:none; }
                .nrm-active-tags { display:flex; flex-wrap:wrap; gap:6px; padding:0 20px 12px; }
                .nrm-active-tags:empty { display:none; }
                .nrm-tag { display:inline-flex; align-items:center; gap:4px; background:#eef2ff; color:#4338ca; font-size:.7rem; font-weight:700; padding:4px 10px 4px 6px; border-radius:99px; border:1px solid #c7d2fe; animation:nrmTagIn .25s ease; }
                .nrm-tag button { background:none; border:none; color:#6366f1; cursor:pointer; font-size:.65rem; padding:0 2px; display:flex; align-items:center; }
                .nrm-tag button:hover { color:#ef4444; }
                @keyframes nrmTagIn { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:scale(1); } }

                .nrm-table-card { background:#fff; border-radius:0 0 16px 16px; border:1px solid #e2e8f0; border-top:none; overflow:hidden; }
                .nrm-table-header { padding:12px 20px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center; }

                @media (max-width: 1024px) {
                    .nrm-filter-body { grid-template-columns:repeat(3,1fr); }
                }
                @media (max-width: 640px) {
                    .nrm-filter-body { grid-template-columns:1fr 1fr; gap:8px; padding:10px 14px 14px; }
                    .nrm-filter-header { padding:10px 14px; }
                    .nrm-active-tags { padding:0 14px 10px; }
                    .nrm-table-header { padding:10px 14px; }
                }
            </style>

            <div class="nrm-filter-bar">
                <div class="nrm-filter-header">
                    <button id="nrm-filter-toggle-btn" class="nrm-filter-toggle" type="button">
                        <i class="fas fa-filter" style="color:#6366f1;font-size:.85rem;"></i>
                        <span>تصفية البلاغات</span>
                        ${activeCount ? `<span class="nrm-filter-badge">${activeCount}</span>` : ''}
                        <i class="fas fa-chevron-down nrm-chevron ${this.state._filtersExpanded !== false ? 'open' : ''}"></i>
                    </button>
                    <div class="nrm-filter-actions">
                        ${activeCount ? `<button id="nearmiss-reset-filters" class="nrm-filter-reset" type="button"><i class="fas fa-undo" style="font-size:.65rem;"></i> مسح الكل</button>` : ''}
                        <span id="nearmiss-result-count" class="text-xs text-indigo-700 bg-indigo-50 font-bold px-2.5 py-1 rounded-full" style="min-width:40px;text-align:center;"></span>
                    </div>
                </div>

                <div id="nrm-filter-body" class="nrm-filter-body ${this.state._filtersExpanded === false ? 'collapsed' : ''}">
                    <div class="nrm-filter-group" style="position:relative;">
                        <label><i class="fas fa-search" style="margin-left:3px;"></i> بحث حر</label>
                        <input type="text" id="nearmiss-filter-search" placeholder="اسم، موقع، رقم مرجعي..." value="${Utils.escapeHTML(f.search)}" class="${f.search ? 'has-value' : ''}">
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-tag" style="margin-left:3px;"></i> نوع الحادث</label>
                        <select id="nearmiss-filter-type" class="${f.type ? 'has-value' : ''}">
                            ${this.renderTypeOptions(f.type)}
                        </select>
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-exclamation-circle" style="margin-left:3px;"></i> الخطورة</label>
                        <select id="nearmiss-filter-severity" class="${f.severity ? 'has-value' : ''}">
                            ${severityOptions.map(o => `<option value="${o.value}" ${(f.severity || '') === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                        </select>
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-building" style="margin-left:3px;"></i> الإدارة</label>
                        <select id="nearmiss-filter-department" class="${f.department ? 'has-value' : ''}">
                            ${this.renderDepartmentOptions(f.department)}
                        </select>
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-calendar" style="margin-left:3px;"></i> من تاريخ</label>
                        <input type="date" id="nearmiss-filter-start" value="${f.startDate}" class="${f.startDate ? 'has-value' : ''}">
                    </div>
                    <div class="nrm-filter-group">
                        <label><i class="fas fa-calendar-check" style="margin-left:3px;"></i> إلى تاريخ</label>
                        <input type="date" id="nearmiss-filter-end" value="${f.endDate}" class="${f.endDate ? 'has-value' : ''}">
                    </div>
                </div>

                <div id="nrm-active-tags" class="nrm-active-tags">
                    ${this._renderActiveFilterTags()}
                </div>

                <div class="nrm-table-header">
                    <div class="flex items-center gap-2 font-bold text-gray-800 text-sm">
                        <i class="fas fa-table text-indigo-600"></i>
                        <span>سجل بلاغات الحوادث الوشيكة</span>
                    </div>
                </div>
                <div id="nearmiss-table-container" style="padding:0;"></div>
            </div>
        `;

        this.bindFilterEvents();
        this.renderTable();
    },

    renderAnalyticsTab(container) {
        const records = AppState.appData.nearmiss || [];
        
        container.innerHTML = `
            <div style="background:#fff; border-radius:16px; border:1px solid #e2e8f0; padding:20px; margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid #f1f5f9;">
                    <div class="flex items-center gap-3">
                        <div style="width:40px; height:40px; border-radius:10px; background:#e0e7ff; color:#3730a3; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div>
                            <h3 style="margin:0; font-size:1.1rem; font-weight:800; color:#1e1b4b;">لوحة التحليل البياني للحوادث الوشيكة</h3>
                            <p style="margin:2px 0 0 0; font-size:0.75rem; color:#64748b;">تحليل توزيع المخاطر المحتملة ومعدلات التكرار بالمصانع والأقسام</p>
                        </div>
                    </div>
                    <button onclick="NearMiss.exportAnalyticsPDF()" class="btn-secondary flex items-center gap-2" style="font-size:0.8rem; font-weight:700; padding:7px 14px; border-radius:8px;">
                        <i class="fas fa-file-pdf text-red-500"></i>
                        <span>تصدير تقرير PDF</span>
                    </button>
                </div>

                <!-- شبكة الرسوم البيانية -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <!-- تصنيف الحوادث -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-pie-chart text-indigo-600"></i>
                            <span>التوزيع حسب نوع وتصنيف الحادث</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-types"></canvas>
                        </div>
                    </div>

                    <!-- مستوى الخطورة -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-exclamation-triangle text-amber-600"></i>
                            <span>التوزيع حسب مستوى الخطورة المحتملة</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-severity"></canvas>
                        </div>
                    </div>
                </div>

                <!-- الرسوم البيانية: المواقع والإدارات -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- أكثر المواقع تسجيلاً -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-map-marker-alt text-red-600"></i>
                            <span>أكثر المواقع والمصانع تسجيلاً للبلاغات</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-locations"></canvas>
                        </div>
                    </div>

                    <!-- أكثر الإدارات تسجيلاً -->
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px;">
                        <div style="font-weight:800; font-size:0.85rem; color:#1e1b4b; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-building text-emerald-600"></i>
                            <span>أكثر الإدارات رصداً وتفاعلاً</span>
                        </div>
                        <div style="height:260px; position:relative;">
                            <canvas id="nrm-chart-departments"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => this.drawAnalyticsCharts(records), 100);
    },

    drawAnalyticsCharts(records) {
        if (typeof Chart === 'undefined') return;

        // تدمير الرسوم القديمة إن وُجدت
        ['types', 'severity', 'locations', 'departments'].forEach(k => {
            if (this._charts[k]) {
                try { this._charts[k].destroy(); } catch(e) {}
            }
        });

        // 1. Chart Types
        const typeCounts = {};
        records.forEach(r => {
            const t = r.type || 'أخرى';
            typeCounts[t] = (typeCounts[t] || 0) + 1;
        });
        const ctxType = document.getElementById('nrm-chart-types');
        if (ctxType) {
            this._charts.types = new Chart(ctxType, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(typeCounts),
                    datasets: [{
                        data: Object.values(typeCounts),
                        backgroundColor: ['#4f46e5', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }

        // 2. Chart Severity
        const sevCounts = { 'منخفض': 0, 'متوسط': 0, 'عالي': 0, 'كارثي / وشيك': 0 };
        records.forEach(r => {
            const s = r.severity || 'متوسط';
            if (s.includes('منخفض')) sevCounts['منخفض']++;
            else if (s.includes('عالي') || s.includes('high')) sevCounts['عالي']++;
            else if (s.includes('كارثي') || s.includes('وشيك')) sevCounts['كارثي / وشيك']++;
            else sevCounts['متوسط']++;
        });
        const ctxSev = document.getElementById('nrm-chart-severity');
        if (ctxSev) {
            this._charts.severity = new Chart(ctxSev, {
                type: 'pie',
                data: {
                    labels: Object.keys(sevCounts),
                    datasets: [{
                        data: Object.values(sevCounts),
                        backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#991b1b']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }

        // 3. Chart Locations
        const locCounts = {};
        records.forEach(r => {
            const l = (r.location || 'غير محدد').split('—')[0].trim();
            locCounts[l] = (locCounts[l] || 0) + 1;
        });
        const topLocs = Object.entries(locCounts).sort((a,b) => b[1] - a[1]).slice(0, 6);
        const ctxLoc = document.getElementById('nrm-chart-locations');
        if (ctxLoc) {
            this._charts.locations = new Chart(ctxLoc, {
                type: 'bar',
                data: {
                    labels: topLocs.map(x => x[0]),
                    datasets: [{
                        label: 'عدد البلاغات',
                        data: topLocs.map(x => x[1]),
                        backgroundColor: '#6366f1',
                        borderRadius: 8
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        }

        // 4. Chart Departments
        const deptCounts = {};
        records.forEach(r => {
            const d = (r.department || 'غير محدد').trim();
            deptCounts[d] = (deptCounts[d] || 0) + 1;
        });
        const topDepts = Object.entries(deptCounts).sort((a,b) => b[1] - a[1]).slice(0, 6);
        const ctxDept = document.getElementById('nrm-chart-departments');
        if (ctxDept) {
            this._charts.departments = new Chart(ctxDept, {
                type: 'bar',
                data: {
                    labels: topDepts.map(x => x[0]),
                    datasets: [{
                        label: 'عدد البلاغات',
                        data: topDepts.map(x => x[1]),
                        backgroundColor: '#10b981',
                        borderRadius: 8
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        }
    },

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.nrm-nav-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                if (tab) {
                    this.state.activeTab = tab;
                    document.querySelectorAll('.nrm-nav-tab').forEach(b => {
                        const isActive = b.getAttribute('data-tab') === tab;
                        b.style.background = isActive ? '#fff' : 'rgba(255,255,255,0.12)';
                        b.style.color = isActive ? '#1e1b4b' : '#fff';
                    });
                    this.renderActiveTabContent();
                }
            });
        });

        // Open QR Modal Button
        const qrBtn = document.getElementById('nearmiss-public-qr-btn');
        if (qrBtn) {
            qrBtn.addEventListener('click', () => this.openPublicQrModal());
        }

        // Print Badges Button
        const printBtn = document.getElementById('nearmiss-print-badges-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printLocationQrBadges());
        }

        // Create New Record Button
        const createBtn = document.getElementById('nearmiss-create-new-btn');
        if (createBtn) {
            createBtn.addEventListener('click', () => this.showForm());
        }
    },

    bindFilterEvents() {
        // Toggle expand/collapse
        const toggleBtn = document.getElementById('nrm-filter-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const body = document.getElementById('nrm-filter-body');
                const chevron = toggleBtn.querySelector('.nrm-chevron');
                if (body) {
                    const isCollapsed = body.classList.toggle('collapsed');
                    this.state._filtersExpanded = !isCollapsed;
                    if (chevron) chevron.classList.toggle('open', !isCollapsed);
                }
            });
        }

        // Search with debounce
        const searchInput = document.getElementById('nearmiss-filter-search');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.handleFilterChange('search', e.target.value);
                }, 250);
            });
        }

        const typeSelect = document.getElementById('nearmiss-filter-type');
        if (typeSelect) typeSelect.addEventListener('change', (e) => this.handleFilterChange('type', e.target.value));

        const sevSelect = document.getElementById('nearmiss-filter-severity');
        if (sevSelect) sevSelect.addEventListener('change', (e) => this.handleFilterChange('severity', e.target.value));

        const deptSelect = document.getElementById('nearmiss-filter-department');
        if (deptSelect) deptSelect.addEventListener('change', (e) => this.handleFilterChange('department', e.target.value));

        const startInput = document.getElementById('nearmiss-filter-start');
        if (startInput) startInput.addEventListener('change', (e) => this.handleFilterChange('startDate', e.target.value));

        const endInput = document.getElementById('nearmiss-filter-end');
        if (endInput) endInput.addEventListener('change', (e) => this.handleFilterChange('endDate', e.target.value));

        const resetBtn = document.getElementById('nearmiss-reset-filters');
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetFilters());

        // Active tag × buttons (delegated)
        const tagsContainer = document.getElementById('nrm-active-tags');
        if (tagsContainer) {
            tagsContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-clear-filter]');
                if (btn) {
                    const key = btn.getAttribute('data-clear-filter');
                    this.handleFilterChange(key, '');
                }
            });
        }
    },

    handleFilterChange(key, value) {
        this.state.filters[key] = value;
        this._refreshFilterUI();
        this.renderTable();
    },

    resetFilters() {
        this.state.filters = { search: '', type: '', severity: '', department: '', startDate: '', endDate: '', period: '365' };
        this.renderRegisterTab(document.getElementById('nearmiss-tab-content'));
    },

    _getActiveFilterCount() {
        const f = this.state.filters;
        let count = 0;
        if (f.search) count++;
        if (f.type) count++;
        if (f.severity) count++;
        if (f.department) count++;
        if (f.startDate) count++;
        if (f.endDate) count++;
        return count;
    },

    _renderActiveFilterTags() {
        const f = this.state.filters;
        const tags = [];
        const labelMap = {
            search: { icon: 'fa-search', prefix: 'بحث' },
            type: { icon: 'fa-tag', prefix: 'النوع' },
            severity: { icon: 'fa-exclamation-circle', prefix: 'الخطورة' },
            department: { icon: 'fa-building', prefix: 'الإدارة' },
            startDate: { icon: 'fa-calendar', prefix: 'من' },
            endDate: { icon: 'fa-calendar-check', prefix: 'إلى' }
        };
        for (const [key, meta] of Object.entries(labelMap)) {
            if (f[key]) {
                tags.push(`<span class="nrm-tag"><i class="fas ${meta.icon}" style="font-size:.6rem;opacity:.7;"></i> ${meta.prefix}: ${Utils.escapeHTML(f[key])}<button data-clear-filter="${key}" title="إزالة"><i class="fas fa-times"></i></button></span>`);
            }
        }
        return tags.join('');
    },

    _refreshFilterUI() {
        // Update active tags
        const tagsContainer = document.getElementById('nrm-active-tags');
        if (tagsContainer) tagsContainer.innerHTML = this._renderActiveFilterTags();

        // Update badge count
        const activeCount = this._getActiveFilterCount();
        const toggleBtn = document.getElementById('nrm-filter-toggle-btn');
        if (toggleBtn) {
            const existingBadge = toggleBtn.querySelector('.nrm-filter-badge');
            if (activeCount) {
                if (existingBadge) {
                    existingBadge.textContent = activeCount;
                } else {
                    const badge = document.createElement('span');
                    badge.className = 'nrm-filter-badge';
                    badge.textContent = activeCount;
                    const chevron = toggleBtn.querySelector('.nrm-chevron');
                    toggleBtn.insertBefore(badge, chevron);
                }
            } else if (existingBadge) {
                existingBadge.remove();
            }
        }

        // Show/hide reset button
        const filterActions = document.querySelector('.nrm-filter-actions');
        if (filterActions) {
            const existingReset = filterActions.querySelector('.nrm-filter-reset');
            if (activeCount && !existingReset) {
                const resetBtn = document.createElement('button');
                resetBtn.id = 'nearmiss-reset-filters';
                resetBtn.className = 'nrm-filter-reset';
                resetBtn.type = 'button';
                resetBtn.innerHTML = '<i class="fas fa-undo" style="font-size:.65rem;"></i> مسح الكل';
                resetBtn.addEventListener('click', () => this.resetFilters());
                filterActions.insertBefore(resetBtn, filterActions.firstChild);
            } else if (!activeCount && existingReset) {
                existingReset.remove();
            }
        }

        // Update has-value classes on inputs
        ['nearmiss-filter-search', 'nearmiss-filter-type', 'nearmiss-filter-severity', 'nearmiss-filter-department', 'nearmiss-filter-start', 'nearmiss-filter-end'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (el.value) el.classList.add('has-value');
                else el.classList.remove('has-value');
            }
        });

        // Sync input values (for when tag × clears a filter)
        const f = this.state.filters;
        const idMap = { 'nearmiss-filter-search': 'search', 'nearmiss-filter-type': 'type', 'nearmiss-filter-severity': 'severity', 'nearmiss-filter-department': 'department', 'nearmiss-filter-start': 'startDate', 'nearmiss-filter-end': 'endDate' };
        for (const [id, key] of Object.entries(idMap)) {
            const el = document.getElementById(id);
            if (el && el.value !== f[key]) el.value = f[key];
        }
    },

    getFilteredItems() {
        const { search, type, severity, department, startDate, endDate } = this.state.filters;
        let items = (AppState.appData.nearmiss || []).filter(item => Boolean(item));

        if (type) items = items.filter(item => (item.type || '').toLowerCase() === type.toLowerCase());
        if (department) items = items.filter(item => (item.department || '').toLowerCase() === department.toLowerCase());

        if (severity) {
            items = items.filter(item => {
                const s = String(item.severity || '').toLowerCase();
                const f = severity.toLowerCase();
                if (f === 'كارثي') return s.includes('كارثي') || s.includes('وشيك') || s.includes('critical');
                return s.includes(f);
            });
        }

        if (startDate) {
            const s = new Date(startDate); s.setHours(0,0,0,0);
            items = items.filter(item => new Date(item.date) >= s);
        }
        if (endDate) {
            const e = new Date(endDate); e.setHours(23,59,59,999);
            items = items.filter(item => new Date(item.date) <= e);
        }

        if (search) {
            const t = search.toLowerCase();
            items = items.filter(item => [
                item.type, item.location, item.department, item.observerName, item.phone, item.description, item.correctiveDescription, item.isoCode
            ].some(v => v && String(v).toLowerCase().includes(t)));
        }

        return items.sort((a,b) => new Date(b.date) - new Date(a.date));
    },

    renderTable() {
        const container = document.getElementById('nearmiss-table-container');
        if (!container) return;

        const items = this.getFilteredItems();
        const countLabel = document.getElementById('nearmiss-result-count');
        if (countLabel) countLabel.textContent = items.length ? `${items.length} بلاغ` : 'لا توجد نتائج';

        if (!items.length) {
            container.innerHTML = `
                <div class="empty-state text-center py-12">
                    <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500 font-bold">لا توجد بلاغات مطابقة لعوامل التصفية</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.82rem;">
                    <thead>
                        <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0; color: #475569; text-align: right;">
                            <th style="padding: 12px 14px;">الرقم المرجعي</th>
                            <th style="padding: 12px 14px;">نوع الحادث</th>
                            <th style="padding: 12px 14px;">الخطورة</th>
                            <th style="padding: 12px 14px;">التاريخ</th>
                            <th style="padding: 12px 14px;">الموقع / المصنع</th>
                            <th style="padding: 12px 14px;">الإدارة</th>
                            <th style="padding: 12px 14px;">المبلّغ</th>
                            <th style="padding: 12px 14px;">الإجراء الوقائي</th>
                            <th style="padding: 12px 14px; text-align: center;">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map((item) => `
                            <tr style="border-bottom: 1px solid #f1f5f9; transition: all 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'">
                                <td style="padding: 12px 14px; font-weight: 800; color: #312e81;">
                                    ${Utils.escapeHTML(item.isoCode || item.id)}
                                </td>
                                <td style="padding: 12px 14px;">
                                    <span style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 0.75rem;">
                                        ${Utils.escapeHTML(item.type || 'حادث وشيك')}
                                    </span>
                                </td>
                                <td style="padding: 12px 14px;">
                                    ${this.formatSeverityBadge(item.severity)}
                                </td>
                                <td style="padding: 12px 14px; color: #64748b;">
                                    ${item.date ? Utils.formatDateTime(item.date) : '-'}
                                </td>
                                <td style="padding: 12px 14px; font-weight: 600; color: #1e1b4b;">
                                    ${Utils.escapeHTML(item.location || '-')}
                                </td>
                                <td style="padding: 12px 14px; color: #334155;">
                                    ${Utils.escapeHTML(item.department || '-')}
                                </td>
                                <td style="padding: 12px 14px;">
                                    <div style="font-weight: 600; color: #0f172a;">${Utils.escapeHTML(item.observerName || 'فاعل خير')}</div>
                                    ${item.phone ? `<div style="font-size: 0.7rem; color: #94a3b8;">${Utils.escapeHTML(item.phone)}</div>` : ''}
                                </td>
                                <td style="padding: 12px 14px;">
                                    ${item.correctiveProposed ? '<span style="background:#dcfce7; color:#166534; padding:2px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">متاح ✅</span>' : '<span style="color:#94a3b8; font-size:0.72rem;">—</span>'}
                                </td>
                                <td style="padding: 12px 14px; text-align: center;">
                                    <div class="flex items-center justify-center gap-1.5">
                                        <button class="btn-icon text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg" data-action="view-nearmiss" data-id="${item.id}" title="عرض">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg" data-action="edit-nearmiss" data-id="${item.id}" title="تعديل">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon text-red-600 hover:bg-red-50 p-1.5 rounded-lg" data-action="delete-nearmiss" data-id="${item.id}" title="حذف">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        this.bindTableActions();
    },

    formatSeverityBadge(sev = '') {
        const s = String(sev || '').toLowerCase();
        if (s.includes('منخفض')) {
            return '<span style="background:#dcfce7; color:#166534; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">🟢 منخفض</span>';
        } else if (s.includes('عالي') || s.includes('high')) {
            return '<span style="background:#fee2e2; color:#991b1b; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">🔴 عالي</span>';
        } else if (s.includes('كارثي') || s.includes('وشيك') || s.includes('critical')) {
            return '<span style="background:#450a0a; color:#fecaca; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">🚨 وشيك / كارثي</span>';
        }
        return '<span style="background:#fef3c7; color:#92400e; padding:3px 8px; border-radius:10px; font-weight:700; font-size:0.72rem;">🟡 متوسط</span>';
    },

    bindTableActions() {
        document.querySelectorAll('[data-action="view-nearmiss"]').forEach((button) => {
            button.addEventListener('click', () => this.viewNearMiss(button.getAttribute('data-id')));
        });
        document.querySelectorAll('[data-action="edit-nearmiss"]').forEach((button) => {
            button.addEventListener('click', () => this.editNearMiss(button.getAttribute('data-id')));
        });
        document.querySelectorAll('[data-action="delete-nearmiss"]').forEach((button) => {
            button.addEventListener('click', () => this.deleteNearMiss(button.getAttribute('data-id')));
        });
    },

    getDepartmentOptions() {
        const departments = new Set();
        (AppState.appData.nearmiss || []).forEach(item => {
            const value = (item.department || '').trim();
            if (value) departments.add(value);
        });
        (AppState.appData.departments || []).forEach(d => {
            const value = typeof d === 'string' ? d : (d.name || d.departmentName || '');
            if (value) departments.add(value);
        });
        if (departments.size === 0) {
            ['السلامة والصحة المهنية', 'الإنتاج', 'الصيانة الميكانيكية', 'الصيانة الكهربائية', 'الجودة', 'المخازن', 'الموارد البشرية'].forEach(d => departments.add(d));
        }
        return Array.from(departments).sort((a, b) => a.localeCompare(b, 'ar'));
    },

    renderTypeOptions(selectedValue = '') {
        const options = ['<option value="">جميع الأنواع</option>'];
        this.TYPES.forEach((type) => {
            options.push(`<option value="${Utils.escapeHTML(type.value)}" ${type.value === selectedValue ? 'selected' : ''}>${Utils.escapeHTML(type.label)}</option>`);
        });
        return options.join('');
    },

    renderDepartmentOptions(selectedValue = '') {
        const options = ['<option value="">جميع الإدارات</option>'];
        this.getDepartmentOptions().forEach((dept) => {
            options.push(`<option value="${Utils.escapeHTML(dept)}" ${dept === selectedValue ? 'selected' : ''}>${Utils.escapeHTML(dept)}</option>`);
        });
        return options.join('');
    },

    viewNearMiss(id) {
        const idStr = String(id || '').trim();
        const item = (AppState.appData.nearmiss || []).find((record) => 
            String(record.id || '').trim() === idStr || 
            String(record.isoCode || '').trim() === idStr || 
            record.id == id
        );
        if (!item) {
            alert('لم يتم العثور على البلاغ');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; padding:16px; backdrop-filter:blur(4px);';
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 740px; width:100%; background:#fff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); font-family: 'Segoe UI', Tahoma, sans-serif; max-height:90vh; display:flex; flex-direction:column; direction:rtl;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: #fff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;">
                    <div class="flex items-center gap-3">
                        <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                            <i class="fas fa-file-contract text-amber-300"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: #fff;">تقرير تفاصيل الحادث الوشيك</h3>
                                <span style="background: #f59e0b; color: #000; font-weight: 800; font-size: 0.7rem; padding: 2px 8px; border-radius: 12px;">${Utils.escapeHTML(item.isoCode || item.id || '')}</span>
                            </div>
                            <div style="font-size: 0.75rem; color: #c7d2fe; margin-top: 2px;">SafetyHub | ICAPP — Incident Prevention Record</div>
                        </div>
                    </div>
                    <button class="modal-close text-white/80 hover:text-white text-2xl" onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="modal-body space-y-4 p-6" style="background: #f8fafc; overflow-y:auto; flex:1;">
                    <!-- شبكة البيانات الأساسية -->
                    <div style="background: #fff; padding: 16px; border-radius: 14px; border: 1px solid #e2e8f0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">نوع وتصنيف الحادث:</span>
                            <div style="font-weight: 700; color: #1e1b4b; font-size: 0.9rem; margin-top: 2px;">
                                <i class="fas fa-tag text-indigo-500 ml-1"></i> ${Utils.escapeHTML(item.type || 'حادث وشيك')}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">مستوى الخطورة:</span>
                            <div style="margin-top: 2px;">
                                ${this.formatSeverityBadge(item.severity)}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">الموقع / المصنع:</span>
                            <div style="font-weight: 700; color: #1e1b4b; font-size: 0.9rem; margin-top: 2px;">
                                <i class="fas fa-map-marker-alt text-red-500 ml-1"></i> ${Utils.escapeHTML(item.location || '-')}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">الإدارة المسؤولة:</span>
                            <div style="font-weight: 700; color: #1e1b4b; font-size: 0.9rem; margin-top: 2px;">
                                <i class="fas fa-building text-blue-500 ml-1"></i> ${Utils.escapeHTML(item.department || '-')}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">تاريخ وتوقيت الرصد:</span>
                            <div style="font-weight: 600; color: #334155; font-size: 0.85rem; margin-top: 2px;">
                                <i class="far fa-calendar-alt text-amber-500 ml-1"></i> ${item.date ? Utils.formatDateTime(item.date) : '-'}
                            </div>
                        </div>
                        <div>
                            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; display: block;">صاحب البلاغ:</span>
                            <div style="font-weight: 600; color: #334155; font-size: 0.85rem; margin-top: 2px;">
                                <i class="fas fa-user-shield text-emerald-500 ml-1"></i> ${Utils.escapeHTML(item.observerName || 'فاعل خير (سري)')}
                                ${item.phone ? `<span style="font-size: 0.75rem; color: #64748b;"> (${Utils.escapeHTML(item.phone)})</span>` : ''}
                            </div>
                        </div>
                    </div>

                    <!-- كرت وصف الواقعة وما كاد أن يحدث -->
                    <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 14px; padding: 16px;">
                        <div style="display:flex; align-items:center; gap:8px; font-weight:800; color:#92400e; font-size:0.88rem; margin-bottom:8px;">
                            <i class="fas fa-exclamation-circle text-amber-600"></i>
                            <span>تفاصيل الواقعة الوشيكة وما كاد أن يحدث:</span>
                        </div>
                        <div style="font-size:0.85rem; color:#78350f; line-height:1.6; white-space:pre-line;">
                            ${Utils.escapeHTML(item.description || 'لا يوجد تفاصيل إضافية')}
                        </div>
                    </div>

                    <!-- كرت الإجراء التصحيحي المتخذ -->
                    <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 14px; padding: 16px;">
                        <div style="display:flex; align-items:center; gap:8px; font-weight:800; color:#166534; font-size:0.88rem; margin-bottom:8px;">
                            <i class="fas fa-shield-alt text-emerald-600"></i>
                            <span>الإجراء التصحيحي والوقائي الفوري المتخذ:</span>
                        </div>
                        <div style="font-size:0.85rem; color:#14532d; line-height:1.6; white-space:pre-line;">
                            ${Utils.escapeHTML(item.correctiveDescription || item.correctiveProposed || 'تم التوثيق والمتابعة الميدانية مع الإدارة المختصة')}
                        </div>
                    </div>

                    <!-- قسم المرفقات والصور -->
                    ${this._buildAttachmentsSectionHtml(item)}
                </div>
                <div class="modal-footer" style="padding: 14px 24px; background: #fff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fas fa-check-circle text-emerald-500 ml-1"></i> تم التحقق والأرشفة في سجلات السلامة</span>
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 7px 20px; border-radius: 10px; font-weight:700; cursor:pointer;">إغلاق النافذة</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        if (typeof Utils !== 'undefined' && typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal);
        }
        this.fetchFullNearMissAndHydrate(id, modal);
    },

    _buildAttachmentsSectionHtml(record) {
        let atts = Array.isArray(record?.attachments) ? [...record.attachments] : [];

        // التحقق من الحقول البديلة للصورة (photoBase64, image, photo, photoUrl, fileId, Arabic aliases)
        const directCandidates = [
            record?.photoBase64, record?.image, record?.photo, record?.photoUrl, record?.fileId,
            record?.['photoBase64'], record?.['image'], record?.['photo'], record?.['photoUrl'],
            record?.['الصورة'], record?.['صورة'], record?.['الصور'], record?.['المرفقات'],
            record?.['رابط الصورة'], record?.['رابط_الصورة'], record?.['صورة الحادث'], record?.['معرف الملف']
        ];
        directCandidates.forEach(cand => {
            if (cand && typeof cand === 'string' && cand.trim().length > 5 && cand.trim() !== '__stripped__') {
                const s = cand.trim();
                const exists = atts.some(a => a && (a.url === s || a.data === s || a.fileId === s));
                if (!exists) {
                    const norm = this.normalizeAttachment(s);
                    if (norm) atts.push(norm);
                }
            }
        });

        const real = atts.map(a => this.normalizeAttachment(a)).filter(a => a && (a.fileId || (a.url && a.url.length > 5) || (a.data && a.data.length > 5)));
        const isWaiting = atts.some(a => a && a.__listOnly && !a.url && !a.data);

        if (isWaiting && !real.length) {
            return `
                <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px;" id="nrm-attachments-section">
                    <div style="font-weight:700; color:#334155; font-size:0.85rem; margin-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
                        <span><i class="fas fa-camera text-indigo-600 ml-1"></i> الصور والمرفقات الميدانية:</span>
                        <span style="font-size:0.75rem; color:#6366f1;"><i class="fas fa-spinner fa-spin ml-1"></i> جاري استرداد الصور...</span>
                    </div>
                    <div style="display:flex; justify-content:center; align-items:center; min-height:140px; background:#f8fafc; border-radius:10px; border:1px dashed #cbd5e1;">
                        <span style="font-size:0.82rem; color:#64748b;"><i class="fas fa-sync fa-spin ml-2 text-indigo-500"></i> جاري جلب المرفقات من السيرفر...</span>
                    </div>
                </div>
            `;
        }

        if (!real.length) {
            return `
                <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px;" id="nrm-attachments-section">
                    <div style="font-weight:700; color:#64748b; font-size:0.85rem; display:flex; align-items:center; gap:8px;">
                        <i class="fas fa-camera text-gray-400"></i>
                        <span>الصور والمرفقات: لا توجد صور مرفقة بهذا البلاغ</span>
                    </div>
                </div>
            `;
        }

        return `
            <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px;" id="nrm-attachments-section">
                <div style="font-weight:700; color:#334155; font-size:0.85rem; margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-camera text-indigo-600 ml-1"></i>
                        <span>الصور والمرفقات الميدانية (${real.length}):</span>
                    </div>
                    <span style="font-size:0.75rem; color:#64748b;">انقر على الصورة للمعاينة بالحجم الكامل</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${real.map((att, idx) => {
                        const rawSrc = this.getNearMissAttachmentSrc(att);
                        const fileId = this.resolveNearMissDriveFileId(att);
                        const isData = String(rawSrc).startsWith('data:image/') || String(rawSrc).startsWith('blob:');

                        // ✅ عرض فوري عبر Google CDN المباشر بدلاً من فخ الصورة الشفافة (1x1 transparent gif)
                        let displaySrc = isData ? rawSrc : (fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000` : rawSrc);
                        let driveProxyAttr = (!isData && fileId) ? ` data-drive-proxy-id="${Utils.escapeHTML(fileId)}"` : '';
                        const name = Utils.escapeHTML(att.name || ('صورة ' + (idx + 1)));

                        // كود السقوط الاحتياطي المتدرج لمنع اختفاء الصورة نهائياً
                        const fallbackHandler = fileId ? `
                            if (!this.dataset.retry) {
                                this.dataset.retry = '1';
                                this.src = 'https://lh3.googleusercontent.com/d/${fileId}=w1000';
                            } else if (this.dataset.retry === '1') {
                                this.dataset.retry = '2';
                                this.src = 'https://drive.google.com/uc?export=view&id=${fileId}';
                            } else if (this.dataset.retry === '2' && typeof Utils !== 'undefined' && typeof Utils.fetchDriveImageDataUri === 'function') {
                                this.dataset.retry = '3';
                                Utils.fetchDriveImageDataUri('${fileId}', { force: true }).then(uri => {
                                    if (uri) this.src = uri;
                                    else this.style.opacity = '0.35';
                                }).catch(() => { this.style.opacity = '0.35'; });
                            } else {
                                this.onerror = null;
                                this.style.opacity = '0.35';
                            }
                        `.replace(/\s+/g, ' ').trim() : `this.onerror=null; this.style.opacity='0.35';`;

                        return `
                            <div class="nearmiss-attachment-card" style="border-radius:12px; overflow:hidden; border:1.5px solid #e2e8f0; background:#f8fafc; transition:transform 0.2s, box-shadow 0.2s;" class="hover:shadow-md">
                                <div style="width:100%; height:200px; display:flex; align-items:center; justify-content:center; background:#0f172a; position:relative; overflow:hidden; cursor:pointer;" onclick="NearMiss.viewFullImage(this.querySelector('img')?.currentSrc || '${Utils.escapeHTML(rawSrc || fileId)}')">
                                    <img src="${Utils.escapeHTML(displaySrc)}"${driveProxyAttr}
                                         alt="${name}"
                                         style="max-width:100%; max-height:200px; object-fit:contain; transition:transform 0.3s;"
                                         onerror="${fallbackHandler}"
                                         class="hover:scale-105" />
                                    <div style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); color:#fff; padding:3px 8px; border-radius:6px; font-size:0.7rem; pointer-events:none; display:flex; align-items:center; gap:4px;">
                                        <i class="fas fa-search-plus"></i> تكبير
                                    </div>
                                </div>
                                <div style="padding:8px 12px; background:#fff; display:flex; justify-content:space-between; align-items:center; border-top:1px solid #e2e8f0;">
                                    <span style="font-size:0.78rem; font-weight:700; color:#334155; truncate max-w-[200px];"><i class="fas fa-image text-indigo-500 ml-1"></i>${name}</span>
                                    <button type="button" onclick="NearMiss.viewFullImage(this.closest('.nearmiss-attachment-card')?.querySelector('img')?.currentSrc || '${Utils.escapeHTML(rawSrc || fileId)}')" style="font-size:0.75rem; color:#4f46e5; font-weight:700; background:none; border:none; cursor:pointer; display:flex; align-items:center; gap:3px;">
                                        <i class="fas fa-expand"></i> عرض بالحجم الكامل
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    async fetchFullNearMissAndHydrate(id, modal) {
        try {
            if (!id || !modal) return;
            const res = await (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.sendRequest === 'function'
                ? GoogleIntegration.sendRequest({ action: 'getNearMiss', data: { id: id, nearMissId: id } })
                : null);

            if (res && res.success && res.data) {
                const fresh = this.normalizeRecord(res.data);
                const idx = (AppState.appData.nearmiss || []).findIndex(r => String(r.id) === String(id) || String(r.isoCode) === String(id) || r.id == id);
                if (idx !== -1) {
                    AppState.appData.nearmiss[idx] = { ...AppState.appData.nearmiss[idx], ...fresh };
                }

                if (document.body.contains(modal)) {
                    const sec = modal.querySelector('#nrm-attachments-section');
                    const newHtml = this._buildAttachmentsSectionHtml(fresh);
                    if (sec && newHtml) {
                        const tmp = document.createElement('div');
                        tmp.innerHTML = newHtml;
                        const newNode = tmp.firstElementChild;
                        if (newNode) {
                            sec.replaceWith(newNode);
                            if (typeof Utils !== 'undefined' && typeof Utils.hydrateDriveProxyImages === 'function') {
                                Utils.hydrateDriveProxyImages(modal);
                            }
                        }
                    } else if (!sec && newHtml) {
                        const body = modal.querySelector('.modal-body');
                        if (body) {
                            const tmp = document.createElement('div');
                            tmp.innerHTML = newHtml;
                            const newNode = tmp.firstElementChild;
                            if (newNode) {
                                body.appendChild(newNode);
                                if (typeof Utils !== 'undefined' && typeof Utils.hydrateDriveProxyImages === 'function') {
                                    Utils.hydrateDriveProxyImages(modal);
                                }
                            }
                        }
                    }
                }
            }
        } catch (e) {
            Utils?.safeWarn?.('NearMiss: تعذر جلب تفاصيل المرفقات من السيرفر:', e);
        }
    },

    viewFullImage(urlOrId) {
        if (!urlOrId) return;
        document.querySelectorAll('.nearmiss-photo-lightbox').forEach((el) => el.remove());

        const isData = String(urlOrId).startsWith('data:image/') || String(urlOrId).startsWith('blob:');
        const fileId = isData ? '' : this.resolveNearMissDriveFileId(urlOrId);
        const displaySrc = isData ? urlOrId : (fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600` : String(urlOrId).trim());
        const driveProxyAttr = (!isData && fileId) ? ` data-drive-proxy-id="${Utils.escapeHTML(fileId)}"` : '';

        const fallbackHandler = fileId ? `
            if (!this.dataset.retry) {
                this.dataset.retry = '1';
                this.src = 'https://lh3.googleusercontent.com/d/${fileId}=w1600';
            } else if (this.dataset.retry === '1') {
                this.dataset.retry = '2';
                this.src = 'https://drive.google.com/uc?export=view&id=${fileId}';
            } else if (this.dataset.retry === '2' && typeof Utils !== 'undefined' && typeof Utils.fetchDriveImageDataUri === 'function') {
                this.dataset.retry = '3';
                Utils.fetchDriveImageDataUri('${fileId}', { force: true }).then(uri => {
                    if (uri) this.src = uri;
                }).catch(() => {});
            } else {
                this.onerror = null;
            }
        `.replace(/\s+/g, ' ').trim() : `this.onerror=null;`;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay nearmiss-photo-lightbox';
        modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; z-index:99999; padding:16px; backdrop-filter:blur(6px); direction:rtl;';
        modal.innerHTML = `
            <div style="max-width:92vw; max-height:92vh; background:#0f172a; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7); border:1px solid #334155;">
                <div style="padding:12px 18px; background:#1e293b; color:#fff; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155;">
                    <span style="font-weight:700; font-size:0.9rem; display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-image text-amber-400"></i> معاينة صورة الحادث الوشيك
                    </span>
                    <button type="button" class="modal-close-lightbox" style="background:none; border:none; color:#cbd5e1; font-size:1.3rem; cursor:pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:16px; overflow:auto; min-width:320px; min-height:240px; background:#020617;">
                    <img src="${Utils.escapeHTML(displaySrc)}"${driveProxyAttr}
                         alt="معاينة الصورة"
                         onerror="${fallbackHandler}"
                         style="max-width:88vw; max-height:78vh; object-fit:contain; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.5);" />
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.modal-close-lightbox')?.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        const onKey = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', onKey);
            }
        };
        document.addEventListener('keydown', onKey);

        if (typeof Utils !== 'undefined' && typeof Utils.hydrateDriveProxyImages === 'function') {
            Utils.hydrateDriveProxyImages(modal);
        }
    },

    showForm(data = null) {
        const record = data ? this.normalizeRecord(data) : null;
        this.state.editingId = record?.id || null;
        this.state.currentAttachments = record?.attachments || [];

        const modal = this.buildFormModal(record);
        document.body.appendChild(modal);
        this.bindFormEvents(modal, record);
    },

    buildFormModal(record) {
        const showCorrective = record?.correctiveProposed === true;
        const departmentOptions = this.getDepartmentOptions();
        const severityValue = record?.severity || 'متوسط';

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; padding:16px; backdrop-filter:blur(4px);';
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 780px; width:100%; background:#fff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); font-family: 'Segoe UI', Tahoma, sans-serif; max-height:90vh; display:flex; flex-direction:column; direction:rtl;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color: #fff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;">
                    <div class="flex items-center gap-3">
                        <div style="width: 46px; height: 46px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                            <i class="fas fa-${record ? 'edit' : 'plus-circle'} text-amber-300"></i>
                        </div>
                        <div>
                            <h2 style="font-size: 1.2rem; font-weight: 800; margin: 0; color: #fff;">
                                ${record ? 'تعديل بيانات الحادث الوشيك' : 'تسجيل بلاغ حادث وشيك جديد'}
                            </h2>
                            <p style="font-size: 0.75rem; color: #c7d2fe; margin: 2px 0 0 0;">SafetyHub | ICAPP — Incident Prevention Entry</p>
                        </div>
                    </div>
                    <button class="modal-close text-white/80 hover:text-white text-2xl" onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body p-6" style="background: #f8fafc; overflow-y: auto; flex:1;">
                    <form id="nearmiss-form" class="space-y-5">
                        <!-- Section 1: التصنيف والخطورة -->
                        <div style="background: #fff; padding: 18px; border-radius: 14px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 0.85rem; font-weight: 800; color: #1e1b4b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-tags text-indigo-600"></i>
                                <span>1. تصنيف الحادث ومستوى الخطورة المحتملة</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1.5">نوع وتصنيف الحادث *</label>
                                    <select id="nearmiss-type" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required>
                                        ${this.renderTypeOptions(record?.type || '')}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1.5">مستوى الخطورة المحتملة *</label>
                                    <select id="nearmiss-severity" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required>
                                        <option value="منخفض" ${severityValue === 'منخفض' ? 'selected' : ''}>🟢 منخفض (Low Potential)</option>
                                        <option value="متوسط" ${severityValue === 'متوسط' ? 'selected' : ''}>🟡 متوسط (Medium Potential)</option>
                                        <option value="عالي" ${severityValue === 'عالي' ? 'selected' : ''}>🔴 عالي (High Potential)</option>
                                        <option value="كارثي / وشيك" ${severityValue.includes('وشيك') || severityValue.includes('كارثي') ? 'selected' : ''}>🚨 وشيك / كارثي (Critical Potential)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Section 2: الموقع والتاريخ والراصد -->
                        <div style="background: #fff; padding: 18px; border-radius: 14px; border: 1px solid #e2e8f0;">
                            <div style="font-size: 0.85rem; font-weight: 800; color: #1e1b4b; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-map-marked-alt text-blue-600"></i>
                                <span>2. بيانات الموقع والمسؤول</span>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label for="nearmiss-location" class="block text-xs font-bold text-gray-700 mb-1.5">الموقع / المصنع والمكان الفرعي *</label>
                                    <input type="text" id="nearmiss-location" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required value="${Utils.escapeHTML(record?.location || '')}" placeholder="مثال: ICAPP-1 — عنبر الإنتاج">
                                </div>
                                <div>
                                    <label for="nearmiss-department" class="block text-xs font-bold text-gray-700 mb-1.5">الإدارة المسؤولة *</label>
                                    <input type="text" id="nearmiss-department" class="form-input w-full p-2.5 rounded-lg border border-gray-300" list="nearmiss-departments-list" required value="${Utils.escapeHTML(record?.department || '')}" placeholder="اختر أو اكتب الإدارة">
                                    <datalist id="nearmiss-departments-list">
                                        ${departmentOptions.map((department) => `<option value="${Utils.escapeHTML(department)}"></option>`).join('')}
                                    </datalist>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1.5">تاريخ وتوقيت الواقعة *</label>
                                    <input type="datetime-local" id="nearmiss-date" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required value="${record?.date ? Utils.toDateTimeLocalString(record.date) : Utils.toDateTimeLocalString(new Date())}">
                                </div>
                                <div>
                                    <label for="nearmiss-observer" class="block text-xs font-bold text-gray-700 mb-1.5">اسم صاحب البلاغ / المفتش *</label>
                                    <input type="text" id="nearmiss-observer" class="form-input w-full p-2.5 rounded-lg border border-gray-300" required value="${Utils.escapeHTML(record?.observerName || '')}" placeholder="الاسم أو فاعل خير">
                                </div>
                            </div>
                        </div>

                        <!-- Section 3: وصف الواقعة وما كاد أن يحدث -->
                        <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 14px; padding: 18px;">
                            <label for="nearmiss-description" class="block text-xs font-extrabold text-amber-900 mb-1.5 flex items-center gap-2">
                                <i class="fas fa-exclamation-circle text-amber-600"></i>
                                <span>3. وصف الواقعة الوشيكة بالتفصيل (ما كاد أن يحدث) *</span>
                            </label>
                            <textarea id="nearmiss-description" class="form-input w-full p-3 rounded-lg border border-amber-300 bg-white" rows="3" required placeholder="صف الواقعة بدقة: ماذا حدث؟ وما هي الخسائر أو الإصابات التي كادت أن تقع لولا تدارك الموقف؟">${Utils.escapeHTML(record?.description || '')}</textarea>
                        </div>

                        <!-- Section 4: الإجراء التصحيحي -->
                        <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 14px; padding: 18px;">
                            <div class="flex items-center justify-between mb-2">
                                <label class="block text-xs font-extrabold text-emerald-900 flex items-center gap-2">
                                    <i class="fas fa-shield-alt text-emerald-600"></i>
                                    <span>4. الإجراء التصحيحي / الوقائي المتخذ</span>
                                </label>
                                <label class="flex items-center gap-2 text-xs font-bold text-emerald-800 cursor-pointer">
                                    <input type="checkbox" id="nearmiss-corrective-check" onchange="document.getElementById('nearmiss-corrective-wrapper').style.display = this.checked ? 'block' : 'none'" ${showCorrective ? 'checked' : ''}>
                                    <span>تم اتخاذ / اقتراح إجراء تصحيحي</span>
                                </label>
                            </div>
                            <div id="nearmiss-corrective-wrapper" style="${showCorrective ? 'display:block;' : 'display:none;'} margin-top:8px;">
                                <textarea id="nearmiss-corrective-description" class="form-input w-full p-3 rounded-lg border border-emerald-300 bg-white" rows="2" placeholder="اكتب الإجراء المتخذ فورياً لمنع تكرار الواقعة...">${Utils.escapeHTML(record?.correctiveDescription || '')}</textarea>
                            </div>
                        </div>

                        <!-- Section 5: المرفقات -->
                        <div style="background: #fff; padding: 18px; border-radius: 14px; border: 1px solid #e2e8f0;">
                            <label class="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-2">
                                <i class="fas fa-camera text-indigo-600"></i>
                                <span>5. إرفاق صور أو مستندات توضيحية (اختياري)</span>
                            </label>
                            <input type="file" id="nearmiss-attachments" class="form-input w-full p-2 rounded-lg border border-gray-300" accept="image/*,.pdf" multiple>
                            <div id="nearmiss-attachments-preview" class="mt-3 space-y-2"></div>
                        </div>

                        <!-- Footer -->
                        <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                            <button type="button" onclick="this.closest('.modal-overlay').remove()" class="btn-secondary px-5 py-2.5 rounded-xl cursor-pointer">إلغاء</button>
                            <button type="submit" class="btn-primary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 cursor-pointer" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:#fff;">
                                <i class="fas fa-save text-amber-300"></i>
                                <span>${record ? 'تحديث وحفظ البلاغ' : 'حفظ وتسجيل البلاغ'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        return modal;
    },

    bindFormEvents(modal, record) {
        const form = modal.querySelector('#nearmiss-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleSubmit(form, record);
                modal.remove();
            });
        }

        const attachInput = modal.querySelector('#nearmiss-attachments');
        if (attachInput) {
            attachInput.addEventListener('change', async (e) => {
                const files = e.target.files;
                if (!files || !files.length) return;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        this.state.currentAttachments.push({
                            id: 'att-' + Date.now() + '-' + i,
                            name: file.name,
                            type: file.type,
                            data: re.target.result,
                            url: re.target.result
                        });
                        this.renderAttachmentsPreview(modal);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    },

    renderAttachmentsPreview(modal) {
        const container = modal.querySelector('#nearmiss-attachments-preview');
        if (!container) return;

        if (!this.state.currentAttachments.length) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = this.state.currentAttachments.map((att, i) => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; padding:8px 12px; border-radius:8px; border:1px solid #e2e8f0; font-size:0.8rem;">
                <span class="truncate">${Utils.escapeHTML(att.name)}</span>
                <button type="button" onclick="NearMiss.state.currentAttachments.splice(${i},1); NearMiss.renderAttachmentsPreview(this.closest('.modal-overlay'))" class="text-red-500 hover:text-red-700" style="background:none; border:none; cursor:pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    },

    async handleSubmit(form, existingRecord) {
        const type = document.getElementById('nearmiss-type')?.value || 'حادث وشيك';
        const severity = document.getElementById('nearmiss-severity')?.value || 'متوسط';
        const location = document.getElementById('nearmiss-location')?.value || '';
        const department = document.getElementById('nearmiss-department')?.value || '';
        const date = document.getElementById('nearmiss-date')?.value || new Date().toISOString();
        const observerName = document.getElementById('nearmiss-observer')?.value || 'فاعل خير';
        const description = document.getElementById('nearmiss-description')?.value || '';
        const correctiveCheck = document.getElementById('nearmiss-corrective-check')?.checked || false;
        const correctiveDescription = document.getElementById('nearmiss-corrective-description')?.value || '';

        const recordId = existingRecord?.id || ('NRM-' + Date.now());
        const isoCode = existingRecord?.isoCode || ('NM-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random()*9000));

        // رفع المرفقات التي بصيغة base64 إلى Drive قبل الحفظ
        const finalAttachments = [];
        for (let i = 0; i < this.state.currentAttachments.length; i++) {
            const att = this.state.currentAttachments[i];
            if (!att) continue;
            const rawData = att.data || att.url || '';
            if (typeof rawData === 'string' && rawData.startsWith('data:')) {
                try {
                    const fileName = att.name || ('nearmiss_' + recordId + '_' + (i + 1) + '.jpg');
                    const mimeType = att.type || 'image/jpeg';
                    if (typeof GoogleIntegration !== 'undefined' && typeof GoogleIntegration.uploadFileToDrive === 'function') {
                        const upRes = await GoogleIntegration.uploadFileToDrive(rawData, fileName, mimeType, 'NearMiss');
                        if (upRes && upRes.success && (upRes.fileId || upRes.directLink || upRes.shareableLink)) {
                            finalAttachments.push({
                                id: upRes.fileId || att.id || ('att-' + Date.now() + '-' + i),
                                name: fileName,
                                type: mimeType,
                                url: upRes.directLink || upRes.shareableLink || ('https://drive.google.com/uc?export=view&id=' + upRes.fileId),
                                directLink: upRes.directLink || upRes.shareableLink,
                                shareableLink: upRes.shareableLink,
                                fileId: upRes.fileId || ''
                            });
                            continue;
                        }
                    }
                } catch (_upErr) {
                    console.warn('Near miss attachment upload failed, keeping fallback:', _upErr);
                }
            }
            finalAttachments.push(att);
        }

        const record = {
            id: recordId,
            isoCode: isoCode,
            type,
            severity,
            location,
            department,
            date: new Date(date).toISOString(),
            observerName,
            description,
            correctiveProposed: correctiveCheck,
            correctiveDescription: correctiveCheck ? correctiveDescription : '',
            attachments: finalAttachments,
            status: correctiveCheck ? 'مفتوح' : 'مغلق',
            updatedAt: new Date().toISOString()
        };

        if (existingRecord) {
            const idx = AppState.appData.nearmiss.findIndex(r => String(r.id) === String(existingRecord.id) || String(r.isoCode) === String(existingRecord.id) || r.id == existingRecord.id);
            if (idx !== -1) AppState.appData.nearmiss[idx] = record;
        } else {
            record.createdAt = new Date().toISOString();
            AppState.appData.nearmiss.unshift(record);
        }

        // حفظ في السحابة
        try {
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callApi) {
                const action = existingRecord ? 'updateNearMiss' : 'addNearMiss';
                GoogleIntegration.callApi(action, record);
            }
        } catch(e) {}

        this.renderKpiStrip();
        this.renderTable();
        alert('✅ تم حفظ البلاغ بنجاح!');
    },

    editNearMiss(id) {
        const idStr = String(id || '').trim();
        const item = (AppState.appData.nearmiss || []).find((record) => 
            String(record.id || '').trim() === idStr || 
            String(record.isoCode || '').trim() === idStr || 
            record.id == id
        );
        if (item) this.showForm(item);
    },

    deleteNearMiss(id) {
        if (!confirm('هل أنت متأكد من حذف هذا البلاغ؟')) return;

        const idStr = String(id || '').trim();
        AppState.appData.nearmiss = (AppState.appData.nearmiss || []).filter(r => 
            String(r.id || '').trim() !== idStr && 
            String(r.isoCode || '').trim() !== idStr && 
            r.id != id
        );
        try {
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.callApi) {
                GoogleIntegration.callApi('deleteNearMiss', { nearMissId: id, id: id });
            }
        } catch(e) {}

        this.renderKpiStrip();
        this.renderTable();
    },

    /**
     * فتح نافذة بطاقات QR العامة للحوادث الوشيكة
     */
    getPublicUrl() {
        try {
            const loc = window.location;
            let base = loc.origin + loc.pathname;
            if (base.endsWith('.html')) {
                base = base.substring(0, base.lastIndexOf('/') + 1);
            } else if (!base.endsWith('/')) {
                base = base + '/';
            }
            return base + 'public-near-miss.html';
        } catch(e) {
            return window.location.href.split('?')[0].split('#')[0].replace(/[^/]*$/, '') + 'public-near-miss.html';
        }
    },

    generateQrDataUrl(data, size = 250) {
        try {
            if (typeof qrcode === 'function') {
                const qr = qrcode(0, 'M');
                qr.addData(String(data));
                qr.make();
                const moduleCount = typeof qr.getModuleCount === 'function' ? qr.getModuleCount() : 0;
                const cellSize = moduleCount ? Math.max(1, Math.floor(size / moduleCount)) : Math.max(2, Math.floor(size / 25));
                return qr.createDataURL(cellSize, 2);
            }
        } catch (e) {}

        try {
            if (typeof window !== 'undefined' && window.QRCode && typeof window.QRCode.generate === 'function') {
                const res = window.QRCode.generate(data, size);
                if (res) return res;
            }
        } catch (e) {}

        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
    },

    openPublicQrModal() {
        const publicUrl = this.getPublicUrl();
        
        // إزالة أي نافذة قديمة
        const oldModal = document.getElementById('nrm-public-qr-modal');
        if (oldModal) oldModal.remove();

        const modalEl = document.createElement('div');
        modalEl.id = 'nrm-public-qr-modal';
        modalEl.style.cssText = 'position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.75); display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(6px); direction:rtl; font-family:"Segoe UI", Tahoma, sans-serif;';

        const qrCodeUrl = this.generateQrDataUrl(publicUrl, 250);
        const encodedUrl = encodeURIComponent(publicUrl);

        modalEl.innerHTML = `
            <div style="background:#fff; border-radius:24px; max-width:520px; width:100%; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4); border:1px solid #e0e7ff; animation:fadeIn 0.2s ease;">
                <!-- الترويسة -->
                <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color:#fff; padding:22px 26px; display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:14px;">
                        <div style="width:48px; height:48px; border-radius:14px; background:rgba(255,255,255,0.18); display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-qrcode text-2xl text-amber-300"></i>
                        </div>
                        <div>
                            <h3 style="font-size:1.25rem; font-weight:800; margin:0; color:#fff;">النموذج العام للحوادث الوشيكة</h3>
                            <p style="font-size:0.75rem; color:#c7d2fe; margin:3px 0 0 0;">SafetyHub | ICAPP — Near Miss Public Reporting</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('nrm-public-qr-modal').remove()" style="background:none; border:none; color:rgba(255,255,255,0.8); font-size:1.8rem; cursor:pointer;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.8)'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- المحتوى -->
                <div style="padding:24px; text-align:center;">
                    <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:14px; padding:14px 18px; margin-bottom:20px; text-align:right; font-size:0.82rem; color:#312e81; display:flex; align-items:center; gap:12px;">
                        <i class="fas fa-shield-alt text-indigo-600 text-2xl"></i>
                        <div><b>رابط متاح لجميع العاملين والمقاولين:</b> يمكن مسح الرمز بكاميرا الهاتف لفتح نموذج الإبلاغ عن الحوادث الوشيكة فوراً بدون تسجيل دخول.</div>
                    </div>

                    <div style="display:inline-block; padding:16px; background:#fff; border-radius:20px; box-shadow:0 6px 20px rgba(0,0,0,0.06); border:2px solid #e0e7ff; margin-bottom:18px;">
                        <img src="${qrCodeUrl}" alt="QR Code" style="width:220px; height:220px; border-radius:12px; display:block; margin:0 auto;" onerror="if(!this.dataset.errCount){this.dataset.errCount=1;this.src='https://quickchart.io/qr?size=250&text=${encodedUrl}';}else if(this.dataset.errCount=='1'){this.dataset.errCount=2;this.src='https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${encodedUrl}';}" />
                    </div>

                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:20px; font-family:monospace; font-size:0.75rem; color:#475569; direction:ltr; text-align:center; word-break:break-all; user-select:all;">
                        ${publicUrl}
                    </div>

                    <!-- أزرار الإجراءات -->
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <button onclick="window.open('${publicUrl}', '_blank')" style="background:#f1f5f9; color:#1e293b; border:1px solid #cbd5e1; padding:11px 16px; border-radius:12px; font-weight:700; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
                            <i class="fas fa-external-link-alt text-indigo-600"></i>
                            <span>فتح النموذج الآن</span>
                        </button>
                        <button onclick="NearMiss.printLocationQrBadges()" style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:#fff; border:none; padding:11px 16px; border-radius:12px; font-weight:700; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
                            <i class="fas fa-print text-amber-300"></i>
                            <span>طباعة ملصقات المواقع 🖨️</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);
    },

    printLocationQrBadges() {
        this.openBatchNearMissQrModal();
    },

    /**
     * فتح نافذة طباعة كروت وبوسترات QR الشاملة للحوادث الوشيكة مع تحديد المقاس وتخطيط الصفحة
     */
    openBatchNearMissQrModal() {
        const placesBySite = {};

        const addSitePlace = (site, place) => {
            const s = String(site || '').trim();
            const p = String(place || '').trim();
            if (!s) return;
            if (!placesBySite[s]) placesBySite[s] = new Set();
            if (p) placesBySite[s].add(p);
        };

        try {
            if (typeof DailyObservations !== 'undefined' && DailyObservations.getAllSites) {
                const allSites = DailyObservations.getAllSites();
                allSites.forEach(s => {
                    const sName = s.name || s.siteName;
                    if (sName) {
                        addSitePlace(sName, '');
                        if (Array.isArray(s.places)) {
                            s.places.forEach(pl => addSitePlace(sName, pl.name || pl));
                        }
                    }
                });
            }
        } catch (e) {}

        (Array.isArray(AppState.appData?.observationSites) ? AppState.appData.observationSites : []).forEach(item => {
            addSitePlace(item.siteName || item.site || item.name, item.placeName || item.locationName || item.place);
        });

        (Array.isArray(AppState.appData?.subLocations) ? AppState.appData.subLocations : []).forEach(item => {
            addSitePlace(item.factoryName || item.factory || item.siteName || item.site, item.name || item.subLocationName || item.place);
        });

        // مواقع افتراضية لضمان التغطية الكاملة لمصانع ICAPP
        if (Object.keys(placesBySite).length === 0) {
            ['ICAPP-1', 'ICAPP-2', 'ICAPP-3', 'ICAPP-4', 'الموقع العام'].forEach(s => addSitePlace(s, ''));
        }

        const flatItems = [];
        for (const site of Object.keys(placesBySite)) {
            const places = Array.from(placesBySite[site]);
            if (places.length === 0) {
                flatItems.push({ site: site, place: 'الموقع العام' });
            } else {
                places.forEach(place => {
                    flatItems.push({ site: site, place: place });
                });
            }
        }

        const sitesList = Object.keys(placesBySite).sort();
        const allPlacesList = [...new Set(flatItems.map(i => i.place).filter(p => p !== 'الموقع العام'))].sort();

        // إزالة أي نافذة قديمة
        const oldModal = document.getElementById('nrm-batch-qr-modal');
        if (oldModal) oldModal.remove();

        const modal = document.createElement('div');
        modal.id = 'nrm-batch-qr-modal';
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.75); display:flex; align-items:center; justify-content:center; padding:16px; backdrop-filter:blur(6px); direction:rtl; font-family:"Segoe UI", Tahoma, sans-serif;';
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 640px; width:100%; background:#fff; border-radius: 18px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35); border: 1px solid #e0e7ff; animation:fadeIn 0.2s ease;">
                <!-- الترويسة -->
                <div class="modal-header" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color: #ffffff; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="width: 46px; height: 46px; border-radius: 12px; background: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center; color: #fde68a; font-size: 1.3rem;">
                            <i class="fas fa-print"></i>
                        </div>
                        <div>
                            <h2 class="modal-title" style="color: #ffffff; font-size: 1.2rem; font-weight: 800; margin: 0 0 3px 0;">طباعة كروت وبوسترات QR للحوادث الوشيكة</h2>
                            <p style="font-size: 0.8rem; color: #c7d2fe; margin: 0;">طباعة ملصقات وبوسترات QR لجميع المصانع والمواقع دفعة واحدة</p>
                        </div>
                    </div>
                    <button class="modal-close" style="background:none; border:none; color: #c7d2fe; font-size: 1.5rem; cursor:pointer;" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i></button>
                </div>
                
                <div class="modal-body" style="padding: 24px; background: #f8fafc;">
                    <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 12px; padding: 14px 18px; margin-bottom: 18px; display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-info-circle text-indigo-600" style="font-size: 22px;"></i>
                        <div style="font-size: 0.88rem; color: #312e81; font-weight: 700;">
                            إجمالي الأماكن والمصانع المسجلة بقاعدة البيانات: <span style="font-size: 1.1rem; color: #dc2626;" id="nrm-batch-total-count">${flatItems.length}</span> موقع ومكان
                        </div>
                    </div>

                    <!-- فلاتر التخصيص -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-industry text-indigo-600 ml-1"></i> تصفية حسب الموقع / المصنع:
                            </label>
                            <select id="nrm-batch-site-filter" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #cbd5e1; font-size: 0.85rem; background:#fff;">
                                <option value="all">— جميع المواقع والمصانع —</option>
                                ${sitesList.map(s => `<option value="${Utils.escapeHTML(s)}">${Utils.escapeHTML(s)}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-tags text-indigo-600 ml-1"></i> تصفية حسب طبيعة المكان:
                            </label>
                            <select id="nrm-batch-place-filter" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #cbd5e1; font-size: 0.85rem; background:#fff;">
                                <option value="all">— جميع الأقسام والأماكن —</option>
                                ${allPlacesList.map(p => `<option value="${Utils.escapeHTML(p)}">${Utils.escapeHTML(p)}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-border-all text-indigo-600 ml-1"></i> مقاس وتخطيط الملصقات:
                            </label>
                            <select id="nrm-batch-layout-select" class="form-select" style="width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid #6366f1; font-size: 0.85rem; background:#fff; font-weight:700; color:#1e1b4b;">
                                <option value="1x1" selected>⭐ بوستر إعلاني كامل (ورقة A4 كاملة - رمز واحد كبير للوحات الإعلانات)</option>
                                <option value="2x2">بطاقات عريضة واضحة (صفين × 2 = 4 كروت في صفحة A4)</option>
                                <option value="2x3">كروت كبيرة (صفين × 3 = 6 كروت في صفحة A4)</option>
                                <option value="2x4">ملصقات قياسية (صفين × 4 = 8 كروت في صفحة A4)</option>
                                <option value="3x4">ملصقات مدمجة (3 أعمدة × 4 = 12 كارت في صفحة A4)</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
                                <i class="fas fa-calculator text-emerald-600 ml-1"></i> المواقع المحددة للطباعة:
                            </label>
                            <div style="padding: 10px 14px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 10px; font-weight: 800; font-size: 0.95rem; color: #047857;" id="nrm-batch-selected-preview">
                                ${flatItems.length} موقع جاهز للطباعة
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer" style="padding: 16px 24px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <button type="button" id="nrm-batch-print-btn" style="padding: 11px 22px; border-radius: 10px; font-weight: 800; font-size:0.9rem; display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color:#fff; border:none; cursor:pointer; box-shadow:0 4px 12px rgba(49,46,129,0.35);">
                        <i class="fas fa-print text-amber-300"></i>
                        <span>بدء طباعة الملصقات / البوسترات الآن (A4)</span>
                    </button>
                    <button type="button" style="background:#f1f5f9; border:1px solid #cbd5e1; color:#475569; padding:10px 18px; border-radius:10px; font-weight:700; cursor:pointer;" onclick="this.closest('.modal-overlay').remove()">إلغاء</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const siteFilter = modal.querySelector('#nrm-batch-site-filter');
        const placeFilter = modal.querySelector('#nrm-batch-place-filter');
        const layoutSelect = modal.querySelector('#nrm-batch-layout-select');
        const previewEl = modal.querySelector('#nrm-batch-selected-preview');
        const printBtn = modal.querySelector('#nrm-batch-print-btn');

        const getSelectedItems = () => {
            const siteVal = siteFilter.value;
            const placeVal = placeFilter.value;
            return flatItems.filter(item => {
                if (siteVal !== 'all' && item.site !== siteVal) return false;
                if (placeVal !== 'all' && item.place !== placeVal) return false;
                return true;
            });
        };

        const updatePreview = () => {
            const filtered = getSelectedItems();
            previewEl.textContent = `${filtered.length} موقع جاهز للطباعة`;
            printBtn.disabled = filtered.length === 0;
            printBtn.style.opacity = filtered.length === 0 ? '0.5' : '1';
        };

        siteFilter.addEventListener('change', updatePreview);
        placeFilter.addEventListener('change', updatePreview);

        printBtn.addEventListener('click', () => {
            const filtered = getSelectedItems();
            if (filtered.length === 0) {
                alert('لا توجد مواقع مطابقة للتصفية.');
                return;
            }
            modal.remove();
            this.renderNearMissQrPrintPage(filtered, layoutSelect.value);
        });
    },

    /**
     * توليد وعرض صفحة الطباعة الاحترافية للبوسترات والكروت
     */
    renderNearMissQrPrintPage(itemsToPrint, layoutType = '1x1') {
        if (!itemsToPrint || itemsToPrint.length === 0) return;

        const publicUrl = this.getPublicUrl();
        const origin = window.location.origin || '';
        let basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        if (!basePath.endsWith('/')) basePath += '/';
        const logoUrl = `${origin}${basePath}icons/icapp-logo.png`;

        const cleanPlaceName = (rawPlace, siteName) => {
            if (!rawPlace) return 'الموقع العام';
            let p = String(rawPlace).trim();
            p = p.replace(/^(?:\d+[-_]?ICAPP|ICAPP[-_]?\d+)[-_ ]*/i, '').trim();
            if (siteName) {
                const escapedSite = String(siteName).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                p = p.replace(new RegExp(`^${escapedSite}[-_ ]*`, 'i'), '').trim();
            }
            return p || 'الموقع العام';
        };

        // ══════════════════════════════════════════════════════
        // نمط 1: بوستر إعلاني كامل للوحة الإعلانات (ورقة A4 كاملة لكل موقع)
        // ══════════════════════════════════════════════════════
        if (layoutType === '1x1') {
            const postersHtml = itemsToPrint.map((item, idx) => {
                const site = item.site;
                const rawPlace = item.place || 'الموقع العام';
                const displayPlace = cleanPlaceName(rawPlace, site);
                const directTarget = `${publicUrl}?factory=${encodeURIComponent(site)}&place=${encodeURIComponent(rawPlace)}`;
                const qrUrl = this.generateQrDataUrl(directTarget, 280);
                const encodedTarget = encodeURIComponent(directTarget);

                return `
                    <div class="a4-poster-page">
                        <!-- ترويسة ISO الرسمية المعتمدة -->
                        <div class="iso-header-table">
                            <div class="iso-h-cell iso-brand-cell">
                                <div class="iso-company-text">الشركة العالمية للإنتاج والتصنيع الزراعي</div>
                                <div class="iso-dept-tag">إدارة السلامة والصحة المهنية والبيئة</div>
                            </div>
                            <div class="iso-h-cell iso-title-cell">
                                <div class="iso-doc-maintitle">نظام الإبلاغ عن الحوادث الوشيكة</div>
                                <div class="iso-doc-sub">Near Miss & Incident Prevention Reporting System</div>
                            </div>
                            <div class="iso-h-cell iso-logo-cell">
                                <img src="${logoUrl}" alt="ICAPP" class="iso-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <div class="iso-logo-fallback" style="display:none; font-size:1.15rem; font-weight:900; color:#1e1b4b;">ICAPP</div>
                                <div class="iso-logo-subtag">SafetyHub</div>
                            </div>
                        </div>

                        <!-- شريط الموقع المخصص -->
                        <div class="location-banner">
                            <span class="loc-tag-label"><i class="fas fa-map-marker-alt ml-1"></i> ملصق مخصص للموقع:</span>
                            <span class="loc-name-highlight">
                                <bdi dir="ltr">${Utils.escapeHTML(site)}</bdi>
                                <span style="margin: 0 6px; opacity: 0.85;">—</span>
                                <bdi dir="auto">${Utils.escapeHTML(displayPlace)}</bdi>
                            </span>
                        </div>

                        <!-- العنوان والرسالة التوعوية الجاذبة -->
                        <div class="hero-callout">
                            <h2 class="hero-title">⚠️ سلامتك وسلامة زملائك تبدأ بملحوظتك!</h2>
                            <p class="hero-subtitle">رصدك للحادث الوشيك أو التصرف غير الآمن اليوم يمنع وقوع إصابة خطيرة غداً</p>
                        </div>

                        <!-- منطقة الرمز QR المركزية -->
                        <div class="qr-main-container">
                            <div class="qr-frame">
                                <img src="${qrUrl}" alt="QR Code" class="qr-img-large" onerror="if(!this.dataset.errCount){this.dataset.errCount=1;this.src='https://quickchart.io/qr?size=280&text=${encodedTarget}';}" />
                            </div>
                            <div class="qr-action-caption">
                                <i class="fas fa-camera ml-1 text-amber-500"></i>
                                <span>امسح الرمز بكاميرا هاتفك المحمول لفتح النموذج فوراً</span>
                            </div>
                        </div>

                        <!-- شبكة الإرشادات والتعليمات الجاذبة للانتباه -->
                        <div class="instructions-grid">
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-qrcode text-indigo-600"></i></div>
                                <div class="inst-text-wrap">
                                    <div class="inst-title">1. مسح فوري وسهل</div>
                                    <div class="inst-desc">افتح كاميرا الهاتف واقرأ الرمز، لا يلزم تحميل أي تطبيق.</div>
                                </div>
                            </div>
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-map-pin text-emerald-600"></i></div>
                                <div class="inst-text-wrap">
                                    <div class="inst-title">2. تحديد موقع تلقائي</div>
                                    <div class="inst-desc">يفتح النموذج مباشرة على هذا المكان المحدد بدقة.</div>
                                </div>
                            </div>
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-user-shield text-blue-600"></i></div>
                                <div class="inst-text-wrap">
                                    <div class="inst-title">3. إبلاغ آمن ومتاح للجميع</div>
                                    <div class="inst-desc">بدون تسجيل دخول، متاح للعاملين والمقاولين والزوار (باسمك أو مخفي).</div>
                                </div>
                            </div>
                            <div class="instruction-card">
                                <div class="inst-icon"><i class="fas fa-bolt text-amber-600"></i></div>
                                <div class="inst-text-wrap">
                                    <div class="inst-title">4. استجابة وإجراء فوري</div>
                                    <div class="inst-desc">يصل البلاغ فوراً لفريق السلامة والصيانة لتصحيح الخطر.</div>
                                </div>
                            </div>
                        </div>

                        <!-- شريط التوعية والحافز -->
                        <div class="incentive-banner">
                            <i class="fas fa-trophy text-amber-400 text-lg ml-2"></i>
                            <span><b>ثقافة السلامة الإيجابية:</b> تقديراً لمشاركتك الفعالة، يتم تكريم أفضل البلاغات الوقائية الاستباقية دورياً! 🌟</span>
                        </div>

                        <!-- الفوتر الرسمي الصافي (بيانات توثيق النموذج فقط) -->
                        <div class="iso-footer-table">
                            <div class="footer-meta-item"><b>كود النموذج:</b> <span dir="ltr">HSE-DOC-NRM-01</span></div>
                            <div class="footer-meta-sep">|</div>
                            <div class="footer-meta-item"><b>تاريخ الإصدار:</b> <span dir="ltr">01-08-2026</span></div>
                            <div class="footer-meta-sep">|</div>
                            <div class="footer-meta-item"><b>رقم الإصدار:</b> <span dir="ltr">Rev. 02 (2026)</span></div>
                        </div>
                    </div>
                `;
            }).join('');

            const fullPosterHtml = `
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>بوسترات QR للحوادث الوشيكة (${itemsToPrint.length} بوستر A4) - ICAPP SafetyHub</title>
                    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                    <style>
                        @page { size: A4 portrait; margin: 0; }
                        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                        html, body { margin: 0; padding: 0; font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; color: #0f172a; background: #525659; }
                        
                        .no-print-bar { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; gap: 12px; background: #1e1b4b; padding: 8px 18px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
                        .print-btn { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; border: none; padding: 8px 22px; border-radius: 8px; font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: inherit; }
                        .close-btn { background: rgba(255,255,255,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.4); padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; font-family: inherit; }
                        
                        .a4-poster-page {
                            width: 210mm;
                            height: 296mm;
                            max-height: 296mm;
                            padding: 8mm 12mm 6mm;
                            margin: 10px auto;
                            background: #ffffff;
                            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            position: relative;
                            overflow: hidden;
                            page-break-inside: avoid;
                            break-inside: avoid;
                            page-break-after: always;
                            break-after: page;
                        }

                        @media print {
                            .no-print-bar { display: none !important; }
                            html, body {
                                width: 210mm;
                                height: 297mm;
                                margin: 0 !important;
                                padding: 0 !important;
                                background: #fff;
                            }
                            .a4-poster-page {
                                width: 210mm;
                                height: 297mm;
                                max-height: 297mm;
                                margin: 0 !important;
                                padding: 8mm 12mm 6mm !important;
                                box-shadow: none;
                                border-radius: 0;
                                page-break-after: always;
                                break-after: page;
                                page-break-inside: avoid;
                                break-inside: avoid;
                                overflow: hidden;
                            }
                        }

                        /* Header */
                        .iso-header-table {
                            display: grid;
                            grid-template-columns: 235px 1fr 125px;
                            border: 2px solid #1e1b4b;
                            border-radius: 8px;
                            overflow: hidden;
                            background: #f8fafc;
                        }
                        .iso-h-cell { padding: 6px 10px; display: flex; flex-direction: column; justify-content: center; }
                        .iso-brand-cell {
                            border-left: 1.5px solid #cbd5e1;
                            text-align: right;
                            padding: 6px 12px;
                        }
                        .iso-company-text {
                            font-size: 0.72rem;
                            font-weight: 800;
                            color: #1e1b4b;
                            line-height: 1.25;
                            white-space: nowrap;
                        }
                        .iso-dept-tag {
                            font-size: 0.62rem;
                            font-weight: 800;
                            color: #065f46;
                            margin-top: 3px;
                            white-space: nowrap;
                            line-height: 1.25;
                        }
                        .iso-title-cell {
                            text-align: center;
                            justify-content: center;
                            border-left: 1.5px solid #cbd5e1;
                        }
                        .iso-doc-maintitle {
                            font-size: 1.12rem;
                            font-weight: 900;
                            color: #1e1b4b;
                            margin: 0;
                            line-height: 1.2;
                        }
                        .iso-doc-sub {
                            font-size: 0.65rem;
                            color: #64748b;
                            font-weight: 700;
                            margin-top: 2px;
                        }
                        .iso-logo-cell {
                            background: #ffffff;
                            color: #1e1b4b;
                            text-align: center;
                            align-items: center;
                            justify-content: center;
                            padding: 6px;
                        }
                        .iso-logo-img {
                            max-height: 38px;
                            max-width: 95px;
                            object-fit: contain;
                            display: block;
                            margin: 0 auto;
                        }
                        .iso-logo-subtag {
                            font-size: 0.58rem;
                            color: #4338ca;
                            font-weight: 800;
                            margin-top: 2px;
                        }

                        /* Location Banner */
                        .location-banner {
                            margin: 6px 0;
                            background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
                            color: #fff;
                            padding: 8px 16px;
                            border-radius: 8px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                            gap: 12px;
                            white-space: nowrap;
                            box-shadow: 0 2px 8px rgba(49, 46, 129, 0.15);
                        }
                        .loc-tag-label { font-size: 0.82rem; color: #fbbf24; font-weight: 700; white-space: nowrap; flex-shrink: 0; }
                        .loc-name-highlight { font-size: 1.05rem; font-weight: 900; color: #ffffff; letter-spacing: 0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; direction: rtl; unicode-bidi: isolate; }

                        /* Hero Callout */
                        .hero-callout {
                            text-align: center;
                            background: #fffbeb;
                            border: 2px dashed #f59e0b;
                            border-radius: 10px;
                            padding: 8px 12px;
                            margin-bottom: 6px;
                        }
                        .hero-title { margin: 0; font-size: 1.15rem; font-weight: 900; color: #b45309; }
                        .hero-subtitle { margin: 3px 0 0 0; font-size: 0.8rem; font-weight: 700; color: #78350f; }

                        /* QR Main Container */
                        .qr-main-container {
                            text-align: center;
                            padding: 8px;
                            background: #f8fafc;
                            border: 2px solid #e0e7ff;
                            border-radius: 12px;
                            margin-bottom: 6px;
                        }
                        .qr-frame {
                            display: inline-block;
                            padding: 10px;
                            background: #ffffff;
                            border-radius: 12px;
                            box-shadow: 0 4px 14px rgba(0,0,0,0.06);
                            border: 2px solid #312e81;
                        }
                        .qr-img-large { width: 175px; height: 175px; display: block; border-radius: 6px; }
                        .qr-action-caption {
                            margin-top: 6px;
                            font-size: 0.88rem;
                            font-weight: 800;
                            color: #1e1b4b;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 6px;
                        }

                        /* Instructions Grid */
                        .instructions-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 8px;
                            margin-bottom: 6px;
                        }
                        .instruction-card {
                            background: #ffffff;
                            border: 1.5px solid #e2e8f0;
                            border-radius: 8px;
                            padding: 7px 10px;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            min-width: 0;
                        }
                        .inst-icon { font-size: 1.15rem; flex-shrink: 0; }
                        .inst-text-wrap { min-width: 0; flex: 1; }
                        .inst-title { font-size: 0.78rem; font-weight: 800; color: #1e1b4b; line-height: 1.2; }
                        .inst-desc { font-size: 0.64rem; color: #475569; font-weight: 600; margin-top: 2px; line-height: 1.25; white-space: nowrap; }

                        /* Incentive Banner */
                        .incentive-banner {
                            background: linear-gradient(135deg, #065f46 0%, #047857 100%);
                            color: #ffffff;
                            padding: 6px 12px;
                            border-radius: 8px;
                            font-size: 0.74rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            margin-bottom: 4px;
                        }

                        /* Footer */
                        .iso-footer-table {
                            border: 1.5px solid #cbd5e1;
                            background: #f8fafc;
                            border-radius: 8px;
                            padding: 7px 16px;
                            margin-top: 4px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 0.74rem;
                            color: #334155;
                            font-weight: 700;
                            gap: 18px;
                        }
                        .footer-meta-item {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            white-space: nowrap;
                        }
                        .footer-meta-item b {
                            color: #1e1b4b;
                        }
                        .footer-meta-sep {
                            color: #94a3b8;
                            font-weight: 900;
                        }
                    </style>
                </head>
                <body>
                    <div class="no-print-bar">
                        <button class="print-btn" onclick="window.print()"><i class="fas fa-print"></i> طباعة جميع البوسترات (${itemsToPrint.length} A4)</button>
                        <button class="close-btn" onclick="window.close()">إغلاق</button>
                    </div>
                    ${postersHtml}
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                if (window.location.search.indexOf('noprint') === -1) {
                                    window.print();
                                }
                            }, 500);
                        };
                    </script>
                </body>
                </html>
            `;

            if (typeof Utils !== 'undefined' && typeof Utils.downloadHtmlAsPdf === 'function') {
                const fileName = `بوسترات_الحوادث_الوشيكة_${itemsToPrint.length}.pdf`;
                Utils.downloadHtmlAsPdf(fullPosterHtml, fileName, { title: 'بوسترات QR للحوادث الوشيكة' });
                return;
            }

            const printWin = window.open('', '_blank');
            if (!printWin) {
                alert('يرجى السماح بالنوافذ المنبثقة لطباعة كروت وبوسترات QR');
                return;
            }
            printWin.document.write(fullPosterHtml);
            printWin.document.close();
            return;
        }

        // ══════════════════════════════════════════════════════
        // نمط 2: شبكة ملصقات وبطاقات متعددة (2x4, 2x2, 2x3, 3x4)
        // ══════════════════════════════════════════════════════
        let gridCols = 2;
        let cardMinHeight = '120px';
        let qrSize = 100;
        let fontSizeTitle = '13px';
        let fontSizeSub = '11px';

        if (layoutType === '3x4') {
            gridCols = 3;
            cardMinHeight = '110px';
            qrSize = 85;
            fontSizeTitle = '11.5px';
            fontSizeSub = '9.5px';
        } else if (layoutType === '2x3') {
            gridCols = 2;
            cardMinHeight = '150px';
            qrSize = 125;
            fontSizeTitle = '14px';
            fontSizeSub = '12px';
        } else if (layoutType === '2x2') {
            gridCols = 2;
            cardMinHeight = '180px';
            qrSize = 145;
            fontSizeTitle = '16px';
            fontSizeSub = '13px';
        } else {
            // 2x4
            gridCols = 2;
            cardMinHeight = '130px';
            qrSize = 105;
            fontSizeTitle = '13.5px';
            fontSizeSub = '11.5px';
        }

        const cardsHtml = itemsToPrint.map((item, idx) => {
            const site = item.site;
            const rawPlace = item.place || 'الموقع العام';
            const displayPlace = cleanPlaceName(rawPlace, site);
            const directTarget = `${publicUrl}?factory=${encodeURIComponent(site)}&place=${encodeURIComponent(rawPlace)}`;
            const qrUrl = this.generateQrDataUrl(directTarget, qrSize);
            const encodedTarget = encodeURIComponent(directTarget);

            return `
                <div class="qr-card">
                    <div class="qr-card-header">
                        <span class="qr-card-tag"><i class="fas fa-shield-alt"></i> SafetyHub | ICAPP</span>
                        <span class="qr-card-badge">حادث وشيك #${idx + 1}</span>
                    </div>
                    <div class="qr-card-body">
                        <div class="qr-card-info">
                            <div class="qr-card-site" style="font-size:${fontSizeTitle};"><bdi dir="ltr">${Utils.escapeHTML(site)}</bdi></div>
                            <div class="qr-card-place" style="font-size:${fontSizeSub};"><bdi dir="auto">${Utils.escapeHTML(displayPlace)}</bdi></div>
                            <div class="qr-card-inst"><i class="fas fa-camera ml-1"></i> امسح للإبلاغ الفوري عن خطر وشيك</div>
                        </div>
                        <div class="qr-card-img-wrap">
                            <img src="${qrUrl}" alt="QR" class="qr-code-img" style="width:${qrSize}px; height:${qrSize}px;" onerror="if(!this.dataset.errCount){this.dataset.errCount=1;this.src='https://quickchart.io/qr?size=${qrSize}&text=${encodedTarget}';}">
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const fullCardsHtml = `
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <title>ملصقات وكروت QR الحوادث الوشيكة (${itemsToPrint.length} موقع) - SafetyHub ICAPP</title>
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    @page { size: A4 portrait; margin: 8mm; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
                    body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; color: #0f172a; margin: 0; padding: 6px; background: #ffffff; }
                    .no-print-bar { margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; background: #1e1b4b; color:#fff; padding: 10px 16px; border-radius: 10px; }
                    .print-btn { background: #f59e0b; color: #000; border: none; padding: 8px 20px; border-radius: 6px; font-weight: 800; font-family: inherit; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
                    @media print { .no-print-bar { display: none !important; } }
                    
                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(${gridCols}, 1fr);
                        gap: 6mm;
                    }
                    
                    .qr-card {
                        border: 2px solid #312e81;
                        border-radius: 12px;
                        padding: 10px 12px;
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        min-height: ${cardMinHeight};
                        page-break-inside: avoid;
                        break-inside: avoid;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.04);
                    }
                    
                    .qr-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #e0e7ff;
                        padding-bottom: 5px;
                        margin-bottom: 6px;
                    }
                    
                    .qr-card-tag { font-size: 0.72rem; font-weight: 800; color: #3730a3; }
                    .qr-card-badge { font-size: 0.65rem; font-weight: 800; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; }
                    
                    .qr-card-body {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 8px;
                    }
                    
                    .qr-card-info { flex: 1; min-width: 0; }
                    .qr-card-site { font-weight: 900; color: #1e1b4b; line-height: 1.2; }
                    .qr-card-place { color: #4338ca; font-weight: 700; margin-top: 3px; line-height: 1.2; }
                    .qr-card-inst { font-size: 0.68rem; color: #64748b; margin-top: 6px; font-weight: 600; }
                    
                    .qr-card-img-wrap { flex-shrink: 0; }
                    .qr-code-img { border-radius: 6px; border: 1.5px solid #e2e8f0; display: block; }
                </style>
            </head>
            <body>
                <div class="no-print-bar">
                    <span style="font-weight:700;"><i class="fas fa-qrcode text-amber-300 ml-2"></i> طباعة ملصقات الـ QR للحوادث الوشيكة (${itemsToPrint.length} موقع)</span>
                    <button class="print-btn" onclick="window.print()"><i class="fas fa-print"></i> طباعة الآن</button>
                </div>
                <div class="cards-grid">
                    ${cardsHtml}
                </div>
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `;

        if (typeof Utils !== 'undefined' && typeof Utils.downloadHtmlAsPdf === 'function') {
            const fileName = `ملصقات_QR_الحوادث_الوشيكة_${itemsToPrint.length}.pdf`;
            Utils.downloadHtmlAsPdf(fullCardsHtml, fileName, { title: 'ملصقات QR للحوادث الوشيكة' });
            return;
        }

        const printWin = window.open('', '_blank');
        if (!printWin) {
            alert('يرجى السماح بالنوافذ المنبثقة لطباعة كروت وبوسترات QR');
            return;
        }
        printWin.document.write(fullCardsHtml);
        printWin.document.close();
    },

    exportAnalyticsPDF() {
        const container = document.getElementById('nearmiss-analytics-container') || document.querySelector('#tab-analytics') || document.querySelector('.tab-content.active');
        const content = container ? container.innerHTML : '';
        const html = `
            <div style="direction: rtl; font-family: Cairo, Tahoma, sans-serif; padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #4f46e5; padding-bottom: 12px;">
                    <h2 style="color: #1e1b4b; margin: 0 0 6px 0;">الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP)</h2>
                    <h3 style="color: #4338ca; margin: 0 0 6px 0;">إدارة السلامة والصحة المهنية والبيئة</h3>
                    <h4 style="color: #334155; margin: 0;">لوحة التحليل البياني للحوادث الوشيكة</h4>
                    <p style="color: #64748b; font-size: 12px; margin: 6px 0 0 0;">تاريخ التقرير: ${new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                ${content}
            </div>
        `;
        if (typeof Utils !== 'undefined' && typeof Utils.downloadHtmlAsPdf === 'function') {
            const fileName = `تقرير_تحليل_الحوادث_الوشيكة_${new Date().toISOString().slice(0, 10)}.pdf`;
            Utils.downloadHtmlAsPdf(html, fileName, { title: 'لوحة التحليل البياني للحوادث الوشيكة' });
            return;
        }
        window.print();
    }
};

// Export to window
if (typeof window !== 'undefined') {
    window.NearMiss = NearMiss;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NearMiss;
}
