#!/usr/bin/env bash
set -euo pipefail
if [[ -z "${FIREBASE_TOKEN:-}" ]]; then
  echo "FIREBASE_TOKEN not set. Export it first: export FIREBASE_TOKEN=your_token" >&2
  exit 1
fi
npm run build
npx firebase-tools deploy --only hosting,firestore:rules
