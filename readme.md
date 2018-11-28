# Portfolio Api

A Laravel **project management** RESTful API with OAuth.

# Description

Deploys a Laravel dockerized backend.

* Laravel with proxied password granted OAuth. (Passport)
* php:7-fpm-alpine
* nginx:alpine
* mysql:5.7
* supervisord

# Installation instructions

### Deployment

* **Clone** project and step in its directory
* **Install** required packages: `composer install`
* **Copy / Rename** ```.env.example``` to ```.env```
* **Run** containers ```docker-compose up```

### Configuration

* **Create** your _Laravel_ **application key** ```docker-compose exec app php artisan key:generate```
* **Create** your _OAuth_ keys ```docker-compose exec app php artisan passport:install```
* **Copy** the second client data pair returned from ```passport:install``` (_Password Grant Credentials_) into ```.env``` in
  * **PERSONAL_CLIENT_ID**
  * **PERSONAL_CLIENT_SECRET**

* Run docker-compose exec app php artisan db:seed to create a test user with
  *  mail: test@user.com
  *  pass: test


For **Linux permission** issues ```sudo chmod -R 777 storage```



 _**[http://0.0.0.0:8080](0.0.0.0)**_ to view.

 Project currently lacks production devOps.