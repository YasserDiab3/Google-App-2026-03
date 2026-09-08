/**
 * تحقق سلوكي من عزل نبضة الحضور عن مسار المصادقة.
 * يحمّل Frontend/js/modules/auth.js في بيئة مُحاكاة ويؤكد:
 *  1. ثوابت النبضة/المهلة الجديدة.
 *  2. touchPresence لا يرسل شيئاً أثناء _authInFlight.
 *  3. login يرفع القفل ثم يحرّره، ويُبقيه عند mfaRequired.
 *  4. clearMfaChallengePending يحرّر القفل.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'Frontend/js/modules/auth.js'), 'utf8');

const sent = [];
let loginResponse = { success: false, message: 'بيانات الاعتماد غير صحيحة' };

const noop = () => {};
const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    setInterval: () => 0,
    clearInterval: noop,
    Date,
    Math,
    JSON,
    Promise,
    Number,
    String,
    Array,
    Object,
    RegExp,
    isNaN
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.document = { addEventListener: noop, getElementById: () => null, visibilityState: 'visible' };
sandbox.navigator = { onLine: true, userAgent: 'node' };
sandbox.location = { hostname: 'localhost', href: 'http://localhost/' };

const store = new Map();
const storage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear()
};
sandbox.localStorage = storage;
sandbox.sessionStorage = storage;

sandbox.Utils = {
    safeLog: noop,
    safeWarn: noop,
    safeError: noop,
    isValidEmail: (e) => /@/.test(String(e || '')),
    hasCloudBackendSync: () => true,
    isSha256Hex: (v) => /^[a-f0-9]{64}$/i.test(String(v || '')),
    normalizePasswordForComparison: async (input) => String(input || ''),
    hashPassword: async (p) => String(p || ''),
    RateLimiter: {
        checkLockout: async () => true,
        clearAttempts: async () => true,
        recordFailedAttempt: async () => true
    }
};
sandbox.Notification = { error: noop, warning: noop, success: noop, info: noop };
sandbox.AppState = {
    currentUser: { id: 'u1', email: 'a@b.com' },
    appData: { users: [{ id: 'u1', email: 'a@b.com' }] },
    debugMode: false
};
sandbox.DataManager = {
    purgeIfUserChanged: noop,
    awaitLastPurge: async () => true,
    ensurePurgeSettledBeforeLoad: async () => true
};
sandbox.GoogleIntegration = {
    sanitizeGasErrorText: (t) => t,
    resetCircuitBreaker: noop,
    syncUsers: async () => true,
    async sendRequest({ action }) {
        sent.push(action);
        if (action === 'login') return loginResponse;
        return { success: true };
    }
};

vm.createContext(sandbox);
new vm.Script(src, { filename: 'auth.js' }).runInContext(sandbox);

const Auth = sandbox.Auth;
const results = [];
const check = (name, pass, detail) => {
    results.push({ name, pass, detail });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
};

check('نبضة الحضور 90 ثانية', Auth.PRESENCE_HEARTBEAT_MS === 90000, `${Auth.PRESENCE_HEARTBEAT_MS}ms`);
check('مهلة متصل 3 دقائق', Auth.PRESENCE_TTL_MS === 180000, `${Auth.PRESENCE_TTL_MS}ms`);
check('TTL أكبر من النبضة بهامش', Auth.PRESENCE_TTL_MS >= Auth.PRESENCE_HEARTBEAT_MS * 1.5,
    `${Auth.PRESENCE_TTL_MS} / ${Auth.PRESENCE_HEARTBEAT_MS}`);

// نبضة عادية تُرسل
sent.length = 0;
Auth._authInFlight = false;
await Auth.touchPresence();
check('الحضور يُرسل خارج المصادقة', sent.includes('touchUserPresence'), `sent=[${sent}]`);

// نبضة أثناء المصادقة لا تُرسل
sent.length = 0;
Auth._authInFlight = true;
await Auth.touchPresence();
check('الحضور محجوب أثناء المصادقة', !sent.includes('touchUserPresence'), `sent=[${sent}]`);
Auth._authInFlight = false;

// login فاشل يحرّر القفل
sent.length = 0;
loginResponse = { success: false, message: 'بيانات الاعتماد غير صحيحة' };
const r1 = await Auth.login('a@b.com', 'wrong', false);
check('رفض الخادم يُعاد مُهيكلاً', r1 && r1.success === false && /الاعتماد/.test(r1.message || ''), r1 && r1.message);
check('القفل مُحرَّر بعد فشل الدخول', Auth._authInFlight === false, `_authInFlight=${Auth._authInFlight}`);

// login بـ MFA يُبقي القفل
loginResponse = { success: true, mfaRequired: true, challengeToken: 'tok' };
const r2 = await Auth.login('a@b.com', 'right', false);
check('mfaRequired يُعاد للواجهة', !!(r2 && r2.mfaRequired), JSON.stringify(r2 && r2.mfaRequired));
check('القفل باقٍ أثناء انتظار رمز MFA', Auth._authInFlight === true, `_authInFlight=${Auth._authInFlight}`);

// أثناء انتظار MFA لا حضور
sent.length = 0;
await Auth.touchPresence();
check('لا حضور أثناء انتظار رمز MFA', !sent.includes('touchUserPresence'), `sent=[${sent}]`);

// الرجوع يحرّر القفل
Auth.clearMfaChallengePending();
check('زر الرجوع يحرّر القفل', Auth._authInFlight === false && Auth._mfaChallengePending === false,
    `inFlight=${Auth._authInFlight} pending=${Auth._mfaChallengePending}`);

sent.length = 0;
await Auth.touchPresence();
check('الحضور يعود بعد التحرير', sent.includes('touchUserPresence'), `sent=[${sent}]`);

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} نجحت`);
process.exit(failed.length === 0 ? 0 : 1);
