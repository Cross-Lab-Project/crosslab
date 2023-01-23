#!/bin/sh

SCRIPT_DIR=$(dirname "$0")
GIT_DIR=$(realpath $SCRIPT_DIR/../)

rm $GIT_DIR/.git/hooks/pre-commit
cat $GIT_DIR/git-hooks/pre-commit | sed 's#$GIT_DIR#'"$GIT_DIR"'#g' > $GIT_DIR/.git/hooks/pre-commit
chmod +x $GIT_DIR/.git/hooks/pre-commit
