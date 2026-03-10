$ErrorActionPreference = "Stop"

$BaseDir = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi"
$JsFile = Join-Path $BaseDir "products-data.js"
$SparePartsFile = Join-Path $BaseDir "spare-parts-data.js"
$BrandsJson = Join-Path $BaseDir "brands.json"
$OutDir = Join-Path $BaseDir "brands"
$BrandsIndex = Join-Path $BaseDir "brands.html"

# Helper to extract JSON from JS
function Get-DataFromJs {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return @() }
    $content = Get-Content $Path -Raw -Encoding UTF8
    $startIndex = $content.IndexOf('[')
    $endIndex = $content.LastIndexOf(']')
    if ($startIndex -eq -1 -or $endIndex -eq -1) { return @() }
    $jsonContent = $content.Substring($startIndex, $endIndex - $startIndex + 1)
    try { return (ConvertFrom-Json $jsonContent) }
    catch { return @() }
}

Write-Host "Loading data..."
$products = Get-DataFromJs $JsFile
$spareParts = Get-DataFromJs $SparePartsFile
$allItems = @()
if ($products) { $allItems += $products }
if ($spareParts) { $allItems += $spareParts }

$brandDescriptions = @{}
if (Test-Path $BrandsJson) {
    $brandArray = Get-Content $BrandsJson -Raw | ConvertFrom-Json
    foreach ($b in $brandArray) { $brandDescriptions[$b.name] = $b.description }
}

$uniqueBrandsFromItems = $allItems | Where-Object { $_.brand } | Select-Object -ExpandProperty brand | Sort-Object -Unique
$uniqueBrands = ($brandDescriptions.Keys + $uniqueBrandsFromItems) | Sort-Object -Unique

if (Test-Path $OutDir) { Remove-Item -Path $OutDir -Recurse -Force }
New-Item -ItemType Directory -Path $OutDir | Out-Null

$brandsHtmlLinks = @()

