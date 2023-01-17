docker run \
    -e AUTH_SERVICE_URL="127.0.0.1:3000" \
    -e DEVICE_SERVICE_URL="127.0.0.1:3001" \
    -e EXPERIMENT_SERVICE_URL="127.0.0.1:3002" \
    -e FEDERATION_SERVICE_URL="127.0.0.1:3003" \
    -e UPDATE_SERVICE_URL="127.0.0.1:1" \
    -e SERVER_NAME="localhost" \
    --net host \
gateway-service:$(git rev-parse --short HEAD) 2>&1 | sed 's/^/Gateway:'"${CSI}19G"'| /' &