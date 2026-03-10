document.addEventListener('DOMContentLoaded', () => {
    const detailWrapper = document.getElementById('productDetailWrapper');
    const relatedGrid = document.getElementById('relatedProductsGrid');
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

    if (!detailWrapper || !window.productsData) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        detailWrapper.innerHTML = '<p>Product not found. <a href="products.html">Return to Catalog</a></p>';
        return;
    }

    const product = window.productsData.find(p => String(p.id) === productId);

    if (!product) {
        detailWrapper.innerHTML = '<p>Product not found. <a href="products.html">Return to Catalog</a></p>';
        return;
    }

    // Update Breadcrumbs
    breadcrumbCategory.textContent = product.brand || product.category || 'General';
    breadcrumbCurrent.textContent = product.name;
    document.title = `${product.name} | Mega Standard`;

    // Handle Image
    let imgHtml = '<div class="product-image-placeholder"><i class="fas fa-box" style="font-size: 80px; color:#ccc;"></i></div>';
    if (product.imageUrl) {
        if (Array.isArray(product.imageUrl) && product.imageUrl.length > 0) {
            imgHtml = `<img src="${product.imageUrl[0]}" alt="${product.name}">`;
        } else if (typeof product.imageUrl === 'string' && product.imageUrl.trim() !== "") {
            imgHtml = `<img src="${product.imageUrl}" alt="${product.name}">`;
        }
    }

    // Build WhatsApp Link
    const WA_NUMBER = "905396619004";
    const message = `Merhaba, *${product.name}* ürünü hakkında detaylı bilgi almak istiyorum.`;
    const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

    // Render Detail
    detailWrapper.innerHTML = `
        <div class="product-detail-container">
            <div class="product-detail-image-box">
                ${imgHtml}
            </div>
            <div class="product-detail-info">
                <div class="product-detail-brand">${product.brand || 'Mega Standard'}</div>
                <h1 class="product-detail-title">${product.name}</h1>
                ${product.category ? `<div class="product-detail-category">${product.category}</div>` : ''}
                
                <div class="product-detail-desc">
                    ${product.description ? product.description : 'No additional description provided for this product. Please contact us for more information, specifications, and pricing.'}
                </div>

                <div style="margin-top: 20px;">
                    <a href="${waLink}" target="_blank" class="btn btn-primary" style="display: block; width: 100%; text-align: center; font-size: 18px; font-weight: bold; padding: 15px 20px; border-radius: 6px !important; background: linear-gradient(180deg, #25D366 0%, #128C7E 100%); border-color: #075E54; color: #FFF; text-shadow: none; box-sizing: border-box;">
                        <i class="fab fa-whatsapp" style="margin-right: 8px; font-size: 24px; vertical-align: middle;"></i> ASK FOR QUOTE
                    </a>
                </div>
            </div>
        </div>
    `;

    // Render Related Products
    // Find products in the same category or brand, excluding current
    let related = window.productsData.filter(p =>
        p.id !== product.id &&
        ((p.brand && p.brand === product.brand) || (p.category && p.category === product.category))
    );

    // Shuffle and pick 4
    related = related.sort(() => 0.5 - Math.random()).slice(0, 4);

    if (related.length === 0) {
        document.querySelector('.related-products').style.display = 'none';
    } else {
        related.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-item';

            let rImgHtml = '<div class="product-image-placeholder"><i class="fas fa-box"></i></div>';
            if (prod.imageUrl) {
                if (Array.isArray(prod.imageUrl) && prod.imageUrl.length > 0) {
                    rImgHtml = `<img src="${prod.imageUrl[0]}" alt="${prod.name}" class="product-img" style="width:100%; height:200px; object-fit:contain; border-bottom:1px solid #ddd; padding:10px;">`;
                } else if (typeof prod.imageUrl === 'string' && prod.imageUrl.trim() !== "") {
                    rImgHtml = `<img src="${prod.imageUrl}" alt="${prod.name}" class="product-img" style="width:100%; height:200px; object-fit:contain; border-bottom:1px solid #ddd; padding:10px;">`;
                }
            }

            const rMessage = `Merhaba, *${prod.name}* ürünü hakkında bilgi almak istiyorum.`;
            const rWaLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(rMessage)}`;

            card.innerHTML = `
                <a href="product-details.html?id=${encodeURIComponent(prod.id)}" style="text-decoration:none; color:inherit; display:block;">
                    ${rImgHtml}
                    <div class="product-brand">${prod.brand || ''}</div>
                    <div class="product-name" style="font-size: 13px; margin-bottom: 10px;">${prod.name}</div>
                </a>
                <a href="${rWaLink}" target="_blank" class="btn-whatsapp" style="margin-top: auto;">
                    <i class="fab fa-whatsapp"></i> QUOTE
                </a>
            `;
            relatedGrid.appendChild(card);
        });
    }
});
