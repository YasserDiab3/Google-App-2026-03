/**
 * PPE — قائمة الأصناف + حفظ استلام (توافق GAS)
 */
'use strict';

const { getDatabase } = require('../db/database');
const { checkAuthenticatedActor } = require('../middleware/auth-guard');

function getPPEItemsList() {
    const db = getDatabase();
    const stockData = db.readSheet('PPE_Stock') || [];
    let ppeData = [];
    try {
        ppeData = db.readSheet('PPE') || [];
    } catch (_) { /* ignore */ }

    const items = [];
    const seenNames = {};

    for (const item of stockData) {
        const itemName = String(item.itemName || '').trim();
        if (!itemName || seenNames[itemName]) continue;
        seenNames[itemName] = true;
        items.push({
            itemId: item.itemId || null,
            itemCode: item.itemCode || '',
            itemName,
            category: item.category || ''
        });
    }

    for (const item of ppeData) {
        const type = String(item.equipmentType || '').trim();
        if (!type || seenNames[type]) continue;
        seenNames[type] = true;
        items.push({
            itemId: null,
            itemCode: '',
            itemName: type,
            category: ''
        });
    }

    items.sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || ''), 'ar'));
    return { success: true, data: items };
}

function upsertPpeRow(row) {
    const db = getDatabase();
    if (!row.id) {
        row.id = `PPE_${Date.now()}`;
    }
    row.updatedAt = new Date().toISOString();
    row.createdAt = row.createdAt || row.updatedAt;
    const existing = db.readFromSheet('PPE', { id: row.id });
    if (existing && existing.length > 0) {
        db.updateRow('PPE', 'id', row.id, row);
        return { success: true, message: 'تم تحديث الاستلام بنجاح', id: row.id, data: row, updated: true };
    }
    db.insertRow('PPE', row);
    return { success: true, message: 'تم حفظ الاستلام بنجاح', id: row.id, data: row, inserted: true };
}

const ppeHandlers = {
    getPPEItemsList() {
        return getPPEItemsList();
    },

    getAllPPE(payload) {
        const db = getDatabase();
        let records = db.readSheet('PPE') || [];
        const filters = payload?.filters || payload || {};
        if (filters.employeeCode) {
            const code = String(filters.employeeCode).trim().toLowerCase();
            records = records.filter((r) => {
                const c = String(r.employeeCode || r.employeeNumber || '').trim().toLowerCase();
                return c === code;
            });
        }
        return { success: true, data: records, count: records.length };
    },

    addPPE(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;
        const row = payload?.data || payload || {};
        if (!row || typeof row !== 'object' || Object.keys(row).length === 0) {
            return { success: false, message: 'بيانات الاستلام مطلوبة' };
        }
        return upsertPpeRow({ ...row });
    },

    updatePPE(payload, postData, action, actorUserData) {
        const gate = checkAuthenticatedActor(actorUserData, action);
        if (!gate.ok) return gate;
        const id = payload?.ppeId || payload?.id || payload?.updateData?.id;
        const updateData = payload?.updateData || payload?.data || payload || {};
        if (!id) {
            return { success: false, message: 'معرف الاستلام مطلوب' };
        }
        return upsertPpeRow({ ...updateData, id: String(id) });
    }
};

module.exports = ppeHandlers;
