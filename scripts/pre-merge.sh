#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)


git pull origin main || true
git merge main --no-commit || true

$SCRIPT_DIR/housekeeping.sh --branch main
git commit --no-verify