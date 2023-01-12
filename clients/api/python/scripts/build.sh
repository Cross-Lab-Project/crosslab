#!/bin/bash
set -e

rm -rf node_modules
npm install --install-links
npm run generate
npm run generate-test

python3 -m build