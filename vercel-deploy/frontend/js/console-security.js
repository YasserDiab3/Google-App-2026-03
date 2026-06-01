/**
 * console-security.js — درع الكونسول (يجب أن يُحمَّل أول شيء)
 *
 * يفعل التالي:
 *   1) يكتم ضوضاء إضافات المتصفح (Chrome extensions) — أخطاء/رسائل من
 *      content scripts و runtime.lastError و message port closed إلخ.
 *      هذه ليست من تطبيقنا — لكنها تُلوّث الكونسول وتُربك المستخدم.
 *   2) في الإنتاج (debugMode = false): يكتم جميع console.log/info/debug
 *      الصادرة من أي مكان (سواء كودنا أو إضافة) لمنع تسرّب أي بيانات.
 *   3) يُمرّر console.error/warn الحقيقية للأخطاء البرمجية الفعلية
 *      (مع فلترة ضوضاء الإضافات) — هذا مهم لرؤية مشاكل النظام الحقيقية
 *      في حال تشغيل المطوّر للكونسول للفحص.
 *   4) يلتقط window.onerror و unhandledrejection ويُسقط الأخطاء التي
 *      تطابق أنماط ضوضاء الإضافات قبل أن تظهر في الكونسول.
 *   5) يُجمّد console المُحدَّث (Object.freeze + Object.defineProperty
 *      مع writable:false) لمنع الإضافات من إعادة الكتابة فوقه.
 *
 * يعمل قبل أي سكربت آخر؛ كل console.* الذي يأتي بعد ذلك يمر عبر الفلتر.
 */
