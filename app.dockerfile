FROM php:7.2-fpm

RUN apt-get update && apt-get install -y --no-install-recommends mysql-client  \
openssl \
&& docker-php-ext-install pdo_mysql
