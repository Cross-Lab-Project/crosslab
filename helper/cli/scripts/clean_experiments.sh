#!/bin/bash
crosslab experiment list --json | jq '.[] | select ( .status != "finished" ) | .url ' | xargs -L 1 -r crosslab experiment delete