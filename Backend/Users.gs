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
 * تنقية سجل مستخدم للعميل (بدون passwordHash أو tokens)
 */
function sanitizeUserRecordForClient_(user, isAdmin, actorEmail) {
    if (!user || typeof user !== 'object') return null;
    var out = {};
    var safeFields = ['id', 'name', 'email', 'department', 'active', 'role', 'jobTitle', 'phone', 'photo', 'isOnline', 'lastLogin', 'passwordChanged', 'forcePasswordChange', 'updatedAt', 'createdAt', 'mfaEnabled'];
    for (var i = 0; i < safeFields.length; i++) {
        var f = safeFields[i];
        if (user[f] !== undefined) out[f] = user[f];
    }
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
        var sanitized = [];
        for (var j = 0; j < rows.length; j++) {
            var u = sanitizeUserRecordForClient_(rows[j], isAdmin, actorEmail);
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

/**
 * جلب سجل مستخدم من ورقة Users للتحقق من الصلاحيات من المصدر الرسمي (مع كاش readFromSheet).
 * @param {string} email
 * @return {Object|null}
 */
function getUserRecordFromUsersSheetByEmail_(email) {
    try {
        var e = normalizeSheetScalarField_(email).toLowerCase();
        if (!e) return null;
        var spreadsheetId = getSpreadsheetId();
        // Skip security filter to get passwordHash for authentication
        var users = readFromSheet('Users', spreadsheetId, true);
        if (!users || !Array.isArray(users)) return null;
        for (var i = 0; i < users.length; i++) {
            var u = users[i];
            if (!u) continue;
            var rowEmail = normalizeSheetScalarField_(u.email).toLowerCase();
            if (rowEmail && rowEmail === e) return u;
        }
        return null;
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
 * @param {{lastLogin?:string,isOnline?:boolean,activeSessionId?:string}} fields
 */
function _fastTouchUserLoginFields_(userId, fields) {
    if (!userId || !fields) return;
    const spreadsheetId = getSpreadsheetId();
    if (!spreadsheetId) return;
    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName('Users');
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    if (lastRow < 2 || lastCol < 1) return;

    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h || '').trim());
    const idCol = headers.indexOf('id');
    if (idCol === -1) return;

    const ids = sheet.getRange(2, idCol + 1, lastRow - 1, 1).getValues();
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
    if ('isOnline' in fields) {
        const c = headers.indexOf('isOnline');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.isOnline]);
    }
    if ('activeSessionId' in fields) {
        const c = headers.indexOf('activeSessionId');
        if (c !== -1) cellWrites.push([rowIndex, c + 1, fields.activeSessionId]);
    }
    cellWrites.forEach(w => sheet.getRange(w[0], w[1]).setValue(w[2]));
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

        if (!e || !p) {
            return { success: false, message: 'البريد الإلكتروني وكلمة المرور مطلوبان' };
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

        // تحديث الـ Hash تلقائياً إذا لزم الأمر
        if (needsHashUpdate) {
            const newHash = hashPassword(p);
            updateUserInSheet(user.id, { passwordHash: newHash, password: '***' }, null, { internalCall: true });
        }

        // MFA: إذا مفعّل — لا نُكمل الجلسة حتى التحقق من TOTP
        if (typeof isMfaEnabledForUser_ === 'function' && isMfaEnabledForUser_(user)) {
            var challengeToken = (typeof createMfaChallenge_ === 'function')
                ? createMfaChallenge_(e)
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

        // تسجيل وقت الدخول — مسار سريع (تحديث خلايا مستهدفة فقط بدون قراءة الشيت كاملاً)
        try {
            _fastTouchUserLoginFields_(user.id, {
                lastLogin: new Date().toISOString(),
                isOnline: false,
                activeSessionId: ''
            });
        } catch (loginTimeError) {
            Logger.log('Warning: Could not update lastLogin: ' + loginTimeError.toString());
        }

        // تجهيز كائن المستخدم للإرجاع (بدون بيانات حساسة)
        const safeUser = buildSafeUserFromRecord_(user);

        return {
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: safeUser
        };

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
        var otp = String(code || '').trim();

        if (!e || !token || !otp) {
            return { success: false, message: 'بيانات المصادقة الثنائية ناقصة' };
        }

        if (typeof checkMfaRateLimit_ === 'function') {
            var rl = checkMfaRateLimit_(e);
            if (!rl.ok) return { success: false, message: rl.message };
        }

        if (typeof consumeMfaChallenge_ !== 'function' || !consumeMfaChallenge_(token, e)) {
            return { success: false, message: 'انتهت صلاحية جلسة المصادقة. أعد تسجيل الدخول.' };
        }

        var user = getUserRecordFromUsersSheetByEmail_(e);
        if (!user || !isMfaEnabledForUser_(user)) {
            return { success: false, message: 'المصادقة الثنائية غير مفعّلة لهذا الحساب' };
        }

        var secretEnc = String(user.mfaSecretEnc || '').trim();
        var secret = (typeof decryptMfaSecret_ === 'function') ? decryptMfaSecret_(secretEnc) : '';
        if (!secret || typeof verifyTotpCode_ !== 'function' || !verifyTotpCode_(secret, otp)) {
            if (typeof recordMfaFailure_ === 'function') recordMfaFailure_(e);
            if (typeof logSecurityEvent === 'function') {
                logSecurityEvent('mfa_login_failed', { email: e, severity: 'medium' });
            }
            return { success: false, message: 'رمز المصادقة الثنائية غير صحيح' };
        }

        if (typeof clearMfaFailures_ === 'function') clearMfaFailures_(e);

        try {
            _fastTouchUserLoginFields_(user.id, {
                lastLogin: new Date().toISOString(),
                isOnline: false,
                activeSessionId: ''
            });
        } catch (loginTimeError) {
            Logger.log('Warning: Could not update lastLogin after MFA: ' + loginTimeError.toString());
        }

        return {
            success: true,
            message: 'تم تسجيل الدخول بنجاح',
            user: buildSafeUserFromRecord_(user)
        };
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
