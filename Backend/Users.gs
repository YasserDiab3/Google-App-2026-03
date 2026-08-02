/**
 * Google Apps Script for HSE System - Users Module
 * 
 * موديول المستخدمين
 */

/**
 * تشفير كلمة المرور باستخدام SHA-256
 * @param {string} password - كلمة المرور النصية
 * @return {string} - كلمة المرور المشفرة (SHA-256 hex)
 */
function hashPassword(password) {
    if (!password || typeof password !== 'string') {
        return '';
    }
    
    try {
        // استخدام Utilities.computeDigest لتشفير كلمة المرور
        const hash = Utilities.computeDigest(
            Utilities.DigestAlgorithm.SHA_256,
            password,
            Utilities.Charset.UTF_8
        );
        
        // تحويل المصفوفة إلى hexadecimal string
        const hashString = hash.map(function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
        
        return hashString;
    } catch (error) {
        Logger.log('Error hashing password: ' + error.toString());
        return '';
    }
}

/**
 * التحقق من أن القيمة هي SHA-256 hash (hexadecimal string بطول 64)
 * @param {string} value - القيمة للتحقق
 * @return {boolean} - true إذا كانت hash صحيحة
 */
function isSha256Hash(value) {
    if (!value || typeof value !== 'string') {
        return false;
    }
    
    // SHA-256 hash يجب أن يكون hexadecimal string بطول 64
    const hexPattern = /^[0-9a-f]{64}$/i;
    return hexPattern.test(value);
}

/**
 * ✅ مؤشر خفيف لتحديثات المستخدمين (للـ sync الفوري بين الأجهزة)
 * يتم تحديثه عند إضافة/تعديل/حذف مستخدم.
 */
function markUsersUpdated_() {
    try {
        PropertiesService.getScriptProperties().setProperty('users_last_updated', String(Date.now()));
        PropertiesService.getScriptProperties().setProperty('users_last_updated_iso', new Date().toISOString());
        invalidateUsersAuthCache_();
    } catch (e) {
        Logger.log('Warning: could not set users_last_updated: ' + e.toString());
    }
}

/**
 * ✅ جلب مؤشر تحديثات المستخدمين (طلب خفيف جداً)
 * @return {object} { success: true, data: { updatedAtMs, updatedAtIso, serverTimeIso } }
 */
function getUsersMeta() {
    try {
        var props = PropertiesService.getScriptProperties();
        var msRaw = props.getProperty('users_last_updated');
        var isoRaw = props.getProperty('users_last_updated_iso');
        if (!msRaw) {
            markUsersUpdated_();
            msRaw = props.getProperty('users_last_updated');
            isoRaw = props.getProperty('users_last_updated_iso');
        }
        return {
            success: true,
            data: {
                updatedAtMs: Number(msRaw || 0) || 0,
                updatedAtIso: isoRaw || '',
                serverTimeIso: new Date().toISOString()
            }
        };
    } catch (error) {
        Logger.log('Error getUsersMeta: ' + error.toString());
        return { success: false, message: 'حدث خطأ في جلب بيانات المستخدمين.' };
    }
}

/**
 * إضافة مستخدم جديد مع تشفير كلمة المرور تلقائياً
 */
function addUserToSheet(userData) {
    const sheetName = 'Users';
    
    // نسخ البيانات لتجنب تعديل البيانات الأصلية
    const processedData = {};
    for (var key in userData) {
        if (userData.hasOwnProperty(key)) {
            processedData[key] = userData[key];
        }
    }
    
    // ✅ حماية: '***' هي قيمة sentinel — لا نحسب hash لها أبداً
    if (processedData.passwordHash === '***') {
        processedData.passwordHash = '';
    }
    if (processedData.password === '***') {
        processedData.password = '';
    }

    // التحقق من وجود كلمة مرور وتشفيرها إذا لزم الأمر
    if (processedData.password && typeof processedData.password === 'string' && processedData.password.trim() !== '') {
        // إذا كانت كلمة المرور غير مشفرة، قم بتشفيرها
        if (!isSha256Hash(processedData.password)) {
            processedData.passwordHash = hashPassword(processedData.password);
            // حفظ password كقيمة مخفية للأمان (لا نحفظ كلمة المرور النصية)
            processedData.password = '***';
        } else {
            // إذا كانت مشفرة بالفعل، انقلها إلى passwordHash
            processedData.passwordHash = processedData.password;
            processedData.password = '***';
        }
    } else if (processedData.passwordHash && typeof processedData.passwordHash === 'string') {
        // إذا كان passwordHash موجوداً وصالحاً، تأكد من أنه مشفر
        if (!isSha256Hash(processedData.passwordHash)) {
            // هاش غير صالح — لا نحفظه
            processedData.passwordHash = '';
        }
        processedData.password = '***';
    } else {
        // لا توجد كلمة مرور - تعيين قيم افتراضية
        processedData.password = '***';
        processedData.passwordHash = '';
    }
    
    // إضافة حقول تلقائية
    if (!processedData.id) {
        processedData.id = Utilities.getUuid();
    }
    if (!processedData.createdAt) {
        processedData.createdAt = new Date();
    }
    if (!processedData.updatedAt) {
        processedData.updatedAt = new Date();
    }
    
    // التأكد من أن active موجود
    if (processedData.active === undefined || processedData.active === null) {
        processedData.active = true;
    }
    
    // التأكد من وجود passwordHash قبل الحفظ
    if (!processedData.passwordHash || processedData.passwordHash.trim() === '') {
        Logger.log('Error: User added without passwordHash. Email: ' + (processedData.email || 'unknown'));
        return { 
            success: false, 
            message: 'لا يمكن إضافة مستخدم بدون كلمة مرور مشفرة. يرجى التأكد من إرسال passwordHash.' 
        };
    }
    
    // التحقق من صحة passwordHash
    if (!isSha256Hash(processedData.passwordHash)) {
        Logger.log('Error: Invalid passwordHash format. Email: ' + (processedData.email || 'unknown'));
        return { 
            success: false, 
            message: 'تنسيق كلمة المرور المشفرة غير صحيح. يجب أن تكون SHA-256 hash.' 
        };
    }
    
    // التأكد من أن passwordHash موجود في البيانات المرسلة
    Logger.log('Adding user with passwordHash: Yes (length: ' + processedData.passwordHash.length + '), Email: ' + (processedData.email || 'unknown'));
    
    // التأكد من أن passwordHash موجود في البيانات قبل الحفظ
    const result = appendToSheet(sheetName, processedData);
    
    if (result && result.success) {
        Logger.log('User added successfully with passwordHash to Google Sheets');
    } else {
        Logger.log('Error adding user to Google Sheets: ' + (result?.message || 'Unknown error'));
    }
    
    if (result && result.success) {
        markUsersUpdated_();
    }
    return result;
}

/**
 * تحديث مستخدم موجود مع تشفير كلمة المرور إذا تم تحديثها
 * @param {Object} [options] - { internalCall: boolean } للاستدعاء الداخلي (login/hash migration)
 */
function updateUserInSheet(userId, updateData, actorUserData, options) {
    try {
        options = options || {};
        if (!options.internalCall) {
            var adminGate = (typeof requireAdminActor_ === 'function')
                ? requireAdminActor_(actorUserData, 'updateUser')
                : { ok: true };
            if (!adminGate.ok) {
                return adminGate;
            }
        }
        const sheetName = 'Users';
        const spreadsheetId = getSpreadsheetId();
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const sheet = spreadsheet.getSheetByName(sheetName);
        
        if (!sheet) {
            return { success: false, message: 'الورقة غير موجودة' };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId, true);
        let userIndex = -1;
        const userIdStr = String(userId || '').trim().toLowerCase();
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === userId || String(data[i].id || '').trim() === String(userId || '').trim()) {
                userIndex = i;
                break;
            }
            if (userIdStr && data[i].email && String(data[i].email).trim().toLowerCase() === userIdStr) {
                userIndex = i;
                break;
            }
        }
        if (userIndex === -1) {
            return { success: false, message: 'المستخدم غير موجود' };
        }
        
        // نسخ بيانات التحديث
        const processedUpdate = {};
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                processedUpdate[key] = updateData[key];
            }
        }
        
        // ✅ حماية: '***' هي قيمة sentinel تعني "لا تغيّر كلمة المرور" — لا نحسب hash لها أبداً
        if (processedUpdate.passwordHash === '***') {
            delete processedUpdate.passwordHash;
        }
        if (processedUpdate.password === '***' || processedUpdate.password === '') {
            delete processedUpdate.password;
        }

        // إذا تم تحديث كلمة المرور، قم بتشفيرها
        if (processedUpdate.password && typeof processedUpdate.password === 'string' && processedUpdate.password.trim() !== '') {
            // إذا كانت كلمة المرور غير مشفرة، قم بتشفيرها
            if (!isSha256Hash(processedUpdate.password)) {
                processedUpdate.passwordHash = hashPassword(processedUpdate.password);
            } else {
                processedUpdate.passwordHash = processedUpdate.password;
            }
            // حفظ password كقيمة مخفية للأمان
            processedUpdate.password = '***';
        } else if (processedUpdate.passwordHash && typeof processedUpdate.passwordHash === 'string') {
            // إذا كان passwordHash موجوداً وصالحاً، تأكد من أنه مشفر
            if (!isSha256Hash(processedUpdate.passwordHash)) {
                // هاش غير صالح — تجاهله واحتفظ بالموجود في الشيت
                processedUpdate.passwordHash = data[userIndex].passwordHash || '';
            }
            processedUpdate.password = '***';
        } else {
            // لم يُرسل passwordHash أو password — احتفظ بالقيم الحالية من الشيت
            processedUpdate.password = data[userIndex].password || '***';
            processedUpdate.passwordHash = data[userIndex].passwordHash || '';
        }
        
        // ✅ حماية من فقد الصلاحيات:
        // لا نمسح permissions تلقائياً أبداً عند وصول قيمة غير صالحة.
        // نحدثها فقط إذا كانت قيمة صالحة (object/string JSON صالح).
        if (processedUpdate.permissions !== undefined) {
            if (typeof processedUpdate.permissions === 'object' && processedUpdate.permissions !== null) {
                // تحويل كائن الصلاحيات إلى JSON string للحفظ في Google Sheets
                try {
                    processedUpdate.permissions = JSON.stringify(processedUpdate.permissions);
                } catch (e) {
                    Logger.log('Error stringifying permissions: ' + e.toString());
                    // في حالة الخطأ، نحتفظ بالصلاحيات الحالية (لا تصفير)
                    processedUpdate.permissions = data[userIndex].permissions || '{}';
                }
            } else if (typeof processedUpdate.permissions === 'string') {
                // إذا كانت string بالفعل، تأكد من أنها JSON صالح
                try {
                    JSON.parse(processedUpdate.permissions);
                } catch (e) {
                    // إذا لم تكن JSON صالحة، نحتفظ بالقيمة الحالية بدلاً من مسح الصلاحيات
                    processedUpdate.permissions = data[userIndex].permissions || '{}';
                }
            } else {
                // أي نوع غير مدعوم (null/number/boolean...) => احتفظ بالقيمة الحالية
                processedUpdate.permissions = data[userIndex].permissions || '{}';
            }
        }
        
        // تحديث البيانات
        processedUpdate.updatedAt = new Date();
        for (var key in processedUpdate) {
            if (processedUpdate.hasOwnProperty(key)) {
                data[userIndex][key] = processedUpdate[key];
            }
        }
        
        // حفظ البيانات المحدثة
        const saveRes = saveToSheet(sheetName, data, spreadsheetId);
        if (saveRes && saveRes.success) {
            markUsersUpdated_();
        }
        return saveRes;
    } catch (error) {
        Logger.log('Error updating user: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء التحديث.' };
    }
}

