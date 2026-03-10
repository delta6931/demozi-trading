// JS Logic for the Brands page search and rendering

document.addEventListener('DOMContentLoaded', () => {
    const brandGrid = document.getElementById('brandGrid');
    const searchInput = document.getElementById('brandSearch');

    if (!brandGrid || !searchInput) return; // not on brands page

    // Render the initial grid
    renderGrid(window.brandsData);

    // Filter event listener
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        const filteredBrands = window.brandsData.filter(brand => {
            return brand.name.toLowerCase().includes(searchTerm);
        });

        renderGrid(filteredBrands);
    });

    function renderGrid(brandsToRender) {
        brandGrid.innerHTML = ''; // clear current

        if (brandsToRender.length === 0) {
            brandGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 20px;">No brands found matching your search.</p>';
            return;
        }

        // Sort alphabetically
        brandsToRender.sort((a, b) => a.name.localeCompare(b.name));

        brandsToRender.forEach(brand => {
            const el = document.createElement('a');
            el.className = 'brand-item';
            el.href = `brand-profile.html?id=${brand.id}`;
            el.textContent = brand.name;
            brandGrid.appendChild(el);
        });
    }
});
