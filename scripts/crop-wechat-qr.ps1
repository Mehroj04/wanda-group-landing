Add-Type -AssemblyName System.Drawing

$src = "C:\Users\user\.cursor\projects\c-Users-user-Projects-wanda-group-landing\assets\c__Users_user_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_photo_5220031461640052609_y-97d79671-f95b-46df-b5fe-116a2880602d.png"
$dst = "C:\Users\user\Projects\wanda-group-landing\public\images\wechat-qr.png"

$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap $img
$img.Dispose()

$w = $bmp.Width
$h = $bmp.Height
$rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$bytes = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
$bmp.UnlockBits($data)

# Count near-black pixels per row and per column. QR modules are pure black and
# dense; the avatar is coloured and the caption text is light grey, so a high
# threshold isolates the code itself.
$rowCount = New-Object int[] $h
$colCount = New-Object int[] $w
for ($y = 0; $y -lt $h; $y++) {
  $base = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    $o = $base + $x * 4
    if ($bytes[$o] -lt 90 -and $bytes[$o + 1] -lt 90 -and $bytes[$o + 2] -lt 90) {
      $rowCount[$y]++
      $colCount[$x]++
    }
  }
}

function Get-Span($counts, $minHits) {
  $first = -1; $last = -1
  for ($i = 0; $i -lt $counts.Length; $i++) {
    if ($counts[$i] -ge $minHits) {
      if ($first -lt 0) { $first = $i }
      $last = $i
    }
  }
  return @($first, $last)
}

# Columns are reliable: only the code spans that horizontal band. Rows are not,
# because the contact name above the code is dark too. So take the width from the
# columns and slide a square window down the image to find the densest position.
$colSpan = Get-Span $colCount 60
$pad = 20
$x0 = [Math]::Max(0, $colSpan[0] - $pad)
$x1 = [Math]::Min($w - 1, $colSpan[1] + $pad)
$side = [Math]::Min($x1 - $x0 + 1, $h)

$bandCount = New-Object int[] $h
for ($y = 0; $y -lt $h; $y++) {
  $base = $y * $stride
  for ($x = $x0; $x -le $x1; $x++) {
    $o = $base + $x * 4
    if ($bytes[$o] -lt 90 -and $bytes[$o + 1] -lt 90 -and $bytes[$o + 2] -lt 90) { $bandCount[$y]++ }
  }
}

$best = -1; $bestY = 0; $running = 0
for ($y = 0; $y -lt $h; $y++) {
  $running += $bandCount[$y]
  if ($y -ge $side) { $running -= $bandCount[$y - $side] }
  if ($y -ge $side - 1 -and $running -gt $best) { $best = $running; $bestY = $y - $side + 1 }
}

$sx = $x0
$sy = $bestY
Write-Host "cols $($colSpan[0])..$($colSpan[1])  square ${side}px at x=$sx y=$sy"

$out = 480
$crop = New-Object System.Drawing.Bitmap $out, $out
$g = [System.Drawing.Graphics]::FromImage($crop)
$g.Clear([System.Drawing.Color]::White)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$srcRect = New-Object System.Drawing.Rectangle $sx, $sy, $side, $side
$dstRect = New-Object System.Drawing.Rectangle 0, 0, $out, $out
$g.DrawImage($bmp, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$crop.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
$bmp.Dispose()

$kb = [int]((Get-Item $dst).Length / 1KB)
Write-Host "saved ${out}x${out}  ${kb}KB  ->  $dst"
