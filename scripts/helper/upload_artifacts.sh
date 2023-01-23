#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")

cd $SCRIPT_DIR/../..

# Default values
DRY_RUN=false
QUIET=false

QUIETVAR=""

branch=$(git rev-parse --abbrev-ref HEAD)

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --branch)
      branch="$2"
      shift # past argument
      shift # past value
      ;;

    --repository)
      REPOSITORY="$2"
      shift # past argument
      shift # past value
      ;;
    
    -n|--dry-run)
      DRY_RUN=true
      shift # past argument
      ;;

    -q|--quiet)
      QUIET=true
      QUIETVAR="-q"
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

hash_files=$($SCRIPT_DIR/find_files.sh '*/dist/*.hash')
hash_files=${hash_files//.\//}
dist_paths=$($SCRIPT_DIR/find_files.sh '*/dist')
dist_paths=${dist_paths//.\//}

ref=$(git rev-parse HEAD)

SERVER=${REPOSITORY/:*/}
RPATH=${REPOSITORY/*:/}

additional_rsync_args=""
if [ "$DRY_RUN" = true ]; then
  $QUIET || echo "Dry run: not uploading anything"
fi

$QUIET || echo "Repository: $REPOSITORY"
$QUIET || echo "Ref: $ref"

for file in $dist_paths; do
  $QUIET || echo -e "upload $file\n    to $RPATH/$ref/$file"
  if [ "$DRY_RUN" = false ]; then
    ssh $QUIETVAR -o StrictHostKeyChecking=no $SERVER "install -d -m 0755 $RPATH/$ref/$file"
    rsync -e "ssh -o StrictHostKeyChecking=no" --chown www-data:www-data -a --delete $file/ $REPOSITORY/$ref/$file/
  fi
done


$QUIET || echo ""

for file in $hash_files; do
  hash=$(cat $file)
  file=$(dirname $file)
  $QUIET || echo -e "create link $RPATH/jobs/$file/$hash\n         to $RPATH/$ref/$file"
  if [ "$DRY_RUN" = false ]; then
    ssh $QUIETVAR -o StrictHostKeyChecking=no $SERVER "install -d -m 0755 $RPATH/jobs/$file && ln -sfT $RPATH/$ref/$file $RPATH/jobs/$file/$hash"
  fi
done;

if [ "$branch" != "HEAD" ]; then
  $QUIET || echo -e "create link $RPATH/$branch\n         to $RPATH/$ref"
  if [ "$DRY_RUN" = false ]; then
    ssh $QUIETVAR -o StrictHostKeyChecking=no $SERVER "ln -sfT $RPATH/$ref/ $RPATH/$branch"
  fi
fi
