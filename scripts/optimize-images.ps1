Add-Type -AssemblyName System.Drawing

$src = "C:\Users\user\.cursor\projects\c-Users-user-Projects-wanda-group-landing\assets"
$dst = "C:\Users\user\Projects\wanda-group-landing\public\images\wg"
New-Item -ItemType Directory -Force -Path $dst | Out-Null

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L

Get-ChildItem $src -Filter 'wg-*.jpg' | ForEach-Object {
  $name = $_.Name -replace '^wg-', ''

  if ($name -like 'art*') { $maxWidth = 900 }
  elseif ($name -like 's[0-9]*') { $maxWidth = 1600 }
  else { $maxWidth = 1400 }

  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $ratio = [Math]::Min(1.0, $maxWidth / $img.Width)
  $w = [int]($img.Width * $ratio)
  $h = [int]($img.Height * $ratio)

  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $w, $h)

  $out = Join-Path $dst $name
  $bmp.Save($out, $codec, $params)

  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  $kb = [int]((Get-Item $out).Length / 1KB)
  Write-Host "$name  ${w}x${h}  ${kb}KB"
}
