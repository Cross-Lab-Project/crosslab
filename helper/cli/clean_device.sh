#!/bin/bash
crosslab device list --json | jq '.[] | select ( .name == "ECP" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list --json | jq '.[] | select ( .name == "FSM" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list --json | jq '.[] | select ( .name == "TI-Lab-ECP" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list --json | jq '.[] | select ( .name == "3-Axis-Portal(virtual)" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete
crosslab device list --json | jq '.[] | select ( .name == "TI - Kombinatorik ECP" and .type == "device" ) | .url ' | xargs -L 1 -r crosslab device delete