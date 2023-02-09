#!/bin/bash
set -e

rm -rf node_modules
npm ci
npm run build