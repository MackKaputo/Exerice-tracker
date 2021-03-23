FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install yarn -g --force
RUN yarn install

EXPOSE 1414

CMD ["node", "server.js"]