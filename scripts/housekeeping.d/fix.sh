#!/bin/bash
#set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

COMMON_DIR=$(realpath $SCRIPT_DIR/../../common)

for file in $(fd -gp '**/eslint.config.mjs'); do
  dir=$(dirname $file)
  e=$(cd $dir && npx eslint)
  #extract @typescript-eslint/* errors only keep the exact error
  errors="$errors $(echo "$e" | grep error | grep '@typescript-eslint' | sed 's/.*\(@typescript-eslint\/[a-z-]*\).*/\1/')"
  errors=$(echo $errors | tr ' ' '\n' | sort -u)
  echo $errors
done
