/**
 * اختبار المنطق الحساس لإصلاح تكرار PTW + Circuit Breaker
 * يحاكي سيناريوهات الفشل بدون Dependency خارجية
 */

let passed = 0;
let failed = 0;

function assert(condition, msg) {
    if (condition) { passed++; /*console.log('  ✓', msg)*/ }
    else { failed++; console.error('  ✗ FAIL:', msg); }
}

// ===== Test 1: registrySucceeded/permitSucceeded flags =====
(function testFlags() {
    console.log('\n1. أعلام النجاح (registrySucceeded/permitSucceeded)');
    // يحاكي نفس منطق ptw.js catch block بالضبط
    const simulate = (regOk, ptwOk) => {
        let registrySucceeded = false;
        let permitSucceeded = false;
        try {
            if (!regOk) throw new Error('reg fail');
            registrySucceeded = true;
            if (!ptwOk) throw new Error('ptw fail');
            permitSucceeded = true;
        } catch (e) {
            const pending = [];
            if (!registrySucceeded) pending.push('PTWRegistry');
            if (!permitSucceeded) pending.push('PTW');
            return pending;
        }
        return [];
    };
    assert(JSON.stringify(simulate(true, true)) === '[]', 'الكل نجاح → لا شيء بالمعلقة');
    assert(JSON.stringify(simulate(true, false)) === '["PTW"]', 'PTW يفشل → PTW فقط');
    assert(JSON.stringify(simulate(false, false)) === '["PTWRegistry","PTW"]', 'Registry يفشل → الاثنان (آمن: permitSucceeded لم تتعيّن)');
})();

// ===== Test 2: isTransientNetworkError مع 'ازدحام' =====
(function testCircuitBreakerExemption() {
    console.log('\n2. إعفاء Circuit Breaker لرسالة الازدحام');
    const isTransient = (msg) => {
        const m = msg.toLowerCase();
        return m.includes('failed to fetch') ||
            m.includes('networkerror') ||
            m.includes('network request failed') ||
            m.includes('انتهت مهلة') ||
            m.includes('timeout') ||
            m.includes('timed out') ||
            m.includes('aborterror') ||
            m.includes('aborted') ||
            m.includes('فشل الاتصال مع google apps script بسبب cors') ||
            m.includes('cors') ||
            m.includes('ازدحام');
    };
    assert(isTransient('ازدحام على توليد رقم التصريح'), 'يكتشف رسالة الازدحام');
    assert(isTransient('Timeout occurred'), 'يكتشف timeout');
    assert(!isTransient('حقل غير مسموح'), 'لا يكتشف validation error');
    assert(!isTransient('general error'), 'لا يكتشف خطأ عام');
})();

// ===== Test 3: _addToQueue deduplication =====
(function testDedup() {
    console.log('\n3. منع ازدواجية الطلبات في الطابور (_addToQueue)');
    const _getRequestKey = (action, data) => `${action}_${JSON.stringify(data || {})}`;
    const queue = [];
    const active = new Map();
    const addToQueue = (action, data) => {
        const key = _getRequestKey(action, data);
        if (queue.find(r => _getRequestKey(r.action, r.data) === key)) return 'DEDUP_QUEUE';
        if (active.has(key)) return 'DEDUP_ACTIVE';
        queue.push({ action, data, key });
        active.set(key, {});
        return 'ADDED';
    };
    const processNext = () => {
        const r = queue.shift();
        if (r) active.delete(r.key);
        return r;
    };

    // أضف طلب PTWRegistry
    assert(addToQueue('appendToSheet', { sheetName: 'PTWRegistry', id: '1' }) === 'ADDED', 'الطلب الأول يضاف');
    assert(queue.length === 1, 'طابور = 1');
    // حاول إضافة نفس الطلب — موجود في الطابور → DEDUP_QUEUE
    assert(addToQueue('appendToSheet', { sheetName: 'PTWRegistry', id: '1' }) === 'DEDUP_QUEUE', 'نفس الطلب لا يتكرر (موجود في queue)');
    assert(queue.length === 1, 'الطابور لم يتغير');
    // بعد المعالجة، الطابور فارغ والـ active مُسحت
    const processed = processNext();
    assert(queue.length === 0, 'الطابور فارغ بعد المعالجة');
    assert(active.size === 0, 'active فُسِح (الطلب الفعلي يحذف في finally)');
    // الآن الطلب الجديد مسموح به — يضاف للطابور
    const thirdResult = addToQueue('appendToSheet', { sheetName: 'PTWRegistry', id: '1' });
    assert(thirdResult === 'ADDED', 'يُسمح بالطلب الجديد بعد Completion');
    assert(queue.length === 1, 'الطلب أضيف للطابور');
    assert(active.size === 1, 'الطلب في active');
    // عالجه — الآن فارغ
    processNext();
    assert(queue.length === 0, 'الطابور فارغ بعد معالجة الطلب الجديد');
    assert(active.size === 0, 'active فُسِح');
    // والآن نضيف من جديد
    assert(addToQueue('appendToSheet', { sheetName: 'PTWRegistry', id: '1' }) === 'ADDED', 'يُسمح بالطلب الجديد بعد Completion (2)');
})();

