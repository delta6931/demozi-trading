import json
import os
import shutil

# Paths
BASE_DIR = 'C:/Users/garbarking/.gemini/antigravity/scratch/megastandard'
JS_FILE = os.path.join(BASE_DIR, 'products-data.js')
SPARE_PARTS_FILE = os.path.join(BASE_DIR, 'spare-parts-data.js')
PRODUCTS_OUT_DIR = os.path.join(BASE_DIR, 'products')
SITEMAP_OUT = os.path.join(BASE_DIR, 'sitemap.xml')

BASE_URL = 'https://www.megastandard.net'

def extract_json_from_js(filepath):
    if not os.path.exists(filepath):
        return []
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    start_index = content.find('[')
    end_index = content.rfind(']') + 1
    
    if start_index == -1 or end_index == 0:
        print(f"Error: Could not find array in {filepath}")
        return []
        
    json_str = content[start_index:end_index]
    
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON in {filepath}: {e}")
        return []

def generate_html(product):
    pid = str(product.get('id', ''))
    pname = product.get('name', '')
    pbrand = product.get('brand', 'Mega Standard')
    pcat = product.get('category', '')
    pdesc = product.get('description', 'No additional description provided. Please contact us for more information.')
    if not pdesc:
        pdesc = 'No additional description provided. Please contact us for more information.'
    
    # Image handling
    pimage = ''
    raw_img = product.get('imageUrl', '')
    if raw_img:
        if isinstance(raw_img, list) and len(raw_img) > 0:
            pimage = raw_img[0]
        elif isinstance(raw_img, str) and raw_img.strip() != "":
            pimage = raw_img

    img_html = f'<div class="product-image-placeholder"><i class="fas fa-box" style="font-size: 80px; color:#ccc;"></i></div>'
    if pimage:
        img_html = f'<img src="{pimage}" alt="{pname}">'

    wa_msg = f"Merhaba, *{pname}* ürünü hakkında detaylı bilgi almak istiyorum."
    wa_link = f"https://wa.me/905396619004?text={wa_msg.replace(' ', '%20')}"

    # We will use relative paths for CSS/JS since we are inside /products/
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{pname} | Mega Standard</title>
    <meta name="description" content="Buy {pname} from {pbrand}. Industrial Equipment and Spare Parts available at Mega Standard.">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/logo_transparent.png">
</head>

<body>
    <!-- Header -->
    <header class="navbar">
        <div class="container nav-container">
            <a href="../index.html" class="logo">
                <img src="../assets/logo_transparent.png" alt="Mega Standard Logo" class="logo-img" style="height: 60px; margin-right: 10px;">
                <span class="logo-text">Mega Standard</span>
            </a>
            <nav class="nav-links">
                <a href="../index.html#about" class="nav-link" data-i18n="nav_about">About Us</a>
                <a href="../brands.html" class="nav-link" data-i18n="nav_partners">Partners</a>
                <a href="../products.html" class="nav-link active" data-i18n="nav_products">Products</a>
                <a href="../index.html#contact" class="btn btn-primary" data-i18n="nav_contact">Contact Us</a>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <section class="section-padding" style="margin-top: 60px; min-height: calc(100vh - 120px);">
        <div class="container">
            <div style="margin-bottom: 20px; font-size: 14px;">
                <a href="../products.html">Products</a> &raquo; <span style="color: #666;">{pbrand}</span>
            </div>

            <div id="productDetailWrapper">
                <div class="product-detail-container">
                    <div class="product-detail-image-box">
                        {img_html}
                    </div>
                    <div class="product-detail-info">
                        <div class="product-detail-brand">{pbrand}</div>
                        <h1 class="product-detail-title">{pname}</h1>
                        <div class="product-detail-category">{pcat}</div>
                        
                        <div class="product-detail-desc">
                            {pdesc}
                        </div>

                        <div style="margin-top: 20px;">
                            <a href="{wa_link}" target="_blank" class="btn btn-primary" style="display: block; width: 100%; text-align: center; font-size: 18px; font-weight: bold; padding: 15px 20px; border-radius: 6px !important; background: linear-gradient(180deg, #25D366 0%, #128C7E 100%); border-color: #075E54; color: #FFF;">
                                <i class="fab fa-whatsapp" style="margin-right: 8px;"></i> ASK FOR QUOTE
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top:20px;">
                <a href="../products.html" class="btn btn-secondary">&larr; Back to Catalog</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Mega Standard. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
"""
    return html_content

def main():
    print("Loading data...")
    products = extract_json_from_js(JS_FILE)
    spare_parts = extract_json_from_js(SPARE_PARTS_FILE)
    
    all_items = products + spare_parts
    print(f"Loaded {len(all_items)} total items.")
    
    # Recreate products directory
    if os.path.exists(PRODUCTS_OUT_DIR):
        shutil.rmtree(PRODUCTS_OUT_DIR)
    os.makedirs(PRODUCTS_OUT_DIR)
    
    # Generate HTML files and collect URLs
    urls_for_sitemap = []
    
    for item in all_items:
        pid = str(item.get('id', ''))
        if not pid:
            continue
            
        safe_name = "".join(c if c.isalnum() else '-' for c in item.get('name', 'product')).lower()
        # prevent super long filenames
        safe_name = safe_name[:50].strip('-') 
        filename = f"{pid}-{safe_name}.html"
        
        filepath = os.path.join(PRODUCTS_OUT_DIR, filename)
        html_str = generate_html(item)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_str)
            
        urls_for_sitemap.append(f"{BASE_URL}/products/{filename}")
        
    print(f"Generated {len(urls_for_sitemap)} HTML files in {PRODUCTS_OUT_DIR}")
    
    # Generate Sitemap
    print("Generating sitemap...")
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    static_urls = [
        ('', 1.0, 'weekly'),
        ('products.html', 0.8, 'daily'),
        ('brands.html', 0.8, 'weekly')
    ]
    
    for url, priority, freq in static_urls:
        sitemap_xml += f'  <url>\n    <loc>{BASE_URL}/{url}</loc>\n    <changefreq>{freq}</changefreq>\n    <priority>{priority}</priority>\n  </url>\n'
        
    for url in urls_for_sitemap:
        sitemap_xml += f'  <url>\n    <loc>{url}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n'
        
    sitemap_xml += '</urlset>'
    
    with open(SITEMAP_OUT, 'w', encoding='utf-8') as f:
        f.write(sitemap_xml)
        
    print(f"Saved sitemap to {SITEMAP_OUT}")

if __name__ == "__main__":
    main()
