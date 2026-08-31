#!/usr/bin/env node
/**
 * Reset user password in SQLite (local / deploy bundle)
 * Usage: node backend-sql/scripts/reset-user-password.js <email> <newPassword>
 */
'use strict';

const crypto = require('crypto');
const path = require('path');

function sha256(str) {
    return crypto.createHash('sha256').update(String(str || '')).digest('hex');
}

async function main() {
    const email = String(process.argv[2] || '').trim().toLowerCase();
    const newPassword = String(process.argv[3] || '').trim();

    if (!email || !newPassword) {
        console.error('Usage: node reset-user-password.js <email> <newPassword>');
        process.exit(1);
    }
    if (newPassword.length < 6) {
        console.error('Password must be at least 6 characters.');
        process.exit(1);
    }

    const { getDatabase } = require('../src/db/database');
    const db = getDatabase();
    const users = db.readSheet('Users');
    const user = users.find((u) => String(u.email || '').trim().toLowerCase() === email);

    if (!user) {
        console.error('User not found:', email);
        process.exit(1);
    }

    const newHash = sha256(newPassword);
    db.updateRow('Users', 'id', user.id, {
        passwordHash: newHash,
        password: '',
        updatedAt: new Date().toISOString()
    });

    console.log('OK password reset for', email, '(id:', user.id + ')');

    if (process.argv.includes('--deploy-bundle')) {
        const { execSync } = require('child_process');
        const bundleScript = path.join(__dirname, 'sync-sql-deploy-bundle.js');
        execSync(`node "${bundleScript}"`, { stdio: 'inherit', cwd: path.join(__dirname, '..', '..') });
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
