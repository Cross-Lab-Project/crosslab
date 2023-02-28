#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

DOCKER_PREFIX=crosslab

LATEST=false
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
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

cd $SCRIPT_DIR/..

VERSION=$(cat VERSION)

PUBLISH_SCRIPTS=$(fd -e sh '^publish')

for script in $PUBLISH_SCRIPTS; do
  # if script dir doesnt contain dist folder skip
  if [ ! -d "$(dirname $(dirname $script))/dist" ]; then
    continue
  fi
  echo ""
  echo "Publishing $script"
  if [ "$LATEST" = true ]; then
    $script --version $VERSION --docker-prefix $DOCKER_PREFIX --latest
  else
    $script --version $VERSION --docker-prefix $DOCKER_PREFIX
  fi
done
