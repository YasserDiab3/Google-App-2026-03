/**
 * Google Apps Script for HSE System - Clinic Module
 * 
 * موديول العيادة - النسخة المحسنة
 */

/**
 * ============================================
 * زيارات العيادة (Clinic Visits)
 * ============================================
 */

/**
 * تحويل قائمة الأدوية (array أو JSON string) إلى نص قابل للتخزين (بدون JSON) + إجمالي كمية
 */
function flattenDispensedMedications_(medications) {
    let medsArr = [];
    try {
        if (!medications) {
            medsArr = [];
        } else if (Array.isArray(medications)) {
            medsArr = medications;
        } else if (typeof medications === 'string') {
            const s = medications.trim();
            if (!s) medsArr = [];
            else {
                const parsed = JSON.parse(s);
                medsArr = Array.isArray(parsed) ? parsed : [];
            }
        } else {
            medsArr = [];
        }
    } catch (e) {
        medsArr = [];
    }

    const parts = [];
    let totalQty = 0;
    medsArr.forEach(m => {
        if (!m || typeof m !== 'object') return;
        
        // ✅ إصلاح: التأكد من أن name هو string وليس object
        let name = m.medicationName || m.name || '';
        
        // ✅ Debug: تسجيل نوع name قبل المعالجة
        if (typeof name === 'object' && name !== null) {
            Logger.log('⚠️ [BACKEND] اكتشاف name كـ object: ' + JSON.stringify(name));
            name = name.medicationName || name.name || '';
            Logger.log('✅ [BACKEND] بعد الاستخراج: ' + name);
        }
        
        name = (name || '').toString().trim();
        const qty = parseInt(m.quantity, 10) || 0;
        
        if (name) {
            parts.push(name + (qty ? ` (${qty})` : ''));
        }
        totalQty += qty;
    });

    return {
        medicationsDispensed: parts.length ? parts.join('، ') : '',
        medicationsDispensedQty: totalQty
    };
}

/**
 * إعادة بناء قائمة أدوية منصرفة من نص (بدون JSON في الشيت)
 * صيغة النص: "Paracetamol (2)، Ibuprofen (1)" أو "Paracetamol، Ibuprofen"
 */
function parseDispensedMedicationsText_(text) {
    const s = (text || '').toString().trim();
    if (!s) return [];

    // split by Arabic comma or normal comma
    const parts = s.split(/،|,/).map(p => p.trim()).filter(Boolean);
    const result = [];

    parts.forEach(p => {
        // match "name (qty)"
        const m = p.match(/^(.*?)(?:\(\s*(\d+)\s*\))?$/);
        if (!m) return;
        const name = (m[1] || '').trim();
        const qty = m[2] ? parseInt(m[2], 10) : 1;
        if (!name) return;
        result.push({ medicationName: name, quantity: isNaN(qty) ? 1 : qty });
    });

    return result;
}

/**
 * تجهيز سجل الزيارة للكتابة في الشيت بدون أي حقول JSON
 */
function normalizeClinicVisitForSheet_(visitData) {
    const v = visitData && typeof visitData === 'object' ? visitData : {};
    const flattened = flattenDispensedMedications_(v.medications);

    // نحذف/نمنع أي حقول قد تُخزن كـ JSON
    const clean = {};
    for (var k in v) {
        if (!v.hasOwnProperty(k)) continue;
        if (k === 'medications') continue; // منع JSON array
        // ✅ نحتفظ بـ createdBy و updatedBy لأنها ستُعالج لاحقاً
        clean[k] = v[k];
    }

    // حقول مسطحة للأدوية
    clean.medicationsDispensed = flattened.medicationsDispensed;
    clean.medicationsDispensedQty = flattened.medicationsDispensedQty;

    return clean;
}

/**
 * تطبيع نوع الشخص لضمان الكتابة في الشيت الصحيح
 * يقبل: employee/contractor/external أو قيم عربية مثل (موظف/مقاول/خارجي/عمالة خارجية)
 * @return {string} 'employee' | 'contractor'
 */
function normalizeClinicPersonType_(personType, visitData) {
    const raw = (personType || '').toString().trim().toLowerCase();
    if (!raw) {
        // ✅ Hard safety: infer from payload fields when personType is missing
        const hasExternalName = !!(visitData && String(visitData.externalName || '').trim());
        const hasContractorHint = !!(visitData && (
            String(visitData.contractorName || '').trim() ||
            String(visitData.contractorWorkerName || '').trim() ||
            String(visitData.contractorPosition || '').trim() ||
            String(visitData.workArea || '').trim()
        ));
        if (hasExternalName) return 'contractor';
        if (hasContractorHint) return 'contractor';
        return 'employee';
    }

    // English canonical
    if (raw === 'employee') return 'employee';
    if (raw === 'contractor') return 'contractor';
    if (raw === 'external') return 'contractor';

    // Arabic / mixed
    if (raw.includes('مقاول')) return 'contractor';
    if (raw.includes('خار')) return 'contractor'; // خارجي / عمالة خارجية => مقاول
    if (raw.includes('موظ')) return 'employee';

    // Fallback: treat unknown as employee
    return 'employee';
}

/**
 * تحديد اسم الشيت الصحيح حسب نوع الشخص
 * - employee/undefined -> ClinicVisits
 * - contractor -> ClinicContractorVisits
 */
function getClinicVisitSheetName_(visitData) {
    // يجب تمرير visitData كاملاً لـ normalizeClinicPersonType_ عندما personType فارغ
    // لاستنتاج المقاول/الخارجي من الحقول (contractorName، إلخ) وإلا يُسجّل دائماً في ClinicVisits
    const type = normalizeClinicPersonType_(
        visitData && visitData.personType,
        visitData || {}
    );
    if (type === 'contractor') return 'ClinicContractorVisits';
    return 'ClinicVisits';
}

/**
 * تحديد اسم شيت الإصابات حسب نوع الشخص
 * - employee -> Injuries (الجدول الحالي)
 * - contractor -> ClinicContractorInjuries (جدول جديد)
 */
function getClinicInjurySheetName_(injuryData) {
    const type = normalizeClinicPersonType_(
        injuryData && injuryData.personType,
        injuryData || {}
    );
    if (type === 'contractor') return 'ClinicContractorInjuries';
    return 'Injuries';
}

/**
 * الحصول على اسم المستخدم من قاعدة البيانات بناءً على email أو id
 * @param {string} email - البريد الإلكتروني للمستخدم
 * @param {string} userId - معرف المستخدم
 * @return {string} اسم المستخدم أو null
 */
function getUserNameFromDatabase_(email, userId) {
    try {
        Logger.log('🔍 [BACKEND] getUserNameFromDatabase_ - البحث عن: email=' + email + ', userId=' + userId);
        
        if (!email && !userId) {
            Logger.log('⚠️ [BACKEND] لم يتم تمرير email أو userId');
            return null;
        }
        
        const users = readFromSheet('Users', getSpreadsheetId());
        if (!users || !Array.isArray(users) || users.length === 0) {
            Logger.log('⚠️ [BACKEND] لا توجد بيانات مستخدمين في قاعدة البيانات');
            return null;
        }
        
        Logger.log('📊 [BACKEND] عدد المستخدمين في قاعدة البيانات: ' + users.length);
        
        // البحث عن المستخدم بناءً على email أو id (البحث في كلا الحالتين)
        const user = users.find(u => {
            const userEmail = (u.email || '').toString().toLowerCase().trim();
            const searchEmail = email ? email.toLowerCase().trim() : '';
            const userIdFromDb = (u.id || '').toString().trim();
            const searchUserId = userId ? userId.toString().trim() : '';
            
            // البحث بمطابقة email أو id (أو كليهما)
            const emailMatch = email && userEmail && userEmail === searchEmail;
            const idMatch = userId && userIdFromDb && userIdFromDb === searchUserId;
            
            return emailMatch || idMatch;
        });
        
        if (user) {
            // ✅ تسجيل جميع الحقول المتاحة للمستخدم للتشخيص
            Logger.log('✅ [BACKEND] تم العثور على المستخدم:');
            Logger.log('   - email: ' + (user.email || 'غير موجود'));
            Logger.log('   - name: ' + (user.name || 'غير موجود'));
            Logger.log('   - displayName: ' + (user.displayName || 'غير موجود'));
            Logger.log('   - userName: ' + (user.userName || 'غير موجود'));
            Logger.log('   - fullName: ' + (user.fullName || 'غير موجود'));
            Logger.log('   - حقول المستخدم: ' + Object.keys(user).join(', '));
            
            // ✅ البحث في عدة حقول محتملة للاسم
            const userName = (user.name || user.displayName || user.userName || user.fullName || '').toString().trim();
            if (userName && userName !== 'النظام' && userName !== '') {
                Logger.log('✅ [BACKEND] تم العثور على اسم المستخدم: ' + userName);
                return userName;
            } else {
                Logger.log('⚠️ [BACKEND] المستخدم موجود لكن حقل الاسم فارغ!');
                Logger.log('⚠️ [BACKEND] القيم: name="' + user.name + '", displayName="' + user.displayName + '"');
            }
        } else {
            Logger.log('⚠️ [BACKEND] لم يتم العثور على المستخدم بـ email=' + email + ' أو userId=' + userId);
            // عرض بعض الأمثلة من المستخدمين المتاحين
            if (users.length > 0) {
                Logger.log('📋 [BACKEND] أمثلة من المستخدمين المتاحين:');
                users.slice(0, 3).forEach((u, i) => {
                    Logger.log('   [' + i + '] email=' + (u.email || 'N/A') + ', name=' + (u.name || 'N/A'));
                });
            }
        }
        
        return null;
    } catch (error) {
        Logger.log('❌ [BACKEND] خطأ في getUserNameFromDatabase_: ' + error.toString());
        return null;
    }
}

/**
 * إضافة زيارة عيادة
 */
function addClinicVisitToSheet(visitData) {
    // ✅ Logger.log في بداية الدالة للتشخيص
    Logger.log('🚀 [BACKEND] addClinicVisitToSheet - عدد المعاملات: ' + arguments.length);
    
    // ✅ إصلاح جذري: إذا كان visitData undefined، نحاول استخدام arguments[0]
    if ((visitData === undefined || visitData === null) && arguments.length > 0 && arguments[0]) {
        Logger.log('⚠️ [BACKEND] visitData undefined، محاولة استخدام arguments[0]');
        visitData = arguments[0];
    }
    
    // ✅ إصلاح جذري: إذا لم يكن هناك معاملات على الإطلاق، نعيد خطأ واضح
    // هذا يحدث غالباً عند تشغيل الدالة يدوياً من المحرر (Editor) وليس من Web App (doPost)
    if (arguments.length === 0 && (visitData === undefined || visitData === null)) {
        Logger.log('❌ [BACKEND] ===== خطأ جذري: addClinicVisitToSheet تم استدعاؤها بدون معاملات =====');
        Logger.log('❌ [BACKEND] الوقت: ' + new Date().toISOString());
        Logger.log('❌ [BACKEND] عدد المعاملات: ' + arguments.length);
        Logger.log('❌ [BACKEND] visitData: ' + visitData);
        Logger.log('❌ [BACKEND] ============================================');
        Logger.log('❌ [BACKEND] السبب الشائع:');
        Logger.log('❌ [BACKEND] 1. تم تشغيل الدالة من المحرر (Editor) مباشرة باستخدام Run/Debug');
        Logger.log('❌ [BACKEND] 2. الطلب لم يصل إلى doPost في Code.gs (URL خاطئ أو Web App غير منشور)');
        Logger.log('❌ [BACKEND] 3. Web App منشور بنسخة قديمة من الكود');
        Logger.log('❌ [BACKEND] ============================================');
        Logger.log('❌ [BACKEND] الحلول:');
        Logger.log('❌ [BACKEND] 1. لا تشغل addClinicVisitToSheet من Run/Debug في المحرر');
        Logger.log('❌ [BACKEND] 2. استخدم testAddClinicVisitToSheet() للاختبار من المحرر');
        Logger.log('❌ [BACKEND] 3. سجل زيارة من التطبيق (Web App) ليتم استدعاء doPost ثم addClinicVisitToSheet(visitData)');
        Logger.log('❌ [BACKEND] 4. تأكد من نشر Web App كـ "New version" بعد تحديث الكود');
        Logger.log('❌ [BACKEND] 5. تحقق من أن URL التطبيق ينتهي بـ /exec وليس /dev');
        Logger.log('❌ [BACKEND] ============================================');
        return { 
            success: false, 
            message: 'خطأ: تم استدعاء addClinicVisitToSheet بدون بيانات.\n\n' +
                     'لا تشغلها من المحرر مباشرة.\n\n' +
                     'للاختبار من المحرر: استخدم testAddClinicVisitToSheet()\n\n' +
                     'للاختبار الصحيح: سجل زيارة من التطبيق (Web App) بعد نشر New version.',
            errorCode: 'NO_PARAMETERS',
            troubleshooting: {
                step1: 'لا تشغل addClinicVisitToSheet من Run/Debug',
                step2: 'استخدم testAddClinicVisitToSheet() للاختبار من المحرر',
                step3: 'سجل زيارة من التطبيق (Web App URL)',
                step4: 'تأكد من نشر Web App كـ "New version"',
                step5: 'تحقق من URL - يجب أن ينتهي بـ /exec'
            }
        };
    }
    
    try {
        if (!visitData || typeof visitData !== 'object') {
            Logger.log('❌ [BACKEND] visitData غير موجود أو غير صحيح');
            Logger.log('❌ [BACKEND] visitData value: ' + JSON.stringify(visitData));
            Logger.log('❌ [BACKEND] arguments كاملة: ' + JSON.stringify(Array.from(arguments)));
            return { success: false, message: 'بيانات الزيارة غير موجودة أو غير صحيحة' };
        }

        Logger.log('✅ [BACKEND] visitData موجود، عدد الحقول: ' + Object.keys(visitData).length);

        // ✅ FIX: التقاط medicationAdjustments بأبكر وقت ممكن — قبل أي معالجة قد تفقدها
        // يدعم: Array مباشر / JSON string (إذا تم serialize في طبقة وسيطة) / null
        var capturedMedicationAdjustments = (function() {
            if (!visitData) return null;
            var raw = visitData.medicationAdjustments;
            if (!raw) return null;
            if (Array.isArray(raw)) return raw.slice(); // نسخة لتفادي أي تغيير لاحق
            if (typeof raw === 'string') {
                try {
                    var parsed = JSON.parse(raw);
                    if (Array.isArray(parsed)) return parsed.slice();
                } catch (e) { /* ignore */ }
            }
            return null;
        })();
        Logger.log('💊 [BACKEND-ADD] medicationAdjustments المُلتقَط: ' +
            (capturedMedicationAdjustments ? capturedMedicationAdjustments.length + ' عنصر' : 'null') +
            ' | raw type: ' + typeof visitData.medicationAdjustments +
            ' | hasMedications: ' + (Array.isArray(visitData.medications) ? visitData.medications.length : 'no'));

        // ✅ تثبيت نوع الشخص بشكل موحّد لمنع التسجيل في الجدول الخطأ
        try {
            visitData.personType = normalizeClinicPersonType_(visitData.personType, visitData);
        } catch (e) {}

        // ✅✅ FIX جذري حاسم (سبب عدم الخصم عند الزيارة الجديدة):
        // كتلة خصم الأدوية أدناه (السطور ~488/493/504) كانت تستخدم المتغير
        // `spreadsheetId` بينما لم يكن مُعرَّفاً إطلاقاً داخل هذه الدالة
        // (كان مُعرَّفاً فقط داخل دوال أخرى مثل updateClinicVisit/upsertClinicVisit_).
        // النتيجة: ReferenceError يُرمى داخل try/catch الخصم → يُلتقَط بصمت →
        // الزيارة تُحفظ لكن لا يحدث أي خصم. (التعديل كان يعمل لأنه يُعرّف
        // spreadsheetId قبل الخصم — لذلك "الرجوع للتعديل" كان يخصم).
        // الإصلاح: تعريف spreadsheetId مبكراً ليتوفّر لكتلة الخصم.
        var spreadsheetId = getSpreadsheetId();

        const sheetName = getClinicVisitSheetName_(visitData);
        const normalized = normalizeClinicVisitForSheet_(visitData);

        // ✅ تأكيد تطبيع personType في البيانات المكتوبة
        try {
            normalized.personType = normalizeClinicPersonType_(normalized.personType || visitData.personType, normalized);
        } catch (e) {}
        
        // إضافة حقول تلقائية
        if (!normalized.id) {
            normalized.id = generateSequentialId('CLV', sheetName);
        }
        if (!normalized.createdAt) {
            normalized.createdAt = new Date();
        }
        if (!normalized.updatedAt) {
            normalized.updatedAt = new Date();
        }
        
        // ✅ إضافة createdBy و updatedBy (تخزين كنص فقط)
        // معالجة createdBy
        if (normalized.createdBy) {
            if (typeof normalized.createdBy === 'object') {
                // إذا كان object، نحاول استخراج name أو email أو id
                const name = (normalized.createdBy.name || '').toString().trim();
                const email = (normalized.createdBy.email || '').toString().trim();
                const id = (normalized.createdBy.id || '').toString().trim();
                
                // ✅ إصلاح: نستخدم name فقط إذا كان موجوداً وصحيحاً
                if (name && name !== 'النظام' && name !== '') {
                    normalized.createdBy = name;
                } else {
                    // ✅ إصلاح: إذا لم يكن name موجوداً، نبحث عن اسم المستخدم من قاعدة البيانات
                    const userNameFromDb = getUserNameFromDatabase_(email, id);
                    if (userNameFromDb && userNameFromDb !== 'النظام' && userNameFromDb !== '') {
                        normalized.createdBy = userNameFromDb;
                    } else {
                        Logger.log('⚠️ [BACKEND] لا توجد قيمة صحيحة لـ createdBy - استخدام "مستخدم"');
                        normalized.createdBy = 'مستخدم';
                    }
                }
            } else if (typeof normalized.createdBy === 'string') {
                // إذا كان string، نتأكد من أنه ليس فارغاً
                const trimmed = normalized.createdBy.trim();
                // ✅ إصلاح جذري: إذا كان "النظام" أو فارغ، نبحث عن اسم المستخدم من قاعدة البيانات
                if (trimmed && trimmed !== '' && trimmed !== 'النظام') {
                    normalized.createdBy = trimmed;
            } else {
                // ✅ إصلاح جذري: البحث عن اسم المستخدم من قاعدة البيانات بناءً على email أو userId
                const emailFromData = (visitData.email || '').toString().trim();
                const userIdFromData = (visitData.userId || visitData.id || '').toString().trim();
                const userNameFromDb = getUserNameFromDatabase_(emailFromData, userIdFromData);
                
                if (userNameFromDb && userNameFromDb !== 'النظام' && userNameFromDb !== '') {
                    normalized.createdBy = userNameFromDb;
                    Logger.log('✅ [BACKEND] تم استعادة اسم المستخدم من قاعدة البيانات: ' + userNameFromDb);
                } else {
                    // ✅ إذا لم نجد الاسم، نستخدم "مستخدم" كبديل بدلاً من "النظام" أو email
                    normalized.createdBy = 'مستخدم';
                    Logger.log('⚠️ [BACKEND] الاسم غير موجود في قاعدة البيانات - استخدام "مستخدم" كبديل');
                }
            }
            }
        } else {
            // ✅ إصلاح جذري: إذا لم يتم تمرير createdBy، نبحث عن اسم المستخدم من قاعدة البيانات
            const emailFromData = (visitData.email || '').toString().trim();
            const userIdFromData = (visitData.userId || visitData.id || '').toString().trim();
            const userNameFromDb = getUserNameFromDatabase_(emailFromData, userIdFromData);
            
            if (userNameFromDb && userNameFromDb !== 'النظام' && userNameFromDb !== '') {
                normalized.createdBy = userNameFromDb;
                Logger.log('✅ [BACKEND] تم استعادة اسم المستخدم من قاعدة البيانات (createdBy غير موجود): ' + userNameFromDb);
            } else {
                // ✅ إذا لم نجد الاسم، نستخدم "مستخدم" كبديل بدلاً من "النظام" أو email
                normalized.createdBy = 'مستخدم';
                Logger.log('⚠️ [BACKEND] createdBy غير موجود والاسم غير موجود في قاعدة البيانات - استخدام "مستخدم" كبديل');
            }
        }
        
        // ✅ تسجيل القيمة النهائية (مهم للتشخيص)
        Logger.log('✅ [BACKEND] createdBy النهائي: ' + normalized.createdBy);
        
        // ✅ معالجة updatedBy (تخزين كنص فقط - اسم فقط)
        if (normalized.updatedBy) {
            if (typeof normalized.updatedBy === 'object') {
                const name = (normalized.updatedBy.name || '').toString().trim();
                const email = (normalized.updatedBy.email || '').toString().trim();
                const id = (normalized.updatedBy.id || '').toString().trim();
                
                // ✅ نستخدم name فقط، وإلا نحاول جلب الاسم من قاعدة البيانات
                if (name && name !== 'النظام' && name !== '') {
                    normalized.updatedBy = name;
                } else {
                    const userNameFromDb = getUserNameFromDatabase_(email, id);
                    if (userNameFromDb && userNameFromDb !== 'النظام' && userNameFromDb !== '') {
                        normalized.updatedBy = userNameFromDb;
                    } else {
                        normalized.updatedBy = normalized.createdBy || 'مستخدم';
                        Logger.log('⚠️ [BACKEND] لا توجد قيمة صحيحة لـ updatedBy - استخدام createdBy أو "مستخدم"');
                    }
                }
            } else if (typeof normalized.updatedBy === 'string') {
                const trimmed = normalized.updatedBy.trim();
                if (trimmed && trimmed !== '' && trimmed !== 'النظام') {
                    normalized.updatedBy = trimmed;
                } else {
                    // ✅ إذا كان updatedBy فارغاً أو "النظام"، نبحث عن الاسم من قاعدة البيانات
                    const emailFromData = (visitData.email || '').toString().trim();
                    const userIdFromData = (visitData.userId || visitData.id || '').toString().trim();
                    const userNameFromDb = getUserNameFromDatabase_(emailFromData, userIdFromData);
                    
                    if (userNameFromDb && userNameFromDb !== 'النظام' && userNameFromDb !== '') {
                        normalized.updatedBy = userNameFromDb;
                        Logger.log('✅ [BACKEND] تم استعادة اسم المستخدم لـ updatedBy من قاعدة البيانات: ' + userNameFromDb);
                    } else {
                        normalized.updatedBy = normalized.createdBy || 'مستخدم';
                        Logger.log('⚠️ [BACKEND] updatedBy string فارغ ولم يتم العثور على اسم المستخدم - استخدام createdBy أو "مستخدم"');
                    }
                }
            }
        } else {
            // إذا لم يتم تمرير updatedBy، نستخدم createdBy أو القيمة الافتراضية
            normalized.updatedBy = normalized.createdBy || 'مستخدم';
        }
        
        // ✅ تسجيل القيمة النهائية (مهم للتشخيص)
        Logger.log('✅ [BACKEND] updatedBy النهائي: ' + normalized.updatedBy);
        
        // ✅ منع التكرار بين جدولين:
        // إذا كان نفس id موجوداً في أي جدول، نقوم بتحديثه بدلاً من إضافة صف جديد
        Logger.log('🚀 [BACKEND] حفظ الزيارة في: ' + sheetName + ' | id: ' + normalized.id);
        const result = upsertClinicVisit_(sheetName, normalized);
        Logger.log('✅ [BACKEND] تم الحفظ بنجاح - Row: ' + (result.rowNumber || 'N/A'));

        if (result && result.success === false) {
            return result;
        }
        
        // ✅ FIX جذري نهائي: مسار مُوحَّد لخصم الأدوية مع 3 fallback layers
        // ينجح في كل سيناريو: سواء أرسلت الواجهة medicationAdjustments، أو medications array،
        // أو حتى medicationsDispensed نص فقط — كلها تؤدي للخصم الصحيح.
        var addAdjustmentsResult = null;
        try {
            // الأولوية: medicationAdjustments المُلتقَطة في بداية الدالة
            // (لكن إذا كانت null/فارغة، نستخدم deriveMedicationAdjustments_ لاشتقاق من medications أو dispensed text)
            var adjustmentsToApply = capturedMedicationAdjustments;
            if (!Array.isArray(adjustmentsToApply) || adjustmentsToApply.length === 0) {
                Logger.log('💊 [BACKEND-ADD] capturedMedicationAdjustments فارغة — محاولة الاشتقاق من البيانات الأخرى...');
                // نمرّر visitData الأصلية + normalized (لأن normalized.medicationsDispensed مُولَّد من flatten)
                adjustmentsToApply = deriveMedicationAdjustments_(visitData, { spreadsheetId: spreadsheetId || getSpreadsheetId() });
                if (adjustmentsToApply.length === 0 && normalized && normalized.medicationsDispensed) {
                    // محاولة أخيرة من normalized (يحوي medicationsDispensed المسطَّحة)
                    adjustmentsToApply = deriveMedicationAdjustments_(
                        { medicationsDispensed: normalized.medicationsDispensed },
                        { spreadsheetId: spreadsheetId || getSpreadsheetId() }
                    );
                }
            }

            if (Array.isArray(adjustmentsToApply) && adjustmentsToApply.length > 0) {
                Logger.log('💊 [BACKEND-ADD] تطبيق ' + adjustmentsToApply.length + ' تعديل دواء لزيارة: ' + normalized.id);
                addAdjustmentsResult = applyMedicationAdjustments_(
                    adjustmentsToApply,
                    normalized.id,
                    normalized.createdBy,
                    spreadsheetId || getSpreadsheetId()
                );
                Logger.log('💊 [BACKEND-ADD] تم تطبيق ' + (addAdjustmentsResult && addAdjustmentsResult.applied || 0) +
                    ' تعديل، فشل ' + (addAdjustmentsResult && addAdjustmentsResult.failed || 0));
                if (addAdjustmentsResult && addAdjustmentsResult.details) {
                    Logger.log('💊 [BACKEND-ADD] تفاصيل: ' + JSON.stringify(addAdjustmentsResult.details).substring(0, 500));
                }
            } else {
                Logger.log('ℹ️ [BACKEND-ADD] لا توجد أدوية للخصم بعد كل المحاولات');
            }
        } catch (adjErr) {
            Logger.log('❌ [BACKEND-ADD] خطأ في خصم الأدوية: ' + adjErr.toString());
            Logger.log('❌ [BACKEND-ADD] Stack: ' + (adjErr.stack || 'no stack'));
        }
        
        var merged = (result && typeof result === 'object') ? result : { success: true };
        merged.success = true;
        merged.visitId = String(normalized.id);
        merged.sheetName = sheetName;
        if (!merged.message) {
            merged.message = 'تم تسجيل الزيارة';
        }
        if (visitData.medications && Array.isArray(visitData.medications) && visitData.medications.length > 0) {
            merged.medicationsCount = visitData.medications.length;
        }
        // ✅ إرفاق نتيجة خصم الأدوية في الاستجابة (شفافية + تشخيص — لا فشل صامت بعد الآن)
        if (addAdjustmentsResult) {
            merged.medicationAdjustmentsResult = {
                applied: addAdjustmentsResult.applied || 0,
                failed: addAdjustmentsResult.failed || 0,
                details: addAdjustmentsResult.details || []
            };
        }
        return merged;
    } catch (error) {
        Logger.log('❌ [BACKEND] ===== خطأ في addClinicVisitToSheet =====');
        Logger.log('❌ [BACKEND] الخطأ: ' + error.toString());
        Logger.log('❌ [BACKEND] Stack: ' + error.stack);
        Logger.log('❌ [BACKEND] visitData: ' + JSON.stringify(visitData));
        return { success: false, message: 'حدث خطأ أثناء إضافة الزيارة: ' + error.toString() };
    }
}

