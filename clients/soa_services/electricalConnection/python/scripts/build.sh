#!/bin/bash
set -e

npm install --install-links
npm run generate

python3 -m build -s