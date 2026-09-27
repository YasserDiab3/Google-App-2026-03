/**
 * بناء نسخة إنتاجية من مجلد Frontend:
 * - نسخ كامل إلى dist/ (للحفاظ على المسارات والأصول)
 * - تصغير كل ملف .js عبر esbuild: minify، إسقاط console/debugger، بدون source maps
 *
 * الاستخدام: من مجلد Frontend نفّذ npm install ثم npm run build
 * الناتج: Frontend/dist/ ثم نسخ إلى dist/ عند جذر المستودع (لتوافق إعدادات Vercel التي تتوقع dist).
 */
import * as esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, '..');
const distRoot = path.join(frontendRoot, 'dist');
const repoRoot = path.resolve(frontendRoot, '..');
const rootDist = path.join(repoRoot, 'dist');

function walkJsFiles(dir, acc = []) {
    if (!fs.existsSync(dir)) return acc;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            if (ent.name === 'node_modules' || ent.name === 'dist') continue;
            walkJsFiles(p, acc);
        } else if (ent.name.endsWith('.js')) {
            acc.push(p);
        }
    }
    return acc;
}

function rmrf(p) {
    try {
        fs.rmSync(p, { recursive: true, force: true });
    } catch (_) {}
}

function cpDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
        const s = path.join(src, ent.name);
        const d = path.join(dest, ent.name);
        if (ent.isDirectory()) {
            if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === 'api' || ent.name === 'backend-sql') continue;
            cpDir(s, d);
        } else if (ent.name === 'vercel.json') {
            continue;
        } else {
            fs.copyFileSync(s, d);
        }
    }
}

function syncVercelServerlessBundle() {
    const apiRoot = path.join(repoRoot, 'api');
    const apiDest = path.join(frontendRoot, 'api');
    if (fs.existsSync(apiRoot)) {
        rmrf(apiDest);
        cpDir(apiRoot, apiDest);
    }
    const sqlSrc = path.join(repoRoot, 'backend-sql', 'src');
    const sqlDataGz = path.join(repoRoot, 'backend-sql', 'data', 'clinic_hse.db.gz');
    const sqlDest = path.join(frontendRoot, 'backend-sql');
    if (fs.existsSync(sqlSrc)) {
        rmrf(path.join(sqlDest, 'src'));
        cpDir(sqlSrc, path.join(sqlDest, 'src'));
    }
    if (fs.existsSync(sqlDataGz)) {
        const dataDir = path.join(sqlDest, 'data');
        fs.mkdirSync(dataDir, { recursive: true });
        fs.copyFileSync(sqlDataGz, path.join(dataDir, 'clinic_hse.db.gz'));
    }
}

function syncObservationAndFormsMirrors() {
    const formConfigs = [
        {
            src: 'public-observation.html',
            subdirs: ['public-observation', 'observation']
        },
        {
            src: 'public-near-miss.html',
            subdirs: ['public-near-miss', 'near-miss']
        },
        {
            src: 'public-fire-inspection.html',
            subdirs: ['public-fire-inspection', 'fire-inspection']
        },
        {
            src: 'public-daily-safety.html',
            subdirs: ['public-daily-safety', 'daily-safety']
        },
        {
            src: 'gate-visitor-entry.html',
            subdirs: ['gate-visitor-entry', 'gate', 'visitor']
        },
        {
            src: 'public-tbt-record.html',
            subdirs: ['public-tbt-record', 'tbt']
        },
        {
            src: 'forms-hub.html',
            subdirs: ['forms-hub', 'forms']
        }
    ];

    for (const item of formConfigs) {
        const fileSrc = path.join(frontendRoot, item.src);
        if (!fs.existsSync(fileSrc)) continue;

        const targets = [
            path.join(repoRoot, 'vercel-deploy', 'frontend', item.src)
        ];

        for (const sub of item.subdirs) {
            targets.push(path.join(frontendRoot, sub, 'index.html'));
            targets.push(path.join(repoRoot, 'vercel-deploy', 'frontend', sub, 'index.html'));
        }

        for (const t of targets) {
            try {
                fs.mkdirSync(path.dirname(t), { recursive: true });
                fs.copyFileSync(fileSrc, t);
            } catch (_) {}
        }
    }
    const versionSrc = path.join(frontendRoot, 'version.json');
    if (fs.existsSync(versionSrc)) {
        const targets = [
            path.join(repoRoot, 'vercel-deploy', 'frontend', 'version.json'),
            path.join(repoRoot, 'vercel-deploy', 'version.json'),
            path.join(repoRoot, 'dist', 'version.json'),
            path.join(repoRoot, 'vercel-deploy', 'dist', 'version.json'),
            path.join(repoRoot, 'vercel-deploy', 'frontend', 'dist', 'version.json'),
        ];
        for (const t of targets) {
            try {
                fs.mkdirSync(path.dirname(t), { recursive: true });
                fs.copyFileSync(versionSrc, t);
            } catch (_) {}
        }
    }
    const modulesSrc = path.join(frontendRoot, 'js', 'modules');
    const vercelModulesDest = path.join(repoRoot, 'vercel-deploy', 'frontend', 'js', 'modules');
    if (fs.existsSync(modulesSrc)) {
        cpDir(modulesSrc, vercelModulesDest);
    }
}

console.log('HSE Frontend production build');
console.log('Source:', frontendRoot);
console.log('Output:', distRoot);

syncObservationAndFormsMirrors();
syncVercelServerlessBundle();

rmrf(distRoot);
cpDir(frontendRoot, distRoot);

const entryPoints = walkJsFiles(distRoot);
if (!entryPoints.length) {
    console.warn('No JS files found under dist.');
    process.exit(0);
}

await esbuild.build({
    entryPoints,
    outdir: distRoot,
    outbase: distRoot,
    allowOverwrite: true,
    minify: true,
    target: 'es2020',
    legalComments: 'none',
    platform: 'browser',
    drop: ['console', 'debugger'],
    sourcemap: false,
    logLevel: 'info',
    logOverride: {
        'duplicate-object-key': 'silent',
        'assign-to-constant': 'warning'
    }
});

const info = [
    `builtAt: ${new Date().toISOString()}`,
    `filesMinified: ${entryPoints.length}`,
    'esbuild: minify + drop console/debugger + no sourcemap'
].join('\n');
fs.writeFileSync(path.join(distRoot, 'BUILD_INFO.txt'), info, 'utf8');

rmrf(rootDist);
cpDir(distRoot, rootDist);
fs.writeFileSync(path.join(rootDist, 'BUILD_INFO.txt'), info, 'utf8');

const vercelFrontendDist = path.join(repoRoot, 'vercel-deploy', 'frontend', 'dist');
if (fs.existsSync(path.dirname(vercelFrontendDist))) {
    cpDir(distRoot, vercelFrontendDist);
}

console.log(`Done. Minified ${entryPoints.length} JS files → ${distRoot} and ${rootDist}`);
