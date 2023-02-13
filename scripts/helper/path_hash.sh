#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    -p|--path)
      if [ -z "$PATHS" ]; then
        PATHS="$2"
      else
        PATHS="$PATHS $2"
      fi
      shift # past argument
      shift # past value
      ;;
  esac
done

for path in $PATHS; do
  #check if path is a file
  if [ -f "$path" ]; then
    files="$path"
  else
    files="$(fd -L -H -tf -E scripts . $path)"
  fi
  if [ -z "$FILES" ]; then
    FILES="$files"
  else
    FILES="$FILES"$'\n'"$files"
  fi
done

(IFS=$'\n'; LC_COLLATE=C sha1sum $FILES | cut -c 1-40 | sort | sha1sum | cut -c 1-40)