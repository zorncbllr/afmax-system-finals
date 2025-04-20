<?php

use Controllers\Controller;
use Core\Router;
use Middlewares\AuthMiddleware;

$router = new Router(
    base: '/api/v1',
    middlewares: [AuthMiddleware::class]
);

$router->resource('users', Controller::class);

$router
    ->middleware(AuthMiddleware::class)
    ->get('/test', function () {
        return json(['msg' => 'test']);
    });

$router->_404(function () {
    status(404);
    return json(['msg' => '404 resource not found.']);
});
