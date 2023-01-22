#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

cd $SCRIPT_DIR/../

export SECURITY_ISSUER="http://localhost"
export SECURITY_AUDIENCE="http://localhost"
export BASE_URL="http://localhost"

CSI='\x1b['

(cd backend-services/auth && \
   PORT=3000 \
   ALLOWLIST=localhost:authservice,localhost:deviceservice,localhost:experimentservice,localhost:federationservice,localhost:updateservice \
   npm run start 2>&1 | sed 's/^/Auth:'"${CSI}19G"'| /') &
(cd backend-services/device && PORT=3001 npm run start 2>&1 | sed 's/^/Device:'"${CSI}19G"'| /') &
(cd backend-services/experiment && PORT=3002 npm run start 2>&1 | sed 's/^/Experiment:'"${CSI}19G"'| /') &
(cd backend-services/federation && PORT=3003 npm run start 2>&1 | sed 's/^/Federation:'"${CSI}19G"'| /') &

(cd backend-services/gateway && \
 docker run \
    -e AUTH_SERVICE_URL="127.0.0.1:3000" \
    -e DEVICE_SERVICE_URL="127.0.0.1:3001" \
    -e EXPERIMENT_SERVICE_URL="127.0.0.1:3002" \
    -e FEDERATION_SERVICE_URL="127.0.0.1:3003" \
    -e UPDATE_SERVICE_URL="127.0.0.1:1" \
    -e SERVER_NAME="localhost" \
    --net host \
 gateway:latest 2>&1 | sed 's/^/Gateway:'"${CSI}19G"'| /') &

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
  
wait -n