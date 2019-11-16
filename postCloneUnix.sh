#!/bin/bash
echo "\n\nCreating volume for node modules\n"
make setup

echo "\n\nInstalling node dependencies\n"
make install

echo "\n\nInstalling composer dependencies\n"
docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app composer install --ignore-platform-reqs

echo "\n\nNeed superuser privileges to set permissions, you may need to login\n"
sudo chmod -R 777 storage bootstrap/cache

echo "\n\nFire containers in background\n"
docker-compose up -d

echo '\n\nWaiting database'; while [ $(docker inspect --format "{{json .State.Health.Status }}" database) != "\"healthy\"" ]; do printf "."; sleep 1; done

echo "\n\nCopying .env.example to .env\n"
docker-compose exec app cp .env.example .env

echo "\n\nGenerating API key\n"
docker-compose exec app php artisan key:generate

echo "\n\nRunning migrations\n"
docker-compose exec app php artisan migrate

echo "\n\nAdding test user

*************************************
* (mail: test@user.com, pass: test) *
*************************************"      
docker-compose exec app php artisan db:seed

echo "\n\nGenerating Laravel Passport keys\n"
docker-compose exec app php artisan passport:install

echo "\n
    *************************
    * Deployment successful *
    *************************   
     
    This script starts the docker container in detached mode.
    
    - To check docker logs run: docker-compose logs -f
    - To stop docker containers: docker-compose down\n
"
