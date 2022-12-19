#!/bin/sh
set -e
DOCKER_SOCKET=/var/run/docker.sock

# if $USER is not set, set it to the current user
if [ -z "$USER" ]; then
    USER=$(whoami)
fi

if [ -S ${DOCKER_SOCKET} ]; then
    DOCKER_GID=$(stat -c '%g' ${DOCKER_SOCKET})
    DOCKER_GROUP=$(getent group ${DOCKER_GID} | awk -F ":" '{ print $1 }')
    if [ $DOCKER_GROUP ]
    then
        sudo usermod -g $DOCKER_GROUP $USER 
        newgrp docker-host
    else
        sudo addgroup --system --gid ${DOCKER_GID} docker-host
        sudo usermod -g docker-host $USER 
        newgrp docker-host
    fi
fi