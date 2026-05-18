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
 */
function updateUserInSheet(userId, updateData) {
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
 * جلب سجل مستخدم من ورقة Users للتحقق من الصلاحيات من المصدر الرسمي (مع كاش readFromSheet).
 * @param {string} email
 * @return {Object|null}
 */
function getUserRecordFromUsersSheetByEmail_(email) {
    try {
        var e = String(email || '').trim().toLowerCase();
        if (!e) return null;
        var spreadsheetId = getSpreadsheetId();
        // Skip security filter to get passwordHash for authentication
        var users = readFromSheet('Users', spreadsheetId, true);
        if (!users || !Array.isArray(users)) return null;
        for (var i = 0; i < users.length; i++) {
            var u = users[i];
            if (u && String(u.email || '').trim().toLowerCase() === e) return u;
        }
        return null;
    } catch (err) {
        Logger.log('getUserRecordFromUsersSheetByEmail_: ' + err.toString());
        return null;
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
            updateUserInSheet(user.id, { passwordHash: newHash, password: '***' });
        }

        // تسجيل وقت الدخول وإعادة تعيين حالة الجلسة السابقة
        try {
            updateUserInSheet(user.id, {
                lastLogin: new Date().toISOString(),
                isOnline: false,
                activeSessionId: null
            });
        } catch (loginTimeError) {
            Logger.log('Warning: Could not update lastLogin: ' + loginTimeError.toString());
        }

        // تجهيز كائن المستخدم للإرجاع (بدون بيانات حساسة)
        const safeUser = {};
        const sensitiveFields = ['password', 'passwordHash', 'token', 'loginHistory'];
        for (var key in user) {
            if (user.hasOwnProperty(key) && !sensitiveFields.includes(key)) {
                safeUser[key] = user[key];
            }
        }

        // تطبيع الصلاحيات
        if (typeof safeUser.permissions === 'string') {
            try {
                safeUser.permissions = JSON.parse(safeUser.permissions);
            } catch (ex) {
                safeUser.permissions = {};
            }
        }

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
