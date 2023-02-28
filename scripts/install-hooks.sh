#!/bin/sh

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
GIT_DIR=$(cd "$SCRIPT_DIR/../" && pwd)

rm $GIT_DIR/.git/hooks/pre-commit
cat $GIT_DIR/git-hooks/pre-commit | sed 's#$GIT_DIR#'"$GIT_DIR"'#g' > $GIT_DIR/.git/hooks/pre-commit
chmod +x $GIT_DIR/.git/hooks/pre-commit
