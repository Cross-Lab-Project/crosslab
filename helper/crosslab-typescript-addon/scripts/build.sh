#!/bin/bash
set -e

rm -rf node_modules
npm ci --install-links
npm run build