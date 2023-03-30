#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
HELPER_DIR=$(cd "$SCRIPT_DIR/helper.d" && pwd)
HOUSEKEEPING_DIR=$(cd "$SCRIPT_DIR/housekeeping.d" && pwd)

while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --check)
      CHECK=true
      shift # past argument
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

REPOSITORY=admin@ci.goldi-labs.de:/data/www/ci/crosslab
WEB_REPOSITORY=https://ci.goldi-labs.de/crosslab

if [ "$CHECK" = true ]; then
  staged_changes_hash=$(git diff --cached | sha1sum | cut -c 1-40)
fi

$HOUSEKEEPING_DIR/generate_readme_badges.sh --repository $REPOSITORY --web-repository $WEB_REPOSITORY --branch main $@
$HOUSEKEEPING_DIR/generate_readme_dependencies.sh --repository $REPOSITORY --web-repository $WEB_REPOSITORY $@
$HOUSEKEEPING_DIR/generate_vscode_configs.sh $@/workspaces/crosslab/helper

if [ "$CHECK" = true ]; then
  if [ "$staged_changes_hash" != "$(git diff --cached | sha1sum | cut -c 1-40)" ]; then
    source $HELPER_DIR/printing_functions.sh
    echo -e "\n$RED""Housekeeping changes needs to be commited"
    exit 1
  fi
fi