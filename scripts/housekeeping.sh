#!/bin/bash
set -e

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

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
$SCRIPT_DIR/housekeeping/generate_readme_badges.sh --repository $REPOSITORY --web-repository $WEB_REPOSITORY --branch main $@
$SCRIPT_DIR/housekeeping/generate_readme_dependencies.sh --repository $REPOSITORY --web-repository $WEB_REPOSITORY $@
$SCRIPT_DIR/housekeeping/generate_vscode_configs.sh $@/workspaces/crosslab/helper

if [ "$CHECK" = true ]; then
  git diff --quiet
fi