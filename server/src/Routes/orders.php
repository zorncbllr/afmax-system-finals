<?php

use Src\Controllers\OrderController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\AuthorizationMiddleware;

return function (Router $router) {

    $router
        ->middleware(AuthMiddleware::class, AuthorizationMiddleware::class)
        ->get("/orders", [OrderController::class, "getAllOrders"]);

    $router
        ->middleware(AuthMiddleware::class)
        ->post("/orders", [OrderController::class, "placeOrder"]);
};
