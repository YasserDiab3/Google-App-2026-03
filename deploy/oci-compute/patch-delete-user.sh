#!/usr/bin/env bash
# تطبيق إصلاح deleteUser على VM API (تشغيل من داخل الجهاز أو عبر SSH)
set -euo pipefail
TARGET="${1:-/opt/hse/app/backend-sql/src/handlers/auth-handlers.js}"
SRC="${2:-}"

if [[ -n "$SRC" && -f "$SRC" ]]; then
  cp -f "$SRC" "$TARGET"
elif [[ ! -f "$TARGET" ]]; then
  echo "الملف غير موجود: $TARGET"
  exit 1
fi

if ! grep -q "'deleteUser'" "$TARGET"; then
  echo "خطأ: deleteUser غير موجود في $TARGET — انسخ الملف المحدّث أولاً"
  exit 1
fi

sudo systemctl restart hse-api
sleep 2
systemctl is-active hse-api
echo "OK: hse-api أعيد تشغيله مع deleteUser"
