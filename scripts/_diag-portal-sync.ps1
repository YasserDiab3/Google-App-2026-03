function Invoke-GasPost([string]$json) {
  $jsonPath = Join-Path $env:TEMP ("gas-" + [guid]::NewGuid().ToString('N') + ".json")
  $hdrPath = Join-Path $env:TEMP ("gas-" + [guid]::NewGuid().ToString('N') + ".hdr")
  [System.IO.File]::WriteAllText($jsonPath, $json, [System.Text.UTF8Encoding]::new($false))
  $url = "https://script.google.com/macros/s/AKfycbw6ycjx5XAyHKCqW6kzMwWjOxuv7fdm-rBbKN9f1nhp7300R87hTNsQmZfSa49qeGlQ/exec"
  curl.exe -sS -D "$hdrPath" -o NUL -X POST -H "Content-Type: text/plain;charset=utf-8" --data-binary "@$jsonPath" "$url" | Out-Null
  $loc = (Select-String -Path $hdrPath -Pattern '^Location:\s*(.+)$' | Select-Object -Last 1).Matches.Groups[1].Value.Trim()
  return (curl.exe -sS "$loc")
}

Write-Output '=== FIND 6763 ==='
Invoke-GasPost '{"action":"smokeFindDscByNeedle","needle":"DSR-202609-6763"}'
Write-Output ''
Write-Output '=== LIVE version ==='
curl.exe -sS -L --max-time 25 "https://icapphub.vercel.app/version.json"
Write-Output ''
Write-Output '=== LIVE /api/gas ==='
curl.exe -sS -L --max-time 40 -w "`nHTTP=%{http_code}`n" -X POST -H "Content-Type: application/json; charset=utf-8" --data-binary "{\"action\":\"testConnection\"}" "https://icapphub.vercel.app/api/gas"
Write-Output ''
Write-Output '=== LIVE portal markers ==='
curl.exe -sS -L --max-time 30 "https://icapphub.vercel.app/daily-safety" -o "$env:TEMP\live-pds.html"
if (Test-Path "$env:TEMP\live-pds.html") {
  Select-String -Path "$env:TEMP\live-pds.html" -Pattern "/api/gas|retrySyncBtn|signature: ''|HSE_DEFAULT_GAS" | Select-Object -First 10 | ForEach-Object { ($_.Line.Trim()).Substring(0, [Math]::Min(160, $_.Line.Trim().Length)) }
  Write-Output ("SIZE=" + (Get-Item "$env:TEMP\live-pds.html").Length)
}
