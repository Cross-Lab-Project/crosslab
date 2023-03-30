#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
GIT_DIR=$(cd "$SCRIPT_DIR/../.." && pwd)
HELPER_DIR=$(cd "$SCRIPT_DIR/../helper.d" && pwd)

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in

    *) # unknown option
      shift # past argument
    ;;
  esac
done

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

function all_dependencies(){
    for dependency in ${dependencies[$1]}; do
      all_dependencies $dependency
    done
    echo $1
}

function all_dependencies_for_prefix(){
    for job in ${job_names[@]}; do
      if [[ $job == $1* ]]; then
        all_dependencies $job
      fi
    done
}

function diagram(){
  result='```mermaid'$'\n''graph LR'$'\n'"%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%"

  all_job_names=$(all_dependencies_for_prefix $1)

  sorted_job_names=$(echo $all_job_names | tr " " "\n" | sort | uniq)

  # Print subgraphs
  old_root=""
  for job in $sorted_job_names; do
    r="${root[$job]}"
    r="${r#"$GIT_DIR"/}"
    if [[ ! "${r}" == "$old_root" ]]; then
      [[ "$old_root" == "" ]] || result="$result"$'\n''  end'
      result="$result"$'\n''  subgraph '"${r}"
      old_root=${r}
    fi
    result="$result"$'\n'"    $job[${script[$job]}]"
  done
  result="$result"$'\n''  end'

  # print dependencies
  deps=""
  for job in $sorted_job_names; do
    for dependency in ${dependencies[$job]}; do
      jobA="$dependency[${script[$dependency]}]"
      jobB="$job[${script[$job]}]"
      jobARoot=$(echo "$jobA" | sed 's/:.*//g')
      jobBRoot=$(echo "$jobB" | sed 's/:.*//g')
      if [[ "$jobARoot" != "$1" ]]; then
        jobA="$jobARoot"
      fi
      if [[ "$jobBRoot" != "$1" ]]; then
        jobB="$jobBRoot"
      fi
      deps="$deps"$'\n'"$jobA#$jobB"
    done
  done

  deps=$(echo "$deps" | sort | uniq)

  for dep in $deps; do
    depA=$(echo $dep | cut -d'#' -f1)
    depB=$(echo $dep | cut -d'#' -f2)
    if [[ "$depA" != "$depB" ]]; then
      result="$result"$'\n'"$depA --> $depB"
    fi
  done

  result="$result"$'\n''```'
  echo "$result"
}

for file in $(fd -gp '*/README.md'); do
  echo -en "${BLUE}❯ Writing $file"
  path=$(dirname $file)
  if [[ "$path" == "." ]]; then
    path=""
  else
    path=${path/.\//}
  fi
  replacement=$'[//]: # ({{print dependency graph}})\n'
  replacement="$replacement"$(diagram $path)
  replacement="$replacement"$'\n[//]: # ({{end}})'
  replacement=$(echo -n "$replacement" | tr '\n' '\f')
  cat $file | sed '/{{print dependency graph}}/,/{{end}}/c\'"$replacement" | tr '\f' '\n' > $file.tmp
  mv -f $file.tmp $file
  git add $file
  echo -e "${CSI}80G${GREEN}✓${NC}"
done