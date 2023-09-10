#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

cd $SCRIPT_DIR/../

export SECURITY_ISSUER="http://localhost"
export SECURITY_AUDIENCE="http://localhost"
export BASE_URL="http://localhost"

CSI='\x1b['

#(cd services/auth && \
#   PORT=3000 \
#   ALLOWLIST=localhost:authservice,localhost:deviceservice,localhost:experimentservice,localhost:federationservice,localhost:updateservice \
#   node ./app/index.js 2>&1 | sed 's/^/Auth:'"${CSI}19G"'| /') &
#(cd services/device && \
#   PORT=3001 \
#   NODE_OPTIONS='--inspect=9001' \
#   node ./app/index.js 2>&1 | sed 's/^/Device:'"${CSI}19G"'| /') &
#(cd services/experiment && \
#   PORT=3002 \
#   NODE_OPTIONS='--inspect=9002' \
#   node ./app/index.js 2>&1 | sed 's/^/Experiment:'"${CSI}19G"'| /') &
#(cd services/federation && \
#   PORT=3003 \
#   NODE_OPTIONS='--inspect=9003' \
#   node ./app/index.js 2>&1 | sed 's/^/Federation:'"${CSI}19G"'| /') &

(cd services/gateway && docker run -t \
   --env AUTH_SERVICE_URL="127.0.0.1:3000" \
   --env DEVICE_SERVICE_URL="127.0.0.1:3001" \
   --env EXPERIMENT_SERVICE_URL="127.0.0.1:3002" \
   --env FEDERATION_SERVICE_URL="127.0.0.1:3003" \
   --env UPDATE_SERVICE_URL="127.0.0.1:1" \
   --env SERVER_NAME="localhost" \
   --network host \
   $(docker load -i ./dist/docker-image.tar | sed -e 's/^.* //') \
    | sed 's/^/Gateway:'"${CSI}19G"'| /') &

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
  
wait