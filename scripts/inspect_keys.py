import re
import os

modules = ['incidents', 'nearmiss', 'fireequipment', 'clinic', 'contractors', 'violations', 'sustainability', 'training', 'dailyobservations', 'ppe', 'chemicalsafety', 'periodicinspections', 'riskassessment', 'actiontrackingregister']
for m in modules:
    path = f'Frontend/js/modules/modules/{m}.js'
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        keys = set(re.findall(r"localStorage\.getItem\(['\"]([a-zA-Z0-9_\-]+)['\"]", content))
        print(f"{m}: {sorted(list(keys))}")
