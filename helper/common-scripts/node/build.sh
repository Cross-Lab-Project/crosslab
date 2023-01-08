#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

npm install --install-links
npm run build

mkdir -p dist
rm -rf dist/*.tgz

$SCRIPT_DIR/replace_links_with_version.sh
mv package.json package.bak
cp package.resolved.json package.json
npm pack --pack-destination=./dist/
mv package.bak package.json

if [ -f Dockerfile ]; then
  TAG=$(cat package.json | jq -r '.dockerName'):$(git rev-parse --short HEAD)
  $SCRIPT_DIR/build-docker.sh --tag $TAG
fi