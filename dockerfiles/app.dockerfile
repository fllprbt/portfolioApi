FROM php:7.2-fpm-alpine

RUN apk --update add wget \
  curl \
  git \
  grep \
  build-base \
  libmemcached-dev \
  libmcrypt-dev \
  libxml2-dev \
  pcre-dev \
  libtool \
  make \
  autoconf \
  g++ \
  cyrus-sasl-dev \
  libgsasl-dev \
  supervisor

RUN docker-php-ext-install mysqli mbstring pdo pdo_mysql
RUN pecl channel-update pecl.php.net \
  && pecl install memcached \
  && docker-php-ext-enable memcached

RUN rm /var/cache/apk/* && \
  mkdir -p /var/www

COPY server_config/supervisord-app.conf /etc/supervisord.conf

RUN adduser -D -u 1000 nonroot
USER nonroot

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