/**
 * Upsert لزيارة العيادة لمنع التكرار بين ClinicVisits و ClinicContractorVisits
 * - إذا كان id موجوداً في أي شيت: تحديث الصف هناك
 * - إذا لم يكن موجوداً: إضافة صف جديد في الشيت الهدف
 */
function upsertClinicVisit_(targetSheetName, normalizedVisit) {
    try {
        const spreadsheetId = getSpreadsheetId();
        const ss = SpreadsheetApp.openById(spreadsheetId);
        const id = (normalizedVisit && normalizedVisit.id) ? String(normalizedVisit.id).trim() : '';
        
        if (!id) {
            // fallback: append بدون id (نادر جداً)
            Logger.log('⚠️ [BACKEND] upsertClinicVisit_: لا يوجد id - سيتم الإضافة مباشرة');
            return appendToSheet(targetSheetName, normalizedVisit);
        }

        // ✅ تحديد الأوراق للبحث: نبدأ بالورقة المستهدفة (targetSheetName) ثم الورقة الأخرى
        const otherSheetName = targetSheetName === 'ClinicVisits' ? 'ClinicContractorVisits' : 'ClinicVisits';
        const candidates = [targetSheetName, otherSheetName];
        
        let targetSheet = null;
        let targetRowIndex = -1;

        // 1) ابحث عن الزيارة في الأوراق المرشحة
        for (var i = 0; i < candidates.length; i++) {
            const sName = candidates[i];
            const sheet = ss.getSheetByName(sName);
            if (!sheet) continue;
            
            const lastRow = sheet.getLastRow();
            if (lastRow < 2) continue;
            
            // قراءة عمود id فقط (أسرع)
            const idColumn = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
            
            for (var r = 0; r < idColumn.length; r++) {
                if (idColumn[r][0] && String(idColumn[r][0]).trim() === id) {
                    targetSheet = sheet;
                    targetRowIndex = r + 2; // +2 لأن الصفوف تبدأ من 1 وهناك header والـ loop تبدأ من index 0 (الصف 2)
                    break;
                }
            }
            if (targetRowIndex !== -1) break;
        }

        if (targetRowIndex !== -1 && targetSheet) {
            const currentSheetName = targetSheet.getName();
            Logger.log('✅ [BACKEND] upsertClinicVisit_: تم العثور على id موجود في: ' + currentSheetName + ' (row=' + targetRowIndex + ') - سيتم التحديث');

            // ✅ تحديث الصف مباشرة
            const headers = targetSheet.getRange(1, 1, 1, targetSheet.getLastColumn()).getValues()[0];
            const rowData = [];

            // تحويل normalizedVisit إلى array بناءً على الرؤوس
            for (var h = 0; h < headers.length; h++) {
                const headerName = headers[h] ? String(headers[h]).trim() : '';
                if (headerName && normalizedVisit.hasOwnProperty(headerName)) {
                    rowData.push(normalizedVisit[headerName]);
                } else {
                    rowData.push('');
                }
            }

            targetSheet.getRange(targetRowIndex, 1, 1, rowData.length).setValues([rowData]);

            // ✅ مسح الcache لضمان قراءة البيانات المحدثة
            if (typeof invalidateHseSheetCaches === 'function') {
                invalidateHseSheetCaches(currentSheetName);
            }

            return {
                success: true,
                message: 'تم تحديث الزيارة بنجاح',
                id: id,
                rowNumber: targetRowIndex,
                sheetName: currentSheetName,
                updated: true
            };
        }

        // 2) غير موجود: إضافة جديدة في الشيت الهدف (targetSheetName)
        Logger.log('✅ [BACKEND] upsertClinicVisit_: id غير موجود في أي شيت - سيتم الإضافة في: ' + targetSheetName);
        const appendResult = appendToSheet(targetSheetName, normalizedVisit);
        appendResult.inserted = true;
        return appendResult;
        
    } catch (error) {
        Logger.log('❌ [BACKEND] upsertClinicVisit_ error: ' + error.toString());
        return {
            success: false,
            message: 'خطأ في تحديث/إضافة الزيارة: ' + error.toString()
        };
    }
}

/**
 * تحديث زيارة عيادة
 */
function updateClinicVisit(visitId, updateData) {
    try {
        if (!visitId) {
            return { success: false, message: 'معرف الزيارة غير محدد' };
        }

        const spreadsheetId = getSpreadsheetId();
        const ss = SpreadsheetApp.openById(spreadsheetId);

        // ✅ FIX: التقاط medicationAdjustments قبل normalize (الـ normalize يحذف الحقل)
        // medicationAdjustments: [{ medicationId, delta }] delta>0 = صرف (نقص)، delta<0 = استرجاع
        var medicationAdjustments = null;
        if (updateData && Array.isArray(updateData.medicationAdjustments)) {
            medicationAdjustments = updateData.medicationAdjustments.slice();
        }

        const normalizedUpdate = normalizeClinicVisitForSheet_(updateData || {});
        normalizedUpdate.updatedAt = new Date();

        // ✅ تثبيت نوع الشخص (لو تم تمريره)
        try {
            if (normalizedUpdate.personType) {
                normalizedUpdate.personType = normalizeClinicPersonType_(normalizedUpdate.personType, normalizedUpdate);
            }
        } catch (e) {}

        // ✅ معالجة updatedBy و createdBy (نص فقط)
        if (normalizedUpdate.updatedBy) {
            if (typeof normalizedUpdate.updatedBy === 'object') {
                const name = (normalizedUpdate.updatedBy.name || '').toString().trim();
                normalizedUpdate.updatedBy = (name && name !== 'النظام' && name !== '') ? name : 'النظام';
            } else {
                normalizedUpdate.updatedBy = String(normalizedUpdate.updatedBy).trim() || 'النظام';
            }
        } else {
            normalizedUpdate.updatedBy = 'النظام';
        }

        if (normalizedUpdate.createdBy) {
            if (typeof normalizedUpdate.createdBy === 'object') {
                const name = (normalizedUpdate.createdBy.name || '').toString().trim();
                normalizedUpdate.createdBy = (name && name !== 'النظام' && name !== '') ? name : 'النظام';
            } else {
                normalizedUpdate.createdBy = String(normalizedUpdate.createdBy).trim() || 'النظام';
            }
        }

        // ✅ بحث سريع وتحديث مباشر بدون قراءة البيانات
        const sheetCandidates = ['ClinicVisits', 'ClinicContractorVisits'];
        for (var s = 0; s < sheetCandidates.length; s++) {
            const sheetName = sheetCandidates[s];
            const sheet = ss.getSheetByName(sheetName);
            if (!sheet) continue;

            // بحث سريع في عمود id فقط
            const lastRow = sheet.getLastRow();
            if (lastRow < 2) continue;

            const idColumn = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
            let visitIndex = -1;

            for (var r = 0; r < idColumn.length; r++) {
                if (idColumn[r][0] && String(idColumn[r][0]) === visitId) {
                    visitIndex = r;
                    break;
                }
            }

            if (visitIndex === -1) continue;

            // ✅ تحديث مباشر بدون قراءة البيانات
            const rowIndex = visitIndex + 2; // +2 لأن الصفوف تبدأ من 1 وهناك header
            const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
            const rowData = [];

            // قراءة البيانات الحالية من الصف
            const currentRowData = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];

            // بناء الصف الجديد
            for (var h = 0; h < headers.length; h++) {
                const headerName = headers[h] ? String(headers[h]).trim() : '';
                if (headerName && normalizedUpdate.hasOwnProperty(headerName)) {
                    rowData.push(normalizedUpdate[headerName]);
                } else {
                    rowData.push(currentRowData[h] || '');
                }
            }

            // تحديث الصف مباشرة
            sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);

            // ✅ مسح الcache لضمان قراءة البيانات المحدثة
            if (typeof invalidateHseSheetCaches === 'function') {
                invalidateHseSheetCaches(sheetName);
            }

            Logger.log('✅ [BACKEND] updateClinicVisit: تم تحديث الزيارة ' + visitId + ' في ' + sheetName + ' (row=' + rowIndex + ')');

            // ✅ FIX: تطبيق تعديلات الأدوية atomically (delta-based) بعد حفظ الزيارة
            // delta>0 = صرف جديد (نقص الرصيد)، delta<0 = استرجاع (زيادة الرصيد)
            // ✅ تحسين: لو لم تُرسل medicationAdjustments، نشتقها من updateData (medications أو dispensed text)
            var adjustmentsResult = null;
            var adjustmentsToApply = medicationAdjustments;
            if (!Array.isArray(adjustmentsToApply) || adjustmentsToApply.length === 0) {
                Logger.log('💊 [BACKEND-UPDATE] medicationAdjustments فارغة — محاولة الاشتقاق من updateData...');
                adjustmentsToApply = deriveMedicationAdjustments_(updateData, { spreadsheetId: spreadsheetId });
            }
            if (Array.isArray(adjustmentsToApply) && adjustmentsToApply.length > 0) {
                try {
                    adjustmentsResult = applyMedicationAdjustments_(adjustmentsToApply, visitId, normalizedUpdate.updatedBy, spreadsheetId);
                    Logger.log('💊 [BACKEND-UPDATE] تم تطبيق ' + (adjustmentsResult.applied || 0) + ' تعديل دواء، فشل ' + (adjustmentsResult.failed || 0));
                } catch (adjError) {
                    Logger.log('❌ [BACKEND-UPDATE] خطأ في applyMedicationAdjustments_: ' + adjError.toString());
                }
            } else {
                Logger.log('ℹ️ [BACKEND-UPDATE] لا توجد أدوية للتعديل');
            }

            return {
                success: true,
                message: 'تم تحديث الزيارة',
                visitId: visitId,
                sheetName: sheetName,
                rowNumber: rowIndex,
                medicationAdjustmentsResult: adjustmentsResult
            };
        }

        return { success: false, message: 'الزيارة غير موجودة' };
    } catch (error) {
        Logger.log('❌ [BACKEND] Error updating clinic visit: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الزيارة: ' + error.toString() };
    }
}

/**
 * ✅ تطبيق تعديلات الأدوية بناءً على delta — مسار موحد للـ ADD و EDIT
 * delta > 0  : صرف جديد (نقص الرصيد)
 * delta < 0  : استرجاع (زيادة الرصيد، مع حد أعلى = quantityAdded)
 * يستخدم updateSingleRowInSheet لكل دواء — atomic per row، آمن من race conditions.
 *
 * @param {Array<{medicationId: string, delta: number}>} adjustments
 * @param {string} visitId
 * @param {string} dispensedBy
 * @param {string} spreadsheetId
 * @returns {{success: boolean, applied: number, failed: number, details: Array}}
 */
/**
 * ✅ مُشتق مُوحَّد لـ medicationAdjustments من أي من المصادر التالية:
 *   1) visitData.medicationAdjustments (الأولوية القصوى — يحوي delta صحيح للـ ADD والـ EDIT)
 *   2) visitData.medications (مصفوفة من { medicationId, quantity }) — يحوّل لـ delta = +quantity
 *   3) visitData.medicationsDispensed (نص: "اسم × كمية, ...") — يبحث عن medicationId بالاسم في الورقة
 *
 * @param {Object} visitData
 * @param {Object} [opts]
 * @param {string} [opts.spreadsheetId]
 * @param {string} [opts.prevVisitId] - لـ EDIT: لقراءة الـ medications السابقة لحساب الـ delta
 * @returns {Array<{medicationId: string, delta: number}>} مصفوفة (قد تكون فارغة)
 */
function deriveMedicationAdjustments_(visitData, opts) {
    opts = opts || {};
    var spreadsheetId = opts.spreadsheetId || getSpreadsheetId();
    if (!visitData || typeof visitData !== 'object') return [];

    // 1) medicationAdjustments الجاهز (الأولوية)
    var raw = visitData.medicationAdjustments;
    if (Array.isArray(raw) && raw.length > 0) {
        Logger.log('💊 [DERIVE] استخدام medicationAdjustments المرسلة (' + raw.length + ' عنصر)');
        return raw.slice();
    }
    if (typeof raw === 'string') {
        try {
            var parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                Logger.log('💊 [DERIVE] استخدام medicationAdjustments من JSON string');
                return parsed.slice();
            }
        } catch (e) {}
    }

    // 2) medications مصفوفة كائنات — اشتقاق delta = +quantity
    var meds = visitData.medications;
    if (Array.isArray(meds) && meds.length > 0) {
        Logger.log('💊 [DERIVE] اشتقاق adjustments من medications array (' + meds.length + ' عنصر)');
        var derived = [];
        meds.forEach(function(m) {
            if (!m) return;
            var id = String(m.medicationId || m.id || '').trim();
            var qty = parseInt(m.quantity, 10) || 0;
            if (!id || qty <= 0) return;
            derived.push({ medicationId: id, delta: qty });
        });
        if (derived.length > 0) return derived;
    }

    // 3) medicationsDispensed نص (تنسيق: "اسم1 × 2, اسم2 × 1")
    var dispensedText = visitData.medicationsDispensed || visitData.medicationsDispensedText || '';
    if (typeof dispensedText === 'string' && dispensedText.trim()) {
        Logger.log('💊 [DERIVE] محاولة اشتقاق من medicationsDispensed نص: ' + dispensedText.substring(0, 100));
        try {
            var allMeds = readFromSheet('Medications', spreadsheetId);
            if (Array.isArray(allMeds) && allMeds.length > 0) {
                // فصل على الفواصل (، ,) والسطور الجديدة
                var parts = String(dispensedText).split(/[،,\n]+/);
                var derivedFromText = [];
                parts.forEach(function(p) {
                    if (!p) return;
                    // محاولة استخراج: "اسم × عدد"
                    var match = String(p).match(/^(.+?)\s*[×x*]\s*(\d+)\s*$/);
                    var name, qty;
                    if (match) {
                        name = match[1].trim();
                        qty = parseInt(match[2], 10);
                    } else {
                        name = p.trim();
                        qty = 1;
                    }
                    if (!name || !qty || qty <= 0) return;
                    var med = allMeds.find(function(mm) {
                        if (!mm) return false;
                        var mn = String(mm.medicationName || mm.name || '').trim();
                        return mn === name;
                    });
                    if (med && med.id) {
                        derivedFromText.push({ medicationId: String(med.id).trim(), delta: qty });
                    } else {
                        Logger.log('⚠️ [DERIVE] لم يُعثر على دواء بالاسم: ' + name);
                    }
                });
                if (derivedFromText.length > 0) {
                    Logger.log('💊 [DERIVE] اشتقاق ' + derivedFromText.length + ' adjustments من النص');
                    return derivedFromText;
                }
            }
        } catch (e) {
            Logger.log('❌ [DERIVE] خطأ في اشتقاق من medicationsDispensed: ' + e.toString());
        }
    }

    Logger.log('ℹ️ [DERIVE] لا توجد بيانات أدوية في visitData');
    return [];
}

function applyMedicationAdjustments_(adjustments, visitId, dispensedBy, spreadsheetId) {
    var result = { success: true, applied: 0, failed: 0, details: [] };
    if (!Array.isArray(adjustments) || adjustments.length === 0) return result;
    if (!spreadsheetId) spreadsheetId = getSpreadsheetId();

    var sheetName = 'Medications';
    var logSheetName = 'MedicationDispenseLog';

    // ✅ FIX: LockService لمنع TOCTOU race بين مستخدمين موازيَين
    // يخصم/يُضيف صفّ-صفّ atomically — لا تداخل بين زيارات تُحدِّث نفس الدواء.
    // المهلة 30 ثانية — كافية لـ batch صغير، وتُحرّر تلقائياً عند الإكتمال أو الخطأ.
    var lock = null;
    try { lock = LockService.getScriptLock(); } catch (e) {}
    if (lock) {
        try {
            lock.waitLock(30000);
        } catch (lockErr) {
            Logger.log('⚠️ applyMedicationAdjustments_: تعذّر الحصول على القفل خلال 30 ثانية، نُكمل بدون قفل (احتمال race منخفض): ' + lockErr.toString());
            lock = null; // نُكمل بدون قفل — أفضل من فشل العملية
        }
    }

    try {
        // قراءة واحدة فقط للحصول على القيم الحالية لجميع الأدوية المطلوبة
        var allMeds = readFromSheet(sheetName, spreadsheetId);
        if (!Array.isArray(allMeds)) {
            return { success: false, applied: 0, failed: adjustments.length, details: [{ error: 'تعذر قراءة جدول الأدوية' }] };
        }

        for (var i = 0; i < adjustments.length; i++) {
            var adj = adjustments[i];
            if (!adj || !adj.medicationId) continue;
            var medId = String(adj.medicationId).trim();
            var delta = parseFloat(adj.delta) || 0;
            if (delta === 0) continue;

            var med = allMeds.find(function(m) { return m && String(m.id).trim() === medId; });
            if (!med) {
                result.failed++;
                result.details.push({ medicationId: medId, error: 'الدواء غير موجود' });
                continue;
            }

            // ✅ FIX: تعامل مع '' (empty string) كـ null — readFromSheet يُعيد '' للخلايا الفارغة
            // parseFloat('') = NaN → NaN || 0 = 0 → يكسر الحساب ويجعل currentRemaining = 0
            var _isBlank = function(v) { return v == null || v === ''; };
            var currentRemaining = parseFloat(
                !_isBlank(med.remainingQuantity) ? med.remainingQuantity
                    : (!_isBlank(med.quantity) ? med.quantity : 0)
            ) || 0;
            var capQty = parseFloat(
                !_isBlank(med.quantityAdded) ? med.quantityAdded
                    : (!_isBlank(med.quantity) ? med.quantity : 0)
            ) || 0;
            if (capQty <= 0) capQty = Math.max(currentRemaining, Math.abs(delta));

            // delta > 0 → نقص الرصيد. delta < 0 → استرجاع (زيادة) مع تقييد بـ capQty
            var newRemaining = currentRemaining - delta;
            if (newRemaining < 0) newRemaining = 0;
            if (newRemaining > capQty) newRemaining = capQty;

            // إعداد updateData — فقط الحقول المتغيرة (atomic update)
            var updateData = {
                remainingQuantity: newRemaining,
                quantityAdded: capQty,
                updatedAt: new Date(),
                updatedBy: dispensedBy || 'System'
            };

            // تحديث حالة الدواء حسب الرصيد
            if (newRemaining === 0) updateData.status = 'منتهي';
            else if (newRemaining <= 10) updateData.status = 'منخفض';

            try {
                var upd = updateSingleRowInSheet(sheetName, medId, updateData, spreadsheetId);
                if (upd && upd.success) {
                    result.applied++;
                    result.details.push({
                        medicationId: medId,
                        medicationName: med.name || med.medicationName || '',
                        previousQuantity: currentRemaining,
                        newQuantity: newRemaining,
                        delta: delta
                    });

                    // سجل في MedicationDispenseLog (للصرف فقط، delta>0)
                    if (delta > 0) {
                        try {
                            appendToSheet(logSheetName, {
                                id: generateSequentialId('MDL', logSheetName),
                                visitId: visitId || '',
                                medicationId: medId,
                                medicationName: med.name || med.medicationName || '',
                                previousQuantity: currentRemaining,
                                deductedQuantity: delta,
                                newQuantity: newRemaining,
                                dispensedBy: dispensedBy || 'System',
                                dispensedAt: new Date().toISOString(),
                                notes: visitId ? ('صرف عيادة — زيارة #' + visitId) : 'صرف عيادة'
                            });
                        } catch (logErr) {
                            // ابتلاع آمن — الـ log السطحي لا يجب أن يُفشل الخصم الفعلي
                            Logger.log('⚠️ applyMedicationAdjustments_: فشل تسجيل MedicationDispenseLog (الخصم نجح): ' + logErr.toString());
                        }
                    }
                } else {
                    result.failed++;
                    result.details.push({ medicationId: medId, error: (upd && upd.message) || 'فشل تحديث الدواء' });
                }
            } catch (writeErr) {
                result.failed++;
                result.details.push({ medicationId: medId, error: writeErr.toString() });
            }
        }

        if (result.failed > 0 && result.applied === 0) {
            result.success = false;
        }
        return result;
    } finally {
        // ضمان تحرير القفل في كل الأحوال (نجاح/خطأ/إفلات استثناء)
        if (lock) {
            try { lock.releaseLock(); } catch (relErr) {
                Logger.log('⚠️ applyMedicationAdjustments_: فشل تحرير القفل: ' + relErr.toString());
            }
        }
    }
}

/**
 * أداة صيانة: نقل زيارات المقاولين من جدول الموظفين (القديم) إلى جدول المقاولين (الجديد)
 * وحذفها من جدول الموظفين لترتيب وتنظيف قاعدة البيانات
 */
