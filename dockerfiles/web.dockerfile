FROM nginx:alpine

RUN apk --update add supervisor

RUN adduser -D -H -u 1000 -s /bin/bash -Gwww-data www-data

RUN rm /var/cache/apk/*
COPY server_config/nginx.conf /etc/nginx/conf.d/default.conf
COPY server_config/supervisord-web.conf /etc/supervisord.conf

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
