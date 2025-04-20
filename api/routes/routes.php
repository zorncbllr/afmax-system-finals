<?php

use Core\Router;

$router = new Router();

$router->get('/users/{id}', function () {
    echo 'list of all users';
});

$router->post('/users/{id}/images/{imageId}', function ($id, $body, $params) {

    status(200);
    return json([
        'id' => $id,
        'body' => $body->description,
        'imageId' => $params->imageId
    ]);
});
