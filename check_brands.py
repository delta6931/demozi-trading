import json
import re
from collections import Counter

# Read file
with open('products-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove the JS variable declaration to leave just the JSON list
json_str = text.replace('const productsData = ', '').strip()
if json_str.endswith(';'):
    json_str = json_str[:-1]

try:
    data = json.loads(json_str)
    brands = [item.get('brand', '') for item in data]
    counts = Counter(brands)
    print("Top brands:")
    for b, c in counts.most_common(20):
        print(f"{b}: {c}")
    
    target_brands = ['BESTCODE', 'TOPJET', 'SEW EURO DRIVE', 'PHOENIX CONTACT', 'BIMAKS CHEMICAL', 'SIEMENS']
    print("\nTarget brands in DB:")
    for tb in target_brands:
        print(f"{tb}: {counts.get(tb, 0)}")
except Exception as e:
    print(f"Error parsing JSON: {e}")
