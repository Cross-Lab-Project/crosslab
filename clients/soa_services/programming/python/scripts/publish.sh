#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

LATEST=false
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

if [ -z "$VERSION" ]; then
  echo "Missing version"
  exit 1
fi


cd $SCRIPT_DIR/..

file=$(readlink -f "dist/python-latest.tar.gz")
version=${file%.tar.gz}
version=${version##*-}

if [ "$version" != "$VERSION" ]; then
    echo "Version mismatch: $version != $VERSION"
    exit 1
fi

python3 -m twine upload $file