#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

npm -g install npm-check

for file in $(fd -gp '**/package.json'); do
  dir=$(dirname $file)
  (cd $dir && rm -f package-lock.json && npm-check -y && npm i && npm audit fix)&
done

wait $(jobs -p)
