#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

npm cache clean --force

for file in $(fd -gp '**/package-lock.json'); do
  rm -f $file
  dir=$(dirname $file)
  (cd $dir && npm install) &
done

wait $(jobs -p)