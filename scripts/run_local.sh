#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

cd $SCRIPT_DIR/../

export SECURITY_ISSUER="http://localhost"
export SECURITY_AUDIENCE="http://localhost"
export BASE_URL="http://localhost"

CSI='\x1b['

(cd services/auth && \
   PORT=3000 \
   ALLOWLIST=localhost:authservice,localhost:deviceservice,localhost:experimentservice,localhost:federationservice,localhost:updateservice \
   NODE_OPTIONS='--inspect=9000' \
   node ./app/index.js 2>&1 | sed 's/^/Auth:'"${CSI}19G"'| /') &
(cd services/device && \
   PORT=3001 \
   NODE_OPTIONS='--inspect=9001' \
   node ./app/index.js 2>&1 | sed 's/^/Device:'"${CSI}19G"'| /') &
(cd services/experiment && \
   PORT=3002 \
   NODE_OPTIONS='--inspect=9002' \
   node ./app/index.js 2>&1 | sed 's/^/Experiment:'"${CSI}19G"'| /') &
(cd services/federation && \
   PORT=3003 \
   NODE_OPTIONS='--inspect=9003' \
   node ./app/index.js 2>&1 | sed 's/^/Federation:'"${CSI}19G"'| /') &

(cd services/gateway && \
   AUTH_SERVICE_URL="127.0.0.1:3000" \
   DEVICE_SERVICE_URL="127.0.0.1:3001" \
   EXPERIMENT_SERVICE_URL="127.0.0.1:3002" \
   FEDERATION_SERVICE_URL="127.0.0.1:3003" \
   UPDATE_SERVICE_URL="127.0.0.1:1" \
   SERVER_NAME="localhost" \
   NGINX_PID_PATH='/tmp/nginx.pid' \
   ./scripts/create_config.sh && \
   nginx -g "daemon off;" '-p' $PWD/conf_compiled, '-c' $PWD/conf_compiled/nginx.conf  2>&1 | sed 's/^/Gateway:'"${CSI}19G"'| /') &

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
  
wait -n