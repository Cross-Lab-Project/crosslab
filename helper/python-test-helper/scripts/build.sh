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

VERSION=$(echo $VERSION | sed 's/-/+/')

mv "setup.cfg" "setup.cfg.bak"
cat "setup.cfg.bak" | sed "s/version = "'.*'"/version = $VERSION/" > "setup.cfg"
output=$(python3 -m build -s)
echo "$output"
filename=$(echo "$output" | tail -n 1 | tr ' ' $'\n' | tail -n 1)
ln -sf "$filename" "dist/python-latest.tar.gz"
mv "setup.cfg.bak" "setup.cfg"