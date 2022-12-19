FROM ubuntu:22.04

ARG USERNAME=dev
ARG USER_UID=1000
ARG USER_GID=$USER_UID

SHELL ["/bin/bash", "--login", "-c"]

COPY container-scripts/common-debian.sh /tmp/container-scripts/
# Common
RUN apt-get update \
    # [Install zsh flag] [Non-root user] [User UID] [User GID] [Upgrade packages flag] [Install Oh My Zsh! flag] [Non-free packages flag]
    && bash /tmp/container-scripts/common-debian.sh "false" "${USERNAME}" "${USER_UID}" "${USER_GID}" "true" "false" "true"

COPY container-scripts/node-debian.sh /tmp/container-scripts/
# Install Node
ENV NVM_DIR="/usr/local/share/nvm"
ARG NODE_VERSION="lts/hydrogen"
ENV NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}
RUN apt-get update \
    # [Location to install nvm] [node version to install (use "none" to skip)] [non-root user] [Update rc files flag] [Install node-gyp deps flag]
    && bash /tmp/container-scripts/node-debian.sh "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}" "true" "false"

# Install Python 
ARG PYTHON_VERSIONS="3.8 3.9 3.10 3.11"
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && for VERSION in ${PYTHON_VERSIONS}; do DEBIAN_FRONTEND=noninteractive apt-get -y install python$VERSION python$VERSION-distutils python$VERSION-dev; done \
    && DEBIAN_FRONTEND=noninteractive apt-get -y install \
        python3 \
        python3-pip \
    && pip3 install --upgrade pip setuptools

# comment out [ -z "$PS1" ] && return in /etc/bash.bashrc
ENV PATH="$PATH:/home/${USERNAME}/.local/bin"

# install docker
RUN curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
RUN sh /tmp/get-docker.sh

# install rpiboot
RUN cd /opt/ \
    && DEBIAN_FRONTEND=noninteractive apt-get -y install git libusb-1.0-0-dev pkg-config bmap-tools \
    && git clone --depth=1 https://github.com/raspberrypi/usbboot \
    && cd usbboot \
    && make \
    && chmod +s rpiboot

ENV PATH="$PATH:/opt/usbboot"

# install kas
RUN sudo pip3 install kas

# Yocto Dependencies
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        gawk \
        wget \
        git-core \
        subversion \
        diffstat \
        unzip \
        sysstat \
        texinfo \
        build-essential \
        chrpath \
        socat \
        python3 \
        python3-pip \
        python3-pexpect \
        xz-utils  \
        locales \
        cpio \
        screen \
        tmux \
        sudo \
        iputils-ping \
        python3-git \
        python3-jinja2 \
        libegl1-mesa \
        libsdl1.2-dev \
        pylint \
        xterm \
        iproute2 \
        fluxbox \
        tightvncserver \
        lz4 \
        zstd \
        file

# aiortc dependencies
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libavdevice-dev libavfilter-dev libopus-dev libvpx-dev pkg-config

USER $USERNAME

RUN echo 'alias build="./scripts/build.sh"' >> ~/.bashrc \
    && echo 'alias build-spec="./scripts/build.sh -s"' >> ~/.bashrc \
    && echo 'alias lint="./scripts/lint.sh"' >> ~/.bashrc \
    && echo 'alias test="./scripts/test.sh"' >> ~/.bashrc

COPY container-scripts/entrypoint.sh /
ENTRYPOINT [ "/entrypoint.sh" ]