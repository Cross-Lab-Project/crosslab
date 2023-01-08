#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

mv package.json package.bak || true
mv package-lock.json package-lock.bak || true

npm install @redocly/cli

mv package-lock.bak package-lock.json
mv package.bak package.json

npm run openapi-bundle