#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

# Default values
SPEC_ONLY=false

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -s|--spec-only)
      SPEC_ONLY=true
      shift # past argument
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

if [ "$SPEC_ONLY" = true ] ; then
  mv package.json package.bak || true
  mv package-lock.json package-lock.bak || true
  npm install @redocly/cli
  mv package-lock.bak package-lock.json
  mv package.bak package.json
  npm run openapi-bundle
else
  mkdir -p dist
  npm install --install-links
  npm run build
  $SCRIPT_DIR/replace_links_with_version.sh
  mv package.json package.bak
  cp package.resolved.json package.json
  npm pack --pack-destination=./dist/
  mv package.bak package.json
fi