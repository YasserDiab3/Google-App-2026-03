import os

script_path = os.path.join(os.path.dirname(__file__), 'generate_visual_presentations.py')
with open(script_path, 'r', encoding='utf-8') as f:
    c = f.read()

replacements = [
    ('"01_login_ar.png"', '"01_login_realistic.png"'),
    ('"02_login_en.png"', '"02_login_2fa_realistic.png"'),
    ('"03_dashboard.png"', '"03_dashboard_realistic.png"'),
    ('"04_ptw.png"', '"04_ptw_realistic.png"'),
    ('"05_incidents.png"', '"05_incidents_realistic.png"'),
    ('"06_nearmiss.png"', '"06_nearmiss_realistic.png"'),
    ('"07_clinic.png"', '"07_clinic_realistic.png"'),
    ('"08_fire_equipment.png"', '"08_fire_equipment_realistic.png"'),
    ('"09_contractors.png"', '"09_contractors_realistic.png"'),
    ('"10_ppe.png"', '"10_ppe_realistic.png"'),
    ('"11_chemical_safety.png"', '"11_chemical_safety_realistic.png"'),
    ('"12_periodic_inspections.png"', '"12_periodic_inspections_realistic.png"'),
    ('"13_violations.png"', '"13_violations_realistic.png"'),
    ('"14_risk_assessment.png"', '"14_risk_assessment_realistic.png"'),
    ('"15_training.png"', '"15_training_realistic.png"'),
    ('"16_forms_hub.png"', '"16_forms_hub_realistic.png"'),
    ('"sus_main_ar.png"', '"17_sustainability_realistic.png"'),
    ('"sus_main_en.png"', '"17_sustainability_realistic.png"'),
    ('"18_ai_assistant.png"', '"18_ai_assistant_realistic.png"'),
]

for old, new in replacements:
    count = c.count(old)
    c = c.replace(old, new)
    print(f"Replaced {count} instances of {old} -> {new}")

with open(script_path, 'w', encoding='utf-8') as f:
    f.write(c)

print("Updated generate_visual_presentations.py successfully!")
