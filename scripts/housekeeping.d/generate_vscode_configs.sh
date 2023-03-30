#!/bin/bash

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
GIT_DIR=$(cd "$SCRIPT_DIR/../.." && pwd)

cd "$GIT_DIR"

config_paths=$($SCRIPT_DIR/find_files.sh '*.vscode/settings.json')
NL=$'\n'

for config_path in $config_paths; do
    dir=$(dirname $(dirname $config_path))
    while [ "$dir" != "." ]; do
        if [ ! -f "$dir/.vscode/settings.json" ]; then
            config_paths="$config_paths$NL$dir/.vscode/settings.json"
            mkdir -p "$dir/.vscode"
            touch "$dir/.vscode/.hidden"
            cat <<EOF > "$dir/.vscode/settings.json"
{
}
EOF
            git add $dir/.vscode/.hidden
            git add $dir/.vscode/settings.json
        fi
        dir=$(dirname $dir)
    done
done

config_paths=$(LC_CTYPE=C LC_COLLATE=C echo "$config_paths" | sort)

# get excludes from toplevel
topdir=$(echo "$config_paths" | head -n 1)
topdir_toplevel=$(dirname $(dirname $topdir))
content=$(cat $topdir)
content=$(python3 -c "import re;print(re.sub(r'(\n.*\/\/begin generated[\s\S]*?\/\/end generated)', '', \"\"\"$content\"\"\"))")
toplevel_files_exclude=$files_exclude$NL$(python3 -c "import re;"\
"m=re.search(r'\"files\.exclude\"[\s\S]*?{([\s\S]*?)}', \"\"\"$content\"\"\");"\
"print('\n'.join([s.strip().replace('\"','\"',1) for s in m.group(1).split('\n')]) if m else '');")
toplevel_files_watcherExclude=$files_watcherExclude$NL$(python3 -c "import re;"\
"m=re.search(r'\"files\.watcherExclude\"[\s\S]*?{([\s\S]*?)}', \"\"\"$content\"\"\");"\
"print('\n'.join([s.strip().replace('\"','\"',1) for s in m.group(1).split('\n')]) if m else '');")
# filter for lines starting with '**'
toplevel_files_exclude=$(echo "$toplevel_files_exclude" |grep '^\"\*\*')
toplevel_files_watcherExclude=$(echo "$toplevel_files_watcherExclude" |grep '^\"\*\*')

for config_path in $config_paths; do
    # find all subdirectories
    toplevel=$(dirname $(dirname $config_path))
    subdirs=$(echo "$config_paths" | grep "$toplevel")
    files_exclude=""
    files_watcherExclude=""
    if [ "$toplevel" != "$topdir_toplevel" ]; then
        files_exclude=$toplevel_files_exclude
        files_watcherExclude=$toplevel_files_watcherExclude
    fi
    for subdir in $subdirs; do
        if [ $subdir = $config_path ]; then continue; fi
        subdir_toplevel=$(dirname $(dirname $subdir))
        content=$(cat $subdir)
        content=$(python3 -c "import re;print(re.sub(r'(\n.*\/\/begin generated[\s\S]*?\/\/end generated)', '', \"\"\"$content\"\"\"))")
        rel_path=${subdir_toplevel/"$toplevel/"/""}
        files_exclude=$files_exclude$NL$(python3 -c "import re;"\
"m=re.search(r'\"files\.exclude\"[\s\S]*?{([\s\S]*?)}', \"\"\"$content\"\"\");"\
"print('\n'.join([s.strip().replace('\"','\"$rel_path/',1) for s in m.group(1).split('\n')]) if m else '');")
        files_watcherExclude=$files_watcherExclude$NL$(python3 -c "import re;"\
"m=re.search(r'\"files\.watcherExclude\"[\s\S]*?{([\s\S]*?)}', \"\"\"$content\"\"\");"\
"print('\n'.join([s.strip().replace('\"','\"$rel_path/',1) for s in m.group(1).split('\n')]) if m else '');")
        if [ -f "$subdir_toplevel/.vscode/.hidden" ]; then
            files_exclude=$files_exclude$NL'"'$rel_path'/.vscode": true,'
        fi
    done
    files_exclude=$(LC_CTYPE=C LC_COLLATE=C echo "$files_exclude" | sort | uniq -u | sed 's/^/        /')
    files_watcherExclude=$(LC_CTYPE=C LC_COLLATE=C echo "$files_watcherExclude" | sort | uniq -u | sed 's/^/        /')
    content=$(cat $config_path)
    cp "$config_path" "$config_path.bak"
    # remove generated code
    content=$(python3 -c "import re;print(re.sub(r'(\n.*\/\/begin generated[\s\S]*?\/\/end generated)', '', \"\"\"$content\"\"\"))")

    if [[ ! $content =~ "\"files.exclude\"" ]]; then
        content=$(python3 -c "import re;print(re.sub(r'(.*)(,?)(\\n})', '\\\\1,\\\\n    \"files.exclude\": {\\n    }\\\\3', \"\"\"$content\"\"\",0,re.MULTILINE | re.DOTALL))")
    fi
    if [[ ! $content =~ "\"files.watcherExclude\"" ]]; then
        content=$(python3 -c "import re;print(re.sub(r'(.*)(,?)(\\n})', '\\\\1,\\\\n    \"files.watcherExclude\": {\\n    }\\\\3', \"\"\"$content\"\"\",0,re.MULTILINE | re.DOTALL))")
    fi
    # if config_path is clients

    content=$(python3 -c "import re;print(re.sub(r'(\"files\.exclude\": {[\s\S]*?)(,?)(\n.*})', \"\"\"\\\\1,\\\\n        //begin generated\\\\n$files_exclude\\\\n        //end generated\\\\3\"\"\", \"\"\"$content\"\"\",0,re.MULTILINE))")
    content=$(python3 -c "import re;print(re.sub(r'(\"files\.watcherExclude\": {[\s\S]*?)(,?)(\n.*})', \"\"\"\\\\1,\\\\n        //begin generated\\\\n$files_watcherExclude\\\\n        //end generated\\\\3\"\"\", \"\"\"$content\"\"\",0,re.MULTILINE))")
    content=$(python3 -c "import re;print(re.sub(r'{,', '{', \"\"\"$content\"\"\",0,re.MULTILINE))")
    echo "$content" > $config_path
    git add $config_path
done

# remove backup files
for config_path in $config_paths; do
    rm "$config_path.bak"
done