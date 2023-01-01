#!/bin/bash
set -e

rm -rf .packages
mkdir .packages

function get_local_dependencies() {
    dependencies=$(cat $1 | jq -r '.dependencies | .. ')
    # extract lines starting with file:
    dependencies=$(echo "$dependencies" | grep -E '^file:')
    # remove file: prefix
    dependencies=$(echo "$dependencies" | sed 's/file://')

    # for each dependency, recursively call this function
    for dependency in $dependencies; do
        d=$(get_local_dependencies $dependency/package.json)
        # prefix dependency path to each line
        d=$(echo "$d" | sed 's~^~'$dependency/'~')
        # append to dependencies
        dependencies="$dependencies"$'\n'"$d"
    done

    # remove tailing slash
    dependencies=$(echo "$dependencies" | sed 's~/$~~')

    # remove duplicates
    dependencies=$(echo "$dependencies" | sort | uniq)
    echo "$dependencies"
}

# copy dependencies to dist folder
for dependency in $(get_local_dependencies package.json); do
    cp $dependency/dist/*.tgz .packages/
done

cp ./dist/*.tgz .packages/
