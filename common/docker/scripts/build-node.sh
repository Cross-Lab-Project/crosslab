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
rm -rf .packages
mkdir .packages

function get_local_dependencies() {
    dependencies=$(cat $1 | jq -r '.dependencies | .. ')
    # extract lines starting with file:
    dependencies=$(echo "$dependencies" | grep -E '^file:')
    # remove file: prefix
    dependencies=$(echo "$dependencies" | sed 's/file://')

    # for each dependency, recursively call this function
    for dependency in $dependencies; do
        d=$(get_local_dependencies $(dirname $dependency)/package.json)
        # prefix dependency path to each line
        d=$(echo "$d" | sed 's~^~'$dependency/'~')
        # append to dependencies
        dependencies="$dependencies"$'\n'"$d"
    done

    # remove tailing slash
    dependencies=$(echo "$dependencies" | sed 's~/$~~')

    # remove duplicates
    dependencies=$(LC_CTYPE=en_US.utf8 LC_COLLATE=C echo "$dependencies" | sort | uniq)
    echo "$dependencies"
}

# copy dependencies to dist folder
for dependency in $(get_local_dependencies package.json); do
    cp $(readlink -f $dependency/dist/npm-latest.tgz) .packages/
done

cp $(readlink -f ./dist/npm-latest.tgz) .packages/ | true

# build docker image
docker build -t $TAG .

# Save the container to a tar file
mkdir -p dist
docker save $TAG > ./dist/docker-image.tar