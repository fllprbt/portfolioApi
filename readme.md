# Portfolio Api

A Laravel **project management** RESTful API with OAuth. Requires docker.

# Description

Proxied, password granted OAuth. (Laravel Passport)

##### Backend

-   php:7-fpm-alpine
-   nginx:alpine
-   mysql:5.7
-   supervisord

##### Frontend (API registration views)

-   ReactJS with Material-UI
-   Typescript
-   SASS

# Installation instructions

### Deployment & Configuration

##### Are you on UNIX? Just run this [script](https://github.com/fllprbt/portfolioApi/blob/master/postCloneUnix.sh) and jump to step 10 below, else :

1. **Clone** project and **step** in its directory
2. **Install php deps** `docker run -it --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app composer install --ignore-platform-reqs`
3. **Install node deps & build** `docker run --rm -u $(id -u):$(id -g) -v $(pwd):/app -w /app node npm install && npm rebuild node-sass && npm run dev`
4. **Copy/Rename** `.env.example` to `.env`
5. **Set UNIX Permissions** `sudo chmod -R 777 storage bootstrap/cache`
6. **Fire containers** `docker-compose up`
7. **Create application key** `docker-compose exec app php artisan key:generate`
8. **Migrate** `docker-compose exec app php artisan migrate`
9. **Seed db** `docker-compose exec app php artisan db:seed` (test@user.com, password: test)
10. **Setup Passport (crypto keys & client data)** `docker-compose exec app php artisan passport:install`
11. **Copy** the second client data pair returned from `passport:install` (_Password Grant Credentials_) into `.env` in
    - **PERSONAL_CLIENT_ID**
    - **PERSONAL_CLIENT_SECRET**
12. **Registration's verification mails**. It needs editing of the mail config in `.env`.

_**[http://0.0.0.0:8080](0.0.0.0)**_ to view.

# Development instructions

To tinker the front-end, run `npm run watch` or `npm run hot` (needs **Node** and change of **permissions** of your _node_modules_).

Project is under development. Does not support production builds.
