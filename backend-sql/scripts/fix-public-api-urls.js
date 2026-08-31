/**
 * توجيه صفحات النماذج العامة إلى SQL على www.safety-icapp.com
 */
'use strict';

const fs = require('fs');
const path = require('path');

const OLD = 'https://www.safety-icapp.com/api/exec';
const NEW = 'https://www.safety-icapp.com/api/exec';
const HOST_GUARD = `            try {
                const host = (window.location.hostname || '').toLowerCase();
                if (host.includes('safety-icapp.com') || host.includes('vercel.app')) {
                    return window.location.origin + '/api/exec';
                }
            } catch (_h) {}
`;

function walk(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (ent.name === 'dist' || ent.name === 'node_modules') continue;
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, acc);
        else if (ent.name.endsWith('.html')) acc.push(p);
    }
    return acc;
}

const files = [
    ...walk(path.join(__dirname, '../../Frontend')),
    ...walk(path.join(__dirname, '../../vercel-deploy/frontend'))
];

let changed = 0;
for (const file of files) {
    let src = fs.readFileSync(file, 'utf8');
    if (!src.includes(OLD) && !src.includes('LIVE_BACKEND_URL')) continue;
    let next = src.replaceAll(OLD, NEW);
    if (next.includes('function getEffectiveApiUrl()') && !next.includes("host.includes('safety-icapp.com')")) {
        next = next.replace(
            /function getEffectiveApiUrl\(\)\s*\{\s*\n(\s*)try \{/,
            (m, indent) => `function getEffectiveApiUrl() {\n${HOST_GUARD}${indent}try {`
        );
    }
    if (next !== src) {
        fs.writeFileSync(file, next, 'utf8');
        changed++;
        console.log('updated', path.relative(path.join(__dirname, '../..'), file));
    }
}
console.log(`changed ${changed} files`);