/**
 * إعادة تعيين كلمة مرور مستخدم (للمدير)
 * @param {string} userId - معرف المستخدم أو البريد الإلكتروني
 * @param {string} newPassword - كلمة المرور الجديدة (اختياري - سيتم إنشاء واحدة تلقائياً إذا لم يتم تحديدها)
 * @return {object} - نتيجة العملية مع كلمة المرور المؤقتة
 */
function resetUserPassword(userId, newPassword) {
    try {
        const sheetName = 'Users';
        const spreadsheetId = getSpreadsheetId();
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const sheet = spreadsheet.getSheetByName(sheetName);
        
        if (!sheet) {
            return { success: false, message: 'الورقة غير موجودة' };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId, true);
        let userIndex = -1;
        
        // البحث عن المستخدم بالـ ID أو البريد الإلكتروني
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === userId || 
                (data[i].email && data[i].email.toLowerCase().trim() === userId.toLowerCase().trim())) {
                userIndex = i;
                break;
            }
        }
        
        if (userIndex === -1) {
            return { success: false, message: 'المستخدم غير موجود' };
        }
        
        // إنشاء كلمة مرور مؤقتة إذا لم يتم تحديد واحدة
        let tempPassword = newPassword;
        if (!tempPassword || tempPassword.trim() === '') {
            // إنشاء كلمة مرور مؤقتة قوية
            const randomPart = Utilities.getUuid().substring(0, 8);
            const timestamp = Utilities.formatDate(new Date(), 'GMT', 'yyyyMMddHHmmss').substring(8, 12);
            tempPassword = 'Temp' + randomPart + timestamp + '!';
        }
        
        // تشفير كلمة المرور
        const hashedPassword = hashPassword(tempPassword);
        
        if (!hashedPassword || hashedPassword.trim() === '') {
            return { success: false, message: 'فشل تشفير كلمة المرور' };
        }
        
        // تحديث بيانات المستخدم
        data[userIndex].passwordHash = hashedPassword;
        data[userIndex].password = '***'; // حذف كلمة المرور النصية
        data[userIndex].passwordChanged = false;
        data[userIndex].forcePasswordChange = true;
        data[userIndex].updatedAt = new Date();
        
        // حفظ البيانات المحدثة
        const saveResult = saveToSheet(sheetName, data, spreadsheetId);
        
        if (saveResult && saveResult.success) {
            return { 
                success: true, 
                message: 'تم إعادة تعيين كلمة المرور بنجاح',
                tempPassword: tempPassword // إرجاع كلمة المرور المؤقتة للمدير
            };
        } else {
            return { 
                success: false, 
                message: 'فشل حفظ التغييرات: ' + (saveResult?.message || 'خطأ غير معروف')
            };
        }
    } catch (error) {
        Logger.log('Error resetting user password: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إعادة تعيين كلمة المرور.' };
    }
}

/**
 * حذف مستخدم من قاعدة البيانات
 * @param {string} userId - معرف المستخدم
 * @return {object} - نتيجة العملية
 */
function deleteUserFromSheet(userId, userData) {
    try {
        if (typeof checkAdminPermissions !== 'function' || !checkAdminPermissions(userData || {})) {
            return {
                success: false,
                message: 'ليس لديك صلاحية حذف المستخدمين. الحذف متاح لمدير النظام فقط.',
                errorCode: 'DELETE_ADMIN_ONLY'
            };
        }
        if (!userId) {
            return { success: false, message: 'معرف المستخدم غير محدد' };
        }
        
        const sheetName = 'Users';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        const sheet = spreadsheet.getSheetByName(sheetName);
        
        if (!sheet) {
            return { success: false, message: 'الورقة غير موجودة' };
        }
        
        // قراءة البيانات الحالية
        const data = readFromSheet(sheetName, spreadsheetId, true);
        
        if (!data || !Array.isArray(data)) {
            return { success: false, message: 'فشل قراءة بيانات المستخدمين' };
        }
        
        // البحث عن المستخدم
        const userIndex = data.findIndex(user => user.id === userId);
        
        if (userIndex === -1) {
            return { success: false, message: 'المستخدم غير موجود' };
        }
        
        // التحقق من أن المستخدم ليس آخر مدير في النظام
        const adminUsers = data.filter(u => u.role === 'admin' && u.active !== false);
        const userToDelete = data[userIndex];
        
        if (userToDelete.role === 'admin' && adminUsers.length === 1) {
            return { 
                success: false, 
                message: 'لا يمكن حذف آخر مدير في النظام',
                errorCode: 'LAST_ADMIN'
            };
        }
        
        // حذف المستخدم من المصفوفة
        const filteredData = data.filter(user => user.id !== userId);
        
        // التحقق من أن الحذف تم بنجاح
        if (filteredData.length === data.length) {
            return { success: false, message: 'فشل حذف المستخدم' };
        }
        
        // حفظ البيانات المحدثة
        const saveResult = saveToSheet(sheetName, filteredData, spreadsheetId);
        
        if (saveResult && saveResult.success) {
            Logger.log('User deleted successfully: ' + userId);
            markUsersUpdated_();
            return { 
                success: true, 
                message: 'تم حذف المستخدم بنجاح'
            };
        } else {
            Logger.log('Error saving after user deletion: ' + (saveResult?.message || 'Unknown error'));
            return { 
                success: false, 
                message: 'فشل حفظ التغييرات بعد حذف المستخدم: ' + (saveResult?.message || 'خطأ غير معروف')
            };
        }
    } catch (error) {
        Logger.log('Error deleting user: ' + error.toString());
        Logger.log('Error stack: ' + (error.stack || 'No stack trace'));
        return { 
            success: false, 
            message: 'حدث خطأ أثناء حذف المستخدم.' 
        };
    }
}

/**
 * مهلة اعتبار الجلسة «متصل» (مللي ثانية) — يجب أن تكون أكبر من فاصل heartbeat في الواجهة.
 */
var USER_PRESENCE_TTL_MS_ = 2 * 60 * 1000;

