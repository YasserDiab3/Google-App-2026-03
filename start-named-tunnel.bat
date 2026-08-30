@echo off
title HSEHub360 Named Cloudflare Tunnel + SQL Backend
echo ====================================================
echo Starting HSE SQL Backend on Port 3001...
echo ====================================================
start /B node src/index.js
timeout /t 2 /nobreak >nul
echo ====================================================
echo Connecting HSEHub360 Named Cloudflare Tunnel...
echo ====================================================
"C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --protocol http2 run --token eyJhIjoiZGFiOTdkNjZiMjU4ZmM2YmViNmQyMjg3NWE2MzcwNTUiLCJ0IjoiZmMyZmJkOTgtNzU5Yi00Yjg4LThiZjgtZWY4NjNhNGZkNzdjIiwicyI6Ill6YzNNekU1WW1JdFl6azNOeTAwT1RGaUxUa3hZamt0WlRSbU5UWTFNREJtTkRjMyJ9
pause
