# Read both files
$mainContent = Get-Content "products-data.js" -Raw
$extraContent = Get-Content "extra_products.txt" -Raw

# Clean up extra JSON text to be just the comma separated objects
$extraContent = $extraContent.Trim()
if ($extraContent.StartsWith("[")) {
    $extraContent = $extraContent.Substring(1)
}
if ($extraContent.EndsWith("]")) {
    $extraContent = $extraContent.Substring(0, $extraContent.Length - 1)
}

# Find the end of productsData array in mainContent
# It usually ends with "];\n" or "];"
$mainContent = $mainContent.TrimEnd()
if ($mainContent.EndsWith(";")) {
    $mainContent = $mainContent.Substring(0, $mainContent.Length - 1)
}
if ($mainContent.EndsWith("]")) {
    $mainContent = $mainContent.Substring(0, $mainContent.Length - 1)
}

# Concatenate: original minus ']' + ',' + extraContent + '];'
$finalContent = $mainContent + "," + "`r`n" + $extraContent + "`r`n];"

Set-Content "products-data.js" $finalContent
Write-Host "Success! products-data.js updated."
