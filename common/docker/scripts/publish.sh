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
LOADED_TAG=$(cat "./dist/docker-image.tar" | docker load | sed -e 's/^.* //')
TAG_BASE=${LOADED_TAG%:*}
TAG=$TAG_BASE:${VERSION}
if [ "$LOADED_TAG" != "$TAG" ]; then
  # addional check for build images (devcontainer)
  if [ "$LOADED_TAG" != "$TAG_BASE:build" ]; then
    echo "Loaded docker image has wrong tag: $LOADED_TAG"
    exit 1
  fi
fi

# tag image with right prefix
docker tag $LOADED_TAG $DOCKER_PREFIX/$TAG
docker push $DOCKER_PREFIX/$TAG

if [ "$LATEST" = true ]; then
  TAG=$TAG_BASE:latest
  docker tag $LOADED_TAG $DOCKER_PREFIX/$TAG
  docker push $DOCKER_PREFIX/$TAG
fi