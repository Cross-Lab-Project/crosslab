#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

rm -rf node_modules

npm ci --install-links
npm run build

mkdir -p dist
rm -rf dist/*.tgz

if [ -f Dockerfile ]; then
  TAG=$(cat package.json | jq -r '.dockerName'):$(git rev-parse --short HEAD)
  $SCRIPT_DIR/build-docker.sh --tag $TAG
fi