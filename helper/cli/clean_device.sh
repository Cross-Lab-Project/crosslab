#!/bin/bash
crosslab device list | jq '.[] | select ( .name == "ECP" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list | jq '.[] | select ( .name == "FSM" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list | jq '.[] | select ( .name == "TI-Lab-ECP" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list | jq '.[] | select ( .name == "3-Axis-Portal(virtual)" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list | jq '.[] | select ( .description == "Virtual PSPU for the 3 AxisPortal" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list | jq '.[] | select ( .name == "TI - Kombinatorik ECP" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete