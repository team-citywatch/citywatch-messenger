FROM node:10.15.0

RUN npm install -g yarn npm
COPY ./src /app/src
COPY ./.env /app/.env
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock
WORKDIR /app

RUN yarn --production
CMD ["yarn", "start"]
