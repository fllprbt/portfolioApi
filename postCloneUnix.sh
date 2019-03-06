#!/bin/bash

echo "\nCopying .env.example to .env\n"
if [ ! -f ./.env ]; then
   cp .env.example .env
fi

echo "\nInstalling composer dependencies\n"
docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app composer install --ignore-platform-reqs

echo "\nInstalling node dependencies\n"
docker run --rm -u $(id -u):$(id -g) -v  $(pwd):/app -w /app node npm install && npm rebuild node-sass && npm run dev

echo "\nNeed superuser privileges to set permissions, please login\n"
sudo chmod -R 777 storage bootstrap/cache

echo "\nFire containers in background\n"
docker-compose up -d

echo 'Waiting database'; while [ $(docker inspect --format "{{json .State.Health.Status }}" database) != "\"healthy\"" ]; do printf "."; sleep 1; done

echo "\nGenerating API key\n"
docker-compose exec app php artisan key:generate

echo "\nRunning migrations\n"
docker-compose exec app php artisan migrate

echo "\nAdding test user\n(mail: test@user.com, pass: test)\n"
docker-compose exec app php artisan db:seed

echo "\nGenerating Laravel Passport keys\n"
docker-compose exec app php artisan passport:install

docker-compose logs -f || docker-compose down
