#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

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
    files="$(fd -L -H -tf . $path)"
  fi
  if [ -z "$FILES" ]; then
    FILES="$files"
  else
    FILES="$FILES"$'\n'"$files"
  fi
done

sort <<< "$FILES"| git hash-object --stdin-paths | git hash-object --stdin