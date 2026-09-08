/**
 * Clinic Attendance submodule — extracted from clinic.js
 */
const ClinicAttendanceMixin = {
    _scheduleAttendanceDataLoadIfNeeded(force) {
        if (this._attendanceDataLoadPromise) return;
        const hasStaff = Array.isArray(AppState.appData?.clinicStaff) && AppState.appData.clinicStaff.length > 0;
        const hasAttendanceRecords = Array.isArray(AppState.appData?.clinicStaffAttendance) && AppState.appData.clinicStaffAttendance.length > 0;
        const isAdmin = this.canViewAllAttendanceData();
        if (!force && this._attendanceDataFetchedInSession === true) {
            if (!isAdmin || (hasStaff && hasAttendanceRecords)) return;
        }
        if (!force && !isAdmin && hasStaff && hasAttendanceRecords) {
            this._attendanceDataFetchedInSession = true;
            return;
        }
        this._attendanceDataLoadPromise = this.loadClinicAttendanceData(!!force)
            .then((ok) => {
                if (ok) this._attendanceDataFetchedInSession = true;
                if (this.state?.activeTab === 'attendance') this.renderAttendanceTab({ force: true });
            })
            .catch(() => { })
            .finally(() => { this._attendanceDataLoadPromise = null; });
    },

    _isAttendanceDataLoading() {
        return !!this._attendanceDataLoadPromise;
    },

    _renderAttendanceTableLoadingRow(colspan, label) {
        const safeLabel = Utils.escapeHTML(label || 'جاري تحميل البيانات...');
        return `<tr><td colspan="${colspan}" class="text-center text-gray-500 py-10">
            <i class="fas fa-spinner fa-spin ml-2" style="color:#0d9488;"></i>${safeLabel}
        </td></tr>`;
    },

    async loadClinicStaffActivities(force) {
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) return;
        if (this.state?.activeTab && this.state.activeTab !== 'attendance') return;
        const hasLocal = Array.isArray(AppState.appData?.clinicStaffSystemActivities) && AppState.appData.clinicStaffSystemActivities.length > 0;
        if (!force && hasLocal) return;

        this._clinicStaffActivitiesLoading = true;

        if (this._clinicVisitsLoadPromise) {
            try { await this._clinicVisitsLoadPromise; } catch (_e) { /* ignore */ }
        }
        await new Promise(resolve => setTimeout(resolve, 800));

        const f = this.state.filters?.attendance || {};
        const range = this._resolveAttendanceFilterDates(f);
        const payload = {
            limit: 200,
            dateFrom: range.dateFrom || '',
            dateTo: range.dateTo || '',
            moduleKey: f.activityModule && f.activityModule !== 'all' ? f.activityModule : ''
        };
        if (f.staffId && f.staffId !== 'all' && this.canViewAllAttendanceData()) {
            payload.staffId = f.staffId;
        }

        const localVisitActivities = this._buildLocalClinicVisitActivities_(payload);

        try {
            const resp = await GoogleIntegration.sendRequest({
                action: 'getClinicStaffSystemActivities',
                data: { filters: payload }
            });
            const remote = (resp?.success && Array.isArray(resp.data)) ? resp.data : [];
            AppState.appData.clinicStaffSystemActivities = this._mergeClinicStaffActivities_([
                localVisitActivities,
                remote
            ]).slice(0, payload.limit || 200);
            this._clinicStaffActivitiesFetched = true;
        } catch (_e) {
            if (localVisitActivities.length) {
                AppState.appData.clinicStaffSystemActivities = localVisitActivities;
                this._clinicStaffActivitiesFetched = true;
            }
        } finally {
            this._clinicStaffActivitiesLoading = false;
        }
    },

    getCurrentUserStaffRecord() {
        const user = AppState.currentUser;
        if (!user) return null;
        const uid = String(user.id || '').trim();
        const email = String(user.email || '').trim().toLowerCase();
        return (this.getClinicStaffList() || []).find(s => {
            const suid = String(s.userId || s.id || '').trim();
            const semail = String(s.userEmail || '').trim().toLowerCase();
            return (uid && suid === uid) || (email && semail === email);
        }) || null;
    },

    isActiveClinicStaffMember() {
        const staff = this.getCurrentUserStaffRecord();
        if (!staff) return false;
        return String(staff.isActive || 'true').toLowerCase() !== 'false';
    },

    canAccessAttendanceTab() {
        if (this.isCurrentUserAdmin()) return true;
        if (typeof Permissions !== 'undefined' && !Permissions.hasDetailedPermission('clinic', 'attendance')) return false;
        return this.isActiveClinicStaffMember();
    },

    canViewAllAttendanceData() {
        return this.isCurrentUserAdmin();
    },

    _attendanceRowBelongsToCurrentUser_(row) {
        const user = AppState.currentUser;
        if (!user || !row) return false;
        const uid = String(user.id || '').trim();
        const email = String(user.email || '').trim().toLowerCase();
        const staff = this.getCurrentUserStaffRecord();
        if (staff && staff.id && String(row.staffId) === String(staff.id)) return true;
        if (uid && String(row.userId || '') === uid) return true;
        if (email && String(row.userEmail || '').trim().toLowerCase() === email) return true;
        return false;
    },

    getTimeOffRequestTypeLabel(type) {
        const map = { leave: 'إجازة', permission: 'إذن', overtime: 'إضافي' };
        return map[String(type || '').trim()] || type || '—';
    },

    getTimeOffStatusBadge(status) {
        const map = {
            pending: '<span class="badge badge-warning">معلق</span>',
            approved: '<span class="badge badge-success">معتمد</span>',
            rejected: '<span class="badge badge-danger">مرفوض</span>',
            cancelled: '<span class="badge badge-secondary">ملغى</span>'
        };
        return map[String(status || '').trim()] || '<span class="badge badge-secondary">—</span>';
    },

    formatTimeOffRequestDetails(req) {
        const type = String(req.requestType || '').trim();
        if (type === 'leave') {
            return `${req.dateFrom || '—'} → ${req.dateTo || '—'} (${req.durationDays || '—'} يوم)`;
        }
        if (type === 'permission') {
            return `${req.dateFrom || '—'} | ${req.timeFrom || '—'} - ${req.timeTo || '—'}`;
        }
        if (type === 'overtime') {
            const hours = req.durationHours ? `${req.durationHours} س` : '';
            const times = (req.timeFrom && req.timeTo) ? `${req.timeFrom} - ${req.timeTo}` : '';
            return `${req.dateFrom || '—'} ${hours || times}`.trim();
        }
        return '—';
    },

    getStaffRoleLabel(role) {
        const map = { doctor: 'طبيب', nurse: 'تمريض', clinic_officer: 'مسئول عيادة' };
        return map[String(role || '').trim()] || role || '—';
    },

    getAttendanceStatusLabel(status) {
        const map = { present: 'حاضر', partial: 'خروج جزئي', absent: 'غائب' };
        return map[String(status || '').trim()] || status || '—';
    },

    getAttendanceStatusBadgeClass(status) {
        const s = String(status || '').trim();
        if (s === 'present') return 'badge-success';
        if (s === 'partial') return 'badge-warning';
        return 'badge-secondary';
    },

    _toDatetimeLocalValue(val, dateKey) {
        try {
            if (val) {
                const d = new Date(val);
                if (!Number.isNaN(d.getTime())) {
                    const y = d.getFullYear();
                    const m = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    const h = String(d.getHours()).padStart(2, '0');
                    const min = String(d.getMinutes()).padStart(2, '0');
                    return `${y}-${m}-${day}T${h}:${min}`;
                }
            }
            if (dateKey) {
                const defaultTime = String(val || '').includes('checkout') || String(val || '') === 'checkOut' ? '17:00' : '08:00';
                return `${dateKey}T${defaultTime}`;
            }
            return '';
        } catch (_e) {
            return dateKey ? `${dateKey}T08:00` : '';
        }
    },

    _renderAttendancePunchActions(record) {
        if (!record || !this.canAccessAttendanceTab()) return '<span class="text-xs text-gray-400">—</span>';
        const parts = [];
        const rid = Utils.escapeAttr(String(record.id || ''));
        if (!record.checkIn) {
            parts.push(`<button type="button" class="btn-secondary btn-sm" title="إضافة بصمة دخول مفقودة" onclick="Clinic.showAttendancePunchModal('${rid}', 'checkIn')"><i class="fas fa-sign-in-alt ml-1"></i>دخول</button>`);
        }
        if (!record.checkOut) {
            parts.push(`<button type="button" class="btn-secondary btn-sm" title="إضافة بصمة خروج مفقودة" onclick="Clinic.showAttendancePunchModal('${rid}', 'checkOut')"><i class="fas fa-sign-out-alt ml-1"></i>خروج</button>`);
        }
        if (!parts.length) return '<span class="text-xs text-gray-400">مكتمل</span>';
        return `<div class="flex items-center gap-1 flex-wrap">${parts.join('')}</div>`;
    },

    _findAttendanceRecordById(recordId) {
        const id = String(recordId || '').trim();
        if (!id) return null;
        return (this.getClinicStaffAttendanceList() || []).find(r => String(r.id) === id) || null;
    },

    showAttendancePunchModal(recordId, punchType) {
        if (!this.canAccessAttendanceTab()) {
            Notification?.error?.('غير مصرح');
            return;
        }
        const record = this._findAttendanceRecordById(recordId);
        if (!record) {
            Notification?.error?.('السجل غير موجود');
            return;
        }
        const type = String(punchType || '').trim();
        const isCheckIn = type === 'checkIn';
        const isCheckOut = type === 'checkOut';
        if (isCheckIn && record.checkIn) {
            Notification?.warning?.('وقت الدخول مسجّل مسبقاً');
            return;
        }
        if (isCheckOut && record.checkOut) {
            Notification?.warning?.('وقت الخروج مسجّل مسبقاً');
            return;
        }
        if (!isCheckIn && !isCheckOut) return;

        const dayKey = this._attendanceDayKey(record.date);
        let adjustedDefault = isCheckIn ? `${dayKey}T07:30` : `${dayKey}T15:30`;

        if (isCheckOut && record.checkIn) {
            try {
                const inDate = new Date(record.checkIn);
                const hh = inDate.getHours();
                const mm = inDate.getMinutes();
                const timeStr = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
                const shifts = this.getClinicShiftRules();
                const s3 = shifts.find(s => s.isOvernight || s.id === 'shift_3') || { startTime: '22:30', endTime: '07:30' };
                const s2 = shifts.find(s => s.id === 'shift_2') || { startTime: '15:30', endTime: '22:30' };
                const s1 = shifts.find(s => s.id === 'shift_1') || { startTime: '07:30', endTime: '15:30' };

                if (timeStr >= s3.startTime || timeStr < s1.startTime) {
                    const nextDay = new Date(inDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    const nextDayKey = this._attendanceDayKey(nextDay);
                    adjustedDefault = `${nextDayKey}T${s3.endTime}`;
                } else if (timeStr >= s2.startTime) {
                    adjustedDefault = `${dayKey}T${s2.endTime}`;
                } else {
                    adjustedDefault = `${dayKey}T${s1.endTime}`;
                }
            } catch (_e) {
                adjustedDefault = `${dayKey}T15:30`;
            }
        }
        const title = isCheckIn ? 'إضافة بصمة دخول مفقودة' : 'إضافة بصمة خروج مفقودة';
        const icon = isCheckIn ? 'fa-sign-in-alt' : 'fa-sign-out-alt';

        const html = `
            <div class="modal-overlay active" id="clinic-attendance-punch-modal" style="background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div class="modal-content" style="max-width: 500px; width: 92%; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: none; background: #ffffff;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #0b2a55 0%, #1e40af 100%); color: #ffffff; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255, 255, 255, 0.18); display: flex; align-items: center; justify-content: center; font-size: 1.1rem;">
                                <i class="fas ${icon}"></i>
                            </div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: #ffffff;">${title}</h3>
                                <p style="margin: 2px 0 0; font-size: 0.72rem; opacity: 0.85;">تسجيل وقت ${isCheckIn ? 'الدخول' : 'الخروج'} يدوياً للمسئول</p>
                            </div>
                        </div>
                        <button type="button" style="background: none; border: none; color: #ffffff; opacity: 0.75; font-size: 1.25rem; cursor: pointer; padding: 4px; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.75'" onclick="document.getElementById('clinic-attendance-punch-modal')?.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Body -->
                    <div style="padding: 1.5rem; background: #f8fafc; display: flex; flex-direction: column; gap: 1.25rem;">
                        <!-- Staff Info Card -->
                        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.9rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 36px; height: 36px; border-radius: 50%; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
                                    <i class="fas fa-user-md"></i>
                                </div>
                                <div>
                                    <div style="font-size: 0.88rem; font-weight: 700; color: #1e293b;">${Utils.escapeHTML(record.userName || record.userEmail || '—')}</div>
                                    <div style="font-size: 0.74rem; color: #64748b;">${Utils.escapeHTML(this.getStaffRoleLabel(record.staffRole))}</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.4rem; background: #f1f5f9; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.76rem; font-weight: 600; color: #475569;">
                                <i class="far fa-calendar-alt text-blue-500"></i>
                                <span>${Utils.escapeHTML(dayKey || '—')}</span>
                            </div>
                        </div>

                        <!-- DateTime Input Field -->
                        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                            <label style="font-size: 0.85rem; font-weight: 700; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                                <i class="fas ${isCheckIn ? 'fa-sign-in-alt text-emerald-600' : 'fa-sign-out-alt text-amber-600'}"></i>
                                <span>${isCheckIn ? 'وقت الدخول المطلوب' : 'وقت الخروج المطلوب'}</span>
                                <span style="color: #ef4444;">*</span>
                            </label>
                            <input type="datetime-local" id="clinic-attendance-punch-time" class="form-input" style="width: 100%; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 0.7rem 0.9rem; font-size: 0.95rem; font-weight: 600; color: #0f172a; background: #ffffff;" value="${Utils.escapeAttr(adjustedDefault)}" required>
                            <span style="font-size: 0.72rem; color: #64748b;"><i class="fas fa-info-circle ml-1"></i> تم تحديد الوقت المقترح تلقائياً بناءً على مواعيد الوردية، ويمكنك تعديله.</span>
                        </div>

                        <!-- Notes Field -->
                        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                            <label style="font-size: 0.85rem; font-weight: 700; color: #334155; display: flex; align-items: center; gap: 0.4rem;">
                                <i class="far fa-comment-dots text-gray-500"></i>
                                <span>ملاحظة أو سبب الإضافة</span>
                                <span style="font-size: 0.72rem; font-weight: 400; color: #94a3b8;">(اختياري)</span>
                            </label>
                            <textarea id="clinic-attendance-punch-notes" class="form-textarea" rows="2" style="width: 100%; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 0.6rem 0.9rem; font-size: 0.85rem; resize: none; background: #ffffff;" placeholder="أدخل سبب تسجيل البصمة يدوياً..."></textarea>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="padding: 1rem 1.5rem; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem;">
                        <button type="button" style="padding: 0.6rem 1.25rem; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #475569; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#ffffff'" onclick="document.getElementById('clinic-attendance-punch-modal')?.remove()">
                            إلغاء
                        </button>
                        <button type="button" id="clinic-attendance-punch-save" style="padding: 0.6rem 1.5rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; font-size: 0.85rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3); transition: all 0.2s;">
                            <i class="fas fa-check"></i>
                            <span>حفظ البصمة</span>
                        </button>
                    </div>
                </div>
            </div>`;
        document.getElementById('clinic-attendance-punch-modal')?.remove();
        document.body.insertAdjacentHTML('beforeend', html);
        document.getElementById('clinic-attendance-punch-save')?.addEventListener('click', () => {
            const timeValRaw = document.getElementById('clinic-attendance-punch-time')?.value || '';
            const notes = document.getElementById('clinic-attendance-punch-notes')?.value?.trim() || '';
            if (!timeValRaw) {
                Notification?.warning?.('يرجى تحديد الوقت');
                return;
            }
            const timeVal = this._formatLocalDatetimeToIso(timeValRaw);
            
            // 1. إغلاق النافذة فوراً في 0 ثانية
            document.getElementById('clinic-attendance-punch-modal')?.remove();

            // 2. تحديث السجل محلياً وحفظه فورياً
            if (record) {
                if (isCheckIn) record.checkIn = timeVal;
                if (isCheckOut) record.checkOut = timeVal;
                if (record.checkIn && record.checkOut) {
                    try {
                        const inMs = new Date(record.checkIn).getTime();
                        const outMs = new Date(record.checkOut).getTime();
                        if (!isNaN(inMs) && !isNaN(outMs) && outMs > inMs) {
                            record.workDuration = (Math.round(((outMs - inMs) / (1000 * 60 * 60)) * 100) / 100) + ' ساعة';
                        }
                    } catch (_) {}
                    record.status = 'present';
                }
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) {
                    window.DataManager.save();
                }
            }

            // 3. إعادة رسم الجدول فورياً
            this.renderAttendanceTab({ force: true });
            Notification?.success?.('تم تسجيل البصمة بنجاح وجاري المزامنة مع السيرفر...');

            // 4. مزامنة مع السيرفر في الخلفية بمهلة كافية
            GoogleIntegration.sendRequest({
                action: 'updateClinicStaffAttendance',
                data: {
                    recordId: record.id,
                    staffId: record.staffId || '',
                    userId: record.userId || '',
                    userEmail: record.userEmail || '',
                    date: record.date || dayKey || '',
                    punchType: type,
                    [isCheckIn ? 'checkIn' : 'checkOut']: timeVal,
                    notes,
                    __timeoutMs: 90000
                }
            }).then((resp) => {
                if (resp && resp.success) {
                    Notification?.success?.('تم تأكيد المزامنة مع السيرفر بنجاح');
                    this.loadClinicAttendanceData(true).then(() => {
                        this.renderAttendanceTab({ force: true });
                    }).catch(() => {});
                } else if (resp && resp.message) {
                    Notification?.warning?.(resp.message);
                }
            }).catch((err) => {
                if (AppState?.debugMode) console.warn('Clinic attendance background sync notice:', err);
            });
        });
    },

    _formatLocalDatetimeToIso(localStr) {
        if (!localStr) return '';
        const s = String(localStr).trim();
        if (!s) return '';
        if (/[Z+-]\d{2}:?\d{2}$/i.test(s) || /Z$/i.test(s)) return s;
        const m = s.match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{1,2}):(\d{2})/);
        if (m) {
            const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]), 0, 0);
            if (!isNaN(d.getTime())) return d.toISOString();
        }
        const dFallback = new Date(s);
        if (!isNaN(dFallback.getTime())) return dFallback.toISOString();
        return s;
    },

    getClinicShiftRules() {
        if (Array.isArray(AppState.appData?.clinicShiftRules) && AppState.appData.clinicShiftRules.length > 0) {
            return AppState.appData.clinicShiftRules;
        }
        return [
            { id: 'shift_1', name: 'الوردية الأولى', startTime: '07:30', endTime: '15:30', isOvernight: false },
            { id: 'shift_2', name: 'الوردية الثانية', startTime: '15:30', endTime: '22:30', isOvernight: false },
            { id: 'shift_3', name: 'الوردية الثالثة', startTime: '22:30', endTime: '07:30', isOvernight: true }
        ];
    },

    showClinicShiftSettingsModal() {
        if (!this.isCurrentUserAdmin()) {
            Notification?.error?.('هذا الإجراء متاح لمدير النظام فقط');
            return;
        }
        const shifts = this.getClinicShiftRules();
        const html = `
            <div class="modal-overlay active" id="clinic-shift-settings-modal">
                <div class="modal-content" style="max-width:560px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-clock ml-2"></i>إعدادات مواعيد الورديات (العيادة)</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-shift-settings-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <p class="text-xs text-gray-500 mb-2">تعديل مواعيد بداية ونهاية الورديات الرسمية. الوردية الثالثة ليلية (تتجاوز منتصف الليل).</p>
                        ${shifts.map((s, idx) => `
                            <div class="border rounded-lg p-3 bg-gray-50 space-y-2" data-shift-idx="${idx}">
                                <div class="font-bold text-sm text-blue-700 flex items-center justify-between">
                                    <span>${Utils.escapeHTML(s.name)}</span>
                                    ${s.isOvernight ? '<span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold">وردية ليلية</span>' : ''}
                                </div>
                                <div class="grid grid-cols-2 gap-3">
                                    <div>
                                        <label class="form-label text-xs">وقت البداية</label>
                                        <input type="time" class="form-input shift-start-time" value="${Utils.escapeAttr(s.startTime)}" required>
                                    </div>
                                    <div>
                                        <label class="form-label text-xs">وقت النهاية</label>
                                        <input type="time" class="form-input shift-end-time" value="${Utils.escapeAttr(s.endTime)}" required>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-shift-settings-modal')?.remove()">إلغاء</button>
                        <button type="button" class="btn-primary" id="clinic-shift-settings-save"><i class="fas fa-save ml-2"></i>حفظ القواعد</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('clinic-shift-settings-modal')?.remove();
        document.body.insertAdjacentHTML('beforeend', html);
        document.getElementById('clinic-shift-settings-save')?.addEventListener('click', () => {
            const modal = document.getElementById('clinic-shift-settings-modal');
            const items = modal.querySelectorAll('[data-shift-idx]');
            const updated = [];
            items.forEach((item, idx) => {
                const s = shifts[idx];
                const startTime = item.querySelector('.shift-start-time')?.value || s.startTime;
                const endTime = item.querySelector('.shift-end-time')?.value || s.endTime;
                updated.push({ ...s, startTime, endTime });
            });
            AppState.appData.clinicShiftRules = updated;
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) window.DataManager.save();
            if (typeof GoogleIntegration !== 'undefined' && GoogleIntegration.autoSave) {
                GoogleIntegration.autoSave('ClinicShiftRules', updated).catch(() => {});
            }
            Notification?.success?.('تم حفظ قواعد الورديات بنجاح');
            modal.remove();
            this.renderAttendanceTab({ force: true });
        });
    },

    _applyShiftPresetToMissingPunchForm(shiftId) {
        const modal = document.getElementById('clinic-attendance-add-modal');
        if (!modal) return;
        const dateEl = modal.querySelector('#clinic-attendance-add-date');
        const inEl = modal.querySelector('#clinic-attendance-add-checkin');
        const outEl = modal.querySelector('#clinic-attendance-add-checkout');
        const dayKey = this._attendanceDayKey(dateEl?.value || this._getTodayLocalKey());
        if (!shiftId) return;
        const shift = (this.getClinicShiftRules() || []).find(s => String(s.id) === String(shiftId));
        if (!shift) return;
        if (inEl) inEl.value = `${dayKey}T${shift.startTime || '07:30'}`;
        let outDay = dayKey;
        if (shift.isOvernight) {
            try {
                const d = new Date(`${dayKey}T12:00:00`);
                d.setDate(d.getDate() + 1);
                outDay = this._attendanceDayKey(d);
            } catch (_e) { outDay = dayKey; }
        }
        if (outEl) outEl.value = `${outDay}T${shift.endTime || '15:30'}`;
    },

    showAddMissingAttendanceModal() {
        if (!this.isCurrentUserAdmin()) {
            Notification?.error?.('هذا الإجراء متاح لمدير النظام فقط');
            return;
        }
        const staffOptions = (this.getClinicStaffList() || [])
            .filter(s => String(s.isActive || 'true').toLowerCase() !== 'false')
            .map(s => `<option value="${Utils.escapeAttr(s.id)}">${Utils.escapeHTML(s.userName || s.userEmail || s.id)}</option>`)
            .join('');
        const shifts = this.getClinicShiftRules();
        const shiftOptions = shifts.map(s =>
            `<option value="${Utils.escapeAttr(s.id)}">${Utils.escapeHTML(s.name)} (${Utils.escapeHTML(s.startTime)}–${Utils.escapeHTML(s.endTime)}${s.isOvernight ? ' · ليلي' : ''})</option>`
        ).join('');
        const today = this._getTodayLocalKey();
        const defaultShift = shifts.find(s => s.id === 'shift_1') || shifts[0];
        const defaultIn = `${today}T${defaultShift?.startTime || '07:30'}`;
        const defaultOut = `${today}T${defaultShift?.endTime || '15:30'}`;
        const html = `
            <div class="modal-overlay active" id="clinic-attendance-add-modal">
                <div class="modal-content" style="max-width:560px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
                    <div class="modal-header" style="background: linear-gradient(125deg, #0b2a55, #1e40af 70%, #2563eb); color: white; padding: 1.5rem; border-bottom: none;">
                        <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600; display: flex; align-items: center;"><i class="fas fa-fingerprint ml-3" style="font-size: 1.5rem; opacity: 0.9;"></i>إضافة سجل حضور / بصمة مفقودة</h3>
                        <button type="button" class="modal-close" style="color: white; opacity: 0.8; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'" onclick="document.getElementById('clinic-attendance-add-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-5" style="padding: 1.5rem; background-color: #f8fafc;">
                        <div class="form-group">
                            <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="fas fa-user-circle ml-2 text-teal-500"></i> المسئول <span class="text-red-500 mr-1">*</span></label>
                            <select id="clinic-attendance-add-staff" class="form-input" style="border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);"><option value="">— اختر المسئول —</option>${staffOptions}</select>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                            <div class="form-group" style="margin:0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="far fa-calendar-alt ml-2 text-teal-500"></i> التاريخ <span class="text-red-500 mr-1">*</span></label>
                                <input type="date" id="clinic-attendance-add-date" class="form-input" style="border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem;" value="${Utils.escapeAttr(today)}" required>
                            </div>
                            <div class="form-group" style="margin:0;">
                                <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="fas fa-clock ml-2 text-amber-500"></i> الوردية</label>
                                <select id="clinic-attendance-add-shift" class="form-input" style="border: 1px solid #f59e0b; border-radius: 0.5rem; padding: 0.75rem; background:#fffbeb;">
                                    <option value="">— يدوي بدون وردية —</option>
                                    ${shiftOptions}
                                </select>
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #ffffff; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                            <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.85rem; font-weight: 600; color: #475569;"><i class="fas fa-sign-in-alt ml-1 text-green-500"></i> وقت الدخول</label>
                                <input type="datetime-local" id="clinic-attendance-add-checkin" class="form-input" style="padding: 0.5rem; font-size: 0.9rem;" value="${Utils.escapeAttr(defaultIn)}">
                            </div>
                            <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.85rem; font-weight: 600; color: #475569;"><i class="fas fa-sign-out-alt ml-1 text-orange-500"></i> وقت الخروج</label>
                                <input type="datetime-local" id="clinic-attendance-add-checkout" class="form-input" style="padding: 0.5rem; font-size: 0.9rem;" value="${Utils.escapeAttr(defaultOut)}">
                            </div>
                            <div style="grid-column: span 2; font-size: 0.75rem; color: #64748b; text-align: center; margin-top: -0.25rem;"><i class="fas fa-info-circle ml-1"></i> اختر وردية لتعبئة الأوقات تلقائياً، أو اترك حقلاً فارغاً لبصمة دخول/خروج فقط. عدّل مواعيد الورديات من زر «الورديات».</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" style="font-weight: 600; color: #334155; display: flex; align-items: center;"><i class="far fa-comment-alt ml-2 text-gray-400"></i> ملاحظة</label>
                            <textarea id="clinic-attendance-add-notes" class="form-textarea" rows="2" style="border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.75rem; resize: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);" placeholder="سبب الإضافة اليدوية..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer" style="padding: 1.25rem 1.5rem; background-color: #ffffff; border-top: 1px solid #e2e8f0; display: flex; gap: 1rem; justify-content: flex-end;">
                        <button type="button" class="btn-secondary" style="padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 500;" onclick="document.getElementById('clinic-attendance-add-modal')?.remove()">إلغاء</button>
                        <button type="button" class="btn-primary" id="clinic-attendance-add-save" style="padding: 0.6rem 1.5rem; border-radius: 0.5rem; font-weight: 600; background: #0f766e; border: none; box-shadow: 0 4px 6px -1px rgba(15, 118, 110, 0.3); transition: all 0.2s;"><i class="fas fa-check ml-2"></i>حفظ السجل</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('clinic-attendance-add-modal')?.remove();
        document.body.insertAdjacentHTML('beforeend', html);
        const shiftEl = document.getElementById('clinic-attendance-add-shift');
        const dateEl = document.getElementById('clinic-attendance-add-date');
        if (defaultShift?.id && shiftEl) {
            shiftEl.value = defaultShift.id;
            this._applyShiftPresetToMissingPunchForm(defaultShift.id);
        }
        shiftEl?.addEventListener('change', () => this._applyShiftPresetToMissingPunchForm(shiftEl.value));
        dateEl?.addEventListener('change', () => {
            if (shiftEl?.value) this._applyShiftPresetToMissingPunchForm(shiftEl.value);
        });
        document.getElementById('clinic-attendance-add-save')?.addEventListener('click', async (e) => {
            const saveBtn = e.currentTarget || document.getElementById('clinic-attendance-add-save');
            const staffId = document.getElementById('clinic-attendance-add-staff')?.value || '';
            const date = document.getElementById('clinic-attendance-add-date')?.value || '';
            const checkInRaw = document.getElementById('clinic-attendance-add-checkin')?.value || '';
            const checkOutRaw = document.getElementById('clinic-attendance-add-checkout')?.value || '';
            const notes = document.getElementById('clinic-attendance-add-notes')?.value?.trim() || '';
            if (!staffId || !date) {
                Notification?.warning?.('يرجى اختيار المسئول والتاريخ');
                return;
            }
            if (!checkInRaw && !checkOutRaw) {
                Notification?.warning?.('أدخل وقت دخول أو خروج على الأقل');
                return;
            }

            if (saveBtn) {
                saveBtn.disabled = true;
                saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الحفظ...';
            }

            try {
                const data = { staffId, date, notes };
                if (checkInRaw) data.checkIn = this._formatLocalDatetimeToIso(checkInRaw);
                if (checkOutRaw) data.checkOut = this._formatLocalDatetimeToIso(checkOutRaw);
                const resp = await GoogleIntegration.sendRequest({
                    action: 'updateClinicStaffAttendance',
                    data
                });
                if (resp?.success) {
                    Notification?.success?.(resp.message || 'تم حفظ السجل بنجاح');
                    document.getElementById('clinic-attendance-add-modal')?.remove();
                    this.renderAttendanceTab({ force: true });
                    this.loadClinicAttendanceData(true).then(() => {
                        this.renderAttendanceTab({ force: true });
                    }).catch(() => {});
                } else {
                    Notification?.error?.(resp?.message || 'فشل الحفظ');
                    if (saveBtn) {
                        saveBtn.disabled = false;
                        saveBtn.innerHTML = '<i class="fas fa-check ml-2"></i>حفظ السجل';
                    }
                }
            } catch (err) {
                Notification?.error?.(err?.message || 'فشل الحفظ');
                if (saveBtn) {
                    saveBtn.disabled = false;
                    saveBtn.innerHTML = '<i class="fas fa-check ml-2"></i>حفظ السجل';
                }
            }
        });
    },
    _attendanceDayKey(dateVal) {
        if (!dateVal) return '';
        try {
            const raw = String(dateVal).trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
            const d = new Date(dateVal);
            if (Number.isNaN(d.getTime())) return raw.slice(0, 10);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        } catch (_e) {
            return String(dateVal).slice(0, 10);
        }
    },

    _getTodayLocalKey() {
        return this._attendanceDayKey(new Date());
    },

    _countActiveAttendanceFilters(filters) {
        if (!filters) return 0;
        let n = 0;
        if (String(filters.search || '').trim()) n++;
        if (filters.staffRole && filters.staffRole !== 'all') n++;
        if (filters.status && filters.status !== 'all') n++;
        if (filters.staffId && filters.staffId !== 'all') n++;
        if (filters.month) n++;
        if (filters.dateFrom) n++;
        if (filters.dateTo) n++;
        return n;
    },

    _normalizeAttendanceDateRange(dateFrom, dateTo) {
        let from = String(dateFrom || '').trim();
        let to = String(dateTo || '').trim();
        if (from && to && from > to) {
            const tmp = from;
            from = to;
            to = tmp;
        }
        return { dateFrom: from, dateTo: to };
    },

    _getAttendanceMonthRange(monthVal) {
        const raw = String(monthVal || '').trim();
        if (!/^\d{4}-\d{2}$/.test(raw)) return { dateFrom: '', dateTo: '' };
        const parts = raw.split('-');
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        if (!y || !m || m < 1 || m > 12) return { dateFrom: '', dateTo: '' };
        const mm = String(m).padStart(2, '0');
        const lastDay = new Date(y, m, 0).getDate();
        return {
            dateFrom: `${y}-${mm}-01`,
            dateTo: `${y}-${mm}-${String(lastDay).padStart(2, '0')}`
        };
    },

    _getAttendanceStaffOptions() {
        const staffMap = new Map();
        (this.getClinicStaffList() || []).forEach(s => {
            const key = String(s.userId || s.id || s.userEmail || '').trim();
            if (!key) return;
            staffMap.set(key, {
                id: key,
                staffId: s.id || '',
                name: s.userName || s.userEmail || key,
                role: s.staffRole || ''
            });
        });
        (this.getClinicStaffAttendanceList() || []).forEach(r => {
            const key = String(r.userId || r.staffId || r.userEmail || '').trim();
            if (!key || staffMap.has(key)) return;
            staffMap.set(key, {
                id: key,
                staffId: r.staffId || '',
                name: r.userName || r.userEmail || key,
                role: r.staffRole || ''
            });
        });
        return Array.from(staffMap.values()).sort((a, b) => String(a.name).localeCompare(String(b.name), 'ar'));
    },

    _resolveAttendanceFilterDates(filters) {
        const f = filters || {};
        if (f.month) {
            const mr = this._getAttendanceMonthRange(f.month);
            if (mr.dateFrom && mr.dateTo) return mr;
        }
        return this._normalizeAttendanceDateRange(f.dateFrom, f.dateTo);
    },

    _filterAttendanceRows(sourceRows, filters) {
        const f = filters || {};
        let rows = (sourceRows || []).slice();
        if (f.staffId && f.staffId !== 'all') {
            const sid = String(f.staffId).trim();
            const matchKeys = new Set([sid, sid.toLowerCase()]);
            const staffRec = (this.getClinicStaffList() || []).find(s =>
                String(s.userId || '').trim() === sid ||
                String(s.id || '').trim() === sid ||
                String(s.userEmail || '').trim().toLowerCase() === sid.toLowerCase()
            );
            if (staffRec) {
                ['id', 'userId', 'userEmail'].forEach(k => {
                    const v = String(staffRec[k] || '').trim();
                    if (v) { matchKeys.add(v); matchKeys.add(v.toLowerCase()); }
                });
            }
            rows = rows.filter(r => {
                const vals = [r.staffId, r.userId, r.userEmail].map(v => String(v || '').trim()).filter(Boolean);
                return vals.some(v => matchKeys.has(v) || matchKeys.has(v.toLowerCase()));
            });
        }
        if (f.search) {
            const q = String(f.search).trim().toLowerCase();
            rows = rows.filter(r => String(r.userName || '').toLowerCase().includes(q) || String(r.userEmail || '').toLowerCase().includes(q));
        }
        if (f.staffRole && f.staffRole !== 'all') {
            rows = rows.filter(r => String(r.staffRole) === String(f.staffRole));
        }
        if (f.status && f.status !== 'all') {
            rows = rows.filter(r => String(r.status) === String(f.status));
        }
        const range = this._resolveAttendanceFilterDates(f);
        if (range.dateFrom) {
            rows = rows.filter(r => this._attendanceDayKey(r.date) >= range.dateFrom);
        }
        if (range.dateTo) {
            rows = rows.filter(r => this._attendanceDayKey(r.date) <= range.dateTo);
        }
        rows.sort((a, b) => {
            const da = this._attendanceDayKey(b.date) + String(b.checkIn || '');
            const db = this._attendanceDayKey(a.date) + String(a.checkIn || '');
            return da.localeCompare(db);
        });
        return rows;
    },

    _computeAttendanceReportStats(rows) {
        const list = rows || [];
        let totalHours = 0;
        let present = 0;
        let partial = 0;
        const staffSet = new Set();
        list.forEach(r => {
            const h = parseFloat(r.workDuration);
            if (!Number.isNaN(h)) totalHours += h;
            if (String(r.status) === 'present') present++;
            else if (String(r.status) === 'partial') partial++;
            const sk = String(r.userId || r.staffId || r.userEmail || r.userName || '');
            if (sk) staffSet.add(sk);
        });
        return {
            total: list.length,
            present,
            partial,
            staffCount: staffSet.size,
            totalHours: Math.round(totalHours * 100) / 100
        };
    },

    _buildAttendanceReportMeta(filters) {
        const f = filters || {};
        const parts = [];
        if (f.staffId && f.staffId !== 'all') {
            const staff = this._getAttendanceStaffOptions().find(s => String(s.id) === String(f.staffId) || String(s.staffId) === String(f.staffId));
            parts.push('المسئول: ' + (staff?.name || f.staffId));
        }
        if (f.month) {
            const [y, m] = String(f.month).split('-');
            const monthNames = ['', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
            parts.push('الشهر: ' + (monthNames[parseInt(m, 10)] || m) + ' ' + y);
        }
        const range = this._resolveAttendanceFilterDates(f);
        if (range.dateFrom || range.dateTo) {
            parts.push('المدة: ' + (range.dateFrom || '…') + ' → ' + (range.dateTo || '…'));
        }
        if (f.staffRole && f.staffRole !== 'all') parts.push('الدور: ' + this.getStaffRoleLabel(f.staffRole));
        if (f.status && f.status !== 'all') parts.push('الحالة: ' + this.getAttendanceStatusLabel(f.status));
        if (f.search) parts.push('بحث: ' + String(f.search).trim());
        return parts.length ? parts.join(' | ') : 'جميع السجلات';
    },

    _attendanceReportFileSuffix(filters) {
        const f = filters || {};
        if (f.month) return String(f.month);
        if (f.staffId && f.staffId !== 'all') {
            const staff = this._getAttendanceStaffOptions().find(s => String(s.id) === String(f.staffId));
            const nm = (staff?.name || 'staff').replace(/[^\w\u0600-\u06FF-]+/g, '_').slice(0, 24);
            return nm;
        }
        const range = this._resolveAttendanceFilterDates(f);
        if (range.dateFrom && range.dateTo) return `${range.dateFrom}_${range.dateTo}`;
        if (range.dateFrom) return `from_${range.dateFrom}`;
        return new Date().toISOString().slice(0, 10);
    },

    getFilteredClinicAttendance() {
        return this._filterAttendanceRows(this.getClinicStaffAttendanceList(), this.state.filters.attendance || {});
    },

    async loadClinicAttendanceData(force) {
        if (typeof GoogleIntegration === 'undefined' || !GoogleIntegration.sendRequest) return false;
        try {
            if (this.canViewAllAttendanceData()) {
                await this._ensureClinicStaffLoadedForAttendance();
            }
            const [attResp, staffResp, timeOffResp] = await Promise.all([
                GoogleIntegration.sendRequest({ action: 'getClinicStaffAttendance', data: force ? { skipCache: true } : {} }),
                GoogleIntegration.sendRequest({ action: 'getAllClinicStaff', data: {} }),
                GoogleIntegration.sendRequest({ action: 'getClinicStaffTimeOffRequests', data: force ? { skipCache: true } : {} })
            ]);
            if (attResp?.success && Array.isArray(attResp.data)) AppState.appData.clinicStaffAttendance = attResp.data;
            if (staffResp?.success && Array.isArray(staffResp.data)) AppState.appData.clinicStaff = staffResp.data;
            if (timeOffResp?.success && Array.isArray(timeOffResp.data)) AppState.appData.clinicStaffTimeOffRequests = timeOffResp.data;
            this.ensureData();
            if (typeof window.DataManager !== 'undefined' && window.DataManager.save) window.DataManager.save();
            return !!(attResp?.success || staffResp?.success || timeOffResp?.success);
        } catch (_e) {
            return false;
        }
    },

    exportAttendanceToExcel(overrideFilters) {
        const filters = overrideFilters || this.state.filters.attendance || {};
        const rows = this._filterAttendanceRows(this.getClinicStaffAttendanceList(), filters);
        if (!rows.length) {
            Notification?.info?.('لا توجد بيانات لتصديرها');
            return;
        }
        if (typeof XLSX === 'undefined') {
            Notification?.error?.('مكتبة Excel غير متوفرة');
            return;
        }
        const excelData = rows.map(r => ({
            'الاسم': r.userName || '',
            'البريد': r.userEmail || '',
            'الدور': this.getStaffRoleLabel(r.staffRole),
            'التاريخ': r.date || '',
            'وقت الدخول': r.checkIn ? (Utils.formatDateTime ? Utils.formatDateTime(r.checkIn) : r.checkIn) : '',
            'وقت الخروج': r.checkOut ? (Utils.formatDateTime ? Utils.formatDateTime(r.checkOut) : r.checkOut) : '',
            'مدة العمل (ساعة)': r.workDuration || '',
            'الحالة': this.getAttendanceStatusLabel(r.status),
            'معرف الجلسة': r.sessionId || ''
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
        XLSX.writeFile(workbook, `Clinic_Attendance_${this._attendanceReportFileSuffix(filters)}.xlsx`);
    },

    _buildAttendanceReportContent(filters, rows) {
        const stats = this._computeAttendanceReportStats(rows);
        const meta = this._buildAttendanceReportMeta(filters);
        const isSelfView = !this.canViewAllAttendanceData();
        const generatedAt = this.formatDate(new Date(), true);

        const kpiItems = [
            { label: 'إجمالي السجلات', value: stats.total, color: '#2563eb', bg: '#eff6ff' },
            { label: 'حاضر', value: stats.present, color: '#059669', bg: '#ecfdf5' },
            { label: 'خروج جزئي', value: stats.partial, color: '#d97706', bg: '#fffbeb' },
            { label: 'المسئولون', value: stats.staffCount, color: '#4f46e5', bg: '#eef2ff' },
            { label: 'إجمالي الساعات', value: stats.totalHours, color: '#0d9488', bg: '#f0fdfa' }
        ];

        const kpiHtml = kpiItems.map(k => `
            <div style="background:${k.bg};border:1px solid rgba(0,0,0,0.06);border-radius:10px;padding:12px 14px;text-align:center;">
                <div style="font-size:10px;color:#64748b;font-weight:700;margin-bottom:4px;">${k.label}</div>
                <div style="font-size:20px;font-weight:800;color:${k.color};line-height:1.1;">${k.value}</div>
            </div>
        `).join('');

        const tableRows = rows.map((r, i) => {
            const bg = i % 2 === 0 ? '#ffffff' : '#f8fafc';
            const statusLabel = this.getAttendanceStatusLabel(r.status);
            if (isSelfView) {
                return `<tr style="background:${bg};">
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(r.date || '—')}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(r.checkIn)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(r.checkOut)}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(r.workDuration || '—'))}</td>
                    <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(statusLabel)}</td>
                </tr>`;
            }
            return `<tr style="background:${bg};">
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(r.userName || '—')}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;font-size:10px;">${Utils.escapeHTML(r.userEmail || '—')}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(this.getStaffRoleLabel(r.staffRole))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(r.date || '—')}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(r.checkIn)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${this._formatAttendanceReportCellDate_(r.checkOut)}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;text-align:center;">${Utils.escapeHTML(String(r.workDuration || '—'))}</td>
                <td style="padding:8px 10px;border:1px solid #e2e8f0;">${Utils.escapeHTML(statusLabel)}</td>
            </tr>`;
        }).join('');

        const thead = isSelfView
            ? `<tr style="background:linear-gradient(90deg,#1e40af,#2563eb);color:#fff;">
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">التاريخ</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">وقت الدخول</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">وقت الخروج</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:center;">المدة (س)</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">الحالة</th>
            </tr>`
            : `<tr style="background:linear-gradient(90deg,#1e40af,#2563eb);color:#fff;">
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">الاسم</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">البريد</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">الدور</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">التاريخ</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">وقت الدخول</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">وقت الخروج</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:center;">المدة (س)</th>
                <th style="padding:10px;border:1px solid #0f2a55;text-align:right;">الحالة</th>
            </tr>`;

        return `
            <div style="margin-bottom:18px;">
                <div style="background:linear-gradient(125deg,#0b2a55 0%,#1e40af 70%,#2563eb 100%);color:#fff;padding:16px 20px;border-radius:12px;margin-bottom:14px;box-shadow:0 6px 18px rgba(11,42,85,0.28);">
                    <div style="font-size:17px;font-weight:800;margin-bottom:6px;">تقرير حضور مسئولي العيادة</div>
                    <div style="font-size:11px;opacity:0.92;line-height:1.6;">
                        <span><strong>النطاق:</strong> ${Utils.escapeHTML(meta)}</span>
                        <span style="margin-right:12px;"> | </span>
                        <span><strong>تاريخ الإصدار:</strong> ${Utils.escapeHTML(generatedAt)}</span>
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-bottom:16px;">
                    ${kpiHtml}
                </div>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:11px;direction:rtl;">
                <thead>${thead}</thead>
                <tbody>${tableRows}</tbody>
            </table>
        `;
    },

    ATTENDANCE_A4_WIDTH_PX: 794,

    _formatAttendanceReportCellDate_(value) {
        if (!value) return '—';
        try {
            const formatted = Utils.formatDateTime ? Utils.formatDateTime(value) : String(value);
            return Utils.escapeHTML(formatted);
        } catch (_e) {
            return Utils.escapeHTML(String(value));
        }
    },

    _prepareAttendancePdfHtml_(htmlContent) {
        const arabicFix = `
