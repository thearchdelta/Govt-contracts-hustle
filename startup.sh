#!/bin/sh
# Restart contract: bring the preview up if it is down. Idempotent.
if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
  exit 0
fi
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR" || exit 1
npm run dev >/tmp/brass-desk-dev.log 2>&1 &
exit 0
