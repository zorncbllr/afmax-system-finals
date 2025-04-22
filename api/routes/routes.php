<?php

use Controllers\UserController;
use Core\Router;

$router = new Router();

$router->route("/users")
    ->get([UserController::class, 'getAll'])
    ->post([UserController::class, 'createUser']);


$router->_404(function () {
    status(404);
    return json(['msg' => '404 resource not found.']);
});
