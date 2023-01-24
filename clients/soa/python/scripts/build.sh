#!/bin/bash
set -e

rm -rf node_modules
npm ci --install-links
npm run generate

python3 -m build