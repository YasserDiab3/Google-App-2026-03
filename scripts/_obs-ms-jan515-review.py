# -*- coding: utf-8 -*-
"""Review Mohamed Saeed's 515 Jan-2026 CSV rows and list duplicates."""
import csv
import re
import shutil
from collections import defaultdict
from datetime import datetime
from pathlib import Path

CSV_PATH = Path(r"C:\Users\YasserMohamed\Downloads\V.3-HSE Database - DailyObservations.csv")
OUT_DIR = Path(r"d:\Apps\2026-07\clinic-repo\scripts")
OUT_MD = OUT_DIR / "_obs-ms-jan515-duplicates.md"
OUT_CSV = OUT_DIR / "_obs-ms-jan515-duplicates.csv"
OUT_ONCE = OUT_DIR / "_obs-ms-jan515-unique-once.csv"
DL_CSV = Path(r"C:\Users\YasserMohamed\Downloads\_obs-ms-jan515-duplicates.csv")
DL_MD = Path(r"C:\Users\YasserMohamed\Downloads\_obs-ms-jan515-duplicates.md")


def parse_date(v):
    s = str(v or "").strip().split()[0]
    for fmt in ("%m/%d/%Y", "%Y-%m-%d", "%d/%m/%Y"):
        try:
            return datetime.strptime(s, fmt).date()
        except Exception:
            pass
    return None


def is_ms(n):
    n = n or ""
    return "محمد" in n and "سعيد" in n and ("شرف" in n or "حسن" in n)


def norm_det(s):
    return re.sub(r"\s+", " ", str(s or "").strip().lower())


def main():
    rows = []
    with CSV_PATH.open("r", encoding="utf-8-sig", errors="replace", newline="") as f:
        for r in csv.DictReader(f):
            if not is_ms(r.get("observerName")):
                continue
            d = parse_date(r.get("date"))
            if not d or d.strftime("%Y-%m") != "2026-01":
                continue
            rows.append(
                {
                    "id": (r.get("id") or "").strip(),
                    "date": d.isoformat(),
                    "details": (r.get("details") or "").strip(),
                    "det": norm_det(r.get("details")),
                    "status": (r.get("status") or "").strip(),
                    "site": (r.get("siteName") or "").strip(),
                    "createdAt": (r.get("createdAt") or "").strip()[:19],
                }
            )

    groups = defaultdict(list)
    for r in rows:
        key = (r["date"], r["det"] or ("__empty__" + r["id"]))
        groups[key].append(r)

    unique_once = []
    dups = []
    for key, items in groups.items():
        if len(items) == 1:
            unique_once.append(items[0])
        else:
            dups.append((key, items))
    dups.sort(key=lambda kv: (-len(kv[1]), kv[0][0]))

    total = len(rows)
    n_once = len(unique_once)
    n_dup_groups = len(dups)
    true_notes = n_once + n_dup_groups
    extra = sum(len(v) - 1 for _, v in dups)

    by_day = defaultdict(lambda: {"rows": 0, "unique": 0, "extra": 0})
    for r in rows:
        by_day[r["date"]]["rows"] += 1
    for (dt, _det), items in groups.items():
        by_day[dt]["unique"] += 1
        if len(items) > 1:
            by_day[dt]["extra"] += len(items) - 1

    lines = []
    lines.append("# مراجعة 515 صف — محمد سعيد — يناير 2026")
    lines.append("")
    lines.append("## الخلاصة")
    lines.append(f"- الصفوف في CSV: **{total}**")
    lines.append(f"- ملاحظات فريدة (تاريخ + نص): **{true_notes}**")
    lines.append(f"- مجموعات مكررة: **{n_dup_groups}**")
    lines.append(f"- ظهرت مرة واحدة فقط: **{n_once}**")
    lines.append(f"- صفوف زائدة (نسخ): **{extra}**")
    lines.append(f"- تحقق: {true_notes} + {extra} = **{true_notes + extra}**")
    lines.append("")
    lines.append("## توزيع الأيام")
    lines.append("| التاريخ | صفوف | فريد | زائد مكرر |")
    lines.append("|---|---:|---:|---:|")
    for dt in sorted(by_day):
        b = by_day[dt]
        lines.append(f"| {dt} | {b['rows']} | {b['unique']} | {b['extra']} |")

    lines.append("")
    lines.append("## المكررات بالتفصيل")
    lines.append("| # | التكرار | التاريخ | الموقع | الحالة | نص الملاحظة | كل الـ IDs |")
    lines.append("|---:|---:|---|---|---|---|---|")

    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(
            ["#", "repeat_count", "date", "site", "status", "details", "all_ids", "createdAt_list"]
        )
        for i, ((dt, _det), items) in enumerate(dups, 1):
            details = items[0]["details"].replace("|", "/").replace("\n", " ")
            ids = ", ".join(x["id"] for x in items)
            statuses = "/".join(sorted({x["status"] for x in items if x["status"]}))
            sites = "/".join(sorted({x["site"] for x in items if x["site"]}))
            created = ", ".join(sorted({x["createdAt"] for x in items if x["createdAt"]}))
            short = details if len(details) <= 110 else details[:110] + "…"
            lines.append(
                f"| {i} | ×{len(items)} | {dt} | {sites} | {statuses} | {short} | {ids} |"
            )
            w.writerow([i, len(items), dt, sites, statuses, details, ids, created])

    lines.append("")
    lines.append(f"## ظهرت مرة واحدة فقط ({n_once})")
    lines.append("| التاريخ | ID | الموقع | نص الملاحظة |")
    lines.append("|---|---|---|---|")
    for r in sorted(unique_once, key=lambda x: (x["date"], x["id"])):
        d = r["details"].replace("|", "/").replace("\n", " ")
        if len(d) > 100:
            d = d[:100] + "…"
        lines.append(f"| {r['date']} | {r['id']} | {r['site']} | {d} |")

    with OUT_ONCE.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["date", "id", "site", "status", "details", "createdAt"])
        for r in sorted(unique_once, key=lambda x: (x["date"], x["id"])):
            w.writerow([r["date"], r["id"], r["site"], r["status"], r["details"], r["createdAt"]])

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    shutil.copy2(OUT_CSV, DL_CSV)
    shutil.copy2(OUT_MD, DL_MD)

    print(f"TOTAL={total} UNIQUE={true_notes} DUP_GROUPS={n_dup_groups} ONCE={n_once} EXTRA={extra}")
    print(f"CHECK {true_notes}+{extra}={true_notes + extra}")
    print("--- DAYS ---")
    for dt in sorted(by_day):
        b = by_day[dt]
        print(f"{dt}: rows={b['rows']} unique={b['unique']} extra={b['extra']}")
    print("--- DUP GROUPS ---")
    for i, ((dt, _det), items) in enumerate(dups, 1):
        print(f"{i}. x{len(items)} | {dt} | {items[0]['details'][:80]}")
    print("Wrote", OUT_MD)
    print("Wrote", OUT_CSV)
    print("Copied Downloads")


if __name__ == "__main__":
    main()
