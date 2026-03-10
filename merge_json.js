try {
    const fs = require('fs');

    // Read the generated JSON file
    const rawJson = fs.readFileSync('wix_parsed_products.json', 'utf8');
    const parsedData = JSON.parse(rawJson);

    // Add logic to clean up the data and guess brands
    function guessBrand(name, originalBrand) {
        if (originalBrand && originalBrand.trim() !== '') return originalBrand.trim();

        const parts = name.split(' ');
        if (parts[0] === 'Compatible' || parts[0] === 'Hot' || parts[0] === 'WASTE' || parts[0] === 'OIL') {
            const fallbackMatch = name.match(/Linx|Citronix|Hitachi|MAKS|NEEDHAM|Chint|FINDER/i);
            if (fallbackMatch) return fallbackMatch[0].toUpperCase();
            return "INDUSTRIAL";
        }

        if (parts[0].startsWith('3KC') || parts[0].startsWith('3KD') || parts[0].startsWith('3LD') || parts[0].startsWith('3NE') || parts[0].startsWith('3NA') || parts[0].startsWith('3NJ') || parts[0].startsWith('3NP')) {
            return "SIEMENS";
        }

        if (parts[0] === 'MAKS') return 'BIMAKS CHEMICAL';
        if (parts[0] === 'AECO' || parts[0] === 'ASCON' || parts[0] === 'BALLUF' || parts[0] === 'BAUMER' || parts[0] === 'ELTRA' || parts[0] === 'EUCHNER' || parts[0] === 'IFM' || parts[0] === 'KLASCHKA' || parts[0] === 'LEUZE' || parts[0] === 'NÖDİNG' || parts[0] === 'OMRON' || parts[0] === 'PANASONIC' || parts[0] === 'SCHMERSAL' || parts[0] === 'SMC') {
            return parts[0];
        }

        return parts[0].toUpperCase();
    }

    console.log(`Processing ${parsedData.length} records...`);

    const finalProducts = parsedData.map((item, index) => {
        let imageUrl = item.productImageUrl || '';
        // Wix image URLs need to be prefixed if they are just the ID
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `https://static.wixstatic.com/media/${imageUrl}`;
        }

        return {
            id: `p${index + 1}`,
            name: item.name || 'Unnamed Product',
            brand: guessBrand(item.name || '', item.brand),
            category: "Industrial Equipment",
            description: item.description || '',
            imageUrl: imageUrl
        };
    });

    const jsContent = `// Centralized database for Mega Standard Products
// Auto-generated from wix_products.csv (${finalProducts.length} items)

const productsData = ${JSON.stringify(finalProducts, null, 2)};

window.productsData = productsData;
`;

    fs.writeFileSync('products-data.js', jsContent, 'utf8');
    console.log(`Successfully merged ${finalProducts.length} products into products-data.js`);

} catch (e) {
    console.error(e);
}
