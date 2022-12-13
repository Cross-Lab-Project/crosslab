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

npm run openapi-bundle
if [ "$SPEC_ONLY" = false ] ; then
  npm install
  npm run build
fi