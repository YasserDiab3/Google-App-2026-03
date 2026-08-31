import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function walk(dir, acc = []) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (ent.name === 'dist' || ent.name === 'node_modules') continue;
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, acc);
        else if (/\.js$/.test(ent.name)) acc.push(p);
    }
    return acc;
}

const actionRe = /action:\s*['"]([^'"]+)['"]/g;
const frontendActions = new Set();
for (const f of walk(path.join(ROOT, 'Frontend/js/modules'))) {
    const src = fs.readFileSync(f, 'utf8');
    let m;
    while ((m = actionRe.exec(src))) frontendActions.add(m[1]);
}

const writeRe = /^(delete|save|update|add|remove|insert|submit|approve|reject|create|upsert|reset|disable|enable|change|confirm|start|upload|initialize|append|sync|fix|cleanup|merge|dispatch|send|set|clear|mark|complete|cancel|close|open|toggle|bulk|batch)/i;
const writeActions = [...frontendActions].filter((a) => writeRe.test(a)).sort();

// Load SQL registry keys
const rpcSrc = fs.readFileSync(path.join(ROOT, 'backend-sql/src/rpc-router.js'), 'utf8');
const modSrc = fs.readFileSync(path.join(ROOT, 'backend-sql/src/handlers/module-handlers.js'), 'utf8');
const genSrc = fs.readFileSync(path.join(ROOT, 'backend-sql/src/handlers/generic-sheet-ops.js'), 'utf8');
const authSrc = fs.readFileSync(path.join(ROOT, 'backend-sql/src/handlers/auth-handlers.js'), 'utf8');
const entitySrc = fs.existsSync(path.join(ROOT, 'backend-sql/src/handlers/entity-action-resolver.js'))
    ? fs.readFileSync(path.join(ROOT, 'backend-sql/src/handlers/entity-action-resolver.js'), 'utf8')
    : '';
const mfaSrc = fs.existsSync(path.join(ROOT, 'backend-sql/src/handlers/mfa-handlers.js'))
    ? fs.readFileSync(path.join(ROOT, 'backend-sql/src/handlers/mfa-handlers.js'), 'utf8')
    : '';

const regRe = /'([a-zA-Z0-9_]+)'\s*:/g;
const sqlActions = new Set([
    ...[...rpcSrc.matchAll(regRe)].map((m) => m[1]),
    ...[...modSrc.matchAll(/'([a-zA-Z0-9_]+)'\s*:\s*function/g)].map((m) => m[1]),
    ...[...genSrc.matchAll(/'([a-zA-Z0-9_]+)'\s*:/g)].map((m) => m[1]),
    ...[...authSrc.matchAll(/'([a-zA-Z0-9_]+)'\s*:\s*function/g)].map((m) => m[1]),
    ...[...entitySrc.matchAll(/^\s+([a-zA-Z0-9_]+):\s*\{/gm)].map((m) => m[1]),
    ...[...mfaSrc.matchAll(/^\s+([a-zA-Z0-9_]+)\(/gm)].map((m) => m[1])
]);

const RPC_FALSE_POSITIVES = new Set(['open', 'update_added']);

const { headersMap } = require('../backend-sql/src/db/headers-schema.js');
const sheets = Object.keys(headersMap);

function canDynamicResolve(action) {
    const lower = action.toLowerCase();
    for (const sheet of sheets) {
        const ls = sheet.toLowerCase();
        if (lower === `getall${ls}` || lower === `get${ls}s` || lower === `get${ls}`) return true;
        if (lower === `add${ls}` || lower === `save${ls}` || lower === `insert${ls}`) return true;
        if (lower === `update${ls}`) return true;
        if (lower === `delete${ls}`) return true;
    }
    return false;
}

const missing = [];
for (const a of writeActions) {
    if (RPC_FALSE_POSITIVES.has(a)) continue;
    if (sqlActions.has(a)) continue;
    if (canDynamicResolve(a)) continue;
    missing.push(a);
}

console.log('Frontend write actions:', writeActions.length);
console.log('SQL registered:', sqlActions.size);
console.log('Missing (no handler, no dynamic):', missing.length);
missing.forEach((a) => console.log('  -', a));
