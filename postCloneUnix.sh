# #!/bin/bash
# if [ $(id -u) = 0 ]; then
#    echo "\nPlease dont run this script as root.\nRoot access will be asked later on in order to modify some permissions.\n"
#    exit 1
# fi

# echo "\nCopying .env.example to .env\n"
# if [ ! -f ./.env ]; then
#    cp .env.example .env
# fi

# echo "\n\nInstalling composer dependencies\n"
# docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app composer install --ignore-platform-reqs

echo "\n\nInstalling node dependencies\n"
docker run -it --rm -u node: -v $(pwd):/usr/src/app -w /usr/src/app node:11-slim /bin/sh -c 'echo $USER && sudo ls -la'

# echo "\n\nNeed superuser privileges to set permissions, you may need to login\n"
# sudo chmod -R 777 storage bootstrap/cache

# echo "\n\nFire containers in background\n"
# docker-compose up -d

# echo '\n\nWaiting database'; while [ $(docker inspect --format "{{json .State.Health.Status }}" database) != "\"healthy\"" ]; do printf "."; sleep 1; done

# echo "\n\nGenerating API key\n"
# docker-compose exec app php artisan key:generate

# echo "\n\nRunning migrations\n"
# docker-compose exec app php artisan migrate

# echo "\n\nAdding test user

# *************************************
# * (mail: test@user.com, pass: test) *
# *************************************"      
# docker-compose exec app php artisan db:seed

# echo "\n\nGenerating Laravel Passport keys\n"
# docker-compose exec app php artisan passport:install

# echo "\n
#     *************************
#     * Deployment successful *
#     *************************   
     
#     This script starts the docker container in detached mode.
    
#     - To check docker logs run: docker-compose logs -f
#     - To stop docker containers: docker-compose down\n
# "
