#!/bin/bash
set -e

ME=$(basename $0)

auto_envsubst() {
  local template_dir="${NGINX_ENVSUBST_TEMPLATE_DIR:-/etc/nginx/templates}"
  local output_dir="${NGINX_ENVSUBST_OUTPUT_DIR:-/etc/nginx}"

  export NGINX_PID_PATH=${NGINX_PID_PATH:-/var/run/nginx.pid}

  local template defined_envs relative_path output_path subdir
  defined_envs=$(printf '${%s} ' $(awk "END { for (name in ENVIRON) { print ( name ~ /${filter}/ ) ? name : \"\" } }" < /dev/null ))
  [ -d "$template_dir" ] || return 0
  mkdir -p "$output_dir"
  if [ ! -w "$output_dir" ]; then
    echo "$ME: ERROR: $template_dir exists, but $output_dir is not writable"
    return 0
  fi
  find "$template_dir" -follow -type f -print | while read -r template; do
    relative_path="${template#$template_dir/}"
    output_path="$output_dir/$relative_path"
    subdir=$(dirname "$relative_path")
    # create a subdirectory where the template file exists
    mkdir -p "$output_dir/$subdir"
    echo "$ME: Running envsubst on $template to $output_path"
    envsubst "$defined_envs" < "$template" > "$output_path"
  done
}


auto_envsubst

exit 0