<style id="clinic-attendance-arabic-pdf-fix">
    html, body {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', sans-serif !important;
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    body *, .att-report-doc, .att-report-doc * {
        font-family: 'Cairo', 'Tahoma', 'Segoe UI', sans-serif !important;
        letter-spacing: 0 !important;
        word-spacing: normal !important;
    }
    th, td, .att-report-brand-name, .att-report-footer {
        direction: rtl !important;
        unicode-bidi: embed;
        letter-spacing: 0 !important;
        word-break: normal !important;
    }
    .att-report-brand-name,
    .report-header .company-brand .company-name,
    .export-header .company-name,
    .ptw-paper-header-company,
    .card-header .company-name {
        white-space: nowrap !important;
        word-break: keep-all !important;
        overflow-wrap: normal !important;
    }
    table, thead, tbody, tr { direction: rtl !important; }
</style>`;
        const cleaned = String(htmlContent || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        if (!cleaned) return arabicFix;
        if (cleaned.includes('</head>')) {
            return cleaned.replace('</head>', `${arabicFix}</head>`);
        }
        return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8">${arabicFix}</head><body>${cleaned}</body></html>`;
    },

    async _waitAttendancePdfFontsReady_(doc) {
        if (!doc || !doc.fonts || typeof doc.fonts.load !== 'function') return;
        try {
            await Promise.all([
                doc.fonts.load('400 12px Cairo'),
                doc.fonts.load('600 14px Cairo'),
                doc.fonts.load('700 18px Cairo'),
                doc.fonts.load('800 16px Cairo')
            ]);
            await doc.fonts.ready;
        } catch (_e) { /* ignore */ }
    },

    async _ensureHtml2CanvasInAttendanceFrame_(iDoc, iWin) {
        if (!iDoc || !iWin) return false;
        if (typeof iWin.html2canvas === 'function') return true;
        if (typeof html2canvas === 'function') {
            try { iWin.html2canvas = html2canvas; } catch (_e) { /* ignore */ }
            if (typeof iWin.html2canvas === 'function') return true;
        }
        return new Promise((resolve) => {
            const s = iDoc.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
            s.async = true;
            s.onload = () => resolve(typeof iWin.html2canvas === 'function');
            s.onerror = () => resolve(false);
            (iDoc.head || iDoc.documentElement).appendChild(s);
        });
    },

    _addAttendancePdfPageImage_(pdf, canvas, marginMm) {
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();
        const contentWmm = pdfW - marginMm * 2;
        const contentHmm = pdfH - marginMm * 2;
        const ratio = Math.min(contentWmm / canvas.width, contentHmm / canvas.height);
        const drawWmm = canvas.width * ratio;
        const drawHmm = canvas.height * ratio;
        const offsetX = marginMm + (contentWmm - drawWmm) / 2;
        const offsetY = marginMm;
        Utils.PdfExport.addCanvasToPdf(pdf, canvas, offsetX, offsetY, drawWmm, drawHmm);
    },

    _buildAttendanceReportFullHtml(filters, rows) {
        const content = this._buildAttendanceReportContent(filters, rows);
        const companyName = Utils.escapeHTML(AppState?.companySettings?.name || 'نظام HSE');
        const logo = typeof AppState?.companyLogo === 'string' ? AppState.companyLogo : '';
        const formCode = Utils.escapeHTML(`CLINIC-ATT-${this._attendanceReportFileSuffix(filters)}`);
        const logoHtml = logo
            ? `<img src="${Utils.escapeAttr(logo)}" alt="" style="max-height:52px;max-width:96px;object-fit:contain;display:block;">`
            : '';

        return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
    html, body { margin: 0; padding: 0; background: #fff; direction: rtl; font-family: 'Cairo', Tahoma, 'Segoe UI', sans-serif; letter-spacing: 0; }
    .att-report-doc { width: 794px; box-sizing: border-box; padding: 22px 26px 28px; background: #fff; }
    .att-report-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 3px solid #134e4a; padding-bottom: 12px; margin-bottom: 14px; }
    .att-report-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .att-report-brand-name { font-size: 13px; font-weight: 700; color: #334155; line-height: 1.4; white-space: nowrap; word-break: keep-all; overflow-wrap: normal; }
    .att-report-code { font-size: 10px; color: #64748b; text-align: left; white-space: nowrap; }
    .att-report-footer { margin-top: 18px; padding-top: 10px; border-top: 1px dashed #cbd5e1; text-align: center; font-size: 9px; color: #94a3b8; line-height: 1.5; }
</style>
</head>
<body>
<div class="att-report-doc" id="attendance-report-root">
    <div class="att-report-top">
        <div class="att-report-brand">
            ${logoHtml}
            <div class="att-report-brand-name">${companyName}</div>
        </div>
        <div class="att-report-code">${formCode}</div>
    </div>
    ${content}
    <div class="att-report-footer">${companyName} — تقرير حضور مسئولي العيادة</div>
</div>
</body>
</html>`;
    },

    _loadAttendancePdfLib_(urls, checkFn) {
        if (checkFn()) return Promise.resolve(true);
        const list = Array.isArray(urls) ? urls : [urls];
        const tryAt = (index) => {
            if (index >= list.length) return Promise.resolve(false);
            const src = list[index];
            const existing = Array.from(document.querySelectorAll('script[src]'))
                .find(s => String(s.src || '').includes(src.replace(/^https?:\/\//, '').split('/').slice(-2).join('/')));
            if (existing) {
                return new Promise((resolve) => {
                    const done = () => resolve(!!checkFn());
                    existing.addEventListener('load', done, { once: true });
                    setTimeout(done, 4000);
                });
            }
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve(!!checkFn());
                script.onerror = () => resolve(tryAt(index + 1));
                document.head.appendChild(script);
            });
        };
        return tryAt(0);
    },

    async _ensureAttendancePdfLibs_() {
        const jsPdfOk = await this._loadAttendancePdfLib_([
            'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
            'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
        ], () => typeof window.jspdf !== 'undefined' || typeof window.jsPDF !== 'undefined');
        const h2cOk = await this._loadAttendancePdfLib_([
            'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
            'https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
        ], () => typeof html2canvas !== 'undefined');
        return jsPdfOk && h2cOk;
    },

    _getJsPdfConstructor_() {
        if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
        if (window.jsPDF && window.jsPDF.jsPDF) return window.jsPDF.jsPDF;
        if (typeof window.jsPDF === 'function') return window.jsPDF;
        return null;
    },

    async _preloadAttendancePdfFonts_(targetDoc) {
        const doc = targetDoc || document;
        const head = doc.head || doc.documentElement;
        if (head && !doc.getElementById('clinic-att-cairo-font')) {
            const link = doc.createElement('link');
            link.id = 'clinic-att-cairo-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
            head.appendChild(link);
        }
        try {
            if (doc.fonts && typeof doc.fonts.load === 'function') {
                await doc.fonts.load('400 14px Cairo');
                await doc.fonts.load('700 18px Cairo');
                await doc.fonts.ready;
            }
        } catch (_e) { /* ignore */ }
    },

    async _captureAttendanceHtmlToCanvas_(root, iWin) {
        const a4W = this.ATTENDANCE_A4_WIDTH_PX || 794;
        const scrollW = Math.max(root?.scrollWidth || a4W, a4W);
        const scrollH = Math.max(root?.scrollHeight || 1, 1);
        let scale = Utils.PdfExport.getOptimalCaptureScale(scrollW, scrollH, Utils.PdfExport.DEFAULT_CAPTURE_SCALE);
        const h2c = (iWin && typeof iWin.html2canvas === 'function') ? iWin.html2canvas : html2canvas;
        const baseOpts = {
            scale,
            backgroundColor: '#ffffff',
            logging: false,
            width: scrollW,
            height: scrollH,
            windowWidth: scrollW,
            windowHeight: scrollH,
            scrollX: 0,
            scrollY: 0,
            useCORS: true,
            allowTaint: true,
            imageTimeout: 8000
        };
        const attempts = [
            baseOpts,
            { ...baseOpts, useCORS: false, allowTaint: true },
            { ...baseOpts, scale: Math.max(1.25, scale - 0.5) }
        ];
        let lastError = null;
        for (let i = 0; i < attempts.length; i++) {
            try {
                const canvas = await h2c(root, attempts[i]);
                if (canvas && canvas.width > 0 && canvas.height > 0) return canvas;
            } catch (err) {
                lastError = err;
            }
        }
        if (lastError) throw lastError;
        return null;
    },

    async _downloadAttendanceHtmlAsPdf(htmlContent, fileName) {
        const JsPDF = this._getJsPdfConstructor_();
        if (!JsPDF || typeof html2canvas === 'undefined') return false;

        const pdfFileName = String(fileName || 'report.pdf').toLowerCase().endsWith('.pdf')
            ? String(fileName)
            : `${String(fileName)}.pdf`;
        const a4W = this.ATTENDANCE_A4_WIDTH_PX || 794;
        const marginMm = 6;
        const preparedHtml = this._prepareAttendancePdfHtml_(htmlContent);

        await this._preloadAttendancePdfFonts_();

        const iframe = document.createElement('iframe');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.style.cssText = `position:fixed;left:-20000px;top:0;width:${a4W}px;height:200px;border:0;visibility:hidden;`;
        document.body.appendChild(iframe);

        try {
            iframe.srcdoc = preparedHtml;
            await new Promise((resolve) => {
                iframe.onload = resolve;
                iframe.onerror = resolve;
                setTimeout(resolve, 4000);
            });

            const iDoc = iframe.contentDocument || iframe.contentWindow?.document;
            const iWin = iframe.contentWindow;
            if (!iDoc || !iWin) return false;

            await this._preloadAttendancePdfFonts_(iDoc);
            await this._waitAttendancePdfFontsReady_(iDoc);

            const images = Array.from(iDoc.images || []);
            await Promise.all(images.map((img) => new Promise((resolve) => {
                if (img.complete) return resolve();
                img.onload = resolve;
                img.onerror = resolve;
                setTimeout(resolve, 2000);
            })));

            await this._ensureHtml2CanvasInAttendanceFrame_(iDoc, iWin);
            await new Promise((r) => setTimeout(r, 300));

            const root = iDoc.getElementById('attendance-report-root')
                || iDoc.querySelector('.att-report-doc')
                || iDoc.body;
            if (!root) return false;

            const contentHeight = Math.max(root.scrollHeight, root.offsetHeight, 1);
            iframe.style.height = `${contentHeight + 80}px`;
            await new Promise((r) => setTimeout(r, 150));

            const canvas = await this._captureAttendanceHtmlToCanvas_(root, iWin);
            if (!canvas) return false;

            const pdf = Utils.PdfExport.createPdf({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            if (!pdf) return false;
            Utils.PdfExport.appendCanvasAsPdfPages(pdf, canvas, { marginMm });
            Utils.PdfExport.savePdf(pdf, pdfFileName);
            return true;
        } catch (error) {
            Utils.safeWarn('فشل تحميل تقرير حضور PDF:', error);
            return false;
        } finally {
            iframe.remove();
        }
    },

    async exportAttendanceToPDF(overrideFilters) {
        const filters = overrideFilters || this.state.filters.attendance || {};
        const rows = this._filterAttendanceRows(this.getClinicStaffAttendanceList(), filters);
        if (!rows.length) {
            Notification?.info?.('لا توجد بيانات لتصديرها');
            return;
        }

        const fileName = `Clinic_Attendance_${this._attendanceReportFileSuffix(filters)}.pdf`;

        if (typeof Loading !== 'undefined' && Loading.show) Loading.show('جاري إعداد التقرير...');
        try {
            const libsReady = await this._ensureAttendancePdfLibs_();
            if (!libsReady) {
                Notification?.error?.('تعذّر تحميل مكتبات PDF — تحقق من الاتصال بالإنترنت');
                return;
            }

            const htmlContent = this._buildAttendanceReportFullHtml(filters, rows);
            const ok = await this._downloadAttendanceHtmlAsPdf(htmlContent, fileName);
            if (ok) {
                Notification?.success?.('تم تحميل تقرير PDF بنجاح');
            } else {
                Notification?.error?.('تعذّر إنشاء ملف PDF — حاول مجدداً');
            }
        } catch (error) {
            Utils.safeError('فشل تصدير تقرير الحضور PDF:', error);
            Notification?.error?.('تعذر تصدير تقرير الحضور: ' + (error?.message || ''));
        } finally {
            if (typeof Loading !== 'undefined' && Loading.hide) Loading.hide();
        }
    },

    showAttendanceReportModal() {
        document.getElementById('clinic-attendance-report-modal')?.remove();
        const isAdmin = this.canViewAllAttendanceData();
        const staffOptions = isAdmin ? this._getAttendanceStaffOptions() : [];
        const curMonth = new Date();
        const defaultMonth = `${curMonth.getFullYear()}-${String(curMonth.getMonth() + 1).padStart(2, '0')}`;
        const staffOptsHtml = staffOptions.map(s =>
            `<option value="${Utils.escapeAttr(s.id)}">${Utils.escapeHTML(s.name)}${s.role ? ' — ' + Utils.escapeHTML(this.getStaffRoleLabel(s.role)) : ''}</option>`
        ).join('');
        const sectionStyle = 'border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;background:#fafafa;';
        const dateOptStyle = (active) => `display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;margin:0 0 6px;background:${active ? '#f0fdfa' : 'transparent'};border:1px solid ${active ? '#99f6e4' : 'transparent'};`;

        const html = `
            <div class="modal-overlay active" id="clinic-attendance-report-modal">
                <div class="modal-content" style="max-width:580px;border-radius:14px;overflow:hidden;">
                    <div class="modal-header" style="background:linear-gradient(125deg,#0b2a55,#1e40af 70%,#2563eb);color:#fff;">
                        <h3 style="margin:0;color:#fff;"><i class="fas fa-file-export ml-2"></i>تصدير تقرير الحضور</h3>
                        <button type="button" class="modal-close" style="color:#fff;" onclick="document.getElementById('clinic-attendance-report-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body" style="padding:20px;">
                        <p style="font-size:0.82rem;color:#64748b;margin:0 0 14px;">حدّد الفترة والمسئول (اختياري) بشكل مستقل، ثم اختر صيغة التصدير.</p>

                        <label id="att-report-current-wrap" style="display:flex;align-items:center;gap:8px;padding:10px 12px;border:2px solid #f59e0b;border-radius:10px;background:#fffbeb;cursor:pointer;margin-bottom:12px;">
                            <input type="checkbox" id="att-report-use-current">
                            <span><i class="fas fa-filter" style="color:#f59e0b;margin-left:6px;"></i><strong>استخدام فلاتر الشاشة الحالية</strong></span>
                        </label>

                        <div id="att-report-custom-filters">
                            <div style="${sectionStyle}margin-bottom:12px;">
                                <div style="font-size:0.78rem;font-weight:700;color:#334155;margin-bottom:8px;"><i class="fas fa-calendar-alt ml-1" style="color:#0d9488;"></i> الفترة الزمنية</div>
                                <label style="${dateOptStyle(true)}" data-date-opt="month">
                                    <input type="radio" name="att-report-date-scope" value="month" checked>
                                    <span>شهر محدد</span>
                                </label>
                                <div id="att-report-month-wrap" style="padding-right:28px;margin-bottom:8px;">
                                    <input type="month" id="att-report-month" class="form-input" value="${defaultMonth}" style="width:100%;box-sizing:border-box;">
                                </div>
                                <label style="${dateOptStyle(false)}" data-date-opt="period">
                                    <input type="radio" name="att-report-date-scope" value="period">
                                    <span>مدة محددة (من — إلى)</span>
                                </label>
                                <div id="att-report-period-wrap" style="padding-right:28px;margin-bottom:8px;display:none;">
                                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                                        <div><label class="form-label" style="font-size:0.72rem;display:block;margin-bottom:4px;">من تاريخ</label><input type="date" id="att-report-from" class="form-input" style="width:100%;box-sizing:border-box;"></div>
                                        <div><label class="form-label" style="font-size:0.72rem;display:block;margin-bottom:4px;">إلى تاريخ</label><input type="date" id="att-report-to" class="form-input" style="width:100%;box-sizing:border-box;"></div>
                                    </div>
                                </div>
                                <label style="${dateOptStyle(false)}" data-date-opt="all">
                                    <input type="radio" name="att-report-date-scope" value="all">
                                    <span>جميع التواريخ (بدون تقييد زمني)</span>
                                </label>
                            </div>

                            ${isAdmin ? `
                            <div style="${sectionStyle}margin-bottom:12px;">
                                <div style="font-size:0.78rem;font-weight:700;color:#334155;margin-bottom:8px;"><i class="fas fa-user ml-1" style="color:#6366f1;"></i> المسئول</div>
                                <select id="att-report-staff" class="form-input" style="width:100%;box-sizing:border-box;">
                                    <option value="all">— جميع المسئولين —</option>${staffOptsHtml}
                                </select>
                                <p style="font-size:0.72rem;color:#64748b;margin:8px 0 0;">يمكن الجمع مع أي خيار زمني أعلاه.</p>
                            </div>` : ''}
                        </div>
                        <div style="margin-bottom:4px;font-size:0.78rem;font-weight:700;color:#64748b;">صيغة التصدير</div>
                        <div style="display:flex;gap:8px;">
                            <label style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border:2px solid #0d9488;border-radius:10px;cursor:pointer;background:#f0fdfa;font-weight:600;color:#134e4a;">
                                <input type="radio" name="att-report-format" value="pdf" checked> PDF
                            </label>
                            <label style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border:2px solid #e2e8f0;border-radius:10px;cursor:pointer;font-weight:600;color:#64748b;">
                                <input type="radio" name="att-report-format" value="excel"> Excel
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer" style="gap:8px;">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-attendance-report-modal')?.remove()">إلغاء</button>
                        <button type="button" class="btn-primary" id="att-report-export-btn"><i class="fas fa-download ml-2"></i>تصدير التقرير</button>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', html);

        const modal = document.getElementById('clinic-attendance-report-modal');
        if (!modal) return;

        const customFiltersEl = modal.querySelector('#att-report-custom-filters');
        const useCurrentEl = modal.querySelector('#att-report-use-current');

        const setCustomFiltersEnabled = (enabled) => {
            if (customFiltersEl) {
                customFiltersEl.style.opacity = enabled ? '1' : '0.45';
                customFiltersEl.style.pointerEvents = enabled ? 'auto' : 'none';
            }
        };

        const syncDateScopeUi = () => {
            const dateScope = modal.querySelector('input[name="att-report-date-scope"]:checked')?.value || 'month';
            modal.querySelector('#att-report-month-wrap').style.display = dateScope === 'month' ? 'block' : 'none';
            modal.querySelector('#att-report-period-wrap').style.display = dateScope === 'period' ? 'block' : 'none';
            modal.querySelectorAll('[data-date-opt]').forEach(label => {
                const active = label.dataset.dateOpt === dateScope;
                label.style.background = active ? '#f0fdfa' : 'transparent';
                label.style.borderColor = active ? '#99f6e4' : 'transparent';
            });
        };

        useCurrentEl?.addEventListener('change', () => setCustomFiltersEnabled(!useCurrentEl.checked));
        modal.querySelectorAll('input[name="att-report-date-scope"]').forEach(r => {
            r.addEventListener('change', syncDateScopeUi);
        });
        syncDateScopeUi();
        setCustomFiltersEnabled(true);

        const buildReportFiltersFromModal = () => {
            if (useCurrentEl?.checked) {
                return Object.assign({}, this.state.filters.attendance || {});
            }

            const filters = { search: '', staffRole: 'all', status: 'all', staffId: 'all', month: '', dateFrom: '', dateTo: '', period: 'all' };
            const dateScope = modal.querySelector('input[name="att-report-date-scope"]:checked')?.value || 'month';

            if (dateScope === 'month') {
                const monthVal = modal.querySelector('#att-report-month')?.value || '';
                if (!monthVal) {
                    Notification?.warning?.('يرجى اختيار الشهر');
                    return null;
                }
                filters.month = monthVal;
            } else if (dateScope === 'period') {
                const fromVal = modal.querySelector('#att-report-from')?.value || '';
                const toVal = modal.querySelector('#att-report-to')?.value || '';
                if (!fromVal && !toVal) {
                    Notification?.warning?.('يرجى تحديد تاريخ البداية أو النهاية');
                    return null;
                }
                const range = this._normalizeAttendanceDateRange(fromVal, toVal);
                filters.dateFrom = range.dateFrom;
                filters.dateTo = range.dateTo;
            }

            const staffVal = modal.querySelector('#att-report-staff')?.value || 'all';
            if (staffVal && staffVal !== 'all') filters.staffId = staffVal;

            return filters;
        };

        modal.querySelector('#att-report-export-btn')?.addEventListener('click', () => {
            const format = modal.querySelector('input[name="att-report-format"]:checked')?.value || 'pdf';
            const filters = buildReportFiltersFromModal();
            if (!filters) return;

            const rows = this._filterAttendanceRows(this.getClinicStaffAttendanceList(), filters);
            if (!rows.length) {
                Notification?.info?.('لا توجد سجلات مطابقة لنطاق التقرير');
                return;
            }

            modal.remove();
            if (format === 'excel') {
                this.exportAttendanceToExcel(filters);
                Notification?.success?.('تم تحميل تقرير Excel');
            } else {
                this.exportAttendanceToPDF(filters);
            }
        });
    },

    showAddClinicStaffModal() {
        if (!this.isCurrentUserAdmin()) {
            Notification?.error?.('هذا الإجراء متاح لمدير النظام فقط');
            return;
        }
        const staffList = this.getClinicStaffList();
        const staffIds = new Set(staffList.map(s => String(s.userId || s.userEmail || '').toLowerCase()).filter(Boolean));
        const users = (AppState.appData.users || []).filter(u => u && u.active !== false && u.email);
        const options = users.filter(u => !staffIds.has(String(u.id || '').toLowerCase()) && !staffIds.has(String(u.email || '').toLowerCase()))
            .map(u => `<option value="${Utils.escapeAttr(u.id || '')}" data-email="${Utils.escapeAttr(u.email || '')}" data-name="${Utils.escapeAttr(u.name || '')}" data-dept="${Utils.escapeAttr(u.department || '')}" data-job="${Utils.escapeAttr(u.jobTitle || u.position || '')}">${Utils.escapeHTML(u.name || u.email)}</option>`)
            .join('');
        const html = `
            <div class="modal-overlay active" id="clinic-staff-modal">
                <div class="modal-content" style="max-width:520px;">
                    <div class="modal-header"><h3><i class="fas fa-user-plus ml-2"></i>إضافة مسئول عيادة</h3>
                        <button type="button" class="modal-close" onclick="document.getElementById('clinic-staff-modal')?.remove()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body space-y-4">
                        <div class="form-group">
                            <label class="form-label">المستخدم</label>
                            <select id="clinic-staff-user" class="form-input"><option value="">— اختر —</option>${options}</select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">الدور</label>
                            <select id="clinic-staff-role" class="form-input">
                                <option value="doctor">طبيب</option>
                                <option value="nurse">تمريض</option>
                                <option value="clinic_officer">مسئول عيادة</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="document.getElementById('clinic-staff-modal')?.remove()">إلغاء</button>
                        <button type="button" class="btn-primary" id="clinic-staff-save-btn"><i class="fas fa-save ml-2"></i>حفظ</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('clinic-staff-modal')?.remove();
        document.body.insertAdjacentHTML('beforeend', html);
        document.getElementById('clinic-staff-save-btn')?.addEventListener('click', async () => {
            const sel = document.getElementById('clinic-staff-user');
            const opt = sel?.selectedOptions?.[0];
            if (!sel?.value || !opt) {
                Notification?.warning?.('يرجى اختيار مستخدم');
                return;
            }
            const role = document.getElementById('clinic-staff-role')?.value || 'clinic_officer';
            try {
                const resp = await GoogleIntegration.sendRequest({
                    action: 'addClinicStaff',
                    data: {
                        userId: sel.value,
                        userEmail: opt.dataset.email || '',
                        userName: opt.dataset.name || '',
                        department: opt.dataset.dept || '',
                        jobTitle: opt.dataset.job || '',
                        staffRole: role,
                        isActive: 'true'
                    }
                });
                if (resp?.success) {
                    Notification?.success?.('تمت إضافة مسئول العيادة');
                    document.getElementById('clinic-staff-modal')?.remove();
                    await this.loadClinicAttendanceData(true);
                    this.renderAttendanceTab({ force: true });
                } else {
                    Notification?.error?.(resp?.message || 'فشل الإضافة');
                }
            } catch (err) {
                Notification?.error?.(err?.message || 'فشل الإضافة');
            }
        });
    },

    async toggleClinicStaffActive(staffId, isActive) {
        if (!this.isCurrentUserAdmin() || !staffId) return;
        try {
            const resp = await GoogleIntegration.sendRequest({
                action: 'updateClinicStaff',
                data: { staffId, updateData: { isActive: isActive ? 'true' : 'false' } }
            });
            if (resp?.success) {
                await this.loadClinicAttendanceData(true);
                this.renderAttendanceTab({ force: true });
                Notification?.success?.('تم تحديث حالة المسئول');
            } else {
                Notification?.error?.(resp?.message || 'فشل التحديث');
            }
        } catch (err) {
            Notification?.error?.(err?.message || 'فشل التحديث');
        }
    },

    async deleteClinicStaffMember(staffId) {
        if (!this.isCurrentUserAdmin() || !staffId) return;
        if (!confirm('حذف هذا المسئول من قائمة العيادة؟ (سجل الحضور السابق يبقى محفوظاً)')) return;
        try {
            const resp = await GoogleIntegration.sendRequest({ action: 'deleteClinicStaff', data: { staffId } });
            if (resp?.success) {
                await this.loadClinicAttendanceData(true);
                this.renderAttendanceTab({ force: true });
                Notification?.success?.('تم الحذف');
            } else {
                Notification?.error?.(resp?.message || 'فشل الحذف');
            }
        } catch (err) {
            Notification?.error?.(err?.message || 'فشل الحذف');
        }
    },

    async notifyAdminAboutTimeOffRequest(request) {
        // الإشعار يُرسل من الخادم عند addClinicStaffTimeOffRequest (مسئول العيادة لا يقرأ ورقة Users)
        if (!request || !request.id) return;
        try {
            if (this.isCurrentUserAdmin()) {
                const list = Array.isArray(AppState.appData?.clinicStaffTimeOffRequests)
                    ? AppState.appData.clinicStaffTimeOffRequests : [];
                const exists = list.some(r => String(r.id) === String(request.id));
                if (!exists) {
                    AppState.appData.clinicStaffTimeOffRequests = [request, ...list];
                }
                this._updatePendingApprovalsBadgeFromLocal_();
                if (typeof UI !== 'undefined' && typeof UI.updateNotificationsBadge === 'function') {
                    UI.updateNotificationsBadge();
                }
            }
        } catch (error) {
            Utils.safeWarn('خطأ في تحديث إشعارات طلب الحضور:', error);
        }
    },

    async submitTimeOffRequest() {
        this._saveTimeOffFormDraftFromDom();
        this._timeOffFormSubmitting = true;
        const requestType = document.getElementById('timeoff-request-type')?.value || '';
        const reason = document.getElementById('timeoff-reason')?.value?.trim() || '';
        let dateFrom = '';
        let dateTo = '';
        const timeFrom = document.getElementById('timeoff-time-from')?.value || '';
        const timeTo = document.getElementById('timeoff-time-to')?.value || '';
        const durationHours = document.getElementById('timeoff-duration-hours')?.value || '';

        if (requestType === 'leave') {
            dateFrom = document.getElementById('timeoff-date-from')?.value || '';
            dateTo = document.getElementById('timeoff-date-to')?.value || '';
        } else if (requestType === 'permission') {
            dateFrom = document.getElementById('timeoff-perm-date')?.value || '';
            dateTo = dateFrom;
        } else if (requestType === 'overtime') {
            dateFrom = document.getElementById('timeoff-ot-date')?.value || '';
            dateTo = dateFrom;
        }

        if (!requestType) {
            this._timeOffFormSubmitting = false;
            Notification?.error?.('يرجى اختيار نوع الطلب');
            return;
        }
        if (!reason) {
            this._timeOffFormSubmitting = false;
            Notification?.error?.('سبب الطلب مطلوب');
            return;
        }

        Loading.show();
        try {
            const payload = { requestType, reason, dateFrom, dateTo, timeFrom, timeTo, durationHours };
            const result = await GoogleIntegration.sendRequest({
                action: 'addClinicStaffTimeOffRequest',
                data: payload
            });

            if (result && result.success) {
                const refresh = await GoogleIntegration.sendRequest({
                    action: 'getClinicStaffTimeOffRequests',
                    data: {}
                });
                if (refresh?.success && Array.isArray(refresh.data)) {
                    AppState.appData.clinicStaffTimeOffRequests = refresh.data;
                }
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) window.DataManager.save();

                const newReq = (AppState.appData.clinicStaffTimeOffRequests || []).find(r => r.id === result.data?.id) || {
                    id: result.data?.id,
                    requestType,
                    reason,
                    dateFrom,
                    dateTo,
                    timeFrom,
                    timeTo,
                    durationHours,
                    status: 'pending'
                };
                this._invalidateApprovalsCache();
                this.notifyAdminAboutTimeOffRequest(newReq);

                Loading.hide();
                Notification?.success?.('تم إرسال الطلب بنجاح — بانتظار موافقة المدير');
                if (this.state) this.state.timeOffFormDraft = this._getDefaultTimeOffFormDraft();
                document.getElementById('clinic-timeoff-request-modal')?.remove();
                this._attendanceRenderPending = false;
                this.renderAttendanceTab({ force: true });
            } else {
                throw new Error(result?.message || 'فشل إرسال الطلب');
            }
        } catch (error) {
            Loading.hide();
            Notification?.error?.(error?.message || 'فشل إرسال الطلب');
        } finally {
            this._timeOffFormSubmitting = false;
        }
    },

    async cancelTimeOffRequest(requestId) {
        if (!requestId) return;
        const confirmed = confirm('هل تريد إلغاء هذا الطلب؟');
        if (!confirmed) return;

        Loading.show();
        try {
            const result = await GoogleIntegration.sendRequest({
                action: 'cancelClinicStaffTimeOffRequest',
                data: { requestId }
            });
            if (result && result.success) {
                const refresh = await GoogleIntegration.sendRequest({
                    action: 'getClinicStaffTimeOffRequests',
                    data: {}
                });
                if (refresh?.success && Array.isArray(refresh.data)) {
                    AppState.appData.clinicStaffTimeOffRequests = refresh.data;
                }
                if (typeof window.DataManager !== 'undefined' && window.DataManager.save) window.DataManager.save();
                Loading.hide();
                Notification?.success?.('تم إلغاء الطلب');
                this.renderAttendanceTab({ force: true });
            } else {
                throw new Error(result?.message || 'فشل الإلغاء');
            }
        } catch (error) {
            Loading.hide();
            Notification?.error?.(error?.message || 'فشل إلغاء الطلب');
        }
    },

    renderTimeOffRequestsTable(requests) {
        if (!requests || !requests.length) {
            return '<p class="text-center text-gray-500 py-6">لا توجد طلبات</p>';
        }
        const rows = requests.map(req => {
            const isPending = String(req.status) === 'pending';
            return `<tr>
                <td><span class="badge badge-info">${Utils.escapeHTML(this.getTimeOffRequestTypeLabel(req.requestType))}</span></td>
                <td>${Utils.escapeHTML(this.formatTimeOffRequestDetails(req))}</td>
                <td class="text-sm">${Utils.escapeHTML(req.reason || '—')}</td>
                <td>${this.getTimeOffStatusBadge(req.status)}</td>
                <td>${this.formatDate(req.requestedAt || req.createdAt, true)}</td>
                <td>${isPending ? `<button type="button" class="btn-icon btn-icon-danger" title="إلغاء" onclick="Clinic.cancelTimeOffRequest('${Utils.escapeAttr(req.id)}')"><i class="fas fa-ban"></i></button>` : '—'}</td>
            </tr>`;
        }).join('');
        return this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
            <thead><tr><th>النوع</th><th>التفاصيل</th><th>السبب</th><th>الحالة</th><th>التاريخ</th><th>إجراء</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>`);
    },

    renderAttendanceSelfTab(panel) {
        this._saveTimeOffFormDraftFromDom();
        this._scheduleLeaveBalancesLoadIfNeeded(false);
        this.ensureData();
        const dataLoading = this._isAttendanceDataLoading();
        const balancesLoading = this._isLeaveBalancesLoading();
        const balancePeriods = this._getLeaveBalancePeriodDefaults();
        const myBalance = this.getClinicStaffLeaveBalancesList()[0] || {};
        const bm = myBalance.month || {};
        const by = myBalance.year || {};
        this.state.filters = this.state.filters || {};
        this.state.filters.attendance = Object.assign(
            { search: '', staffRole: 'all', status: 'all', staffId: 'all', month: '', dateFrom: '', dateTo: '', period: 'all' },
            this.state.filters.attendance || {}
        );
        const filters = this.state.filters.attendance;
        const rows = this.getFilteredClinicAttendance();
        const myRequests = this.getClinicStaffTimeOffRequestsList().sort((a, b) =>
            new Date(b.requestedAt || b.createdAt) - new Date(a.requestedAt || a.createdAt)
        );
        const pendingCount = myRequests.filter(r => r.status === 'pending').length;
        const stats = this._computeAttendanceReportStats(rows);
        const staff = this.getCurrentUserStaffRecord();
        const activityList = this.getFilteredClinicStaffActivities();
        const activitiesLoading = !!this._clinicStaffActivitiesLoading;
        const filterPanelOpen = this.state.attendanceFilterPanelOpen !== false;
        const period = filters.period || 'all';
        const periodLabels = { today: 'اليوم', week: '7 أيام', month: '30 يوم', all: 'الكل' };
        const tableRows = dataLoading && rows.length === 0
            ? this._renderAttendanceTableLoadingRow(5)
            : (rows.length ? rows.map(r => `
            <tr>
                <td>${Utils.escapeHTML(r.date || '—')}</td>
                <td>${r.checkIn ? (Utils.formatDateTime ? Utils.formatDateTime(r.checkIn) : Utils.escapeHTML(String(r.checkIn))) : '—'}</td>
                <td>${r.checkOut ? (Utils.formatDateTime ? Utils.formatDateTime(r.checkOut) : Utils.escapeHTML(String(r.checkOut))) : '—'}</td>
                <td>${Utils.escapeHTML(String(r.workDuration || '—'))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(r.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(r.status))}</span></td>
                <td>${this._renderAttendancePunchActions(r)}</td>
            </tr>
        `).join('') : `<tr><td colspan="6" class="text-center text-gray-500 py-8">لا توجد سجلات حضور</td></tr>`);

        const selfNavSections = [
            { id: 'clinic-attendance-section-timeoff', label: 'طلب جديد', icon: 'fa-paper-plane' },
            { id: 'clinic-attendance-section-my-requests', label: 'طلباتي', icon: 'fa-list' },
            { id: 'clinic-attendance-section-records', label: 'سجل حضوري', icon: 'fa-clipboard-user' },
            { id: 'clinic-staff-activities-section', label: 'نشاطي', icon: 'fa-history' },
            { id: 'clinic-leave-balances-section', label: 'أرصدة الإجازات', icon: 'fa-wallet' },
            { id: 'clinic-approved-timeoff-section', label: 'الإجازات المعتمدة', icon: 'fa-check-circle' }
        ];

        panel.innerHTML = `
            <div id="clinic-attendance-self-root">
                ${this.renderAttendanceQuickNav(selfNavSections)}
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:14px;">
                    ${[
                        { label: 'أيام حضوري', value: stats.total, icon: 'fa-calendar-check', color: '#059669', bg: '#ecfdf5' },
                        { label: 'ساعاتي', value: stats.totalHours, icon: 'fa-clock', color: '#2563eb', bg: '#eff6ff' },
                        { label: 'طلبات معلقة', value: pendingCount, icon: 'fa-hourglass-half', color: '#d97706', bg: '#fffbeb' },
                        { label: 'إجازة متبقية (شهر)', value: balancesLoading ? '…' : (bm.leaveRemaining ?? 0), icon: 'fa-umbrella-beach', color: '#0d9488', bg: '#f0fdfa' },
                        { label: 'أذونات متبقية (شهر)', value: balancesLoading ? '…' : (bm.permissionRemaining ?? 0), icon: 'fa-door-open', color: '#7c3aed', bg: '#f5f3ff' },
                        { label: 'إجازة متبقية (سنة)', value: balancesLoading ? '…' : (by.leaveRemaining ?? 0), icon: 'fa-calendar', color: '#0369a1', bg: '#f0f9ff' }
                    ].map(k => `
                        <div style="background:${k.bg};border-radius:12px;padding:14px;display:flex;align-items:center;gap:10px;">
                            <i class="fas ${k.icon}" style="color:${k.color};font-size:1.2rem;"></i>
                            <div><p style="margin:0;font-size:0.72rem;color:#64748b;">${k.label}</p><p style="margin:0;font-size:1.35rem;font-weight:800;color:${k.color};">${k.value}</p></div>
                        </div>`).join('')}
                </div>

                <div style="padding:14px 18px;background:linear-gradient(125deg,#0b2a55 0%,#1e3a75 70%,#245a9b 100%);border-radius:14px;color:#fff;margin-bottom:14px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;align-items:center;box-shadow:0 10px 26px rgba(11,42,85,.25);">
                    <div>
                        <h3 style="margin:0;font-size:1rem;font-weight:700;">حضوري وطلباتي</h3>
                        <p style="margin:4px 0 0;font-size:0.72rem;opacity:0.9;">${Utils.escapeHTML(staff?.userName || AppState.currentUser?.name || '')} — ${Utils.escapeHTML(this.getStaffRoleLabel(staff?.staffRole))}</p>
                    </div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        ${['today', 'week', 'month', 'all'].map(p => {
                            const active = period === p;
                            return `<button type="button" class="clinic-attendance-period-btn" data-period="${p}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;background:${active ? '#fff' : 'rgba(255,255,255,0.14)'};color:${active ? '#0b2a55' : '#fff'};">${periodLabels[p]}</button>`;
                        }).join('')}
                        <button type="button" id="clinic-attendance-new-request-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#7c2d12;font-size:0.74rem;font-weight:800;box-shadow:0 4px 12px rgba(0,0,0,.18);"><i class="fas fa-paper-plane"></i> طلب جديد</button>
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);background:rgba(255,255,255,0.12);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-sliders-h"></i> فلاتر</button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(255,255,255,0.14);color:#fff;cursor:pointer;"><i class="fas fa-sync-alt${dataLoading ? ' fa-spin' : ''}"></i></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-pdf"></i> PDF</button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 10px;border-radius:8px;border:none;background:rgba(0,0,0,0.22);color:#fff;font-size:0.74rem;cursor:pointer;"><i class="fas fa-file-excel"></i> Excel</button>
                    </div>
                </div>

                <div id="clinic-attendance-filter-panel" style="display:${filterPanelOpen ? 'block' : 'none'};margin-bottom:14px;">
                    <div class="registry-filter-grid" role="search" aria-label="فلاتر سجل حضوري">
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-month"><i class="fas fa-calendar-alt"></i>الشهر</label>
                            <input type="month" id="clinic-attendance-month" class="form-input" value="${Utils.escapeAttr(filters.month || '')}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-status"><i class="fas fa-circle-check"></i>الحالة</label>
                            <select id="clinic-attendance-status" class="form-input">
                                <option value="all">كل الحالات</option>
                                <option value="present" ${filters.status === 'present' ? 'selected' : ''}>حاضر</option>
                                <option value="partial" ${filters.status === 'partial' ? 'selected' : ''}>خروج جزئي</option>
                                <option value="absent" ${filters.status === 'absent' ? 'selected' : ''}>غائب</option>
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-from"><i class="fas fa-calendar-day"></i>من تاريخ الحضور</label>
                            <input type="date" id="clinic-attendance-from" class="form-input" value="${Utils.escapeAttr(filters.dateFrom || '')}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-to"><i class="fas fa-calendar-check"></i>إلى تاريخ الحضور</label>
                            <input type="date" id="clinic-attendance-to" class="form-input" value="${Utils.escapeAttr(filters.dateTo || '')}">
                        </div>
                        <div class="registry-filter-field tx-reg-filter-actions">
                            <button type="button" id="clinic-attendance-reset-filters" class="registry-filter-reset-btn"><i class="fas fa-rotate-left"></i>إعادة تعيين الفلاتر</button>
                        </div>
                    </div>
                </div>

                <div class="content-card mb-4" id="clinic-attendance-section-my-requests">
                    <div class="card-header"><h4 class="card-title"><i class="fas fa-list ml-2"></i>طلباتي (${myRequests.length})</h4></div>
                    <div class="card-body" style="padding:0;">${this.renderTimeOffRequestsTable(myRequests)}</div>
                </div>

                <div class="content-card" id="clinic-attendance-section-records">
                    <div class="card-header"><h4 class="card-title"><i class="fas fa-clipboard-user ml-2"></i>سجل حضوري (${rows.length})</h4></div>
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                            <thead><tr><th>التاريخ</th><th>دخول</th><th>خروج</th><th>مدة (س)</th><th>الحالة</th><th>إجراءات</th></tr></thead>
                            <tbody>${tableRows}</tbody>
                        </table>`)}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({
                    showUserColumn: false,
                    activities: activityList,
                    loading: activitiesLoading,
                    title: 'نشاطي داخل النظام'
                })}

                ${this.renderClinicStaffLeaveBalancesSection({
                    balances: this.getClinicStaffLeaveBalancesList(),
                    loading: balancesLoading,
                    month: balancePeriods.month,
                    year: balancePeriods.year
                })}

                ${this.renderApprovedTimeOffRequestsSection(this.getClinicStaffLeaveBalancesList(), balancePeriods.month)}
            </div>`;

        const readFilterInputs = () => {
            const month = document.getElementById('clinic-attendance-month')?.value || '';
            let dateFrom = document.getElementById('clinic-attendance-from')?.value || '';
            let dateTo = document.getElementById('clinic-attendance-to')?.value || '';
            if (month && !dateFrom && !dateTo) {
                const mr = this._getAttendanceMonthRange(month);
                dateFrom = mr.dateFrom;
                dateTo = mr.dateTo;
            } else {
                const range = this._normalizeAttendanceDateRange(dateFrom, dateTo);
                dateFrom = range.dateFrom;
                dateTo = range.dateTo;
            }
            return {
                search: '',
                staffRole: 'all',
                status: document.getElementById('clinic-attendance-status')?.value || 'all',
                staffId: 'all',
                month,
                dateFrom,
                dateTo,
                period: this.state.filters.attendance?.period || 'all'
            };
        };

        const applyFilters = () => {
            this.state.filters.attendance = readFilterInputs.call(this);
            this.renderAttendanceTab({ force: true });
        };

        const applyPeriodPreset = (preset) => {
            const today = this._getTodayLocalKey();
            let dateFrom = '';
            let dateTo = '';
            if (preset === 'today') { dateFrom = today; dateTo = today; }
            else if (preset === 'week') {
                const d = new Date(); d.setDate(d.getDate() - 6);
                dateFrom = this._attendanceDayKey(d); dateTo = today;
            } else if (preset === 'month') {
                const d = new Date(); d.setDate(d.getDate() - 29);
                dateFrom = this._attendanceDayKey(d); dateTo = today;
            }
            this.state.filters.attendance = Object.assign({}, this.state.filters.attendance || {}, { period: preset, month: '', dateFrom, dateTo });
            this.renderAttendanceTab({ force: true });
        };

        panel.querySelector('#clinic-attendance-status')?.addEventListener('change', applyFilters);
        panel.querySelector('#clinic-attendance-month')?.addEventListener('change', applyFilters);
        panel.querySelector('#clinic-attendance-from')?.addEventListener('change', applyFilters);
        panel.querySelector('#clinic-attendance-to')?.addEventListener('change', applyFilters);
        panel.querySelector('#clinic-attendance-reset-filters')?.addEventListener('click', () => {
            this.state.filters.attendance = { search: '', staffRole: 'all', status: 'all', staffId: 'all', month: '', dateFrom: '', dateTo: '', period: 'all' };
            this.renderAttendanceTab({ force: true });
        });
        panel.querySelector('#clinic-attendance-toggle-filters')?.addEventListener('click', () => {
            this.state.attendanceFilterPanelOpen = !filterPanelOpen;
            const fp = panel.querySelector('#clinic-attendance-filter-panel');
            if (fp) fp.style.display = this.state.attendanceFilterPanelOpen ? 'block' : 'none';
        });
        panel.querySelectorAll('.clinic-attendance-period-btn').forEach(btn => {
            btn.addEventListener('click', () => applyPeriodPreset(btn.dataset.period || 'all'));
        });
        panel.querySelector('#clinic-attendance-export-btn')?.addEventListener('click', () => this.exportAttendanceToExcel());
        panel.querySelector('#clinic-attendance-pdf-btn')?.addEventListener('click', () => this.exportAttendanceToPDF());
        panel.querySelector('#clinic-attendance-refresh-btn')?.addEventListener('click', async () => {
            Notification?.info?.('جاري التحديث...');
            this._attendanceDataFetchedInSession = false;
            await this.loadClinicAttendanceData(true);
            this._attendanceDataFetchedInSession = true;
            this.renderAttendanceTab({ force: true });
            Notification?.success?.('تم التحديث');
        });

        this.bindClinicStaffActivitiesEvents(panel);
        this.bindClinicStaffLeaveBalanceEvents(panel);
        this.bindAttendanceQuickNav(panel);
        this.initAttendanceTableScroll(panel);
        panel.querySelector('#clinic-attendance-new-request-btn')?.addEventListener('click', () => this.showTimeOffRequestModal());
    },

    renderAttendanceTab(options) {
        const force = options && options.force === true;
        if (!force && this._shouldDeferAttendanceRender()) {
            this._attendanceRenderPending = true;
            return;
        }
        this._attendanceRenderPending = false;

        const panel = document.querySelector('.clinic-tab-panel[data-tab-panel="attendance"]');
        if (!panel) return;

        if (!this.canAccessAttendanceTab()) {
            panel.innerHTML = `<div class="text-center py-12 text-gray-500">
                <i class="fas fa-lock text-4xl mb-4 opacity-40"></i>
                <p class="font-semibold">غير مصرح</p>
                <p class="text-sm mt-2">تبويب الحضور متاح لمدير النظام أو مسئولي العيادة المسجّلين والنشطين فقط.</p>
            </div>`;
            return;
        }

        // ✅ بنية فورية + جلب البيانات بالخلفية (لا انتظار الشبكة قبل عرض الواجهة)
        if (this.isCurrentUserAdmin()) {
            void this.prefetchClinicAttendanceForAdminIfNeeded(false);
        }
        this._scheduleAttendanceDataLoadIfNeeded(false);
        this._scheduleLeaveBalancesLoadIfNeeded(false);
        const dataLoading = this._isAttendanceDataLoading();
        const balancesLoading = this._isLeaveBalancesLoading();
        const balancePeriods = this._getLeaveBalancePeriodDefaults();
        const leaveBalances = this.getClinicStaffLeaveBalancesList();

        if (!this.canViewAllAttendanceData()) {
            return this.renderAttendanceSelfTab(panel);
        }

        this.ensureData();
        this.state.filters = this.state.filters || {};
        this.state.filters.attendance = Object.assign(
            { search: '', staffRole: 'all', status: 'all', staffId: 'all', month: '', dateFrom: '', dateTo: '', period: 'all' },
            this.state.filters.attendance || {}
        );
        const filters = this.state.filters.attendance;
        const rows = this.getFilteredClinicAttendance();
        const staffList = this.getClinicStaffList();
        const staffFilterOptions = this._getAttendanceStaffOptions();
        const activeStaff = staffList.filter(s => String(s.isActive || 'true').toLowerCase() !== 'false');
        const todayKey = this._getTodayLocalKey();
        const allAttendance = this.getClinicStaffAttendanceList();
        const todayRows = allAttendance.filter(r => this._attendanceDayKey(r.date) === todayKey);
        const presentToday = todayRows.filter(r => r.checkIn).length;
        const openSessions = todayRows.filter(r => r.checkIn && !r.checkOut).length;
        const isAdmin = this.isCurrentUserAdmin();
        const activityList = this.getFilteredClinicStaffActivities();
        const activitiesLoading = !!this._clinicStaffActivitiesLoading;
        const activeFilterCount = this._countActiveAttendanceFilters(filters);
        const filterPanelOpen = this.state.attendanceFilterPanelOpen !== false;
        const period = filters.period || 'all';
        const periodLabels = { today: 'اليوم', week: '7 أيام', month: '30 يوم', all: 'الكل' };
        const staffFilterOpts = staffFilterOptions.map(s =>
            `<option value="${Utils.escapeAttr(s.id)}" ${String(filters.staffId) === String(s.id) ? 'selected' : ''}>${Utils.escapeHTML(s.name)}</option>`
        ).join('');

        const tableRows = dataLoading && rows.length === 0
            ? this._renderAttendanceTableLoadingRow(10)
            : (rows.length ? rows.map(r => `
            <tr>
                <td>${Utils.escapeHTML(r.userName || '—')}</td>
                <td>${Utils.escapeHTML(r.userEmail || '—')}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(r.staffRole))}</td>
                <td>${Utils.escapeHTML(r.date || '—')}</td>
                <td>${r.checkIn ? (Utils.formatDateTime ? Utils.formatDateTime(r.checkIn) : Utils.escapeHTML(String(r.checkIn))) : '—'}</td>
                <td>${r.checkOut ? (Utils.formatDateTime ? Utils.formatDateTime(r.checkOut) : Utils.escapeHTML(String(r.checkOut))) : '—'}</td>
                <td>${Utils.escapeHTML(String(r.workDuration || '—'))}</td>
                <td><span class="badge ${this.getAttendanceStatusBadgeClass(r.status)}">${Utils.escapeHTML(this.getAttendanceStatusLabel(r.status))}</span></td>
                <td class="text-xs text-gray-500">${Utils.escapeHTML(String(r.sessionId || '—').slice(0, 18))}</td>
                <td>${this._renderAttendancePunchActions(r)}</td>
            </tr>
        `).join('') : `<tr><td colspan="10" class="text-center text-gray-500 py-8"><i class="fas fa-calendar-times ml-2 opacity-60"></i>لا توجد سجلات مطابقة للفلاتر</td></tr>`);

        const staffAdminRows = isAdmin ? (staffList.length ? staffList.map(s => {
            const active = String(s.isActive || 'true').toLowerCase() !== 'false';
            return `<tr>
                <td>${Utils.escapeHTML(s.userName || '—')}</td>
                <td>${Utils.escapeHTML(this.getStaffRoleLabel(s.staffRole))}</td>
                <td>${active ? '<span class="badge badge-success">نشط</span>' : '<span class="badge badge-secondary">موقوف</span>'}</td>
                <td>
                    <button type="button" class="btn-icon btn-icon-warning" title="${active ? 'إيقاف' : 'تفعيل'}" onclick="Clinic.toggleClinicStaffActive('${Utils.escapeAttr(s.id)}', ${!active})"><i class="fas fa-${active ? 'pause' : 'play'}"></i></button>
                    <button type="button" class="btn-icon btn-icon-danger" title="حذف" onclick="Clinic.deleteClinicStaffMember('${Utils.escapeAttr(s.id)}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        }).join('') : `<tr><td colspan="4" class="text-center text-gray-500 py-4">لا يوجد مسئولون — أضف من القائمة</td></tr>`) : '';

        const adminNavSections = [
            { id: 'clinic-attendance-section-records', label: 'سجل الحضور', icon: 'fa-clipboard-user' },
            { id: 'clinic-staff-activities-section', label: 'نشاط المستخدمين', icon: 'fa-history' },
            { id: 'clinic-leave-balances-section', label: 'أرصدة الإجازات', icon: 'fa-wallet' },
            { id: 'clinic-approved-timeoff-section', label: 'الإجازات المعتمدة', icon: 'fa-check-circle' }
        ];
        if (isAdmin) {
            adminNavSections.push({ id: 'clinic-attendance-section-staff', label: 'مسئولو العيادة', icon: 'fa-users' });
        }

        panel.innerHTML = `
            <div id="clinic-attendance-root" style="font-family:inherit;">
                ${this.renderAttendanceQuickNav(adminNavSections)}
                <!-- KPI -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:10px;margin-bottom:14px;">
                    ${[
                        { label: 'حاضرون اليوم', value: presentToday, icon: 'fa-user-check', color: '#059669', bg: '#ecfdf5' },
                        { label: 'بدون تسجيل خروج', value: openSessions, icon: 'fa-door-open', color: '#d97706', bg: '#fffbeb' },
                        { label: 'نتائج الفلتر', value: rows.length, icon: 'fa-filter', color: '#2563eb', bg: '#eff6ff' },
                        { label: 'مسئولون نشطون', value: activeStaff.length, icon: 'fa-users', color: '#4f46e5', bg: '#eef2ff' }
                    ].map(k => `
                        <div style="background:${k.bg};border:1px solid rgba(0,0,0,0.04);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;">
                            <div style="width:40px;height:40px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
                                <i class="fas ${k.icon}" style="color:${k.color};font-size:1rem;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-size:0.72rem;color:#64748b;font-weight:600;">${k.label}</p>
                                <p style="margin:2px 0 0;font-size:1.45rem;font-weight:800;color:${k.color};line-height:1.1;">${k.value}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- شريط الأدوات -->
                <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px;padding:14px 18px;background:linear-gradient(125deg,#0b2a55 0%,#1e3a75 70%,#245a9b 100%);border-radius:14px;color:#fff;box-shadow:0 10px 28px rgba(11,42,85,.25);">
                    <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                        <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
                            <div style="width:42px;height:42px;background:rgba(255,255,255,0.16);border-radius:11px;display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-clipboard-user" style="font-size:18px;"></i>
                            </div>
                            <div>
                                <h3 style="margin:0;font-size:1rem;font-weight:700;">سجل حضور مسئولي العيادة</h3>
                                <p style="margin:0;font-size:0.72rem;opacity:0.88;">تسجيل تلقائي عند الدخول والخروج • ${dataLoading && rows.length === 0 ? 'جاري تحميل البيانات...' : `${allAttendance.length} سجل إجمالي`}</p>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;overflow-x:auto;padding-bottom:2px;-webkit-overflow-scrolling:touch;">
                        ${isAdmin ? `
                        <div style="display:flex;align-items:center;gap:6px;flex-wrap:nowrap;flex-shrink:0;padding:6px 8px;background:rgba(0,0,0,0.18);border-radius:10px;border:1px solid rgba(255,255,255,0.2);">
                            <span style="font-size:0.68rem;font-weight:700;opacity:0.85;margin-inline:4px;white-space:nowrap;">إدارة:</span>
                            <button type="button" id="clinic-attendance-shift-rules-btn" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:#fbbf24;color:#78350f;font-size:0.76rem;font-weight:800;display:flex;align-items:center;gap:5px;white-space:nowrap;flex-shrink:0;" title="مواعيد الورديات والقواعد"><i class="fas fa-clock"></i><span>الورديات</span></button>
                            <button type="button" id="clinic-attendance-add-punch-btn" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:#fff;color:#0b2a55;font-size:0.76rem;font-weight:800;display:flex;align-items:center;gap:5px;white-space:nowrap;flex-shrink:0;" title="إضافة سجل حضور أو بصمة مفقودة"><i class="fas fa-fingerprint"></i><span>بصمة مفقودة</span></button>
                            <button type="button" id="clinic-attendance-add-staff-btn" style="padding:7px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#0b2a55;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;white-space:nowrap;flex-shrink:0;"><i class="fas fa-user-plus"></i><span>إضافة مسئول</span></button>
                        </div>` : ''}
                        <span style="font-size:0.72rem;opacity:0.9;">الفترة:</span>
                        ${['today', 'week', 'month', 'all'].map(p => {
                            const active = period === p;
                            return `<button type="button" class="clinic-attendance-period-btn" data-period="${p}" style="padding:5px 11px;border-radius:8px;border:none;cursor:pointer;font-size:0.74rem;font-weight:600;transition:all .2s;background:${active ? '#fff' : 'rgba(255,255,255,0.14)'};color:${active ? '#0b2a55' : '#fff'};">${periodLabels[p]}</button>`;
                        }).join('')}
                        <button type="button" id="clinic-attendance-toggle-filters" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.35);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                            <i class="fas fa-sliders-h"></i><span>فلاتر</span>
                            ${activeFilterCount ? `<span style="background:#fbbf24;color:#78350f;font-size:0.65rem;padding:1px 6px;border-radius:10px;">${activeFilterCount}</span>` : ''}
                        </button>
                        <button type="button" id="clinic-attendance-refresh-btn" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.14);color:#fff;font-size:0.76rem;" title="تحديث من الخادم"><i class="fas fa-sync-alt${dataLoading ? ' fa-spin' : ''}"></i></button>
                        <button type="button" id="clinic-attendance-report-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.92);color:#0b2a55;font-size:0.76rem;font-weight:700;display:flex;align-items:center;gap:5px;" title="تصدير تقرير"><i class="fas fa-file-export"></i><span>تقرير</span></button>
                        <button type="button" id="clinic-attendance-pdf-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="PDF للفلتر الحالي"><i class="fas fa-file-pdf"></i><span>PDF</span></button>
                        <button type="button" id="clinic-attendance-export-btn" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:rgba(0,0,0,0.22);color:#fff;font-size:0.76rem;font-weight:600;display:flex;align-items:center;gap:5px;" title="Excel للفلتر الحالي"><i class="fas fa-file-excel"></i><span>Excel</span></button>
                    </div>
                </div>

                <!-- لوحة الفلاتر -->
                <div id="clinic-attendance-filter-panel" style="display:${filterPanelOpen ? 'block' : 'none'};margin-bottom:14px;">
                    <div id="clinic-attendance-filter-grid" class="registry-filter-grid" role="search" aria-label="فلاتر سجل حضور العيادة">
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-search"><i class="fas fa-search"></i>بحث</label>
                            <input type="search" id="clinic-attendance-search" class="form-input" placeholder="اسم المسئول أو البريد..." value="${Utils.escapeAttr(filters.search || '')}" autocomplete="off">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-month"><i class="fas fa-calendar-alt"></i>الشهر</label>
                            <input type="month" id="clinic-attendance-month" class="form-input" value="${Utils.escapeAttr(filters.month || '')}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-staff"><i class="fas fa-user"></i>المسئول</label>
                            <select id="clinic-attendance-staff" class="form-input">
                                <option value="all" ${!filters.staffId || filters.staffId === 'all' ? 'selected' : ''}>كل المسئولين</option>
                                ${staffFilterOpts}
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-role"><i class="fas fa-user-tag"></i>الدور</label>
                            <select id="clinic-attendance-role" class="form-input">
                                <option value="all" ${filters.staffRole === 'all' || !filters.staffRole ? 'selected' : ''}>كل الأدوار</option>
                                <option value="doctor" ${filters.staffRole === 'doctor' ? 'selected' : ''}>طبيب</option>
                                <option value="nurse" ${filters.staffRole === 'nurse' ? 'selected' : ''}>تمريض</option>
                                <option value="clinic_officer" ${filters.staffRole === 'clinic_officer' ? 'selected' : ''}>مسئول عيادة</option>
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-status"><i class="fas fa-circle-check"></i>الحالة</label>
                            <select id="clinic-attendance-status" class="form-input">
                                <option value="all" ${filters.status === 'all' || !filters.status ? 'selected' : ''}>كل الحالات</option>
                                <option value="present" ${filters.status === 'present' ? 'selected' : ''}>حاضر</option>
                                <option value="partial" ${filters.status === 'partial' ? 'selected' : ''}>خروج جزئي</option>
                                <option value="absent" ${filters.status === 'absent' ? 'selected' : ''}>غائب</option>
                            </select>
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-from"><i class="fas fa-calendar-day"></i>من تاريخ الحضور</label>
                            <input type="date" id="clinic-attendance-from" class="form-input" value="${Utils.escapeAttr(filters.dateFrom || '')}">
                        </div>
                        <div class="registry-filter-field">
                            <label for="clinic-attendance-to"><i class="fas fa-calendar-check"></i>إلى تاريخ الحضور</label>
                            <input type="date" id="clinic-attendance-to" class="form-input" value="${Utils.escapeAttr(filters.dateTo || '')}">
                        </div>
                        <div class="registry-filter-field tx-reg-filter-actions">
                            <button type="button" id="clinic-attendance-reset-filters" class="registry-filter-reset-btn"><i class="fas fa-rotate-left"></i>إعادة تعيين الفلاتر</button>
                        </div>
                    </div>
                    ${activeFilterCount ? `
                    <div style="margin-top:12px;padding-top:10px;border-top:1px dashed #bfdbfe;display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
                        <span style="font-size:0.72rem;color:#64748b;font-weight:600;">الفلاتر المطبّقة:</span>
                        ${filters.search ? `<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">بحث: ${Utils.escapeHTML(String(filters.search).slice(0, 24))}</span>` : ''}
                        ${filters.staffRole && filters.staffRole !== 'all' ? `<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML(this.getStaffRoleLabel(filters.staffRole))}</span>` : ''}
                        ${filters.staffId && filters.staffId !== 'all' ? `<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML((staffFilterOptions.find(s => String(s.id) === String(filters.staffId)) || {}).name || filters.staffId)}</span>` : ''}
                        ${filters.month ? `<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">شهر ${Utils.escapeHTML(filters.month)}</span>` : ''}
                        ${filters.status && filters.status !== 'all' ? `<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">${Utils.escapeHTML(this.getAttendanceStatusLabel(filters.status))}</span>` : ''}
                        ${filters.dateFrom ? `<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">من ${Utils.escapeHTML(filters.dateFrom)}</span>` : ''}
                        ${filters.dateTo ? `<span style="background:#fff;border:1px solid #bfdbfe;color:#1e40af;padding:3px 8px;border-radius:999px;font-size:0.72rem;">إلى ${Utils.escapeHTML(filters.dateTo)}</span>` : ''}
                    </div>` : ''}
                </div>

                <p style="font-size:0.78rem;color:#64748b;margin:0 0 10px;display:flex;align-items:center;gap:6px;">
                    <i class="fas fa-info-circle" style="color:#2563eb;"></i>
                    يُسجَّل الحضور تلقائياً عند تسجيل الدخول/الخروج. يمكن إضافة بصمة دخول أو خروج مفقودة من عمود الإجراءات.
                </p>

                <div class="content-card" id="clinic-attendance-section-records" style="margin:0;">
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table table-header-green">
                            <thead><tr>
                                <th>الاسم</th><th>البريد</th><th>الدور</th><th>التاريخ</th>
                                <th>وقت الدخول</th><th>وقت الخروج</th><th>مدة (س)</th><th>الحالة</th><th>الجلسة</th><th>إجراءات</th>
                            </tr></thead>
                            <tbody>${tableRows}</tbody>
                        </table>`, '48vh')}
                    </div>
                </div>

                ${this.renderClinicStaffActivitiesSection({
                    showUserColumn: true,
                    activities: activityList,
                    loading: activitiesLoading,
                    title: 'نشاط المستخدمين داخل النظام'
                })}

                ${this.renderClinicStaffLeaveBalancesSection({
                    balances: leaveBalances,
                    loading: balancesLoading,
                    month: balancePeriods.month,
                    year: balancePeriods.year
                })}

                ${this.renderApprovedTimeOffRequestsSection(leaveBalances, balancePeriods.month)}

                ${isAdmin ? `
                <div class="content-card mt-4" id="clinic-attendance-section-staff">
                    <div class="card-header" style="padding:14px 18px;border-bottom:1px solid #f1f5f9;">
                        <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#0b2a55;"><i class="fas fa-users ml-2" style="color:#2563eb;"></i>قائمة مسئولي العيادة</h4>
                    </div>
                    <div class="card-body" style="padding:0;">
                        ${this._clinicAttendanceScrollTable(`<table class="data-table">
                            <thead><tr><th>الاسم</th><th>الدور</th><th>الحالة</th><th>إجراءات</th></tr></thead>
                            <tbody>${staffAdminRows}</tbody>
                        </table>`)}
                    </div>
                </div>` : ''}
            </div>`;

        const readFilterInputs = () => {
            const month = document.getElementById('clinic-attendance-month')?.value || '';
            let dateFrom = document.getElementById('clinic-attendance-from')?.value || '';
            let dateTo = document.getElementById('clinic-attendance-to')?.value || '';
            if (month && !dateFrom && !dateTo) {
                const mr = this._getAttendanceMonthRange(month);
                dateFrom = mr.dateFrom;
                dateTo = mr.dateTo;
            } else {
                const range = this._normalizeAttendanceDateRange(dateFrom, dateTo);
                dateFrom = range.dateFrom;
                dateTo = range.dateTo;
            }
            return {
                search: document.getElementById('clinic-attendance-search')?.value || '',
                staffRole: document.getElementById('clinic-attendance-role')?.value || 'all',
                status: document.getElementById('clinic-attendance-status')?.value || 'all',
                staffId: document.getElementById('clinic-attendance-staff')?.value || 'all',
                month,
                dateFrom,
                dateTo,
                period: this.state.filters.attendance?.period || 'all'
            };
        };

        const applyFilters = () => {
            this.state.filters.attendance = readFilterInputs.call(this);
            this.renderAttendanceTab({ force: true });
        };

        const applyPeriodPreset = (preset) => {
            const today = this._getTodayLocalKey();
            let dateFrom = '';
            let dateTo = '';
            if (preset === 'today') {
                dateFrom = today;
                dateTo = today;
            } else if (preset === 'week') {
                const d = new Date();
                d.setDate(d.getDate() - 6);
                dateFrom = this._attendanceDayKey(d);
                dateTo = today;
            } else if (preset === 'month') {
                const d = new Date();
                d.setDate(d.getDate() - 29);
                dateFrom = this._attendanceDayKey(d);
                dateTo = today;
            }
            this.state.filters.attendance = Object.assign({}, this.state.filters.attendance || {}, {
                period: preset,
                month: '',
                dateFrom,
                dateTo
            });
            this.renderAttendanceTab({ force: true });
        };

        const searchEl = panel.querySelector('#clinic-attendance-search');
        searchEl?.addEventListener('input', (e) => {
            this._attendanceSearchFocused = true;
            this._attendanceSearchCursor = e.target.selectionStart;
            clearTimeout(this._attendanceSearchTimer);
            this._attendanceSearchTimer = setTimeout(applyFilters, 280);
        });
        searchEl?.addEventListener('focus', () => { this._attendanceSearchFocused = true; });
        searchEl?.addEventListener('blur', () => { this._attendanceSearchFocused = false; });

        panel.querySelector('#clinic-attendance-role')?.addEventListener('change', applyFilters);
        panel.querySelector('#clinic-attendance-status')?.addEventListener('change', applyFilters);
        panel.querySelector('#clinic-attendance-staff')?.addEventListener('change', applyFilters);
        panel.querySelector('#clinic-attendance-month')?.addEventListener('change', () => {
            const month = document.getElementById('clinic-attendance-month')?.value || '';
            const mr = month ? this._getAttendanceMonthRange(month) : { dateFrom: '', dateTo: '' };
            this.state.filters.attendance = Object.assign({}, readFilterInputs.call(this), {
                month,
                dateFrom: mr.dateFrom,
                dateTo: mr.dateTo,
                period: 'monthPick'
            });
            applyFilters();
        });
        panel.querySelector('#clinic-attendance-from')?.addEventListener('change', () => {
            this.state.filters.attendance = Object.assign({}, readFilterInputs.call(this), { month: '', period: 'custom' });
            applyFilters();
        });
        panel.querySelector('#clinic-attendance-to')?.addEventListener('change', () => {
            this.state.filters.attendance = Object.assign({}, readFilterInputs.call(this), { month: '', period: 'custom' });
            applyFilters();
        });

        panel.querySelector('#clinic-attendance-reset-filters')?.addEventListener('click', () => {
            this.state.filters.attendance = { search: '', staffRole: 'all', status: 'all', staffId: 'all', month: '', dateFrom: '', dateTo: '', period: 'all' };
            this.renderAttendanceTab({ force: true });
        });

        panel.querySelector('#clinic-attendance-toggle-filters')?.addEventListener('click', () => {
            this.state.attendanceFilterPanelOpen = !filterPanelOpen;
            const fp = panel.querySelector('#clinic-attendance-filter-panel');
            if (fp) fp.style.display = this.state.attendanceFilterPanelOpen ? 'block' : 'none';
        });

        panel.querySelectorAll('.clinic-attendance-period-btn').forEach(btn => {
            btn.addEventListener('click', () => applyPeriodPreset(btn.dataset.period || 'all'));
        });

        panel.querySelector('#clinic-attendance-export-btn')?.addEventListener('click', () => this.exportAttendanceToExcel());
        panel.querySelector('#clinic-attendance-pdf-btn')?.addEventListener('click', () => this.exportAttendanceToPDF());
        panel.querySelector('#clinic-attendance-report-btn')?.addEventListener('click', () => this.showAttendanceReportModal());
        panel.querySelector('#clinic-attendance-add-staff-btn')?.addEventListener('click', () => this.showAddClinicStaffModal());
        panel.querySelector('#clinic-attendance-add-punch-btn')?.addEventListener('click', () => this.showAddMissingAttendanceModal());
        panel.querySelector('#clinic-attendance-shift-rules-btn')?.addEventListener('click', () => this.showClinicShiftSettingsModal());
        panel.querySelector('#clinic-attendance-refresh-btn')?.addEventListener('click', async () => {
            Notification?.info?.('جاري تحديث سجل الحضور...');
            this._attendanceDataFetchedInSession = false;
            await this.loadClinicAttendanceData(true);
            this._attendanceDataFetchedInSession = true;
            this.renderAttendanceTab({ force: true });
            Notification?.success?.('تم التحديث');
        });

        this.bindClinicStaffActivitiesEvents(panel);
        this.bindClinicStaffLeaveBalanceEvents(panel);
        this.bindAttendanceQuickNav(panel);
        this.initAttendanceTableScroll(panel);

        if (this._attendanceSearchFocused && searchEl) {
            searchEl.focus();
            const pos = this._attendanceSearchCursor;
            if (pos != null && typeof searchEl.setSelectionRange === 'function') {
                try { searchEl.setSelectionRange(pos, pos); } catch (_e) { /* ignore */ }
            }
        }
    },
};

if (typeof Clinic !== 'undefined') {
    Object.assign(Clinic, ClinicAttendanceMixin);
}
