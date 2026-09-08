# -*- coding: utf-8 -*-
"""Match Excel closed observations to DailyObservations for precise status sync."""
from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from datetime import date, datetime
from pathlib import Path

import openpyxl

XLSX_PATH = Path(r"C:\Users\YasserMohamed\Downloads\Safety Observation - HSE TEAM  (1).xlsx")
CSV_PATH = Path(r"C:\Users\YasserMohamed\Downloads\V.3-HSE Database - DailyObservations.csv")
OUT_DIR = Path(r"d:\Apps\2026-07\clinic-repo\scripts")
OUT_PLAN = OUT_DIR / "_obs-close-sync-plan.json"
OUT_MD = OUT_DIR / "_obs-close-sync-plan.md"
OUT_IDS = OUT_DIR / "_obs-close-sync-ids.txt"

CLOSED_EXCEL = {"closed", "مغلق", "close", "مكتمل", "closed."}
ALREADY_CLOSED_DB = {"مغلق", "closed", "مكتمل", "complete", "completed"}
MIN_DET_LEN = 12


def norm_text(s):
    s = "" if s is None else str(s)
    s = s.replace("\u0640", "")
    s = re.sub(r"\s+", " ", s).strip().lower()
    trans = str.maketrans({"أ": "ا", "إ": "ا", "آ": "ا", "ى": "ي", "ة": "ه"})
    return s.translate(trans)


