#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

rm -rf node_modules

rm -rf app
npm ci
npm run build

mkdir -p dist
rm -rf dist/*.tgz

$SCRIPT_DIR/replace_links_with_version.sh
mv package.json package.bak
cp package.resolved.json package.json
file=$(npm pack --pack-destination=./dist/)
ln -sf $file dist/npm-latest.tgz
mv package.bak package.json

if [ -f Dockerfile ]; then
  TAG=$(cat package.json | jq -r '.dockerName'):$(git rev-parse --short HEAD)
  $SCRIPT_DIR/build-docker.sh --tag $TAG
fi