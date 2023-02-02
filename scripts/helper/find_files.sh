#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

cd $SCRIPT_DIR/../..

find -L -path "$1" -o \( -name 'build' -o -name 'node_modules' -o -path './crosslab' -o -path './badges' -o -name '\.tox' -o -name '\.pytest_cache' -o -name 'venv' \) -prune -false
