#!/bin/bash

set -e

# Download script libraries
mkdir -p container-scripts
wget https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/node-debian.sh -O container-scripts/node-debian.sh
wget https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/common-debian.sh -O container-scripts/common-debian.sh

# Build the container
docker build -t crosslab/development-container:latest .

# Save the container to a tar file
mkdir -p dist
docker save crosslab/development-container:latest > dist/crosslab-development-container-latest.tar