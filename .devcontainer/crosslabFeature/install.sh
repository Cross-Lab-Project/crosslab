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

chmod 777 /var/lib/nginx/
curl -# "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F1070081%2Fchrome-linux.zip?alt=media" > /tmp/chrome-linux.zip \
    && unzip /tmp/chrome-linux.zip -d /opt/chromium \
    && rm /tmp/chrome-linux.zip \
    && ln -s /opt/chromium/chrome-linux/chrome /usr/bin/chromium \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libatk-bridge2.0-0 libgbm-dev

pip3 install tox build yq twine

npm install -g @devcontainers/cli
git config --global --add safe.directory /workspaces/crosslab