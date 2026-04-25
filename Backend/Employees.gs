/**
 * Google Apps Script for HSE System - Employees Module
 * 
 * موديول الموظفين - النسخة المحسنة
 */

/**
 * ============================================
 * Employees Cache Helpers (ScriptProperties + CacheService)
 * - هدفها تقليل وقت getAllEmployees/readFromSheet المتكرر
 * - يتم "كسر" الكاش عند أي تعديل (إضافة/تحديث/حذف)
 * ============================================
 */
function _getEmployeesCacheVersion_() {
    try {
        const props = PropertiesService.getScriptProperties();
        const v = props.getProperty('employees_cache_v');
        return v ? String(v) : '1';
    } catch (e) {
        return '1';
    }
}

function _bumpEmployeesCacheVersion_() {
    try {
        const props = PropertiesService.getScriptProperties();
        const current = Number(props.getProperty('employees_cache_v') || '1');
        const next = String((isNaN(current) ? 1 : current) + 1);
        props.setProperty('employees_cache_v', next);
        // لا نعتمد على إزالة جميع المفاتيح (غير متاحة)، النسخة تكسر الكاش تلقائياً
        return next;
    } catch (e) {
        return null;
    }
}

function _stableStringify_(obj) {
    try {
        if (!obj || typeof obj !== 'object') return JSON.stringify(obj || {});
        const keys = Object.keys(obj).sort();
        const normalized = {};
        for (var i = 0; i < keys.length; i++) {
            normalized[keys[i]] = obj[keys[i]];
        }
        return JSON.stringify(normalized);
    } catch (e) {
        return JSON.stringify(obj || {});
    }
}

/**
 * إضافة موظف
 */
function addEmployeeToSheet(employeeData) {
    try {
        if (!employeeData) {
            return { success: false, message: 'بيانات الموظف غير موجودة' };
        }
        
        const sheetName = 'Employees';
        
        // إضافة حقول تلقائية
        if (!employeeData.id) {
            employeeData.id = generateSequentialId('EMP', sheetName);
        }
        if (!employeeData.createdAt) {
            employeeData.createdAt = new Date();
        }
        if (!employeeData.updatedAt) {
            employeeData.updatedAt = new Date();
        }
        
        const result = appendToSheet(sheetName, employeeData);
        // كسر كاش الموظفين بعد الإضافة
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error in addEmployeeToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الموظف: ' + error.toString() };
    }
}

/**
 * تحديث موظف
 */
function updateEmployee(employeeId, updateData) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const employeeIndex = data.findIndex(e => e.id === employeeId);
        
        if (employeeIndex === -1) {
            return { success: false, message: 'الموظف غير موجود' };
        }
        
        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[employeeIndex][key] = updateData[key];
            }
        }
        
        const result = saveToSheet(sheetName, data, spreadsheetId);
        // كسر كاش الموظفين بعد التحديث
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error updating employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث الموظف: ' + error.toString() };
    }
}

/**
 * الحصول على موظف محدد
 */
