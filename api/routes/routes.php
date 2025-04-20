<?php

use Core\Router;

$router = new Router();

$router->get('/users/{id}', function () {
    echo 'list of all users';
});

$router->post('/users/{id}', function () {
    echo 'post request users';
});
