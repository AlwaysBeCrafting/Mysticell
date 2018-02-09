FROM node:9-alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .
RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]
