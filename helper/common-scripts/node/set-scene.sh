#!/bin/bash
set -e

SCRIPT_DIR=$(cd $(dirname "$0") && pwd)
ROOT_DIR=$(cd $SCRIPT_DIR/../ && pwd)

tar xf $ROOT_DIR/dist/npm-latest.tgz --strip-components 1 -C $ROOT_DIR --exclude=package.json