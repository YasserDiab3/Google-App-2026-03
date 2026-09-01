/**
 * QA: getProfileImage inline dataUri for PPT export
 */
'use strict';

const assert = require('assert');
const { getProfileImage, ensureAttachmentsTable } = require('../src/handlers/file-handlers');
const { getDatabase } = require('../src/db/database');

function tinyJpegBuffer() {
    const buf = Buffer.alloc(32, 0);
    buf[0] = 0xff;
    buf[1] = 0xd8;
    buf[2] = 0xff;
    buf[3] = 0xd9;
    return buf;
}

async function runProfileImageInlineTests() {
    console.log('🖼️  Starting Profile Image Inline Tests...\n');
    let passed = 0;
    let total = 0;

    async function test(name, fn) {
        total++;
        try {
            await fn();
            console.log(`  ✓ PASS: ${name}`);
            passed++;
        } catch (err) {
            console.error(`  ❌ FAIL: ${name}`);
            console.error(`     Error: ${err.message}`);
        }
    }

    await test('empty query is rejected', async () => {
        const res = await getProfileImage({});
        assert.strictEqual(res.success, false);
        assert.ok(res.message);
    });

    await test('localhost URL is rejected (SSRF)', async () => {
        const res = await getProfileImage({ url: 'http://127.0.0.1/secret.png' });
        assert.strictEqual(res.success, false);
    });

    await test('non-allowlisted https URL is rejected', async () => {
        const res = await getProfileImage({ url: 'https://evil.example/x.png' });
        assert.strictEqual(res.success, false);
    });

    await test('FILE_ missing returns not found', async () => {
        const res = await getProfileImage({ id: 'FILE_missing_qa_xyz', inline: '1' });
        assert.strictEqual(res.success, false);
    });

    await test('SQL jpeg + inline=1 returns dataUri', async () => {
        const db = getDatabase();
        ensureAttachmentsTable(db);
        const id = `FILE_QA_${Date.now()}`;
        const b64 = tinyJpegBuffer().toString('base64');
        db.run(
            `INSERT INTO "FileAttachments" ("id", "moduleName", "fileName", "mimeType", "dataBase64", "publicUrl", "createdAt") VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, 'DailyObservations', 'qa.jpg', 'image/jpeg', b64, '', new Date().toISOString()]
        );
        const res = await getProfileImage({ id, inline: '1' });
        assert.strictEqual(res.success, true);
        assert.ok(String(res.dataUri || '').startsWith('data:image/jpeg;base64,'));
        assert.ok(res.dataUri.length > 40);
        db.run(`DELETE FROM "FileAttachments" WHERE "id" = ?`, [id]);
    });

    await test('without inline, SQL jpeg still returns dataUri when no publicUrl', async () => {
        const db = getDatabase();
        ensureAttachmentsTable(db);
        const id = `FILE_QA2_${Date.now()}`;
        const b64 = tinyJpegBuffer().toString('base64');
        db.run(
            `INSERT INTO "FileAttachments" ("id", "moduleName", "fileName", "mimeType", "dataBase64", "publicUrl", "createdAt") VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, 'DailyObservations', 'qa2.jpg', 'image/jpeg', b64, '', new Date().toISOString()]
        );
        const res = await getProfileImage({ id });
        assert.strictEqual(res.success, true);
        assert.ok(String(res.dataUri || '').startsWith('data:image/'));
        db.run(`DELETE FROM "FileAttachments" WHERE "id" = ?`, [id]);
    });

    console.log(`\n====================================================`);
    console.log(`Profile Image Inline Summary: ${passed}/${total} Passed`);
    console.log(`====================================================\n`);
    if (passed !== total) {
        throw new Error(`Profile image inline tests failed: ${passed}/${total}`);
    }
}

if (require.main === module) {
    runProfileImageInlineTests().catch((err) => {
        console.error(err.message || err);
        process.exit(1);
    });
}

module.exports = { runProfileImageInlineTests };
