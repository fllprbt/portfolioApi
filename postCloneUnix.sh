#!/bin/bash

# composer
docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app composer install --ignore-platform-reqs

# npm
docker run --rm -u $(id -u):$(id -g) -v  $(pwd):/app -w /app node npm install && npm rebuild node-sass && npm run dev

# copy defaults
if [ ! -f ./.env ]; then
   cp .env.example .env
fi

# set permissions locally
sudo chmod -R 777 storage bootstrap/cache

# start component in background
docker-compose up -d

# wait containers to be running
echo 'Waiting database'; while [ $(docker inspect --format "{{json .State.Health.Status }}" database) != "\"healthy\"" ]; do printf "."; sleep 1; done

# generate app key
docker-compose exec app php artisan key:generate

# run migrations
docker-compose exec app php artisan migrate

# add test user (mail: test@user.com, pass: test)
docker-compose exec app php artisan db:seed

# open output of containers and ensure they will be terminated on SIGINT
docker-compose logs -f || docker-compose down
