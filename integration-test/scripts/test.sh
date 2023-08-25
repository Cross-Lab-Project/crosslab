#!/bin/sh

mkdir -p dist

export GATEWAY_IMAGE=$(docker load -i ../services/gateway/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export AUTHENTICATION_IMAGE=$(docker load -i ../services/auth/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export AUTHORIZATION_IMAGE=$(docker load -i ../services/authorization/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export DEVICE_IMAGE=$(docker load -i ../services/device/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export EXPERIMENT_IMAGE=$(docker load -i ../services/experiment/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export FEDERATION_IMAGE=$(docker load -i ../services/federation/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")

COMPOSE_HTTP_TIMEOUT=600 docker-compose up --no-color > dist/server.log 2>&1 &

rm -rf venv
virtualenv venv && venv/bin/pip install -r requirements.txt
npm ci

end_time=$(($(date +%s) + 60))  # Set end time to 60 seconds from now

for url in "http://localhost/auth/status" "http://localhost/device/status" "http://localhost/auth/status"; do
    while true; do
        if curl --output /dev/null --silent --head --fail "$url"; then
            break  # Exit the loop if the URL is accessible
        fi

        if [ "$(date +%s)" -ge "$end_time" ]; then
            echo "Timed out while waiting for the server."
            exit 1
        fi

        printf '.'
        sleep 5
    done
done


npm run test

docker-compose down
