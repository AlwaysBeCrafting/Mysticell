FROM node:9-alpine AS build

COPY package.json yarn.lock /opt/app/
WORKDIR /opt/app
RUN yarn install --pure-lockfile

COPY . .
RUN yarn build

FROM node:9-alpine

COPY ./package.json ./yarn.lock ./server.js /opt/app/
COPY --from=build /opt/app/dist /opt/app/dist
WORKDIR /opt/app
ENV NODE_ENV production
RUN yarn install --pure-lockfile && yarn cache clean
RUN du -h /

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]
