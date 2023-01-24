#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

cd $SCRIPT_DIR/../..

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -j|--job)
      JOB="$2"
      shift # past argument
      shift # past value
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

if [ -z "$JOB" ]; then
    jobs=$($SCRIPT_DIR/find_files.sh '*/dist/*.status')
else
    jobs=${JOB/:/\/dist\/}".status"
fi

for job in $jobs; do
    if [ ! -e "${job/.status/.badge}" ]; then
        script_name=${job##*/}
        script_name=${script_name%.status}
        script_name=${script_name/-/ / }

        status=$(cat "$job")
        if [ "$status" == "success" ]; then
            wget "https://img.shields.io/badge/$script_name-pass-success?style=flat-square" -q -O ${job/.status/.badge}
        else
            wget "https://img.shields.io/badge/$script_name-fail-critical?style=flat-square" -q -O ${job/.status/.badge}
        fi
    fi
done