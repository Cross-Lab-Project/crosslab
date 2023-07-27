#!/bin/sh

mkdir -p dist

rm -rf venv
rm -rf db

npm ci
npm run test