FROM ubuntu:20.04

ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=$USER_UID

SHELL ["/bin/bash", "--login", "-c"]

# Common
COPY container-scripts/common-debian.sh /tmp/container-scripts/
RUN apt-get update \
    # [Install zsh flag] [Non-root user] [User UID] [User GID] [Upgrade packages flag] [Install Oh My Zsh! flag] [Non-free packages flag]
    && bash /tmp/container-scripts/common-debian.sh "false" "${USERNAME}" "${USER_UID}" "${USER_GID}" "true" "false" "true"

# Install Python 
ARG PYTHON_VERSIONS="3.8 3.9 3.10 3.11"
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && for VERSION in ${PYTHON_VERSIONS}; do DEBIAN_FRONTEND=noninteractive apt-get -y install python$VERSION python$VERSION-distutils python$VERSION-dev; done \
    && DEBIAN_FRONTEND=noninteractive apt-get -y install \
        python3 \
        python3-pip \
    && pip3 install --upgrade pip setuptools


# Install Node
COPY container-scripts/node-debian.sh /tmp/container-scripts/
ENV NVM_DIR="/usr/local/share/nvm"
ARG NODE_VERSION="lts/hydrogen"
ENV NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}
RUN apt-get update \
    # [Location to install nvm] [node version to install (use "none" to skip)] [non-root user] [Update rc files flag] [Install node-gyp deps flag]
    && bash /tmp/container-scripts/node-debian.sh "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}" "true" "false"
ENV PATH="$PATH:/home/${USERNAME}/.local/bin"

# install docker
RUN curl -fsSL https://get.docker.com -o /tmp/get-docker.sh \
    && sh /tmp/get-docker.sh

# aiortc dependencies
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        libavdevice-dev \
        libavfilter-dev \
        libopus-dev \
        libvpx-dev \
        pkg-config

# install additional software
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        jq \
        fd-find \
        gettext-base \
        nginx \
    && sudo pip3 install tox build yq shyaml kas \
    && ln -s $(which fdfind) /usr/bin/fd 
RUN npm install -g badge-maker

RUN chmod 777 /var/lib/nginx/

RUN curl -# "https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F1070081%2Fchrome-linux.zip?alt=media" > /tmp/chrome-linux.zip \
    && unzip /tmp/chrome-linux.zip -d /opt/chromium \
    && rm /tmp/chrome-linux.zip \
    && ln -s /opt/chromium/chrome-linux/chrome /usr/bin/chromium \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libatk-bridge2.0-0 libgbm-dev

USER $USERNAME

#RUN echo 'alias build="./scripts/build.sh"' >> ~/.bashrc \
#    && echo 'alias build-spec="./scripts/build.sh -s"' >> ~/.bashrc \
#    && echo 'alias lint="./scripts/lint.sh"' >> ~/.bashrc \
#    && echo 'alias test="./scripts/test.sh"' >> ~/.bashrc


USER root

RUN set -eux; \
	apt-get update; \
	apt-get install -y gosu; \
	rm -rf /var/lib/apt/lists/*; \
# verify that the binary works
	gosu nobody true

COPY container-scripts/entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "sleep", "infinity" ]