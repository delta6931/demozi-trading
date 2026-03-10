$ErrorActionPreference = "Stop"

$BaseDir = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi"
$JsFile = Join-Path $BaseDir "products-data.js"
$SparePartsFile = Join-Path $BaseDir "spare-parts-data.js"
$OutDir = Join-Path $BaseDir "products"
$SitemapOut = Join-Path $BaseDir "sitemap.xml"
$BaseUrl = "https://demozi.com"

# 1. Helper to extract JSON from JS
function Get-DataFromJs {
    param([string]$Path)
    
    if (-not (Test-Path $Path)) { return @() }
    
    $content = Get-Content $Path -Raw -Encoding UTF8
    $startIndex = $content.IndexOf('[')
    $endIndex = $content.LastIndexOf(']')
    
    if ($startIndex -eq -1 -or $endIndex -eq -1) { return @() }
    
    $jsonContent = $content.Substring($startIndex, $endIndex - $startIndex + 1)
    try {
        return (ConvertFrom-Json $jsonContent)
    }
    catch {
        Write-Host "Failed to parse JSON from $Path"
        return @()
    }
}

# 2. Load Data
Write-Host "Loading data..."
$products = Get-DataFromJs $JsFile
$spareParts = Get-DataFromJs $SparePartsFile

$allItems = @()
if ($products) { $allItems += $products }
if ($spareParts) { $allItems += $spareParts }

Write-Host "Loaded $($allItems.Count) total items."

# 3. Prepare Output Directory
if (Test-Path $OutDir) {
    Remove-Item -Path $OutDir -Recurse -Force
}
New-Item -ItemType Directory -Path $OutDir | Out-Null

$urlsForSitemap = @()

