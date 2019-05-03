#!/bin/bash
if [ $(id -u) = 0 ]; then
   echo "\nPlease dont run this script as root.\nRoot access will be asked later on in order to modify some permissions.\n"
   exit 1
fi

echo "\n\033[1mCopying .env.example to .env\033[0m\n"
if [ ! -f ./.env ]; then
   cp .env.example .env
fi

echo "\n\n\033[1mInstalling composer dependencies\033[0m\n"
docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app composer install --ignore-platform-reqs

echo "\n\n\033[1mInstalling node dependencies\033[0m\n"
docker run --rm -u $(id -u):$(id -g) -v  $(pwd):/app -w /app node npm install && npm run dev

echo "\n\n\033[1mNeed superuser privileges to set permissions, you may need to login\033[0m\n"
sudo chmod -R 777 storage bootstrap/cache

echo "\n\n\033[1mFire containers in background\033[0m\n"
docker-compose up -d

echo '\n\n\033[1mWaiting database\033[0m'; while [ $(docker inspect --format "{{json .State.Health.Status }}" database) != "\"healthy\"" ]; do printf "."; sleep 1; done

echo "\n\n\033[1mGenerating API key\033[0m\n"
docker-compose exec app php artisan key:generate

echo "\n\n\033[1mRunning migrations\033[0m\n"
docker-compose exec app php artisan migrate

echo "\n\n\033[1mAdding test user

*************************************
* (mail: test@user.com, pass: test)\033[0m *
*************************************"      
docker-compose exec app php artisan db:seed

echo "\n\n\033[1mGenerating Laravel Passport keys\033[0m\n"
docker-compose exec app php artisan passport:install

echo "\n
    *************************
    * Deployment successful *
    *************************   
     
    This script starts the docker container in detached mode.
    
    - To check docker logs run: \033[1mdocker-compose logs -f\033[0m
    - To stop docker containers: \033[1mdocker-compose down\033[0m\n
"
