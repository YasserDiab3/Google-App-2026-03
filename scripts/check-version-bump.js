#!/usr/bin/env node
/**
 * pre-push: يمنع push تغييرات الواجهة بدون تحديث ملفات الإصدار.
 * تخطّي: SKIP_VERSION_CHECK=1 git push
 * أو:   git push --no-verify
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VERSION_FILES = new Set([
    'Frontend/version.json',
    'Frontend/service-worker.js',
    'Frontend/index.html',
    'Frontend/js/modules/app-utils.js',
    'vercel-deploy/frontend/version.json',
    'vercel-deploy/frontend/service-worker.js',
    'vercel-deploy/frontend/index.html',
    'vercel-deploy/frontend/js/modules/app-utils.js',
]);

const FRONTEND_PREFIXES = ['Frontend/', 'vercel-deploy/frontend/'];

function repoRoot() {
    return execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
}

function normalizePath(filePath) {
    return String(filePath || '').replace(/\\/g, '/');
}

function gitLines(args, root) {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    if (result.status !== 0) return '';
    return result.stdout || '';
}

function readPushChangedFiles(root) {
    const files = new Set();
    let stdin = '';

    try {
        if (!process.stdin.isTTY) {
            stdin = fs.readFileSync(0, 'utf8');
        }
    } catch (_e) {
        /* ignore */
    }

    const lines = stdin.trim().split('\n').filter(Boolean);

    for (const line of lines) {
        const parts = line.split(/\s+/);
        if (parts.length < 4) continue;

        const localSha = parts[1];
        const remoteSha = parts[3];
        const zeroSha = '0'.repeat(40);

        let rangeArgs;
        if (remoteSha === zeroSha) {
            rangeArgs = ['diff', '--name-only', '--diff-filter=ACMR', localSha];
        } else if (localSha !== remoteSha) {
            rangeArgs = ['diff', '--name-only', '--diff-filter=ACMR', `${remoteSha}..${localSha}`];
        } else {
            continue;
        }

        gitLines(rangeArgs, root)
            .trim()
            .split('\n')
            .filter(Boolean)
            .forEach((f) => files.add(normalizePath(f)));
    }

    if (files.size > 0) return [...files];

    const fallbacks = ['origin/main..HEAD', '@{u}..HEAD'];
    for (const range of fallbacks) {
        const out = gitLines(['diff', '--name-only', '--diff-filter=ACMR', range], root).trim();
        if (!out) continue;
        return out.split('\n').filter(Boolean).map(normalizePath);
    }

    return [];
}

function isFrontendAppChange(file) {
    if (!FRONTEND_PREFIXES.some((prefix) => file.startsWith(prefix))) return false;
    if (VERSION_FILES.has(file)) return false;
    return true;
}

function hasVersionFileUpdate(files) {
    return files.some((file) => VERSION_FILES.has(file));
}

function main() {
    if (process.env.SKIP_VERSION_CHECK === '1') {
        console.log('⏭️  تخطّي فحص الإصدار (SKIP_VERSION_CHECK=1)');
        return;
    }

    const root = repoRoot();
    const files = readPushChangedFiles(root);
    const frontendChanges = files.filter(isFrontendAppChange);

    if (frontendChanges.length === 0) {
        return;
    }

    if (hasVersionFileUpdate(files)) {
        return;
    }

    console.error('');
    console.error('══════════════════════════════════════════════════════════');
    console.error('⚠️  push مرفوض: تغييرات واجهة بدون تحديث رقم الإصدار');
    console.error('══════════════════════════════════════════════════════════');
    console.error('');
    console.error('ملفات واجهة في هذا push (عينة):');
    frontendChanges.slice(0, 12).forEach((f) => console.error(`  • ${f}`));
    if (frontendChanges.length > 12) {
        console.error(`  … و${frontendChanges.length - 12} ملفاً آخر`);
    }
    console.error('');
    console.error('الحل:');
    console.error('  1) node bump-version.js');
    console.error('  2) git add -A && git commit -m "رفع رقم الإصدار"');
    console.error('  3) git push origin main');
    console.error('');
    console.error('تخطّي (حالات نادرة): SKIP_VERSION_CHECK=1 git push');
    console.error('══════════════════════════════════════════════════════════');
    console.error('');
    process.exit(1);
}

main();
