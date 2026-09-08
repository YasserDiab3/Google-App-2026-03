/**
 * يستبدل توجيه SQL/safety-icapp في صفحات HTML المصدر بمسار GAS.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['dist', 'node_modules', '.git', 'archive']);

const GAS_LOOKUP = `{
                    var __gas = '';
                    try {
                        var __c = localStorage.getItem('hse_public_api_url') || localStorage.getItem('HSE_API_URL') || '';
                        if (__c && __c.indexOf('script.google.com') !== -1) __gas = __c.replace(/\\/dev(\\?|#|$)/, '/exec$1');
                        if (!__gas) {
                            var __raw = localStorage.getItem('hse_google_config');
                            if (__raw) {
                                var __p = JSON.parse(__raw);
                                var __u = __p && __p.appsScript && __p.appsScript.scriptUrl;
                                if (__u && String(__u).indexOf('script.google.com') !== -1) __gas = String(__u).replace(/\\/dev(\\?|#|$)/, '/exec$1');
                            }
                        }
                    } catch (__e) {}
                    if (__gas) return __gas;
                }`;

function walk(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (SKIP.has(ent.name)) continue;
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, acc);
        else if (ent.name.endsWith('.html')) acc.push(p);
    }
    return acc;
}

let n = 0;
for (const file of [
    ...walk(path.join(root, 'Frontend')),
    ...walk(path.join(root, 'vercel-deploy', 'frontend'))
]) {
    let s = fs.readFileSync(file, 'utf8');
    const before = s;
    s = s.replace(
        /if\s*\(\s*host\.includes\(['"]safety-icapp\.com['"]\)\s*\|\|\s*host\.includes\(['"]vercel\.app['"]\)\s*\)\s*\{[\s\S]*?return window\.location\.origin \+ ['"]\/api\/exec['"];\s*\}/g,
        GAS_LOOKUP
    );
    s = s.replace(
        /const LIVE_BACKEND_URL = 'https:\/\/www\.safety-icapp\.com\/api\/exec';/g,
        "const LIVE_BACKEND_URL = (typeof getEffectiveApiUrl === 'function' ? getEffectiveApiUrl() : '') || '';"
    );
    s = s.replace(
        /\? getEffectiveApiUrl\(\) : '\/api\/exec'/g,
        "? getEffectiveApiUrl() : ''"
    );
    s = s.replace(
        /\? getEffectiveApiUrl\(\) : \"\/api\/exec\"/g,
        '? getEffectiveApiUrl() : \'\''
    );
    if (s !== before) {
        fs.writeFileSync(file, s, 'utf8');
        n += 1;
        console.log('patched', path.relative(root, file));
    }
}
console.log('files patched:', n);
