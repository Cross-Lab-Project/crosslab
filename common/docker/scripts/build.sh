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

TAG=$(cat package.json | jq -r '.dockerName'):${VERSION}

# build docker image
docker build -t $TAG .

# Save the container to a tar file
if [ "$NO_EXPORT" = false ]; then
  mkdir -p dist
  docker save $TAG > ./dist/docker-image.tar
fi