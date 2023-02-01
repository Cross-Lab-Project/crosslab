#!/bin/bash
set -e

rm -rf node_modules
npm ci --install-links
npm run generate
npm run generate-test

python3 -m build