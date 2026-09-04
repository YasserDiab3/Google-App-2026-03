#!/usr/bin/env bash
# Run ON the OCI VM after cloud-init (as user hse or root).
# Usage:
#   sudo bash bootstrap-vm.sh /path/to/repo /path/to/wallet
set -euo pipefail

REPO_DIR="${1:-/opt/hse/app}"
WALLET_SRC="${2:-/opt/hse/wallet}"
DEPLOY_DIR="${REPO_DIR}/deploy/oci-compute"

if [[ ! -f "${DEPLOY_DIR}/docker-compose.yml" ]]; then
  echo "Missing ${DEPLOY_DIR}/docker-compose.yml — clone/copy repo first."
  exit 1
fi

if [[ ! -f "${DEPLOY_DIR}/.env" ]]; then
  echo "Create ${DEPLOY_DIR}/.env from .env.example first."
  exit 1
fi

if [[ ! -d "${WALLET_SRC}" ]]; then
  echo "Wallet dir not found: ${WALLET_SRC}"
  exit 1
fi

cd "${DEPLOY_DIR}"

# Load wallet into named volume
VOL_NAME="$(docker compose config --volumes | head -n1 || true)"
VOL_NAME="${VOL_NAME:-oci-compute_oracle-wallet}"
docker volume create "${VOL_NAME}" >/dev/null
docker run --rm \
  -v "${VOL_NAME}:/w" \
  -v "${WALLET_SRC}:/src:ro" \
  alpine:3.20 sh -c 'rm -rf /w/*; cp -a /src/. /w/; ls -la /w'

docker compose up -d --build

echo "Waiting for /health..."
for i in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:3001/health" >/tmp/hse-health.json 2>/dev/null; then
    cat /tmp/hse-health.json
    echo
    exit 0
  fi
  sleep 2
done

echo "Health check failed — see: docker compose logs hse-api"
docker compose logs --tail=80 hse-api || true
exit 1
