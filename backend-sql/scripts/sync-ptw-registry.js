#!/usr/bin/env node
/**
 * مطابقة PTW ↔ PTWRegistry: نفس العدد ونفس التصاريح
 *   node backend-sql/scripts/sync-ptw-registry.js
 *   node backend-sql/scripts/sync-ptw-registry.js --deploy-bundle
 */
'use strict';

const path = require('path');
const { permitToRegistry, registryToPermit, firstFilled } = require('../src/db/ptw-registry-map');

function openDb() {
    const dbPath = path.join(__dirname, '../data/clinic_hse.db');
    process.env.SQLITE_PATH = dbPath;
    const dbMod = require('../src/db/database');
    dbMod.dbInstance = null;
    return dbMod.initDatabase(dbPath);
}

function nextRegistryId(existingIds, seq) {
    const padded = String(seq).padStart(4, '0');
    let candidate = `REG_${padded}`;
    let i = 0;
    while (existingIds.has(candidate)) {
        i++;
        candidate = `REG_${padded}_${i}`;
    }
    existingIds.add(candidate);
    return candidate;
}

function main() {
    const deployBundle = process.argv.includes('--deploy-bundle');
    const db = openDb();
    const ptwRows = db.readSheet('PTW') || [];
    const regRows = db.readSheet('PTWRegistry') || [];

    console.log(`قبل: PTW=${ptwRows.length} | PTWRegistry=${regRows.length}`);

    const ptwById = new Map();
    for (const row of ptwRows) {
        const id = String(row.id || '').trim();
        if (!id) continue;
        if (!ptwById.has(id)) ptwById.set(id, row);
    }

    const regByPermit = new Map();
    const regIds = new Set();
    let maxSeq = 0;
    for (const row of regRows) {
        const permitId = String(row.permitId || '').trim();
        const rid = String(row.id || '').trim();
        if (rid) regIds.add(rid);
        const seqN = parseInt(String(row.sequentialNumber || '').replace(/\D/g, ''), 10);
        if (Number.isFinite(seqN) && seqN > maxSeq) maxSeq = seqN;
        if (!permitId) continue;
        if (!regByPermit.has(permitId)) regByPermit.set(permitId, row);
    }

    const permitIds = new Set([...ptwById.keys(), ...regByPermit.keys()]);
    const outPtw = [];
    const outReg = [];

    for (const permitId of permitIds) {
        const ptw = ptwById.get(permitId) || null;
        const reg = regByPermit.get(permitId) || null;
        const mergedPtw = registryToPermit(reg || {}, ptw || { id: permitId });
        mergedPtw.id = permitId;

        let mergedReg = permitToRegistry(mergedPtw, reg || {});
        mergedReg.permitId = permitId;
        if (!String(mergedReg.id || '').trim()) {
            maxSeq += 1;
            if (!mergedReg.sequentialNumber) mergedReg.sequentialNumber = String(maxSeq);
            mergedReg.id = nextRegistryId(regIds, mergedReg.sequentialNumber || maxSeq);
        }
        if (!String(mergedReg.sequentialNumber || '').trim()) {
            maxSeq += 1;
            mergedReg.sequentialNumber = String(maxSeq);
        }
        if (!String(mergedPtw.sequentialNumber || '').trim()) {
            mergedPtw.sequentialNumber = mergedReg.sequentialNumber;
        }

        outPtw.push(mergedPtw);
        outReg.push(mergedReg);
    }

    outPtw.sort((a, b) => String(a.id).localeCompare(String(b.id), 'en', { numeric: true }));
    outReg.sort((a, b) => {
        const sa = parseInt(String(a.sequentialNumber || '').replace(/\D/g, ''), 10) || 0;
        const sb = parseInt(String(b.sequentialNumber || '').replace(/\D/g, ''), 10) || 0;
        if (sa !== sb) return sa - sb;
        return String(a.permitId).localeCompare(String(b.permitId), 'en', { numeric: true });
    });

    db.saveToSheet('PTW', outPtw);
    db.saveToSheet('PTWRegistry', outReg);
    try { db.exec('PRAGMA wal_checkpoint(FULL);'); } catch (_) {}

    const ptwAfter = db.readSheet('PTW') || [];
    const regAfter = db.readSheet('PTWRegistry') || [];
    const ptwIds = new Set(ptwAfter.map((r) => String(r.id || '').trim()).filter(Boolean));
    const regPermits = new Set(regAfter.map((r) => String(r.permitId || '').trim()).filter(Boolean));
    let missingPtw = 0;
    let missingReg = 0;
    for (const id of ptwIds) if (!regPermits.has(id)) missingReg++;
    for (const id of regPermits) if (!ptwIds.has(id)) missingPtw++;

    console.log(`بعد: PTW=${ptwAfter.length} | PTWRegistry=${regAfter.length}`);
    console.log(`فريد PTW.id=${ptwIds.size} | فريد Registry.permitId=${regPermits.size}`);
    console.log(`PTW بلا سجل=${missingReg} | سجل بلا PTW=${missingPtw}`);
    console.log(`مضاف من السجل إلى PTW=${permitIds.size - ptwById.size} | مضاف من PTW إلى السجل=${permitIds.size - regByPermit.size} | حذف تكرار PTW=${ptwRows.length - ptwById.size}`);

    if (ptwAfter.length !== regAfter.length || missingReg || missingPtw) {
        throw new Error('المطابقة فشلت — العدد أو الربط غير مكتمل');
    }
    console.log('✅ PTW و PTWRegistry مطابقان');

    if (deployBundle) {
        require('child_process').execFileSync(process.execPath, [
            path.join(__dirname, 'sync-sql-deploy-bundle.js')
        ], { stdio: 'inherit' });
    }
}

main();
