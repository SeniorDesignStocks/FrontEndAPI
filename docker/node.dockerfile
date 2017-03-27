FROM node:latest

MAINTAINER Hehk

WORKDIR /var/www

RUN npm install -g pm2@latest

RUN mkdir -p /var/log/pm2

EXPOSE 8080

ENTRYPOINT ["pm2", "start", "./src/index.js", "--name", "stocks-api", "--log", "/var/log/pm2/pm2.log", "--watch", "--no-daemon"]
