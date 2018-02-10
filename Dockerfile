FROM node:9-alpine AS build

COPY package.json yarn.lock /opt/app/
WORKDIR /opt/app
RUN yarn install --pure-lockfile

COPY . .
RUN yarn build

FROM alpine

COPY ./package.json ./yarn.lock ./server.js /opt/app/
COPY --from=build /opt/app/dist /opt/app/dist
WORKDIR /opt/app
ENV NODE_ENV production

RUN apk add --no-cache yarn && rm -r /usr/lib/node_modules/npm
RUN yarn install --pure-lockfile && yarn cache clean

EXPOSE 8080

ENTRYPOINT ["yarn"]
CMD ["start"]
