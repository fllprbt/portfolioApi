# Portfolio Api

A Laravel **project management** RESTful API with OAuth. Requires docker.

# Description

Proxied, password granted OAuth. (Laravel Passport)

* php:7-fpm-alpine
* nginx:alpine
* mysql:5.7
* supervisord

# Installation instructions

### Deployment & Configuration

##### Are you on UNIX? Just run this [script](https://github.com/fllprbt/portfolioApi/blob/master/postCloneUnix.sh) and jump to step 9 below, else :

1. **Clone** project and **step** in its directory
2. **Install deps** `composer install`
3. **Copy/Rename** ```.env.example``` to ```.env```
4. **Set UNIX Permissions** ```sudo chmod -R 777 storage bootstrap/cache```
5. **Fire containers** ```docker-compose up```
6. **Create application key** ```docker-compose exec app php artisan key:generate```
7. **Migrate** ```docker-compose exec app php artisan migrate```
8. **Seed db** ```docker-compose exec app php artisan db:seed``` (test@user.com, password: test)
9. **Setup Passport (crypto keys & client data)** ```docker-compose exec app php artisan passport:install```
10. **Copy** the second client data pair returned from ```passport:install``` (_Password Grant Credentials_) into ```.env``` in
  	* **PERSONAL_CLIENT_ID**
  	* **PERSONAL_CLIENT_SECRET**


 _**[http://0.0.0.0:8080](0.0.0.0)**_ to view.

 Project is under development.
