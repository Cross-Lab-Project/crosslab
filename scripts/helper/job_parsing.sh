declare -A dependencies
declare -A status
declare -A files
declare -A root
declare -A script
declare -A script_args
declare -a job_names

job_name_query='\(.path):\(.script | split(" ")[0])'
dependencies_query='\(.dependencies)'
path_query='\(.path)'
paths_query='\(.paths)'
script_query='\(.script | split(" ")[0])'
script_args_query='\(.script | split(" ")[1:] | join(" "))'

query="$job_name_query\t$dependencies_query\t$path_query\t$paths_query\t$script_query\t$script_args_query"

raw_jobs=$(cat .jobs.yml | yq -r '. | to_entries | .[] | .key as $k | .value | map({path: $k}+.) | .[] | "'"$query"'\t"')

oldIFS="$IFS"
IFS=$'\n'
for raw_job in $raw_jobs; do
  job_name=$(echo $raw_job | cut -f1)
  job_names+=($job_name)

  d=$(echo $raw_job | cut -f2)
  d=${d/[\"/}
  d=${d/\"]/}
  d=${d//\",\"/$'\n'}
  d=${d/null/}
  dependencies[$job_name]=$d

  status[$job_name]="created"

  path=$(echo $raw_job | cut -f3)
  paths=$(echo $raw_job | cut -f4)
  paths=${paths/[\"/}
  paths=${paths/\"]/}
  paths=${paths//\",\"/$'\n'}
  paths=${paths/null/}
  if [ -n "$paths" ]; then
    files[$job_name]=$(echo $paths | sed "s#\.\/#$path\/#g")
  else
    files[$job_name]=$path
  fi

  root[$job_name]=$path
  script[$job_name]=$(echo $raw_job | cut -f5)
  script_args[$job_name]=$(echo $raw_job | cut -f6)
done
IFS=$oldIFS
