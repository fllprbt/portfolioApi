FROM php:7-fpm-alpine

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
    && pecl install mcrypt-1.0.1 \
    && pecl install memcached \
    && docker-php-ext-enable memcached \
    && docker-php-ext-enable mcrypt

RUN rm /var/cache/apk/* && \
    mkdir -p /var/www

COPY supervisord-app.conf /etc/supervisord.conf

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
