#!/bin/sh

rm -rf venv
rm -rf db

npm ci
npm run test