def norm_details(s):
    s = norm_text(s)
    s = re.sub(r"[^\w\u0600-\u06ff ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def observer_key(name):
    n = norm_text(name)
    parts = [p for p in n.split() if len(p) >= 2]
    if not parts:
        return ""
    # مفتاح مرن: أول كلمتين
    return " ".join(parts[:2])


def parse_date(v):
    if v is None or v == "":
        return None
    if isinstance(v, datetime):
        return v.date()
    if isinstance(v, date):
        return v
    s = str(v).strip()
    head = s.split()[0] if s else s
    for fmt in ("%m/%d/%Y", "%Y-%m-%d", "%d/%m/%Y", "%Y/%m/%d", "%d-%m-%Y"):
        try:
            return datetime.strptime(head, fmt).date()
        except Exception:
            pass
    try:
        return datetime.fromisoformat(s.replace("Z", "").split(".")[0]).date()
    except Exception:
        return None


def is_closed_excel(s):
    return norm_text(s) in {norm_text(x) for x in CLOSED_EXCEL} or norm_text(s) == "closed"


def is_closed_db(s):
    t = norm_text(s)
    return any(t == norm_text(x) or t.startswith(norm_text(x)) for x in ALREADY_CLOSED_DB) or "مغلق" in t or t == "closed"


def load_excel_closed():
    wb = openpyxl.load_workbook(XLSX_PATH, read_only=True, data_only=True)
    ws = wb["ردود النموذج 1"]
    rows = list(ws.iter_rows(values_only=True))
    wb.close()
    # row0 headers, row1 often empty
    out = []
    for r in rows[2:]:
        if not r:
            continue
        status = r[8]
        if not is_closed_excel(status):
            continue
        d = parse_date(r[1])
        det = norm_details(r[3])
        if not d or len(det) < MIN_DET_LEN:
            continue
        out.append({
            "date": d.isoformat(),
            "details": det,
            "observer": observer_key(r[7]),
            "observerRaw": str(r[7] or "").strip(),
            "statusRaw": str(status or "").strip(),
        })
    return out


def load_db_csv():
    rows = []
    with CSV_PATH.open("r", encoding="utf-8-sig", errors="replace", newline="") as f:
        for row in csv.DictReader(f):
            d = parse_date(row.get("date"))
            det = norm_details(row.get("details"))
            if not d or len(det) < MIN_DET_LEN:
                continue
            rows.append({
                "id": str(row.get("id") or "").strip(),
                "date": d.isoformat(),
                "details": det,
                "observer": observer_key(row.get("observerName")),
                "observerRaw": str(row.get("observerName") or "").strip(),
                "status": str(row.get("status") or "").strip(),
            })
    return rows


def main():
    excel = load_excel_closed()
    db = load_db_csv()

    # indexes
    by_date_det = defaultdict(list)
    by_date_det_obs = defaultdict(list)
    for row in db:
        by_date_det[(row["date"], row["details"])].append(row)
        by_date_det_obs[(row["date"], row["details"], row["observer"])].append(row)

    excel_keys = set((e["date"], e["details"]) for e in excel)
    excel_keys_obs = set((e["date"], e["details"], e["observer"]) for e in excel if e["observer"])

    to_close = []  # unique ids
    already = []
    matched_excel_keys = set()
    ambiguous = []
    used_ids = set()

    # Pass 1: date + details + observer (highest precision)
    for e in excel:
        key3 = (e["date"], e["details"], e["observer"])
        hits = by_date_det_obs.get(key3) or []
        if not hits:
            continue
        matched_excel_keys.add((e["date"], e["details"]))
        if len(hits) > 8:
            ambiguous.append({"key": key3, "count": len(hits), "ids": [h["id"] for h in hits[:12]]})
        for h in hits:
            if h["id"] in used_ids:
                continue
            used_ids.add(h["id"])
            if is_closed_db(h["status"]):
                already.append(h["id"])
            else:
                to_close.append({
                    "id": h["id"],
                    "date": h["date"],
                    "observer": h["observerRaw"],
                    "oldStatus": h["status"],
                    "match": "date+details+observer",
                    "detailsPreview": h["details"][:100],
                })

    # Pass 2: date + details only for excel keys not matched in pass1
    for e in excel:
        key2 = (e["date"], e["details"])
        if key2 in matched_excel_keys:
            continue
        hits = by_date_det.get(key2) or []
        if not hits:
            continue
        matched_excel_keys.add(key2)
        if len(hits) > 8:
            ambiguous.append({"key": list(key2), "count": len(hits), "ids": [h["id"] for h in hits[:12]]})
        for h in hits:
            if h["id"] in used_ids:
                continue
            used_ids.add(h["id"])
            if is_closed_db(h["status"]):
                already.append(h["id"])
            else:
                to_close.append({
                    "id": h["id"],
                    "date": h["date"],
                    "observer": h["observerRaw"],
                    "oldStatus": h["status"],
                    "match": "date+details",
                    "detailsPreview": h["details"][:100],
                })

    unmatched_excel = len(excel_keys - matched_excel_keys)
    status_old = Counter(x["oldStatus"] for x in to_close)
    match_type = Counter(x["match"] for x in to_close)

    plan = {
        "sourceExcelClosedUsable": len(excel),
        "sourceExcelClosedUniqueKeys": len(excel_keys),
        "dbRowsUsable": len(db),
        "matchedExcelKeys": len(matched_excel_keys),
        "unmatchedExcelKeys": unmatched_excel,
        "alreadyClosedMatched": len(already),
        "toCloseCount": len(to_close),
        "toCloseIds": [x["id"] for x in to_close],
        "toCloseSample": to_close[:30],
        "oldStatusBreakdown": dict(status_old),
        "matchTypeBreakdown": dict(match_type),
        "ambiguousGroups": len(ambiguous),
        "ambiguousSample": ambiguous[:15],
        "note": "Canonical new status = مغلق. Match: date+details(+observer). Min details length=12.",
        "csvWarning": "CSV may be slightly stale vs live sheet — re-verify on live before apply.",
    }

    OUT_PLAN.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")
    OUT_IDS.write_text("\n".join(plan["toCloseIds"]), encoding="utf-8")

    md = []
    md.append("# خطة مزامنة إغلاق الملاحظات (Excel → DailyObservations)")
    md.append("")
    md.append(f"- Excel مغلق صالح للمطابقة: **{plan['sourceExcelClosedUsable']}** (مفاتيح فريدة {plan['sourceExcelClosedUniqueKeys']})")
    md.append(f"- صفوف DB صالحة: **{plan['dbRowsUsable']}**")
    md.append(f"- مفاتيح Excel طابقت: **{plan['matchedExcelKeys']}** | لم تطابق: **{plan['unmatchedExcelKeys']}**")
    md.append(f"- مطابقة ومغلقة مسبقاً: **{plan['alreadyClosedMatched']}**")
    md.append(f"- **سيُغلق الآن: {plan['toCloseCount']}**")
    md.append(f"- حالات قديمة للتحديث: `{plan['oldStatusBreakdown']}`")
    md.append(f"- نوع المطابقة: `{plan['matchTypeBreakdown']}`")
    md.append(f"- مجموعات غامضة (>8 صف لنفس المفتاح): **{plan['ambiguousGroups']}**")
    md.append("")
    md.append("## عينة للتحديث")
    for x in to_close[:15]:
        md.append(f"- `{x['id']}` | {x['date']} | {x['observer']} | {x['oldStatus']} → مغلق | {x['match']}")
        md.append(f"  - {x['detailsPreview']}")
    OUT_MD.write_text("\n".join(md), encoding="utf-8")

    print(json.dumps({
        "toCloseCount": plan["toCloseCount"],
        "alreadyClosedMatched": plan["alreadyClosedMatched"],
        "matchedExcelKeys": plan["matchedExcelKeys"],
        "unmatchedExcelKeys": plan["unmatchedExcelKeys"],
        "oldStatusBreakdown": plan["oldStatusBreakdown"],
        "matchTypeBreakdown": plan["matchTypeBreakdown"],
        "ambiguousGroups": plan["ambiguousGroups"],
        "out": str(OUT_PLAN),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
