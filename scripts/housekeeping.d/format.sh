#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

for file in $(fd -gp '**/package-lock.json'); do
  dir=$(dirname $file)
  (cd $dir && npm run format )&
done

wait $(jobs -p)
