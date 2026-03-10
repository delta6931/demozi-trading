document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('productSearch');

    if (!productGrid || !window.productsData) return;

    // Optional WhatsApp Number
    const WA_NUMBER = "905396619004";

    function renderProducts(products) {
        productGrid.innerHTML = '';

        if (products.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 20px;">No products found matching your search.</p>';
            return;
        }

        products.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-item';

            // Pre-formatted Whatsapp Message URL Encoding
            const message = `Merhaba, *${prod.name}* ürünü hakkında bilgi almak istiyorum.`;
            const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

            // Handle multiple images or single image string
            let imgHtml = '<div class="product-image-placeholder"><i class="fas fa-box"></i></div>';
            if (prod.image) {
                if (Array.isArray(prod.image) && prod.image.length > 0) {
                    const imgs = prod.image.map(url => `<img src="${url}" alt="${prod.name}" style="height:150px; width:auto; border:1px solid #ddd; object-fit:contain; flex-shrink: 0; border-radius:4px;">`).join('');
                    imgHtml = `<div style="display:flex; gap:10px; overflow-x:auto; padding:15px; border-bottom:1px solid #ddd; background:#fff;">${imgs}</div>`;
                } else if (typeof prod.image === 'string' && prod.image.trim() !== "") {
                    imgHtml = `<img src="${prod.image}" alt="${prod.name}" class="product-img" style="width:100%; height:200px; object-fit:contain; border-bottom:1px solid #ddd; padding:10px;">`;
                }
            }

            // Generate safe filename for static HTML link
            let safeName = prod.name ? prod.name.replace(/[^a-zA-Z0-9]+/g, '-') : 'product';
            safeName = safeName.toLowerCase().replace(/-+$/, '');
            if (safeName.length > 50) {
                safeName = safeName.substring(0, 50).replace(/-+$/, '');
            }
            const productUrl = `products/${prod.id}-${safeName}.html`;

            card.innerHTML = `
                <a href="${productUrl}" style="text-decoration:none; color:inherit; display:block; height: 100%;">
                    ${imgHtml}
                    <div class="product-brand">${prod.brand || ''}</div>
                    <div class="product-name">${prod.name}</div>
                </a>
                <a href="${waLink}" target="_blank" class="btn-whatsapp" style="position:relative; z-index:2; margin-top:10px;">
                    <i class="fab fa-whatsapp"></i> ASK FOR QUOTE
                </a>
            `;
            productGrid.appendChild(card);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const brandFilter = urlParams.get('brand');
    const categoryFilter = urlParams.get('category');

    let currentProducts = window.productsData;

    if (categoryFilter) {
        currentProducts = currentProducts.filter(p => p.category && p.category.toLowerCase() === categoryFilter.toLowerCase());
        searchInput.value = categoryFilter;
    } else if (brandFilter) {
        // Map URL slug to actual brand name for filtering
        const brandNamesMap = {
            'sick': 'sick-sensor-intelligence',
            'ifm': 'ifm-r-nleri',
            'parker-meggitt': 'parker-meggitt-r-nleri',
            'abb': 'abb-fiyat-listesi',
            'phoenix-contact': 'phoenix-contact-fiyat-listesi',
            'siemens': 'siemens-fiyat-listesi'
        };

        const targetBrandName = brandNamesMap[brandFilter.toLowerCase()];
        if (targetBrandName) {
            currentProducts = currentProducts.filter(p => p.brand.toLowerCase() === targetBrandName);
            searchInput.value = brandFilter.toUpperCase(); // Auto-fill search box
        }
    }

    // Initial render
    renderProducts(currentProducts);

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = window.productsData.filter(p =>
                (p.name && p.name.toLowerCase().includes(term)) ||
                (p.brand && p.brand.toLowerCase().includes(term)) ||
                (p.category && p.category.toLowerCase().includes(term)) ||
                (p.description && p.description.toLowerCase().includes(term))
            );
            renderProducts(filtered);
        });
    }
});
