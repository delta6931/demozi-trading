Add-Type -AssemblyName System.Drawing
$inputFile = "C:\Users\garbarking\.gemini\antigravity\scratch\megastandard\assets\logo.png"
$outputFile = "C:\Users\garbarking\.gemini\antigravity\scratch\megastandard\assets\logo_transparent.png"

$img = [System.Drawing.Image]::FromFile($inputFile)
$bmp = new-object System.Drawing.Bitmap($img)
$img.Dispose()

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $color = $bmp.GetPixel($x, $y)
        if ($color.R -gt 240 -and $color.G -gt 240 -and $color.B -gt 240) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        }
    }
}
$bmp.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "Background removed successfully!"
