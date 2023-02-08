#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
HELPER=$SCRIPT_DIR/../helper

npm cache clean --force

for file in $($HELPER/find_files.sh '*/package-lock.json'); do
  #rm -f $file
  dir=$(dirname $file)
  (cd $dir && npm install) &
done

wait $(jobs -p)