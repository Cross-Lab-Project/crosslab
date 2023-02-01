#!/bin/bash
set -e

npm ci --install-links
npm run generate

python3 -m build -s