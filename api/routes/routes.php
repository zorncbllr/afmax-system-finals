<?php

use Core\Router;

$router = new Router();

$router->get('/users/{id}', function () {
    echo 'list of all users';
});

$router->post('/users/{id}', function ($id) {

    status(200);

    return json([
        'method' => 'POST',
        'id' => $id
    ]);
});
