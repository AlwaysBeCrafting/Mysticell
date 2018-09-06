FROM node:9-alpine AS build

RUN apk add --no-cache git

COPY package.json package-lock.json /opt/app/
WORKDIR /opt/app
RUN npm install

COPY . .
RUN npm run build

FROM node:9-alpine

RUN apk add --no-cache git

COPY ./package.json ./package-lock.json ./server.js /opt/app/
COPY --from=build /opt/app/dist /opt/app/dist
WORKDIR /opt/app
ENV NODE_ENV production

RUN npm install --only=prod && npm cache clean --force

EXPOSE 8080

ENTRYPOINT ["npm"]
CMD ["start"]
