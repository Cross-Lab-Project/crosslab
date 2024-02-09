#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

npm -g install npm-check

for file in $(fd -gp '**/package-lock.json'); do
  dir=$(dirname $file)
  (cd $dir && npm-check -y )&
done

wait $(jobs -p)
