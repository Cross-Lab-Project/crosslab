#!/bin/bash
set -e

# Default values
CI=false

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --ci)
      CI=true
      shift # past argument
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

rm -rf node_modules
npm ci
npm run generate
npm run generate-test