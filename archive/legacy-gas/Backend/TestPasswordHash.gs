/**
 * اختبارات حماية passwordHash في ورقة Users
 * شغّل كل دالة من محرر Apps Script ثم راجع السجلات (Logs)
 */

// ─── اختبار 1: saveToSheet مع passwordHash = '***' لا يمسح الهاش ───
function test_saveToSheet_preserves_hash() {
    try {
        const spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) { Logger.log('SKIP: No spreadsheetId'); return; }

        // قراءة أول مستخدم حقيقي
        const users = readFromSheet('Users', spreadsheetId, true);
        if (!users || users.length === 0) { Logger.log('SKIP: No users in sheet'); return; }

        const testUser = users[0];
        const realHash = testUser.passwordHash || '';
        Logger.log('BEFORE — passwordHash: ' + realHash);

        if (!realHash || realHash === '***') {
            Logger.log('SKIP: Test user has no real hash to protect');
            return;
        }

        // محاكاة ما يرسله الـ frontend: passwordHash = '***'
        const fakeUpdateData = JSON.parse(JSON.stringify(testUser));
        fakeUpdateData.passwordHash = '***';
        fakeUpdateData.password = '***';
        fakeUpdateData.name = testUser.name || 'TestUser'; // تعديل بسيط

        // استدعاء saveToSheet بمصفوفة كاملة (مسار autoSave)
        const allUsers = JSON.parse(JSON.stringify(users));
        const idx = allUsers.findIndex(u => u.id === testUser.id);
        allUsers[idx] = fakeUpdateData;

        const result = saveToSheet('Users', allUsers, spreadsheetId);
        Logger.log('saveToSheet result: ' + JSON.stringify(result));

        // التحقق — قراءة الهاش مرة أخرى
        const afterUsers = readFromSheet('Users', spreadsheetId, true);
        const afterUser = afterUsers.find(u => u.id === testUser.id);
        const afterHash = afterUser ? (afterUser.passwordHash || '') : '';
        Logger.log('AFTER  — passwordHash: ' + afterHash);

        if (afterHash === realHash) {
            Logger.log('✅ PASS: passwordHash محمي — لم يُمسح');
        } else if (afterHash === '***') {
            Logger.log('❌ FAIL: passwordHash أصبح "***" — المشكلة لا تزال موجودة!');
        } else if (afterHash === '') {
            Logger.log('❌ FAIL: passwordHash مُسح تماماً!');
        } else {
            Logger.log('❌ FAIL: passwordHash تغيّر إلى قيمة غير متوقعة: ' + afterHash);
        }
    } catch (e) {
        Logger.log('ERROR in test_saveToSheet_preserves_hash: ' + e.toString());
    }
}

// ─── اختبار 2: updateUserInSheet مع passwordHash = '***' لا يمسح الهاش ───
function test_updateUserInSheet_preserves_hash() {
    try {
        const spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) { Logger.log('SKIP: No spreadsheetId'); return; }

        const users = readFromSheet('Users', spreadsheetId, true);
        if (!users || users.length === 0) { Logger.log('SKIP: No users in sheet'); return; }

        const testUser = users[0];
        const realHash = testUser.passwordHash || '';
        Logger.log('BEFORE — passwordHash: ' + realHash);

        if (!realHash || realHash === '***') {
            Logger.log('SKIP: Test user has no real hash to protect');
            return;
        }

        // محاكاة تحديث بسيط (تغيير الاسم فقط) بدون إرسال passwordHash
        const result = updateUserInSheet(testUser.id, {
            name: testUser.name || 'TestUser_Updated',
            updatedAt: new Date().toISOString()
        });
        Logger.log('updateUserInSheet result: ' + JSON.stringify(result));

        const afterUsers = readFromSheet('Users', spreadsheetId, true);
        const afterUser = afterUsers.find(u => u.id === testUser.id);
        const afterHash = afterUser ? (afterUser.passwordHash || '') : '';
        Logger.log('AFTER  — passwordHash: ' + afterHash);

        if (afterHash === realHash) {
            Logger.log('✅ PASS: passwordHash محمي بعد updateUserInSheet');
        } else {
            Logger.log('❌ FAIL: passwordHash تغيّر! قبل: ' + realHash + ' | بعد: ' + afterHash);
        }
    } catch (e) {
        Logger.log('ERROR in test_updateUserInSheet_preserves_hash: ' + e.toString());
    }
}

// ─── اختبار 3: updateUserInSheet مع passwordHash = '***' صريحاً ───
function test_updateUserInSheet_sentinel_ignored() {
    try {
        const spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) { Logger.log('SKIP: No spreadsheetId'); return; }

        const users = readFromSheet('Users', spreadsheetId, true);
        if (!users || users.length === 0) { Logger.log('SKIP: No users in sheet'); return; }

        const testUser = users[0];
        const realHash = testUser.passwordHash || '';
        Logger.log('BEFORE — passwordHash: ' + realHash);

        if (!realHash || realHash === '***') {
            Logger.log('SKIP: Test user has no real hash to protect');
            return;
        }

        // إرسال '***' صراحةً (محاكاة الـ bug القديم)
        const result = updateUserInSheet(testUser.id, {
            passwordHash: '***',
            password: '***',
            name: testUser.name
        });
        Logger.log('updateUserInSheet result: ' + JSON.stringify(result));

        const afterUsers = readFromSheet('Users', spreadsheetId, true);
        const afterUser = afterUsers.find(u => u.id === testUser.id);
        const afterHash = afterUser ? (afterUser.passwordHash || '') : '';
        Logger.log('AFTER  — passwordHash: ' + afterHash);

        if (afterHash === realHash) {
            Logger.log('✅ PASS: sentinel "***" تم تجاهله — الهاش محمي');
        } else {
            Logger.log('❌ FAIL: sentinel "***" أفسد الهاش! قبل: ' + realHash + ' | بعد: ' + afterHash);
        }
    } catch (e) {
        Logger.log('ERROR in test_updateUserInSheet_sentinel_ignored: ' + e.toString());
    }
}

// ─── اختبار 4: loginUser يعمل بعد الحماية ───
function test_loginUser_works() {
    try {
        // استخدام Bootstrap admin للاختبار (لا يحتاج بيانات حقيقية)
        const result = loginUser('admin@hse.local', 'admin123');
        Logger.log('loginUser bootstrap result: ' + JSON.stringify(result));
        // النتيجة إما success=true أو "بيانات الاعتماد غير صحيحة" (إذا لم يكن موجوداً في الشيت)
        // المهم أنها لا ترمي exception
        Logger.log('✅ PASS: loginUser يعمل دون أخطاء غير متوقعة');
    } catch (e) {
        Logger.log('❌ FAIL: loginUser رمى exception: ' + e.toString());
    }
}

// ─── شغّل جميع الاختبارات دفعةً واحدة ───
function runAllPasswordHashTests() {
    Logger.log('======= بداية اختبارات passwordHash =======');
    test_saveToSheet_preserves_hash();
    Logger.log('---');
    test_updateUserInSheet_preserves_hash();
    Logger.log('---');
    test_updateUserInSheet_sentinel_ignored();
    Logger.log('---');
    test_loginUser_works();
    Logger.log('======= نهاية الاختبارات =======');
}
