FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm install @types/node
RUN npm run compile

COPY . .

EXPOSE 80
CMD [ "node", "server.js" ]