function getEmployee(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        
        // البحث بالـ ID أو employeeNumber أو sapId
        const employee = data.find(e => 
            e.id === employeeId || 
            e.employeeNumber === employeeId || 
            e.sapId === employeeId
        );
        
        if (!employee) {
            return { success: false, message: 'الموظف غير موجود' };
        }
        
        return { success: true, data: employee };
    } catch (error) {
        Logger.log('Error getting employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الموظف: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الموظفين
 */
function getAllEmployees(filters = {}) {
    try {
        const sheetName = 'Employees';

        // ✅ Cache: تقليل قراءة الشيت المتكررة (خصوصاً عند فتح الموديول/التقارير)
        // - نعتمد على نسخة employees_cache_v لكسر الكاش بعد أي تعديل
        // - TTL قصير لتوازن الأداء مع حداثة البيانات
        var cacheKey = null;
        try {
            const cache = CacheService.getScriptCache();
            const v = _getEmployeesCacheVersion_();
            cacheKey = 'hse_employees_all_v' + v + '_f:' + _stableStringify_(filters || {});
            const cached = cache.get(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed && parsed.success === true && Array.isArray(parsed.data)) {
                    return { success: true, data: parsed.data, count: parsed.data.length, source: 'cache' };
                }
            }
        } catch (eCacheRead) {
            // ignore cache errors - fall back to sheet read
        }

        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // ✅ تصفية الموظفين النشطين فقط (ما لم يُطلب خلاف ذلك)
        if (filters.includeInactive !== true) {
            data = data.filter(e => 
                e.status === undefined || 
                e.status === '' || 
                e.status === 'active'
            );
        }
        
        // تطبيق الفلاتر
        if (filters.department) {
            data = data.filter(e => e.department === filters.department);
        }
        if (filters.branch) {
            data = data.filter(e => e.branch === filters.branch);
        }
        if (filters.location) {
            data = data.filter(e => e.location === filters.location);
        }
        if (filters.position) {
            data = data.filter(e => e.position === filters.position);
        }
        if (filters.job) {
            data = data.filter(e => e.job === filters.job);
        }
        if (filters.gender) {
            data = data.filter(e => e.gender === filters.gender);
        }
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            data = data.filter(e => 
                (e.name && e.name.toLowerCase().includes(searchTerm)) ||
                (e.employeeNumber && e.employeeNumber.toLowerCase().includes(searchTerm)) ||
                (e.email && e.email.toLowerCase().includes(searchTerm))
            );
        }
        
        // ترتيب حسب الاسم
        data.sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });

        const result = { success: true, data: data, count: data.length };

        // حفظ في الكاش
        try {
            if (cacheKey) {
                const cache = CacheService.getScriptCache();
                // 120 ثانية (قصير لتقليل stale data، ويكسر أيضاً عند bumpEmployeesCacheVersion_)
                cache.put(cacheKey, JSON.stringify(result), 120);
            }
        } catch (eCacheWrite) {
            // ignore
        }

        return result;
    } catch (error) {
        Logger.log('Error getting all employees: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الموظفين: ' + error.toString(), data: [] };
    }
}

/**
 * إلغاء تفعيل موظف (Soft Delete) - بدلاً من الحذف الكامل
 * ✅ يتم تعطيل الموظف بدلاً من حذفه من قاعدة البيانات
 */
function deactivateEmployee(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const employeeIndex = data.findIndex(e => e.id === employeeId);
        
        if (employeeIndex === -1) {
            return { success: false, message: 'الموظف غير موجود' };
        }
        
        // ✅ تحديث حالة الموظف بدلاً من الحذف
        data[employeeIndex].status = 'inactive';
        data[employeeIndex].resignationDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
        data[employeeIndex].updatedAt = new Date().toISOString();
        
        const result = saveToSheet(sheetName, data, spreadsheetId);
        // كسر كاش الموظفين بعد التحديث
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error deactivating employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إلغاء تفعيل الموظف: ' + error.toString() };
    }
}

/**
 * حذف موظف (Hard Delete) - محفوظ للتوافق مع الكود القديم
 * ⚠️ يُنصح باستخدام deactivateEmployee بدلاً من هذه الدالة
 * @deprecated استخدم deactivateEmployee بدلاً من هذه الدالة
 */
function deleteEmployee(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود spreadsheetId
        if (!spreadsheetId || spreadsheetId.trim() === '') {
            return { 
                success: false, 
                message: 'معرف Google Sheets غير محدد. يرجى إدخال معرف الجدول في الإعدادات أو في Config.gs.' 
            };
        }
        
        const data = readFromSheet(sheetName, spreadsheetId);
        const filteredData = data.filter(e => e.id !== employeeId);
        
        if (filteredData.length === data.length) {
            return { success: false, message: 'الموظف غير موجود' };
        }
        
        const result = saveToSheet(sheetName, filteredData, spreadsheetId);
        // كسر كاش الموظفين بعد الحذف
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
        }
        return result;
    } catch (error) {
        Logger.log('Error deleting employee: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الموظف: ' + error.toString() };
    }
}

/**
 * حذف جميع الموظفين (محمي برقم سري) - عملية خطيرة
 * @param {object} payload - { pin: string }
 */
