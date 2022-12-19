#!/bin/bash

set -e

# Download script libraries
docker load -i dist/crosslab-development-container-latest.tar
docker push crosslab/development-container:latest