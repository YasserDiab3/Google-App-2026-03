# -*- coding: utf-8 -*-
"""Deep compare: CSV full name vs XLSX short name محمد سعيد."""
import csv
import json
import re
from collections import Counter, defaultdict
from datetime import datetime, date
from pathlib import Path

import openpyxl

CSV_PATH = Path(r"C:\Users\YasserMohamed\Downloads\V.3-HSE Database - DailyObservations.csv")
XLSX_PATH = Path(r"C:\Users\YasserMohamed\Downloads\Safety Observation - HSE TEAM  (1).xlsx")
OUT_JSON = Path(r"d:\Apps\2026-07\clinic-repo\scripts\_obs-compare-mohamed-saeed.json")
OUT_MD = Path(r"d:\Apps\2026-07\clinic-repo\scripts\_obs-compare-mohamed-saeed.md")


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
    return s[:180]


def parse_date(v):
    if v is None or v == "":
        return None
    if isinstance(v, datetime):
        return v.date()
    if isinstance(v, date):
        return v
    s = str(v).strip()
    # CSV V3 غالباً M/D/YYYY أو M/D/YYYY H:MM:SS — جرّب الأمريكي أولاً
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


def is_csv_person(name):
    n = norm_text(name)
    return ("محمد" in n and "سعيد" in n and ("شرف" in n or "حسن" in n)) or n.replace(" ", "") == "محمدسعيدحسنمحمدشرف"


def is_xlsx_person(name):
    n = norm_text(name).strip()
    # Exact short form used in form sheet
    if n == "محمد سعيد":
        return True
    # Also accept full name if present
    return is_csv_person(name)


