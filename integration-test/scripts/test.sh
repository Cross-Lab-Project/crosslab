#!/bin/sh
set -e

mkdir -p dist

export GATEWAY_IMAGE=$(docker load -i ../services/gateway/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export AUTHENTICATION_IMAGE=$(docker load -i ../services/auth/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export AUTHORIZATION_IMAGE=$(docker load -i ../services/authorization/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export DEVICE_IMAGE=$(docker load -i ../services/device/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export EXPERIMENT_IMAGE=$(docker load -i ../services/experiment/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export FEDERATION_IMAGE=$(docker load -i ../services/federation/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export BOOKING_FRONTEND_IMAGE=$(docker load -i ../services/booking/src/booking-frontend/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export BOOKING_BACKEND_IMAGE=$(docker load -i ../services/booking/src/booking-backend/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export SCHEDULE_SERVICE_IMAGE=$(docker load -i ../services/booking/src/schedule-service/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")
export DEVICE_RESERVATION_IMAGE=$(docker load -i ../services/booking/src/device-reservation/dist/docker-image.tar | tail -1 | grep -Eo "[^ ]+$")

mkdir -p db
rm -rf db/*

COMPOSE_HTTP_TIMEOUT=600 docker compose up --force-recreate --no-color > dist/server.log 2>&1 &
end_time=$(($(date +%s) + 600))  # Set end time to 10 minutes from now

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

ctrl_c () {
    echo "Stopping containers and removing volumes!"
    docker compose down --volumes > dist/server.log 2>&1
    exit 1
}

#rm -rf venv
virtualenv venv && venv/bin/pip install -r requirements.txt
npm ci

for url in "http://localhost/auth/status" "http://localhost/device/status" "http://localhost/authorization/status" "http://localhost/federation/status" "http://localhost/experiment/status"; do
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

export USERNAME="admin"
export PASSWORD="admin"

npm run test

docker compose down --volumes > dist/server.log 2>&1
