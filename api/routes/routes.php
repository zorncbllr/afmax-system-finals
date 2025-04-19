<?php

use Controllers\Controller;
use Core\Router;

$router = new Router();

$router->get('/products/{id}/images/{imageId}', [Controller::class, 'index']);

$router->get('/products/{id}', [Controller::class, 'index']);
$router->get('/{id}', [Controller::class, 'index']);
