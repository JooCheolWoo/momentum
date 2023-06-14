#!/bin/bash
APP_NAME="momentum"


cd /home/cheolwoo/${APP_NAME}
git reset
git checkout .
git clean -fdx
git pull
# execute docker build
/bin/bash build-docker.sh