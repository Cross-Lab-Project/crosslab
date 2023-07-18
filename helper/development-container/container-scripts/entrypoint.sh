#!/bin/sh
set -e
DOCKER_SOCKET=/var/run/docker.sock

# check if localhost is in /etc/hosts
grep -q localhost /etc/hosts || sudo bash -c 'echo "127.0.0.1 localhost" >> /etc/hosts'
grep -q $(hostname) /etc/hosts || sudo bash -c 'echo "127.0.0.1 $(hostname)" >> /etc/hosts'

# Start needed services
sudo service rabbitmq-server restart
sudo service mysql start
sudo mysql -e "CREATE DATABASE unittest DEFAULT CHARSET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER 'test'@localhost IDENTIFIED BY 'test';"
sudo mysql -e "GRANT ALL PRIVILEGES ON unittest.* to 'test'@localhost;"
sudo mysql -e "FLUSH PRIVILEGES;"

# if $USER is not set, set it to the current user
if [ -z "$USER" ]; then
    USER=dev
fi

if [ -S ${DOCKER_SOCKET} ]; then
    DOCKER_GID=$(stat -c '%g' ${DOCKER_SOCKET})
    DOCKER_GROUP=$(getent group ${DOCKER_GID} | awk -F ":" '{ print $1 }')
    if [ $DOCKER_GROUP ]
    then
        sudo usermod -g $DOCKER_GROUP $USER 
    else
        sudo addgroup --system --gid ${DOCKER_GID} docker-host
        sudo usermod -g docker-host $USER 
    fi
fi

gosu $USER "$@"