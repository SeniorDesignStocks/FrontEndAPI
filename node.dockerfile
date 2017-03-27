FROM node:latest

MAINTAINER Hehk

ENV NODE_ENV=development

COPY    . /var/www
WORKDIR /var/www

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
