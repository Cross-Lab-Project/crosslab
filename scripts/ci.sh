#!/bin/bash
REPOSITORY=admin@ci.goldi-labs.de:/data/www/ci/crosslab
WEB_REPOSITORY=https://ci.goldi-labs.de/crosslab

TAGGED=false

while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --tag)
      TAGGED=true
      shift # past argument
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

$SCRIPT_DIR/ci.d/ci.sh --repository $REPOSITORY --web-repository $WEB_REPOSITORY $@

if [ "$TAGGED" = false ]; then
    $SCRIPT_DIR/housekeeping.sh --check
fi