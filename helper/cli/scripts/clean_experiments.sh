#!/bin/bash
crosslab experiment list | jq '.[] | select ( .status != "finished" ) | .url ' | xargs -L 1 -r crosslab experiment delete