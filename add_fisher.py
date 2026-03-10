import json
import shutil
import re

# Copy image to assets
src_image = r"C:\Users\garbarking\.gemini\antigravity\brain\c67e2da6-d4d0-4ba8-9523-ae374517a45a\media__1772625932865.jpg"
dest_image = r"assets\dvc6030.jpg"
shutil.copy(src_image, dest_image)

new_product = {
    "id": "gen_fisher_1",
    "name": "Fisher FIELDVUE DVC6030 HC CSA Single Acting Positioner",
    "brand": "FISHER",
    "category": "Industrial Equipment",
    "description": "<p>Digital Valve Controller. Microprocessor-based current-to-pneumatic instrument for single-acting quarter-turn rotary applications. Converts 4-20mA input to a pneumatic output pressure. HART Communication, CSA Approved.</p>",
    "imageUrl": "assets/dvc6030.jpg"
}

filepath = 'products-data.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read().strip()

# find the last "]"
last_bracket_idx = content.rfind(']')
if last_bracket_idx != -1:
    # Get the text before the last bracket
    before_bracket = content[:last_bracket_idx].rstrip()
    if before_bracket.endswith(','):
        before_bracket = before_bracket[:-1]
    
    # Check if the array is completely empty
    if before_bracket.endswith('['):
        new_content = before_bracket + '\n    ' + json.dumps(new_product) + '\n' + content[last_bracket_idx:]
    else:
        new_content = before_bracket + ',\n    ' + json.dumps(new_product) + '\n' + content[last_bracket_idx:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Added Fisher DVC6030 to products-data.js")
else:
    print("Could not parse JS array.")

