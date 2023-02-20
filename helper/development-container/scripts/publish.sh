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

    --docker-prefix)
      DOCKER_PREFIX="$2"
      shift # past argument
      shift # past value
      ;;

    --latest)
      LATEST=true
      shift # past argument
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

if [ -z "$DOCKER_PREFIX" ]; then
  echo "Missing docker prefix"
  exit 1
fi


cd $SCRIPT_DIR/..

# load docker image and check it has the correct tag
LOADED_TAG=$(cat "./dist/crosslab-devcontainer.tar" | docker load | sed -e 's/^.* //')
TAG=devcontainer:${VERSION}

# tag image with right prefix
docker tag $LOADED_TAG $DOCKER_PREFIX/$TAG
docker push $DOCKER_PREFIX/$TAG

if [ "$LATEST" = true ]; then
  TAG=devcontainer:latest
  docker tag $LOADED_TAG $DOCKER_PREFIX/$TAG
  docker push $DOCKER_PREFIX/$TAG
fi