#!/bin/bash
set -e

VERSION=0.0.0-dev
cat 'package.json' | jq --arg v "$VERSION" '.version = $v | (.dependencies[] | select(. | startswith("file:")))? = $v | (.devDependencies[] | select(. | startswith("file:")))? = $v | (.peerDependencies[] | select(. | startswith("file:")))? = $v' > package.resolved.json