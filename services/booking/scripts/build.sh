#!/usr/bin/bash

current=$(pwd)

rm -rf "$current/src/booking-backend/app"
rm -rf "$current/src/booking-frontend/app"
rm -rf "$current/src/common/lib"
rm -rf "$current/src/device-reservation/app"
rm -rf "$current/src/schedule-service/app"
rm -rf "$current/src/test_common/lib"

cd "$current/src/common"
bash ./scripts/build.sh
cd "$current/src/device-reservation"
bash ./scripts/build.sh
cd "$current/src/test_common"
bash ./scripts/build.sh
cd "$current/src/schedule-service"
bash ./scripts/build.sh
cd "$current/src/booking-backend"
bash ./scripts/build.sh
cd "$current/src/booking-frontend"
bash ./scripts/build.sh

cd $current
