#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
HELPER_DIR=$(cd "$SCRIPT_DIR/../helper.d" && pwd)

SUBCOMMANDVARS=""

while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --check)
      CHECK=true
      shift # past argument
      ;;

    --repository)
      SUBCOMMANDVARS="$SUBCOMMANDVARS --repository $2"
      shift # past argument
      shift # past value
      ;;

    --web-repository)
      SUBCOMMANDVARS="$SUBCOMMANDVARS --web-repository $2"
      shift # past argument
      shift # past value
      ;;


    *) # unknown option
      shift # past argument
    ;;
  esac
done

if [ "$CHECK" = true ]; then
  staged_changes_hash=$(git diff --cached | sha1sum | cut -c 1-40)
fi

$SCRIPT_DIR/generate_readme_badges.sh --branch main $SUBCOMMANDVARS
$SCRIPT_DIR/generate_readme_dependencies.sh $SUBCOMMANDVARS
$SCRIPT_DIR/generate_vscode_configs.sh  $SUBCOMMANDVAR

if [ "$CHECK" = true ]; then
  if [ "$staged_changes_hash" != "$(git diff --cached | sha1sum | cut -c 1-40)" ]; then
    source $HELPER_DIR/printing_functions.sh
    echo -e "\n$RED""Housekeeping changes needs to be commited"
    exit 1
  fi
fi