FROM node-9.5

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN yarn build

ENTRYPOINT ["yarn", "start"]