function isTruthyOnlineFlag_(val) {
    return val === true || val === 'true' || val === 'TRUE' || val === 1 || val === '1' || val === 'نعم';
}

/** الحضور يعيش في الكاش فقط — ورقة Users مصدر المصادقة ولا تُكتب من النبضات */
var PRESENCE_CACHE_PREFIX_ = 'presence_v1:';

function getPresenceFromCache_(userId) {
    var id = String(userId || '').trim();
    if (!id) return null;
    try {
        var raw = CacheService.getScriptCache().get(PRESENCE_CACHE_PREFIX_ + id);
        return raw ? JSON.parse(raw) : null;
    } catch (_e) {
        return null;
    }
}

/**
 * حضور دفعة واحدة لقائمة مستخدمين — getAll بطلب كاش واحد.
 * @param {Array<string>} userIds
 * @return {Object} خريطة userId → {isOnline, lastPresenceAt, activeSessionId}
 */
function getPresenceMapFromCache_(userIds) {
    var out = {};
    if (!Array.isArray(userIds) || userIds.length === 0) return out;
    var keys = [];
    var byKey = {};
    for (var i = 0; i < userIds.length; i++) {
        var id = String(userIds[i] || '').trim();
        if (!id || byKey[PRESENCE_CACHE_PREFIX_ + id]) continue;
        keys.push(PRESENCE_CACHE_PREFIX_ + id);
        byKey[PRESENCE_CACHE_PREFIX_ + id] = id;
    }
    if (keys.length === 0) return out;
    try {
        var values = CacheService.getScriptCache().getAll(keys) || {};
        for (var k in values) {
            if (!Object.prototype.hasOwnProperty.call(values, k)) continue;
            try {
                out[byKey[k]] = JSON.parse(values[k]);
            } catch (_p) { /* ignore */ }
        }
    } catch (_e) { /* ignore */ }
    return out;
}

function setPresenceInCache_(userId, fields) {
    var id = String(userId || '').trim();
    if (!id) return;
    try {
        CacheService.getScriptCache().put(PRESENCE_CACHE_PREFIX_ + id, JSON.stringify(fields), 180);
    } catch (_e) { /* ignore */ }
}

/**
 * هل يعتبر المستخدم متصلاً فعلياً؟ الحضور من الكاش أولاً مع التحقق من انتهاء المهلة (2 دقيقة).
 * @param {Object} user
 * @param {Object} [presence] سجل حضور جاهز من الكاش (لتجنّب طلب كاش لكل صف)
 */
function isUserEffectivelyOnline_(user, presence) {
    if (!user) return false;
    var p = presence !== undefined ? presence : getPresenceFromCache_(user.id);
    if (p && typeof p === 'object') {
        if (p.isOnline === false || p.isOnline === 'false') return false;
        var tsP = p.lastPresenceAt || '';
        if (!tsP) return false;
        var tP = new Date(tsP).getTime();
        if (isNaN(tP)) return false;
        return (Date.now() - tP) <= USER_PRESENCE_TTL_MS_;
    }
    var flagSource = user.isOnline;
    if (!isTruthyOnlineFlag_(flagSource)) return false;
    var ts = user.lastPresenceAt || '';
    if (!ts) return false;
    var t = new Date(ts).getTime();
    if (isNaN(t)) return false;
    return (Date.now() - t) <= USER_PRESENCE_TTL_MS_;
}

/**
 * تنقية سجل مستخدم للعميل (بدون passwordHash أو tokens)
 */
function sanitizeUserRecordForClient_(user, isAdmin, actorEmail, presence) {
    if (!user || typeof user !== 'object') return null;
    var out = {};
    var safeFields = ['id', 'name', 'email', 'department', 'active', 'role', 'jobTitle', 'phone', 'photo', 'isOnline', 'lastLogin', 'lastLogout', 'lastPresenceAt', 'passwordChanged', 'forcePasswordChange', 'updatedAt', 'createdAt', 'mfaEnabled'];
    for (var i = 0; i < safeFields.length; i++) {
        var f = safeFields[i];
        if (user[f] !== undefined) out[f] = user[f];
    }
    // عرض اتصال فعلي للعميل من كاش الحضور (لا علم isOnline العالق ولا قراءة أعمدة غير موجودة)
    var p = presence !== undefined ? presence : getPresenceFromCache_(user.id);
    if (p && p.lastPresenceAt) out.lastPresenceAt = p.lastPresenceAt;
    if (p && p.lastLogout) out.lastLogout = p.lastLogout;
    out.isOnline = isUserEffectivelyOnline_(user, p);
    var email = String(user.email || '').trim().toLowerCase();
    var actor = String(actorEmail || '').trim().toLowerCase();
    if (isAdmin || (email && email === actor)) {
        if (user.permissions !== undefined) out.permissions = user.permissions;
    }
    return out;
}

/**
 * قائمة مستخدمين مُصفّاة للتطبيق — بدون قراءة ورقة Users مباشرة من العميل
 */
function getUsersForApp(actorUserData) {
    try {
        var authGate = requireAuthenticatedActor_(actorUserData, 'getUsersForApp');
        if (!authGate.ok) return authGate;
        var isAdmin = (typeof checkAdminPermissionsAuthoritative === 'function')
            ? checkAdminPermissionsAuthoritative(actorUserData)
            : false;
        var actorEmail = String(actorUserData.email || '').trim().toLowerCase();
        var spreadsheetId = getSpreadsheetId();
        var rows = readFromSheet('Users', spreadsheetId);
        if (!Array.isArray(rows)) rows = [];
        var ids = [];
        for (var k = 0; k < rows.length; k++) {
            if (rows[k] && rows[k].id) ids.push(String(rows[k].id));
        }
        var presenceMap = getPresenceMapFromCache_(ids);
        var sanitized = [];
        for (var j = 0; j < rows.length; j++) {
            var pres = presenceMap[String((rows[j] && rows[j].id) || '')] || null;
            var u = sanitizeUserRecordForClient_(rows[j], isAdmin, actorEmail, pres);
            if (u && u.email) sanitized.push(u);
        }
        return { success: true, data: sanitized, total: sanitized.length };
    } catch (err) {
        Logger.log('getUsersForApp error: ' + err.toString());
        return { success: false, message: 'getUsersForApp: ' + err.toString() };
    }
}

/**
 * تطبيع قيمة خلية/حقل من Google Sheets إلى نص
 */
function normalizeSheetScalarField_(val) {
    if (val === undefined || val === null) return '';
    if (typeof val === 'object' && val !== null) {
        if (val.value !== undefined && val.value !== null) {
            return String(val.value).trim();
        }
        var vals = Object.values(val);
        if (vals.length === 1 && (typeof vals[0] === 'string' || typeof vals[0] === 'number')) {
            return String(vals[0]).trim();
        }
    }
    return String(val).trim();
}

var USERS_AUTH_CACHE_KEY_ = 'users_auth_map_v2';
var USERS_AUTH_EMAIL_PREFIX_ = 'user_auth_email_v1:';
var AUTH_QUIET_CACHE_KEY_ = 'auth_quiet_until_ms';

// أعمدة المصادقة فقط — بدون photo/loginHistory (كانت تضخّم القراءة والكاش)
var AUTH_SLIM_COLUMNS_ = [
    'id', 'email', 'name', 'role', 'department', 'jobTitle', 'phone',
    'active', 'passwordHash', 'permissions',
    'mfaEnabled', 'mfaSecretEnc', 'mfaEnrolledAt'
];

/**
 * قراءة صف مصادقة واحد بأقل عمل ممكن.
 * readFromSheet('Users', id, true) يعطّل الكاش قراءةً وكتابةً (skipSecurityFilter)،
 * فكان كل login يقرأ الورقة كاملة (getDataRange) ويعالج كل خلية — قِيس 14–45ث،
 * ما يُفقد مفتاح تحويل 302 فيرتد الطلب إلى doGet ويظهر HTML.
 * هنا: 3 نطاقات صغيرة فقط (الرؤوس + عمود email + الصف المطلوب).
 * @param {string} email
 * @return {Object|null}
 */
