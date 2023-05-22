#!/bin/bash
set -e

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
GIT_DIR=$(cd "$SCRIPT_DIR/../.." && pwd)
HELPER_DIR=$(cd "$SCRIPT_DIR/../helper.d" && pwd)

cd $SCRIPT_DIR/../..

# Default values
VERBOSE=false
SKIP_UPLOAD=true
SKIP_DOWNLOAD=false
CLEAN=false
DEV_VERSION=true
SKIP_HOUSEKEEPING=false

SUBCOMMANDVARS=""

# Read the commands
while [[ $# -gt 0 ]]; do
  key="$1"

  case $key in
    --include)
      INCLUDE="$2"
      shift # past argument
      shift # past value
      ;;

    --branch)
      SUBCOMMANDVARS="$SUBCOMMANDVARS --branch $2"
      shift # past argument
      shift # past value
      ;;
    
    --repository)
      SUBCOMMANDVARS="$SUBCOMMANDVARS --repository $2"
      shift # past argument
      shift # past value
      ;;

    --web-repository)
      SUBCOMMANDVARS="$SUBCOMMANDVARS --web-repository $2"
      shift # past argument
      shift # past value
      ;;

    --no-download)
      SKIP_DOWNLOAD=true
      shift
      ;;

    --skip-upload)
      SKIP_UPLOAD=true
      shift
      ;;

    --upload)
      SKIP_UPLOAD=false
      shift
      ;;

    --no-upload)
      SKIP_UPLOAD=true
      shift
      ;;

    --release)
      CLEAN=true
      SKIP_DOWNLOAD=true
      DEV_VERSION=false
      SUBCOMMANDVARS="$SUBCOMMANDVARS --release"
      shift
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

    --tag)
      if [ -z "$TAGS" ]; then
        TAGS="$2"
      else
        TAGS="$TAGS $2"
      fi
      shift # past argument
      shift # past value
      ;;

    --skip-tag)
      if [ -z "$SKIP_TAGS" ]; then
        SKIP_TAGS="$2"
      else
        SKIP_TAGS="$SKIP_TAGS $2"
      fi
      shift # past argument
      shift # past value
      ;;

    --skip-housekeeping)
      SKIP_HOUSEKEEPING=true
      shift
      ;;

    --clean)
      CLEAN=true
      shift # past argument
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

if [ $DEV_VERSION = true ]; then
  VERSION=$(cat VERSION)-dev.$(git rev-parse --short HEAD)
else
  VERSION=$(cat VERSION)
fi

if [ $VERBOSE = false ]; then
  SUBCOMMANDVARS="$SUBCOMMANDVARS -q"
fi

if [ $CLEAN = true ]; then
  echo "Cleaning dist directories"
  if [ ! -z $INCLUDE ]; then
    rm -rf $(fd -IL -E 'node_modules' -E "/$INCLUDE" -td -g 'dist')
  else
    rm -rf $(fd -IL -E 'node_modules' -td -g 'dist')
  fi
fi

source $HELPER_DIR/printing_functions.sh

if [ ! -z $INCLUDE ]; then
  echo "Parsing $INCLUDE/jobs.yml..."
  cd $SCRIPT_DIR/../../$INCLUDE
  source $HELPER_DIR/job_parsing.sh --prefix $INCLUDE/

  for job in "${job_names[@]}"; do
    if [ "$(cat ${root[$job]}/dist/${script[$job]}.status 2>/dev/null)" = "success" ]; then
      for dependency in ${dependencies[$job]}; do
        if [ -e ${root[$dependency]}/scripts/set-scene.sh ]; then
          ${root[$dependency]}/scripts/set-scene.sh || true
        fi
      done
      status[$job]="success"
    else
      status[$job]="failed"
      failed_jobs="$failed_jobs $job"
    fi
  done
fi

cd $SCRIPT_DIR/../..
# load .jobs.yaml
echo_start "Parsing .jobs.yml..."
source $HELPER_DIR/job_parsing.sh
echo_end "Done"

skipped_jobs=""
ignored_jobs=""
failed_jobs=""

