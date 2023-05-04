already_printed=0

if [ $TERM ]; then
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    BLUE='\033[0;34m'
    YELLOW='\033[0;33m'
    NC="\033[0m"
fi

function count_chars () {
    echo -en "$@" | sed "s/\x1B\[.*m//g" | wc -c
}

function echo_start () {
    already_printed=$(count_chars $@)
    echo -e "$@"
}

function echo_end () {
    columns=80
    to_print=$(count_chars $@)
    spaces=$(( $columns-$already_printed - $to_print))
    #printf "%${spaces}s"
    echo -e "  $@"
    echo ""
}
