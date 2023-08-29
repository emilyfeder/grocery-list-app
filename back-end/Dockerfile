# syntax=docker/dockerfile:1.4
FROM node:18 AS development

WORKDIR /app

# default to port 80 for node, and 9229 and 9230 (tests) for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY . /app

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "src/index.js" ]