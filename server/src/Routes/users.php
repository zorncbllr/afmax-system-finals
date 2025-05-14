<?php

use Src\Controllers\UserController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;

return function (Router $router) {

    $router
        ->middleware(AuthMiddleware::class, AuthorizationMiddleware::class)
        ->get("/users", [UserController::class, "getAllUsers"]);
};