function getAuthUserRowByEmail_(email, meta) {
    meta = meta || {};
    meta.scanned = false;
    var e = normalizeSheetScalarField_(email).toLowerCase();
    if (!e) return null;

    var spreadsheetId = getSpreadsheetId();
    if (!spreadsheetId) return null;

    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Users');
    if (!sheet) return null;

    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow < 2 || lastCol < 1) return null;

    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
        return String(h || '').trim();
    });
    var emailCol = headers.indexOf('email');
    if (emailCol === -1) return null;

    // نفس نمط المشروع: getRange(startRow, startCol, numRows, numColumns) — عمود email فقط
    var numRows = Math.max(1, lastRow - 1);
    var emails = sheet.getRange(2, emailCol + 1, numRows, 1).getValues();
    var rowIndex = -1;
    for (var i = 0; i < emails.length; i++) {
        if (normalizeSheetScalarField_(emails[i][0]).toLowerCase() === e) {
            rowIndex = i + 2;
            break;
        }
    }
    // المسح تم بنجاح — النتيجة نهائية (موجود أو غير موجود)
    meta.scanned = true;
    if (rowIndex === -1) return null;

    var row = sheet.getRange(rowIndex, 1, 1, lastCol).getValues()[0];
    var rec = {};
    for (var c = 0; c < headers.length; c++) {
        var h = headers[c];
        if (!h || AUTH_SLIM_COLUMNS_.indexOf(h) === -1) continue;
        var v = row[c];
        if (h === 'active' || h === 'mfaEnabled') {
            rec[h] = v;
        } else if (h === 'mfaSecretEnc') {
            // لا تُطبّق تطبيعاً عدوانياً على السرّ المشفّر — trim فقط
            rec[h] = (v === undefined || v === null) ? '' : String(v).trim();
        } else {
            rec[h] = normalizeSheetScalarField_(v);
        }
    }
    if (!rec.email) rec.email = e;
    return rec.id || rec.email ? rec : null;
}

/** نافذة هدوء أثناء login/MFA — حضور لا يكتب Users */
function setAuthQuietWindow_(sec) {
    try {
        var s = Math.max(30, Number(sec) || 90);
        var until = Date.now() + (s * 1000);
        CacheService.getScriptCache().put(AUTH_QUIET_CACHE_KEY_, String(until), s);
    } catch (_e) { /* ignore */ }
}

function isAuthQuietWindow_() {
    try {
        var raw = CacheService.getScriptCache().get(AUTH_QUIET_CACHE_KEY_);
        if (!raw) return false;
        return Number(raw) > Date.now();
    } catch (_e2) {
        return false;
    }
}

function invalidateUsersAuthCache_(emailOpt) {
    try {
        var cache = CacheService.getScriptCache();
        cache.remove(USERS_AUTH_CACHE_KEY_);
        var em = normalizeSheetScalarField_(emailOpt || '').toLowerCase();
        if (em) cache.remove(USERS_AUTH_EMAIL_PREFIX_ + em);
        if (typeof __AUTH_ACTOR_RECORD_CACHE_ !== 'undefined') {
            __AUTH_ACTOR_RECORD_CACHE_ = {};
        }
    } catch (e) { /* ignore */ }
}

/**
 * جلب سجل مستخدم من ورقة Users للتحقق من الصلاحيات من المصدر الرسمي (مع كاش readFromSheet).
 * @param {string} email
 * @return {Object|null}
 */
function getUserRecordFromUsersSheetByEmail_(email, options) {
    try {
        var e = normalizeSheetScalarField_(email).toLowerCase();
        if (!e) return null;
        options = options || {};

        var cache = CacheService.getScriptCache();
        var emailKey = USERS_AUTH_EMAIL_PREFIX_ + e;
        if (!options.bypassCache) {
            // 1) كاش per-email — يتجنّب قراءة الشيت عند كل login
            try {
                var oneRaw = cache.get(emailKey);
                if (oneRaw) {
                    var one = JSON.parse(oneRaw);
                    if (one && one.email) return one;
                }
            } catch (_one) { /* ignore */ }

            var cachedMapRaw = cache.get(USERS_AUTH_CACHE_KEY_);
            if (cachedMapRaw) {
                try {
                    var map = JSON.parse(cachedMapRaw);
                    if (map && map[e]) {
                        try {
                            var slimOne = JSON.stringify(map[e]);
                            if (slimOne.length < 90000) cache.put(emailKey, slimOne, 600);
                        } catch (_pe) { /* ignore */ }
                        return map[e];
                    }
                } catch (pErr) { /* ignore cache parse error */ }
            }
        }

        // 2) قراءة صف واحد بأعمدة المصادقة — بديل getDataRange الكامل
        try {
            var slimMeta = {};
            var slimRec = getAuthUserRowByEmail_(e, slimMeta);
            if (slimRec) {
                try {
                    var slimJson = JSON.stringify(slimRec);
                    if (slimJson.length < 90000) cache.put(emailKey, slimJson, 600);
                } catch (_sc) { /* ignore */ }
                return slimRec;
            }
            // بريد غير موجود: لا تسقط إلى المسح الكامل (كان 20–33ث ثم HTML)
            if (slimMeta.scanned) return null;
        } catch (slimErr) {
            Logger.log('getAuthUserRowByEmail_ fallback: ' + slimErr.toString());
        }

        var spreadsheetId = getSpreadsheetId();
        // Skip security filter to get passwordHash for authentication
        var users = readFromSheet('Users', spreadsheetId, true);
        if (!users || !Array.isArray(users)) return null;

        var targetUser = null;
        var usersMap = {};
        for (var i = 0; i < users.length; i++) {
            var u = users[i];
            if (!u) continue;
            var rowEmail = normalizeSheetScalarField_(u.email).toLowerCase();
            if (rowEmail) {
                usersMap[rowEmail] = u;
                if (rowEmail === e) targetUser = u;
                // كاش per-email بأعمدة المصادقة فقط — photo/loginHistory كانت تتجاوز حد الكاش
                try {
                    var slimRow = {};
                    for (var sc = 0; sc < AUTH_SLIM_COLUMNS_.length; sc++) {
                        var col = AUTH_SLIM_COLUMNS_[sc];
                        if (u[col] !== undefined) slimRow[col] = u[col];
                    }
                    var rowJson = JSON.stringify(slimRow);
                    if (rowJson.length < 90000) {
                        cache.put(USERS_AUTH_EMAIL_PREFIX_ + rowEmail, rowJson, 600);
                    }
                } catch (_rowC) { /* ignore */ }
            }
        }

        try {
            var jsonStr = JSON.stringify(usersMap);
            if (jsonStr.length < 95000) {
                cache.put(USERS_AUTH_CACHE_KEY_, jsonStr, 600);
            }
        } catch (cErr) { /* ignore cache write error */ }

        return targetUser;
    } catch (err) {
        Logger.log('getUserRecordFromUsersSheetByEmail_: ' + err.toString());
        return null;
    }
}

/**
 * جلب سجل مستخدم من ورقة Users بواسطة المعرف
 * @param {string} userId
 * @return {Object|null}
 */
function getUserRecordFromUsersSheetById_(userId) {
    try {
        var id = normalizeSheetScalarField_(userId);
        if (!id) return null;
        var spreadsheetId = getSpreadsheetId();
        var users = readFromSheet('Users', spreadsheetId, true);
        if (!users || !Array.isArray(users)) return null;
        for (var i = 0; i < users.length; i++) {
            var u = users[i];
            if (!u) continue;
            if (normalizeSheetScalarField_(u.id) === id) return u;
        }
        return null;
    } catch (err) {
        Logger.log('getUserRecordFromUsersSheetById_: ' + err.toString());
        return null;
    }
}

/**
 * حل سجل المستخدم من ورقة Users بالبريد أو المعرف
 */
function resolveActorRecordFromUsersSheet_(actorUserData) {
    if (!actorUserData) return null;
    var email = normalizeSheetScalarField_(actorUserData.email).toLowerCase();
    if (email) {
        var byEmail = getUserRecordFromUsersSheetByEmail_(email);
        if (byEmail) return byEmail;
    }
    if (actorUserData.id) {
        return getUserRecordFromUsersSheetById_(actorUserData.id);
    }
    return null;
}

/**
 * تحديث سريع لحقول تسجيل الدخول دون قراءة الشيت كاملاً.
 * يستخدم getValues على عمود ID فقط لإيجاد الصف ثم setValue للخلايا المستهدفة.
 * @param {string} userId
 * @param {{lastLogin?:string,lastPresenceAt?:string,isOnline?:boolean,activeSessionId?:string,lastLogout?:string}} fields
 */
