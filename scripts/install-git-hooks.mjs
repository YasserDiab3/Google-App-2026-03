#!/usr/bin/env node
/**
 * ينسخ git hooks إلى .git/hooks/
 * الاستخدام: node scripts/install-git-hooks.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
const hooksDir = path.join(repoRoot, '.git', 'hooks');

const PRE_PUSH = `#!/bin/sh
# مُثبَّت عبر: node scripts/install-git-hooks.mjs
cd "$(git rev-parse --show-toplevel)" || exit 1
node scripts/check-version-bump.js || exit 1
exit 0
`;

if (!fs.existsSync(hooksDir)) {
    console.error('❌ مجلد .git/hooks غير موجود — هل هذا مستودع git؟');
    process.exit(1);
}

const prePushPath = path.join(hooksDir, 'pre-push');
fs.writeFileSync(prePushPath, PRE_PUSH, { encoding: 'utf8', mode: 0o755 });

console.log('✅ تم تثبيت pre-push hook');
console.log(`   ${prePushPath}`);
console.log('');
console.log('يفحص push: تغييرات Frontend بدون bump-version → يرفض push');
console.log('تخطّي: SKIP_VERSION_CHECK=1 git push');