while true; do
  for job in "${job_names[@]}"; do

    # skip if script name is not in SCRIPT
    if [ ! -z "$SCRIPT" ]; then
      is_in_script=false
      for s in $SCRIPT; do
        if [ ${script[$job]} = $s ]; then
          is_in_script=true
          break
        fi
      done
      if [ $is_in_script = false ]; then
        status[$job]="skipped"
        continue
      fi
    fi

    # skip if tag is not in TAGS
    if [ ! -z "$TAGS" ]; then
      is_in_tags=false
      for t in $TAGS; do
        if [ ${tags[$job]} = $t ]; then
          is_in_tags=true
          break
        fi
      done
      if [ $is_in_tags = false ]; then
        status[$job]="skipped"
        continue
      fi
    fi

    # skip if tag is in SKIP_TAGS
    if [ ! -z "$SKIP_TAGS" ]; then
      is_in_skip_tags=false
      for t in $SKIP_TAGS; do
        if [ ${tags[$job]} = $t ]; then
          is_in_skip_tags=true
          break
        fi
      done
      if [ $is_in_skip_tags = true ]; then
        status[$job]="skipped"
        continue
      fi
    fi

    if [ ${status[$job]} = "created" ]; then
      runable=true
      # check if runable (dependencies are build)
      for dependency in ${dependencies[$job]}; do
        if [[ $dependency == "null" ]]; then
          continue
        fi

        if [ -z ${status[$dependency]} ]; then
          echo ${dependencies[$job]}
          echo "Error: dependency $dependency of $job not found"
          exit 1
        fi

        if [ ${status[$dependency]} = "failed" ]; then
          status[$job]="failed"
          ignored_jobs="$ignored_jobs $job"
          runable=false
          break
        elif [ ${status[$dependency]} = "created" ]; then
          runable=false
          break
        fi
      done

      if [ $runable = true ]; then
        echo_start "${BLUE}> Running $job"

        # Calculate input hash
        job_input_paths="-p ${files[$job]} -p ${root[$job]}/scripts/${script[$job]}.sh"
        for dependency in ${dependencies[$job]}; do
          if [ $dependency = "null" ]; then
            continue
          fi
          job_input_paths="$job_input_paths -p ${root[$dependency]}/dist/${script[$dependency]}.hash"
        done
        job_input_hash=$($HELPER_DIR/path_hash.sh $job_input_paths)

        # Check if we can download job from reopository
        if [ ! "$(cat ${root[$job]}/dist/${script[$job]}.hash 2>/dev/null)" = "$job_input_hash" ] && [ $SKIP_DOWNLOAD = false ]; then
          # No hash file, so job is not build try to download cache
          echo_end "${BLUE}⇣ check for remote cache${NC}"
          r="${root[$job]}"
          r="${r#"$GIT_DIR"/}"
          $SCRIPT_DIR/download_job_artifact.sh --directory $r/dist --hash $job_input_hash $SUBCOMMANDVARS || true
        fi

        # Check if job hash is the same
        if [ "$(cat ${root[$job]}/dist/${script[$job]}.hash 2>/dev/null)" = "$job_input_hash" ]; then
          skipped_jobs="$skipped_jobs $job"
          if [ "$(cat ${root[$job]}/dist/${script[$job]}.status 2>/dev/null)" = "success" ]; then
            for dependency in ${dependencies[$job]}; do
              if [ -e ${root[$dependency]}/scripts/set-scene.sh ]; then
                ${root[$dependency]}/scripts/set-scene.sh || true
              fi
            done
            status[$job]="success"
            echo_end "${GREEN}skipped (success)${NC}"
          else
            status[$job]="failed"
            failed_jobs="$failed_jobs $job"
            echo_end "${RED}skipped  (failed)${NC}"
          fi
          continue 2
        fi

        echo_end "${BLUE}running...${NC}"

        # Set Scene for dependencies:
        for dependency in ${dependencies[$job]}; do
          if [ -e ${root[$dependency]}/scripts/set-scene.sh ]; then
            ${root[$dependency]}/scripts/set-scene.sh || true
          fi
        done

        mkdir -p ${root[$job]}"/dist"
        rm -f ${root[$job]}"/dist/${script[$job]}.badge"
        set +e
        (cd ${root[$job]} && ./scripts/${script[$job]}.sh ${script_args[$job]} --version ${VERSION} > "dist/"${script[$job]}".log" 2>&1); exit_code=$?
        set -e
        if [ $exit_code -eq 0 ]; then
          status[$job]="success"
          echo_end "${GREEN}success${NC}"
        else
          status[$job]="failed"
          echo_end "${RED}failed${NC}"
          failed_jobs="$failed_jobs $job"
        fi

        echo "${status[$job]}" > "${root[$job]}/dist/${script[$job]}.status"
        echo "$job_input_hash" > "${root[$job]}/dist/${script[$job]}.hash"
        
        if [ ! -e ${root[$job]}/dist/${script[$job]}.badge ]; then
          $SCRIPT_DIR/create_badge.sh -j $job
        fi

        continue 2
      fi
    fi
  done
  break
done

if [ -z "$TAGS" ] && [ SKIP_HOUSEKEEPING = false ]; then
  echo_start "${BLUE}> Housekeeping${NC}"
  set +e
  ($SCRIPT_DIR/../housekeeping.sh --check > /dev/null 2>&1); exit_code=$?
  set -e
  if [ $exit_code -eq 0 ]; then
    echo_end "${GREEN}success${NC}"
  else
    echo_end "${RED}failed${NC}"
    failed_jobs="$failed_jobs housekeeping"
  fi
fi

if [ $SKIP_UPLOAD = false ]; then
  echo ""
  echo_start "${BLUE}> Uploading artifacts${NC}"
  set +e
  $SCRIPT_DIR/upload_artifacts.sh $SUBCOMMANDVARS; exit_code=$?
  set -e
  if [ $exit_code -eq 0 ]; then
    echo_end "${GREEN}Done${NC}"
  else
    echo_end "${RED}Failed${NC}"
  fi
  echo ""
fi

if [ -n "$ignored_jobs" ]; then
  echo -e "${YELLOW}$(wc -w <<< $ignored_jobs) jobs didn't run because their dependencies failed:"
  for job in $ignored_jobs; do
    echo -e "${YELLOW}  $job"
  done
  echo ""
fi

if [ -n "$failed_jobs" ]; then
  echo -e "${RED}$(wc -w <<< $failed_jobs) jobs failed:"
  for job in $failed_jobs; do
    echo -e "${RED}  $job"
  done
  echo ""
fi

if [ -n "$skipped_jobs" ]; then
  echo -e "${NC}$(wc -w <<< $skipped_jobs) jobs were skipped"
  echo ""
fi

if [ -z "$failed_jobs" ]; then
  echo -e "${GREEN}All jobs succeeded${NC}"
  exit 0
fi

exit 1