#!/usr/bin/env node
/**
 * bump-version.js — توحيد إصدار التطبيق عبر كل المواضع بأمر واحد.
 *
 * يحدّث (في كل من Frontend/ و vercel-deploy/frontend/):
 *   1) version.json                         → "version": "X.Y.Z"   ← يقود إشعار التحديث
 *   2) service-worker.js  CACHE_VERSION      → hse-app-vX.Y.Z-YYYYMMDD
 *   3) index.html         __SW_REGISTER_QUERY→ v=hse-app-vX.Y.Z-YYYYMMDD
 *   4) js/modules/app-utils.js  appVersion   → 'X.Y.Z'
 *
 * الاستخدام:
 *   node bump-version.js              → يزيد آخر رقم تلقائياً (1.0.37 → 1.0.38)
 *   node bump-version.js 1.0.40       → يضبط إصداراً محدداً
 *   node bump-version.js minor        → 1.0.x → 1.1.0
 *   node bump-version.js major        → x.y.z → (x+1).0.0
 *
 * بعد التشغيل: راجع git diff ثم commit + push (Vercel ينشر تلقائياً، وإشعار التحديث يظهر للمستخدمين).
 *
 * pre-push hook (مرة واحدة): node scripts/install-git-hooks.mjs
 * يمنع push واجهة بدون تحديث الإصدار — انظر scripts/check-version-bump.js
 */

const fs = require('fs');
const path = require('path');

const ROOTS = [
    path.join(__dirname, 'Frontend'),
    path.join(__dirname, 'vercel-deploy', 'frontend'),
];

function readJSONVersion(versionJsonPath) {
    try {
        const raw = fs.readFileSync(versionJsonPath, 'utf8');
        const obj = JSON.parse(raw);
        return String(obj.version || '').trim();
    } catch (e) {
        return '';
    }
}

function computeNewVersion(current, arg) {
    const parts = (current || '1.0.0').split('.').map(n => parseInt(n, 10) || 0);
    while (parts.length < 3) parts.push(0);
    let [maj, min, pat] = parts;

    if (!arg || arg === 'patch') { pat += 1; }
    else if (arg === 'minor')    { min += 1; pat = 0; }
    else if (arg === 'major')    { maj += 1; min = 0; pat = 0; }
    else if (/^\d+\.\d+\.\d+$/.test(arg)) { return arg; } // إصدار صريح
    else { pat += 1; } // افتراضي آمن

    return `${maj}.${min}.${pat}`;
}

function dateStamp() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${day}`;
}

function replaceInFile(filePath, replacer, label) {
    if (!fs.existsSync(filePath)) {
        console.log(`  ⏭️  تخطّي (غير موجود): ${label}`);
        return false;
    }
    const before = fs.readFileSync(filePath, 'utf8');
    const after = replacer(before);
    if (after === before) {
        console.log(`  ⚠️  لا تغيير: ${label}`);
        return false;
    }
    fs.writeFileSync(filePath, after, 'utf8');
    console.log(`  ✅ ${label}`);
    return true;
}

function bumpRoot(root, newVersion, cacheVersion) {
    const rootName = path.relative(__dirname, root) || root;
    console.log(`\n📁 ${rootName}`);

    // 1) version.json
    replaceInFile(
        path.join(root, 'version.json'),
        (content) => {
            try {
                const parsed = JSON.parse(content);
                parsed.version = newVersion;
                return JSON.stringify(parsed, null, 2) + '\n';
            } catch (e) {
                return JSON.stringify({ version: newVersion }, null, 2) + '\n';
            }
        },
        `version.json → ${newVersion}`
    );

    // 2) service-worker.js  CACHE_VERSION
    replaceInFile(
        path.join(root, 'service-worker.js'),
        (c) => c.replace(
            /const CACHE_VERSION = '[^']*';/,
            `const CACHE_VERSION = '${cacheVersion}';`
        ),
        `service-worker.js CACHE_VERSION → ${cacheVersion}`
    );

    // 3) index.html  __SW_REGISTER_QUERY
    replaceInFile(
        path.join(root, 'index.html'),
        (c) => c.replace(
            /const __SW_REGISTER_QUERY = "[^"]*";/,
            `const __SW_REGISTER_QUERY = "v=${cacheVersion}";`
        ),
        `index.html __SW_REGISTER_QUERY → v=${cacheVersion}`
    );

    // 4) app-utils.js  appVersion
    replaceInFile(
        path.join(root, 'js', 'modules', 'app-utils.js'),
        (c) => c.replace(
            /appVersion:\s*'[^']*',/,
            `appVersion: '${newVersion}',`
        ),
        `app-utils.js appVersion → ${newVersion}`
    );
}

function main() {
    const arg = (process.argv[2] || '').trim();

    // الإصدار الحالي من أول version.json موجود
    let current = '';
    for (const root of ROOTS) {
        current = readJSONVersion(path.join(root, 'version.json'));
        if (current) break;
    }
    if (!current) current = '1.0.0';

    const newVersion = computeNewVersion(current, arg);
    const cacheVersion = `hse-app-v${newVersion}-${dateStamp()}`;

    console.log('════════════════════════════════════════');
    console.log(`🔢 الإصدار الحالي : ${current}`);
    console.log(`🚀 الإصدار الجديد : ${newVersion}`);
    console.log(`🗂️  cache version  : ${cacheVersion}`);
    console.log('════════════════════════════════════════');

    ROOTS.forEach(root => bumpRoot(root, newVersion, cacheVersion));

    console.log('\n✅ تم توحيد الإصدار في جميع المواضع.');
    console.log('📌 الخطوة التالية: git add -A && git commit && git push  (Vercel سينشر، وإشعار التحديث سيظهر للمستخدمين).\n');
}

main();
