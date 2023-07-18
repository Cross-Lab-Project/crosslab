#!/usr/bin/bash

current=$(pwd)
result=0

cd "$current/src/schedule-service"
npm test
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))
# cd "$current/src/booking-backend"
# npm test
cd "$current/src/device-reservation"
npm test
result=$(( $result == 0 ? ( $? == 0 ? 0 : 1 ) : 1 ))

cd $current
exit $result
