<?php

use Core\Router;

$router = new Router();

$router->get('/users/{id}', function () {
    echo 'list of all users';
});

$router->post('/users/{id}/images/{imageId}', function ($id, $body, $params) {

    json([
        'body' => $body
    ]);
});
