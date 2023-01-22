#!/bin/bash
set -e

SCRIPT_DIR=$(dirname "$0")
HELPER=$SCRIPT_DIR/../helper


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
source $HELPER/job_parsing.sh
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
    if [[ ! "${root[$job]}" == "$old_root" ]]; then
      [[ "$old_root" == "" ]] || result="$result"$'\n''  end'
      result="$result"$'\n''  subgraph '"${root[$job]}"
      old_root=${root[$job]}
    fi
    result="$result"$'\n'"    $job[${script[$job]}]"
  done
  result="$result"$'\n''  end'

  # print dependencies
  for job in $sorted_job_names; do
    for dependency in ${dependencies[$job]}; do
      result="$result"$'\n'"  $dependency[${script[$dependency]}] --> $job[${script[$job]}]"
    done
  done

  result="$result"$'\n''```'
  echo "$result"
}

for file in $($HELPER/find_files.sh */README.md); do
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
  echo -e "${CSI}80G${GREEN}✓${NC}"
done