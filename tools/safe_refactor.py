import re

def extract_handlers(code_gs_path, handlers_path):
    with open(code_gs_path, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'switch\s*\(action\)\s*\{', content)
    if not match: return
    start_pos = match.end()

    end_pos = -1
    temp_brace_count = 1
    for j in range(start_pos, len(content)):
        if content[j] == '{': temp_brace_count += 1
        elif content[j] == '}':
            temp_brace_count -= 1
            if temp_brace_count == 0:
                end_pos = j
                break
    if end_pos == -1: return
    switch_content = content[start_pos:end_pos]

    parts = re.split(r'(case\s+[\'\"].*?[\'\"]\s*:|default\s*:)', switch_content)
    cases = {}
    current_case_list = []
    for i in range(1, len(parts), 2):
        case_header = parts[i].strip()
        case_body = parts[i+1]
        action_match = re.match(r"case\s+['\"](.*?)['\"]\s*:", case_header)
        if action_match:
            action_name = action_match.group(1)
            trimmed_body = case_body.strip()
            if not trimmed_body or (trimmed_body.startswith('//') and '\n' not in trimmed_body):
                current_case_list.append(action_name)
            else:
                current_case_list.append(action_name)
                for act in current_case_list: cases[act] = case_body
                current_case_list = []

    with open(handlers_path, 'w', encoding='utf-8') as f:
        f.write("/**\n * ActionHandlers Registry\n */\nvar ActionHandlers = {\n")
        for action, logic in cases.items():
            f.write(f"    '{action}': function(payload, postData, action, actorUserData, spreadsheetId) {{\n")
            f.write("        var result = { success: false, message: '' };\n")

            # Use an anonymous function to wrap logic, preserving 'break' behavior as 'return'
            f.write("        (function() {\n")
            # Logic: remove only the last break; if it exists at the top level
            # Actually, to be safe, we wrap it in a labelled block and keep breaks.
            # But GAS doesn't support labelled blocks for this.
            # Best is to replace 'break;' with 'return;' inside this IIFE.

            # Simple replacement of top-level breaks with return
            processed_logic = ""
            lines = logic.split('\n')
            for line in lines:
                if line.strip() == 'break;':
                    processed_logic += line.replace('break;', 'return;') + '\n'
                else:
                    processed_logic += line + '\n'

            # Fix redeclarations
            processed_logic = re.sub(r'(let|const|var)\s+spreadsheetId\s*=', 'spreadsheetId =', processed_logic)
            processed_logic = re.sub(r'(let|const|var)\s+appendSpreadsheetId\s*=', 'appendSpreadsheetId =', processed_logic)
            processed_logic = re.sub(r'(let|const|var)\s+readSpreadsheetId\s*=', 'readSpreadsheetId =', processed_logic)
            processed_logic = re.sub(r'(let|const|var)\s+initSpreadsheetId\s*=', 'initSpreadsheetId =', processed_logic)

            f.write(processed_logic)
            f.write("        })();\n")
            f.write("        return result;\n    },\n")
        f.write("};\n")

if __name__ == "__main__":
    extract_handlers('Backend/Code.gs', 'Backend/ActionHandlers.gs')
