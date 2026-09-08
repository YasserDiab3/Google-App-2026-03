# -*- coding: utf-8 -*-
from pathlib import Path

ids = Path(r"d:\Apps\2026-07\clinic-repo\scripts\_obs-close-sync-ids.txt").read_text(encoding="utf-8").strip().splitlines()
arr = ",\n  ".join(f'"{i}"' for i in ids)

gs = r'''/**
 * مزامنة لمرة واحدة: إغلاق ملاحظات DailyObservations المطابقة للمغلق في Excel HSE TEAM.
 * الحالة الهدف: مغلق
 * dryRun افتراضي true — التنفيذ يتطلب confirmToken.
 */
function closeObservationsFromExcelDryRun() {
  return closeObservationsFromExcel({ dryRun: true });
}

function closeObservationsFromExcelExecute() {
  return closeObservationsFromExcel({ dryRun: false, confirmToken: 'CLOSE-EXCEL-ICAPP-2026' });
}

function closeObservationsFromExcel(payload) {
  payload = payload || {};
  var dryRun = payload.dryRun !== false;
  if (!dryRun) {
    var token = String(payload.confirmToken || '');
    if (token !== 'CLOSE-EXCEL-ICAPP-2026') {
      return { success: false, message: 'confirmToken غير صحيح — التنفيذ مرفوض' };
    }
  }

  var CLOSE_IDS = [
  __IDS__
  ];

  var lock = null;
  try {
    try {
      lock = LockService.getScriptLock();
      lock.waitLock(30000);
    } catch (e0) {}

    var sheetName = 'DailyObservations';
    var ss = SpreadsheetApp.openById(getSpreadsheetId());
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return { success: false, message: 'الورقة غير موجودة' };

    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow <= 1) return { success: false, message: 'لا بيانات' };

    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
      return h === null || h === undefined ? '' : String(h).trim();
    });
    var idCol = headers.indexOf('id');
    var statusCol = headers.indexOf('status');
    var updatedCol = headers.indexOf('updatedAt');
    if (idCol < 0 || statusCol < 0) {
      return { success: false, message: 'أعمدة id/status غير موجودة', headers: headers };
    }

    var idSet = {};
    for (var i = 0; i < CLOSE_IDS.length; i++) idSet[String(CLOSE_IDS[i])] = true;

    // ركن البداية/النهاية (متوافق مع أسلوب المشروع)
    var values = sheet.getRange(2, 1, lastRow, lastCol).getValues();
    var nowIso = new Date().toISOString();
    var found = 0;
    var alreadyClosed = 0;
    var toUpdate = [];
    var missing = [];
    var foundIds = {};

    function isClosedStatus(s) {
      var t = String(s || '').trim().toLowerCase();
      return t === 'مغلق' || t === 'closed' || t.indexOf('مغلق') >= 0 || t === 'مكتمل';
    }

    for (var r = 0; r < values.length; r++) {
      var rid = values[r][idCol] === null || values[r][idCol] === undefined ? '' : String(values[r][idCol]).trim();
      if (!rid || !idSet[rid]) continue;
      found++;
      foundIds[rid] = true;
      var oldSt = values[r][statusCol];
      if (isClosedStatus(oldSt)) {
        alreadyClosed++;
      } else {
        toUpdate.push({ row: r + 2, id: rid, oldStatus: String(oldSt || '') });
      }
    }

    for (var d = 0; d < CLOSE_IDS.length; d++) {
      if (!foundIds[String(CLOSE_IDS[d])]) missing.push(String(CLOSE_IDS[d]));
    }

    var updated = 0;
    var oldStatusBreakdown = {};
    for (var u = 0; u < toUpdate.length; u++) {
      var st = toUpdate[u].oldStatus || '(فارغ)';
      oldStatusBreakdown[st] = (oldStatusBreakdown[st] || 0) + 1;
    }

    if (!dryRun) {
      for (var x = 0; x < toUpdate.length; x++) {
        var item = toUpdate[x];
        sheet.getRange(item.row, statusCol + 1).setValue('مغلق');
        if (updatedCol >= 0) {
          sheet.getRange(item.row, updatedCol + 1).setValue(nowIso);
        }
        updated++;
        if (updated % 100 === 0) {
          SpreadsheetApp.flush();
          Utilities.sleep(150);
        }
      }
      SpreadsheetApp.flush();
      try { invalidateHseSheetCaches(sheetName); } catch (e2) {}
    }

    return {
      success: true,
      dryRun: dryRun,
      plannedIds: CLOSE_IDS.length,
      found: found,
      missing: missing.length,
      missingSample: missing.slice(0, 30),
      alreadyClosed: alreadyClosed,
      toUpdate: toUpdate.length,
      updated: updated,
      oldStatusBreakdown: oldStatusBreakdown,
      sampleToUpdate: toUpdate.slice(0, 20),
      message: dryRun
        ? ('معاينة: سيُغلق ' + toUpdate.length + ' ملاحظة (موجودة: ' + found + '، مغلقة مسبقاً: ' + alreadyClosed + '، مفقودة: ' + missing.length + ')')
        : ('تم إغلاق ' + updated + ' ملاحظة بنجاح')
    };
  } catch (err) {
    return { success: false, message: String(err && err.message || err) };
  } finally {
    try { if (lock) lock.releaseLock(); } catch (e3) {}
  }
}
'''

out = Path(r"d:\Apps\2026-07\clinic-repo\Backend\_CloseObsFromExcel.gs")
out.write_text(gs.replace("__IDS__", arr), encoding="utf-8")
print("wrote", out, "bytes", out.stat().st_size, "ids", len(ids))
