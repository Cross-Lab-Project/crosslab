#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

$SCRIPT_DIR/build.sh --spec-only $@