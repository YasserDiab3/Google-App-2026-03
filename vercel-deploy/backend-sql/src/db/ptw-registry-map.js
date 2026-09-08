/**
 * مطابقة صف PTW ↔ PTWRegistry (نفس التصريح، حقول كل جدول)
 */
'use strict';

const { headersMap } = require('./headers-schema');

function asText(val) {
    if (val === undefined || val === null) return '';
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (Array.isArray(val)) return val.filter(Boolean).join('، ');
    if (typeof val === 'object') {
        try { return JSON.stringify(val); } catch (_) { return ''; }
    }
    return String(val).trim();
}

function firstFilled(...vals) {
    for (const v of vals) {
        const t = asText(v);
        if (t && t !== 'undefined' && t !== 'null' && t !== '-') return typeof v === 'object' && !Array.isArray(v) ? v : t;
    }
    return '';
}

function pickKnown(sheetName, row) {
    const cols = headersMap[sheetName] || Object.keys(row || {});
    const out = {};
    for (const col of cols) {
        if (row && Object.prototype.hasOwnProperty.call(row, col)) out[col] = row[col];
    }
    return out;
}

function permitToRegistry(permit, existing) {
    const p = permit || {};
    const e = existing || {};
    const permitId = firstFilled(p.id, p.permitId, e.permitId);
    const permitType = firstFilled(p.workType, p.permitType, e.permitType);
    const permitTypeDisplay = firstFilled(p.permitTypeDisplay, permitType, e.permitTypeDisplay);
    const location = firstFilled(p.siteName, p.location, e.location);
    const locationId = firstFilled(p.siteId, p.locationId, e.locationId);
    const sublocation = firstFilled(p.sublocationName, p.sublocation, e.sublocation);
    const openDate = firstFilled(p.startDate, p.openDate, p.createdAt, e.openDate, e.timeFrom);
    const timeTo = firstFilled(p.endDate, p.timeTo, e.timeTo);
    return pickKnown('PTWRegistry', {
        ...e,
        id: firstFilled(e.id, p.registryId),
        sequentialNumber: firstFilled(e.sequentialNumber, p.sequentialNumber),
        permitId,
        permitType,
        permitTypeDisplay,
        locationId,
        sublocationId: firstFilled(p.sublocationId, e.sublocationId),
        openDate,
        requestingParty: firstFilled(p.requestingParty, e.requestingParty),
        location,
        sublocation,
        timeFrom: firstFilled(p.startDate, p.timeFrom, e.timeFrom, openDate),
        timeTo,
        totalTime: firstFilled(p.totalTime, e.totalTime),
        authorizedParty: firstFilled(p.authorizedParty, e.authorizedParty),
        workDescription: firstFilled(p.workDescription, e.workDescription),
        supervisor1: firstFilled(p.supervisor1, e.supervisor1),
        supervisor2: firstFilled(p.supervisor2, e.supervisor2),
        status: firstFilled(p.status, e.status),
        closureDate: firstFilled(p.closureDate, p.closureTime, e.closureDate),
        closureReason: firstFilled(p.closureReason, e.closureReason),
        createdAt: firstFilled(e.createdAt, p.createdAt),
        updatedAt: firstFilled(p.updatedAt, e.updatedAt),
        paperPermitNumber: firstFilled(p.paperPermitNumber, e.paperPermitNumber),
        equipment: firstFilled(p.equipment, e.equipment),
        tools: firstFilled(p.tools, e.tools),
        toolsList: firstFilled(p.toolsList, e.toolsList),
        teamMembersText: firstFilled(p.teamMembersText, p.teamMembers, e.teamMembersText),
        hotWorkDetails: firstFilled(p.hotWorkDetails, e.hotWorkDetails),
        hotWorkOther: firstFilled(p.hotWorkOther, e.hotWorkOther),
        confinedSpaceDetails: firstFilled(p.confinedSpaceDetails, e.confinedSpaceDetails),
        confinedSpaceOther: firstFilled(p.confinedSpaceOther, e.confinedSpaceOther),
        heightWorkDetails: firstFilled(p.heightWorkDetails, e.heightWorkDetails),
        heightWorkOther: firstFilled(p.heightWorkOther, e.heightWorkOther),
        electricalWorkType: firstFilled(p.electricalWorkType, e.electricalWorkType),
        coldWorkType: firstFilled(p.coldWorkType, e.coldWorkType),
        otherWorkType: firstFilled(p.otherWorkType, e.otherWorkType),
        excavationLength: firstFilled(p.excavationLength, e.excavationLength),
        excavationWidth: firstFilled(p.excavationWidth, e.excavationWidth),
        excavationDepth: firstFilled(p.excavationDepth, e.excavationDepth),
        soilType: firstFilled(p.soilType, e.soilType),
        preStartChecklist: firstFilled(p.preStartChecklist, e.preStartChecklist),
        lotoApplied: firstFilled(p.lotoApplied, e.lotoApplied),
        governmentPermits: firstFilled(p.governmentPermits, e.governmentPermits),
        riskAssessmentAttached: firstFilled(p.riskAssessmentAttached, e.riskAssessmentAttached),
        gasTesting: firstFilled(p.gasTesting, e.gasTesting),
        mocRequest: firstFilled(p.mocRequest, e.mocRequest),
        ppeNotes: firstFilled(p.ppeNotes, e.ppeNotes),
        requiredPPE: firstFilled(p.requiredPPE, e.requiredPPE),
        riskLikelihood: firstFilled(p.riskLikelihood, e.riskLikelihood),
        riskConsequence: firstFilled(p.riskConsequence, e.riskConsequence),
        riskScore: firstFilled(p.riskScore, e.riskScore),
        riskLevel: firstFilled(p.riskLevel, e.riskLevel),
        riskNotes: firstFilled(p.riskNotes, e.riskNotes),
        manualApprovalsText: firstFilled(p.manualApprovalsText, e.manualApprovalsText),
        manualClosureApprovalsText: firstFilled(p.manualClosureApprovalsText, e.manualClosureApprovalsText),
        isManualEntry: firstFilled(p.isManualEntry, e.isManualEntry),
        approvalCircuitOwnerId: firstFilled(p.approvalCircuitOwnerId, e.approvalCircuitOwnerId),
        approvalCircuitName: firstFilled(p.approvalCircuitName, e.approvalCircuitName),
        skipApprovalFlow: firstFilled(p.skipApprovalFlow, e.skipApprovalFlow),
        createdBy: firstFilled(p.createdBy, e.createdBy),
        createdById: firstFilled(p.createdById, e.createdById),
        updatedBy: firstFilled(p.updatedBy, e.updatedBy),
        updatedById: firstFilled(p.updatedById, e.updatedById)
    });
}

