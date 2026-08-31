/**
 * تنظيف مراجع خادم SQL / Sheets — توحيد على SQL API
 * يعدّل المصادر فقط (لا dist — يُعاد بناؤه)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const GAS_EXEC =
    'https://www.safety-icapp.com/api/exec';
const CLOUDFLARE = 'https://www.safety-icapp.com/api/exec';
const SQL_PROD = 'https://www.safety-icapp.com/api/exec';
const SQL_FALLBACK_EXPR =
    "(typeof getEffectiveApiUrl === 'function') ? getEffectiveApiUrl() : '/api/exec'";
const SCRIPT_URL_FALLBACK =
    "(typeof SCRIPT_URL !== 'undefined' && SCRIPT_URL) ? SCRIPT_URL : " + SQL_FALLBACK_EXPR;

const SKIP_DIRS = new Set(['dist', 'node_modules', '.git', '.vercel', 'archive']);

function walk(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (SKIP_DIRS.has(ent.name)) continue;
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, acc);
        else if (/\.(html|js|mjs|gs|json|mdc)$/i.test(ent.name)) acc.push(p);
    }
    return acc;
}

const roots = [
    path.join(ROOT, 'Frontend'),
    path.join(ROOT, 'vercel-deploy', 'frontend'),
    path.join(ROOT, 'vercel-deploy'),
    path.join(ROOT, 'scripts'),
    path.join(ROOT, 'backend-sql', 'scripts')
];

const files = [...new Set(roots.flatMap((r) => walk(r)))].filter((f) => {
    if (f.includes(`${path.sep}dist${path.sep}`)) return false;
    if (f.includes(`${path.sep}backend-sql${path.sep}src${path.sep}`) && f.includes('Frontend')) return false;
    if (f.endsWith('.gs')) return false; // أرشيف GAS
    return true;
});

let changed = 0;

for (const file of files) {
    let src = fs.readFileSync(file, 'utf8');
    let next = src;

    next = next.replaceAll(GAS_EXEC, SQL_PROD);
    next = next.replaceAll(CLOUDFLARE, SQL_PROD);

    // ternary fallbacks
    next = next.replace(
        /\(typeof getEffectiveApiUrl === 'function'\) \? getEffectiveApiUrl\(\) : '[^']*'/g,
        SQL_FALLBACK_EXPR
    );
    next = next.replace(
        /\(typeof SCRIPT_URL !== 'undefined'\) \? SCRIPT_URL : '[^']*'/g,
        SCRIPT_URL_FALLBACK
    );

    // إزالة ثوابت GAS_FALLBACK غير المستخدمة
    next = next.replace(/^\s*const GAS_FALLBACK_URL = '[^']*';\s*\n/gm, '');
    next = next.replace(/^\s*window\.FALLBACK_GAS_URL = '[^']*';\s*\n/gm, '');

    // رسائل تحميل
    next = next.replace(/الخادم/g, 'الخادم');
    next = next.replace(/خادم SQL/g, 'خادم SQL');
    next = next.replace(/قاعدة SQL/g, 'قاعدة SQL');

    if (next !== src) {
        fs.writeFileSync(file, next, 'utf8');
        changed++;
        console.log('updated', path.relative(ROOT, file));
    }
}

console.log(`\nDone: ${changed} files updated`);
