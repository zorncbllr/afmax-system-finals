<?php

use Src\Controllers\CartController;
use Src\Core\Router;
use Src\Middlewares\AuthMiddleware;
use Src\Middlewares\Validators\CartValidator;

return function (Router $router) {

    $router
        ->middleware(AuthMiddleware::class)
        ->get("/user/cart", [CartController::class, "getUserCart"]);

    $router
        ->middleware(AuthMiddleware::class, CartValidator::class)
        ->post("/user/cart", [CartController::class, "addItemToCart"]);

    $router
        ->middleware(AuthMiddleware::class)
        ->patch("/user/cart", [CartController::class, "updateCartItem"]);

    $router
        ->middleware(AuthMiddleware::class)
        ->delete("/user/cart/{cartItemId}", [CartController::class, "deleteCartItem"]);
};
