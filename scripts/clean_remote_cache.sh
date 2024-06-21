#!/bin/bash
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

REPOSITORY=admin@ci.goldi-labs.de:/data/www/ci/crosslab


######################################################################################################
SERVER=${REPOSITORY/:*/}
RPATH=${REPOSITORY/*:/}


# List all active branches
BRANCHES=$(git branch -r --list "origin/*" | sed -e 's/origin\///g' | grep -v HEAD | tr -d ' ')

# List all Tags
TAGS=$(git tag)

# get the full commit hash of the last 3 commits of each branch
refs=""
for branch in $BRANCHES; do
    refs="$refs"$'\n'$(git log -n 3 --pretty=format:"%H" origin/$branch)
done

for branch in $TAGS; do
    refs="$refs"$'\n'$(git log -n 1 --pretty=format:"%H" $branch)
done

# remove first line
refs=$(echo "$refs" | sed -e '1d' | sort | uniq)

# list all directories in the remote cache
dirs=$(ssh $SERVER ls -1 $RPATH)

# remove all items from the dir list that are in refs or branches
for ref in $refs; do
    dirs=$(echo "$dirs" | grep -v $ref)
done
for branch in $BRANCHES; do
    dirs=$(echo "$dirs" | grep -v $branch)
done
for branch in $TAGS; do
    dirs=$(echo "$dirs" | grep -v $branch)
done
dirs=$(echo "$dirs" | grep -v "jobs")

# remove all directories that are not in the refs or branches list
for dir in $dirs; do
    echo "Removing $dir"
    ssh $SERVER rm -rf $RPATH/$dir
done

# find all symbolic links in jobs directory
symlinks=$(ssh $SERVER find $RPATH/jobs -type l ! -readable)

# remove dangling symbolic links
for symlink in $symlinks; do
    echo "Removing dangling symlink $symlink"
    ssh $SERVER rm $symlink
done