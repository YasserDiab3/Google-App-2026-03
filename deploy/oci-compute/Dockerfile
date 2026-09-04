# HSE SQL API — OCI Compute (Oracle primary)
FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

# Repo root context — clinic-repo is file:.. from backend-sql
WORKDIR /repo
COPY package.json ./
COPY backend-sql/package.json backend-sql/package-lock.json* ./backend-sql/
WORKDIR /repo/backend-sql
RUN npm install --omit=dev --no-audit --no-fund \
  && npm install oracledb@6.10.0 deasync@0.1.31 --no-audit --no-fund

COPY backend-sql/ ./

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3001 \
    DB_TYPE=oracle

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/health" || exit 1

CMD ["node", "src/index.js"]
