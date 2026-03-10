import csv
import json
import re
import urllib.parse
import os

# --- Helper Functions ---
def clean_wix_url(wix_url):
    """Converts a wix:image:// URL to a usable path."""
    if not wix_url or not wix_url.startswith("wix:image://"):
        return "assets/placeholder.jpg"
    match = re.search(r'\/([^\/]+\.(?:jpg|jpeg|png|webp|gif))#', wix_url, re.IGNORECASE)
    if match:
        filename = match.group(1)
        return f"assets/products/{filename}"
    return "assets/placeholder.jpg"

def slugify(text):
    """Creates a URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def clean_text(text):
    """Removes unwanted characters from text."""
    if not text:
        return ""
    text = text.replace('\u00a0', ' ')
    text = text.replace('\n', ' ')
    return text.strip()

# --- Load Brands (to get exact IDs and Category mappings if provided) ---
# The Brands+_+Products.csv contains combined data, let's use that as it links them directly.
print("Parsing Combined CSV...")

products = []
brands_dict = {} # id -> brand name mapping

try:
    # First pass: Extract unique brands
    with open('Brands.csv', mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            brand_id = row.get('ID')
            title = row.get('Title', '').replace(' Fiyat Listesi', '').replace(' Ürünleri', '').strip()
            if brand_id and title:
                 # Clean up brand title
                 if title.lower() == 'sick': title = "SICK Sensor Intelligence"
                 brands_dict[brand_id] = {
                     "id": slugify(title),
                     "name": title,
                     "description": f"Explore our comprehensive range of {title} industrial solutions. Demozi provides reliable supply and distribution for all {title} components.",
                     "logo": "assets/placeholder.jpg" # We will need to assign specific logos later or use placeholders
                 }
    print(f"Loaded {len(brands_dict)} Brands from Brands.csv")
    
    # Second pass: Extract products and link to brands
    with open('Brands+_+Products.csv', mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            title = clean_text(row.get('Title', ''))
            image_url = clean_wix_url(row.get('Image', ''))
            brand_id_raw = row.get('Brand', '')
            desc_text = clean_text(row.get('Text', ''))
            
            if not title:
                continue
                
            brand_slug = "other"
            if brand_id_raw in brands_dict:
                brand_slug = brands_dict[brand_id_raw]['id']
            
            # Generate SEO Description
            seo_desc = f"Demozi Company supplies genuine {title}. "
            if desc_text:
                 seo_desc += f"Category: {desc_text}. "
            seo_desc += "Contact us for pricing, availability, and fast shipping to Iraq and the Middle East."

            products.append({
                "id": slugify(title),
                "name": title,
                "brand": brand_slug,
                "image": image_url,
                "description": seo_desc,
                "category": desc_text if desc_text else "Industrial Components"
            })
            
    print(f"Loaded {len(products)} Products from Brands_Products.csv")

except Exception as e:
    print(f"Error parsing CSV: {e}")

# --- Generate JS Database Files ---
print("Generating JavaScript DB files...")

# Brands JS
brands_js = "const brandsData = " + json.dumps(list(brands_dict.values()), indent=4, ensure_ascii=False) + ";\n"
with open('brands-data.js', 'w', encoding='utf-8') as f:
    f.write(brands_js)

# Products JS
products_js = "const productsData = " + json.dumps(products, indent=4, ensure_ascii=False) + ";\n"
with open('products-data.js', 'w', encoding='utf-8') as f:
    f.write(products_js)

# Empty Spare Parts file for Demozi (they use the main catalog now)
spare_parts_js = "const sparePartsData = [];\n"
with open('spare-parts-data.js', 'w', encoding='utf-8') as f:
    f.write(spare_parts_js)

print("Successfully generated products-data.js, brands-data.js, and spare-parts-data.js")
