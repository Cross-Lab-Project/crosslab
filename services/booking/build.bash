#!/usr/bin/bash

current=$(pwd)

rm -rf "$current/src/booking-backend/app"
rm -rf "$current/src/booking-frontend/app"
rm -rf "$current/src/common/lib"
rm -rf "$current/src/device-reservation/app"
rm -rf "$current/src/schedule-service/app"
rm -rf "$current/src/test_common/lib"

cd "$current/src/common"
npm run build
cd "$current/src/device-reservation"
npm run build
cd "$current/src/test_common"
npm run build
cd "$current/src/schedule-service"
npx openapi-codegen -i dist/openapi.json -p @cross-lab-project/codegen-typescript-addon:preset:service -o src/generated
npm run build
cd "$current/src/booking-backend"
npx openapi-codegen -i dist/openapi.json -p @cross-lab-project/codegen-typescript-addon:preset:service -o src/generated
npm run build
cd "$current/src/booking-frontend"
npx openapi-codegen -i dist/openapi.json -p @cross-lab-project/codegen-typescript-addon:preset:service -o src/generated
npm run build

cd $current
