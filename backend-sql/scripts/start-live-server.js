/**
 * Auto-Launcher for Backend SQL + Cloudflare Tunnel
 * Starts both services in a single command and outputs the live public HTTPS URL
 */
'use strict';

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');
const CLOUDFLARED_PATH = 'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe';

console.log('====================================================');
console.log('🚀 Starting HSE SQL Backend & Live Public Tunnel...');
console.log('====================================================');

// 1. Start Backend Server
const serverProcess = spawn('node', ['src/index.js'], {
    cwd: ROOT_DIR,
    stdio: ['ignore', 'pipe', 'pipe']
});

serverProcess.stdout.on('data', (data) => {
    const text = data.toString().trim();
    if (text) console.log(`[BACKEND] ${text}`);
});

serverProcess.stderr.on('data', (data) => {
    const text = data.toString().trim();
    if (text) console.error(`[BACKEND ERR] ${text}`);
});

// 2. Wait 1 second then launch Cloudflare Tunnel
setTimeout(() => {
    console.log('🌐 Connecting to Cloudflare Global Network...');

    const tunnelProcess = spawn(CLOUDFLARED_PATH, ['tunnel', '--protocol', 'http2', '--url', 'http://127.0.0.1:3001'], {
        stdio: ['ignore', 'pipe', 'pipe']
    });

    let urlFound = false;

    const parseOutput = (data) => {
        const text = data.toString();
        const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
        if (match && !urlFound) {
            urlFound = true;
            const liveUrl = match[0];
            console.log('\n====================================================');
            console.log('🎉 LIVE CLOUD TUNNEL IS ACTIVE & READY!');
            console.log('====================================================');
            console.log(`🔗 Public Health Check:  ${liveUrl}/health`);
            console.log(`📡 Frontend API Endpoint: ${liveUrl}/exec`);
            console.log('====================================================');
            console.log('💡 Put this API URL in your App settings (scriptUrl) to connect instantly!\n');
            
            // Save to a text file for convenience
            fs.writeFileSync(path.join(ROOT_DIR, 'LIVE_URL.txt'), `Frontend API Endpoint:\n${liveUrl}/exec\n\nHealth Check:\n${liveUrl}/health\n`);
        }
    };

    tunnelProcess.stdout.on('data', parseOutput);
    tunnelProcess.stderr.on('data', parseOutput);

    tunnelProcess.on('exit', (code) => {
        console.log(`[TUNNEL] Exited with code ${code}`);
    });
}, 1000);

process.on('SIGINT', () => {
    console.log('Shutting down...');
    process.exit(0);
});