function migrateContractorVisits() {
    try {
        const spreadsheetId = getSpreadsheetId();
        const ss = SpreadsheetApp.openById(spreadsheetId);
        
        const empSheet = ss.getSheetByName('ClinicVisits');
        const conSheet = ss.getSheetByName('ClinicContractorVisits');
        
        if (!empSheet || !conSheet) {
            return { success: false, message: 'الجداول غير موجودة' };
        }
        
        // 1. جلب معرفات المقاولين الموجودة بالفعل في الجدول الجديد لمنع التكرار
        const existingConData = readFromSheet('ClinicContractorVisits', spreadsheetId) || [];
        const existingIds = new Set(existingConData.map(r => String(r.id || '').trim()).filter(id => id));
        
        const lastRow = empSheet.getLastRow();
        if (lastRow < 2) {
            return { success: true, message: 'لا توجد بيانات لترحيلها', migratedCount: 0 };
        }
        
        const headers = empSheet.getRange(1, 1, 1, empSheet.getLastColumn()).getValues()[0];
        const data = empSheet.getRange(2, 1, lastRow - 1, empSheet.getLastColumn()).getValues();
        
        const employeesToKeep = [];
        const rowsToMigrate = [];
        
        for (let i = 0; i < data.length; i++) {
            const rowData = {};
            headers.forEach((h, idx) => {
                if (h) rowData[String(h).trim()] = data[i][idx];
            });
            
            // تحقق مما إذا كانت الزيارة للمقاولين
            let personType = String(rowData.personType || '').toLowerCase().trim();
            const isContractor = personType.includes('contractor') || personType.includes('مقاول') || personType.includes('external') || personType.includes('خارجي') || rowData.contractorName || rowData.contractorWorkerName || rowData.externalName;
            
            if (isContractor) {
                if (!rowData.id) {
                    rowData.id = ('VISIT_' + Date.now() + Math.floor(Math.random() * 1000));
                }
                rowData.personType = 'contractor';
                rowsToMigrate.push(rowData);
            } else {
                // نحتفظ بصفوف الموظفين لإعادة كتابتها لاحقاً
                employeesToKeep.push(data[i]);
            }
        }
        
        const totalToMigrate = rowsToMigrate.length;
        if (totalToMigrate === 0) {
            return { success: true, message: 'لا توجد زيارات مقاولين في جدول الموظفين. قاعدة البيانات نظيفة تماماً.', migratedCount: 0 };
        }
        
        // 2. إضافة السجلات لجدول المقاولين دفعة واحدة (إذا لم تكن مضافة مسبقاً)
        let appendedCount = 0;
        for (let j = 0; j < rowsToMigrate.length; j++) {
            const rowId = String(rowsToMigrate[j].id).trim();
            if (!existingIds.has(rowId)) {
                appendToSheet('ClinicContractorVisits', rowsToMigrate[j], spreadsheetId);
                existingIds.add(rowId);
                appendedCount++;
            }
        }
        
        // 3. الطريقة فائقة السرعة: مسح قيم جدول الموظفين بالكامل وإعادة كتابة صفوف الموظفين فقط
        // هذا يتم في أقل من ثانية واحدة ويتجنب تماماً مهلة الاتصال (Timeout)
        empSheet.getRange(2, 1, lastRow - 1, empSheet.getLastColumn()).clearContent();
        
        if (employeesToKeep.length > 0) {
            empSheet.getRange(2, 1, employeesToKeep.length, empSheet.getLastColumn()).setValues(employeesToKeep);
        }
        
        // إذا كان الجدول القديم يحتوي على صفوف فارغة زائدة في الأسفل بعد الترحيل، نقوم بحذفها
        const currentLastRow = empSheet.getLastRow();
        const expectedLastRow = employeesToKeep.length + 1;
        if (currentLastRow > expectedLastRow) {
            empSheet.deleteRows(expectedLastRow + 1, currentLastRow - expectedLastRow);
        }
        
        // مسح الكاش لإجبار النظام على القراءة من الشيت
        invalidateHseSheetCaches('ClinicVisits');
        invalidateHseSheetCaches('ClinicContractorVisits');
        SpreadsheetApp.flush();
        
        return { 
            success: true, 
            message: `🎉 اكتملت العملية تماماً بنجاح فائق!\n` +
                     `- تم معالجة وترحيل: ${totalToMigrate} سجل مقاول بنجاح.\n` +
                     `- تم إضافة: ${appendedCount} سجل جديد إلى جدول المقاولين الجديد.\n` +
                     `- تم تنظيف جدول الموظفين تماماً وبسرعة فائقة.`, 
            migratedCount: totalToMigrate 
        };
    } catch (error) {
        Logger.log('❌ [BACKEND] Error migrating contractor visits: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الترحيل: ' + error.toString() };
    }
}

/**
 * أداة تشخيصية لمعرفة سبب عدم مسح الصفوف
 */
function debugMigration() {
    try {
        const spreadsheetId = getSpreadsheetId();
        const ss = SpreadsheetApp.openById(spreadsheetId);
        const empSheet = ss.getSheetByName('ClinicVisits');
        if (!empSheet) return { success: false, message: 'جدول ClinicVisits غير موجود' };
        
        const lastRowBefore = empSheet.getLastRow();
        const data = empSheet.getRange(2, 1, lastRowBefore - 1, empSheet.getLastColumn()).getValues();
        
        // محاكاة حذف أول صف مقاول
        const headers = empSheet.getRange(1, 1, 1, empSheet.getLastColumn()).getValues()[0];
        let targetRow = -1;
        let targetData = null;
        
        for (let i = 0; i < data.length; i++) {
            const rowData = {};
            headers.forEach((h, idx) => {
                if (h) rowData[String(h).trim()] = data[i][idx];
            });
            let personType = String(rowData.personType || '').toLowerCase().trim();
            const isContractor = personType.includes('contractor') || personType.includes('مقاول') || personType.includes('external') || personType.includes('خارجي') || rowData.contractorName || rowData.contractorWorkerName || rowData.externalName;
            
            if (isContractor) {
                targetRow = i + 2;
                targetData = rowData;
                break;
            }
        }
        
        if (targetRow === -1) {
            return { success: true, message: 'لم يتم العثور على أي مقاولين في جدول الموظفين.' };
        }
        
        // محاولة حذف الصف
        const valBefore = empSheet.getRange(targetRow, 1, 1, empSheet.getLastColumn()).getValues()[0];
        
        empSheet.deleteRow(targetRow);
        SpreadsheetApp.flush(); // إجبار التغييرات على الحفظ فوراً
        
        const valAfter = empSheet.getRange(targetRow, 1, 1, empSheet.getLastColumn()).getValues()[0];
        const lastRowAfter = empSheet.getLastRow();
        
        const isDifferent = JSON.stringify(valBefore) !== JSON.stringify(valAfter);
        
        return {
            success: true,
            message: `تشخيص دقيق:\n` +
                     `- الصف المستهدف: ${targetRow}\n` +
                     `- الاسم قبل: ${targetData.name || targetData.contractorWorkerName || valBefore[2]}\n` +
                     `- الاسم في نفس الصف بعد الحذف: ${valAfter[2]}\n` +
                     `- هل تغير محتوى الصف؟ ${isDifferent ? 'نعم (تم الحذف بنجاح وتزحزحت الصفوف)' : 'لا (فشل الحذف وظل نفس الصف!)'}\n` +
                     `- الصفوف قبل: ${lastRowBefore} | بعد: ${lastRowAfter}`
        };
    } catch (e) {
        return { success: false, message: 'خطأ تشخيصي: ' + e.toString() };
    }
}

/**
 * ✅ دالة هجرة يدوية: تنقل سجلات المقاولين القديمة من ClinicVisits إلى ClinicContractorVisits.
 *
 * تُستدعى يدوياً من محرر Apps Script (Run → migrateLegacyContractorVisits_).
 * آمنة: تعمل بـ dry-run افتراضياً وتطبع تقريراً قبل الكتابة.
 *
 * @param {boolean} apply  مرر true لتنفيذ الهجرة فعلياً. الافتراضي false (تقرير فقط).
 * @return {object} ملخص (totalScanned, contractorsFound, migrated, errors)
 */
function migrateLegacyContractorVisits_(apply) {
    const dryRun = (apply !== true);
    const summary = { totalScanned: 0, contractorsFound: 0, migrated: 0, errors: [] };
    try {
        const spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) throw new Error('No spreadsheetId');
        const ss = SpreadsheetApp.openById(spreadsheetId);
        const srcSheet = ss.getSheetByName('ClinicVisits');
        if (!srcSheet) throw new Error('ClinicVisits sheet not found');

        // التأكد من وجود ورقة الوجهة بهيكلها الصحيح
        createSheetWithHeaders(ss, 'ClinicContractorVisits', {});
        ensureSheetHeaders(ss.getSheetByName('ClinicContractorVisits'), 'ClinicContractorVisits', {});
        const dstSheet = ss.getSheetByName('ClinicContractorVisits');

        const srcLastRow = srcSheet.getLastRow();
        const srcLastCol = srcSheet.getLastColumn();
        if (srcLastRow < 2) {
            Logger.log('migrateLegacyContractorVisits_: ClinicVisits is empty');
            return summary;
        }

        const srcRange = srcSheet.getRange(1, 1, srcLastRow, srcLastCol);
        const srcValues = srcRange.getValues();
        const srcHeaders = srcValues[0].map(h => String(h || '').trim());
        const dstHeaders = dstSheet.getRange(1, 1, 1, dstSheet.getLastColumn()).getValues()[0].map(h => String(h || '').trim());

        const idxPersonType = srcHeaders.indexOf('personType');
        const idxContractorName = srcHeaders.indexOf('contractorName');
        const idxContractorWorker = srcHeaders.indexOf('contractorWorkerName');
        const idxExternalName = srcHeaders.indexOf('externalName');

        const rowsToMigrate = []; // [{srcRowIndex (1-based), rowObj}]
        for (let r = 1; r < srcValues.length; r++) {
            summary.totalScanned++;
            const row = srcValues[r];
            const pt = String(row[idxPersonType] !== undefined ? row[idxPersonType] : '').toLowerCase().trim();
            const hasContractorField =
                (idxContractorName !== -1 && row[idxContractorName]) ||
                (idxContractorWorker !== -1 && row[idxContractorWorker]) ||
                (idxExternalName !== -1 && row[idxExternalName]);
            const isContractor = pt.indexOf('contractor') !== -1 || pt.indexOf('مقاول') !== -1
                || pt.indexOf('external') !== -1 || pt.indexOf('خارجي') !== -1
                || (!!hasContractorField && !pt.indexOf('employee') && !pt.indexOf('موظف'));
            if (!isContractor) continue;
            summary.contractorsFound++;
            const rowObj = {};
            srcHeaders.forEach((h, i) => { if (h) rowObj[h] = row[i]; });
            rowObj.personType = 'contractor';
            rowsToMigrate.push({ srcRow: r + 1, obj: rowObj });
        }

        Logger.log('migrateLegacyContractorVisits_: scanned=' + summary.totalScanned
            + ', contractorsFound=' + summary.contractorsFound
            + ', mode=' + (dryRun ? 'DRY-RUN' : 'APPLY'));

        if (dryRun) {
            rowsToMigrate.slice(0, 5).forEach((m, i) => {
                Logger.log('  sample[' + i + '] row=' + m.srcRow + ' name=' + (m.obj.contractorName || m.obj.contractorWorkerName || m.obj.externalName || ''));
            });
            return summary;
        }

        // كتابة السجلات إلى ClinicContractorVisits مع مطابقة ترتيب الأعمدة
        if (rowsToMigrate.length > 0) {
            const appendRows = rowsToMigrate.map(m => dstHeaders.map(h => h && m.obj.hasOwnProperty(h) ? m.obj[h] : ''));
            const startRow = dstSheet.getLastRow() + 1;
            dstSheet.getRange(startRow, 1, appendRows.length, dstHeaders.length).setValues(appendRows);
            summary.migrated = appendRows.length;

            // حذف الصفوف الأصلية من ClinicVisits (من الأسفل للأعلى لتجنّب اختلال الفهارس)
            const srcRowsToDelete = rowsToMigrate.map(m => m.srcRow).sort((a, b) => b - a);
            srcRowsToDelete.forEach(r => {
                try { srcSheet.deleteRow(r); }
                catch (delErr) { summary.errors.push('deleteRow ' + r + ': ' + delErr.toString()); }
            });

            // إبطال الكاش
            try {
                const cache = CacheService.getScriptCache();
                cache.remove('hse_read_ClinicVisits_v1');
                cache.remove('hse_read_ClinicVisits_raw');
                cache.remove('hse_read_ClinicContractorVisits_v1');
                cache.remove('hse_read_ClinicContractorVisits_raw');
            } catch (cacheErr) { /* ignore */ }
        }

        Logger.log('migrateLegacyContractorVisits_ DONE: migrated=' + summary.migrated + ', errors=' + summary.errors.length);
        return summary;
    } catch (err) {
        summary.errors.push(err.toString());
        Logger.log('migrateLegacyContractorVisits_ ERROR: ' + err.toString());
        return summary;
    }
}

/**
 * مغلِّفات سهلة الاستدعاء من المحرر:
 * - dryRunMigrateContractorVisits: يطبع تقريراً بدون أي كتابة
 * - applyMigrateContractorVisits: ينفّذ الهجرة فعلياً
 */
function dryRunMigrateContractorVisits() { return migrateLegacyContractorVisits_(false); }
function applyMigrateContractorVisits() { return migrateLegacyContractorVisits_(true); }

/**
 * الحصول على جميع زيارات العيادة

 */
