#!/usr/bin/env bash

mkdir -p build
mkdir -p dist

# Execute esbuild command
npx --yes esbuild src/index.ts --bundle --platform=node --outfile=build/index.js
node --experimental-sea-config sea-config.json

# Declare an associative array for binaries
declare -A binaries=(
    ["linux-x64"]="https://nodejs.org/dist/v22.13.1/node-v22.13.1-linux-x64.tar.xz"
    ["linux-armv7l"]="https://nodejs.org/dist/v22.13.1/node-v22.13.1-linux-armv7l.tar.xz"
    ["linux-arm64"]="https://nodejs.org/dist/v22.13.1/node-v22.13.1-linux-arm64.tar.xz"
    ["macos-x64"]="https://nodejs.org/dist/v22.13.1/node-v22.13.1-darwin-x64.tar.gz"
    ["macos-arm64"]="https://nodejs.org/dist/v22.13.1/node-v22.13.1-darwin-arm64.tar.gz"
    ["windows-x64"]="https://nodejs.org/dist/v22.13.1/node-v22.13.1-win-x64.zip"
    ["windows-x86"]="https://nodejs.org/dist/v22.13.1/node-v22.13.1-win-x86.zip"
)

# Loop through the binaries and download/extract them
for binary in "${!binaries[@]}"; do
    # Check if binary is already downloaded
    if [[ ${binaries[$binary]} == *.tar.xz ]]; then
        if ! [[ -f "build/${binary}.tar.xz" ]]; then
            wget "${binaries[$binary]}" -O "build/${binary}.tar.xz"
        fi
        tar -xf "build/${binary}.tar.xz" --no-anchored --transform="s/.*/build\/node-${binary}/g" bin/node
        npx postject build/node-${binary} NODE_SEA_BLOB build/index.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 
        mv "build/node-${binary}" "dist/crosslab-cli-${binary}"
    elif [[ ${binaries[$binary]} == *.tar.gz ]]; then
        if ! [[ -f "build/${binary}.tar.gz" ]]; then
            wget "${binaries[$binary]}" -O "build/${binary}.tar.gz"
        fi
        tar -xf "build/${binary}.tar.gz" --no-anchored --transform="s/.*/build\/node-${binary}/g" bin/node
        npx postject build/node-${binary} NODE_SEA_BLOB build/index.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 
        mv "build/node-${binary}" "dist/crosslab-cli-${binary}"
    elif [[ ${binaries[$binary]} == *.zip ]]; then
        if ! [[ -f "build/${binary}.zip" ]]; then
            wget "${binaries[$binary]}" -O "build/${binary}.zip"
        fi
        unzip -jp "build/${binary}.zip" */node.exe > "build/node-${binary}.exe"
        npx postject build/node-${binary}.exe NODE_SEA_BLOB build/index.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 --macho-segment-name NODE_SEA
        mv "build/node-${binary}.exe" "dist/crosslab-cli-${binary}.exe"
    fi
done