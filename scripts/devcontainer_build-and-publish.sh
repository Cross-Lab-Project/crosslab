#!/bin/bash
set -e

devcontainer build --workspace-folder ./ --image-name crosslab/crosslab-devcontainer
docker push crosslab/crosslab-devcontainer