function _fastTouchUserLoginFields_(userId, fields) {
    if (!userId || !fields) return;
    const spreadsheetId = getSpreadsheetId();
    if (!spreadsheetId) return;
    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName('Users');
    if (!sheet) return;

    // لا ensureSheetHeaders ولا إضافة أعمدة هنا — إعادة كتابة صف الرؤوس في كل نبضة
    // كانت تقفل ورقة Users وتبطّئ login/verifyMfaLogin حتى ترفض الرمز أو تنتهي المهلة.
    // الحضور صار في الكاش (presence_v1:) فلا حاجة لعمودَي lastPresenceAt/activeSessionId.
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    if (lastRow < 2 || lastCol < 1) return;

    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h || '').trim());
    const idCol = headers.indexOf('id');
    if (idCol === -1) return;

    const ids = sheet.getRange(2, idCol + 1, lastRow, idCol + 1).getValues();
    const target = String(userId).trim();
    let rowIndex = -1;
    for (let i = 0; i < ids.length; i++) {
        if (String(ids[i][0] || '').trim() === target) { rowIndex = i + 2; break; }
    }
    if (rowIndex === -1) return;

    const cellWrites = [];
    if ('lastLogin' in fields) {
        const c = headers.indexOf('lastLogin');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.lastLogin]);
    }
    if ('lastPresenceAt' in fields) {
        const c = headers.indexOf('lastPresenceAt');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.lastPresenceAt]);
    }
    if ('lastLogout' in fields) {
        const c = headers.indexOf('lastLogout');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.lastLogout]);
    }
    if ('isOnline' in fields) {
        const c = headers.indexOf('isOnline');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.isOnline]);
    }
    if ('activeSessionId' in fields) {
        const c = headers.indexOf('activeSessionId');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.activeSessionId]);
    }
    if ('passwordHash' in fields) {
        const c = headers.indexOf('passwordHash');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.passwordHash]);
    }
    // دفعة واحدة بدل setValue لكل خلية (أقل قفل على الشيت)
    if (cellWrites.length === 1) {
        sheet.getRange(cellWrites[0][0], cellWrites[0][1]).setValue(cellWrites[0][2]);
    } else if (cellWrites.length > 1) {
        cellWrites.forEach(w => sheet.getRange(w[0], w[1]).setValue(w[2]));
    }
}

/**
 * نبضة حضور من الجلسة الحالية — يسمح للمستخدم بتحديث نفسه فقط (بدون صلاحية Admin).
 */
function touchUserPresence(payload, actorUserData) {
    try {
        var authGate = requireAuthenticatedActor_(actorUserData, 'touchUserPresence');
        if (!authGate.ok) return authGate;
        var actor = authGate.actor || actorUserData || {};
        var actorId = String(actor.id || '').trim();
        var actorEmail = String(actor.email || '').trim().toLowerCase();
        var userId = String((payload && (payload.userId || payload.id)) || actorId || '').trim();
        if (!userId) return { success: false, message: 'معرف المستخدم مطلوب' };

        // فقط الذات (أو admin)
        var isAdmin = (typeof checkAdminPermissionsAuthoritative === 'function')
            ? checkAdminPermissionsAuthoritative(actor)
            : false;
        if (!isAdmin) {
            if (actorId && userId !== actorId) {
                return { success: false, message: 'لا يمكن تحديث حضور مستخدم آخر', errorCode: 'FORBIDDEN' };
            }
            if (!actorId && actorEmail) {
                var me = getUserRecordFromUsersSheetByEmail_(actorEmail);
                if (!me || String(me.id || '').trim() !== userId) {
                    return { success: false, message: 'لا يمكن تحديث حضور مستخدم آخر', errorCode: 'FORBIDDEN' };
                }
            }
        }

        var nowIso = new Date().toISOString();
        var sessionId = String((payload && payload.sessionId) || '').trim();
        var fields = {
            isOnline: true,
            lastPresenceAt: nowIso
        };
        if (sessionId) fields.activeSessionId = sessionId.substring(0, 80);

        // الحضور في الكاش فقط — لا كتابة على ورقة Users مطلقاً (قفلها كان يُسقط login/MFA)
        setPresenceInCache_(userId, fields);

        // الكتابات المؤجّلة من الدخول فقط (ترقية hash + lastLogin) — دفعة واحدة عند وجودها
        var sheetWritten = false;
        try {
            var scriptCache = CacheService.getScriptCache();
            var hashKey = 'pending_pwd_hash:' + userId;
            var loginKey = 'pending_last_login:' + userId;
            var deferred = {};
            var pendingHash = scriptCache.get(hashKey);
            var pendingLastLogin = scriptCache.get(loginKey);
            if (pendingHash) deferred.passwordHash = pendingHash;
            if (pendingLastLogin) deferred.lastLogin = pendingLastLogin;

            if (Object.keys(deferred).length > 0 && !isAuthQuietWindow_()) {
                var lock = LockService.getScriptLock();
                var gotLock = false;
                try {
                    gotLock = lock.tryLock(200);
                    if (gotLock) {
                        _fastTouchUserLoginFields_(userId, deferred);
                        if (pendingHash) scriptCache.remove(hashKey);
                        if (pendingLastLogin) scriptCache.remove(loginKey);
                        sheetWritten = true;
                    }
                } finally {
                    if (gotLock) {
                        try { lock.releaseLock(); } catch (_rl) { /* ignore */ }
                    }
                }
            }
        } catch (_ph2) {
            Logger.log('touchUserPresence deferred write soft-fail: ' + _ph2.toString());
        }

        return { success: true, lastPresenceAt: nowIso, isOnline: true, sheetWritten: sheetWritten };
    } catch (err) {
        Logger.log('touchUserPresence error: ' + err.toString());
        return { success: false, message: 'touchUserPresence: ' + err.toString() };
    }
}

/**
 * تعليم المستخدم غير متصل — للخروج الصريح أو إغلاق التبويب (self فقط).
 */
function markUserOffline(payload, actorUserData) {
    try {
        var authGate = requireAuthenticatedActor_(actorUserData, 'markUserOffline');
        if (!authGate.ok) return authGate;
        var actor = authGate.actor || actorUserData || {};
        var actorId = String(actor.id || '').trim();
        var actorEmail = String(actor.email || '').trim().toLowerCase();
        var userId = String((payload && (payload.userId || payload.id)) || actorId || '').trim();
        var sessionId = String((payload && payload.sessionId) || '').trim();
        if (!userId && actorEmail) {
            var me = getUserRecordFromUsersSheetByEmail_(actorEmail);
            if (me) userId = String(me.id || '').trim();
        }
        if (!userId) return { success: false, message: 'معرف المستخدم مطلوب' };

        // فقط الذات (أو admin) — منع IDOR إسقاط حضور مستخدم آخر
        var isAdmin = (typeof checkAdminPermissionsAuthoritative === 'function')
            ? checkAdminPermissionsAuthoritative(actor)
            : false;
        if (!isAdmin) {
            if (actorId && userId !== actorId) {
                return { success: false, message: 'لا يمكن تحديث حضور مستخدم آخر', errorCode: 'FORBIDDEN' };
            }
            if (!actorId && actorEmail) {
                var meRow = getUserRecordFromUsersSheetByEmail_(actorEmail);
                if (!meRow || String(meRow.id || '').trim() !== userId) {
                    return { success: false, message: 'لا يمكن تحديث حضور مستخدم آخر', errorCode: 'FORBIDDEN' };
                }
            }
            if (!actorId && !actorEmail) {
                return { success: false, message: 'رفض أمني: هوية المنفّذ مطلوبة', errorCode: 'FORBIDDEN' };
            }
        }

        // جلسة جهاز آخر نشطة؟ المقارنة من كاش الحضور (بلا قراءة ورقة Users)
        if (sessionId) {
            var current = getPresenceFromCache_(userId);
            var cachedSession = current ? String(current.activeSessionId || '').trim() : '';
            if (cachedSession && cachedSession !== sessionId && isUserEffectivelyOnline_({ id: userId }, current)) {
                return { success: true, skipped: true, message: 'جلسة أخرى نشطة — لم يتم تغيير الحالة' };
            }
        }

        var nowIso = new Date().toISOString();
        var offlineFields = {
            isOnline: false,
            lastLogout: nowIso,
            lastPresenceAt: nowIso,
            activeSessionId: ''
        };

        // الحضور في الكاش فقط — الخروج لا يلمس ورقة Users
        setPresenceInCache_(userId, offlineFields);

        return { success: true, isOnline: false, lastLogout: nowIso, sheetWritten: false };
    } catch (err) {
        Logger.log('markUserOffline error: ' + err.toString());
        return { success: false, message: 'markUserOffline: ' + err.toString() };
    }
}

/**
 * بناء كائن مستخدم آمن للإرجاع للعميل (بدون حقول حساسة)
 */
function buildSafeUserFromRecord_(user) {
    if (!user) return null;
    var safeUser = {};
    var sensitiveFields = ['password', 'passwordHash', 'token', 'loginHistory', 'mfaSecretEnc'];
    for (var key in user) {
        if (user.hasOwnProperty(key) && sensitiveFields.indexOf(key) === -1) {
            safeUser[key] = user[key];
        }
    }
    if (typeof safeUser.permissions === 'string') {
        try {
            safeUser.permissions = JSON.parse(safeUser.permissions);
        } catch (ex) {
            safeUser.permissions = {};
        }
    }
    return safeUser;
}

/**
 * التحقق من كلمة المرور فقط (بدون إكمال جلسة أو MFA)
 */
