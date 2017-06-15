#!/bin/bash
set -o allexport

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR/..

if [ -e .env ]; then
	source .env
fi
echo $OPINIONS_DOCKER_IMAGE_LOCAL

docker build -t $OPINIONS_DOCKER_IMAGE_LOCAL:$OPINIONS_IMAGE_VERSION . 
