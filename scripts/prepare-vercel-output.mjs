/**
 * Vercel Build Output API — static من dist/ + serverless /api/*
 * يحل تعارض outputDirectory الذي كان يمنع نشر api/health و api/exec
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outRoot = path.join(root, '.vercel', 'output');
const staticRoot = path.join(outRoot, 'static');
const distDir = path.join(root, 'dist');

function rmrf(p) {
    try { fs.rmSync(p, { recursive: true, force: true }); } catch (_) {}
}

function skipHeavyDbArtifact(name) {
    const n = String(name || '').toLowerCase();
    return n.endsWith('.db') || n.endsWith('.db-wal') || n.endsWith('.db-shm') || n.endsWith('.rebuilt.db');
}

function cpDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
        if (skipHeavyDbArtifact(ent.name)) continue;
        if (ent.isDirectory() && ent.name === 'backups') continue;
        const s = path.join(src, ent.name);
        const d = path.join(dest, ent.name);
        if (ent.isDirectory()) cpDir(s, d);
        else fs.copyFileSync(s, d);
    }
}

function writeJson(file, data) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function setupNodeFunction(routeName, entryFile, opts = {}) {
    const funcDir = path.join(outRoot, 'functions', `${routeName}.func`);
    rmrf(funcDir);
    fs.mkdirSync(funcDir, { recursive: true });

    const entry = path.join(root, entryFile);
    if (!fs.existsSync(entry)) {
        throw new Error(`Missing serverless entry: ${entry}`);
    }
    let code = fs.readFileSync(entry, 'utf8');
    if (entryFile.includes('exec.js')) {
        code = code.replaceAll("require('../backend-sql/", "require('./backend-sql/");
    }
    fs.writeFileSync(path.join(funcDir, 'index.js'), code);

    if (opts.includeDirs) {
        for (const rel of opts.includeDirs) {
            const src = path.join(root, rel);
            if (!fs.existsSync(src)) continue;
            const dest = path.join(funcDir, rel);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            cpDir(src, dest);
        }
    }
    if (opts.includeFiles) {
        for (const rel of opts.includeFiles) {
            const src = path.join(root, rel);
            if (!fs.existsSync(src)) continue;
            const dest = path.join(funcDir, rel);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.copyFileSync(src, dest);
        }
    }

    writeJson(path.join(funcDir, '.vc-config.json'), {
        runtime: 'nodejs20.x',
        handler: 'index.js',
        launcherType: 'Nodejs',
        memory: opts.memory || 128,
        maxDuration: opts.maxDuration || 10,
        supportsResponseStreaming: false
    });
}

console.log('Vercel Build Output API');
console.log('Static source:', distDir);
console.log('Output:', outRoot);

if (!fs.existsSync(distDir)) {
    console.error('dist/ missing — run npm run build first');
    process.exit(1);
}

rmrf(outRoot);
cpDir(distDir, staticRoot);

setupNodeFunction('api/health', 'api/health.js', { memory: 128, maxDuration: 10 });

setupNodeFunction('api/exec', 'Frontend/api/exec.js', {
    memory: 1024,
    maxDuration: 60,
    includeDirs: ['backend-sql/src'],
    includeFiles: [
        'backend-sql/data/clinic_hse.db.gz'
    ]
});

writeJson(path.join(outRoot, 'config.json'), {
    version: 3,
    routes: [
        { src: '/exec', dest: '/api/exec' },
        { src: '/forms', dest: '/forms-hub.html' },
        { src: '/forms-hub', dest: '/forms-hub.html' },
        { src: '/gate', dest: '/gate-visitor-entry.html' },
        { src: '/visitors', dest: '/gate-visitor-entry.html' },
        { src: '/gate-visitor-entry', dest: '/gate-visitor-entry.html' },
        { src: '/obs', dest: '/public-observation.html' },
        { src: '/observation', dest: '/public-observation.html' },
        { src: '/near-miss', dest: '/public-near-miss.html' },
        { src: '/fire', dest: '/public-fire-inspection.html' },
        { src: '/fire-inspection', dest: '/public-fire-inspection.html' },
        { src: '/daily-safety', dest: '/public-daily-safety.html' },
        { src: '/patrol', dest: '/public-daily-safety.html' },
        { handle: 'filesystem' }
    ]
});

console.log('Done — .vercel/output ready for deployment');
