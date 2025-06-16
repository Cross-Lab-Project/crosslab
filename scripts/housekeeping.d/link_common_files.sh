#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

COMMON_DIR=$(realpath $SCRIPT_DIR/../../common)

for file in $(fd -gp '**/package.json'); do
  dir=$(dirname $file)
  common_dir=$(realpath --relative-to=$dir $COMMON_DIR)
  rm -f $dir/eslint.config.mjs
  rm -f $dir/.prettierrc*
  cp $dir/$common_dir/node/eslint.config.mjs $dir/eslint.config.mjs
  ln -s $common_dir/node/.prettierrc $dir/.prettierrc
  cat $dir/package.json | jq 'del( .prettier, .eslintConfig )' > $dir/package.mod.json && mv $dir/package.mod.json $dir/package.json
done
