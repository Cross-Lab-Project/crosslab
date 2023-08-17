#!/bin/sh

mkdir -p dist

#docker-compose build
#docker-compose up --no-color > dist/server.log 2>&1 &

#rm -rf venv
#virtualenv venv && venv/bin/pip install -r requirements.txt
#npm ci

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