function getAllClinicVisits(filters = {}) {
    var perfStart = Date.now();
    try {
        const spreadsheetId = getSpreadsheetId();



        // ✅ تشخيص: قراءة آمنة لكل ورقة على حدة + تسجيل العدد للتأكد من اكتمال تحميل المقاولين
        let employeeData = [];
        try {
            const empRaw = readFromSheet('ClinicVisits', spreadsheetId) || [];
            employeeData = empRaw.map(v => {
                if (v && typeof v === 'object') v._tempSourceType = 'employee';
                return v;
            });
            Logger.log('getAllClinicVisits: ClinicVisits rows = ' + employeeData.length);
        } catch (empErr) {
            Logger.log('getAllClinicVisits: ERROR reading ClinicVisits: ' + empErr.toString());
        }

        let contractorData = [];
        try {
            const conRaw = readFromSheet('ClinicContractorVisits', spreadsheetId) || [];
            contractorData = conRaw.map(v => {
                if (v && typeof v === 'object') v._tempSourceType = 'contractor';
                return v;
            });
            Logger.log('getAllClinicVisits: ClinicContractorVisits rows = ' + contractorData.length);
        } catch (conErr) {
            Logger.log('getAllClinicVisits: ERROR reading ClinicContractorVisits: ' + conErr.toString());
        }

        let data = employeeData.concat(contractorData);

        // ✅ إزالة التكرار بين ClinicVisits و ClinicContractorVisits لنفس id (بيانات قديمة قبل فصل الجداول)
        if (data.length > 1) {
            const deduped = [];
            const idIndex = new Map();
            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                if (!row || typeof row !== 'object') continue;
                const rid = String(row.id || '').trim();
                if (!rid) {
                    deduped.push(row);
                    continue;
                }
                if (!idIndex.has(rid)) {
                    idIndex.set(rid, deduped.length);
                    deduped.push(row);
                    continue;
                }
                const existingIdx = idIndex.get(rid);
                const existing = deduped[existingIdx];
                const rowIsContractor = row._tempSourceType === 'contractor' || String(row.personType || '').toLowerCase() === 'contractor';
                const existingIsContractor = existing && (existing._tempSourceType === 'contractor' || String(existing.personType || '').toLowerCase() === 'contractor');
                if (rowIsContractor && !existingIsContractor) {
                    deduped[existingIdx] = row;
                }
            }
            if (deduped.length !== data.length) {
                Logger.log('getAllClinicVisits: removed ' + (data.length - deduped.length) + ' cross-sheet duplicate id(s)');
            }
            data = deduped;
        }

        // ✅ تطبيع البيانات وضمان وجود معرفات فريدة
        data = data.map((v, index) => {
            if (!v || typeof v !== 'object') return v;

            // 1. ضمان وجود ID ثابت إذا كان مفقوداً
            if (!v.id) {
                // توليد معرف ثابت بناءً على محتوى الصف فقط (بدون index) لتجنب التغير عند إضافة صفوف
                const namePart = (v.employeeName || v.contractorName || v.employeeCode || v.contractorWorkerName || '').toString().trim();
                const datePart = (v.visitDate || v.createdAt || '').toString().trim();
                const reasonPart = (v.reason || v.diagnosis || '').toString().trim();
                // نستخدم أول 12 حرف من الـ hash لضمان فرادة كافية
                const seed = namePart + '|' + datePart + '|' + reasonPart;
                v.id = 'STB_' + index + '_' + Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, seed))
                                .replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
            }
            
            // 2. توحيد نوع الشخص — أولويات الكشف (الأقوى أولاً):
            //    (أ) personType صريح في الصف
            //    (ب) وجود أي حقل خاص بالمقاول/الخارجي في الصف (هذه قرينة أقوى من شيت المصدر،
            //        لأن السجلات القديمة قد تكون في ClinicVisits قبل فصل الجداول)
            //    (ج) شيت المصدر (_tempSourceType) كاحتياطٍ أخير
            const explicitType = String(v.personType || '').toLowerCase().trim();
            const hasContractorFields = !!(v.contractorName || v.contractorWorkerName || v.externalName);

            if (explicitType.includes('contractor') || explicitType.includes('مقاول') || explicitType.includes('external') || explicitType.includes('خارجي')) {
                v.personType = 'contractor';
            } else if (hasContractorFields) {
                // ✅ إصلاح: سجل قديم في ClinicVisits بدون personType لكن يحمل اسم مقاول/عامل خارجي → مقاول
                v.personType = 'contractor';
            } else if (explicitType.includes('employee') || explicitType.includes('موظف')) {
                v.personType = 'employee';
            } else {
                // لا تلميح صريح ولا حقول مقاول → استخدم الشيت المصدر
                v.personType = (v._tempSourceType === 'contractor') ? 'contractor' : 'employee';
            }
            
            // 3. إعادة بناء medications بشكل شامل
            let medsArray = [];
            if (v.medications) {
                if (Array.isArray(v.medications)) {
                    medsArray = v.medications;
                } else if (typeof v.medications === 'string' && v.medications.trim()) {
                    try {
                        const parsed = JSON.parse(v.medications);
                        if (Array.isArray(parsed)) medsArray = parsed;
                    } catch (e) {}
                }
            }
            
            if (medsArray.length === 0 && v.medicationsDispensed) {
                medsArray = parseDispensedMedicationsText_(v.medicationsDispensed);
            }
            v.medications = medsArray;
            
            // ✅ التأكد من وجود createdBy و updatedBy (للبيانات القديمة)
            if (!v.createdBy) {
                v.createdBy = null;
            }
            if (!v.updatedBy) {
                v.updatedBy = null;
            }

            // حقل داخلي للتطبيع فقط — لا يُرسل للواجهة
            if (v._tempSourceType !== undefined) {
                delete v._tempSourceType;
            }
            
            return v;
        });
        
        // تطبيق الفلاتر
        if (filters.employeeCode) {
            data = data.filter(v => v.employeeCode === filters.employeeCode);
        }
        if (filters.personType) {
            data = data.filter(v => v.personType === filters.personType);
        }
        if (filters.reason) {
            data = data.filter(v => v.reason === filters.reason);
        }
        if (filters.startDate) {
            data = data.filter(v => {
                if (!v.visitDate) return false;
                return new Date(v.visitDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(v => {
                if (!v.visitDate) return false;
                return new Date(v.visitDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب التاريخ
        data.sort((a, b) => {
            const dateA = new Date(a.visitDate || a.createdAt || 0);
            const dateB = new Date(b.visitDate || b.createdAt || 0);
            return dateB - dateA;
        });

        var totalMatched = data.length;
        var limit = parseInt(filters.limit, 10);
        var truncated = false;
        if (!isNaN(limit) && isFinite(limit) && limit > 0 && data.length > limit) {
            data = data.slice(0, limit);
            truncated = true;
        }

        var elapsedMs = Date.now() - perfStart;
        if (elapsedMs > 5000) {
            Logger.log('getAllClinicVisits slow: ' + elapsedMs + 'ms matched=' + totalMatched + ' returned=' + data.length + ' truncated=' + truncated);
        }
        return {
            success: true,
            data: data,
            count: data.length,
            totalMatched: totalMatched,
            truncated: truncated,
            limit: (!isNaN(limit) && isFinite(limit) && limit > 0) ? limit : null,
            elapsedMs: elapsedMs
        };
    } catch (error) {
        Logger.log('Error getting all clinic visits: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الزيارات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * الأدوية (Medications)
 * ============================================
 */

/**
 * إضافة دواء
 */
function addMedicationToSheet(medicationData) {
    try {
        if (!medicationData) {
            return { success: false, message: 'بيانات الدواء غير موجودة' };
        }
        
        const sheetName = 'Medications';

        // ✅ تأكيد أن الحقول الرقمية تُحفظ كأرقام
        if (medicationData.quantityAdded !== undefined && medicationData.quantityAdded !== null) {
            medicationData.quantityAdded = parseFloat(medicationData.quantityAdded) || 0;
        }
        if (medicationData.remainingQuantity !== undefined && medicationData.remainingQuantity !== null) {
            medicationData.remainingQuantity = parseFloat(medicationData.remainingQuantity) || 0;
        }
        if (medicationData.quantity !== undefined && medicationData.quantity !== null) {
            medicationData.quantity = parseFloat(medicationData.quantity) || 0;
        }

        // ✅ تطبيع الكمية/الرصيد لضمان التوافق مع الواجهة
        // - quantityAdded = الكمية (المدخلة/المضافة)
        // - remainingQuantity = الرصيد (بعد الصرف)
        if (medicationData.quantityAdded === undefined || medicationData.quantityAdded === null) {
            if (medicationData.quantity !== undefined && medicationData.quantity !== null) {
                medicationData.quantityAdded = medicationData.quantity;
            }
        }
        if (medicationData.remainingQuantity === undefined || medicationData.remainingQuantity === null) {
            if (medicationData.quantityAdded !== undefined && medicationData.quantityAdded !== null) {
                medicationData.remainingQuantity = medicationData.quantityAdded;
            } else if (medicationData.quantity !== undefined && medicationData.quantity !== null) {
                medicationData.remainingQuantity = medicationData.quantity;
            }
        }
        
        // إضافة حقول تلقائية
        if (!medicationData.id) {
            medicationData.id = generateSequentialId('MED', sheetName);
        }
        if (!medicationData.createdAt) {
            medicationData.createdAt = new Date();
        }
        if (!medicationData.updatedAt) {
            medicationData.updatedAt = new Date();
        }
        if (!medicationData.status) {
            medicationData.status = 'ساري';
        }
        
        // ✅ منع تخزين JSON في أي خلية: createdBy يتم تخزينه كنص فقط (اسم/بريد)
        if (medicationData.createdBy && typeof medicationData.createdBy === 'object') {
            medicationData.createdBy = (medicationData.createdBy.name || medicationData.createdBy.email || '').toString();
        }
        // ✅ إضافة updatedBy (تخزين كنص فقط)
        if (medicationData.updatedBy && typeof medicationData.updatedBy === 'object') {
            medicationData.updatedBy = (medicationData.updatedBy.name || medicationData.updatedBy.email || '').toString();
        }
        if (!medicationData.updatedBy && medicationData.createdBy) {
            medicationData.updatedBy = medicationData.createdBy;
        }
        
        // حساب الأيام المتبقية للانتهاء (فقط إذا لم يكن محسوباً مسبقاً)
        if (medicationData.expiryDate && (medicationData.daysRemaining === undefined || medicationData.daysRemaining === null)) {
            const expiryDate = new Date(medicationData.expiryDate);
            const now = new Date();
            const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
            medicationData.daysRemaining = daysRemaining;

            // حساب الرصيد المتبقي
            const remainingQuantity = parseFloat(medicationData.remainingQuantity ?? medicationData.quantityAdded ?? medicationData.quantity ?? 0);
            const hasStock = remainingQuantity > 0;

            // تحديث الحالة بناءً على الأيام المتبقية (فقط إذا لم تكن محددة)
            if (!medicationData.status || medicationData.status === 'ساري') {
                if (daysRemaining < 0) {
                    medicationData.status = 'منتهي';
                } else if (daysRemaining <= 30) {
                    // ✅ مهم: عرض "قريب الانتهاء" فقط إذا كان هناك رصيد متبقي
                    medicationData.status = hasStock ? 'قريب الانتهاء' : 'ساري';
                } else {
                    medicationData.status = 'ساري';
                }
            }
        }
        
        Logger.log('Adding medication to sheet: ' + JSON.stringify({
            id: medicationData.id,
            name: medicationData.name,
            type: medicationData.type,
            hasExpiryDate: !!medicationData.expiryDate,
            daysRemaining: medicationData.daysRemaining,
            status: medicationData.status
        }));
        
        return appendToSheet(sheetName, medicationData);
    } catch (error) {
        Logger.log('Error in addMedicationToSheet: ' + error.toString());
        Logger.log('Medication data: ' + JSON.stringify(medicationData));
        return { success: false, message: 'حدث خطأ أثناء إضافة الدواء: ' + error.toString() };
    }
}

/**
 * تحديث دواء
 */
function updateMedication(medicationId, updateData) {
    try {
        if (!medicationId) {
            return { success: false, message: 'معرف الدواء غير محدد' };
        }

        const sheetName = 'Medications';
        const spreadsheetId = getSpreadsheetId();

        // ✅ إصلاح race condition: لو تم استدعاء updateMedication بالتوازي لـ N دواء،
        // الكود القديم كان يفعل readFromSheet (سنابشوت) → modify → saveToSheet (UPSERT الكامل)،
        // فيخرّب كل نداء سنابشوت الآخر ويُبقي فقط تعديلات آخر نداء يكتب.
        // الحل: قراءة سجل واحد فقط للحقول الافتراضية، ثم تحديث صف واحد بـ updateSingleRowInSheet
        // الذي يكتب الخلايا المُتغيّرة فقط بصف محدد بـ id (atomic per-row).
        const existing = getMedicationById_(medicationId, spreadsheetId);
        if (!existing) {
            return { success: false, message: 'الدواء غير موجود' };
        }

        updateData.updatedAt = new Date();

        // ✅ تأكيد أن الحقول الرقمية تُحفظ كأرقام
        if (updateData.quantityAdded !== undefined && updateData.quantityAdded !== null) {
            updateData.quantityAdded = parseFloat(updateData.quantityAdded) || 0;
        }
        if (updateData.remainingQuantity !== undefined && updateData.remainingQuantity !== null) {
            updateData.remainingQuantity = parseFloat(updateData.remainingQuantity) || 0;
        }
        if (updateData.quantity !== undefined && updateData.quantity !== null) {
            updateData.quantity = parseFloat(updateData.quantity) || 0;
        }

        // ✅ تطبيع الكمية/الرصيد عند التحديث أيضاً
        if (updateData.quantityAdded === undefined || updateData.quantityAdded === null) {
            if (updateData.quantity !== undefined && updateData.quantity !== null) {
                updateData.quantityAdded = updateData.quantity;
            }
        }
        if (updateData.remainingQuantity === undefined || updateData.remainingQuantity === null) {
            if (updateData.quantityAdded !== undefined && updateData.quantityAdded !== null) {
                updateData.remainingQuantity = updateData.quantityAdded;
            } else if (updateData.quantity !== undefined && updateData.quantity !== null) {
                updateData.remainingQuantity = updateData.quantity;
            }
        }

        // ✅ منع تخزين JSON في أي خلية: createdBy يتم تخزينه كنص فقط (اسم/بريد)
        if (updateData.createdBy && typeof updateData.createdBy === 'object') {
            updateData.createdBy = (updateData.createdBy.name || updateData.createdBy.email || '').toString();
        }
        if (updateData.updatedBy && typeof updateData.updatedBy === 'object') {
            updateData.updatedBy = (updateData.updatedBy.name || updateData.updatedBy.email || '').toString();
        }
        if (!updateData.updatedBy) {
            updateData.updatedBy = existing?.createdBy || existing?.updatedBy || 'النظام';
        }

        // إعادة حساب الأيام المتبقية إذا تم تحديث تاريخ الانتهاء
        if (updateData.expiryDate) {
            const expiryDate = new Date(updateData.expiryDate);
            const now = new Date();
            const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
            updateData.daysRemaining = daysRemaining;

            const remainingQuantity = parseFloat(updateData.remainingQuantity ?? updateData.quantityAdded ?? updateData.quantity ?? existing.remainingQuantity ?? existing.quantity ?? 0);
            const hasStock = remainingQuantity > 0;

            if (daysRemaining < 0) {
                updateData.status = 'منتهي';
            } else if (daysRemaining <= 30) {
                updateData.status = hasStock ? 'قريب الانتهاء' : 'ساري';
            } else {
                updateData.status = updateData.status || 'ساري';
            }
        }

        // ✅ تحديث atomic لصف واحد فقط — يمنع race condition بين نداءات updateMedication المتوازية
        return updateSingleRowInSheet(sheetName, medicationId, updateData, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating medication: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الدواء: ' + error.toString() };
    }
}

/**
 * Helper: اقرأ سجل دواء واحد بمعرّفه (لتفادي قراءة كامل الجدول)
 */
function getMedicationById_(medicationId, spreadsheetId) {
    try {
        const data = readFromSheet('Medications', spreadsheetId);
        if (!Array.isArray(data)) return null;
        return data.find(m => m && String(m.id) === String(medicationId)) || null;
    } catch (e) {
        Logger.log('getMedicationById_ error: ' + e.toString());
        return null;
    }
}

/**
 * حذف دواء
 */
function deleteMedication(medicationId) {
    try {
        if (!medicationId) {
            return { success: false, message: 'معرف الدواء غير محدد' };
        }
        
        const sheetName = 'Medications';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(m => m.id !== medicationId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'الدواء غير موجود' };
        }
        
        return saveToSheet(sheetName, filteredData, spreadsheetId);
    } catch (error) {
        Logger.log('Error deleting medication: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الدواء: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الأدوية
 */
function getAllMedications(filters = {}) {
    try {
        const sheetName = 'Medications';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        const now = new Date();

        // ✅ إعادة حساب الحالة ديناميكياً لكل دواء بدلاً من الاعتماد على القيمة المخزنة
        // هذا يضمن تطبيق المنطق الجديد (قريب الانتهاء فقط عند وجود رصيد > 0)
        data = (data || []).map(m => {
            if (!m || typeof m !== 'object') return m;
            
            if (m.createdBy && typeof m.createdBy === 'string' && m.createdBy.trim() !== '') {
                m.createdBy = { name: m.createdBy, id: m.createdById || '' };
            }
            
            // إعادة حساب الحالة والأيام المتبقية ديناميكياً
            if (m.expiryDate) {
                const expiryDate = new Date(m.expiryDate);
                if (!isNaN(expiryDate.getTime())) {
                    const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
                    m.daysRemaining = daysRemaining;
                    
                    // حساب الرصيد المتبقي
                    const remainingQuantity = parseFloat(m.remainingQuantity ?? m.quantityAdded ?? m.quantity ?? 0);
                    const hasStock = remainingQuantity > 0;
                    
                    // تطبيق المنطق الجديد
                    if (daysRemaining < 0) {
                        m.status = 'منتهي';
                    } else if (daysRemaining <= 30) {
                        m.status = hasStock ? 'قريب الانتهاء' : 'ساري';
                    } else {
                        m.status = 'ساري';
                    }
                }
            }
            
            return m;
        });
        
        // تطبيق الفلاتر
        if (filters.status) {
            data = data.filter(m => m.status === filters.status);
        }
        if (filters.type) {
            data = data.filter(m => m.type === filters.type);
        }
        if (filters.expiringSoon) {
            const now = new Date();
            data = data.filter(m => {
                if (!m.expiryDate) return false;
                const expiryDate = new Date(m.expiryDate);
                const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
                
                // ✅ مهم: عرض "قريب الانتهاء" فقط إذا كان هناك رصيد متبقي
                const remainingQuantity = parseFloat(m.remainingQuantity ?? m.quantityAdded ?? m.quantity ?? 0);
                const hasStock = remainingQuantity > 0;
                
                return daysRemaining >= 0 && daysRemaining <= 30 && hasStock;
            });
        }
        
        // ترتيب حسب تاريخ الانتهاء
        data.sort((a, b) => {
            const dateA = new Date(a.expiryDate || '9999-12-31');
            const dateB = new Date(b.expiryDate || '9999-12-31');
            return dateA - dateB;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all medications: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الأدوية: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على الأدوية المنتهية أو التي تنتهي قريباً
 */
function getMedicationAlerts() {
    try {
        const sheetName = 'Medications';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const now = new Date();
        
        const alerts = {
            expired: [],
            expiringSoon: [],
            lowStock: []
        };
        
        data.forEach(medication => {
            // الأدوية المنتهية
            if (medication.expiryDate) {
                const expiryDate = new Date(medication.expiryDate);
                if (expiryDate < now) {
                    alerts.expired.push(medication);
                } else {
                    const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
                    if (daysRemaining <= 30) {
                        // ✅ مهم: عرض "قريب الانتهاء" فقط إذا كان هناك رصيد متبقي
                        const remaining = parseFloat(medication.remainingQuantity ?? medication.quantityAdded ?? medication.quantity ?? 0);
                        if (remaining > 0) {
                            alerts.expiringSoon.push(medication);
                        }
                    }
                }
            }

            // المخزون المنخفض
            const remaining = parseFloat(medication.remainingQuantity ?? medication.quantityAdded ?? medication.quantity ?? 0);
            if (remaining > 0 && remaining <= 10) {
                alerts.lowStock.push(medication);
            }
        });
        
        return { success: true, data: alerts };
    } catch (error) {
        Logger.log('Error getting medication alerts: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الحصول على التنبيهات: ' + error.toString() };
    }
}

/**
 * ============================================
 * الإجازات المرضية (Sick Leave)
 * ============================================
 */

/**
 * إضافة إجازة مرضية
 */
function addSickLeaveToSheet(sickLeaveData) {
    try {
        if (!sickLeaveData) {
            return { success: false, message: 'بيانات الإجازة غير موجودة' };
        }
        
        const sheetName = 'SickLeave';
        
        // ✅ حذف userData لمنع تخزينها في Google Sheets
        if (sickLeaveData && sickLeaveData.userData) {
            try { delete sickLeaveData.userData; } catch (e) {}
        }
        
        // إضافة حقول تلقائية
        if (!sickLeaveData.id) {
            sickLeaveData.id = generateSequentialId('SKL', sheetName);
        }
        if (!sickLeaveData.createdAt) {
            sickLeaveData.createdAt = new Date();
        }
        if (!sickLeaveData.updatedAt) {
            sickLeaveData.updatedAt = new Date();
        }
        if (!sickLeaveData.status) {
            sickLeaveData.status = 'قيد المراجعة';
        }
        
        // ✅ إضافة createdBy و updatedBy (تخزين كنص فقط)
        if (sickLeaveData.createdBy && typeof sickLeaveData.createdBy === 'object') {
            sickLeaveData.createdBy = (sickLeaveData.createdBy.name || sickLeaveData.createdBy.email || '').toString();
        }
        if (sickLeaveData.updatedBy && typeof sickLeaveData.updatedBy === 'object') {
            sickLeaveData.updatedBy = (sickLeaveData.updatedBy.name || sickLeaveData.updatedBy.email || '').toString();
        }
        if (!sickLeaveData.updatedBy && sickLeaveData.createdBy) {
            sickLeaveData.updatedBy = sickLeaveData.createdBy;
        }
        
        // حساب عدد الأيام
        if (sickLeaveData.startDate && sickLeaveData.endDate) {
            const start = new Date(sickLeaveData.startDate);
            const end = new Date(sickLeaveData.endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            sickLeaveData.daysCount = days;
        }
        
        return appendToSheet(sheetName, sickLeaveData);
    } catch (error) {
        Logger.log('Error in addSickLeaveToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الإجازة: ' + error.toString() };
    }
}

/**
 * تحديث إجازة مرضية
 */
function updateSickLeave(leaveId, updateData) {
    try {
        if (!leaveId) {
            return { success: false, message: 'معرف الإجازة غير محدد' };
        }
        
        const sheetName = 'SickLeave';
        const spreadsheetId = getSpreadsheetId();

        // لا نحفظ userData في الشيت (إن وُجدت)
        if (updateData && updateData.userData) {
            try { delete updateData.userData; } catch (e) {}
        }

        updateData.updatedAt = new Date();
        
        // ✅ إضافة updatedBy (تخزين كنص فقط)
        if (updateData.updatedBy && typeof updateData.updatedBy === 'object') {
            updateData.updatedBy = (updateData.updatedBy.name || updateData.updatedBy.email || '').toString();
        }
        if (!updateData.updatedBy) {
            // إذا لم يتم تمرير updatedBy، نستخدم createdBy من السجل الحالي أو القيمة الافتراضية
            const existing = readFromSheet(sheetName, spreadsheetId).find(l => l && l.id === leaveId) || {};
            updateData.updatedBy = existing?.createdBy || existing?.updatedBy || 'النظام';
        }
        
        // إعادة حساب عدد الأيام إذا تم تحديث التواريخ
        if (updateData.startDate || updateData.endDate) {
            // نستخدم القيم الجديدة إن وُجدت، وإلا نستخدم القيم الحالية في الشيت
            const existing = readFromSheet(sheetName, spreadsheetId).find(l => l && l.id === leaveId) || {};
            const start = new Date(updateData.startDate || existing.startDate || new Date());
            const end = new Date(updateData.endDate || existing.endDate || updateData.startDate || existing.startDate || new Date());
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            updateData.daysCount = days;
        }

        // ✅ تحديث صف واحد فقط (بدون استبدال/مسح بيانات أخرى)
        return updateSingleRowInSheet(sheetName, leaveId, updateData, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating sick leave: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الإجازة: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الإجازات المرضية
 */
function getAllSickLeaves(filters = {}) {
    try {
        const sheetName = 'SickLeave';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.employeeCode) {
            data = data.filter(l => l.employeeCode === filters.employeeCode);
        }
        if (filters.status) {
            data = data.filter(l => l.status === filters.status);
        }
        if (filters.startDate) {
            data = data.filter(l => {
                if (!l.startDate) return false;
                return new Date(l.startDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(l => {
                if (!l.endDate) return false;
                return new Date(l.endDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب تاريخ البدء
        data.sort((a, b) => {
            const dateA = new Date(a.startDate || a.createdAt || 0);
            const dateB = new Date(b.startDate || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all sick leaves: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الإجازات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * الإصابات (Injuries)
 * ============================================
 */

/**
 * إضافة إصابة
 */
function addInjuryToSheet(injuryData) {
    try {
        if (!injuryData) {
            return { success: false, message: 'بيانات الإصابة غير موجودة' };
        }

        // ✅ فصل الإصابات حسب النوع: موظفين/مقاولين
        if (!injuryData.personType) {
            injuryData.personType = normalizeClinicPersonType_(injuryData.personType, injuryData);
        } else {
            injuryData.personType = normalizeClinicPersonType_(injuryData.personType, injuryData);
        }
        const sheetName = getClinicInjurySheetName_(injuryData);
        
        // إضافة حقول تلقائية
        if (!injuryData.id) {
            injuryData.id = generateSequentialId('INJ', sheetName);
        }
        if (!injuryData.createdAt) {
            injuryData.createdAt = new Date();
        }
        if (!injuryData.updatedAt) {
            injuryData.updatedAt = new Date();
        }
        
        // ✅ إضافة createdBy و updatedBy (تخزين كنص فقط)
        if (injuryData.createdBy && typeof injuryData.createdBy === 'object') {
            injuryData.createdBy = (injuryData.createdBy.name || injuryData.createdBy.email || '').toString();
        }
        if (injuryData.updatedBy && typeof injuryData.updatedBy === 'object') {
            injuryData.updatedBy = (injuryData.updatedBy.name || injuryData.updatedBy.email || '').toString();
        }
        if (!injuryData.createdBy && !injuryData.updatedBy) {
            injuryData.createdBy = injuryData.createdBy || 'النظام';
            injuryData.updatedBy = injuryData.updatedBy || 'النظام';
        }
        if (!injuryData.updatedBy && injuryData.createdBy) {
            injuryData.updatedBy = injuryData.createdBy;
        }
        
        return appendToSheet(sheetName, injuryData);
    } catch (error) {
        Logger.log('Error in addInjuryToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الإصابة: ' + error.toString() };
    }
}

/**
 * تحديث إصابة
 */
function updateInjury(injuryId, updateData) {
    try {
        if (!injuryId) {
            return { success: false, message: 'معرف الإصابة غير محدد' };
        }

        const spreadsheetId = getSpreadsheetId();
        const sheetCandidates = ['Injuries', 'ClinicContractorInjuries'];
        let foundSheetName = null;
        let foundData = null;
        let injuryIndex = -1;

        for (var si = 0; si < sheetCandidates.length; si++) {
            const sn = sheetCandidates[si];
            const d = readFromSheet(sn, spreadsheetId) || [];
            const idx = d.findIndex(i => String(i.id || '').trim() === String(injuryId).trim());
            if (idx !== -1) {
                foundSheetName = sn;
                foundData = d;
                injuryIndex = idx;
                break;
            }
        }

        if (!foundSheetName || !foundData || injuryIndex === -1) {
            return { success: false, message: 'الإصابة غير موجودة' };
        }

        updateData.updatedAt = new Date();

        // ✅ تطبيع personType عند التحديث إن وُجد
        if (updateData.personType) {
            updateData.personType = normalizeClinicPersonType_(updateData.personType, updateData);
        }

        // ✅ إضافة updatedBy (تخزين كنص فقط)
        if (updateData.updatedBy && typeof updateData.updatedBy === 'object') {
            updateData.updatedBy = (updateData.updatedBy.name || updateData.updatedBy.email || '').toString();
        }
        if (!updateData.updatedBy) {
            const existing = foundData[injuryIndex];
            updateData.updatedBy = existing?.createdBy || existing?.updatedBy || 'النظام';
        }

        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                foundData[injuryIndex][key] = updateData[key];
            }
        }

        return saveToSheet(foundSheetName, foundData, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating injury: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الإصابة: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الإصابات
 */
function getAllInjuries(filters = {}) {
    try {
        const spreadsheetId = getSpreadsheetId();

        // ✅ تأكد من وجود شيتات الإصابات وتحديث رؤوسها
        try {
            const ss = SpreadsheetApp.openById(spreadsheetId);
            const empSheet = createSheetWithHeaders(ss, 'Injuries', {});
            ensureSheetHeaders(empSheet, 'Injuries', {});
            const conSheet = createSheetWithHeaders(ss, 'ClinicContractorInjuries', {});
            ensureSheetHeaders(conSheet, 'ClinicContractorInjuries', {});
        } catch (e) {
            Logger.log('Warning ensuring injuries sheets headers: ' + e.toString());
        }

        const employeeData = (readFromSheet('Injuries', spreadsheetId) || []).map(v => {
            if (v && typeof v === 'object') v.personType = v.personType || 'employee';
            return v;
        });
        const contractorData = (readFromSheet('ClinicContractorInjuries', spreadsheetId) || []).map(v => {
            if (v && typeof v === 'object') v.personType = v.personType || 'contractor';
            return v;
        });
        let data = employeeData.concat(contractorData);

        // ✅ تطبيع البيانات
        data = data.map(v => {
            if (!v || typeof v !== 'object') return v;

            const rawType = String(v.personType || '').toLowerCase().trim();
            if (rawType.includes('contractor') || rawType.includes('مقاول') || rawType.includes('external') || rawType.includes('خارجي')) {
                v.personType = 'contractor';
            } else {
                v.personType = 'employee';
            }
            return v;
        });
        
        // تطبيق الفلاتر
        if (filters.employeeCode) {
            data = data.filter(i => i.employeeCode === filters.employeeCode);
        }
        if (filters.personType) {
            data = data.filter(i => String(i.personType || '').toLowerCase() === String(filters.personType || '').toLowerCase());
        }
        if (filters.injuryType) {
            data = data.filter(i => i.injuryType === filters.injuryType);
        }
        if (filters.startDate) {
            data = data.filter(i => {
                if (!i.injuryDate) return false;
                return new Date(i.injuryDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(i => {
                if (!i.injuryDate) return false;
                return new Date(i.injuryDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب تاريخ الإصابة
        data.sort((a, b) => {
            const dateA = new Date(a.injuryDate || a.createdAt || 0);
            const dateB = new Date(b.injuryDate || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all injuries: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الإصابات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * مخزون العيادة (Clinic Inventory)
 * ============================================
 */

/**
 * إضافة مخزون العيادة
 */
function addClinicInventoryToSheet(inventoryData) {
    try {
        if (!inventoryData) {
            return { success: false, message: 'بيانات المخزون غير موجودة' };
        }
        
        const sheetName = 'ClinicInventory';
        
        // إضافة حقول تلقائية
        if (!inventoryData.id) {
            inventoryData.id = generateSequentialId('CLI', sheetName);
        }
        if (!inventoryData.createdAt) {
            inventoryData.createdAt = new Date();
        }
        if (!inventoryData.updatedAt) {
            inventoryData.updatedAt = new Date();
        }
        
        // ✅ إضافة createdBy و updatedBy (تخزين كنص فقط)
        if (inventoryData.createdBy && typeof inventoryData.createdBy === 'object') {
            inventoryData.createdBy = (inventoryData.createdBy.name || inventoryData.createdBy.email || '').toString();
        }
        if (inventoryData.updatedBy && typeof inventoryData.updatedBy === 'object') {
            inventoryData.updatedBy = (inventoryData.updatedBy.name || inventoryData.updatedBy.email || '').toString();
        }
        if (!inventoryData.createdBy && !inventoryData.updatedBy) {
            inventoryData.createdBy = inventoryData.createdBy || 'النظام';
            inventoryData.updatedBy = inventoryData.updatedBy || 'النظام';
        }
        if (!inventoryData.updatedBy && inventoryData.createdBy) {
            inventoryData.updatedBy = inventoryData.createdBy;
        }
        
        return appendToSheet(sheetName, inventoryData);
    } catch (error) {
        Logger.log('Error in addClinicInventoryToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة المخزون: ' + error.toString() };
    }
}

/**
 * تحديث مخزون العيادة
 */
function updateClinicInventory(inventoryId, updateData) {
    try {
        if (!inventoryId) {
            return { success: false, message: 'معرف المخزون غير محدد' };
        }
        
        const sheetName = 'ClinicInventory';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const inventoryIndex = data.findIndex(inv => inv.id === inventoryId);
        
        if (inventoryIndex === -1) {
            return { success: false, message: 'المخزون غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        
        // ✅ إضافة updatedBy (تخزين كنص فقط)
        if (updateData.updatedBy && typeof updateData.updatedBy === 'object') {
            updateData.updatedBy = (updateData.updatedBy.name || updateData.updatedBy.email || '').toString();
        }
        if (!updateData.updatedBy) {
            // إذا لم يتم تمرير updatedBy، نستخدم createdBy من السجل الحالي أو القيمة الافتراضية
            const existing = data[inventoryIndex];
            updateData.updatedBy = existing?.createdBy || existing?.updatedBy || 'النظام';
        }
        
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[inventoryIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating clinic inventory: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث المخزون: ' + error.toString() };
    }
}

/**
 * الحصول على جميع مخزون العيادة
 */
function getAllClinicInventory(filters = {}) {
    try {
        const sheetName = 'ClinicInventory';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.location) {
            data = data.filter(inv => inv.location === filters.location);
        }
        if (filters.lowStock) {
            data = data.filter(inv => {
                const quantity = parseFloat(inv.quantity || 0);
                return quantity > 0 && quantity <= 10;
            });
        }
        if (filters.expiringSoon) {
            const now = new Date();
            data = data.filter(inv => {
                if (!inv.expiryDate) return false;
                const expiryDate = new Date(inv.expiryDate);
                const daysRemaining = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
                return daysRemaining >= 0 && daysRemaining <= 30;
            });
        }
        
        // ترتيب حسب تاريخ الانتهاء
        data.sort((a, b) => {
            const dateA = new Date(a.expiryDate || '9999-12-31');
            const dateB = new Date(b.expiryDate || '9999-12-31');
            return dateA - dateB;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all clinic inventory: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المخزون: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * نظام الموافقات على حذف الأدوية (Medication Deletion Approvals)
 * ============================================
 */

/**
 * إضافة طلب موافقة على حذف دواء
 */
function addMedicationDeletionRequest(requestData) {
    try {
        if (!requestData) {
            return { success: false, message: 'بيانات الطلب غير موجودة' };
        }
        
        const sheetName = 'MedicationDeletionRequests';
        
        // إضافة حقول تلقائية
        if (!requestData.id) {
            requestData.id = generateSequentialId('MDR', sheetName);
        }
        if (!requestData.createdAt) {
            requestData.createdAt = new Date();
        }
        if (!requestData.status) {
            requestData.status = 'pending'; // pending, approved, rejected
        }
        
        // حفظ معلومات الدواء كاملة
        if (requestData.medicationData && typeof requestData.medicationData === 'object') {
            requestData.medicationDataJSON = JSON.stringify(requestData.medicationData);
        }
        
        // حفظ معلومات مقدم الطلب
        if (requestData.requestedBy && typeof requestData.requestedBy === 'object') {
            requestData.requestedByJSON = JSON.stringify(requestData.requestedBy);
        }
        
        return appendToSheet(sheetName, requestData);
    } catch (error) {
        Logger.log('Error in addMedicationDeletionRequest: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة طلب الموافقة: ' + error.toString() };
    }
}

/**
 * تحديث حالة طلب موافقة على حذف دواء
 */
function updateMedicationDeletionRequest(requestId, updateData) {
    try {
        if (!requestId) {
            return { success: false, message: 'معرف الطلب غير محدد' };
        }
        
        const sheetName = 'MedicationDeletionRequests';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const requestIndex = data.findIndex(r => r.id === requestId);
        
        if (requestIndex === -1) {
            return { success: false, message: 'الطلب غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        
        // إذا كانت هناك بيانات approvedBy/rejectedBy، تحويلها إلى JSON
        if (updateData.approvedBy && typeof updateData.approvedBy === 'object') {
            updateData.approvedByJSON = JSON.stringify(updateData.approvedBy);
        }
        if (updateData.rejectedBy && typeof updateData.rejectedBy === 'object') {
            updateData.rejectedByJSON = JSON.stringify(updateData.rejectedBy);
        }
        
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[requestIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating medication deletion request: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الطلب: ' + error.toString() };
    }
}

/**
 * الحصول على جميع طلبات موافقة حذف الأدوية
 */
function getAllMedicationDeletionRequests(filters = {}) {
    try {
        const sheetName = 'MedicationDeletionRequests';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.status) {
            data = data.filter(r => r.status === filters.status);
        }
        if (filters.requestedById) {
            data = data.filter(r => r.requestedById === filters.requestedById);
        }
        
        // ترتيب حسب تاريخ الطلب (الأحدث أولاً)
        data.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });
        
        // تحويل JSON strings إلى objects
        data = data.map(request => {
            if (request.medicationDataJSON) {
                try {
                    request.medicationData = JSON.parse(request.medicationDataJSON);
                } catch (e) {
                    Logger.log('Error parsing medicationDataJSON: ' + e.toString());
                }
            }
            if (request.requestedByJSON) {
                try {
                    request.requestedBy = JSON.parse(request.requestedByJSON);
                } catch (e) {
                    Logger.log('Error parsing requestedByJSON: ' + e.toString());
                }
            }
            if (request.approvedByJSON) {
                try {
                    request.approvedBy = JSON.parse(request.approvedByJSON);
                } catch (e) {
                    Logger.log('Error parsing approvedByJSON: ' + e.toString());
                }
            }
            if (request.rejectedByJSON) {
                try {
                    request.rejectedBy = JSON.parse(request.rejectedByJSON);
                } catch (e) {
                    Logger.log('Error parsing rejectedByJSON: ' + e.toString());
                }
            }
            return request;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting medication deletion requests: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة طلبات الموافقة: ' + error.toString(), data: [] };
    }
}

/**
 * الموافقة على طلب حذف دواء
 */
function approveMedicationDeletion(requestId, approverData) {
    try {
        // تحديث حالة الطلب
        const updateResult = updateMedicationDeletionRequest(requestId, {
            status: 'approved',
            approvedBy: approverData,
            approvedById: approverData.id || approverData.userId,
            approvedAt: new Date()
        });
        
        if (!updateResult.success) {
            return updateResult;
        }
        
        // الحصول على بيانات الطلب
        const requestsResult = getAllMedicationDeletionRequests();
        if (!requestsResult.success) {
            return requestsResult;
        }
        
        const request = requestsResult.data.find(r => r.id === requestId);
        if (!request) {
            return { success: false, message: 'الطلب غير موجود' };
        }
        
        // حذف الدواء فعلياً
        const medicationId = request.medicationId;
        if (medicationId) {
            const deleteResult = deleteMedication(medicationId);
            if (!deleteResult.success) {
                // إذا فشل الحذف، نعيد حالة الطلب
                updateMedicationDeletionRequest(requestId, {
                    status: 'pending',
                    approvedBy: null,
                    approvedById: null,
                    approvedAt: null,
                    notes: 'فشل حذف الدواء: ' + deleteResult.message
                });
                return deleteResult;
            }
        }
        
        return { success: true, message: 'تمت الموافقة وحذف الدواء بنجاح' };
    } catch (error) {
        Logger.log('Error approving medication deletion: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الموافقة على الحذف: ' + error.toString() };
    }
}

/**
 * رفض طلب حذف دواء
 */
function rejectMedicationDeletion(requestId, rejectorData, reason) {
    try {
        const updateResult = updateMedicationDeletionRequest(requestId, {
            status: 'rejected',
            rejectedBy: rejectorData,
            rejectedById: rejectorData.id || rejectorData.userId,
            rejectedAt: new Date(),
            rejectionReason: reason || ''
        });
        
        return updateResult;
    } catch (error) {
        Logger.log('Error rejecting medication deletion: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء رفض الطلب: ' + error.toString() };
    }
}

/**
 * ============================================
 * نظام الموافقات على حذف الزيارات (Clinic Visit Deletion Approvals)
 * ============================================
 */

function addClinicVisitDeletionRequest(requestData) {
    try {
        if (!requestData) {
            return { success: false, message: 'بيانات الطلب غير موجودة' };
        }
        
        const sheetName = 'ClinicVisitDeletionRequests';
        
        if (!requestData.id) {
            requestData.id = generateSequentialId('CVDR', sheetName);
        }
        if (!requestData.createdAt) {
            requestData.createdAt = new Date();
        }
        if (!requestData.status) {
            requestData.status = 'pending'; // pending, approved, rejected
        }
        
        // حفظ بيانات الزيارة كاملة
        if (requestData.visitData && typeof requestData.visitData === 'object') {
            requestData.visitDataJSON = JSON.stringify(requestData.visitData);
        }
        
        // حفظ بيانات مقدم الطلب
        if (requestData.requestedBy && typeof requestData.requestedBy === 'object') {
            requestData.requestedByJSON = JSON.stringify(requestData.requestedBy);
            requestData.requestedById = requestData.requestedBy.id || requestData.requestedBy.userId || '';
            requestData.requestedByName = requestData.requestedBy.name || '';
        }
        
        return appendToSheet(sheetName, requestData);
    } catch (error) {
        Logger.log('Error in addClinicVisitDeletionRequest: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة طلب حذف الزيارة: ' + error.toString() };
    }
}

function updateClinicVisitDeletionRequest(requestId, updateData) {
    try {
        if (!requestId) {
            return { success: false, message: 'معرف الطلب غير محدد' };
        }
        
        const sheetName = 'ClinicVisitDeletionRequests';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const requestIndex = data.findIndex(r => r.id === requestId);
        
        if (requestIndex === -1) {
            return { success: false, message: 'الطلب غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        
        if (updateData.approvedBy && typeof updateData.approvedBy === 'object') {
            updateData.approvedByJSON = JSON.stringify(updateData.approvedBy);
        }
        if (updateData.rejectedBy && typeof updateData.rejectedBy === 'object') {
            updateData.rejectedByJSON = JSON.stringify(updateData.rejectedBy);
        }
        
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[requestIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating clinic visit deletion request: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الطلب: ' + error.toString() };
    }
}

function getAllClinicVisitDeletionRequests(filters = {}) {
    try {
        const sheetName = 'ClinicVisitDeletionRequests';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        if (filters.status) {
            data = data.filter(r => r.status === filters.status);
        }
        if (filters.requestedById) {
            data = data.filter(r => r.requestedById === filters.requestedById);
        }
        
        data.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });
        
        data = data.map(request => {
            if (request.visitDataJSON) {
                try {
                    request.visitData = JSON.parse(request.visitDataJSON);
                } catch (e) {
                    Logger.log('Error parsing visitDataJSON: ' + e.toString());
                }
            }
            if (request.requestedByJSON) {
                try {
                    request.requestedBy = JSON.parse(request.requestedByJSON);
                } catch (e) {
                    Logger.log('Error parsing requestedByJSON: ' + e.toString());
                }
            }
            if (request.approvedByJSON) {
                try {
                    request.approvedBy = JSON.parse(request.approvedByJSON);
                } catch (e) {
                    Logger.log('Error parsing approvedByJSON: ' + e.toString());
                }
            }
            if (request.rejectedByJSON) {
                try {
                    request.rejectedBy = JSON.parse(request.rejectedByJSON);
                } catch (e) {
                    Logger.log('Error parsing rejectedByJSON: ' + e.toString());
                }
            }
            return request;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting clinic visit deletion requests: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة طلبات حذف الزيارات: ' + error.toString(), data: [] };
    }
}

function approveClinicVisitDeletion(requestId, approverData) {
    try {
        const updateResult = updateClinicVisitDeletionRequest(requestId, {
            status: 'approved',
            approvedBy: approverData,
            approvedById: approverData.id || approverData.userId,
            approvedAt: new Date()
        });
        if (!updateResult.success) return updateResult;
        
        const requestsResult = getAllClinicVisitDeletionRequests();
        if (!requestsResult.success) return requestsResult;
        
        const request = requestsResult.data.find(r => r.id === requestId);
        if (!request) return { success: false, message: 'الطلب غير موجود' };
        
        const visitId = request.visitId || (request.visitData && request.visitData.id);
        if (!visitId) {
            return { success: false, message: 'معرف الزيارة غير موجود في الطلب' };
        }
        
        // حذف الزيارة فعلياً
        const saveResult = deleteClinicVisit(visitId);
        if (!saveResult.success) {
            // rollback
            updateClinicVisitDeletionRequest(requestId, {
                status: 'pending',
                approvedBy: null,
                approvedById: null,
                approvedAt: null,
                notes: 'فشل حذف الزيارة: ' + (saveResult.message || '')
            });
            return saveResult;
        }
        
        return { success: true, message: 'تمت الموافقة وحذف الزيارة بنجاح' };
    } catch (error) {
        Logger.log('Error approving clinic visit deletion: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الموافقة على حذف الزيارة: ' + error.toString() };
    }
}

function deleteClinicVisit(visitId) {
    try {
        if (!visitId) {
            return { success: false, message: 'معرف الزيارة غير محدد' };
        }
        // نفس نطاق updateClinicVisit: موظفين + مقاولين
        const visitIdStr = String(visitId);
        const spreadsheetId = getSpreadsheetId();
        var ss = SpreadsheetApp.openById(spreadsheetId);
        const sheetCandidates = ['ClinicVisits', 'ClinicContractorVisits'];

        for (var s = 0; s < sheetCandidates.length; s++) {
            const sheetName = sheetCandidates[s];
            const visits = readFromSheet(sheetName, spreadsheetId) || [];
            let rowIndex = -1;

            for (let i = 0; i < visits.length; i++) {
                if (visits[i] && String(visits[i].id) === visitIdStr) {
                    rowIndex = i + 2; // +2: صف 1 هيدر، المصفوفة من 0
                    break;
                }
            }

            if (rowIndex === -1) continue;

            var sheet = ss.getSheetByName(sheetName);
            if (!sheet) {
                return { success: false, message: 'ورقة الزيارات غير موجودة: ' + sheetName };
            }
            sheet.deleteRow(rowIndex);

            Logger.log('تم حذف الزيارة ' + visitIdStr + ' من ' + sheetName + ' الصف ' + rowIndex);
            return { success: true, message: 'تم حذف الزيارة بنجاح', sheetName: sheetName };
        }

        return { success: false, message: 'الزيارة غير موجودة' };
    } catch (error) {
        Logger.log('Error deleting clinic visit: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الزيارة: ' + error.toString() };
    }
}

function rejectClinicVisitDeletion(requestId, rejectorData, reason) {
    try {
        return updateClinicVisitDeletionRequest(requestId, {
            status: 'rejected',
            rejectedBy: rejectorData,
            rejectedById: rejectorData.id || rejectorData.userId,
            rejectedAt: new Date(),
            rejectionReason: reason || ''
        });
    } catch (error) {
        Logger.log('Error rejecting clinic visit deletion: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء رفض طلب حذف الزيارة: ' + error.toString() };
    }
}

/**
 * ============================================
 * طلبات الاحتياج (Supply Requests)
 * ============================================
 */

/**
 * إضافة طلب احتياج
 */
function addSupplyRequest(requestData) {
    try {
        if (!requestData) {
            return { success: false, message: 'بيانات الطلب غير موجودة' };
        }
        
        const sheetName = 'ClinicSupplyRequests';
        
        // إضافة حقول تلقائية
        if (!requestData.id) {
            requestData.id = generateSequentialId('CSR', sheetName);
        }
        if (!requestData.createdAt) {
            requestData.createdAt = new Date();
        }
        if (!requestData.requestDate) {
            requestData.requestDate = new Date();
        }
        if (!requestData.status) {
            requestData.status = 'pending'; // pending, approved, rejected, fulfilled
        }
        if (!requestData.priority) {
            requestData.priority = 'normal'; // normal, high, urgent
        }
        
        // حفظ معلومات مقدم الطلب
        if (requestData.requestedBy && typeof requestData.requestedBy === 'object') {
            requestData.requestedByJSON = JSON.stringify(requestData.requestedBy);
            requestData.requestedById = requestData.requestedBy.id || requestData.requestedBy.userId || '';
            requestData.requestedByName = requestData.requestedBy.name || '';
        }
        
        return appendToSheet(sheetName, requestData);
    } catch (error) {
        Logger.log('Error in addSupplyRequest: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة طلب الاحتياج: ' + error.toString() };
    }
}

/**
 * تحديث طلب احتياج
 */
function updateSupplyRequest(requestId, updateData) {
    try {
        if (!requestId) {
            return { success: false, message: 'معرف الطلب غير محدد' };
        }

        // ⚡ تحسين الأداء: تحديث صف واحد فقط بدلاً من قراءة/كتابة الشيت بالكامل
        const sheetName = 'ClinicSupplyRequests';
        const spreadsheetId = getSpreadsheetId();
        const ss = SpreadsheetApp.openById(spreadsheetId);
        const sheet = ss.getSheetByName(sheetName);
        if (!sheet) {
            return { success: false, message: 'ورقة ' + sheetName + ' غير موجودة' };
        }

        const lastRow = sheet.getLastRow();
        const lastCol = sheet.getLastColumn();
        if (lastRow < 1 || lastCol < 1) {
            return { success: false, message: 'الورقة فارغة' };
        }

        if (lastRow < 2) {
            return { success: false, message: 'الطلب غير موجود' };
        }
        const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
        const idColIdx = headers.indexOf('id') + 1; // 1-based
        if (!idColIdx) {
            return { success: false, message: 'عمود id غير موجود في الورقة' };
        }

        // قراءة عمود المعرفات فقط (بدل الملف كامل)
        const idValues = sheet.getRange(2, idColIdx, Math.max(0, lastRow - 1), 1).getValues();
        let rowOffset = -1;
        for (var i = 0; i < idValues.length; i++) {
            if (String(idValues[i][0]) === String(requestId)) {
                rowOffset = i;
                break;
            }
        }
        if (rowOffset === -1) {
            return { success: false, message: 'الطلب غير موجود' };
        }
        const rowIndex = rowOffset + 2; // سطر الشيت الفعلي

        // Idempotency: الموافقة/الرفض المتكرر على نفس الحالة يُرجع نجاحاً فوراً دون كتابة
        if ((updateData.status === 'approved' || updateData.status === 'rejected' || updateData.status === 'cancelled')) {
            const statusColIdx = headers.indexOf('status') + 1;
            if (statusColIdx > 0) {
                const currentStatus = sheet.getRange(rowIndex, statusColIdx).getValue();
                if (String(currentStatus || '') === String(updateData.status)) {
                    return { success: true, message: 'الطلب قيد الحالة المطلوبة بالفعل (تم التحديث مسبقاً)', idempotent: true };
                }
            }
        }

        // قراءة سطر واحد فقط ثم تطبيق التحديثات عليه
        const existingRow = sheet.getRange(rowIndex, 1, 1, lastCol).getValues()[0];
        const updatedRow = existingRow.slice();
        const newObj = {};
        for (var h = 0; h < headers.length; h++) {
            newObj[headers[h]] = updatedRow[h];
        }

        updateData.updatedAt = new Date();

        // إذا كانت هناك بيانات updatedBy/approvedBy/rejectedBy، تحويلها إلى JSON
        if (updateData.updatedBy && typeof updateData.updatedBy === 'object') {
            updateData.updatedByJSON = JSON.stringify(updateData.updatedBy);
        }
        if (updateData.approvedBy && typeof updateData.approvedBy === 'object') {
            updateData.approvedByJSON = JSON.stringify(updateData.approvedBy);
        }
        if (updateData.rejectedBy && typeof updateData.rejectedBy === 'object') {
            updateData.rejectedByJSON = JSON.stringify(updateData.rejectedBy);
        }

        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                newObj[key] = updateData[key];
            }
        }
        for (var c = 0; c < headers.length; c++) {
            updatedRow[c] = newObj[headers[c]];
        }

        sheet.getRange(rowIndex, 1, 1, lastCol).setValues([updatedRow]);
        return { success: true, message: 'تم تحديث الطلب بنجاح', rowNumber: rowIndex };
    } catch (error) {
        Logger.log('Error updating supply request: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الطلب: ' + error.toString() };
    }
}

/**
 * الحصول على جميع طلبات الاحتياج
 */
function getAllSupplyRequests(filters = {}) {
    try {
        const sheetName = 'ClinicSupplyRequests';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.status) {
            data = data.filter(r => r.status === filters.status);
        }
        if (filters.requestedById) {
            data = data.filter(r => r.requestedById === filters.requestedById);
        }
        if (filters.type) {
            data = data.filter(r => r.type === filters.type);
        }
        if (filters.priority) {
            data = data.filter(r => r.priority === filters.priority);
        }
        
        // ترتيب حسب تاريخ الطلب (الأحدث أولاً)
        data.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.requestDate || 0);
            const dateB = new Date(b.createdAt || b.requestDate || 0);
            return dateB - dateA;
        });
        
        // تحويل JSON strings إلى objects
        data = data.map(request => {
            if (request.requestedByJSON) {
                try {
                    request.requestedBy = JSON.parse(request.requestedByJSON);
                } catch (e) {
                    Logger.log('Error parsing requestedByJSON: ' + e.toString());
                }
            }
            if (request.updatedByJSON) {
                try {
                    request.updatedBy = JSON.parse(request.updatedByJSON);
                } catch (e) {
                    Logger.log('Error parsing updatedByJSON: ' + e.toString());
                }
            }
            if (request.approvedByJSON) {
                try {
                    request.approvedBy = JSON.parse(request.approvedByJSON);
                } catch (e) {
                    Logger.log('Error parsing approvedByJSON: ' + e.toString());
                }
            }
            if (request.rejectedByJSON) {
                try {
                    request.rejectedBy = JSON.parse(request.rejectedByJSON);
                } catch (e) {
                    Logger.log('Error parsing rejectedByJSON: ' + e.toString());
                }
            }
            return request;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting supply requests: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة طلبات الاحتياج: ' + error.toString(), data: [] };
    }
}

/**
 * الموافقة على طلب احتياج
 */
function approveSupplyRequest(requestId, approverData) {
    try {
        const updateResult = updateSupplyRequest(requestId, {
            status: 'approved',
            approvedBy: approverData,
            approvedById: approverData.id || approverData.userId,
            approvedAt: new Date()
        });
        
        return updateResult;
    } catch (error) {
        Logger.log('Error approving supply request: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء الموافقة على الطلب: ' + error.toString() };
    }
}

/**
 * رفض طلب احتياج
 */
function rejectSupplyRequest(requestId, rejectorData, reason) {
    try {
        const updateResult = updateSupplyRequest(requestId, {
            status: 'rejected',
            rejectedBy: rejectorData,
            rejectedById: rejectorData.id || rejectorData.userId,
            rejectedAt: new Date(),
            rejectionReason: reason || ''
        });
        
        return updateResult;
    } catch (error) {
        Logger.log('Error rejecting supply request: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء رفض الطلب: ' + error.toString() };
    }
}

/**
 * ✅ دالة اختبار لـ addClinicVisitToSheet
 * هذه الدالة يمكن استدعاؤها من المحرر لاختبار addClinicVisitToSheet بشكل صحيح
 * 
 * الاستخدام:
 * 1. شغّل testAddClinicVisitToSheet من المحرر
 * 2. ستقوم بإنشاء بيانات اختبار وإرسالها إلى addClinicVisitToSheet
 * 3. افحص السجل (Execution log) للتأكد من أن كل شيء يعمل بشكل صحيح
 */
function testAddClinicVisitToSheet() {
    Logger.log('🧪 [TEST] ===== بدء اختبار addClinicVisitToSheet =====');
    Logger.log('🧪 [TEST] الوقت: ' + new Date().toISOString());
    
    try {
        // إنشاء بيانات اختبار مشابهة لما يرسله التطبيق
        // ✅ اختبار الحالات المختلفة لـ createdBy
        const testVisitData = {
            id: 'TEST-' + new Date().getTime(),
            employeeName: 'مستخدم اختبار',
            employeeCode: 'TEST001',
            jobTitle: 'موظف اختبار',
            factory: 'مصنع اختبار',
            workplace: 'مكان اختبار',
            personType: 'employee', // أو 'contractor' للاختبار
            reason: 'اختبار النظام',
            diagnosis: 'اختبار',
            entryTime: new Date().toISOString(),
            exitTime: new Date().toISOString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'مستخدم اختبار', // ✅ يجب أن يكون اسم صحيح وليس "النظام"
            updatedBy: 'مستخدم اختبار',
            email: 'test@example.com', // ✅ مهم للبحث عن الاسم في قاعدة البيانات
            userId: 'test-user-id' // ✅ مهم للبحث عن الاسم في قاعدة البيانات
        };
        
        Logger.log('🧪 [TEST] بيانات الاختبار:');
        Logger.log('🧪 [TEST] - عدد الحقول: ' + Object.keys(testVisitData).length);
        Logger.log('🧪 [TEST] - createdBy: ' + testVisitData.createdBy);
        Logger.log('🧪 [TEST] - email: ' + testVisitData.email);
        Logger.log('🧪 [TEST] - userId: ' + testVisitData.userId);
        Logger.log('🧪 [TEST] - personType: ' + testVisitData.personType);
        Logger.log('🧪 [TEST] - id: ' + testVisitData.id);
        
        // استدعاء الدالة الفعلية
        Logger.log('🧪 [TEST] استدعاء addClinicVisitToSheet...');
        const result = addClinicVisitToSheet(testVisitData);
        
        Logger.log('🧪 [TEST] ===== نتيجة الاختبار =====');
        Logger.log('🧪 [TEST] success: ' + result.success);
        Logger.log('🧪 [TEST] message: ' + (result.message || 'N/A'));
        Logger.log('🧪 [TEST] النتيجة الكاملة: ' + JSON.stringify(result));
        
        // ✅ التحقق من أن createdBy تم حفظه بشكل صحيح
        if (result.success && result.rowNumber) {
            try {
                const spreadsheetId = getSpreadsheetId();
                const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('ClinicVisits');
                if (sheet) {
                    const lastRow = sheet.getLastRow();
                    const createdByValue = sheet.getRange(lastRow, sheet.getFrozenColumns() + 1).getValue(); // createdBy column
                    Logger.log('🧪 [TEST] createdBy المحفوظ في قاعدة البيانات: ' + createdByValue);
                    
                    if (createdByValue && createdByValue !== 'النظام' && createdByValue.trim() !== '') {
                        Logger.log('✅ [TEST] createdBy تم حفظه بشكل صحيح: ' + createdByValue);
                    } else {
                        Logger.log('⚠️ [TEST] تحذير: createdBy في قاعدة البيانات هو "النظام" أو فارغ');
                    }
                }
            } catch (e) {
                Logger.log('⚠️ [TEST] لا يمكن التحقق من createdBy في قاعدة البيانات: ' + e.toString());
            }
        }
        
        if (result.success) {
            Logger.log('✅ [TEST] الاختبار نجح! addClinicVisitToSheet تعمل بشكل صحيح.');
        } else {
            Logger.log('❌ [TEST] الاختبار فشل: ' + result.message);
        }
        
        Logger.log('🧪 [TEST] ===== انتهى الاختبار =====');
        return result;
        
    } catch (error) {
        Logger.log('❌ [TEST] خطأ في الاختبار: ' + error.toString());
        Logger.log('❌ [TEST] Stack: ' + error.stack);
        return { success: false, message: 'خطأ في الاختبار: ' + error.toString() };
    }
}

/**
 * إصلاح رؤوس الأعمدة في شيتات العيادة (ClinicVisits و ClinicContractorVisits)
 * يصحح:
 * 1. إذا كان رأس العمود الأول "Column 1" → يغيّره إلى "id"
 * 2. إذا وُجد عمود "id" مكرر في نهاية الهيدر (بسبب خطأ ensureSheetHeaders) → يحذفه
 * 3. يضمن أن ترتيب الهيدر مطابق للافتراضي (للشيتات الجديدة فقط)
 */
function fixClinicSheetHeaders() {
    try {
        const spreadsheetId = getSpreadsheetId();
        const ss = SpreadsheetApp.openById(spreadsheetId);

        const sheetsToFix = ['ClinicVisits', 'ClinicContractorVisits'];
        const results = [];

        for (var s = 0; s < sheetsToFix.length; s++) {
            const sheetName = sheetsToFix[s];
            const sheet = ss.getSheetByName(sheetName);

            if (!sheet) {
                results.push(sheetName + ': غير موجودة');
                continue;
            }

            const lastCol = sheet.getLastColumn();
            if (lastCol === 0) {
                results.push(sheetName + ': فارغة');
                continue;
            }

            const headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
            let changed = false;

            // 1. إصلاح "Column 1" → "id" في الموضع الأول
            if (String(headerRow[0] || '').trim() === 'Column 1') {
                headerRow[0] = 'id';
                changed = true;
                Logger.log('✅ [fixClinicSheetHeaders] ' + sheetName + ': Column 1 → id في العمود الأول');
            }

            // 2. إزالة أعمدة "id" المكررة (في نهاية الهيدر بعد الموضع 0)
            // هذا ناتج عن ensureSheetHeaders الذي كان يضيف id في النهاية بدلاً من إصلاح Column 1
            for (var i = lastCol - 1; i >= 1; i--) {
                if (String(headerRow[i] || '').trim() === 'id') {
                    // التحقق: هل البيانات في هذا العمود فارغة في كل الصفوف؟
                    const lastDataRow = sheet.getLastRow();
                    let colIsEmpty = true;
                    if (lastDataRow > 1) {
                        const colValues = sheet.getRange(2, i + 1, lastDataRow - 1, 1).getValues();
                        colIsEmpty = colValues.every(function(r) { return !r[0] || String(r[0]).trim() === ''; });
                    }
                    if (colIsEmpty) {
                        // عمود id مكرر وفارغ - نحذفه
                        sheet.deleteColumn(i + 1);
                        headerRow.splice(i, 1);
                        changed = true;
                        Logger.log('✅ [fixClinicSheetHeaders] ' + sheetName + ': حذف عمود id المكرر في الموضع ' + (i + 1));
                    } else {
                        // عمود id في نهاية الشيت لكن فيه بيانات - نحرك البيانات إلى عمود A ثم نحذف العمود
                        Logger.log('⚠️ [fixClinicSheetHeaders] ' + sheetName + ': عمود id في الموضع ' + (i + 1) + ' يحتوي على بيانات - نقل إلى عمود A');
                        const lastDataRow2 = sheet.getLastRow();
                        if (lastDataRow2 > 1) {
                            const idValues = sheet.getRange(2, i + 1, lastDataRow2 - 1, 1).getValues();
                            const colAValues = sheet.getRange(2, 1, lastDataRow2 - 1, 1).getValues();
                            // نقل إلى عمود A فقط إذا كان عمود A فارغاً
                            const colAIsEmpty = colAValues.every(function(r) { return !r[0] || String(r[0]).trim() === ''; });
                            if (colAIsEmpty) {
                                sheet.getRange(2, 1, lastDataRow2 - 1, 1).setValues(idValues);
                                sheet.deleteColumn(i + 1);
                                headerRow.splice(i, 1);
                                changed = true;
                                Logger.log('✅ [fixClinicSheetHeaders] ' + sheetName + ': تم نقل بيانات id من عمود ' + (i + 1) + ' إلى عمود A وحذف العمود المكرر');
                            }
                        }
                    }
                }
            }

            if (changed) {
                // كتابة الهيدر المُصحَّح
                const newLastCol = sheet.getLastColumn();
                if (newLastCol > 0) {
                    sheet.getRange(1, 1, 1, newLastCol).setValues([headerRow.slice(0, newLastCol)]);
                }
                // إبطال الكاش
                try {
                    const cache = CacheService.getScriptCache();
                    cache.remove('hse_read_' + sheetName + '_v1');
                    cache.remove('hse_read_' + sheetName + '_raw');
                } catch (cacheErr) { /* ignore */ }
                SpreadsheetApp.flush();
                results.push(sheetName + ': ✅ تم الإصلاح');
            } else {
                results.push(sheetName + ': ✅ الهيدر صحيح بالفعل');
            }

            Logger.log('✅ [fixClinicSheetHeaders] ' + sheetName + ': الهيدر الحالي = ' + headerRow.slice(0, Math.min(5, headerRow.length)).join(', ') + '...');
        }

        // ✅ تشخيص: إضافة معلومات الصف الأخير لكل شيت
        for (var d = 0; d < sheetsToFix.length; d++) {
            const sName = sheetsToFix[d];
            const diagSheet = ss.getSheetByName(sName);
            if (!diagSheet) continue;
            try {
                const lastRow = diagSheet.getLastRow();
                const dataRange = diagSheet.getDataRange();
                const rawVals = dataRange ? dataRange.getValues() : [];
                let trueLastRow = 1;
                for (var ri = rawVals.length - 1; ri >= 0; ri--) {
                    if (rawVals[ri].some(function(c) { return c !== '' && c !== null && c !== undefined; })) {
                        trueLastRow = ri + 1;
                        break;
                    }
                }
                const dataRowCount = Math.max(0, trueLastRow - 1);
                Logger.log('[DIAG] ' + sName + ': getLastRow=' + lastRow + ' | trueLastRow=' + trueLastRow + ' | dataRows=' + dataRowCount);
                results.push(sName + '→آخر صف: ' + trueLastRow + ' (بيانات: ' + dataRowCount + ' صف)');
            } catch (diagErr) {
                Logger.log('[DIAG] ' + sName + ' error: ' + diagErr.toString());
            }
        }

        const summary = results.join(' | ');
        Logger.log('✅ [fixClinicSheetHeaders] اكتمل: ' + summary);
        return { success: true, message: summary };

    } catch (error) {
        Logger.log('❌ [BACKEND] خطأ في fixClinicSheetHeaders: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

/**
 * ضغط شيت العيادة: حذف الصفوف الفارغة بين الهيدر والبيانات الفعلية
 * يحل مشكلة appendRow القديمة التي كانت تكتب في صف 2000+
 */
function compactClinicSheets() {
    try {
        const spreadsheetId = getSpreadsheetId();
        const ss = SpreadsheetApp.openById(spreadsheetId);
        const sheetsToCompact = ['ClinicVisits', 'ClinicContractorVisits'];
        const results = [];

        for (var s = 0; s < sheetsToCompact.length; s++) {
            const sheetName = sheetsToCompact[s];
            const sheet = ss.getSheetByName(sheetName);
            if (!sheet) {
                results.push(sheetName + ': غير موجودة');
                continue;
            }

            const lastRow = sheet.getLastRow();
            if (lastRow <= 1) {
                results.push(sheetName + ': فارغة');
                continue;
            }

            // قراءة جميع البيانات
            const allData = sheet.getDataRange().getValues();
            const headers = allData[0]; // الصف الأول: رؤوس

            // جمع الصفوف التي تحتوي على بيانات فعلية (بعد الهيدر)
            const dataRows = [];
            for (var r = 1; r < allData.length; r++) {
                const row = allData[r];
                const hasData = row.some(function(c) { return c !== '' && c !== null && c !== undefined; });
                if (hasData) {
                    dataRows.push(row);
                }
            }

            if (dataRows.length === 0) {
                results.push(sheetName + ': لا توجد بيانات');
                continue;
            }

            const totalExistingRows = allData.length - 1; // الصفوف بعد الهيدر
            if (dataRows.length === totalExistingRows) {
                results.push(sheetName + ': مضغوطة بالفعل (' + dataRows.length + ' صف)');
                continue;
            }

            // إعادة كتابة الشيت بشكل مضغوط
            // 1. حذف جميع الصفوف بعد الهيدر
            if (lastRow > 1) {
                sheet.deleteRows(2, lastRow - 1);
            }

            // 2. كتابة البيانات الفعلية من الصف 2
            sheet.getRange(2, 1, dataRows.length, headers.length).setValues(dataRows);

            // 3. إبطال الكاش
            try {
                invalidateHseSheetCaches(sheetName);
            } catch (e) {}

            SpreadsheetApp.flush();
            results.push(sheetName + ': ✅ تم الضغط (' + dataRows.length + ' صف من ' + totalExistingRows + ')');
            Logger.log('✅ [compactClinicSheets] ' + sheetName + ': ' + dataRows.length + ' صف ← ' + totalExistingRows + ' صف قبل الضغط');
        }

        return { success: true, message: results.join(' | ') };

    } catch (error) {
        Logger.log('❌ [compactClinicSheets] error: ' + error.toString());
        return { success: false, message: 'حدث خطأ: ' + error.toString() };
    }
}

// ============================================
// مسئولو العيادة وحضورهم (Clinic Staff Attendance)
// ============================================

function _clinicStaffDayKey_(date) {
    try {
        var d = date ? new Date(date) : new Date();
        if (isNaN(d.getTime())) d = new Date();
        var tz = Session.getScriptTimeZone() || 'Africa/Cairo';
        return Utilities.formatDate(d, tz, 'yyyy-MM-dd');
    } catch (_e) {
        return new Date().toISOString().slice(0, 10);
    }
}

function _clinicStaffCalcDurationHours_(checkIn, checkOut) {
    try {
        if (!checkIn || !checkOut) return '';
        var a = new Date(checkIn);
        var b = new Date(checkOut);
        if (isNaN(a.getTime()) || isNaN(b.getTime()) || b <= a) return '';
        return Math.round(((b - a) / (1000 * 60 * 60)) * 100) / 100;
    } catch (_e) {
        return '';
    }
}

function _clinicStaffPickEarliestIso_(values) {
    var best = '';
    var bestT = Infinity;
    for (var i = 0; i < (values || []).length; i++) {
        var v = values[i];
        if (!v) continue;
        var t = new Date(v).getTime();
        if (!isNaN(t) && t < bestT) {
            bestT = t;
            best = v;
        }
    }
    return best;
}

function _clinicStaffPickLatestIso_(values) {
    var best = '';
    var bestT = -Infinity;
    for (var i = 0; i < (values || []).length; i++) {
        var v = values[i];
        if (!v) continue;
        var t = new Date(v).getTime();
        if (!isNaN(t) && t > bestT) {
            bestT = t;
            best = v;
        }
    }
    return best;
}

function _clinicStaffAttendanceMatchesUser_(r, staff, userId, email) {
    if (!r) return false;
    var uid = String(staff.userId || userId || '').trim();
    var rid = String(r.userId || '').trim();
    var rem = String(staff.userEmail || email || '').trim().toLowerCase();
    var rmail = String(r.userEmail || '').trim().toLowerCase();
    if (staff.id && r.staffId && String(staff.id) === String(r.staffId)) return true;
    return (uid && rid && uid === rid) || (rem && rmail && rem === rmail);
}

function _clinicStaffAttendanceUserDayKey_(r) {
    if (!r) return '';
    var dk = _clinicStaffDayKey_(r.date);
    var uk = String(r.staffId || r.userId || r.userEmail || '').trim().toLowerCase();
    return dk + '|' + uk;
}

function _clinicStaffMergeAllAttendanceRecords_(data) {
    if (!data || !data.length) return [];
    var map = {};
    var order = [];
    for (var i = 0; i < data.length; i++) {
        var r = data[i];
        if (!r) continue;
        var key = _clinicStaffAttendanceUserDayKey_(r);
        if (!key || key === '|') continue;
        if (!map[key]) {
            map[key] = {
                id: r.id,
                staffId: r.staffId,
                userId: r.userId,
                userName: r.userName,
                userEmail: r.userEmail,
                staffRole: r.staffRole,
                date: _clinicStaffDayKey_(r.date),
                checkIn: r.checkIn || '',
                checkOut: r.checkOut || '',
                workDuration: r.workDuration || '',
                status: r.status || 'present',
                sessionId: r.sessionId || '',
                source: r.source || 'login',
                notes: r.notes || '',
                createdAt: r.createdAt || '',
                updatedAt: r.updatedAt || ''
            };
            order.push(key);
            continue;
        }
        var m = map[key];
        m.checkIn = _clinicStaffPickEarliestIso_([m.checkIn, r.checkIn]) || m.checkIn || r.checkIn;
        m.checkOut = _clinicStaffPickLatestIso_([m.checkOut, r.checkOut]) || m.checkOut || r.checkOut;
        m.workDuration = _clinicStaffCalcDurationHours_(m.checkIn, m.checkOut);
        m.updatedAt = _clinicStaffPickLatestIso_([m.updatedAt, r.updatedAt]) || m.updatedAt || r.updatedAt;
        if (m.checkIn && m.checkOut) {
            m.status = m.workDuration ? 'present' : 'partial';
        }
    }
    return order.map(function(k) { return map[k]; });
}

function _clinicStaffConsolidateAttendanceForUserDay_(all, staff, userId, email, today) {
    all = all || [];
    var matching = [];
    var rest = [];
    for (var i = 0; i < all.length; i++) {
        var r = all[i];
        if (r && _clinicStaffDayKey_(r.date) === today && _clinicStaffAttendanceMatchesUser_(r, staff, userId, email)) {
            matching.push(r);
        } else if (r) {
            rest.push(r);
        }
    }
    if (!matching.length) {
        return { all: all, merged: null, hadDuplicates: false };
    }
    var primary = matching[0];
    var merged = {
        id: primary.id,
        staffId: staff.id || primary.staffId,
        userId: staff.userId || userId || primary.userId,
        userName: primary.userName || staff.userName || '',
        userEmail: staff.userEmail || email || primary.userEmail,
        staffRole: staff.staffRole || primary.staffRole || '',
        date: today,
        checkIn: _clinicStaffPickEarliestIso_(matching.map(function(row) { return row.checkIn; })),
        checkOut: _clinicStaffPickLatestIso_(matching.map(function(row) { return row.checkOut; })),
        sessionId: primary.sessionId || '',
        source: primary.source || 'login',
        notes: primary.notes || '',
        createdAt: _clinicStaffPickEarliestIso_(matching.map(function(row) { return row.createdAt; })) || primary.createdAt,
        updatedAt: new Date().toISOString()
    };
    merged.workDuration = _clinicStaffCalcDurationHours_(merged.checkIn, merged.checkOut);
    merged.status = merged.checkIn && merged.checkOut
        ? (merged.workDuration ? 'present' : 'partial')
        : (merged.checkIn ? 'present' : 'partial');
    return { all: rest.concat([merged]), merged: merged, hadDuplicates: matching.length > 1 };
}

function isActiveClinicStaffUser_(userIdOrEmail) {
    var key = String(userIdOrEmail || '').trim().toLowerCase();
    if (!key) return null;
    var staff = readFromSheet('ClinicStaff', getSpreadsheetId()) || [];
    for (var i = 0; i < staff.length; i++) {
        var s = staff[i];
        if (!s) continue;
        if (String(s.isActive || 'true').toLowerCase() === 'false') continue;
        var uid = String(s.userId || '').trim().toLowerCase();
        var em = String(s.userEmail || '').trim().toLowerCase();
        if ((uid && uid === key) || (em && em === key)) return s;
    }
    return null;
}

function getAllClinicStaff(filters) {
    try {
        var data = readFromSheet('ClinicStaff', getSpreadsheetId()) || [];
        if (filters && filters.activeOnly) {
            data = data.filter(function(r) {
                return r && String(r.isActive || 'true').toLowerCase() !== 'false';
            });
        }
        data.sort(function(a, b) {
            var sa = parseInt(a.sortOrder, 10) || 0;
            var sb = parseInt(b.sortOrder, 10) || 0;
            if (sa !== sb) return sa - sb;
            return String(a.userName || '').localeCompare(String(b.userName || ''), 'ar');
        });
        return { success: true, data: data };
    } catch (error) {
        Logger.log('Error in getAllClinicStaff: ' + error.toString());
        return { success: false, message: 'خطأ في جلب مسئولي العيادة: ' + error.toString(), data: [] };
    }
}

function addClinicStaff(data) {
    try {
        if (!data || (!data.userId && !data.userEmail)) {
            return { success: false, message: 'معرف المستخدم أو البريد مطلوب' };
        }
        var sheetName = 'ClinicStaff';
        if (!data.id) data.id = generateSequentialId('CST', sheetName);
        if (!data.isActive) data.isActive = 'true';
        if (!data.sortOrder) data.sortOrder = 1;
        if (!data.staffRole) data.staffRole = 'clinic_officer';
        if (!data.createdAt) data.createdAt = new Date();
        if (!data.updatedAt) data.updatedAt = new Date();
        var existing = isActiveClinicStaffUser_(data.userId || data.userEmail);
        if (existing) {
            return { success: false, message: 'المستخدم مسجّل بالفعل كمسئول عيادة نشط' };
        }
        var result = appendToSheet(sheetName, data);
        return result && result.success
            ? { success: true, data: { id: data.id }, message: result.message || 'تمت الإضافة' }
            : result;
    } catch (error) {
        Logger.log('Error in addClinicStaff: ' + error.toString());
        return { success: false, message: 'خطأ في إضافة مسئول العيادة: ' + error.toString() };
    }
}

function updateClinicStaff(staffId, updateData) {
    try {
        if (!staffId) return { success: false, message: 'معرف المسئول غير محدد' };
        var sheetName = 'ClinicStaff';
        updateData = updateData || {};
        updateData.id = staffId;
        updateData.updatedAt = new Date();
        var result = updateSingleRowInSheet(sheetName, staffId, updateData, getSpreadsheetId());
        if (result && result.success) return { success: true, message: 'تم التحديث', data: updateData };
        var allData = readFromSheet(sheetName, getSpreadsheetId()) || [];
        var idx = allData.findIndex(function(r) { return r && String(r.id) === String(staffId); });
        if (idx === -1) return { success: false, message: 'المسئول غير موجود' };
        for (var k in updateData) {
            if (updateData.hasOwnProperty(k)) allData[idx][k] = updateData[k];
        }
        return saveToSheet(sheetName, allData, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in updateClinicStaff: ' + error.toString());
        return { success: false, message: 'خطأ في تحديث مسئول العيادة: ' + error.toString() };
    }
}

function deleteClinicStaff(staffId) {
    try {
        if (!staffId) return { success: false, message: 'معرف المسئول غير محدد' };
        var sheetName = 'ClinicStaff';
        var data = readFromSheet(sheetName, getSpreadsheetId()) || [];
        var filtered = data.filter(function(r) { return r && String(r.id) !== String(staffId); });
        if (filtered.length === data.length) return { success: false, message: 'المسئول غير موجود' };
        return saveToSheet(sheetName, filtered, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in deleteClinicStaff: ' + error.toString());
        return { success: false, message: 'خطأ في حذف مسئول العيادة: ' + error.toString() };
    }
}

function upsertClinicStaffAttendanceOnLogin_(payload) {
    try {
        payload = payload || {};
        var userId = payload.userId || payload.id || '';
        var email = payload.email || payload.userEmail || '';
        var sessionId = payload.sessionId || '';
        var staff = isActiveClinicStaffUser_(userId) || isActiveClinicStaffUser_(email);
        if (!staff) {
            return { success: true, skipped: true, message: 'المستخدم ليس مسئول عيادة نشط' };
        }
        var sheetName = 'ClinicStaffAttendance';
        var today = _clinicStaffDayKey_(new Date());
        var now = new Date().toISOString();
        var all = readFromSheet(sheetName, getSpreadsheetId()) || [];
        var consolidated = _clinicStaffConsolidateAttendanceForUserDay_(all, staff, userId, email, today);
        all = consolidated.all;
        if (consolidated.merged && consolidated.merged.checkIn) {
            if (consolidated.hadDuplicates) {
                saveToSheet(sheetName, all, getSpreadsheetId());
            }
            return { success: true, data: consolidated.merged, message: 'سجل حضور موجود لليوم — أول دخول محفوظ' };
        }
        var record = consolidated.merged || {
            id: generateSequentialId('CSA', sheetName),
            staffId: staff.id,
            userId: staff.userId || userId,
            userName: staff.userName || payload.userName || payload.name || '',
            userEmail: staff.userEmail || email || '',
            staffRole: staff.staffRole || '',
            date: today,
            checkIn: '',
            checkOut: '',
            workDuration: '',
            status: 'present',
            sessionId: sessionId,
            source: 'login',
            notes: '',
            createdAt: now,
            updatedAt: now
        };
        record.checkIn = now;
        record.checkOut = record.checkOut || '';
        record.workDuration = _clinicStaffCalcDurationHours_(record.checkIn, record.checkOut);
        record.sessionId = sessionId || record.sessionId || '';
        record.updatedAt = now;
        if (!record.createdAt) record.createdAt = now;
        if (consolidated.hadDuplicates) {
            var replacedDup = false;
            for (var i = 0; i < all.length; i++) {
                if (all[i] && String(all[i].id) === String(record.id)) {
                    all[i] = record;
                    replacedDup = true;
                    break;
                }
            }
            if (!replacedDup) all.push(record);
            return saveToSheet(sheetName, all, getSpreadsheetId());
        }
        if (consolidated.merged) {
            var rowUpdate = updateSingleRowInSheet(sheetName, record.id, {
                checkIn: record.checkIn,
                checkOut: record.checkOut || '',
                workDuration: record.workDuration,
                status: record.status || 'present',
                sessionId: record.sessionId || '',
                staffId: record.staffId,
                userId: record.userId,
                userName: record.userName,
                userEmail: record.userEmail,
                staffRole: record.staffRole,
                date: record.date,
                updatedAt: now
            }, getSpreadsheetId());
            return rowUpdate;
        }
        return appendToSheet(sheetName, record);
    } catch (error) {
        Logger.log('Error in upsertClinicStaffAttendanceOnLogin_: ' + error.toString());
        return { success: false, message: 'خطأ في تسجيل حضور الدخول: ' + error.toString() };
    }
}

function upsertClinicStaffAttendanceOnLogout_(payload) {
    try {
        payload = payload || {};
        var userId = payload.userId || payload.id || '';
        var email = payload.email || payload.userEmail || '';
        var staff = isActiveClinicStaffUser_(userId) || isActiveClinicStaffUser_(email);
        if (!staff) {
            return { success: true, skipped: true, message: 'المستخدم ليس مسئول عيادة نشط' };
        }
        var sheetName = 'ClinicStaffAttendance';
        var today = _clinicStaffDayKey_(new Date());
        var now = new Date().toISOString();
        var all = readFromSheet(sheetName, getSpreadsheetId()) || [];

        // ✅ إصلاح الوردية الثالثة (الليلية): البحث عن أحدث سجل مفتوح للمستخدم (دخول بدون خروج) من الـ 30 ساعة الأخيرة
        var openRecord = null;
        var openIndex = -1;
        var nowMs = new Date().getTime();
        for (var i = all.length - 1; i >= 0; i--) {
            var r = all[i];
            if (r && _clinicStaffAttendanceMatchesUser_(r, staff, userId, email)) {
                if (r.checkIn && (!r.checkOut || String(r.checkOut).trim() === '')) {
                    var inMs = new Date(r.checkIn).getTime();
                    if (!isNaN(inMs) && (nowMs - inMs) <= 30 * 60 * 60 * 1000) {
                        openRecord = r;
                        openIndex = i;
                        break;
                    }
                }
            }
        }

        if (openRecord && openIndex !== -1) {
            openRecord.checkOut = now;
            openRecord.workDuration = _clinicStaffCalcDurationHours_(openRecord.checkIn, now);
            openRecord.status = openRecord.workDuration ? 'present' : 'partial';
            openRecord.updatedAt = now;
            all[openIndex] = openRecord;
            return updateSingleRowInSheet(sheetName, openRecord.id, {
                checkOut: now,
                workDuration: openRecord.workDuration,
                status: openRecord.status,
                updatedAt: now
            }, getSpreadsheetId());
        }

        var consolidated = _clinicStaffConsolidateAttendanceForUserDay_(all, staff, userId, email, today);
        if (!consolidated.merged) {
            return { success: true, skipped: true, message: 'لا يوجد سجل حضور لليوم' };
        }
        consolidated.merged.checkOut = now;
        consolidated.merged.workDuration = _clinicStaffCalcDurationHours_(consolidated.merged.checkIn, now);
        consolidated.merged.status = consolidated.merged.workDuration ? 'present' : 'partial';
        consolidated.merged.updatedAt = now;
        return updateSingleRowInSheet(sheetName, consolidated.merged.id, {
            checkOut: now,
            workDuration: consolidated.merged.workDuration,
            status: consolidated.merged.status,
            updatedAt: now
        }, getSpreadsheetId());
    } catch (error) {
        Logger.log('Error in upsertClinicStaffAttendanceOnLogout_: ' + error.toString());
        return { success: false, message: 'خطأ في تسجيل حضور الخروج: ' + error.toString() };
    }
}

function getClinicStaffAttendance(filters, actorUserData) {
    try {
        filters = filters || {};
        var isAdmin = _clinicStaffIsAdminActor_(actorUserData);
        var data = readFromSheet('ClinicStaffAttendance', getSpreadsheetId()) || [];
        data = _clinicStaffMergeAllAttendanceRecords_(data);
        if (!isAdmin) {
            data = data.filter(function(r) { return _clinicStaffRowMatchesActor_(r, actorUserData); });
        } else {
            if (filters.staffId) {
                data = data.filter(function(r) { return r && String(r.staffId) === String(filters.staffId); });
            }
            if (filters.userId) {
                data = data.filter(function(r) { return r && String(r.userId) === String(filters.userId); });
            }
        }
        if (filters.staffRole) {
            data = data.filter(function(r) { return r && String(r.staffRole) === String(filters.staffRole); });
        }
        if (filters.status) {
            data = data.filter(function(r) { return r && String(r.status) === String(filters.status); });
        }
        if (filters.search) {
            var q = String(filters.search).trim().toLowerCase();
            data = data.filter(function(r) {
                if (!r) return false;
                return String(r.userName || '').toLowerCase().indexOf(q) !== -1
                    || String(r.userEmail || '').toLowerCase().indexOf(q) !== -1;
            });
        }
        if (filters.dateFrom || filters.dateTo) {
            var fromKey = filters.dateFrom ? _clinicStaffDayKey_(filters.dateFrom) : null;
            var toKey = filters.dateTo ? _clinicStaffDayKey_(filters.dateTo) : null;
            data = data.filter(function(r) {
                if (!r || !r.date) return false;
                var dk = _clinicStaffDayKey_(r.date);
                if (fromKey && dk < fromKey) return false;
                if (toKey && dk > toKey) return false;
                return true;
            });
        }
        data.sort(function(a, b) {
            var da = _clinicStaffDayKey_(b.date) + String(b.checkIn || '');
            var db = _clinicStaffDayKey_(a.date) + String(a.checkIn || '');
            return da.localeCompare(db);
        });
        return { success: true, data: data };
    } catch (error) {
        Logger.log('Error in getClinicStaffAttendance: ' + error.toString());
        return { success: false, message: 'خطأ في جلب سجل الحضور: ' + error.toString(), data: [] };
    }
}

function recordClinicStaffLogin(payload) {
    return upsertClinicStaffAttendanceOnLogin_(payload || {});
}

function recordClinicStaffLogout(payload) {
    return upsertClinicStaffAttendanceOnLogout_(payload || {});
}

function _clinicStaffNormalizePunchTime_(dayKey, timeInput) {
    try {
        var day = _clinicStaffDayKey_(dayKey);
        if (!timeInput) return '';
        var s = String(timeInput).trim();
        if (!s) return '';
        if (s.indexOf('T') !== -1 || s.indexOf(' ') !== -1 || s.length > 12) {
            var d = new Date(s);
            if (!isNaN(d.getTime())) return d.toISOString();
        }
        if (/^\d{1,2}:\d{2}/.test(s) && day) {
            var parts = s.split(':');
            var hh = parseInt(parts[0], 10);
            var mm = parseInt(parts[1], 10);
            if (!isNaN(hh) && !isNaN(mm)) {
                var base = new Date(day + 'T00:00:00');
                if (!isNaN(base.getTime())) {
                    base.setHours(hh, mm, 0, 0);
                    return base.toISOString();
                }
            }
        }
        return '';
    } catch (_e) {
        return '';
    }
}

function _clinicStaffReplaceUserDayAttendance_(all, record, staff) {
    all = all || [];
    if (!record) return all;
    var dayKey = _clinicStaffDayKey_(record.date);
    staff = staff || {
        id: record.staffId,
        userId: record.userId,
        userEmail: record.userEmail
    };
    var filtered = all.filter(function(r) {
        if (!r) return false;
        return !(_clinicStaffDayKey_(r.date) === dayKey
            && _clinicStaffAttendanceMatchesUser_(r, staff, record.userId, record.userEmail));
    });
    filtered.push(record);
    return filtered;
}

function _clinicStaffFindStaffById_(staffId) {
    if (!staffId) return null;
    var staff = readFromSheet('ClinicStaff', getSpreadsheetId()) || [];
    for (var i = 0; i < staff.length; i++) {
        if (staff[i] && String(staff[i].id) === String(staffId)) return staff[i];
    }
    return null;
}

function updateClinicStaffAttendance(payload, actorUserData) {
    try {
        payload = payload || {};
        var isAdmin = _clinicStaffIsAdminActor_(actorUserData);
        var sheetName = 'ClinicStaffAttendance';
        var all = readFromSheet(sheetName, getSpreadsheetId()) || [];
        var now = new Date().toISOString();
        var actorName = (actorUserData && (actorUserData.name || actorUserData.email)) || 'مستخدم';
        var punchType = String(payload.punchType || '').trim().toLowerCase().replace(/_/g, '');
        var allowOverwrite = isAdmin && payload.allowOverwrite === true;
        var record = null;
        var staff = null;
        var dayKey = '';
        var recordId = payload.recordId || payload.id || '';
        if (recordId) {
            var mergedList = _clinicStaffMergeAllAttendanceRecords_(all);
            for (var mi = 0; mi < mergedList.length; mi++) {
                if (mergedList[mi] && String(mergedList[mi].id) === String(recordId)) {
                    record = mergedList[mi];
                    break;
                }
            }
            if (!record) {
                for (var ri = 0; ri < all.length; ri++) {
                    if (all[ri] && String(all[ri].id) === String(recordId)) {
                        record = all[ri];
                        break;
                    }
                }
            }
            if (record) {
                dayKey = _clinicStaffDayKey_(record.date);
                staff = _clinicStaffFindStaffById_(record.staffId);
            }
        }

        if (!record) {
            var staffId = payload.staffId || '';
            if (!staffId && !isAdmin) {
                staff = isActiveClinicStaffUser_(_clinicStaffActorKeys_(actorUserData).userId)
                    || isActiveClinicStaffUser_(_clinicStaffActorKeys_(actorUserData).email);
                if (staff) staffId = staff.id;
            }
            if (!staffId) {
                return { success: false, message: 'معرف المسئول مطلوب' };
            }
            staff = staff || _clinicStaffFindStaffById_(staffId);
            if (!staff) {
                return { success: false, message: 'مسئول العيادة غير موجود' };
            }
            if (!payload.date) {
                return { success: false, message: 'التاريخ مطلوب' };
            }
            dayKey = _clinicStaffDayKey_(payload.date);
            var consolidated = _clinicStaffConsolidateAttendanceForUserDay_(
                all, staff, staff.userId, staff.userEmail, dayKey
            );
            all = consolidated.all;
            if (consolidated.merged) {
                record = consolidated.merged;
            }
        }

        if (!isAdmin) {
            var targetRow = record || {
                userId: staff ? staff.userId : '',
                userEmail: staff ? staff.userEmail : ''
            };
            if (!_clinicStaffRowMatchesActor_(targetRow, actorUserData)) {
                return { success: false, message: 'غير مصرح بتعديل هذا السجل' };
            }
        }

        if (!record) {
            record = {
                id: generateSequentialId('CSA', sheetName),
                staffId: staff.id,
                userId: staff.userId || '',
                userName: staff.userName || '',
                userEmail: staff.userEmail || '',
                staffRole: staff.staffRole || '',
                date: dayKey,
                checkIn: '',
                checkOut: '',
                workDuration: '',
                status: 'absent',
                sessionId: '',
                source: 'manual',
                notes: '',
                createdAt: now,
                updatedAt: now
            };
        } else if (!staff) {
            staff = {
                id: record.staffId,
                userId: record.userId,
                userEmail: record.userEmail,
                userName: record.userName,
                staffRole: record.staffRole
            };
            dayKey = _clinicStaffDayKey_(record.date);
        }

        var dayForPunch = dayKey || _clinicStaffDayKey_(record.date);
        var newCheckIn = payload.checkIn !== undefined && payload.checkIn !== null && String(payload.checkIn).trim() !== ''
            ? _clinicStaffNormalizePunchTime_(dayForPunch, payload.checkIn) : '';
        var newCheckOut = payload.checkOut !== undefined && payload.checkOut !== null && String(payload.checkOut).trim() !== ''
            ? _clinicStaffNormalizePunchTime_(dayForPunch, payload.checkOut) : '';

        if (punchType === 'checkin' || (!punchType && newCheckIn)) {
            if (record.checkIn && !allowOverwrite) {
                return { success: false, message: 'وقت الدخول مسجّل مسبقاً — لا يمكن إضافة بصمة دخول مفقودة' };
            }
            if (!newCheckIn) {
                return { success: false, message: 'وقت الدخول مطلوب' };
            }
            record.checkIn = newCheckIn;
        }
        if (punchType === 'checkout' || (!punchType && newCheckOut)) {
            if (record.checkOut && !allowOverwrite) {
                return { success: false, message: 'وقت الخروج مسجّل مسبقاً — لا يمكن إضافة بصمة خروج مفقودة' };
            }
            if (!newCheckOut) {
                return { success: false, message: 'وقت الخروج مطلوب' };
            }
            record.checkOut = newCheckOut;
        }

        if (!newCheckIn && !newCheckOut && punchType) {
            return { success: false, message: 'الوقت مطلوب' };
        }

        if (record.checkIn && record.checkOut) {
            var ci = new Date(record.checkIn).getTime();
            var co = new Date(record.checkOut).getTime();
            if (!isNaN(ci) && !isNaN(co) && co <= ci) {
                // ✅ دعم الوردية الثالثة الليلية: إذا كان وقت الخروج على نفس التاريخ أصغر من وقت الدخول (مثلاً دخول 22:30 وخروج 07:30)، تتم إضافة 24 ساعة لوقت الخروج
                var coDate = new Date(record.checkOut);
                coDate.setDate(coDate.getDate() + 1);
                var newCoMs = coDate.getTime();
                if (newCoMs > ci && (newCoMs - ci) <= 24 * 60 * 60 * 1000) {
                    record.checkOut = coDate.toISOString();
                    co = newCoMs;
                } else {
                    return { success: false, message: 'وقت الخروج يجب أن يكون بعد وقت الدخول' };
                }
            }
        }

        record.workDuration = _clinicStaffCalcDurationHours_(record.checkIn, record.checkOut);
        if (record.checkIn && record.checkOut) {
            record.status = record.workDuration ? 'present' : 'partial';
        } else if (record.checkIn) {
            record.status = 'partial';
        } else if (record.checkOut) {
            record.status = 'partial';
        } else {
            record.status = 'absent';
        }

        var noteText = String(payload.notes || '').trim();
        var manualNote = '[بصمة يدوية ' + now.slice(0, 16).replace('T', ' ') + ' — ' + actorName + ']';
        if (noteText) manualNote += ' ' + noteText;
        record.notes = record.notes ? (String(record.notes) + ' | ' + manualNote) : manualNote;
        if (record.source === 'login') record.source = 'login+manual';
        else if (!record.source) record.source = 'manual';
        record.updatedAt = now;
        if (!record.createdAt) record.createdAt = now;

        var updatedAll = _clinicStaffReplaceUserDayAttendance_(all, record, staff);
        var saveResult = saveToSheet(sheetName, updatedAll, getSpreadsheetId());
        if (saveResult && saveResult.success) {
            return { success: true, data: record, message: 'تم حفظ البصمة اليدوية' };
        }
        return saveResult || { success: false, message: 'فشل حفظ سجل الحضور' };
    } catch (error) {
        Logger.log('Error in updateClinicStaffAttendance: ' + error.toString());
        return { success: false, message: 'خطأ في تحديث الحضور: ' + error.toString() };
    }
}

// ============================================
// طلبات إجازة / إذن / إضافي — مسئولو العيادة
// ============================================

function _clinicStaffIsAdminActor_(actorUserData) {
    if (!actorUserData) return false;
    if (typeof resolveActorRecordFromUsersSheet_ === 'function') {
        var resolved = resolveActorRecordFromUsersSheet_(actorUserData);
        if (resolved && typeof checkAdminPermissions === 'function' && checkAdminPermissions(resolved)) {
            return true;
        }
    }
    if (typeof checkAdminPermissionsAuthoritative === 'function' && checkAdminPermissionsAuthoritative(actorUserData)) {
        return true;
    }
    if (typeof checkAdminPermissions === 'function' && checkAdminPermissions(actorUserData)) {
        return true;
    }
    var perms = actorUserData.permissions;
    if (perms && typeof perms === 'object' && !Array.isArray(perms)) {
        if (typeof checkAdminPermissions === 'function' && checkAdminPermissions({ role: perms.role, permissions: perms })) {
            return true;
        }
        if (perms.admin === true || perms.isAdmin === true || perms['manage-modules'] === true) {
            return true;
        }
        var pr = String(perms.role || '').trim().toLowerCase();
        if (pr === 'admin' || pr === 'system_admin' || perms.role === 'مدير النظام' || perms.role === 'مدير') {
            return true;
        }
    }
    var role = String(actorUserData.role || '').trim();
    var low = role.toLowerCase();
    return low === 'admin' || low === 'system_admin' || role === 'مدير النظام' || role === 'مدير';
}

function _clinicStaffActorKeys_(actorUserData) {
    if (!actorUserData) return { userId: '', email: '' };
    return {
        userId: String(actorUserData.id || actorUserData.userId || '').trim(),
        email: String(actorUserData.email || '').trim().toLowerCase()
    };
}

function _clinicStaffRowMatchesActor_(row, actorUserData) {
    if (!row || !actorUserData) return false;
    var keys = _clinicStaffActorKeys_(actorUserData);
    var uid = String(row.userId || '').trim();
    var em = String(row.userEmail || '').trim().toLowerCase();
    if (keys.userId && uid === keys.userId) return true;
    if (keys.email && em === keys.email) return true;
    return false;
}

function _clinicStaffTimeOffCalcDays_(dateFrom, dateTo) {
    try {
        var a = new Date(dateFrom);
        var b = new Date(dateTo);
        if (isNaN(a.getTime()) || isNaN(b.getTime()) || b < a) return '';
        return Math.floor((b - a) / (1000 * 60 * 60 * 24)) + 1;
    } catch (_e) {
        return '';
    }
}

function _clinicStaffTimeOffCalcHoursFromTimes_(timeFrom, timeTo) {
    try {
        if (!timeFrom || !timeTo) return '';
        var partsA = String(timeFrom).split(':');
        var partsB = String(timeTo).split(':');
        if (partsA.length < 2 || partsB.length < 2) return '';
        var minsA = parseInt(partsA[0], 10) * 60 + parseInt(partsA[1], 10);
        var minsB = parseInt(partsB[0], 10) * 60 + parseInt(partsB[1], 10);
        if (isNaN(minsA) || isNaN(minsB) || minsB <= minsA) return '';
        return Math.round(((minsB - minsA) / 60) * 100) / 100;
    } catch (_e) {
        return '';
    }
}

function _clinicStaffTimeOffTypeLabel_(requestType) {
    var map = { leave: 'إجازة', permission: 'إذن', overtime: 'إضافي' };
    return map[String(requestType || '').trim().toLowerCase()] || requestType || 'طلب';
}

function _clinicStaffTimeOffDetailsText_(row) {
    if (!row) return '';
    var rt = String(row.requestType || '').trim().toLowerCase();
    if (rt === 'leave') {
        return (row.dateFrom || '—') + ' → ' + (row.dateTo || '—');
    }
    if (rt === 'permission') {
        return (row.dateFrom || '—') + ' | ' + (row.timeFrom || '—') + ' - ' + (row.timeTo || '—');
    }
    var parts = [row.dateFrom || '—'];
    if (row.durationHours) parts.push(String(row.durationHours) + ' س');
    else if (row.timeFrom && row.timeTo) parts.push(row.timeFrom + ' - ' + row.timeTo);
    return parts.join(' ');
}

/**
 * إشعار مديري النظام بطلب إجازة/إذن/إضافي جديد (من الخادم — لا يعتمد على قراءة Users من الواجهة)
 */
function notifyAdminsOfClinicStaffTimeOffRequest_(row) {
    try {
        if (!row || !row.id || typeof addNotification !== 'function') return;
        var spreadsheetId = getSpreadsheetId();
        if (!spreadsheetId) return;
        var users = readFromSheet('Users', spreadsheetId) || [];
        if (!Array.isArray(users) || !users.length) return;

        var typeLabel = _clinicStaffTimeOffTypeLabel_(row.requestType);
        var userName = row.userName || row.userEmail || 'مسئول عيادة';
        var message = userName + ' — ' + typeLabel + ': ' + _clinicStaffTimeOffDetailsText_(row);
        if (row.reason) {
            message += ' — ' + String(row.reason).trim().substring(0, 120);
        }

        users.forEach(function(u) {
            if (!u) return;
            var active = u.active;
            if (active === false || String(active).toLowerCase() === 'false') return;

            var isAdmin = false;
            if (typeof checkAdminPermissions === 'function' && checkAdminPermissions(u)) {
                isAdmin = true;
            } else {
                var role = String(u.role || '').trim().toLowerCase();
                isAdmin = role === 'admin' || role === 'system_admin' || u.role === 'مدير النظام' || u.role === 'مدير';
            }
            if (!isAdmin) return;

            var userId = u.email || u.id;
            if (!userId) return;

            try {
                addNotification({
                    userId: userId,
                    type: 'approval_request',
                    priority: 'normal',
                    title: 'طلب موافقة على ' + typeLabel,
                    message: message,
                    relatedId: row.id,
                    relatedType: 'ClinicStaffTimeOffRequest'
                });
            } catch (notifyErr) {
                Logger.log('notifyAdminsOfClinicStaffTimeOffRequest_ notify error: ' + notifyErr.toString());
            }
        });
    } catch (e) {
        Logger.log('Error in notifyAdminsOfClinicStaffTimeOffRequest_: ' + e.toString());
    }
}

function addClinicStaffTimeOffRequest(data, actorUserData) {
    try {
        if (!data) return { success: false, message: 'بيانات الطلب غير موجودة' };
        var keys = _clinicStaffActorKeys_(actorUserData);
        if (!keys.userId && !keys.email) {
            return { success: false, message: 'يجب تسجيل الدخول لتقديم الطلب' };
        }
        var staff = isActiveClinicStaffUser_(keys.userId) || isActiveClinicStaffUser_(keys.email);
        if (!staff) {
            return { success: false, message: 'يجب أن تكون مسئول عيادة نشطاً لتقديم الطلب' };
        }
        var requestType = String(data.requestType || '').trim().toLowerCase();
        if (['leave', 'permission', 'overtime'].indexOf(requestType) === -1) {
            return { success: false, message: 'نوع الطلب غير صالح' };
        }
        var reason = String(data.reason || '').trim();
        if (!reason) return { success: false, message: 'سبب الطلب مطلوب' };

        var row = {
            id: generateSequentialId('CTO', 'ClinicStaffTimeOffRequests'),
            requestType: requestType,
            staffId: staff.id || '',
            userId: staff.userId || keys.userId,
            userEmail: staff.userEmail || keys.email,
            userName: staff.userName || (actorUserData && actorUserData.name) || '',
            staffRole: staff.staffRole || '',
            dateFrom: data.dateFrom || '',
            dateTo: data.dateTo || '',
            timeFrom: data.timeFrom || '',
            timeTo: data.timeTo || '',
            durationHours: data.durationHours || '',
            durationDays: data.durationDays || '',
            reason: reason,
            status: 'pending',
            reviewedById: '',
            reviewedByName: '',
            reviewNotes: '',
            requestedAt: new Date(),
            reviewedAt: '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        if (requestType === 'leave') {
            if (!row.dateFrom || !row.dateTo) {
                return { success: false, message: 'تاريخ بداية ونهاية الإجازة مطلوبان' };
            }
            row.durationDays = _clinicStaffTimeOffCalcDays_(row.dateFrom, row.dateTo);
        } else if (requestType === 'permission') {
            if (!row.dateFrom) row.dateFrom = _clinicStaffDayKey_(new Date());
            if (!row.timeFrom || !row.timeTo) {
                return { success: false, message: 'وقت بداية ونهاية الإذن مطلوبان' };
            }
            row.dateTo = row.dateFrom;
            row.durationHours = _clinicStaffTimeOffCalcHoursFromTimes_(row.timeFrom, row.timeTo);
        } else if (requestType === 'overtime') {
            if (!row.dateFrom) {
                return { success: false, message: 'تاريخ العمل الإضافي مطلوب' };
            }
            if (row.timeFrom && row.timeTo) {
                row.durationHours = _clinicStaffTimeOffCalcHoursFromTimes_(row.timeFrom, row.timeTo);
            }
            if (!row.durationHours && data.durationHours) {
                row.durationHours = data.durationHours;
            }
            if (!row.durationHours) {
                return { success: false, message: 'مدة العمل الإضافي (ساعات) مطلوبة' };
            }
            row.dateTo = row.dateFrom;
        }

        var result = appendToSheet('ClinicStaffTimeOffRequests', row);
        if (result && result.success) {
            notifyAdminsOfClinicStaffTimeOffRequest_(row);
            return { success: true, data: { id: row.id }, message: 'تم إرسال الطلب بنجاح' };
        }
        return result;
    } catch (error) {
        Logger.log('Error in addClinicStaffTimeOffRequest: ' + error.toString());
        return { success: false, message: 'خطأ في إرسال الطلب: ' + error.toString() };
    }
}

function getClinicStaffTimeOffRequests(filters, actorUserData) {
    try {
        filters = filters || {};
        var isAdmin = _clinicStaffIsAdminActor_(actorUserData);
        var data = readFromSheet('ClinicStaffTimeOffRequests', getSpreadsheetId()) || [];
        if (!isAdmin) {
            data = data.filter(function(r) { return _clinicStaffRowMatchesActor_(r, actorUserData); });
        } else {
            if (filters.staffId) {
                data = data.filter(function(r) { return r && String(r.staffId) === String(filters.staffId); });
            }
            if (filters.userId) {
                data = data.filter(function(r) { return r && String(r.userId) === String(filters.userId); });
            }
        }
        if (filters.requestType) {
            data = data.filter(function(r) { return r && String(r.requestType) === String(filters.requestType); });
        }
        if (filters.status) {
            data = data.filter(function(r) { return r && String(r.status) === String(filters.status); });
        }
        data.sort(function(a, b) {
            var da = String(b.requestedAt || b.createdAt || '');
            var db = String(a.requestedAt || a.createdAt || '');
            return da.localeCompare(db);
        });
        return { success: true, data: data };
    } catch (error) {
        Logger.log('Error in getClinicStaffTimeOffRequests: ' + error.toString());
        return { success: false, message: 'خطأ في جلب الطلبات: ' + error.toString(), data: [] };
    }
}

function _updateClinicStaffTimeOffRequest_(requestId, updateData) {
    if (!requestId) return { success: false, message: 'معرف الطلب غير محدد' };
    updateData = updateData || {};
    updateData.id = requestId;
    updateData.updatedAt = new Date();
    var result = updateSingleRowInSheet('ClinicStaffTimeOffRequests', requestId, updateData, getSpreadsheetId());
    if (result && result.success) return result;
    var allData = readFromSheet('ClinicStaffTimeOffRequests', getSpreadsheetId()) || [];
    var idx = allData.findIndex(function(r) { return r && String(r.id) === String(requestId); });
    if (idx === -1) return { success: false, message: 'الطلب غير موجود' };
    for (var k in updateData) {
        if (updateData.hasOwnProperty(k)) allData[idx][k] = updateData[k];
    }
    return saveToSheet('ClinicStaffTimeOffRequests', allData, getSpreadsheetId());
}

function approveClinicStaffTimeOffRequest(requestId, actorUserData, notes) {
    try {
        if (!_clinicStaffIsAdminActor_(actorUserData)) {
            return { success: false, message: 'الاعتماد متاح لمدير النظام فقط' };
        }
        var result = _updateClinicStaffTimeOffRequest_(requestId, {
            status: 'approved',
            reviewedById: actorUserData && (actorUserData.id || actorUserData.userId) || '',
            reviewedByName: actorUserData && actorUserData.name || '',
            reviewNotes: notes || '',
            reviewedAt: new Date()
        });
        if (result && result.success && typeof invalidateHseSheetCaches === 'function') {
            invalidateHseSheetCaches('ClinicStaffTimeOffRequests');
        }
        return result;
    } catch (error) {
        Logger.log('Error in approveClinicStaffTimeOffRequest: ' + error.toString());
        return { success: false, message: 'خطأ في اعتماد الطلب: ' + error.toString() };
    }
}

function rejectClinicStaffTimeOffRequest(requestId, actorUserData, reason) {
    try {
        if (!_clinicStaffIsAdminActor_(actorUserData)) {
            return { success: false, message: 'الرفض متاح لمدير النظام فقط' };
        }
        return _updateClinicStaffTimeOffRequest_(requestId, {
            status: 'rejected',
            reviewedById: actorUserData && (actorUserData.id || actorUserData.userId) || '',
            reviewedByName: actorUserData && actorUserData.name || '',
            reviewNotes: reason || '',
            reviewedAt: new Date()
        });
    } catch (error) {
        Logger.log('Error in rejectClinicStaffTimeOffRequest: ' + error.toString());
        return { success: false, message: 'خطأ في رفض الطلب: ' + error.toString() };
    }
}

function cancelClinicStaffTimeOffRequest(requestId, actorUserData) {
    try {
        var allData = readFromSheet('ClinicStaffTimeOffRequests', getSpreadsheetId()) || [];
        var row = allData.find(function(r) { return r && String(r.id) === String(requestId); });
        if (!row) return { success: false, message: 'الطلب غير موجود' };
        if (String(row.status) !== 'pending') {
            return { success: false, message: 'لا يمكن إلغاء طلب غير معلق' };
        }
        if (!_clinicStaffIsAdminActor_(actorUserData) && !_clinicStaffRowMatchesActor_(row, actorUserData)) {
            return { success: false, message: 'غير مصرح بإلغاء هذا الطلب' };
        }
        return _updateClinicStaffTimeOffRequest_(requestId, {
            status: 'cancelled',
            updatedAt: new Date()
        });
    } catch (error) {
        Logger.log('Error in cancelClinicStaffTimeOffRequest: ' + error.toString());
        return { success: false, message: 'خطأ في إلغاء الطلب: ' + error.toString() };
    }
}

// ============================================
// أرصدة إجازات وأذونات مسئولي العيادة
// ============================================

function _clinicStaffTimeOffStatusIsApproved_(status) {
    var s = String(status || '').trim().toLowerCase();
    return s === 'approved' || s === 'معتمد' || s === 'موافق عليه' || s === 'موافق عليها';
}

function _clinicStaffRequestMatchesStaff_(req, staff) {
    if (!req || !staff) return false;
    if (staff.id && req.staffId && String(req.staffId) === String(staff.id)) return true;
    var uid = String(staff.userId || '').trim();
    var em = String(staff.userEmail || '').trim().toLowerCase();
    if (uid && String(req.userId || '').trim() === uid) return true;
    if (em && String(req.userEmail || '').trim().toLowerCase() === em) return true;
    return false;
}

function _clinicStaffDateInPeriod_(dateKey, periodType, periodKey) {
    if (!dateKey || !periodKey) return false;
    if (periodType === 'year') return dateKey.substring(0, 4) === String(periodKey);
    return dateKey.substring(0, 7) === String(periodKey);
}

function _clinicStaffRequestOverlapsPeriod_(req, periodType, periodKey) {
    var from = _clinicStaffDayKey_(req.dateFrom);
    var to = _clinicStaffDayKey_(req.dateTo || req.dateFrom);
    if (!from) from = _clinicStaffDayKey_(req.requestedAt || req.createdAt);
    if (!to) to = from;
    if (!from) return false;
    if (_clinicStaffDateInPeriod_(from, periodType, periodKey) || _clinicStaffDateInPeriod_(to, periodType, periodKey)) {
        return true;
    }
    try {
        var cur = new Date(from);
        var endD = new Date(to);
        if (isNaN(cur.getTime()) || isNaN(endD.getTime())) return false;
        var guard = 0;
        while (cur <= endD && guard < 400) {
            var dk = _clinicStaffDayKey_(cur);
            if (_clinicStaffDateInPeriod_(dk, periodType, periodKey)) return true;
            cur.setDate(cur.getDate() + 1);
            guard++;
        }
    } catch (_e) { /* ignore */ }
    return false;
}

function _clinicStaffCountLeaveDaysInPeriod_(req, periodType, periodKey) {
    var from = _clinicStaffDayKey_(req.dateFrom);
    var to = _clinicStaffDayKey_(req.dateTo || req.dateFrom);
    if (!from) {
        var d = parseFloat(req.durationDays);
        return !isNaN(d) && d > 0 ? d : (_clinicStaffTimeOffCalcDays_(req.dateFrom, req.dateTo) || 0);
    }
    if (!to) to = from;
    try {
        var cur = new Date(from);
        var endD = new Date(to);
        if (isNaN(cur.getTime()) || isNaN(endD.getTime())) {
            var fallback = parseFloat(req.durationDays);
            return !isNaN(fallback) && fallback > 0 ? fallback : (_clinicStaffTimeOffCalcDays_(req.dateFrom, req.dateTo) || 0);
        }
        var total = 0;
        var guard = 0;
        while (cur <= endD && guard < 400) {
            var dk = _clinicStaffDayKey_(cur);
            if (_clinicStaffDateInPeriod_(dk, periodType, periodKey)) total += 1;
            cur.setDate(cur.getDate() + 1);
            guard++;
        }
        return total;
    } catch (_e) {
        var fb = parseFloat(req.durationDays);
        return !isNaN(fb) && fb > 0 ? fb : (_clinicStaffTimeOffCalcDays_(req.dateFrom, req.dateTo) || 0);
    }
}

function _clinicStaffPeriodKeyMonth_(dateStr) {
    var dk = _clinicStaffDayKey_(dateStr);
    return dk && dk.length >= 7 ? dk.substring(0, 7) : '';
}

function _clinicStaffPeriodKeyYear_(dateStr) {
    var dk = _clinicStaffDayKey_(dateStr);
    return dk && dk.length >= 4 ? dk.substring(0, 4) : '';
}

function _clinicStaffRequestInPeriod_(req, periodType, periodKey) {
    if (!req || !periodKey) return false;
    var anchor = req.dateFrom || req.requestedAt || req.createdAt;
    if (!anchor) return false;
    var pk = periodType === 'year'
        ? _clinicStaffPeriodKeyYear_(anchor)
        : _clinicStaffPeriodKeyMonth_(anchor);
    return pk === String(periodKey);
}

function _clinicStaffComputeTimeOffConsumed_(requests, staff, periodType, periodKey) {
    var leaveDays = 0;
    var permissionCount = 0;
    var approvedItems = [];
    (requests || []).forEach(function(r) {
        if (!_clinicStaffTimeOffStatusIsApproved_(r.status)) return;
        if (!_clinicStaffRequestMatchesStaff_(r, staff)) return;
        if (!_clinicStaffRequestOverlapsPeriod_(r, periodType, periodKey)) return;
        var rt = String(r.requestType || '').trim().toLowerCase();
        if (rt === 'leave') {
            leaveDays += _clinicStaffCountLeaveDaysInPeriod_(r, periodType, periodKey);
            approvedItems.push(r);
        } else if (rt === 'permission') {
            permissionCount += 1;
            approvedItems.push(r);
        }
    });
    return {
        leaveDaysConsumed: Math.round(leaveDays * 100) / 100,
        permissionCountConsumed: permissionCount,
        approvedItems: approvedItems
    };
}

function _clinicStaffBuildLeaveBalancePeriod_(staff, quotas, requests, periodType, periodKey) {
    var sid = staff && staff.id;
    var quota = (quotas || []).find(function(q) {
        return q && String(q.staffId) === String(sid) &&
            String(q.periodType) === String(periodType) &&
            String(q.periodKey) === String(periodKey);
    }) || null;
    var leaveEntitled = quota ? (parseFloat(quota.leaveDaysQuota) || 0) : 0;
    var permEntitled = quota ? (parseInt(quota.permissionCountQuota, 10) || 0) : 0;
    var consumed = _clinicStaffComputeTimeOffConsumed_(requests, staff, periodType, periodKey);
    var leaveConsumed = consumed.leaveDaysConsumed;
    var permConsumed = consumed.permissionCountConsumed;
    return {
        periodType: periodType,
        periodKey: periodKey,
        leaveEntitled: leaveEntitled,
        leaveConsumed: leaveConsumed,
        leaveRemaining: Math.max(0, Math.round((leaveEntitled - leaveConsumed) * 100) / 100),
        permissionEntitled: permEntitled,
        permissionConsumed: permConsumed,
        permissionRemaining: Math.max(0, permEntitled - permConsumed),
        quotaId: quota ? quota.id : '',
        quotaNotes: quota ? (quota.notes || '') : '',
        approvedItems: consumed.approvedItems || []
    };
}

function getClinicStaffLeaveBalances(payload, actorUserData) {
    try {
        payload = payload || {};
        var isAdmin = _clinicStaffIsAdminActor_(actorUserData);
        if (!isAdmin) {
            var selfStaff = isActiveClinicStaffUser_(
                actorUserData && (actorUserData.id || actorUserData.userId)
            ) || isActiveClinicStaffUser_(actorUserData && actorUserData.email);
            if (!selfStaff) {
                return { success: false, message: 'عرض الأرصدة غير متاح', data: [] };
            }
        }

        var now = new Date();
        var monthKey = String(payload.month || _clinicStaffPeriodKeyMonth_(now) || '').trim();
        var yearKey = String(payload.year || _clinicStaffPeriodKeyYear_(now) || '').trim();
        if (!monthKey) monthKey = _clinicStaffPeriodKeyMonth_(now);
        if (!yearKey) yearKey = _clinicStaffPeriodKeyYear_(now);

        var staffList = readFromSheet('ClinicStaff', getSpreadsheetId()) || [];
        if (payload.staffId) {
            staffList = staffList.filter(function(s) { return s && String(s.id) === String(payload.staffId); });
        } else if (!isAdmin) {
            staffList = staffList.filter(function(s) {
                return _clinicStaffRowMatchesActor_(s, actorUserData);
            });
        }

        var quotas = readFromSheet('ClinicStaffLeaveQuota', getSpreadsheetId()) || [];
        var requests = readFromSheet('ClinicStaffTimeOffRequests', getSpreadsheetId()) || [];

        var rows = staffList.map(function(staff) {
            return {
                staffId: staff.id,
                userId: staff.userId || '',
                userName: staff.userName || '',
                userEmail: staff.userEmail || '',
                staffRole: staff.staffRole || '',
                isActive: staff.isActive,
                month: _clinicStaffBuildLeaveBalancePeriod_(staff, quotas, requests, 'month', monthKey),
                year: _clinicStaffBuildLeaveBalancePeriod_(staff, quotas, requests, 'year', yearKey)
            };
        });

        return {
            success: true,
            data: rows,
            meta: { month: monthKey, year: yearKey }
        };
    } catch (error) {
        Logger.log('Error in getClinicStaffLeaveBalances: ' + error.toString());
        return { success: false, message: 'خطأ في جلب الأرصدة: ' + error.toString(), data: [] };
    }
}

function upsertClinicStaffLeaveQuota(payload, actorUserData) {
    try {
        if (!_clinicStaffIsAdminActor_(actorUserData)) {
            return { success: false, message: 'تعديل الرصيد متاح لمدير النظام فقط' };
        }
        if (!payload || !payload.staffId) {
            return { success: false, message: 'معرف المسئول مطلوب' };
        }

        var periodType = String(payload.periodType || 'month').trim().toLowerCase();
        if (periodType !== 'month' && periodType !== 'year') {
            return { success: false, message: 'نوع الفترة غير صالح (month أو year)' };
        }

        var periodKey = String(payload.periodKey || '').trim();
        if (!periodKey) {
            periodKey = periodType === 'year'
                ? _clinicStaffPeriodKeyYear_(new Date())
                : _clinicStaffPeriodKeyMonth_(new Date());
        }
        if (periodType === 'month' && !/^\d{4}-\d{2}$/.test(periodKey)) {
            return { success: false, message: 'صيغة الشهر يجب أن تكون YYYY-MM' };
        }
        if (periodType === 'year' && !/^\d{4}$/.test(periodKey)) {
            return { success: false, message: 'صيغة السنة يجب أن تكون YYYY' };
        }

        var leaveDays = parseFloat(payload.leaveDaysQuota);
        if (isNaN(leaveDays) || leaveDays < 0) leaveDays = 0;
        var permCount = parseInt(payload.permissionCountQuota, 10);
        if (isNaN(permCount) || permCount < 0) permCount = 0;

        var staffList = readFromSheet('ClinicStaff', getSpreadsheetId()) || [];
        var staff = staffList.find(function(s) { return s && String(s.id) === String(payload.staffId); });
        if (!staff) return { success: false, message: 'المسئول غير موجود' };

        var sheetName = 'ClinicStaffLeaveQuota';
        var allData = readFromSheet(sheetName, getSpreadsheetId()) || [];
        var idx = allData.findIndex(function(q) {
            return q && String(q.staffId) === String(payload.staffId) &&
                String(q.periodType) === periodType &&
                String(q.periodKey) === periodKey;
        });

        var row = {
            staffId: staff.id,
            userId: staff.userId || '',
            userEmail: staff.userEmail || '',
            userName: staff.userName || '',
            periodType: periodType,
            periodKey: periodKey,
            leaveDaysQuota: leaveDays,
            permissionCountQuota: permCount,
            notes: String(payload.notes || '').trim(),
            updatedById: actorUserData && (actorUserData.id || actorUserData.userId) || '',
            updatedByName: actorUserData && actorUserData.name || '',
            updatedAt: new Date()
        };

        if (idx >= 0) {
            row.id = allData[idx].id;
            row.createdAt = allData[idx].createdAt || new Date();
            for (var k in row) {
                if (row.hasOwnProperty(k)) allData[idx][k] = row[k];
            }
            var saveResult = saveToSheet(sheetName, allData, getSpreadsheetId());
            return saveResult && saveResult.success
                ? { success: true, data: allData[idx], message: 'تم تحديث الرصيد بنجاح' }
                : saveResult;
        }

        row.id = generateSequentialId('CLQ', sheetName);
        row.createdAt = new Date();
        var appendResult = appendToSheet(sheetName, row);
        return appendResult && appendResult.success
            ? { success: true, data: row, message: 'تم إضافة الرصيد بنجاح' }
            : appendResult;
    } catch (error) {
        Logger.log('Error in upsertClinicStaffLeaveQuota: ' + error.toString());
        return { success: false, message: 'خطأ في حفظ الرصيد: ' + error.toString() };
    }
}

// ============================================
// نشاط المستخدم داخل النظام (لتبويب الحضور)
// ============================================

function _clinicStaffActivityParseCreator_(row) {
    if (!row) return { userId: '', email: '', name: '' };
    var userId = String(row.createdById || row.userId || row.submittedByEmail || '').trim();
    var email = String(row.userEmail || row.submittedByEmail || '').trim().toLowerCase();
    var name = String(row.userName || row.submittedBy || row.reportedBy || row.observerName || '').trim();
    var raw = row.createdBy;
    if (raw) {
        if (typeof raw === 'object') {
            userId = userId || String(raw.id || raw.userId || '').trim();
            name = name || String(raw.name || raw.displayName || '').trim();
            email = email || String(raw.email || '').trim().toLowerCase();
        } else {
            var s = String(raw).trim();
            if (s.charAt(0) === '{') {
                try {
                    var obj = JSON.parse(s);
                    userId = userId || String(obj.id || obj.userId || '').trim();
                    name = name || String(obj.name || obj.displayName || '').trim();
                    email = email || String(obj.email || '').trim().toLowerCase();
                } catch (_e) {
                    name = name || s;
                }
            } else {
                name = name || s;
            }
        }
    }
    return { userId: userId, email: email, name: name };
}

function _clinicStaffActivityActorProfile_(actorUserData) {
    var keys = _clinicStaffActorKeys_(actorUserData);
    var name = actorUserData && (actorUserData.name || actorUserData.displayName) || '';
    var staff = isActiveClinicStaffUser_(keys.userId) || isActiveClinicStaffUser_(keys.email);
    if (staff && staff.userName) name = staff.userName;
    return {
        userId: keys.userId,
        email: keys.email,
        name: String(name || '').trim(),
        staffId: staff && staff.id || '',
        staff: staff
    };
}

function _clinicStaffActivityMatchesProfile_(creator, profile) {
    if (!creator || !profile) return false;
    if (profile.userId && creator.userId && String(profile.userId) === String(creator.userId)) return true;
    if (profile.email && creator.email && String(profile.email).toLowerCase() === String(creator.email).toLowerCase()) return true;
    if (profile.name && creator.name && String(profile.name).toLowerCase() === String(creator.name).toLowerCase()) return true;
    return false;
}

function _clinicStaffActivityStaffProfile_(staffId) {
    if (!staffId) return null;
    var staff = readFromSheet('ClinicStaff', getSpreadsheetId()) || [];
    for (var i = 0; i < staff.length; i++) {
        if (staff[i] && String(staff[i].id) === String(staffId)) {
            return {
                userId: String(staff[i].userId || '').trim(),
                email: String(staff[i].userEmail || '').trim().toLowerCase(),
                name: String(staff[i].userName || '').trim(),
                staffId: String(staff[i].id || '').trim(),
                staff: staff[i]
            };
        }
    }
    return null;
}

function _clinicStaffActivityPickDate_(row) {
    return row.timestamp || row.createdAt || row.requestedAt || row.visitDate || row.startDate || row.date || row.violationDate || '';
}

function _clinicStaffActivityBuildSummary_(row, cfg) {
    if (!row || !cfg) return '';
    if (cfg.kind === 'timeoff') {
        var typeMap = { leave: 'إجازة', permission: 'إذن', overtime: 'إضافي' };
        var t = typeMap[String(row.requestType || '').trim()] || String(row.requestType || '');
        return t + (row.reason ? ': ' + String(row.reason).slice(0, 80) : '');
    }
    if (cfg.sheet === 'PTW') {
        return String(row.workDescription || row.workType || row.location || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'ClinicVisits') {
        return String(row.employeeName || row.visitType || row.reason || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'ClinicContractorVisits') {
        return String(row.contractorWorkerName || row.externalName || row.contractorName || row.visitType || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'SickLeave') {
        return String(row.employeeName || row.externalName || row.contractorName || row.reason || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'Injuries' || cfg.sheet === 'ClinicContractorInjuries') {
        return String(row.employeeName || row.personName || row.injuryType || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'LegalTrainings') {
        return String(row.title || row.category || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'Incidents') {
        return String(row.title || row.employeeName || row.incidentType || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'NearMiss') {
        return String(row.description || row.type || row.location || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'DailyObservations') {
        return String(row.details || row.observationType || row.locationName || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'Violations') {
        return String(row.employeeName || row.contractorWorker || row.violationType || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'Medications') {
        return String(row.name || row.type || row.id || '').slice(0, 120);
    }
    if (cfg.sheet === 'UserActivityLog') {
        return String(row.details || row.module || row.actionType || row.id || '').slice(0, 120);
    }
    return String(row.id || '').slice(0, 120);
}

function _clinicStaffActivitySources_() {
    return [
        { moduleKey: 'ptw', moduleLabel: 'تصاريح العمل', actionLabel: 'تسجيل تصريح عمل', sheet: 'PTW' },
        // ClinicVisits / ClinicContractorVisits: تُجمَّع من الواجهة بعد تحميل سجل التردد — لا قراءة مكررة من الشيت
        { moduleKey: 'clinic', moduleLabel: 'العيادة', actionLabel: 'تسجيل إجازة مرضية', sheet: 'SickLeave' },
        { moduleKey: 'clinic', moduleLabel: 'العيادة', actionLabel: 'تسجيل إصابة موظف', sheet: 'Injuries' },
        { moduleKey: 'clinic', moduleLabel: 'العيادة', actionLabel: 'تسجيل إصابة مقاول', sheet: 'ClinicContractorInjuries' },
        { moduleKey: 'training', moduleLabel: 'التدريب', actionLabel: 'تسجيل تدريب نظامي', sheet: 'LegalTrainings' },
        { moduleKey: 'incidents', moduleLabel: 'الحوادث', actionLabel: 'تسجيل حادث', sheet: 'Incidents' },
        { moduleKey: 'nearmiss', moduleLabel: 'حادث وشيك', actionLabel: 'تسجيل حادث وشيك', sheet: 'NearMiss' },
        { moduleKey: 'observations', moduleLabel: 'الملاحظات اليومية', actionLabel: 'تسجيل ملاحظة', sheet: 'DailyObservations' },
        { moduleKey: 'violations', moduleLabel: 'المخالفات', actionLabel: 'تسجيل مخالفة', sheet: 'Violations' },
        { moduleKey: 'clinic', moduleLabel: 'العيادة', actionLabel: 'طلب إجازة/إذن/إضافي', sheet: 'ClinicStaffTimeOffRequests', kind: 'timeoff' }
    ];
}

function getClinicStaffSystemActivities(filters, actorUserData) {
    try {
        filters = filters || {};
        var isAdmin = _clinicStaffIsAdminActor_(actorUserData);
        var actorProfile = _clinicStaffActivityActorProfile_(actorUserData);
        var targetProfile = actorProfile;
        if (isAdmin && filters.staffId) {
            var staffProfile = _clinicStaffActivityStaffProfile_(filters.staffId);
            if (staffProfile) targetProfile = staffProfile;
        } else if (!isAdmin) {
            targetProfile = actorProfile;
        }
        var fromKey = filters.dateFrom ? _clinicStaffDayKey_(filters.dateFrom) : null;
        var toKey = filters.dateTo ? _clinicStaffDayKey_(filters.dateTo) : null;
        var moduleFilter = filters.moduleKey ? String(filters.moduleKey) : '';
        var limit = parseInt(filters.limit, 10);
        if (isNaN(limit) || limit <= 0) limit = 200;
        var activities = [];
        var sources = _clinicStaffActivitySources_();
        for (var s = 0; s < sources.length; s++) {
            var cfg = sources[s];
            if (moduleFilter && moduleFilter !== 'all' && cfg.moduleKey !== moduleFilter) continue;
            var rows = readFromSheet(cfg.sheet, getSpreadsheetId()) || [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (!row) continue;
                var creator = _clinicStaffActivityParseCreator_(row);
                if (cfg.kind === 'timeoff') {
                    creator = {
                        userId: String(row.userId || '').trim(),
                        email: String(row.userEmail || '').trim().toLowerCase(),
                        name: String(row.userName || '').trim()
                    };
                }
                if (!isAdmin) {
                    if (!_clinicStaffActivityMatchesProfile_(creator, actorProfile)) continue;
                } else if (filters.staffId) {
                    if (!_clinicStaffActivityMatchesProfile_(creator, targetProfile)) continue;
                }
                var when = _clinicStaffActivityPickDate_(row);
                if (when) {
                    var dayKey = _clinicStaffDayKey_(when);
                    if (fromKey && dayKey < fromKey) continue;
                    if (toKey && dayKey > toKey) continue;
                } else if (fromKey || toKey) {
                    continue;
                }
                activities.push({
                    id: String(row.id || '') + '-' + cfg.sheet,
                    recordId: row.id || '',
                    moduleKey: cfg.moduleKey,
                    moduleLabel: cfg.moduleLabel,
                    actionLabel: cfg.actionLabel,
                    summary: _clinicStaffActivityBuildSummary_(row, cfg),
                    timestamp: when || '',
                    userId: creator.userId || '',
                    userEmail: creator.email || '',
                    userName: creator.name || row.userName || row.submittedBy || row.reportedBy || row.observerName || '',
                    sheet: cfg.sheet
                });
            }
        }
        try {
            var logs = readFromSheet('UserActivityLog', getSpreadsheetId()) || [];
            for (var j = 0; j < logs.length; j++) {
                var log = logs[j];
                if (!log) continue;
                var act = String(log.actionType || log.activity || '').toLowerCase();
                if (act === 'login' || act === 'logout') continue;
                var logCreator = {
                    userId: String(log.userId || '').trim(),
                    email: String(log.userEmail || '').trim().toLowerCase(),
                    name: String(log.username || '').trim()
                };
                if (!isAdmin) {
                    if (!_clinicStaffActivityMatchesProfile_(logCreator, actorProfile)) continue;
                } else if (filters.staffId) {
                    if (!_clinicStaffActivityMatchesProfile_(logCreator, targetProfile)) continue;
                }
                var logWhen = log.timestamp || log.createdAt || '';
                if (logWhen) {
                    var logDay = _clinicStaffDayKey_(logWhen);
                    if (fromKey && logDay < fromKey) continue;
                    if (toKey && logDay > toKey) continue;
                }
                if (moduleFilter && moduleFilter !== 'all' && moduleFilter !== 'system') continue;
                activities.push({
                    id: String(log.id || 'log-' + j),
                    recordId: log.recordId || '',
                    moduleKey: 'system',
                    moduleLabel: 'النظام',
                    actionLabel: String(log.actionType || log.activity || 'نشاط'),
                    summary: String(log.details || log.module || '').slice(0, 120),
                    timestamp: logWhen,
                    userId: logCreator.userId,
                    userEmail: logCreator.email,
                    userName: logCreator.name,
                    sheet: 'UserActivityLog'
                });
            }
        } catch (_logErr) { /* ignore */ }
        activities.sort(function(a, b) {
            return String(b.timestamp || '').localeCompare(String(a.timestamp || ''));
        });
        if (activities.length > limit) activities = activities.slice(0, limit);
        return { success: true, data: activities, count: activities.length };
    } catch (error) {
        Logger.log('Error in getClinicStaffSystemActivities: ' + error.toString());
        return { success: false, message: 'خطأ في جلب نشاط المستخدم: ' + error.toString(), data: [] };
    }
}

/**
 * تسجيل actions الحضور/الأرصدة في ActionHandlers بعد تحميل Clinic.gs
 * (احتياط إذا كان السجل في ActionHandlers.gs قديماً على النشر)
 */
(function registerClinicStaffActionHandlers_() {
    if (typeof ActionHandlers === 'undefined' || !ActionHandlers) return;
    var handlers = {
        'getClinicStaffLeaveBalances': function(payload, postData, action, actorUserData, spreadsheetId) {
            return getClinicStaffLeaveBalances(payload || {}, actorUserData);
        },
        'upsertClinicStaffLeaveQuota': function(payload, postData, action, actorUserData, spreadsheetId) {
            return upsertClinicStaffLeaveQuota(payload || {}, actorUserData);
        },
        'getClinicStaffTimeOffRequests': function(payload, postData, action, actorUserData, spreadsheetId) {
            return getClinicStaffTimeOffRequests(payload && payload.filters ? payload.filters : payload || {}, actorUserData);
        },
        'getClinicStaffAttendance': function(payload, postData, action, actorUserData, spreadsheetId) {
            return getClinicStaffAttendance(payload && payload.filters ? payload.filters : payload || {}, actorUserData);
        },
        'addClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
            return addClinicStaffTimeOffRequest(payload || {}, actorUserData);
        },
        'approveClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
            return approveClinicStaffTimeOffRequest(
                payload.requestId || payload.id,
                actorUserData,
                payload.notes || payload.reviewNotes || ''
            );
        },
        'rejectClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
            return rejectClinicStaffTimeOffRequest(
                payload.requestId || payload.id,
                actorUserData,
                payload.reason || payload.reviewNotes || ''
            );
        },
        'cancelClinicStaffTimeOffRequest': function(payload, postData, action, actorUserData, spreadsheetId) {
            return cancelClinicStaffTimeOffRequest(payload.requestId || payload.id, actorUserData);
        }
    };
    for (var key in handlers) {
        if (handlers.hasOwnProperty(key) && typeof handlers[key] === 'function') {
            ActionHandlers[key] = handlers[key];
        }
    }
})();
