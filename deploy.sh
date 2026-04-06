#!/usr/bin/env bash
# Local deployment: install deps, env, seed DB, start frontend + backend dev servers.
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh              # install, seed, start dev
#   ./deploy.sh --skip-seed  # install, start dev without seeding
#
# Requires: Node.js, npm, MongoDB running (see backend/.env MONGODB_URI)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

SKIP_SEED=0
for arg in "$@"; do
  case "$arg" in
    --skip-seed) SKIP_SEED=1 ;;
    -h|--help)
      echo "Usage: $0 [--skip-seed]"
      echo "  Installs dependencies, ensures backend/.env, seeds DB (unless --skip-seed), runs npm run dev."
      exit 0
      ;;
  esac
done

echo "==> Stranger Things Mongo Quest — local deploy"
echo "    Root: $ROOT"
echo ""

command -v node >/dev/null 2>&1 || { echo "Error: Node.js is required."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Error: npm is required."; exit 1; }

echo "==> Installing dependencies"
npm install
npm install --prefix backend
npm install --prefix frontend

if [[ ! -f backend/.env ]]; then
  if [[ -f backend/.env.example ]]; then
    echo "==> Creating backend/.env from .env.example"
    cp backend/.env.example backend/.env
  else
    echo "Warning: backend/.env missing and no .env.example found. Create backend/.env with MONGODB_URI and PORT."
  fi
else
  echo "==> backend/.env already exists"
fi

echo ""
echo "==> MongoDB: ensure the server in MONGODB_URI is running (default mongodb://localhost:27017)"
echo ""

if [[ "$SKIP_SEED" -eq 0 ]]; then
  echo "==> Seeding database..."
  npm run seed
else
  echo "==> Skipping seed (--skip-seed). Run later: npm run seed"
fi

echo ""
echo "==> Starting local stack (backend :3001, frontend :5173)"
echo "    Press Ctrl+C to stop both servers."
echo ""
exec npm run dev
