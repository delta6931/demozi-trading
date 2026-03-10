import re
with open('spare-parts-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'(<strong>Price:</strong>\s*\d+[,\.]\d{2})[^\d<]*?(</p>)', r'\1 &euro;\2', text)

with open('spare-parts-data.js', 'w', encoding='utf-8') as f:
    f.write(text)
print("done")
