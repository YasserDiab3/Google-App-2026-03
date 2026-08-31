/**
 * Hybrid Dual-Write Background Mirror Sync
 * Mirrors all SQL write mutations asynchronously to Google Sheets in the background without blocking users.
 */
'use strict';

const GAS_BACKUP_URL = process.env.GAS_BACKUP_URL || 'https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec';

// Actions that mutate state and should be mirrored to Google Sheets
const MUTATION_ACTIONS = new Set([
    'saveClinicVisit', 'deleteClinicVisit', 'saveClinicContractorVisit',
    'savePTW', 'closePTW', 'approvePTW', 'rejectPTW', 'savePTWClosureApproval',
    'saveNearMiss', 'saveIncident', 'savePublicObservation', 'saveDailyObservation',
    'appendToSheet', 'saveToSheet', 'updateRow', 'deleteRow',
    'saveBehaviorMonitoring', 'savePPE', 'saveViolation', 'saveInspection',
    'registerUser', 'updateUser', 'saveEquipment', 'saveSafetyTeamMember',
    'saveEmergencyNumber', 'saveWasteRecord'
]);

/**
 * Dispatches an asynchronous fire-and-forget mirror request to Google Apps Script.
 */
function dispatchBackgroundMirror(action, payload = {}, actorUserData = null, postData = {}) {
    if (!MUTATION_ACTIONS.has(action) && !action.startsWith('save') && !action.startsWith('update') && !action.startsWith('delete') && !action.startsWith('add')) {
        return;
    }

    if (!GAS_BACKUP_URL || !GAS_BACKUP_URL.startsWith('http')) {
        return;
    }

    // Run asynchronously outside current execution tick
    setImmediate(async () => {
        try {
            const mirrorPayload = {
                action: action,
                data: payload?.data !== undefined ? payload.data : (postData?.data !== undefined ? postData.data : payload),
                id: payload?.id || postData?.id,
                sheetName: payload?.sheetName || postData?.sheetName,
                actorUserData: actorUserData || { role: 'admin', isAdmin: true, name: 'Hybrid Mirror Worker' },
                _isHybridMirror: true,
                _timestamp: new Date().toISOString()
            };

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const res = await fetch(GAS_BACKUP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(mirrorPayload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            if (res.ok) {
                // Background mirror success
            }
        } catch (err) {
            // Silently suppress background mirror errors so SQL remains unaffected
            console.warn(`[Hybrid Mirror Notice] Background sync for action "${action}" postponed/skipped:`, err.message);
        }
    });
}

module.exports = {
    dispatchBackgroundMirror,
    GAS_BACKUP_URL
};
