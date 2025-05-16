FROM php:8.3-fpm-alpine3.20

RUN docker-php-ext-install pdo pdo_mysql

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:lts /usr/bin/composer /usr/bin/composer

COPY ./server/composer.* ./ 

RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

COPY ./server .

RUN composer dump-autoload --optimize

RUN chown -R www-data:www-data /var/www/html/public/images
