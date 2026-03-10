$jsPath = "C:\Users\garbarking\.gemini\antigravity\scratch\megastandard\products-data.js"
$outputPath = "C:\Users\garbarking\.gemini\antigravity\scratch\megastandard\sitemap.xml"

if (-not (Test-Path $jsPath)) {
    Write-Error "File not found: $jsPath"
    exit
}

$content = Get-Content $jsPath -Raw -Encoding utf8
$startIndex = $content.IndexOf("[")
$endIndex = $content.LastIndexOf("]")
$jsonPart = $content.Substring($startIndex, $endIndex - $startIndex + 1)

$products = $jsonPart | ConvertFrom-Json

$baseUrl = "https://megastandard.net"

$xml = "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`n"
$xml += "<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`">`n"

# Static URLs
$staticUrls = @(
    @{ loc = ""; priority = "1.0"; freq = "weekly" },
    @{ loc = "products.html"; priority = "0.8"; freq = "daily" },
    @{ loc = "brands.html"; priority = "0.8"; freq = "weekly" }
)

foreach ($item in $staticUrls) {
    $xml += "  <url>`n"
    $xml += "    <loc>$baseUrl/$($item.loc)</loc>`n"
    $xml += "    <changefreq>$($item.freq)</changefreq>`n"
    $xml += "    <priority>$($item.priority)</priority>`n"
    $xml += "  </url>`n"
}

# Products
foreach ($product in $products) {
    if ($product.id) {
        $xml += "  <url>`n"
        $xml += "    <loc>$baseUrl/product-details.html?id=$($product.id | Out-String | ForEach-Object { $_.Trim() })</loc>`n"
        $xml += "    <changefreq>monthly</changefreq>`n"
        $xml += "    <priority>0.6</priority>`n"
        $xml += "  </url>`n"
    }
}

$xml += "</urlset>"

$xml | Out-File -FilePath $outputPath -Encoding utf8
Write-Host "Sitemap generated with $($products.Count) products at $outputPath"
