#!/usr/bin/env node
/**
 * يرفض أي remote غير Google-App-2026-03
 */
const { execSync } = require('child_process');

const ALLOWED = 'github.com/YasserDiab3/Google-App-2026-03';
const FORBIDDEN = /ICAPP-V092026|google-TR|icapphub/i;

function run(cmd) {
    return execSync(cmd, { encoding: 'utf8' }).trim();
}

const remotes = run('git remote -v');
const lines = remotes.split(/\r?\n/).filter(Boolean);
if (!lines.length) {
    console.error('❌ لا يوجد git remote');
    process.exit(1);
}

let hasAllowed = false;
for (const line of lines) {
    if (FORBIDDEN.test(line)) {
        console.error('❌ تداخل مستودع محظور:\n' + line);
        process.exit(1);
    }
    if (line.toLowerCase().includes(ALLOWED.toLowerCase())) hasAllowed = true;
    const name = line.split(/\s+/)[0];
    if (name && name !== 'origin') {
        console.error('❌ remote إضافي غير مسموح: ' + name);
        process.exit(1);
    }
}

if (!hasAllowed) {
    console.error('❌ origin يجب أن يكون https://github.com/YasserDiab3/Google-App-2026-03.git');
    console.error(remotes);
    process.exit(1);
}

const origin = run('git remote get-url origin');
if (!origin.toLowerCase().includes(ALLOWED.toLowerCase()) || FORBIDDEN.test(origin)) {
    console.error('❌ origin غير مطابق: ' + origin);
    process.exit(1);
}

console.log('✅ عزل المستودع: origin = Google-App-2026-03 فقط');
process.exit(0);