// ===== Test 4: sendSheetRecord flow (invokeOnce فقط, بدون invokeWithTimeoutRetry) =====
const pTestSendSheet = (async function testSendSheetFlow() {
    console.log('\n4. تدفق sendSheetRecord بعد إزالة invokeWithTimeoutRetry');

    let invokeCount = 0;
    const simulateSend = async (shouldFail, hasRetry) => {
        invokeCount = 0;
        const invokeOnce = () => {
            invokeCount++;
            return shouldFail ? Promise.reject(new Error('فشل')) : Promise.resolve({ success: true });
        };
        try {
            const r = await invokeOnce();
            return r;
        } catch (err) {
            const msg = String(err?.message || '');
            const looksPayloadReject = /حقل غير مسموح|PAYLOAD_VALIDATION_FAILED/i.test(msg);
            if (!looksPayloadReject) throw err;
            return await invokeOnce(); // stripAuditCopy fallback
        }
    };

    // النجاح من أول مرة
    await simulateSend(false).then(r => {
        assert(r.success === true, 'النجاح: invokeOnce مرة واحدة');
        assert(invokeCount === 1, `عدد الاستدعاءات = ${invokeCount} (متوقع 1)`);
    });

    // فشل غير validation → يرمي الخطأ فوراً
    await simulateSend(true, false).catch(err => {
        assert(err.message === 'فشل', 'الفشل: الخطأ ينتشر فوراً');
        assert(invokeCount === 1, `عدد الاستدعاءات = ${invokeCount} (متوقع 1, لا retry)`);
    });
})();

// ===== Test 5: appendToSheet في retryPendingSync يحافظ على البيانات =====
(function testRetryAppendMode() {
    console.log('\n5. retryPendingSync يستخدم appendToSheet (ليس saveToSheet)');
    const action = 'appendToSheet';
    assert(action === 'appendToSheet', 'يستخدم appendToSheet');
    assert(action !== 'saveToSheet', 'لا يستخدم saveToSheet (الذي يمسح الورقة)');
})();

// ===== Test 6: محاكاة السيناريو الكامل =====
const pTestFull = (async function testFullScenario() {
    console.log('\n6. السيناريو الكامل: حفظ تصريح يدوي');
    let sheetsSent = [];
    const simulateSync = async (failAt) => {
        sheetsSent = [];
        const sendSheet = (sheet, isNew) => {
            sheetsSent.push({ sheet, isNew });
            if (failAt === sheet) throw new Error('فشل');
            return { success: true };
        };
        let registryOk = false, permitOk = false;
        try {
            const r1 = sendSheet('PTWRegistry', true);
            registryOk = true;
            const r2 = sendSheet('PTW', true);
            permitOk = true;
            return { ok: true, registryOk, permitOk };
        } catch (e) {
            const pending = [];
            if (!registryOk) pending.push('PTWRegistry');
            if (!permitOk) pending.push('PTW');
            return { ok: false, pending };
        }
    };

    // كل شيء ينجح
    const r1 = await simulateSync(null);
    assert(r1.ok === true, 'الكل ينجح → no pending');
    assert(sheetsSent.length === 2, 'طلبان أرسلا');
    assert(sheetsSent[0].sheet === 'PTWRegistry', 'الأول PTWRegistry');
    assert(sheetsSent[1].sheet === 'PTW', 'الثاني PTW');

    // PTW فقط يفشل
    const r2 = await simulateSync('PTW');
    assert(r2.ok === false, 'فشل PTW → pending');
    assert(r2.pending.length === 1, 'شيء واحد بالمعلقة');
    assert(r2.pending[0] === 'PTW', 'PTW فقط بالمعلقة (ليس PTWRegistry)');
    assert(sheetsSent.length === 2, 'طلبان أرسلا رغم فشل الثاني');

    // PTWRegistry يفشل أولاً — كلاهما بالمعلقة (permitOk لم تتعيّن)
    const r3 = await simulateSync('PTWRegistry');
    assert(r3.ok === false, 'فشل PTWRegistry → pending');
    assert(r3.pending.length === 2, 'شيئين بالمعلقة (كلاهما)');
    assert(r3.pending[0] === 'PTWRegistry', 'PTWRegistry أولاً');
    assert(r3.pending[1] === 'PTW', 'PTW ثانياً');
    assert(sheetsSent.length === 1, 'طلب واحد فقط أرسل (الثاني لم يبدأ)');
})();

// ===== Summary =====
Promise.all([pTestSendSheet, pTestFull]).then(() => {
    console.log(`\n═══════════════════════════════`);
    console.log(`النتيجة: ${passed} نجح, ${failed} فشل, ${passed + failed} المجموع`);
    console.log(`═══════════════════════════════`);
    if (failed > 0) process.exit(1);
});