function registryToPermit(reg, existing) {
    const r = reg || {};
    const e = existing || {};
    const id = firstFilled(e.id, r.permitId, r.id);
    return pickKnown('PTW', {
        ...e,
        id,
        workType: firstFilled(e.workType, r.permitType, r.permitTypeDisplay),
        siteId: firstFilled(e.siteId, r.locationId),
        siteName: firstFilled(e.siteName, r.location),
        sublocationId: firstFilled(e.sublocationId, r.sublocationId),
        sublocationName: firstFilled(e.sublocationName, r.sublocation),
        electricalWorkType: firstFilled(e.electricalWorkType, r.electricalWorkType),
        coldWorkType: firstFilled(e.coldWorkType, r.coldWorkType),
        otherWorkType: firstFilled(e.otherWorkType, r.otherWorkType),
        excavationWidth: firstFilled(e.excavationWidth, r.excavationWidth),
        soilType: firstFilled(e.soilType, r.soilType),
        approvalCircuitOwnerId: firstFilled(e.approvalCircuitOwnerId, r.approvalCircuitOwnerId),
        approvalCircuitName: firstFilled(e.approvalCircuitName, r.approvalCircuitName),
        workDescription: firstFilled(e.workDescription, r.workDescription),
        location: firstFilled(e.location, r.location, e.siteName),
        sublocation: firstFilled(e.sublocation, r.sublocation),
        startDate: firstFilled(e.startDate, r.openDate, r.timeFrom),
        endDate: firstFilled(e.endDate, r.timeTo),
        status: firstFilled(e.status, r.status),
        approvals: e.approvals || '',
        requiredPPE: firstFilled(e.requiredPPE, r.requiredPPE),
        riskAssessment: e.riskAssessment || '',
        riskNotes: firstFilled(e.riskNotes, r.riskNotes),
        authorizedParty: firstFilled(e.authorizedParty, r.authorizedParty),
        requestingParty: firstFilled(e.requestingParty, r.requestingParty),
        equipment: firstFilled(e.equipment, r.equipment),
        tools: firstFilled(e.tools, r.tools),
        toolsList: firstFilled(e.toolsList, r.toolsList),
        teamMembers: firstFilled(e.teamMembers, r.teamMembersText),
        hotWorkDetails: firstFilled(e.hotWorkDetails, r.hotWorkDetails),
        hotWorkOther: firstFilled(e.hotWorkOther, r.hotWorkOther),
        confinedSpaceDetails: firstFilled(e.confinedSpaceDetails, r.confinedSpaceDetails),
        confinedSpaceOther: firstFilled(e.confinedSpaceOther, r.confinedSpaceOther),
        heightWorkDetails: firstFilled(e.heightWorkDetails, r.heightWorkDetails),
        heightWorkOther: firstFilled(e.heightWorkOther, r.heightWorkOther),
        excavationLength: firstFilled(e.excavationLength, r.excavationLength),
        excavationDepth: firstFilled(e.excavationDepth, r.excavationDepth),
        preStartChecklist: firstFilled(e.preStartChecklist, r.preStartChecklist),
        lotoApplied: firstFilled(e.lotoApplied, r.lotoApplied),
        governmentPermits: firstFilled(e.governmentPermits, r.governmentPermits),
        riskAssessmentAttached: firstFilled(e.riskAssessmentAttached, r.riskAssessmentAttached),
        gasTesting: firstFilled(e.gasTesting, r.gasTesting),
        mocRequest: firstFilled(e.mocRequest, r.mocRequest),
        closureStatus: firstFilled(e.closureStatus, r.status),
        closureTime: firstFilled(e.closureTime, r.closureDate),
        closureReason: firstFilled(e.closureReason, r.closureReason),
        createdAt: firstFilled(e.createdAt, r.createdAt),
        updatedAt: firstFilled(e.updatedAt, r.updatedAt),
        isManualEntry: firstFilled(e.isManualEntry, r.isManualEntry),
        closureApproval: e.closureApproval || '',
        approvedAt: e.approvedAt || '',
        department: e.department || '',
        responsible: e.responsible || '',
        skipApprovalFlow: firstFilled(e.skipApprovalFlow, r.skipApprovalFlow),
        paperPermitNumber: firstFilled(e.paperPermitNumber, r.paperPermitNumber),
        teamMembersText: firstFilled(e.teamMembersText, r.teamMembersText),
        ppeNotes: firstFilled(e.ppeNotes, r.ppeNotes),
        riskLikelihood: firstFilled(e.riskLikelihood, r.riskLikelihood),
        riskConsequence: firstFilled(e.riskConsequence, r.riskConsequence),
        riskScore: firstFilled(e.riskScore, r.riskScore),
        riskLevel: firstFilled(e.riskLevel, r.riskLevel),
        manualApprovals: e.manualApprovals || '',
        manualApprovalsText: firstFilled(e.manualApprovalsText, r.manualApprovalsText),
        manualClosureApprovals: e.manualClosureApprovals || '',
        manualClosureApprovalsText: firstFilled(e.manualClosureApprovalsText, r.manualClosureApprovalsText),
        closureDate: firstFilled(e.closureDate, r.closureDate),
        supervisor1: firstFilled(e.supervisor1, r.supervisor1),
        supervisor2: firstFilled(e.supervisor2, r.supervisor2),
        sequentialNumber: firstFilled(e.sequentialNumber, r.sequentialNumber),
        createdById: firstFilled(e.createdById, r.createdById),
        updatedById: firstFilled(e.updatedById, r.updatedById),
        createdBy: firstFilled(e.createdBy, r.createdBy),
        updatedBy: firstFilled(e.updatedBy, r.updatedBy)
    });
}

module.exports = {
    asText,
    firstFilled,
    pickKnown,
    permitToRegistry,
    registryToPermit
};
