/**
 * محرك إرسال البريد المباشر — MailApp فقط.
 * يحترم Email_Settings قبل أي إرسال.
 */

var EMAIL_SEND_MAX_RECIPIENTS = 20;

function escapeHtmlEmail_(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildEmailHtmlBody_(title, fields, extraHtml) {
    var rows = '';
    (fields || []).forEach(function (f) {
        if (!f || !f.label) return;
        var val = f.value == null ? '' : String(f.value);
        if (!String(val).trim()) return;
        rows += '<tr>' +
            '<td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:600;width:34%;">' +
            escapeHtmlEmail_(f.label) + '</td>' +
            '<td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">' +
            escapeHtmlEmail_(val).replace(/\n/g, '<br>') + '</td></tr>';
    });
    var bodyExtra = extraHtml ? String(extraHtml) : '';
    return '<div style="font-family:Tahoma,Arial,sans-serif;direction:rtl;text-align:right;color:#111827;">' +
        '<h2 style="color:#0f766e;margin:0 0 12px;">' + escapeHtmlEmail_(title || 'تفاصيل من نظام HSE') + '</h2>' +
        (rows ? '<table style="border-collapse:collapse;width:100%;max-width:720px;">' + rows + '</table>' : '') +
        (bodyExtra ? '<div style="margin-top:16px;">' + bodyExtra + '</div>' : '') +
        '<p style="margin-top:20px;font-size:12px;color:#6b7280;">رسالة تلقائية من نظام إدارة السلامة HSE.</p></div>';
}

function sanitizeEmailHtmlBody_(html) {
    var s = String(html || '');
    // إزالة سكربتات وروابط جافاسكربت فقط — بدون تدمير HTML البسيط
    s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
    s = s.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '');
    s = s.replace(/javascript:/gi, '');
    if (s.length > 200000) s = s.slice(0, 200000);
    return s;
}

/**
 * تحويل مرفقات base64 إلى Blobs آمنة.
 * attachments: [{ name, base64 }] — حد أقصى 5 مرفقات و 4MB إجمالي.
 */
function buildEmailAttachments_(attachments) {
    var out = [];
    if (!Array.isArray(attachments) || !attachments.length) return out;
    var totalBytes = 0;
    attachments.slice(0, 5).forEach(function (att) {
        if (!att || !att.name || !att.base64) return;
        try {
            var clean = String(att.base64).replace(/^data:[^;]+;base64,/, '').replace(/\s+/g, '');
            var bytes = Utilities.base64Decode(clean);
            totalBytes += bytes.length;
            if (totalBytes > 4 * 1024 * 1024) return;
            out.push(Utilities.newBlob(bytes, 'application/pdf', String(att.name)));
        } catch (e) {
            Logger.log('buildEmailAttachments_ skip: ' + e.toString());
        }
    });
    return out;
}

/**
 * إرسال مباشر من الواجهة أو الخلفية.
 * payload: { moduleKey, recordId, subject, to[], fields[], htmlBody?, title?, plainBody?, attachments?[] }
 */
function sendDirectEmail(payload) {
    try {
        var data = payload || {};
        var moduleKey = String(data.moduleKey || '').trim();
        if (!moduleKey) {
            return { success: false, message: 'moduleKey مطلوب' };
        }
        var check = isEmailModuleAllowed_(moduleKey, 'manual');
        if (!check.allowed) {
            return { success: false, message: check.reason || 'الإرسال غير مسموح', errorCode: 'EMAIL_DISABLED' };
        }
        var recipients = resolveEmailRecipients_(moduleKey, data.to);
        if (!recipients.length) {
            return { success: false, message: 'لا يوجد مستلمون. أضف إيميلاً في الإعدادات أو عند الإرسال.' };
        }
        if (recipients.length > EMAIL_SEND_MAX_RECIPIENTS) {
            recipients = recipients.slice(0, EMAIL_SEND_MAX_RECIPIENTS);
        }

        var labelAr = (check.module && check.module.labelAr) ? check.module.labelAr : moduleKey;
        var title = String(data.title || labelAr);
        var subjectBase = String(data.subject || '').trim();
        if (!subjectBase) {
            subjectBase = title + (data.recordId ? (' — ' + data.recordId) : '');
        }
        var subject = '[HSE — ' + labelAr + '] ' + subjectBase.slice(0, 180);

        var html = '';
        if (data.htmlBody) {
            html = sanitizeEmailHtmlBody_(data.htmlBody);
        } else {
            html = buildEmailHtmlBody_(title, data.fields || [], '');
        }
        if (!html || html.length < 20) {
            return { success: false, message: 'محتوى الرسالة فارغ' };
        }

        var plain = String(data.plainBody || '') ||
            (Array.isArray(data.fields) ? data.fields.map(function (f) {
                return (f.label || '') + ': ' + (f.value == null ? '' : f.value);
            }).join('\n') : title);

        var attachmentBlobs = buildEmailAttachments_(data.attachments);

        var sent = 0;
        var errors = [];
        recipients.forEach(function (email) {
            try {
                var mailOpts = {
                    to: email,
                    subject: subject,
                    htmlBody: html,
                    body: plain
                };
                if (attachmentBlobs.length) mailOpts.attachments = attachmentBlobs;
                MailApp.sendEmail(mailOpts);
                sent++;
            } catch (mailErr) {
                errors.push(email + ': ' + mailErr.toString());
                Logger.log('sendDirectEmail fail ' + email + ': ' + mailErr.toString());
            }
        });

        if (sent === 0) {
            return {
                success: false,
                message: 'فشل الإرسال: ' + formatMailAuthError_(errors[0] || 'غير معروف'),
                errors: errors
            };
        }
        return {
            success: true,
            message: 'تم الإرسال إلى ' + sent + ' مستلم',
            sent: sent,
            failed: errors.length,
            errors: errors,
            moduleKey: moduleKey,
            recordId: data.recordId || ''
        };
    } catch (e) {
        Logger.log('sendDirectEmail: ' + e.toString());
        return { success: false, message: formatMailAuthError_(e) };
    }
}

