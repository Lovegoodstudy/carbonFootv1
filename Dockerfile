FROM dockerpinata/sqlite:latest
FROM nodesource/node:latest

RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app
RUN npm install sqlite3 --build-from-source
COPY . /home/nodejs/app
RUN npm install
CMD node app.js