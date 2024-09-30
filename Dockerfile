FROM node:20.17.0

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "run", "start" ]