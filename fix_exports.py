import os

filepath = 'products-data.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read().strip()

if not content.endswith('window.productsData = productsData;'):
    if content.endswith('];'):
        content += '\n\nwindow.productsData = productsData;\n'
    elif content.endswith(']'):
        content += ';\n\nwindow.productsData = productsData;\n'
    else:
        # Just in case
        content += '\n];\n\nwindow.productsData = productsData;\n'

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed products-data.js exports!")
