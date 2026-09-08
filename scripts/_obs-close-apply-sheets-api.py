# -*- coding: utf-8 -*-
"""Apply status column writes via Sheets API using clasp OAuth + incremental consent for spreadsheets."""
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

CLASPRC = Path.home() / ".clasprc.json"
CHUNKS = Path(r"d:\Apps\2026-07\clinic-repo\scripts\_obs-close-write\chunks")
SID = "1EanavJ2OodOmq8b1GagSj8baa-KF-o4mVme_Jlwmgxc"
SCOPES = "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive"


def refresh(tok):
    data = urllib.parse.urlencode({
        "client_id": tok["client_id"],
        "client_secret": tok["client_secret"],
        "refresh_token": tok["refresh_token"],
        "grant_type": "refresh_token",
    }).encode()
    req = urllib.request.Request("https://oauth2.googleapis.com/token", data=data, method="POST")
    with urllib.request.urlopen(req) as r:
        return json.loads(r.read().decode())["access_token"]


def write_range(access, range_name, values):
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SID}/values/{urllib.parse.quote(range_name)}?valueInputOption=RAW"
    body = json.dumps({"values": values}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        method="PUT",
        headers={
            "Authorization": "Bearer " + access,
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"{e.code} {err}") from e


def main():
    clasprc = json.loads(CLASPRC.read_text(encoding="utf-8"))
    tok = clasprc["tokens"]["default"]
    access = refresh(tok)
    # probe
    try:
        write_range(access, "DailyObservations!P15", [["مغلق"]])
        print("probe_ok with clasp token")
    except Exception as e:
        print("probe_fail", e)
        print("NEED_SHEETS_SCOPE")
        return 2

    files = sorted(CHUNKS.glob("*.json"))
    ok = 0
    for p in files:
        d = json.loads(p.read_text(encoding="utf-8"))
        write_range(access, d["range_name"], d["values"])
        ok += 1
        print("ok", p.name, d["range_name"])
        if ok % 5 == 0:
            time.sleep(0.4)
    print("DONE", ok)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