function verifyUserPasswordOnly_(email, password) {
    try {
        var e = String(email || '').trim().toLowerCase();
        var p = String(password || '').trim();
        if (!e || !p) {
            return { success: false, message: 'البريد الإلكتروني وكلمة المرور مطلوبان' };
        }
        var user = getUserRecordFromUsersSheetByEmail_(e);
        if (!user) {
            return { success: false, message: 'بيانات الاعتماد غير صحيحة' };
        }
        if (user.active === false || user.active === 'false' || user.active === 'inactive') {
            return { success: false, message: 'هذا الحساب معطل. يرجى التواصل مع المدير.' };
        }
        var passwordMatch = false;
        var needsHashUpdate = false;
        var storedHash = String(user.passwordHash || '').trim();
        if (isSha256Hash(storedHash)) {
            var inputHash = hashPassword(p);
            passwordMatch = (inputHash.toLowerCase() === storedHash.toLowerCase());
        } else if (storedHash === p) {
            passwordMatch = true;
            needsHashUpdate = true;
        }
        if (!passwordMatch) {
            return { success: false, message: 'بيانات الاعتماد غير صحيحة' };
        }
        if (needsHashUpdate) {
            var newHash = hashPassword(p);
            updateUserInSheet(user.id, { passwordHash: newHash, password: '***' }, null, { internalCall: true });
        }
        return { success: true, user: user };
    } catch (err) {
        Logger.log('verifyUserPasswordOnly_ error: ' + err.toString());
        return { success: false, message: 'حدث خطأ أثناء التحقق من كلمة المرور' };
    }
}

/**
 * المصادقة على المستخدم في جانب الخادم (Server-side Authentication)
 * دالة جديدة من Jules — تتحقق من المستخدم في الـ Backend مباشرةً
 * @param {string} email
 * @param {string} password
 * @return {object} { success: boolean, message: string, user?: object }
 */
function loginUser(email, password) {
    try {
        const e = String(email || '').trim().toLowerCase();
        const p = String(password || '').trim();
        // هدوء 90ث: منع كتابات الحضور من قفل Users أثناء الدخول/MFA
        setAuthQuietWindow_(90);

        if (!e || !p) {
            return { success: false, message: 'البريد الإلكتروني وكلمة المرور مطلوبان' };
        }

        // SEC-01: لا مسار خادم لحساب bootstrap عند تفعيل القفل
        if (typeof isBootstrapEmailServer_ === 'function' && isBootstrapEmailServer_(e) &&
            typeof isServerBootstrapDisabled_ === 'function' && isServerBootstrapDisabled_()) {
            if (typeof logSecurityEvent === 'function') {
                logSecurityEvent('bootstrap_login_rejected', { actor: e, severity: 'high' });
            }
            return {
                success: false,
                message: 'حساب التجهيز الافتراضي معطّل من الخادم. استخدم حساب النظام.',
                errorCode: 'BOOTSTRAP_DISABLED'
            };
        }

        const user = getUserRecordFromUsersSheetByEmail_(e);
        if (!user) {
            return { success: false, message: 'بيانات الاعتماد غير صحيحة' };
        }

        if (user.active === false || user.active === 'false' || user.active === 'inactive') {
            return { success: false, message: 'هذا الحساب معطل. يرجى التواصل مع المدير.' };
        }

        let passwordMatch = false;
        let needsHashUpdate = false;
        const storedHash = String(user.passwordHash || '').trim();

        if (isSha256Hash(storedHash)) {
            // التحقق من الـ Hash
            const inputHash = hashPassword(p);
            passwordMatch = (inputHash.toLowerCase() === storedHash.toLowerCase());
        } else if (storedHash === p) {
            // تسجيل دخول أول مرة بكلمة مرور نصية
            passwordMatch = true;
            needsHashUpdate = true;
        }

        if (!passwordMatch) {
            return { success: false, message: 'بيانات الاعتماد غير صحيحة' };
        }

        // بعد كلمة مرور صحيحة: ارفع قفل MFA الناتج عن محاولات فاشلة سابقة (رمز/خادم)
        if (typeof clearMfaLockAfterPasswordOk_ === 'function') {
            clearMfaLockAfterPasswordOk_(e);
        } else if (typeof clearMfaFailures_ === 'function') {
            clearMfaFailures_(e);
        }

        // ترقية Hash مؤجّلة — لا تكتب Users داخل طلب الدخول (قفل → مهلة → HTML)
        if (needsHashUpdate) {
            try {
                var newHash = hashPassword(p);
                CacheService.getScriptCache().put('pending_pwd_hash:' + String(user.id), newHash, 86400);
            } catch (_ph) { /* ignore */ }
        }

        // MFA: إذا مفعّل — لا نُكمل الجلسة حتى التحقق من TOTP
        if (typeof isMfaEnabledForUser_ === 'function' && isMfaEnabledForUser_(user)) {
            var challengeToken = (typeof createMfaChallenge_ === 'function')
                ? createMfaChallenge_(e, user)
                : '';
            if (!challengeToken) {
                return { success: false, message: 'تعذر بدء خطوة المصادقة الثنائية. حاول لاحقاً.' };
            }
            return {
                success: true,
                mfaRequired: true,
                challengeToken: challengeToken,
                message: 'مطلوب رمز المصادقة الثنائية'
            };
        }

        // تجهيز كائن المستخدم للإرجاع (بدون بيانات حساسة)
        const safeUser = buildSafeUserFromRecord_(user);

        // دائماً بدون كتابة Users في مسار الدخول — الحضور من الكاش ثم نبضات لاحقاً
        return attachServerSessionToLoginResult_({
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: safeUser
        }, user, { skipSheetTouch: true });

    } catch (error) {
        Logger.log('Error in loginUser: ' + error.toString());
        return { success: false, message: 'حدث خطأ في الخادم أثناء تسجيل الدخول' };
    }
}

/**
 * الخطوة الثانية لتسجيل الدخول — التحقق من رمز TOTP
 */
