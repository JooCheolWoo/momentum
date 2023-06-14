#!/bin/bash

APP_NAME="momentum"
APP_NAME_OLD="${APP_NAME}-old"
PORT="10900"
server_version="0.0.1"

source ./yaml.sh
source ../documents/momentum-environments.sh

# 1. Change the current docker container name to old
echo "---------- [Deploy Step - 1] : Rename Current Docker Container"
docker rename ${APP_NAME} ${APP_NAME_OLD}
# 2. Change the current docker images name to old
echo "---------- [Deploy Step - 2] : Rename Current Docker Image"
docker tag ${APP_NAME}:${server_version} ${APP_NAME_OLD}:${server_version}
# 3. Build the jar using gradle
echo "---------- [Deploy Step - 3] : Gradle Build"
sh gradlew build -x test
# 4. Build the docker image
echo "---------- [Deploy Step - 4] : Build New Docker Image"
docker build -t ${APP_NAME}:${server_version} .
# 5. Stop the old docker container
echo "---------- [Deploy Step - 5] : Stop Old Docker Container"
docker stop ${APP_NAME_OLD}
# 6. Remove the old docker container
echo "---------- [Deploy Step - 6] : Remove Old Docker Container"
docker rm ${APP_NAME_OLD}
# 7. Remove the old docker image
echo "---------- [Deploy Step - 7] : Remove Old Docker Image"
docker rmi ${APP_NAME_OLD}:${server_version}

#ssl
docker cp certificate.crt nginx-proxy:/etc/ssl/certificate.crt
docker cp private.key nginx-proxy:/etc/ssl/private.key

# 8. Run new docker container
echo "---------- [Deploy Step - 8] : Run New Docker Container"
# docker run -d -p ${PORT}:${PORT} \
#     -e VIRTUAL_HOST=www.todolist.o-r.kr,todolist.o-r.kr \
#     -e VIRTUAL_PORT=10900 \
#     -e HTTPS_METHOD=noredirect \
#     -v /etc/nginx/certs:/etc/nginx/certs \
#     --restart unless-stopped \
#     --link ${APP_NAME}:app \
#     --name ${APP_NAME} \
#     ${APP_NAME}:${server_version}

docker run -d -p ${PORT}:${PORT} \
    -e VIRTUAL_HOST=todolist.o-r.kr,www.todolist.o-r.kr \
    -e VIRTUAL_PORT=10900 \
    -e HTTPS_METHOD=noredirect \
    -v /path/to/certificate.crt:/etc/ssl/certificate.crt \
    -v /path/to/private.key:/etc/ssl/private.key \
    --link nginx-proxy \
    --name ${APP_NAME} \
    ${APP_NAME}:${server_version}


# docker logs show
docker logs -f ${APP_NAME}