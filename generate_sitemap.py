import json
import os

def generate_sitemap():
    # Load products from the JS file
    # Note: The JS file starts with 'window.productsData = [...]'
    # We need to extract the JSON part.
    js_path = 'C:/Users/garbarking/.gemini/antigravity/scratch/megastandard/products-data.js'
    
    if not os.path.exists(js_path):
        print(f"Error: {js_path} not found.")
        return

    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    start_index = content.find('[')
    end_index = content.rfind(']') + 1
    
    if start_index == -1 or end_index == 0:
        print("Error: Could not find products array in JS file.")
        return
        
    products_json = content[start_index:end_index]
    
    try:
        products = json.loads(products_json)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    base_url = 'https://megastandard.net'
    
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    # Static pages
    static_urls = [
        ('', 1.0, 'weekly'),
        ('products.html', 0.8, 'daily'),
        ('brands.html', 0.8, 'weekly')
    ]
    
    for url, priority, freq in static_urls:
        sitemap_xml += f'  <url>\n    <loc>{base_url}/{url}</loc>\n    <changefreq>{freq}</changefreq>\n    <priority>{priority}</priority>\n  </url>\n'
    
    # Product pages
    for product in products:
        p_id = str(product.get('id'))
        if p_id:
            sitemap_xml += f'  <url>\n    <loc>{base_url}/product-details.html?id={p_id}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n'
            
    sitemap_xml += '</urlset>'
    
    output_path = 'C:/Users/garbarking/.gemini/antigravity/scratch/megastandard/sitemap.xml'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(sitemap_xml)
        
    print(f"Sitemap generated with {len(products)} products at {output_path}")

if __name__ == "__main__":
    generate_sitemap()
