/**
 * ✅ ViolationApprovals.gs — دائرة اعتماد المخالفات
 *
 * عند إنشاء مخالفة جديدة بواسطة مستخدم غير مسؤول، تمر بدائرة اعتماد:
 * 1) تُسجَّل في ViolationApprovalRequests بحالة pending
 * 2) المسؤولون / المعتمدون المعيّنون يتلقون الطلب
 * 3) عند الاعتماد النهائي → تُنقل إلى Violations sheet كمخالفة فعلية
 * 4) عند الرفض → تبقى في ViolationApprovalRequests كسجل
 *
 * مدير النظام يستطيع تعديل قائمة المعتمدين الافتراضية في ViolationApprovalSettings.
 */

var VIOLATION_APPROVALS_SETTINGS_ID = 'default';
var VIOLATION_APPROVALS_SHEET = 'ViolationApprovalRequests';
var VIOLATION_APPROVALS_SETTINGS_SHEET = 'ViolationApprovalSettings';

/**
 * إضافة طلب اعتماد مخالفة جديدة
 * payload: { violationData, approvers?, notes?, createdBy?, createdByName? }
 */
function addViolationApprovalRequest(payload) {
    try {
        if (!payload || typeof payload !== 'object') {
            return { success: false, message: 'بيانات الطلب غير موجودة' };
        }

        var violationData = payload.violationData || payload;
        if (!violationData || typeof violationData !== 'object') {
            return { success: false, message: 'بيانات المخالفة غير موجودة' };
        }

        var spreadsheetId = getSpreadsheetId();

        // 🛡️ حماية حرجة (Defense-in-depth):
        // violationData يُخزَّن لاحقاً كـ JSON.stringify في خلية واحدة.
        // Google Sheets يحدّ الخلية بـ 50000 حرف، وصورة base64 بحجم 2MB ≈ 2.7M حرف.
        // إذا وصلت إلينا صورة base64 (الواجهة الأمامية يجب أن ترفعها للـ Drive أولاً،
        // لكن نضمن ذلك هنا حتى لو فشل المسار الأمامي):
        //   1) نحاول رفعها إلى Drive ووضع الرابط
        //   2) في حال الفشل، نُسقط الصورة (لا نُمرر base64 أبداً) — السجل يُحفظ بدون صورة
        if (violationData.photo && typeof violationData.photo === 'string' && violationData.photo.indexOf('data:') === 0) {
            try {
                var uploadResult = uploadFileToDrive(
                    violationData.photo,
                    'violation_' + (violationData.id || Utilities.getUuid()) + '_' + Date.now() + '.jpg',
                    'image/jpeg',
                    'Violations'
                );
                if (uploadResult && uploadResult.success) {
                    violationData.photo = uploadResult.directLink || uploadResult.shareableLink || '';
                } else {
                    Logger.log('⚠️ addViolationApprovalRequest: فشل رفع الصورة إلى Drive، سيتم حفظ الطلب بدون صورة');
                    violationData.photo = '';
                }
            } catch (imageError) {
                Logger.log('⚠️ addViolationApprovalRequest: استثناء أثناء رفع الصورة: ' + imageError.toString());
                violationData.photo = ''; // قطعي — لا نُمرر base64 للخلية
            }
        }

        // 🛡️ حماية إضافية: قص أي حقل نصي يتجاوز 49000 حرف (احتياط أمان قبل الـ 50000)
        // قبل JSON.stringify. هذا يحمي من حقول طويلة جداً (مثل وصف مفصل أو ملاحظات).
        var SAFE_CELL_TEXT_LIMIT = 49000;
        Object.keys(violationData).forEach(function (k) {
            var v = violationData[k];
            if (typeof v === 'string' && v.length > SAFE_CELL_TEXT_LIMIT) {
                Logger.log('⚠️ addViolationApprovalRequest: تم قص الحقل "' + k + '" من ' + v.length + ' إلى ' + SAFE_CELL_TEXT_LIMIT + ' حرف');
                violationData[k] = v.substring(0, SAFE_CELL_TEXT_LIMIT);
            }
        });

        // ✅ توليد ID للطلب (VAR_ prefix)
        var requestId = (payload.id && typeof payload.id === 'string' && payload.id.indexOf('VAR_') === 0)
            ? payload.id
            : generateSequentialId('VAR', VIOLATION_APPROVALS_SHEET, spreadsheetId);

        // ✅ Approvers: من payload أو من الـ default settings
        var approvers = Array.isArray(payload.approvers) ? payload.approvers : null;
        if (!approvers || approvers.length === 0) {
            var settings = getViolationApprovalSettingsInternal_(spreadsheetId);
            approvers = Array.isArray(settings.defaultApprovers) ? settings.defaultApprovers : [];
        }

        // ✅ تنسيق approvers — كل عنصر له شكل واضح
        approvers = approvers.map(function(a) {
            return {
                userId: String(a.userId || a.id || '').trim(),
                userName: String(a.userName || a.name || '').trim(),
                userEmail: String(a.userEmail || a.email || '').trim(),
                role: String(a.role || '').trim(),
                approved: false,
                approvedAt: '',
                notes: ''
            };
        }).filter(function(a) { return a.userId || a.userEmail || a.userName; });

        var requestRecord = {
            id: requestId,
            requestType: String(payload.requestType || 'add'),
            violationData: JSON.stringify(violationData),
            originalViolationId: String(payload.originalViolationId || violationData.id || ''),
            status: 'pending',
            approvers: JSON.stringify(approvers),
            currentApproverIndex: 0,
            createdBy: String(payload.createdBy || violationData.createdBy || '').trim(),
            createdByName: String(payload.createdByName || violationData.createdByName || '').trim(),
            createdAt: new Date(),
            approvedBy: '',
            approvedByName: '',
            approvedAt: '',
            rejectedBy: '',
            rejectedByName: '',
            rejectedAt: '',
            rejectionReason: '',
            finalViolationId: '',
            notes: String(payload.notes || ''),
            updatedAt: new Date(),
            updatedBy: String(payload.createdBy || '').trim()
        };

        var appendResult = appendToSheet(VIOLATION_APPROVALS_SHEET, requestRecord, spreadsheetId);
        if (!appendResult || appendResult.success !== true) {
            return { success: false, message: (appendResult && appendResult.message) || 'فشل تسجيل طلب الاعتماد' };
        }

        // ✅ إشعار المعتمدين (best-effort, لا يفشل الطلب)
        try {
            notifyViolationApprovers_(requestRecord, approvers, spreadsheetId);
        } catch (notifyErr) {
            Logger.log('⚠️ notifyViolationApprovers_ failed: ' + notifyErr.toString());
        }

        return {
            success: true,
            message: 'تم إرسال طلب الاعتماد بنجاح. سيُراجع من قبل المعتمدين.',
            data: { id: requestId, status: 'pending', approversCount: approvers.length }
        };
    } catch (error) {
        Logger.log('❌ addViolationApprovalRequest error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * الحصول على جميع طلبات اعتماد المخالفات
 * payload: { status?: 'pending'|'approved'|'rejected'|'all', userEmail?, userId? }
 */
function getAllViolationApprovalRequests(payload) {
    try {
        payload = payload || {};
        var statusFilter = String(payload.status || 'all').toLowerCase();
        var userEmail = String(payload.userEmail || '').toLowerCase().trim();
        var userId = String(payload.userId || '').trim();

        var spreadsheetId = getSpreadsheetId();
        var rows = readFromSheet(VIOLATION_APPROVALS_SHEET, spreadsheetId);
        if (!Array.isArray(rows)) rows = [];

        var result = rows.map(function(r) {
            return decodeViolationApprovalRow_(r);
        }).filter(function(r) {
            if (statusFilter !== 'all' && String(r.status || '').toLowerCase() !== statusFilter) return false;
            // فلتر بالمعتمد المعيّن (للمستخدم العادي): يظهر له الطلبات التي هو ضمن approvers
            if (userEmail || userId) {
                var approvers = Array.isArray(r.approvers) ? r.approvers : [];
                var match = approvers.some(function(a) {
                    return (userEmail && a.userEmail && a.userEmail.toLowerCase() === userEmail) ||
                           (userId && a.userId && a.userId === userId);
                });
                if (!match) return false;
            }
            return true;
        });

        // ترتيب: الأحدث أولاً
        result.sort(function(a, b) {
            var da = new Date(a.createdAt || 0).getTime();
            var db = new Date(b.createdAt || 0).getTime();
            return db - da;
        });

        return { success: true, data: result, count: result.length };
    } catch (error) {
        Logger.log('❌ getAllViolationApprovalRequests error: ' + error.toString());
        return { success: false, message: error.toString(), data: [] };
    }
}

/**
 * اعتماد طلب مخالفة
 * payload: { requestId, approver: {userId, userName, userEmail}, notes?, force? }
 * - force=true → اعتماد فوري وكتابة المخالفة (لمدير النظام)
 * - بدون force → اعتماد الخطوة الحالية في الدائرة فقط
 */
function approveViolationApprovalRequest(payload) {
    try {
        if (!payload || !payload.requestId) {
            return { success: false, message: 'معرف الطلب غير محدد' };
        }
        var approver = payload.approver || {};
        if (!approver.userId && !approver.userEmail && !approver.userName) {
            return { success: false, message: 'بيانات المعتمد غير محددة' };
        }

        var spreadsheetId = getSpreadsheetId();
        var request = findViolationApprovalRequest_(payload.requestId, spreadsheetId);
        if (!request) return { success: false, message: 'الطلب غير موجود' };

        if (request.status === 'approved' || request.status === 'committed') {
            return { success: false, message: 'الطلب معتمد بالفعل' };
        }
        if (request.status === 'rejected') {
            return { success: false, message: 'الطلب مرفوض ولا يمكن اعتماده' };
        }

        var approvers = Array.isArray(request.approvers) ? request.approvers : [];
        var force = payload.force === true;
        var currentIdx = parseInt(request.currentApproverIndex, 10) || 0;

        var nowIso = new Date().toISOString();

        if (force || approvers.length === 0) {
            // ✅ اعتماد فوري كامل (مدير) → الكل approved
            approvers.forEach(function(a) { a.approved = true; a.approvedAt = nowIso; });
            currentIdx = approvers.length;
        } else {
            // ✅ نضع approved=true في خطوة المعتمد الحالي
            if (currentIdx >= approvers.length) currentIdx = approvers.length - 1;
            var currentApprover = approvers[currentIdx] || {};

            // التحقق أن المعتمد الحالي هو من ضمن قائمة approvers (أو مدير)
            var isAuthorized = isApproverAuthorized_(approver, approvers, currentIdx);
            if (!isAuthorized) {
                return { success: false, message: 'غير مسموح لك باعتماد هذا الطلب (لست المعتمد الحالي)' };
            }

            currentApprover.approved = true;
            currentApprover.approvedAt = nowIso;
            currentApprover.approvedBy = String(approver.userId || approver.userEmail || approver.userName || '');
            currentApprover.notes = String(payload.notes || currentApprover.notes || '');
            currentIdx = currentIdx + 1;
        }

        var allApproved = currentIdx >= approvers.length;
        var newStatus = allApproved ? 'approved' : 'pending';

        var updateData = {
            approvers: JSON.stringify(approvers),
            currentApproverIndex: currentIdx,
            status: newStatus,
            updatedAt: new Date(),
            updatedBy: String(approver.userId || approver.userEmail || '')
        };

        if (allApproved) {
            updateData.approvedAt = new Date();
            updateData.approvedBy = String(approver.userId || approver.userEmail || '');
            updateData.approvedByName = String(approver.userName || '');

            // ✅ إنشاء المخالفة الفعلية في Violations sheet
            try {
                var commitResult = commitViolationFromApproval_(request, spreadsheetId);
                if (commitResult && commitResult.success) {
                    updateData.finalViolationId = String(commitResult.violationId || '');
                    updateData.status = 'committed';
                } else {
                    Logger.log('⚠️ commitViolationFromApproval_ failed: ' + (commitResult && commitResult.message));
                    // نبقي على status='approved' لإعادة المحاولة لاحقاً
                }
            } catch (commitErr) {
                Logger.log('❌ commit error: ' + commitErr.toString());
            }
        }

        updateSingleRowInSheet(VIOLATION_APPROVALS_SHEET, payload.requestId, updateData, spreadsheetId);

        // ✅ إشعار المُرسِل الأصلي بحالة الاعتماد (فقط عند الاعتماد النهائي)
        if (allApproved) {
            try { notifyViolationSubmitter_(request, 'approved', approver, '', spreadsheetId); }
            catch (notifyErr) { Logger.log('⚠️ notifyViolationSubmitter_(approved) failed: ' + notifyErr.toString()); }
        }

        return {
            success: true,
            message: allApproved ? 'تم اعتماد المخالفة وإضافتها بنجاح' : 'تم اعتماد الخطوة. باقي ' + (approvers.length - currentIdx) + ' معتمدين',
            data: { status: updateData.status, currentApproverIndex: currentIdx, finalViolationId: updateData.finalViolationId || '' }
        };
    } catch (error) {
        Logger.log('❌ approveViolationApprovalRequest error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * رفض طلب اعتماد مخالفة
 * payload: { requestId, approver, reason }
 */
function rejectViolationApprovalRequest(payload) {
    try {
        if (!payload || !payload.requestId) {
            return { success: false, message: 'معرف الطلب غير محدد' };
        }
        var approver = payload.approver || {};
        var reason = String(payload.reason || '').trim();
        if (!reason) return { success: false, message: 'سبب الرفض إلزامي' };

        var spreadsheetId = getSpreadsheetId();
        var request = findViolationApprovalRequest_(payload.requestId, spreadsheetId);
        if (!request) return { success: false, message: 'الطلب غير موجود' };
        if (request.status === 'approved' || request.status === 'committed') {
            return { success: false, message: 'الطلب معتمد بالفعل ولا يمكن رفضه' };
        }

        var updateData = {
            status: 'rejected',
            rejectedAt: new Date(),
            rejectedBy: String(approver.userId || approver.userEmail || ''),
            rejectedByName: String(approver.userName || ''),
            rejectionReason: reason,
            updatedAt: new Date(),
            updatedBy: String(approver.userId || approver.userEmail || '')
        };

        updateSingleRowInSheet(VIOLATION_APPROVALS_SHEET, payload.requestId, updateData, spreadsheetId);

        // ✅ إشعار المُرسِل الأصلي بحالة الرفض مع السبب
        try { notifyViolationSubmitter_(request, 'rejected', approver, reason, spreadsheetId); }
        catch (notifyErr) { Logger.log('⚠️ notifyViolationSubmitter_(rejected) failed: ' + notifyErr.toString()); }

        return { success: true, message: 'تم رفض الطلب بنجاح' };
    } catch (error) {
        Logger.log('❌ rejectViolationApprovalRequest error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * تحديث إعدادات دائرة اعتماد المخالفات
 * payload: { requireApproval, defaultApprovers: [...], bypassRoles: [...], updatedBy, updatedByName }
 */
function updateViolationApprovalSettings(payload) {
    try {
        payload = payload || {};
        var spreadsheetId = getSpreadsheetId();

        var defaultApprovers = Array.isArray(payload.defaultApprovers) ? payload.defaultApprovers : [];
        defaultApprovers = defaultApprovers.map(function(a) {
            return {
                userId: String(a.userId || a.id || '').trim(),
                userName: String(a.userName || a.name || '').trim(),
                userEmail: String(a.userEmail || a.email || '').trim(),
                role: String(a.role || '').trim()
            };
        }).filter(function(a) { return a.userId || a.userEmail || a.userName; });

        var bypassRoles = Array.isArray(payload.bypassRoles) ? payload.bypassRoles : ['admin', 'مدير النظام'];

        var settingsRecord = {
            id: VIOLATION_APPROVALS_SETTINGS_ID,
            requireApproval: payload.requireApproval === true || payload.requireApproval === 'true',
            defaultApprovers: JSON.stringify(defaultApprovers),
            bypassRoles: JSON.stringify(bypassRoles),
            updatedBy: String(payload.updatedBy || ''),
            updatedByName: String(payload.updatedByName || ''),
            updatedAt: new Date(),
            createdAt: new Date()
        };

        // ✅ Upsert: نحاول التحديث أولاً، فإذا غير موجود نضيف
        var updateResult = updateSingleRowInSheet(VIOLATION_APPROVALS_SETTINGS_SHEET, VIOLATION_APPROVALS_SETTINGS_ID, settingsRecord, spreadsheetId);
        if (!updateResult || updateResult.success !== true) {
            // غير موجود → نضيف صف جديد
            appendToSheet(VIOLATION_APPROVALS_SETTINGS_SHEET, settingsRecord, spreadsheetId);
        }

        return {
            success: true,
            message: 'تم حفظ إعدادات دائرة الاعتماد',
            data: {
                requireApproval: settingsRecord.requireApproval,
                defaultApprovers: defaultApprovers,
                bypassRoles: bypassRoles
            }
        };
    } catch (error) {
        Logger.log('❌ updateViolationApprovalSettings error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * الحصول على إعدادات دائرة اعتماد المخالفات
 */
function getViolationApprovalSettings(payload) {
    try {
        var spreadsheetId = getSpreadsheetId();
        var settings = getViolationApprovalSettingsInternal_(spreadsheetId);
        return { success: true, data: settings };
    } catch (error) {
        Logger.log('❌ getViolationApprovalSettings error: ' + error.toString());
        return { success: false, message: error.toString(), data: { requireApproval: false, defaultApprovers: [], bypassRoles: ['admin', 'مدير النظام'] } };
    }
}

// ─────────────────────── helpers ───────────────────────

function getViolationApprovalSettingsInternal_(spreadsheetId) {
    try {
        var rows = readFromSheet(VIOLATION_APPROVALS_SETTINGS_SHEET, spreadsheetId);
        if (!Array.isArray(rows) || rows.length === 0) {
            return { requireApproval: false, defaultApprovers: [], bypassRoles: ['admin', 'مدير النظام'] };
        }
        var row = rows.find(function(r) { return r && String(r.id) === VIOLATION_APPROVALS_SETTINGS_ID; }) || rows[0];
        var defaultApprovers = parseJsonSafe_(row.defaultApprovers, []);
        var bypassRoles = parseJsonSafe_(row.bypassRoles, ['admin', 'مدير النظام']);
        return {
            requireApproval: row.requireApproval === true || row.requireApproval === 'true' || row.requireApproval === 1,
            defaultApprovers: Array.isArray(defaultApprovers) ? defaultApprovers : [],
            bypassRoles: Array.isArray(bypassRoles) ? bypassRoles : ['admin', 'مدير النظام']
        };
    } catch (e) {
        return { requireApproval: false, defaultApprovers: [], bypassRoles: ['admin', 'مدير النظام'] };
    }
}

function findViolationApprovalRequest_(requestId, spreadsheetId) {
    var rows = readFromSheet(VIOLATION_APPROVALS_SHEET, spreadsheetId);
    if (!Array.isArray(rows)) return null;
    var row = rows.find(function(r) { return r && String(r.id) === String(requestId); });
    if (!row) return null;
    return decodeViolationApprovalRow_(row);
}

function decodeViolationApprovalRow_(row) {
    if (!row) return null;
    var decoded = {};
    for (var k in row) {
        if (row.hasOwnProperty(k)) decoded[k] = row[k];
    }
    decoded.violationData = parseJsonSafe_(row.violationData, {});
    decoded.approvers = parseJsonSafe_(row.approvers, []);
    return decoded;
}

function parseJsonSafe_(value, fallback) {
    if (value == null || value === '') return fallback;
    if (typeof value === 'object') return value;
    try {
        var parsed = JSON.parse(String(value));
        return parsed !== undefined ? parsed : fallback;
    } catch (e) {
        return fallback;
    }
}

function isApproverAuthorized_(approver, approvers, currentIdx) {
    if (!approver) return false;
    var aId = String(approver.userId || '').trim();
    var aEmail = String(approver.userEmail || '').trim().toLowerCase();
    var aName = String(approver.userName || '').trim();
    if (!aId && !aEmail && !aName) return false;

    // المعتمد الحالي بالضبط
    var current = approvers[currentIdx];
    if (current) {
        if (aId && current.userId && String(current.userId).trim() === aId) return true;
        if (aEmail && current.userEmail && String(current.userEmail).toLowerCase() === aEmail) return true;
        if (aName && current.userName && String(current.userName).trim() === aName) return true;
    }

    // أو أي معتمد في القائمة (مرونة في حال كانوا متوازين)
    return approvers.some(function(a) {
        if (aId && a.userId && String(a.userId).trim() === aId) return true;
        if (aEmail && a.userEmail && String(a.userEmail).toLowerCase() === aEmail) return true;
        if (aName && a.userName && String(a.userName).trim() === aName) return true;
        return false;
    });
}

function commitViolationFromApproval_(request, spreadsheetId) {
    try {
        var violationData = request.violationData || {};
        if (!violationData || typeof violationData !== 'object') {
            return { success: false, message: 'بيانات المخالفة غير صالحة' };
        }

        // إذا كان طلب تعديل → نستخدم updateViolation
        if (String(request.requestType || 'add') === 'update' && request.originalViolationId) {
            var updRes = (typeof updateViolation === 'function')
                ? updateViolation(request.originalViolationId, violationData)
                : { success: false, message: 'updateViolation غير متاح' };
            return {
                success: !!(updRes && updRes.success),
                message: (updRes && updRes.message) || '',
                violationId: request.originalViolationId
            };
        }

        // إضافة مخالفة جديدة
        if (typeof addViolation === 'function') {
            var addRes = addViolation(violationData);
            return {
                success: !!(addRes && addRes.success),
                message: (addRes && addRes.message) || '',
                violationId: (addRes && addRes.data && addRes.data.id) || violationData.id || ''
            };
        }
        if (typeof addViolationToSheet === 'function') {
            var addRes2 = addViolationToSheet(violationData);
            return {
                success: !!(addRes2 && addRes2.success),
                message: (addRes2 && addRes2.message) || '',
                violationId: violationData.id || ''
            };
        }

        // Fallback: append إلى Violations sheet مباشرة
        if (!violationData.id) {
            violationData.id = generateSequentialId('VIO', 'Violations', spreadsheetId);
        }
        var appRes = appendToSheet('Violations', violationData, spreadsheetId);
        return {
            success: !!(appRes && appRes.success),
            message: (appRes && appRes.message) || '',
            violationId: violationData.id
        };
    } catch (error) {
        Logger.log('❌ commitViolationFromApproval_ error: ' + error.toString());
        return { success: false, message: error.toString() };
    }
}

function notifyViolationApprovers_(request, approvers, spreadsheetId) {
    // best-effort: نسجّل إشعارات للنظام الداخلي إن وُجد نظام Notifications
    try {
        if (typeof appendToSheet !== 'function') return;
        var notificationsSheet = 'Notifications';
        approvers.forEach(function(a) {
            var notifId = generateSequentialId('NOT', notificationsSheet, spreadsheetId);
            var notifRecord = {
                id: notifId,
                userId: a.userId || a.userEmail || '',
                userEmail: a.userEmail || '',
                title: 'طلب اعتماد مخالفة جديد',
                message: 'هناك مخالفة بانتظار اعتمادك. رقم الطلب: ' + request.id,
                type: 'violation_approval_pending',
                priority: 'medium',
                relatedId: request.id,
                relatedType: 'ViolationApprovalRequest',
                read: false,
                createdAt: new Date()
            };
            try { appendToSheet(notificationsSheet, notifRecord, spreadsheetId); } catch (e) { /* ignore */ }
        });
    } catch (e) {
        // تجاهل أخطاء الإشعارات
    }
}

/**
 * إشعار المُرسِل الأصلي (createdBy) بحالة طلب اعتماد المخالفة (اعتُمد / رُفض).
 * يُكتب صف في ورقة Notifications ليظهر في جرس الإشعارات لدى المستخدم.
 *
 * @param {Object} request - سجل الطلب من ViolationApprovalRequests
 * @param {string} outcome - 'approved' أو 'rejected'
 * @param {Object} approver - بيانات من اعتمد/رفض
 * @param {string} [reason] - سبب الرفض (إن كان outcome === 'rejected')
 * @param {string} spreadsheetId
 */
function notifyViolationSubmitter_(request, outcome, approver, reason, spreadsheetId) {
    try {
        if (typeof appendToSheet !== 'function') return;
        if (!request) return;

        var submitterId = String(request.createdBy || '').trim();
        // createdBy قد يكون email أو userId — نضعه في كلا الحقلين للسلامة
        if (!submitterId) return;

        var isEmail = submitterId.indexOf('@') > -1;
        var notificationsSheet = 'Notifications';

        var title, message, type;
        if (outcome === 'approved') {
            title = '✅ تم اعتماد مخالفتك';
            message = 'تم اعتماد طلب المخالفة الذي أرسلته (' + request.id + ') من قبل ' + (approver.userName || approver.userEmail || 'المعتمد') + '.';
            type = 'violation_approval_approved';
        } else if (outcome === 'rejected') {
            title = '❌ تم رفض مخالفتك';
            message = 'تم رفض طلب المخالفة (' + request.id + ') من قبل ' + (approver.userName || approver.userEmail || 'المعتمد') + '.';
            if (reason) message += ' السبب: ' + reason;
            type = 'violation_approval_rejected';
        } else {
            return; // outcome غير معروف
        }

        var notifId = generateSequentialId('NOT', notificationsSheet, spreadsheetId);
        var notifRecord = {
            id: notifId,
            userId: isEmail ? '' : submitterId,
            userEmail: isEmail ? submitterId : (request.createdByEmail || ''),
            title: title,
            message: message,
            type: type,
            priority: outcome === 'rejected' ? 'high' : 'medium',
            relatedId: request.id,
            relatedType: 'ViolationApprovalRequest',
            read: false,
            createdAt: new Date()
        };
        try { appendToSheet(notificationsSheet, notifRecord, spreadsheetId); } catch (e) { /* ignore */ }
    } catch (e) {
        Logger.log('notifyViolationSubmitter_ failed: ' + e.toString());
    }
}
