import sqlite3
import json
import os

DB_PATH = r"d:\Apps\1.9.2026\ICAPP.V.7.09-2026\data\sql\clinic_hse.db"
OUTPUT_JSON = r"d:\Apps\1.9.2026\ICAPP.V.7.09-2026\scripts\real_seed_data.json"

conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

def get_table_rows(table_name, limit=100):
    try:
        c.execute(f"SELECT * FROM [{table_name}] LIMIT {limit}")
        cols = [d[0] for d in c.description]
        rows = c.fetchall()
        result = []
        for r in rows:
            d = {}
            for col, val in zip(cols, r):
                if val is not None:
                    d[col] = val
            result.append(d)
        return result
    except Exception as e:
        print(f"Error fetching {table_name}: {e}")
        return []

data = {
    "ptw": get_table_rows("PTW", 60),
    "ptwRegistry": get_table_rows("PTWRegistry", 60),
    "dailyObservations": get_table_rows("DailyObservations", 60),
    "clinicVisits": get_table_rows("ClinicContractorVisits", 60),
    "fireEquipment": get_table_rows("FireEquipmentAssets", 60),
    "violations": get_table_rows("Violations", 60),
    "training": get_table_rows("Training", 60),
    "contractorTrainings": get_table_rows("ContractorTrainings", 60),
    "actionTracking": get_table_rows("ActionTrackingRegister", 60),
    "ppe": get_table_rows("PPE", 60),
    "gateVisitors": get_table_rows("GateVisitors", 60),
    "wasteTypes": get_table_rows("WasteManagement_RegularWasteTyp", 60),
    "kpis": get_table_rows("SafetyPerformanceKPIs", 60),
    "users": get_table_rows("Users", 20)
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Seed data saved to {OUTPUT_JSON}")
for k, v in data.items():
    print(f"  {k}: {len(v)} rows")