# 1. Generate Individual Brand Pages
foreach ($brand in $uniqueBrands) {
    if (!$brand -or $brand -eq "Demozi") { continue }
    
    $brandSlug = $brand -replace '[^a-zA-Z0-9]+', '-'
    $brandSlug = $brandSlug.ToLower().TrimEnd('-')
    
    $desc = "Explore the full range of $brand industrial solutions and replacement parts currently available at Demozi."
    if ($brandDescriptions.ContainsKey($brand)) { $desc = $brandDescriptions[$brand] }
    
    $brandsHtmlLinks += "<a href='brands/$brandSlug.html' style='display:block; padding:40px 20px; background:#fff; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.05); text-align:center; text-decoration:none; color:var(--text-primary); font-family:Inter,sans-serif; transition:transform 0.2s, box-shadow 0.2s;' onmouseover='this.style.transform=`"translateY(-5px)`";this.style.boxShadow=`"0 8px 25px rgba(0,0,0,0.1)`"' onmouseout='this.style.transform=`"translateY(0)`";this.style.boxShadow=`"0 4px 15px rgba(0,0,0,0.05)`"'><h3 style='margin:0; font-size:1.5rem; text-transform:uppercase;'>$brand</h3></a>"

    # Filter products for this brand
    $brandProducts = $allItems | Where-Object { $_.brand -eq $brand }
    $productGridHtml = ""
    
    foreach ($prod in $brandProducts) {
        $pname = $prod.name
        $prodId = $prod.id
        $psafe = $pname -replace '[^a-zA-Z0-9]+', '-'
        $psafe = $psafe.ToLower().TrimEnd('-')
        if ($psafe.Length -gt 50) { $psafe = $psafe.Substring(0, 50).TrimEnd('-') }
        $prodUrl = "../products/$prodId-$psafe.html"
        
        $pimg = if ($prod.imageUrl) { $prod.imageUrl } else { "../assets/placeholder.jpg" }
        
        $waMessage = "Hello, I am interested in inquiring about pricing and availability for ($pname)."
        $waLink = "https://wa.me/905353457100?text=$([uri]::EscapeDataString($waMessage))"
        
        $productGridHtml += @"
        <div class="product-item" style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.05); display:flex; flex-direction:column;">
            <div style="height:200px; padding:20px; display:flex; align-items:center; justify-content:center; background:#f8f9fa;">
                <img src="$pimg" alt="$pname" style="max-height:100%; max-width:100%; object-fit:contain;">
            </div>
            <div style="padding:20px; text-align:center; display:flex; flex-direction:column; flex-grow:1;">
                <h4 style="margin:0 0 15px 0; font-size:1rem; color:var(--text-primary); line-height:1.4; flex-grow:1;"><a href="$prodUrl" style="color:inherit; text-decoration:none;">$pname</a></h4>
                <a href="$waLink" target="_blank" class="btn btn-primary" style="display:inline-block; width:100%; padding:10px 15px; border-radius:6px; background:#25D366; border:none; color:#fff; font-weight:bold; text-decoration:none;"><i class="fab fa-whatsapp"></i> Ask for Quote</a>
            </div>
        </div>
"@
    }

    $brandHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$brand Products | Demozi</title>
    <meta name="description" content="$desc">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="background-color: #f4f6f9;">
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
                <a href="../products.html" class="nav-link" data-i18n="nav_products">Products</a>
                <a href="../index.html#contact" class="btn btn-primary" data-i18n="nav_contact">Contact Us</a>

                <div class="lang-switcher">
                    <button class="lang-btn" data-lang="en">EN</button>
                    <button class="lang-btn" data-lang="tr">TR</button>
                    <button class="lang-btn" data-lang="ar">AR</button>
                </div>
            </nav>
        </div>
    </header>

    <div style="background-color: #fff; padding: 40px 0; border-bottom: 1px solid #eaeaea;">
        <div class="container">
            <div style="margin-bottom: 20px; font-size: 14px; color: #666;">
                <a href="../index.html" style="color:#0056b3; text-decoration:none;">Home</a> &raquo; 
                <a href="../brands.html" style="color:#0056b3; text-decoration:none;">Brands</a> &raquo; 
                <span style="color: #333;">$brand</span>
            </div>
            <h1 style="font-size: 2.5rem; color: var(--text-primary); margin-bottom: 15px; text-transform: uppercase; font-weight: 700;">$brand</h1>
            <p style="font-size: 1.1rem; color: #555; max-width: 800px; line-height: 1.6;">$desc</p>
        </div>
    </div>

    <section class="section-padding" style="min-height: calc(100vh - 300px); padding-top: 40px;">
        <div class="container">
            <h2 style="font-size: 1.5rem; margin-bottom: 30px; border-bottom: 2px solid var(--win-blue-light); padding-bottom: 10px; display: inline-block;">Available Products</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
                $productGridHtml
            </div>
        </div>
    </section>

    <footer class="footer" style="background-color: var(--win-blue); color: #fff; padding: 40px 0; text-align: center;">
        <div class="container">
            <p>&copy; 2024 Demozi. All rights reserved.</p>
        </div>
    </footer>
    <script src="../main.js"></script>
</body>
</html>
"@
    Set-Content -Path "brands/$brandSlug.html" -Value $brandHtml -Encoding UTF8
}

Write-Host "Generated individual brand pages."

# 2. Generate Main Brands.html Directory
$brandsGrid = $brandsHtmlLinks -join ""

$mainBrandsHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Brands | Demozi</title>
    <meta name="description" content="Explore our extensive portfolio of world-renowned industrial and manufacturing brands including Allen Bradley, ABB, Siemens, and more.">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body style="background-color: #f4f6f9;">
    <header class="navbar">
        <div class="container nav-container">
            <button class="mobile-menu-btn" aria-label="Toggle menu">
                <i class="fas fa-bars"></i>
            </button>

            <a href="index.html" class="logo">
                <img src="assets/logo_transparent.png" alt="Demozi Logo" class="logo-img" style="height: 60px; margin-right: 10px;">
                <div class="logo-text-container">
                    <div class="logo-text">Demozi Company</div>
                    <div class="logo-subtitle">General Trading Limited Liability Private Company</div>
                </div>
            </a>
            
            <nav class="nav-links">
                <a href="index.html#about" class="nav-link" data-i18n="nav_about">About Us</a>
                
                <div class="dropdown">
                    <button class="nav-link dropbtn"><span data-i18n="nav_divisions">Our Divisions</span> <i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content">
                        <a href="index.html#industrial" data-i18n="nav_industrial">Industrial & Coding Systems</a>
                        <a href="index.html#cosmetics" data-i18n="nav_cosmetics">Cosmetics & Beauty</a>
                        <a href="index.html#logistics" data-i18n="nav_logistics">Export & Logistics</a>
                    </div>
                </div>

                <div class="dropdown">
                    <button class="nav-link dropbtn"><span data-i18n="nav_trademarks">Trademarks</span> <i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content">
                        <a href="products.html?brand=sick">SICK</a>
                        <a href="products.html?brand=ifm">IFM</a>
                        <a href="products.html?brand=parker-meggitt">Parker Meggitt</a>
                        <a href="products.html?brand=abb">ABB</a>
                        <a href="products.html?brand=phoenix-contact">Phoenix Contact</a>
                        <a href="products.html?brand=siemens">Siemens</a>
                    </div>
                </div>

                <a href="brands.html" class="nav-link active" data-i18n="nav_brands">Brands</a>
                <a href="products.html" class="nav-link" data-i18n="nav_products">Products</a>
                <a href="index.html#contact" class="btn btn-primary" data-i18n="nav_contact">Contact Us</a>

                <div class="lang-switcher">
                    <button class="lang-btn" data-lang="en">EN</button>
                    <button class="lang-btn" data-lang="tr">TR</button>
                    <button class="lang-btn" data-lang="ar">AR</button>
                </div>
            </nav>
        </div>
    </header>

    <div style="background-color: #fff; padding: 60px 0; border-bottom: 1px solid #eaeaea; text-align: center;">
        <div class="container">
            <h1 style="font-size: 3rem; color: var(--text-primary); margin-bottom: 15px; text-transform: uppercase; font-weight: 800;">Our Brands</h1>
            <p style="font-size: 1.2rem; color: #555; max-width: 800px; margin: 0 auto; line-height: 1.6;">Demozi partners with the world's leading industrial manufacturers to bring you unmatched quality, reliability, and precision engineering.</p>
        </div>
    </div>

    <section class="section-padding" style="min-height: calc(100vh - 400px); padding-top: 60px;">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
                $brandsGrid
            </div>
        </div>
    </section>

    <footer class="footer" style="background-color: var(--win-blue); color: #fff; padding: 40px 0; text-align: center;">
        <div class="container">
            <p>&copy; 2024 Demozi. All rights reserved.</p>
        </div>
    </footer>
    <script src="main.js"></script>
</body>
</html>
"@

Set-Content -Path $BrandsIndex -Value $mainBrandsHtml -Encoding UTF8
Write-Host "Generated main brands directory."
Write-Host "Done!"