function verifyMfaLogin(challengeToken, email, code) {
    try {
        var e = String(email || '').trim().toLowerCase();
        var token = String(challengeToken || '').trim();
        var otp = String(code || '').trim().replace(/\s/g, '');
        setAuthQuietWindow_(90);

        if (!e || !token || !otp) {
            return { success: false, message: 'بيانات المصادقة الثنائية ناقصة' };
        }

        if (typeof checkMfaRateLimit_ === 'function') {
            var rl = checkMfaRateLimit_(e);
            if (!rl.ok) return { success: false, message: rl.message };
        }

        // لا ScriptLock عام — يتعارض مع عمليات أخرى ويسبب مهلة على الواجهة
        // الحماية من التوازي عبر mfa_used + mfa_otp_used في الكاش

        // لا نستهلك challenge قبل نجاح TOTP — وإلا إعادة المحاولة برمز صحيح تفشل
        if (typeof validateMfaChallenge_ !== 'function' || !validateMfaChallenge_(token, e)) {
            return { success: false, message: 'انتهت صلاحية جلسة المصادقة. أعد تسجيل الدخول.' };
        }

        if (typeof isTotpCodeAlreadyUsed_ === 'function' && isTotpCodeAlreadyUsed_(e, otp)) {
            return { success: false, message: 'تم استخدام هذا الرمز مسبقاً. انتظر رمزاً جديداً.' };
        }

        var cachedUserPayload = null;
        try {
            var cache = CacheService.getScriptCache();
            var raw = cache.get('mfa_user_' + token);
            if (raw) cachedUserPayload = JSON.parse(raw);
        } catch (cErr) { /* ignore */ }

        var user = null;
        var secretEnc = '';
        var safeUser = null;

        if (cachedUserPayload && cachedUserPayload.email === e && cachedUserPayload.mfaSecretEnc) {
            secretEnc = cachedUserPayload.mfaSecretEnc;
            safeUser = cachedUserPayload.safeUser;
            user = { id: cachedUserPayload.userId, email: e };
        } else {
            // مسار احتياطي: كاش per-email أولاً — بدون invalidate/bypass إلا عند الضرورة
            user = getUserRecordFromUsersSheetByEmail_(e);
            if (!user || !isMfaEnabledForUser_(user)) {
                return { success: false, message: 'المصادقة الثنائية غير مفعّلة لهذا الحساب' };
            }
            secretEnc = String(user.mfaSecretEnc || '').trim();
            safeUser = (typeof buildMfaChallengeSafeUser_ === 'function')
                ? buildMfaChallengeSafeUser_(user)
                : buildSafeUserFromRecord_(user);
        }

        var secret = (typeof decryptMfaSecret_ === 'function') ? decryptMfaSecret_(secretEnc) : '';
        // أسرار TOTP base32 — وحّد الحالة وأزل الفراغات بعد فك التشفير
        if (secret) secret = String(secret).toUpperCase().replace(/\s/g, '');
        var totpOk = (secret && typeof verifyTotpCode_ === 'function' && verifyTotpCode_(secret, otp));
        var usedCacheSecret = !!(cachedUserPayload && cachedUserPayload.mfaSecretEnc);

        // دائماً أعد من الشيت عند الفشل — كاش التحدي قد يحمل سراً قديماً/فاسداً فيُرفض الرمز الصحيح
        if (!totpOk) {
            try {
                if (typeof invalidateUsersAuthCache_ === 'function') invalidateUsersAuthCache_(e);
                // قراءة مباشرة من الشيت — تجاوز كاش per-email الذي قد يكون بلا mfaSecretEnc صالح
                var freshUser = null;
                try {
                    var slimMeta2 = {};
                    freshUser = getAuthUserRowByEmail_(e, slimMeta2);
                } catch (_slim2) { freshUser = null; }
                if (!freshUser) {
                    freshUser = getUserRecordFromUsersSheetByEmail_(e, { bypassCache: true });
                }
                if (freshUser && isMfaEnabledForUser_(freshUser)) {
                    var freshEnc = String(freshUser.mfaSecretEnc || '').trim();
                    var freshSecret = (typeof decryptMfaSecret_ === 'function') ? decryptMfaSecret_(freshEnc) : '';
                    if (freshSecret) freshSecret = String(freshSecret).toUpperCase().replace(/\s/g, '');
                    if (freshSecret && typeof verifyTotpCode_ === 'function' && verifyTotpCode_(freshSecret, otp, { window: 8 })) {
                        totpOk = true;
                        secret = freshSecret;
                        user = freshUser;
                        safeUser = (typeof buildMfaChallengeSafeUser_ === 'function')
                            ? buildMfaChallengeSafeUser_(freshUser)
                            : buildSafeUserFromRecord_(freshUser);
                        usedCacheSecret = false;
                        // حدّث كاش التحدي حتى لا تتكرر نفس الفجوة
                        try {
                            CacheService.getScriptCache().put('mfa_user_' + token, JSON.stringify({
                                email: e,
                                userId: freshUser.id,
                                mfaSecretEnc: freshEnc,
                                safeUser: safeUser
                            }), 300);
                        } catch (_cu) { /* ignore */ }
                    }
                }
            } catch (_retry) {
                Logger.log('verifyMfaLogin sheet retry: ' + _retry.toString());
            }
        }

        if (!totpOk) {
            if (typeof recordMfaFailure_ === 'function') recordMfaFailure_(e);
            try {
                if (typeof logSecurityEventSoft_ === 'function') {
                    logSecurityEventSoft_('mfa_login_failed', {
                        email: e,
                        severity: 'medium',
                        decryptOk: !!secret,
                        usedCache: usedCacheSecret
                    });
                } else {
                    Logger.log('mfa_login_failed email=' + e + ' decryptOk=' + !!secret + ' usedCache=' + usedCacheSecret);
                }
            } catch (_logE) { /* ignore */ }
            return {
                success: false,
                message: 'رمز المصادقة الثنائية غير صحيح أو منتهٍ. انتظر رمزاً جديداً من التطبيق وأعد المحاولة.',
                errorCode: 'MFA_CODE_INVALID'
            };
        }

        // منع replay لنفس الرمز قبل إستهلاك challenge
        if (typeof markTotpCodeConsumed_ === 'function' && !markTotpCodeConsumed_(e, otp, 180)) {
            return { success: false, message: 'تم استخدام هذا الرمز مسبقاً. انتظر رمزاً جديداً.' };
        }

        // استهلاك بعد النجاح فقط
        if (typeof consumeMfaChallenge_ !== 'function' || !consumeMfaChallenge_(token, e)) {
            return { success: false, message: 'تعذر إتمام جلسة المصادقة. أعد تسجيل الدخول.' };
        }

        if (typeof clearMfaFailures_ === 'function') clearMfaFailures_(e);

        // مهم: بدون كتابة Users هنا — الكتابة كانت تسبب مهلة Google HTML بدل JSON
        var loginOk = attachServerSessionToLoginResult_({
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: safeUser,
            diag: { path: (cachedUserPayload && cachedUserPayload.mfaSecretEnc) ? 'cache' : 'sheet' }
        }, user || safeUser, { skipSheetTouch: true });
        return loginOk;
    } catch (error) {
        Logger.log('verifyMfaLogin error: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء التحقق من المصادقة الثنائية' };
    }
}

/**
 * بدء تسجيل MFA — توليد سر مؤقت حتى التأكيد
 */
function startMfaEnrollment(actorUserData) {
    try {
        var email = String((actorUserData && actorUserData.email) || '').trim().toLowerCase();
        if (!email) {
            return { success: false, message: 'مطلوب تسجيل الدخول', errorCode: 'AUTH_REQUIRED' };
        }
        var user = getUserRecordFromUsersSheetByEmail_(email);
        if (!user) {
            return { success: false, message: 'المستخدم غير موجود' };
        }
        if (isMfaEnabledForUser_(user)) {
            return { success: false, message: 'المصادقة الثنائية مفعّلة بالفعل' };
        }
        var pending = peekMfaEnrollmentPending_(email);
        var secret = pending || generateTotpSecret_();
        if (!pending && !storeMfaEnrollmentPending_(email, secret)) {
            return { success: false, message: 'تعذر بدء التسجيل. حاول لاحقاً.' };
        }
        var otpauthUrl = buildOtpAuthUri_(email, secret, 'HSE-04-2026');
        return {
            success: true,
            secret: secret,
            otpauthUrl: otpauthUrl,
            message: 'امسح رمز QR ثم أدخل الرمز للتأكيد'
        };
    } catch (error) {
        Logger.log('startMfaEnrollment error: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء بدء تسجيل MFA' };
    }
}

/**
 * تأكيد تفعيل MFA بعد مسح QR
 */
function _fastWriteUserMfaFields_(userId, fields) {
    if (!userId || !fields) {
        return { success: false, message: 'بيانات ناقصة' };
    }
    try {
        if (typeof fixUsersSheetHeaders === 'function') {
            fixUsersSheetHeaders();
        }
        var spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) {
            return { success: false, message: 'معرف Google Sheets غير محدد' };
        }
        var ss = SpreadsheetApp.openById(spreadsheetId);
        var sheet = ss.getSheetByName('Users');
        if (!sheet) {
            return { success: false, message: 'الورقة غير موجودة' };
        }

        var lastRow = sheet.getLastRow();
        var lastCol = sheet.getLastColumn();
        if (lastRow < 2 || lastCol < 1) {
            return { success: false, message: 'لا توجد بيانات مستخدمين' };
        }

        var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
            return String(h || '').trim();
        });
        var idCol = headers.indexOf('id');
        var emailCol = headers.indexOf('email');
        if (idCol === -1 && emailCol === -1) {
            return { success: false, message: 'رأس id/email مفقود في ورقة Users' };
        }

        var target = String(userId || '').trim();
        var targetLower = target.toLowerCase();
        var rowIndex = -1;
        if (idCol !== -1) {
            var ids = sheet.getRange(2, idCol + 1, lastRow - 1, 1).getValues();
            for (var i = 0; i < ids.length; i++) {
                if (String(ids[i][0] || '').trim() === target) {
                    rowIndex = i + 2;
                    break;
                }
            }
        }
        if (rowIndex === -1 && emailCol !== -1 && targetLower.indexOf('@') !== -1) {
            var emails = sheet.getRange(2, emailCol + 1, lastRow - 1, 1).getValues();
            for (var j = 0; j < emails.length; j++) {
                if (String(emails[j][0] || '').trim().toLowerCase() === targetLower) {
                    rowIndex = j + 2;
                    break;
                }
            }
        }
        if (rowIndex === -1) {
            return { success: false, message: 'المستخدم غير موجود في الشيت' };
        }

        var mfaKeys = ['mfaEnabled', 'mfaSecretEnc', 'mfaEnrolledAt'];
        for (var k = 0; k < mfaKeys.length; k++) {
            var key = mfaKeys[k];
            if (Object.prototype.hasOwnProperty.call(fields, key)) {
                var col = headers.indexOf(key);
                if (col === -1) {
                    return { success: false, message: 'عمود ' + key + ' غير موجود — شغّل إصلاح رؤوس Users' };
                }
                sheet.getRange(rowIndex, col + 1).setValue(fields[key]);
            }
        }
        var updatedCol = headers.indexOf('updatedAt');
        if (updatedCol !== -1) {
            sheet.getRange(rowIndex, updatedCol + 1).setValue(new Date());
        }
        SpreadsheetApp.flush();
        if (typeof markUsersUpdated_ === 'function') {
            markUsersUpdated_();
        }
        return { success: true };
    } catch (error) {
        Logger.log('_fastWriteUserMfaFields_ error: ' + error.toString());
        return { success: false, message: 'فشل حفظ MFA: ' + error.toString() };
    }
}

