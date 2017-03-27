FROM nginx:latest

MAINTAINER Hehk

VOLUME /var/cache/nginx

# Copy over the config
COPY ./docker/config/nginx.development.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
