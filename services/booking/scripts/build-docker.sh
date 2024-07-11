#!/usr/bin/bash

current=$(pwd)
result=0

cd "$current/src/device-reservation"
bash ./scripts/build-docker.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))
cd "$current/src/schedule-service"
bash ./scripts/build-docker.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))
cd "$current/src/booking-backend"
bash ./scripts/build-docker.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))
cd "$current/src/booking-frontend"
bash ./scripts/build-docker.sh
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))

cd $current
exit $result