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

dependencies_replacement=$(LC_CTYPE=en_US.utf8 LC_COLLATE=C cat package.json | jq -r '.dependencies + .devDependencies + .peerDependencies | .[]' | grep -E '^file:' | sort | uniq)
sed_expression=""
for dependency in $dependencies_replacement; do
    dependency_path=$(echo "$dependency" | sed 's/file://')
    archive_path=$(readlink -f $dependency_path/dist/npm-latest.tgz)
    version=$(tar xfO "$archive_path" package/package.json | jq -r '.version')
    sed_expression="$sed_expression""s#$dependency#$version#g;"
done
cat package.json | sed "$sed_expression" | jq --arg v "$VERSION" '.version = $v' > package.resolved.json
mv package.json package.bak
cp package.resolved.json package.json
file=$(npm pack --pack-destination=./dist/)
ln -sf $file dist/npm-latest.tgz
mv package.bak package.json