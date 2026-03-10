const fs = require('fs');

const rawCsv = fs.readFileSync('wix_products.csv', 'utf8');
const lines = rawCsv.split('\n');

const products = [];

// Skip header (line 0)
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Basic CSV parsing handle commas inside quotes
    // This regex matches a comma if it's not inside double quotes
    // It's a simple parser that might break on very complex CSV, but should work for this structure
    const cells = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    // Columns based on header:
    // 0: handleId, 1: fieldType, 2: name, 3: description, 4: productImageUrl, ... 52: brand

    if (cells.length < 5) continue; // Need at least basic info

    const handleId = cells[0];
    const fieldType = cells[1];
    let name = cells[2];
    let description = cells[3];
    let imageUrl = cells[4];

    // Try to find brand if it exists at index 52
    let brand = "";
    if (cells.length > 52) {
        brand = cells[52];
    }

    // Cleanup quotes
    if (name && name.startsWith('"') && name.endsWith('"')) name = name.substring(1, name.length - 1);
    if (description && description.startsWith('"') && description.endsWith('"')) description = description.substring(1, description.length - 1);
    if (brand && brand.startsWith('"') && brand.endsWith('"')) brand = brand.substring(1, brand.length - 1);

    // Only add if it's a real product (not a variant or empty row)
    if (name && name.length > 0 && fieldType === 'Product') {
        products.push({
            name: name,
            description: description,
            imageUrl: imageUrl,
            brand: brand
        });
    }
}

// Format the final JS output
let fileContent = `// Automatically generated from wix_products.csv
const wixProductsRaw = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('wix-parsed-products.js', fileContent);
console.log(`Successfully parsed ${products.length} products!`);
