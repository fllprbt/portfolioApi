# Portfolio Api
A Laravel **project management** RESTful API with OAuth.

# Description
Deploys a Laravel dockerized backend. 
* Laravel with Passport
* php:7-fpm-alpine
* nginx:alpine
* mysql:5.7
* supervisord

# Installation instructions
* **Clone** project and step in its directory
* Install required packages: `composer install`
* **Copy .env.example** to **.env** `cp .env.example .env` _(Unix example)_
* For **Linux permission** issues ```sudo chmod -R 777 storage```
* ```docker-compose up```


 _**[http://0.0.0.0:8080](0.0.0.0)**_ to view. 
 Project currently lacks deployment devOps.