function deleteAllEmployees(payload) {
    try {
        const pin = payload && (payload.pin || payload.password || payload.secret);
        const verify = verifyEmployeesDeletePin(pin);
        if (!verify.ok) {
            return { success: false, message: verify.message };
        }

        const sheetName = 'Employees';
        const spreadsheetId = getSpreadsheetId();

        // حفظ قائمة فارغة => حذف كل الصفوف (مع إبقاء الهيدر)
        const result = saveToSheet(sheetName, [], spreadsheetId);
        if (result && result.success) {
            _bumpEmployeesCacheVersion_();
            return { success: true, message: 'تم حذف جميع بيانات الموظفين بنجاح' };
        }
        return result || { success: false, message: 'فشل حذف بيانات الموظفين' };
    } catch (error) {
        Logger.log('Error in deleteAllEmployees: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف جميع الموظفين: ' + error.toString() };
    }
}

/**
 * الحصول على إحصائيات الموظفين
 */
function getEmployeeStatistics(filters = {}) {
    try {
        const allEmployees = getAllEmployees(filters);
        if (!allEmployees.success) {
            return { success: false, message: 'فشل في قراءة الموظفين' };
        }
        
        const employees = allEmployees.data;
        const stats = {
            total: employees.length,
            byDepartment: {},
            byBranch: {},
            byLocation: {},
            byPosition: {},
            byGender: {},
            byJob: {}
        };
        
        employees.forEach(emp => {
            // حسب الإدارة
            if (emp.department) {
                stats.byDepartment[emp.department] = (stats.byDepartment[emp.department] || 0) + 1;
            }
            
            // حسب الفرع
            if (emp.branch) {
                stats.byBranch[emp.branch] = (stats.byBranch[emp.branch] || 0) + 1;
            }
            
            // حسب الموقع
            if (emp.location) {
                stats.byLocation[emp.location] = (stats.byLocation[emp.location] || 0) + 1;
            }
            
            // حسب المنصب
            if (emp.position) {
                stats.byPosition[emp.position] = (stats.byPosition[emp.position] || 0) + 1;
            }
            
            // حسب الجنس
            if (emp.gender) {
                stats.byGender[emp.gender] = (stats.byGender[emp.gender] || 0) + 1;
            }
            
            // حسب الوظيفة
            if (emp.job) {
                stats.byJob[emp.job] = (stats.byJob[emp.job] || 0) + 1;
            }
        });
        
        return { success: true, data: stats };
    } catch (error) {
        Logger.log('Error getting employee statistics: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حساب الإحصائيات: ' + error.toString() };
    }
}

/**
 * إنشاء/جلب token عام لبطاقة الملف الشخصي للمستخدم الحالي
 * payload: { userId, email, forceRotate }
 */
function getOrCreatePublicProfileToken(payload) {
    try {
        const data = payload || {};
        const userId = String(data.userId || '').trim();
        const email = String(data.email || '').trim().toLowerCase();
        const forceRotate = data.forceRotate === true;

        if (!userId && !email) {
            return { success: false, message: 'userId أو email مطلوبان' };
        }

        const sheetName = 'Users';
        const spreadsheetId = getSpreadsheetId();
        const users = readFromSheet(sheetName, spreadsheetId);
        const user = (users || []).find(function(u) {
            if (!u) return false;
            const byId = userId && String(u.id || '').trim() === userId;
            const byEmail = email && String(u.email || '').trim().toLowerCase() === email;
            return byId || byEmail;
        });

        if (!user || !user.id) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        const now = new Date();
        const existingToken = String(user.profilePublicToken || '').trim();
        const expiryStr = String(user.profilePublicTokenExpiry || '').trim();
        const expiryDate = expiryStr ? new Date(expiryStr) : null;
        const isTokenValid = existingToken && expiryDate && !isNaN(expiryDate.getTime()) && expiryDate.getTime() > now.getTime();

        var token = existingToken;
        var expiresAt = expiryStr;
        if (!isTokenValid || forceRotate) {
            token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
            expiresAt = new Date(now.getTime() + (180 * 24 * 60 * 60 * 1000)).toISOString();
            const updateResult = updateSingleRowInSheet(sheetName, user.id, {
                profilePublicToken: token,
                profilePublicTokenExpiry: expiresAt,
                updatedAt: new Date()
            }, spreadsheetId);
            if (!updateResult || updateResult.success === false) {
                return { success: false, message: 'فشل حفظ token العام للمستخدم' };
            }
        }

        return {
            success: true,
            data: {
                token: token,
                expiresAt: expiresAt
            }
        };
    } catch (error) {
        Logger.log('Error in getOrCreatePublicProfileToken: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إنشاء token الملف العام: ' + error.toString() };
    }
}