/**
 * إرسال تجريبي — مدير فقط.
 */
function sendTestEmail(payload) {
    try {
        var userData = (payload && (payload.userData || payload.user)) || {};
        var perm = checkEmailSettingsAdmin_(userData);
        if (!perm.hasPermission) {
            return { success: false, message: perm.message, errorCode: 'PERMISSION_DENIED' };
        }
        var to = normalizeEmailList_([payload && payload.to ? payload.to : '']);
        if (!to.length) {
            return { success: false, message: 'أدخل إيميل للاختبار' };
        }
        var settingsSnap = getEmailSettings({});
        var globalOn = settingsSnap && settingsSnap.data && settingsSnap.data.globalEnabled;
        MailApp.sendEmail({
            to: to[0],
            subject: '[HSE] رسالة تجريبية — إعدادات البريد',
            htmlBody: buildEmailHtmlBody_('رسالة تجريبية', [
                { label: 'الحالة العامة', value: globalOn ? 'مفعّل' : 'متوقف' },
                { label: 'المرسل', value: userData.name || userData.email || 'admin' },
                { label: 'الوقت', value: new Date().toISOString() }
            ], ''),
            body: 'رسالة تجريبية من نظام HSE'
        });
        return { success: true, message: 'تم إرسال الرسالة التجريبية إلى ' + to[0] };
    } catch (e) {
        Logger.log('sendTestEmail: ' + e.toString());
        return { success: false, message: formatMailAuthError_(e) };
    }
}

/**
 * إرسال تلقائي داخلي (من سير العمل) — يحترم autoSend.
 */
function sendAutoModuleEmail_(moduleKey, subject, bodyText, extraEmails) {
    try {
        var check = isEmailModuleAllowed_(moduleKey, 'auto');
        if (!check.allowed) {
            return { success: false, skipped: true, message: check.reason };
        }
        var recipients = resolveEmailRecipients_(moduleKey, extraEmails);
        if (!recipients.length) {
            return { success: false, skipped: true, message: 'لا مستلمين' };
        }
        var labelAr = (check.module && check.module.labelAr) ? check.module.labelAr : moduleKey;
        var subj = '[HSE — ' + labelAr + '] ' + String(subject || '').slice(0, 180);
        var text = String(bodyText || '');
        var html = buildEmailHtmlBody_(labelAr, [{ label: 'التفاصيل', value: text }], '');
        var sent = 0;
        recipients.slice(0, EMAIL_SEND_MAX_RECIPIENTS).forEach(function (email) {
            try {
                MailApp.sendEmail({ to: email, subject: subj, body: text, htmlBody: html });
                sent++;
            } catch (err) {
                Logger.log('sendAutoModuleEmail_ ' + email + ': ' + err.toString());
            }
        });
        return { success: sent > 0, sent: sent };
    } catch (e) {
        Logger.log('sendAutoModuleEmail_: ' + e.toString());
        return { success: false, message: String(e) };
    }
}

/**
 * تشغيل يدوي من محرر Apps Script (مرة واحدة) لمنح صلاحية MailApp.
 * القائمة: EmailService.gs → authorizeMailSending → تشغيل ▶
 * بعد الموافقة على شاشة Google: انشر مجدداً نسخة Web App إن لزم.
 */
function authorizeMailSending() {
    try {
        var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
        var status = authInfo.getAuthorizationStatus();
        var quota = MailApp.getRemainingDailyQuota();
        Logger.log('MailApp auth OK. Remaining daily quota: ' + quota + ' status=' + status);
        return {
            success: true,
            message: 'صلاحية إرسال البريد مفعّلة. الحصة المتبقية اليوم: ' + quota,
            remainingDailyQuota: quota,
            authorizationStatus: String(status)
        };
    } catch (e) {
        Logger.log('authorizeMailSending failed: ' + e.toString());
        return {
            success: false,
            message: 'يلزم منح صلاحية script.send_mail من المحرر: شغّل authorizeMailSending واقبل الشاشة. ' + String(e),
            error: String(e)
        };
    }
}

function formatMailAuthError_(err) {
    var msg = String(err || '');
    if (/script\.send_mail|MailApp\.sendEmail|do not have permission to call MailApp|Specified permissions are not sufficient/i.test(msg)) {
        return 'صلاحية إرسال البريد غير ممنوحة لحساب ناشر السكربت. افتح Apps Script → شغّل authorizeMailSending → اقبل الصلاحيات → أعد المحاولة.';
    }
    return msg;
}
