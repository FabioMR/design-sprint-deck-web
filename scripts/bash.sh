#!/bin/bash
COLOR_YELLOW='\033[1;49;33m';
COLOR_CLEAN='\033[0m';

SCRIPT_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $(dirname $SCRIPT_PATH)

echo " "
echo -e "${COLOR_YELLOW}========> Opening container terminal...${COLOR_CLEAN}"
docker-compose exec app /bin/bash
