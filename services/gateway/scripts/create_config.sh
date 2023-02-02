#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

NGINX_ENVSUBST_TEMPLATE_DIR=$SCRIPT_DIR/../conf NGINX_ENVSUBST_OUTPUT_DIR=$SCRIPT_DIR/../conf_compiled $SCRIPT_DIR/../create_config.sh