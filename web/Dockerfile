FROM node:10.8.0-alpine

RUN apk add --no-cache git

WORKDIR /src
COPY ./package.json ./package-lock.json ./

RUN npm i

CMD ["npm", "start"]
