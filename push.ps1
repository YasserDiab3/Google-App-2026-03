param([string]$CommitMsg = "")
$ErrorActionPreference = "Stop"
$FILE1 = "Frontend/js/modules/app-utils.js"
$FILE2 = "vercel-deploy/frontend/js/modules/app-utils.js"
$content1 = Get-Content $FILE1 -Raw -Encoding UTF8
if ($content1 -match "appVersion: '(\d+)\.(\d+)\.(\d+)'") {
    $major = [int]$Matches[1]; $minor = [int]$Matches[2]; $patch = [int]$Matches[3]
} else { Write-Error "appVersion not found"; exit 1 }
$oldVer = "$major.$minor.$patch"
$newPatch = $patch + 1
$newVer = "$major.$minor.$newPatch"
Write-Host "Bump version: v$oldVer -> v$newVer"
$oldStr = "appVersion: '$oldVer'"
$newStr = "appVersion: '$newVer'"
foreach ($f in @($FILE1, $FILE2)) {
    if (Test-Path $f) {
        $c = Get-Content $f -Raw -Encoding UTF8
        if ($c -match [regex]::Escape($oldStr)) {
            $c = $c -replace [regex]::Escape($oldStr), $newStr
            [System.IO.File]::WriteAllText((Resolve-Path $f).Path, $c, [System.Text.Encoding]::UTF8)
            Write-Host "  updated: $f"
        } else { Write-Warning "  skip: $f" }
    } else { Write-Warning "  missing: $f" }
}
git add $FILE1
if (Test-Path $FILE2) { git add $FILE2 }
if ($CommitMsg -ne "") {
    $msg = $CommitMsg + "`nchore: bump version $oldVer -> $newVer"
} else {
    $msg = "chore: bump version $oldVer -> $newVer"
}
git commit -m $msg
git push origin main
Write-Host "Done. New version: v$newVer"
