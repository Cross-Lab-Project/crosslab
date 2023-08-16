#!/bin/sh

mkdir -p dist

docker-compose build
docker-compose up --no-color > dist/server.log 2>&1 &

rm -rf venv
virtualenv venv && venv/bin/pip install -r requirements.txt
npm ci

for url in "http://localhost/auth/status" "http://localhost/device/status" "http://localhost/auth/status"; do
    until $(curl --output /dev/null --silent --head --fail $url); do
        printf '.'
        sleep 5
    done
done

npm run test

docker-compose down
