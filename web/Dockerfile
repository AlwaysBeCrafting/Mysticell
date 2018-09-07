FROM node:10.8.0-alpine

RUN apk add --no-cache git

COPY . /src
WORKDIR /src

RUN npm i

CMD ["npm", "start"]
