FROM node:10-alpine

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY src/ /app/src

EXPOSE 80
CMD [ "node", "src" ]
