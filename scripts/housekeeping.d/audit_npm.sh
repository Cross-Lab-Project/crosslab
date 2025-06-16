#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

npm -g install npm-check

for file in $(fd -gp '**/package.json'); do
  dir=$(dirname $file)
  echo $dir
  (cd $dir && npm audit)
done

wait $(jobs -p)