# 4. Generate HTML files
Write-Host "Generating HTML pages..."
foreach ($item in $allItems) {
    if (-not $item.id) { continue }
    
    $prodId = $item.id
    $pname = if ($item.name) { $item.name } else { "" }
    $pbrand = if ($item.brand) { $item.brand } else { "Demozi" }
    $pcat = if ($item.category) { $item.category } else { "" }
    $pdesc = if ($item.description) { $item.description } else { "No additional description provided. Please contact us for more information." }
    
    $pimage = ""
    if ($item.imageUrl) {
        if ($item.imageUrl -is [array] -and $item.imageUrl.Count -gt 0) {
            $pimage = $item.imageUrl[0]
        }
        elseif ($item.imageUrl -is [string] -and $item.imageUrl.Trim() -ne "") {
            $pimage = $item.imageUrl
        }
    }
    
    $imgHtml = '<div class="product-image-placeholder"><i class="fas fa-box" style="font-size: 80px; color:#ccc;"></i></div>'
    if ($pimage -ne "") {
        $imgHtml = "<img src=`"$pimage`" alt=`"$pname`">"
    }

    $escapedName = [uri]::EscapeDataString("Merhaba, *$pname* ürünü hakkında detaylı bilgi almak istiyorum.")
    $waLink = "https://wa.me/905396619004?text=$escapedName"

    $safeName = $pname -replace '[^a-zA-Z0-9]+', '-'
    $safeName = $safeName.ToLower().TrimEnd('-')
    if ($safeName.Length -gt 50) { $safeName = $safeName.Substring(0, 50).TrimEnd('-') }
    
    $filename = "$prodId-$safeName.html"
    $filepath = Join-Path $OutDir $filename

    $htmlContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$pname | Demozi</title>
    <meta name="description" content="Buy $pname from $pbrand. Industrial Equipment and Spare Parts available at Demozi.">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" type="image/png" href="../assets/logo_transparent.png">
</head>
<body>
    <header class="navbar">
        <div class="container nav-container">
            <button class="mobile-menu-btn" aria-label="Toggle menu">
                <i class="fas fa-bars"></i>
            </button>

            <a href="../index.html" class="logo">
                <img src="../assets/logo_transparent.png" alt="Demozi Logo" class="logo-img" style="height: 60px; margin-right: 10px;">
                <div class="logo-text-container">
                    <div class="logo-text">Demozi Company</div>
                    <div class="logo-subtitle">General Trading Limited Liability Private Company</div>
                </div>
            </a>
            
            <nav class="nav-links">
                <a href="../index.html#about" class="nav-link" data-i18n="nav_about">About Us</a>
                
                <div class="dropdown">
                    <button class="nav-link dropbtn"><span data-i18n="nav_divisions">Our Divisions</span> <i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content">
                        <a href="../index.html#industrial" data-i18n="nav_industrial">Industrial & Coding Systems</a>
                        <a href="../index.html#cosmetics" data-i18n="nav_cosmetics">Cosmetics & Beauty</a>
                        <a href="../index.html#logistics" data-i18n="nav_logistics">Export & Logistics</a>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="nav-link dropbtn"><span data-i18n="nav_trademarks">Trademarks</span> <i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content">
                        <a href="../products.html?brand=sick">SICK</a>
                        <a href="../products.html?brand=ifm">IFM</a>
                        <a href="../products.html?brand=parker-meggitt">Parker Meggitt</a>
                        <a href="../products.html?brand=abb">ABB</a>
                        <a href="../products.html?brand=phoenix-contact">Phoenix Contact</a>
                        <a href="../products.html?brand=siemens">Siemens</a>
                    </div>
                </div>

                <a href="../brands.html" class="nav-link" data-i18n="nav_brands">Brands</a>
                <a href="../products.html" class="nav-link active" data-i18n="nav_products">Products</a>
                <a href="../index.html#contact" class="btn btn-primary" data-i18n="nav_contact">Contact Us</a>

                <div class="lang-switcher">
                    <button class="lang-btn" data-lang="en">EN</button>
                    <button class="lang-btn" data-lang="tr">TR</button>
                    <button class="lang-btn" data-lang="ar">AR</button>
                </div>
            </nav>
        </div>
    </header>

    <section class="section-padding" style="margin-top: 100px; min-height: calc(100vh - 120px);">
        <div class="container">
            <div style="margin-bottom: 20px; font-size: 14px;">
                <a href="../products.html">Products</a> &raquo; <span style="color: #666;">$pbrand</span>
            </div>

            <div id="productDetailWrapper">
                <div class="product-detail-container">
                    <div class="product-detail-image-box">
                        $imgHtml
                    </div>
                    <div class="product-detail-info">
                        <div class="product-detail-brand">$pbrand</div>
                        <h1 class="product-detail-title">$pname</h1>
                        <div class="product-detail-category">$pcat</div>
                        
                        <div class="product-detail-desc">
                            $pdesc
                        </div>

                        <div style="margin-top: 20px;">
                            <a href="$waLink" target="_blank" class="btn btn-primary" style="display: block; width: 100%; text-align: center; font-size: 18px; font-weight: bold; padding: 15px 20px; border-radius: 6px !important; background: linear-gradient(180deg, #25D366 0%, #128C7E 100%); border-color: #075E54; color: #FFF; text-decoration: none;">
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

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Demozi. All rights reserved.</p>
        </div>
    </footer>
    <script src="../main.js"></script>
</body>
</html>
"@

    Set-Content -Path $filepath -Value $htmlContent -Encoding UTF8
    $urlsForSitemap += "$BaseUrl/products/$filename"
}

Write-Host "Generated $($urlsForSitemap.Count) pages in $OutDir"

# 5. Generate Sitemap
Write-Host "Generating sitemap..."
$sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>' + "`n"
$sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "`n"

$staticUrls = @(
    @{ loc = ""; pri = "1.0"; freq = "weekly" },
    @{ loc = "products.html"; pri = "0.8"; freq = "daily" },
    @{ loc = "brands.html"; pri = "0.8"; freq = "weekly" }
)

foreach ($u in $staticUrls) {
    if ($u.loc -eq "") {
        $locStr = $BaseUrl
    }
    else {
        $locStr = "$BaseUrl/$($u.loc)"
    }
    $sitemapXml += "  <url>`n    <loc>$locStr</loc>`n    <changefreq>$($u.freq)</changefreq>`n    <priority>$($u.pri)</priority>`n  </url>`n"
}

foreach ($u in $urlsForSitemap) {
    $sitemapXml += "  <url>`n    <loc>$u</loc>`n    <changefreq>monthly</changefreq>`n    <priority>0.6</priority>`n  </url>`n"
}

$sitemapXml += '</urlset>'

Set-Content -Path $SitemapOut -Value $sitemapXml -Encoding UTF8
Write-Host "Saved sitemap to $SitemapOut"

Write-Host "DONE!"