function confirmMfaEnrollment(code, actorUserData) {
    try {
        var email = String((actorUserData && actorUserData.email) || '').trim().toLowerCase();
        var otp = String(code || '').replace(/\s/g, '');
        if (!email || !otp) {
            return { success: false, message: 'رمز التأكيد مطلوب' };
        }
        var pendingSecret = peekMfaEnrollmentPending_(email);
        if (!pendingSecret) {
            return { success: false, message: 'انتهت جلسة التسجيل. أعد المحاولة من البداية.' };
        }
        if (!verifyTotpCode_(pendingSecret, otp, { window: (typeof MFA_ENROLL_TOTP_WINDOW_ !== 'undefined') ? MFA_ENROLL_TOTP_WINDOW_ : 5 })) {
            return { success: false, message: 'رمز التأكيد غير صحيح. تأكد من مزامنة وقت الجهاز وحاول رمزاً جديداً.' };
        }
        var user = getUserRecordFromUsersSheetByEmail_(email);
        if (!user) {
            return { success: false, message: 'المستخدم غير موجود' };
        }
        var enc = encryptMfaSecret_(pendingSecret);
        var now = new Date().toISOString();
        var upd = _fastWriteUserMfaFields_(user.id, {
            mfaEnabled: true,
            mfaSecretEnc: enc,
            mfaEnrolledAt: now
        });
        if (upd && upd.success) {
            clearMfaEnrollmentPending_(email);
            return { success: true, message: 'تم تفعيل المصادقة الثنائية بنجاح', mfaEnabled: true, mfaEnrolledAt: now };
        }
        return upd || { success: false, message: 'تعذر حفظ إعدادات MFA' };
    } catch (error) {
        Logger.log('confirmMfaEnrollment error: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تأكيد MFA: ' + error.toString() };
    }
}

/**
 * تعطيل MFA (المستخدم نفسه بكلمة المرور، أو مدير لحساب آخر)
 */
function disableMfa(payload, actorUserData) {
    try {
        var targetEmail = String((payload && payload.email) || (actorUserData && actorUserData.email) || '').trim().toLowerCase();
        var password = String((payload && payload.password) || '');
        var actorEmail = String((actorUserData && actorUserData.email) || '').trim().toLowerCase();

        if (!targetEmail) {
            return { success: false, message: 'البريد الإلكتروني مطلوب' };
        }

        var isSelf = actorEmail && actorEmail === targetEmail;
        if (!isSelf) {
            var adminGate = (typeof requireAdminActor_ === 'function')
                ? requireAdminActor_(actorUserData, 'disableMfa')
                : { ok: false, success: false, message: 'لا يمكن تعطيل MFA لمستخدم آخر' };
            if (!adminGate.ok) return adminGate;
        } else {
            if (!password) {
                return { success: false, message: 'كلمة المرور مطلوبة لتعطيل المصادقة الثنائية' };
            }
            var verify = verifyUserPasswordOnly_(targetEmail, password);
            if (!verify || !verify.success) {
                return { success: false, message: 'كلمة المرور غير صحيحة' };
            }
        }

        var user = getUserRecordFromUsersSheetByEmail_(targetEmail);
        if (!user) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        return updateUserInSheet(user.id, {
            mfaEnabled: false,
            mfaSecretEnc: '',
            mfaEnrolledAt: ''
        }, actorUserData, { internalCall: isSelf });
    } catch (error) {
        Logger.log('disableMfa error: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تعطيل MFA' };
    }
}

/**
 * تغيير كلمة مرور المستخدم الحالي (أو بواسطة مدير لبريد محدد).
 */
function changeUserPassword(payload, actorUserData) {
    try {
        var email = String((payload && payload.email) || (actorUserData && actorUserData.email) || '').trim().toLowerCase();
        var currentPassword = String((payload && payload.currentPassword) || '');
        var newPassword = String((payload && payload.newPassword) || '');

        if (!email || !currentPassword || !newPassword) {
            return { success: false, message: 'بيانات تغيير كلمة المرور ناقصة' };
        }
        if (String(newPassword).trim().length < 6) {
            return { success: false, message: 'كلمة المرور الجديدة قصيرة جداً (6 أحرف على الأقل)' };
        }

        var actorEmail = String((actorUserData && actorUserData.email) || '').trim().toLowerCase();
        if (!actorEmail || actorEmail !== email) {
            var adminGate = (typeof requireAdminActor_ === 'function')
                ? requireAdminActor_(actorUserData, 'changePassword')
                : { ok: false, success: false, message: 'لا يمكن تغيير كلمة مرور مستخدم آخر' };
            if (!adminGate.ok) return adminGate;
        }

        var verify = verifyUserPasswordOnly_(email, currentPassword);
        if (!verify || !verify.success || !verify.user) {
            return { success: false, message: 'كلمة المرور الحالية غير صحيحة' };
        }

        var userId = verify.user.id || email;
        var newHash = hashPassword(String(newPassword).trim());
        return updateUserInSheet(userId, {
            passwordHash: newHash,
            password: '***',
            passwordChanged: true,
            forcePasswordChange: false
        }, actorUserData, { internalCall: true });
    } catch (error) {
        Logger.log('changeUserPassword error: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تغيير كلمة المرور: ' + error.toString() };
    }
}

/**
 * SEC-01 مرحلة 0 — تدقيق قراءة فقط (لا يغيّر بيانات ولا يعطّل bootstrap).
 * يُرجع عدد المدراء النشطين ببريد حقيقي بدون أي hashes/كلمات مرور.
 */
function auditSec01Phase0_() {
    try {
        var spreadsheetId = getSpreadsheetId();
        var rows = readFromSheet('Users', spreadsheetId, true);
        if (!rows || !Array.isArray(rows)) {
            return { success: false, message: 'فشل قراءة ورقة Users', phase: '0' };
        }

        function normRole_(r) {
            return String(r || '').trim().toLowerCase();
        }
        function isAdminRole_(role) {
            var r = normRole_(role);
            return r === 'admin' ||
                r === 'system_admin' ||
                r === 'superadmin' ||
                r === 'super_admin' ||
                r === 'مدير' ||
                r === 'مدير النظام' ||
                role === 'مدير' ||
                role === 'مدير النظام';
        }
        function isActive_(u) {
            if (!u) return false;
            if (u.active === false || u.active === 'false' || u.active === 0 || u.active === '0') return false;
            return true;
        }
        function hasHash_(u) {
            var h = String((u && (u.passwordHash || u.password)) || '').trim();
            if (!h || h === '***') return false;
            return /^[a-f0-9]{64}$/i.test(h) || h.length >= 32;
        }
        function maskEmail_(email) {
            var e = String(email || '').trim().toLowerCase();
            var at = e.indexOf('@');
            if (at < 1) return '(invalid)';
            var local = e.slice(0, at);
            var domain = e.slice(at + 1);
            var keep = local.slice(0, Math.min(2, local.length));
            return keep + '***@' + domain;
        }

        var total = 0;
        var activeRealAdmins = [];
        var inactiveAdmins = 0;
        var legacyHseLocal = 0;
        var bootstrapExact = 0;
        var adminsMissingHash = 0;

        for (var i = 0; i < rows.length; i++) {
            var u = rows[i];
            if (!u) continue;
            var email = normalizeSheetScalarField_(u.email).toLowerCase();
            if (!email) continue;
            total++;

            if (email === 'admin@hse.local') bootstrapExact++;
            if (email.indexOf('@hse.local') !== -1) legacyHseLocal++;

            if (!isAdminRole_(u.role)) continue;
            if (!isActive_(u)) {
                inactiveAdmins++;
                continue;
            }
            if (email.indexOf('@hse.local') !== -1) continue;

            var okHash = hasHash_(u);
            if (!okHash) adminsMissingHash++;

            activeRealAdmins.push({
                emailMasked: maskEmail_(email),
                role: String(u.role || ''),
                hasPasswordHash: okHash,
                idPresent: !!normalizeSheetScalarField_(u.id)
            });
        }

        var gatePass = activeRealAdmins.length >= 2 &&
            activeRealAdmins.filter(function (a) { return a.hasPasswordHash; }).length >= 2;

        return {
            success: true,
            phase: '0',
            readOnly: true,
            spreadsheetIdSuffix: String(spreadsheetId || '').slice(-8),
            totals: {
                usersWithEmail: total,
                activeRealAdmins: activeRealAdmins.length,
                inactiveAdmins: inactiveAdmins,
                legacyHseLocalEmails: legacyHseLocal,
                bootstrapExactEmailRows: bootstrapExact,
                activeRealAdminsMissingHash: adminsMissingHash
            },
            activeRealAdmins: activeRealAdmins,
            gates: {
                minTwoActiveRealAdmins: activeRealAdmins.length >= 2,
                minTwoWithPasswordHash: activeRealAdmins.filter(function (a) { return a.hasPasswordHash; }).length >= 2,
                phase0CodeGatePass: gatePass
            },
            notes: [
                'لا يغيّر هذا التدقيق أي بيانات ولا يعطّل bootstrap.',
                'تجربة الدخول بكلمات المرور تتطلب تأكيداً بشرياً (لا تُنفَّذ من الوكيل).'
            ]
        };
    } catch (error) {
        Logger.log('auditSec01Phase0_ error: ' + error.toString());
        return { success: false, phase: '0', message: String(error) };
    }
}
