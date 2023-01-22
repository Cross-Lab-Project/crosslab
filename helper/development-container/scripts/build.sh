#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

# default values
NO_EXPORT=false

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -t|--tag)
      if [ -z "$ADDITIONAL_TAGS" ]; then
        ADDITIONAL_TAGS="$2"
      else
        ADDITIONAL_TAGS="$ADDITIONAL_TAGS $2"
      fi
      shift # past argument
      shift # past value
      ;;

    --no-export)
      NO_EXPORT=true
      shift # past argument
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

# Download script libraries
mkdir -p container-scripts
wget https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/node-debian.sh -O container-scripts/node-debian.sh
wget https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/common-debian.sh -O container-scripts/common-debian.sh

# Build the container
docker build --no-cache -t crosslab-devcontainer:build .
if [ -n "$ADDITIONAL_TAGS" ]; then
  for tag in $ADDITIONAL_TAGS; do
    docker tag crosslab-devcontainer:build $tag
  done
fi

# Save the container to a tar file
if [ "$NO_EXPORT" = false ]; then
  mkdir -p dist
  docker save crosslab-devcontainer:build > dist/crosslab-devcontainer.tar
fi