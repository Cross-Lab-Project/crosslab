#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
GIT_DIR=$(cd "$SCRIPT_DIR/../.." && pwd)
HELPER_DIR=$(cd "$SCRIPT_DIR/../helper.d" && pwd)

BRANCH=$(git rev-parse --abbrev-ref HEAD)

while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --branch)
      BRANCH=$2
      shift # past argument
      shift # past value
      ;;

    --web-repository)
      WEB_REPOSITORY="$2"
      shift # past argument
      shift # past value
      ;;

    --script)
      if [ -z "$SCRIPT" ]; then
        SCRIPT="$2"
      else
        SCRIPT="$SCRIPT $2"
      fi
      shift # past argument
      shift # past value
      ;;

    -n|--dry-run)
      DRY_RUN=true
      shift # past argument
      ;;

    -v|--verbose)
      VERBOSE=true
      shift # past argument
      ;;

    *) # unknown option
      shift # past argument
    ;;
  esac
done

if [ -z "$WEB_REPOSITORY" ]; then
  echo "No web repository given"
  exit 1
fi

RED="\033[0;31m"
GREEN="\033[0;32m"
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC="\033[0m"
CSI="\033["

# load .jobs.yaml
echo -en "Parsing .jobs.yml..."
source $HELPER_DIR/job_parsing.sh
echo -e "${CSI}77GDone"

PREFIX="$WEB_REPOSITORY/$BRANCH/"

function jobs_for_prefix(){
    for job in ${job_names[@]}; do
      if [[ $job == $1* ]]; then
        echo $job
      fi
    done
}

function badges(){
  script_order=$(echo build-spec lint-spec build lint test | tr ' ' '\n')

  all_job_names="$(jobs_for_prefix $1)"

  script_names=$(echo $all_job_names | tr " " "\n" | sed 's/^[^:]*://')
  script_names=$(echo "$script_order"$'\n'"$script_names"$'\n'"$script_names" | nl | sort -k2,2 -s | uniq -d -f1 | uniq -f1 | sort -n | cut -f2)
  sorted_job_names=$(echo $all_job_names | tr " " "\n")

  echo -n "|     |"
  for script in $script_names; do
    echo -n " $script |"
  done
  echo -en "\n| --- |"
  for script in $script_names; do
    echo -n " --- |"
  done

  old_root=""
  for job in $sorted_job_names; do
    if [[ ! "${root[$job]}" == "$old_root" ]]; then
      echo ""
      echo -n "| ${root[$job]} | "
      for script in $script_names; do
        r="${root[$job]}"
        r="${r#"$GIT_DIR"/}"
        j="$r:$script"
        if [ ${script[$j]} ]; then
          echo -n " [![${script[$j]}]($PREFIX${r}/dist/${script[$j]}.badge)]($PREFIX${r}/dist/${script[$j]}.log) |"
        else
          echo -n "  |"
        fi
      done;
      old_root=${root[$job]}
    fi
  done
}

for file in $(fd -gp '*/README.md'); do
  echo -en "${BLUE}❯ Writing $file"
  path=$(dirname $file)
  if [[ "$path" == "." ]]; then
    path=""
  else
    path=${path/.\//}
  fi
  replacement=$'[//]: # ({{print badges}})\n\n'
  replacement="$replacement"$(badges $path)
  replacement="$replacement"$'\n\n[//]: # ({{end}})'
  replacement=$(echo -n "$replacement" | tr '\n' '\f')
  cat $file | sed '/{{print badges}}/,/{{end}}/c\'"$replacement" | tr '\f' '\n' > $file.tmp
  mv -f $file.tmp $file
  git add $file
  echo -e "${CSI}80G${GREEN}✓${NC}"
done