/**
 * جلب بيانات الملف العام بالاعتماد على token (بيانات محدودة وآمنة)
 */
function getPublicProfileByToken(token) {
    try {
        const tokenValue = String(token || '').trim();
        if (!tokenValue) {
            return { success: false, message: 'token مطلوب' };
        }

        const spreadsheetId = getSpreadsheetId();
        const users = readFromSheet('Users', spreadsheetId);
        const now = new Date();
        const user = (users || []).find(function(u) {
            if (!u) return false;
            const t = String(u.profilePublicToken || '').trim();
            if (!t || t !== tokenValue) return false;
            const expiry = new Date(String(u.profilePublicTokenExpiry || ''));
            return !!expiry && !isNaN(expiry.getTime()) && expiry.getTime() > now.getTime();
        });

        if (!user) {
            return { success: false, message: 'token غير صالح أو منتهي الصلاحية' };
        }

        const employees = readFromSheet('Employees', spreadsheetId) || [];
        const userEmail = String(user.email || '').trim().toLowerCase();
        const userName = String(user.name || '').trim().toLowerCase();
        const userId = String(user.id || '').trim().toLowerCase();
        const employee = employees.find(function(emp) {
            if (!emp) return false;
            const empEmail = String(emp.email || '').trim().toLowerCase();
            const empName = String(emp.name || '').trim().toLowerCase();
            const empId = String(emp.id || emp.employeeNumber || '').trim().toLowerCase();
            return (userEmail && empEmail && userEmail === empEmail)
                || (userId && empId && userId === empId)
                || (userName && empName && userName === empName);
        }) || {};

        const fullName = String(employee.name || user.name || '').trim();
        const employeeNumber = String(employee.employeeNumber || employee.id || '').trim();
        const department = String(employee.department || user.department || '').trim();
        const position = String(employee.position || employee.job || '').trim();
        const phone = String(employee.phone || '').trim();
        const email = String(employee.email || user.email || '').trim();
        const photo = String(employee.photo || user.photo || '').trim();

        const norm = function(v) { return String(v || '').trim().toLowerCase(); };
        const matchesProfile = function(record) {
            if (!record) return false;
            const rId = norm(record.employeeId || record.employeeNumber || record.employeeCode || record.id);
            const rName = norm(record.employeeName || record.name || record.personName);
            const rEmail = norm(record.email);
            return (employeeNumber && rId && norm(employeeNumber) === rId)
                || (fullName && rName && norm(fullName) === rName)
                || (email && rEmail && norm(email) === rEmail);
        };

        const training = readFromSheet('Training', spreadsheetId) || [];
        const violations = readFromSheet('Violations', spreadsheetId) || [];
        const ppe = readFromSheet('PPE', spreadsheetId) || [];

        var trainingSessions = 0;
        training.forEach(function(item) {
            const participants = String(item && item.participants || '').toLowerCase();
            if (matchesProfile(item) || (fullName && participants.indexOf(norm(fullName)) !== -1)) {
                trainingSessions += 1;
            }
        });

        var violationsCount = 0;
        violations.forEach(function(item) {
            if (matchesProfile(item)) violationsCount += 1;
        });

        var ppeCount = 0;
        ppe.forEach(function(item) {
            if (matchesProfile(item)) {
                const qty = Number(item.quantity || 0);
                ppeCount += (isNaN(qty) ? 0 : qty);
            }
        });

        return {
            success: true,
            data: {
                fullName: fullName,
                employeeNumber: employeeNumber,
                department: department,
                position: position,
                phone: phone,
                email: email,
                photo: photo,
                companyName: 'Americana HSE',
                trainingSessions: trainingSessions,
                violationsCount: violationsCount,
                ppeCount: ppeCount
            }
        };
    } catch (error) {
        Logger.log('Error in getPublicProfileByToken: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء جلب بيانات الملف العام: ' + error.toString() };
    }
}

