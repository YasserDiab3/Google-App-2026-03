/**
 * Field Portal Authentication Handlers
 * Quick Employee Code + 4-digit PIN for Industrial Field Forms
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../db/database');

const ADMIN_ROLES = new Set([
    'admin', 'administrator', 'system_admin', 'system-manager', 'مدير', 'مدير النظام'
]);

function isAdminUser(user) {
    if (!user) return false;
    const role = String(user.role || '').toLowerCase().trim();
    return ADMIN_ROLES.has(role);
}

function normalizeCode(raw) {
    return String(raw || '').replace(/[^0-9]/g, '').trim();
}

const BLOCKED_PORTAL_EMPLOYEES = new Set([
    'اسلام السيد علي الزغبي',
    'حسانين حسن محمد حسانين على',
    'طارق مصطفى السيد مدين الجوهرى',
    '112425',
    '112411',
    '100780'
]);

function isEmployeeResigned(e) {
    if (!e || typeof e !== 'object') return true;
    const code = normalizeCode(e.employeeNumber || e.id || e.sapId || '');
    if (code && BLOCKED_PORTAL_EMPLOYEES.has(code)) return true;
    const name = String(e.name || e.fullName || '').trim();
    for (const b of BLOCKED_PORTAL_EMPLOYEES) {
        if (b.length > 3 && name.includes(b)) return true;
    }
    if (e.active === false || e.active === 'false' || e.isActive === false || e.isActive === 'false') return true;
    if (e.resignationDate && String(e.resignationDate).trim()) return true;
    if (e.terminationDate && String(e.terminationDate).trim()) return true;
    if (e.endDate && String(e.endDate).trim()) return true;

    const s = [
        e.status, e.employeeStatus, e.workStatus, e.employmentStatus, e.state, e.activeStatus, e.jobStatus
    ].map(v => String(v || '').toLowerCase().trim()).filter(Boolean).join(' | ');

    if (!s) return false;
    return s.includes('مستقيل') || s.includes('استقال') || s.includes('إنهاء') || s.includes('انهاء') ||
           s.includes('مفصول') || s.includes('ترك') || s.includes('غير نشط') || s.includes('معاش') ||
           s.includes('وفاة') || s.includes('resign') || s.includes('terminated') || s.includes('inactive') ||
           s.includes('left');
}

function findActiveEmployee(db, code) {
    if (!code) return null;
    const emps = db.readSheet('Employees') || [];
    return emps.find(e => {
        if (!e) return false;
        const eNum = normalizeCode(e.employeeNumber || e.id || e.sapId || '');
        if (eNum !== code) return false;
        return !isEmployeeResigned(e);
    });
}

function getAuthRecord(db, code) {
    const list = db.readSheet('FieldPortalAuth') || [];
    return list.find(r => normalizeCode(r.employeeCode) === code);
}

function extractData(payload, postData) {
    const post = (postData && typeof postData === 'object') ? postData : {};
    const pl = (payload && typeof payload === 'object') ? payload : {};
    const postDataInner = (post.data && typeof post.data === 'object') ? post.data : {};
    const plDataInner = (pl.data && typeof pl.data === 'object') ? pl.data : {};
    return Object.assign({}, post, postDataInner, pl, plDataInner);
}

const portalAuthHandlers = {
    'fieldPortalCheckEmployee': function(payload, postData) {
        const data = extractData(payload, postData);
        const code = normalizeCode(data.employeeCode);
        if (!code) {
            return { success: false, message: 'يرجى إدخال الكود الوظيفي' };
        }

        const db = getDatabase();
        const emp = findActiveEmployee(db, code);
        if (!emp) {
            return {
                success: false,
                message: 'الكود الوظيفي غير مسجل بقاعدة بيانات العاملين النشطين بالشركة أو الموظف مستقيل'
            };
        }

        const auth = getAuthRecord(db, code);
        const now = Date.now();
        const lockedUntilTime = auth?.lockedUntil ? new Date(auth.lockedUntil).getTime() : 0;
        const isLocked = lockedUntilTime > now;

        const dept = String(emp.department || '');
        const job = String(emp.job || emp.position || '');
        const isSafety = dept.includes('سلامة') || job.includes('سلامة');

        return {
            success: true,
            employee: {
                code: code,
                name: emp.name || emp.fullName || '',
                department: dept || 'الإنتاج',
                job: job || 'موظف',
                isSafety: isSafety
            },
            hasPin: !!(auth && auth.pinHash),
            isLocked: isLocked,
            lockRemainingMinutes: isLocked ? Math.ceil((lockedUntilTime - now) / 60000) : 0
        };
    },

    'fieldPortalVerifyPin': function(payload, postData) {
        const data = extractData(payload, postData);
        const code = normalizeCode(data.employeeCode);
        const pin = String(data.pin || '').trim();

        if (!code) return { success: false, message: 'الكود الوظيفي مطلوب' };
        if (!/^\d{4}$/.test(pin)) return { success: false, message: 'رمز PIN يجب أن يتكون من 4 أرقام فقط' };

        const db = getDatabase();
        const emp = findActiveEmployee(db, code);
        if (!emp) return { success: false, message: 'الموظف غير نشط أو غير موجود بالنظام' };

        const auth = getAuthRecord(db, code);
        if (!auth || !auth.pinHash || !auth.salt) {
            return {
                success: false,
                requiresSetup: true,
                message: 'لم يتم تعيين رمز PIN لهذا الكود بعد، يرجى التعيين أولاً'
            };
        }

        const now = Date.now();
        const lockedUntilTime = auth.lockedUntil ? new Date(auth.lockedUntil).getTime() : 0;
        if (lockedUntilTime > now) {
            const mins = Math.ceil((lockedUntilTime - now) / 60000);
            return {
                success: false,
                isLocked: true,
                message: `تم قفل الحساب مؤقتاً لكثرة المحاولات الخاطئة. يرجى المحاولة بعد ${mins} دقيقة أو مراجعة مسؤول النظام.`
            };
        }

        const calculatedHash = crypto.createHmac('sha256', auth.salt).update(pin).digest('hex');
        if (calculatedHash !== auth.pinHash) {
            const attempts = (parseInt(auth.failedAttempts, 10) || 0) + 1;
            let lockedUntil = '';
            let msg = `رمز PIN غير صحيح. المحاولات المتبقية: ${Math.max(0, 5 - attempts)}`;

            if (attempts >= 5) {
                lockedUntil = new Date(now + 15 * 60 * 1000).toISOString();
                msg = 'تم قفل الحساب مؤقتاً لمدة 15 دقيقة لتكرار إدخال رمز خاطئ 5 مرات.';
            }

            db.updateRow('FieldPortalAuth', 'employeeCode', code, {
                failedAttempts: String(attempts),
                lockedUntil: lockedUntil,
                updatedAt: new Date().toISOString()
            });

            return { success: false, message: msg, isLocked: attempts >= 5 };
        }

        // Login Successful: Reset attempts and generate 12-hour session
        const sessionToken = crypto.randomBytes(24).toString('hex');
        const expiresAt = new Date(now + 12 * 3600 * 1000).toISOString();

        db.updateRow('FieldPortalAuth', 'employeeCode', code, {
            failedAttempts: '0',
            lockedUntil: '',
            lastLoginAt: new Date().toISOString(),
            status: 'active',
            updatedAt: new Date().toISOString()
        });

        const dept = String(emp.department || '');
        const job = String(emp.job || emp.position || '');

        return {
            success: true,
            message: 'تم التحقق وتسجيل الدخول الميداني بنجاح',
            token: sessionToken,
            shiftExpiresAt: expiresAt,
            employee: {
                code: code,
                name: emp.name || emp.fullName || '',
                department: dept,
                job: job,
                isSafety: dept.includes('سلامة') || job.includes('سلامة')
            }
        };
    },

    'fieldPortalSetPin': function(payload, postData) {
        const data = extractData(payload, postData);
        const code = normalizeCode(data.employeeCode);
        const newPin = String(data.newPin || '').trim();
        const confirmPin = String(data.confirmPin || '').trim();
        const currentPin = String(data.currentPin || '').trim();

        if (!code) return { success: false, message: 'الكود الوظيفي مطلوب' };
        if (!/^\d{4}$/.test(newPin)) return { success: false, message: 'رمز PIN الجديد يجب أن يتكون من 4 أرقام فقط' };
        if (newPin !== confirmPin) return { success: false, message: 'رمز PIN وتأكيده غير متطابقين' };

        const db = getDatabase();
        const emp = findActiveEmployee(db, code);
        if (!emp) return { success: false, message: 'الموظف غير نشط أو غير موجود بالنظام' };

        const auth = getAuthRecord(db, code);
        if (auth && auth.pinHash && auth.salt) {
            // Already has PIN, require current PIN
            if (!currentPin) {
                return { success: false, message: 'يوجد رمز PIN مسجل مسبقاً، يرجى إدخال الرمز الحالي لتغييره' };
            }
            const currHash = crypto.createHmac('sha256', auth.salt).update(currentPin).digest('hex');
            if (currHash !== auth.pinHash) {
                return { success: false, message: 'رمز PIN الحالي غير صحيح' };
            }
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const pinHash = crypto.createHmac('sha256', salt).update(newPin).digest('hex');
        const now = new Date().toISOString();
        const sessionToken = crypto.randomBytes(24).toString('hex');
        const expiresAt = new Date(Date.now() + 12 * 3600 * 1000).toISOString();

        if (auth) {
            db.updateRow('FieldPortalAuth', 'employeeCode', code, {
                pinHash: pinHash,
                salt: salt,
                failedAttempts: '0',
                lockedUntil: '',
                lastLoginAt: now,
                updatedAt: now,
                status: 'active'
            });
        } else {
            db.insertRow('FieldPortalAuth', {
                id: `FPA_${code}_${Date.now()}`,
                employeeCode: code,
                pinHash: pinHash,
                salt: salt,
                failedAttempts: '0',
                lockedUntil: '',
                lastLoginAt: now,
                createdAt: now,
                updatedAt: now,
                status: 'active'
            });
        }

        const dept = String(emp.department || '');
        const job = String(emp.job || emp.position || '');

        return {
            success: true,
            message: 'تم تعيين رمز PIN بنجاح وتفعيل جلسة العمل',
            token: sessionToken,
            shiftExpiresAt: expiresAt,
            employee: {
                code: code,
                name: emp.name || emp.fullName || '',
                department: dept,
                job: job,
                isSafety: dept.includes('سلامة') || job.includes('سلامة')
            }
        };
    },

    'fieldPortalResetPin': function(payload, postData, action, actorUserData) {
        const data = extractData(payload, postData);
        const code = normalizeCode(data.employeeCode);
        if (!code) return { success: false, message: 'الكود الوظيفي مطلوب' };

        const db = getDatabase();
        let isAuthorized = isAdminUser(actorUserData);

        if (!isAuthorized) {
            const adminEmail = String(data.adminEmail || '').trim().toLowerCase();
            const adminPassword = String(data.adminPassword || '').trim();
            if (adminEmail && adminPassword) {
                const users = db.readSheet('Users') || [];
                const user = users.find(u => String(u.email || '').trim().toLowerCase() === adminEmail);
                if (user && isAdminUser(user)) {
                    const inputHash = crypto.createHash('sha256').update(adminPassword).digest('hex');
                    const storedHash = String(user.passwordHash || '').trim().toLowerCase();
                    const storedPlain = String(user.password || '').trim();
                    if ((storedHash && storedHash === inputHash) || (storedPlain && (storedPlain === inputHash || storedPlain === adminPassword))) {
                        isAuthorized = true;
                    }
                }
            }
        }

        if (!isAuthorized) {
            return { success: false, message: 'هذه العملية تتطلب صلاحيات مدير النظام (Admin)' };
        }

        const auth = getAuthRecord(db, code);
        if (!auth) {
            return { success: false, message: 'لا يوجد سجل دخول مسجل لهذا الموظف' };
        }

        db.updateRow('FieldPortalAuth', 'employeeCode', code, {
            pinHash: '',
            salt: '',
            failedAttempts: '0',
            lockedUntil: '',
            status: 'reset_pending',
            updatedAt: new Date().toISOString()
        });

        return {
            success: true,
            message: `تمت إعادة تعيين رمز PIN للموظف كود [${code}] بنجاح، ويمكنه تعيين رمز جديد في دخوله القادم.`
        };
    },

    'fieldPortalListAuthUsers': function(payload, postData, action, actorUserData) {
        if (!isAdminUser(actorUserData)) {
            return { success: false, message: 'هذه العملية تتطلب صلاحيات مدير النظام (Admin)' };
        }

        const db = getDatabase();
        const authList = db.readSheet('FieldPortalAuth') || [];
        const emps = db.readSheet('Employees') || [];
        const empMap = new Map(emps.map(e => [normalizeCode(e.employeeNumber || e.id || e.sapId), e]));

        const result = authList.map(a => {
            const emp = empMap.get(normalizeCode(a.employeeCode));
            return {
                employeeCode: a.employeeCode,
                name: emp ? (emp.name || emp.fullName) : 'غير معروف',
                department: emp ? emp.department : '',
                job: emp ? (emp.job || emp.position) : '',
                hasPin: !!a.pinHash,
                failedAttempts: parseInt(a.failedAttempts, 10) || 0,
                isLocked: a.lockedUntil && new Date(a.lockedUntil) > new Date(),
                lastLoginAt: a.lastLoginAt || '',
                status: a.status || 'active'
            };
        });

        return {
            success: true,
            count: result.length,
            users: result
        };
    }
};

module.exports = portalAuthHandlers;
