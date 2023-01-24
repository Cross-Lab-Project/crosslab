#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

cd $SCRIPT_DIR/../..

# Default values
DRY_RUN=false
QUIET=false

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --repository)
      REPOSITORY="$2"
      shift # past argument
      shift # past value
      ;;

    --web-repository)
      WEB_REPOSITORY="$2"
      shift # past argument
      shift # past value
      ;;

    --directory)
      DIR="$2"
      shift # past argument
      shift # past value
      ;;

    --hash)
      HASH="$2"
      shift # past argument
      shift # past value
      ;;
    
    -n|--dry-run)
      DRY_RUN=true
      shift # past argument
      ;;

    -q|--quiet)
      QUIET=true
      shift # past argument
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

$QUIET || echo

if [ -z "$REPOSITORY" ]; then
  $QUIET || echo "No repository given"
  exit 1
fi

if [ -z "$WEB_REPOSITORY" ]; then
  $QUIET || echo "No web repository given"
  exit 1
fi

if [ -z "$DIR" ]; then
  $QUIET || echo "No directory given"
  exit 1
fi

if [ -z "$HASH" ]; then
  $QUIET || echo "No hash given"
  exit 1
fi

SERVER=${REPOSITORY/:*/}
RPATH=${REPOSITORY/*:/}

additional_rsync_args=""
if [ "$DRY_RUN" = true ]; then
  $QUIET || echo "Dry run: not uploading anything"
fi

$QUIET || echo "Repository: $REPOSITORY"
$QUIET || echo "Job: $DIR: $HASH"

# check if we have ssh access
if ssh -q -o StrictHostKeyChecking=no $SERVER "true"; then
  # check if $RPATH/jobs/$file/$hash exists
  if ssh -q -o StrictHostKeyChecking=no $SERVER "test -e $RPATH/jobs/$DIR/$HASH"; then
    $QUIET || echo "Found $RPATH/jobs/$DIR/$HASH. Downloading..."
    mkdir -p $DIR
    rsync -e "ssh -o StrictHostKeyChecking=no" -a $additional_rsync_args $REPOSITORY/jobs/$DIR/$HASH/ $DIR
    exit 0
  fi
else
  $QUIET || echo "No ssh access to $SERVER"
  exit 1
fi

exit 1