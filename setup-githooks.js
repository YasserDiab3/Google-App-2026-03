#!/usr/bin/env node
/**
 * setup-githooks.js — تفعيل hooks المشروع (يُشغَّل مرة واحدة لكل clone)
 *
 * الاستخدام:  node setup-githooks.js
 *
 * يفعّل المجلد .githooks/ كمصدر لـ git hooks، فيعمل pre-commit تلقائياً
 * عند كل commit يلمس Frontend/ (يبني bump الإصدار تلقائياً).
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim();
}

function main() {
    const repoRoot = path.resolve(__dirname);
    const hooksDir = path.join(repoRoot, '.githooks');

    if (!fs.existsSync(hooksDir)) {
        console.error(`❌ المجلد .githooks/ غير موجود في ${repoRoot}`);
        process.exit(1);
    }

    try {
        // التحقق من أننا داخل git repo
        run('git rev-parse --git-dir');
    } catch (e) {
        console.error('❌ هذا المجلد ليس git repository.');
        process.exit(1);
    }

    try {
        execSync('git config core.hooksPath .githooks', { stdio: 'inherit' });

        // محاولة جعل pre-commit قابلاً للتنفيذ (لا يضر على Windows)
        try {
            execSync('git update-index --chmod=+x .githooks/pre-commit', { stdio: 'pipe' });
        } catch (e) { /* مقبول على بعض الأنظمة */ }

        console.log('');
        console.log('✅ تم ربط Git بـ .githooks/');
        console.log('🎯 من الآن: كل commit يلمس Frontend/ سيُشغّل bump-version.js تلقائياً.');
        console.log('💡 لتخطّي bump في commit معيّن:  git commit --no-verify -m "..."');
        console.log('');
    } catch (e) {
        console.error('❌ فشل تفعيل hooksPath:', e.message);
        process.exit(1);
    }
}

main();
