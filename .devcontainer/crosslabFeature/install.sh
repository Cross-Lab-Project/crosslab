DEBIAN_FRONTEND=noninteractive

apt-get update

# install additional dependencies for booking service
apt-get install -y \
    rabbitmq-server \
    mariadb-server \
    mariadb-client

# Install Python 3.8 - 3.11
apt-get -y install software-properties-common
add-apt-repository -y ppa:deadsnakes/ppa
apt-get update
PYTHON_VERSIONS="3.8 3.9 3.10 3.11 3.12"
for VERSION in ${PYTHON_VERSIONS}; do 
    apt-get -y install python$VERSION python$VERSION-distutils python$VERSION-dev
done

# aiortc dependencies
apt-get install -y \
    libavdevice-dev \
    libavfilter-dev \
    libopus-dev \
    libvpx-dev \
    pkg-config
# other stuff
apt-get install -y \
    jq \
    fd-find \
    nginx
ln -s $(which fdfind) /usr/bin/fd 

chmod 777 /var/lib/nginx/
curl -# "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F1070081%2Fchrome-linux.zip?alt=media" > /tmp/chrome-linux.zip \
    && unzip /tmp/chrome-linux.zip -d /opt/chromium \
    && rm /tmp/chrome-linux.zip \
    && ln -s /opt/chromium/chrome-linux/chrome /usr/bin/chromium \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libatk-bridge2.0-0 libgbm-dev

# install opa and openfga
curl -L -o /usr/bin/opa https://openpolicyagent.org/downloads/v0.54.0/opa_linux_amd64_static && chmod 755 /usr/bin/opa
curl -L https://github.com/openfga/openfga/releases/download/v1.2.0/openfga_1.2.0_linux_amd64.tar.gz | tar -xz -C /opt/ && chmod 755 /opt/openfga && ln -s /opt/openfga /usr/bin/openfga

pip3 install tox build yq twine

npm install -g @devcontainers/cli
git config --global --add safe.directory /workspaces/crosslab