def main():
    # CSV
    csv_rows = []
    with CSV_PATH.open("r", encoding="utf-8-sig", errors="replace", newline="") as f:
        for row in csv.DictReader(f):
            if is_csv_person(row.get("observerName") or ""):
                d = parse_date(row.get("date"))
                csv_rows.append({
                    "id": row.get("id") or "",
                    "date": d.isoformat() if d else "",
                    "shift": (row.get("shift") or "").strip(),
                    "site": (row.get("siteName") or "").strip(),
                    "place": (row.get("locationName") or "").strip(),
                    "type": (row.get("observationType") or "").strip(),
                    "status": (row.get("status") or "").strip(),
                    "risk": (row.get("riskLevel") or "").strip(),
                    "details": (row.get("details") or "").strip(),
                    "action": (row.get("correctiveAction") or "").strip(),
                    "observer": (row.get("observerName") or "").strip(),
                    "details_key": norm_details(row.get("details")),
                })

    # XLSX main form sheet
    wb = openpyxl.load_workbook(XLSX_PATH, read_only=True, data_only=True)
    ws = wb["ردود النموذج 1"]
    it = ws.iter_rows(values_only=True)
    header = [str(h).strip() if h is not None else f"c{i}" for i, h in enumerate(next(it))]
    # map by exact header names (with possible trailing spaces in original - we stripped)
    # From inspection:
    # 1 date, 2 shift, 3 details, 4 action, 6 risk, 7 observer, 8 status, 10 type, 13 site
    xlsx_rows = []
    for ridx, row in enumerate(it, start=2):
        vals = list(row) + [None] * 20
        observer = "" if vals[7] is None else str(vals[7]).strip()
        if not is_xlsx_person(observer):
            continue
        d = parse_date(vals[1])
        details = "" if vals[3] is None else str(vals[3]).strip()
        xlsx_rows.append({
            "row": ridx,
            "date": d.isoformat() if d else "",
            "shift": "" if vals[2] is None else str(vals[2]).strip(),
            "site": "" if vals[13] is None else str(vals[13]).strip(),
            "type": "" if vals[10] is None else str(vals[10]).strip(),
            "status": "" if vals[8] is None else str(vals[8]).strip(),
            "risk": "" if vals[6] is None else str(vals[6]).strip(),
            "details": details,
            "action": "" if vals[4] is None else str(vals[4]).strip(),
            "observer": observer,
            "details_key": norm_details(details),
            "timestamp": "" if vals[0] is None else str(vals[0]),
        })
    wb.close()

    # Match by date + details_key (primary), fallback date+shift+site
    xlsx_used = set()
    matched = []
    csv_only = []

    # index xlsx by date
    xlsx_by_date = defaultdict(list)
    for i, r in enumerate(xlsx_rows):
        xlsx_by_date[r["date"]].append(i)

    for c in csv_rows:
        candidates = xlsx_by_date.get(c["date"], [])
        found = None
        # 1) exact details key
        for i in candidates:
            if i in xlsx_used:
                continue
            if c["details_key"] and c["details_key"] == xlsx_rows[i]["details_key"]:
                found = i
                break
        # 2) details containment
        if found is None and c["details_key"]:
            for i in candidates:
                if i in xlsx_used:
                    continue
                xd = xlsx_rows[i]["details_key"]
                if not xd:
                    continue
                if c["details_key"] in xd or xd in c["details_key"]:
                    found = i
                    break
        # 3) same date+shift+type weak
        if found is None:
            for i in candidates:
                if i in xlsx_used:
                    continue
                x = xlsx_rows[i]
                if c["shift"] and x["shift"] and c["shift"] == x["shift"] and c["type"] and x["type"] and c["type"] == x["type"]:
                    # only if unique-ish details empty both
                    if not c["details_key"] and not x["details_key"]:
                        found = i
                        break
        if found is not None:
            xlsx_used.add(found)
            matched.append({"csv": c, "xlsx": xlsx_rows[found]})
        else:
            csv_only.append(c)

    xlsx_only = [xlsx_rows[i] for i in range(len(xlsx_rows)) if i not in xlsx_used]

    def span(rows):
        dates = sorted(r["date"] for r in rows if r["date"])
        return (dates[0] if dates else None, dates[-1] if dates else None, len(set(dates)))

    csv_span = span(csv_rows)
    xlsx_span = span(xlsx_rows)

    summary = {
        "person_csv": "محمد سعيد حسن محمد شرف",
        "person_xlsx": "محمد سعيد",
        "csv_total": len(csv_rows),
        "xlsx_total": len(xlsx_rows),
        "matched": len(matched),
        "csv_only": len(csv_only),
        "xlsx_only": len(xlsx_only),
        "csv_date_min": csv_span[0],
        "csv_date_max": csv_span[1],
        "csv_unique_dates": csv_span[2],
        "xlsx_date_min": xlsx_span[0],
        "xlsx_date_max": xlsx_span[1],
        "xlsx_unique_dates": xlsx_span[2],
        "csv_status": dict(Counter(r["status"] for r in csv_rows)),
        "xlsx_status": dict(Counter(r["status"] for r in xlsx_rows)),
        "csv_sites": dict(Counter(r["site"] for r in csv_rows)),
        "xlsx_sites": dict(Counter(r["site"] for r in xlsx_rows)),
        "csv_types": dict(Counter(r["type"] for r in csv_rows)),
        "xlsx_types": dict(Counter(r["type"] for r in xlsx_rows)),
        "csv_only_sample": csv_only[:30],
        "xlsx_only_sample": xlsx_only[:30],
        "matched_sample": [
            {
                "date": m["csv"]["date"],
                "csv_id": m["csv"]["id"],
                "csv_status": m["csv"]["status"],
                "xlsx_status": m["xlsx"]["status"],
                "xlsx_row": m["xlsx"]["row"],
                "details": (m["csv"]["details"] or m["xlsx"]["details"])[:120],
            }
            for m in matched[:30]
        ],
        "status_mismatch": [
            {
                "date": m["csv"]["date"],
                "csv_id": m["csv"]["id"],
                "xlsx_row": m["xlsx"]["row"],
                "csv_status": m["csv"]["status"],
                "xlsx_status": m["xlsx"]["status"],
                "details": (m["csv"]["details"] or "")[:100],
            }
            for m in matched
            if (m["csv"]["status"] or "").strip() != (m["xlsx"]["status"] or "").strip()
        ][:50],
    }

    OUT_JSON.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = []
    lines.append("# مراجعة ملاحظات محمد سعيد بين CSV و Excel")
    lines.append("")
    lines.append(f"- اسم في قاعدة V3 (CSV): **محمد سعيد حسن محمد شرف**")
    lines.append(f"- اسم في شيت الفريق (Excel): **محمد سعيد**")
    lines.append("")
    lines.append("## الأعداد")
    lines.append(f"| المصدر | العدد | من تاريخ | إلى تاريخ | أيام فريدة |")
    lines.append(f"|---|---:|---|---|---:|")
    lines.append(f"| CSV DailyObservations | {summary['csv_total']} | {summary['csv_date_min']} | {summary['csv_date_max']} | {summary['csv_unique_dates']} |")
    lines.append(f"| Excel ردود النموذج 1 | {summary['xlsx_total']} | {summary['xlsx_date_min']} | {summary['xlsx_date_max']} | {summary['xlsx_unique_dates']} |")
    lines.append("")
    lines.append("## المطابقة (تاريخ + نص الملاحظة)")
    lines.append(f"- متطابق: **{summary['matched']}**")
    lines.append(f"- موجود في CSV فقط: **{summary['csv_only']}**")
    lines.append(f"- موجود في Excel فقط: **{summary['xlsx_only']}**")
    lines.append(f"- متطابق مع اختلاف الحالة: **{len(summary['status_mismatch'])}** (عينة حتى 50)")
    lines.append("")
    lines.append("## الحالات")
    lines.append(f"- CSV: `{summary['csv_status']}`")
    lines.append(f"- Excel: `{summary['xlsx_status']}`")
    lines.append("")
    lines.append("## المصانع")
    lines.append(f"- CSV: `{summary['csv_sites']}`")
    lines.append(f"- Excel: `{summary['xlsx_sites']}`")
    lines.append("")
    lines.append("## أمثلة CSV فقط (أول 15)")
    for r in csv_only[:15]:
        lines.append(f"- {r['date']} | {r['id']} | {r['status']} | {(r['details'] or '')[:90]}")
    lines.append("")
    lines.append("## أمثلة Excel فقط (أول 15)")
    for r in xlsx_only[:15]:
        lines.append(f"- {r['date']} | row {r['row']} | {r['status']} | {(r['details'] or '')[:90]}")
    lines.append("")
    lines.append("## أمثلة اختلاف الحالة (أول 15)")
    for r in summary["status_mismatch"][:15]:
        lines.append(f"- {r['date']} | CSV {r['csv_status']} vs Excel {r['xlsx_status']} | {r['csv_id']} / row {r['xlsx_row']}")

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(OUT_MD.read_text(encoding="utf-8"))


if __name__ == "__main__":
    main()
