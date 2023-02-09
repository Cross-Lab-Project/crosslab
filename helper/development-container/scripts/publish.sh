#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(pwd)/$(dirname "$0")" && pwd)

cd $SCRIPT_DIR/../

TAG="crosslab/devcontainer:latest"

while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -t|--tag)
      TAG="$2"
      shift # past argument
      shift # past value
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

cat dist/crosslab-devcontainer.tar | docker load
docker tag crosslab-devcontainer:build $TAG
docker push $TAG