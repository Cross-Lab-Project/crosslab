#!/bin/bash
set -e

SCRIPT_DIR=$(cd $(dirname "$0") && pwd)
ROOT_DIR=$(cd $SCRIPT_DIR/../ && pwd)

cd $ROOT_DIR
if [ ! -d "$ROOT_DIR/lib" ] && [ ! -d "$ROOT_DIR/app" ]; then
    tar xf $ROOT_DIR/dist/npm-latest.tgz --strip-components 1 -C $ROOT_DIR --exclude=package.json 2>/dev/null >/dev/null
fi
if [ ! -d "$ROOT_DIR/node_modules" ]; then
    npm ci 2>/dev/null >/dev/null
fi