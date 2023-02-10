#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

VERSION=0.0.0-dev.$(git rev-parse --short HEAD)
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --version)
      VERSION="$2"
      shift # past argument
      shift # past value
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

rm -rf node_modules

rm -rf app
npm ci
npm run build

mkdir -p dist
rm -rf dist/*.tgz

cat 'package.json' | jq --arg v "$VERSION" '.version = $v | (.dependencies[] | select(. | startswith("file:")))? = $v | (.devDependencies[] | select(. | startswith("file:")))? = $v | (.peerDependencies[] | select(. | startswith("file:")))? = $v' > package.resolved.json
mv package.json package.bak
cp package.resolved.json package.json
file=$(npm pack --pack-destination=./dist/)
ln -sf $file dist/npm-latest.tgz
mv package.bak package.json