(function consoleSecurity() {
    'use strict';

    // ════════════════════════════════════════════════════════════════
    // 1) أنماط الضوضاء المعروفة — كلها إضافات أو ضوضاء خارجية
    // ════════════════════════════════════════════════════════════════
    var NOISE_PATTERNS = [
        // Chrome extension errors
        /Unchecked runtime\.lastError/i,
        /message port closed/i,
        /Could not establish connection/i,
        /Receiving end does not exist/i,
        /Extension context invalidated/i,
        /chrome-extension:\/\//i,
        /moz-extension:\/\//i,
        /safari-extension:\/\//i,

        // Data extractors / accessibility extensions
        /data-extractor/i,
        /content[-_ ]?script/i,
        /content_script/i,
        /skip\s*to\s*main\s*content/i,
        /تخطي\s*إلى\s*المحتوى/i,

        // Generic extension messaging
        /sendResponse/i,
        /chrome\.runtime/i,

        // Some browsers' "DevTools" noise
        /\[DOM\]\s*Found\s+\d+\s+elements with/i, // duplicate id warnings from extensions
        /A cookie associated with a/i,             // cookie warnings
        /This page is in Quirks/i,
    ];

    function looksLikeNoise(args) {
        if (!args || args.length === 0) return false;
        var text = '';
        try {
            for (var i = 0; i < args.length; i++) {
                var a = args[i];
                if (a == null) continue;
                if (typeof a === 'string') text += ' ' + a;
                else if (a.message) text += ' ' + a.message;
                else if (a.stack) text += ' ' + a.stack;
                else {
                    try { text += ' ' + String(a); } catch (e) { /* ignore */ }
                }
            }
        } catch (e) { return false; }
        for (var j = 0; j < NOISE_PATTERNS.length; j++) {
            if (NOISE_PATTERNS[j].test(text)) return true;
        }
        return false;
    }

    // ════════════════════════════════════════════════════════════════
    // 2) هل نحن في وضع debug؟
    //    AppState.debugMode قد لا يكون مُعرَّفاً بعد عند تشغيل هذا
    //    السكربت (نُحمَّل أولاً)؛ لذا نقرأ من localStorage أيضاً.
    //    العميل يضع 'hse_debug_console' = '1' في localStorage لتفعيل debug.
    // ════════════════════════════════════════════════════════════════
    function isDebugMode() {
        try {
            // ?debug=1 في الـ URL
            if (location && location.search && location.search.indexOf('debug=1') > -1) return true;
            // localStorage flag
            if (typeof localStorage !== 'undefined' && localStorage.getItem('hse_debug_console') === '1') return true;
            // AppState.debugMode (لو حُمِّل بعد ذلك)
            if (typeof window !== 'undefined' && window.AppState && window.AppState.debugMode === true) return true;
        } catch (e) { /* ignore */ }
        return false;
    }

    // ════════════════════════════════════════════════════════════════
    // 3) Override console methods
    // ════════════════════════════════════════════════════════════════
    if (typeof console === 'undefined') return; // safety

    // نحفظ الأصلية في مكان آمن (لـ debug mode)
    var original = {
        log: console.log,
        info: console.info,
        debug: console.debug,
        warn: console.warn,
        error: console.error,
        table: console.table,
        dir: console.dir,
        group: console.group,
        groupEnd: console.groupEnd,
        trace: console.trace
    };

    // دالة تصرف عامة:
    //   - في debug mode: تمرّر كل شيء (مع فلترة ضوضاء فقط)
    //   - في إنتاج: لا تطبع log/info/debug إطلاقاً
    //               وتطبع warn/error فقط لو ليست ضوضاء
    function wrap(level, originalFn) {
        return function () {
            var args = arguments;
            try {
                // فلترة الضوضاء دائماً — في كل الأوضاع
                if (looksLikeNoise(args)) return;

                // في الإنتاج: log/info/debug/table/dir صامتة كلياً
                if (!isDebugMode()) {
                    if (level === 'log' || level === 'info' || level === 'debug' ||
                        level === 'table' || level === 'dir' || level === 'trace' ||
                        level === 'group' || level === 'groupEnd') {
                        return;
                    }
                    // warn/error تمر فقط (للأخطاء الفعلية)
                }

                // مرّر للأصلية
                if (typeof originalFn === 'function') {
                    return originalFn.apply(console, args);
                }
            } catch (e) {
                // لا نرمي أبداً من داخل الفلتر — تجاهل بصمت
            }
        };
    }

    var wrapped = {
        log: wrap('log', original.log),
        info: wrap('info', original.info),
        debug: wrap('debug', original.debug),
        warn: wrap('warn', original.warn),
        error: wrap('error', original.error),
        table: wrap('table', original.table),
        dir: wrap('dir', original.dir),
        group: wrap('group', original.group),
        groupEnd: wrap('groupEnd', original.groupEnd),
        trace: wrap('trace', original.trace)
    };

    // ════════════════════════════════════════════════════════════════
    // 4) تثبيت دفاعي — Object.defineProperty مع writable:false
    //    يمنع الإضافات من إعادة الكتابة فوق console.log إلخ.
    // ════════════════════════════════════════════════════════════════
    try {
        Object.keys(wrapped).forEach(function (k) {
            try {
                Object.defineProperty(console, k, {
                    value: wrapped[k],
                    writable: false,
                    configurable: false,
                    enumerable: true
                });
            } catch (e) {
                // بعض البيئات لا تدعم تجميد console — نُسند مباشرة
                try { console[k] = wrapped[k]; } catch (e2) { /* ignore */ }
            }
        });
    } catch (e) { /* ignore */ }

    // ════════════════════════════════════════════════════════════════
    // 5) التقاط أخطاء الإضافات قبل وصولها للكونسول
    // ════════════════════════════════════════════════════════════════
    try {
        window.addEventListener('error', function (event) {
            try {
                var msg = (event && (event.message || (event.error && event.error.message))) || '';
                var src = (event && (event.filename || event.source)) || '';
                if (looksLikeNoise([msg, src])) {
                    event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                    return false;
                }
            } catch (e) { /* ignore */ }
        }, true); // capture phase

        window.addEventListener('unhandledrejection', function (event) {
            try {
                var reason = event && event.reason;
                var msg = '';
                if (reason) {
                    if (typeof reason === 'string') msg = reason;
                    else if (reason.message) msg = reason.message;
                    else msg = String(reason);
                }
                if (looksLikeNoise([msg])) {
                    event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation();
                    return false;
                }
            } catch (e) { /* ignore */ }
        }, true);
    } catch (e) { /* ignore */ }

    // ════════════════════════════════════════════════════════════════
    // 6) أداة مساعدة للمطوّر — يمكنه تفعيل debug من الكونسول:
    //    window.__enableHseDebug() ثم refresh
    // ════════════════════════════════════════════════════════════════
    try {
        window.__enableHseDebug = function () {
            try { localStorage.setItem('hse_debug_console', '1'); } catch (e) {}
            if (typeof original.warn === 'function') {
                original.warn.call(console, '✅ HSE debug console enabled. Refresh the page.');
            }
        };
        window.__disableHseDebug = function () {
            try { localStorage.removeItem('hse_debug_console'); } catch (e) {}
            if (typeof original.warn === 'function') {
                original.warn.call(console, '✅ HSE debug console disabled. Refresh the page.');
            }
        };
    } catch (e) { /* ignore */ }
})();
