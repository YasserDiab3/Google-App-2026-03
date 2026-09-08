#!/usr/bin/env node
/**
 * جلسة OAuth مباشرة — يفتح المتصفح لمنح قراءة Google Sheets
 *
 * المتطلب (مرة واحدة):
 *   Google Cloud → OAuth Client ID (Desktop) → حمّل JSON إلى:
 *   secrets/google-oauth-client.json
 *
 * أو عيّن:
 *   GOOGLE_OAUTH_CLIENT_ID + GOOGLE_OAUTH_CLIENT_SECRET
 *
 * الاستخدام:
 *   npm run sync:sheets:login
 */
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { google } from 'googleapis';
import {
    loadOAuthClientConfig,
    saveOAuthToken,
    OAUTH_TOKEN_PATH,
    SHEETS_READONLY_SCOPE
} from './lib/google-sheets-reader.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const REDIRECT_PORT = 3789;
const REDIRECT_URI = `http://127.0.0.1:${REDIRECT_PORT}/oauth2callback`;

function openBrowser(url) {
    const cmd = process.platform === 'win32'
        ? `start "" "${url}"`
        : process.platform === 'darwin'
            ? `open "${url}"`
            : `xdg-open "${url}"`;
    exec(cmd);
}

function ensureSecretsDir() {
    const dir = path.join(repoRoot, 'secrets');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
}

async function waitForAuthCode(oauth2Client) {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [SHEETS_READONLY_SCOPE]
    });

    console.log('\n🔐 جلسة OAuth — Google Sheets (قراءة فقط)\n');
    console.log('1. سيفتح المتصفح لتسجيل الدخول بحساب Google الذي يملك الجدول');
    console.log('2. وافق على الصلاحية');
    console.log('3. سيعود التطبيق تلقائياً ويحفظ التوكن محلياً\n');
    console.log('إن لم يفتح المتصفح، افتح الرابط:\n', authUrl, '\n');

    return new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
            try {
                const url = new URL(req.url, REDIRECT_URI);
                if (url.pathname !== '/oauth2callback') {
                    res.writeHead(404);
                    res.end('Not found');
                    return;
                }

                const err = url.searchParams.get('error');
                if (err) {
                    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(`<h1>رفض الصلاحية</h1><p>${err}</p>`);
                    reject(new Error(`OAuth denied: ${err}`));
                    server.close();
                    return;
                }

                const code = url.searchParams.get('code');
                if (!code) {
                    res.writeHead(400);
                    res.end('Missing code');
                    return;
                }

                const { tokens } = await oauth2Client.getToken(code);
                oauth2Client.setCredentials(tokens);
                saveOAuthToken(tokens);

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(
                    '<h1>تم منح الصلاحية</h1>'
                    + '<p>يمكنك إغلاق هذه النافذة والعودة إلى Cursor.</p>'
                );
                resolve(tokens);
                server.close();
            } catch (e) {
                reject(e);
                server.close();
            }
        });

        server.listen(REDIRECT_PORT, '127.0.0.1', () => {
            openBrowser(authUrl);
        });

        server.on('error', reject);

        setTimeout(() => {
            server.close();
            reject(new Error('انتهت مهلة OAuth (5 دقائق). أعد المحاولة.'));
        }, 5 * 60 * 1000);
    });
}

async function main() {
    ensureSecretsDir();

    let clientConfig;
    try {
        clientConfig = loadOAuthClientConfig();
    } catch (e) {
        console.error('❌', e.message);
        console.error('\n📋 إعداد OAuth Client (مرة واحدة):');
        console.error('   Google Cloud Console → APIs → Google Sheets API (فعّل)');
        console.error('   → Credentials → Create OAuth client ID → Desktop app');
        console.error('   → Download JSON → secrets/google-oauth-client.json');
        console.error('\n   أو Service Account: secrets/google-service-account.json');
        process.exit(1);
    }

    const oauth2Client = new google.auth.OAuth2(
        clientConfig.client_id,
        clientConfig.client_secret,
        REDIRECT_URI
    );

    await waitForAuthCode(oauth2Client);

    console.log('✅ تم حفظ التوكن:', OAUTH_TOKEN_PATH);
    console.log('▶️  التالي: npm run sync:sheets:compare');
}

main().catch((err) => {
    console.error('❌', err.message || err);
    process.exit(1);
});
