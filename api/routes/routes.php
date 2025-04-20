<?php

use Controllers\Controller;
use Core\Router;

$router = new Router();

$router->resource('users', Controller::class);

$router->_404(function () {
    status(404);
    return json(['msg' => '404 resource not found.']);
});
