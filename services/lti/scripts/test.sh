#!/bin/sh

mkdir -p dist

rm -rf db

npm ci
npm run test