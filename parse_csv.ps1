$brandCsvPath = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi\Brands.csv"
$combinedCsvPath = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi\Brands+_+Products.csv"
$productsJsPath = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi\products-data.js"
$brandsJsPath = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi\brands-data.js"
$spareJsPath = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi\spare-parts-data.js"

function Clean-WixUrl ($url) {
    if ([string]::IsNullOrWhiteSpace($url) -or !($url.StartsWith("wix:image://"))) {
        return "assets/placeholder.jpg"
    }
    if ($url -match "\/([^\/]+\.(?:jpg|jpeg|png|webp|gif))#") {
        $filename = [System.Web.HttpUtility]::UrlDecode($matches[1])
        return "assets/products/" + $filename
    }
    return "assets/placeholder.jpg"
}

function Create-Slug($text) {
    if ([string]::IsNullOrWhiteSpace($text)) { return "" }
    $text = $text.ToLower()
    $text = $text -replace '[^a-z0-9]+', '-'
    $text = $text.Trim('-')
    return $text
}

function Clean-Text($text) {
    if ([string]::IsNullOrWhiteSpace($text)) { return "" }
    $text = $text -replace '\u00a0', ' '
    $text = $text -replace '`n', ' '
    $text = $text -replace '"', '\"'
    return $text.Trim()
}

Write-Host "Extracting Brands..."
$brandsDict = @{}

$brandsData = Import-Csv -LiteralPath $brandCsvPath -Encoding UTF8
foreach ($row in $brandsData) {
    $brandId = $row."ID"
    $title = $row."Title" -replace ' Fiyat Listesi', '' -replace ' Ürünleri', ''
    $title = $title.Trim()
    
    if ($title -eq "SICK") { $title = "SICK Sensor Intelligence" }

    if (![string]::IsNullOrWhiteSpace($brandId) -and ![string]::IsNullOrWhiteSpace($title)) {
        $brandsDict[$brandId] = @{
            id = Create-Slug $title
            name = $title
            description = "Explore our comprehensive range of $($title) industrial solutions. Demozi provides reliable supply and distribution for all $($title) components."
            logo = "assets/placeholder.jpg"
        }
    }
}

Write-Host "Found $($brandsDict.Count) Brands."

Write-Host "Extracting Products from Combined..."
$productsArray = @()

$combinedData = Import-Csv -LiteralPath $combinedCsvPath -Encoding UTF8
foreach ($row in $combinedData) {
    $title = Clean-Text $row."Title"
    $imageUrl = Clean-WixUrl $row."Image"
    $brandIdRaw = $row."Brand"
    $descText = Clean-Text $row."Text"
    
    if ([string]::IsNullOrWhiteSpace($title)) { continue }
    
    $brandSlug = "other"
    if ($brandsDict.ContainsKey($brandIdRaw)) {
        $brandSlug = $brandsDict[$brandIdRaw].id
    }
    
    $seoDesc = "Demozi Company supplies genuine $($title). "
    if (![string]::IsNullOrWhiteSpace($descText)) {
        $seoDesc += "Category: $($descText). "
    }
    $seoDesc += "Contact us for pricing, availability, and fast shipping to Iraq and the Middle East."
    
    $cat = "Industrial Components"
    if (![string]::IsNullOrWhiteSpace($descText)) { $cat = $descText }

    $productObj = @{
        id = Create-Slug $title
        name = $title
        brand = $brandSlug
        image = $imageUrl
        description = $seoDesc
        category = $cat
    }
    $productsArray += $productObj
}

Write-Host "Found $($productsArray.Count) Products."

# Convert to JSON (ensure correct formatting)
[System.Reflection.Assembly]::LoadWithPartialName("System.Web.Extensions") | Out-Null
$jsonSerializer = New-Object -TypeName System.Web.Script.Serialization.JavaScriptSerializer
$jsonSerializer.MaxJsonLength = [int]::MaxValue

$brandsOutput = "const brandsData = " + ($jsonSerializer.Serialize($brandsDict.Values)) + ";"
$productsOutput = "const productsData = " + ($jsonSerializer.Serialize($productsArray)) + ";"
$spareOutput = "const sparePartsData = [];"

Set-Content -Path $brandsJsPath -Value $brandsOutput -Encoding UTF8
Set-Content -Path $productsJsPath -Value $productsOutput -Encoding UTF8
Set-Content -Path $spareJsPath -Value $spareOutput -Encoding UTF8

Write-Host "Successfully generated products-data.js, brands-data.js, and spare-parts-data.js"
