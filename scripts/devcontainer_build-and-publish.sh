#!/bin/bash
set -e

devcontainer build --workspace-folder ./ --image-name crosslab/devcontainer
docker push crosslab/devcontainer