FROM node:10-alpine

MAINTAINER Talha Emin Aydemir <talhaeminaydemir@gmail.com>

# ARGs
ARG PROJECT_NAME="dashboard_api"
ARG APPLICATIONS_PATH="/srv"
ARG PORT=4000

EXPOSE ${PORT}

WORKDIR ${APPLICATIONS_PATH}/${PROJECT_NAME}


RUN ["npm", "install", "pm2", "-g"]

ENTRYPOINT ["npm", "run", "start-inside-docker"]
