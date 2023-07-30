FROM node:18-alpine as builder

RUN apk add --update --no-cache python3 make g++ && ln -sf python3 /usr/bin/python

WORKDIR /usr/src/app

ENV YARN_CACHE_FOLDER=/root/.yarn

COPY package.json ./
COPY yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn yarn --ignore-scripts

COPY tsconfig.json ./
COPY public ./public
COPY src ./src
COPY .env.production .env

ENV DISABLE_ESLINT_PLUGIN=true
RUN yarn build

FROM node:18-alpine

WORKDIR /usr/src/app

ENV YARN_CACHE_FOLDER=/root/.yarn

COPY package.json ./
COPY yarn.lock ./

RUN yarn --production --ignore-scripts
RUN yarn global add serve

COPY --from=builder /usr/src/app/build ./build

EXPOSE 3000
CMD [ "serve","-s", "-l", "3000", "build" ]
