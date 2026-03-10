import csv
import json

def parse_wix_csv(csv_path, output_js_path):
    products = []
    
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            if row.get('fieldType') != 'Product':
                continue
                
            name = row.get('name', '').strip()
            if not name:
                continue
                
            desc = row.get('description', '').strip()
            image_url = row.get('productImageUrl', '').strip()
            brand = row.get('brand', '').strip()
            
            products.append({
                "name": name,
                "description": desc,
                "imageUrl": image_url,
                "brand": brand
            })
            
    # Write to a JS file
    with open(output_js_path, 'w', encoding='utf-8') as out:
        out.write('// Automatically extracted from wix_products.csv\n')
        out.write('const wixProductsData = ')
        json.dump(products, out, indent=2, ensure_ascii=False)
        out.write(';\n')
        
    print(f"Successfully extracted {len(products)} products and saved to {output_js_path}!")

if __name__ == '__main__':
    parse_wix_csv('wix_products.csv', 'wix_parsed_products.js')
