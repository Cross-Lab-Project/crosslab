#!/bin/bash

SCRIPT_DIR=$(dirname "$0")

$SCRIPT_DIR/build.sh
$SCRIPT_DIR/build-docker.sh

# load to docker via ssh
cat ./dist/docker-image.tar | ssh rzadmin@www.dev.goldi-labs.de "cat - | docker load"
ssh rzadmin@www.dev.goldi-labs.de "cd /opt/crosslab && docker compose up -d --force-recreate lti"