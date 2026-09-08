'use strict';
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const frontendRoot = path.join(repoRoot, 'Frontend');
const i18nPath = path.join(frontendRoot, 'js', 'modules', 'i18n-core.js');
const i18nContent = fs.readFileSync(i18nPath, 'utf8');

function extractBlockKeys(content, startMarker, endMarker) {
    const start = content.indexOf(startMarker);
    if (start === -1) return [];
    const from = start + startMarker.length;
    const end = content.indexOf(endMarker, from);
    if (end === -1) return [];
    const slice = content.slice(from, end);
    const keys = [];
    const re = /'((?:\\'|[^'])+)':\s*/g;
    let m;
    while ((m = re.exec(slice)) !== null) {
        keys.push(m[1].replace(/\\'/g, "'"));
    }
    return keys;
}

const arKeys = new Set(extractBlockKeys(i18nContent, 'ar: {', '},\n        en: {'));
const enKeys = new Set(extractBlockKeys(i18nContent, 'en: {', '\n    };\n\n    const literalArToEn'));

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, f.name);
        if (f.isDirectory()) {
            if (f.name !== 'node_modules' && f.name !== 'dist') {
                results = results.concat(walk(p));
            }
        } else if (f.name.endsWith('.js') && f.name !== 'i18n-core.js') {
            results.push(p);
        }
    }
    return results;
}

const jsFiles = walk(path.join(frontendRoot, 'js'));
const missingMap = {};

for (const p of jsFiles) {
    const code = fs.readFileSync(p, 'utf8');
    // Match I18n.translate('key', 'fallback') or I18n.t('key', 'fallback')
    const re = /(?:I18n|i18n)\.(?:translate|t)\(\s*['"]([^'"\$\{\}\+\n\r]+)['"](?:\s*,\s*['"]([^'"\$\{\}\+\n\r]*)['"])?/g;
    let m;
    while ((m = re.exec(code)) !== null) {
        const k = m[1].trim();
        const fallback = m[2] ? m[2].trim() : '';
        if (k && !arKeys.has(k) && !k.includes(' ') && k.length < 80) {
            if (!missingMap[k]) missingMap[k] = { occurrences: [], fallback: fallback };
            missingMap[k].occurrences.push(path.relative(repoRoot, p));
            if (!missingMap[k].fallback && fallback) {
                missingMap[k].fallback = fallback;
            }
        }
    }
}

console.log('Unique missing keys count:', Object.keys(missingMap).length);
fs.writeFileSync(path.join(__dirname, 'missing-i18n-keys.json'), JSON.stringify(missingMap, null, 2), 'utf8');
console.log('Saved missing keys to tools/missing-i18n-keys.json');
