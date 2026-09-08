/**
 * قراءة Google Sheets — OAuth (جلسة مباشرة) أو Service Account (Sheets API v4)
 */
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const DEFAULT_SPREADSHEET_ID = '1EanavJ2OodOmq8b1GagSj8baa-KF-o4mVme_Jlwmgxc';
export const SHEETS_READONLY_SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
export const OAUTH_TOKEN_PATH = path.join(process.cwd(), 'secrets', 'google-oauth-token.json');
export const OAUTH_CLIENT_PATH = path.join(process.cwd(), 'secrets', 'google-oauth-client.json');

export function resolveSpreadsheetId() {
    return (
        process.env.HSE_GOOGLE_SPREADSHEET_ID
        || process.env.GOOGLE_SPREADSHEET_ID
        || DEFAULT_SPREADSHEET_ID
    ).trim();
}

export function loadOAuthClientConfig() {
    const id = process.env.GOOGLE_OAUTH_CLIENT_ID;
    const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
    if (id && secret) {
        return { client_id: id.trim(), client_secret: secret.trim() };
    }

    const candidates = [
        process.env.GOOGLE_OAUTH_CLIENT_JSON,
        OAUTH_CLIENT_PATH,
        path.join(process.cwd(), 'credentials', 'google-oauth-client.json')
    ].filter(Boolean);

    for (const p of candidates) {
        const resolved = path.resolve(p);
        if (!fs.existsSync(resolved)) continue;
        const raw = JSON.parse(fs.readFileSync(resolved, 'utf8'));
        const block = raw.installed || raw.web || raw;
        const client_id = block.client_id || raw.client_id;
        const client_secret = block.client_secret || raw.client_secret;
        if (client_id && client_secret) return { client_id, client_secret };
    }

    throw new Error(
        'لم يُعثر على OAuth Client. '
        + 'ضع secrets/google-oauth-client.json (Desktop app من Google Cloud) '
        + 'أو عيّن GOOGLE_OAUTH_CLIENT_ID + GOOGLE_OAUTH_CLIENT_SECRET. '
        + 'ثم: npm run sync:sheets:login'
    );
}

export function loadOAuthToken() {
    const inline = process.env.GOOGLE_OAUTH_TOKEN_JSON;
    if (inline && inline.trim().startsWith('{')) {
        return JSON.parse(inline);
    }
    const tokenPath = process.env.GOOGLE_OAUTH_TOKEN_PATH || OAUTH_TOKEN_PATH;
    if (fs.existsSync(tokenPath)) {
        return JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    }
    return null;
}

export function saveOAuthToken(tokens) {
    const dir = path.dirname(OAUTH_TOKEN_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(OAUTH_TOKEN_PATH, JSON.stringify(tokens, null, 2), 'utf8');
}

export function loadServiceAccountCredentials() {
    const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (inline && inline.trim().startsWith('{')) {
        return JSON.parse(inline);
    }

    const candidates = [
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
        process.env.HSE_GOOGLE_SERVICE_ACCOUNT_JSON,
        path.join(process.cwd(), 'secrets', 'google-service-account.json'),
        path.join(process.cwd(), 'google-service-account.json'),
        path.join(process.cwd(), 'credentials', 'google-service-account.json')
    ].filter(Boolean);

    for (const p of candidates) {
        const resolved = path.resolve(p);
        if (fs.existsSync(resolved)) {
            return JSON.parse(fs.readFileSync(resolved, 'utf8'));
        }
    }

    return null;
}

function missingCredentialsError() {
    return new Error(
        'لا صلاحية Google Sheets. اختر أحد المسارين:\n'
        + '  A) OAuth (جلسة مباشرة): secrets/google-oauth-client.json ثم npm run sync:sheets:login\n'
        + '  B) Service Account: secrets/google-service-account.json + مشاركة الجدول مع client_email (Viewer)\n'
        + '  C) متغيرات: GOOGLE_OAUTH_TOKEN_JSON أو GOOGLE_SERVICE_ACCOUNT_JSON'
    );
}

export async function createSheetsClient() {
    const token = loadOAuthToken();
    if (token) {
        try {
            const clientConfig = loadOAuthClientConfig();
            const oauth2 = new google.auth.OAuth2(
                clientConfig.client_id,
                clientConfig.client_secret
            );
            oauth2.setCredentials(token);
            oauth2.on('tokens', (fresh) => {
                if (fresh.refresh_token || token.refresh_token) {
                    saveOAuthToken({ ...token, ...fresh });
                }
            });
            return google.sheets({ version: 'v4', auth: oauth2 });
        } catch (e) {
            if (!e.message?.includes('OAuth Client')) throw e;
        }
    }

    const saCreds = loadServiceAccountCredentials();
    if (saCreds) {
        const auth = new google.auth.GoogleAuth({
            credentials: saCreds,
            scopes: [SHEETS_READONLY_SCOPE]
        });
        return google.sheets({ version: 'v4', auth });
    }

    throw missingCredentialsError();
}

export async function listSheetTabs(sheets, spreadsheetId) {
    const meta = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: 'sheets.properties.title'
    });
    return (meta.data.sheets || [])
        .map((s) => s.properties?.title)
        .filter(Boolean);
}

function normalizeCell(val) {
    if (val === null || val === undefined) return '';
    if (typeof val === 'object' && val instanceof Date) return val.toISOString();
    return String(val).trim();
}

/**
 * تحويل صفوف Sheet (صف1=rؤوس) إلى كائنات — مطابق لمنطق GAS readFromSheet
 */
export function rowsToObjects(values) {
    if (!Array.isArray(values) || values.length < 2) return [];

    const headerRow = values[0].map((h, idx) => {
        const key = normalizeCell(h);
        return key || `col_${idx + 1}`;
    });

    const out = [];
    for (let r = 1; r < values.length; r++) {
        const row = values[r];
        if (!row || row.every((c) => normalizeCell(c) === '')) continue;

        const obj = {};
        let hasData = false;
        for (let c = 0; c < headerRow.length; c++) {
            const key = headerRow[c];
            const val = row[c];
            if (val !== undefined && val !== null && normalizeCell(val) !== '') {
                hasData = true;
            }
            obj[key] = val === undefined || val === null ? '' : val;
        }
        if (hasData) out.push(obj);
    }
    return out;
}

export async function fetchSheetAsObjects(sheets, spreadsheetId, sheetTitle) {
    const range = `'${sheetTitle.replace(/'/g, "''")}'`;
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
        majorDimension: 'ROWS',
        valueRenderOption: 'UNFORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING'
    });
    const values = res.data.values || [];
    const dataRows = values.length > 1 ? values.length - 1 : 0;
    const objects = rowsToObjects(values);
    return { sheetTitle, dataRows, objects, headerCount: values[0]?.length || 0 };
}

export async function fetchMultipleSheets(sheets, spreadsheetId, sheetNames) {
    const result = {};
    const stats = {};
    for (const name of sheetNames) {
        try {
            const pack = await fetchSheetAsObjects(sheets, spreadsheetId, name);
            result[name] = pack.objects;
            stats[name] = {
                googleRows: pack.dataRows,
                imported: pack.objects.length,
                headers: pack.headerCount
            };
        } catch (err) {
            stats[name] = { error: err.message };
            result[name] = [];
        }
    }
    return { data: result, stats };
}
