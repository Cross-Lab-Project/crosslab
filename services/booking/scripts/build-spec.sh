#!/bin/bash

current=$(pwd)

mkdir -p dist
mkdir -p src/booking-backend/dist
mkdir -p src/booking-frontend/dist
mkdir -p src/schedule-service/dist

rm -f dist/openapi.yml
echo "# This file was automatically generated - all changes will be lost\n" > dist/openapi.yml

cat api/openapi_start.yml >> dist/openapi.yml
cat src/schedule-service/api/component.yml >> dist/openapi.yml
cat src/booking-frontend/api/component.yml >> dist/openapi.yml
cat src/booking-backend/api/component.yml >> dist/openapi.yml
cat api/types.yml >> dist/openapi.yml

npx @redocly/cli bundle dist/openapi.yml --output dist/openapi.json

cd $current
