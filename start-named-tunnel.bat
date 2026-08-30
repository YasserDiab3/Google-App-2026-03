@echo off
title HSEHub360 Named Cloudflare Tunnel + SQL Backend
echo ====================================================
echo Starting HSE SQL Backend on Port 3001...
echo ====================================================
start /B node src/index.js
timeout /t 2 /nobreak >nul
echo ====================================================
echo Connecting HSEHub360 Cloudflare Tunnel...
echo ====================================================
if defined CLOUDFLARE_TUNNEL_TOKEN (
    "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --protocol http2 run --token %CLOUDFLARE_TUNNEL_TOKEN%
) else (
    "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://127.0.0.1:3001
)
pause
