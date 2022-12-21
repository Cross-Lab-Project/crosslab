#!/bin/bash
set -e

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
  mv package.json package.bak
  mv package-lock.json package-lock.bak
  npm install @redocly/cli
  mv package-lock.bak package-lock.json
  mv package.bak package.json
  npm run openapi-bundle
else
  npm install --install-links
  npm run build
fi