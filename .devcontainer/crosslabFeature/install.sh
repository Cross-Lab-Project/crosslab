DEBIAN_FRONTEND=noninteractive apt-get update

# install additional dependencies for booking service
DEBIAN_FRONTEND=noninteractive apt-get install -y \
    rabbitmq-server \
    mariadb-server \
    mariadb-client

# aiortc dependencies
DEBIAN_FRONTEND=noninteractive apt-get install -y \
    libavdevice-dev \
    libavfilter-dev \
    libopus-dev \
    libvpx-dev \
    pkg-config
# other stuff
DEBIAN_FRONTEND=noninteractive apt-get install -y \
    jq \
    fd-find \
    nginx
ln -s $(which fdfind) /usr/bin/fd 

pip3 install tox build yq twine

npm install -g @devcontainers/cli
git config --global --add safe.directory /workspaces/crosslab